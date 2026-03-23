// Vercel Serverless Function — self-contained, no import from server/
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const app = express();

// CORS — allow semua origin di production (same-domain anyway via rewrite)
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10mb" }));

// --- Supabase Client ---
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
    const { slug, groom_name, bride_name } = req.body;
    if (!slug) return res.status(400).json({ error: "slug is required" });
    if (!groom_name) return res.status(400).json({ error: "groom_name is required" });
    if (!bride_name) return res.status(400).json({ error: "bride_name is required" });

    const id = uuidv4();
    const body = req.body;

    // Check slug uniqueness
    const { data: existing } = await supabase.from("invitations").select("id").eq("slug", slug).single();
    if (existing) return res.status(400).json({ error: "Slug sudah digunakan. Pilih slug lain." });

    const newInvitation = {
      id, slug,
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

// UPDATE
app.put("/api/invitations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data: existing } = await supabase.from("invitations").select("*").eq("id", id).single();
    if (!existing) return res.status(404).json({ error: "Invitation not found" });

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
      "quote", "bank_name", "bank_account", "bank_holder",
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
app.delete("/api/invitations/:id", async (req, res) => {
  try {
    const { error } = await supabase.from("invitations").delete().eq("id", req.params.id);
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
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, WebP, and GIF are allowed"));
    }
  },
});

async function uploadToSupabaseStorage(file: Express.Multer.File) {
  const ext = path.extname(file.originalname).replace(/[^a-zA-Z0-9.]/g, "") || ".jpg";
  const name = `${uuidv4()}${ext}`;
  const { error } = await supabase.storage.from("uploads").upload(name, file.buffer, { contentType: file.mimetype });
  if (error) throw error;
  const { data } = supabase.storage.from("uploads").getPublicUrl(name);
  return { url: data.publicUrl, filename: name };
}

app.post("/api/upload/single", upload.single("photo"), (req: express.Request, res: express.Response) => {
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

app.post("/api/upload/multiple", upload.array("photos", 20), (req: express.Request, res: express.Response) => {
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
  });
});

export default app;
