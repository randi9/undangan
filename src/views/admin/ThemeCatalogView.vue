<template>
  <AdminLayout>
    <template #actions>
      <router-link v-if="!hasReachedLimit" to="/dashboard/create" class="btn btn-primary">
        <span class="material-symbols-rounded" style="font-size:18px;vertical-align:-3px">auto_awesome</span>
        Buat Undangan Baru
      </router-link>
    </template>
        <!-- Page Header -->
        <div class="theme-page-header">
          <h1 class="admin-page-title">Koleksi Tema Undangan</h1>
        </div>

        <!-- Limit Warning -->
        <div v-if="hasReachedLimit" class="theme-limit-warning" style="margin-top: 0; margin-bottom: 32px;">
          <span class="material-symbols-rounded" style="font-size:20px;vertical-align:-4px">info</span>
          Anda telah mencapai batas undangan. Hubungi admin untuk menambah kuota atau hapus undangan yang tidak digunakan.
        </div>

        <!-- Filter Toolbar -->
        <div class="theme-filter-toolbar">
          <div class="theme-filter-search-wrap">
            <Icon icon="lucide:search" class="theme-filter-search-icon" />
            <input
              v-model="searchQuery"
              type="text"
              class="theme-filter-search"
              placeholder="Cari tema..."
            />
          </div>
          <div class="theme-filter-row">
            <div class="theme-filter-categories">
              <button
                v-for="cat in categories"
                :key="cat"
                class="theme-filter-chip"
                :class="{ active: activeCategory === cat }"
                @click="activeCategory = cat"
              >
                {{ cat }}
              </button>
            </div>
            <div class="theme-filter-page-size-wrap">
              <label for="catalog-page-size">Tampil</label>
              <select id="catalog-page-size" v-model.number="pageSize" class="theme-filter-page-size">
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
              </select>
            </div>
          </div>
          <div class="theme-filter-meta">
            Menampilkan {{ displayedThemes.length }} dari {{ filteredThemes.length }} tema
          </div>
        </div>

        <!-- Theme Grid -->
        <div v-if="filteredThemes.length === 0" class="theme-empty-state">
          <Icon icon="lucide:file-search" style="font-size:32px;color:var(--admin-text-secondary)" />
          <p>Tidak ada tema yang cocok dengan pencarian Anda.</p>
        </div>
        <div v-else class="theme-catalog-grid">
          <div
            v-for="theme in displayedThemes"
            :key="theme.id"
            class="theme-catalog-card"
            :style="{ '--card-accent': theme.color }"
          >
            <!-- Mini Phone Preview -->
            <div class="theme-phone-mini">
              <div class="theme-phone-notch"></div>
              <div class="theme-phone-screen">
                <!-- Fallback Placeholder -->
                <div class="theme-phone-fallback">
                  <Icon :icon="theme.icon" class="placeholder-icon" :style="{ color: theme.color }" />
                  <span class="placeholder-text">{{ theme.name }}</span>
                </div>
                <!-- Thumbnail Image -->
                <img
                  :src="theme.thumbnail"
                  @error="($event.target as HTMLImageElement).style.opacity = '0'"
                  class="theme-phone-image"
                  :alt="'Preview tema ' + theme.name"
                  loading="lazy"
                />
              </div>
            </div>

            <div class="theme-catalog-info">
              <div class="theme-catalog-header">
                <div class="theme-name-row">
                  <Icon :icon="theme.icon" class="theme-name-icon" :style="{ color: theme.color }" />
                  <h3 class="theme-catalog-name">{{ theme.name }}</h3>
                </div>
              </div>
              <div class="theme-catalog-actions">
                <a
                  v-if="theme.sampleUrl"
                  :href="theme.sampleUrl"
                  target="_blank"
                  class="btn btn-outline btn-sm theme-btn"
                >
                  <span class="material-symbols-rounded" style="font-size:14px;vertical-align:-3px">visibility</span>
                  Lihat
                </a>
                <button
                  v-else
                  class="btn btn-outline btn-sm theme-btn"
                  disabled
                  title="Link contoh akan segera tersedia"
                >
                  <span class="material-symbols-rounded" style="font-size:14px;vertical-align:-3px">hourglass_top</span>
                  Segera
                </button>

                <router-link
                  v-if="!hasReachedLimit"
                  :to="`/dashboard/create?theme=${theme.id}`"
                  class="btn btn-primary btn-sm theme-btn theme-btn-use"
                >
                  <span class="material-symbols-rounded" style="font-size:14px;vertical-align:-3px">brush</span>
                  Pakai
                </router-link>
                <button
                  v-else
                  class="btn btn-primary btn-sm theme-btn theme-btn-use"
                  disabled
                  title="Limit undangan tercapai."
                >
                  <span class="material-symbols-rounded" style="font-size:14px;vertical-align:-3px">block</span>
                  Pakai
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More -->
        <div v-if="hasMoreThemes" class="theme-load-more-wrap">
          <button type="button" class="btn btn-outline" @click="loadMore">
            <Icon icon="lucide:chevrons-down" style="font-size:16px" />
            Tampilkan Lebih Banyak
          </button>
        </div>

        
      <!-- Toast -->
    <div v-if="toast" :class="['toast', `toast-${toast.type}`, 'flex', 'items-center', 'gap-2']">
      <Icon :icon="toast.type === 'error' ? 'lucide:x-circle' : 'lucide:check-circle-2'" style="font-size: 18px; flex-shrink: 0;" />
      <span>{{ toast.message }}</span>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useInvitationStore } from "@/stores/invitation";
