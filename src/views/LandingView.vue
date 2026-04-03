<template>
  <div class="landing" :style="{ '--scroll-y': scrollY + 'px' }">
    <!-- Navbar -->
    <nav class="lp-nav" :class="{ scrolled: navScrolled || mobileMenuOpen }">
      <div class="lp-container lp-nav-inner">
        <a href="#" class="lp-logo">
          <img src="/images/logo.webp" alt="MengundangAnda Logo" class="lp-logo-img">
          <span>Mengundang<span class="lp-logo-accent">Anda</span></span>
        </a>
        <button class="lp-nav-toggle" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Toggle menu">
          <span :class="{ open: mobileMenuOpen }"></span>
        </button>
        <ul class="lp-nav-links" :class="{ open: mobileMenuOpen }">
          <li><a href="#fitur" @click="mobileMenuOpen = false">Fitur</a></li>
          <li><a href="#tema" @click="mobileMenuOpen = false">Tema</a></li>
          <li><a href="#cara-kerja" @click="mobileMenuOpen = false">Cara Kerja</a></li>
          <li><a href="#testimoni" @click="mobileMenuOpen = false">Testimoni</a></li>
          <li><a href="#cta" class="lp-nav-cta" @click="mobileMenuOpen = false">Buat Undangan</a></li>
        </ul>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="lp-hero">
      <div class="lp-hero-bg"></div>
      <div class="lp-hero-overlay"></div>
      <div class="lp-container lp-hero-content">
        <p class="lp-hero-kicker lp-fade-up">Siap dalam hitungan menit — bukan hari</p>
        <h1 class="lp-hero-title lp-fade-up lp-delay-1">
          Undangan Pernikahan Anda,<br>
          <span class="lp-hero-script">Kapanpun. Tanpa Menunggu.</span>
        </h1>
        <p class="lp-hero-sub lp-fade-up lp-delay-2">
          Tidak perlu antri desainer. Tidak perlu menunggu berhari-hari.<br>
          Pilih tema, isi data, dan langsung bagikan — semudah itu.
        </p>
        <div class="lp-hero-actions lp-fade-up lp-delay-3">
          <a href="#cta" class="lp-btn lp-btn-primary">Buat Undangan Sekarang</a>
          <a href="#tema" class="lp-btn lp-btn-outline">Lihat Tema</a>
        </div>
      </div>
      <div class="lp-hero-scroll-hint lp-fade-up lp-delay-3">
        <span>Scroll untuk menjelajahi</span>
        <div class="lp-scroll-arrow"></div>
      </div>
    </section>

    <!-- Fitur Section -->
    <section id="fitur" class="lp-section lp-section-alt">
      <div class="lp-container">
        <div class="lp-section-header">
          <p class="lp-section-kicker">Kenapa Kami?</p>
          <h2 class="lp-section-title">Semua yang Anda Butuhkan</h2>
          <p class="lp-section-sub">Fitur lengkap untuk membuat undangan pernikahan digital yang sempurna</p>
        </div>
        <div class="lp-features-grid">
          <div class="lp-feature-card" v-for="feature in features" :key="feature.title">
            <div class="lp-feature-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Tema Section -->
    <section id="tema" class="lp-section">
      <div class="lp-container">
        <div class="lp-section-header">
          <p class="lp-section-kicker">Koleksi Tema</p>
          <h2 class="lp-section-title">Pilih Tema Favorit Anda</h2>
          <p class="lp-section-sub">Tiga pilihan desain yang dirancang dengan keindahan dan keanggunan</p>
        </div>
        <div class="lp-themes-grid">
          <!-- Elegant -->
          <div class="lp-theme-card">
            <div class="lp-theme-preview lp-tp-elegant">
              <div class="lp-tp-border"></div>
              <div class="lp-tp-content">
                <div class="lp-tp-label">The Wedding Of</div>
                <div class="lp-tp-names">Romeo &amp; Juliet</div>
              </div>
            </div>
            <div class="lp-theme-info">
              <h3>Elegant Gold</h3>
              <p>Desain klasik premium dengan aksen emas dan font serif yang mewah.</p>
            </div>
          </div>
          <!-- Minimalist -->
          <div class="lp-theme-card">
            <div class="lp-theme-preview lp-tp-minimalist">
              <div class="lp-tp-content">
                <div class="lp-tp-label">THE WEDDING OF</div>
                <div class="lp-tp-names">ROMEO &amp; JULIET</div>
              </div>
            </div>
            <div class="lp-theme-info">
              <h3>Modern Minimalist</h3>
              <p>Tampilan bersih &amp; modern dengan ruang putih luas dan font sans-serif tebal.</p>
            </div>
          </div>
          <!-- Floral -->
          <div class="lp-theme-card">
            <div class="lp-theme-preview lp-tp-floral">
              <div class="lp-tp-deco lp-tp-deco-tl">🌿</div>
              <div class="lp-tp-circle">
                <div class="lp-tp-content">
                  <div class="lp-tp-label">The Wedding Of</div>
                  <div class="lp-tp-names">Romeo &amp; Juliet</div>
                </div>
              </div>
              <div class="lp-tp-deco lp-tp-deco-br">🌿</div>
            </div>
            <div class="lp-theme-info">
              <h3>Romantic Floral</h3>
              <p>Desain romantis dengan ornamen daun dan bunga, warna pastel lembut.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cara Kerja Section -->
    <section id="cara-kerja" class="lp-section lp-section-alt">
      <div class="lp-container">
        <div class="lp-section-header">
          <p class="lp-section-kicker">Mudah &amp; Cepat</p>
          <h2 class="lp-section-title">Cara Membuatnya</h2>
          <p class="lp-section-sub">Tiga langkah sederhana untuk undangan impian Anda</p>
        </div>
        <div class="lp-steps-grid">
          <div class="lp-step" v-for="(step, i) in steps" :key="step.title">
            <div class="lp-step-number">{{ i + 1 }}</div>
            <div class="lp-step-icon">{{ step.icon }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimoni Section -->
    <section id="testimoni" class="lp-section">
      <div class="lp-container">
        <div class="lp-section-header">
          <p class="lp-section-kicker">Apa Kata Mereka</p>
          <h2 class="lp-section-title">Testimoni Pengguna</h2>
        </div>
        <div class="lp-testimonials-grid">
          <div class="lp-testimonial" v-for="t in testimonials" :key="t.name">
            <div class="lp-testimonial-stars">★★★★★</div>
            <p class="lp-testimonial-text">"{{ t.text }}"</p>
            <div class="lp-testimonial-author">
              <div class="lp-testimonial-avatar">{{ t.avatar }}</div>
              <div>
                <div class="lp-testimonial-name">{{ t.name }}</div>
                <div class="lp-testimonial-role">{{ t.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section id="cta" class="lp-cta">
      <div class="lp-cta-bg"></div>
      <div class="lp-container lp-cta-content">
        <h2 class="lp-cta-title">Siap Membuat Undangan<br><span>Impian Anda?</span></h2>
        <p class="lp-cta-sub">Mulai sekarang dan buat undangan pernikahan digital yang indah dalam hitungan menit.</p>
        <a href="/" class="lp-btn lp-btn-white">Buat Undangan Gratis</a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="lp-footer">
      <div class="lp-container lp-footer-inner">
        <div class="lp-footer-brand">
          <a href="#" class="lp-logo">
            <img src="/images/logo.webp" alt="MengundangAnda Logo" class="lp-logo-img">
            <span>Mengundang<span class="lp-logo-accent">Anda</span></span>
          </a>
          <p>Platform undangan pernikahan digital premium. Buat, desain, dan bagikan undangan Anda dengan mudah.</p>
        </div>
        <div class="lp-footer-links">
          <h4>Navigasi</h4>
          <a href="#fitur">Fitur</a>
          <a href="#tema">Tema</a>
          <a href="#cara-kerja">Cara Kerja</a>
          <a href="#testimoni">Testimoni</a>
        </div>
        <div class="lp-footer-links">
          <h4>Kontak</h4>
          <a href="mailto:halo@mengundanganda.fun">halo@mengundanganda.fun</a>
          <a href="#">Instagram</a>
          <a href="#">WhatsApp</a>
        </div>
      </div>
      <div class="lp-footer-bottom">
        <div class="lp-container">
          <p>&copy; 2026 MengundangAnda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const navScrolled = ref(false)
const mobileMenuOpen = ref(false)
const scrollY = ref(0)

function handleScroll() {
  navScrolled.value = window.scrollY > 40
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const features = [
  { icon: '🎨', title: 'Desain Premium', desc: 'Pilihan tema elegan yang dirancang oleh desainer profesional untuk momen spesial Anda.' },
  { icon: '⚡', title: 'Mudah Digunakan', desc: 'Cukup isi data, pilih tema, dan undangan Anda siap dalam hitungan menit tanpa perlu keahlian teknis.' },
  { icon: '🔗', title: 'Bagikan Lewat Link', desc: 'Setiap undangan memiliki link unik yang bisa langsung dibagikan via WhatsApp, Instagram, atau media sosial lainnya.' },
  { icon: '🎵', title: 'Musik Latar', desc: 'Tambahkan lagu romantis favorit Anda sebagai musik latar undangan digital.' },
  { icon: '📍', title: 'Peta Lokasi', desc: 'Integrasikan Google Maps agar tamu dengan mudah menemukan lokasi acara Anda.' },
  { icon: '💌', title: 'RSVP & Ucapan', desc: 'Terima konfirmasi kehadiran dan ucapan dari tamu langsung di undangan Anda.' },
]

const steps = [
  { icon: '🎨', title: 'Pilih Tema', desc: 'Jelajahi koleksi tema premium kami dan pilih yang paling sesuai dengan kepribadian Anda.' },
  { icon: '✏️', title: 'Isi Data', desc: 'Masukkan data pernikahan seperti nama, tanggal, lokasi, dan detail acara lainnya.' },
  { icon: '🚀', title: 'Bagikan', desc: 'Undangan Anda langsung online! Bagikan link unik ke semua tamu yang Anda undang.' },
]

const testimonials = [
  { avatar: '👰', name: 'Aisyah & Rizky', role: 'Menikah November 2025', text: 'Undangannya sangat elegan! Semua tamu memuji desainnya. Proses pembuatannya juga sangat mudah dan cepat.' },
  { avatar: '💑', name: 'Dewi & Arif', role: 'Menikah Januari 2026', text: 'Fitur musik dan peta lokasinya sangat membantu. Tamu-tamu kami tidak ada yang bingung mencari lokasi acara.' },
  { avatar: '💍', name: 'Sarah & Budi', role: 'Menikah Maret 2026', text: 'Tema floral-nya cantik banget! Undangan digital ini jauh lebih praktis dan hemat dibanding undangan cetak.' },
]
</script>

<style scoped>
/* ========================================
   Landing Page — Blue & White Premium Theme
   ======================================== */

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Poppins:wght@300;400;500;600;700&family=Dancing+Script:wght@400;500;600;700&display=swap');

/* --- Theme Variables --- */
.landing {
  --lp-primary: #1e3a5f;
  --lp-primary-deep: #0f2440;
  --lp-accent: #3b82f6;
  --lp-accent-hover: #2563eb;
  --lp-accent-light: rgba(59, 130, 246, 0.10);
  --lp-accent-glow: rgba(59, 130, 246, 0.25);
  --lp-bg: #ffffff;
  --lp-bg-alt: #f0f5ff;
  --lp-text: #1e293b;
  --lp-text-light: #64748b;
  --lp-border: rgba(59, 130, 246, 0.12);
  --lp-navy: #0f172a;
  --lp-navy-mid: #1e3a5f;
  --lp-gold: #c9a96e;

  --lp-font-sans: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  --lp-font-serif: 'Cormorant Garamond', Georgia, serif;
  --lp-font-script: 'Dancing Script', cursive;
  --lp-radius-sm: 8px;
  --lp-radius-md: 12px;
  --lp-radius-lg: 16px;
  --lp-radius-xl: 24px;
  --lp-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  background: var(--lp-bg);
  color: var(--lp-text);
  overflow-x: hidden;
  font-family: var(--lp-font-sans);
}

/* --- Layout Helpers --- */
.lp-container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 24px;
}

.lp-section {
  padding: 100px 0;
  background: var(--lp-bg);
}

.lp-section-alt {
  background: var(--lp-bg-alt);
}

.lp-section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 60px;
}

.lp-section-kicker {
  font-family: var(--lp-font-sans);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--lp-accent);
  margin-bottom: 12px;
}

.lp-section-title {
  font-family: var(--lp-font-serif);
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 600;
  color: var(--lp-primary);
  margin-bottom: 16px;
  line-height: 1.2;
}

.lp-section-sub {
  font-size: 16px;
  color: var(--lp-text-light);
  line-height: 1.7;
}

/* --- Buttons --- */
.lp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  border-radius: 40px;
  font-family: var(--lp-font-sans);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: var(--lp-transition);
  border: 2px solid transparent;
  letter-spacing: 0.3px;
}

