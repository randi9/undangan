<template>
  <!-- Empty placeholder since Events and Countdown are combined in CountdownFloralBlue.vue -->
  <div style="display: none;"></div>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';

const props = defineProps<{ 
  invitation: Invitation; 
  themeConfig: ThemeConfig; 
}>();
</script>
