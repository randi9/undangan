<template>
  <div class="pt-page">
    <!-- Header -->
    <header class="pt-header">
      <div class="pt-header-inner">
        <a href="/" class="pt-logo">
          <img src="/images/logo.webp" alt="Logo MengundangAnda" class="pt-logo-img">
          <span>Mengundang<span class="pt-logo-accent">Anda</span></span>
        </a>
        <a href="/" class="pt-back-btn">
          <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">arrow_back</span>
          Kembali
        </a>
      </div>
    </header>

    <main class="pt-main">
      <!-- Page Title -->
      <div class="pt-hero">
        <p class="pt-kicker">Koleksi Desain Premium</p>
        <h1 class="pt-title">Temukan Tema Undangan Impian Anda</h1>
        <p class="pt-subtitle">Jelajahi seluruh koleksi tema undangan digital kami. Setiap desain dirancang dengan penuh perhatian untuk hari istimewa Anda.</p>
      </div>

      <!-- Filter Toolbar -->
      <div class="pt-filter-toolbar">
        <div class="pt-filter-search-wrap">
          <Icon icon="lucide:search" class="pt-filter-search-icon" />
          <input
            v-model="searchQuery"
            type="text"
            class="pt-filter-search"
            placeholder="Cari tema..."
          />
        </div>
        <div class="pt-filter-row">
          <div class="pt-filter-categories">
            <button
              v-for="cat in categories"
              :key="cat"
              class="pt-filter-chip"
              :class="{ active: activeCategory === cat }"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>
        <div class="pt-filter-meta">
          Menampilkan {{ displayedThemes.length }} dari {{ filteredThemes.length }} tema
        </div>
      </div>

      <!-- Theme Grid -->
      <div v-if="filteredThemes.length === 0" class="pt-empty-state">
        <Icon icon="lucide:file-search" style="font-size:36px;color:#94a3b8" />
        <p>Tidak ada tema yang cocok dengan pencarian Anda.</p>
      </div>
      <div v-else class="pt-grid">
        <div
          v-for="theme in displayedThemes"
          :key="theme.id"
          class="pt-card"
          :style="{ '--card-accent': theme.color }"
        >
          <!-- Mini Phone Preview -->
          <div class="pt-phone-mini">
            <div class="pt-phone-notch"></div>
            <div class="pt-phone-screen">
              <div class="pt-phone-fallback">
                <Icon :icon="theme.icon" class="pt-placeholder-icon" :style="{ color: theme.color }" />
                <span class="pt-placeholder-text">{{ theme.name }}</span>
              </div>
              <img
                :src="theme.thumbnail"
                @error="($event.target as HTMLImageElement).style.opacity = '0'"
                class="pt-phone-image"
                :alt="'Preview tema ' + theme.name"
                loading="lazy"
              />
            </div>
          </div>

          <div class="pt-card-info">
            <div class="pt-card-header">
              <div class="pt-name-row">
                <Icon :icon="theme.icon" class="pt-name-icon" :style="{ color: theme.color }" />
                <h3 class="pt-card-name">{{ theme.name }}</h3>
              </div>
              <p class="pt-card-desc">{{ theme.description }}</p>
            </div>
            <div class="pt-card-actions">
              <a
                v-if="theme.sampleUrl"
                :href="theme.sampleUrl"
                class="pt-btn pt-btn-outline"
              >
                <span class="material-symbols-rounded" style="font-size:15px;vertical-align:-3px">visibility</span>
                Lihat Contoh
              </a>
              <button
                v-else
                class="pt-btn pt-btn-outline"
                disabled
                title="Link contoh akan segera tersedia"
              >
                <span class="material-symbols-rounded" style="font-size:15px;vertical-align:-3px">hourglass_top</span>
                Segera
              </button>

              <a
                :href="`/login`"
                class="pt-btn pt-btn-primary"
              >
                <span class="material-symbols-rounded" style="font-size:15px;vertical-align:-3px">brush</span>
                Pakai Tema Ini
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div v-if="hasMoreThemes" class="pt-load-more-wrap">
        <button type="button" class="pt-btn pt-btn-load-more" @click="loadMore">
          <Icon icon="lucide:chevrons-down" style="font-size:18px" />
          Tampilkan Lebih Banyak
        </button>
      </div>
    </main>

    <!-- Simple Footer -->
    <footer class="pt-footer">
      <p>&copy; 2026 MengundangAnda. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import { THEME_LIST } from "@/config/themes";
import type { ThemeRegistryEntry } from "@/config/themes";

const allThemes = THEME_LIST;

