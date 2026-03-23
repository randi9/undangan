import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "";

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "⚠️ Supabase env vars belum lengkap! Pastikan SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY atau SUPABASE_ANON_KEY sudah diisi.",
  );
  console.warn("   SUPABASE_URL:", supabaseUrl ? "✅ ada" : "❌ kosong");
  console.warn("   SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "✅ ada" : "❌ kosong");
  console.warn("   SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY ? "✅ ada" : "❌ kosong");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
