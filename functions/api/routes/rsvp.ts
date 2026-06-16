import { json, getEffectiveMethod } from "../shared/http";
import { requireUser, unauthorized } from "../shared/auth";
import { rateLimit, getClientIp } from "../shared/rateLimit";
import { validateBody, rsvpCreateSchema, rsvpUpdateSchema, ValidationError } from "../shared/validation";
import type { ApiDispatcher } from "../types/api";

async function requireRsvpOwner(
  db: D1Database,
  request: Request,
  env: any,
  rsvpId: string,
): Promise<{ user: any } | { response: Response }> {
  const user = await requireUser(db, request, env);
  if (!user) return { response: unauthorized() };

  if ((user as any).role === "admin") return { user };

  const rsvp = await db
    .prepare("SELECT invitation_id FROM rsvps WHERE id = ?")
    .bind(rsvpId)
    .first();

  if (!rsvp) return { response: json({ error: "RSVP tidak ditemukan." }, 404) };

  const invitation = await db
    .prepare("SELECT owner_id FROM invitations WHERE id = ?")
    .bind((rsvp as any).invitation_id)
    .first();

  if (!invitation) return { response: json({ error: "Undangan tidak ditemukan." }, 404) };
  if ((invitation as any).owner_id !== (user as any).id) return { response: json({ error: "Akses ditolak." }, 403) };

  return { user };
}

async function handleRsvpPost(db: D1Database, request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`rsvp:post:${ip}`, 10, 5 * 60 * 1000);
  if (limited) return limited;

  const rawBody = await request.json();
  const body = validateBody(rsvpCreateSchema, rawBody);

  const id = crypto.randomUUID();
  await db.prepare(
    "INSERT INTO rsvps (id, invitation_id, guest_name, attendance, guest_count, message) VALUES (?, ?, ?, ?, ?, ?)"
  ).bind(id, body.invitation_id, body.guest_name, body.attendance, body.guest_count, body.message).run();

  const data = await db.prepare("SELECT * FROM rsvps WHERE id = ?").bind(id).first();
  return json(data, 201);
}

async function handleRsvpList(db: D1Database, pathname: string) {
  const invitationId = decodeURIComponent(
    pathname.slice("rsvp/".length),
  ).trim();
  const { results: data } = await db
    .prepare("SELECT * FROM rsvps WHERE invitation_id = ? ORDER BY created_at DESC")
    .bind(invitationId)
    .all();

  return json(data || []);
}

async function handleRsvpUpdate(
  db: D1Database,
  request: Request,
  pathname: string,
  env: any,
) {
  const id = decodeURIComponent(pathname.slice("rsvp/".length)).trim();

  const authResult = await requireRsvpOwner(db, request, env, id);
  if ("response" in authResult) return authResult.response;

  const body = await request.json();

  const setClauses: string[] = [];
  const values: any[] = [];
  if (body.is_hidden !== undefined) { setClauses.push("is_hidden = ?"); values.push(body.is_hidden ? 1 : 0); }
  if (body.reply_text !== undefined) { setClauses.push("reply_text = ?"); values.push(body.reply_text); }

  if (setClauses.length > 0) {
    values.push(id);
    await db.prepare(`UPDATE rsvps SET ${setClauses.join(", ")} WHERE id = ?`).bind(...values).run();
  }

  const data = await db.prepare("SELECT * FROM rsvps WHERE id = ?").bind(id).first();
  return json(data);
}

async function handleRsvpDelete(
  db: D1Database,
  request: Request,
  pathname: string,
  env: any,
) {
  const id = decodeURIComponent(pathname.slice("rsvp/".length)).trim();

  const authResult = await requireRsvpOwner(db, request, env, id);
  if ("response" in authResult) return authResult.response;

  await db.prepare("DELETE FROM rsvps WHERE id = ?").bind(id).run();
  return json({ message: "RSVP/Wish deleted" });
}

export const dispatchRsvpRoute: ApiDispatcher = async ({
  db,
  env,
  request,
  pathname,
}) => {
  const method = getEffectiveMethod(request);
  if (pathname === "rsvp" && method === "POST")
    return await handleRsvpPost(db, request);
  if (pathname.startsWith("rsvp/") && method === "GET")
    return await handleRsvpList(db, pathname);
  if (pathname.startsWith("rsvp/") && method === "PUT")
    return await handleRsvpUpdate(db, request, pathname, env);
  if (pathname.startsWith("rsvp/") && method === "DELETE")
    return await handleRsvpDelete(db, request, pathname, env);

  return null;
};
