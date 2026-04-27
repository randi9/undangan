<template>
  <div class="landing" :style="{ '--scroll-y': scrollY + 'px' }">
    <!-- Navbar -->
    <nav class="lp-nav" :class="{ scrolled: navScrolled || mobileMenuOpen, 'nav-hidden': navHiddenMobile }">
      <div class="lp-container lp-nav-inner">
        <a href="#" class="lp-logo">
          <img src="/images/logo.webp" alt="Logo MengundangAnda - Platform Undangan Pernikahan Digital" class="lp-logo-img">
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
          <li><a href="#faq" @click="mobileMenuOpen = false">FAQ</a></li>
          <li><a href="/login" class="lp-nav-cta" @click="mobileMenuOpen = false">Buat Undangan</a></li>
        </ul>
      </div>
    </nav>

    <main>
    <!-- Hero Section -->
    <LandingHeroCinematic />



    <!-- Social Proof Stats -->
    <section class="lp-stats" aria-label="Statistik" ref="statsRef">
      <div class="lp-container lp-stats-inner">
        <div class="lp-stat-item" v-for="stat in stats" :key="stat.label">
          <div class="lp-stat-number">
            <span class="lp-stat-value">{{ stat.displayed }}</span><span class="lp-stat-suffix">{{ stat.suffix }}</span>
          </div>
          <div class="lp-stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- Fitur Section -->
    <section id="fitur" class="lp-section lp-section-alt" aria-label="Fitur Unggulan">
      <div class="lp-container">
        <div class="lp-section-header lp-reveal">
          <p class="lp-section-kicker">Mengapa Pilih Kami?</p>
          <h2 class="lp-section-title">Jangan Habiskan Budget Untuk Undangan Sekali Pakai.</h2>
          <p class="lp-section-sub">Fokus saja pada momen bahagia Anda. Urusan undangan, biar kami yang bereskan dengan cara yang lebih berkelas, hemat, dan praktis.</p>
        </div>
        <div class="lp-features-list">
          <div
            class="lp-feature-item lp-reveal"
            v-for="(feature, i) in features"
            :key="feature.title"
            :style="{ transitionDelay: `${i * 100}ms` }"
          >
            <div class="lp-feature-icon-wrapper">
              <Icon :icon="feature.icon" class="lp-feature-icon" />
            </div>
            <div class="lp-feature-text">
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Wave Divider -->
    <div class="lp-wave-divider lp-wave-alt-to-white" aria-hidden="true">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" /></svg>
    </div>

    <!-- Live Preview Showcase Section -->
    <section id="live-preview" class="lp-section" aria-label="Live Preview Editor">
      <div class="lp-container lp-showcase-split">
        <div class="lp-showcase-content lp-reveal">
          <p class="lp-section-kicker">Bebas Revisi Sepuasnya</p>
          <h2 class="lp-section-title">Lihat Perubahan Real-time. Tanpa Butuh Desainer.</h2>
          <p class="lp-section-sub">
            Ganti font, sesuaikan warna, atau ubah lokasi acara dan lihat hasilnya detik itu juga. Anda memegang kendali penuh atas tampilan undangan dari layar hp Anda.
          </p>
          <ul class="lp-showcase-list">
            <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon" /> Tidak perlu lagi membayar biaya revisi.</li>
            <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon" /> Bebas khawatir salah ketik atau info yang kurang akurat.</li>
            <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon" /> Mudah digunakan, bahkan jika Anda bukan orang teknis.</li>
          </ul>
          <a href="/login" class="lp-btn lp-btn-primary lp-showcase-btn">Coba Live Editor Sekarang</a>
        </div>
        <div class="lp-showcase-image lp-reveal" style="transition-delay: 200ms;">
          <div class="lp-mockup-wrapper">
             <img src="https://media.mengundanganda.com/landing-page/Screenshot%202026-04-03%20191057.webp" alt="Tampilan fitur Live Preview Editor undangan pernikahan digital MengundangAnda" class="lp-mockup-img" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- Wave Divider -->
    <div class="lp-wave-divider lp-wave-white-to-alt" aria-hidden="true">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0,60 C360,0 1080,100 1440,40 L1440,100 L0,100 Z" /></svg>
    </div>

    <!-- Tema Section -->
    <section id="tema" class="lp-section lp-section-alt" aria-label="Koleksi Tema">
      <div class="lp-container">
        <div class="lp-section-header lp-reveal">
          <p class="lp-section-kicker">Koleksi Desain Premium</p>
          <h2 class="lp-section-title">Visual Indah yang Mencerminkan Kisah Anda</h2>
          <p class="lp-section-sub">Setiap desain dirancang khusus oleh desainer profesional untuk membuat tamu undangan Anda terkesan dari pandangan pertama.</p>
        </div>
        <div class="lp-themes-carousel">
          <div class="lp-theme-card lp-reveal" v-for="(theme, i) in themesData" :key="theme.id" :style="{ '--card-accent': theme.color, transitionDelay: `${i * 120}ms` }">
            <div class="lp-theme-preview">
              <div class="lp-theme-device-frame">
                <div class="lp-theme-device-notch"></div>
                <div class="lp-theme-device-screen">
                  <!-- Fallback Placeholder -->
                  <div class="lp-theme-placeholder">
                    <Icon :icon="theme.icon" class="lp-placeholder-icon" :style="{ color: theme.color }" />
                    <span class="lp-placeholder-text">{{ theme.name }}</span>
                  </div>
                  <!-- Thumbnail Image -->
                  <img
                    :src="theme.thumbnail"
                    @error="($event.target as HTMLImageElement).style.opacity = '0'"
                    class="lp-theme-image"
                    :alt="'Preview tema ' + theme.name"
                    loading="lazy"
                  />
                </div>
              </div>
              <div class="lp-theme-accent-bar" :style="{ background: theme.bgGradient }"></div>
            </div>
            
            <div class="lp-theme-info">
              <div class="lp-theme-header">
                <div class="lp-theme-name-row">
                  <Icon :icon="theme.icon" class="lp-theme-name-icon" :style="{ color: theme.color }" />
                  <h3 class="lp-theme-name">{{ theme.name }}</h3>
                </div>
              </div>
              <div class="lp-theme-actions">
                <a
                  v-if="theme.sampleUrl"
                  :href="theme.sampleUrl"
                  class="btn btn-outline btn-sm lp-theme-btn"
                >
                  <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">visibility</span>
                  Lihat Contoh
                </a>
                <button
                  v-else
                  class="btn btn-outline btn-sm lp-theme-btn"
                  disabled
                  title="Link contoh akan segera tersedia"
                >
                  <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">hourglass_top</span>
                  Segera Hadir
                </button>

                <a
                  :href="`/dashboard/create?theme=${theme.id}`"
                  class="btn btn-primary btn-sm lp-theme-btn lp-theme-btn-use"
                >
                  <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">brush</span>
                  Pakai Tema Ini
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- CTA: Lihat Semua Tema -->
        <div class="lp-themes-cta lp-reveal" style="transition-delay: 600ms;">
          <a href="/themes" class="lp-btn lp-btn-themes-cta">
            <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">palette</span>
            Lihat Semua Koleksi Tema
            <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Wave Divider -->
    <div class="lp-wave-divider lp-wave-alt-to-white" aria-hidden="true">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" /></svg>
    </div>

    <!-- Cara Kerja Section -->
    <section id="cara-kerja" class="lp-section" aria-label="Cara Kerja">
      <div class="lp-container">
        <div class="lp-section-header lp-reveal">
          <p class="lp-section-kicker">Hanya Dalam 3 Langkah</p>
          <h2 class="lp-section-title">Pelaksanaannya Semudah Mengupdate Medsos</h2>
          <p class="lp-section-sub">Sama sekali tidak butuh keahlian desain. Siapa pun bisa merancang undangan digital eksklusif ini.</p>
        </div>
        <div class="lp-steps-grid">
          <div class="lp-step lp-reveal" v-for="(step, i) in steps" :key="step.title" :style="{ transitionDelay: `${i * 150}ms` }">
            <div class="lp-step-number-wrapper">
              <div class="lp-step-number">{{ i + 1 }}</div>
            </div>
            <div class="lp-step-icon-circle">
              <Icon :icon="step.icon" class="lp-step-icon-svg" />
            </div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Wave Divider -->
    <div class="lp-wave-divider lp-wave-white-to-alt" aria-hidden="true">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0,60 C360,0 1080,100 1440,40 L1440,100 L0,100 Z" /></svg>
    </div>

    <!-- Testimoni Section -->
    <section id="testimoni" class="lp-section lp-section-alt" aria-label="Testimoni Pengguna">
      <div class="lp-container">
        <div class="lp-section-header lp-reveal">
          <p class="lp-section-kicker">Apa Kata Mereka</p>
          <h2 class="lp-section-title">Testimoni Pengguna</h2>
        </div>
        <div class="lp-testimonials-grid">
          <div class="lp-testimonial lp-reveal" v-for="(t, i) in testimonials" :key="t.name" :style="{ transitionDelay: `${i * 100}ms` }">
            <!-- Decorative quote mark -->
            <div class="lp-testimonial-quote-mark" aria-hidden="true">
              <svg width="40" height="32" viewBox="0 0 40 32" fill="currentColor" opacity="0.08"><path d="M0 20.8C0 27.2 4.48 32 10.08 32c4.8 0 8.32-3.52 8.32-8 0-4.16-3.2-7.36-7.04-7.36-1.28 0-2.24.32-2.88.64.32-5.12 3.84-10.56 9.28-14.08L14.4 0C5.44 4.8 0 12.16 0 20.8zm21.76 0C21.76 27.2 26.24 32 31.84 32c4.8 0 8.16-3.52 8.16-8 0-4.16-3.04-7.36-7.04-7.36-1.28 0-2.24.32-2.88.64.32-5.12 3.84-10.56 9.28-14.08L36.16 0c-8.96 4.8-14.4 12.16-14.4 20.8z"/></svg>
            </div>
            <div class="lp-testimonial-stars" aria-label="Rating 5 bintang">
              <Icon icon="solar:star-bold" v-for="n in 5" :key="n" class="lp-star-icon" />
            </div>
            <p class="lp-testimonial-text">"{{ t.text }}"</p>
            <div class="lp-testimonial-author">
              <div class="lp-testimonial-avatar">
                <Icon :icon="t.avatarIcon" class="lp-avatar-svg" />
              </div>
              <div>
                <div class="lp-testimonial-name">{{ t.name }}</div>
                <div class="lp-testimonial-role">{{ t.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Wave Divider -->
    <div class="lp-wave-divider lp-wave-alt-to-white" aria-hidden="true">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" /></svg>
    </div>

    <!-- Pricing Section -->
    <section id="harga" class="lp-section" aria-label="Harga">
      <div class="lp-container">
        <div class="lp-section-header lp-reveal">
          <p class="lp-section-kicker">Investasi Cerdas</p>
          <h2 class="lp-section-title">Harga Transparan. Tanpa Biaya Tersembunyi.</h2>
          <p class="lp-section-sub">Buktikan sendiri secara gratis. Jauh lebih hemat daripada pengeluaran untuk ribuan lembar undangan cetak.</p>
        </div>
        <div class="lp-pricing-grid">
          <!-- Free Plan -->
          <div class="lp-pricing-card lp-reveal">
            <div class="lp-pricing-header">
              <h3>Free</h3>
              <div class="lp-pricing-price">Gratis</div>
              <p>Coba buat undangan & lihat hasilnya langsung.</p>
            </div>
            <ul class="lp-pricing-features">
              <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon" /> Masa aktif 1 bulan</li>
              <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon" /> Maksimal 25x akses undangan</li>
              <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon" /> Bebas edit tanpa batas</li>
              <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon" /> Live preview editor</li>
              <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon" /> Branding "Powered by MengundangAnda"</li>
            </ul>
            <a href="/login" class="lp-btn lp-pricing-btn">Mulai Gratis</a>
          </div>

          <!-- Premium Plan -->
          <div class="lp-pricing-card lp-pricing-premium lp-reveal" style="transition-delay: 120ms;">
            <div class="lp-premium-badge">PALING POPULER</div>
            <div class="lp-pricing-shimmer" aria-hidden="true"></div>
            <div class="lp-pricing-header">
              <h3>Premium</h3>
              <div class="lp-pricing-price">Rp 50.000</div>
              <p>Fitur penuh untuk hari bahagia Anda tanpa batas.</p>
            </div>
            <ul class="lp-pricing-features">
              <li><Icon icon="solar:star-fall-bold-duotone" class="check-icon accent" /> <strong>Masa aktif 1 tahun penuh</strong></li>
              <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon accent" /> Akses undangan unlimited (tanpa batas)</li>
              <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon accent" /> Bebas pilih semua koleksi tema premium</li>
              <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon accent" /> Fitur Amplop Digital / QRIS</li>
              <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon accent" /> Upload musik latar sendiri</li>
              <li><Icon icon="solar:check-circle-bold-duotone" class="check-icon accent" /> Tanpa branding platform</li>
            </ul>
            <a href="/login" class="lp-btn lp-btn-primary lp-pricing-btn">Upgrade Premium</a>
          </div>

          <!-- Jasa Dibuatkan Plan -->
          <div class="lp-pricing-card lp-pricing-jasa lp-reveal" style="transition-delay: 240ms;">
            <div class="lp-jasa-badge">TERIMA JADI</div>
            <div class="lp-pricing-header">
              <h3>Jasa Dibuatkan</h3>
              <div class="lp-pricing-price">Rp 99.000</div>
              <p>Duduk manis, admin kami yang buatkan untuk Anda.</p>
            </div>
            <ul class="lp-pricing-features">
              <li><Icon icon="solar:magic-stick-3-bold-duotone" class="check-icon jasa" /> <strong>Admin buatkan untuk Anda</strong></li>
              <li><Icon icon="solar:crown-bold-duotone" class="check-icon jasa" /> Semua fitur Premium termasuk</li>
              <li><Icon icon="solar:clock-circle-bold-duotone" class="check-icon jasa" /> Selesai dalam 30 menit</li>
              <li><Icon icon="solar:refresh-circle-bold-duotone" class="check-icon jasa" /> 3x revisi gratis</li>
              <li><Icon icon="solar:infinity-bold-duotone" class="check-icon jasa" /> Akses unlimited 1 tahun</li>
              <li><Icon icon="solar:shield-check-bold-duotone" class="check-icon jasa" /> Tanpa branding platform</li>
            </ul>
            <a href="/order" class="lp-btn lp-btn-jasa lp-pricing-btn">Pesan Sekarang</a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="lp-faq" aria-label="Pertanyaan yang Sering Diajukan">
      <div class="lp-container">
        <div class="lp-section-header lp-reveal">
          <p class="lp-section-kicker">FAQ</p>
          <h2 class="lp-section-title">Pertanyaan yang Sering Diajukan</h2>
          <p class="lp-section-sub">Semua yang perlu Anda ketahui tentang MengundangAnda</p>
        </div>
        <div class="lp-faq-grid">
          <div 
            v-for="(faq, idx) in faqList" 
            :key="idx" 
            class="lp-faq-item lp-reveal"
            :style="{ transitionDelay: (idx * 60) + 'ms' }"
          >
            <button 
              class="lp-faq-question" 
              @click="faqOpen === idx ? faqOpen = -1 : faqOpen = idx"
              :aria-expanded="faqOpen === idx"
            >
              <span>{{ faq.q }}</span>
              <span class="lp-faq-icon" :class="{ open: faqOpen === idx }">
                <Icon icon="solar:alt-arrow-down-linear" />
              </span>
            </button>
            <Transition name="faq-slide">
              <div v-if="faqOpen === idx" class="lp-faq-answer">
                <p>{{ faq.a }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section id="cta" class="lp-cta" aria-label="Ajakan Membuat Undangan">
      <div class="lp-cta-bg"></div>
      <!-- Floating Orbs for CTA -->
      <div class="lp-cta-orbs" aria-hidden="true">
        <div class="lp-orb lp-orb-cta-1"></div>
        <div class="lp-orb lp-orb-cta-2"></div>
      </div>
      <div class="lp-container lp-cta-content lp-reveal">
        <div class="lp-cta-ornament" aria-hidden="true">
          <svg width="60" height="2" viewBox="0 0 60 2"><rect width="60" height="2" rx="1" fill="rgba(255,255,255,0.3)"/></svg>
          <Icon icon="solar:heart-bold" style="font-size: 20px; color: rgba(147,197,253,0.6);" />
          <svg width="60" height="2" viewBox="0 0 60 2"><rect width="60" height="2" rx="1" fill="rgba(255,255,255,0.3)"/></svg>
        </div>
        <h2 class="lp-cta-title">Siap Memukau Tamu<br><span>Undangan Anda?</span></h2>
        <p class="lp-cta-sub">Bergabung dengan ratusan pasangan yang sudah berhasil menghemat jutaan rupiah tanpa mengorbankan estetika.</p>
        <a href="/login" class="lp-btn lp-btn-white lp-cta-btn">Buat Undangan Gratis Sekarang</a>
      </div>
    </section>
    </main>

    <!-- Footer -->
    <footer class="lp-footer">
      <div class="lp-container lp-footer-inner">
        <div class="lp-footer-brand">
          <a href="#" class="lp-logo">
            <img src="/images/logo.webp" alt="Logo MengundangAnda - Platform Undangan Pernikahan Digital" class="lp-logo-img">
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
          <a href="#faq">FAQ</a>
        </div>
        <div class="lp-footer-links">
          <h4>Kontak</h4>
          <a href="mailto:chatkita@mengundanganda.com">chatkita@mengundanganda.com</a>
          <a href="#">Instagram</a>
          <a href="#">WhatsApp</a>
        </div>
        <div class="lp-footer-links">
          <h4>Legal</h4>
          <a href="/terms">Syarat & Ketentuan</a>
          <a href="/privacy">Kebijakan Privasi</a>
        </div>
      </div>
      <div class="lp-footer-bottom">
        <div class="lp-container lp-footer-bottom-inner">
          <p>&copy; 2026 MengundangAnda. All rights reserved.</p>
          <div class="lp-footer-bottom-links">
            <a href="/terms">Syarat & Ketentuan</a>
            <span class="lp-footer-dot">·</span>
            <a href="/privacy">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- Mobile Bottom Navigation -->
    <nav class="mobile-bottom-nav">
      <div class="mobile-nav-inner">
        <a href="#" class="mobile-nav-item" :class="{ active: activeSection === 'beranda' }" @click="activeSection = 'beranda'">
          <Icon icon="solar:home-smile-bold-duotone" />
          <span>Beranda</span>
        </a>
        <a href="#tema" class="mobile-nav-item" :class="{ active: activeSection === 'tema' }" @click="activeSection = 'tema'">
          <Icon icon="solar:gallery-bold-duotone" />
          <span>Tema</span>
        </a>
        <a href="#harga" class="mobile-nav-item" :class="{ active: activeSection === 'harga' }" @click="activeSection = 'harga'">
          <Icon icon="solar:tag-price-bold-duotone" />
          <span>Harga</span>
        </a>
        <a href="/login" class="mobile-nav-item nav-cta">
          <div class="cta-icon-wrapper">
            <Icon icon="solar:magic-stick-3-bold-duotone" />
          </div>
          <span>Buat</span>
        </a>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { Icon } from '@iconify/vue'
import LandingHeroCinematic from '@/components/landing/LandingHeroCinematic.vue'

const navScrolled = ref(false)
const mobileMenuOpen = ref(false)
const navHiddenMobile = ref(false)
const activeSection = ref('beranda')
const scrollY = ref(0)
const statsRef = ref<HTMLElement | null>(null)
const prefersReducedMotion = ref(false)
const faqOpen = ref(-1)

const faqList = [
  {
    q: 'Apa itu MengundangAnda?',
    a: 'MengundangAnda adalah platform pembuatan undangan pernikahan digital premium yang memungkinkan Anda membuat undangan elegan dalam hitungan menit. Pilih dari berbagai tema mewah, lengkapi data acara, dan langsung bagikan ke tamu melalui WhatsApp.'
  },
  {
    q: 'Bagaimana cara membuat undangan digital di MengundangAnda?',
    a: 'Cukup 3 langkah: (1) Daftar akun gratis, (2) Pilih tema dan isi detail acara pernikahan Anda, (3) Bagikan link undangan ke tamu via WhatsApp. Seluruh proses bisa selesai dalam 5 menit.'
  },
  {
    q: 'Apakah bisa membuat undangan pernikahan digital secara gratis?',
    a: 'Ya! MengundangAnda menyediakan paket Free yang mencakup semua fitur utama: pilihan tema premium, RSVP, musik latar, countdown, galeri foto, dan live preview. Paket Free aktif selama 1 bulan dengan 25x akses link.'
  },
  {
    q: 'Berapa harga paket premium MengundangAnda?',
    a: 'Paket Premium hanya Rp 50.000 (sekali bayar, self-service) dengan fitur: unlimited akses link, masa aktif 1 tahun, semua tema premium, fitur amplop digital, upload musik sendiri, dan tanpa branding platform.'
  },
  {
    q: 'Apa itu layanan Jasa Dibuatkan Undangan?',
    a: 'Layanan Jasa Dibuatkan (Rp 99.000) adalah paket terima jadi. Anda cukup kirim data pernikahan, lalu admin kami yang akan membuatkan undangan digital premium untuk Anda. Selesai dalam 1 jam, dengan 3x revisi gratis dan semua fitur Premium sudah termasuk.'
  },
  {
    q: 'Fitur apa saja yang tersedia di MengundangAnda?',
    a: 'Fitur lengkap meliputi: 5 tema premium (Elegant Gold, Floral, Minimalist, Elegant Blue, Floral Blue), RSVP & buku tamu, musik latar otomatis, countdown timer, galeri foto prewedding, love story timeline, amplop digital, peta lokasi Google Maps, dan kirim undangan via WhatsApp.'
  },
]

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

  updateActiveSection()
}

function updateActiveSection() {
  const allSections = ['fitur', 'live-preview', 'tema', 'cara-kerja', 'testimoni', 'harga', 'faq']
  let current = activeSection.value
  
  for (const id of allSections) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      // Section is active if it's in the middle of the viewport
      if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.3) {
        if (id === 'tema') current = 'tema'
        else if (id === 'harga') current = 'harga'
        else current = '' // Clear active if in a section not in bottom nav
        break
      }
    }
  }
  
  // If at the very top, Beranda is active
  if (window.scrollY < window.innerHeight * 0.4) {
    current = 'beranda'
  }
  
  activeSection.value = current
}

