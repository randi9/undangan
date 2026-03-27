<template>
  <section v-if="hasDate" class="py-20 px-6 text-center bg-[var(--theme-surface)]">
    <h2 class="text-3xl md:text-4xl mb-2 text-[var(--theme-primary)]" :style="{ fontFamily: themeConfig.fontHeading }">Menghitung Hari</h2>
    <div class="flex items-center justify-center gap-4 mb-12 text-[var(--theme-secondary)]">
      <div class="h-px w-12 bg-[var(--theme-secondary)] opacity-50"></div>
      <span class="text-xl">⏳</span>
      <div class="h-px w-12 bg-[var(--theme-secondary)] opacity-50"></div>
    </div>
    
    <div class="flex justify-center gap-4 md:gap-8 max-w-lg mx-auto">
      <div class="flex flex-col items-center w-20">
        <div class="text-4xl md:text-5xl font-bold text-[var(--theme-primary)] mb-2" :style="{ fontFamily: themeConfig.fontHeading }">{{ countdown.days }}</div>
        <div class="text-xs tracking-widest uppercase text-[var(--theme-text-light)]">Hari</div>
      </div>
      <div class="flex flex-col items-center w-20">
        <div class="text-4xl md:text-5xl font-bold text-[var(--theme-primary)] mb-2" :style="{ fontFamily: themeConfig.fontHeading }">{{ countdown.hours }}</div>
        <div class="text-xs tracking-widest uppercase text-[var(--theme-text-light)]">Jam</div>
      </div>
      <div class="flex flex-col items-center w-20">
        <div class="text-4xl md:text-5xl font-bold text-[var(--theme-primary)] mb-2" :style="{ fontFamily: themeConfig.fontHeading }">{{ countdown.minutes }}</div>
        <div class="text-xs tracking-widest uppercase text-[var(--theme-text-light)]">Menit</div>
      </div>
      <div class="flex flex-col items-center w-20">
        <div class="text-4xl md:text-5xl font-bold text-[var(--theme-primary)] mb-2" :style="{ fontFamily: themeConfig.fontHeading }">{{ countdown.seconds }}</div>
        <div class="text-xs tracking-widest uppercase text-[var(--theme-text-light)]">Detik</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';

const props = defineProps<{
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  themeConfig: ThemeConfig;
  hasDate: boolean;
}>();
</script>
