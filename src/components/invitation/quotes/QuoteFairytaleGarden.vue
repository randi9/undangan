<template>
  <!-- Combined into Hero section for Fairytale Garden theme to support background pinning -->
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';

defineProps<{
  quote: string;
  themeConfig: ThemeConfig;
}>();
</script>
