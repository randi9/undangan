import {
  clerkRequest,
  requireAdminUser,
  requireUser,
  unauthorized,
} from "../shared/auth";
import { json } from "../shared/http";
import type { ApiDispatcher } from "../types/api";

function randomPassword() {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  const randomBytes = new Uint32Array(12);
  crypto.getRandomValues(randomBytes);
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(randomBytes[i] % chars.length);
  }
  return password;
}

async function handleMe(db: D1Database, request: Request, env: any) {
  const user = await requireUser(db, request, env);
  if (!user) {
    return json({ error: "Tidak terautentikasi." }, 401);
  }

  const countResult = await db
    .prepare("SELECT COUNT(*) as cnt FROM invitations WHERE owner_id = ? OR wo_id = ?")
    .bind((user as any).id, (user as any).id)
    .first<{ cnt: number }>();

  return json({ ...user, invitation_count: countResult?.cnt || 0 });
}

async function handleUsersList(db: D1Database, env: any, request: Request) {
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) return json({ error: "Akses ditolak." }, 403);

  const { results: users } = await db
    .prepare("SELECT id, username, role, max_invitations, business_name, business_phone, created_at FROM users ORDER BY created_at DESC")
    .all();

  const { results: invData } = await db
    .prepare("SELECT owner_id, wo_id FROM invitations")
    .all();

  const counts: Record<string, number> = {};
  for (const inv of invData || []) {
    if ((inv as any).owner_id) counts[(inv as any).owner_id] = (counts[(inv as any).owner_id] || 0) + 1;
    if ((inv as any).wo_id) counts[(inv as any).wo_id] = (counts[(inv as any).wo_id] || 0) + 1;
  }

  let clerkUserMap = new Map<string, string>();
  try {
    const clerkUsers = await clerkRequest(env, "/users?limit=500", {
      method: "GET",
    });
    (clerkUsers || []).forEach((u: any) => {
      clerkUserMap.set(
        u.id,
        u.username || u.email_addresses?.[0]?.email_address || u.id,
      );
    });
  } catch {
    // ignore
  }

  return json(
    (users || []).map((u: any) => ({
      ...u,
      clerk_id: u.username,
      username: clerkUserMap.get(u.username) || u.username,
      invitation_count: counts[u.id] || 0,
      business_name: u.business_name,
      business_phone: u.business_phone,
    })),
  );
}

async function handleUsersCreate(db: D1Database, env: any, request: Request) {
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) return json({ error: "Akses ditolak." }, 403);

  const body = await request.json();
  const username = String(
    body.username || `user${Math.floor(1000 + Math.random() * 9000)}`,
  )
    .trim()
    .toLowerCase();
  const password = String(body.password || randomPassword());
  const role = ["admin", "user", "wo"].includes(body.role) ? body.role : "user";
  const defaultMax = role === "wo" ? 0 : 3;
  const max_invitations = body.max_invitations !== undefined ? Math.max(0, Number(body.max_invitations)) : defaultMax;
  const business_name = body.business_name ? String(body.business_name).trim() : null;
  const business_phone = body.business_phone ? String(body.business_phone).trim() : null;
  const clerkManagedPasswordHash = ["clerk", "managed"].join("_");

  const createParams: any = {
    password,
    skip_password_requirement: true,
  };

  if (username.includes("@")) createParams.email_address = [username];
  else {
    createParams.username = username;
    createParams.email_address = [`${username}@mengundanganda.com`];
  }

  let clerkUser: any;
  try {
    clerkUser = await clerkRequest(env, "/users", {
      method: "POST",
      body: JSON.stringify(createParams),
    });
  } catch (clerkErr: any) {
    console.error("[Auth] Clerk create user error:", clerkErr?.message);
    return json({ error: `Gagal membuat akun: ${clerkErr?.message || "Clerk error"}` }, 400);
  }

  const id = crypto.randomUUID();
  try {
    await db.prepare(
      "INSERT INTO users (id, username, password_hash, role, max_invitations, business_name, business_phone, user_source) VALUES (?, ?, ?, ?, ?, ?, ?, 'admin_created')"
    ).bind(id, clerkUser.id, clerkManagedPasswordHash, role, max_invitations, business_name, business_phone).run();
  } catch (dbErr: any) {
    console.error("[Auth] D1 insert error:", dbErr?.message);
    // Cleanup: delete the Clerk user since DB insert failed
    await clerkRequest(env, `/users/${clerkUser.id}`, { method: "DELETE" }).catch(() => {});
    return json({ error: `Gagal menyimpan ke database: ${dbErr?.message || "DB error"}` }, 400);
  }

  const userRow = await db
    .prepare("SELECT id, username, role, max_invitations, business_name, business_phone, user_source, created_at FROM users WHERE id = ?")
    .bind(id)
    .first();

  return json(
    {
      ...userRow,
      clerk_id: clerkUser.id,
      username: clerkUser.username || username,
      plain_password: password,
      invitation_count: 0,
    },
    201,
  );
}