.lp-btn-primary {
  background: var(--lp-accent);
  color: #fff;
  border-color: var(--lp-accent);
  box-shadow: 0 4px 24px rgba(59, 130, 246, 0.35);
}
.lp-btn-primary:hover {
  background: var(--lp-accent-hover);
  border-color: var(--lp-accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.45);
}

.lp-btn-outline {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
}
.lp-btn-outline:hover {
  background: #fff;
  color: var(--lp-primary);
  border-color: #fff;
  transform: translateY(-2px);
}

.lp-btn-white {
  background: #fff;
  color: var(--lp-primary);
  border-color: #fff;
  font-size: 16px;
  padding: 16px 40px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.15);
}
.lp-btn-white:hover {
  background: var(--lp-bg-alt);
  transform: translateY(-3px);
  box-shadow: 0 8px 36px rgba(0,0,0,0.2);
}

/* --- Navbar --- */
.lp-nav {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 48px);
  max-width: 1140px;
  z-index: 100;
  padding: 16px 24px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: var(--lp-transition);
}

.lp-nav.scrolled {
  top: 12px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 32px rgba(15, 23, 42, 0.12);
  padding: 12px 24px;
}

.lp-nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0;
}

.lp-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-family: var(--lp-font-serif);
  font-size: 22px;
  font-weight: 600;
  color: #fff;
  transition: var(--lp-transition);
}

