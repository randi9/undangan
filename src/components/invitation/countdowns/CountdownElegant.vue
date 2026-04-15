<template>
  <section v-if="hasDate" ref="countdownSection" class="py-20 px-6 text-center" :style="{ backgroundColor: 'var(--theme-surface)' }">
    <!-- Section Header -->
    <div ref="headerRef" class="opacity-0 translate-y-4">
      <h2 class="text-3xl md:text-4xl mb-3" :style="{ fontFamily: themeConfig.fontHeading, color: 'var(--theme-primary)' }">Menghitung Hari</h2>
      <div class="flex items-center justify-center gap-4 mb-12">
        <svg viewBox="0 0 60 2" class="w-10" style="opacity: 0.35;"><rect width="60" height="1.5" rx="0.75" fill="var(--theme-secondary)"/></svg>
        <svg viewBox="0 0 24 24" class="w-5 h-5" style="opacity: 0.4;">
          <circle cx="12" cy="12" r="10" fill="none" stroke="var(--theme-secondary)" stroke-width="1.5"/>
          <path d="M12 6 L12 12 L16 14" stroke="var(--theme-secondary)" stroke-width="1.5" stroke-linecap="round" fill="none"/>
        </svg>
        <svg viewBox="0 0 60 2" class="w-10" style="opacity: 0.35;"><rect width="60" height="1.5" rx="0.75" fill="var(--theme-secondary)"/></svg>
      </div>
    </div>
    
    <div class="flex justify-center gap-3 md:gap-5 max-w-lg mx-auto">
      <div v-for="(unit, idx) in units" :key="unit.label" 
        :ref="el => { if (el) digitRefs[idx] = el as HTMLElement }"
        class="flex flex-col items-center opacity-0 translate-y-6"
      >
        <!-- Digit card with gold border -->
        <div class="relative w-[72px] md:w-[88px] aspect-square rounded-xl flex items-center justify-center mb-3 overflow-hidden"
          :style="{
            background: `linear-gradient(135deg, rgba(201,169,110,0.06), rgba(201,169,110,0.02))`,
            border: '1.5px solid rgba(201,169,110,0.25)',
            boxShadow: '0 4px 16px rgba(139,111,78,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
          }"
        >
          <!-- Gold shimmer accent -->
          <div class="absolute top-0 left-0 w-full h-px" style="background: linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent);"></div>
          
          <span class="text-4xl md:text-5xl font-bold tabular-nums" 
            :style="{ fontFamily: themeConfig.fontHeading, color: 'var(--theme-primary)' }"
          >{{ unit.value }}</span>
        </div>
        <span class="text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium" :style="{ color: 'var(--theme-text-light)' }">{{ unit.label }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
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
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: countdownSection.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // Digit cards stagger entrance
  gsap.to(digitRefs.value, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'back.out(1.2)',
    stagger: 0.12,
    scrollTrigger: {
      trigger: countdownSection.value,
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  });
});
</script>