import { useAuthStore } from "@/stores/auth";
import { Icon } from "@iconify/vue";
import AdminLayout from "@/components/admin/AdminLayout.vue";
import { THEME_LIST } from "@/config/themes";
import type { ThemeRegistryEntry } from "@/config/themes";

const store = useInvitationStore();
const authStore = useAuthStore();
const toast = ref<{ type: string; message: string } | null>(null);

const invitations = computed(() => store.invitations);

const hasReachedLimit = computed(() => {
  if (!authStore.user) return false;
  if (authStore.user.role === 'admin') return false;
  return invitations.value.length >= authStore.user.max_invitations;
});

const hasTrialInvitation = computed(() => {
  return invitations.value.some(i => i.payment_status === 'trial');
});

const firstTrialInvitationId = computed(() => {
  const trialInv = invitations.value.find(i => i.payment_status === 'trial');
  return trialInv ? trialInv.id : null;
});

const allThemes = THEME_LIST;

// ===== Filter & Pagination =====
type ThemeCategory = 'Semua' | 'Elegant' | 'Floral' | 'Minimalist' | 'Blue';
const categories: ThemeCategory[] = ['Semua', 'Elegant', 'Floral', 'Minimalist', 'Blue'];
const activeCategory = ref<ThemeCategory>('Semua');
const searchQuery = ref('');
const pageSize = ref<10 | 25 | 50>(10);
const visibleCount = ref(10);

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
  visibleCount.value += pageSize.value;
}

watch([searchQuery, activeCategory, pageSize], () => {
  visibleCount.value = pageSize.value;
});

onMounted(async () => {
  await store.fetchInvitations();
});
</script>

