<template>
  <section v-if="stories.length > 0" class="py-20 px-6 max-w-3xl mx-auto text-center bg-[var(--theme-surface)] rounded-3xl mb-24">
    <h2 class="text-3xl md:text-4xl mb-2 text-[var(--theme-primary)]" :style="{ fontFamily: themeConfig.fontHeading }">Love Story</h2>
    <div class="flex items-center justify-center gap-4 mb-16 text-[var(--theme-secondary)]">
      <div class="h-px w-12 bg-[var(--theme-secondary)] opacity-50"></div>
      <span class="text-xl">💕</span>
      <div class="h-px w-12 bg-[var(--theme-secondary)] opacity-50"></div>
    </div>
    
    <div class="relative">
      <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[var(--theme-secondary)] opacity-30 md:-translate-x-1/2"></div>
      <div v-for="(story, i) in stories" :key="i" class="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 mb-12 last:mb-0">
        <div class="md:w-1/2 md:pr-12 text-left md:text-right w-full pl-12 md:pl-0">
          <div class="font-bold text-[var(--theme-primary)] text-sm mb-1" :style="{ fontFamily: themeConfig.fontHeading }">{{ story.date }}</div>
        </div>
        <div class="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[var(--theme-secondary)] border-4 border-[var(--theme-surface)] -translate-x-[7px] md:-translate-x-1/2 mt-0.5 md:mt-0 z-10"></div>
        <div class="md:w-1/2 md:pl-12 text-left w-full pl-12 md:pl-0">
          <h4 class="font-bold text-lg text-[var(--theme-primary)] mb-2">{{ story.title }}</h4>
          <p class="text-sm text-[var(--theme-text-light)] leading-relaxed">{{ story.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import type { LoveStoryItem } from '@/types/invitation';

defineProps<{
  stories: LoveStoryItem[];
  themeConfig: ThemeConfig;
}>();
</script>
