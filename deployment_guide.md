# Panduan Deploy Web Undangan (Vercel + Turso SQLite)

Anda ingin meng-hosting **Frontend** di Vercel menggunakan domain sendiri dengan model Subdomain Wildcard, dan memindahkan **Database SQLite** ke [Turso (Serverless SQLite)](https://turso.tech/). Ini adalah arsitektur modern (*Serverless*) yang sangat cepat dan murah.

Namun, karena kita berpindah dari server tradisional (VPS/Lokal) ke **Serverless**, ada beberapa penyesuaian wajib pada arsitektur Backend yang harus dilakukan sebelum kode ini bisa berjalan di Vercel.

---

## ⚠️ PERHATIAN: Perubahan Arsitektur Serverless

Sebelum mendeploy ke Vercel, Anda perlu mengubah dua hal utama di `server/src`:

1. **Database Driver (Dari SQLite ke Turso)**
   Kode saat ini menggunakan `better-sqlite3` yang membaca file lokal (`database.sqlite`). Di Turso, Anda harus menggantinya menggunakan `@libsql/client` untuk melakukan koneksi ke database cloud.
   ```bash
   npm install @libsql/client
   ```
   *(File `database.ts` perlu direfaktor untuk menggunakan `createClient` dari libSQL dengan URL & Auth Token dari Turso).*

2. **Penyimpanan Foto (Dari Folder Lokal ke Cloud)**
   Saat ini, foto disimpan di folder lokal `server/uploads/` menggunakan `multer`. **Vercel Serverless tidak mengizinkan penyimpanan file permanen di lokal.** 
   Solusinya: Anda harus menggunakan **Vercel Blob**, **Cloudinary**, atau **AWS S3** untuk menyimpan foto yang di-upload dari admin panel.

---

## Tahap 1: Setup Database Turso

1. **Buat Akun dan Database Turso:**
   - Daftar di [turso.tech](https://turso.tech/).
   - Buat database baru (misal: `undangan-db`).
   - Dapatkan **Database URL** dan **Auth Token**.

2. **Update Backend Anda:**
   Ganti file `server/src/database.ts` menggunakan `@libsql/client`.
   Lakukan sinkronisasi struktur tabel (`invitations`, `photos`, `rsvps`) ke dalam database Turso menggunakan Turso CLI atau Drizzle/Prisma jika Anda menggunakannya.

---

## Tahap 2: Deploy Backend & Frontend ke Vercel

Karena Vercel bisa menjalankan Frontend (Vue) dan Backend (Express API) sekaligus sebagai *Serverless Functions*, Anda bisa menyatukan routing.

1. **Buat file `vercel.json` di root folder project:**
   Ini memberitahu Vercel cara menjalankan API Express Anda.
   ```json
   {
     "rewrites": [
       { "source": "/api/(.*)", "destination": "/server/api/index.js" },
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
   *(Catatan: Anda mungkin memerlukan adapter seperti `serverless-http` jika ingin memakai Express murni di Vercel API, atau memindahkan rute Anda ke folder `/api` khusus Next.js/Vercel gaya baru).*

2. **Ubah `apiBase` di Frontend:**
   Di file frontend (`DashboardView.vue`, dll), hapus hardcode `http://localhost:3000` menjadi kosong atau path relatif:
   ```typescript
   // Di Vercel, frontend dan API berjalan di domain yang sama
   const apiBase = '' 
   ```

3. **Deploy via Github ke Vercel:**
   - Push kode final Anda (yang sudah memakai Turso & Cloudinary/Vercel Blob) ke Github.
   - Login ke Vercel, pilih **Add New Project**, dan import repository Github Anda.
   - Set Framework Preset ke **Vite / Vue**.
   - Masukkan Environment Variables (TURSO_URL, TURSO_AUTH_TOKEN, CLOUDINARY_URL, dll).
   - Klik **Deploy**.

---

## Tahap 3: Setting Custom Domain & Wildcard Subdomain di Vercel

Agar undangan bisa diakses di subdomain (contoh: `romi-juli.domainanda.com`), ikuti langkah ini di dashboard Vercel Anda:

1. Masuk ke tab **Settings > Domains** di project Vercel.
2. Ketik nama domain utama Anda: `domainanda.com` lalu klik Add.
3. Vercel akan meminta Anda menambahkan **A Record** atau **Nameservers** di tempat Anda membeli domain. Ikuti instruksi tersebut sampai Vercel menyatakan *Valid*.
4. **Tambahkan Wildcard Domain:**
   Di kolom tambah domain Vercel, ketikkan `*.domainanda.com` lalu klik Add.
5. Vercel akan memberikan record **CNAME** baru. Masukkan CNAME tersebut ke panel DNS provider domain Anda (misal Host (Name): `*` dan Target (Value): `cname.vercel-dns.com`).

**Selesai!** 
Sekarang, jika seseorang membuka `andi-sarah.domainanda.com`, Vercel akan mengarahkannya ke aplikasi Vue Anda, dan Vue Router (yang sudah kita optimasi sebelumnya) akan langsung membaca "andi-sarah" lalu merender tampilan undangan tanpa merubah URL.