// ---- Stats Counter Animation ----
const stats = reactive([
  { target: 500, displayed: 0, suffix: '+', label: 'Undangan Dibuat' },
  { target: 1200, displayed: 0, suffix: '+', label: 'Tamu Diundang' },
  { target: 99, displayed: 0, suffix: '%', label: 'Pengguna Puas' },
])
let statsAnimated = false

function animateCounters() {
  if (statsAnimated || prefersReducedMotion.value) {
    // If reduced motion, just set final values immediately
    stats.forEach(s => { s.displayed = s.target })
    statsAnimated = true
    return
  }
  statsAnimated = true
  const duration = 1800
  const startTime = performance.now()

  function tick(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3)
    stats.forEach(s => {
      s.displayed = Math.round(s.target * ease)
    })
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

// ---- Scroll-triggered reveal animation ----
let revealObserver: IntersectionObserver | null = null

function setupRevealObserver() {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('lp-revealed')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

  document.querySelectorAll('.lp-reveal').forEach(el => {
    revealObserver!.observe(el)
  })
}

// ---- Stats IntersectionObserver ----
let statsObserver: IntersectionObserver | null = null

function setupStatsObserver() {
  if (!statsRef.value) return
  statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !statsAnimated) {
        animateCounters()
      }
    })
  }, { threshold: 0.3 })
  statsObserver.observe(statsRef.value)
}

