-- Migration: Add banks JSONB column for multi-bank support
-- Run this in the Supabase SQL Editor

ALTER TABLE invitations ADD COLUMN IF NOT EXISTS banks JSONB DEFAULT '[]'::jsonb;

-- Migrate existing single bank data to banks array (one-time)
UPDATE invitations
SET banks = jsonb_build_array(
  jsonb_build_object(
    'bank_name', COALESCE(bank_name, ''),
    'bank_account', COALESCE(bank_account, ''),
    'bank_holder', COALESCE(bank_holder, '')
  )
)
WHERE bank_name IS NOT NULL AND bank_name != '' AND (banks IS NULL OR banks = '[]'::jsonb);
