<template>
  <section ref="heroSection" class="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#fafaf9] font-sans">
    
    <!-- Subtle Gradient Aurora Background -->
    <div class="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      <!-- Glow blobs with minimalist subtle colors -->
      <div class="absolute top-[0%] left-[-10%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] bg-[#e0e7ff] rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob"></div>
      <div class="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-[#fce7f3] rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-blob" style="animation-delay: 2s;"></div>
      <div class="absolute bottom-[0%] left-[20%] w-[80vw] h-[80vw] max-w-[700px] max-h-[700px] bg-[#fef3c7] rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob" style="animation-delay: 4s;"></div>
    </div>

    <!-- Entrance Outline Animation & Glass Frame -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[380px] h-[75vh] md:h-[80vh] pointer-events-none z-[5] flex justify-center items-center">
      <!-- Glowing Glassmorphic Backing -->
      <div ref="glassPill" class="absolute inset-0 rounded-[200px] bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.03)] opacity-0 scale-95"></div>
      
      <!-- Delicate SVG Outline -->
      <svg class="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
        <rect ref="frameRect" x="0" y="0" width="100%" height="100%" rx="190" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-dasharray="3000" stroke-dashoffset="3000" />
      </svg>
    </div>

    <div ref="heroContent" class="relative z-[10] w-full max-w-2xl mx-auto py-20 flex flex-col items-center text-gray-800 opacity-0 translate-y-6">
      <div class="mb-6">
        <svg ref="iconStar" class="w-5 h-5 text-gray-400 opacity-0 scale-50" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L13.4 9.6L21 11L13.4 12.4L12 20L10.6 12.4L3 11L10.6 9.6L12 2Z"></path>
        </svg>
      </div>
      
      <!-- Slot for the text Content -->
      <div class="minimalist-hero-text relative z-20">
        <slot />
      </div>

      <div class="mt-8">
        <div class="w-[1px] h-12 bg-gray-300"></div>
      </div>
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
const heroContent = ref<HTMLElement | null>(null);
const glassPill = ref<HTMLElement | null>(null);
const frameRect = ref<SVGElement | null>(null);
const iconStar = ref<SVGElement | null>(null);

onMounted(() => {
  const tl = gsap.timeline({ delay: 0.5 });

  // 1. Fade & Scale the Glass Backing
  tl.to(glassPill.value, {
    opacity: 1,
    scale: 1,
    duration: 2,
    ease: "power2.out"
  });

  // 2. Draw the delicate frame
  tl.to(frameRect.value, {
    strokeDashoffset: 0,
    duration: 2.5,
    ease: "power2.inOut"
  }, "-=1.5");

  // 3. Reveal Star
  tl.to(iconStar.value, {
    opacity: 1,
    scale: 1,
    rotation: 180,
    duration: 1.2,
    ease: "back.out(1.5)"
  }, "-=2.0");

  // 4. Reveal Text (Slot content)
  tl.to(heroContent.value, {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power3.out"
  }, "-=1.5");
});
</script>

<style>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(25px, -40px) scale(1.05); }
  66% { transform: translate(-15px, 15px) scale(0.95); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 15s infinite alternate;
}

/* Clean up the typography injected via slot from InvitationView */
.minimalist-hero-text h1, .minimalist-hero-text h2, .minimalist-hero-text h3 {
  color: #1f2937 !important; /* text-gray-800 */
}
.minimalist-hero-text p {
  color: #6b7280 !important; /* text-gray-500 */
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-size: 0.85rem;
}
.minimalist-hero-text .text-4xl, .minimalist-hero-text .text-5xl, .minimalist-hero-text .text-6xl {
  margin: 1.5rem 0;
  color: #374151 !important;
}
</style>
