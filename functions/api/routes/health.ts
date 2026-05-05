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

  // Test Supabase connection with a real query
  let supabaseStatus = "not_tested";
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = getSupabase(env);
      const { error } = await supabase
        .from("users")
        .select("id")
        .limit(1);
      supabaseStatus = error ? "error" : "ok";
    } catch {
      supabaseStatus = "connection_error";
    }
  }

  return json({
    status: "ok",
    timestamp: new Date().toISOString(),
    supabase: supabaseUrl ? "configured" : "missing",
    supabase_query: supabaseStatus,
    clerk: clerkSecret ? "configured" : "missing",
    runtime: "cloudflare-pages-functions",
  });
};
