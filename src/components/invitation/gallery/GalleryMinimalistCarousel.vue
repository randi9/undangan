<template>
  <section v-if="photos && photos.length > 0" class="pt-12 pb-24 px-6 max-w-5xl mx-auto text-center">
    <h2 class="text-3xl md:text-5xl mb-8 text-[var(--theme-primary)]" :style="{ fontFamily: themeConfig.fontHeading }">Our Gallery</h2>
    
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
