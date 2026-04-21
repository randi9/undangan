<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import type { ThemeRegistryEntry } from "@/config/themes";

const props = defineProps<{
  show: boolean;
  themes: ThemeRegistryEntry[];
  selectedThemeId: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "select", themeId: ThemeRegistryEntry["id"]): void;
}>();

type ThemeCategory = "Semua" | "Elegant" | "Floral" | "Minimalist" | "Blue";

const activeCategory = ref<ThemeCategory>("Semua");
const searchQuery = ref("");
const pageSize = ref<5 | 10 | 25>(10);
const visibleCount = ref(10);

const categories: ThemeCategory[] = [
  "Semua",
  "Elegant",
  "Floral",
  "Minimalist",
  "Blue",
];

function getThemeCategory(
  theme: ThemeRegistryEntry,
): Exclude<ThemeCategory, "Semua">[] {
  const tags: Exclude<ThemeCategory, "Semua">[] = [];
  const id = theme.id.toLowerCase();
  const name = theme.name.toLowerCase();

  if (id.includes("elegant") || name.includes("elegant")) tags.push("Elegant");
  if (id.includes("floral") || name.includes("floral")) tags.push("Floral");
  if (id.includes("minimalist") || name.includes("minimalist"))
    tags.push("Minimalist");
  if (id.includes("blue") || name.includes("blue")) tags.push("Blue");

  return tags;
}

const filteredThemes = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  return props.themes.filter((theme) => {
    const categoriesForTheme = getThemeCategory(theme);
    const matchesCategory =
      activeCategory.value === "Semua" ||
      categoriesForTheme.includes(activeCategory.value);
    const matchesSearch =
      q.length === 0 ||
      theme.name.toLowerCase().includes(q) ||
      theme.description.toLowerCase().includes(q) ||
      theme.id.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });
});

const displayedThemes = computed(() =>
  filteredThemes.value.slice(0, visibleCount.value),
);
const hasMoreThemes = computed(
  () => displayedThemes.value.length < filteredThemes.value.length,
);

function resetVisibleCount() {
  visibleCount.value = pageSize.value;
}

function loadMoreThemes() {
  visibleCount.value += pageSize.value;
}

function selectTheme(themeId: ThemeRegistryEntry["id"]) {
  emit("select", themeId);
}

watch(
  () => props.show,
  (show) => {
    if (show) {
      resetVisibleCount();
    }
  },
);