.lp-nav.scrolled .lp-logo {
  color: var(--lp-primary);
}

.lp-logo-img {
  height: 38px;
  width: auto;
  object-fit: contain;
}

.lp-logo-accent {
  color: var(--lp-accent);
}

.lp-nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
}

.lp-nav-links a {
  font-family: var(--lp-font-sans);
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 20px;
  transition: var(--lp-transition);
}

.lp-nav.scrolled .lp-nav-links a {
  color: var(--lp-text-light);
}

.lp-nav-links a:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
}

.lp-nav.scrolled .lp-nav-links a:hover {
  color: var(--lp-accent);
  background: var(--lp-accent-light);
}

.lp-nav-cta {
  background: var(--lp-accent) !important;
  color: #fff !important;
  padding: 10px 24px !important;
}
.lp-nav-cta:hover {
  background: var(--lp-accent-hover) !important;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
}

.lp-nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  position: relative;
}
.lp-nav-toggle span,
.lp-nav-toggle span::before,
.lp-nav-toggle span::after {
  display: block;
  width: 24px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: var(--lp-transition);
  position: absolute;
  left: 4px;
}
.lp-nav.scrolled .lp-nav-toggle span,
.lp-nav.scrolled .lp-nav-toggle span::before,
.lp-nav.scrolled .lp-nav-toggle span::after {
  background: var(--lp-primary);
}
.lp-nav-toggle span { top: 15px; }
.lp-nav-toggle span::before { content: ''; top: -7px; }
.lp-nav-toggle span::after { content: ''; top: 7px; }
.lp-nav-toggle span.open { background: transparent !important; }
.lp-nav-toggle span.open::before { transform: rotate(45deg); top: 0; }
.lp-nav-toggle span.open::after { transform: rotate(-45deg); top: 0; }

