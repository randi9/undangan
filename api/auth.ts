// Auth middleware & helpers
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

const JWT_SECRET = process.env.JWT_SECRET || "undangan-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d";

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

// ============ Helpers ============

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role, max_invitations: user.max_invitations },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ============ Middleware ============

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token tidak ditemukan. Silakan login." });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Token tidak valid atau sudah expired." });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ error: "Akses ditolak. Hanya admin yang diizinkan." });
    return;
  }
  next();
}

// ============ Auth Route Handlers ============

export async function loginHandler(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username dan password wajib diisi." });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username.trim().toLowerCase())
      .single();

    if (error || !user) {
      return res.status(401).json({ error: "Username atau password salah." });
    }

    const validPassword = await comparePassword(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: "Username atau password salah." });
    }

    const authUser: AuthUser = {
      id: user.id,
      username: user.username,
      role: user.role,
      max_invitations: user.max_invitations,
    };

    const token = generateToken(authUser);
    res.json({ token, user: authUser });
  } catch (err: any) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Gagal login. Coba lagi." });
  }
}

export async function meHandler(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Tidak terautentikasi." });
    }

    // Refresh user data from DB
    const { data: user, error } = await supabase
      .from("users")
      .select("id, username, role, max_invitations")
      .eq("id", req.user.id)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: "User tidak ditemukan." });
    }

    // Count user's invitations
    const { count } = await supabase
      .from("invitations")
      .select("id", { count: "exact", head: true })
      .eq("owner_id", user.id);

    res.json({
      ...user,
      invitation_count: count || 0,
    });
  } catch (err: any) {
    console.error("Me error:", err);
    res.status(500).json({ error: "Gagal mengambil data user." });
  }
}

// Seed admin account (call once)
export async function seedAdminHandler(_req: Request, res: Response) {
  try {
    // Check if admin already exists
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("username", "admin")
      .single();

    if (existing) {
      return res.json({ message: "Admin sudah ada.", id: existing.id });
    }

    const passwordHash = await hashPassword("admin123");
    const { data: admin, error } = await supabase
      .from("users")
      .insert([{
        username: "admin",
        password_hash: passwordHash,
        role: "admin",
        max_invitations: 999,
      }])
      .select("id, username, role, max_invitations")
      .single();

    if (error) throw error;
    res.status(201).json({ message: "Admin berhasil dibuat.", user: admin, default_password: "admin123" });
  } catch (err: any) {
    console.error("Seed admin error:", err);
    res.status(500).json({ error: err.message || "Gagal membuat admin." });
  }
}

// ============ User Management (Admin) ============

export async function listUsersHandler(req: Request, res: Response) {
  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("id, username, role, max_invitations, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Get invitation counts per user
    const userIds = (users || []).map((u: any) => u.id);
    const counts: Record<string, number> = {};

    if (userIds.length > 0) {
      const { data: invData } = await supabase
        .from("invitations")
        .select("owner_id");

      if (invData) {
        for (const inv of invData) {
          if (inv.owner_id) {
            counts[inv.owner_id] = (counts[inv.owner_id] || 0) + 1;
          }
        }
      }
    }

    const result = (users || []).map((u: any) => ({
      ...u,
      invitation_count: counts[u.id] || 0,
    }));

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Gagal mengambil data user." });
  }
}

function generateRandomString(length: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function createUserHandler(req: Request, res: Response) {
  try {
    let { username, password, role, max_invitations } = req.body;

    // Auto-generate if not provided
    if (!username) username = "user" + generateRandomString(6);
    if (!password) password = generateRandomString(10);

    username = username.trim().toLowerCase();
    role = role === "admin" ? "admin" : "user";
    max_invitations = Math.max(1, Number(max_invitations) || 3);

    // Check uniqueness
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .single();

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

    // Return plain password only on creation (so admin can share)
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

    const updateData: Record<string, any> = { updated_at: new Date().toISOString() };
    if (username) updateData.username = username.trim().toLowerCase();
    if (role !== undefined) updateData.role = role === "admin" ? "admin" : "user";
    if (max_invitations !== undefined) updateData.max_invitations = Math.max(1, Number(max_invitations));
    if (password) updateData.password_hash = await hashPassword(password);

    const { data: updated, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", id)
      .select("id, username, role, max_invitations, updated_at")
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

    // Don't allow deleting yourself
    if (req.user?.id === id) {
      return res.status(400).json({ error: "Tidak bisa menghapus akun sendiri." });
    }

    // Set owner_id to null for orphaned invitations
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
