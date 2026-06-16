import { requireUser, unauthorized } from "../shared/auth";
import { json, getEffectiveMethod } from "../shared/http";
import type { ApiDispatcher } from "../types/api";

async function requireInvitationOwner(
  db: D1Database,
  request: Request,
  env: any,
  invitationId: string,
): Promise<{ user: any } | { response: Response }> {
  const user = await requireUser(db, request, env);
  if (!user) return { response: unauthorized() };

  if ((user as any).role === "admin") return { user };

  const invitation = await db
    .prepare("SELECT owner_id FROM invitations WHERE id = ?")
    .bind(invitationId)
    .first();

  if (!invitation) return { response: json({ error: "Undangan tidak ditemukan." }, 404) };
  if ((invitation as any).owner_id !== (user as any).id) return { response: json({ error: "Akses ditolak." }, 403) };

  return { user };
}

async function handleGuestsList(
  db: D1Database,
  request: Request,
  pathname: string,
  env: any,
) {
  const invitationId = decodeURIComponent(pathname.slice("guests/".length))
    .trim()
    .split("/")[0];

  const authResult = await requireInvitationOwner(db, request, env, invitationId);
  if ("response" in authResult) return authResult.response;

  const { results: data } = await db
    .prepare("SELECT * FROM guests WHERE invitation_id = ? ORDER BY created_at DESC")
    .bind(invitationId)
    .all();

  return json(data || []);
}

async function handleGuestsBulk(
  db: D1Database,
  request: Request,
  pathname: string,
  env: any,
) {
  const invitationId = decodeURIComponent(
    pathname.slice("guests/".length).replace(/\/bulk$/, ""),
  ).trim();

  const authResult = await requireInvitationOwner(db, request, env, invitationId);
  if ("response" in authResult) return authResult.response;

  const body = await request.json();
  const guests = Array.isArray(body.guests) ? body.guests : [];
  if (!guests.length) return json({ error: "Invalid guests array" }, 400);

  const stmts = guests.map((g: any) => {
    const id = crypto.randomUUID();
    return db.prepare(
      "INSERT INTO guests (id, invitation_id, name, phone_number, is_sent) VALUES (?, ?, ?, ?, 0)"
    ).bind(id, invitationId, String(g.name || "").trim(), String(g.phone_number || "").trim());
  });

  await db.batch(stmts);

  const { results: data } = await db
    .prepare("SELECT * FROM guests WHERE invitation_id = ? ORDER BY created_at DESC")
    .bind(invitationId)
    .all();

  return json(data, 201);
}

async function handleGuestUpdate(
  db: D1Database,
  request: Request,
  pathname: string,
  env: any,
) {
  const parts = pathname.split("/");
  const invitationId = decodeURIComponent(parts[1] || "");
  const guestId = decodeURIComponent(parts[2] || "");

  const authResult = await requireInvitationOwner(db, request, env, invitationId);
  if ("response" in authResult) return authResult.response;

  const body = await request.json();
  await db.prepare(
    "UPDATE guests SET is_sent = ? WHERE id = ? AND invitation_id = ?"
  ).bind(body.is_sent ? 1 : 0, guestId, invitationId).run();

  const data = await db
    .prepare("SELECT * FROM guests WHERE id = ? AND invitation_id = ?")
    .bind(guestId, invitationId)
    .first();

  return json(data);
}

async function handleGuestDelete(
  db: D1Database,
  request: Request,
  pathname: string,
  env: any,
) {
  const parts = pathname.split("/");
  const invitationId = decodeURIComponent(parts[1] || "");
  const guestId = decodeURIComponent(parts[2] || "");

  const authResult = await requireInvitationOwner(db, request, env, invitationId);
  if ("response" in authResult) return authResult.response;

  await db.prepare(
    "DELETE FROM guests WHERE id = ? AND invitation_id = ?"
  ).bind(guestId, invitationId).run();

  return json({ message: "Guest deleted" });
}

export const dispatchGuestRoute: ApiDispatcher = async ({
  db,
  env,
  request,
  pathname,
}) => {
  const method = getEffectiveMethod(request);

  if (pathname.endsWith("/bulk") && method === "POST")
    return await handleGuestsBulk(db, request, pathname, env);

  if (
    pathname.startsWith("guests/") &&
    pathname.split("/").length === 2 &&
    method === "GET"
  ) {
    return await handleGuestsList(db, request, pathname, env);
  }

  if (
    pathname.startsWith("guests/") &&
    pathname.split("/").length === 3 &&
    method === "PUT"
  ) {
    return await handleGuestUpdate(db, request, pathname, env);
  }

  if (
    pathname.startsWith("guests/") &&
    pathname.split("/").length === 3 &&
    method === "DELETE"
  ) {
    return await handleGuestDelete(db, request, pathname, env);
  }

  return null;
};