<style scoped>
/* ===== Filter Toolbar ===== */
.theme-filter-toolbar {
  margin-bottom: 20px;
  padding: 16px;
  background: var(--admin-bg, #f8fafc);
  border: 1px solid var(--admin-border, #e2e8f0);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.theme-filter-search-wrap {
  position: relative;
}

.theme-filter-search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 16px;
  pointer-events: none;
}

.theme-filter-search {
  width: 100%;
  border: 1px solid var(--admin-border, #cbd5e1);
  border-radius: 10px;
  background: #fff;
  padding: 10px 12px 10px 36px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.theme-filter-search:focus {
  border-color: var(--admin-primary, #3b82f6);
}

.theme-filter-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.theme-filter-categories {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.theme-filter-chip {
  border: 1px solid var(--admin-border, #cbd5e1);
  background: #fff;
  color: var(--admin-text-secondary, #64748b);
  border-radius: 999px;
  font-size: 12px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.15s;
}

.theme-filter-chip:hover {
  border-color: #93c5fd;
  color: #1e3a8a;
}

.theme-filter-chip.active {
  background: #dbeafe;
  border-color: #93c5fd;
  color: #1e3a8a;
  font-weight: 600;
}

.theme-filter-page-size-wrap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--admin-text-secondary, #64748b);
  font-size: 13px;
  font-weight: 500;
}

.theme-filter-page-size {
  border: 1px solid var(--admin-border, #cbd5e1);
  border-radius: 8px;
  padding: 5px 10px;
  background: #fff;
  font-size: 13px;
  cursor: pointer;
}

.theme-filter-meta {
  font-size: 12px;
  color: var(--admin-text-secondary, #64748b);
}

.theme-empty-state {
  text-align: center;
  color: var(--admin-text-secondary, #64748b);
  padding: 48px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.theme-load-more-wrap {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

/* ===== Theme Page Header ===== */
.theme-page-header {
  margin-bottom: 36px;
}

.theme-page-header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.theme-page-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #e0e7ff, #ede9fe);
  border-radius: 16px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

.theme-page-icon {
  font-size: 28px;
  color: #4f46e5;
}

/* ===== Theme Catalog Grid ===== */
.theme-catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

/* ===== Theme Card ===== */
.theme-catalog-card {
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  padding: 12px;
}

.theme-catalog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  border-color: var(--card-accent, var(--admin-primary));
}

/* ===== Mini Phone Preview (same as ThemePickerModal) ===== */
.theme-phone-mini {
  position: relative;
  width: 100px;
  aspect-ratio: 9 / 16;
  margin: 0 auto 10px;
  border-radius: 16px;
  background: #121827;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(2, 6, 23, 0.25);
}

.theme-phone-notch {
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 34px;
  height: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 3;
}

.theme-phone-screen {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 16px;
}

.theme-phone-fallback {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 8px;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
}

.placeholder-icon {
  font-size: 28px;
  color: rgba(255, 255, 255, 0.25);
}

.placeholder-text {
  color: rgba(255, 255, 255, 0.4);
  font-size: 10px;
  font-weight: 500;
  margin-top: 6px;
}

.theme-phone-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  z-index: 2;
  transition: opacity 0.3s ease;
}

/* ===== Theme Info ===== */
.theme-catalog-info {
  padding: 4px 0 0;
}

.theme-catalog-header {
  margin-bottom: 8px;
}

.theme-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.theme-name-icon {
  font-size: 18px;
}

.theme-catalog-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--admin-text);
  margin: 0;
}

/* ===== Theme Actions ===== */
.theme-catalog-actions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.theme-btn {
  flex: 1;
  min-width: 0;
  justify-content: center;
  white-space: nowrap;
  font-size: 11px !important;
  padding: 6px 8px !important;
}

.theme-btn-use {
  flex: 1.2;
}

.theme-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ===== Limit Warning ===== */
.theme-limit-warning {
  margin-top: 24px;
  padding: 16px 20px;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 12px;
  color: #92400e;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 1.5;
}

/* ===== Responsive ===== */
@media (max-width: 1100px) {
  .theme-catalog-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}

@media (max-width: 768px) {
  .theme-catalog-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .theme-page-header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .theme-page-icon-wrapper {
    width: 44px;
    height: 44px;
    border-radius: 12px;
  }

  .theme-page-icon {
    font-size: 22px;
  }

  .theme-phone-mini {
    width: 80px;
  }

  .theme-catalog-card:hover {
    transform: none;
  }
}
</style>
