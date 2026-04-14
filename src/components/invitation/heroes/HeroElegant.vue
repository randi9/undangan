<template>
  <section class="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <img
        src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1080&q=80"
        alt="Cover Background"
        class="min-w-full min-h-full w-full h-full object-cover object-center scale-105"
      />
    </div>

    <!-- Gold corner ornaments -->
    <div ref="ornamentTL" class="absolute top-6 left-6 w-20 h-20 border-t-2 border-l-2 border-[var(--theme-secondary)] opacity-0 z-20 pointer-events-none"></div>
    <div ref="ornamentTR" class="absolute top-6 right-6 w-20 h-20 border-t-2 border-r-2 border-[var(--theme-secondary)] opacity-0 z-20 pointer-events-none"></div>
    <div ref="ornamentBL" class="absolute bottom-6 left-6 w-20 h-20 border-b-2 border-l-2 border-[var(--theme-secondary)] opacity-0 z-20 pointer-events-none"></div>
    <div ref="ornamentBR" class="absolute bottom-6 right-6 w-20 h-20 border-b-2 border-r-2 border-[var(--theme-secondary)] opacity-0 z-20 pointer-events-none"></div>

    <!-- Content Slot -->
    <div class="relative z-10 w-full max-w-2xl mx-auto py-20 flex justify-center text-white">
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

const ornamentTL = ref<HTMLElement | null>(null);
const ornamentTR = ref<HTMLElement | null>(null);
const ornamentBL = ref<HTMLElement | null>(null);
const ornamentBR = ref<HTMLElement | null>(null);

onMounted(() => {
  const ornaments = [ornamentTL.value, ornamentTR.value, ornamentBL.value, ornamentBR.value];
  if (ornaments.some(el => !el)) return;

  // Elegant fade-in with scale for corner frames
  gsap.fromTo(ornaments, {
    opacity: 0,
    scale: 0.7,
  }, {
    opacity: 0.6,
    scale: 1,
    duration: 1.5,
    ease: 'power2.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger: ornamentTL.value,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });

  // Subtle shimmer on loop
  gsap.to(ornaments, {
    opacity: 0.4,
    duration: 2,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    stagger: 0.3,
    delay: 2,
  });
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