onMounted(() => {
  // Check for reduced motion preference
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Dynamic SEO head management
  document.title = 'MengundangAnda — Buat Undangan Pernikahan Digital Premium | Mengundang Anda'
  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) {
    metaDesc.setAttribute('content', 'MengundangAnda — Platform undangan pernikahan digital premium. Buat desain mewah gratis dalam 5 menit. RSVP, Musik, Maps, dan kirim via WhatsApp. Mengundang Anda dengan elegan.')
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  // Setup scroll-triggered reveal animations
  nextTick(() => {
    setupRevealObserver()
    setupStatsObserver()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  revealObserver?.disconnect()
  statsObserver?.disconnect()
})


const features = [
  { icon: 'solar:stopwatch-bold-duotone', title: 'Siap Sebar Dalam 5 Menit', desc: 'Lupakan proses revisi berhari-hari dengan vendor. Isi form, dan undangan siap di-share.' },
  { icon: 'solar:wallet-money-bold-duotone', title: 'Hemat Budget Hingga 90%', desc: 'Coret biaya cetak dari anggaran Anda. Simpan dana untuk kebutuhan lain yang lebih krusial.' },
  { icon: 'solar:smartphone-2-bold-duotone', title: 'Sebar Cepat via WhatsApp', desc: 'Sekali klik, jangkau ratusan tamu di mana saja secara instan. Tanpa repot keliling rumah.' },
  { icon: 'solar:map-point-wave-bold-duotone', title: 'Pengalaman Tamu Terbaik', desc: 'Manjakan tamu dengan navigasi lokasi presisi tinggi, musik romantis, dan sistem RSVP otomatis.' },
  { icon: 'solar:pallete-2-bold-duotone', title: 'Standar Visual Profesional', desc: 'Setiap elemen didesain oleh ahlinya. Undangan terlihat mahal tanpa harus membayar mahal.' },
  { icon: 'solar:shield-check-bold-duotone', title: 'Kendali Penuh di Tangan Anda', desc: 'Ada perubahan mendadak? Tenang, Anda bisa update lokasi atau tanggal kapan pun tanpa batas.' },
]

const steps = [
  { title: 'Pilih Desain', desc: 'Temukan tema visual yang paling serasi dengan konsep dan nuansa pernikahan Anda.', icon: 'solar:pallete-2-bold-duotone' },
  { title: 'Lengkapi Cerita', desc: 'Masukkan detail acara, cerita cinta, galeri foto, dan peta lokasi ke dalam form yang simpel.', icon: 'solar:pen-new-square-bold-duotone' },
  { title: 'Langsung Sebarkan', desc: 'Salin link undangan unik Anda dan sebarkan ke kerabat serta sahabat dalam satu ketukan.', icon: 'solar:share-bold-duotone' },
]

const testimonials = [
  { avatarIcon: 'solar:user-heart-bold-duotone', name: 'Aisyah & Rizky', role: 'Menikah November 2025', text: 'Awalnya cuma iseng coba, eh ternyata hasilnya bagus banget. Temen-temen pada nanya bikin undangannya dimana, hehe. Prosesnya gampang, tinggal isi data terus langsung jadi.' },
  { avatarIcon: 'solar:users-group-two-rounded-bold-duotone', name: 'Dewi & Arif', role: 'Menikah Januari 2026', text: 'Suka banget sama fitur petanya, jadi tamu ga perlu nanya-nanya lagi lokasi nikahan. Musiknya juga bikin undangan kerasa lebih hidup. Worth it sih menurutku.' },
  { avatarIcon: 'solar:heart-bold-duotone', name: 'Sarah & Budi', role: 'Menikah Maret 2026', text: 'Sempet mikir mau cetak undangan, tapi setelah coba ini langsung berubah pikiran. Hemat banget dan hasilnya malah lebih cantik. Tema floral-nya beneran elegan!' },
]

const themesData = [
  {
    id: 'elegant',
    name: 'Elegant Gold',
    thumbnail: 'https://media.mengundanganda.com/floral/43498db7-3a42-4aaa-a066-a0322604ac92.webp',
    description: 'Desain klasik premium dengan aksen emas dan font serif yang mewah. Cocok untuk acara formal dan mewah yang membutuhkan sentuhan kemewahan.',
    color: '#c9a96e',
    bgColor: '#2c2417',
    bgGradient: 'linear-gradient(135deg, #2c2417, #5a4b3d)',
    sampleUrl: '/sample/elegant',
    icon: 'solar:crown-bold-duotone',
  },
  {
    id: 'floral',
    name: 'Floral',
    thumbnail: 'https://media.mengundanganda.com/floral/24b44e21-d97b-4b62-bb88-e29eea9c8e18.webp',
    description: 'Desain romantis dengan ornamen daun dan bunga, warna pastel lembut. Sempurna untuk nuansa garden party yang penuh keindahan alam.',
    color: '#4a5d4e',
    bgColor: '#4a5d4e',
    bgGradient: 'linear-gradient(135deg, #4a5d4e, #8a9a5b)',
    sampleUrl: '/sample/floral',
    icon: 'solar:leaf-bold-duotone',
  },
  {
    id: 'minimalist',
    name: 'Clean Minimalist',
    thumbnail: 'https://media.mengundanganda.com/floral/79f8508a-609c-4b27-9803-bfc1c2fbea16.webp',
    description: 'Tampilan bersih & modern dengan ruang putih luas dan font sans-serif tebal. Untuk pasangan yang mencintai kesederhanaan dan keanggunan modern.',
    color: '#111111',
    bgColor: '#f9f9f9',
    bgGradient: 'linear-gradient(135deg, #1e293b, #475569)',
    sampleUrl: '/sample/minimalist',
    icon: 'solar:minimalistic-magnifer-bold-duotone',
  },
  {
    id: 'elegant_blue',
    name: 'Elegant Blue',
    thumbnail: 'https://media.mengundanganda.com/floral/b308425f-94ec-4923-91b4-89a22eeef55d.webp',
    description: 'Desain elegan dengan nuansa biru dusty yang menenangkan dipadukan dengan aksen champagne gold. Sempurna untuk nuansa mewah modern.',
    color: '#A3B5C3',
    bgColor: '#1e3a8a',
    bgGradient: 'linear-gradient(135deg, #1e3a8a, #A3B5C3)',
    sampleUrl: '/sample/elegant_blue',
    icon: 'solar:stars-bold-duotone',
  },
  {
    id: 'floral_blue',
    name: 'Floral Blue',
    thumbnail: 'https://media.mengundanganda.com/floral/24b44e21-d97b-4b62-bb88-e29eea9c8e18.webp',
    description: 'Perpaduan ornamen floral dengan palet biru yang segar dan elegan. Cocok untuk pasangan yang menginginkan nuansa romantis dengan sentuhan modern.',
    color: '#3b6b8a',
    bgColor: '#3b6b8a',
    bgGradient: 'linear-gradient(135deg, #3b6b8a, #b8d4e3)',
    sampleUrl: '/sample/floral_blue',
    icon: 'solar:leaf-bold-duotone',
  },
]
</script>

<style scoped>
/* ========================================
   Landing Page — Blue & White Premium Theme
   UI/UX Upgraded Edition
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
  position: relative;
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
  color: var(--lp-accent-hover);
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

/* --- Scroll-triggered Reveal Animation --- */
.lp-reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.lp-reveal.lp-revealed {
  opacity: 1;
  transform: translateY(0);
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
  background: var(--lp-accent-hover);
  color: #fff;
  border-color: var(--lp-accent-hover);
  box-shadow: 0 4px 24px rgba(59, 130, 246, 0.35);
}
.lp-btn-primary:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;
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
  cursor: pointer;
}

.lp-nav.scrolled .lp-nav-links a {
  color: var(--lp-text-light);
}

.lp-nav-links a:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
}

