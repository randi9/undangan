<template>
  <section v-if="photos && photos.length > 0" class="gallery-section">
    <div class="gallery-container">
      <h2 class="gallery-title" :style="{ fontFamily: themeConfig.fontHeading }">Our Gallery</h2>
      
      <div class="gallery-divider">
        <div class="divider-line"></div>
        <div class="divider-diamond"></div>
        <div class="divider-line"></div>
      </div>
      
      <p class="gallery-subtitle">
        A glimpse into our beautiful moments
      </p>

      <GalleryMasonryLayout
        :photos="photos"
        :api-base="apiBase"
        @open-lightbox="(i: number) => $emit('openLightbox', i)"
      />
    </div>
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
  width: 100%;
  padding: 100px 0;
  background-color: #f8f9f9;
  position: relative;
  overflow: hidden;
}

.gallery-container {
  max-width: 1100px;
  margin: 0 auto;
  /* Margin mutlak dari pinggir layar untuk estetika */
  padding: 0 24px;
}
@media (min-width: 768px) {
  .gallery-container {
    padding: 0 48px;
  }
}

.gallery-title {
  color: #1a252c;
  font-size: clamp(2.5rem, 5vw, 4rem);
  text-align: center;
  margin-bottom: 12px;
  letter-spacing: 0.05em;
  text-shadow: 0 1px 2px rgba(0,0,0,0.02);
}

.gallery-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
}
.divider-line {
  height: 1px;
  width: 60px;
  background: linear-gradient(90deg, transparent, rgba(48,72,81,0.3), transparent);
}
.divider-diamond {
  width: 6px;
  height: 6px;
  background-color: #405C66;
  transform: rotate(45deg);
}

.gallery-subtitle {
  text-align: center;
  color: rgba(48,72,81,0.7);
  font-size: clamp(0.75rem, 3vw, 0.95rem);
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 50px;
  font-family: inherit;
}
</style>
