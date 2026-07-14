import { requireUser, requireUserOrClient, unauthorized } from "../shared/auth";
import { getEffectiveMethod, json } from "../shared/http";
import { deleteR2Url } from "../shared/storage";
import { rateLimit, getClientIp } from "../shared/rateLimit";
import { invitationCreateSchema, invitationUpdateSchema, validateBody } from "../shared/validation";
import { hydrateInvitation, stringifyJsonColumn, parseJsonColumn } from "../shared/db";
import type { ApiDispatcher } from "../types/api";

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

async function getUserPremiumState(db: D1Database, userId: string) {
  let isUserPremium = false;
  let userPaidAt: string | null = null;

  const userRecord = await db
    .prepare("SELECT paid_at FROM users WHERE id = ?")
    .bind(userId)
    .first<{ paid_at: string | null }>();

  if (userRecord?.paid_at) {
    const paidDate = new Date(userRecord.paid_at);
    const expireDate = new Date(paidDate);
    expireDate.setFullYear(expireDate.getFullYear() + 1);
    if (new Date() <= expireDate) {
      isUserPremium = true;
      userPaidAt = userRecord.paid_at;
    }
  }

  if (!isUserPremium) {
    const pastPayment = await db
      .prepare("SELECT paid_at FROM payment_logs WHERE user_id = ? AND status = 'paid' ORDER BY paid_at DESC LIMIT 1")
      .bind(userId)
      .first<{ paid_at: string }>();

    if (pastPayment) {
      const lastPaidAt = new Date(pastPayment.paid_at);
      const expireDate = new Date(lastPaidAt);
      expireDate.setFullYear(expireDate.getFullYear() + 1);
      if (new Date() <= expireDate) {
        isUserPremium = true;
        userPaidAt = pastPayment.paid_at;
        await db
          .prepare("UPDATE users SET paid_at = ? WHERE id = ?")
          .bind(userPaidAt, userId)
          .run();
      }
    }
  }

  return { isUserPremium, userPaidAt };
}

function getInvitationPaidAtValue(
  isUserPremium: boolean,
  userPaidAt: string | null,
  isAdminCreated: boolean,
) {
  if (isUserPremium) return userPaidAt;
  if (isAdminCreated) return new Date().toISOString();
  return null;
}

async function validateUniqueSlugOnUpdate(
  db: D1Database,
  id: string,
  slug: string | undefined,
  currentSlug: string,
) {
  if (!slug || slug === currentSlug) return null;
  const slugExists = await db
    .prepare("SELECT id FROM invitations WHERE slug = ? AND id != ?")
    .bind(slug, id)
    .first();
  return slugExists ? json({ error: "Slug sudah digunakan." }, 400) : null;
}

function buildInvitationUpdateData(body: any) {
  const updateData: any = { updated_at: new Date().toISOString() };
  const fields = [
    "slug", "theme", "groom_name", "bride_name", "groom_full_name", "bride_full_name",
    "groom_father", "groom_mother", "bride_father", "bride_mother", "groom_photo", "bride_photo",
    "cover_photo", "akad_date", "akad_time", "akad_venue", "akad_address", "akad_map_url",
    "resepsi_date", "resepsi_time", "resepsi_venue", "resepsi_address", "resepsi_map_url",
    "quote", "bank_name", "bank_account", "bank_holder", "music_url", "wa_message",
    "gallery_type", "streaming_enabled", "streaming_platform", "streaming_url", "khutbah_nikah",
    "gift_address", "gift_recipient", "gift_phone",
  ];

  for (const f of fields) {
    if (body[f] !== undefined) updateData[f] = body[f];
  }
  if (body.banks !== undefined) {
    updateData.banks = stringifyJsonColumn(body.banks);
  }
  if (body.love_story !== undefined) {
    updateData.love_story = stringifyJsonColumn(parseLoveStory(body.love_story) || []);
  }
  // Convert boolean to integer for SQLite
  if (updateData.streaming_enabled !== undefined) {
    updateData.streaming_enabled = updateData.streaming_enabled ? 1 : 0;
  }

  return updateData;
}

