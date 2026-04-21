import { createClient } from "@supabase/supabase-js";

export type PagesEnv = {
  SUPABASE_URL?: string;
  SUPABASE_SECRET_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  SUPABASE_ANON_KEY?: string;
  VITE_SUPABASE_ANON_KEY?: string;
};

export function getSupabase(env: PagesEnv) {
  const supabaseUrl = env.SUPABASE_URL || "";
  const supabaseKey =
    env.SUPABASE_SECRET_KEY ||
    env.SUPABASE_SERVICE_ROLE_KEY ||
    env.SUPABASE_ANON_KEY ||
    env.VITE_SUPABASE_ANON_KEY ||
    "";

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "SUPABASE_URL / SUPABASE key belum terpasang di Cloudflare Pages env",
    );
  }

  return createClient(supabaseUrl, supabaseKey);
}
