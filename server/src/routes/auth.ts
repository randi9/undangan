import { Router, Request, Response } from "express";
import supabase from "../database";
import { requireAuth as clerkRequireAuth, getAuth, createClerkClient } from '@clerk/express';

const router = Router();
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });


// ============ Types ============

export interface AuthUser {
  id: string;
  username: string;
  role: "admin" | "user";
  max_invitations: number;
}

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

// ============ Helpers ============

// ============ Middleware ============

export const requireAuth = [
  clerkRequireAuth(),
  async (req: any, res: any, next: any) => {
    try {
      // Use getAuth() from @clerk/express v2 to access auth data
      const auth = getAuth(req);
      const clerkId = auth.userId;
      
      console.log('[Auth Debug] getAuth result:', { userId: clerkId, sessionId: auth.sessionId });
      
      if (!clerkId) {
        return res.status(401).json({ error: "Tidak terautentikasi oleh Clerk." });
      }

      let { data: user } = await supabase
        .from("users")
        .select("*")
        .eq("username", clerkId)
        .single();

      if (!user) {
        // Auto-create local user mapped to Clerk ID
        // First user across the db? Let's check.
        const { count } = await supabase.from('users').select('id', { count: 'exact', head: true });
        const isFirstUser = count === 0;

        const { data: newUser, error } = await supabase
          .from("users")
          .insert([{
            username: clerkId,
            password_hash: "clerk_managed",
            role: isFirstUser ? "admin" : "user",
            max_invitations: isFirstUser ? 999 : 3,
          }])
          .select("*")
          .single();

        if (error) throw error;
        user = newUser;
        console.log('[Auth] Created new user:', { clerkId, role: user.role, isFirstUser });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error("Auth sync error:", err);
      res.status(500).json({ error: "Gagal sinkronisasi user Clerk." });
    }
  }
];

export function requireAdmin(req: any, res: any, next: any): void {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ error: "Akses ditolak. Hanya admin yang diizinkan." });
    return;
  }
  next();
}

// ============ Routes ============

// POST /api/auth/login
// Dihapus karena login sepenuhnya dihandle oleh Clerk UI di frontend.

// GET /api/auth/me
router.get("/me", requireAuth, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Tidak terautentikasi." });
      return;
    }

    const user = req.user;

    const { count } = await supabase
      .from("invitations")
      .select("id", { count: "exact", head: true })
      .eq("owner_id", user.id);

    res.json({ ...user, invitation_count: count || 0 });
  } catch (err: any) {
    console.error("Me error:", err);
    res.status(500).json({ error: "Gagal mengambil data user." });
  }
});

// POST /api/auth/seed-admin (Dihapus, Clerk handles identity)

// ============ User Management (Admin-only) ============

// GET /api/auth/users
router.get("/users", requireAuth, requireAdmin, async (_req: Request, res: Response) => {
  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("id, username, role, max_invitations, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const counts: Record<string, number> = {};
    const { data: invData } = await supabase.from("invitations").select("owner_id");
    if (invData) {
      for (const inv of invData) {
        if (inv.owner_id) counts[inv.owner_id] = (counts[inv.owner_id] || 0) + 1;
      }
    }

    // Try to get real usernames from Clerk
    let clerkUserMap = new Map<string, string>();
    try {
      const clerkUsersResponse = await clerkClient.users.getUserList({ limit: 500 });
      clerkUsersResponse.data.forEach(u => {
        const display = u.username || u.emailAddresses[0]?.emailAddress || u.id;
        clerkUserMap.set(u.id, display);
      });
    } catch (clerkErr) {
      console.warn("Failed fetching users from Clerk:", clerkErr);
    }

    const result = (users || []).map((u: any) => ({ 
      ...u, 
      clerk_id: u.username, // keep track of the original clerk ID
      username: clerkUserMap.get(u.username) || u.username,
      invitation_count: counts[u.id] || 0 
    }));
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Gagal mengambil data user." });
  }
});

