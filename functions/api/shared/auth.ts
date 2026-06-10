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
    const padCount = (4 - (payload.length % 4)) % 4;
    const padded = payload + "=".repeat(padCount);
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

  // Server-side session validation via Clerk API.
  // CLERK_SECRET_KEY is REQUIRED — without it, all auth requests fail.
  // This prevents running in an insecure mode where JWTs are trusted
  // without cryptographic verification.
  const clerkSecret = env ? getClerkSecret(env) : "";
  if (!clerkSecret) {
    console.error("[Auth] CLERK_SECRET_KEY is not configured — rejecting request.");
    return null;
  }

  const isValid = await validateClerkSession(env, payload);
  if (!isValid) return null;

  return await ensureLocalUser(supabase, clerkId);
}

export function requireAdminUser(user: any) {
  return user?.role === "admin";
}

export function unauthorized() {
  return json({ error: "Tidak terautentikasi." }, 401);
}

function getTokenSecret(env: any): string {
  return (env?.SUPABASE_SECRET_KEY || env?.SUPABASE_SERVICE_ROLE_KEY || "client-token-fallback-key") + ":client-access";
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

export async function createAccessToken(payload: any, env: any): Promise<string> {
  const expiresAt = Date.now() + 72 * 60 * 60 * 1000; // 72 hours
  const payloadStr = JSON.stringify({ ...payload, exp: expiresAt });
  const payloadB64 = btoa(payloadStr);
  const signature = await hmacSign(getTokenSecret(env), payloadB64);
  return `${payloadB64}.${signature}`;
}

export async function requireUserOrClient(supabase: any, request: Request, env: any) {
  const authHeader = request.headers.get("x-access-token") || request.headers.get("authorization") || "";
  let token = authHeader;
  if (authHeader.toLowerCase().startsWith("bearer ")) {
    token = authHeader.slice(7).trim();
  }

  if (token) {
    const decoded = await decodeAccessToken(token, env);
    if (decoded) {
      if (decoded.needs_create && decoded.woCodeId) {
        return {
          id: "client_temp",
          role: "client_temp",
          woCodeId: decoded.woCodeId,
          accessCode: decoded.accessCode,
        };
      } else if (decoded.invitationId) {
        return {
          id: "client_auth",
          role: "client",
          invitationId: decoded.invitationId,
          accessCode: decoded.accessCode,
        };
      }
    }
  }

  return await requireUser(supabase, request, env);
}