.lp-nav.scrolled .lp-nav-links a:hover {
  color: var(--lp-accent-hover);
  background: var(--lp-accent-light);
}

.lp-nav-cta {
  background: var(--lp-accent-hover) !important;
  color: #fff !important;
  padding: 10px 24px !important;
}
.lp-nav-cta:hover {
  background: #1d4ed8 !important;
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
  inset: 0;
  background-image: url('/images/hero.webp');
  background-size: cover;
  background-position: center 30%;
  background-repeat: no-repeat;
  z-index: 0;
}

.lp-hero-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 20%, rgba(147, 197, 253, 0.12) 0%, transparent 50%),
    linear-gradient(
      180deg,
      rgba(15, 23, 42, 0.6) 0%,
      rgba(30, 58, 138, 0.55) 40%,
      rgba(30, 64, 175, 0.7) 100%
    );
  z-index: 1;
}

/* --- Floating Orbs --- */
.lp-hero-orbs,
.lp-cta-orbs {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  overflow: hidden;
}

.lp-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.35;
  will-change: transform;
}

.lp-orb-1 {
  width: 300px; height: 300px;
  background: rgba(59, 130, 246, 0.4);
  top: 10%; left: -5%;
  animation: orbFloat1 12s ease-in-out infinite;
}
.lp-orb-2 {
  width: 200px; height: 200px;
  background: rgba(147, 197, 253, 0.35);
  top: 60%; right: -3%;
  animation: orbFloat2 15s ease-in-out infinite;
}
.lp-orb-3 {
  width: 150px; height: 150px;
  background: rgba(96, 165, 250, 0.3);
  bottom: 15%; left: 30%;
  animation: orbFloat3 10s ease-in-out infinite;
}
.lp-orb-4 {
  width: 100px; height: 100px;
  background: rgba(191, 219, 254, 0.4);
  top: 25%; right: 20%;
  animation: orbFloat1 18s ease-in-out infinite reverse;
}

