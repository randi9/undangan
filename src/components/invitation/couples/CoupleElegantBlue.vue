<template>
  <section ref="sectionRef" class="relative px-4 md:px-8 text-center overflow-hidden flex flex-col items-center justify-start min-h-[100dvh]" :style="irregularGradientStyle">
    
    <!-- PNG Corner Ornaments -->
    <div class="absolute inset-0 z-[15] pointer-events-none overflow-hidden">
      <!-- Top Right (Base) -->
      <div class="couple-png-corner absolute top-0 right-0 origin-top-right opacity-0" style="transform: scale(0);">
        <img src="https://media.mengundanganda.com/tema%20elegant%20blue/couple%20section/asset%20elegan%20blue.png" class="w-[180px] md:w-[300px] object-contain" />
      </div>
      
      <!-- Top Left (Flipped horizontally) -->
      <div class="couple-png-corner absolute top-0 left-0 origin-top-left opacity-0" style="transform: scale(0);">
        <img src="https://media.mengundanganda.com/tema%20elegant%20blue/couple%20section/asset%20elegan%20blue.png" class="w-[180px] md:w-[300px] object-contain -scale-x-100" />
      </div>
      
      <!-- Bottom Right (Flipped vertically) -->
      <div class="couple-png-corner absolute bottom-[-5px] right-0 origin-bottom-right opacity-0" style="transform: scale(0);">
        <img src="https://media.mengundanganda.com/tema%20elegant%20blue/couple%20section/asset%20elegan%20blue.png" class="w-[180px] md:w-[300px] object-contain -scale-y-100" />
      </div>
      
      <!-- Bottom Left (Flipped both) -->
      <div class="couple-png-corner absolute bottom-[-5px] left-0 origin-bottom-left opacity-0" style="transform: scale(0);">
        <img src="https://media.mengundanganda.com/tema%20elegant%20blue/couple%20section/asset%20elegan%20blue.png" class="w-[180px] md:w-[300px] object-contain -scale-x-100 -scale-y-100" />
      </div>
    </div>

    <!-- Real Layout (Text + Final position of images) -->
    <div class="max-w-5xl w-full mx-auto relative z-10 flex-1 flex flex-col justify-between">
      
      <div>
        <h2 ref="titleRef" class="text-3xl md:text-5xl mb-2 text-[#1a252c] drop-shadow-sm tracking-widest cursor-default text-center" :style="{ fontFamily: themeConfig.fontHeading }">
          The Future<br/>Mr. &amp; Mrs.
        </h2>
        <div ref="heartRef" class="flex items-center justify-center gap-4 text-[#304851]/50 mb-8 md:mb-0">
        </div>
      </div>
      
      <!-- Groom Row -->
      <div class="flex items-center justify-between gap-4 md:gap-16 w-full max-w-2xl mx-auto relative" ref="groomRowRef">
        <div class="w-[45%] flex justify-end">
          <div ref="groomSlotRef" class="opacity-0 w-36 h-48 md:w-56 md:h-72 rounded-t-[1000px] shadow-xl bg-[#405C66]/5 relative overflow-hidden">
             <img v-if="invitation.groom_photo" :src="resolveAssetUrl(invitation.groom_photo, apiBase)" class="absolute inset-0 w-full h-full object-cover opacity-0" ref="realGroomImgRef" alt="Groom" />
             <div v-else class="w-full h-full flex items-center justify-center text-4xl text-[#405C66]/50 opacity-0" ref="realGroomImgRef">👤</div>
          </div>
        </div>
        <div class="w-[55%] flex justify-start text-left pl-4 md:pl-8">
          <div ref="groomTextRef" class="opacity-0 translate-y-4">
             <h3 class="text-xl md:text-3xl font-bold mb-2 text-[#1a252c]" :style="{ fontFamily: themeConfig.fontHeading }">{{ invitation.groom_full_name || invitation.groom_name }}</h3>
             <p v-if="invitation.groom_father || invitation.groom_mother" class="text-xs md:text-base text-[#304851]/80 font-light tracking-wide">
               Putra dari<br/>
               <span v-if="invitation.groom_father" class="font-medium text-[#1a252c]">Bapak {{ invitation.groom_father }}</span>
               <span v-if="invitation.groom_father && invitation.groom_mother"> &amp; </span>
               <span v-if="invitation.groom_mother" class="font-medium text-[#1a252c]">Ibu {{ invitation.groom_mother }}</span>
             </p>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div ref="ampersandRef" class="text-4xl md:text-6xl text-[#405C66]/30 font-light opacity-0 translate-y-4 my-8 md:my-0 cursor-default text-center" :style="{ fontFamily: themeConfig.fontHeading }">&amp;</div>
      
      <!-- Bride Row -->
      <div class="flex items-center justify-between gap-4 md:gap-16 w-full max-w-2xl mx-auto relative flex-row-reverse" ref="brideRowRef">
        <div class="w-[45%] flex justify-start">
          <div ref="brideSlotRef" class="opacity-0 w-36 h-48 md:w-56 md:h-72 rounded-b-[1000px] shadow-xl bg-[#405C66]/5 relative overflow-hidden">
             <img v-if="invitation.bride_photo" :src="resolveAssetUrl(invitation.bride_photo, apiBase)" class="absolute inset-0 w-full h-full object-cover opacity-0" ref="realBrideImgRef" alt="Bride" />
             <div v-else class="w-full h-full flex items-center justify-center text-4xl text-[#405C66]/50 opacity-0" ref="realBrideImgRef">👤</div>
          </div>
        </div>
        <div class="w-[55%] flex justify-end text-right pr-4 md:pr-8">
          <div ref="brideTextRef" class="opacity-0 translate-y-4">
            <h3 class="text-xl md:text-3xl font-bold mb-2 text-[#1a252c]" :style="{ fontFamily: themeConfig.fontHeading }">{{ invitation.bride_full_name || invitation.bride_name }}</h3>
            <p v-if="invitation.bride_father || invitation.bride_mother" class="text-xs md:text-base text-[#304851]/80 font-light tracking-wide">
              Putri dari<br/>
              <span v-if="invitation.bride_father" class="font-medium text-[#1a252c]">Bapak {{ invitation.bride_father }}</span>
              <span v-if="invitation.bride_father && invitation.bride_mother"> &amp; </span>
              <span v-if="invitation.bride_mother" class="font-medium text-[#1a252c]">Ibu {{ invitation.bride_mother }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Animation Absolute Layer -->
    <div class="absolute inset-0 z-20 pointer-events-none w-full h-full block">
      
      <!-- Unified Cover Photo (Only visible at start, fades out) -->
      <div ref="coverOvalRef" class="absolute w-[240px] h-[320px] md:w-[320px] md:h-[440px] rounded-[1000px] overflow-hidden shadow-2xl bg-[#304851] z-30" style="will-change: transform, opacity">
         <img v-if="invitation.cover_photo" :src="resolveAssetUrl(invitation.cover_photo, apiBase)" class="absolute inset-0 w-full h-full object-cover" />
         <div v-else class="absolute inset-0 w-full h-full flex items-center justify-center text-white/50">Tidak ada cover</div>
      </div>

      <!-- Groom Half (Top) - Hidden beneath cover initially -->
      <div ref="animGroomRef" class="absolute w-[240px] h-[160px] md:w-[320px] md:h-[220px] rounded-t-[1000px] overflow-hidden shadow-xl bg-[#405C66]/5 z-20" style="will-change: width, height, transform, top, left">
         <img v-if="invitation.groom_photo" :src="resolveAssetUrl(invitation.groom_photo, apiBase)" class="absolute inset-0 w-full h-full object-cover" />
         <div v-else class="absolute inset-0 w-full h-full flex items-center justify-center text-5xl bg-[#405C66]/10 text-[#405C66]/50">👤</div>
      </div>

      <!-- Bride Half (Bottom) - Hidden beneath cover initially -->
      <div ref="animBrideRef" class="absolute w-[240px] h-[160px] md:w-[320px] md:h-[220px] rounded-b-[1000px] overflow-hidden shadow-xl bg-[#405C66]/5 z-20" style="will-change: width, height, transform, top, left">
         <img v-if="invitation.bride_photo" :src="resolveAssetUrl(invitation.bride_photo, apiBase)" class="absolute inset-0 w-full h-full object-cover" />
         <div v-else class="absolute inset-0 w-full h-full flex items-center justify-center text-5xl bg-[#405C66]/10 text-[#405C66]/50">👤</div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { resolveAssetUrl } from '@/utils/url';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
  apiBase: string;
}>();