async function handleUsersUpdate(
  db: D1Database,
  env: any,
  request: Request,
  pathname: string,
) {
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) return json({ error: "Akses ditolak." }, 403);

  const id = decodeURIComponent(pathname.split("/")[2] || "");
  const body = await request.json();

  const currentUser = await db
    .prepare("SELECT username, role FROM users WHERE id = ?")
    .bind(id)
    .first();
  if (!currentUser) return json({ error: "User tidak ditemukan." }, 404);

  const setClauses: string[] = [];
  const values: any[] = [];

  if (body.role !== undefined) {
    setClauses.push("role = ?");
    values.push(["admin", "user", "wo"].includes(body.role) ? body.role : "user");
  }
  if (body.max_invitations !== undefined) {
    setClauses.push("max_invitations = ?");
    values.push(Math.max(0, Number(body.max_invitations)));
  }
  if (body.business_name !== undefined) {
    setClauses.push("business_name = ?");
    values.push(body.business_name ? String(body.business_name).trim() : null);
  }
  if (body.business_phone !== undefined) {
    setClauses.push("business_phone = ?");
    values.push(body.business_phone ? String(body.business_phone).trim() : null);
  }

  if (setClauses.length > 0) {
    values.push(id);
    await db.prepare(`UPDATE users SET ${setClauses.join(", ")} WHERE id = ?`).bind(...values).run();
  }

  const updated = await db
    .prepare("SELECT id, username, role, max_invitations, business_name, business_phone FROM users WHERE id = ?")
    .bind(id)
    .first();

  const clerkUpdates: any = {};
  if (body.password) {
    clerkUpdates.password = body.password;
    clerkUpdates.skip_password_requirement = true;
  }
  if (body.username) {
    const parsedUsername = String(body.username).trim().toLowerCase();
    if (
      !parsedUsername.includes("@") &&
      (currentUser as any).username.startsWith("user_")
    )
      clerkUpdates.username = parsedUsername;
  }

  if (
    Object.keys(clerkUpdates).length &&
    (currentUser as any).username.startsWith("user_")
  ) {
    await clerkRequest(env, `/users/${(currentUser as any).username}`, {
      method: "PATCH",
      body: JSON.stringify(clerkUpdates),
    }).catch(() => {});
  }

  return json(updated);
}

async function handleUsersDelete(
  db: D1Database,
  env: any,
  request: Request,
  pathname: string,
) {
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) return json({ error: "Akses ditolak." }, 403);

  const id = decodeURIComponent(pathname.split("/")[2] || "");
  if (id === (user as any).id)
    return json({ error: "Tidak bisa menghapus akun sendiri." }, 400);

  const userToDelete = await db
    .prepare("SELECT username FROM users WHERE id = ?")
    .bind(id)
    .first<{ username: string }>();

  await db.prepare("UPDATE invitations SET owner_id = NULL WHERE owner_id = ?").bind(id).run();
  await db.prepare("DELETE FROM users WHERE id = ?").bind(id).run();

  if (userToDelete?.username?.startsWith("user_")) {
    await clerkRequest(env, `/users/${userToDelete.username}`, {
      method: "DELETE",
    }).catch(() => {});
  }

  return json({ message: "User berhasil dihapus." });
}

async function handleUserInvitations(
  db: D1Database,
  request: Request,
  pathname: string,
  env: any,
) {
  const user = await requireUser(db, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) return json({ error: "Akses ditolak." }, 403);

  const id = decodeURIComponent(pathname.split("/")[2] || "");

  const { results: data } = await db
    .prepare("SELECT id, slug, groom_name, bride_name, theme, created_at, payment_status, wo_id FROM invitations WHERE owner_id = ? OR wo_id = ? ORDER BY created_at DESC")
    .bind(id, id)
    .all();

  return json(data || []);
}

export const dispatchAuthRoute: ApiDispatcher = async ({
  db,
  env,
  request,
  pathname,
}) => {
  if (pathname === "auth/me" && request.method === "GET")
    return await handleMe(db, request, env);
  if (pathname === "auth/users" && request.method === "GET")
    return await handleUsersList(db, env, request);
  if (pathname === "auth/users" && request.method === "POST")
    return await handleUsersCreate(db, env, request);

  if (!pathname.startsWith("auth/users/")) return null;

  if (pathname.endsWith("/invitations") && request.method === "GET") {
    return await handleUserInvitations(db, request, pathname, env);
  }

  if (request.method === "PUT")
    return await handleUsersUpdate(db, env, request, pathname);
  if (request.method === "DELETE")
    return await handleUsersDelete(db, env, request, pathname);

  return json({ error: "Method tidak didukung" }, 405);
};
