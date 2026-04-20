<script setup lang="ts">
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { LOVE_STORY_TEMPLATES, type LoveStoryTemplate } from '@/config/loveStoryTemplates';
import type { LoveStoryItem } from '@/types/invitation';

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'select', stories: LoveStoryItem[]): void;
}>();

type Category = 'Semua' | 'Sekolah' | 'Pekerjaan' | "Ta'aruf" | 'Sosial Media';
const categories: Category[] = ['Semua', 'Sekolah', 'Pekerjaan', "Ta'aruf", 'Sosial Media'];

const activeCategory = ref<Category>('Semua');

const filteredTemplates = computed(() => {
  return LOVE_STORY_TEMPLATES.filter((tpl) => {
    return activeCategory.value === 'Semua' || tpl.category === activeCategory.value;
  });
});

const selectTemplate = (tpl: LoveStoryTemplate) => {
  // Deep clone the stories to avoid mutating the original template
  const cloned = tpl.stories.map(s => ({ ...s }));
  emit('select', cloned);
};
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="ls-modal-overlay" @click.self="emit('close')">
      <div class="ls-modal">
        <div class="ls-modal-header">
          <div>
            <h2 style="display: flex; align-items: center; gap: 8px;">
              <Icon icon="lucide:heart-handshake" style="color: var(--admin-primary);" />
              Pustaka Template Kisah Cinta
            </h2>
            <p style="color: var(--admin-text-secondary); font-size: 13px; margin-top: 4px;">Pilih template cerita untuk mengisi Love Story secara otomatis</p>
          </div>
          <button class="ls-modal-close" @click="emit('close')">
            <Icon icon="lucide:x" />
          </button>
        </div>

        <div class="ls-modal-filters">
          <div class="ls-categories">
            <button
              v-for="cat in categories"
              :key="cat"
              class="ls-category-btn"
              :class="{ active: activeCategory === cat }"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div class="ls-modal-body">
          <div v-if="filteredTemplates.length === 0" class="ls-empty-state">
            <Icon icon="lucide:file-question" style="font-size: 32px; color: var(--admin-text-secondary); margin-bottom: 8px;" />
            <p>Tidak ada template yang ditemukan.</p>
          </div>

          <div class="ls-grid">
            <div v-for="tpl in filteredTemplates" :key="tpl.id" class="ls-card">
              <div class="ls-card-header">
                <div>
                  <h3 class="ls-card-title">{{ tpl.title }}</h3>
                  <p class="ls-card-desc">{{ tpl.description }}</p>
                </div>
                <span class="ls-badge">{{ tpl.category }}</span>
              </div>

              <!-- Timeline Preview -->
              <div class="ls-timeline">
                <div v-for="(story, i) in tpl.stories" :key="i" class="ls-timeline-item">
                  <div class="ls-timeline-dot" />
                  <div class="ls-timeline-content">
                    <span class="ls-timeline-date">{{ story.date }}</span>
                    <strong class="ls-timeline-title">{{ story.title }}</strong>
                    <p class="ls-timeline-text">{{ story.description }}</p>
                  </div>
                </div>
              </div>

              <button class="btn btn-primary btn-sm ls-select-btn" @click="selectTemplate(tpl)">
                <Icon icon="lucide:wand-2" style="font-size: 14px;" /> Gunakan Template Ini
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.ls-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.ls-modal {
  width: 100%;
  max-width: 640px;
  background: var(--admin-surface, #ffffff);
  border-radius: var(--radius-xl, 1.25rem);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
  border: 1px solid var(--admin-border, #e2e8f0);
}

.ls-modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--admin-border, #e2e8f0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--admin-surface, #ffffff);
}

.ls-modal-header h2 {
  font-size: 18px;
  font-weight: 700;
  color: var(--admin-text, #1e293b);
  margin: 0;
}

.ls-modal-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--admin-bg, #f8fafc);
  color: var(--admin-text-secondary, #64748b);
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.ls-modal-close:hover {
  background: #e2e8f0;
  color: #ef4444;
}

.ls-modal-filters {
  padding: 14px 24px;
  border-bottom: 1px solid var(--admin-border, #e2e8f0);
  background: var(--admin-bg, #f8fafc);
}

.ls-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ls-category-btn {
  padding: 6px 14px;
  background: var(--admin-surface, #ffffff);
  border: 1px solid var(--admin-border, #cbd5e1);
  border-radius: 99px;
  font-size: 13px;
  font-weight: 500;
  color: var(--admin-text-secondary, #64748b);
  cursor: pointer;
  transition: all 0.2s;
}

.ls-category-btn:hover {
  border-color: var(--admin-primary, #3b82f6);
  color: var(--admin-primary, #3b82f6);
}

.ls-category-btn.active {
  background: var(--admin-primary, #3b82f6);
  border-color: var(--admin-primary, #3b82f6);
  color: white;
}

.ls-modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: var(--admin-surface, #ffffff);
}

.ls-empty-state {
  padding: 40px 20px;
  text-align: center;
  color: var(--admin-text-secondary, #64748b);
}

.ls-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.ls-card {
  padding: 20px;
  border: 1px solid var(--admin-border, #e2e8f0);
  border-radius: var(--radius-md, 0.75rem);
  background: var(--admin-bg, #f8fafc);
  transition: all 0.2s;
}

.ls-card:hover {
  border-color: var(--admin-primary, #3b82f6);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.ls-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.ls-card-title {
  font-weight: 700;
  font-size: 15px;
  color: var(--admin-text, #1e293b);
  margin: 0 0 4px;
}

.ls-card-desc {
  font-size: 12.5px;
  color: var(--admin-text-secondary, #64748b);
  margin: 0;
  line-height: 1.4;
}

.ls-badge {
  background: #e2e8f0;
  color: #475569;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 99px;
  white-space: nowrap;
  flex-shrink: 0;
}

/* ===== Timeline Preview ===== */
.ls-timeline {
  position: relative;
  padding-left: 20px;
  margin-bottom: 16px;
}

.ls-timeline::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: linear-gradient(180deg, #93c5fd, #3b82f6, #93c5fd);
  border-radius: 2px;
}

.ls-timeline-item {
  position: relative;
  padding-bottom: 14px;
}

.ls-timeline-item:last-child {
  padding-bottom: 0;
}

.ls-timeline-dot {
  position: absolute;
  left: -18px;
  top: 5px;
  width: 10px;
  height: 10px;
  background: var(--admin-primary, #3b82f6);
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.ls-timeline-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ls-timeline-date {
  font-size: 11px;
  font-weight: 600;
  color: var(--admin-primary, #3b82f6);
  letter-spacing: 0.5px;
}

.ls-timeline-title {
  font-size: 13px;
  color: var(--admin-text, #1e293b);
}

.ls-timeline-text {
  font-size: 12px;
  color: var(--admin-text-secondary, #64748b);
  line-height: 1.45;
  margin: 0;
}

.ls-select-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .ls-modal,
.fade-leave-active .ls-modal {
  transition: transform 0.2s ease;
}

.fade-enter-from .ls-modal,
.fade-leave-to .ls-modal {
  transform: scale(0.95) translateY(10px);
}
</style>