async function loadInvitationRelations(db: D1Database, invitationId: string) {
  const { results: photos } = await db
    .prepare("SELECT * FROM photos WHERE invitation_id = ? ORDER BY sort_order ASC")
    .bind(invitationId)
    .all();

  const { results: rsvps } = await db
    .prepare("SELECT * FROM rsvps WHERE invitation_id = ? ORDER BY created_at DESC")
    .bind(invitationId)
    .all();

  return { photos: photos || [], rsvps: rsvps || [] };
}

function buildInvitationLockResponse(invitation: any) {
  const paymentStatus = invitation.payment_status || "paid";
  const isTrial = paymentStatus === "trial";
  let showWatermark = false;
  let trialExpired = false;
  let viewsExhausted = false;

  if (isTrial) {
    if (
      invitation.trial_expires_at &&
      new Date(invitation.trial_expires_at) < new Date()
    ) {
      trialExpired = true;
    }
    const maxViews = invitation.max_views || 25;
    if ((invitation.view_count || 0) >= maxViews) {
      viewsExhausted = true;
    }
    showWatermark = true;
  } else if (paymentStatus === "paid" && invitation.paid_at) {
    const paidDate = new Date(invitation.paid_at);
    const expireDate = new Date(paidDate);
    expireDate.setFullYear(expireDate.getFullYear() + 1);
    if (new Date() > expireDate) {
      return {
        response: json(
          {
            error: "Masa aktif undangan (1 tahun) telah berakhir.",
            payment_required: true,
            expired: true,
          },
          403,
        ),
      };
    }
  }

  if (trialExpired || viewsExhausted) {
    return {
      response: json(
        {
          error: trialExpired
            ? "Masa free undangan ini telah berakhir. Silakan upgrade ke paket premium."
            : "Batas akses free (25x) telah tercapai. Silakan upgrade ke paket premium.",
          trial_expired: trialExpired,
          views_exhausted: viewsExhausted,
          payment_required: true,
        },
        403,
      ),
    };
  }

  return { isTrial, showWatermark, trialExpired, viewsExhausted };
}

async function bumpInvitationView(
  db: D1Database,
  invitation: any,
  request: Request,
) {
  const viewerIp = getClientIp(request);

  // Skip if IP is unknown (shouldn't count unidentifiable views)
  if (!viewerIp || viewerIp === "unknown") return;

  // Rate limit: 60 view bumps per IP per 10 minutes
  const limited = rateLimit(`view:${viewerIp}`, 60, 10 * 60 * 1000);
  if (limited) return;

  try {
    const existingView = await db
      .prepare(
        "SELECT id FROM invitation_views WHERE invitation_id = ? AND viewer_ip = ? AND viewed_at >= datetime('now', '-24 hours')"
      )
      .bind(invitation.id, viewerIp)
      .first();

    if (existingView) return;

    // Detect device type and referrer for analytics
    const ua = request.headers.get("user-agent") || "";
    const isMobile = /Mobile|Android|iPhone|iPad/i.test(ua);
    const referer = request.headers.get("referer") || "";

    await db.batch([
      db.prepare(
        "INSERT INTO invitation_views (invitation_id, viewer_ip, device_type, referer_url) VALUES (?, ?, ?, ?)"
      ).bind(invitation.id, viewerIp, isMobile ? "mobile" : "desktop", referer.slice(0, 500)),
      db.prepare(
        "UPDATE invitations SET view_count = view_count + 1 WHERE id = ?"
      ).bind(invitation.id),
    ]);
  } catch (err) {
    // Silently log — don't break the invitation view if analytics fails
    console.error("[bumpInvitationView] Error:", err);
  }
}

