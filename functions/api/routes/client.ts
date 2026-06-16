import { json, getEffectiveMethod } from "../shared/http";
import { rateLimit, getClientIp } from "../shared/rateLimit";
import { hydrateInvitation } from "../shared/db";
import type { ApiDispatcher } from "../types/api";

/**
 * Generate a random 8-character alphanumeric access code (uppercase).
 */
function generateAccessCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const randomBytes = new Uint32Array(8);
  crypto.getRandomValues(randomBytes);
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(randomBytes[i] % chars.length);
  }
  return code;
}

function getTokenSecret(env: any): string {
  return (env?.TOKEN_SECRET || env?.SUPABASE_SECRET_KEY || env?.SUPABASE_SERVICE_ROLE_KEY || "client-token-fallback-key") + ":client-access";
}

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

async function createAccessToken(payload: any, env: any): Promise<string> {
  const expiresAt = Date.now() + 72 * 60 * 60 * 1000;
  const payloadStr = JSON.stringify({ ...payload, exp: expiresAt });
  const payloadB64 = btoa(payloadStr);
  const signature = await hmacSign(getTokenSecret(env), payloadB64);
  return `${payloadB64}.${signature}`;
}

export async function decodeAccessToken(token: string, env: any): Promise<{ invitationId?: string; accessCode: string; woCodeId?: string; needs_create?: boolean } | null> {
  try {
    const dotIndex = token.lastIndexOf(".");
    if (dotIndex === -1) {
      const payload = JSON.parse(atob(token));
      if ((!payload.inv && !payload.wo_code_id) || !payload.code || !payload.exp) return null;
      if (Date.now() > payload.exp) return null;
      return { invitationId: payload.inv, accessCode: payload.code };
    }

    const payloadB64 = token.slice(0, dotIndex);
    const signature = token.slice(dotIndex + 1);

    const expectedSig = await hmacSign(getTokenSecret(env), payloadB64);
    if (signature.length !== expectedSig.length) return null;
    let diff = 0;
    for (let i = 0; i < signature.length; i++) {
      diff |= signature.charCodeAt(i) ^ expectedSig.charCodeAt(i);
    }
    if (diff !== 0) return null;

    const payload = JSON.parse(atob(payloadB64));
    if ((!payload.inv && !payload.wo_code_id) || !payload.code || !payload.exp) return null;
    if (Date.now() > payload.exp) return null;
    return {
      invitationId: payload.inv,
      accessCode: payload.code,
      woCodeId: payload.wo_code_id,
      needs_create: payload.needs_create || false,
    };
  } catch {
    return null;
  }
}

async function requireClientAccess(
  db: D1Database,
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

  if (decoded.needs_create) {
    return { response: json({ error: "Selesaikan pembuatan undangan terlebih dahulu.", needs_create: true }, 403) };
  }

  const invitation = await db
    .prepare("SELECT * FROM invitations WHERE id = ?")
    .bind(decoded.invitationId)
    .first();

  if (!invitation) {
    return { response: json({ error: "Kode akses sudah tidak berlaku." }, 401) };
  }

  let isAccessCodeValid = (invitation as any).access_code === decoded.accessCode;
  if (!isAccessCodeValid) {
    const woCode = await db
      .prepare("SELECT id FROM wo_access_codes WHERE code = ? AND invitation_id = ? AND status = 'used'")
      .bind(decoded.accessCode, (invitation as any).id)
      .first();
    if (woCode) {
      isAccessCodeValid = true;
    }
  }

  if (!isAccessCodeValid) {
    return { response: json({ error: "Kode akses sudah tidak berlaku." }, 401) };
  }

  return { invitation: hydrateInvitation(invitation) };
}

