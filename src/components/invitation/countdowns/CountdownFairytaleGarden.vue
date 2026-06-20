<template>
  <section v-if="hasDate" ref="countdownSection" class="py-24 px-6 text-center relative overflow-hidden bg-[#F8F3EE]">
    <!-- Warm subtle fairytale gradient -->
    <div class="absolute inset-0 w-full h-full bg-gradient-to-b from-[#F8F3EE] via-[#EBCFD1]/10 to-[#F8F3EE] -z-10"></div>
    
    <div ref="headerRef" class="opacity-0 translate-y-6 mb-16 relative z-10">
      <h2 class="text-3xl md:text-4xl font-normal tracking-wide text-[#6A4E42] mb-4" :style="{ fontFamily: themeConfig.fontHeading }">Menghitung Hari</h2>
      <div class="flex items-center justify-center gap-4">
        <div class="h-[1px] w-8 bg-[#AEB8A3]"></div>
        <div class="w-2 h-2 rounded-full bg-[#D9A9AF]"></div>
        <div class="h-[1px] w-8 bg-[#AEB8A3]"></div>
      </div>
    </div>
    
    <div class="flex justify-center gap-4 md:gap-6 max-w-lg mx-auto relative z-10">
      <div v-for="(unit, idx) in units" :key="unit.label" 
        :ref="el => { if (el) digitRefs[idx] = el as HTMLElement }"
        class="flex flex-col items-center opacity-0 translate-y-8"
      >
        <!-- Card with Blush Pink background and Dark Brown border -->
        <div class="relative w-[70px] md:w-[85px] aspect-square rounded-2xl bg-white border border-[#EBCFD1] shadow-[0_8px_30px_rgba(106,78,66,0.06)] flex items-center justify-center mb-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(106,78,66,0.12)]">
          <span class="text-3xl md:text-4xl font-normal tracking-tight text-[#6A4E42] tabular-nums" 
            :style="{ fontFamily: themeConfig.fontHeading }"
          >{{ unit.value }}</span>
        </div>
        <span class="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[#9A7B6B] font-medium">{{ unit.label }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  themeConfig: ThemeConfig;
  hasDate: boolean;
}>();

const countdownSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const digitRefs = ref<HTMLElement[]>([]);

const units = computed(() => [
  { value: props.countdown.days, label: 'Hari' },
  { value: props.countdown.hours, label: 'Jam' },
  { value: props.countdown.minutes, label: 'Menit' },
  { value: props.countdown.seconds, label: 'Detik' },
]);

onMounted(() => {
  if (!countdownSection.value) return;

  // Header entrance
  gsap.to(headerRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: countdownSection.value,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });

  // Digit cards stagger entrance
  gsap.to(digitRefs.value, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger: countdownSection.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