.lp-orb-cta-1 {
  width: 250px; height: 250px;
  background: rgba(59, 130, 246, 0.3);
  top: -10%; right: -5%;
  animation: orbFloat2 14s ease-in-out infinite;
}
.lp-orb-cta-2 {
  width: 180px; height: 180px;
  background: rgba(147, 197, 253, 0.25);
  bottom: -5%; left: 10%;
  animation: orbFloat3 11s ease-in-out infinite;
}

@keyframes orbFloat1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -40px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}
@keyframes orbFloat2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-40px, 30px) scale(1.08); }
  66% { transform: translate(25px, -25px) scale(0.92); }
}
@keyframes orbFloat3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(35px, -30px) scale(1.1); }
}

.lp-hero-content {
  position: relative;
  z-index: 3;
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

/* --- Social Proof Stats --- */
.lp-stats {
  background: linear-gradient(135deg, var(--lp-primary-deep) 0%, var(--lp-navy-mid) 100%);
  padding: 0;
  position: relative;
  z-index: 5;
}

.lp-stats-inner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
}

.lp-stat-item {
  text-align: center;
  padding: 36px 24px;
  position: relative;
}
.lp-stat-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 25%;
  height: 50%;
  width: 1px;
  background: rgba(255, 255, 255, 0.12);
}