watch([searchQuery, activeCategory, pageSize], () => {
  resetVisibleCount();
});
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="theme-picker-overlay" @click.self="emit('close')">
      <div class="theme-picker-modal">
        <div class="theme-picker-header">
          <div>
            <h2 class="theme-picker-title">
              <Icon icon="lucide:palette" style="color: var(--admin-primary)" />
              Pilih Tema Undangan
            </h2>
            <p class="theme-picker-subtitle">
              Cari, filter, dan pilih tema yang paling cocok
            </p>
          </div>
          <button class="theme-picker-close" @click="emit('close')">
            <Icon icon="lucide:x" />
          </button>
        </div>

        <div class="theme-picker-filters">
          <div class="theme-picker-search-wrap">
            <Icon icon="lucide:search" class="theme-picker-search-icon" />
            <input
              v-model="searchQuery"
              type="text"
              class="theme-picker-search"
              placeholder="Cari tema..."
            />
          </div>

          <div class="theme-picker-toolbar">
            <div class="theme-picker-categories">
              <button
                v-for="category in categories"
                :key="category"
                class="theme-picker-chip"
                :class="{ active: activeCategory === category }"
                @click="activeCategory = category"
              >
                {{ category }}
              </button>
            </div>

            <div class="theme-picker-page-size-wrap">
              <label for="theme-page-size">Tampil</label>
              <select
                id="theme-page-size"
                v-model.number="pageSize"
                class="theme-picker-page-size"
              >
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="25">25</option>
              </select>
            </div>
          </div>

          <div class="theme-picker-meta">
            Menampilkan {{ displayedThemes.length }} dari
            {{ filteredThemes.length }} tema
          </div>
        </div>

        <div class="theme-picker-body">
          <div v-if="filteredThemes.length === 0" class="theme-picker-empty">
            <Icon icon="lucide:file-search" style="font-size: 30px" />
            <p>Tidak ada tema yang cocok dengan filter.</p>
          </div>

          <div v-else class="theme-picker-grid">
            <button
              v-for="theme in displayedThemes"
              :key="theme.id"
              type="button"
              class="theme-picker-card"
              :class="{ active: selectedThemeId === theme.id }"
              @click="selectTheme(theme.id)"
            >
              <div class="theme-phone-mini">
                <div class="theme-phone-notch" />
                <div class="theme-phone-screen">
                  <div
                    class="theme-phone-fallback"
                    :style="{
                      background: theme.previewStyle.bg,
                      color: theme.previewStyle.color,
                    }"
                  >
                    <div :style="theme.previewStyle.headerStyle">
                      {{ theme.previewStyle.headerText }}
                    </div>
                    <div :style="theme.previewStyle.nameStyle">
                      {{ theme.previewStyle.nameText }}
                    </div>
                  </div>
                  <img
                    :src="theme.thumbnail"
                    :alt="theme.name"
                    class="theme-phone-image"
                    loading="lazy"
                    @error="
                      ($event.target as HTMLImageElement).style.opacity = '0'
                    "
                  />
                </div>
              </div>

              <div class="theme-picker-card-footer">
                <span class="theme-picker-card-name">{{ theme.name }}</span>
                <span
                  v-if="selectedThemeId === theme.id"
                  class="theme-picker-active"
                  >Aktif</span
                >
              </div>
            </button>
          </div>
        </div>

        <div v-if="hasMoreThemes" class="theme-picker-load-more-wrap">
          <button type="button" class="btn btn-outline" @click="loadMoreThemes">
            <Icon icon="lucide:chevrons-down" style="font-size: 16px" />
            Load Tema Lain
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.theme-picker-overlay {
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.theme-picker-modal {
  width: 100%;
  max-width: 820px;
  max-height: 90vh;
  background: var(--admin-surface, #fff);
  border: 1px solid var(--admin-border, #e2e8f0);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.theme-picker-header {
  padding: 16px 18px;
  border-bottom: 1px solid var(--admin-border, #e2e8f0);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.theme-picker-title {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
}

.theme-picker-subtitle {
  margin: 4px 0 0;
  color: var(--admin-text-secondary, #64748b);
  font-size: 13px;
}

.theme-picker-close {
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 999px;
  background: var(--admin-bg, #f8fafc);
  color: var(--admin-text-secondary, #64748b);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.theme-picker-filters {
  padding: 14px 18px;
  border-bottom: 1px solid var(--admin-border, #e2e8f0);
  background: var(--admin-bg, #f8fafc);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.theme-picker-search-wrap {
  position: relative;
}
.theme-picker-search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}
.theme-picker-search {
  width: 100%;
  border: 1px solid var(--admin-border, #cbd5e1);
  border-radius: 10px;
  background: #fff;
  padding: 10px 12px 10px 34px;
}

.theme-picker-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.theme-picker-categories {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.theme-picker-chip {
  border: 1px solid var(--admin-border, #cbd5e1);
  background: #fff;
  color: var(--admin-text-secondary, #64748b);
  border-radius: 999px;
  font-size: 12px;
  padding: 6px 10px;
  cursor: pointer;
}
.theme-picker-chip.active {
  background: #dbeafe;
  border-color: #93c5fd;
  color: #1e3a8a;
}

.theme-picker-page-size-wrap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--admin-text-secondary, #64748b);
  font-size: 12px;
}

.theme-picker-page-size {
  border: 1px solid var(--admin-border, #cbd5e1);
  border-radius: 8px;
  padding: 5px 8px;
  background: #fff;
}

.theme-picker-meta {
  font-size: 12px;
  color: var(--admin-text-secondary, #64748b);
}

.theme-picker-body {
  padding: 16px 18px;
  overflow-y: auto;
  flex: 1;
}

.theme-picker-empty {
  text-align: center;
  color: var(--admin-text-secondary, #64748b);
  padding: 28px 0;
}

.theme-picker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 14px;
}

.theme-picker-card {
  border: 1px solid var(--admin-border, #e2e8f0);
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 10px;
}

.theme-picker-card:hover {
  transform: translateY(-2px);
  border-color: var(--admin-primary, #3b82f6);
}

.theme-picker-card.active {
  border-color: var(--admin-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.theme-phone-mini {
  position: relative;
  width: 82px;
  aspect-ratio: 9 / 16;
  margin: 0 auto 8px;
  border-radius: 14px;
  background: #121827;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(2, 6, 23, 0.25);
}

.theme-phone-notch {
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 28px;
  height: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.25);
  z-index: 3;
}

.theme-phone-screen {
  position: absolute;
  inset: 0;
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
}

.theme-phone-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
}

.theme-picker-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.theme-picker-card-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--admin-text, #1e293b);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.theme-picker-active {
  font-size: 10px;
  font-weight: 700;
  color: #1e3a8a;
  background: #dbeafe;
  border-radius: 999px;
  padding: 3px 7px;
}

.theme-picker-load-more-wrap {
  border-top: 1px solid var(--admin-border, #e2e8f0);
  padding: 12px 18px;
  background: var(--admin-bg, #f8fafc);
  display: flex;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
