<template>
  <div class="landing">
    <!-- Navbar -->
    <nav class="lp-nav" :class="{ scrolled: navScrolled }">
      <div class="lp-container lp-nav-inner">
        <a href="#" class="lp-logo">
          <span class="lp-logo-icon">💒</span>
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
      <div class="lp-hero-ornament lp-hero-ornament-tl"></div>
      <div class="lp-hero-ornament lp-hero-ornament-br"></div>
      <div class="lp-container lp-hero-content">
        <p class="lp-hero-kicker lp-fade-up">✨ Undangan Digital Premium</p>
        <h1 class="lp-hero-title lp-fade-up lp-delay-1">
          Buat Undangan Pernikahan<br>
          <span class="lp-hero-script">yang Elegan & Berkesan</span>
        </h1>
        <p class="lp-hero-sub lp-fade-up lp-delay-2">
          Desain cantik, mudah digunakan, langsung bagikan lewat link.<br>
          Buat momen spesial Anda semakin istimewa.
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
    <section id="fitur" class="lp-section lp-section-cream">
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
                <div class="lp-tp-names">Romeo & Juliet</div>
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
                <div class="lp-tp-names">ROMEO & JULIET</div>
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
                  <div class="lp-tp-names">Romeo & Juliet</div>
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
    <section id="cara-kerja" class="lp-section lp-section-cream">
      <div class="lp-container">
        <div class="lp-section-header">
          <p class="lp-section-kicker">Mudah & Cepat</p>
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
            <span class="lp-logo-icon">💒</span>
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

function handleScroll() {
  navScrolled.value = window.scrollY > 40
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
   Landing Page — Scoped Styles
   ======================================== */

/* --- Layout Helpers --- */
.landing {
  background: var(--inv-bg);
  color: var(--inv-text);
  overflow-x: hidden;
}

.lp-container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 24px;
}

.lp-section {
  padding: 100px 0;
}

.lp-section-cream {
  background: var(--inv-cream);
}

.lp-section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 60px;
}

.lp-section-kicker {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--inv-gold);
  margin-bottom: 12px;
}

.lp-section-title {
  font-family: var(--font-serif);
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 600;
  color: var(--inv-primary);
  margin-bottom: 16px;
  line-height: 1.2;
}

.lp-section-sub {
  font-size: 16px;
  color: var(--inv-text-light);
  line-height: 1.7;
}

/* --- Buttons --- */
.lp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  border-radius: 40px;
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  border: 2px solid transparent;
}

.lp-btn-primary {
  background: var(--inv-gold);
  color: #fff;
  border-color: var(--inv-gold);
  box-shadow: 0 4px 20px rgba(201, 169, 110, 0.35);
}
.lp-btn-primary:hover {
  background: var(--inv-primary);
  border-color: var(--inv-primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(139, 111, 78, 0.4);
}

.lp-btn-outline {
  background: transparent;
  color: var(--inv-primary);
  border-color: var(--inv-gold);
}
.lp-btn-outline:hover {
  background: var(--inv-gold);
  color: #fff;
  transform: translateY(-2px);
}

.lp-btn-white {
  background: #fff;
  color: var(--inv-primary);
  border-color: #fff;
  font-size: 16px;
  padding: 16px 40px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}
.lp-btn-white:hover {
  background: var(--inv-cream);
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
}

/* --- Navbar --- */
.lp-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 20px 0;
  transition: var(--transition);
}

.lp-nav.scrolled {
  background: rgba(250, 248, 244, 0.95);
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 20px rgba(0,0,0,0.06);
  padding: 12px 0;
}

.lp-nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.lp-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 600;
  color: var(--inv-primary);
}

.lp-logo-icon {
  font-size: 26px;
}

.lp-logo-accent {
  color: var(--inv-gold);
}

.lp-nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
}

.lp-nav-links a {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--inv-text-light);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 20px;
  transition: var(--transition);
}

.lp-nav-links a:hover {
  color: var(--inv-primary);
  background: var(--inv-gold-light);
}

.lp-nav-cta {
  background: var(--inv-gold) !important;
  color: #fff !important;
  padding: 10px 24px !important;
}
.lp-nav-cta:hover {
  background: var(--inv-primary) !important;
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
  background: var(--inv-primary);
  border-radius: 2px;
  transition: var(--transition);
  position: absolute;
  left: 4px;
}
.lp-nav-toggle span { top: 15px; }
.lp-nav-toggle span::before { content: ''; top: -7px; }
.lp-nav-toggle span::after { content: ''; top: 7px; }
.lp-nav-toggle span.open { background: transparent; }
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
  background: linear-gradient(180deg, var(--inv-bg) 0%, var(--inv-cream) 100%);
}

.lp-hero-ornament {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 1px solid rgba(201, 169, 110, 0.25);
  pointer-events: none;
}
.lp-hero-ornament-tl {
  top: 60px;
  left: 40px;
  border-right: none;
  border-bottom: none;
}
.lp-hero-ornament-br {
  bottom: 60px;
  right: 40px;
  border-left: none;
  border-top: none;
}

.lp-hero-content {
  position: relative;
  z-index: 2;
}

.lp-hero-kicker {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--inv-gold);
  margin-bottom: 24px;
}

.lp-hero-title {
  font-family: var(--font-serif);
  font-size: clamp(32px, 6vw, 56px);
  font-weight: 700;
  color: var(--inv-primary);
  line-height: 1.2;
  margin-bottom: 24px;
}

.lp-hero-script {
  font-family: var(--font-script);
  font-weight: 400;
  color: var(--inv-gold);
  font-size: clamp(36px, 7vw, 64px);
}