async function handleInvitationList(db: D1Database, request: Request, env: any) {
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();

  let invitations: any[];
  if ((user as any).role === "admin") {
    const { results } = await db
      .prepare("SELECT * FROM invitations ORDER BY created_at DESC")
      .all();
    invitations = results || [];
  } else {
    const { results } = await db
      .prepare("SELECT * FROM invitations WHERE owner_id = ? ORDER BY created_at DESC")
      .bind((user as any).id)
      .all();
    invitations = results || [];
  }

  // Load photo and rsvp counts
  const enriched = await Promise.all(
    invitations.map(async (inv: any) => {
      const photoCount = await db
        .prepare("SELECT COUNT(*) as cnt FROM photos WHERE invitation_id = ?")
        .bind(inv.id)
        .first<{ cnt: number }>();
      const rsvpCount = await db
        .prepare("SELECT COUNT(*) as cnt FROM rsvps WHERE invitation_id = ?")
        .bind(inv.id)
        .first<{ cnt: number }>();
      return {
        ...hydrateInvitation(inv),
        photo_count: photoCount?.cnt || 0,
        rsvp_count: rsvpCount?.cnt || 0,
      };
    }),
  );

  return json(enriched);
}

async function handleCheckSlug(
  db: D1Database,
  request: Request,
  pathname: string,
) {
  const slug = decodeURIComponent(
    pathname.slice("invitations/check-slug/".length),
  ).trim();
  if (!slug) return json({ error: "Slug wajib diisi" }, 400);

  const url = new URL(request.url);
  const excludeId = url.searchParams.get("exclude_id");

  let existing;
  if (excludeId) {
    existing = await db
      .prepare("SELECT id FROM invitations WHERE slug = ? AND id != ?")
      .bind(slug, excludeId)
      .first();
  } else {
    existing = await db
      .prepare("SELECT id FROM invitations WHERE slug = ?")
      .bind(slug)
      .first();
  }

  if (!existing) return json({ available: true });

  const prefixes = [
    "nikah-", "wedding-", "undangan-", "menikah-",
    `${new Date().getFullYear()}-`,
    `${Math.floor(Math.random() * 99) + 1}-`,
  ];
  const candidates = prefixes.map((p) => p + slug);

  const placeholders = candidates.map(() => "?").join(",");
  const { results: existingSlugs } = await db
    .prepare(`SELECT slug FROM invitations WHERE slug IN (${placeholders})`)
    .bind(...candidates)
    .all();

  const takenSlugs = new Set((existingSlugs || []).map((r: any) => r.slug));
  const suggestions = candidates
    .filter((candidate) => !takenSlugs.has(candidate))
    .slice(0, 3);

  return json({ available: false, suggestions });
}

async function handleInvitationBySlug(
  db: D1Database,
  request: Request,
  pathname: string,
) {
  const slug = decodeURIComponent(
    pathname.slice("invitations/slug/".length),
  ).trim();
  if (!slug) return json({ error: "Slug wajib diisi" }, 400);

  const invitation = await db
    .prepare("SELECT * FROM invitations WHERE slug = ?")
    .bind(slug)
    .first();

  if (!invitation) return json({ error: "Invitation not found" }, 404);

  const accessState = buildInvitationLockResponse(invitation);
  if ("response" in accessState && accessState.response)
    return accessState.response;

  const isPreview = new URL(request.url).searchParams.get("preview") === "true";
  if (!isPreview) {
    await bumpInvitationView(db, invitation, request);
  }

  const { photos, rsvps } = await loadInvitationRelations(db, invitation.id as string);

  // Strip sensitive fields from public response
  const {
    access_code: _ac,
    access_code_created_at: _acca,
    owner_id: _oid,
    mayar_invoice_id: _mii,
    ...publicInvitation
  } = invitation as any;

  // Filter out hidden RSVPs from public view
  const visibleRsvps = (rsvps || []).filter((r: any) => !r.is_hidden);

  return json({
    ...hydrateInvitation(publicInvitation),
    photos,
    rsvps: visibleRsvps,
    is_trial: (accessState as any).isTrial,
    show_watermark: (accessState as any).showWatermark,
    trial_expired: (accessState as any).trialExpired,
    views_exhausted: (accessState as any).viewsExhausted,
    views_remaining: (accessState as any).isTrial
      ? Math.max(
          0,
          ((invitation as any).max_views || 25) - ((invitation as any).view_count || 0) - 1,
        )
      : null,
  });
}

