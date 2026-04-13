<template>
  <div class="legal-page">
    <!-- Navigation -->
    <nav class="legal-nav">
      <div class="legal-nav-inner">
        <a href="https://mengundanganda.com" class="legal-logo">
          <img src="/images/logo.webp" alt="MengundangAnda Logo" class="legal-logo-img">
          <span>Mengundang<span class="legal-logo-accent">Anda</span></span>
        </a>
        <a href="/login" class="legal-nav-cta">Buat Undangan</a>
      </div>
    </nav>

    <!-- Hero Banner -->
    <div class="legal-hero">
      <div class="legal-hero-bg"></div>
      <div class="legal-container legal-hero-content">
        <div class="legal-hero-badge">
          <Icon icon="solar:shield-check-bold-duotone" class="legal-hero-badge-icon" />
          <span>Perlindungan Data</span>
        </div>
        <h1>Kebijakan Privasi</h1>
        <p class="legal-hero-sub">Bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda</p>
        <div class="legal-hero-meta">
          <div class="legal-meta-item">
            <Icon icon="solar:calendar-bold-duotone" class="legal-meta-icon" />
            <span>Berlaku sejak 6 April 2026</span>
          </div>
          <div class="legal-meta-item">
            <Icon icon="solar:refresh-bold-duotone" class="legal-meta-icon" />
            <span>Versi 1.0</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Table of Contents -->
    <div class="legal-toc-bar">
      <div class="legal-container">
        <div class="legal-toc">
          <span class="legal-toc-label">Navigasi Cepat</span>
          <div class="legal-toc-links">
            <a href="#pendahuluan">Pendahuluan</a>
            <a href="#data-dikumpulkan">Data Dikumpulkan</a>
            <a href="#penggunaan">Penggunaan Data</a>
            <a href="#dasar-hukum">Dasar Hukum</a>
            <a href="#keamanan">Keamanan</a>
            <a href="#berbagi">Berbagi Data</a>
            <a href="#cookie">Cookie</a>
            <a href="#hak-anda">Hak Anda</a>
            <a href="#retensi">Retensi</a>
            <a href="#pihak-ketiga">Pihak Ketiga</a>
            <a href="#anak">Perlindungan Anak</a>
            <a href="#perubahan">Perubahan</a>
            <a href="#kontak">Kontak</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <main class="legal-content">
      <div class="legal-container">

        <!-- Commitment Banner -->
        <div class="legal-notice">
          <Icon icon="solar:lock-keyhole-bold-duotone" class="legal-notice-icon" />
          <div>
            <strong>Komitmen Kami:</strong> MengundangAnda berkomitmen untuk melindungi privasi Anda. Kami <strong>tidak pernah menjual</strong> data pribadi Anda kepada pihak ketiga mana pun. Data Anda hanya digunakan untuk memberikan layanan terbaik kepada Anda.
          </div>
        </div>

        <section id="pendahuluan">
          <div class="legal-section-number">01</div>
          <h2>Pendahuluan</h2>
          <p>Kebijakan Privasi ini ("Kebijakan") menjelaskan praktik MengundangAnda ("Kami", "Platform") dalam mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda ketika Anda menggunakan layanan kami.</p>
          <p>Kebijakan ini merupakan bagian yang tidak terpisahkan dari <router-link to="/terms" class="legal-inline-link">Syarat & Ketentuan</router-link> kami. Dengan menggunakan layanan MengundangAnda, Anda menyatakan telah membaca dan memahami Kebijakan ini.</p>
          <p>Kebijakan ini disusun dengan merujuk pada prinsip-prinsip perlindungan data pribadi sebagaimana diatur dalam Undang-Undang Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP) Republik Indonesia.</p>
        </section>

        <section id="data-dikumpulkan">
          <div class="legal-section-number">02</div>
          <h2>Data yang Kami Kumpulkan</h2>

          <h3>2.1 Data yang Anda Berikan Secara Langsung</h3>
          <div class="legal-data-table">
            <div class="legal-data-row legal-data-header">
              <span>Kategori Data</span>
              <span>Detail</span>
              <span>Tujuan</span>
            </div>
            <div class="legal-data-row">
              <span class="legal-data-label">
                <Icon icon="solar:user-bold-duotone" class="legal-data-icon" /> Data Akun
              </span>
              <span>Nama lengkap, alamat email, kata sandi (terenkripsi)</span>
              <span>Autentikasi & identifikasi pengguna</span>
            </div>
            <div class="legal-data-row">
              <span class="legal-data-label">
                <Icon icon="solar:document-text-bold-duotone" class="legal-data-icon" /> Data Undangan
              </span>
              <span>Nama pasangan, tanggal & lokasi acara, foto, love story, quote</span>
              <span>Pembuatan & tampilan undangan digital</span>
            </div>
            <div class="legal-data-row">
              <span class="legal-data-label">
                <Icon icon="solar:users-group-rounded-bold-duotone" class="legal-data-icon" /> Data RSVP
              </span>
              <span>Nama tamu, konfirmasi kehadiran, jumlah tamu, pesan ucapan</span>
              <span>Pengelolaan tamu & ucapan</span>
            </div>
            <div class="legal-data-row">
              <span class="legal-data-label">
                <Icon icon="solar:card-bold-duotone" class="legal-data-icon" /> Data Pembayaran
              </span>
              <span>Informasi transaksi (diproses oleh gateway pihak ketiga)</span>
              <span>Pemrosesan pembayaran Premium</span>
            </div>
            <div class="legal-data-row">
              <span class="legal-data-label">
                <Icon icon="solar:wallet-bold-duotone" class="legal-data-icon" /> Data Rekening
              </span>
              <span>Nomor rekening, nama bank, nama pemilik rekening</span>
              <span>Fitur amplop digital / gift</span>
            </div>
          </div>

          <h3>2.2 Data yang Dikumpulkan Secara Otomatis</h3>
          <ul>
            <li><strong>Data perangkat:</strong> Tipe browser, sistem operasi, resolusi layar</li>
            <li><strong>Data penggunaan:</strong> Halaman yang dikunjungi, durasi kunjungan, fitur yang digunakan</li>
            <li><strong>Data jaringan:</strong> Alamat IP, lokasi umum (tingkat kota/negara)</li>
            <li><strong>Cookie & identifikasi:</strong> Cookie sesi, token autentikasi, preferensi pengguna</li>
          </ul>
        </section>

        <section id="penggunaan">
          <div class="legal-section-number">03</div>
          <h2>Bagaimana Kami Menggunakan Data Anda</h2>
          <div class="legal-grid">
            <div class="legal-grid-item">
              <Icon icon="solar:server-minimalistic-bold-duotone" class="legal-grid-icon" />
              <h4>Penyediaan Layanan</h4>
              <p>Membuat akun, menampilkan undangan, memproses RSVP, dan menjalankan seluruh fitur platform.</p>
            </div>
            <div class="legal-grid-item">
              <Icon icon="solar:shield-check-bold-duotone" class="legal-grid-icon" />
              <h4>Keamanan</h4>
              <p>Mendeteksi dan mencegah penipuan, penyalahgunaan, dan ancaman keamanan terhadap akun Anda.</p>
            </div>
            <div class="legal-grid-item">
              <Icon icon="solar:chart-2-bold-duotone" class="legal-grid-icon" />
              <h4>Peningkatan Layanan</h4>
              <p>Menganalisis penggunaan untuk meningkatkan kualitas, performa, dan pengalaman pengguna.</p>
            </div>
            <div class="legal-grid-item">
              <Icon icon="solar:chat-round-dots-bold-duotone" class="legal-grid-icon" />
              <h4>Komunikasi</h4>
              <p>Mengirim notifikasi terkait layanan, RSVP baru, status undangan, dan pembaruan penting.</p>
            </div>
          </div>
          <div class="legal-callout">
            <Icon icon="solar:hand-shake-bold-duotone" class="legal-callout-icon" />
            <div>
              <p><strong>Janji Kami:</strong> Kami <strong>tidak</strong> menggunakan data pribadi Anda untuk tujuan periklanan atau pemasaran pihak ketiga. Kami tidak menjual, menyewakan, atau menukarkan data Anda kepada siapa pun.</p>
            </div>
          </div>
        </section>

        <section id="dasar-hukum">
          <div class="legal-section-number">04</div>
          <h2>Dasar Hukum Pemrosesan</h2>
          <p>Kami memproses data pribadi Anda berdasarkan dasar hukum berikut sesuai UU PDP:</p>
          <ul>
            <li><strong>Persetujuan:</strong> Anda memberikan persetujuan saat mendaftar akun dan menyetujui Syarat & Ketentuan serta Kebijakan Privasi</li>
            <li><strong>Pelaksanaan Kontrak:</strong> Pemrosesan diperlukan untuk memenuhi layanan yang Anda minta (pembuatan undangan, RSVP, dll.)</li>
            <li><strong>Kepentingan Sah:</strong> Untuk keamanan platform, pencegahan penipuan, dan peningkatan layanan</li>
            <li><strong>Kepatuhan Hukum:</strong> Untuk memenuhi kewajiban hukum atau perintah otoritas yang berwenang</li>
          </ul>
        </section>

        <section id="keamanan">
          <div class="legal-section-number">05</div>
          <h2>Keamanan Data</h2>
          <p>Kami menerapkan langkah-langkah teknis dan organisasional untuk melindungi data Anda:</p>
          <div class="legal-security-grid">
            <div class="legal-security-item">
              <Icon icon="solar:lock-password-bold-duotone" class="legal-security-icon" />
              <div>
                <h4>Enkripsi Kata Sandi</h4>
                <p>Kata sandi dienkripsi menggunakan <strong>bcrypt</strong> — tidak pernah disimpan dalam bentuk teks biasa.</p>
              </div>
            </div>
            <div class="legal-security-item">
              <Icon icon="solar:shield-keyhole-bold-duotone" class="legal-security-icon" />
              <div>
                <h4>HTTPS/TLS</h4>
                <p>Seluruh komunikasi data antara browser dan server dilindungi enkripsi TLS/SSL.</p>
              </div>
            </div>
            <div class="legal-security-item">
              <Icon icon="solar:cloud-bold-duotone" class="legal-security-icon" />
              <div>
                <h4>Penyimpanan Aman</h4>
                <p>File media disimpan di <strong>AWS S3</strong> dengan kontrol akses ketat dan enkripsi server-side.</p>
              </div>
            </div>
            <div class="legal-security-item">
              <Icon icon="solar:key-minimalistic-bold-duotone" class="legal-security-icon" />
              <div>
                <h4>Akses Terbatas</h4>
                <p>Hanya personel yang berwenang dengan akses minimal yang diperlukan dapat mengakses data pribadi.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="berbagi">
          <div class="legal-section-number">06</div>
          <h2>Berbagi Informasi dengan Pihak Ketiga</h2>
          <div class="legal-callout legal-callout-success">
            <Icon icon="solar:verified-check-bold-duotone" class="legal-callout-icon" />
            <div>
              <p><strong>Prinsip Utama:</strong> Kami <strong>tidak menjual</strong> informasi pribadi Anda kepada pihak ketiga mana pun, dalam keadaan apa pun.</p>
            </div>
          </div>
          <p>Kami hanya membagikan informasi dalam situasi terbatas berikut:</p>
          <ul>
            <li><strong>Tamu undangan:</strong> Informasi acara yang Anda pilih untuk ditampilkan di undangan (nama, tanggal, lokasi) akan terlihat oleh siapa pun yang memiliki link undangan</li>
            <li><strong>Penyedia layanan teknis:</strong> Pihak ketiga yang membantu mengoperasikan platform (detail di bagian Layanan Pihak Ketiga)</li>
            <li><strong>Kewajiban hukum:</strong> Jika secara tegas diwajibkan oleh peraturan perundang-undangan, perintah pengadilan, atau permintaan resmi otoritas pemerintah yang berwenang</li>
            <li><strong>Dengan persetujuan Anda:</strong> Situasi lain di mana Anda secara eksplisit memberikan persetujuan tertulis</li>
          </ul>
        </section>

        <section id="cookie">
          <div class="legal-section-number">07</div>
          <h2>Cookie & Teknologi Pelacakan</h2>
          <div class="legal-data-table">
            <div class="legal-data-row legal-data-header">
              <span>Jenis Cookie</span>
              <span>Tujuan</span>
              <span>Durasi</span>
            </div>
            <div class="legal-data-row">
              <span class="legal-data-label">Cookie Esensial</span>
              <span>Menjaga sesi login, keamanan, dan fungsi dasar platform</span>
              <span>Sesi / 30 hari</span>
            </div>
            <div class="legal-data-row">
              <span class="legal-data-label">Cookie Preferensi</span>
              <span>Menyimpan tema yang dipilih, bahasa, dan pengaturan tampilan</span>
              <span>1 tahun</span>
            </div>
            <div class="legal-data-row">
              <span class="legal-data-label">Cookie Analitik</span>
              <span>Memahami pola penggunaan untuk meningkatkan layanan (Vercel Analytics)</span>
              <span>1 tahun</span>
            </div>
          </div>
          <p>Anda dapat mengatur browser untuk menolak cookie. Namun, cookie esensial diperlukan agar layanan berfungsi dengan baik — menonaktifkannya dapat memengaruhi pengalaman penggunaan Anda.</p>
        </section>

        <section id="hak-anda">
          <div class="legal-section-number">08</div>
          <h2>Hak-Hak Anda</h2>
          <p>Sesuai dengan UU PDP, Anda memiliki hak-hak berikut atas data pribadi Anda:</p>
          <div class="legal-rights-grid">
            <div class="legal-right-item">
              <Icon icon="solar:eye-bold-duotone" class="legal-right-icon" />
              <h4>Hak Akses</h4>
              <p>Meminta salinan data pribadi yang kami simpan tentang Anda</p>
            </div>
            <div class="legal-right-item">
              <Icon icon="solar:pen-new-square-bold-duotone" class="legal-right-icon" />
              <h4>Hak Perbaikan</h4>
              <p>Memperbarui atau memperbaiki data yang tidak akurat atau tidak lengkap</p>
            </div>
            <div class="legal-right-item">
              <Icon icon="solar:trash-bin-minimalistic-bold-duotone" class="legal-right-icon" />
              <h4>Hak Penghapusan</h4>
              <p>Meminta penghapusan akun dan seluruh data pribadi Anda</p>
            </div>
            <div class="legal-right-item">
              <Icon icon="solar:stop-bold-duotone" class="legal-right-icon" />
              <h4>Hak Pembatasan</h4>
              <p>Meminta pembatasan pemrosesan data dalam situasi tertentu</p>
            </div>
            <div class="legal-right-item">
              <Icon icon="solar:download-minimalistic-bold-duotone" class="legal-right-icon" />
              <h4>Hak Portabilitas</h4>
              <p>Meminta data Anda dalam format yang terstruktur dan dapat dibaca mesin</p>
            </div>
            <div class="legal-right-item">
              <Icon icon="solar:hand-shake-bold-duotone" class="legal-right-icon" />
              <h4>Hak Keberatan</h4>
              <p>Menolak pemrosesan data untuk tujuan tertentu yang tidak esensial</p>
            </div>
          </div>
          <p>Untuk menggunakan hak-hak Anda, kirim email ke <a href="mailto:halo@mengundanganda.com">halo@mengundanganda.com</a> dengan subjek "<strong>Permintaan Hak Privasi</strong>". Kami akan merespons dalam waktu <strong>14 hari kerja</strong>.</p>
        </section>

        <section id="retensi">
          <div class="legal-section-number">09</div>
          <h2>Penyimpanan & Retensi Data</h2>
          <div class="legal-data-table">
            <div class="legal-data-row legal-data-header">
              <span>Kategori</span>
              <span>Durasi Penyimpanan</span>
              <span>Setelah Berakhir</span>
            </div>
            <div class="legal-data-row">
              <span class="legal-data-label">Akun aktif</span>
              <span>Selama akun aktif digunakan</span>
              <span>Data disimpan hingga penghapusan</span>
            </div>
            <div class="legal-data-row">
              <span class="legal-data-label">Undangan Free</span>
              <span>2 hari sejak pembuatan</span>
              <span>Dihapus otomatis dari server</span>
            </div>
            <div class="legal-data-row">
              <span class="legal-data-label">Undangan Premium</span>
              <span>1 tahun sejak aktivasi</span>
              <span>Arsip 30 hari, lalu dihapus permanen</span>
            </div>
            <div class="legal-data-row">
              <span class="legal-data-label">Penghapusan akun</span>
              <span>Permintaan via email</span>
              <span>Dihapus dalam 30 hari kerja</span>
            </div>
          </div>
        </section>

        <section id="pihak-ketiga">
          <div class="legal-section-number">10</div>
          <h2>Layanan Pihak Ketiga</h2>
          <p>Kami menggunakan layanan pihak ketiga tepercaya untuk mengoperasikan Platform. Berikut daftar penyedia layanan dan perannya:</p>
          <div class="legal-vendor-grid">
            <div class="legal-vendor-item">
              <h4>Clerk</h4>
              <span class="legal-vendor-role">Autentikasi & manajemen pengguna</span>
            </div>
            <div class="legal-vendor-item">
              <h4>Supabase</h4>
              <span class="legal-vendor-role">Database relasional & penyimpanan</span>
            </div>
            <div class="legal-vendor-item">
              <h4>Amazon Web Services (S3)</h4>
              <span class="legal-vendor-role">Penyimpanan file media terenkripsi</span>
            </div>
            <div class="legal-vendor-item">
              <h4>Mayar</h4>
              <span class="legal-vendor-role">Pemrosesan pembayaran</span>
            </div>
            <div class="legal-vendor-item">
              <h4>Vercel</h4>
              <span class="legal-vendor-role">Hosting, CDN, dan analitik web</span>
            </div>
          </div>
          <p>Setiap penyedia layanan terikat oleh perjanjian kerahasiaan dan kebijakan privasi mereka sendiri. Kami hanya membagikan data minimum yang diperlukan untuk fungsi layanan tersebut.</p>
        </section>

        <section id="anak">
          <div class="legal-section-number">11</div>
          <h2>Perlindungan Anak</h2>
          <p>Layanan kami tidak ditujukan untuk individu di bawah usia 17 (tujuh belas) tahun. Kami tidak secara sengaja mengumpulkan data pribadi dari anak di bawah umur. Jika kami mengetahui bahwa kami telah mengumpulkan data dari anak di bawah umur, kami akan segera menghapus data tersebut.</p>
        </section>

        <section id="perubahan">
          <div class="legal-section-number">12</div>
          <h2>Perubahan Kebijakan</h2>
          <p>Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan perubahan pada praktik kami atau peraturan yang berlaku. Perubahan signifikan akan diberitahukan melalui:</p>
          <ul>
            <li>Pemberitahuan email ke alamat yang terdaftar di akun Anda</li>
            <li>Banner pemberitahuan yang menonjol di dalam Platform</li>
            <li>Pembaruan tanggal "Berlaku sejak" di halaman ini</li>
          </ul>
          <p>Kami menyarankan Anda untuk meninjau Kebijakan ini secara berkala.</p>
        </section>

        <section id="kontak">
          <div class="legal-section-number">13</div>
          <h2>Hubungi Kami</h2>
          <p>Jika Anda memiliki pertanyaan, kekhawatiran, atau permintaan terkait privasi dan perlindungan data, jangan ragu untuk menghubungi kami:</p>
          <div class="legal-contact-grid">
            <a href="mailto:halo@mengundanganda.com" class="legal-contact-card">
              <Icon icon="solar:letter-bold-duotone" class="legal-contact-icon" />
              <span class="legal-contact-label">Email Privasi</span>
              <span class="legal-contact-value">halo@mengundanganda.com</span>
            </a>
            <a href="https://mengundanganda.com" class="legal-contact-card">
              <Icon icon="solar:global-bold-duotone" class="legal-contact-icon" />
              <span class="legal-contact-label">Website</span>
              <span class="legal-contact-value">mengundanganda.com</span>
            </a>
          </div>
          <p class="legal-note" style="margin-top: 20px;">Waktu respon: maksimal 14 hari kerja untuk permintaan terkait hak data pribadi.</p>
        </section>

      </div>
    </main>

    <!-- Footer -->
    <footer class="legal-footer">
      <div class="legal-container legal-footer-inner">
        <p>&copy; 2026 MengundangAnda. All rights reserved.</p>
        <div class="legal-footer-links">
          <router-link to="/terms">Syarat & Ketentuan</router-link>
          <router-link to="/privacy">Kebijakan Privasi</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Icon } from '@iconify/vue'

