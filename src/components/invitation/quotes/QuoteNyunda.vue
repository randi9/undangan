<template>
  <section v-if="quote" style="min-height: 60dvh; display: flex; align-items: center; justify-content: center; padding: 60px 24px; text-align: center; background-color: #F5E6D0;">
    <blockquote style="font-size: 1rem; font-style: italic; color: #5C3D2E; line-height: 1.8; max-width: 400px; margin: 0 auto;">
      "{{ quote }}"
    </blockquote>
  </section>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';

defineProps<{
  quote: string;
  themeConfig: ThemeConfig;
}>();
</script>
