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

async function handleMe(supabase: any, request: Request, env: any) {
  const user = await requireUser(supabase, request, env);
  if (!user) {
    return json({ error: "Tidak terautentikasi." }, 401);
  }

  const { count } = await supabase
    .from("invitations")
    .select("id", { count: "exact", head: true })
    .or(`owner_id.eq.${user.id},wo_id.eq.${user.id}`);

  return json({ ...user, invitation_count: count || 0 });
}

async function handleUsersList(supabase: any, env: any, request: Request) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) return json({ error: "Akses ditolak." }, 403);

  const { data: users, error } = await supabase
    .from("users")
    .select("id, username, role, max_invitations, business_name, business_phone, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;

  const counts: Record<string, number> = {};
  const { data: invData } = await supabase
    .from("invitations")
    .select("owner_id, wo_id");
  for (const inv of invData || []) {
    if (inv.owner_id) counts[inv.owner_id] = (counts[inv.owner_id] || 0) + 1;
    if (inv.wo_id) counts[inv.wo_id] = (counts[inv.wo_id] || 0) + 1;
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

async function handleUsersCreate(supabase: any, env: any, request: Request) {
  const user = await requireUser(supabase, request, env);
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

  const { data: userRow, error } = await supabase
    .from("users")
    .insert([
      {
        username: clerkUser.id,
        password_hash: clerkManagedPasswordHash,
        role,
        max_invitations,
        business_name,
        business_phone,
        user_source: "admin_created",
      },
    ])
    .select("id, username, role, max_invitations, business_name, business_phone, user_source, created_at")
    .single();

  if (error) {
    console.error("[Auth] Supabase insert error:", error?.message, error?.code);
    // Cleanup: delete the Clerk user since DB insert failed
    await clerkRequest(env, `/users/${clerkUser.id}`, { method: "DELETE" }).catch(() => {});
    return json({ error: `Gagal menyimpan ke database: ${error?.message || "DB error"}` }, 400);
  }

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
  supabase: any,
  env: any,
  request: Request,
  pathname: string,
) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) return json({ error: "Akses ditolak." }, 403);

  const id = decodeURIComponent(pathname.split("/")[2] || "");
  const body = await request.json();

  const { data: currentUser } = await supabase
    .from("users")
    .select("username, role")
    .eq("id", id)
    .single();
  if (!currentUser) return json({ error: "User tidak ditemukan." }, 404);

  const updateData: any = {};
  if (body.role !== undefined)
    updateData.role = ["admin", "user", "wo"].includes(body.role) ? body.role : "user";
  if (body.max_invitations !== undefined)
    updateData.max_invitations = Math.max(0, Number(body.max_invitations));
  if (body.business_name !== undefined)
    updateData.business_name = body.business_name ? String(body.business_name).trim() : null;
  if (body.business_phone !== undefined)
    updateData.business_phone = body.business_phone ? String(body.business_phone).trim() : null;

  const { data: updated, error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", id)
    .select("id, username, role, max_invitations, business_name, business_phone")
    .single();
  if (error) throw error;

  const clerkUpdates: any = {};
  if (body.password) {
    clerkUpdates.password = body.password;
    clerkUpdates.skip_password_requirement = true;
  }
  if (body.username) {
    const parsedUsername = String(body.username).trim().toLowerCase();
    if (
      !parsedUsername.includes("@") &&
      currentUser.username.startsWith("user_")
    )
      clerkUpdates.username = parsedUsername;
  }

  if (
    Object.keys(clerkUpdates).length &&
    currentUser.username.startsWith("user_")
  ) {
    await clerkRequest(env, `/users/${currentUser.username}`, {
      method: "PATCH",
      body: JSON.stringify(clerkUpdates),
    }).catch(() => {});
  }

  return json(updated);
}

async function handleUsersDelete(
  supabase: any,
  env: any,
  request: Request,
  pathname: string,
) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) return json({ error: "Akses ditolak." }, 403);

  const id = decodeURIComponent(pathname.split("/")[2] || "");
  if (id === user.id)
    return json({ error: "Tidak bisa menghapus akun sendiri." }, 400);

  const { data: userToDelete } = await supabase
    .from("users")
    .select("username")
    .eq("id", id)
    .single();

  await supabase
    .from("invitations")
    .update({ owner_id: null })
    .eq("owner_id", id);
  const { error } = await supabase.from("users").delete().eq("id", id);
  if (error) throw error;

  if (userToDelete?.username?.startsWith("user_")) {
    await clerkRequest(env, `/users/${userToDelete.username}`, {
      method: "DELETE",
    }).catch(() => {});
  }

  return json({ message: "User berhasil dihapus." });
}

async function handleUserInvitations(
  supabase: any,
  request: Request,
  pathname: string,
  env: any,
) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) return json({ error: "Akses ditolak." }, 403);

  const id = decodeURIComponent(pathname.split("/")[2] || "");

  const { data, error } = await supabase
    .from("invitations")
    .select("id, slug, groom_name, bride_name, theme, created_at, payment_status, wo_id")
    .or(`owner_id.eq.${id},wo_id.eq.${id}`)
    .order("created_at", { ascending: false });
  if (error) throw error;

  return json(data || []);
}

export const dispatchAuthRoute: ApiDispatcher = async ({
  supabase,
  env,
  request,
  pathname,
}) => {
  if (pathname === "auth/me" && request.method === "GET")
    return await handleMe(supabase, request, env);
  if (pathname === "auth/users" && request.method === "GET")
    return await handleUsersList(supabase, env, request);
  if (pathname === "auth/users" && request.method === "POST")
    return await handleUsersCreate(supabase, env, request);

  if (!pathname.startsWith("auth/users/")) return null;

  if (pathname.endsWith("/invitations") && request.method === "GET") {
    return await handleUserInvitations(supabase, request, pathname, env);
  }

  if (request.method === "PUT")
    return await handleUsersUpdate(supabase, env, request, pathname);
  if (request.method === "DELETE")
    return await handleUsersDelete(supabase, env, request, pathname);

  return json({ error: "Method tidak didukung" }, 405);
};
