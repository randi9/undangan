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
  process.env.SUPABASE_VITE_SUPABASE_URL ||
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
app.get("/api/invitations", requireAuth, async (req: any, res: any) => {
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

// GET /api/invitations/check-slug/:slug — Check if a slug is available
app.get("/api/invitations/check-slug/:slug", async (req: any, res: any) => {
  try {
    const slug = req.params.slug;
    const excludeId = req.query.exclude_id;
    
    let query = supabase.from("invitations").select("id").eq("slug", slug);
    if (excludeId) {
      query = query.neq("id", excludeId);
    }
    
    const { data } = await query.single();
    
    // If data exists, it's taken. If not, it's available.
    res.json({ available: !data });
  } catch (err: any) {
    // If the error is PGRST116 (0 rows returned), it means it's available! 
    // Supabase .single() throws an error instead of returning null if no rows match.
    if (err.code === "PGRST116") {
      return res.json({ available: true });
    }
    res.status(500).json({ error: "Gagal mengecek ketersediaan slug." });
  }
});

// GET by slug (public — with view tracking & trial enforcement)
app.get("/api/invitations/slug/:slug", async (req: any, res: any) => {
  try {
    const { data: invitation, error } = await supabase
      .from("invitations")
      .select("*")
      .eq("slug", req.params.slug)
      .single();
    if (error || !invitation) return res.status(404).json({ error: "Invitation not found" });

    // --- Trial / Payment enforcement ---
    const paymentStatus = invitation.payment_status || "paid";
    const isTrial = paymentStatus === "trial";
    let showWatermark = false;
    let trialExpired = false;
    let viewsExhausted = false;

    if (isTrial) {
      // Check trial expiration
      if (invitation.trial_expires_at && new Date(invitation.trial_expires_at) < new Date()) {
        trialExpired = true;
      }

      // Check view count limit
      const maxViews = invitation.max_views || 20;
      if ((invitation.view_count || 0) >= maxViews) {
        viewsExhausted = true;
      }

      // Block access if trial expired OR views exhausted
      if (trialExpired || viewsExhausted) {
        return res.status(403).json({
          error: trialExpired
            ? "Masa trial undangan ini telah berakhir. Silakan upgrade ke paket premium."
            : "Batas akses trial (20x) telah tercapai. Silakan upgrade ke paket premium.",
          trial_expired: trialExpired,
          views_exhausted: viewsExhausted,
          payment_required: true,
        });
      }

      showWatermark = true;

      // Track view — only for non-preview requests
      const isPreview = req.query.preview === "true";
      if (!isPreview) {
        const viewerIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip || "unknown";
        await supabase.from("invitation_views").insert([{
          invitation_id: invitation.id,
          viewer_ip: viewerIp,
        }]);
        // Increment view_count on the invitation
        await supabase
          .from("invitations")
          .update({ view_count: (invitation.view_count || 0) + 1 })
          .eq("id", invitation.id);
      }
    } else if (paymentStatus === "paid" && invitation.paid_at) {
      // Periksa batas 1 tahun dari tanggal pembayaran
      const paidDate = new Date(invitation.paid_at);
      const expireDate = new Date(paidDate);
      expireDate.setFullYear(expireDate.getFullYear() + 1);
      
      const now = new Date();
      if (now > expireDate) {
        return res.status(403).json({
          error: "Masa aktif undangan (1 tahun) telah berakhir.",
          payment_required: true,
          expired: true,
        });
      }
    }

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

    res.json({
      ...invitation,
      photos: photos || [],
      rsvps: rsvps || [],
      // Trial metadata for frontend
      is_trial: isTrial,
      show_watermark: showWatermark,
      trial_expired: trialExpired,
      views_exhausted: viewsExhausted,
      views_remaining: isTrial ? Math.max(0, (invitation.max_views || 20) - (invitation.view_count || 0) - 1) : null,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch invitation" });
  }
});

// GET by ID (protected)
app.get("/api/invitations/:id", requireAuth, async (req: any, res: any) => {
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
app.post("/api/invitations", requireAuth, async (req: any, res: any) => {
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

    // Determine payment status — check user account premium (users.paid_at)
    let isUserPremium = false;
    let userPaidAt: string | null = null;

    // 1. Check users.paid_at directly (most reliable, survives invitation deletion)
    const { data: userRecord } = await supabase
      .from('users')
      .select('paid_at')
      .eq('id', req.user!.id)
      .single();

    if (userRecord?.paid_at) {
      const paidDate = new Date(userRecord.paid_at);
      const expireDate = new Date(paidDate);
      expireDate.setFullYear(expireDate.getFullYear() + 1);
      if (new Date() <= expireDate) {
        isUserPremium = true;
        userPaidAt = userRecord.paid_at;
      }
    }

    // 2. Fallback: check payment_logs by user_id (for legacy data)
    if (!isUserPremium) {
      const { data: pastPayments } = await supabase
        .from('payment_logs')
        .select('paid_at')
        .eq('user_id', req.user!.id)
        .eq('status', 'paid')
        .order('paid_at', { ascending: false })
        .limit(1);

      if (pastPayments && pastPayments.length > 0) {
        const lastPaidAt = new Date(pastPayments[0].paid_at);
        const expireDate = new Date(lastPaidAt);
        expireDate.setFullYear(expireDate.getFullYear() + 1);
        if (new Date() <= expireDate) {
          isUserPremium = true;
          userPaidAt = pastPayments[0].paid_at;
          // Backfill users.paid_at for future checks
          await supabase.from('users').update({ paid_at: userPaidAt }).eq('id', req.user!.id);
        }
      }
    }

    const isAdminCreated = req.user!.user_source === "admin_created" || req.user!.role === "admin";
    const paymentStatus = (isAdminCreated || isUserPremium) ? "paid" : "trial";
    const trialExpiresAt = (isAdminCreated || isUserPremium) ? null : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();

    console.log(`[Create Invitation] User ${req.user!.id} premium=${isUserPremium}, paidAt=${userPaidAt}, status=${paymentStatus}`);

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
      // Payment / Trial fields
      payment_status: paymentStatus,
      paid_at: isUserPremium ? userPaidAt : (isAdminCreated ? new Date().toISOString() : null),
      trial_expires_at: trialExpiresAt,
      view_count: 0,
      max_views: 20,
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
app.put("/api/invitations/:id", requireAuth, async (req: any, res: any) => {
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
app.delete("/api/invitations/:id", requireAuth, async (req: any, res: any) => {
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

    // 4. Preserve payment history — detach payment_logs from this invitation
    //    so the user's premium status survives invitation deletion
    await supabase.from("payment_logs").update({ invitation_id: null }).eq("invitation_id", id);

    // 5. Delete related DB records
    await supabase.from("invitation_views").delete().eq("invitation_id", id);
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

app.get("/api/rsvp/:invitationId", async (req: any, res: any) => {
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

app.post("/api/rsvp", async (req: any, res: any) => {
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
//  PAYMENT — Mayar.id Integration
// =============================================================

const MAYAR_API_BASE = process.env.MAYAR_API_BASE || "https://api.mayar.id/hl/v1";
const MAYAR_API_KEY = process.env.MAYAR_API_KEY || "";
const PAYMENT_AMOUNT = 50000; // Rp 50.000

// Mayar product payment link — set via env or use default from dashboard
const MAYAR_PAYMENT_LINK = process.env.MAYAR_PAYMENT_LINK || "https://mengundanganda.myr.id/pl/mengundang-anda-premium-akses";

// POST /api/payment/create-invoice — Redirect user to Mayar payment page
app.post("/api/payment/create-invoice", requireAuth, async (req: any, res: any) => {
  try {
    const { invitation_id } = req.body;
    if (!invitation_id) return res.status(400).json({ error: "invitation_id wajib diisi." });

    // Verify invitation belongs to user
    const { data: invitation } = await supabase
      .from("invitations").select("*").eq("id", invitation_id).single();
    if (!invitation) return res.status(404).json({ error: "Undangan tidak ditemukan." });
    if (invitation.owner_id !== req.user!.id && req.user!.role !== "admin") {
      return res.status(403).json({ error: "Akses ditolak." });
    }
    if (invitation.payment_status === "paid") {
      return res.status(400).json({ error: "Undangan ini sudah dalam status PAID." });
    }

    // Build payment URL with invitation tracking
    // Append invitation_id as query param so we can track it
    const paymentUrl = `${MAYAR_PAYMENT_LINK}?invitation_id=${invitation_id}`;

    // Save to payment_logs for tracking
    await supabase.from("payment_logs").upsert([{
      invitation_id,
      user_id: req.user!.id,
      amount: PAYMENT_AMOUNT,
      status: "pending",
      mayar_payment_url: paymentUrl,
      mayar_invoice_id: `pending:${invitation_id}`,
    }], { onConflict: "invitation_id" }).select();

    console.log(`[Payment] Redirecting to Mayar: ${paymentUrl}`);

    res.json({
      payment_url: paymentUrl,
      invoice_id: `pending:${invitation_id}`,
      amount: PAYMENT_AMOUNT,
      status: "created",
    });
  } catch (err: any) {
    console.error("Create invoice error:", err);
    res.status(500).json({ error: err.message || "Gagal membuat invoice." });
  }
});

// POST /api/payment/verify-license — Verify Mayar redirect (works for both Membership and Payment Link)
// When user pays via Mayar, they get redirected back with ?licenseCode=... or ?transaction_id=...
app.post("/api/payment/verify-license", requireAuth, async (req: any, res: any) => {
  try {
    // Get either licenseCode (Membership) or transaction_id / id (Payment Link)
    const { licenseCode, transaction_id, id, invitation_id: fallbackInvId, productId, email } = req.body;
    const paymentIdentifier = licenseCode || transaction_id || id || fallbackInvId;
    
    if (!paymentIdentifier) {
      return res.status(400).json({ error: "Parameter identitas pembayaran (licenseCode/transaction_id/invitation_id) tidak ditemukan." });
    }

    console.log(`[Payment] Verifying payment token: ${paymentIdentifier}, product: ${productId || 'unknown'}, email: ${email || 'unknown'}`);

    // Find the user's invitation that is still in trial/pending
    // Priority: check fallbackInvId first, then payment_logs for pending, then find trial invitations
    let invitationId: string | null = fallbackInvId || null;

    // 1. Check payment_logs for this user's pending payment
    if (!invitationId) {
      const { data: pendingLog } = await supabase
        .from("payment_logs")
        .select("invitation_id")
        .eq("user_id", req.user!.id)
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (pendingLog) {
        invitationId = pendingLog.invitation_id;
      }
    }

    // 2. If no pending log, find user's trial invitation
    if (!invitationId) {
      const { data: trialInvitation } = await supabase
        .from("invitations")
        .select("id")
        .eq("owner_id", req.user!.id)
        .eq("payment_status", "trial")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (trialInvitation) {
        invitationId = trialInvitation.id;
      }
    }

    if (!invitationId) {
      return res.status(404).json({ error: "Tidak ada undangan yang menunggu pembayaran." });
    }

    // Check if already paid (avoid double update)
    const { data: invitation } = await supabase
      .from("invitations")
      .select("id, payment_status")
      .eq("id", invitationId)
      .single();

    if (invitation?.payment_status === "paid") {
      return res.json({ status: "already_paid", message: "Undangan sudah berstatus PAID.", invitation_id: invitationId });
    }

    const now = new Date().toISOString();

    // Mark user account as premium
    await supabase.from('users').update({ paid_at: now }).eq('id', req.user!.id);

    // Update ALL user's invitations to paid
    await supabase.from("invitations").update({
      payment_status: "paid",
      paid_at: now,
      mayar_invoice_id: `license:${paymentIdentifier}`,
    }).eq("owner_id", req.user!.id);

    // Update payment log
    await supabase.from("payment_logs").upsert([{
      invitation_id: invitationId,
      user_id: req.user!.id,
      amount: PAYMENT_AMOUNT,
      status: "paid",
      paid_at: now,
      mayar_invoice_id: `license:${paymentIdentifier}`,
      webhook_payload: { paymentIdentifier, productId, email, method: "license_verify" },
    }], { onConflict: "invitation_id" });

    console.log(`[Payment] ✅ License verified! Invitation ${invitationId} → PAID (token: ${paymentIdentifier})`);
    
    res.json({ 
      status: "ok", 
      message: "Pembayaran berhasil diverifikasi!", 
      invitation_id: invitationId,
    });
  } catch (err: any) {
    console.error("Verify license error:", err);
    res.status(500).json({ error: err.message || "Gagal verifikasi pembayaran." });
  }
});

// POST /api/payment/webhook — Mayar webhook callback (public, no auth)
app.post("/api/payment/webhook", async (req: any, res: any) => {
  try {
    const body = req.body;
    console.log("[Mayar Webhook] ===== INCOMING =====");
    console.log("[Mayar Webhook] Full payload:", JSON.stringify(body));
    
    const event = body.event || body.type || "unknown";
    const data = body.data || body;
    
    console.log(`[Mayar Webhook] Event: ${event}`);

    // Accept ANY event that could mean a payment was made
    // Mayar sends different events for different product types:
    // - "payment.received" for invoices
    // - "purchase" for product purchases  
    // - "new.membership" / "membership.created" for memberships
    // We handle them ALL the same way
    const isPaymentEvent = [
      "payment.received", "payment.success", "payment.completed",
      "purchase", "purchase.completed",
      "new.membership", "membership.created", "membership.new",
    ].includes(event) || event.includes("payment") || event.includes("purchase") || event.includes("membership");

    // Also treat any webhook with data as potentially valid
    // (Mayar might send events we don't know about)
    if (isPaymentEvent || data) {
      const now = new Date().toISOString();
      
      // Try to extract invitation_id from various places in the payload
      let invitationId: string | null = null;
      const invoiceId = data.id || data.invoiceId || data.transactionId || data.transaction_id;
      
      // 1. Check if custom fields have invitation_id
      if (data.customFields?.invitation_id) {
        invitationId = data.customFields.invitation_id;
      }
      if (data.custom_fields?.invitation_id) {
        invitationId = data.custom_fields.invitation_id;
      }
      // Check in metadata too
      if (data.metadata?.invitation_id) {
        invitationId = data.metadata.invitation_id;
      }
      
      // 2. Check any URL fields for invitation_id param
      const urlFields = [
        data.redirectUrl, data.redirect_url, data.redirectURL,
        data.link, data.linkUrl, data.link_url,
        data.successUrl, data.success_url,
      ].filter(Boolean);
      
      for (const url of urlFields) {
        if (url && url.includes("invitation_id=")) {
          const match = url.match(/invitation_id=([a-f0-9-]+)/i);
          if (match) {
            invitationId = match[1];
            break;
          }
        }
      }

      // 3. Check payment_logs for the most recent pending entry
      if (!invitationId) {
        const { data: logs } = await supabase
          .from("payment_logs")
          .select("invitation_id")
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(1);
        
        if (logs && logs.length > 0) {
          invitationId = logs[0].invitation_id;
          console.log(`[Mayar Webhook] Matched to latest pending payment: ${invitationId}`);
        }
      }

      // 4. Try matching by mayar_invoice_id
      if (!invitationId && invoiceId) {
        const { data: inv } = await supabase
          .from("invitations")
          .select("id")
          .eq("mayar_invoice_id", invoiceId)
          .single();
        if (inv) invitationId = inv.id;
      }

      // Always log the webhook
      if (!invitationId) {
        console.warn("[Mayar Webhook] Could not determine invitation_id from payload");
        await supabase.from("payment_logs").insert([{
          invitation_id: null,
          user_id: null,
          amount: data.amount || data.total || PAYMENT_AMOUNT,
          status: "unmatched",
          mayar_invoice_id: invoiceId || `unmatched:${Date.now()}`,
          webhook_payload: body,
        }]);
        return res.json({ status: "logged", reason: "no_matching_invitation", event });
      }

      // Fetch owner_id to update all invitations for this user
      const { data: invOwner } = await supabase.from("invitations").select("owner_id").eq("id", invitationId).single();

      if (invOwner) {
        // Mark user account as premium
        await supabase.from('users').update({ paid_at: now }).eq('id', invOwner.owner_id);

        // Update ALL user's invitations to paid
        await supabase.from("invitations").update({
          payment_status: "paid",
          paid_at: now,
          mayar_invoice_id: invoiceId || null,
        }).eq("owner_id", invOwner.owner_id);
      } else {
        await supabase.from("invitations").update({
          payment_status: "paid",
          paid_at: now,
          mayar_invoice_id: invoiceId || null,
        }).eq("id", invitationId);
      }

      // Update or insert payment log — include user_id so premium persists after deletion
      await supabase.from("payment_logs").upsert([{
        invitation_id: invitationId,
        user_id: invOwner?.owner_id || null,
        amount: data.amount || data.total || PAYMENT_AMOUNT,
        status: "paid",
        paid_at: now,
        mayar_invoice_id: invoiceId || `webhook:${Date.now()}`,
        webhook_payload: body,
      }], { onConflict: "invitation_id" });

      console.log(`[Mayar Webhook] ✅ Payment confirmed for invitation: ${invitationId} (event: ${event})`);
      return res.json({ status: "ok", updated: true, invitation_id: invitationId, event });
    }

    console.log(`[Mayar Webhook] Unhandled event: ${event}`);
    res.json({ status: "ok", event });
  } catch (err: any) {
    console.error("Webhook error:", err);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});

// GET /api/payment/status/:invitationId — Check payment status
app.get("/api/payment/status/:invitationId", requireAuth, async (req: any, res: any) => {
  try {
    const { data: invitation } = await supabase
      .from("invitations")
      .select("id, payment_status, trial_expires_at, view_count, max_views, mayar_invoice_id, paid_at, owner_id")
      .eq("id", req.params.invitationId)
      .single();

    if (!invitation) return res.status(404).json({ error: "Undangan tidak ditemukan." });
    if (invitation.owner_id !== req.user!.id && req.user!.role !== "admin") {
      return res.status(403).json({ error: "Akses ditolak." });
    }

    const isTrial = invitation.payment_status === "trial";
    const trialExpired = isTrial && invitation.trial_expires_at && new Date(invitation.trial_expires_at) < new Date();
    const viewsExhausted = isTrial && (invitation.view_count || 0) >= (invitation.max_views || 20);

    // Compute trial time remaining
    let trialTimeRemaining = null;
    if (isTrial && invitation.trial_expires_at && !trialExpired) {
      const remaining = new Date(invitation.trial_expires_at).getTime() - Date.now();
      trialTimeRemaining = {
        hours: Math.floor(remaining / (1000 * 60 * 60)),
        minutes: Math.floor((remaining / (1000 * 60)) % 60),
      };
    }

    res.json({
      ...invitation,
      is_trial: isTrial,
      trial_expired: !!trialExpired,
      views_exhausted: !!viewsExhausted,
      views_remaining: isTrial ? Math.max(0, (invitation.max_views || 20) - (invitation.view_count || 0)) : null,
      trial_time_remaining: trialTimeRemaining,
      amount: PAYMENT_AMOUNT,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Gagal cek status pembayaran." });
  }
});

// POST /api/payment/confirm — Admin manually confirms payment
app.post("/api/payment/confirm", requireAuth, async (req: any, res: any) => {
  try {
    if (req.user!.role !== "admin") {
      return res.status(403).json({ error: "Hanya admin yang bisa konfirmasi pembayaran." });
    }

    const { invitation_id } = req.body;
    if (!invitation_id) return res.status(400).json({ error: "invitation_id wajib diisi." });

    const { data: invitation } = await supabase
      .from("invitations")
      .select("id, payment_status, owner_id")
      .eq("id", invitation_id)
      .single();

    if (!invitation) return res.status(404).json({ error: "Undangan tidak ditemukan." });
    if (invitation.payment_status === "paid") {
      return res.json({ status: "already_paid", message: "Undangan sudah berstatus PAID." });
    }

    const now = new Date().toISOString();

    // Mark user account as premium
    await supabase.from('users').update({ paid_at: now }).eq('id', invitation.owner_id);

    await supabase.from("invitations").update({
      payment_status: "paid",
      paid_at: now,
    }).eq("owner_id", invitation.owner_id);

    // Log the manual confirmation
    await supabase.from("payment_logs").upsert([{
      invitation_id,
      user_id: req.user!.id,
      amount: PAYMENT_AMOUNT,
      status: "paid",
      paid_at: now,
      mayar_invoice_id: `manual:${Date.now()}`,
      webhook_payload: { confirmed_by: req.user!.id, method: "admin_manual" },
    }], { onConflict: "invitation_id" });

    console.log(`[Payment] ✅ Admin manually confirmed payment for: ${invitation_id}`);
    res.json({ status: "ok", message: "Pembayaran berhasil dikonfirmasi." });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Gagal konfirmasi pembayaran." });
  }
});

// =============================================================
//  VOUCHER — Shopee Voucher System
// =============================================================

function generateVoucherCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I,O,0,1 to avoid confusion
  let code = "MA-";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// POST /api/vouchers/generate — Admin generates voucher(s)
app.post("/api/vouchers/generate", requireAuth, async (req: any, res: any) => {
  try {
    if (req.user!.role !== "admin") {
      return res.status(403).json({ error: "Hanya admin yang bisa generate voucher." });
    }

    const count = Math.min(Math.max(1, Number(req.body.count) || 1), 50); // max 50 per batch
    const note = req.body.note || "";

    const vouchers = [];
    for (let i = 0; i < count; i++) {
      vouchers.push({
        code: generateVoucherCode(),
        status: "active",
        note,
      });
    }

    const { data, error } = await supabase
      .from("vouchers")
      .insert(vouchers)
      .select("id, code, status, note, created_at");

    if (error) throw error;

    res.status(201).json({
      message: `${count} voucher berhasil dibuat.`,
      vouchers: data,
    });
  } catch (err: any) {
    console.error("Generate voucher error:", err);
    res.status(500).json({ error: err.message || "Gagal membuat voucher." });
  }
});

// POST /api/vouchers/redeem — User redeems voucher for an invitation
app.post("/api/vouchers/redeem", requireAuth, async (req: any, res: any) => {
  try {
    const { code, invitation_id } = req.body;
    if (!code || !invitation_id) {
      return res.status(400).json({ error: "Kode voucher dan invitation_id wajib diisi." });
    }

    const cleanCode = code.trim().toUpperCase();

    // Find voucher
    const { data: voucher } = await supabase
      .from("vouchers")
      .select("*")
      .eq("code", cleanCode)
      .single();

    if (!voucher) {
      return res.status(404).json({ error: "Kode voucher tidak ditemukan." });
    }
    if (voucher.status === "redeemed") {
      return res.status(400).json({ error: "Voucher sudah pernah digunakan." });
    }
    if (voucher.status === "expired") {
      return res.status(400).json({ error: "Voucher sudah kadaluarsa." });
    }

    // Verify invitation belongs to user
    const { data: invitation } = await supabase
      .from("invitations")
      .select("id, owner_id, payment_status")
      .eq("id", invitation_id)
      .single();

    if (!invitation) {
      return res.status(404).json({ error: "Undangan tidak ditemukan." });
    }
    if (invitation.owner_id !== req.user!.id && req.user!.role !== "admin") {
      return res.status(403).json({ error: "Akses ditolak." });
    }
    if (invitation.payment_status === "paid") {
      return res.status(400).json({ error: "Undangan ini sudah berstatus PAID." });
    }

    // Redeem: update voucher + update invitation
    const now = new Date().toISOString();

    await supabase.from("vouchers").update({
      status: "redeemed",
      redeemed_by: req.user!.id,
      redeemed_invitation_id: invitation_id,
      redeemed_at: now,
    }).eq("id", voucher.id);

    // Mark user account as premium
    await supabase.from('users').update({ paid_at: now }).eq('id', req.user!.id);

    await supabase.from("invitations").update({
      payment_status: "paid",
      paid_at: now,
    }).eq("owner_id", invitation.owner_id);

    // Also log in payment_logs
    await supabase.from("payment_logs").insert([{
      invitation_id,
      user_id: req.user!.id,
      amount: PAYMENT_AMOUNT,
      status: "paid",
      paid_at: now,
      mayar_invoice_id: `voucher:${cleanCode}`,
    }]);

    console.log(`[Voucher] ✅ Redeemed "${cleanCode}" for invitation ${invitation_id} by user ${req.user!.id}`);

    res.json({
      message: "Voucher berhasil digunakan! Undangan Anda sekarang Premium.",
      voucher_code: cleanCode,
      invitation_id,
      payment_status: "paid",
    });
  } catch (err: any) {
    console.error("Redeem voucher error:", err);
    res.status(500).json({ error: err.message || "Gagal redeem voucher." });
  }
});

// GET /api/vouchers — Admin list all vouchers
app.get("/api/vouchers", requireAuth, async (req: any, res: any) => {
  try {
    if (req.user!.role !== "admin") {
      return res.status(403).json({ error: "Akses ditolak." });
    }

    const { data, error } = await supabase
      .from("vouchers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Gagal memuat voucher." });
  }
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

// GET /api/payment/debug-premium — Debug why user is or isn't premium
app.get("/api/payment/debug-premium", requireAuth, async (req: any, res: any) => {
  try {
    const userId = req.user!.id;
    const checks: Record<string, any> = {};

    // 1. Check user record
    const { data: userRecord, error: userErr } = await supabase
      .from('users')
      .select('id, username, role, user_source, paid_at, max_invitations')
      .eq('id', userId)
      .single();
    checks.user_record = userErr ? { error: userErr.message } : userRecord;
    checks.user_has_paid_at_column = userRecord ? ('paid_at' in userRecord) : false;
    checks.user_paid_at_value = userRecord?.paid_at || null;

    // 2. Check payment_logs for this user
    const { data: paymentLogs, error: logErr } = await supabase
      .from('payment_logs')
      .select('id, invitation_id, user_id, status, paid_at, mayar_invoice_id, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);
    checks.payment_logs_by_user_id = logErr ? { error: logErr.message } : paymentLogs;
    checks.payment_logs_count = paymentLogs?.length || 0;

    // 3. Check ALL payment_logs (to see if any exist without user_id)
    const { data: allLogs, error: allLogErr } = await supabase
      .from('payment_logs')
      .select('id, invitation_id, user_id, status, paid_at, mayar_invoice_id')
      .order('created_at', { ascending: false })
      .limit(10);
    checks.all_recent_payment_logs = allLogErr ? { error: allLogErr.message } : allLogs;

    // 4. Check if users table has paid_at column by trying to update
    const { error: colErr } = await supabase
      .from('users')
      .select('paid_at')
      .eq('id', userId)
      .single();
    checks.paid_at_column_exists = !colErr || !colErr.message.includes('paid_at');
    if (colErr) checks.paid_at_column_error = colErr.message;

    // 5. Premium determination logic
    let isUserPremium = false;
    let premiumSource = 'none';

    if (userRecord?.paid_at) {
      const paidDate = new Date(userRecord.paid_at);
      const expireDate = new Date(paidDate);
      expireDate.setFullYear(expireDate.getFullYear() + 1);
      if (new Date() <= expireDate) {
        isUserPremium = true;
        premiumSource = 'users.paid_at';
      } else {
        premiumSource = 'users.paid_at_expired';
      }
    }

    if (!isUserPremium && paymentLogs && paymentLogs.length > 0) {
      const paidLogs = paymentLogs.filter((l: any) => l.status === 'paid' && l.paid_at);
      if (paidLogs.length > 0) {
        const lastPaidAt = new Date(paidLogs[0].paid_at);
        const expireDate = new Date(lastPaidAt);
        expireDate.setFullYear(expireDate.getFullYear() + 1);
        if (new Date() <= expireDate) {
          isUserPremium = true;
          premiumSource = 'payment_logs';
        }
      }
    }

    const isAdminCreated = req.user!.user_source === "admin_created" || req.user!.role === "admin";

    checks.result = {
      is_premium: isUserPremium,
      premium_source: premiumSource,
      is_admin_created: isAdminCreated,
      would_get_status: (isAdminCreated || isUserPremium) ? "paid" : "trial",
    };

    res.json(checks);
  } catch (err: any) {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

// Diagnostic endpoint to test POST pipeline on Vercel
app.post("/api/debug", async (req: any, res: any) => {
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
