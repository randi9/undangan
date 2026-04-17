<template>
  <section v-if="quote" ref="quoteSection" class="min-h-[60vh] flex items-center justify-center py-24 px-6 text-center relative overflow-hidden bg-white">
    <!-- Minimalist Background Accent -->
    <div class="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-50 to-white -z-10"></div>
    <div ref="lineAccent" class="absolute top-1/2 left-0 w-0 h-[1px] bg-gray-200 -z-10 transform -translate-y-1/2"></div>
    
    <div class="w-full max-w-[600px] mx-auto flex flex-col items-center">
      <div ref="quoteIcon" class="mb-10 opacity-0 scale-50">
         <svg class="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
           <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
         </svg>
      </div>
      
      <blockquote ref="quoteTextRef" class="text-lg md:text-xl font-light text-gray-600 leading-relaxed md:leading-loose tracking-wide break-words whitespace-pre-line opacity-0 relative z-10">
         {{ quote }}
      </blockquote>
      
      <div ref="quoteLine" class="w-0 h-[1px] bg-gray-300 mt-10"></div>
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
const quoteIcon = ref<HTMLElement | null>(null);
const quoteTextRef = ref<HTMLElement | null>(null);
const lineAccent = ref<HTMLElement | null>(null);
const quoteLine = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!quoteSection.value || !quoteTextRef.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: quoteSection.value,
      start: 'top 75%',
      toggleActions: 'play none none none',
    }
  });

  // Flowing minimalist animation
  tl.to(lineAccent.value, {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut'
    })
    .to(quoteIcon.value, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.5)'
    }, "-=1.0")
    .to(quoteTextRef.value, {
      opacity: 1,
      y: -10,
      duration: 1.2,
      ease: 'power3.out'
    }, "-=0.6")
    .to(quoteLine.value, {
      width: '40px',
      duration: 0.8,
      ease: 'power2.out'
    }, "-=0.4");
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
