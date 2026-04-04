<template>
  <section v-if="photos && photos.length > 0" class="gallery-section" :style="{ backgroundColor: 'var(--theme-surface)' }">
    <h2 class="gallery-title" :style="{ fontFamily: themeConfig.fontHeading, color: 'var(--theme-primary)' }">Galeri</h2>
    
    <div class="gallery-divider" :style="{ color: 'var(--theme-secondary)' }">
      <div class="divider-line" :style="{ backgroundColor: 'var(--theme-secondary)' }"></div>
      <span class="divider-icon">📸</span>
      <div class="divider-line" :style="{ backgroundColor: 'var(--theme-secondary)' }"></div>
    </div>
    
    <GalleryMasonryLayout
      :photos="photos"
      :api-base="apiBase"
      @open-lightbox="(i: number) => $emit('openLightbox', i)"
    />
  </section>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import type { Photo } from '@/types/invitation';
import GalleryMasonryLayout from './GalleryMasonryLayout.vue';

defineProps<{
  photos: Photo[];
  themeConfig: ThemeConfig;
  apiBase: string;
}>();

defineEmits<{
  (e: 'openLightbox', index: number): void;
}>();
</script>

<style scoped>
.gallery-section {
  padding: 6rem 1.5rem;
  max-width: 64rem;
  margin: 0 auto;
  text-align: center;
}

.gallery-title {
  font-size: 2.25rem;
  margin-bottom: 0.5rem;
}

@media (min-width: 768px) {
  .gallery-title { font-size: 3rem; }
}

.gallery-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.divider-line {
  height: 1px;
  width: 4rem;
  opacity: 0.5;
}

.divider-icon {
  font-size: 1.25rem;
}
</style>