onMounted(() => {
  document.title = 'Kebijakan Privasi - MengundangAnda'
  window.scrollTo(0, 0)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

.legal-page {
  --lp-primary: #1e3a5f;
  --lp-primary-light: #2d5a8e;
  --lp-accent: #3b82f6;
  --lp-accent-light: rgba(59, 130, 246, 0.08);
  --lp-bg: #ffffff;
  --lp-bg-alt: #f8fafc;
  --lp-text: #1e293b;
  --lp-text-light: #64748b;
  --lp-text-lighter: #94a3b8;
  --lp-border: #e2e8f0;
  --lp-font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --lp-font-serif: 'Cormorant Garamond', Georgia, serif;

  font-family: var(--lp-font-sans);
  color: var(--lp-text);
  background: var(--lp-bg);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.legal-container {
  max-width: 820px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ===== Nav ===== */
.legal-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--lp-border);
  padding: 14px 24px;
}
.legal-nav-inner {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.legal-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-family: var(--lp-font-serif);
  font-size: 20px;
  font-weight: 600;
  color: var(--lp-primary);
}
.legal-logo-img { height: 32px; width: auto; }
.legal-logo-accent { color: var(--lp-accent); }
.legal-nav-cta {
  display: inline-flex;
  align-items: center;
  padding: 8px 20px;
  border-radius: 99px;
  background: var(--lp-accent);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}
.legal-nav-cta:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
}

/* ===== Hero ===== */
.legal-hero {
  position: relative;
  padding: 72px 24px 56px;
  overflow: hidden;
}
.legal-hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0f2440 0%, #1e3a5f 50%, #10b981 100%);
  z-index: 0;
}
.legal-hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.legal-hero-content {
  position: relative;
  z-index: 1;
  color: #fff;
}
.legal-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 6px 16px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 24px;
  backdrop-filter: blur(8px);
}
.legal-hero-badge-icon { font-size: 16px; }
.legal-hero h1 {
  font-family: var(--lp-font-serif);
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.1;
}
.legal-hero-sub {
  font-size: 16px;
  opacity: 0.8;
  margin-bottom: 24px;
  max-width: 520px;
}
.legal-hero-meta {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
.legal-meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  opacity: 0.7;
}
.legal-meta-icon { font-size: 18px; opacity: 0.9; }

