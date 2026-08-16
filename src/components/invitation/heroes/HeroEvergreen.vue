<template>
  <section ref="heroSection" class="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 md:px-8 overflow-hidden bg-[#2D3E35]">
    <!-- Background Image Spanning Entire Section (Full Cover) -->
    <div
      ref="bgImg"
      class="absolute inset-0 z-0 pointer-events-none transform-gpu"
      :style="{
        backgroundImage: `url('${heroImage || 'https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_a6d66206-34e9-498d-9a36-bb5f89115297.webp'}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
      }"
    ></div>

    <!-- Decorative Corner Leaf Accents -->
    <div class="absolute top-5 left-5 z-[3] text-white/40 pointer-events-none drop-shadow-sm">
      <svg class="w-10 h-10 md:w-12 md:h-12 rotate-[-45deg]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17,8C8,10 59,16.17 3.82,21.34L5.23,22.75C10.4,17.58 16.58,15 17,8M6.5,5A1.5,1.5 0 0,0 5,6.5A1.5,1.5 0 0,0 6.5,8A1.5,1.5 0 0,0 8,6.5A1.5,1.5 0 0,0 6.5,5Z"/>
      </svg>
    </div>
    <div class="absolute bottom-5 right-5 z-[3] text-white/40 pointer-events-none drop-shadow-sm">
      <svg class="w-10 h-10 md:w-12 md:h-12 rotate-[135deg]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17,8C8,10 59,16.17 3.82,21.34L5.23,22.75C10.4,17.58 16.58,15 17,8M6.5,5A1.5,1.5 0 0,0 5,6.5A1.5,1.5 0 0,0 6.5,8A1.5,1.5 0 0,0 8,6.5A1.5,1.5 0 0,0 6.5,5Z"/>
      </svg>
    </div>

    <!-- Hero Content (Directly Floating, No Container Box) - Standby Ready -->
    <div ref="heroContent" class="relative z-[10] w-full max-w-xl mx-auto py-12 px-6 flex flex-col items-center opacity-100 translate-y-0">
      <!-- Botanical Leaf Emblem Icon -->
      <div ref="iconEmblem" class="mb-3 text-white/90 opacity-100 scale-100 drop-shadow-md">
        <svg class="w-8 h-8 md:w-9 md:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v18m0-18C8 3 4 7 4 12s4 9 8 9m0-18c4 0 8 4 8 9s-4 9-8 9"/>
        </svg>
      </div>

      <!-- Hero Text Slot -->
      <div class="evergreen-hero-text relative z-20 w-full">
        <slot />
      </div>

      <div class="mt-6 flex flex-col items-center gap-2">
        <div class="w-[1px] h-8 bg-white/60 drop-shadow-sm"></div>
        <span class="text-[10px] uppercase tracking-[0.3em] text-white/90 font-medium drop-shadow-md">Undangan Pernikahan</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

withDefaults(
  defineProps<{
    overlayGradient?: string;
    heroImage?: string;
    themeConfig?: any;
    invitation?: any;
    quote?: string;
    apiBase?: string;
  }>(),
  {
    heroImage:
      'https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_a6d66206-34e9-498d-9a36-bb5f89115297.webp',
  }
);

const heroSection = ref<HTMLElement | null>(null);
const heroContent = ref<HTMLElement | null>(null);
const iconEmblem = ref<SVGElement | null>(null);
const bgImg = ref<HTMLElement | null>(null);

onMounted(() => {
  if (bgImg.value) {
    gsap.to(bgImg.value, {
      scale: 1.08,
      duration: 20,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });
  }
});
</script>

<style>
/* Typography styles injected from InvitationView slot */
.evergreen-hero-text p {
  color: #FFFFFF !important;
  letter-spacing: 0.25em !important;
  text-transform: uppercase !important;
  font-size: 0.85rem !important;
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.6) !important;
}

.evergreen-hero-text h1 {
  color: #FFFFFF !important;
  font-family: 'Cormorant Garamond', Georgia, serif !important;
  font-weight: 500 !important;
  line-height: 1.15 !important;
  margin: 0.75rem 0 !important;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.6), 0 1px 4px rgba(0, 0, 0, 0.5) !important;
}

.evergreen-hero-text h1 span {
  color: #EAF2ED !important;
  font-style: italic !important;
  font-family: 'Cormorant Garamond', Georgia, serif !important;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5) !important;
}
</style>