.lp-hero-sub {
  font-size: 17px;
  line-height: 1.8;
  color: var(--inv-text-light);
  max-width: 540px;
  margin: 0 auto 40px;
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
  left: 45%;
  transform: translateX(-45%);
  text-align: center;
  color: var(--inv-text-light);
  font-size: 12px;
  letter-spacing: 1px;
}
.lp-scroll-arrow {
  width: 20px;
  height: 20px;
  margin: 8px auto 0;
  border-right: 2px solid var(--inv-gold);
  border-bottom: 2px solid var(--inv-gold);
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
  gap: 32px;
}

.lp-feature-card {
  background: var(--inv-bg);
  border: 1px solid rgba(201, 169, 110, 0.15);
  border-radius: var(--radius-lg);
  padding: 36px 28px;
  text-align: center;
  transition: var(--transition);
}
.lp-feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(139, 111, 78, 0.1);
  border-color: var(--inv-gold);
}

.lp-feature-icon {
  font-size: 40px;
  margin-bottom: 20px;
}

.lp-feature-card h3 {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 600;
  color: var(--inv-primary);
  margin-bottom: 10px;
}

.lp-feature-card p {
  font-size: 14px;
  color: var(--inv-text-light);
  line-height: 1.7;
}

/* --- Theme Previews --- */
.lp-themes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.lp-theme-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(201, 169, 110, 0.15);
  transition: var(--transition);
}
.lp-theme-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 50px rgba(139, 111, 78, 0.15);
  border-color: var(--inv-gold);
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
  font-family: var(--font-sans);
  font-size: 10px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--inv-gold);
  margin-bottom: 14px;
}
.lp-tp-elegant .lp-tp-names {
  font-family: var(--font-script);
  font-size: 38px;
  color: #fff;
}

/* Minimalist */
.lp-tp-minimalist {
  background: #ffffff;
  color: #111;
}
.lp-tp-minimalist .lp-tp-label {
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #999;
  margin-bottom: 10px;
}
.lp-tp-minimalist .lp-tp-names {
  font-family: var(--font-sans);
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
  font-family: var(--font-serif);
  font-size: 11px;
  font-style: italic;
  color: #8a9a5b;
  margin-bottom: 8px;
}
.lp-tp-floral .lp-tp-names {
  font-family: var(--font-serif);
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
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 600;
  color: var(--inv-primary);
  margin-bottom: 8px;
}
.lp-theme-info p {
  font-size: 14px;
  color: var(--inv-text-light);
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
  background: linear-gradient(90deg, transparent, var(--inv-gold), transparent);
  z-index: 0;
}

.lp-step {
  text-align: center;
  position: relative;
  z-index: 1;
}

.lp-step-number {
  font-family: var(--font-serif);
  font-size: 14px;
  font-weight: 700;
  width: 32px;
  height: 32px;
  line-height: 32px;
  border-radius: 50%;
  background: var(--inv-gold);
  color: #fff;
  margin: 0 auto 16px;
}

.lp-step-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.lp-step h3 {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 600;
  color: var(--inv-primary);
  margin-bottom: 10px;
}

.lp-step p {
  font-size: 14px;
  color: var(--inv-text-light);
  line-height: 1.7;
  max-width: 280px;
  margin: 0 auto;
}

/* --- Testimonials --- */
.lp-testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.lp-testimonial {
  background: var(--inv-cream);
  border: 1px solid rgba(201, 169, 110, 0.12);
  border-radius: var(--radius-lg);
  padding: 32px;
  transition: var(--transition);
}
.lp-testimonial:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(139, 111, 78, 0.08);
}

.lp-testimonial-stars {
  color: var(--inv-gold);
  font-size: 16px;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.lp-testimonial-text {
  font-size: 15px;
  line-height: 1.7;
  color: var(--inv-text);
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
  background: var(--inv-gold-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

.lp-testimonial-name {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 15px;
  color: var(--inv-primary);
}

.lp-testimonial-role {
  font-size: 12px;
  color: var(--inv-text-light);
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
  background: linear-gradient(135deg, #2c2417 0%, #4a3a28 50%, #3d2e1c 100%);
  z-index: 0;
}

.lp-cta-content {
  position: relative;
  z-index: 2;
}

.lp-cta-title {
  font-family: var(--font-serif);
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 600;
  color: #fff;
  line-height: 1.3;
  margin-bottom: 20px;
}
.lp-cta-title span {
  font-family: var(--font-script);
  color: var(--inv-gold);
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
  background: #1a150e;
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

.lp-footer-brand .lp-logo {
  color: #fff;
  margin-bottom: 16px;
}
.lp-footer-brand p {
  font-size: 14px;
  line-height: 1.7;
  max-width: 320px;
}

.lp-footer-links h4 {
  font-family: var(--font-serif);
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
  transition: var(--transition);
}
.lp-footer-links a:hover {
  color: var(--inv-gold);
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

  .lp-hero-ornament { display: none; }
}

@media (max-width: 768px) {
  .lp-nav-toggle { display: block; }

  .lp-nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: var(--inv-bg);
    flex-direction: column;
    padding: 80px 32px 40px;
    gap: 4px;
    box-shadow: -4px 0 20px rgba(0,0,0,0.1);
    transition: right 0.35s ease;
    z-index: 200;
  }
  .lp-nav-links.open { right: 0; }

  .lp-nav-links a {
    width: 100%;
    padding: 12px 16px !important;
    font-size: 16px !important;
    border-radius: var(--radius-sm) !important;
  }
  .lp-nav-cta {
    margin-top: 12px;
    text-align: center;
  }

  .lp-section { padding: 72px 0; }

  .lp-features-grid,
  .lp-themes-grid,
  .lp-testimonials-grid {
    grid-template-columns: 1fr;
  }
}
</style>
