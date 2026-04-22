import { requireUser, unauthorized } from "../shared/auth";
import { getEffectiveMethod, json } from "../shared/http";
import { deleteR2Url } from "../shared/storage";
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

async function getUserPremiumState(supabase: any, userId: string) {
  let isUserPremium = false;
  let userPaidAt: string | null = null;

  const { data: userRecord } = await supabase
    .from("users")
    .select("paid_at")
    .eq("id", userId)
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

  if (!isUserPremium) {
    const { data: pastPayments } = await supabase
      .from("payment_logs")
      .select("paid_at")
      .eq("user_id", userId)
      .eq("status", "paid")
      .order("paid_at", { ascending: false })
      .limit(1);

    if (pastPayments && pastPayments.length > 0) {
      const lastPaidAt = new Date(pastPayments[0].paid_at);
      const expireDate = new Date(lastPaidAt);
      expireDate.setFullYear(expireDate.getFullYear() + 1);
      if (new Date() <= expireDate) {
        isUserPremium = true;
        userPaidAt = pastPayments[0].paid_at;
        await supabase
          .from("users")
          .update({ paid_at: userPaidAt })
          .eq("id", userId);
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
  supabase: any,
  id: string,
  slug: string | undefined,
  currentSlug: string,
) {
  if (!slug || slug === currentSlug) return null;
  const { data: slugExists } = await supabase
    .from("invitations")
    .select("id")
    .eq("slug", slug)
    .neq("id", id)
    .maybeSingle();
  return slugExists ? json({ error: "Slug sudah digunakan." }, 400) : null;
}

function buildInvitationUpdateData(body: any) {
  const updateData: any = { updated_at: new Date().toISOString() };
  const fields = [
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
    "banks",
    "wa_message",
    "gallery_type",
  ];

  for (const f of fields) {
    if (body[f] !== undefined) updateData[f] = body[f];
  }
  if (body.love_story !== undefined) {
    updateData.love_story = parseLoveStory(body.love_story) || [];
  }

  return updateData;
}

async function loadInvitationRelations(supabase: any, invitationId: string) {
  const { data: photos } = await supabase
    .from("photos")
    .select("*")
    .eq("invitation_id", invitationId)
    .order("sort_order", { ascending: true });

  const { data: rsvps } = await supabase
    .from("rsvps")
    .select("*")
    .eq("invitation_id", invitationId)
    .order("created_at", { ascending: false });

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
  supabase: any,
  invitation: any,
  request: Request,
) {
  const viewerIp =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  const { data: existingView } = await supabase
    .from("invitation_views")
    .select("id")
    .eq("invitation_id", invitation.id)
    .eq("viewer_ip", viewerIp)
    .maybeSingle();

  if (existingView) return;

  await supabase.from("invitation_views").insert([
    {
      invitation_id: invitation.id,
      viewer_ip: viewerIp,
    },
  ]);

  await supabase
    .from("invitations")
    .update({ view_count: (invitation.view_count || 0) + 1 })
    .eq("id", invitation.id);
}

async function handleInvitationList(supabase: any, request: Request, env: any) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();

  let query = supabase
    .from("invitations")
    .select("*, photos(id), rsvps(id)")
    .order("created_at", { ascending: false });

  if (user.role !== "admin") {
    query = query.eq("owner_id", user.id);
  }

  const { data, error } = await query;
  if (error) throw error;

  const invitations = (data || []).map((i: any) => ({
    ...i,
    photo_count: i.photos?.length || 0,
    rsvp_count: i.rsvps?.length || 0,
  }));

  return json(invitations);
}

async function handleCheckSlug(
  supabase: any,
  request: Request,
  pathname: string,
) {
  const slug = decodeURIComponent(
    pathname.slice("invitations/check-slug/".length),
  ).trim();
  if (!slug) return json({ error: "Slug wajib diisi" }, 400);

  const url = new URL(request.url);
  const excludeId = url.searchParams.get("exclude_id");

  let query = supabase.from("invitations").select("id").eq("slug", slug);
  if (excludeId) query = query.neq("id", excludeId);

  const { data } = await query.single();
  if (!data) return json({ available: true });

  const prefixes = [
    "nikah-",
    "wedding-",
    "undangan-",
    "menikah-",
    `${new Date().getFullYear()}-`,
    `${Math.floor(Math.random() * 99) + 1}-`,
  ];
  const candidates = prefixes.map((p) => p + slug);

  const { data: existing } = await supabase
    .from("invitations")
    .select("slug")
    .in("slug", candidates);

  const takenSlugs = new Set((existing || []).map((r: any) => r.slug));
  const suggestions = candidates
    .filter((candidate) => !takenSlugs.has(candidate))
    .slice(0, 3);

  return json({ available: false, suggestions });
}

async function handleInvitationBySlug(
  supabase: any,
  request: Request,
  pathname: string,
) {
  const slug = decodeURIComponent(
    pathname.slice("invitations/slug/".length),
  ).trim();
  if (!slug) return json({ error: "Slug wajib diisi" }, 400);

  const { data: invitation, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !invitation) return json({ error: "Invitation not found" }, 404);

  const accessState = buildInvitationLockResponse(invitation);
  if ("response" in accessState && accessState.response)
    return accessState.response;

  const isPreview = new URL(request.url).searchParams.get("preview") === "true";
  if (!isPreview) {
    await bumpInvitationView(supabase, invitation, request);
  }

  const { photos, rsvps } = await loadInvitationRelations(
    supabase,
    invitation.id,
  );

  return json({
    ...invitation,
    photos,
    rsvps,
    is_trial: (accessState as any).isTrial,
    show_watermark: (accessState as any).showWatermark,
    trial_expired: (accessState as any).trialExpired,
    views_exhausted: (accessState as any).viewsExhausted,
    views_remaining: (accessState as any).isTrial
      ? Math.max(
          0,
          (invitation.max_views || 25) - (invitation.view_count || 0) - 1,
        )
      : null,
  });
}

async function handleInvitationById(
  supabase: any,
  request: Request,
  pathname: string,
  env: any,
) {
  const id = decodeURIComponent(pathname.slice("invitations/".length))
    .trim()
    .split("/")[0];
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();

  const { data: invitation, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !invitation) return json({ error: "Invitation not found" }, 404);
  if (user.role !== "admin" && invitation.owner_id !== user.id)
    return json({ error: "Akses ditolak." }, 403);

  const { photos } = await loadInvitationRelations(supabase, id);
  return json({ ...invitation, photos });
}

async function handleInvitationStats(
  supabase: any,
  request: Request,
  pathname: string,
  env: any,
) {
  const id = decodeURIComponent(
    pathname.slice("invitations/".length).replace(/\/stats$/, ""),
  ).trim();
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();

  const { data: invitation, error } = await supabase
    .from("invitations")
    .select("id, owner_id, view_count")
    .eq("id", id)
    .single();

  if (error || !invitation) return json({ error: "Invitation not found" }, 404);
  if (user.role !== "admin" && invitation.owner_id !== user.id)
    return json({ error: "Akses ditolak." }, 403);

  const { data: rsvps, error: rsvpError } = await supabase
    .from("rsvps")
    .select("attendance, guest_count")
    .eq("invitation_id", id);
  if (rsvpError) throw rsvpError;

  const totalRsvps = rsvps?.length || 0;
  const hadirData = rsvps?.filter((r: any) => r.attendance === "hadir") || [];
  const notHadirData =
    rsvps?.filter((r: any) => r.attendance === "tidak_hadir") || [];
  const raguData = rsvps?.filter((r: any) => r.attendance === "ragu") || [];

  let totalPax = 0;
  for (const r of hadirData) {
    totalPax += r.guest_count || 1;
  }

  return json({
    pageViews: invitation.view_count || 0,
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
  supabase: any,
  request: Request,
  env: any,
) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();

  const body = await request.json();
  if (!body?.slug || !body?.groom_name || !body?.bride_name) {
    return json({ error: "slug, groom_name, bride_name wajib diisi" }, 400);
  }

  if (user.role !== "admin") {
    const { count } = await supabase
      .from("invitations")
      .select("id", { count: "exact", head: true })
      .eq("owner_id", user.id);
    if ((count || 0) >= user.max_invitations) {
      return json(
        {
          error: `Limit tercapai. Anda hanya bisa membuat ${user.max_invitations} undangan.`,
        },
        403,
      );
    }
  }

  const { data: slugCheck } = await supabase
    .from("invitations")
    .select("id")
    .eq("slug", body.slug)
    .maybeSingle();

  if (slugCheck)
    return json({ error: "Slug sudah digunakan. Pilih slug lain." }, 400);

  const { isUserPremium, userPaidAt } = await getUserPremiumState(
    supabase,
    user.id,
  );

  const isAdminCreated =
    user.user_source === "admin_created" || user.role === "admin";
  const paymentStatus = isAdminCreated || isUserPremium ? "paid" : "trial";
  const trialExpiresAt =
    isAdminCreated || isUserPremium
      ? null
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const paidAtValue = getInvitationPaidAtValue(
    isUserPremium,
    userPaidAt,
    isAdminCreated,
  );

  const id = crypto.randomUUID();
  const newInvitation = {
    id,
    slug: body.slug,
    owner_id: user.id,
    theme: body.theme || "elegant",
    groom_name: body.groom_name,
    bride_name: body.bride_name,
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
    wa_message: body.wa_message || "",
    banks: Array.isArray(body.banks) ? body.banks : [],
    gallery_type: body.gallery_type || "carousel",
    payment_status: paymentStatus,
    trial_expires_at: trialExpiresAt,
    view_count: 0,
    max_views: 25,
    paid_at: paidAtValue,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data: created, error } = await supabase
    .from("invitations")
    .insert([newInvitation])
    .select("*")
    .single();

  if (error) throw error;

  const photos = Array.isArray(body.photos) ? body.photos : [];
  if (photos.length) {
    const dbPhotos = photos.map((photo: any, idx: number) => ({
      id: crypto.randomUUID(),
      invitation_id: id,
      url: photo.url || photo,
      sort_order: idx,
      caption: photo.caption || "",
    }));
    await supabase.from("photos").insert(dbPhotos);
  }

  return json(created, 201);
}

async function handleInvitationUpdate(
  supabase: any,
  request: Request,
  pathname: string,
  env: any,
) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();

  const id = decodeURIComponent(pathname.slice("invitations/".length))
    .trim()
    .split("/")[0];
  const body = await request.json();

  const { data: current } = await supabase
    .from("invitations")
    .select("*")
    .eq("id", id)
    .single();
  if (!current) return json({ error: "Invitation not found" }, 404);
  if (user.role !== "admin" && current.owner_id !== user.id)
    return json({ error: "Akses ditolak." }, 403);

  const slugError = await validateUniqueSlugOnUpdate(
    supabase,
    id,
    body.slug,
    current.slug,
  );
  if (slugError) return slugError;

  const updateData = buildInvitationUpdateData(body);

  const { data: updated, error } = await supabase
    .from("invitations")
    .update(updateData)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  if (Array.isArray(body.photos)) {
    await supabase.from("photos").delete().eq("invitation_id", id);
    const dbPhotos = body.photos.map((photo: any, idx: number) => ({
      id: crypto.randomUUID(),
      invitation_id: id,
      url: photo.url || photo,
      sort_order: idx,
      caption: photo.caption || "",
    }));
    if (dbPhotos.length) await supabase.from("photos").insert(dbPhotos);
  }

  return json(updated);
}

async function handleInvitationDelete(
  supabase: any,
  env: any,
  request: Request,
  pathname: string,
) {
  try {
    const user = await requireUser(supabase, request, env);
    if (!user) return unauthorized();

    const id = decodeURIComponent(pathname.slice("invitations/".length))
      .trim()
      .split("/")[0];
    const { data: inv, error: fetchErr } = await supabase
      .from("invitations")
      .select("*")
      .eq("id", id)
      .single();
    if (!inv) return json({ error: fetchErr ? fetchErr.message : "Invitation not found" }, 404);
    if (user.role !== "admin" && inv.owner_id !== user.id)
      return json({ error: "Akses ditolak." }, 403);

    const { data: photos } = await supabase
      .from("photos")
      .select("url")
      .eq("invitation_id", id);

    if (inv?.cover_photo) await deleteR2Url(env, inv.cover_photo).catch(() => {});
    if (inv?.groom_photo) await deleteR2Url(env, inv.groom_photo).catch(() => {});
    if (inv?.bride_photo) await deleteR2Url(env, inv.bride_photo).catch(() => {});
    if (inv?.music_url) await deleteR2Url(env, inv.music_url).catch(() => {});
    for (const photo of photos || []) {
      if (photo?.url) await deleteR2Url(env, photo.url).catch(() => {});
    }

    await supabase
      .from("payment_logs")
      .update({ invitation_id: null })
      .eq("invitation_id", id);

    await supabase.from("invitation_views").delete().eq("invitation_id", id);
    await supabase.from("photos").delete().eq("invitation_id", id);
    await supabase.from("rsvps").delete().eq("invitation_id", id);
    await supabase.from("guests").delete().eq("invitation_id", id);
    
    const { error: delError } = await supabase.from("invitations").delete().eq("id", id);
    if (delError) {
      return json({ error: `Supabase delete error: ${delError.message}` }, 500);
    }

    return json({ message: "Invitation deleted successfully" });
  } catch (err: any) {
    return json({ error: `Crash di backend: ${err?.message}`, _stack: err?.stack }, 500);
  }
}

export const dispatchInvitationRoute: ApiDispatcher = async ({
  supabase,
  env,
  request,
  pathname,
}) => {
  const method = getEffectiveMethod(request);

  if (pathname === "invitations" && request.method === "GET")
    return (await handleInvitationList(supabase, request, env)) ?? null;
  if (pathname === "invitations" && request.method === "POST")
    return (await handleInvitationCreate(supabase, request, env)) ?? null;

  if (pathname.startsWith("invitations/check-slug/"))
    return (await handleCheckSlug(supabase, request, pathname)) ?? null;
  if (pathname.startsWith("invitations/slug/"))
    return (await handleInvitationBySlug(supabase, request, pathname)) ?? null;

  if (pathname.startsWith("invitations/") && pathname.endsWith("/stats")) {
    return (
      (await handleInvitationStats(supabase, request, pathname, env)) ?? null
    );
  }

  if (pathname.startsWith("invitations/") && method === "GET")
    return (
      (await handleInvitationById(supabase, request, pathname, env)) ?? null
    );
  if (pathname.startsWith("invitations/") && method === "PUT")
    return (
      (await handleInvitationUpdate(supabase, request, pathname, env)) ?? null
    );
  if (pathname.startsWith("invitations/") && method === "DELETE")
    return (
      (await handleInvitationDelete(supabase, env, request, pathname)) ?? null
    );

  return null;
};
