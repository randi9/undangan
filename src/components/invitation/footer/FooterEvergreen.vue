<template>
  <footer
    ref="footerSection"
    class="min-h-[100dvh] flex flex-col justify-center py-16 md:py-24 px-6 sm:px-8 bg-transparent text-[#1d3d27] relative text-center"
    style="overflow: hidden; margin-top: -50px;"
  >

    <!-- Content -->
    <div
      class="relative z-10 w-full max-w-md mx-auto px-8 sm:px-12 flex flex-col items-center text-center my-auto"
      style="transform: translateY(-70px);"
    >

      <!-- Thank You Statement -->
      <div ref="contentRef" class="w-full text-center opacity-0 translate-y-6">
        <p class="text-[11px] md:text-xs uppercase tracking-[0.3em] text-[#1d3d27] font-bold leading-relaxed mb-4 md:mb-5 text-center">Terima Kasih</p>
        <!-- Container full-width, isi teks dikunci di tengah secara horizontal -->
        <div class="w-full flex justify-center mb-8 md:mb-10">
          <p class="text-sm md:text-lg font-serif italic leading-relaxed md:leading-loose text-[#1d3d27]/90 text-center w-full max-w-[290px] sm:max-w-sm" style="font-family: 'Cormorant Garamond', Georgia, serif;">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.
          </p>
        </div>

        <div class="w-12 h-[1.5px] bg-[#1d3d27]/30 mx-auto mb-8 md:mb-10"></div>

        <h3 class="text-[26px] md:text-5xl font-serif text-[#1d3d27] font-semibold tracking-wide leading-tight mb-4 md:mb-5 break-words text-center" style="font-family: 'Cormorant Garamond', Georgia, serif;">
          {{ invitation.groom_name }} &amp; {{ invitation.bride_name }}
        </h3>
        <p class="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#1d3d27]/80 font-semibold leading-relaxed text-center mt-12 md:mt-16">Sampai Jumpa Di Hari Bahagia Kami</p>
      </div>
    </div>

    <!-- Brand Footer -->
    <div
      class="absolute bottom-4 left-0 right-0 flex flex-col justify-center items-center pointer-events-none select-none"
    >
      <span style="font-family: sans-serif; font-size: 9px; font-weight: 300; letter-spacing: 0.1em; color: #1d3d27; opacity: 0.6; text-transform: uppercase; margin-bottom: 2px;">
        powered by
      </span>
      <div style="font-family: sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.03em; color: #1d3d27;">
        MengundangAnda
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

defineProps<{
  invitation: Invitation;
  themeConfig?: ThemeConfig;
}>();

const footerSection = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!footerSection.value) return;

  // === Text content animation ===
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: footerSection.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(contentRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out'
  });
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
