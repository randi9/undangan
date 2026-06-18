<template>
  <div class="landing" :style="{ '--scroll-y': scrollY + 'px' }">
    <!-- Navbar -->
    <nav
      class="lp-nav"
      :class="{
        scrolled: navScrolled || mobileMenuOpen,
        'nav-hidden': navHiddenMobile,
      }"
    >
      <div class="lp-container lp-nav-inner">
        <a href="#" class="lp-logo">
          <img
            src="/images/logo.webp"
            alt="Logo MengundangAnda - Platform Undangan Pernikahan Digital"
            class="lp-logo-img"
          />
          <span>Mengundang<span class="lp-logo-accent">Anda</span></span>
        </a>
        <button
          class="lp-nav-toggle"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle menu"
        >
          <span :class="{ open: mobileMenuOpen }"></span>
        </button>
        <ul class="lp-nav-links" :class="{ open: mobileMenuOpen }">
          <li><a href="#fitur" @click="mobileMenuOpen = false">Fitur</a></li>
          <li><a href="#tema" @click="mobileMenuOpen = false">Tema</a></li>
          <li>
            <a href="#cara-kerja" @click="mobileMenuOpen = false">Cara Kerja</a>
          </li>

          <li><a href="#harga" @click="mobileMenuOpen = false">Harga</a></li>
          <li><a href="#faq" @click="mobileMenuOpen = false">FAQ</a></li>
          <li>
            <a href="/login" class="lp-nav-cta" @click="mobileMenuOpen = false"
              >Buat Undangan</a
            >
          </li>
        </ul>
      </div>
    </nav>

    <main>
      <!-- Hero Section -->
      <LandingHeroCinematic />

      <!-- Fitur Section (Interactive Theme Showcase) -->
      <section
        id="fitur"
        class="lp-section lp-section-alt"
        aria-label="Demo Tema"
      >
        <div class="lp-container lp-showcase-split">
          <div class="lp-showcase-content lp-reveal">
            <p class="lp-section-kicker">Desain Berkualitas Tinggi</p>
            <h2 class="lp-section-title">Coba Langsung Kualitas Tema Kami.</h2>
            <ul class="lp-showcase-list">
              <li>
                <Icon
                  icon="solar:check-circle-bold-duotone"
                  class="check-icon"
                />
                Animasi mulus (smooth scrolling).
              </li>
              <li>
                <Icon
                  icon="solar:check-circle-bold-duotone"
                  class="check-icon"
                />
                Responsif dan cantik di semua layar perangkat.
              </li>
              <li>
                <Icon
                  icon="solar:check-circle-bold-duotone"
                  class="check-icon"
                />
                Beragam pilihan tema premium eksklusif.
              </li>
            </ul>
            <a href="/themes" class="lp-btn lp-btn-primary lp-showcase-btn"
              >Lihat Semua Tema</a
            >
          </div>

          <div
            class="lp-showcase-image lp-reveal"
            style="transition-delay: 200ms"
          >
            <!-- Smartphone CSS Frame Mockup -->
            <div class="smartphone-frame-wrapper">
              <div class="smartphone-frame">
                <div class="smartphone-notch"></div>
                <div class="smartphone-screen">
                  <!-- Iframe loaded immediately on page load to prevent delay when scrolling -->
                  <iframe
                    src="/sample/floral_blue?autoOpen=true"
                    class="theme-demo-iframe"
                    title="Demo Tema Floral Blue"
                    frameborder="0"
                    @load="isDemoLoaded = true"
                  ></iframe>
                  <!-- Loading skeleton while iframe is loading -->
                  <div v-if="!isDemoLoaded" class="demo-skeleton">
                    <div class="demo-skeleton-shimmer"></div>
                    <div class="demo-skeleton-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                        <line x1="8" y1="21" x2="16" y2="21"/>
                        <line x1="12" y1="17" x2="12" y2="21"/>
                      </svg>
                    </div>
                    <span class="demo-skeleton-text">Memuat Demo...</span>
                  </div>
                </div>
              </div>

              <!-- Scroll Hint -->
              <transition name="fade">
                <div class="demo-scroll-hint" v-if="!isDemoScrolled">
                  <Icon
                    icon="solar:mouse-circle-bold-duotone"
                    class="scroll-icon"
                  />
                  <span>Coba Scroll</span>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </section>

      <!-- Wave Divider -->
      <div class="lp-wave-divider lp-wave-alt-to-white" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" />
        </svg>
      </div>

      <!-- Trust Badges Section -->
      <section class="lp-stats" aria-label="Keunggulan">
        <div class="lp-container">
          <div class="lp-stats-inner">
            <div class="lp-stat-item">
              <div class="trust-icon-wrapper">
                <svg class="trust-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"
                  />
                </svg>
              </div>
              <div class="lp-stat-label">100% Aman</div>
              <div class="lp-stat-desc">Data privasi Anda terjamin</div>
            </div>
            <div class="lp-stat-item">
              <div class="trust-icon-wrapper">
                <svg class="trust-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                  />
                </svg>
              </div>
              <div class="lp-stat-label">5 Menit Jadi</div>
              <div class="lp-stat-desc">Praktis tanpa ribet</div>
            </div>
            <div class="lp-stat-item">
              <div class="trust-icon-wrapper">
                <svg class="trust-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
              </div>
              <div class="lp-stat-label">500+ Pengguna</div>
              <div class="lp-stat-desc">Telah dipercaya banyak pasangan</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Live Preview Showcase Section -->
      <section
        id="live-preview"
        class="lp-section"
        aria-label="Live Preview Editor"
      >
        <div class="lp-container lp-showcase-split">
          <div class="lp-showcase-content lp-reveal">
            <p class="lp-section-kicker">Bebas Revisi Sepuasnya</p>
            <h2 class="lp-section-title">
              Lihat Perubahan Real-time. Tanpa Butuh Desainer.
            </h2>
            <p class="lp-section-sub">
              Ganti font, sesuaikan warna, atau ubah lokasi acara dan lihat
              hasilnya detik itu juga. Anda memegang kendali penuh atas tampilan
              undangan dari layar hp Anda.
            </p>
            <ul class="lp-showcase-list">
              <li>
                <Icon
                  icon="solar:check-circle-bold-duotone"
                  class="check-icon"
                />
                Tidak perlu lagi membayar biaya revisi.
              </li>
              <li>
                <Icon
                  icon="solar:check-circle-bold-duotone"
                  class="check-icon"
                />
                Bebas khawatir salah ketik atau info yang kurang akurat.
              </li>
              <li>
                <Icon
                  icon="solar:check-circle-bold-duotone"
                  class="check-icon"
                />
                Mudah digunakan, bahkan jika Anda bukan orang teknis.
              </li>
            </ul>
            <a href="/login" class="lp-btn lp-btn-primary lp-showcase-btn"
              >Coba Live Editor Sekarang</a
            >
          </div>
          <div
            class="lp-showcase-image lp-reveal"
            style="transition-delay: 200ms"
          >
            <div class="lp-mockup-wrapper">
              <img
                src="https://media.mengundanganda.com/landing-page/Screenshot%202026-04-03%20191057.webp"
                alt="Tampilan fitur Live Preview Editor undangan pernikahan digital MengundangAnda"
                class="lp-mockup-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Wave Divider -->
      <div class="lp-wave-divider lp-wave-white-to-alt" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,60 C360,0 1080,100 1440,40 L1440,100 L0,100 Z" />
        </svg>
      </div>

      <!-- Tema Section -->
      <section
        id="tema"
        class="lp-section lp-section-alt"
        aria-label="Koleksi Tema"
      >
        <div class="lp-container">
          <div class="lp-section-header lp-reveal">
            <p class="lp-section-kicker">Koleksi Desain Premium</p>
            <h2 class="lp-section-title">
              Visual Indah yang Mencerminkan Kisah Anda
            </h2>
            <p class="lp-section-sub">
              Setiap desain dirancang khusus oleh desainer profesional untuk
              membuat tamu undangan Anda terkesan dari pandangan pertama.
            </p>
          </div>
          <div class="lp-themes-carousel">
            <div
              class="lp-theme-card lp-reveal"
              v-for="(theme, i) in themesData"
              :key="theme.id"
              :style="{
                '--card-accent': theme.color,
                transitionDelay: `${i * 120}ms`,
              }"
            >
              <div class="lp-theme-preview">
                <div class="lp-theme-device-frame">
                  <div class="lp-theme-device-notch"></div>
                  <div class="lp-theme-device-screen">
                    <!-- Fallback Placeholder -->
                    <div class="lp-theme-placeholder">
                      <Icon
                        :icon="theme.icon"
                        class="lp-placeholder-icon"
                        :style="{ color: theme.color }"
                      />
                      <span class="lp-placeholder-text">{{ theme.name }}</span>
                    </div>
                    <!-- Thumbnail Image -->
                    <img
                      :src="theme.thumbnail"
                      @error="
                        ($event.target as HTMLImageElement).style.opacity = '0'
                      "
                      class="lp-theme-image"
                      :alt="'Preview tema ' + theme.name"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div
                  class="lp-theme-accent-bar"
                  :style="{ background: theme.bgGradient }"
                ></div>
              </div>

              <div class="lp-theme-info">
                <div class="lp-theme-header">
                  <div class="lp-theme-name-row">
                    <Icon
                      :icon="theme.icon"
                      class="lp-theme-name-icon"
                      :style="{ color: theme.color }"
                    />
                    <h3 class="lp-theme-name">{{ theme.name }}</h3>
                  </div>
                </div>
                <div class="lp-theme-actions">
                  <a
                    v-if="theme.sampleUrl"
                    :href="theme.sampleUrl"
                    class="btn btn-outline btn-sm lp-theme-btn"
                  >
                    <span
                      class="material-symbols-rounded"
                      style="font-size: 16px; vertical-align: -3px"
                      >visibility</span
                    >
                    Lihat Contoh
                  </a>
                  <button
                    v-else
                    class="btn btn-outline btn-sm lp-theme-btn"
                    disabled
                    title="Link contoh akan segera tersedia"
                  >
                    <span
                      class="material-symbols-rounded"
                      style="font-size: 16px; vertical-align: -3px"
                      >hourglass_top</span
                    >
                    Segera Hadir
                  </button>

                  <a
                    :href="`/dashboard/create?theme=${theme.id}`"
                    class="btn btn-primary btn-sm lp-theme-btn lp-theme-btn-use"
                  >
                    <span
                      class="material-symbols-rounded"
                      style="font-size: 16px; vertical-align: -3px"
                      >brush</span
                    >
                    Pakai Tema Ini
                  </a>
                </div>
              </div>
            </div>
          </div>
          <!-- CTA: Lihat Semua Tema -->
          <div class="lp-themes-cta lp-reveal" style="transition-delay: 600ms">
            <a href="/themes" class="lp-btn lp-btn-themes-cta">
              <span
                class="material-symbols-rounded"
                style="font-size: 18px; vertical-align: -3px"
                >palette</span
              >
              Lihat Semua Koleksi Tema
              <span
                class="material-symbols-rounded"
                style="font-size: 16px; vertical-align: -3px"
                >arrow_forward</span
              >
            </a>
          </div>
        </div>
      </section>

      <!-- Wave Divider -->
      <div class="lp-wave-divider lp-wave-alt-to-white" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,40 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" />
        </svg>
      </div>

      <!-- Cara Kerja Section -->
      <section id="cara-kerja" class="lp-section" aria-label="Cara Kerja">
        <div class="lp-container">
          <div class="lp-section-header lp-reveal">
            <p class="lp-section-kicker">Hanya Dalam 3 Langkah</p>
            <h2 class="lp-section-title">
              Pelaksanaannya Semudah Mengupdate Medsos
            </h2>
            <p class="lp-section-sub">
              Sama sekali tidak butuh keahlian desain. Siapa pun bisa merancang
              undangan digital eksklusif ini.
            </p>
          </div>
          <div class="lp-steps-grid">
            <div
              class="lp-step lp-reveal"
              v-for="(step, i) in steps"
              :key="step.title"
              :style="{ transitionDelay: `${i * 150}ms` }"
            >
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

      <!-- Pricing Section -->
      <section id="harga" class="lp-section" aria-label="Harga">
        <div class="lp-container">
          <div class="lp-section-header lp-reveal">
            <p class="lp-section-kicker">Investasi Cerdas</p>
            <h2 class="lp-section-title">
              Harga Transparan. Tanpa Biaya Tersembunyi.
            </h2>
            <p class="lp-section-sub">
              Buktikan sendiri secara gratis. Jauh lebih hemat daripada
              pengeluaran untuk ribuan lembar undangan cetak.
            </p>
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
                <li>
                  <Icon
                    icon="solar:check-circle-bold-duotone"
                    class="check-icon"
                  />
                  Masa aktif 1 bulan
                </li>
                <li>
                  <Icon
                    icon="solar:check-circle-bold-duotone"
                    class="check-icon"
                  />
                  Maksimal 25x akses undangan
                </li>
                <li>
                  <Icon
                    icon="solar:check-circle-bold-duotone"
                    class="check-icon"
                  />
                  Bebas edit tanpa batas
                </li>
                <li>
                  <Icon
                    icon="solar:check-circle-bold-duotone"
                    class="check-icon"
                  />
                  Live preview editor
                </li>
                <li>
                  <Icon
                    icon="solar:check-circle-bold-duotone"
                    class="check-icon"
                  />
                  Branding "Powered by MengundangAnda"
                </li>
              </ul>
              <a href="/login" class="lp-btn lp-pricing-btn">Mulai Gratis</a>
            </div>

            <!-- Premium Plan -->
            <div
              class="lp-pricing-card lp-pricing-premium lp-reveal"
              style="transition-delay: 120ms"
            >
              <div class="lp-premium-badge">PALING POPULER</div>
              <div class="lp-pricing-shimmer" aria-hidden="true"></div>
              <div class="lp-pricing-header">
                <h3>Premium</h3>
                <div class="lp-pricing-price">Rp 50.000</div>
                <p>Fitur penuh untuk hari bahagia Anda tanpa batas.</p>
              </div>
              <ul class="lp-pricing-features">
                <li>
                  <Icon
                    icon="solar:star-fall-bold-duotone"
                    class="check-icon accent"
                  />
                  <strong>Masa aktif 1 tahun penuh</strong>
                </li>
                <li>
                  <Icon
                    icon="solar:check-circle-bold-duotone"
                    class="check-icon accent"
                  />
                  Akses undangan unlimited (tanpa batas)
                </li>
                <li>
                  <Icon
                    icon="solar:check-circle-bold-duotone"
                    class="check-icon accent"
                  />
                  Bebas pilih semua koleksi tema premium
                </li>
                <li>
                  <Icon
                    icon="solar:check-circle-bold-duotone"
                    class="check-icon accent"
                  />
                  Fitur Amplop Digital / QRIS
                </li>
                <li>
                  <Icon
                    icon="solar:check-circle-bold-duotone"
                    class="check-icon accent"
                  />
                  Upload musik latar sendiri
                </li>
                <li>
                  <Icon
                    icon="solar:check-circle-bold-duotone"
                    class="check-icon accent"
                  />
                  Tanpa branding platform
                </li>
              </ul>
              <div class="lp-pricing-btn-group">
                <a :href="waLink" target="_blank" class="lp-btn lp-btn-whatsapp lp-pricing-btn"
                  @click="handleWaClick('pricing_premium')"
                  ><Icon icon="mdi:whatsapp" style="font-size: 20px" /> Pesan via WhatsApp</a
                >
                <a href="/login" class="lp-btn lp-btn-secondary lp-pricing-btn-alt"
                  >Atau Login Mandiri</a
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section
        id="faq"
        class="lp-faq"
        aria-label="Pertanyaan yang Sering Diajukan"
      >
        <div class="lp-container">
          <div class="lp-section-header lp-reveal">
            <p class="lp-section-kicker">FAQ</p>
            <h2 class="lp-section-title">Pertanyaan yang Sering Diajukan</h2>
            <p class="lp-section-sub">
              Semua yang perlu Anda ketahui tentang MengundangAnda
            </p>
          </div>
          <div class="lp-faq-grid">
            <div
              v-for="(faq, idx) in faqList"
              :key="idx"
              class="lp-faq-item lp-reveal"
              :style="{ transitionDelay: idx * 60 + 'ms' }"
            >
              <button
                class="lp-faq-question"
                @click="faqOpen === idx ? (faqOpen = -1) : (faqOpen = idx)"
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
            <svg width="60" height="2" viewBox="0 0 60 2">
              <rect width="60" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
            </svg>
            <Icon
              icon="solar:heart-bold"
              style="font-size: 20px; color: rgba(147, 197, 253, 0.6)"
            />
            <svg width="60" height="2" viewBox="0 0 60 2">
              <rect width="60" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
            </svg>
          </div>
          <h2 class="lp-cta-title">
            Siap Memukau Tamu<br /><span>Undangan Anda?</span>
          </h2>
          <p class="lp-cta-sub">
            Bergabung dengan ratusan pasangan yang sudah berhasil menghemat
            jutaan rupiah tanpa mengorbankan estetika.
          </p>
          <div class="lp-cta-actions">
            <a :href="waLink" target="_blank" class="lp-btn lp-btn-whatsapp lp-cta-btn"
              @click="handleWaClick('cta_section')"
              ><Icon icon="mdi:whatsapp" style="font-size: 22px" /> Pesan via WhatsApp</a
            >
            <a href="/login" class="lp-btn lp-btn-outline lp-cta-btn-secondary"
              >Login & Buat Sendiri</a
            >
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="lp-footer">
      <div class="lp-container lp-footer-inner">
        <div class="lp-footer-brand">
          <a href="#" class="lp-logo">
            <img
              src="/images/logo.webp"
              alt="Logo MengundangAnda - Platform Undangan Pernikahan Digital"
              class="lp-logo-img"
            />
            <span>Mengundang<span class="lp-logo-accent">Anda</span></span>
          </a>
          <p>
            Platform undangan pernikahan digital premium. Buat, desain, dan
            bagikan undangan Anda dengan mudah.
          </p>
        </div>
        <div class="lp-footer-links">
          <h4>Navigasi</h4>
          <a href="#fitur">Fitur</a>
          <a href="#tema">Tema</a>
          <a href="#cara-kerja">Cara Kerja</a>

          <a href="#harga">Harga</a>
          <a href="#faq">FAQ</a>
        </div>
        <div class="lp-footer-links">
          <h4>Kontak</h4>
          <a href="mailto:chatkita@mengundanganda.com"
            >chatkita@mengundanganda.com</a
          >
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
        <a
          href="#"
          class="mobile-nav-item"
          :class="{ active: activeSection === 'beranda' }"
          @click="activeSection = 'beranda'"
        >
          <Icon icon="solar:home-smile-bold-duotone" />
          <span>Beranda</span>
        </a>
        <a
          href="#tema"
          class="mobile-nav-item"
          :class="{ active: activeSection === 'tema' }"
          @click="activeSection = 'tema'"
        >
          <Icon icon="solar:gallery-bold-duotone" />
          <span>Tema</span>
        </a>
        <a
          href="#harga"
          class="mobile-nav-item"
          :class="{ active: activeSection === 'harga' }"
          @click="activeSection = 'harga'"
        >
          <Icon icon="solar:tag-price-bold-duotone" />
          <span>Harga</span>
        </a>
        <a :href="waLink" target="_blank" class="mobile-nav-item nav-wa"
          @click="handleWaClick('mobile_nav')"
        >
          <div class="wa-icon-wrapper">
            <Icon icon="mdi:whatsapp" />
          </div>
          <span>WhatsApp</span>
        </a>
      </div>
    </nav>

    <!-- Floating WhatsApp Button (Desktop only) -->
    <a
      :href="waLink"
      target="_blank"
      class="floating-wa-btn"
      aria-label="Chat via WhatsApp"
      @click="handleWaClick('floating_button')"
    >
      <Icon icon="mdi:whatsapp" />
      <span class="floating-wa-label">Chat Kami</span>
    </a>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from "vue";
