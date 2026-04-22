import { json } from "./http";

type ClerkTokenPayload = {
  sub?: string;
  userId?: string;
  sid?: string;
  exp?: number;
};

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

export function getClerkUserIdFromRequest(request: Request) {
  const token = getBearerToken(request);
  if (!token) return null;
  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload !== "object") return null;
  const typed = payload as ClerkTokenPayload;
  return typed.sub || typed.userId || null;
}

function getClerkTokenPayloadFromRequest(
  request: Request,
): ClerkTokenPayload | null {
  const token = getBearerToken(request);
  if (!token) return null;
  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload !== "object") return null;
  return payload as ClerkTokenPayload;
}

function isExpired(payload: ClerkTokenPayload) {
  if (!payload.exp) return false;
  return payload.exp * 1000 <= Date.now();
}

export function getClerkSecret(env: any) {
  return (env?.CLERK_SECRET_KEY || env?.VITE_CLERK_SECRET_KEY || "") as string;
}

export async function clerkRequest(
  env: any,
  path: string,
  init: RequestInit = {},
) {
  const secretKey = getClerkSecret(env);
  if (!secretKey) throw new Error("CLERK_SECRET_KEY belum diset");

  const res = await fetch(`https://api.clerk.com/v1${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
      ...(init.headers ? (init.headers as Record<string, string>) : {}),
    },
  });

  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const message =
      data?.errors?.[0]?.message ||
      data?.message ||
      `Clerk API error (${res.status})`;
    throw new Error(message);
  }

  return data;
}

export async function ensureLocalUser(supabase: any, clerkId: string) {
  const clerkManagedPasswordHash = ["clerk", "managed"].join("_");
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
        password_hash: clerkManagedPasswordHash,
        role: isFirstUser ? "admin" : "user",
        max_invitations: isFirstUser ? 999 : 1,
        user_source: isFirstUser ? "admin_created" : "self_signup",
      },
    ])
    .select("*")
    .single();

  if (error) throw error;
  return newUser;
}

async function validateClerkSession(env: any, payload: ClerkTokenPayload) {
  const clerkId = payload.sub || payload.userId;
  if (!clerkId) return false;
  if (isExpired(payload)) return false;

  // Prefer session validation when `sid` claim exists.
  if (payload.sid) {
    try {
      const session = await clerkRequest(env, `/sessions/${payload.sid}`, {
        method: "GET",
      });
      if (session?.status !== "active") return false;
      if (session?.user_id !== clerkId) return false;
      return true;
    } catch {
      return false;
    }
  }

  // Fallback: ensure referenced Clerk user exists.
  try {
    await clerkRequest(env, `/users/${clerkId}`, { method: "GET" });
    return true;
  } catch {
    return false;
  }
}

export async function requireUser(supabase: any, request: Request, env?: any) {
  const payload = getClerkTokenPayloadFromRequest(request);
  if (!payload) return null;

  const clerkId = payload.sub || payload.userId;
  if (!clerkId) return null;

  if (isExpired(payload)) return null;

  if (env) {
    const isValid = await validateClerkSession(env, payload);
    if (!isValid) return null;
  }

  return await ensureLocalUser(supabase, clerkId);
}

export function requireAdminUser(user: any) {
  return user?.role === "admin";
}

export function unauthorized() {
  return json({ error: "Tidak terautentikasi." }, 401);
}
