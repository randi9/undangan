<template>
  <!-- Empty placeholder because this section is combined with the Footer for pinning -->
  <div class="hidden"></div>
</template>

<script setup lang="ts">
import type { ThemeConfig } from "@/types/theme";
import type { Photo } from "@/types/invitation";

defineProps<{
  photos: Photo[];
  themeConfig: ThemeConfig;
  apiBase: string;
  galleryType?: 'carousel' | 'masonry';
}>();

defineEmits<{
  (e: 'openLightbox', index: number): void;
}>();
</script>
