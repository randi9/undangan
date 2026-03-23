import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

// Vercel Supabase integration dengan prefix "SUPABASE" menghasilkan nama variabel yang bervariasi.
// Kita cek semua kemungkinan agar pasti terkoneksi.
const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.SUPABASE_VITE_SUPABASE_URL ||
  "";

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.SUPABASE_VITE_SUPABASE_ANON_KEY ||
  "";

if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ Supabase env vars belum lengkap!");
  console.warn("   URL:", supabaseUrl ? "✅" : "❌ kosong");
  console.warn("   KEY:", supabaseKey ? "✅" : "❌ kosong");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