/* --- Hero --- */
.lp-hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  padding: 120px 24px 80px;
  overflow: hidden;
}

.lp-hero-bg {
  position: absolute;
  inset: -20%;
  background-image: url('https://media.mengundanganda.fun/landing-page/e7f421b4-ce9a-4223-a862-802fb6c064d0.webp');
  background-size: cover;
  background-position: center 30%;
  background-repeat: no-repeat;
  transform: translateY(calc(var(--scroll-y, 0px) * 0.35));
  will-change: transform;
  z-index: 0;
}

.lp-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.55) 0%,
    rgba(30, 58, 138, 0.5) 40%,
    rgba(30, 64, 175, 0.65) 100%
  );
  z-index: 1;
}

.lp-hero-content {
  position: relative;
  z-index: 2;
}

.lp-hero-kicker {
  font-family: var(--lp-font-sans);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 24px;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.4);
}

.lp-hero-title {
  font-family: var(--lp-font-serif);
  font-size: clamp(34px, 6vw, 60px);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.15;
  margin-bottom: 24px;
  text-shadow: 0 3px 16px rgba(8, 106, 226, 0.6), 0 1px rgba(13, 161, 219, 0.615);
}

.lp-hero-script {
  font-family: var(--lp-font-script);
  font-weight: 400;
  color: #93c5fd;
  font-size: clamp(38px, 7vw, 68px);
  text-shadow: 0 3px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.4);
}

