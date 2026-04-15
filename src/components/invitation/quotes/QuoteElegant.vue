<template>
  <section v-if="quote" ref="quoteSection" class="relative py-24 px-6 text-center overflow-hidden" :style="{ backgroundColor: 'var(--theme-surface)' }">
    
    <!-- Decorative top border SVG -->
    <div class="absolute top-0 left-0 w-full flex justify-center pointer-events-none">
      <svg viewBox="0 0 400 30" class="w-[80%] max-w-[400px]" style="opacity: 0.25;">
        <line x1="0" y1="15" x2="170" y2="15" stroke="var(--theme-secondary)" stroke-width="1"/>
        <circle cx="185" cy="15" r="4" fill="none" stroke="var(--theme-secondary)" stroke-width="1"/>
        <circle cx="200" cy="15" r="6" fill="none" stroke="var(--theme-secondary)" stroke-width="1.2"/>
        <circle cx="215" cy="15" r="4" fill="none" stroke="var(--theme-secondary)" stroke-width="1"/>
        <line x1="230" y1="15" x2="400" y2="15" stroke="var(--theme-secondary)" stroke-width="1"/>
      </svg>
    </div>

    <!-- Big decorative quote mark -->
    <div ref="quoteMarkRef" class="opacity-0" style="font-size: clamp(80px, 15vw, 140px); line-height: 1; margin-bottom: -20px; font-family: Georgia, serif;" :style="{ color: 'var(--theme-secondary)', opacity: 0 }">
      "
    </div>

    <!-- Quote text -->
    <div ref="quoteTextRef" class="opacity-0 translate-y-6">
      <blockquote 
        class="max-w-lg mx-auto text-sm md:text-base italic font-light leading-relaxed tracking-[0.1em] break-words whitespace-pre-line px-4"
        :style="{ color: 'var(--theme-text)', fontFamily: themeConfig.fontHeading }"
      >
        {{ quote }}
      </blockquote>
    </div>

    <!-- Decorative bottom border SVG -->
    <div ref="bottomOrnamentRef" class="mt-10 flex justify-center opacity-0">
      <svg viewBox="0 0 200 20" class="w-[50%] max-w-[200px]" style="opacity: 0.3;">
        <line x1="0" y1="10" x2="80" y2="10" stroke="var(--theme-secondary)" stroke-width="1"/>
        <path d="M85 10 L100 3 L115 10 L100 17 Z" fill="none" stroke="var(--theme-secondary)" stroke-width="1"/>
        <line x1="120" y1="10" x2="200" y2="10" stroke="var(--theme-secondary)" stroke-width="1"/>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  quote: string;
  themeConfig: ThemeConfig;
}>();

const quoteSection = ref<HTMLElement | null>(null);
const quoteMarkRef = ref<HTMLElement | null>(null);
const quoteTextRef = ref<HTMLElement | null>(null);
const bottomOrnamentRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!quoteSection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: quoteSection.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  // 1. Quote mark drops in
  tl.to(quoteMarkRef.value, {
    opacity: 0.15,
    y: 0,
    duration: 1,
    ease: 'power2.out',
  });

  // 2. Quote text fades up
  tl.to(quoteTextRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out',
  }, '-=0.6');

  // 3. Bottom ornament fades in
  tl.to(bottomOrnamentRef.value, {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.4');
});
</script>
