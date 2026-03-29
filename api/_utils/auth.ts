// Auth middleware & helpers — Clerk Auth for Vercel Serverless
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";
import { clerkMiddleware, requireAuth as clerkRequireAuth, getAuth } from "@clerk/express";

// Re-use supabase client from env
const supabaseUrl = process.env.SUPABASE_URL || process.env.SUPABASE_VITE_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

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

// ============ Clerk Keys (pass explicitly for Vercel serverless) ============

const clerkKeys = {
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY || process.env.VITE_CLERK_PUBLISHABLE_KEY || "",
  secretKey: process.env.CLERK_SECRET_KEY || "",
};

export const clerkMw = clerkMiddleware(clerkKeys);

// ============ Middleware ============

// requireAuth: Clerk verifies the token, then we sync the user to Supabase
export const requireAuth = [
  clerkRequireAuth(clerkKeys),
  async (req: any, res: any, next: any) => {
    try {
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

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ error: "Akses ditolak. Hanya admin yang diizinkan." });
    return;
  }
  next();
}

// ============ Helpers ============

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

function generateRandomString(length: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ============ Auth Route Handlers ============

// POST /api/auth/login — Removed, Clerk handles login via frontend UI

// GET /api/auth/me
export async function meHandler(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Tidak terautentikasi." });
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
}

// ============ User Management (Admin) ============

export async function listUsersHandler(_req: Request, res: Response) {
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
}

export async function createUserHandler(req: Request, res: Response) {
  try {
    let { username, password, role, max_invitations } = req.body;

    if (!username) username = "user" + generateRandomString(6);
    if (!password) password = generateRandomString(10);

    username = username.trim().toLowerCase();
    role = role === "admin" ? "admin" : "user";
    max_invitations = Math.max(1, Number(max_invitations) || 3);

    const { data: existing } = await supabase.from("users").select("id").eq("username", username).single();
    if (existing) {
      return res.status(400).json({ error: "Username sudah digunakan." });
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
}

export async function updateUserHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { role, max_invitations, password, username } = req.body;

    const updateData: Record<string, any> = {};
    if (username) updateData.username = username.trim().toLowerCase();
    if (role !== undefined) updateData.role = role === "admin" ? "admin" : "user";
    if (max_invitations !== undefined) updateData.max_invitations = Math.max(1, Number(max_invitations));
    if (password) updateData.password_hash = await hashPassword(password);

    const { data: updated, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", id)
      .select("id, username, role, max_invitations")
      .single();

    if (error) throw error;
    if (!updated) return res.status(404).json({ error: "User tidak ditemukan." });

    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Gagal update user." });
  }
}

export async function deleteUserHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (req.user?.id === id) {
      return res.status(400).json({ error: "Tidak bisa menghapus akun sendiri." });
    }

    await supabase.from("invitations").update({ owner_id: null }).eq("owner_id", id);
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) throw error;

    res.json({ message: "User berhasil dihapus." });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Gagal menghapus user." });
  }
}

export async function getUserInvitationsHandler(req: Request, res: Response) {
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
}
