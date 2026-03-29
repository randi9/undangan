// Vercel Serverless Function — self-contained, no import from server/
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
import { S3Client, PutObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";
import {
  clerkMw, requireAuth, requireAdmin,
  meHandler,
  listUsersHandler, createUserHandler, updateUserHandler,
  deleteUserHandler, getUserInvitationsHandler,
} from "./_utils/auth.js";

// Use Node.js built-in randomUUID instead of `uuid` package
// uuid v13 is ESM-only and crashes in Vercel's CJS serverless runtime
const uuidv4 = () => randomUUID();

const app = express();

// CORS — support exact origins + wildcard subdomains (saya.*, slug.*)
const configuredOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const defaultOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  // Production domains — always allowed
  "https://mengundanganda.fun",
  "https://www.mengundanganda.fun",
];
const allowedOrigins = new Set([...defaultOrigins, ...configuredOrigins]);

// Extract base domains for subdomain matching
const baseDomains = ["mengundanganda.fun"];   // always allow *.mengundanganda.fun
for (const o of configuredOrigins) {
  try {
    const url = new URL(o);
    baseDomains.push(url.hostname);
  } catch {
    // skip invalid
  }
}

function isAllowedOrigin(origin: string): boolean {
  if (allowedOrigins.has(origin)) return true;
  try {
    const url = new URL(origin);
    for (const base of baseDomains) {
      if (url.hostname === base || url.hostname.endsWith(`.${base}`)) return true;
    }
  } catch {
    // invalid origin
  }
  return false;
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }
      // Don't throw — just reject. Throwing causes Express to return 500 HTML.
      callback(null, false);
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(clerkMw);

// --- Supabase Client ---
const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "";

if (!supabaseUrl || !supabaseKey) {
  console.error("⚠️  SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set!");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- S3/R2 Client ---
const r2AccountId = process.env.R2_ACCOUNT_ID || "";
const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID || "";
const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY || "";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: r2AccessKeyId,
    secretAccessKey: r2SecretAccessKey,
  },
});

// Guard: reject all /api/* requests early if Supabase is not configured
app.use("/api", (req, res, next) => {
  if (req.path === "/health") return next(); // allow health-check through
  if (!supabaseUrl || !supabaseKey) {
    return res.status(503).json({
      error: "Server belum dikonfigurasi. Hubungi admin (Supabase env vars missing).",
    });
  }
  next();
});

// =============================================================
//  AUTH ROUTES (Clerk handles login via frontend UI)
// =============================================================

app.get("/api/auth/me", requireAuth, meHandler);

// =============================================================
//  USER MANAGEMENT (Admin only) — under /api/auth/users to match frontend
// =============================================================

app.get("/api/auth/users", requireAuth, requireAdmin, listUsersHandler);
app.post("/api/auth/users", requireAuth, requireAdmin, createUserHandler);
app.put("/api/auth/users/:id", requireAuth, requireAdmin, updateUserHandler);
app.delete("/api/auth/users/:id", requireAuth, requireAdmin, deleteUserHandler);
app.get("/api/auth/users/:id/invitations", requireAuth, requireAdmin, getUserInvitationsHandler);

// =============================================================
//  INVITATIONS
// =============================================================