.lp-hero-sub {
  font-size: 17px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.95);
  max-width: 560px;
  margin: 0 auto 40px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.4);
}

.lp-hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.lp-hero-scroll-hint {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  letter-spacing: 1px;
  z-index: 2;
}
.lp-scroll-arrow {
  width: 20px;
  height: 20px;
  margin: 8px auto 0;
  border-right: 2px solid rgba(147, 197, 253, 0.7);
  border-bottom: 2px solid rgba(147, 197, 253, 0.7);
  transform: rotate(45deg);
  animation: scrollBounce 2s infinite;
}
@keyframes scrollBounce {
  0%, 100% { transform: rotate(45deg) translateY(0); opacity: 1; }
  50% { transform: rotate(45deg) translateY(6px); opacity: 0.5; }
}

/* --- Fade-up animation --- */
.lp-fade-up {
  animation: fadeUp 0.8s ease both;
}
.lp-delay-1 { animation-delay: 0.15s; }
.lp-delay-2 { animation-delay: 0.3s; }
.lp-delay-3 { animation-delay: 0.45s; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

/* --- Features --- */
.lp-features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.lp-feature-card {
  background: var(--lp-bg);
  border: 1px solid var(--lp-border);
  border-radius: var(--lp-radius-lg);
  padding: 36px 28px;
  text-align: center;
  transition: var(--lp-transition);
  position: relative;
  overflow: hidden;
}
.lp-feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--lp-accent), #93c5fd);
  opacity: 0;
  transition: var(--lp-transition);
}
.lp-feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.12);
  border-color: var(--lp-accent);
}
.lp-feature-card:hover::before {
  opacity: 1;
}

.lp-feature-icon {
  font-size: 40px;
  margin-bottom: 20px;
}

.lp-feature-card h3 {
  font-family: var(--lp-font-serif);
  font-size: 19px;
  font-weight: 600;
  color: var(--lp-primary);
  margin-bottom: 10px;
}

.lp-feature-card p {
  font-size: 14px;
  color: var(--lp-text-light);
  line-height: 1.7;
}

/* --- Theme Previews --- */
.lp-themes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.lp-theme-card {
  border-radius: var(--lp-radius-lg);
  overflow: hidden;
  background: #fff;
  border: 1px solid var(--lp-border);
  transition: var(--lp-transition);
}
.lp-theme-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 50px rgba(59, 130, 246, 0.15);
  border-color: var(--lp-accent);
}

.lp-theme-preview {
  height: 320px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.lp-tp-content {
  text-align: center;
  z-index: 2;
}

/* Elegant */
.lp-tp-elegant {
  background: #2c2417;
  color: #fff;
}
.lp-tp-elegant .lp-tp-border {
  position: absolute;
  inset: 16px;
  border: 1px solid rgba(201, 169, 110, 0.3);
  pointer-events: none;
}
.lp-tp-elegant .lp-tp-label {
  font-family: var(--lp-font-sans);
  font-size: 10px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--lp-gold);
  margin-bottom: 14px;
}
.lp-tp-elegant .lp-tp-names {
  font-family: var(--lp-font-script);
  font-size: 38px;
  color: #fff;
}

