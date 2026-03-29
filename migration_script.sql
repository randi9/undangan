-- Script for migrating from Supabase Storage URLs to Cloudflare R2 Custom Domains
-- Run this script in the SQL Editor on your Supabase Dashboard

-- Update table `invitations` image fields
UPDATE invitations SET
  groom_photo = REPLACE(groom_photo, 'https://uuugoccvjzgjxvatrjgr.supabase.co/storage/v1/object/public/uploads/', 'https://media.mengundanganda.fun/'),
  bride_photo = REPLACE(bride_photo, 'https://uuugoccvjzgjxvatrjgr.supabase.co/storage/v1/object/public/uploads/', 'https://media.mengundanganda.fun/'),
  cover_photo = REPLACE(cover_photo, 'https://uuugoccvjzgjxvatrjgr.supabase.co/storage/v1/object/public/uploads/', 'https://media.mengundanganda.fun/'),
  music_url   = REPLACE(music_url, 'https://uuugoccvjzgjxvatrjgr.supabase.co/storage/v1/object/public/music/', 'https://music.mengundanganda.fun/');

-- Update table `photos` image fields
UPDATE photos SET
  url = REPLACE(url, 'https://uuugoccvjzgjxvatrjgr.supabase.co/storage/v1/object/public/uploads/', 'https://media.mengundanganda.fun/');
