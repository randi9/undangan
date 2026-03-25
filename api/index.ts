// Vercel Serverless Function — self-contained, mirrors server/src logic exactly
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const app = express();

// =============================================================
//  CORS — support exact origins + wildcard subdomains
// =============================================================

const configuredOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const defaultOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
const allowedOrigins = new Set([...defaultOrigins, ...configuredOrigins]);

const baseDomains: string[] = [];
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
      if (url.hostname.endsWith(`.${base}`)) return true;
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
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));

// =============================================================
//  Supabase Client
// =============================================================

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.SUPABASE_VITE_SUPABASE_URL ||
  "";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.SUPABASE_VITE_SUPABASE_ANON_KEY ||
  "";

const supabase = createClient(supabaseUrl, supabaseKey);

// =============================================================
//  Shared helpers (mirrored from server/src/routes)
// =============================================================

function parseLoveStory(value: unknown) {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      throw new Error("love_story must be valid JSON array");
    }
  }
  throw new Error("love_story must be an array");
}

type ValidationResult = { ok: true } | { ok: false; error: string };

function validateInvitationPayload(
  body: any,
  isUpdate = false,
): ValidationResult {
  if (!isUpdate) {
    if (!body.slug || typeof body.slug !== "string")
      return { ok: false, error: "slug is required" };
    if (!body.groom_name || typeof body.groom_name !== "string")
      return { ok: false, error: "groom_name is required" };
    if (!body.bride_name || typeof body.bride_name !== "string")
      return { ok: false, error: "bride_name is required" };
  }

  if (body.slug !== undefined) {
    if (typeof body.slug !== "string" || !/^[a-z0-9-]+$/.test(body.slug)) {
      return { ok: false, error: "slug format is invalid" };
    }
  }

  if (
    body.theme !== undefined &&
    !["elegant", "minimalist", "floral"].includes(body.theme)
  ) {
    return { ok: false, error: "theme must be elegant, minimalist, or floral" };
  }

  if (body.photos !== undefined && !Array.isArray(body.photos)) {
    return { ok: false, error: "photos must be an array" };
  }

  if (Array.isArray(body.photos) && body.photos.length > 100) {
    return { ok: false, error: "photos exceeds maximum allowed items" };
  }

  return { ok: true };
}

const validAttendance = new Set(["hadir", "tidak_hadir"]);

function normalizeGuestCount(value: unknown): number {
  const num = Number(value);
  if (!Number.isFinite(num)) return 1;
  const rounded = Math.floor(num);
  return Math.min(10, Math.max(1, rounded));
}

// =============================================================
//  INVITATIONS
// =============================================================