// === Admin: Generate Access Code ===
async function handleGenerateAccessCode(
  db: D1Database,
  request: Request,
  pathname: string,
  env: any,
) {
  const { requireUser, unauthorized } = await import("../shared/auth");
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();
  if ((user as any).role !== "admin") return json({ error: "Akses ditolak." }, 403);

  const id = decodeURIComponent(
    pathname.slice("client/generate-code/".length),
  ).trim();

  const invitation = await db
    .prepare("SELECT id FROM invitations WHERE id = ?")
    .bind(id)
    .first();

  if (!invitation) return json({ error: "Undangan tidak ditemukan." }, 404);

  const accessCode = generateAccessCode();
  const now = new Date().toISOString();
  await db.prepare(
    "UPDATE invitations SET access_code = ?, access_code_created_at = ? WHERE id = ?"
  ).bind(accessCode, now, id).run();

  const updated = await db
    .prepare("SELECT id, access_code, access_code_created_at FROM invitations WHERE id = ?")
    .bind(id)
    .first();

  return json(updated);
}

// === Admin: Revoke Access Code ===
async function handleRevokeAccessCode(
  db: D1Database,
  request: Request,
  pathname: string,
  env: any,
) {
  const { requireUser, unauthorized } = await import("../shared/auth");
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();
  if ((user as any).role !== "admin") return json({ error: "Akses ditolak." }, 403);

  const id = decodeURIComponent(
    pathname.slice("client/revoke-code/".length),
  ).trim();

  await db.prepare(
    "UPDATE invitations SET access_code = NULL, access_code_created_at = NULL WHERE id = ?"
  ).bind(id).run();

  return json({ message: "Kode akses dicabut." });
}

// === Public: Verify Access Code ===
async function handleVerifyCode(db: D1Database, request: Request, env: any) {
  const ip = getClientIp(request);
  const limited = rateLimit(`client:verify:${ip}`, 5, 5 * 60 * 1000);
  if (limited) return limited;

  const body = await request.json();
  const code = String(body.code || "").trim().toUpperCase();

  if (!code || code.length !== 8) {
    return json({ error: "Kode akses harus 8 karakter." }, 400);
  }

  // 1. Check WO access codes table first
  const woCode = await db
    .prepare("SELECT id, status, invitation_id, wo_user_id FROM wo_access_codes WHERE code = ?")
    .bind(code)
    .first();

  if (woCode) {
    if ((woCode as any).status === "revoked") {
      return json({ error: "Kode akses ini telah dicabut." }, 400);
    }

    if ((woCode as any).status === "used" || (woCode as any).invitation_id) {
      const invitation = await db
        .prepare("SELECT id, slug, groom_name, bride_name, cover_photo, theme FROM invitations WHERE id = ?")
        .bind((woCode as any).invitation_id)
        .first();

      if (!invitation) {
        return json({ error: "Undangan terkait tidak ditemukan." }, 404);
      }

      const token = await createAccessToken({ inv: (invitation as any).id, code }, env);
      return json({
        token,
        invitation,
        needs_create: false,
      });
    }

    // Otherwise, fresh code. Needs creation
    const token = await createAccessToken({ wo_code_id: (woCode as any).id, code, needs_create: true }, env);
    return json({
      token,
      needs_create: true,
    });
  }

  // 2. Fallback to normal invitation access code
  const invitation = await db
    .prepare("SELECT id, slug, groom_name, bride_name, cover_photo, theme, access_code FROM invitations WHERE access_code = ?")
    .bind(code)
    .first();

  if (!invitation) {
    return json({ error: "Kode akses tidak ditemukan." }, 404);
  }

  const token = await createAccessToken({ inv: (invitation as any).id, code }, env);

  return json({
    token,
    invitation: {
      id: (invitation as any).id,
      slug: (invitation as any).slug,
      groom_name: (invitation as any).groom_name,
      bride_name: (invitation as any).bride_name,
      cover_photo: (invitation as any).cover_photo,
      theme: (invitation as any).theme,
    },
    needs_create: false,
  });
}

// === Client: Get Invitation Details ===
async function handleClientInvitation(db: D1Database, request: Request, env: any) {
  const authResult = await requireClientAccess(db, request, env);
  if ("response" in authResult) return authResult.response;

  const inv = authResult.invitation;

  const { results: photos } = await db
    .prepare("SELECT * FROM photos WHERE invitation_id = ? ORDER BY sort_order ASC")
    .bind(inv.id)
    .all();

  return json({
    ...inv,
    photos: photos || [],
    access_code: undefined,
    access_code_created_at: undefined,
  });
}