/* ===== TOC ===== */
.legal-toc-bar {
  border-bottom: 1px solid var(--lp-border);
  background: var(--lp-bg-alt);
  padding: 16px 0;
  position: sticky;
  top: 57px;
  z-index: 40;
}
.legal-toc {
  display: flex;
  align-items: center;
  gap: 16px;
  overflow-x: auto;
  scrollbar-width: none;
}
.legal-toc::-webkit-scrollbar { display: none; }
.legal-toc-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--lp-text-lighter);
  white-space: nowrap;
  flex-shrink: 0;
}
.legal-toc-links {
  display: flex;
  gap: 4px;
}
.legal-toc-links a {
  font-size: 12px;
  font-weight: 500;
  color: var(--lp-text-light);
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 6px;
  white-space: nowrap;
  transition: all 0.2s ease;
}
.legal-toc-links a:hover {
  background: var(--lp-accent-light);
  color: var(--lp-accent);
}

/* ===== Content ===== */
.legal-content {
  flex: 1;
  padding: 48px 0 80px;
}
.legal-content section {
  margin-bottom: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid var(--lp-border);
  position: relative;
}
.legal-content section:last-child { border-bottom: none; }
.legal-section-number {
  font-family: var(--lp-font-serif);
  font-size: 48px;
  font-weight: 700;
  color: rgba(59, 130, 246, 0.1);
  position: absolute;
  top: -8px;
  right: 0;
  line-height: 1;
  user-select: none;
  pointer-events: none;
}
.legal-content h2 {
  font-family: var(--lp-font-serif);
  font-size: 26px;
  font-weight: 700;
  color: var(--lp-primary);
  margin-bottom: 16px;
  line-height: 1.2;
}
.legal-content h3 {
  font-size: 15px;
  font-weight: 700;
  color: var(--lp-text);
  margin-bottom: 8px;
  margin-top: 20px;
}
.legal-content p {
  font-size: 14.5px;
  line-height: 1.85;
  color: var(--lp-text-light);
  margin-bottom: 12px;
}
.legal-content ul {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
}
.legal-content li {
  font-size: 14.5px;
  line-height: 1.85;
  color: var(--lp-text-light);
  padding-left: 28px;
  position: relative;
  margin-bottom: 6px;
}
.legal-content li::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 11px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--lp-accent);
  opacity: 0.6;
}
.legal-content a, .legal-inline-link {
  color: var(--lp-accent);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}
