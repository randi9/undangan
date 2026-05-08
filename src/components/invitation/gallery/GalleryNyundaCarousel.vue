<template>
  <section v-if="photos && photos.length > 0" style="padding: 60px 24px; text-align: center; background-color: #FFF8E7;">
    <h2 :style="{ fontFamily: themeConfig.fontHeading, color: '#5C3D2E', fontSize: '1.75rem', marginBottom: '32px' }">Galeri</h2>

    <div style="max-width: 500px; margin: 0 auto; overflow: hidden; position: relative;">
      <div style="display: flex; overflow-x: auto; gap: 12px; scroll-snap-type: x mandatory; padding-bottom: 8px;">
        <div
          v-for="(photo, index) in photos"
          :key="index"
          style="flex: 0 0 85%; scroll-snap-align: center; border-radius: 8px; overflow: hidden; cursor: pointer; background-color: #F5E6D0;"
          @click="$emit('openLightbox', index)"
        >
          <img :src="resolveAssetUrl(photo.url, apiBase)" :alt="photo.caption || 'Photo'" style="width: 100%; aspect-ratio: 4/3; object-fit: cover;" />
        </div>
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
