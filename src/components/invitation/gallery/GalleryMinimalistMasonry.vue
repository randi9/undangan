<template>
  <section v-if="photos && photos.length > 0" class="pt-12 pb-24 px-6 max-w-5xl mx-auto text-center">
    <h2 class="text-3xl md:text-5xl mb-8 text-[var(--theme-primary)]" :style="{ fontFamily: themeConfig.fontHeading }">Our Gallery</h2>
    
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
