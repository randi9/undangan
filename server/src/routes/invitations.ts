import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import supabase from "../database";
import { requireAuth } from "./auth";

const router = Router();

type ValidationResult = { ok: true } | { ok: false; error: string };

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

// Get all invitations (protected — user sees own, admin sees all)
router.get("/", requireAuth, async (req: Request, res: Response) => {
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
    res
      .status(500)
      .json({ error: err.message || "Failed to fetch invitations" });
  }
});

// Get invitation by slug
router.get("/slug/:slug", async (req: Request, res: Response) => {
  try {
    const { data: invitation, error } = await supabase
      .from("invitations")
      .select("*")
      .eq("slug", req.params.slug)
      .single();

    if (error || !invitation) {
      return res.status(404).json({ error: "Invitation not found" });
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

    res.json({ ...invitation, photos: photos || [], rsvps: rsvps || [] });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: err.message || "Failed to fetch invitation" });
  }
});

// Get invitation by ID (protected)
router.get("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { data: invitation, error } = await supabase
      .from("invitations")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error || !invitation) {
      return res.status(404).json({ error: "Invitation not found" });
    }

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
    res
      .status(500)
      .json({ error: err.message || "Failed to fetch invitation" });
  }
});

// Create invitation (protected + limit check)
router.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const validation = validateInvitationPayload(req.body);
    if (!validation.ok) {
      return res.status(400).json({ error: (validation as any).error });
    }

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
    const {
      slug,
      theme,
      groom_name,
      bride_name,
      groom_full_name,
      bride_full_name,
      groom_father,
      groom_mother,
      bride_father,
      bride_mother,
      groom_photo,
      bride_photo,
      cover_photo,
      akad_date,
      akad_time,
      akad_venue,
      akad_address,
      akad_map_url,
      resepsi_date,
      resepsi_time,
      resepsi_venue,
      resepsi_address,
      resepsi_map_url,
      love_story,
      quote,
      bank_name,
      bank_account,
      bank_holder,
      music_url,
      gallery_type,
      photos,
      banks,
    } = req.body;

    // Check slug
    const { data: existing } = await supabase
      .from("invitations")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      return res
        .status(400)
        .json({ error: "Slug sudah digunakan. Pilih slug lain." });
    }

    const parsedLoveStory = parseLoveStory(love_story) || [];

    const newInvitation = {
      id,
      slug,
      owner_id: req.user!.id,
      theme: theme || "elegant",
      groom_name,
      bride_name,
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
      gallery_type: gallery_type || "carousel",
      // banks: Array.isArray(banks) ? banks : [],
    };

    const { data: created, error: createError } = await supabase
      .from("invitations")
      .insert([newInvitation])
      .select()
      .single();

    if (createError) throw createError;

    if (photos && Array.isArray(photos) && photos.length > 0) {
      const dbPhotos = photos.map((p: any, index: number) => ({
        id: uuidv4(),
        invitation_id: id,
        url: p.url,
        caption: p.caption || "",
        sort_order: index,
      }));

      await supabase.from("photos").insert(dbPhotos);
    }

    res.status(201).json(created);
  } catch (err: any) {
    console.error("Create invitation error:", err);
    res
      .status(500)
      .json({ error: err.message || "Failed to create invitation" });
  }
});

// Update invitation (protected)
router.put("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const validation = validateInvitationPayload(req.body, true);
    if (!validation.ok) {
      return res.status(400).json({ error: (validation as any).error });
    }

    const { id } = req.params;

    const { data: existing } = await supabase
      .from("invitations")
      .select("*")
      .eq("id", id)
      .single();

    if (!existing) {
      return res.status(404).json({ error: "Invitation not found" });
    }

    // Non-admin can only edit own invitations
    if (req.user!.role !== "admin" && existing.owner_id !== req.user!.id) {
      return res.status(403).json({ error: "Akses ditolak." });
    }

    const body = req.body as Record<string, any>;
    const slug = body.slug as string | undefined;
    const photos = body.photos as Array<any> | undefined;

    if (slug && slug !== existing.slug) {
      const { data: slugExists } = await supabase
        .from("invitations")
        .select("id")
        .eq("slug", slug)
        .neq("id", id)
        .single();

      if (slugExists) {
        return res.status(400).json({ error: "Slug sudah digunakan." });
      }
    }

    const updateData: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    const updatableFields = [
      "slug",
      "theme",
      "groom_name",
      "bride_name",
      "groom_full_name",
      "bride_full_name",
      "groom_father",
      "groom_mother",
      "bride_father",
      "bride_mother",
      "groom_photo",
      "bride_photo",
      "cover_photo",
      "akad_date",
      "akad_time",
      "akad_venue",
      "akad_address",
      "akad_map_url",
      "resepsi_date",
      "resepsi_time",
      "resepsi_venue",
      "resepsi_address",
      "resepsi_map_url",
      "quote",
      "bank_name",
      "bank_account",
      "bank_holder",
      "music_url",
      "gallery_type",
      // "banks",
    ];

    for (const field of updatableFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (body.love_story !== undefined) {
      updateData.love_story = parseLoveStory(body.love_story) ?? [];
    }

    console.log("[UPDATE] gallery_type from body:", body.gallery_type, "| in updateData:", updateData.gallery_type);

    const { data: updated, error: updateError } = await supabase
      .from("invitations")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (updateError) throw updateError;

    if (photos && Array.isArray(photos)) {
      await supabase.from("photos").delete().eq("invitation_id", id);

      if (photos.length > 0) {
        const dbPhotos = photos.map((p: any, index: number) => ({
          id: p.id || uuidv4(),
          invitation_id: id,
          url: p.url,
          caption: p.caption || "",
          sort_order: index,
        }));
        await supabase.from("photos").insert(dbPhotos);
      }
    }

    res.json(updated);
  } catch (err: any) {
    console.error("Update invitation error:", err);
    res
      .status(500)
      .json({ error: err.message || "Failed to update invitation" });
  }
});

// Delete invitation (protected)
router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

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

    // Extract R2 key from public URL (supports both flat "uuid.webp" and folder "slug/uuid.webp")
    const extractR2Key = (url: string) => {
      if (!url) return null;
      try {
        const parsed = new URL(url);
        return parsed.pathname.replace(/^\//, '') || null;
      } catch {
        const match = url.match(/\.fun\/(.+)$/) || url.match(/\.com\/(.+)$/);
        return match ? match[1] : url.split('/').pop() || null;
      }
    };

    if (inv) {
      for (const field of ["cover_photo", "groom_photo", "bride_photo"]) {
        const name = extractR2Key((inv as any)[field]);
        if (name) uploadsToDelete.push(name);
      }
      const musicName = extractR2Key(inv.music_url);
      if (musicName) musicToDelete.push(musicName);
    }

    if (photos) {
      for (const p of photos) {
        const name = extractR2Key(p.url);
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
    res
      .status(500)
      .json({ error: err.message || "Failed to delete invitation" });
  }
});

export default router;