// POST /api/auth/users
router.post("/users", requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    let { username, password, role, max_invitations } = req.body;

    if (!username) username = "user" + Math.floor(1000 + Math.random() * 9000);
    // password must be strong for Clerk by default, let's make sure it's minimally random
    if (!password) {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
      password = '';
      for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }

    username = username.trim().toLowerCase();
    role = role === "admin" ? "admin" : "user";
    max_invitations = Math.max(1, Number(max_invitations) || 3);

    // Create user in Clerk first
    let clerkUser;
    try {
      const createParams: any = {
        password: password,
        skipPasswordRequirement: true
      };

      if (username.includes('@')) {
        createParams.emailAddress = [username];
      } else {
        createParams.username = username;
        // Generate a dummy email to satisfy Clerk if email is required
        createParams.emailAddress = [`${username}@mengundanganda.com`];
      }

      clerkUser = await clerkClient.users.createUser(createParams);
    } catch (clerkErr: any) {
      console.error("Clerk API Create User Error:", clerkErr.errors || clerkErr);
      return res.status(400).json({ error: clerkErr.errors?.[0]?.message || "Gagal membuat user di Clerk." });
    }

    const { data: user, error } = await supabase
      .from("users")
      .insert([{ 
        username: clerkUser.id, 
        password_hash: "clerk_managed", 
        role, 
        max_invitations 
      }])
      .select("id, username, role, max_invitations, created_at")
      .single();

    if (error) {
      // rollback if needed
      await clerkClient.users.deleteUser(clerkUser.id).catch(console.error);
      throw error;
    }

    // Return the user details using original intent
    res.status(201).json({ 
      ...user, 
      clerk_id: clerkUser.id,
      username: clerkUser.username || username,
      plain_password: password, 
      invitation_count: 0 
    });
  } catch (err: any) {
    console.error("Create user error:", err);
    res.status(500).json({ error: err.message || "Gagal membuat user." });
  }
});

// PUT /api/auth/users/:id
router.put("/users/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role, max_invitations, password, username } = req.body;

    // Get current user mapping from Supabase to find their Clerk ID
    const { data: currentUser, error: getErr } = await supabase
      .from("users")
      .select("username")
      .eq("id", id)
      .single();

    if (getErr || !currentUser) {
      return res.status(404).json({ error: "User tidak ditemukan." });
    }

    const clerkId = currentUser.username;

    const updateData: Record<string, any> = {};
    if (role !== undefined) updateData.role = role === "admin" ? "admin" : "user";
    if (max_invitations !== undefined) updateData.max_invitations = Math.max(1, Number(max_invitations));
    
    // Update user in Clerk
    const clerkUpdates: any = {};
    if (password) {
      clerkUpdates.password = password;
      clerkUpdates.skipPasswordRequirement = true;
    }
    if (username) {
      const parsedUsername = username.trim().toLowerCase();
      if (!parsedUsername.includes('@')) {
        clerkUpdates.username = parsedUsername;
      }
    }
    
    if (Object.keys(clerkUpdates).length > 0 && clerkId.startsWith("user_")) {
      try {
        await clerkClient.users.updateUser(clerkId, clerkUpdates);
      } catch (clerkErr: any) {
        console.error("Clerk API Update User Error:", clerkErr.errors || clerkErr);
        return res.status(400).json({ error: clerkErr.errors?.[0]?.message || "Gagal mengupdate user di Clerk." });
      }
    }

    const { data: updated, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", id)
      .select("id, username, role, max_invitations")
      .single();

    if (error) throw error;
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Gagal update user." });
  }
});

// DELETE /api/auth/users/:id
router.delete("/users/:id", requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (req.user?.id === id) {
      res.status(400).json({ error: "Tidak bisa menghapus akun sendiri." });
      return;
    }

    const { data: userToDelete } = await supabase.from("users").select("username").eq("id", id).single();

    await supabase.from("invitations").update({ owner_id: null }).eq("owner_id", id);
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) throw error;

    // Remove from Clerk as well if it's a clerk user
    if (userToDelete && userToDelete.username.startsWith("user_")) {
      try {
        await clerkClient.users.deleteUser(userToDelete.username);
      } catch (clerkErr) {
        console.warn("Failed deleting from Clerk:", clerkErr);
      }
    }

    res.json({ message: "User berhasil dihapus." });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Gagal menghapus user." });
  }
});

// GET /api/auth/users/:id/invitations
router.get("/users/:id/invitations", requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("invitations")
      .select("id, slug, groom_name, bride_name, theme, created_at")
      .eq("owner_id", id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Gagal mengambil undangan user." });
  }
});

export default router;