async function handleInvitationById(
  db: D1Database,
  request: Request,
  pathname: string,
  env: any,
) {
  const id = decodeURIComponent(pathname.slice("invitations/".length))
    .trim()
    .split("/")[0];
  const user = await requireUserOrClient(db, request, env);
  if (!user) return unauthorized();

  const invitation = await db
    .prepare("SELECT * FROM invitations WHERE id = ?")
    .bind(id)
    .first();

  if (!invitation) return json({ error: "Invitation not found" }, 404);
  
  const isClient = (user as any).role === "client";
  const isOwner = (invitation as any).owner_id === (user as any).id;
  const isWoInv = (user as any).role === "wo" && (invitation as any).wo_id === (user as any).id;

  if ((user as any).role !== "admin" && !isOwner && !isWoInv) {
    if (isClient && (invitation as any).id === (user as any).invitationId) {
      // Allowed client
    } else {
      return json({ error: "Akses ditolak." }, 403);
    }
  }

  const { results: photos } = await db
    .prepare("SELECT * FROM photos WHERE invitation_id = ? ORDER BY sort_order ASC")
    .bind(id)
    .all();

  return json({ ...hydrateInvitation(invitation), photos: photos || [] });
}

async function handleInvitationStats(
  db: D1Database,
  request: Request,
  pathname: string,
  env: any,
) {
  const id = decodeURIComponent(
    pathname.slice("invitations/".length).replace(/\/stats$/, ""),
  ).trim();
  const user = await requireUserOrClient(db, request, env);
  if (!user) return unauthorized();

  const invitation = await db
    .prepare("SELECT id, owner_id, wo_id, view_count FROM invitations WHERE id = ?")
    .bind(id)
    .first();

  if (!invitation) return json({ error: "Invitation not found" }, 404);
  
  const isClient = (user as any).role === "client";
  const isOwner = (invitation as any).owner_id === (user as any).id;
  const isWoInv = (user as any).role === "wo" && (invitation as any).wo_id === (user as any).id;

  if ((user as any).role !== "admin" && !isOwner && !isWoInv) {
    if (isClient && (invitation as any).id === (user as any).invitationId) {
      // Allowed client
    } else {
      return json({ error: "Akses ditolak." }, 403);
    }
  }

  const { results: rsvps } = await db
    .prepare("SELECT attendance, guest_count FROM rsvps WHERE invitation_id = ?")
    .bind(id)
    .all();

  const totalRsvps = rsvps?.length || 0;
  const hadirData = rsvps?.filter((r: any) => r.attendance === "hadir") || [];
  const notHadirData = rsvps?.filter((r: any) => r.attendance === "tidak_hadir") || [];
  const raguData = rsvps?.filter((r: any) => r.attendance === "ragu") || [];

  let totalPax = 0;
  for (const r of hadirData) {
    totalPax += (r as any).guest_count || 1;
  }

  return json({
    pageViews: (invitation as any).view_count || 0,
    totalRsvps,
    totalPax,
    attendanceStats: {
      hadir: hadirData.length,
      tidak_hadir: notHadirData.length,
      ragu: raguData.length,
    },
  });
}

