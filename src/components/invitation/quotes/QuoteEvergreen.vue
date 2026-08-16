<template>
  <section 
    v-if="quote" 
    ref="quoteSection" 
    class="min-h-[50dvh] flex items-center justify-center py-20 px-6 text-center relative overflow-hidden bg-[#F2F5F3]"
  >
    <!-- Background Card -->
    <div class="w-full max-w-2xl mx-auto relative z-10">
      <div 
        ref="quoteCard"
        class="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-[#8B9E8B]/30 shadow-[0_8px_30px_rgba(45,62,53,0.04)] flex flex-col items-center opacity-0 translate-y-8"
      >
        <!-- Leaf Icon -->
        <div ref="quoteIcon" class="mb-6 text-[#4A6B5B] opacity-0 scale-50">
          <svg class="w-8 h-8 md:w-10 md:h-10 opacity-70" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        <blockquote 
          ref="quoteTextRef" 
          class="text-base md:text-xl font-serif italic text-[#2D3E35] leading-relaxed md:leading-loose tracking-wide whitespace-pre-line opacity-0"
          style="font-family: 'Cormorant Garamond', Georgia, serif;"
        >
          {{ quote }}
        </blockquote>

        <div ref="quoteLine" class="w-0 h-[1px] bg-[#7A9A8B]/40 mt-8"></div>
      </div>
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
const quoteCard = ref<HTMLElement | null>(null);
const quoteIcon = ref<HTMLElement | null>(null);
const quoteTextRef = ref<HTMLElement | null>(null);
const quoteLine = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!quoteSection.value || !quoteCard.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: quoteSection.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(quoteCard.value, {
    opacity: 1,
    y: 0,
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
    duration: 1.0,
    ease: 'power2.out'
  }, "-=0.6")
  .to(quoteLine.value, {
    width: '60px',
    duration: 0.8,
    ease: 'power2.out'
  }, "-=0.4");
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