type ThemeCategory = 'Semua' | 'Elegant' | 'Floral' | 'Minimalist' | 'Blue';
const categories: ThemeCategory[] = ['Semua', 'Elegant', 'Floral', 'Minimalist', 'Blue'];
const activeCategory = ref<ThemeCategory>('Semua');
const searchQuery = ref('');
const pageSize = 6;
const visibleCount = ref(pageSize);

function getThemeCategory(theme: ThemeRegistryEntry): Exclude<ThemeCategory, 'Semua'>[] {
  const tags: Exclude<ThemeCategory, 'Semua'>[] = [];
  const id = theme.id.toLowerCase();
  const name = theme.name.toLowerCase();
  if (id.includes('elegant') || name.includes('elegant')) tags.push('Elegant');
  if (id.includes('floral') || name.includes('floral')) tags.push('Floral');
  if (id.includes('minimalist') || name.includes('minimalist')) tags.push('Minimalist');
  if (id.includes('blue') || name.includes('blue')) tags.push('Blue');
  return tags;
}

const filteredThemes = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  return allThemes.filter((theme) => {
    const cats = getThemeCategory(theme);
    const matchCat = activeCategory.value === 'Semua' || cats.includes(activeCategory.value);
    const matchSearch = q.length === 0
      || theme.name.toLowerCase().includes(q)
      || theme.id.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
});

const displayedThemes = computed(() => filteredThemes.value.slice(0, visibleCount.value));
const hasMoreThemes = computed(() => displayedThemes.value.length < filteredThemes.value.length);

function loadMore() {
  visibleCount.value += pageSize;
}

watch([searchQuery, activeCategory], () => {
  visibleCount.value = pageSize;
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');

.pt-page {
  --pt-primary: #1e3a5f;
  --pt-primary-deep: #0f2440;
  --pt-accent: #2563eb;
  --pt-accent-light: rgba(59, 130, 246, 0.10);
  --pt-accent-glow: rgba(59, 130, 246, 0.25);
  --pt-bg: #f8faff;
  --pt-bg-alt: #f0f5ff;
  --pt-text: #1e293b;
  --pt-text-light: #64748b;
  --pt-border: rgba(59, 130, 246, 0.12);
  --pt-surface: #ffffff;
  --pt-font-sans: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  --pt-font-serif: 'Cormorant Garamond', Georgia, serif;

  min-height: 100vh;
  background: var(--pt-bg);
  font-family: var(--pt-font-sans);
  color: var(--pt-text);
  display: flex;
  flex-direction: column;
}

/* ===== Header ===== */
.pt-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--pt-border);
}

.pt-header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pt-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-family: var(--pt-font-serif);
  font-size: 20px;
  font-weight: 700;
  color: var(--pt-primary);
}

.pt-logo-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.pt-logo-accent {
  color: var(--pt-accent);
}

.pt-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: var(--pt-primary);
  text-decoration: none;
  background: var(--pt-accent-light);
  border: 1px solid var(--pt-border);
  transition: all 0.25s ease;
}

.pt-back-btn:hover {
  background: var(--pt-accent);
  color: #fff;
  border-color: var(--pt-accent);
  transform: translateX(-2px);
}

/* ===== Main ===== */
.pt-main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 60px;
  width: 100%;
  box-sizing: border-box;
}

/* ===== Hero Title ===== */
.pt-hero {
  text-align: center;
  margin-bottom: 40px;
}

.pt-kicker {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--pt-accent);
  margin-bottom: 12px;
}

.pt-title {
  font-family: var(--pt-font-serif);
  font-size: clamp(26px, 4vw, 38px);
  font-weight: 700;
  color: var(--pt-primary);
  margin: 0 0 12px;
  line-height: 1.2;
}

.pt-subtitle {
  font-size: 15px;
  color: var(--pt-text-light);
  line-height: 1.7;
  max-width: 560px;
  margin: 0 auto;
}

/* ===== Filter Toolbar ===== */
.pt-filter-toolbar {
  margin-bottom: 28px;
  padding: 16px 20px;
  background: var(--pt-surface);
  border: 1px solid var(--pt-border);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.04);
}

.pt-filter-search-wrap {
  position: relative;
}

.pt-filter-search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 16px;
  pointer-events: none;
}