function parseLoveStory(value: unknown) {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

// GET all (protected — user sees own, admin sees all)
app.get("/api/invitations", requireAuth, async (req, res) => {
  try {
    let query = supabase
      .from("invitations")
      .select("*, photos(id), rsvps(id)")
      .order("created_at", { ascending: false });

    // Non-admin users only see their own invitations
    if (req.user!.role !== "admin") {
      query = query.eq("owner_id", req.user!.id);
    }

    const { data, error } = await query;
    if (error) throw error;
    const invitations = (data || []).map((i: any) => ({
      ...i,
      photo_count: i.photos?.length || 0,
      rsvp_count: i.rsvps?.length || 0,
    }));
    res.json(invitations);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch invitations" });
  }
});

// GET by slug
app.get("/api/invitations/slug/:slug", async (req, res) => {
  try {
    const { data: invitation, error } = await supabase
      .from("invitations")
      .select("*")
      .eq("slug", req.params.slug)
      .single();
    if (error || !invitation) return res.status(404).json({ error: "Invitation not found" });

    const { data: photos } = await supabase
      .from("photos")
      .select("*")
      .eq("invitation_id", invitation.id)
      .order("sort_order", { ascending: true });
    const { data: rsvps } = await supabase
      .from("rsvps")
      .select("*")
      .eq("invitation_id", invitation.id)
      .order("created_at", { ascending: false });

    res.json({ ...invitation, photos: photos || [], rsvps: rsvps || [] });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch invitation" });
  }
});

// GET by ID (protected)
app.get("/api/invitations/:id", requireAuth, async (req, res) => {
  try {
    const { data: invitation, error } = await supabase
      .from("invitations")
      .select("*")
      .eq("id", req.params.id)
      .single();
    if (error || !invitation) return res.status(404).json({ error: "Invitation not found" });

    // Non-admin can only access own invitations
    if (req.user!.role !== "admin" && invitation.owner_id !== req.user!.id) {
      return res.status(403).json({ error: "Akses ditolak." });
    }

    const { data: photos } = await supabase
      .from("photos")
      .select("*")
      .eq("invitation_id", invitation.id)
      .order("sort_order", { ascending: true });

    res.json({ ...invitation, photos: photos || [] });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch invitation" });
  }
});

// CREATE (protected + limit check)
app.post("/api/invitations", requireAuth, async (req, res) => {
  try {
    const { slug, groom_name, bride_name } = req.body;
    if (!slug) return res.status(400).json({ error: "slug is required" });
    if (!groom_name) return res.status(400).json({ error: "groom_name is required" });
    if (!bride_name) return res.status(400).json({ error: "bride_name is required" });

    // Enforce invitation limit for non-admin
    if (req.user!.role !== "admin") {
      const { count } = await supabase
        .from("invitations")
        .select("id", { count: "exact", head: true })
        .eq("owner_id", req.user!.id);
      if ((count || 0) >= req.user!.max_invitations) {
        return res.status(403).json({
          error: `Limit tercapai. Anda hanya bisa membuat ${req.user!.max_invitations} undangan.`,
        });
      }
    }

    const id = uuidv4();
    const body = req.body;

    // Check slug uniqueness
    const { data: existing } = await supabase.from("invitations").select("id").eq("slug", slug).single();
    if (existing) return res.status(400).json({ error: "Slug sudah digunakan. Pilih slug lain." });

    const newInvitation = {
      id, slug,
      owner_id: req.user!.id,
      theme: body.theme || "elegant",
      groom_name, bride_name,
      groom_full_name: body.groom_full_name || "",
      bride_full_name: body.bride_full_name || "",
      groom_father: body.groom_father || "",
      groom_mother: body.groom_mother || "",
      bride_father: body.bride_father || "",
      bride_mother: body.bride_mother || "",
      groom_photo: body.groom_photo || "",
      bride_photo: body.bride_photo || "",
      cover_photo: body.cover_photo || "",
      akad_date: body.akad_date || "",
      akad_time: body.akad_time || "",
      akad_venue: body.akad_venue || "",
      akad_address: body.akad_address || "",
      akad_map_url: body.akad_map_url || "",
      resepsi_date: body.resepsi_date || "",
      resepsi_time: body.resepsi_time || "",
      resepsi_venue: body.resepsi_venue || "",
      resepsi_address: body.resepsi_address || "",
      resepsi_map_url: body.resepsi_map_url || "",
      love_story: parseLoveStory(body.love_story) || [],
      quote: body.quote || "",
      bank_name: body.bank_name || "",
      bank_account: body.bank_account || "",
      bank_holder: body.bank_holder || "",
      music_url: body.music_url || "",
    };

    const { data: created, error: createError } = await supabase
      .from("invitations")
      .insert([newInvitation])
      .select()
      .single();
    if (createError) throw createError;

    if (body.photos && Array.isArray(body.photos) && body.photos.length > 0) {
      const dbPhotos = body.photos.map((p: any, index: number) => ({
        id: uuidv4(), invitation_id: id, url: p.url,
        caption: p.caption || "", sort_order: index,
      }));
      await supabase.from("photos").insert(dbPhotos);
    }

    res.status(201).json(created);
  } catch (err: any) {
    console.error("Create invitation error:", err);
    res.status(500).json({ error: err.message || "Failed to create invitation" });
  }
});

// UPDATE (protected)
app.put("/api/invitations/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { data: existing } = await supabase.from("invitations").select("*").eq("id", id).single();
    if (!existing) return res.status(404).json({ error: "Invitation not found" });

    // Non-admin can only edit own invitations
    if (req.user!.role !== "admin" && existing.owner_id !== req.user!.id) {
      return res.status(403).json({ error: "Akses ditolak." });
    }

    const body = req.body;

    if (body.slug && body.slug !== existing.slug) {
      const { data: slugExists } = await supabase
        .from("invitations").select("id").eq("slug", body.slug).neq("id", id).single();
      if (slugExists) return res.status(400).json({ error: "Slug sudah digunakan." });
    }

    const updateData: Record<string, any> = { updated_at: new Date().toISOString() };
    const fields = [
      "slug", "theme", "groom_name", "bride_name", "groom_full_name", "bride_full_name",
      "groom_father", "groom_mother", "bride_father", "bride_mother",
      "groom_photo", "bride_photo", "cover_photo",
      "akad_date", "akad_time", "akad_venue", "akad_address", "akad_map_url",
      "resepsi_date", "resepsi_time", "resepsi_venue", "resepsi_address", "resepsi_map_url",
      "quote", "bank_name", "bank_account", "bank_holder", "music_url",
    ];
    for (const f of fields) {
      if (body[f] !== undefined) updateData[f] = body[f];
    }
    if (body.love_story !== undefined) {
      updateData.love_story = parseLoveStory(body.love_story) ?? [];
    }

    const { data: updated, error: updateError } = await supabase
      .from("invitations").update(updateData).eq("id", id).select().single();
    if (updateError) throw updateError;

    if (body.photos && Array.isArray(body.photos)) {
      await supabase.from("photos").delete().eq("invitation_id", id);
      if (body.photos.length > 0) {
        const dbPhotos = body.photos.map((p: any, index: number) => ({
          id: p.id || uuidv4(), invitation_id: id, url: p.url,
          caption: p.caption || "", sort_order: index,
        }));
        await supabase.from("photos").insert(dbPhotos);
      }
    }

    res.json(updated);
  } catch (err: any) {
    console.error("Update invitation error:", err);
    res.status(500).json({ error: err.message || "Failed to update invitation" });
  }
});

