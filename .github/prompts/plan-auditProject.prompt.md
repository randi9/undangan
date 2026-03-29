## Plan Eksekusi Audit Proyek Undangan

Tujuan: mengeksekusi audit end-to-end yang bisa langsung dipakai tim (frontend + backend + deploy).

## 1) Scope & Output

### Scope
- Frontend Vue/Pinia/router.
- Backend local server (`server/src`) dan serverless (`api/index.ts`).
- Integrasi data (Supabase/env), upload, RSVP, invitation CRUD.
- Build/deploy (Vite, Vercel, tsconfig, scripts).

### Output wajib
1. Daftar temuan High/Medium/Low + dampak.
2. Matriks kontrak API FE-BE per endpoint.
3. Daftar mismatch per file + rekomendasi perbaikan.
4. Roadmap remediation: quick wins (1–2 hari) dan short-term (1 minggu).

---

## 2) Urutan Eksekusi (Runbook)

### Phase A — Security & Environment Triage (P0)
Checklist:
- [ ] Inventaris semua secret/env yang dipakai app.
- [ ] Cek potensi hardcoded credential, key, URL sensitif.
- [ ] Verifikasi env untuk local vs production tidak tercampur.

File audit:
- [ ] `package.json`
- [ ] `server/package.json`
- [ ] `.env` / `.env.*` (jika ada)
- [ ] `README.md`
- [ ] `deployment_guide.md`

Output phase:
- [ ] Tabel `variable -> digunakan di mana -> level risiko -> aksi`.

### Phase B — Backend Source of Truth & Endpoint Map (P0)
Checklist:
- [ ] Tentukan backend utama saat runtime (local server vs serverless).
- [ ] Buat peta endpoint aktual dan method HTTP.
- [ ] Tandai endpoint yang hanya ada di salah satu backend.

File audit:
- [ ] `api/index.ts`
- [ ] `server/src/index.ts`
- [ ] `server/src/routes/invitations.ts`
- [ ] `server/src/routes/rsvp.ts`
- [ ] `server/src/routes/upload.ts`

Output phase:
- [ ] Matriks endpoint: `path | method | local | serverless | status`.

### Phase C — API Contract FE-BE (P0)
Checklist:
- [ ] Audit `createInvitation()` FE vs payload BE.
- [ ] Audit `updateInvitation()` FE vs payload BE.
- [ ] Audit `uploadPhotos()` FE vs format BE (multipart/base64/single/multiple).
- [ ] Audit RSVP submit FE vs validation BE.

File audit:
- [ ] `src/stores/invitation.ts`
- [ ] `src/views/invitation/InvitationView.vue`
- [ ] `api/index.ts`
- [ ] `server/src/routes/invitations.ts`
- [ ] `server/src/routes/rsvp.ts`
- [ ] `server/src/routes/upload.ts`

Output phase:
- [ ] Contract matrix: `field | FE type | BE expect | mismatch | impact`.

### Phase D — Type Consistency & Runtime Stability (P1)
Checklist:
- [ ] Validasi tipe domain (`photos`, `groom`, `bride`, `eventDate`, dsb).
- [ ] Audit titik rawan crash: `JSON.parse`, null/undefined access.
- [ ] Audit pembentukan URL foto (relative vs absolute).
- [ ] Audit state sync store setelah create/update/delete.

File audit:
- [ ] `src/types/invitation.ts`
- [ ] `src/views/admin/CreateInvitationView.vue`
- [ ] `src/views/admin/EditInvitationView.vue`
- [ ] `src/views/admin/DashboardView.vue`
- [ ] `src/views/invitation/InvitationView.vue`
- [ ] `src/stores/invitation.ts`

Output phase:
- [ ] Daftar bug runtime potensial + langkah reproduksi.

### Phase E — Security Validation & Upload Hardening (P1)
Checklist:
- [ ] Audit validasi input backend (required, enum, length, format).
- [ ] Audit upload safety (mime, size, extension, file naming).
- [ ] Audit CORS policy dan error message exposure.

File audit:
- [ ] `api/index.ts`
- [ ] `server/src/routes/upload.ts`
- [ ] `server/src/routes/invitations.ts`
- [ ] `server/src/routes/rsvp.ts`

Output phase:
- [ ] Daftar hardening action terurut dari risiko tertinggi.

### Phase F — Build/Deploy & Dependency Governance (P1/P2)
Checklist:
- [ ] Audit script build/type-check root dan server.
- [ ] Audit perbedaan dependency versi root vs server.
- [ ] Audit Vercel rewrite/routing dengan router frontend.
- [ ] Audit tsconfig untuk compile target yang konsisten.

File audit:
- [ ] `package.json`
- [ ] `server/package.json`
- [ ] `vercel.json`
- [ ] `vite.config.ts`
- [ ] `tsconfig.json`
- [ ] `tsconfig.app.json`
- [ ] `tsconfig.node.json`
- [ ] `server/tsconfig.json`

Output phase:
- [ ] Rekomendasi standardisasi dependency + deploy checklist final.

---

## 3) Prioritas Remediasi

### P0 (harus dulu)
- Secret leak / credential exposure.
- Mismatch endpoint upload atau kontrak API yang memutus flow utama.
- Crash runtime pada halaman inti (create/edit/invitation view).

### P1
- Validasi input backend belum ketat.
- CORS terlalu permisif.
- Ketidakkonsistenan tipe domain FE-BE.

### P2
- Perapihan dependency drift.
- Konsistensi logging/observability.
- Peningkatan quality gate CI.

---

## 4) Template Laporan Temuan (pakai format ini)

### [SEVERITY] Judul temuan
- Ringkasan: ...
- Lokasi file: ...
- Bukti teknis: ...
- Dampak: ...
- Rekomendasi: ...
- Estimasi effort: ...

---

## 5) Definition of Done

- [ ] Semua endpoint kritis punya kontrak FE-BE yang cocok.
- [ ] Tidak ada temuan P0 terbuka.
- [ ] Daftar P1 punya owner dan target tanggal.
- [ ] Deploy checklist lulus untuk environment target.