// Refs
const sectionRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const heartRef = ref<HTMLElement | null>(null);
const groomSlotRef = ref<HTMLElement | null>(null);
const groomTextRef = ref<HTMLElement | null>(null);
const ampersandRef = ref<HTMLElement | null>(null);
const brideSlotRef = ref<HTMLElement | null>(null);
const brideTextRef = ref<HTMLElement | null>(null);

const coverOvalRef = ref<HTMLElement | null>(null);
const animGroomRef = ref<HTMLElement | null>(null);
const animBrideRef = ref<HTMLElement | null>(null);
const realGroomImgRef = ref<HTMLElement | null>(null);
const realBrideImgRef = ref<HTMLElement | null>(null);

const getAnimProps = (slot: HTMLElement | null) => {
   const section = sectionRef.value;
   if (!slot || !section) return { x: 0, y: 0, width: 0, height: 0, xPercent: 0, yPercent: 0 };
   
   const targetR = slot.getBoundingClientRect();
   const sectionR = section.getBoundingClientRect();
   
   const originX = sectionR.left + sectionR.width / 2;
   const originY = sectionR.top + sectionR.height / 2;
   
   const targetTop = targetR.top - originY;
   const targetLeft = targetR.left - originX;
   
   return {
     x: targetLeft,
     y: targetTop,
     xPercent: 0,
     yPercent: 0,
     width: targetR.width,
     height: targetR.height
   };
};

