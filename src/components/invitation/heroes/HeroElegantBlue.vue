<template>
  <section ref="heroSection" class="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#f3f7f9]">
    <!-- Background wrapper set to 200vh to spill over seamlessly into the Quote Section -->
    <div class="absolute top-0 left-0 w-full h-[200vh] z-0 overflow-hidden pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-b from-[var(--theme-primary)]/25 to-transparent z-10 w-full h-full mix-blend-multiply"></div>
      
      <!-- Staggered/Zigzag Damask Pattern using SVG -->
      <svg class="absolute inset-0 w-full h-full opacity-100">
        <defs>
          <pattern id="elegant-damask-pattern" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
            <!-- Center image -->
            <image href="https://media.mengundanganda.com/desain%20web%20elegan%20blue%20(5).png" x="35" y="35" width="110" height="110" />
            <!-- Corner images (all facing upwards) -->
            <image href="https://media.mengundanganda.com/desain%20web%20elegan%20blue%20(5).png" x="-55" y="-55" width="110" height="110" />
            <image href="https://media.mengundanganda.com/desain%20web%20elegan%20blue%20(5).png" x="125" y="-55" width="110" height="110" />
            <image href="https://media.mengundanganda.com/desain%20web%20elegan%20blue%20(5).png" x="-55" y="125" width="110" height="110" />
            <image href="https://media.mengundanganda.com/desain%20web%20elegan%20blue%20(5).png" x="125" y="125" width="110" height="110" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#elegant-damask-pattern)" />
        <rect width="100%" height="100%" fill="url(#elegant-damask-pattern)" opacity="0.4" />
      </svg>
    </div>
    <!-- FULL SCREEN OVAL MASK (PASSEPARTOUT) -->
    <div class="hero-oval absolute top-6 bottom-6 left-6 right-6 md:top-8 md:bottom-8 md:left-8 md:right-8 z-[14] pointer-events-none rounded-[1000px] opacity-0" style="box-shadow: 0 0 0 200vmax #fffdf5; will-change: transform, opacity"></div>

    <div class="relative z-20 w-full max-w-2xl mx-auto py-20 flex justify-center text-[var(--theme-text)] hero-content-elegant">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

defineProps<{
  overlayGradient: string;
}>();

const heroSection = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!heroSection.value) return;

  const oval = heroSection.value.querySelector('.hero-oval');

  gsap.set(oval, { opacity: 0, scale: 2 }); // Starts highly expanded so the "hole" is outside the screen

  // Timeline with initial delay waiting for cover to open
  const tl = gsap.timeline({ delay: 1.5 });

  // Animasi frame mengerucut dari luar layar ke dalam
  tl.to(oval, {
    opacity: 1, // Pure solid color
    scale: 1,
    duration: 3,
    ease: "power2.out"
  });
});
</script>
