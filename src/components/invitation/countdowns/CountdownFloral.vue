<template>
  <section ref="sectionRef" v-if="hasDate" style="padding-top:40px;" class="py-10 pb-[15%] relative min-h-[50vh] flex flex-col items-center justify-start px-6 text-center bg-[var(--theme-surface)]">
    <div class="relative z-10 flex flex-col items-center w-full">
    <h2 class="text-[40px] md:text-4xl text-[var(--theme-primary)]" :style="{ fontFamily: themeConfig.fontHeading }">Menghitung Hari</h2>
    <p class="text-[var(--theme-text-light)] text-[15px] md:text-base tracking-widest uppercase mt-3 mb-2 font-medium">Menuju Momen Bahagia Kami</p>
    
    <!-- KONTROL JARAK BATU DI SINI -->
    <!-- Ubah nilai margin-top (misal 100px atau 15vh) untuk menaikkan/menurunkan posisi gerombolan batu dari teks judul -->
    <div class="flex justify-center mx-auto relative z-10 w-full" style="gap: 1.5rem; margin-top: 10vh;">
      <!-- HARI -->
      <div class="flex flex-col items-center w-20 relative" style="transform: translateY(-24px);">
        <img src="https://media.mengundanganda.fun/tema%20floral/coundown%20section/056232aa-9ebc-4947-b516-5af8bce4a006.webp" style="position: absolute; top: 40%; left: 50%; width: clamp(140px, 20vw, 210px); max-width: none; z-index: -1; transform: translate(-50%, -50%) rotate(15deg);" alt="Batu" />
        <div class="relative z-10" style="display: flex; justify-content: center; font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; color: white; filter: drop-shadow(0 4px 4px rgba(0,0,0,0.3)); margin-top:40px ; margin-bottom: 0.5rem; margin-right: 20px; font-family: sans-serif; opacity: 0.8;">
          <CountdownDigit 
            v-for="(digit, index) in formatNumber(countdown.days)" 
            :key="`days-${index}`" 
            :target="digit"
            :isIntersecting="isVisible"
          />
        </div>
        <div class="relative z-10" style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: white; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.5)); margin-top: 0.75rem; font-weight: 400;">Hari</div>
      </div>

      <!-- JAM -->
      <div class="flex flex-col items-center w-20 relative" style="transform: translateY(8px);">
        <img src="https://media.mengundanganda.fun/tema%20floral/coundown%20section/8c45a283-d7f7-4796-97fa-1b3285af5704.webp" style="position: absolute; top: 50%; left: 45%; width: clamp(120px, 20vw, 210px); max-width: none; z-index: -1; transform: translate(-50%, -50%) scaleX(-1) rotate(1deg);" alt="Batu" />
        <div class="relative z-10" style="display: flex; justify-content: center; font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; color: white; filter: drop-shadow(0 4px 4px rgba(0,0,0,0.3)); margin-top: 50px; margin-bottom: 0.5rem; margin-left: 0px; font-family: sans-serif; opacity: 0.8;">
          <CountdownDigit 
            v-for="(digit, index) in formatNumber(countdown.hours)" 
            :key="`hours-${index}`" 
            :target="digit"
            :isIntersecting="isVisible"
          />
        </div>
        <div class="relative z-10" style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: white; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.5)); margin-top: 0.75rem; font-weight: 400;">Jam</div>
      </div>

      <!-- MENIT -->
      <div class="flex flex-col items-center w-20 relative" style="transform: translateY(40px);">
        <img src="https://media.mengundanganda.fun/tema%20floral/coundown%20section/645bacff-96d1-4b96-a5eb-bac7f0abde17.webp" style="position: absolute; top: 40%; left: 50%; width: clamp(120px, 20vw, 210px); max-width: none; z-index: -1; transform: translate(-50%, -50%) rotate(18deg);" alt="Batu" />
        <div class="relative z-10" style="display: flex; justify-content: center; font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; color: white; filter: drop-shadow(0 4px 4px rgba(0,0,0,0.3)); margin-top: 40px; margin-bottom: 0.5rem; margin-right: 20px; font-family: sans-serif; opacity: 0.8;">
          <CountdownDigit 
            v-for="(digit, index) in formatNumber(countdown.minutes)" 
            :key="`minutes-${index}`" 
            :target="digit"
            :isIntersecting="isVisible"
          />
        </div>
        <div class="relative z-10" style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: white; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.5)); margin-top: 0.75rem; font-weight: 400;">Menit</div>
      </div>

      <!-- DETIK -->
      <div class="flex flex-col items-center w-20 relative" style="transform: translateY(80px);">
        <img src="https://media.mengundanganda.fun/tema%20floral/coundown%20section/2661a4af-72d1-4c94-8286-7e7723f6fab9.webp" style="position: absolute; top: 40%; left: 50%; width: clamp(120px, 20vw, 210px); max-width: none; z-index: -1; transform: translate(-50%, -50%) scaleX(-1) rotate(-10deg);" alt="Batu" />
        <div class="relative z-10" style="display: flex; justify-content: center; font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; color: white; filter: drop-shadow(0 4px 4px rgba(0,0,0,0.3)); margin-top: 40px; margin-bottom: 0.5rem; margin-left: 20px; font-family: sans-serif; opacity: 0.8;">
          <CountdownDigit 
            v-for="(digit, index) in formatNumber(countdown.seconds)" 
            :key="`seconds-${index}`" 
            :target="digit"
            :isIntersecting="isVisible"
          />
        </div>
        <div class="relative z-10" style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: white; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.5)); margin-top: 0.75rem; font-weight: 400;">Detik</div>
      </div>
    </div>
    </div>
    
    <img src="https://media.mengundanganda.fun/tema%20floral/coundown%20section/2bf93382-fff2-4180-8fa5-d91e7ed668be.webp" class="absolute bottom-0 left-0 w-full h-auto pointer-events-none z-0 transform -scale-x-100" alt="Floral Ornament Bottom" />
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import type { ThemeConfig } from '@/types/theme';
import CountdownDigit from './CountdownDigit.vue';

const props = defineProps<{
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  themeConfig: ThemeConfig;
  hasDate: boolean;
}>();

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (!entry) return;
    if (entry.isIntersecting) {
      isVisible.value = true;
      if (observer && sectionRef.value) observer.unobserve(sectionRef.value);
    }
  }, {
    threshold: 0.3 // Trigger when 30% of section is visible
  });

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

watch(sectionRef, (el) => {
  if (el && observer && !isVisible.value) {
    observer.observe(el);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

const formatNumber = (num: number) => {
  return num.toString().padStart(2, '0').split('');
};
</script>

