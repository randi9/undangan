<template>
  <footer ref="footerSection" class="py-24 px-6 text-center text-gray-800 relative overflow-hidden bg-white">
    <!-- Extremely refined and subtle gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-white z-0"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] border border-gray-100 rounded-full opacity-50 z-0"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] border border-gray-100/50 rounded-full opacity-50 z-0"></div>

    <div class="relative z-10 flex flex-col items-center justify-center">
      <div ref="footerDivider" class="w-px h-16 bg-gray-300 mb-10 scale-y-0 origin-bottom"></div>
      
      <p ref="greetingRef" class="text-xs uppercase tracking-[0.3em] font-medium text-gray-400 mb-4 opacity-0 translate-y-4">Terima Kasih</p>
      
      <p ref="namesRef" class="text-4xl md:text-6xl text-gray-800 mb-8 opacity-0 scale-95" :style="{ fontFamily: themeConfig.fontHeading }">
        {{ invitation.groom_name }}
        <span class="text-xl md:text-3xl text-gray-300 font-light mx-2 align-middle">&amp;</span>
        {{ invitation.bride_name }}
      </p>
      
      <p ref="closingRef" class="text-sm font-light tracking-wide text-gray-500 opacity-0 translate-y-4 max-w-md mx-auto leading-relaxed">Puji syukur atas karunia yang telah diberikan, terima kasih atas doa restunya.</p>
      
      <div class="mt-20 text-[10px] uppercase font-bold tracking-widest text-gray-300">
        Created passionately with <span class="text-gray-400">MengundangAnda</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

const footerSection = ref<HTMLElement | null>(null);
const footerDivider = ref<HTMLElement | null>(null);
const greetingRef = ref<HTMLElement | null>(null);
const namesRef = ref<HTMLElement | null>(null);
const closingRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!footerSection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: footerSection.value,
      start: 'top 85%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(footerDivider.value, { scaleY: 1, duration: 1.2, ease: 'power3.inOut' })
    .to(greetingRef.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, "-=0.4")
    .to(namesRef.value, { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.2)' }, "-=0.2")
    .to(closingRef.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, "-=0.8");
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
