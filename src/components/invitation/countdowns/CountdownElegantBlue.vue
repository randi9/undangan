<template>
  <section v-if="hasDate" class="py-20 px-4 md:px-6 text-center bg-[#405C66] overflow-hidden">
    <!-- Header -->
    <h2 class="text-3xl md:text-5xl mb-2 text-[#F8F9FA] drop-shadow-sm tracking-widest" :style="{ fontFamily: themeConfig.fontHeading }">Menghitung Hari</h2>
    <div class="flex items-center justify-center gap-4 mb-16 text-white/50">
      <div class="h-px w-16 bg-white/30" />
      <span class="text-xl">⏳</span>
      <div class="h-px w-16 bg-white/30" />
    </div>
    
    <!-- Flip Clock Container -->
    <div class="flex justify-center gap-3 md:gap-8 max-w-2xl mx-auto">
      
      <!-- Days -->
      <div class="flex flex-col items-center">
        <div class="flex gap-1 mb-4 shadow-2xl shadow-black/20 rounded-md">
          <CountdownFlipDigit v-for="(d, idx) in padDigit(countdown.days)" :key="'day-'+idx" :target="d" />
        </div>
        <div class="text-[10px] md:text-xs tracking-widest uppercase text-blue-100/70 font-light">Hari</div>
      </div>
      
      <!-- Colon Separator -->
      <div class="flex flex-col items-center justify-start pt-3 md:pt-4">
        <span class="text-2xl md:text-4xl text-white/40 font-bold">:</span>
      </div>

      <!-- Hours -->
      <div class="flex flex-col items-center">
        <div class="flex gap-1 mb-4 shadow-2xl shadow-black/20 rounded-md">
          <CountdownFlipDigit v-for="(d, idx) in padDigit(countdown.hours)" :key="'hour-'+idx" :target="d" />
        </div>
        <div class="text-[10px] md:text-xs tracking-widest uppercase text-blue-100/70 font-light">Jam</div>
      </div>

      <div class="flex flex-col items-center justify-start pt-3 md:pt-4">
        <span class="text-2xl md:text-4xl text-white/40 font-bold">:</span>
      </div>

      <!-- Minutes -->
      <div class="flex flex-col items-center">
        <div class="flex gap-1 mb-4 shadow-2xl shadow-black/20 rounded-md">
          <CountdownFlipDigit v-for="(d, idx) in padDigit(countdown.minutes)" :key="'min-'+idx" :target="d" />
        </div>
        <div class="text-[10px] md:text-xs tracking-widest uppercase text-blue-100/70 font-light">Menit</div>
      </div>

      <div class="flex flex-col items-center justify-start pt-3 md:pt-4">
        <span class="text-2xl md:text-4xl text-white/40 font-bold">:</span>
      </div>

      <!-- Seconds -->
      <div class="flex flex-col items-center">
        <div class="flex gap-1 mb-4 shadow-2xl shadow-black/20 rounded-md">
          <CountdownFlipDigit v-for="(d, idx) in padDigit(countdown.seconds)" :key="'sec-'+idx" :target="d" />
        </div>
        <div class="text-[10px] md:text-xs tracking-widest uppercase text-blue-100/70 font-light">Detik</div>
      </div>
      
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import CountdownFlipDigit from './CountdownFlipDigit.vue';

const props = defineProps<{
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  themeConfig: ThemeConfig;
  hasDate: boolean;
}>();

// Ensure double digits (e.g. 5 -> '05') and split into individual character array
const padDigit = (val: number) => {
  return val.toString().padStart(2, '0').split('');
};
</script>
