<template>
  <section v-if="quote" ref="quoteSection" class="min-h-[50vh] flex items-center justify-center py-20 px-6 text-center relative overflow-hidden bg-[#F8F3EE]">
    <!-- Thin romantic outline border -->
    <div ref="borderBox" class="absolute inset-8 border border-[#9A7B6B]/20 rounded-[2rem] -z-10 pointer-events-none opacity-0"></div>
    
    <div class="w-full max-w-[600px] mx-auto flex flex-col items-center relative z-10">
      <!-- Quote Icon -->
      <div ref="quoteIcon" class="mb-8 opacity-0 scale-50 text-[#D9A9AF]">
        <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      
      <!-- Quote Content -->
      <blockquote ref="quoteTextRef" class="text-lg md:text-xl font-light text-[#6A4E42] leading-relaxed md:leading-loose tracking-wide break-words whitespace-pre-line opacity-0" :style="{ fontFamily: themeConfig.fontBody }">
        {{ quote }}
      </blockquote>
      
      <!-- Bottom Accent Line -->
      <div ref="quoteLine" class="w-0 h-[1px] bg-[#D9A9AF] mt-8"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  quote: string;
  themeConfig: ThemeConfig;
}>();

const quoteSection = ref<HTMLElement | null>(null);
const borderBox = ref<HTMLElement | null>(null);
const quoteIcon = ref<HTMLElement | null>(null);
const quoteTextRef = ref<HTMLElement | null>(null);
const quoteLine = ref<HTMLElement | null>(null);

let tl: gsap.core.Timeline | null = null;

onMounted(() => {
  if (!quoteSection.value) return;

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: quoteSection.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(borderBox.value, {
    opacity: 1,
    scale: 1,
    duration: 1.2,
    ease: 'power3.out'
  })
  .to(quoteIcon.value, {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: 'back.out(1.5)'
  }, "-=0.8")
  .to(quoteTextRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.0,
    ease: 'power2.out'
  }, "-=0.4")
  .to(quoteLine.value, {
    width: '60px',
    duration: 0.8,
    ease: 'power2.out'
  }, "-=0.4");
});

onBeforeUnmount(() => {
  if (tl) tl.kill();
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
