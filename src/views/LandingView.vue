<template>
  <div class="landing" :style="{ '--scroll-y': scrollY + 'px' }">
    <!-- Navbar -->
    <nav class="lp-nav" :class="{ scrolled: navScrolled || mobileMenuOpen, 'nav-hidden': navHiddenMobile }">
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
          <li><a href="#harga" @click="mobileMenuOpen = false">Harga</a></li>
          <li><a href="https://www.mengundanganda.fun/login" class="lp-nav-cta" @click="mobileMenuOpen = false">Buat Undangan</a></li>
        </ul>
      </div>
    </nav>

    <main>
    <!-- Hero Section -->
    <section class="lp-hero" aria-label="Hero">
      <div class="lp-hero-bg"></div>
      <div class="lp-hero-overlay"></div>
      <div class="lp-container lp-hero-content">
        <p class="lp-hero-kicker lp-fade-up">Siap dalam hitungan menit, bukan hari</p>
        <h1 class="lp-hero-title lp-fade-up lp-delay-1">
          Undangan Pernikahan Anda,<br>
          <span class="lp-hero-script">Kapanpun. Tanpa Menunggu.</span>
        </h1>
        <p class="lp-hero-sub lp-fade-up lp-delay-2">
          Tidak perlu antri desainer. Tidak perlu menunggu berhari-hari.<br>
          Pilih tema, isi data, dan langsung bagikan, semudah itu.
        </p>
        <div class="lp-hero-actions lp-fade-up lp-delay-3">
          <a href="https://www.mengundanganda.fun/login" class="lp-btn lp-btn-primary">Buat Undangan Sekarang</a>
          <a href="#tema" class="lp-btn lp-btn-outline">Lihat Tema</a>
        </div>
      </div>
    </section>

    <!-- Back to Top Arrow -->
    <button class="lp-back-to-top" :class="{ visible: showBackToTop }" @click="scrollToTop" aria-label="Kembali ke atas">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
    </button>

    <!-- Fitur Section -->
    <section id="fitur" class="lp-section lp-section-alt" aria-label="Fitur Unggulan">
      <div class="lp-container">
        <div class="lp-section-header">
          <p class="lp-section-kicker">Kenapa MengundangAnda?</p>
          <h2 class="lp-section-title">Undangan Cetak itu Mahal, Lama, dan Ribet.</h2>
          <p class="lp-section-sub">Kami hadir supaya Anda bisa fokus ke momen bahagia — bukan repot ngurusin undangan.</p>
        </div>
        <div class="lp-features-grid">
          <div class="lp-feature-card" v-for="(feature, i) in features" :key="feature.title" ref="featureCardsRef" :style="{ transitionDelay: `${i * 100}ms` }">
            <div class="lp-feature-icon-wrapper">
              <Icon :icon="feature.icon" class="lp-feature-icon" />
            </div>
            <h3>{{ feature.title }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Preview Showcase Section -->
    <section id="live-preview" class="lp-section" aria-label="Live Preview Editor">
      <div class="lp-container lp-showcase-split">
        <div class="lp-showcase-content">
          <p class="lp-section-kicker">Live Preview Editor</p>
          <h2 class="lp-section-title">Edit Bebas, Lihat Hasil Langsung.</h2>
          <p class="lp-section-sub">
            Ucapkan selamat tinggal pada menebak-nebak! Sistem <b>Live Preview</b> kami memastikan setiap detail acara dan perubahan teks yang Anda simpan akan langsung tercermin di undangan.
          </p>
          <ul class="lp-showcase-list">
            <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon" /> Desain lebih presisi dan sesuai ekspektasi.</li>
            <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon" /> Menghemat waktu bolak-balik ke halaman berbeda.</li>
            <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon" /> Pengalaman membuat undangan jadi sangat mudah.</li>
          </ul>
          <a href="https://www.mengundanganda.fun/login" class="lp-btn lp-btn-primary lp-showcase-btn">Coba Sekarang</a>
        </div>
        <div class="lp-showcase-image">
          <div class="lp-mockup-wrapper">
             <img src="https://media.mengundanganda.fun/landing-page/Screenshot%202026-04-03%20191057.webp" alt="Tampilan fitur Live Preview Editor undangan pernikahan digital MengundangAnda" class="lp-mockup-img" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- Tema Section -->
    <section id="tema" class="lp-section" aria-label="Koleksi Tema">
      <div class="lp-container">
        <div class="lp-section-header">
          <p class="lp-section-kicker">Koleksi Tema</p>
          <h2 class="lp-section-title">Pilih Tema Favorit Anda</h2>
          <p class="lp-section-sub">Tiga pilihan desain yang dirancang dengan keindahan dan keanggunan</p>
        </div>
        <div class="lp-themes-carousel">
          <div class="lp-theme-card" v-for="theme in themesData" :key="theme.id">
            <div class="lp-theme-preview">
              <div class="lp-theme-device-frame">
                <div class="lp-theme-device-notch"></div>
                <div class="lp-theme-device-screen" :ref="(el) => setLpScreenRef(el as HTMLElement)">
                  <iframe
                    v-if="theme.sampleUrl"
                    :src="theme.sampleUrl"
                    class="lp-theme-iframe"
                    :style="{ transform: `scale(${lpIframeScale})` }"
                    loading="lazy"
                    :title="'Preview tema ' + theme.name"
                    sandbox="allow-scripts allow-same-origin"
                  ></iframe>
                  <div v-else class="lp-theme-placeholder" :style="{ background: theme.bgGradient }">
                    <div class="lp-tp-content">
                      <div class="lp-tp-label" :style="{ color: theme.labelColor }">{{ theme.label }}</div>
                      <div class="lp-tp-names" :style="{ fontFamily: theme.nameFont, color: theme.nameColor, fontSize: theme.nameSize }">{{ theme.nameSample }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lp-theme-info">
              <h3>{{ theme.name }}</h3>
              <p>{{ theme.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cara Kerja Section -->
    <section id="cara-kerja" class="lp-section lp-section-alt" aria-label="Cara Kerja">
      <div class="lp-container">
        <div class="lp-section-header">
          <p class="lp-section-kicker">Mudah &amp; Cepat</p>
          <h2 class="lp-section-title">Cara Membuatnya</h2>
          <p class="lp-section-sub">Tiga langkah sederhana untuk undangan impian Anda</p>
        </div>
        <div class="lp-steps-grid">
          <div class="lp-step" v-for="(step, i) in steps" :key="step.title">
            <div class="lp-step-number">{{ i + 1 }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimoni Section -->
    <section id="testimoni" class="lp-section" aria-label="Testimoni Pengguna">
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

    <!-- Pricing Section -->
    <section id="harga" class="lp-section lp-section-alt" aria-label="Harga">
      <div class="lp-container">
        <div class="lp-section-header">
          <p class="lp-section-kicker">Harga</p>
          <h2 class="lp-section-title">Pilihan Paket Anda</h2>
          <p class="lp-section-sub">Harga transparan dan terjangkau. Mulai gratis sekarang, upgrade kapan saja untuk fitur maksimal.</p>
        </div>
        <div class="lp-pricing-grid">
          <!-- Free Plan -->
          <div class="lp-pricing-card">
            <div class="lp-pricing-header">
              <h3>Free</h3>
              <div class="lp-pricing-price">Gratis</div>
              <p>Cocok untuk mencoba membuat undangan.</p>
            </div>
            <ul class="lp-pricing-features">
              <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon" /> Masa aktif 2 hari</li>
              <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon" /> 20x akses link</li>
              <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon" /> Unlimited edit</li>
              <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon" /> Langsung jadi setelah input data</li>
              <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon" /> Live preview editor</li>
            </ul>
            <a href="https://www.mengundanganda.fun/login" class="lp-btn lp-pricing-btn">Mulai Gratis</a>
          </div>

          <!-- Premium Plan -->
          <div class="lp-pricing-card lp-pricing-premium">
            <div class="lp-premium-badge">PALING POPULER</div>
            <div class="lp-pricing-header">
              <h3>Premium</h3>
              <div class="lp-pricing-price">Rp 50.000</div>
              <p>Fitur penuh untuk undangan tak terbatas.</p>
            </div>
            <ul class="lp-pricing-features">
              <li><Icon icon="solar:star-fall-bold-duotone" class="check-icon accent" /> <strong>Semua fitur di Free</strong></li>
              <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon accent" /> Unlimited akses link</li>
              <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon accent" /> 1 tahun masa aktif</li>
              <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon accent" /> Unlimited tamu undangan</li>
            </ul>
            <a href="https://www.mengundanganda.fun/login" class="lp-btn lp-btn-primary lp-pricing-btn">Upgrade Premium</a>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section id="cta" class="lp-cta" aria-label="Ajakan Membuat Undangan">
      <div class="lp-cta-bg"></div>
      <div class="lp-container lp-cta-content">
        <h2 class="lp-cta-title">Siap Membuat Undangan<br><span>Impian Anda?</span></h2>
        <p class="lp-cta-sub">Mulai sekarang dan buat undangan pernikahan digital yang indah dalam hitungan menit.</p>
        <a href="https://www.mengundanganda.fun/login" class="lp-btn lp-btn-white">Buat Undangan Gratis</a>
      </div>
    </section>
    </main>

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
          <a href="#harga">Harga</a>
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { Icon } from '@iconify/vue'

const navScrolled = ref(false)
const mobileMenuOpen = ref(false)
const navHiddenMobile = ref(false)
const showBackToTop = ref(false)
const scrollY = ref(0)
const featureCardsRef = ref<HTMLElement[]>([])

function isMobile() {
  return window.innerWidth <= 768
}

function handleScroll() {
  const y = window.scrollY
  navScrolled.value = y > 40
  scrollY.value = y

  // Hero section height (approx viewport height)
  const heroHeight = window.innerHeight

  if (isMobile()) {
    // Hide navbar after scrolling past hero on mobile
    navHiddenMobile.value = y > heroHeight
  } else {
    navHiddenMobile.value = false
  }

  // Show back-to-top button after passing hero section
  showBackToTop.value = y > heroHeight
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  // Dynamic SEO head management
  document.title = 'MengundangAnda — Buat Undangan Pernikahan Digital Premium dalam 5 Menit'
  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) {
    metaDesc.setAttribute('content', 'Buat undangan pernikahan digital yang elegan dan profesional dalam hitungan menit. Pilih tema premium, isi data, dan langsung bagikan via WhatsApp. Gratis dan mudah digunakan.')
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  // Animate feature cards on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  featureCardsRef.value.forEach(card => {
    if (card) observer.observe(card)
  })

  // Init iframe scaling
  nextTick(() => {
    updateLpIframeScale()
    if (lpScreenRefs.length > 0) {
      const el = lpScreenRefs[0];
      if (el) {
        lpResizeObserver = new ResizeObserver(() => updateLpIframeScale())
        lpResizeObserver.observe(el)
      }
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  lpResizeObserver?.disconnect()
})

// Dynamic iframe scaling for theme previews
const lpIframeScale = ref(0.5)
const lpScreenRefs: HTMLElement[] = []
let lpResizeObserver: ResizeObserver | null = null

function setLpScreenRef(el: HTMLElement | null) {
  if (el && !lpScreenRefs.includes(el)) lpScreenRefs.push(el)
}

function updateLpIframeScale() {
  if (lpScreenRefs.length > 0) {
    const el = lpScreenRefs[0];
    if (el) {
      const width = el.clientWidth
      if (width > 0) lpIframeScale.value = width / 375
    }
  }
}

const features = [
  { icon: 'solar:stopwatch-bold-duotone', title: 'Selesai dalam 5 Menit' },
  { icon: 'solar:wallet-money-bold-duotone', title: 'Hemat Jutaan Rupiah' },
  { icon: 'solar:smartphone-2-bold-duotone', title: 'Langsung Kirim via WhatsApp' },
  { icon: 'solar:map-point-wave-bold-duotone', title: 'Musik, Peta, RSVP — Lengkap' },
  { icon: 'solar:pallete-2-bold-duotone', title: 'Desain Profesional, Tanpa Skill Desain' },
  { icon: 'solar:shield-check-bold-duotone', title: 'Aman & Bisa Diedit Kapan Saja' },
]

const steps = [
  { title: 'Pilih Tema', desc: 'Jelajahi koleksi tema premium kami dan pilih yang paling sesuai dengan kepribadian Anda.' },
  { title: 'Isi Data', desc: 'Masukkan data pernikahan seperti nama, tanggal, lokasi, dan detail acara lainnya.' },
  { title: 'Bagikan', desc: 'Undangan Anda langsung online! Bagikan link unik ke semua tamu yang Anda undang.' },
]

const testimonials = [
  { avatar: '👰', name: 'Aisyah & Rizky', role: 'Menikah November 2025', text: 'Awalnya cuma iseng coba, eh ternyata hasilnya bagus banget. Temen-temen pada nanya bikin undangannya dimana, hehe. Prosesnya gampang, tinggal isi data terus langsung jadi.' },
  { avatar: '💑', name: 'Dewi & Arif', role: 'Menikah Januari 2026', text: 'Suka banget sama fitur petanya, jadi tamu ga perlu nanya-nanya lagi lokasi nikahan. Musiknya juga bikin undangan kerasa lebih hidup. Worth it sih menurutku.' },
  { avatar: '💍', name: 'Sarah & Budi', role: 'Menikah Maret 2026', text: 'Sempet mikir mau cetak undangan, tapi setelah coba ini langsung berubah pikiran. Hemat banget dan hasilnya malah lebih cantik. Tema floral-nya beneran elegan!' },
]

const themesData = [
  {
    id: 'elegant',
    name: 'Elegant Gold',
    description: 'Desain klasik premium dengan aksen emas dan font serif yang mewah.',
    sampleUrl: '',  // ← Isi dengan link undangan contoh
    bgGradient: 'linear-gradient(180deg, #2c2417 0%, #3d3425 100%)',
    label: 'The Wedding Of',
    labelColor: '#c9a96e',
    nameSample: 'Romeo & Juliet',
    nameFont: "var(--lp-font-script)",
    nameColor: '#fff',
    nameSize: '38px',
  },
  {
    id: 'floral',
    name: 'Romantic Floral',
    description: 'Desain romantis dengan ornamen daun dan bunga, warna pastel lembut.',
    sampleUrl: '',  // ← Isi dengan link undangan contoh
    bgGradient: 'linear-gradient(180deg, #fdfbf7 0%, #f4f6e9 100%)',
    label: 'The Wedding Of',
    labelColor: '#8a9a5b',
    nameSample: 'Romeo & Juliet',
    nameFont: "var(--lp-font-serif)",
    nameColor: '#4a5d4e',
    nameSize: '28px',
  },
  {
    id: 'minimalist',
    name: 'Modern Minimalist',
    description: 'Tampilan bersih & modern dengan ruang putih luas dan font sans-serif tebal.',
    sampleUrl: '',  // ← Isi dengan link undangan contoh
    bgGradient: 'linear-gradient(180deg, #ffffff 0%, #f9f9f9 100%)',
    label: 'THE WEDDING OF',
    labelColor: '#999',
    nameSample: 'ROMEO & JULIET',
    nameFont: "var(--lp-font-sans)",
    nameColor: '#111',
    nameSize: '30px',
  },
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
  --lp-accent: #93c5fd;
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
  text-shadow: 0 3px 16px rgba(255, 255, 255, 0.6), 0 1px rgba(255, 255, 255, 0.615);
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
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--lp-border);
  border-radius: var(--lp-radius-xl);
  padding: 40px 32px;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(40px);
}
.lp-feature-card.in-view {
  opacity: 1;
  transform: translateY(0);
}
.lp-feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at top right, var(--lp-accent-light) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}
.lp-feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.3);
  background: rgba(255, 255, 255, 0.95);
}
.lp-feature-card:hover::before {
  opacity: 1;
}

.lp-feature-icon-wrapper {
  width: 76px;
  height: 76px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.02));
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: var(--lp-accent);
  box-shadow: inset 0 0 0 1px rgba(59, 130, 246, 0.1);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s ease, color 0.4s ease, box-shadow 0.4s ease;
}
.lp-feature-card:hover .lp-feature-icon-wrapper {
  transform: scale(1.1) rotate(5deg);
  background: var(--lp-accent);
  color: #fff;
  box-shadow: 0 10px 24px rgba(59, 130, 246, 0.25);
}
.lp-feature-icon {
  font-size: 38px;
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

/* --- Live Preview Showcase --- */
.lp-showcase-split {
  display: flex;
  align-items: center;
  gap: 60px;
}

.lp-showcase-content {
  flex: 1;
  max-width: 520px;
}

.lp-showcase-list {
  list-style: none;
  padding: 0;
  margin: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.lp-showcase-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 15px;
  color: var(--lp-text);
  line-height: 1.6;
}

.lp-showcase-list .check-icon {
  font-size: 20px;
  color: var(--lp-accent-hover);
  flex-shrink: 0;
  margin-top: 2px;
}

.lp-showcase-btn {
  margin-top: 8px;
}

.lp-showcase-image {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;
}

.lp-mockup-wrapper {
  position: relative;
  width: 100%;
  max-width: 580px;
  border-radius: var(--lp-radius-xl);
  overflow: hidden;
  box-shadow: 0 32px 64px rgba(15, 23, 42, 0.12);
  border: 1px solid var(--lp-border);
  background: #fdfdfd;
}

.lp-mockup-img {
  width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 992px) {
  .lp-showcase-split {
    flex-direction: column;
    text-align: center;
    gap: 48px;
  }
  .lp-showcase-content {
    max-width: 100%;
  }
  .lp-showcase-list {
    align-items: center;
    text-align: left;
  }
  .lp-showcase-image {
    width: 100%;
    justify-content: center;
  }
}

/* --- Theme Previews Carousel --- */
.lp-themes-carousel {
  display: flex;
  gap: 32px;
  overflow-x: auto;
  padding: 16px 8px 48px;
  margin: -16px -8px -48px;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.lp-themes-carousel::-webkit-scrollbar {
  display: none;
}

.lp-theme-card {
  flex: 0 0 calc(33.333% - 22px);
  min-width: 320px;
  scroll-snap-align: start;
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
  position: relative;
  padding: 24px 24px 0;
  background: linear-gradient(180deg, #f0f5ff 0%, #e8ecf4 100%);
}

.lp-theme-device-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 14;
  background: #1a1a2e;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  box-shadow: 0 -2px 16px rgba(0, 0, 0, 0.1), inset 0 0 0 2px rgba(255, 255, 255, 0.06);
}

.lp-theme-device-notch {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 4px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  z-index: 2;
}

.lp-theme-device-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
}

.lp-theme-iframe {
  width: 375px;
  height: 812px;
  border: none;
  pointer-events: none;
  transform-origin: top left;
  background: #fff;
}

.lp-theme-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lp-tp-content {
  text-align: center;
  z-index: 2;
}

.lp-tp-label {
  font-family: var(--lp-font-sans);
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.lp-tp-names {
  font-weight: 600;
}

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

/* --- Steps Timeline --- */
.lp-steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  position: relative;
}
.lp-steps-grid::before {
  content: '';
  position: absolute;
  top: 24px; /* Center of the number circle (48px / 2) */
  left: 16%;
  right: 16%;
  height: 2px;
  background: rgba(59, 130, 246, 0.2); /* Dashed or light base line */
  border-top: 2px dashed rgba(59, 130, 246, 0.4);
  z-index: 0;
}

.lp-step {
  text-align: center;
  position: relative;
  z-index: 1;
}
.lp-step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 20px;
  right: -25px;
  width: 10px;
  height: 10px;
  border-right: 2px solid var(--lp-accent);
  border-bottom: 2px solid var(--lp-accent);
  transform: rotate(-45deg);
  z-index: 2;
  border-radius: 2px;
}