.legal-content a:hover, .legal-inline-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

/* ===== Notice ===== */
.legal-notice {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 20px 24px;
  background: linear-gradient(135deg, #ecfdf5, #f0fdf4);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 12px;
  margin-bottom: 48px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--lp-text-light);
}
.legal-notice-icon {
  font-size: 24px;
  color: #10b981;
  flex-shrink: 0;
  margin-top: 2px;
}

/* ===== Grid ===== */
.legal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 20px 0;
}
.legal-grid-item {
  padding: 20px;
  background: var(--lp-bg-alt);
  border: 1px solid var(--lp-border);
  border-radius: 12px;
  transition: all 0.3s ease;
}
.legal-grid-item:hover {
  border-color: rgba(59, 130, 246, 0.2);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.06);
}
.legal-grid-icon {
  font-size: 28px;
  color: var(--lp-accent);
  margin-bottom: 12px;
}
.legal-grid-item h4 {
  font-size: 14px;
  font-weight: 700;
  color: var(--lp-text);
  margin-bottom: 6px;
}
.legal-grid-item p {
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
}

/* ===== Data Table ===== */
.legal-data-table {
  border: 1px solid var(--lp-border);
  border-radius: 12px;
  overflow: hidden;
  margin: 16px 0;
}
.legal-data-row {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  gap: 0;
  padding: 14px 20px;
  border-bottom: 1px solid var(--lp-border);
  font-size: 13px;
  color: var(--lp-text-light);
  line-height: 1.6;
}
.legal-data-row:last-child { border-bottom: none; }
.legal-data-header {
  background: var(--lp-bg-alt);
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--lp-text-lighter);
}
.legal-data-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--lp-text);
}
.legal-data-icon {
  font-size: 18px;
  color: var(--lp-accent);
}

