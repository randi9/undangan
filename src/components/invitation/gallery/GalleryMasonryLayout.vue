<template>
  <div class="masonry-grid">
    <div 
      v-for="(photo, i) in photos" 
      :key="i" 
      class="masonry-item"
      @click="$emit('openLightbox', i)"
    >
      <img 
        :src="resolveAssetUrl(photo.url, apiBase)" 
        alt="Gallery Photo" 
        class="masonry-img"
        loading="lazy"
      />
      <div class="masonry-overlay"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Photo } from '@/types/invitation';
import { resolveAssetUrl } from '@/utils/url';

defineProps<{
  photos: Photo[];
  apiBase: string;
}>();

defineEmits<{
  (e: 'openLightbox', index: number): void;
}>();
</script>

<style scoped>
.masonry-grid {
  columns: 2;
  column-gap: 0.75rem;
}

@media (min-width: 768px) {
  .masonry-grid {
    columns: 3;
    column-gap: 1rem;
  }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 0.75rem;
  border-radius: 0.75rem;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

@media (min-width: 768px) {
  .masonry-item {
    margin-bottom: 1rem;
  }
}

.masonry-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.15);
}

.masonry-img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.masonry-item:hover .masonry-img {
  transform: scale(1.05);
}

.masonry-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.masonry-item:hover .masonry-overlay {
  opacity: 1;
}
</style>
