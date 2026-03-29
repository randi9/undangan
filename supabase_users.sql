-- Jalankan script SQL ini di Supabase SQL Editor SETELAH tabel invitations sudah ada

-- 1. Tabel users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  max_invitations INTEGER NOT NULL DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tambah kolom owner_id di invitations (nullable untuk backward compat)
ALTER TABLE invitations
  ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES users(id) ON DELETE SET NULL;

-- 3. Index untuk lookup cepat
CREATE INDEX IF NOT EXISTS idx_invitations_owner_id ON invitations(owner_id);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- 4. Seed admin default (password: admin123, hash bcryptjs)
-- Jalankan SETELAH deploy API, atau gunakan endpoint seed
-- INSERT INTO users (username, password_hash, role, max_invitations)
-- VALUES ('admin', '$2a$10$...hash...', 'admin', 999)
-- ON CONFLICT (username) DO NOTHING;