// DELETE
app.delete("/api/invitations/:id", requireAuth, async (req, res) => {
  try {
    const id = req.params.id;

    // 1. Fetch invitation to get file URLs
    const { data: inv } = await supabase.from("invitations").select("*").eq("id", id).single();

    // Non-admin can only delete own invitations
    if (inv && req.user!.role !== "admin" && inv.owner_id !== req.user!.id) {
      return res.status(403).json({ error: "Akses ditolak." });
    }

    const { data: photos } = await supabase.from("photos").select("url").eq("invitation_id", id);

    // 2. Collect storage file names to delete
    const uploadsToDelete: string[] = [];
    const musicToDelete: string[] = [];

    const extractFileName = (url: string) => {
      if (!url) return null;
      const parts = url.split("/");
      return parts[parts.length - 1]; // last segment is the filename
    };

    if (inv) {
      for (const field of ["cover_photo", "groom_photo", "bride_photo"]) {
        const name = extractFileName((inv as any)[field]);
        if (name) uploadsToDelete.push(name);
      }
      const musicName = extractFileName(inv.music_url);
      if (musicName) musicToDelete.push(musicName);
    }

    if (photos) {
      for (const p of photos) {
        const name = extractFileName(p.url);
        if (name) uploadsToDelete.push(name);
      }
    }

    // 3. Delete files from Storage (best-effort, don't block on errors)
    if (uploadsToDelete.length > 0) {
      try {
        await s3Client.send(new DeleteObjectsCommand({
          Bucket: "uploads",
          Delete: { Objects: uploadsToDelete.map(Key => ({ Key })) }
        }));
      } catch (e) {
        console.error("R2 Delete Error:", e);
      }
    }
    if (musicToDelete.length > 0) {
      try {
        await s3Client.send(new DeleteObjectsCommand({
          Bucket: "music",
          Delete: { Objects: musicToDelete.map(Key => ({ Key })) }
        }));
      } catch (e) {
        console.error("R2 Delete Error:", e);
      }
    }

    // 4. Delete DB records
    await supabase.from("photos").delete().eq("invitation_id", id);
    await supabase.from("rsvps").delete().eq("invitation_id", id);
    const { error } = await supabase.from("invitations").delete().eq("id", id);
    if (error) throw error;

    res.json({ message: "Invitation deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to delete invitation" });
  }
});

