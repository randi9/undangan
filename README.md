# Undangan Generator

Aplikasi generator undangan pernikahan dengan frontend Vue dan backend Express + Supabase.

## Arsitektur

- Frontend: Vue 3 + Vite.
- Backend routes: `server/src/routes/*`.
- Serverless adapter: `api/index.ts` (export app Express yang sama untuk Vercel).
- Database & storage: Supabase (`invitations`, `photos`, `rsvps`, bucket `uploads`).

## Menjalankan lokal

1. Install dependency root:

```sh
npm install
```

2. Install dependency backend:

```sh
cd server
npm install
```

3. Siapkan env backend:

- Copy `server/.env.example` menjadi `server/.env`.
- Isi `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY`.

4. Jalankan frontend dan backend (terminal terpisah):

```sh
# root
npm run dev

# server
cd server
npm run dev
```

## Build checks

```sh
# root
npm run build

# server
cd server
npm run build
```

## Kontrak upload

Upload menggunakan `multipart/form-data` secara konsisten:

- `POST /api/upload/single` (field: `photo`)
- `POST /api/upload/multiple` (field: `photos[]`)

## Keamanan wajib

1. Jangan commit `.env`.
2. Rotasi secret jika pernah terekspos.
3. Batasi `CORS_ORIGINS` ke domain resmi.

## Deploy

Lihat panduan lengkap di `deployment_guide.md`.
