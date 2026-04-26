-- Migration script to add Live Streaming columns to the invitations table

ALTER TABLE public.invitations 
ADD COLUMN IF NOT EXISTS streaming_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS streaming_platform TEXT DEFAULT 'youtube',
ADD COLUMN IF NOT EXISTS streaming_url TEXT;

-- Optional: Update existing records to have default values (jika diperlukan)
UPDATE public.invitations 
SET streaming_enabled = false 
WHERE streaming_enabled IS NULL;

UPDATE public.invitations 
SET streaming_platform = 'youtube' 
WHERE streaming_platform IS NULL;
