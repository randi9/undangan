-- ============================================
-- Tabel: orders
-- Untuk fitur "Jasa Dibuatkan Undangan" Rp 99.000
-- Jalankan SQL ini di Supabase SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  
  -- Data Pelanggan
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  
  -- Data Undangan
  groom_name TEXT NOT NULL,
  bride_name TEXT NOT NULL,
  wedding_date DATE,
  theme TEXT DEFAULT 'elegant',
  location TEXT,
  notes TEXT,
  
  -- Pricing
  package_type TEXT DEFAULT 'jasa_dibuatkan',
  amount INTEGER DEFAULT 99000,
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid')),
  
  -- Tracking
  invitation_id UUID REFERENCES invitations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk query umum
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);

-- RLS: Disable karena diakses via service role key dari backend
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role full access (backend API)
CREATE POLICY "service_role_full_access" ON orders
  FOR ALL
  USING (true)
  WITH CHECK (true);

COMMENT ON TABLE orders IS 'Tabel untuk menyimpan pesanan Jasa Dibuatkan Undangan (Rp 99.000)';
