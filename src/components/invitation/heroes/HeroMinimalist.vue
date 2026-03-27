<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1080&q=80"
        alt="Cover Background"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0" :style="{ background: overlayGradient }"></div>
    </div>

    <!-- Minimal line accents -->
    <div ref="lineTop" class="absolute top-12 left-1/2 -translate-x-1/2 w-0 h-px bg-white/50 z-20 pointer-events-none"></div>
    <div ref="lineBottom" class="absolute bottom-12 left-1/2 -translate-x-1/2 w-0 h-px bg-white/50 z-20 pointer-events-none"></div>

    <!-- Content Slot -->
    <div class="relative z-10 text-white w-full max-w-2xl mx-auto py-20">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  overlayGradient: string;
}>();

const lineTop = ref<HTMLElement | null>(null);
const lineBottom = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!lineTop.value || !lineBottom.value) return;

  // Clean line expansion animation
  gsap.to([lineTop.value, lineBottom.value], {
    width: '40%',
    duration: 1.5,
    ease: 'power2.inOut',
    stagger: 0.3,
    scrollTrigger: {
      trigger: lineTop.value,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
