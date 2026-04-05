<template>
  <section v-if="photos && photos.length > 0" style="padding: 3rem 1.5rem 6rem; max-width: 64rem; margin: 0 auto; text-align: center; background-color: var(--theme-surface);">
    <h2 :style="{ fontFamily: themeConfig.fontHeading, color: 'var(--theme-primary)', fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', marginBottom: '2rem' }">Our Gallery</h2>
    
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
</style>
