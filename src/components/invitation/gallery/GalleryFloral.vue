<template>
  <component 
    :is="activeComponent" 
    :photos="photos"
    :theme-config="themeConfig"
    :api-base="apiBase"
    @open-lightbox="(i: number) => $emit('openLightbox', i)"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ThemeConfig } from '@/types/theme';
import type { Photo } from '@/types/invitation';
import GalleryFloralCarousel from './GalleryFloralCarousel.vue';
import GalleryFloralMasonry from './GalleryFloralMasonry.vue';

const props = defineProps<{
  photos: Photo[];
  themeConfig: ThemeConfig;
  apiBase: string;
  galleryType?: 'carousel' | 'masonry';
}>();

defineEmits<{
  (e: 'openLightbox', index: number): void;
}>();

const activeComponent = computed(() => {
  return props.galleryType === 'masonry' ? GalleryFloralMasonry : GalleryFloralCarousel;
});
</script>