import { Icon } from "@iconify/vue";
import LandingHeroCinematic from "@/components/landing/LandingHeroCinematic.vue";
import { trackEvent } from "@/composables/useMetaPixel";

const navScrolled = ref(false);
const mobileMenuOpen = ref(false);
const navHiddenMobile = ref(false);
const activeSection = ref("beranda");
const prefersReducedMotion = ref(false);
const faqOpen = ref(-1);
const isDemoScrolled = ref(false);
const isDemoLoaded = ref(false);
const scrollY = ref(0);

const WA_NUMBER = "6285117708091";
const WA_MESSAGE = "Halo, saya tertarik untuk membuat undangan pernikahan digital di MengundangAnda. Bisa bantu saya?";
const waLink = computed(() => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`);

function handleWaClick(source: string) {
  trackEvent('Contact', { content_name: source });
}

function handleMessage(event: MessageEvent) {
  if (event.data?.type === "DEMO_SCROLLED") {
    isDemoScrolled.value = true;
  }
}

const faqList = [
  {
    q: "Apa itu MengundangAnda?",
    a: "MengundangAnda adalah platform pembuatan undangan pernikahan digital premium yang memungkinkan Anda membuat undangan elegan dalam hitungan menit. Pilih dari berbagai tema mewah, lengkapi data acara, dan langsung bagikan ke tamu melalui WhatsApp.",
  },
  {
    q: "Bagaimana cara membuat undangan digital di MengundangAnda?",
    a: "Cukup 3 langkah: (1) Daftar akun gratis, (2) Pilih tema dan isi detail acara pernikahan Anda, (3) Bagikan link undangan ke tamu via WhatsApp. Seluruh proses bisa selesai dalam 5 menit.",
  },
  {
    q: "Apakah bisa membuat undangan pernikahan digital secara gratis?",
    a: "Ya! MengundangAnda menyediakan paket Free yang mencakup semua fitur utama: pilihan tema premium, RSVP, musik latar, countdown, galeri foto, dan live preview. Paket Free aktif selama 1 bulan dengan 25x akses link.",
  },
  {
    q: "Berapa harga paket premium MengundangAnda?",
    a: "Paket Premium hanya Rp 50.000 (sekali bayar) dengan fitur: unlimited akses link, masa aktif 1 tahun, semua tema premium, fitur amplop digital, upload musik sendiri, dan tanpa branding platform. Anda bisa pesan via WhatsApp atau login dan buat sendiri.",
  },
  {
    q: "Fitur apa saja yang tersedia di MengundangAnda?",
    a: "Fitur lengkap meliputi: pilihan tema premium (Floral, Elegant Blue, Floral Blue, Nyunda), RSVP & buku tamu, musik latar otomatis, countdown timer, galeri foto prewedding, love story timeline, amplop digital, peta lokasi Google Maps, dan kirim undangan via WhatsApp.",
  },
];

function isMobile() {
  return window.innerWidth <= 768;
}

function handleScroll() {
  const y = window.scrollY;
  navScrolled.value = y > 40;
  scrollY.value = y;

  // Hero section height (approx viewport height)
  const heroHeight = window.innerHeight;

  if (isMobile()) {
    // Hide navbar after scrolling past hero on mobile
    navHiddenMobile.value = y > heroHeight;
  } else {
    navHiddenMobile.value = false;
  }

  updateActiveSection();
}

function updateActiveSection() {
  const allSections = [
    "fitur",
    "live-preview",
    "tema",
    "cara-kerja",

    "harga",
    "faq",
  ];
  let current = activeSection.value;

  for (const id of allSections) {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      // Section is active if it's in the middle of the viewport
      if (
        rect.top <= window.innerHeight * 0.5 &&
        rect.bottom >= window.innerHeight * 0.3
      ) {
        if (id === "tema") current = "tema";
        else if (id === "harga") current = "harga";
        else current = ""; // Clear active if in a section not in bottom nav
        break;
      }
    }
  }

  // If at the very top, Beranda is active
  if (window.scrollY < window.innerHeight * 0.4) {
    current = "beranda";
  }

  activeSection.value = current;
}

// ---- Scroll-triggered reveal animation ----
let revealObserver: IntersectionObserver | null = null;

function setupRevealObserver() {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("lp-revealed");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  document.querySelectorAll(".lp-reveal").forEach((el) => {
    revealObserver!.observe(el);
  });
}

onMounted(() => {
  // Check for reduced motion preference
  prefersReducedMotion.value = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Dynamic SEO head management
  document.title =
    "MengundangAnda — Buat Undangan Pernikahan Digital Premium | Mengundang Anda";
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute(
      "content",
      "MengundangAnda — Platform undangan pernikahan digital premium. Buat desain mewah gratis dalam 5 menit. RSVP, Musik, Maps, dan kirim via WhatsApp. Mengundang Anda dengan elegan.",
    );
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("message", handleMessage);

  // Setup scroll-triggered reveal animations
  nextTick(() => {
    setupRevealObserver();
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("message", handleMessage);
  revealObserver?.disconnect();
});

const features = [
  {
    icon: "solar:stopwatch-bold-duotone",
    title: "Siap Sebar Dalam 5 Menit",
    desc: "Lupakan proses revisi berhari-hari dengan vendor. Isi form, dan undangan siap di-share.",
  },
  {
    icon: "solar:wallet-money-bold-duotone",
    title: "Hemat Budget Hingga 90%",
    desc: "Coret biaya cetak dari anggaran Anda. Simpan dana untuk kebutuhan lain yang lebih krusial.",
  },
  {
    icon: "solar:smartphone-2-bold-duotone",
    title: "Sebar Cepat via WhatsApp",
    desc: "Sekali klik, jangkau ratusan tamu di mana saja secara instan. Tanpa repot keliling rumah.",
  },
  {
    icon: "solar:map-point-wave-bold-duotone",
    title: "Pengalaman Tamu Terbaik",
    desc: "Manjakan tamu dengan navigasi lokasi presisi tinggi, musik romantis, dan sistem RSVP otomatis.",
  },
  {
    icon: "solar:pallete-2-bold-duotone",
    title: "Standar Visual Profesional",
    desc: "Setiap elemen didesain oleh ahlinya. Undangan terlihat mahal tanpa harus membayar mahal.",
  },
  {
    icon: "solar:shield-check-bold-duotone",
    title: "Kendali Penuh di Tangan Anda",
    desc: "Ada perubahan mendadak? Tenang, Anda bisa update lokasi atau tanggal kapan pun tanpa batas.",
  },
];

const steps = [
  {
    title: "Pilih Desain",
    desc: "Temukan tema visual yang paling serasi dengan konsep dan nuansa pernikahan Anda.",
    icon: "solar:pallete-2-bold-duotone",
  },
  {
    title: "Lengkapi Cerita",
    desc: "Masukkan detail acara, cerita cinta, galeri foto, dan peta lokasi ke dalam form yang simpel.",
    icon: "solar:pen-new-square-bold-duotone",
  },
  {
    title: "Langsung Sebarkan",
    desc: "Salin link undangan unik Anda dan sebarkan ke kerabat serta sahabat dalam satu ketukan.",
    icon: "solar:share-bold-duotone",
  },
];



const themesData = [
  {
    id: "floral",
    name: "Floral",
    thumbnail:
      "https://media.mengundanganda.com/floral/cover%20section/randidewi_36200883-6cde-4c79-823f-fc9b867e9443.webp",
    description:
      "Desain romantis dengan ornamen daun dan bunga, warna pastel lembut. Sempurna untuk nuansa garden party yang penuh keindahan alam.",
    color: "#4a5d4e",
    bgColor: "#4a5d4e",
    bgGradient: "linear-gradient(135deg, #4a5d4e, #8a9a5b)",
    sampleUrl: "/sample/floral",
    icon: "solar:leaf-bold-duotone",
  },
  {
    id: "elegant_blue",
    name: "Elegant Blue",
    thumbnail:
      "https://media.mengundanganda.com/elegant_blue/cover%20section/randidewi_90622980-439b-4c34-b5d2-50a6bad28ea8.webp",
    description:
      "Desain elegan dengan nuansa biru dusty yang menenangkan dipadukan dengan aksen champagne gold. Sempurna untuk nuansa mewah modern.",
    color: "#A3B5C3",
    bgColor: "#1e3a8a",
    bgGradient: "linear-gradient(135deg, #1e3a8a, #A3B5C3)",
    sampleUrl: "/sample/elegant_blue",
    icon: "solar:stars-bold-duotone",
  },
  {
    id: "nyunda",
    name: "Nyunda",
    thumbnail:
      "https://media.mengundanganda.com/floral/43498db7-3a42-4aaa-a066-a0322604ac92.webp",
    description:
      "Desain hangat dan anggun dengan nuansa budaya Sunda yang khas. Sempurna untuk pernikahan tradisional Jawa Barat yang penuh makna.",
    color: "#5C3D2E",
    bgColor: "#FFF8E7",
    bgGradient: "linear-gradient(135deg, #5C3D2E, #A67B5B)",
    sampleUrl: "/sample/nyunda",
    icon: "solar:sun-bold-duotone",
  },
  {
    id: "floral_blue",
    name: "Floral Blue",
    thumbnail:
      "https://media.mengundanganda.com/floral-blue/cover%20section/randidewi_b27abb2d-504d-42d4-91e2-a055512ade57.webp",
    description:
      "Perpaduan ornamen floral dengan palet biru yang segar dan elegan. Cocok untuk pasangan yang menginginkan nuansa romantis dengan sentuhan modern.",
    color: "#3b6b8a",
    bgColor: "#3b6b8a",
    bgGradient: "linear-gradient(135deg, #3b6b8a, #b8d4e3)",
    sampleUrl: "/sample/floral_blue",
    icon: "solar:leaf-bold-duotone",
  },
];
</script>

<style scoped>
/* ========================================
   Landing Page — Blue & White Premium Theme
   UI/UX Upgraded Edition
   ======================================== */

@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Poppins:wght@300;400;500;600;700&family=Dancing+Script:wght@400;500;600;700&display=swap");

/* --- Theme Variables --- */
.landing {
  --lp-primary: #1e3a5f;
  --lp-primary-deep: #0f2440;
  --lp-accent: #93c5fd;
  --lp-accent-hover: #3b82f6;
  --lp-accent-light: rgba(59, 130, 246, 0.1);
  --lp-accent-glow: rgba(59, 130, 246, 0.25);
  --lp-bg: #ffffff;
  --lp-bg-alt: #f0f5ff;
  --lp-text: #1e293b;
  --lp-text-light: #64748b;
  --lp-border: rgba(59, 130, 246, 0.12);
  --lp-navy: #0f172a;
  --lp-navy-mid: #1e3a5f;
  --lp-gold: #c9a96e;

  --lp-font-sans: "Poppins", -apple-system, BlinkMacSystemFont, sans-serif;
  --lp-font-serif: "Cormorant Garamond", Georgia, serif;
  --lp-font-script: "Dancing Script", cursive;
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

#fitur {
  z-index: 10; /* Ensures the mockup phone shadow is rendered above the subsequent wave divider */
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
  transition:
    opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
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
  background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%);
  color: #fff;
  border: none;
  box-shadow:
    0 4px 0 #1d4ed8,
    0 8px 24px rgba(59, 130, 246, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.lp-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow:
    0 6px 0 #1d4ed8,
    0 12px 32px rgba(59, 130, 246, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}
.lp-btn-primary:active {
  transform: translateY(2px);
  box-shadow:
    0 2px 0 #1d4ed8,
    0 4px 12px rgba(59, 130, 246, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
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
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}
.lp-btn-white:hover {
  background: var(--lp-bg-alt);
  transform: translateY(-3px);
  box-shadow: 0 8px 36px rgba(0, 0, 0, 0.2);
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
  background: rgba(255, 255, 255, 0.75); /* Semi-transparent white */
  backdrop-filter: blur(16px);
  border: 1px solid rgba(30, 58, 95, 0.08); /* Soft dark border */
  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.04);
  transition: var(--lp-transition);
}

.lp-nav.scrolled {
  top: 12px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 32px rgba(15, 23, 42, 0.1);
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
  color: var(--lp-primary); /* Dark Navy Logo */
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
  color: var(--lp-accent-hover); /* Vibrant Blue Accent */
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
  color: var(--lp-text-light); /* Dark slate gray text */
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
  color: var(--lp-accent-hover);
  background: var(--lp-accent-light);
}

.lp-nav.scrolled .lp-nav-links a:hover {
  color: var(--lp-accent-hover);
  background: var(--lp-accent-light);
}

.lp-nav-cta {
  background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%) !important;
  color: #fff !important;
  border: none !important;
  box-shadow:
    0 3px 0 #1d4ed8,
    0 6px 16px rgba(59, 130, 246, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4) !important;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1) !important;
  padding: 8px 24px !important;
}
.lp-nav-cta:hover {
  background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%) !important;
  transform: translateY(-2px) !important;
  box-shadow:
    0 5px 0 #1d4ed8,
    0 10px 20px rgba(59, 130, 246, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.5) !important;
}
.lp-nav-cta:active {
  transform: translateY(1px) !important;
  box-shadow:
    0 2px 0 #1d4ed8,
    0 4px 8px rgba(59, 130, 246, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
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
  background: var(--lp-primary); /* Dark Navy Hamburger */
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
.lp-nav-toggle span {
  top: 15px;
}
.lp-nav-toggle span::before {
  content: "";
  top: -7px;
}
.lp-nav-toggle span::after {
  content: "";
  top: 7px;
}
.lp-nav-toggle span.open {
  background: transparent !important;
}
.lp-nav-toggle span.open::before {
  transform: rotate(45deg);
  top: 0;
}
.lp-nav-toggle span.open::after {
  transform: rotate(-45deg);
  top: 0;
}

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
  background-image: url("/images/hero.webp");
  background-size: cover;
  background-position: center 30%;
  background-repeat: no-repeat;
  z-index: 0;
}

.lp-hero-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse at 20% 50%,
      rgba(59, 130, 246, 0.15) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse at 80% 20%,
      rgba(147, 197, 253, 0.12) 0%,
      transparent 50%
    ),
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
  width: 300px;
  height: 300px;
  background: rgba(59, 130, 246, 0.4);
  top: 10%;
  left: -5%;
  animation: orbFloat1 12s ease-in-out infinite;
}
.lp-orb-2 {
  width: 200px;
  height: 200px;
  background: rgba(147, 197, 253, 0.35);
  top: 60%;
  right: -3%;
  animation: orbFloat2 15s ease-in-out infinite;
}
.lp-orb-3 {
  width: 150px;
  height: 150px;
  background: rgba(96, 165, 250, 0.3);
  bottom: 15%;
  left: 30%;
  animation: orbFloat3 10s ease-in-out infinite;
}
.lp-orb-4 {
  width: 100px;
  height: 100px;
  background: rgba(191, 219, 254, 0.4);
  top: 25%;
  right: 20%;
  animation: orbFloat1 18s ease-in-out infinite reverse;
}

.lp-orb-cta-1 {
  width: 250px;
  height: 250px;
  background: rgba(59, 130, 246, 0.3);
  top: -10%;
  right: -5%;
  animation: orbFloat2 14s ease-in-out infinite;
}
.lp-orb-cta-2 {
  width: 180px;
  height: 180px;
  background: rgba(147, 197, 253, 0.25);
  bottom: -5%;
  left: 10%;
  animation: orbFloat3 11s ease-in-out infinite;
}

@keyframes orbFloat1 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -40px) scale(1.05);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.95);
  }
}
@keyframes orbFloat2 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(-40px, 30px) scale(1.08);
  }
  66% {
    transform: translate(25px, -25px) scale(0.92);
  }
}
@keyframes orbFloat3 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(35px, -30px) scale(1.1);
  }
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
  text-shadow:
    0 2px 12px rgba(0, 0, 0, 0.5),
    0 1px 3px rgba(0, 0, 0, 0.4);
}

.lp-hero-title {
  font-family: var(--lp-font-serif);
  font-size: clamp(34px, 6vw, 60px);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.15;
  margin-bottom: 24px;
  text-shadow:
    0 3px 16px rgba(255, 255, 255, 0.6),
    0 1px rgba(255, 255, 255, 0.615);
}

.lp-hero-script {
  font-family: var(--lp-font-script);
  font-weight: 400;
  color: #93c5fd;
  font-size: clamp(38px, 7vw, 68px);
  text-shadow:
    0 3px 20px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(59, 130, 246, 0.4);
}

.lp-hero-sub {
  font-size: 17px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.95);
  max-width: 560px;
  margin: 0 auto 40px;
  text-shadow:
    0 2px 10px rgba(0, 0, 0, 0.5),
    0 1px 3px rgba(0, 0, 0, 0.4);
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
.lp-delay-1 {
  animation-delay: 0.15s;
}
.lp-delay-2 {
  animation-delay: 0.3s;
}
.lp-delay-3 {
  animation-delay: 0.45s;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* --- Dedicated Trust Badges Section --- */
.lp-stats {
  background: var(--lp-bg);
  padding: 40px 0;
  position: relative;
  z-index: 5;
}

.lp-stats-inner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid rgba(59, 130, 246, 0.08);
  border-radius: 24px;
  padding: 24px;
  box-shadow:
    0 20px 40px -15px rgba(0, 0, 0, 0.05),
    0 10px 20px -10px rgba(59, 130, 246, 0.03);
}

.lp-stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 16px 12px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px;
  background: transparent;
}

.lp-stat-item:hover {
  transform: translateY(-8px);
  background: #ffffff;
  box-shadow:
    0 16px 32px -12px rgba(59, 130, 246, 0.1),
    0 4px 12px -4px rgba(0, 0, 0, 0.05);
  border-color: rgba(59, 130, 246, 0.1);
}

.lp-stat-item:not(:last-child)::after {
  display: none;
}

/* Premium Icon Wrapper */
.trust-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.08) 0%,
    rgba(59, 130, 246, 0.02) 100%
  );
  border: 1px solid rgba(59, 130, 246, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: var(--lp-accent-hover);
  box-shadow:
    0 8px 16px -4px rgba(59, 130, 246, 0.08),
    inset 0 2px 4px rgba(255, 255, 255, 0.8);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.lp-stat-item:hover .trust-icon-wrapper {
  transform: translateY(-4px) scale(1.1) rotate(5deg);
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.15) 0%,
    rgba(59, 130, 246, 0.05) 100%
  );
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 12px 24px -6px rgba(59, 130, 246, 0.15);
}

.trust-icon {
  width: 20px;
  height: 20px;
  color: var(--lp-accent-hover);
  display: block;
}

.lp-stat-label {
  font-family: var(--lp-font-sans);
  font-size: 15px;
  font-weight: 700;
  color: var(--lp-primary);
  letter-spacing: 0.3px;
  margin: 0 0 4px 0;
  transition: color 0.3s ease;
}

.lp-stat-desc {
  font-size: 13px;
  color: var(--lp-text-light);
  line-height: 1.5;
  margin: 0;
}

.lp-stat-item:hover .lp-stat-label {
  color: var(--lp-accent-hover);
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

/* --- Smartphone Frame Mockup --- */
.smartphone-frame-wrapper {
  position: relative;
  width: 100%;
  max-width: 440px; /* 300px phone + 140px padding to accommodate 3D rotated shadow */
  margin: -20px auto -60px auto; /* Negative margin offsets padding to preserve layout spacing */
  padding: 20px 70px 110px 70px; /* Generous padding to prevent shadow clipping */
  perspective: 1000px;
  display: flex;
  justify-content: center;
}

.smartphone-frame {
  position: relative;
  width: 100%;
  max-width: 300px; /* Keep phone screen size exactly 300px wide */
  aspect-ratio: 9 / 19.5;
  background: #000;
  border-radius: 40px;
  border: 10px solid #1a1a1a;
  box-shadow:
    -20px 30px 60px -10px rgba(0, 0, 0, 0.6),
    inset 0 0 0 1px rgba(255, 255, 255, 0.15);
  /* Removed overflow: hidden to prevent browser 3D graphics layers from clipping box-shadow */
  z-index: 2;
  transform: rotateY(-8deg) rotateX(3deg) translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  will-change: transform;
  transition:
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.5s ease;
}

.smartphone-frame:hover {
  transform: rotateY(0deg) rotateX(0deg) translateZ(0);
  box-shadow:
    0 40px 80px -15px rgba(0, 0, 0, 0.5),
    inset 0 0 0 1px rgba(255, 255, 255, 0.15);
}

.smartphone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 110px;
  height: 24px;
  background: #1a1a1a;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  z-index: 10;
}

.smartphone-notch::after {
  content: "";
  position: absolute;
  top: 6px;
  right: 25px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.smartphone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 28px;
  overflow: hidden;
  /* Add masking to make sure iframe scrollbar respects border-radius */
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

/*
 * CSS iframe scaling for desktop:
 * Render at 390px (real mobile viewport width) then scale to fit
 * the ~280px screen area (300px frame - 10px border × 2).
 * Scale adjusted slightly from 0.718 to 0.725 to ensure no gaps or subpixel white lines.
 */
.theme-demo-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 390px;
  height: calc(100% / 0.725);
  transform: scale(0.725) translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  will-change: transform;
  transform-origin: top left;
  pointer-events: auto;
  /* Hide scrollbar in iframe if possible via CSS */
  scrollbar-width: none;
}
.theme-demo-iframe::-webkit-scrollbar {
  display: none;
}

/* --- Demo Skeleton Placeholder --- */
.demo-skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, #f0f4f8 0%, #e8eef5 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  overflow: hidden;
}

.demo-skeleton-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.5) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: skeletonShimmer 2s ease-in-out infinite;
}

@keyframes skeletonShimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.demo-skeleton-icon {
  position: relative;
  z-index: 1;
  width: 40px;
  height: 40px;
  color: #94a3b8;
  animation: skeletonPulse 2s ease-in-out infinite;
}

.demo-skeleton-icon svg {
  width: 100%;
  height: 100%;
}

.demo-skeleton-text {
  position: relative;
  z-index: 1;
  font-family: var(--lp-font-sans, sans-serif);
  font-size: 13px;
  font-weight: 500;
  color: #94a3b8;
  letter-spacing: 0.3px;
}

@keyframes skeletonPulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

.demo-scroll-hint {
  position: absolute;
  bottom: 130px; /* Offset the 110px bottom padding to keep it 20px from phone bottom */
  right: 40px; /* Offset the 70px right padding to keep it 30px to the right of the phone */
  background: white;
  color: var(--lp-primary);
  font-family: var(--lp-font-sans);
  font-size: 13px;
  font-weight: 700;
  padding: 10px 16px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.1);
  z-index: 20;
  animation: floatHint 3s ease-in-out infinite;
  pointer-events: none;
}

.scroll-icon {
  font-size: 20px;
  color: var(--lp-accent-hover);
  animation: scrollIconAnim 2s infinite;
}

@keyframes floatHint {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes scrollIconAnim {
  0% {
    transform: translateY(-2px);
  }
  50% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(-2px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
  margin: 24px 0 32px 0;
  display: inline-flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
}

.lp-showcase-list li {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  font-size: 16px;
  color: var(--lp-text);
  line-height: 1.6;
}

.lp-showcase-list .check-icon {
  font-size: 24px;
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
  transition:
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.5s ease;
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
  box-shadow:
    0 20px 60px rgba(59, 130, 246, 0.15),
    0 0 0 1px var(--lp-accent);
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
  box-shadow:
    0 -2px 16px rgba(0, 0, 0, 0.1),
    inset 0 0 0 2px rgba(255, 255, 255, 0.06);
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
  background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%) !important;
  color: #fff !important;
  border: none !important;
  box-shadow: 
    0 3px 0 #1d4ed8,
    0 6px 12px rgba(59, 130, 246, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.4) !important;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1) !important;
  transform: translateY(0);
}

.lp-theme-btn-use:hover {
  background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%) !important;
  transform: translateY(-2px) !important;
  box-shadow: 
    0 5px 0 #1d4ed8,
    0 8px 16px rgba(59, 130, 246, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.5) !important;
}

.lp-theme-btn-use:active {
  transform: translateY(1px) !important;
  box-shadow: 
    0 2px 0 #1d4ed8,
    0 3px 6px rgba(59, 130, 246, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
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
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.lp-btn-themes-cta:hover {
  background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%);
  color: #fff;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow:
    0 6px 0 #1d4ed8,
    0 12px 28px rgba(59, 130, 246, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.lp-btn-themes-cta:active {
  transform: translateY(2px);
  box-shadow:
    0 2px 0 #1d4ed8,
    0 4px 10px rgba(59, 130, 246, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* --- Steps Timeline --- */
.lp-steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  position: relative;
}
.lp-steps-grid::before {
  content: "";
  position: absolute;
  top: 24px;
  left: 16%;
  right: 16%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(59, 130, 246, 0.3),
    rgba(59, 130, 246, 0.3),
    transparent
  );
  z-index: 0;
}

.lp-step {
  text-align: center;
  position: relative;
  z-index: 1;
}
.lp-step:not(:last-child)::after {
  content: "";
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
  box-shadow:
    0 4px 14px rgba(59, 130, 246, 0.3),
    0 0 0 8px var(--lp-bg);
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
  transition:
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    background 0.4s ease;
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


/* --- Pricing --- */
.lp-pricing-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
  max-width: 800px;
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
  0%,
  100% {
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
  }
  50% {
    box-shadow:
      0 4px 24px rgba(59, 130, 246, 0.6),
      0 0 0 4px rgba(59, 130, 246, 0.1);
  }
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
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(59, 130, 246, 0.05),
    transparent
  );
  animation: shimmer 4s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
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


/* --- WhatsApp Button --- */
.lp-btn-whatsapp {
  background: linear-gradient(180deg, #25d366 0%, #128c7e 100%);
  color: #fff;
  border: none;
  gap: 10px;
  box-shadow:
    0 4px 0 #075e54,
    0 8px 24px rgba(37, 211, 102, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.lp-btn-whatsapp:hover {
  transform: translateY(-2px);
  box-shadow:
    0 6px 0 #075e54,
    0 12px 32px rgba(37, 211, 102, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}
.lp-btn-whatsapp:active {
  transform: translateY(2px);
  box-shadow:
    0 2px 0 #075e54,
    0 4px 12px rgba(37, 211, 102, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* --- Pricing Button Group --- */
.lp-pricing-btn-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  z-index: 2;
}
.lp-pricing-btn-alt {
  width: 100%;
  text-align: center;
  font-size: 13px;
  padding: 10px 20px;
}
.lp-btn-secondary {
  background: transparent;
  color: var(--lp-text-light);
  border: 1.5px solid var(--lp-border);
  font-size: 13px;
  padding: 10px 24px;
}
.lp-btn-secondary:hover {
  background: var(--lp-accent-light);
  border-color: var(--lp-accent-hover);
  color: var(--lp-accent-hover);
  transform: translateY(-1px);
}

/* --- CTA Actions --- */
.lp-cta-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}
.lp-cta-btn-secondary {
  font-size: 15px;
  padding: 14px 32px;
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
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at 30% 50%,
    rgba(59, 130, 246, 0.15) 0%,
    transparent 50%
  );
}

@keyframes ctaGradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
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
  color: rgba(255, 255, 255, 0.75);
  max-width: 500px;
  margin: 0 auto 40px;
  line-height: 1.7;
}

.lp-cta-btn {
  position: relative;
  animation: ctaBtnGlow 3s ease-in-out infinite;
}

@keyframes ctaBtnGlow {
  0%,
  100% {
    box-shadow: 0 4px 24px rgba(255, 255, 255, 0.15);
  }
  50% {
    box-shadow:
      0 4px 36px rgba(255, 255, 255, 0.3),
      0 0 0 4px rgba(255, 255, 255, 0.05);
  }
}

/* --- Footer --- */
.lp-footer {
  background: var(--lp-navy);
  color: rgba(255, 255, 255, 0.7);
  padding-top: 60px;
}

.lp-footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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
  color: rgba(255, 255, 255, 0.5);
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
  color: rgba(255, 255, 255, 0.35);
  margin: 0;
}
.lp-footer-bottom-links {
  display: flex;
  align-items: center;
  gap: 8px;
}
.lp-footer-bottom-links a {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.35);
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;
}
.lp-footer-bottom-links a:hover {
  color: #60a5fa;
}
.lp-footer-dot {
  color: rgba(255, 255, 255, 0.2);
  font-size: 14px;
}

/* --- Floating WhatsApp Button (Desktop) --- */
.floating-wa-btn {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 99;
  display: inline-flex;
  align-items: center;
  gap: 0;
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: #fff;
  text-decoration: none;
  font-family: var(--lp-font-sans);
  font-size: 14px;
  font-weight: 600;
  padding: 14px;
  border-radius: 50px;
  box-shadow:
    0 6px 20px rgba(37, 211, 102, 0.4),
    0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  cursor: pointer;
}
.floating-wa-btn svg {
  font-size: 26px;
  flex-shrink: 0;
}
.floating-wa-label {
  max-width: 0;
  opacity: 0;
  white-space: nowrap;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.floating-wa-btn:hover {
  padding: 14px 22px 14px 16px;
  gap: 10px;
  transform: translateY(-3px);
  box-shadow:
    0 10px 28px rgba(37, 211, 102, 0.5),
    0 4px 10px rgba(0, 0, 0, 0.1);
}
.floating-wa-btn:hover .floating-wa-label {
  max-width: 120px;
  opacity: 1;
}
.floating-wa-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .floating-wa-btn {
    display: none;
  }
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
  .lp-showcase-split {
    flex-direction: column;
    text-align: center;
    gap: 48px;
  }
  .lp-showcase-content {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .lp-showcase-list {
    align-items: flex-start;
    margin-left: auto;
    margin-right: auto;
  }
  .lp-showcase-list li {
    text-align: left;
    justify-content: flex-start;
  }

  .lp-features-list {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto;
    gap: 20px;
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
    transform: translateY(-120%) !important;
    opacity: 0;
    pointer-events: none;
  }

  .lp-nav-toggle {
    display: block;
  }

  .lp-nav-links {
    position: absolute;
    top: calc(100% + 12px);
    left: 0;
    width: 100%;
    height: auto;
    background: rgba(255, 255, 255, 0.9);
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

  .lp-section {
    padding: 72px 0;
  }

  .lp-features-list {
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

  /* ===== Smartphone Frame Demo - Mobile ===== */
  .smartphone-frame-wrapper {
    max-width: 240px;
    padding: 0 0 50px 0;
    margin: 0 auto;
    perspective: none;
  }

  .smartphone-frame {
    max-width: 100%;
    border-width: 7px;
    border-radius: 32px;
    transform: none;
    box-shadow:
      0 16px 40px rgba(0, 0, 0, 0.2),
      inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  .smartphone-frame:hover {
    transform: none;
    box-shadow:
      0 16px 40px rgba(0, 0, 0, 0.2),
      inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  .smartphone-notch {
    width: 70px;
    height: 16px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .smartphone-notch::after {
    top: 4px;
    right: 14px;
    width: 8px;
    height: 8px;
  }

  .smartphone-screen {
    border-radius: 24px;
  }

  /*
   * CSS iframe scaling: render at 390px (real mobile viewport width)
   * then scale down to fit the ~226px screen area.
   * Scale adjusted from 0.58 to 0.59 to prevent subpixel white gaps on the sides.
   */
  .theme-demo-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 390px;
    height: calc(100% / 0.59);
    transform: scale(0.59);
    transform-origin: top left;
  }

  .demo-scroll-hint {
    bottom: 8px;
    right: 0;
    left: 0;
    width: fit-content;
    margin: 0 auto;
    font-size: 12px;
    padding: 7px 12px;
    gap: 6px;
  }

  .scroll-icon {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .lp-stats {
    padding: 40px 0;
  }
  .lp-features-grid {
    grid-template-columns: 1fr;
  }
  .lp-stats-inner {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .lp-stat-item:not(:last-child)::after {
    left: 25%;
    right: 25%;
    top: auto;
    bottom: -8px;
    width: 50%;
    height: 1px;
    background: rgba(30, 58, 95, 0.06);
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
  transition:
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}
.lp-faq-item:hover {
  border-color: #93c5fd;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.08);
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
  transition:
    transform 0.35s ease,
    background 0.3s,
    color 0.3s;
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
  from {
    opacity: 0;
    max-height: 0;
    padding-bottom: 0;
  }
  to {
    opacity: 1;
    max-height: 300px;
    padding-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .lp-stats-inner {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 24px;
  }

  .lp-faq {
    padding: 64px 0;
  }
  .lp-faq-question {
    padding: 16px 18px;
    font-size: 14.5px;
  }
  .lp-faq-answer {
    padding: 0 18px 16px;
  }
  .lp-faq-answer p {
    font-size: 13.5px;
  }
}

/* ===== Mobile Bottom Navigation ===== */
.mobile-bottom-nav {
  display: none;
}

@media (max-width: 768px) {
  /* Floating pill mobile navbar */
  .lp-nav {
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 32px);
    border-radius: 100px;
    border: 1px solid rgba(30, 58, 95, 0.08);
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 12px 20px;
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
  }

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

  .mobile-nav-item.nav-wa .wa-icon-wrapper {
    background: linear-gradient(135deg, #25d366, #128c7e);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -20px;
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
    border: 3px solid #f8fafc;
    transition: transform 0.2s ease;
  }

  .mobile-nav-item.nav-wa:hover .wa-icon-wrapper {
    transform: scale(1.05);
  }

  .mobile-nav-item.nav-wa svg {
    font-size: 20px;
  }

  .landing main {
    padding-bottom: 80px;
  }
}
</style>