/* Minimalist */
.lp-tp-minimalist {
  background: #ffffff;
  color: #111;
}
.lp-tp-minimalist .lp-tp-label {
  font-family: var(--lp-font-sans);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #999;
  margin-bottom: 10px;
}
.lp-tp-minimalist .lp-tp-names {
  font-family: var(--lp-font-sans);
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -1px;
  color: #111;
}

/* Floral */
.lp-tp-floral {
  background: #fdfbf7;
  color: #4a5d4e;
}
.lp-tp-circle {
  background: rgba(255,255,255,0.85);
  border-radius: 50%;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(138, 154, 91, 0.2);
}
.lp-tp-floral .lp-tp-label {
  font-family: var(--lp-font-serif);
  font-size: 11px;
  font-style: italic;
  color: #8a9a5b;
  margin-bottom: 8px;
}
.lp-tp-floral .lp-tp-names {
  font-family: var(--lp-font-serif);
  font-size: 20px;
  font-weight: 600;
  color: #4a5d4e;
}
.lp-tp-deco {
  position: absolute;
  font-size: 44px;
  opacity: 0.4;
}
.lp-tp-deco-tl { top: 16px; left: 16px; transform: rotate(135deg); }
.lp-tp-deco-br { bottom: 16px; right: 16px; transform: rotate(-45deg); }

.lp-theme-info {
  padding: 24px;
}
.lp-theme-info h3 {
  font-family: var(--lp-font-serif);
  font-size: 20px;
  font-weight: 600;
  color: var(--lp-primary);
  margin-bottom: 8px;
}
.lp-theme-info p {
  font-size: 14px;
  color: var(--lp-text-light);
  line-height: 1.6;
}

/* --- Steps --- */
.lp-steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  position: relative;
}
.lp-steps-grid::before {
  content: '';
  position: absolute;
  top: 40px;
  left: 15%;
  right: 15%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--lp-accent), transparent);
  z-index: 0;
}

.lp-step {
  text-align: center;
  position: relative;
  z-index: 1;
}

.lp-step-number {
  font-family: var(--lp-font-sans);
  font-size: 14px;
  font-weight: 700;
  width: 34px;
  height: 34px;
  line-height: 34px;
  border-radius: 50%;
  background: var(--lp-accent);
  color: #fff;
  margin: 0 auto 16px;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
}

.lp-step-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.lp-step h3 {
  font-family: var(--lp-font-serif);
  font-size: 20px;
  font-weight: 600;
  color: var(--lp-primary);
  margin-bottom: 10px;
}

.lp-step p {
  font-size: 14px;
  color: var(--lp-text-light);
  line-height: 1.7;
  max-width: 280px;
  margin: 0 auto;
}

/* --- Testimonials --- */
.lp-testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.lp-testimonial {
  background: var(--lp-bg-alt);
  border: 1px solid var(--lp-border);
  border-radius: var(--lp-radius-lg);
  padding: 32px;
  transition: var(--lp-transition);
}
.lp-testimonial:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(59, 130, 246, 0.1);
  border-color: var(--lp-accent);
}

.lp-testimonial-stars {
  color: #f59e0b;
  font-size: 16px;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.lp-testimonial-text {
  font-size: 15px;
  line-height: 1.7;
  color: var(--lp-text);
  font-style: italic;
  margin-bottom: 24px;
}

.lp-testimonial-author {
  display: flex;
  align-items: center;
  gap: 14px;
}

.lp-testimonial-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--lp-accent-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  border: 2px solid rgba(59, 130, 246, 0.15);
}

.lp-testimonial-name {
  font-family: var(--lp-font-serif);
  font-weight: 600;
  font-size: 15px;
  color: var(--lp-primary);
}

.lp-testimonial-role {
  font-size: 12px;
  color: var(--lp-text-light);
  margin-top: 2px;
}

