import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import supabase from "../database";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "undangan-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d";

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

function generateToken(user: AuthUser): string {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role, max_invitations: user.max_invitations },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

function generateRandomString(length: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ============ Middleware ============

export function requireAuth(req: any, res: any, next: any): void {
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

export function requireAdmin(req: any, res: any, next: any): void {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ error: "Akses ditolak. Hanya admin yang diizinkan." });
    return;
  }
  next();
}

// ============ Routes ============

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: "Username dan password wajib diisi." });
      return;
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username.trim().toLowerCase())
      .single();

    if (error || !user) {
      res.status(401).json({ error: "Username atau password salah." });
      return;
    }

    const validPassword = await comparePassword(password, user.password_hash);
    if (!validPassword) {
      res.status(401).json({ error: "Username atau password salah." });
      return;
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
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Tidak terautentikasi." });
      return;
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("id, username, role, max_invitations")
      .eq("id", req.user.id)
      .single();

    if (error || !user) {
      res.status(401).json({ error: "User tidak ditemukan." });
      return;
    }

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

// POST /api/auth/seed-admin
router.post("/seed-admin", async (_req, res) => {
  try {
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("username", "admin")
      .single();

    if (existing) {
      res.json({ message: "Admin sudah ada.", id: existing.id });
      return;
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
});

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
    if (password) updateData.password_hash = await hashPassword(password);

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