.pt-filter-search {
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: var(--pt-bg);
  padding: 11px 14px 11px 40px;
  font-size: 14px;
  font-family: var(--pt-font-sans);
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.pt-filter-search:focus {
  border-color: var(--pt-accent);
  box-shadow: 0 0 0 3px var(--pt-accent-light);
}

.pt-filter-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.pt-filter-categories {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.pt-filter-chip {
  border: 1px solid #e2e8f0;
  background: var(--pt-bg);
  color: var(--pt-text-light);
  border-radius: 999px;
  font-size: 13px;
  padding: 7px 16px;
  cursor: pointer;
  font-weight: 500;
  font-family: var(--pt-font-sans);
  transition: all 0.2s;
}

.pt-filter-chip:hover {
  border-color: #93c5fd;
  color: #1e3a8a;
}

.pt-filter-chip.active {
  background: #dbeafe;
  border-color: #93c5fd;
  color: #1e3a8a;
  font-weight: 600;
}

.pt-filter-meta {
  font-size: 12px;
  color: var(--pt-text-light);
}

/* ===== Empty State ===== */
.pt-empty-state {
  text-align: center;
  color: var(--pt-text-light);
  padding: 64px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  font-size: 15px;
}

/* ===== Theme Grid (larger than dashboard) ===== */
.pt-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

/* ===== Theme Card ===== */
.pt-card {
  background: var(--pt-surface);
  border: 1px solid var(--pt-border);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  padding: 16px;
}

.pt-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px var(--card-accent, var(--pt-accent));
  border-color: var(--card-accent, var(--pt-accent));
}

/* ===== Mini Phone Preview (larger) ===== */
.pt-phone-mini {
  position: relative;
  width: 130px;
  aspect-ratio: 9 / 16;
  margin: 0 auto 14px;
  border-radius: 18px;
  background: #121827;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(2, 6, 23, 0.25);
}

.pt-phone-notch {
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 3;
}

.pt-phone-screen {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 18px;
}

.pt-phone-fallback {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
}

.pt-placeholder-icon {
  font-size: 34px;
  color: rgba(255, 255, 255, 0.25);
}

.pt-placeholder-text {
  color: rgba(255, 255, 255, 0.4);
  font-size: 11px;
  font-weight: 500;
  margin-top: 8px;
}

.pt-phone-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  z-index: 2;
  transition: opacity 0.3s ease;
}

/* ===== Card Info ===== */
.pt-card-info {
  padding: 4px 0 0;
}

.pt-card-header {
  margin-bottom: 12px;
}

.pt-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.pt-name-icon {
  font-size: 20px;
}

.pt-card-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--pt-text);
  margin: 0;
}

.pt-card-desc {
  font-size: 12px;
  color: var(--pt-text-light);
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ===== Card Actions ===== */
.pt-card-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.pt-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: var(--pt-font-sans);
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;
  border: none;
}

.pt-card-actions .pt-btn {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  font-size: 13px;
  padding: 8px 12px;
}

.pt-btn-outline {
  background: var(--pt-bg);
  color: var(--pt-text);
  border: 1px solid #e2e8f0;
}

.pt-btn-outline:hover {
  border-color: var(--pt-accent);
  color: var(--pt-accent);
  background: var(--pt-accent-light);
}

.pt-btn-outline:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pt-btn-primary {
  background: var(--pt-accent);
  color: #fff;
  border: 1px solid var(--pt-accent);
  flex: 1.2;
}

.pt-btn-primary:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;
  box-shadow: 0 4px 16px var(--pt-accent-glow);
}

/* ===== Load More ===== */
.pt-load-more-wrap {
  margin-top: 32px;
  display: flex;
  justify-content: center;
}

.pt-btn-load-more {
  padding: 12px 32px;
  font-size: 14px;
  background: var(--pt-surface);
  color: var(--pt-accent);
  border: 1px solid var(--pt-border);
  border-radius: 999px;
  gap: 8px;
}

.pt-btn-load-more:hover {
  background: var(--pt-accent);
  color: #fff;
  border-color: var(--pt-accent);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--pt-accent-glow);
}

/* ===== Footer ===== */
.pt-footer {
  text-align: center;
  padding: 24px;
  font-size: 13px;
  color: var(--pt-text-light);
  border-top: 1px solid var(--pt-border);
}

.pt-footer p {
  margin: 0;
}

/* ===== Responsive ===== */
@media (max-width: 1100px) {
  .pt-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}

@media (max-width: 768px) {
  .pt-main {
    padding: 24px 16px 48px;
  }

  .pt-hero {
    margin-bottom: 28px;
  }

  .pt-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .pt-card {
    padding: 12px;
  }

  .pt-phone-mini {
    width: 100px;
  }

  .pt-card-name {
    font-size: 14px;
  }

  .pt-card-desc {
    display: none;
  }

  .pt-card-actions .pt-btn {
    font-size: 11px;
    padding: 6px 8px;
  }

  .pt-card:hover {
    transform: none;
  }

  .pt-back-btn span:last-of-type {
    display: inline;
  }
}

@media (max-width: 400px) {
  .pt-grid {
    grid-template-columns: 1fr;
  }

  .pt-phone-mini {
    width: 130px;
  }

  .pt-card-desc {
    display: block;
  }
}
</style>
