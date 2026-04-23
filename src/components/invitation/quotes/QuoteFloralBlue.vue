<template>
  <section ref="sectionRef" class="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
    <!-- Background — Only Sky/Path Image -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <img
        src="https://media.mengundanganda.com/floral-blue/cover%20section/randidewi_28658e27-e94d-40ca-b897-607ef8ea0d83.webp"
        alt="Quote Background"
        class="min-w-full min-h-full w-full h-full object-cover object-center"
      />
    </div>

    <!-- White Oval Container -->
    <div 
      ref="ovalContainer" 
      class="absolute top-[47%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-[22] bg-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.1)] opacity-0 flex items-center justify-center p-12 md:p-16"
      style="border-radius: 50%;"
    >
      <div ref="quoteContent" class="opacity-0 flex flex-col items-center justify-center text-center">
         <blockquote v-if="quote" class="text-sm md:text-base lg:text-lg italic font-light text-[#2c3e50] leading-relaxed tracking-wider px-4">
           "{{ quote }}"
         </blockquote>
      </div>
    </div>

    <!-- Butterflies -->
    <div 
      v-for="i in 12" 
      :key="i"
      :ref="el => { if(el) butterflies[i-1] = el as HTMLDivElement }" 
      class="absolute top-[45%] left-[45%] -ml-6 sm:-ml-8 -mt-6 sm:-mt-8 z-[25] w-12 sm:w-16 h-12 sm:h-16 pointer-events-none drop-shadow-[0_5px_5px_rgba(0,0,0,0.15)] opacity-0" 
      style="perspective: 800px;"
    >
      <div class="absolute inset-0" style="transform-style: preserve-3d;">
        <img :ref="el => { if(el) wingRs[i-1] = el as HTMLImageElement }" src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_cc8322bb-688b-40ae-be5d-cd733175e104.webp" class="absolute left-[50%] top-0 h-[120%] w-auto max-w-none object-contain origin-left block" alt="Butterfly Wing Right" />
      </div>
      <div class="absolute inset-0" style="transform: scaleX(-1); transform-style: preserve-3d;">
        <img :ref="el => { if(el) wingLs[i-1] = el as HTMLImageElement }" src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_cc8322bb-688b-40ae-be5d-cd733175e104.webp" class="absolute left-[50%] top-0 h-[120%] w-auto max-w-none object-contain origin-left block" alt="Butterfly Wing Left" />
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

const props = defineProps<{
  quote?: string;
  themeConfig?: ThemeConfig;
}>();

const sectionRef = ref<HTMLElement | null>(null);
const ovalContainer = ref<HTMLDivElement | null>(null);
const quoteContent = ref<HTMLDivElement | null>(null);

const butterflies = ref<HTMLDivElement[]>([]);
const wingRs = ref<HTMLImageElement[]>([]);
const wingLs = ref<HTMLImageElement[]>([]);

let mainTimeline: gsap.core.Timeline | null = null;

onMounted(() => {
  if (!sectionRef.value) return;

  // Butterfly helper
  const setFlapSpeed = (speed: number, i?: number) => {
    if (i !== undefined) {
      if (!wingRs.value[i] || !wingLs.value[i]) return;
      gsap.killTweensOf(wingRs.value[i]);
      gsap.killTweensOf(wingLs.value[i]);
      gsap.fromTo(wingRs.value[i], { rotationY: 10 }, { rotationY: 75, duration: speed, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.fromTo(wingLs.value[i], { rotationY: 10 }, { rotationY: 75, duration: speed, yoyo: true, repeat: -1, ease: "sine.inOut" });
    } else {
      for (let j = 0; j < 12; j++) {
        if (!wingRs.value[j] || !wingLs.value[j]) continue;
        gsap.killTweensOf(wingRs.value[j]!);
        gsap.killTweensOf(wingLs.value[j]!);
        gsap.fromTo(wingRs.value[j]!, { rotationY: 10 }, { rotationY: 75, duration: speed, yoyo: true, repeat: -1, ease: "sine.inOut" });
        gsap.fromTo(wingLs.value[j]!, { rotationY: 10 }, { rotationY: 75, duration: speed, yoyo: true, repeat: -1, ease: "sine.inOut" });
      }
    }
  };

  const radiusX = Math.min(window.innerWidth * 0.35, 250);
  const radiusY = Math.min(window.innerHeight * 0.3, 280);
  if (ovalContainer.value) {
    gsap.set(ovalContainer.value, { width: radiusX * 2.2, height: radiusY * 2.2 });
  }

  // Animation Timeline
  mainTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top center",
      toggleActions: "play none none reverse"
    }
  });

  // 1. Butterfly flight
  mainTimeline.add(() => {
    if (butterflies.value.length > 0) {
      setFlapSpeed(0.12);
      butterflies.value.forEach((wrap, i) => {
        const theta = (i / 12) * Math.PI * 2;
        const targetX = Math.cos(theta) * radiusX;
        const targetY = Math.sin(theta) * radiusY;
        const rot = (theta * 180 / Math.PI) - 90;
        const startDistX = Math.cos(theta) * (radiusX + 800);
        const startDistY = Math.sin(theta) * (radiusY + 800);
        gsap.set(wrap, { x: startDistX, y: startDistY, rotation: rot, opacity: 1, scale: 0.5 });
        gsap.to(wrap, { x: targetX, y: targetY, scale: 1, duration: 2.5, ease: "power2.out", onComplete: () => setFlapSpeed(0.8, i) });
      });
    }
  }, "+=0.1");

  // 2. Oval container
  mainTimeline.to(ovalContainer.value, { opacity: 1, duration: 1.0, ease: "power2.out" }, "+=2.0");

  // 3. Quote content
  mainTimeline.fromTo(quoteContent.value, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, "-=0.5");
});

onBeforeUnmount(() => {
  if (mainTimeline) mainTimeline.kill();
  wingRs.value.forEach(w => { if(w) gsap.killTweensOf(w) });
  wingLs.value.forEach(w => { if(w) gsap.killTweensOf(w) });
});
</script>

<style scoped>
</style>
