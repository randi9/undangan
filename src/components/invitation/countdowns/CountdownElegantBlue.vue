<template>
  <section v-if="hasDate" class="relative w-full aspect-square px-4 md:px-6 flex flex-col justify-start items-center text-center overflow-hidden bg-cover bg-center" style="background-image: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.7)), url('https://media.mengundanganda.com/elegant_blue/counter%20section/sashkeh_13981e70-5a12-4fee-afd6-933ade9180f5.webp')">
    <img src="https://media.mengundanganda.com/elegant_blue/counter%20section/sashkeh_4975839d-8e5c-4226-a1da-b47f64878474.webp" alt="decoration" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 pointer-events-none z-0 mix-blend-multiply opacity-90" />
    <!-- Header -->
    <h2 class="relative z-10 text-3xl md:text-5xl mb-1 text-[#F8F9FA] tracking-widest" :style="{ fontFamily: themeConfig.fontHeading, marginTop: '5%', textShadow: '1px 2px 2px rgba(0, 0, 0, 0.4)' }">Menghitung Hari</h2>
    <p class="relative z-10 text-sm md:text-base text-[#F8F9FA] tracking-widest font-light mb-8" style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);">menuju momen bahagia kami</p>
    
    <!-- Flip Clock Container -->
    <div class="relative z-10 flex justify-center gap-3 md:gap-8 max-w-2xl mx-auto">
      
      <!-- Days -->
      <div class="flex flex-col items-center">
        <div class="flex gap-1 mb-4 shadow-2xl shadow-black/20 rounded-md">
          <CountdownFlipDigit v-for="(d, idx) in padDigit(countdown.days)" :key="'day-'+idx" :target="d" />
        </div>
        <div class="text-[10px] md:text-xs tracking-widest uppercase text-black/60 font-light" style="font-size: 14px; margin-top: 10px;">Hari</div>
      </div>
      
      <!-- Colon Separator -->
      <div class="flex flex-col items-center justify-start pt-3 md:pt-4">
        <span class="text-2xl md:text-4xl text-black/30 font-bold">:</span>
      </div>

      <!-- Hours -->
      <div class="flex flex-col items-center">
        <div class="flex gap-1 mb-4 shadow-2xl shadow-black/20 rounded-md">
          <CountdownFlipDigit v-for="(d, idx) in padDigit(countdown.hours)" :key="'hour-'+idx" :target="d" />
        </div>
        <div class="text-[10px] md:text-xs tracking-widest uppercase text-black/60 font-light" style="font-size: 14px; margin-top: 10px;">Jam</div>
      </div>

      <div class="flex flex-col items-center justify-start pt-3 md:pt-4">
        <span class="text-2xl md:text-4xl text-black/30 font-bold">:</span>
      </div>

      <!-- Minutes -->
      <div class="flex flex-col items-center">
        <div class="flex gap-1 mb-4 shadow-2xl shadow-black/20 rounded-md">
          <CountdownFlipDigit v-for="(d, idx) in padDigit(countdown.minutes)" :key="'min-'+idx" :target="d" />
        </div>
        <div class="text-[10px] md:text-xs tracking-widest uppercase text-black/60 font-light" style="font-size: 14px; margin-top: 10px;">Menit</div>
      </div>

      <div class="flex flex-col items-center justify-start pt-3 md:pt-4">
        <span class="text-2xl md:text-4xl text-black/30 font-bold">:</span>
      </div>

      <!-- Seconds -->
      <div class="flex flex-col items-center">
        <div class="flex gap-1 mb-4 shadow-2xl shadow-black/20 rounded-md">
          <CountdownFlipDigit v-for="(d, idx) in padDigit(countdown.seconds)" :key="'sec-'+idx" :target="d" />
        </div>
        <div class="text-[10px] md:text-xs tracking-widest uppercase text-black/60 font-light" style="font-size: 14px; margin-top: 10px;">Detik</div>
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
