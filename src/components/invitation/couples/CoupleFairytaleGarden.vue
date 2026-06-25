<template>
  <!-- Combined into Hero/Quotes pinned timeline in HeroFairytaleGarden.vue for fairytale garden theme -->
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';

defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
  apiBase: string;
}>();
</script>