// === Client: Get Guests ===
async function handleClientGuests(db: D1Database, request: Request, env: any) {
  const authResult = await requireClientAccess(db, request, env);
  if ("response" in authResult) return authResult.response;

  const { results: data } = await db
    .prepare("SELECT * FROM guests WHERE invitation_id = ? ORDER BY created_at DESC")
    .bind(authResult.invitation.id)
    .all();

  return json(data || []);
}

// === Client: Add Guests (Bulk) ===
async function handleClientAddGuests(db: D1Database, request: Request, env: any) {
  const authResult = await requireClientAccess(db, request, env);
  if ("response" in authResult) return authResult.response;

  const body = await request.json();
  const guests = Array.isArray(body.guests) ? body.guests : [];
  if (!guests.length) return json({ error: "Daftar tamu tidak boleh kosong." }, 400);

  const stmts = guests.map((g: any) => {
    const id = crypto.randomUUID();
    return db.prepare(
      "INSERT INTO guests (id, invitation_id, name, phone_number, is_sent) VALUES (?, ?, ?, ?, 0)"
    ).bind(id, authResult.invitation.id, String(g.name || "").trim(), String(g.phone_number || "").trim());
  });

  await db.batch(stmts);

  const { results: data } = await db
    .prepare("SELECT * FROM guests WHERE invitation_id = ? ORDER BY created_at DESC")
    .bind(authResult.invitation.id)
    .all();

  return json(data, 201);
}

// === Client: Update Guest Status ===
async function handleClientUpdateGuest(
  db: D1Database,
  request: Request,
  pathname: string,
  env: any,
) {
  const authResult = await requireClientAccess(db, request, env);
  if ("response" in authResult) return authResult.response;

  const guestId = decodeURIComponent(
    pathname.slice("client/guests/".length),
  ).trim();

  const body = await request.json();
  await db.prepare(
    "UPDATE guests SET is_sent = ? WHERE id = ? AND invitation_id = ?"
  ).bind(body.is_sent ? 1 : 0, guestId, authResult.invitation.id).run();

  const data = await db
    .prepare("SELECT * FROM guests WHERE id = ? AND invitation_id = ?")
    .bind(guestId, authResult.invitation.id)
    .first();

  return json(data);
}

// === Client: Delete Guest ===
async function handleClientDeleteGuest(
  db: D1Database,
  request: Request,
  pathname: string,
  env: any,
) {
  const authResult = await requireClientAccess(db, request, env);
  if ("response" in authResult) return authResult.response;

  const guestId = decodeURIComponent(
    pathname.slice("client/guests/".length),
  ).trim();

  await db.prepare(
    "DELETE FROM guests WHERE id = ? AND invitation_id = ?"
  ).bind(guestId, authResult.invitation.id).run();

  return json({ message: "Tamu dihapus." });
}

// === Client: Get RSVPs ===
async function handleClientRsvps(db: D1Database, request: Request, env: any) {
  const authResult = await requireClientAccess(db, request, env);
  if ("response" in authResult) return authResult.response;

  const { results: data } = await db
    .prepare("SELECT * FROM rsvps WHERE invitation_id = ? ORDER BY created_at DESC")
    .bind(authResult.invitation.id)
    .all();

  return json(data || []);
}

// === Client: Reply to RSVP ===
async function handleClientReplyRsvp(
  db: D1Database,
  request: Request,
  pathname: string,
  env: any,
) {
  const authResult = await requireClientAccess(db, request, env);
  if ("response" in authResult) return authResult.response;

  const rsvpId = decodeURIComponent(
    pathname.slice("client/rsvps/".length),
  ).trim();

  const body = await request.json();

  // Ensure the RSVP belongs to this invitation
  const rsvp = await db
    .prepare("SELECT id, invitation_id FROM rsvps WHERE id = ?")
    .bind(rsvpId)
    .first();

  if (!rsvp || (rsvp as any).invitation_id !== authResult.invitation.id) {
    return json({ error: "RSVP tidak ditemukan." }, 404);
  }

  const setClauses: string[] = [];
  const values: any[] = [];
  if (body.reply_text !== undefined) { setClauses.push("reply_text = ?"); values.push(body.reply_text); }
  if (body.is_hidden !== undefined) { setClauses.push("is_hidden = ?"); values.push(body.is_hidden ? 1 : 0); }

  if (setClauses.length > 0) {
    values.push(rsvpId);
    await db.prepare(`UPDATE rsvps SET ${setClauses.join(", ")} WHERE id = ?`).bind(...values).run();
  }

  const data = await db.prepare("SELECT * FROM rsvps WHERE id = ?").bind(rsvpId).first();
  return json(data);
}