.lp-stat-number {
  font-family: var(--lp-font-serif);
  font-size: clamp(32px, 4vw, 44px);
  font-weight: 700;
  color: #fff;
  line-height: 1;
  margin-bottom: 8px;
}
.lp-stat-suffix {
  color: var(--lp-accent);
}

.lp-stat-label {
  font-family: var(--lp-font-sans);
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* --- Wave Dividers --- */
.lp-wave-divider {
  line-height: 0;
  overflow: hidden;
  position: relative;
  z-index: 1;
}
.lp-wave-divider svg {
  width: 100%;
  height: 50px;
  display: block;
}

.lp-wave-alt-to-white svg path {
  fill: var(--lp-bg);
}
.lp-wave-alt-to-white {
  background: var(--lp-bg-alt);
}

.lp-wave-white-to-alt svg path {
  fill: var(--lp-bg-alt);
}
.lp-wave-white-to-alt {
  background: var(--lp-bg);
}

/* --- Feature List Layout --- */
.lp-features-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 48px;
}

.lp-feature-item {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid transparent;
  border-radius: var(--lp-radius-lg);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;
}
.lp-feature-item:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(59, 130, 246, 0.15);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.05);
  transform: translateX(8px);
}

.lp-feature-icon-wrapper {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 16px;
  background: var(--lp-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--lp-accent-hover);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1), inset 0 0 0 1px rgba(59, 130, 246, 0.05);
  transition: all 0.4s ease;
}
.lp-feature-item:hover .lp-feature-icon-wrapper {
  background: var(--lp-accent-hover);
  color: #fff;
  transform: rotate(-10deg) scale(1.05);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.25);
}

.lp-feature-icon {
  font-size: 28px;
}

.lp-feature-text {
  flex: 1;
}

.lp-feature-text h3 {
  font-family: var(--lp-font-serif);
  font-size: 20px;
  font-weight: 700;
  color: var(--lp-primary);
  margin-bottom: 6px;
  text-align: left;
}

.lp-feature-text p {
  font-size: 15px;
  color: var(--lp-text-light);
  line-height: 1.6;
  margin: 0;
  text-align: left;
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
  box-shadow:
    0 32px 64px rgba(15, 23, 42, 0.12),
    0 0 0 1px var(--lp-border);
  background: #fdfdfd;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
}
.lp-mockup-wrapper:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow:
    0 40px 80px rgba(15, 23, 42, 0.16),
    0 0 0 1px rgba(59, 130, 246, 0.2);
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
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}
.lp-theme-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(59, 130, 246, 0.15), 0 0 0 1px var(--lp-accent);
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
  aspect-ratio: 9 / 16;
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

.lp-theme-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  border: none;
  pointer-events: none;
  z-index: 10;
  transition: opacity 0.3s ease;
  background: #fff;
}

.lp-theme-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
}

.lp-placeholder-icon {
  font-size: 48px;
  color: rgba(255, 255, 255, 0.25);
}

.lp-placeholder-text {
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  font-weight: 500;
}

.lp-theme-accent-bar {
  height: 4px;
  border-radius: 2px 2px 0 0;
}

.lp-theme-info {
  padding: 20px 24px 24px;
}

.lp-theme-header {
  margin-bottom: 16px;
}

.lp-theme-name-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lp-theme-name-icon {
  font-size: 22px;
}

.lp-theme-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--lp-primary);
  margin: 0;
}

