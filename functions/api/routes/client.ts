import { json, getEffectiveMethod } from "../shared/http";
import { rateLimit, getClientIp } from "../shared/rateLimit";
import type { ApiDispatcher } from "../types/api";

/**
 * Generate a random 8-character alphanumeric access code (uppercase).
 * Uses crypto.getRandomValues() for cryptographic randomness.
 */
function generateAccessCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Exclude confusing chars: 0,O,1,I
  const randomBytes = new Uint32Array(8);
  crypto.getRandomValues(randomBytes);
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(randomBytes[i] % chars.length);
  }
  return code;
}

/**
 * Derive a signing secret for client access tokens.
 * Uses SUPABASE_SECRET_KEY which is always available in the env.
 */
function getTokenSecret(env: any): string {
  return (env?.SUPABASE_SECRET_KEY || env?.SUPABASE_SERVICE_ROLE_KEY || "client-token-fallback-key") + ":client-access";
}

/**
 * Compute HMAC-SHA256 hex signature.
 */
async function hmacSign(secret: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Create an HMAC-signed time-limited access token.
 * Format: base64(payload).hmacSignature
 */
async function createAccessToken(invitationId: string, accessCode: string, env: any): Promise<string> {
  const expiresAt = Date.now() + 72 * 60 * 60 * 1000; // 72 hours
  const payloadStr = JSON.stringify({ inv: invitationId, code: accessCode, exp: expiresAt });
  const payloadB64 = btoa(payloadStr);
  const signature = await hmacSign(getTokenSecret(env), payloadB64);
  return `${payloadB64}.${signature}`;
}

/**
 * Decode, verify signature, and validate an access token.
 * Returns the invitation ID + access code if valid, null otherwise.
 */
async function decodeAccessToken(token: string, env: any): Promise<{ invitationId: string; accessCode: string } | null> {
  try {
    const dotIndex = token.lastIndexOf(".");
    if (dotIndex === -1) {
      // Legacy unsigned token (backward compat) — still validate against DB
      const payload = JSON.parse(atob(token));
      if (!payload.inv || !payload.code || !payload.exp) return null;
      if (Date.now() > payload.exp) return null;
      return { invitationId: payload.inv, accessCode: payload.code };
    }

    const payloadB64 = token.slice(0, dotIndex);
    const signature = token.slice(dotIndex + 1);

    // Verify HMAC signature
    const expectedSig = await hmacSign(getTokenSecret(env), payloadB64);
    if (signature.length !== expectedSig.length) return null;
    let diff = 0;
    for (let i = 0; i < signature.length; i++) {
      diff |= signature.charCodeAt(i) ^ expectedSig.charCodeAt(i);
    }
    if (diff !== 0) return null;

    const payload = JSON.parse(atob(payloadB64));
    if (!payload.inv || !payload.code || !payload.exp) return null;
    if (Date.now() > payload.exp) return null;
    return { invitationId: payload.inv, accessCode: payload.code };
  } catch {
    return null;
  }
}

/**
 * Extract and validate the client access token from request headers.
 * Returns the invitation data if valid, or a Response to return immediately.
 */
async function requireClientAccess(
  supabase: any,
  request: Request,
  env: any,
): Promise<{ invitation: any } | { response: Response }> {
  const authHeader = request.headers.get("x-access-token") || "";
  if (!authHeader) {
    return { response: json({ error: "Token akses diperlukan." }, 401) };
  }

  const decoded = await decodeAccessToken(authHeader, env);
  if (!decoded) {
    return { response: json({ error: "Token akses tidak valid atau kedaluwarsa." }, 401) };
  }

  // Verify the access code still matches the invitation
  const { data: invitation, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("id", decoded.invitationId)
    .eq("access_code", decoded.accessCode)
    .single();

  if (error || !invitation) {
    return { response: json({ error: "Kode akses sudah tidak berlaku." }, 401) };
  }

  return { invitation };
}

// === Admin: Generate Access Code ===
async function handleGenerateAccessCode(
  supabase: any,
  request: Request,
  pathname: string,
  env: any,
) {
  // This requires admin auth — reuse existing auth check
  const { requireUser, unauthorized } = await import("../shared/auth");
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();
  if (user.role !== "admin") return json({ error: "Akses ditolak." }, 403);

  const id = decodeURIComponent(
    pathname.slice("client/generate-code/".length),
  ).trim();

  const { data: invitation } = await supabase
    .from("invitations")
    .select("id")
    .eq("id", id)
    .single();

  if (!invitation) return json({ error: "Undangan tidak ditemukan." }, 404);

  const accessCode = generateAccessCode();
  const { data: updated, error } = await supabase
    .from("invitations")
    .update({
      access_code: accessCode,
      access_code_created_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("id, access_code, access_code_created_at")
    .single();

  if (error) throw error;

  return json(updated);
}

// === Admin: Revoke Access Code ===
async function handleRevokeAccessCode(
  supabase: any,
  request: Request,
  pathname: string,
  env: any,
) {
  const { requireUser, unauthorized } = await import("../shared/auth");
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();
  if (user.role !== "admin") return json({ error: "Akses ditolak." }, 403);

  const id = decodeURIComponent(
    pathname.slice("client/revoke-code/".length),
  ).trim();

  const { error } = await supabase
    .from("invitations")
    .update({ access_code: null, access_code_created_at: null })
    .eq("id", id);

  if (error) throw error;

  return json({ message: "Kode akses dicabut." });
}

// === Public: Verify Access Code ===
async function handleVerifyCode(supabase: any, request: Request, env: any) {
  const ip = getClientIp(request);
  const limited = rateLimit(`client:verify:${ip}`, 5, 5 * 60 * 1000);
  if (limited) return limited;

  const body = await request.json();
  const code = String(body.code || "").trim().toUpperCase();

  if (!code || code.length !== 8) {
    return json({ error: "Kode akses harus 8 karakter." }, 400);
  }

  const { data: invitation, error } = await supabase
    .from("invitations")
    .select("id, slug, groom_name, bride_name, cover_photo, theme, access_code")
    .eq("access_code", code)
    .single();

  if (error || !invitation) {
    return json({ error: "Kode akses tidak ditemukan." }, 404);
  }

  const token = await createAccessToken(invitation.id, code, env);

  return json({
    token,
    invitation: {
      id: invitation.id,
      slug: invitation.slug,
      groom_name: invitation.groom_name,
      bride_name: invitation.bride_name,
      cover_photo: invitation.cover_photo,
      theme: invitation.theme,
    },
  });
}

// === Client: Get Invitation Details ===
async function handleClientInvitation(supabase: any, request: Request, env: any) {
  const authResult = await requireClientAccess(supabase, request, env);
  if ("response" in authResult) return authResult.response;

  const inv = authResult.invitation;

  // Load photos
  const { data: photos } = await supabase
    .from("photos")
    .select("*")
    .eq("invitation_id", inv.id)
    .order("sort_order", { ascending: true });

  return json({
    ...inv,
    photos: photos || [],
    // Don't expose sensitive fields
    access_code: undefined,
    access_code_created_at: undefined,
  });
}

// === Client: Get Guests ===
async function handleClientGuests(supabase: any, request: Request, env: any) {
  const authResult = await requireClientAccess(supabase, request, env);
  if ("response" in authResult) return authResult.response;

  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("invitation_id", authResult.invitation.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return json(data || []);
}

// === Client: Add Guests (Bulk) ===
async function handleClientAddGuests(supabase: any, request: Request, env: any) {
  const authResult = await requireClientAccess(supabase, request, env);
  if ("response" in authResult) return authResult.response;

  const body = await request.json();
  const guests = Array.isArray(body.guests) ? body.guests : [];
  if (!guests.length) return json({ error: "Daftar tamu tidak boleh kosong." }, 400);

  const payload = guests.map((g: any) => ({
    id: crypto.randomUUID(),
    invitation_id: authResult.invitation.id,
    name: String(g.name || "").trim(),
    phone_number: String(g.phone_number || "").trim(),
    is_sent: false,
  }));

  const { data, error } = await supabase
    .from("guests")
    .insert(payload)
    .select();

  if (error) throw error;
  return json(data, 201);
}

// === Client: Update Guest Status ===
async function handleClientUpdateGuest(
  supabase: any,
  request: Request,
  pathname: string,
  env: any,
) {
  const authResult = await requireClientAccess(supabase, request, env);
  if ("response" in authResult) return authResult.response;

  const guestId = decodeURIComponent(
    pathname.slice("client/guests/".length),
  ).trim();

  const body = await request.json();
  const { data, error } = await supabase
    .from("guests")
    .update({ is_sent: body.is_sent })
    .eq("id", guestId)
    .eq("invitation_id", authResult.invitation.id)
    .select()
    .single();

  if (error) throw error;
  return json(data);
}

// === Client: Delete Guest ===
async function handleClientDeleteGuest(
  supabase: any,
  request: Request,
  pathname: string,
  env: any,
) {
  const authResult = await requireClientAccess(supabase, request, env);
  if ("response" in authResult) return authResult.response;

  const guestId = decodeURIComponent(
    pathname.slice("client/guests/".length),
  ).trim();

  const { error } = await supabase
    .from("guests")
    .delete()
    .eq("id", guestId)
    .eq("invitation_id", authResult.invitation.id);

  if (error) throw error;
  return json({ message: "Tamu dihapus." });
}

// === Client: Get RSVPs ===
async function handleClientRsvps(supabase: any, request: Request, env: any) {
  const authResult = await requireClientAccess(supabase, request, env);
  if ("response" in authResult) return authResult.response;

  const { data, error } = await supabase
    .from("rsvps")
    .select("*")
    .eq("invitation_id", authResult.invitation.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return json(data || []);
}

// === Client: Reply to RSVP ===
async function handleClientReplyRsvp(
  supabase: any,
  request: Request,
  pathname: string,
  env: any,
) {
  const authResult = await requireClientAccess(supabase, request, env);
  if ("response" in authResult) return authResult.response;

  const rsvpId = decodeURIComponent(
    pathname.slice("client/rsvps/".length),
  ).trim();

  const body = await request.json();
  const updateData: any = {};
  if (body.reply_text !== undefined) updateData.reply_text = body.reply_text;
  if (body.is_hidden !== undefined) updateData.is_hidden = body.is_hidden;

  // Ensure the RSVP belongs to this invitation
  const { data: rsvp } = await supabase
    .from("rsvps")
    .select("id, invitation_id")
    .eq("id", rsvpId)
    .single();

  if (!rsvp || rsvp.invitation_id !== authResult.invitation.id) {
    return json({ error: "RSVP tidak ditemukan." }, 404);
  }

  const { data, error } = await supabase
    .from("rsvps")
    .update(updateData)
    .eq("id", rsvpId)
    .select()
    .single();

  if (error) throw error;
  return json(data);
}

// === Client: Delete RSVP ===
async function handleClientDeleteRsvp(
  supabase: any,
  request: Request,
  pathname: string,
  env: any,
) {
  const authResult = await requireClientAccess(supabase, request, env);
  if ("response" in authResult) return authResult.response;

  const rsvpId = decodeURIComponent(
    pathname.slice("client/rsvps/".length),
  ).trim();

  // Ensure the RSVP belongs to this invitation
  const { data: rsvp } = await supabase
    .from("rsvps")
    .select("id, invitation_id")
    .eq("id", rsvpId)
    .single();

  if (!rsvp || rsvp.invitation_id !== authResult.invitation.id) {
    return json({ error: "RSVP tidak ditemukan." }, 404);
  }

  const { error } = await supabase.from("rsvps").delete().eq("id", rsvpId);
  if (error) throw error;
  return json({ message: "Ucapan dihapus." });
}

// === Client: Get Stats ===
async function handleClientStats(supabase: any, request: Request, env: any) {
  const authResult = await requireClientAccess(supabase, request, env);
  if ("response" in authResult) return authResult.response;

  const invitationId = authResult.invitation.id;

  const { data: rsvps, error: rsvpError } = await supabase
    .from("rsvps")
    .select("attendance, guest_count")
    .eq("invitation_id", invitationId);

  if (rsvpError) throw rsvpError;

  const totalRsvps = rsvps?.length || 0;
  const hadirData = rsvps?.filter((r: any) => r.attendance === "hadir") || [];
  const notHadirData = rsvps?.filter((r: any) => r.attendance === "tidak_hadir") || [];
  const raguData = rsvps?.filter((r: any) => r.attendance === "ragu") || [];

  let totalPax = 0;
  for (const r of hadirData) {
    totalPax += r.guest_count || 1;
  }

  return json({
    pageViews: authResult.invitation.view_count || 0,
    totalRsvps,
    totalPax,
    attendanceStats: {
      hadir: hadirData.length,
      tidak_hadir: notHadirData.length,
      ragu: raguData.length,
    },
  });
}

// === Client: Update WA Message ===
async function handleClientUpdateWaMessage(
  supabase: any,
  request: Request,
  env: any,
) {
  const authResult = await requireClientAccess(supabase, request, env);
  if ("response" in authResult) return authResult.response;

  const body = await request.json();
  const { data, error } = await supabase
    .from("invitations")
    .update({ wa_message: body.wa_message, updated_at: new Date().toISOString() })
    .eq("id", authResult.invitation.id)
    .select("wa_message")
    .single();

  if (error) throw error;
  return json(data);
}

export const dispatchClientRoute: ApiDispatcher = async ({
  supabase,
  env,
  request,
  pathname,
}) => {
  const method = getEffectiveMethod(request);

  // Admin endpoints (require Clerk auth)
  if (pathname.startsWith("client/generate-code/") && method === "POST")
    return await handleGenerateAccessCode(supabase, request, pathname, env);
  if (pathname.startsWith("client/revoke-code/") && method === "DELETE")
    return await handleRevokeAccessCode(supabase, request, pathname, env);

  // Public: verify code
  if (pathname === "client/verify-code" && method === "POST")
    return await handleVerifyCode(supabase, request, env);

  // Client authenticated endpoints (require access token)
  if (pathname === "client/invitation" && method === "GET")
    return await handleClientInvitation(supabase, request, env);

  if (pathname === "client/guests" && method === "GET")
    return await handleClientGuests(supabase, request, env);
  if (pathname === "client/guests" && method === "POST")
    return await handleClientAddGuests(supabase, request, env);
  if (pathname.startsWith("client/guests/") && method === "PUT")
    return await handleClientUpdateGuest(supabase, request, pathname, env);
  if (pathname.startsWith("client/guests/") && method === "DELETE")
    return await handleClientDeleteGuest(supabase, request, pathname, env);

  if (pathname === "client/rsvps" && method === "GET")
    return await handleClientRsvps(supabase, request, env);
  if (pathname.startsWith("client/rsvps/") && method === "PUT")
    return await handleClientReplyRsvp(supabase, request, pathname, env);
  if (pathname.startsWith("client/rsvps/") && method === "DELETE")
    return await handleClientDeleteRsvp(supabase, request, pathname, env);

  if (pathname === "client/stats" && method === "GET")
    return await handleClientStats(supabase, request, env);

  if (pathname === "client/wa-message" && method === "PUT")
    return await handleClientUpdateWaMessage(supabase, request, env);

  return null;
};