// === Client: Delete RSVP ===
async function handleClientDeleteRsvp(
  db: D1Database,
  request: Request,
  pathname: string,
  env: any,
) {
  const authResult = await requireClientAccess(db, request, env);
  if ("response" in authResult) return authResult.response;

  const rsvpId = decodeURIComponent(
    pathname.slice("client/rsvps/".length),
  ).trim();

  const rsvp = await db
    .prepare("SELECT id, invitation_id FROM rsvps WHERE id = ?")
    .bind(rsvpId)
    .first();

  if (!rsvp || (rsvp as any).invitation_id !== authResult.invitation.id) {
    return json({ error: "RSVP tidak ditemukan." }, 404);
  }

  await db.prepare("DELETE FROM rsvps WHERE id = ?").bind(rsvpId).run();
  return json({ message: "Ucapan dihapus." });
}

// === Client: Get Stats ===
async function handleClientStats(db: D1Database, request: Request, env: any) {
  const authResult = await requireClientAccess(db, request, env);
  if ("response" in authResult) return authResult.response;

  const invitationId = authResult.invitation.id;

  const { results: rsvps } = await db
    .prepare("SELECT attendance, guest_count FROM rsvps WHERE invitation_id = ?")
    .bind(invitationId)
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
  db: D1Database,
  request: Request,
  env: any,
) {
  const authResult = await requireClientAccess(db, request, env);
  if ("response" in authResult) return authResult.response;

  const body = await request.json();
  await db.prepare(
    "UPDATE invitations SET wa_message = ?, updated_at = ? WHERE id = ?"
  ).bind(body.wa_message, new Date().toISOString(), authResult.invitation.id).run();

  return json({ wa_message: body.wa_message });
}


export const dispatchClientRoute: ApiDispatcher = async ({
  db,
  env,
  request,
  pathname,
}) => {
  const method = getEffectiveMethod(request);

  // Admin endpoints (require Clerk auth)
  if (pathname.startsWith("client/generate-code/") && method === "POST")
    return await handleGenerateAccessCode(db, request, pathname, env);
  if (pathname.startsWith("client/revoke-code/") && method === "DELETE")
    return await handleRevokeAccessCode(db, request, pathname, env);

  // Public: verify code
  if (pathname === "client/verify-code" && method === "POST")
    return await handleVerifyCode(db, request, env);

  // Client authenticated endpoints (require access token)
  if (pathname === "client/invitation" && method === "GET")
    return await handleClientInvitation(db, request, env);

  if (pathname === "client/guests" && method === "GET")
    return await handleClientGuests(db, request, env);
  if (pathname === "client/guests" && method === "POST")
    return await handleClientAddGuests(db, request, env);
  if (pathname.startsWith("client/guests/") && method === "PUT")
    return await handleClientUpdateGuest(db, request, pathname, env);
  if (pathname.startsWith("client/guests/") && method === "DELETE")
    return await handleClientDeleteGuest(db, request, pathname, env);

  if (pathname === "client/rsvps" && method === "GET")
    return await handleClientRsvps(db, request, env);
  if (pathname.startsWith("client/rsvps/") && method === "PUT")
    return await handleClientReplyRsvp(db, request, pathname, env);
  if (pathname.startsWith("client/rsvps/") && method === "DELETE")
    return await handleClientDeleteRsvp(db, request, pathname, env);

  if (pathname === "client/stats" && method === "GET")
    return await handleClientStats(db, request, env);

  if (pathname === "client/wa-message" && method === "PUT")
    return await handleClientUpdateWaMessage(db, request, env);

  return null;
};