.lp-theme-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.lp-theme-btn {
  flex: 1;
  min-width: 0;
  justify-content: center;
  white-space: nowrap;
  font-size: 13px !important;
  padding: 8px 12px !important;
  cursor: pointer;
}

.lp-theme-btn-use {
  flex: 1.2;
}

.lp-theme-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* --- Themes CTA Button --- */
.lp-themes-cta {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.lp-btn-themes-cta {
  background: var(--lp-bg);
  color: var(--lp-accent-hover);
  border: 2px solid var(--lp-accent-hover);
  gap: 10px;
  font-size: 15px;
  padding: 14px 36px;
  box-shadow: 0 2px 12px rgba(59, 130, 246, 0.1);
}

.lp-btn-themes-cta:hover {
  background: var(--lp-accent-hover);
  color: #fff;
  border-color: var(--lp-accent-hover);
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(59, 130, 246, 0.35);
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
  top: 24px;
  left: 16%;
  right: 16%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.3), transparent);
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
  border-right: 2px solid var(--lp-accent-hover);
  border-bottom: 2px solid var(--lp-accent-hover);
  transform: rotate(-45deg);
  z-index: 2;
  border-radius: 2px;
}

.lp-step-number-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.lp-step-number {
  font-family: var(--lp-font-sans);
  font-size: 16px;
  font-weight: 700;
  width: 48px;
  height: 48px;
  line-height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--lp-accent-hover), #60a5fa);
  color: #fff;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3), 0 0 0 8px var(--lp-bg);
  position: relative;
  z-index: 1;
}

.lp-step-icon-circle {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: var(--lp-accent-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s ease;
}
.lp-step:hover .lp-step-icon-circle {
  transform: scale(1.1) rotate(-5deg);
  background: rgba(59, 130, 246, 0.15);
}
.lp-step-icon-svg {
  font-size: 28px;
  color: var(--lp-accent-hover);
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
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid var(--lp-border);
  border-radius: var(--lp-radius-xl);
  padding: 36px 32px 32px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.lp-testimonial:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(59, 130, 246, 0.12);
  border-color: rgba(59, 130, 246, 0.25);
}

.lp-testimonial-quote-mark {
  position: absolute;
  top: 16px;
  right: 20px;
  color: var(--lp-accent-hover);
  pointer-events: none;
}

.lp-testimonial-stars {
  display: flex;
  gap: 3px;
  margin-bottom: 16px;
}
.lp-star-icon {
  font-size: 18px;
  color: #f59e0b;
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
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(59, 130, 246, 0.15);
  flex-shrink: 0;
}
.lp-avatar-svg {
  font-size: 26px;
  color: var(--lp-accent-hover);
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
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1080px;
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
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.lp-pricing-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.4);
}

.lp-pricing-premium {
  border: 2px solid var(--lp-accent-hover);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.15);
  transform: scale(1.03);
}
.lp-pricing-premium:hover {
  transform: scale(1.05) translateY(-6px);
  box-shadow: 0 24px 60px rgba(59, 130, 246, 0.25);
  border-color: var(--lp-accent-hover);
}

.lp-premium-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, var(--lp-accent-hover), #60a5fa);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 6px 20px;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
  animation: badgePulse 3s ease-in-out infinite;
  z-index: 2;
}

@keyframes badgePulse {
  0%, 100% { box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4); }
  50% { box-shadow: 0 4px 24px rgba(59, 130, 246, 0.6), 0 0 0 4px rgba(59, 130, 246, 0.1); }
}

/* Shimmer effect on premium card */
.lp-pricing-shimmer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: var(--lp-radius-xl);
  pointer-events: none;
  z-index: 1;
}
.lp-pricing-shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.05), transparent);
  animation: shimmer 4s ease-in-out infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  50% { left: 100%; }
  100% { left: 100%; }
}

.lp-pricing-header {
  text-align: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--lp-border);
  position: relative;
  z-index: 2;
}
.lp-pricing-header h3 {
  font-size: 20px;
  color: var(--lp-text-light);
  margin-bottom: 12px;
  font-weight: 600;
}
.lp-pricing-premium .lp-pricing-header h3 {
  color: var(--lp-accent-hover);
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
  position: relative;
  z-index: 2;
}
.lp-pricing-features li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 15px;
  color: var(--lp-text);
  margin-bottom: 16px;
}
.check-icon {
  font-size: 22px;
  color: #94a3b8;
  flex-shrink: 0;
  margin-top: 1px;
}
.check-icon.accent {
  color: var(--lp-accent-hover);
}

.lp-pricing-btn {
  width: 100%;
  position: relative;
  z-index: 2;
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

/* --- Jasa Dibuatkan Card --- */
.lp-pricing-jasa {
  border: 2px solid #f59e0b;
  background: linear-gradient(180deg, #fffbeb 0%, #ffffff 40%);
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.1);
}
.lp-pricing-jasa:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(245, 158, 11, 0.18);
  border-color: #d97706;
}
.lp-pricing-jasa .lp-pricing-header h3 {
  color: #b45309;
}
.lp-jasa-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, #f59e0b, #d97706);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 6px 20px;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.35);
  z-index: 2;
  white-space: nowrap;
}
.check-icon.jasa {
  color: #d97706;
}
.lp-pricing-card .lp-btn.lp-btn-jasa {
  background: transparent !important;
  color: #d97706 !important;
  border: 2px solid #f59e0b !important;
  box-shadow: none !important;
}
.lp-pricing-card .lp-btn.lp-btn-jasa:hover {
  background: #fffbeb !important;
  color: #b45309 !important;
  border-color: #d97706 !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.15) !important;
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
  background-size: 200% 200%;
  animation: ctaGradient 8s ease infinite;
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

@keyframes ctaGradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.lp-cta-content {
  position: relative;
  z-index: 3;
}

.lp-cta-ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 28px;
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

.lp-cta-btn {
  position: relative;
  animation: ctaBtnGlow 3s ease-in-out infinite;
}

@keyframes ctaBtnGlow {
  0%, 100% { box-shadow: 0 4px 24px rgba(255,255,255,0.15); }
  50% { box-shadow: 0 4px 36px rgba(255,255,255,0.3), 0 0 0 4px rgba(255,255,255,0.05); }
}

/* --- Footer --- */
.lp-footer {
  background: var(--lp-navy);
  color: rgba(255,255,255,0.7);
  padding-top: 60px;
}

.lp-footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
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
  cursor: pointer;
}
.lp-footer-links a:hover {
  color: #60a5fa;
  padding-left: 4px;
}

