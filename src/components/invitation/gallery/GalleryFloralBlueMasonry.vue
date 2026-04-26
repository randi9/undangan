<template>
  <section v-if="photos && photos.length > 0" style="position: relative; width: 100%; padding: 64px 24px 120px; text-align: center; background-color: transparent; overflow: hidden; z-index: 20; min-height: 100dvh; display: flex; flex-direction: column; justify-content: center;">
    <h2 :style="{ fontFamily: themeConfig.fontHeading, color: 'var(--theme-primary)', fontSize: 'clamp(36px, 6vw, 60px)', marginBottom: '32px', position: 'relative', zIndex: 10, letterSpacing: '0.025em', textShadow: '0 1px 2px rgba(0,0,0,0.05)' }">Our Gallery</h2>
    
    <div style="position: relative; z-index: 10; max-width: 64rem; margin: 0 auto;">
      <GalleryMasonryLayout :photos="photos" :api-base="apiBase" @open-lightbox="(i: number) => $emit('openLightbox', i)" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import type { Photo } from '@/types/invitation';
import GalleryMasonryLayout from './GalleryMasonryLayout.vue';

defineProps<{ photos: Photo[]; themeConfig: ThemeConfig; apiBase: string; }>();
defineEmits<{ (e: 'openLightbox', index: number): void; }>();
</script>


