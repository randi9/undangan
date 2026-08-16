<template>
  <footer
    ref="footerSection"
    class="min-h-[100dvh] flex flex-col justify-center py-20 md:py-28 px-4 md:px-8 bg-[#2D3E35] text-[#EAF2ED] relative overflow-hidden text-center"
  >
    <!-- Background Image Spanning Entire Footer (Full Cover) -->
    <div
      ref="bgImg"
      class="absolute inset-0 z-0 pointer-events-none transform-gpu"
      :style="{
        backgroundImage: `url('${footerImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
      }"
    ></div>

    <!-- Soft Ambient Overlay for Text Readability -->
    <div class="absolute inset-0 z-[1] pointer-events-none bg-[#15231C]/45"></div>

    <!-- Content -->
    <div class="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
      <div ref="iconRef" class="mb-6 text-[#8B9E8B] opacity-0 scale-50">
        <svg class="w-8 h-8 md:w-10 md:h-10 opacity-80" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17,8C8,10 59,16.17 3.82,21.34L5.23,22.75C10.4,17.58 16.58,15 17,8M6.5,5A1.5,1.5 0 0,0 5,6.5A1.5,1.5 0 0,0 6.5,8A1.5,1.5 0 0,0 6.5,5Z"/>
        </svg>
      </div>

      <!-- Thank You Statement -->
      <div ref="contentRef" class="opacity-0 translate-y-6">
        <p class="text-xs uppercase tracking-[0.3em] text-[#B5C9BC] font-medium mb-3">Terima Kasih</p>
        <p class="text-base md:text-xl font-serif italic leading-relaxed md:leading-loose text-[#F4F8F5] mb-8 max-w-lg mx-auto" style="font-family: 'Cormorant Garamond', Georgia, serif;">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.
        </p>

        <div class="w-12 h-[1px] bg-[#8B9E8B]/40 mx-auto mb-8"></div>

        <h3 class="text-3xl md:text-5xl font-serif text-[#F4F8F5] font-normal tracking-wide mb-2" style="font-family: 'Cormorant Garamond', Georgia, serif;">
          {{ invitation.groom_name }} &amp; {{ invitation.bride_name }}
        </h3>
        <p class="text-xs uppercase tracking-[0.25em] text-[#A8C4B1] mt-2">Sampai Jumpa Di Hari Bahagia Kami</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Invitation } from '@/types/invitation';
import type { ThemeConfig } from '@/types/theme';

gsap.registerPlugin(ScrollTrigger);

const props = withDefaults(
  defineProps<{
    invitation: Invitation;
    themeConfig?: ThemeConfig;
    footerImage?: string;
  }>(),
  {
    footerImage:
      'https://media.mengundanganda.com/evergreen/footer%20section/dewirandi_ad5c156d-47bf-47c8-872e-0ae7ab0ab0bd.webp',
  }
);

const footerSection = ref<HTMLElement | null>(null);
const bgImg = ref<HTMLElement | null>(null);
const iconRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (bgImg.value) {
    gsap.to(bgImg.value, {
      scale: 1.05,
      duration: 20,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    });
  }

  if (!footerSection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: footerSection.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(iconRef.value, {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: 'back.out(1.5)'
  })
  .to(contentRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out'
  }, "-=0.4");
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
