import { json } from "../shared/http";
import type { ApiDispatcher } from "../types/api";
import { getSupabase } from "../../_lib/supabase";
import { getClerkSecret } from "../shared/auth";

export const dispatchHealthRoute: ApiDispatcher = async ({ pathname, env }) => {
  if (pathname !== "" && pathname !== "health") return null;

  const supabaseUrl =
    env?.SUPABASE_URL ||
    env?.VITE_SUPABASE_URL ||
    env?.SUPABASE_VITE_SUPABASE_URL ||
    "";
  const supabaseKey =
    env?.SUPABASE_SECRET_KEY ||
    env?.SUPABASE_SERVICE_ROLE_KEY ||
    env?.SUPABASE_ANON_KEY ||
    env?.VITE_SUPABASE_ANON_KEY ||
    "";

  const clerkSecret = getClerkSecret(env);

  // Determine which key name is being used
  const keySource = env?.SUPABASE_SECRET_KEY
    ? "SUPABASE_SECRET_KEY"
    : env?.SUPABASE_SERVICE_ROLE_KEY
      ? "SUPABASE_SERVICE_ROLE_KEY"
      : env?.SUPABASE_ANON_KEY
        ? "SUPABASE_ANON_KEY"
        : "NONE";

  // Actually test Supabase connection with a real query
  let supabaseQueryTest = "not_tested";
  let supabaseQueryError = "";
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = getSupabase(env);
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .limit(1);
      if (error) {
        supabaseQueryTest = "❌ QUERY_FAILED";
        supabaseQueryError = error.message || JSON.stringify(error);
      } else {
        supabaseQueryTest = "✅ OK";
      }
    } catch (err: any) {
      supabaseQueryTest = "❌ CONNECTION_ERROR";
      supabaseQueryError = err?.message || String(err);
    }
  }

  return json({
    status: "ok",
    timestamp: new Date().toISOString(),
    supabase_url: supabaseUrl ? "✅" : "❌ MISSING",
    supabase_key_source: keySource,
    supabase_key_prefix: supabaseKey ? supabaseKey.substring(0, 20) + "..." : "❌ MISSING",
    supabase_query: supabaseQueryTest,
    supabase_query_error: supabaseQueryError || undefined,
    clerk_secret: clerkSecret ? "✅" : "❌ MISSING",
    runtime: "cloudflare-pages-functions",
  });
};
