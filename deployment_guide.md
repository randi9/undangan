# Panduan Deploy Web Undangan (Vercel + Supabase)

Dokumen ini menggunakan arsitektur yang **sesuai implementasi saat ini**:

- Frontend: Vue + Vite.
- Backend API: Express routes di `server/src`, diekspor lewat `api/index.ts` untuk Vercel Serverless.
- Database & file storage: Supabase (Postgres + Storage bucket `uploads`).

---

## 1) Arsitektur produksi

1. Semua endpoint API didefinisikan satu sumber di `server/src/routes/*`.
2. `api/index.ts` hanya adaptor serverless yang mengekspor app Express dari `server/src/index.ts`.
3. Upload foto menggunakan `multipart/form-data` (`/api/upload/single` dan `/api/upload/multiple`) dan disimpan ke Supabase Storage.

Dengan model ini, perilaku lokal dan production menjadi konsisten (menghindari drift endpoint).

---

## 2) Environment variables

Isi env minimal di environment deploy:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CORS_ORIGINS` (comma-separated, contoh: `https://admin.domainanda.com,https://domainanda.com`)

Contoh file lokal ada di `server/.env.example`.

> Jangan commit `.env` ke repository.

---

## 3) Konfigurasi Vercel

`vercel.json`:

- rewrite `/api/(.*)` ke `/api`
- fallback route frontend ke `/index.html`

Pastikan project menggunakan build command frontend standar (`npm run build`).

---

## 4) Subdomain wildcard

Untuk akses undangan via subdomain (`slug.domainanda.com`):

1. Tambahkan domain utama di Vercel.
2. Tambahkan wildcard domain `*.domainanda.com`.
3. Set DNS record wildcard (`*`) ke target CNAME Vercel.

Vue Router akan membaca subdomain dan merender halaman undangan yang sesuai slug.

---

## 5) Security checklist sebelum go-live

1. Rotasi semua secret lama yang pernah terekspos.
2. Pastikan `.env` tidak tracked git.
3. Batasi `CORS_ORIGINS` hanya domain resmi.
4. Verifikasi bucket `uploads` punya policy read-only public (atau signed URL bila perlu).
5. Jalankan ulang smoke test endpoint:
   - `GET /api/health`
   - `POST /api/upload/single`
   - `POST /api/upload/multiple`
   - CRUD invitations + RSVP.