async function handleInvitationCreate(
  db: D1Database,
  request: Request,
  env: any,
) {
  const user = await requireUserOrClient(db, request, env);
  if (!user) return unauthorized();

  const rawBody = await request.json();
  const body = validateBody(invitationCreateSchema, rawBody);

  const isClientCreate = (user as any).role === "client_temp";
  let woId = null;
  let ownerId = isClientCreate ? null : (user as any).id;

  if (isClientCreate) {
    // 1. Fetch WO access code details
    const woCode = await db
      .prepare("SELECT * FROM wo_access_codes WHERE id = ?")
      .bind((user as any).woCodeId)
      .first();

    if (!woCode || (woCode as any).status !== "active") {
      return json({ error: "Kode akses tidak aktif atau sudah digunakan." }, 400);
    }

    // 2. Fetch WO user to check quota
    const woUser = await db
      .prepare("SELECT id, max_invitations FROM users WHERE id = ?")
      .bind((woCode as any).wo_user_id)
      .first();

    if (!woUser) {
      return json({ error: "Wedding Organizer tidak ditemukan." }, 404);
    }
    woId = (woUser as any).id;
  } else {
    if ((user as any).role !== "admin") {
      const countResult = await db
        .prepare("SELECT COUNT(*) as cnt FROM invitations WHERE owner_id = ?")
        .bind((user as any).id)
        .first<{ cnt: number }>();
      if ((countResult?.cnt || 0) >= (user as any).max_invitations) {
        return json(
          {
            error: `Limit tercapai. Anda hanya bisa membuat ${(user as any).max_invitations} undangan.`,
          },
          403,
        );
      }
    }
  }

  const slugCheck = await db
    .prepare("SELECT id FROM invitations WHERE slug = ?")
    .bind(body.slug)
    .first();

  if (slugCheck)
    return json({ error: "Slug sudah digunakan. Pilih slug lain." }, 400);

  let paymentStatus = "trial";
  let trialExpiresAt = null;
  let paidAtValue = null;

  if (isClientCreate) {
    paymentStatus = "paid";
    paidAtValue = new Date().toISOString();
  } else {
    const { isUserPremium, userPaidAt } = await getUserPremiumState(
      db,
      (user as any).id,
    );
    const isAdminCreated =
      (user as any).user_source === "admin_created" || (user as any).role === "admin";
    paymentStatus = isAdminCreated || isUserPremium ? "paid" : "trial";
    trialExpiresAt =
      isAdminCreated || isUserPremium
        ? null
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    paidAtValue = getInvitationPaidAtValue(
      isUserPremium,
      userPaidAt,
      isAdminCreated,
    );
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await db.prepare(`INSERT INTO invitations (
    id, slug, owner_id, wo_id, access_code, access_code_created_at,
    theme, groom_name, bride_name, groom_full_name, bride_full_name,
    groom_father, groom_mother, bride_father, bride_mother,
    groom_photo, bride_photo, cover_photo,
    akad_date, akad_time, akad_venue, akad_address, akad_map_url,
    resepsi_date, resepsi_time, resepsi_venue, resepsi_address, resepsi_map_url,
    love_story, quote, bank_name, bank_account, bank_holder, music_url,
    wa_message, banks, gallery_type,
    streaming_enabled, streaming_platform, streaming_url, khutbah_nikah,
    gift_address, gift_recipient, gift_phone,
    payment_status, trial_expires_at, view_count, max_views, paid_at,
    created_at, updated_at
  ) VALUES (
    ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?,
    ?, ?, ?, ?,
    ?, ?, ?,
    ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?,
    ?, ?, ?,
    ?, ?, ?, ?,
    ?, ?, ?,
    ?, ?, ?, ?, ?,
    ?, ?
  )`).bind(
    id, body.slug, ownerId, woId,
    isClientCreate ? (user as any).accessCode : null,
    isClientCreate ? now : null,
    body.theme || "elegant", body.groom_name, body.bride_name,
    body.groom_full_name || "", body.bride_full_name || "",
    body.groom_father || "", body.groom_mother || "",
    body.bride_father || "", body.bride_mother || "",
    body.groom_photo || "", body.bride_photo || "", body.cover_photo || "",
    body.akad_date || "", body.akad_time || "", body.akad_venue || "",
    body.akad_address || "", body.akad_map_url || "",
    body.resepsi_date || "", body.resepsi_time || "", body.resepsi_venue || "",
    body.resepsi_address || "", body.resepsi_map_url || "",
    stringifyJsonColumn(parseLoveStory(body.love_story) || []),
    body.quote || "", body.bank_name || "", body.bank_account || "",
    body.bank_holder || "", body.music_url || "",
    body.wa_message || "",
    stringifyJsonColumn(Array.isArray(body.banks) ? body.banks : []),
    body.gallery_type || "carousel",
    body.streaming_enabled ? 1 : 0, body.streaming_platform || "youtube",
    body.streaming_url || "", body.khutbah_nikah || "",
    body.gift_address || "", body.gift_recipient || "", body.gift_phone || "",
    paymentStatus, trialExpiresAt, 0, 25, paidAtValue,
    now, now,
  ).run();

  const created = await db
    .prepare("SELECT * FROM invitations WHERE id = ?")
    .bind(id)
    .first();

  if (isClientCreate) {
    await db
      .prepare("UPDATE wo_access_codes SET status = 'used', invitation_id = ?, used_at = ? WHERE id = ?")
      .bind(id, now, (user as any).woCodeId)
      .run();
  }

  const photos = Array.isArray(body.photos) ? body.photos : [];
  if (photos.length) {
    const stmts = photos.map((photo: any, idx: number) =>
      db.prepare(
        "INSERT INTO photos (id, invitation_id, url, sort_order, caption) VALUES (?, ?, ?, ?, ?)"
      ).bind(crypto.randomUUID(), id, photo.url || photo, idx, photo.caption || "")
    );
    await db.batch(stmts);
  }

  const responseData: any = { ...hydrateInvitation(created) };
  if (isClientCreate) {
    const { createAccessToken } = await import("../shared/auth");
    const token = await createAccessToken({ inv: id, code: (user as any).accessCode }, env);
    responseData.token = token;
  }

  return json(responseData, 201);
}

async function handleInvitationUpdate(
  db: D1Database,
  request: Request,
  pathname: string,
  env: any,
) {
  const user = await requireUserOrClient(db, request, env);
  if (!user) return unauthorized();

  const id = decodeURIComponent(pathname.slice("invitations/".length))
    .trim()
    .split("/")[0];
  const rawBody = await request.json();
  const body = validateBody(invitationUpdateSchema, rawBody);

  const current = await db
    .prepare("SELECT * FROM invitations WHERE id = ?")
    .bind(id)
    .first();
  if (!current) return json({ error: "Invitation not found" }, 404);
  
  const isClient = (user as any).role === "client";
  const isOwner = (current as any).owner_id === (user as any).id;
  const isWoInv = (user as any).role === "wo" && (current as any).wo_id === (user as any).id;

  if ((user as any).role !== "admin" && !isOwner && !isWoInv) {
    if (isClient && (current as any).id === (user as any).invitationId) {
      // Allowed client
    } else {
      return json({ error: "Akses ditolak." }, 403);
    }
  }

  const slugError = await validateUniqueSlugOnUpdate(
    db,
    id,
    body.slug,
    (current as any).slug,
  );
  if (slugError) return slugError;

  const updateData = buildInvitationUpdateData(body);

  // Build dynamic UPDATE
  const setClauses: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(updateData)) {
    setClauses.push(`${key} = ?`);
    values.push(value);
  }
  values.push(id);

  await db
    .prepare(`UPDATE invitations SET ${setClauses.join(", ")} WHERE id = ?`)
    .bind(...values)
    .run();

  const updated = await db
    .prepare("SELECT * FROM invitations WHERE id = ?")
    .bind(id)
    .first();

  if (Array.isArray(body.photos)) {
    // Fetch current photos to find which ones were removed
    const { results: oldPhotos } = await db
      .prepare("SELECT url FROM photos WHERE invitation_id = ?")
      .bind(id)
      .all();

    const newUrls = new Set(
      body.photos.map((p: any) => p.url || p).filter(Boolean),
    );
    // Delete R2 files for photos that are no longer in the new list
    for (const old of oldPhotos || []) {
      if ((old as any).url && !newUrls.has((old as any).url)) {
        await deleteR2Url(env, (old as any).url).catch(() => {});
      }
    }

    await db.prepare("DELETE FROM photos WHERE invitation_id = ?").bind(id).run();

    const dbPhotos = body.photos.map((photo: any, idx: number) => ({
      id: crypto.randomUUID(),
      invitation_id: id,
      url: photo.url || photo,
      sort_order: idx,
      caption: photo.caption || "",
    }));
    if (dbPhotos.length) {
      const stmts = dbPhotos.map((p: any) =>
        db.prepare(
          "INSERT INTO photos (id, invitation_id, url, sort_order, caption) VALUES (?, ?, ?, ?, ?)"
        ).bind(p.id, p.invitation_id, p.url, p.sort_order, p.caption)
      );
      await db.batch(stmts);
    }
  }

  return json(hydrateInvitation(updated));
}

