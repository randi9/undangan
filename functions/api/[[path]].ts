import { getSupabase } from "../_lib/supabase";

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,PUT,DELETE,OPTIONS",
      "access-control-allow-headers": "content-type,authorization",
    },
  });
}

function options(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,PUT,DELETE,OPTIONS",
      "access-control-allow-headers": "content-type,authorization",
    },
  });
}

function getPathname(request: Request) {
  return new URL(request.url).pathname.replace(/^\/api\/?/, "");
}

function getBearerToken(request: Request) {
  const header = request.headers.get("authorization") || "";
  if (!header.toLowerCase().startsWith("bearer ")) return null;
  return header.slice(7).trim() || null;
}

function decodeJwtPayload(token: string): unknown {
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const payload = parts[1].replaceAll("-", "+").replaceAll("_", "/");
    const padded = payload + "==".slice((payload.length + 3) % 4);
    const text = atob(padded);
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function getClerkUserIdFromRequest(request: Request) {
  const token = getBearerToken(request);
  if (!token) return null;
  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload !== "object") return null;
  const typed = payload as { sub?: string; userId?: string };
  return typed.sub || typed.userId || null;
}

async function loadInvitationBySlug(supabase: any, slug: string) {
  return await supabase
    .from("invitations")
    .select("*")
    .eq("slug", slug)
    .single();
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

async function loadInvitationRelations(supabase: any, invitation: any) {
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

  return { photos: photos || [], rsvps: rsvps || [] };
}

async function handleHealth() {
  return json({
    status: "ok",
    runtime: "cloudflare-pages-functions",
    timestamp: new Date().toISOString(),
  });
}

async function ensureLocalUser(supabase: any, clerkId: string) {
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("username", clerkId)
    .maybeSingle();

  if (existingUser) return existingUser;

  const { count } = await supabase
    .from("users")
    .select("id", { count: "exact", head: true });
  const isFirstUser = count === 0;

  const { data: newUser, error } = await supabase
    .from("users")
    .insert([
      {
        username: clerkId,
        password_hash: `clerk_managed_${crypto.randomUUID()}`,
        role: isFirstUser ? "admin" : "user",
        max_invitations: isFirstUser ? 999 : 3,
      },
    ])
    .select("*")
    .single();

  if (error) throw error;
  return newUser;
}

async function handleAuthMe(supabase: any, request: Request) {
  const clerkId = getClerkUserIdFromRequest(request);
  if (!clerkId) return json({ error: "Tidak terautentikasi." }, 401);

  const user = await ensureLocalUser(supabase, clerkId);
  const { count } = await supabase
    .from("invitations")
    .select("id", { count: "exact", head: true })
    .eq("owner_id", user.id);

  return json({ ...user, invitation_count: count || 0 });
}

async function handleInvitationList(supabase: any, request: Request) {
  const clerkId = getClerkUserIdFromRequest(request);
  if (!clerkId) return json({ error: "Tidak terautentikasi." }, 401);

  const user = await ensureLocalUser(supabase, clerkId);

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
  if (!data) {
    return json({ available: true });
  }

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

  const { data: invitation, error } = await loadInvitationBySlug(
    supabase,
    slug,
  );

  if (error || !invitation) return json({ error: "Invitation not found" }, 404);

  const accessState = buildInvitationLockResponse(invitation);
  if ("response" in accessState) return accessState.response;
  const isTrial = Boolean((accessState as any).isTrial);
  const showWatermark = Boolean((accessState as any).showWatermark);
  const trialExpired = Boolean((accessState as any).trialExpired);
  const viewsExhausted = Boolean((accessState as any).viewsExhausted);

  const isPreview = new URL(request.url).searchParams.get("preview") === "true";
  if (!isPreview) {
    await bumpInvitationView(supabase, invitation, request);
  }

  const { photos, rsvps } = await loadInvitationRelations(supabase, invitation);

  return json({
    ...invitation,
    photos: photos || [],
    rsvps: rsvps || [],
    is_trial: isTrial,
    show_watermark: showWatermark,
    trial_expired: trialExpired,
    views_exhausted: viewsExhausted,
    views_remaining: isTrial
      ? Math.max(
          0,
          (invitation.max_views || 25) - (invitation.view_count || 0) - 1,
        )
      : null,
  });
}

async function handleRsvpPost(supabase: any, request: Request) {
  const body = (await request.json()) as {
    invitation_id?: string;
    guest_name?: string;
    attendance?: string;
    guest_count?: number;
    message?: string;
  };

  const { invitation_id, guest_name, attendance, guest_count, message } = body;
  if (!invitation_id || !guest_name || !attendance) {
    return json({ error: "Missing required fields" }, 400);
  }

  const { data, error } = await supabase
    .from("rsvps")
    .insert([
      {
        id: crypto.randomUUID(),
        invitation_id,
        guest_name: String(guest_name).trim(),
        attendance,
        guest_count: Math.min(10, Math.max(1, Number(guest_count) || 1)),
        message: typeof message === "string" ? message.trim() : "",
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return json(data, 201);
}

async function handleRsvpList(supabase: any, pathname: string) {
  const invitationId = decodeURIComponent(
    pathname.slice("rsvp/".length),
  ).trim();
  const { data, error } = await supabase
    .from("rsvps")
    .select("*")
    .eq("invitation_id", invitationId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return json(data || []);
}

export async function onRequest(context: any) {
  const { request, env } = context;

  if (request.method === "OPTIONS") return options();

  try {
    const supabase = getSupabase(env);
    const pathname = getPathname(request);

    if (pathname === "health" || pathname === "") {
      return await handleHealth();
    }

    if (pathname === "auth/me" && request.method === "GET") {
      return await handleAuthMe(supabase, request);
    }

    if (pathname === "invitations" && request.method === "GET") {
      return await handleInvitationList(supabase, request);
    }

    if (pathname.startsWith("invitations/check-slug/")) {
      return await handleCheckSlug(supabase, request, pathname);
    }

    if (pathname.startsWith("invitations/slug/")) {
      return await handleInvitationBySlug(supabase, request, pathname);
    }

    if (pathname === "rsvp" && request.method === "POST") {
      return await handleRsvpPost(supabase, request);
    }

    if (pathname.startsWith("rsvp/") && request.method === "GET") {
      return await handleRsvpList(supabase, pathname);
    }

    return json({ error: `Route tidak didukung: /api/${pathname}` }, 404);
  } catch (err: any) {
    return json({ error: err?.message || "Server error" }, 500);
  }
}