/* ===== Security Grid ===== */
.legal-security-grid {
  display: grid;
  gap: 12px;
  margin: 16px 0;
}
.legal-security-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 16px 20px;
  background: var(--lp-bg-alt);
  border: 1px solid var(--lp-border);
  border-radius: 10px;
}
.legal-security-icon {
  font-size: 24px;
  color: #10b981;
  flex-shrink: 0;
  margin-top: 2px;
}
.legal-security-item h4 {
  font-size: 14px;
  font-weight: 700;
  color: var(--lp-text);
  margin-bottom: 4px;
}
.legal-security-item p {
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
}

/* ===== Callout ===== */
.legal-callout {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 20px 24px;
  background: var(--lp-bg-alt);
  border: 1px solid var(--lp-border);
  border-radius: 12px;
  margin: 16px 0;
}
.legal-callout-success {
  background: #ecfdf5;
  border-color: rgba(16, 185, 129, 0.2);
}
.legal-callout-icon {
  font-size: 24px;
  color: var(--lp-accent);
  flex-shrink: 0;
  margin-top: 2px;
}
.legal-callout-success .legal-callout-icon {
  color: #10b981;
}
.legal-callout p { margin: 0; }

/* ===== Rights Grid ===== */
.legal-rights-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  margin: 20px 0;
}
.legal-right-item {
  padding: 20px;
  background: var(--lp-bg-alt);
  border: 1px solid var(--lp-border);
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;
}
.legal-right-item:hover {
  border-color: rgba(59, 130, 246, 0.2);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.06);
}
.legal-right-icon {
  font-size: 28px;
  color: var(--lp-accent);
  margin-bottom: 10px;
}
.legal-right-item h4 {
  font-size: 13px;
  font-weight: 700;
  color: var(--lp-text);
  margin-bottom: 6px;
}
.legal-right-item p {
  font-size: 12px;
  line-height: 1.5;
  margin: 0;
}