async function handleInvitationDelete(
  db: D1Database,
  env: any,
  request: Request,
  pathname: string,
) {
  try {
    const user = await requireUser(db, request, env);
    if (!user) return unauthorized();

    const id = decodeURIComponent(pathname.slice("invitations/".length))
      .trim()
      .split("/")[0];
    const inv = await db
      .prepare("SELECT * FROM invitations WHERE id = ?")
      .bind(id)
      .first();
    if (!inv) return json({ error: "Invitation not found" }, 404);
    if ((user as any).role !== "admin" && (inv as any).owner_id !== (user as any).id)
      return json({ error: "Akses ditolak." }, 403);

    const { results: photos } = await db
      .prepare("SELECT url FROM photos WHERE invitation_id = ?")
      .bind(id)
      .all();

    if ((inv as any)?.cover_photo) await deleteR2Url(env, (inv as any).cover_photo).catch(() => {});
    if ((inv as any)?.groom_photo) await deleteR2Url(env, (inv as any).groom_photo).catch(() => {});
    if ((inv as any)?.bride_photo) await deleteR2Url(env, (inv as any).bride_photo).catch(() => {});
    if ((inv as any)?.music_url) await deleteR2Url(env, (inv as any).music_url).catch(() => {});
    for (const photo of photos || []) {
      if ((photo as any)?.url) await deleteR2Url(env, (photo as any).url).catch(() => {});
    }

    // Clean up love_story photos from R2
    const loveStory = parseJsonColumn<any[]>((inv as any)?.love_story, []);
    for (const story of loveStory) {
      if (story?.photo) await deleteR2Url(env, story.photo).catch(() => {});
    }

    // Release WO quota by marking the associated access code as revoked
    await db.prepare("UPDATE wo_access_codes SET status = 'revoked' WHERE invitation_id = ?").bind(id).run();
    await db.prepare("UPDATE payment_logs SET invitation_id = NULL WHERE invitation_id = ?").bind(id).run();

    // Delete related records (D1 supports ON DELETE CASCADE but let's be explicit)
    await db.batch([
      db.prepare("DELETE FROM invitation_views WHERE invitation_id = ?").bind(id),
      db.prepare("DELETE FROM photos WHERE invitation_id = ?").bind(id),
      db.prepare("DELETE FROM rsvps WHERE invitation_id = ?").bind(id),
      db.prepare("DELETE FROM guests WHERE invitation_id = ?").bind(id),
    ]);
    
    await db.prepare("DELETE FROM invitations WHERE id = ?").bind(id).run();

    return json({ message: "Invitation deleted successfully" });
  } catch (err: any) {
    console.error("[Invitations] Delete crash:", err?.message, err?.stack);
    return json({ error: "Gagal menghapus undangan." }, 500);
  }
}

