<script setup lang="ts">
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { QUOTE_TEMPLATES } from '@/config/quotes';

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'select', quoteContent: string): void;
}>();

const activeCategory = ref<'Semua' | 'Islami' | 'Nasrani' | 'Umum'>('Semua');
const searchQuery = ref('');

const filteredQuotes = computed(() => {
  return QUOTE_TEMPLATES.filter((quote) => {
    const matchesCategory = activeCategory.value === 'Semua' || quote.category === activeCategory.value;
    const searchLower = searchQuery.value.toLowerCase();
    const matchesSearch = quote.title.toLowerCase().includes(searchLower) || quote.content.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });
});

const selectQuote = (content: string) => {
  emit('select', content);
};
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="quote-modal-overlay" @click.self="emit('close')">
      <div class="quote-modal">
        <div class="quote-modal-header">
          <div>
            <h2 style="display: flex; align-items: center; gap: 8px;">
              <Icon icon="lucide:book-open" style="color: var(--admin-primary);" />
              Pustaka Kutipan & Ayat
            </h2>
            <p style="color: var(--admin-text-secondary); font-size: 13px; margin-top: 4px;">Pilih template kutipan untuk undangan Anda</p>
          </div>
          <button class="quote-modal-close" @click="emit('close')">
            <Icon icon="lucide:x" />
          </button>
        </div>

        <div class="quote-modal-filters">
          <!-- Search -->
          <div class="quote-search-wrapper">
            <Icon icon="lucide:search" class="quote-search-icon" />
            <input 
              v-model="searchQuery" 
              type="text" 
              class="quote-search-input" 
              placeholder="Cari surat atau kutipan..."
            />
          </div>
          <!-- Categories -->
          <div class="quote-categories">
            <button 
              v-for="cat in ['Semua', 'Islami', 'Nasrani', 'Umum']" 
              :key="cat"
              class="quote-category-btn"
              :class="{ active: activeCategory === cat }"
              @click="activeCategory = cat as any"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div class="quote-modal-body">
          <div v-if="filteredQuotes.length === 0" class="quote-empty-state">
            <Icon icon="lucide:file-question" style="font-size: 32px; color: var(--admin-text-secondary); margin-bottom: 8px;" />
            <p>Tidak ada kutipan yang ditemukan.</p>
          </div>

          <div class="quote-grid">
            <div v-for="quote in filteredQuotes" :key="quote.id" class="quote-card">
              <div class="quote-card-header">
                <h3 class="quote-title">{{ quote.title }}</h3>
                <span class="quote-badge">{{ quote.category }}</span>
              </div>
              <p class="quote-content">{{ quote.content }}</p>
              <button class="btn btn-outline btn-sm quote-select-btn" @click="selectQuote(quote.content)">
                <Icon icon="lucide:check" style="font-size: 14px;" /> Gunakan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.quote-modal-overlay {
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

.quote-modal {
  width: 100%;
  max-width: 600px;
  background: var(--admin-surface, #ffffff);
  border-radius: var(--radius-xl, 1.25rem);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
  border: 1px solid var(--admin-border, #e2e8f0);
}

.quote-modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--admin-border, #e2e8f0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--admin-surface, #ffffff);
}

.quote-modal-header h2 {
  font-size: 18px;
  font-weight: 700;
  color: var(--admin-text, #1e293b);
  margin: 0;
}

.quote-modal-close {
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

.quote-modal-close:hover {
  background: #e2e8f0;
  color: #ef4444;
}

.quote-modal-filters {
  padding: 16px 24px;
  border-bottom: 1px solid var(--admin-border, #e2e8f0);
  background: var(--admin-bg, #f8fafc);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.quote-search-wrapper {
  position: relative;
  width: 100%;
}

.quote-search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--admin-text-secondary, #94a3b8);
  font-size: 18px;
}

.quote-search-input {
  width: 100%;
  padding: 10px 12px 10px 36px;
  border: 1px solid var(--admin-border, #cbd5e1);
  border-radius: var(--radius-md, 0.5rem);
  font-size: 14px;
  background: var(--admin-surface, #ffffff);
  transition: border-color 0.2s;
}

.quote-search-input:focus {
  outline: none;
  border-color: var(--admin-primary, #3b82f6);
}

.quote-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.quote-category-btn {
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

.quote-category-btn:hover {
  border-color: var(--admin-primary, #3b82f6);
  color: var(--admin-primary, #3b82f6);
}

.quote-category-btn.active {
  background: var(--admin-primary, #3b82f6);
  border-color: var(--admin-primary, #3b82f6);
  color: white;
}

.quote-modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: var(--admin-surface, #ffffff);
}

.quote-empty-state {
  padding: 40px 20px;
  text-align: center;
  color: var(--admin-text-secondary, #64748b);
}

.quote-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.quote-card {
  padding: 16px;
  border: 1px solid var(--admin-border, #e2e8f0);
  border-radius: var(--radius-md, 0.75rem);
  background: var(--admin-bg, #f8fafc);
  transition: all 0.2s;
}

.quote-card:hover {
  border-color: var(--admin-primary, #3b82f6);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.quote-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.quote-title {
  font-weight: 700;
  font-size: 15px;
  color: var(--admin-text, #1e293b);
  margin: 0;
}

.quote-badge {
  background: #e2e8f0;
  color: #475569;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 99px;
}

.quote-content {
  font-size: 14px;
  line-height: 1.6;
  color: var(--admin-text-secondary, #475569);
  margin-bottom: 16px;
  font-style: italic;
}

.quote-select-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: var(--admin-surface, #ffffff);
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

.fade-enter-active .quote-modal,
.fade-leave-active .quote-modal {
  transition: transform 0.2s ease;
}

.fade-enter-from .quote-modal,
.fade-leave-to .quote-modal {
  transform: scale(0.95) translateY(10px);
}
</style>