/* ===== Vendor Grid ===== */
.legal-vendor-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
}
.legal-vendor-item {
  padding: 16px;
  background: var(--lp-bg-alt);
  border: 1px solid var(--lp-border);
  border-radius: 10px;
}
.legal-vendor-item h4 {
  font-size: 14px;
  font-weight: 700;
  color: var(--lp-text);
  margin-bottom: 4px;
}
.legal-vendor-role {
  font-size: 12px;
  color: var(--lp-text-lighter);
}

/* ===== Contact Grid ===== */
.legal-contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 20px;
}
.legal-contact-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 24px 16px;
  background: var(--lp-bg-alt);
  border: 1px solid var(--lp-border);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
}
.legal-contact-card:hover {
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.08);
  transform: translateY(-2px);
}
.legal-contact-icon { font-size: 32px; color: var(--lp-accent); }
.legal-contact-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--lp-text-lighter);
}
.legal-contact-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--lp-text);
}

/* ===== Note ===== */
.legal-note {
  font-size: 13px !important;
  font-style: italic;
  color: var(--lp-text-lighter) !important;
}

/* ===== Footer ===== */
.legal-footer {
  background: var(--lp-bg-alt);
  padding: 24px 0;
  border-top: 1px solid var(--lp-border);
}
.legal-footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.legal-footer p {
  font-size: 13px;
  color: var(--lp-text-lighter);
  margin: 0;
}
.legal-footer-links {
  display: flex;
  gap: 24px;
}
.legal-footer-links a {
  font-size: 13px;
  color: var(--lp-text-light);
  text-decoration: none;
  transition: color 0.2s ease;
}
.legal-footer-links a:hover { color: var(--lp-accent); }

/* ===== Responsive ===== */
@media (max-width: 640px) {
  .legal-hero { padding: 56px 24px 40px; }
  .legal-grid,
  .legal-contact-grid {
    grid-template-columns: 1fr;
  }
  .legal-rights-grid,
  .legal-vendor-grid {
    grid-template-columns: 1fr 1fr;
  }
  .legal-data-row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
  .legal-data-header { display: none; }
  .legal-toc-bar { top: 53px; }
  .legal-footer-inner {
    flex-direction: column;
    text-align: center;
  }
  .legal-section-number { font-size: 36px; }
}

@media (max-width: 400px) {
  .legal-rights-grid,
  .legal-vendor-grid {
    grid-template-columns: 1fr;
  }
}
</style>