export const dispatchInvitationRoute: ApiDispatcher = async ({
  db,
  env,
  request,
  pathname,
}) => {
  const method = getEffectiveMethod(request);

  if (pathname === "invitations" && request.method === "GET")
    return (await handleInvitationList(db, request, env)) ?? null;
  if (pathname === "invitations" && request.method === "POST")
    return (await handleInvitationCreate(db, request, env)) ?? null;

  if (pathname.startsWith("invitations/check-slug/"))
    return (await handleCheckSlug(db, request, pathname)) ?? null;
  if (pathname.startsWith("invitations/slug/"))
    return (await handleInvitationBySlug(db, request, pathname)) ?? null;

  if (pathname.startsWith("invitations/") && pathname.endsWith("/stats")) {
    return (
      (await handleInvitationStats(db, request, pathname, env)) ?? null
    );
  }

  if (pathname.startsWith("invitations/") && method === "GET")
    return (
      (await handleInvitationById(db, request, pathname, env)) ?? null
    );
  if (pathname.startsWith("invitations/") && method === "PUT")
    return (
      (await handleInvitationUpdate(db, request, pathname, env)) ?? null
    );
  if (pathname.startsWith("invitations/") && method === "DELETE")
    return (
      (await handleInvitationDelete(db, env, request, pathname)) ?? null
    );

  return null;
}; // Touch to trigger wrangler functions re-bundling for fairytale_garden validation