.lp-step-number {
  font-family: var(--lp-font-sans);
  font-size: 16px;
  font-weight: 700;
  width: 48px;
  height: 48px;
  line-height: 48px;
  border-radius: 50%;
  background: var(--lp-accent);
  color: #fff;
  margin: 0 auto 16px;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3), 0 0 0 8px var(--lp-bg-alt); /* Fake stroke to cut the timeline */

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

/* --- Pricing --- */
.lp-pricing-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  max-width: 840px;
  margin: 0 auto;
}

.lp-pricing-card {
  background: var(--lp-bg);
  border: 1px solid var(--lp-border);
  border-radius: var(--lp-radius-xl);
  padding: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: var(--lp-transition);
}
.lp-pricing-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.4);
}

.lp-pricing-premium {
  border: 2px solid var(--lp-accent);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.15);
  transform: scale(1.03);
}
.lp-pricing-premium:hover {
  transform: scale(1.05) translateY(-6px);
  box-shadow: 0 20px 48px rgba(59, 130, 246, 0.25);
  border-color: var(--lp-accent);
}

.lp-premium-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, var(--lp-accent), #93c5fd);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 6px 16px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.lp-pricing-header {
  text-align: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--lp-border);
}
.lp-pricing-header h3 {
  font-size: 20px;
  color: var(--lp-text-light);
  margin-bottom: 12px;
  font-weight: 600;
}
.lp-pricing-premium .lp-pricing-header h3 {
  color: var(--lp-accent);
}
.lp-pricing-price {
  font-family: var(--lp-font-serif);
  font-size: 42px;
  font-weight: 700;
  color: var(--lp-primary);
  margin-bottom: 12px;
}
.lp-pricing-header p {
  color: var(--lp-text-light);
  font-size: 14px;
}

