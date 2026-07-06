<template>
  <!-- Empty placeholder because this section is combined with the Footer for pinning -->
  <div class="hidden"></div>
</template>

<script setup lang="ts">
import type { ThemeConfig } from "@/types/theme";
import type { LoveStoryItem } from "@/types/invitation";

defineProps<{
  stories: LoveStoryItem[];
  themeConfig: ThemeConfig;
  apiBase: string;
}>();
</script>