/* --- CTA Section --- */
.lp-cta {
  position: relative;
  padding: 100px 0;
  text-align: center;
  overflow: hidden;
}

.lp-cta-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #1e40af 100%);
  z-index: 0;
}
.lp-cta-bg::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%);
}

.lp-cta-content {
  position: relative;
  z-index: 2;
}

.lp-cta-title {
  font-family: var(--lp-font-serif);
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 600;
  color: #fff;
  line-height: 1.3;
  margin-bottom: 20px;
}
.lp-cta-title span {
  font-family: var(--lp-font-script);
  color: #93c5fd;
  font-weight: 400;
  font-size: clamp(36px, 6vw, 56px);
}

.lp-cta-sub {
  font-size: 17px;
  color: rgba(255,255,255,0.75);
  max-width: 500px;
  margin: 0 auto 40px;
  line-height: 1.7;
}

/* --- Footer --- */
.lp-footer {
  background: var(--lp-navy);
  color: rgba(255,255,255,0.7);
  padding-top: 60px;
}

.lp-footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.lp-footer .lp-logo {
  color: #fff;
  margin-bottom: 16px;
}
.lp-footer .lp-logo-accent {
  color: #60a5fa;
}

.lp-footer-brand p {
  font-size: 14px;
  line-height: 1.7;
  max-width: 320px;
}

.lp-footer-links h4 {
  font-family: var(--lp-font-serif);
  font-size: 16px;
  color: #fff;
  margin-bottom: 16px;
}

.lp-footer-links a {
  display: block;
  font-size: 14px;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  padding: 4px 0;
  transition: var(--lp-transition);
}
.lp-footer-links a:hover {
  color: #60a5fa;
}

.lp-footer-bottom {
  padding: 20px 0;
  text-align: center;
}
.lp-footer-bottom p {
  font-size: 13px;
  color: rgba(255,255,255,0.35);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .lp-features-grid,
  .lp-themes-grid,
  .lp-testimonials-grid {
    grid-template-columns: 1fr;
    max-width: 440px;
    margin-left: auto;
    margin-right: auto;
  }

  .lp-steps-grid {
    grid-template-columns: 1fr;
    gap: 48px;
    max-width: 360px;
    margin-left: auto;
    margin-right: auto;
  }
  .lp-steps-grid::before { display: none; }

  .lp-footer-inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .lp-nav-toggle { display: block; }

  .lp-nav-links {
    position: absolute;
    top: calc(100% + 12px);
    left: 0;
    width: 100%;
    height: auto;
    background: rgba(255, 255, 255, 0.90);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: var(--lp-radius-xl);
    flex-direction: column;
    padding: 24px 20px;
    gap: 8px;
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px) scale(0.98);
    transform-origin: top center;
    z-index: 100;
  }
  
  .lp-nav-links.open { 
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0) scale(1);
  }

  .lp-nav-links li {
    width: 100%;
  }
  .lp-nav-links a {
    display: block;
    width: 100%;
    padding: 16px 20px !important;
    font-size: 16px !important;
    border-radius: var(--lp-radius-md) !important;
    color: var(--lp-primary) !important;
    text-align: center;
    font-weight: 500 !important;
    letter-spacing: 0.5px;
  }
  .lp-nav-links a:hover {
    background: rgba(59, 130, 246, 0.08) !important;
    color: var(--lp-accent) !important;
  }
  .lp-nav-links a.lp-nav-cta {
    margin-top: 12px;
    padding: 16px 20px !important;
    text-align: center;
    color: #ffffff !important;
    background: var(--lp-accent) !important;
    border-radius: var(--lp-radius-lg) !important;
    font-weight: 600 !important;
    letter-spacing: 0.5px;
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
  }
  .lp-nav-links a.lp-nav-cta:hover {
    background: var(--lp-accent-hover) !important;
    box-shadow: 0 10px 28px rgba(59, 130, 246, 0.4);
    color: #ffffff !important;
  }

  .lp-section { padding: 72px 0; }

  .lp-features-grid,
  .lp-themes-grid,
  .lp-testimonials-grid {
    grid-template-columns: 1fr;
  }

  .lp-hero-bg {
    background-position: center center;
  }
}
</style>