// Inline Pastel Blue Gradient (lengkap dengan padding fix)
const irregularGradientStyle = {
  backgroundColor: '#fffdf5',
  padding: '60px 24px 100px 24px', // Atas dikurangi agar teks lebih naik
  backgroundImage: `
    radial-gradient(circle at 10% 15%, rgba(168, 208, 230, 0.3) 0%, transparent 60%),
    radial-gradient(circle at 85% 85%, rgba(168, 208, 230, 0.3) 0%, transparent 65%),
    radial-gradient(circle at 80% 15%, rgba(168, 208, 230, 0.3) 0%, transparent 60%),
    radial-gradient(circle at 25% 85%, rgba(168, 208, 230, 0.3) 0%, transparent 55%)
  `
};

let ctx: gsap.Context;

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    // Corner Ornaments Init
    const corners = sectionRef.value!.querySelectorAll('.couple-png-corner');
    gsap.set(corners, { scale: 1, opacity: 1 });

    // 1. Initial robust Absolute positioning inside the GSAP context
    gsap.set(coverOvalRef.value, { top: "50%", left: "50%", xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 1, opacity: 1 });
    gsap.set(animGroomRef.value, { top: "50%", left: "50%", xPercent: -50, yPercent: -100, x: 0, y: 0, opacity: 1 });
    gsap.set(animBrideRef.value, { top: "50%", left: "50%", xPercent: -50, yPercent: 0, x: 0, y: 0, opacity: 1 });
    
    // Explicitly hide slots dynamically as a fallback
    gsap.set([groomSlotRef.value, brideSlotRef.value], { opacity: 0 });

    // Force ScrollTrigger to refresh bounds after layout computations
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top top",
        end: "+=150%", // Keep pinned while animating over scroll distance
        pin: true,
        scrub: 1, // Smooth scrub
        invalidateOnRefresh: true,
      }
    });

    // 2. Animate Corner Ornaments (Menyusut perlahan sejalan dengan bergeraknya oval)
    tl.to(corners, {
      scale: 0,
      opacity: 0,
      duration: 1.5,
      ease: "power2.inOut"
    }, 0.5);

    // 3. Fade out the unified cover (Memudar elegan tanpa scale down)
    if (coverOvalRef.value) {
      tl.to(coverOvalRef.value, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      }, 0);
    }

    // 4. Size shift and position to exact slots
    tl.to(animGroomRef.value, {
      x: () => getAnimProps(groomSlotRef.value).x,
      y: () => getAnimProps(groomSlotRef.value).y,
      xPercent: 0,
      yPercent: 0,
      width: () => getAnimProps(groomSlotRef.value).width,
      height: () => getAnimProps(groomSlotRef.value).height,
      duration: 1.5,
      ease: "power2.inOut"
    }, 0.5);

    tl.to(animBrideRef.value, {
      x: () => getAnimProps(brideSlotRef.value).x,
      y: () => getAnimProps(brideSlotRef.value).y,
      xPercent: 0,
      yPercent: 0,
      width: () => getAnimProps(brideSlotRef.value).width,
      height: () => getAnimProps(brideSlotRef.value).height,
      duration: 1.5,
      ease: "power2.inOut"
    }, 0.5);

    // 4. Fade in Texts
    tl.to([groomTextRef.value, ampersandRef.value, brideTextRef.value], {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    }, 1.0); 

    // 5. Swap to Real Static elements when done
    tl.set([groomSlotRef.value, brideSlotRef.value, realGroomImgRef.value, realBrideImgRef.value].filter(Boolean), { opacity: 1 }, 2.0);
    tl.set([animGroomRef.value, animBrideRef.value, coverOvalRef.value].filter(Boolean), { opacity: 0 }, 2.0);

  }, sectionRef.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>
