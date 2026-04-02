-- ====================================================
-- MIGRATION: Tabel Vouchers
-- Jalankan di Supabase SQL Editor
-- ====================================================

CREATE TABLE IF NOT EXISTS vouchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'redeemed', 'expired')),
  redeemed_by UUID REFERENCES users(id) ON DELETE SET NULL,
  redeemed_invitation_id UUID REFERENCES invitations(id) ON DELETE SET NULL,
  redeemed_at TIMESTAMPTZ,
  note TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vouchers_code ON vouchers(code);
CREATE INDEX IF NOT EXISTS idx_vouchers_status ON vouchers(status);
