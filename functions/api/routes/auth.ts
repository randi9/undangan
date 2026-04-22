import {
  clerkRequest,
  requireAdminUser,
  requireUser,
  unauthorized,
  getClerkSecret,
  getClerkUserIdFromRequest,
} from "../shared/auth";
import { json } from "../shared/http";
import type { ApiDispatcher } from "../types/api";

function randomPassword() {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

async function handleMe(supabase: any, request: Request, env: any) {
  const user = await requireUser(supabase, request, env);
  if (!user) {
    // Detailed step-by-step debug to find where auth fails
    const authHeader = request.headers.get("authorization") || "";
    const hasToken = authHeader.toLowerCase().startsWith("bearer ");
    const token = hasToken ? authHeader.slice(7).trim() : "";
    const debugSteps: Record<string, any> = {
      has_bearer_token: hasToken,
      token_length: token.length,
    };

    // Step 1: Decode JWT
    if (token) {
      try {
        const parts = token.split(".");
        debugSteps.jwt_parts = parts.length;
        if (parts.length >= 2) {
          const payload = parts[1].replaceAll("-", "+").replaceAll("_", "/");
          const padded = payload + "==".slice((payload.length + 3) % 4);
          const decoded = JSON.parse(atob(padded));
          debugSteps.jwt_sub = decoded.sub || "MISSING";
          debugSteps.jwt_sid = decoded.sid ? "present" : "MISSING";
          debugSteps.jwt_exp = decoded.exp;
          debugSteps.jwt_expired = decoded.exp ? (decoded.exp * 1000 <= Date.now()) : "no_exp";
          debugSteps.server_time = Math.floor(Date.now() / 1000);

          // Step 2: Try Clerk API validation
          const clerkSecret = getClerkSecret(env);
          if (clerkSecret && decoded.sid) {
            try {
              const res = await fetch(`https://api.clerk.com/v1/sessions/${decoded.sid}`, {
                headers: { Authorization: `Bearer ${clerkSecret}` },
              });
              const data = await res.json();
              debugSteps.clerk_session_status = res.status;
              debugSteps.clerk_session_active = data?.status;
              debugSteps.clerk_session_user = data?.user_id;
              debugSteps.clerk_user_match = data?.user_id === decoded.sub;
            } catch (err: any) {
              debugSteps.clerk_session_error = err?.message;
            }
          }

          // Step 3: Try Supabase user lookup
          if (decoded.sub) {
            const { data: dbUser, error: dbErr } = await supabase
              .from("users")
              .select("id, username, role")
              .eq("username", decoded.sub)
              .maybeSingle();
            debugSteps.supabase_user_found = Boolean(dbUser);
            debugSteps.supabase_user = dbUser || null;
            debugSteps.supabase_error = dbErr?.message || null;
          }
        }
      } catch (err: any) {
        debugSteps.decode_error = err?.message;
      }
    }

    return json({ error: "Tidak terautentikasi.", _debug: debugSteps }, 401);
  }

  const { count } = await supabase
    .from("invitations")
    .select("id", { count: "exact", head: true })
    .eq("owner_id", user.id);

  return json({ ...user, invitation_count: count || 0 });
}

async function handleUsersList(supabase: any, env: any, request: Request) {
  const user = await requireUser(supabase, request, env);
  if (!user) return unauthorized();
  if (!requireAdminUser(user)) return json({ error: "Akses ditolak." }, 403);

  const { data: users, error } = await supabase
    .from("users")
    .select("id, username, role, max_invitations, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;

  const counts: Record<string, number> = {};
  const { data: invData } = await supabase
    .from("invitations")
    .select("owner_id");
  for (const inv of invData || [])
    if (inv.owner_id) counts[inv.owner_id] = (counts[inv.owner_id] || 0) + 1;

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
  const role = body.role === "admin" ? "admin" : "user";
  const max_invitations = Math.max(1, Number(body.max_invitations) || 3);
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

  const clerkUser = await clerkRequest(env, "/users", {
    method: "POST",
    body: JSON.stringify(createParams),
  });

  const { data: userRow, error } = await supabase
    .from("users")
    .insert([
      {
        username: clerkUser.id,
        password_hash: clerkManagedPasswordHash,
        role,
        max_invitations,
        user_source: "admin_created",
      },
    ])
    .select("id, username, role, max_invitations, user_source, created_at")
    .single();

  if (error) throw error;

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
    .select("username")
    .eq("id", id)
    .single();
  if (!currentUser) return json({ error: "User tidak ditemukan." }, 404);

  const updateData: any = {};
  if (body.role !== undefined)
    updateData.role = body.role === "admin" ? "admin" : "user";
  if (body.max_invitations !== undefined)
    updateData.max_invitations = Math.max(1, Number(body.max_invitations));

  const { data: updated, error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", id)
    .select("id, username, role, max_invitations")
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
    .select("id, slug, groom_name, bride_name, theme, created_at")
    .eq("owner_id", id)
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
  // Temporary diagnostic endpoint — remove after debugging
  if (pathname === "auth/debug-token" && request.method === "GET") {
    const steps: Record<string, any> = {};

    // Step 1: Check Authorization header
    const authHeader = request.headers.get("authorization") || "";
    steps.has_auth_header = Boolean(authHeader);
    steps.auth_header_prefix = authHeader ? authHeader.substring(0, 30) + "..." : "MISSING";

    // Step 2: Extract Clerk user ID from token
    const clerkId = getClerkUserIdFromRequest(request);
    steps.clerk_id = clerkId || "FAILED_TO_EXTRACT";

    // Step 3: Check Clerk secret
    const clerkSecret = getClerkSecret(env);
    steps.clerk_secret_available = Boolean(clerkSecret);
    steps.clerk_secret_prefix = clerkSecret ? clerkSecret.substring(0, 10) + "..." : "MISSING";

    // Step 4: Try Clerk API
    if (clerkSecret && clerkId) {
      try {
        const clerkUser = await clerkRequest(env, `/users/${clerkId}`, { method: "GET" });
        steps.clerk_api = "✅ OK";
        steps.clerk_username = clerkUser?.username || clerkUser?.id;
      } catch (err: any) {
        steps.clerk_api = `❌ FAILED: ${err?.message}`;
      }
    }

    // Step 5: Try Supabase query
    try {
      const { data, error: dbError } = await supabase
        .from("users")
        .select("id, username, role")
        .limit(1);
      steps.supabase_query = dbError ? `❌ ${dbError.message}` : "✅ OK";
      steps.supabase_users_count = data?.length ?? 0;
    } catch (err: any) {
      steps.supabase_query = `❌ ${err?.message}`;
    }

    // Step 6: Try full auth
    try {
      const user = await requireUser(supabase, request, env);
      steps.full_auth = user ? "✅ OK" : "❌ RETURNED_NULL";
      if (user) steps.auth_user = { id: user.id, username: user.username, role: user.role };
    } catch (err: any) {
      steps.full_auth = `❌ THREW: ${err?.message}`;
    }

    return json({ diagnostic: "auth-debug", steps });
  }

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
