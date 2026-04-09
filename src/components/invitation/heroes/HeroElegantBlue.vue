<template>
  <section ref="heroSection" class="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-white">
    <!-- Background wrapper set to 200vh to spill over seamlessly into the Quote Section -->
    <div class="absolute top-0 left-0 w-full h-[200vh] z-0 overflow-hidden pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-b from-[var(--theme-primary)]/10 to-transparent z-10 w-full h-full mix-blend-multiply"></div>
      
      <!-- Staggered/Zigzag Damask Pattern using SVG -->
      <svg class="absolute inset-0 w-full h-full opacity-100">
        <defs>
          <pattern id="elegant-damask-pattern" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
            <!-- Center image -->
            <image href="https://media.mengundanganda.fun/desain%20web%20elegan%20blue%20(5).png" x="35" y="35" width="110" height="110" />
            <!-- Corner images (all facing upwards) -->
            <image href="https://media.mengundanganda.fun/desain%20web%20elegan%20blue%20(5).png" x="-55" y="-55" width="110" height="110" />
            <image href="https://media.mengundanganda.fun/desain%20web%20elegan%20blue%20(5).png" x="125" y="-55" width="110" height="110" />
            <image href="https://media.mengundanganda.fun/desain%20web%20elegan%20blue%20(5).png" x="-55" y="125" width="110" height="110" />
            <image href="https://media.mengundanganda.fun/desain%20web%20elegan%20blue%20(5).png" x="125" y="125" width="110" height="110" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#elegant-damask-pattern)" />
      </svg>
    </div>
    <!-- FULL SCREEN SOLID BORDER ORNAMENT -->
    <div class="absolute inset-0 z-[15] pointer-events-none text-[#fffdf5]">
      <!-- Corners (Beveled 45-degree angle inner edges) -->
      <!-- Top Left -->
      <div class="hero-corner absolute top-0 left-0 w-[100px] h-[100px] md:w-[160px] md:h-[160px] origin-top-left opacity-0 scale-0">
        <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,0 L100,20 L20,100 L0,100 Z" fill="currentColor" /></svg>
      </div>
      <!-- Top Right -->
      <div class="hero-corner absolute top-0 right-0 w-[100px] h-[100px] md:w-[160px] md:h-[160px] origin-top-right opacity-0 scale-0">
        <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M100,0 L0,0 L0,20 L80,100 L100,100 Z" fill="currentColor" /></svg>
      </div>
      <!-- Bottom Left -->
      <div class="hero-corner absolute bottom-0 left-0 w-[100px] h-[100px] md:w-[160px] md:h-[160px] origin-bottom-left opacity-0 scale-0">
        <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,100 L100,100 L100,80 L20,0 L0,0 Z" fill="currentColor" /></svg>
      </div>
      <!-- Bottom Right -->
      <div class="hero-corner absolute bottom-0 right-0 w-[100px] h-[100px] md:w-[160px] md:h-[160px] origin-bottom-right opacity-0 scale-0">
        <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M100,100 L0,100 L0,80 L80,0 L100,0 Z" fill="currentColor" /></svg>
      </div>

      <!-- Straight Lines (Animates from edges towards center perfectly) -->
      <!-- Top Edge -->
      <div class="hero-line-x absolute top-0 left-[100px] md:left-[160px] right-1/2 h-5 md:h-8 bg-current origin-left opacity-0 scale-x-0"></div>
      <div class="hero-line-x absolute top-0 right-[100px] md:right-[160px] left-1/2 h-5 md:h-8 bg-current origin-right opacity-0 scale-x-0"></div>

      <!-- Bottom Edge -->
      <div class="hero-line-x absolute bottom-0 left-[100px] md:left-[160px] right-1/2 h-5 md:h-8 bg-current origin-left opacity-0 scale-x-0"></div>
      <div class="hero-line-x absolute bottom-0 right-[100px] md:right-[160px] left-1/2 h-5 md:h-8 bg-current origin-right opacity-0 scale-x-0"></div>

      <!-- Left Edge -->
      <div class="hero-line-y absolute top-[100px] md:top-[160px] bottom-1/2 left-0 w-5 md:w-8 bg-current origin-top opacity-0 scale-y-0"></div>
      <div class="hero-line-y absolute bottom-[100px] md:bottom-[160px] top-1/2 left-0 w-5 md:w-8 bg-current origin-bottom opacity-0 scale-y-0"></div>

      <!-- Right Edge -->
      <div class="hero-line-y absolute top-[100px] md:top-[160px] bottom-1/2 right-0 w-5 md:w-8 bg-current origin-top opacity-0 scale-y-0"></div>
      <div class="hero-line-y absolute bottom-[100px] md:bottom-[160px] top-1/2 right-0 w-5 md:w-8 bg-current origin-bottom opacity-0 scale-y-0"></div>
    </div>

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

  const linesX = heroSection.value.querySelectorAll('.hero-line-x');
  const linesY = heroSection.value.querySelectorAll('.hero-line-y');
  const corners = heroSection.value.querySelectorAll('.hero-corner');

  gsap.set(corners, { scale: 0, opacity: 1 });
  gsap.set(linesX, { scaleX: 0, opacity: 1 });
  gsap.set(linesY, { scaleY: 0, opacity: 1 });

  // Timeline with initial delay waiting for cover to open
  const tl = gsap.timeline({ delay: 1.5 });

  // 1. Gambar sudut lengkung (oval) terlebih dulu
  tl.to(corners, {
    scale: 1,
    duration: 0.6,
    ease: "power2.out"
  })
  // 2. Garis memanjang membelah jalan menuju ke tengah layar dari masing-masing sudut
  .to(linesX, {
    scaleX: 1,
    duration: 1.8,
    ease: "power2.inOut"
  }, "-=0.2")
  .to(linesY, {
    scaleY: 1,
    duration: 1.8,
    ease: "power2.inOut"
  }, "<");
});
</script>
