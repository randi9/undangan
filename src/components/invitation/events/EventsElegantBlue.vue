<template>
  <section ref="sectionRef" v-if="invitation.akad_venue || invitation.resepsi_venue" class="w-full min-h-[100dvh] flex flex-col items-center justify-center text-center relative overflow-hidden bg-[#eaf1f8]">
    
    <!-- 1. The Envelope & Paper Container -->
    <div ref="envelopeWrapper" class="relative w-[75vw] max-w-[360px] aspect-[4/5] flex flex-col items-center justify-center origin-[50%_88%] will-change-transform" style="transform: scale(1);">
      
      <!-- Envelope Back Flap & Inside Pocket -->
      <svg class="absolute inset-0 w-full h-full z-10 pointer-events-none drop-shadow-xl" viewBox="0 0 1000 1250" preserveAspectRatio="none">
        <polygon points="0,650 1000,650 1000,1250 0,1250" fill="#041a33" />
        <polygon points="0,650 500,750 1000,650" fill="#031429" /> <!-- fake depth flap -->
      </svg>

      <!-- Paper Layer -->
      <div ref="paper" class="absolute left-[1.5%] right-[1.5%] bottom-[1%] z-20 will-change-transform rounded-t-[4px] flex items-center justify-center">
        
        <!-- Event Blank Paper (Underneath fixed, dictates height!) -->
        <img ref="eventPaperImg" src="https://media.mengundanganda.com/elegant_blue/event%20section/kertas.jpg" class="relative w-full h-auto z-0" />
        
        <!-- Main Cover Image (Top Layer - Will fade out!) -->
        <img ref="coverPaperImg" src="https://media.mengundanganda.com/elegant_blue/event%20section/kertastulisan.jpg" class="absolute top-0 left-0 w-full h-auto z-10" />

        <!-- Akad Content -->
        <div ref="akadInfo" class="absolute inset-0 p-3 sm:p-4 flex flex-col items-center justify-center text-[#304851] will-change-[opacity,transform] opacity-0 z-20" style="transform: translateY(15px);">
          <Icon icon="ph:rings-duotone" class="w-6 h-6 md:w-8 md:h-8 mb-2 opacity-80" />
          <h3 class="text-xl md:text-3xl font-bold mb-2 md:mb-3" :style="{ fontFamily: themeConfig.fontHeading }">Akad Nikah</h3>
          <div class="space-y-1 text-[0.6rem] md:text-xs opacity-90 max-w-[200px] md:max-w-xs px-2 py-2 border-y border-[#304851]/20">
            <div v-if="invitation.akad_date" class="flex gap-2 justify-center">
              <Icon icon="ph:calendar-blank-duotone" class="w-3 h-3 flex-shrink-0" /> <span class="uppercase tracking-wider">{{ formatDateLong(invitation.akad_date) }}</span>
            </div>
            <div v-if="invitation.akad_time" class="flex gap-2 justify-center">
              <Icon icon="ph:clock-duotone" class="w-3 h-3 flex-shrink-0" /> <span>{{ invitation.akad_time }}</span>
            </div>
          </div>
          <div v-if="invitation.akad_venue" class="mt-2.5 md:mt-3 text-center max-w-[220px] md:max-w-xs">
            <Icon icon="ph:map-pin-duotone" class="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 mx-auto mb-0.5" />
            <strong class="text-[0.6rem] md:text-xs tracking-wider uppercase block">{{ invitation.akad_venue }}</strong>
            <span v-if="invitation.akad_address" class="text-[0.45rem] md:text-[0.65rem] leading-tight block mt-0.5 opacity-80">{{ invitation.akad_address }}</span>
          </div>
          <div class="flex flex-wrap justify-center gap-1.5 md:gap-2 mt-3 pointer-events-auto">
             <a v-if="invitation.akad_map_url" :href="invitation.akad_map_url" target="_blank" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#304851] text-[#304851] font-bold text-[0.5rem] md:text-[0.6rem] hover:bg-[#304851] hover:text-white transition-colors bg-white/70 backdrop-blur-sm shadow-sm"><Icon icon="ph:map-trifold-duotone" class="w-3 h-3" /> Maps</a>
             <a v-if="invitation.akad_date" :href="getAkadCalendarUrl()" target="_blank" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#304851] text-[#304851] font-bold text-[0.5rem] md:text-[0.6rem] hover:bg-[#304851] hover:text-white transition-colors bg-white/70 backdrop-blur-sm shadow-sm"><Icon icon="ph:calendar-plus-duotone" class="w-3 h-3" /> Ingatkan</a>
          </div>
        </div>

        <!-- Resepsi Content -->
        <div ref="resepsiInfo" class="absolute inset-0 p-3 sm:p-4 flex flex-col items-center justify-center text-[#304851] will-change-[opacity,transform] opacity-0 z-20" style="transform: translateY(15px);">
          <Icon icon="ph:confetti-duotone" class="w-6 h-6 md:w-8 md:h-8 mb-2 opacity-80" />
          <h3 class="text-xl md:text-3xl font-bold mb-2 md:mb-3" :style="{ fontFamily: themeConfig.fontHeading }">Resepsi</h3>
          <div class="space-y-1 text-[0.6rem] md:text-xs opacity-90 max-w-[200px] md:max-w-xs px-2 py-2 border-y border-[#304851]/20">
            <div v-if="invitation.resepsi_date" class="flex gap-2 justify-center">
              <Icon icon="ph:calendar-blank-duotone" class="w-3 h-3 flex-shrink-0" /> <span class="uppercase tracking-wider">{{ formatDateLong(invitation.resepsi_date) }}</span>
            </div>
            <div v-if="invitation.resepsi_time" class="flex gap-2 justify-center">
              <Icon icon="ph:clock-duotone" class="w-3 h-3 flex-shrink-0" /> <span>{{ invitation.resepsi_time }}</span>
            </div>
          </div>
          <div v-if="invitation.resepsi_venue" class="mt-2.5 md:mt-3 text-center max-w-[220px] md:max-w-xs">
            <Icon icon="ph:map-pin-duotone" class="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 mx-auto mb-0.5" />
            <strong class="text-[0.6rem] md:text-xs tracking-wider uppercase block">{{ invitation.resepsi_venue }}</strong>
            <span v-if="invitation.resepsi_address" class="text-[0.45rem] md:text-[0.65rem] leading-tight block mt-0.5 opacity-80">{{ invitation.resepsi_address }}</span>
          </div>
          <div class="flex flex-wrap justify-center gap-1.5 md:gap-2 mt-3 pointer-events-auto">
             <a v-if="invitation.resepsi_map_url" :href="invitation.resepsi_map_url" target="_blank" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#304851] text-[#304851] font-bold text-[0.5rem] md:text-[0.6rem] hover:bg-[#304851] hover:text-white transition-colors bg-white/70 backdrop-blur-sm shadow-sm"><Icon icon="ph:map-trifold-duotone" class="w-3 h-3" /> Maps</a>
             <a v-if="invitation.resepsi_date" :href="getResepsiCalendarUrl()" target="_blank" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#304851] text-[#304851] font-bold text-[0.5rem] md:text-[0.6rem] hover:bg-[#304851] hover:text-white transition-colors bg-white/70 backdrop-blur-sm shadow-sm"><Icon icon="ph:calendar-plus-duotone" class="w-3 h-3" /> Ingatkan</a>
          </div>
        </div>

      </div>

      <!-- Envelope Front Pockets SVG -->
      <svg class="absolute inset-0 w-full h-full z-30 pointer-events-none drop-shadow-[0_-4px_8px_rgba(0,0,0,0.3)]" viewBox="0 0 1000 1250" preserveAspectRatio="none">
        <g>
          <!-- Left side flap -->
          <polygon points="0,650 450,1000 0,1250" fill="#063158" stroke="#063158" stroke-width="2.5" stroke-linejoin="round" />
          <!-- Right side flap -->
          <polygon points="1000,650 550,1000 1000,1250" fill="#063158" stroke="#063158" stroke-width="2.5" stroke-linejoin="round" />
          <!-- Bottom side flap -->
          <polygon points="0,1250 500,900 1000,1250" fill="#073a69" stroke="#073a69" stroke-width="2.5" stroke-linejoin="round" />
        </g>
      </svg>
    </div>

    <!-- 2. Intro Layer (Deep Blue Linen & Damask Pattern) -->
    <div ref="introLayer" class="absolute inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-[#062645] will-change-opacity overflow-hidden">
      
      <!-- Staggered Damask Pattern -->
      <div ref="damaskBg" style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; pointer-events: none; opacity: 0.15; background-image: url('https://media.mengundanganda.com/elegant_blue/event%20section/randidewi_772c4451-713a-47f1-aea8-4995e9df061d.webp'), url('https://media.mengundanganda.com/elegant_blue/event%20section/randidewi_772c4451-713a-47f1-aea8-4995e9df061d.webp'); background-size: 200px 200px, 200px 200px; background-position: 0 0, 100px 100px; background-repeat: repeat;"></div>

      <!-- Top and Bottom Smooth Shadow -->
      <div style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; pointer-events: none; z-index: 0; box-shadow: inset 0 250px 250px -60px #062645, inset 0 -250px 250px -60px #062645, inset 0 100px 100px -25px #062645, inset 0 -100px 100px -25px #062645;"></div>

      <!-- Linen Texture -->
      <div style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; pointer-events: none; opacity: 0.6; mix-blend-mode: multiply; background-image: url('https://www.transparenttextures.com/patterns/black-linen.png');"></div>

      <!-- Wrap everything in introContent so text and frame fade out together -->
      <div ref="introContent" class="relative w-full flex flex-col items-center justify-center will-change-opacity z-10">
        
        <!-- Elegant Top Text with Splitting and Flourishes -->
        <!-- Elegant Top Text with Splitting and Flourishes -->
        <div class="text-center px-4 relative z-10" :style="{ fontFamily: themeConfig.fontHeading, fontStyle: 'normal', letterSpacing: '0.05em', lineHeight: '1.8', maxWidth: '95%', color: '#dfbd6a', fontSize: 'clamp(30px, 6.5vw, 42px)', fontWeight: '700', marginBottom: '8vh' }">
          <div>Dengan Rahmat &amp;</div>
          <div class="flex items-center justify-center gap-2 mt-1">
            <svg class="w-10 sm:w-14 h-auto opacity-70" viewBox="0 0 100 30" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
               <path d="M90 15 L 40 15 C 20 15 5 25 15 15 C 25 5 15 15 40 15" />
            </svg>
            <span>Karunia-Nya</span>
            <svg class="w-10 sm:w-14 h-auto opacity-70" style="transform: scaleX(-1)" viewBox="0 0 100 30" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
               <path d="M90 15 L 40 15 C 20 15 5 25 15 15 C 25 5 15 15 40 15" />
            </svg>
          </div>
        </div>

        <!-- The Royal Gold Frame -->
        <div class="relative w-[85%] max-w-[420px] md:max-w-[550px] flex flex-col items-center justify-center my-2">
          <img src="https://media.mengundanganda.com/elegant_blue/event%20section/randidewi_acc22787-ddcb-438c-a0e8-93dd3bbaf620.webp" alt="Gold Frame" class="w-full h-auto object-contain" />
          <div class="absolute inset-0 pointer-events-none flex flex-col items-center justify-center pt-[5%]">
            <div class="flex items-center justify-center">
              <span :style="{ fontFamily: themeConfig.fontHeading, fontSize: 'clamp(4rem, 11vw, 5.5rem)', color: '#304851', lineHeight: '1', transform: 'translateX(10px)', marginBottom: 'clamp(20px, 8vw, 50px)' }">{{ invitation.groom_name ? invitation.groom_name.charAt(0).toUpperCase() : 'R' }}</span>
              <span :style="{ fontFamily: themeConfig.fontHeading, fontSize: 'clamp(4rem, 11vw, 5.5rem)', color: '#304851', lineHeight: '1', transform: 'translateX(-10px)', marginTop: 'clamp(20px, 8vw, 50px)' }">{{ invitation.bride_name ? invitation.bride_name.charAt(0).toUpperCase() : 'D' }}</span>
            </div>
            <div class="mt-4 text-[#304851] text-[0.6rem] md:text-sm font-medium uppercase tracking-[0.25em]" style="font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;">
              {{ invitation.groom_name || 'RANDI' }} &amp; {{ invitation.bride_name || 'DEWI' }}
            </div>
            <div class="mt-2 text-[#304851]/80 text-[0.55rem] md:text-xs tracking-[0.25em]" style="font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;">
              <span v-if="invitation.akad_date">{{ new Date(invitation.akad_date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.') }}</span>
              <span v-else>07.21.2027</span>
            </div>
          </div>
        </div>

        <!-- Elegant Bottom Text with Extended Line Height -->
        <div class="text-center px-6 relative z-10" :style="{ fontFamily: themeConfig.fontHeading, fontStyle: 'normal', letterSpacing: '0.05em', lineHeight: '2.0', maxWidth: '95%', color: '#dfbd6a', fontSize: 'clamp(18px, 4.5vw, 24px)', fontWeight: '700', marginTop: '8vh' }">
          <p>Kami Mengundang Anda Untuk</p>
          <p>Hadir Pada :</p>
        </div>

      </div>


    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { generateGoogleCalendarUrl } from '@/utils/calendar';
import { Icon } from '@iconify/vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

const sectionRef = ref<HTMLElement | null>(null);
const envelopeWrapper = ref<HTMLElement | null>(null);
const introLayer = ref<HTMLElement | null>(null);
const introContent = ref<HTMLElement | null>(null);
const damaskBg = ref<HTMLElement | null>(null);
const paper = ref<HTMLElement | null>(null);
const coverPaperImg = ref<HTMLImageElement | null>(null);
const eventPaperImg = ref<HTMLImageElement | null>(null);
const akadInfo = ref<HTMLElement | null>(null);
const resepsiInfo = ref<HTMLElement | null>(null);

let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const paperZoomScale = mql.matches ? 1.15 : 1.2; 

    // Set initial states via GSAP (not inline CSS) so GSAP owns the full lifecycle
    gsap.set(envelopeWrapper.value, { scale: 5, opacity: 1 });
    gsap.set(introLayer.value, { opacity: 1 });
    gsap.set(introContent.value, { opacity: 1 });
    gsap.set(damaskBg.value, { opacity: 0.15 });
    gsap.set(paper.value, { y: '0%', scale: 1, zIndex: 20 });
    if (coverPaperImg.value) gsap.set(coverPaperImg.value, { opacity: 1 });
    if (eventPaperImg.value) gsap.set(eventPaperImg.value, { opacity: 1 });
    gsap.set(akadInfo.value, { opacity: 0, y: 15 });
    gsap.set(resepsiInfo.value, { opacity: 0, y: 15 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: '+=150%', // Reduced distance so 1 scroll travels further
        pin: true,
        scrub: 0.5, // Faster catching up to scroll position
        snap: {
          snapTo: "labels", // Perfect snapping to defined steps
          duration: { min: 0.2, max: 0.5 },
          delay: 0.05, // Snap immediately when scroll stops
          ease: 'power1.inOut'
        },
        invalidateOnRefresh: true,
        onLeave: () => {
          gsap.set(envelopeWrapper.value, { scale: 1, opacity: 1 });
          gsap.set(introLayer.value, { opacity: 0 });
          gsap.set(introContent.value, { opacity: 0 });
          gsap.set(damaskBg.value, { opacity: 0 });
          gsap.set(paper.value, { y: '8%', scale: paperZoomScale, zIndex: 50, clearProps: 'boxShadow' });
          if (coverPaperImg.value) gsap.set(coverPaperImg.value, { opacity: 0 });
          if (eventPaperImg.value) gsap.set(eventPaperImg.value, { opacity: 1 });
          gsap.set(resepsiInfo.value, { opacity: 1, y: 0, pointerEvents: 'auto' });
          gsap.set(akadInfo.value, { opacity: 0, pointerEvents: 'none' });
        },
        onEnterBack: () => {
          gsap.set(resepsiInfo.value, { pointerEvents: 'none' });
        },
      }
    });

    let t = 0;
    // START STATE: Frame is visible, zoomed in
    tl.addLabel('step1', t);

    // --- PHASE 1: Fade out Frame -> Zoom out Envelope ---
    tl.to(introContent.value, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, t);
    tl.to(damaskBg.value, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, t);
    tl.to(introLayer.value, { opacity: 0, duration: 1, ease: 'power2.inOut' }, t + 0.2);
    tl.to(envelopeWrapper.value, { scale: 1, duration: 1.2, ease: 'power2.out' }, t + 0.1);
    
    t += 1.3;
    tl.addLabel('step2', t); // ENVELOPE FULLY VISIBLE

    tl.to({}, { duration: 0.3 }, t); // hold buffer
    t += 0.3;

    // --- PHASE 2: Paper Extracts & Shows Akad ---
    // 1. Pull paper completely out of the envelope pocket
    tl.to(paper.value, { y: '-12%', duration: 0.6, ease: 'power2.out' }, t);
    tl.set(paper.value, { zIndex: 50 }, t + 0.2); // pop over envelope flap correctly
    
    // 2. Zoom it dynamically into the center and shift Y to balance visually
    tl.to(paper.value, { scale: paperZoomScale, y: '8%', boxShadow: '0 8px 30px -5px rgba(0,0,0,0.2)', duration: 0.8, ease: 'power1.inOut' }, t + 0.6);
    
    if (coverPaperImg.value) {
      // Fade out happens exactly as it STARTS zooming!
      tl.to(coverPaperImg.value, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, t + 0.6);
    }
    
    // 3. Akad text materializes smoothly on top of the blank graphics
    tl.to(akadInfo.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power1.out' }, t + 1.2);

    t += 1.8;
    tl.addLabel('step3', t); // AKAD INFO VISIBLE

    tl.set(akadInfo.value, { pointerEvents: 'auto' }, t);
    tl.to({}, { duration: 0.4 }, t); // hold buffer
    tl.set(akadInfo.value, { pointerEvents: 'none' }, t + 0.4);
    t += 0.4;

    // --- PHASE 3: Akad fades, Resepsi fades in ---
    tl.to(akadInfo.value, { opacity: 0, y: -15, duration: 0.5, ease: 'power1.inOut' }, t)
      .set(resepsiInfo.value, { pointerEvents: 'auto' }, t)
      .to(resepsiInfo.value, { opacity: 1, y: 0, duration: 0.5, ease: 'power1.out' }, t + 0.2);

    t += 0.7;
    tl.addLabel('step4', t); // RESEPSI INFO VISIBLE

    tl.to({}, { duration: 0.1 }, t); // tiny buffer before unpinning

  }, sectionRef.value!);
});

onUnmounted(() => {
  if (ctx) {
    ctx.revert();
  }
});

function getAkadCalendarUrl() {
  return generateGoogleCalendarUrl({
    title: `Akad Nikah ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`,
    date: props.invitation.akad_date!,
    time: props.invitation.akad_time,
    venue: props.invitation.akad_venue,
    address: props.invitation.akad_address,
    description: `Undangan Pernikahan ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`,
  });
}

function getResepsiCalendarUrl() {
  return generateGoogleCalendarUrl({
    title: `Resepsi ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`,
    date: props.invitation.resepsi_date!,
    time: props.invitation.resepsi_time,
    venue: props.invitation.resepsi_venue,
    address: props.invitation.resepsi_address,
    description: `Undangan Pernikahan ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`,
  });
}

function formatDateLong(dateStr: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
</script>