.lp-footer-bottom {
  padding: 20px 0;
}
.lp-footer-bottom-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.lp-footer-bottom p {
  font-size: 13px;
  color: rgba(255,255,255,0.35);
  margin: 0;
}
.lp-footer-bottom-links {
  display: flex;
  align-items: center;
  gap: 8px;
}
.lp-footer-bottom-links a {
  font-size: 13px;
  color: rgba(255,255,255,0.35);
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;
}
.lp-footer-bottom-links a:hover {
  color: #60a5fa;
}
.lp-footer-dot {
  color: rgba(255,255,255,0.2);
  font-size: 14px;
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
  background: var(--lp-accent-hover);
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
  background: #1d4ed8;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 28px rgba(59, 130, 246, 0.5);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .lp-features-list {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto;
    gap: 20px;
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
    gap: 32px;
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

  .lp-stats-inner {
    grid-template-columns: repeat(3, 1fr);
  }
  .lp-stat-item {
    padding: 28px 12px;
  }
  .lp-stat-number {
    font-size: clamp(24px, 5vw, 36px);
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
    color: var(--lp-accent-hover) !important;
  }
  .lp-nav-links a.lp-nav-cta {
    margin-top: 12px;
    padding: 16px 20px !important;
    text-align: center;
    color: #ffffff !important;
    background: var(--lp-accent-hover) !important;
    border-radius: var(--lp-radius-lg) !important;
    font-weight: 600 !important;
    letter-spacing: 0.5px;
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
  }
  .lp-nav-links a.lp-nav-cta:hover {
    background: #1d4ed8 !important;
    box-shadow: 0 10px 28px rgba(59, 130, 246, 0.4);
    color: #ffffff !important;
  }

  .lp-section { padding: 72px 0; }

  .lp-features-list {
    grid-template-columns: 1fr;
  }

  .lp-testimonials-grid {
    grid-template-columns: 1fr;
  }

  .lp-hero-bg {
    background-position: center center;
  }

  .lp-back-to-top {
    bottom: 24px;
    right: 20px;
    width: 44px;
    height: 44px;
  }

  .lp-wave-divider svg {
    height: 32px;
  }
}

@media (max-width: 480px) {
  .lp-features-grid {
    grid-template-columns: 1fr;
  }
  .lp-stats-inner {
    grid-template-columns: 1fr;
  }
  .lp-stat-item:not(:last-child)::after {
    right: 25%;
    top: auto;
    bottom: 0;
    width: 50%;
    height: 1px;
  }
}

/* --- Accessibility: Reduced Motion --- */
@media (prefers-reduced-motion: reduce) {
  .lp-orb,
  .lp-pricing-shimmer,
  .lp-cta-bg,
  .lp-cta-btn,
  .lp-premium-badge {
    animation: none !important;
  }

  .lp-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .lp-fade-up {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .lp-hero-bg {
    transform: none !important;
  }

  .lp-feature-card,
  .lp-testimonial,
  .lp-pricing-card,
  .lp-theme-card,
  .lp-mockup-wrapper {
    transition: none;
  }
}

/* ===== FAQ SECTION ===== */
.lp-faq {
  padding: 100px 0;
  background: #f8fafc;
  position: relative;
}
.lp-faq-grid {
  max-width: 780px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.lp-faq-item {
  background: white;
  border-radius: 16px;
  border: 1px solid #e8ecf1;
  overflow: hidden;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}
.lp-faq-item:hover {
  border-color: #93c5fd;
  box-shadow: 0 4px 20px rgba(59,130,246,0.08);
}
.lp-faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  line-height: 1.5;
  transition: color 0.2s;
}
.lp-faq-question:hover {
  color: #2563eb;
}
.lp-faq-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #f1f5f9;
  border-radius: 50%;
  flex-shrink: 0;
  font-size: 18px;
  color: #64748b;
  transition: transform 0.35s ease, background 0.3s, color 0.3s;
}
.lp-faq-icon.open {
  transform: rotate(180deg);
  background: #2563eb;
  color: white;
}
.lp-faq-answer {
  padding: 0 24px 20px;
}
.lp-faq-answer p {
  margin: 0;
  font-size: 15px;
  line-height: 1.7;
  color: #475569;
}

/* FAQ slide transition */
.faq-slide-enter-active {
  animation: faqSlideDown 0.35s ease;
}
.faq-slide-leave-active {
  animation: faqSlideDown 0.25s ease reverse;
}
@keyframes faqSlideDown {
  from { opacity: 0; max-height: 0; padding-bottom: 0; }
  to { opacity: 1; max-height: 300px; padding-bottom: 20px; }
}

@media (max-width: 768px) {
  .lp-faq { padding: 64px 0; }
  .lp-faq-question {
    padding: 16px 18px;
    font-size: 14.5px;
  }
  .lp-faq-answer { padding: 0 18px 16px; }
  .lp-faq-answer p { font-size: 13.5px; }
}

/* ===== Mobile Bottom Navigation ===== */
.mobile-bottom-nav {
  display: none; 
}

@media (max-width: 768px) {
  /* Sembunyikan Navigasi Lama di Mobile */
  .lp-nav-toggle,
  .lp-nav-links {
    display: none !important; 
  }

  /* Tampilkan dan Styling Bottom Nav */
  .mobile-bottom-nav {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    padding: 0 16px 16px;
  }

  /* Center Logo on Mobile */
  .lp-nav-inner {
    justify-content: center !important;
  }

  .mobile-nav-inner {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border-radius: 24px;
    padding: 8px 12px;
  }

  .mobile-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    text-decoration: none;
    color: var(--admin-text-secondary);
    font-size: 11px;
    font-weight: 500;
    flex: 1;
    transition: all 0.2s ease;
  }

  .mobile-nav-item svg {
    font-size: 24px;
    transition: transform 0.2s ease;
  }

  .mobile-nav-item.active {
    color: var(--admin-primary);
  }

  .mobile-nav-item.active svg {
    transform: translateY(-2px);
  }

  .mobile-nav-item.nav-cta .cta-icon-wrapper {
    background: linear-gradient(135deg, var(--admin-primary), #2563eb);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -20px;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
    border: 3px solid #f8fafc;
    transition: transform 0.2s ease;
  }

  .mobile-nav-item.nav-cta:hover .cta-icon-wrapper {
    transform: scale(1.05);
  }

  .mobile-nav-item.nav-cta svg {
    font-size: 20px;
  }
  
  .landing main {
    padding-bottom: 80px; 
  }
}
</style>
