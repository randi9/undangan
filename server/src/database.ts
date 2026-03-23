import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "⚠️ Environment variables belum lengkap (SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY wajib diisi)",
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Tidak seperti SQLite, Supabase tidak dapat melakukan "CREATE TABLE IF NOT EXISTS"
// secara langsung dari kode JS. Anda HARUS meng-copy-paste isi file "supabase_schema.sql"
// ke dalam menu SQL Editor di halaman dashboard Supabase Anda.

export default supabase;
