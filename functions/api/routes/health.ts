import { json } from "../shared/http";
import type { ApiDispatcher } from "../types/api";

export const dispatchHealthRoute: ApiDispatcher = async ({ pathname, env }) => {
  if (pathname !== "" && pathname !== "health") return null;

  const supabaseUrl =
    env?.SUPABASE_URL ||
    env?.VITE_SUPABASE_URL ||
    env?.SUPABASE_VITE_SUPABASE_URL ||
    "";
  const supabaseKey =
    env?.SUPABASE_SERVICE_ROLE_KEY ||
    env?.SUPABASE_ANON_KEY ||
    env?.VITE_SUPABASE_ANON_KEY ||
    "";

  const clerkSecret =
    env?.CLERK_SECRET_KEY ||
    env?.VITE_CLERK_SECRET_KEY ||
    "";

  return json({
    status: "ok",
    timestamp: new Date().toISOString(),
    supabase_connected: Boolean(supabaseUrl && supabaseKey),
    supabase_url: supabaseUrl ? "✅" : "❌",
    clerk_secret: clerkSecret ? "✅" : "❌ MISSING",
    runtime: "cloudflare-pages-functions",
  });
};
