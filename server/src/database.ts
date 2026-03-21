import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_AUTH_TOKEN || ''

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Environment Variables Supabase belum diatur (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)')
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Tidak seperti SQLite, Supabase tidak dapat melakukan "CREATE TABLE IF NOT EXISTS"
// secara langsung dari kode JS. Anda HARUS meng-copy-paste isi file "supabase_schema.sql"
// ke dalam menu SQL Editor di halaman dashboard Supabase Anda.

export default supabase
