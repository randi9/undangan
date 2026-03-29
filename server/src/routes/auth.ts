import { Router } from "express";
import bcrypt from "bcryptjs";
import supabase from "../database";
import { requireAuth as clerkRequireAuth, getAuth } from '@clerk/express';

const router = Router();

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
router.get("/me", requireAuth, async (req, res) => {
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
router.get("/users", requireAuth, requireAdmin, async (_req, res) => {
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

    const result = (users || []).map((u: any) => ({ ...u, invitation_count: counts[u.id] || 0 }));
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Gagal mengambil data user." });
  }
});

// POST /api/auth/users
router.post("/users", requireAuth, requireAdmin, async (req, res) => {
  try {
    let { username, password, role, max_invitations } = req.body;

    if (!username) username = "user" + generateRandomString(6);
    if (!password) password = generateRandomString(10);

    username = username.trim().toLowerCase();
    role = role === "admin" ? "admin" : "user";
    max_invitations = Math.max(1, Number(max_invitations) || 3);

    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .single();

    if (existing) {
      res.status(400).json({ error: "Username sudah digunakan." });
      return;
    }

    const passwordHash = await hashPassword(password);
    const { data: user, error } = await supabase
      .from("users")
      .insert([{ username, password_hash: passwordHash, role, max_invitations }])
      .select("id, username, role, max_invitations, created_at")
      .single();

    if (error) throw error;

    res.status(201).json({ ...user, plain_password: password, invitation_count: 0 });
  } catch (err: any) {
    console.error("Create user error:", err);
    res.status(500).json({ error: err.message || "Gagal membuat user." });
  }
});

// PUT /api/auth/users/:id
router.put("/users/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, max_invitations, password, username } = req.body;

    const updateData: Record<string, any> = {};
    if (username) updateData.username = username.trim().toLowerCase();
    if (role !== undefined) updateData.role = role === "admin" ? "admin" : "user";
    if (max_invitations !== undefined) updateData.max_invitations = Math.max(1, Number(max_invitations));
    if (password) {
      const bcrypt = require('bcryptjs');
      updateData.password_hash = await bcrypt.hash(password, 10);
    }

    const { data: updated, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", id)
      .select("id, username, role, max_invitations")
      .single();

    if (error) throw error;
    if (!updated) {
      res.status(404).json({ error: "User tidak ditemukan." });
      return;
    }

    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Gagal update user." });
  }
});

// DELETE /api/auth/users/:id
router.delete("/users/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user?.id === id) {
      res.status(400).json({ error: "Tidak bisa menghapus akun sendiri." });
      return;
    }

    await supabase.from("invitations").update({ owner_id: null }).eq("owner_id", id);
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) throw error;

    res.json({ message: "User berhasil dihapus." });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Gagal menghapus user." });
  }
});

// GET /api/auth/users/:id/invitations
router.get("/users/:id/invitations", requireAuth, requireAdmin, async (req, res) => {
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