.lp-pricing-features {
  list-style: none;
  padding: 0;
  margin: 0 0 40px;
  flex: 1;
}
.lp-pricing-features li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: var(--lp-text);
  margin-bottom: 16px;
}
.check-icon {
  font-size: 22px;
  color: #cbd5e1;
}
.check-icon.accent {
  color: var(--lp-accent);
}

.lp-pricing-btn {
  width: 100%;
}
.lp-pricing-card:not(.lp-pricing-premium) .lp-pricing-btn {
  border-color: rgba(30, 58, 95, 0.2);
  color: var(--lp-text);
  background: transparent;
  border: 2px solid rgba(30, 58, 95, 0.2);
}
.lp-pricing-card:not(.lp-pricing-premium) .lp-pricing-btn:hover {
  background: rgba(30, 58, 95, 0.04);
  border-color: var(--lp-text-light);
  color: var(--lp-primary);
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
  color: var(--lp-accent);
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

/* --- Back to Top Button --- */
.lp-back-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 99;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--lp-accent);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.35);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  pointer-events: none;
  transform: translateY(20px) scale(0.8);
}
.lp-back-to-top.visible {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0) scale(1);
}
.lp-back-to-top:hover {
  background: var(--lp-accent-hover);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 28px rgba(59, 130, 246, 0.5);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .lp-features-grid {
    grid-template-columns: repeat(2, 1fr);
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .lp-testimonials-grid {
    grid-template-columns: 1fr;
    max-width: 440px;
    margin-left: auto;
    margin-right: auto;
  }

  .lp-theme-card {
    flex: 0 0 85%;
    min-width: 280px;
  }

  .lp-steps-grid {
    grid-template-columns: 1fr;
    gap: 48px;
    max-width: 360px;
    margin-left: auto;
    margin-right: auto;
  }
  .lp-steps-grid::before { 
    display: none;
  }
  .lp-step:not(:last-child)::after {
    top: auto;
    bottom: -28px;
    right: 50%;
    transform: translateX(50%) rotate(45deg); /* Arrow pointing down */
  }

  .lp-pricing-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .lp-pricing-premium {
    transform: none;
  }
  .lp-pricing-premium:hover {
    transform: translateY(-6px);
  }

  .lp-footer-inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  /* Hide navbar when scrolling past hero on mobile */
  .lp-nav.nav-hidden {
    transform: translateX(-50%) translateY(-120%);
    opacity: 0;
    pointer-events: none;
  }

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

  .lp-features-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .lp-testimonials-grid {
    grid-template-columns: 1fr;
  }

  .lp-hero-bg {
    background-position: center center;
  }

  .lp-theme-preview {
    height: 400px;
  }

  .lp-back-to-top {
    bottom: 24px;
    right: 20px;
    width: 44px;
    height: 44px;
  }
}
</style>