// =============================================================
//  RSVP
// =============================================================

app.get("/api/rsvp/:invitationId", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("rsvps").select("*")
      .eq("invitation_id", req.params.invitationId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch RSVPs" });
  }
});

app.post("/api/rsvp", async (req, res) => {
  try {
    const { invitation_id, guest_name, attendance, guest_count, message } = req.body;
    if (!invitation_id || !guest_name || !attendance) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const { data, error } = await supabase
      .from("rsvps")
      .insert([{
        id: uuidv4(), invitation_id,
        guest_name: String(guest_name).trim(),
        attendance,
        guest_count: Math.min(10, Math.max(1, Number(guest_count) || 1)),
        message: typeof message === "string" ? message.trim() : "",
      }])
      .select().single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to submit RSVP" });
  }
});

// =============================================================
//  UPLOAD — via Multer memory storage → Supabase Storage
// =============================================================

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (["image/jpeg", "image/png", "image/webp", "image/gif", "audio/mpeg", "audio/aac", "audio/mp4", "audio/wav", "audio/ogg", "audio/x-m4a"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, WebP, GIF, and standard Audio formats are allowed"));
    }
  },
});

async function compressImage(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();
}

async function uploadToSupabaseStorage(file: Express.Multer.File) {
  const isImage = file.mimetype.startsWith("image/");

  let buffer = file.buffer;
  let ext = path.extname(file.originalname).replace(/[^a-zA-Z0-9.]/g, "") || ".jpg";
  let contentType = file.mimetype;

  if (isImage) {
    buffer = await compressImage(buffer);
    ext = ".webp";
    contentType = "image/webp";
  }

  const name = `${uuidv4()}${ext}`;
  const isMusic = file.mimetype.startsWith("audio/");
  const bucket = isMusic ? "music" : "uploads";
  
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: name,
    Body: buffer,
    ContentType: contentType,
  });

  await s3Client.send(command);

  const publicUrlBase = isMusic 
    ? process.env.R2_PUBLIC_URL_MUSIC || "https://music.mengundanganda.fun"
    : process.env.R2_PUBLIC_URL_UPLOADS || "https://media.mengundanganda.fun";
  
  const publicUrl = `${publicUrlBase}/${name}`;
  return { url: publicUrl, filename: name };
}

app.post("/api/upload/single", requireAuth, upload.single("photo"), (req: express.Request, res: express.Response) => {
  void (async () => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    try {
      const result = await uploadToSupabaseStorage(req.file);
      res.json(result);
    } catch (err: any) {
      console.error("Upload error:", err);
      res.status(500).json({ error: err.message || "Failed to upload file" });
    }
  })();
});

app.post("/api/upload/multiple", requireAuth, upload.array("photos", 20), (req: express.Request, res: express.Response) => {
  void (async () => {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) return res.status(400).json({ error: "No files uploaded" });
    try {
      const results = await Promise.all(files.map(uploadToSupabaseStorage));
      res.json(results);
    } catch (err: any) {
      console.error("Upload error:", err);
      res.status(500).json({ error: err.message || "Failed to upload files" });
    }
  })();
});

// =============================================================
//  HEALTH CHECK
// =============================================================

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    supabase_connected: !!(supabaseUrl && supabaseKey),
    supabase_url: supabaseUrl ? "✅" : "❌",
    node_version: process.version,
  });
});

// Diagnostic endpoint to test POST pipeline on Vercel
app.post("/api/debug", async (req, res) => {
  const checks: Record<string, string> = {};
  try {
    checks.body_parsed = req.body ? "ok" : "MISSING";
    checks.body_keys = req.body ? Object.keys(req.body).join(",") : "none";
    checks.uuid = uuidv4();
    // Quick DB connectivity test
    const { error } = await supabase.from("invitations").select("id").limit(1);
    checks.supabase_query = error ? `ERROR: ${error.message}` : "ok";
    res.json({ status: "ok", checks });
  } catch (err: any) {
    res.status(500).json({ status: "error", checks, error: err.message, stack: err.stack });
  }
});

// =============================================================
//  GLOBAL ERROR HANDLER — always return JSON, never HTML
// =============================================================
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

export default app;
