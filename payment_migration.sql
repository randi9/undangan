-- ====================================================
-- MIGRATION: Fitur Pembayaran & Trial System
-- Jalankan di Supabase SQL Editor SETELAH schema dasar
-- ====================================================

-- 1. Tambah kolom payment di tabel invitations
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'trial'
  CHECK (payment_status IN ('trial', 'paid', 'expired'));
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS trial_expires_at TIMESTAMPTZ;
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS view_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS max_views INTEGER NOT NULL DEFAULT 20;
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS mayar_invoice_id TEXT;
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ;

-- 2. Tambah kolom user_source di users (untuk bedakan admin-created vs self-signup)
ALTER TABLE users ADD COLUMN IF NOT EXISTS user_source TEXT NOT NULL DEFAULT 'self_signup'
  CHECK (user_source IN ('admin_created', 'self_signup'));

-- 3. Set semua undangan yang sudah ada menjadi 'paid' (backward compat)
UPDATE invitations SET payment_status = 'paid' WHERE payment_status = 'trial';

-- 4. Set semua user existing sebagai admin_created (backward compat)
UPDATE users SET user_source = 'admin_created';

-- 5. Tabel payment_logs untuk tracking pembayaran
CREATE TABLE IF NOT EXISTS payment_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  mayar_invoice_id TEXT,
  amount INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'expired', 'failed')),
  mayar_payment_url TEXT,
  webhook_payload JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_payment_logs_invitation ON payment_logs(invitation_id);
CREATE INDEX IF NOT EXISTS idx_payment_logs_mayar ON payment_logs(mayar_invoice_id);

-- 6. Tabel invitation_views untuk tracking views
CREATE TABLE IF NOT EXISTS invitation_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
  viewer_ip TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_invitation_views_inv ON invitation_views(invitation_id);
