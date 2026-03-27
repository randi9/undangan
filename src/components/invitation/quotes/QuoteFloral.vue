<template>
  <section v-if="quote" class="h-screen flex items-center justify-center py-20 px-6 text-center">
    <div class="rounded-lg bg-[var(--theme-secondary)] aspect-square w-[calc(100%-2rem)] max-w-[400px] mx-auto flex items-center justify-center shadow-2xl">
      <blockquote class="w-10/12 md:w-3/4 lg:w-2/3 mx-auto text-sm md:text-base italic font-light text-[var(--theme-surface)] leading-relaxed tracking-[0.2em] break-words">
         "{{ quote }}"
      </blockquote>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';

defineProps<{
  quote: string;
  themeConfig: ThemeConfig;
}>();
</script>
