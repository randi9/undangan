<template>
  <section v-if="photos && photos.length > 0" class="py-24 px-6 max-w-5xl mx-auto text-center">
    <h2 class="text-3xl md:text-5xl mb-2 text-[var(--theme-primary)]" :style="{ fontFamily: themeConfig.fontHeading }">Galeri</h2>
    <div class="flex items-center justify-center gap-4 mb-12 text-[var(--theme-secondary)]">
      <div class="h-px w-16 bg-[var(--theme-secondary)] opacity-50"></div>
      <span class="text-xl">📸</span>
      <div class="h-px w-16 bg-[var(--theme-secondary)] opacity-50"></div>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      <div v-for="(photo, i) in photos" :key="i" @click="$emit('openLightbox', i)" class="aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all">
        <img :src="resolveAssetUrl(photo.url, apiBase)" alt="Galeri Photo" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import type { Photo } from '@/types/invitation';
import { resolveAssetUrl } from '@/utils/url';

defineProps<{
  photos: Photo[];
  themeConfig: ThemeConfig;
  apiBase: string;
}>();

defineEmits<{
  (e: 'openLightbox', index: number): void;
}>();
</script>
