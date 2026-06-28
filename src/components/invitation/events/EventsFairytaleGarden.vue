<template>
  <section 
    v-if="invitation.akad_venue || invitation.resepsi_venue" 
    ref="eventSectionRef"
    class="w-full min-h-[100dvh] relative overflow-hidden flex flex-col items-center justify-center bg-[#F8F3EE]"
    style="background-image: url('https://media.mengundanganda.com/fairygarden/event%20section/dewirandi_00144412-c4d7-4fe2-b445-9f6051ec6c59.webp'); background-size: cover; background-position: center;"
  >
    <!-- 
      Asset Jembatan Tengah
      Silakan ubah/sesuaikan style inline di bawah untuk mengatur posisi dan ukuran jembatan:
      - width: mengatur lebar default
      - max-width: mengatur batas lebar maksimal jembatan (misal: 600px, 80%, dsb)
      - bottom: mengatur posisi jarak dari bawah layar (bisa px, %, atau dvh)
      - z-index: mengatur tumpukan visual (z-2 di depan perahu)
    -->
    <img 
      src="https://media.mengundanganda.com/fairygarden/event%20section/dewirandi_b4ec478d-7d99-45e5-8de8-f6f41b3fec27.webp" 
      alt="Bridge Decoration"
      style="
        position: absolute;
        bottom: 42%;
        left: 50%;
        transform: translateX(-50%);
        width: 108%;
        max-width: 600px;
        z-index: 2;
        pointer-events: none;
      "
    />

    <!-- 
      Asset Perahu Tengah (Controlled dynamically by GSAP)
    -->
    <img 
      ref="boatRef"
      src="https://media.mengundanganda.com/fairygarden/event%20section/dewirandi_9df48ccf-e2e6-40d6-9877-9f82de6cd479.webp" 
      alt="Boat Decoration"
      style="
        position: absolute;
        top: -25%;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        max-width: 100px;
        z-index: 1;
        pointer-events: none;
      "
    />


    <!-- Step 1: Akad Nikah Section (Overlay on bridge and water) -->
    <div 
      v-if="invitation.akad_venue"
      ref="akadCardRef"
      class="absolute inset-0 z-10 pointer-events-none opacity-0"
    >
      <!-- Title on the bridge wood (Curved SVG text Path) -->
      <svg 
        viewBox="0 0 600 150" 
        class="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[150px] pointer-events-none"
      >
        <defs>
          <filter id="shadow-akad" x="-20%" y="-20%" width="140%" height="140%">
            <!-- Sharp dark shadow -->
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.9" />
            <!-- Soft ambient shadow -->
            <feDropShadow dx="0" dy="1" stdDeviation="8" flood-color="#000000" flood-opacity="0.5" />
          </filter>
        </defs>
        <path 
          id="bridge-curve-akad" 
          d="M 50 110 Q 300 75 550 110" 
          fill="transparent" 
        />
        <text 
          fill="white" 
          text-anchor="middle"
          filter="url(#shadow-akad)"
          :style="{ 
            fontFamily: themeConfig.fontHeading,
            fontSize: '65px'
          }"
        >
          <textPath href="#bridge-curve-akad" xlink:href="#bridge-curve-akad" startOffset="50%">
            Akad Nikah
          </textPath>
        </text>
      </svg>

      <!-- Info in the water below the bridge -->
      <div 
        class="absolute top-[58%] left-1/2 -translate-x-1/2 w-[90%] max-w-[450px] flex flex-col items-center px-6 py-6 pointer-events-auto max-h-[38dvh] overflow-y-auto"
      >
        <!-- Heart Divider (Top) -->
        <div class="flex items-center justify-center gap-3 w-full opacity-80" style="margin-bottom: 20px;">
          <span class="h-[1px] w-12 bg-[#BA7D85]/50"></span>
          <Icon icon="ph:heart-fill" class="w-3.5 h-3.5 text-[#BA7D85] filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
          <span class="h-[1px] w-12 bg-[#BA7D85]/50"></span>
        </div>

        <!-- Details block wrapper (centered on card, left-aligned content) -->
        <div class="w-full flex justify-center">
          <div class="space-y-3.5 text-white text-sm md:text-base font-semibold flex flex-col items-start text-left w-fit max-w-[290px] xs:max-w-xs sm:max-w-sm">
            <div v-if="invitation.akad_date" class="flex items-center gap-3 w-full" style="text-shadow: 0 2px 4px rgba(0,0,0,0.8)">
              <Icon icon="ph:calendar-blank-duotone" class="w-5 h-5 text-[#EBCFD1] flex-shrink-0 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
              <span>{{ formatDateLong(invitation.akad_date) }}</span>
            </div>
            <div v-if="invitation.akad_time" class="flex items-center gap-3 w-full" style="text-shadow: 0 2px 4px rgba(0,0,0,0.8)">
              <Icon icon="ph:clock-duotone" class="w-5 h-5 text-[#EBCFD1] flex-shrink-0 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
              <span>{{ formatTime(invitation.akad_time) }}</span>
            </div>
            <div v-if="invitation.akad_venue" class="flex items-start gap-3 w-full" style="text-shadow: 0 2px 4px rgba(0,0,0,0.8)">
              <Icon icon="ph:map-pin-duotone" class="w-5 h-5 text-[#EBCFD1] flex-shrink-0 mt-0.5 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
              <div>
                <strong class="font-bold block">{{ invitation.akad_venue }}</strong>
                <span v-if="invitation.akad_address" class="text-xs text-white/95 font-medium leading-relaxed block mt-0.5 max-w-[280px]">
                  {{ invitation.akad_address }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Heart Divider (Bottom) -->
        <div class="flex items-center justify-center gap-3 w-full opacity-80" style="margin-top: 20px; margin-bottom: 24px;">
          <span class="h-[1px] w-12 bg-[#BA7D85]/50"></span>
          <Icon icon="ph:heart-fill" class="w-3.5 h-3.5 text-[#BA7D85] filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
          <span class="h-[1px] w-12 bg-[#BA7D85]/50"></span>
        </div>

        <div class="flex flex-wrap justify-center gap-3 w-full">
          <a v-if="invitation.akad_map_url" :href="invitation.akad_map_url" target="_blank" class="hover:scale-[1.03] active:scale-[0.98] transition-all duration-300" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 9999px; background: linear-gradient(135deg, #8FA47F 0%, #6E875C 100%); color: #ffffff !important; font-weight: 700; font-size: 13px; text-decoration: none; box-shadow: 0 4px 15px rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.25);">
            <Icon icon="ph:map-trifold-duotone" class="w-4 h-4" /> Buka Maps
          </a>
          <a v-if="invitation.akad_date" :href="getAkadCalendarUrl()" target="_blank" class="hover:scale-[1.03] active:scale-[0.98] transition-all duration-300" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 9999px; background: linear-gradient(135deg, #D49BA2 0%, #BA7D85 100%); color: #ffffff !important; font-weight: 700; font-size: 13px; text-decoration: none; box-shadow: 0 4px 15px rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.25);">
            <Icon icon="ph:calendar-plus-duotone" class="w-4 h-4 text-white" /> Ingatkan Saya
          </a>
        </div>
      </div>
    </div>

    <!-- Curved SVG Title on Bridge -->
    <div 
      v-if="invitation.resepsi_venue || (invitation.streaming_enabled && invitation.streaming_url)"
      ref="resepsiTitleRef"
      class="absolute inset-0 z-10 pointer-events-none opacity-0"
    >
      <svg 
        viewBox="0 0 600 150" 
        class="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[150px] pointer-events-none"
      >
        <defs>
          <filter id="shadow-resepsi" x="-20%" y="-20%" width="140%" height="140%">
            <!-- Sharp dark shadow -->
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.9" />
            <!-- Soft ambient shadow -->
            <feDropShadow dx="0" dy="1" stdDeviation="8" flood-color="#000000" flood-opacity="0.5" />
          </filter>
        </defs>
        <path 
          id="bridge-curve-resepsi" 
          d="M 50 110 Q 300 75 550 110" 
          fill="transparent" 
        />
        <text 
          fill="white" 
          text-anchor="middle"
          filter="url(#shadow-resepsi)"
          :style="{ 
            fontFamily: themeConfig.fontHeading,
            fontSize: '65px'
          }"
        >
          <textPath href="#bridge-curve-resepsi" xlink:href="#bridge-curve-resepsi" startOffset="50%">
            Resepsi
          </textPath>
        </text>
      </svg>
    </div>

    <!-- Step 2: Resepsi Section (Info above the bridge) -->
    <div 
      v-if="invitation.resepsi_venue"
      ref="resepsiCardRef"
      class="absolute inset-0 z-10 pointer-events-none opacity-0"
    >
      <div 
        class="absolute top-[10dvh] left-1/2 -translate-x-1/2 w-[90%] max-w-[450px] flex flex-col items-center px-6 py-6 pointer-events-auto max-h-[32dvh] overflow-y-auto"
      >
        <!-- Heart Divider (Top) -->
        <div class="flex items-center justify-center gap-3 w-full opacity-80" style="margin-bottom: 20px;">
          <span class="h-[1px] w-12 bg-[#BA7D85]/50"></span>
          <Icon icon="ph:heart-fill" class="w-3.5 h-3.5 text-[#BA7D85] filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
          <span class="h-[1px] w-12 bg-[#BA7D85]/50"></span>
        </div>

        <div class="w-full flex justify-center">
          <div class="space-y-3.5 text-white text-sm md:text-base font-semibold flex flex-col items-start text-left w-fit max-w-[290px] xs:max-w-xs sm:max-w-sm">
            <div v-if="invitation.resepsi_date" class="flex items-center gap-3 w-full" style="text-shadow: 0 2px 4px rgba(0,0,0,0.8)">
              <Icon icon="ph:calendar-blank-duotone" class="w-5 h-5 text-[#EBCFD1] flex-shrink-0 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
              <span>{{ formatDateLong(invitation.resepsi_date) }}</span>
            </div>
            <div v-if="invitation.resepsi_time" class="flex items-center gap-3 w-full" style="text-shadow: 0 2px 4px rgba(0,0,0,0.8)">
              <Icon icon="ph:clock-duotone" class="w-5 h-5 text-[#EBCFD1] flex-shrink-0 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
              <span>{{ formatTime(invitation.resepsi_time) }}</span>
            </div>
            <div v-if="invitation.resepsi_venue" class="flex items-start gap-3 w-full" style="text-shadow: 0 2px 4px rgba(0,0,0,0.8)">
              <Icon icon="ph:map-pin-duotone" class="w-5 h-5 text-[#EBCFD1] flex-shrink-0 mt-0.5 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
              <div>
                <strong class="font-bold block">{{ invitation.resepsi_venue }}</strong>
                <span v-if="invitation.resepsi_address" class="text-xs text-white/95 font-medium leading-relaxed block mt-0.5 max-w-[280px]">
                  {{ invitation.resepsi_address }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Heart Divider (Bottom) -->
        <div class="flex items-center justify-center gap-3 w-full opacity-80" style="margin-top: 20px; margin-bottom: 24px;">
          <span class="h-[1px] w-12 bg-[#BA7D85]/50"></span>
          <Icon icon="ph:heart-fill" class="w-3.5 h-3.5 text-[#BA7D85] filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
          <span class="h-[1px] w-12 bg-[#BA7D85]/50"></span>
        </div>

        <div class="flex flex-wrap justify-center gap-2 w-full">
          <a v-if="invitation.resepsi_map_url" :href="invitation.resepsi_map_url" target="_blank" class="hover:scale-[1.03] active:scale-[0.98] transition-all duration-300" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 9999px; background: linear-gradient(135deg, #8FA47F 0%, #6E875C 100%); color: #ffffff !important; font-weight: 700; font-size: 13px; text-decoration: none; box-shadow: 0 4px 15px rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.25);">
            <Icon icon="ph:map-trifold-duotone" class="w-4 h-4" /> Buka Maps
          </a>
          <a v-if="invitation.resepsi_date" :href="getResepsiCalendarUrl()" target="_blank" class="hover:scale-[1.03] active:scale-[0.98] transition-all duration-300" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 24px; border-radius: 9999px; background: linear-gradient(135deg, #D49BA2 0%, #BA7D85 100%); color: #ffffff !important; font-weight: 700; font-size: 13px; text-decoration: none; box-shadow: 0 4px 15px rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.25);">
            <Icon icon="ph:calendar-plus-duotone" class="w-4 h-4 text-white" /> Ingatkan Saya
          </a>
        </div>
      </div>
    </div>

    <!-- Step 3: Live Streaming Section (Info above the bridge) -->
    <div 
      v-if="invitation.streaming_enabled && invitation.streaming_url"
      ref="streamingCardRef"
      class="absolute inset-0 z-10 pointer-events-none opacity-0"
    >
      <div 
        class="absolute top-[10dvh] left-1/2 -translate-x-1/2 w-[90%] max-w-[450px] flex flex-col items-center px-4 py-4 pointer-events-auto max-h-[38dvh] overflow-y-auto"
      >
        <!-- Heart Divider (Top) -->
        <div class="flex items-center justify-center gap-3 w-full opacity-80" style="margin-bottom: 12px;">
          <span class="h-[1px] w-12 bg-[#BA7D85]/50"></span>
          <Icon icon="ph:heart-fill" class="w-3.5 h-3.5 text-[#BA7D85] filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
          <span class="h-[1px] w-12 bg-[#BA7D85]/50"></span>
        </div>

        <div class="space-y-2 flex flex-col items-center w-full text-center">
          <div class="flex items-center gap-2 justify-center w-full">
            <Icon icon="ph:video-camera-duotone" class="w-4 h-4 text-[#EBCFD1] filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
            <span class="font-bold text-sm text-white">Live Streaming</span>
          </div>
          <p class="text-[11px] text-white/95 font-medium leading-relaxed max-w-[260px]" style="text-shadow: 0 1px 3px rgba(0,0,0,0.8)">
            Anda dapat mengikuti acara kami secara virtual melalui tautan berikut:
          </p>
          <div class="relative w-full max-w-[200px] aspect-video rounded-lg overflow-hidden shadow-sm border border-white/10 bg-black/25">
            <iframe 
              :src="getEmbedUrl(invitation.streaming_url, invitation.streaming_platform || 'youtube') || ''" 
              class="absolute top-0 left-0 w-full h-full"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen>
            </iframe>
          </div>
        </div>

        <!-- Heart Divider (Bottom) -->
        <div class="flex items-center justify-center gap-3 w-full opacity-80" style="margin-top: 12px; margin-bottom: 16px;">
          <span class="h-[1px] w-12 bg-[#BA7D85]/50"></span>
          <Icon icon="ph:heart-fill" class="w-3.5 h-3.5 text-[#BA7D85] filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
          <span class="h-[1px] w-12 bg-[#BA7D85]/50"></span>
        </div>

        <div class="flex justify-center w-full">
          <a :href="invitation.streaming_url" target="_blank" class="hover:scale-[1.03] active:scale-[0.98] transition-all duration-300" style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; border-radius: 9999px; background: linear-gradient(135deg, #D49BA2 0%, #BA7D85 100%); color: #ffffff !important; font-weight: 700; font-size: 12px; text-decoration: none; box-shadow: 0 4px 15px rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.25);">
            <Icon icon="ph:play-circle-duotone" class="w-3.5 h-3.5" /> Gabung Live
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { generateGoogleCalendarUrl } from '@/utils/calendar';
import { getEmbedUrl } from '@/utils/streaming';
import { Icon } from '@iconify/vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

const eventSectionRef = ref<HTMLElement | null>(null);
const boatRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const akadCardRef = ref<HTMLElement | null>(null);
const resepsiTitleRef = ref<HTMLElement | null>(null);
const resepsiCardRef = ref<HTMLElement | null>(null);
const streamingCardRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    if (!eventSectionRef.value || !boatRef.value) return;

    const hasStreaming = !!(props.invitation.streaming_enabled && props.invitation.streaming_url);

    // Create scroll timeline with ScrollTrigger pinning
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: eventSectionRef.value,
        start: 'top top',
        end: hasStreaming ? '+=400%' : '+=300%',
        pin: true,
        scrub: 1, // smooth scroll link
        anticipatePin: 1,
      }
    });

    // Set initial states
    gsap.set(boatRef.value, {
      top: '-25%',
      left: '50%',
      xPercent: -50,
    });

    if (headerRef.value) {
      gsap.set(headerRef.value, { opacity: 1, y: 0, scale: 1 });
    }
    if (akadCardRef.value) {
      gsap.set(akadCardRef.value, { opacity: 0, scale: 0.95 });
    }
    if (resepsiTitleRef.value) {
      gsap.set(resepsiTitleRef.value, { opacity: 0, scale: 0.95 });
    }
    if (resepsiCardRef.value) {
      gsap.set(resepsiCardRef.value, { opacity: 0, scale: 0.95 });
    }
    if (streamingCardRef.value) {
      gsap.set(streamingCardRef.value, { opacity: 0, scale: 0.95 });
    }

    // --- Phase 1: Scroll 1 ---
    // - Header fades out
    // - Boat moves to top: 10%
    // - Akad card fades in (title on bridge, info below)
    tl.fromTo(boatRef.value,
      { top: '-25%' },
      {
        top: '10%',
        duration: 1.0,
        ease: 'power1.inOut',
      }, 0);

    if (headerRef.value) {
      tl.to(headerRef.value, {
        opacity: 0,
        y: -30,
        scale: 0.95,
        duration: 0.6,
        ease: 'power1.inOut',
      }, 0);
    }

    if (akadCardRef.value) {
      tl.to(akadCardRef.value, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, 0.3);
    }

    // Spacer pause at the end of Phase 1 to let user read Akad Card
    tl.to({}, { duration: 0.4 });

    // --- Phase 2: Scroll 2 ---
    // - Akad card fades out
    // - Boat moves to top: 50%
    // - Resepsi card fades in at the top
    if (akadCardRef.value) {
      tl.to(akadCardRef.value, {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: 'power2.in',
      });
    }

    tl.fromTo(boatRef.value,
      { top: '10%' },
      {
        top: '50%',
        duration: 1.0,
        ease: 'power1.inOut',
      }, '+=0.1');

    if (resepsiTitleRef.value) {
      tl.to(resepsiTitleRef.value, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, '+=0.2');
    }

    if (resepsiCardRef.value) {
      tl.to(resepsiCardRef.value, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, '+=0.2');
    }

    // Spacer pause at the end of Phase 2 to let user read Resepsi Card
    tl.to({}, { duration: 0.4 });

    // --- Phase 3 (Conditional: Live Streaming, or Departure) ---
    if (hasStreaming) {
      // 1. Resepsi info & Title fade out (boat remains at 50%)
      if (resepsiCardRef.value) {
        tl.to(resepsiCardRef.value, {
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: 'power2.in',
        });
      }
      if (resepsiTitleRef.value) {
        tl.to(resepsiTitleRef.value, {
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: 'power2.in',
        }, '<');
      }

      // 2. Streaming card fades in (boat remains at 50%)
      if (streamingCardRef.value) {
        tl.to(streamingCardRef.value, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        }, '+=0.2');
      }

      // Spacer pause at the end of streaming card to let user read/watch
      tl.to({}, { duration: 0.4 });

      // 3. Streaming card fades out
      if (streamingCardRef.value) {
        tl.to(streamingCardRef.value, {
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: 'power2.in',
        });
      }

      // 4. Boat sails away to 120%
      tl.fromTo(boatRef.value,
        { top: '50%' },
        {
          top: '120%',
          duration: 0.8,
          ease: 'power1.in',
        }, '+=0.1');

    } else {
      // No streaming: immediately fade out Resepsi Card & Title and sail away
      if (resepsiCardRef.value) {
        tl.to(resepsiCardRef.value, {
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: 'power2.in',
        });
      }
      if (resepsiTitleRef.value) {
        tl.to(resepsiTitleRef.value, {
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: 'power2.in',
        }, '<');
      }

      tl.fromTo(boatRef.value,
        { top: '50%' },
        {
          top: '120%',
          duration: 0.8,
          ease: 'power1.in',
        }, '+=0.1');
    }

  }, eventSectionRef.value as HTMLElement);
});

onBeforeUnmount(() => {
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

function formatTime(timeStr?: string) {
  if (!timeStr) return '';
  const trimmed = timeStr.trim();
  if (trimmed.toUpperCase().endsWith('WIB')) {
    return trimmed;
  }
  return `${trimmed} WIB`;
}

</script>