// GET all
app.get("/api/invitations", async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("invitations")
      .select("*, photos(id), rsvps(id)")
      .order("created_at", { ascending: false });
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

// GET by ID
app.get("/api/invitations/:id", async (req, res) => {
  try {
    const { data: invitation, error } = await supabase
      .from("invitations")
      .select("*")
      .eq("id", req.params.id)
      .single();
    if (error || !invitation) return res.status(404).json({ error: "Invitation not found" });

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

// CREATE
app.post("/api/invitations", async (req, res) => {
  try {
    const validation = validateInvitationPayload(req.body);
    if (!validation.ok) {
      return res.status(400).json({ error: (validation as any).error });
    }

    const id = uuidv4();
    const {
      slug, theme,
      groom_name, bride_name,
      groom_full_name, bride_full_name,
      groom_father, groom_mother,
      bride_father, bride_mother,
      groom_photo, bride_photo, cover_photo,
      akad_date, akad_time, akad_venue, akad_address, akad_map_url,
      resepsi_date, resepsi_time, resepsi_venue, resepsi_address, resepsi_map_url,
      love_story, quote,
      bank_name, bank_account, bank_holder,
      music_url, photos,
    } = req.body;

    // Check slug uniqueness
    const { data: existing } = await supabase.from("invitations").select("id").eq("slug", slug).single();
    if (existing) return res.status(400).json({ error: "Slug sudah digunakan. Pilih slug lain." });

    const parsedLoveStory = parseLoveStory(love_story) || [];

    const newInvitation = {
      id, slug,
      theme: theme || "elegant",
      groom_name, bride_name,
      groom_full_name: groom_full_name || "",
      bride_full_name: bride_full_name || "",
      groom_father: groom_father || "",
      groom_mother: groom_mother || "",
      bride_father: bride_father || "",
      bride_mother: bride_mother || "",
      groom_photo: groom_photo || "",
      bride_photo: bride_photo || "",
      cover_photo: cover_photo || "",
      akad_date: akad_date || "",
      akad_time: akad_time || "",
      akad_venue: akad_venue || "",
      akad_address: akad_address || "",
      akad_map_url: akad_map_url || "",
      resepsi_date: resepsi_date || "",
      resepsi_time: resepsi_time || "",
      resepsi_venue: resepsi_venue || "",
      resepsi_address: resepsi_address || "",
      resepsi_map_url: resepsi_map_url || "",
      love_story: parsedLoveStory,
      quote: quote || "",
      bank_name: bank_name || "",
      bank_account: bank_account || "",
      bank_holder: bank_holder || "",
      music_url: music_url || "",
    };

    const { data: created, error: createError } = await supabase
      .from("invitations")
      .insert([newInvitation])
      .select()
      .single();
    if (createError) throw createError;

    if (photos && Array.isArray(photos) && photos.length > 0) {
      const dbPhotos = photos.map((p: any, index: number) => ({
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

// UPDATE
app.put("/api/invitations/:id", async (req, res) => {
  try {
    const validation = validateInvitationPayload(req.body, true);
    if (!validation.ok) {
      return res.status(400).json({ error: (validation as any).error });
    }

    const { id } = req.params;

    const { data: existing } = await supabase.from("invitations").select("*").eq("id", id).single();
    if (!existing) return res.status(404).json({ error: "Invitation not found" });

    const body = req.body as Record<string, any>;
    const slug = body.slug as string | undefined;
    const photos = body.photos as Array<any> | undefined;

    if (slug && slug !== existing.slug) {
      const { data: slugExists } = await supabase
        .from("invitations").select("id").eq("slug", slug).neq("id", id).single();
      if (slugExists) return res.status(400).json({ error: "Slug sudah digunakan." });
    }

    const updateData: Record<string, any> = { updated_at: new Date().toISOString() };

    const updatableFields = [
      "slug", "theme", "groom_name", "bride_name", "groom_full_name", "bride_full_name",
      "groom_father", "groom_mother", "bride_father", "bride_mother",
      "groom_photo", "bride_photo", "cover_photo",
      "akad_date", "akad_time", "akad_venue", "akad_address", "akad_map_url",
      "resepsi_date", "resepsi_time", "resepsi_venue", "resepsi_address", "resepsi_map_url",
      "quote", "bank_name", "bank_account", "bank_holder", "music_url",
    ];

    for (const field of updatableFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (body.love_story !== undefined) {
      updateData.love_story = parseLoveStory(body.love_story) ?? [];
    }

    const { data: updated, error: updateError } = await supabase
      .from("invitations").update(updateData).eq("id", id).select().single();
    if (updateError) throw updateError;

    if (photos && Array.isArray(photos)) {
      await supabase.from("photos").delete().eq("invitation_id", id);
      if (photos.length > 0) {
        const dbPhotos = photos.map((p: any, index: number) => ({
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
app.delete("/api/invitations/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Fetch invitation to get file URLs
    const { data: inv } = await supabase.from("invitations").select("*").eq("id", id).single();
    const { data: photos } = await supabase.from("photos").select("url").eq("invitation_id", id);

    // 2. Collect storage file names to delete
    const uploadsToDelete: string[] = [];
    const musicToDelete: string[] = [];

    const extractFileName = (url: string) => {
      if (!url) return null;
      const parts = url.split("/");
      return parts[parts.length - 1];
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

    // 3. Delete files from Storage (best-effort)
    if (uploadsToDelete.length > 0) {
      await supabase.storage.from("uploads").remove(uploadsToDelete).catch(() => {});
    }
    if (musicToDelete.length > 0) {
      await supabase.storage.from("music").remove(musicToDelete).catch(() => {});
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

    if (
      typeof guest_name !== "string" ||
      guest_name.trim().length < 2 ||
      guest_name.trim().length > 120
    ) {
      return res.status(400).json({ error: "guest_name is invalid" });
    }

    if (typeof attendance !== "string" || !validAttendance.has(attendance)) {
      return res.status(400).json({ error: "attendance must be hadir or tidak_hadir" });
    }

    if (
      message !== undefined &&
      (typeof message !== "string" || message.length > 1000)
    ) {
      return res.status(400).json({ error: "message is invalid" });
    }

    const { data, error } = await supabase
      .from("rsvps")
      .insert([{
        id: uuidv4(), invitation_id,
        guest_name: guest_name.trim(),
        attendance,
        guest_count: normalizeGuestCount(guest_count),
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

const allowedTypes = [
  "image/jpeg", "image/png", "image/webp", "image/gif",
  "audio/mpeg", "audio/aac", "audio/mp4", "audio/wav", "audio/ogg", "audio/x-m4a",
];

function isAllowedMime(mimeType: string) {
  return allowedTypes.includes(mimeType);
}

function isAudioMime(mimeType: string) {
  return mimeType.startsWith("audio/");
}

async function compressImage(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();
}

async function uploadBufferToStorage(file: Express.Multer.File) {
  const isImage = file.mimetype.startsWith("image/");

  let buffer = file.buffer;
  let ext = path.extname(file.originalname) || ".jpg";
  let contentType = file.mimetype;

  // Compress images to WebP
  if (isImage) {
    buffer = await compressImage(buffer);
    ext = ".webp";
    contentType = "image/webp";
  }

  const cleanExt = ext.replace(/[^a-zA-Z0-9.]/g, "") || ".jpg";
  const name = `${uuidv4()}${cleanExt}`;

  const bucket = isAudioMime(file.mimetype) ? "music" : "uploads";

  const { error } = await supabase.storage
    .from(bucket)
    .upload(name, buffer, { contentType });

  if (error) {
    console.error("Supabase storage upload error:", error);
    throw error;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(name);
  return { url: data.publicUrl, filename: name };
}

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB max
  },
  fileFilter: (_req, file, cb) => {
    if (isAllowedMime(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, WebP, GIF, and standard Audio formats are allowed"));
    }
  },
});

app.post("/api/upload/single", upload.single("photo"), (req: express.Request, res: express.Response) => {
  void (async () => {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    try {
      const uploaded = await uploadBufferToStorage(req.file);
      res.json(uploaded);
    } catch (err: any) {
      console.error("Upload single error:", err);
      res.status(500).json({ error: err.message || "Failed to upload file" });
    }
  })();
});

app.post("/api/upload/multiple", upload.array("photos", 20), (req: express.Request, res: express.Response) => {
  void (async () => {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ error: "No files uploaded" });
      return;
    }
    try {
      const uploaded = await Promise.all(files.map(uploadBufferToStorage));
      res.json(uploaded);
    } catch {
      res.status(500).json({ error: "Failed to upload files" });
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
  });
});

export default app;
