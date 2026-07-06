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
        z-index: 3;
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


    <!-- Step 1: Akad Title Section (Overlay on bridge wood) -->
    <div 
      v-if="invitation.akad_venue"
      ref="akadTitleRef"
      class="absolute inset-0 z-[4] pointer-events-none opacity-0"
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
    </div>

    <!-- Step 1: Akad Info Section (Under the bridge) -->
    <div 
      v-if="invitation.akad_venue"
      ref="akadCardRef"
      class="absolute inset-0 z-[2] pointer-events-none opacity-0"
    >
      <!-- Info in the water below the bridge -->
      <div 
        style="
          position: absolute;
          top: 45dvh;                 /* MUDAH DIEDIT: Posisi dari atas */
          left: 50%;
          transform: translateX(-50%);
          width: 85%;
          max-width: 350px;
          height: 52dvh;              /* MUDAH DIEDIT: Tinggi kontainer */
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 85px 20px 24px 20px; /* MUDAH DIEDIT: Padding kontainer (pt tebal untuk di bawah jembatan) */
          overflow: hidden;           /* NO SCROLL */
          pointer-events: auto;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255, 255, 255, 0.55);
          border-radius: 0px 0px 9999px 9999px;
          box-shadow: 0px 10px 30px rgba(106, 78, 66, 0.1);
        "
      >


        <!-- Details block wrapper (centered on card, left-aligned content) -->
        <div style="width: 100%; display: flex; justify-content: center; margin-top: 4px; margin-bottom: 4px;">
          <div style="display: flex; flex-direction: column; align-items: flex-start; text-align: left; width: fit-content; max-width: 290px; gap: 10px; color: #6A4E42; font-weight: 600; font-size: 13px;">
            <div v-if="invitation.akad_date" style="display: flex; align-items: center; gap: 10px; width: 100%;">
              <Icon icon="ph:calendar-blank-duotone" style="width: 17px; height: 17px; color: #BA7D85; flex-shrink: 0;" />
              <span>{{ formatDateLong(invitation.akad_date) }}</span>
            </div>
            <div v-if="invitation.akad_time" style="display: flex; align-items: center; gap: 10px; width: 100%;">
              <Icon icon="ph:clock-duotone" style="width: 17px; height: 17px; color: #BA7D85; flex-shrink: 0;" />
              <span>{{ formatTime(invitation.akad_time) }}</span>
            </div>
            <div v-if="invitation.akad_venue" style="display: flex; align-items: flex-start; gap: 10px; width: 100%;">
              <Icon icon="ph:map-pin-duotone" style="width: 17px; height: 17px; color: #BA7D85; flex-shrink: 0; margin-top: 2px;" />
              <div>
                <strong style="font-weight: 700; display: block; color: #5A1E25; font-size: 13.5px;">{{ invitation.akad_venue }}</strong>
                <span v-if="invitation.akad_address" style="font-size: 11px; color: rgba(106, 78, 66, 0.85); font-weight: 500; line-height: 1.5; display: block; margin-top: 2px; max-width: 280px;">
                  {{ invitation.akad_address }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; width: 100%; margin-top: 4px; margin-bottom: 4px;">
          <a v-if="invitation.akad_map_url" :href="invitation.akad_map_url" target="_blank" class="hover:scale-[1.03] active:scale-[0.98] transition-all duration-300" style="display: inline-flex; align-items: center; gap: 6px; padding: 7px 18px; border-radius: 9999px; background: linear-gradient(135deg, #8FA47F 0%, #6E875C 100%); color: #ffffff !important; font-weight: 700; font-size: 11.5px; text-decoration: none; box-shadow: 0px 3px 10px rgba(0,0,0,0.15); border: 1px solid rgba(255,255,255,0.25);">
            <Icon icon="ph:map-trifold-duotone" style="width: 14px; height: 14px;" /> Buka Maps
          </a>
          <a v-if="invitation.akad_date" :href="getAkadCalendarUrl()" target="_blank" class="hover:scale-[1.03] active:scale-[0.98] transition-all duration-300" style="display: inline-flex; align-items: center; gap: 6px; padding: 7px 18px; border-radius: 9999px; background: linear-gradient(135deg, #D49BA2 0%, #BA7D85 100%); color: #ffffff !important; font-weight: 700; font-size: 11.5px; text-decoration: none; box-shadow: 0px 3px 10px rgba(0,0,0,0.15); border: 1px solid rgba(255,255,255,0.25);">
            <Icon icon="ph:calendar-plus-duotone" style="width: 14px; height: 14px; color: white;" /> Ingatkan Saya
          </a>
        </div>
      </div>
    </div>

    <!-- Curved SVG Title on Bridge -->
    <div 
      v-if="invitation.resepsi_venue || (invitation.streaming_enabled && invitation.streaming_url)"
      ref="resepsiTitleRef"
      class="absolute inset-0 z-[4] pointer-events-none opacity-0"
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
      class="absolute inset-0 z-[2] pointer-events-none opacity-0"
    >
      <div 
        style="
          position: absolute;
          top: 5dvh;                  /* MUDAH DIEDIT: Posisi dari atas */
          left: 50%;
          transform: translateX(-50%);
          width: 85%;
          max-width: 350px;
          height: 41dvh;              /* MUDAH DIEDIT: Tinggi kontainer */
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 20px 24px 20px; /* MUDAH DIEDIT: Padding kontainer */
          overflow: hidden;           /* NO SCROLL */
          pointer-events: auto;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255, 255, 255, 0.55);
          border-radius: 9999px 9999px 0px 0px;
          box-shadow: 0px 10px 30px rgba(106, 78, 66, 0.1);
        "
      >
        <!-- Heart Divider (Top) -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; opacity: 0.8; margin-top: 5px; margin-bottom: 12px;">
          <span style="height: 1px; width: 40px; background: rgba(186, 125, 133, 0.5);"></span>
          <Icon icon="ph:heart-fill" style="width: 12px; height: 12px; color: #BA7D85;" />
          <span style="height: 1px; width: 40px; background: rgba(186, 125, 133, 0.5);"></span>
        </div>

        <!-- Details block wrapper (centered on card, left-aligned content) -->
        <div style="width: 100%; display: flex; justify-content: center; margin-top: 4px; margin-bottom: 4px;">
          <div style="display: flex; flex-direction: column; align-items: flex-start; text-align: left; width: fit-content; max-width: 290px; gap: 10px; color: #6A4E42; font-weight: 600; font-size: 13px;">
            <div v-if="invitation.resepsi_date" style="display: flex; align-items: center; gap: 10px; width: 100%;">
              <Icon icon="ph:calendar-blank-duotone" style="width: 17px; height: 17px; color: #BA7D85; flex-shrink: 0;" />
              <span>{{ formatDateLong(invitation.resepsi_date) }}</span>
            </div>
            <div v-if="invitation.resepsi_time" style="display: flex; align-items: center; gap: 10px; width: 100%;">
              <Icon icon="ph:clock-duotone" style="width: 17px; height: 17px; color: #BA7D85; flex-shrink: 0;" />
              <span>{{ formatTime(invitation.resepsi_time) }}</span>
            </div>
            <div v-if="invitation.resepsi_venue" style="display: flex; align-items: flex-start; gap: 10px; width: 100%;">
              <Icon icon="ph:map-pin-duotone" style="width: 17px; height: 17px; color: #BA7D85; flex-shrink: 0; margin-top: 2px;" />
              <div>
                <strong style="font-weight: 700; display: block; color: #5A1E25; font-size: 13.5px;">{{ invitation.resepsi_venue }}</strong>
                <span v-if="invitation.resepsi_address" style="font-size: 11px; color: rgba(106, 78, 66, 0.85); font-weight: 500; line-height: 1.5; display: block; margin-top: 2px; max-width: 280px;">
                  {{ invitation.resepsi_address }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Heart Divider (Bottom) -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; opacity: 0.8; margin-top: 12px; margin-bottom: 14px;">
          <span style="height: 1px; width: 40px; background: rgba(186, 125, 133, 0.5);"></span>
          <Icon icon="ph:heart-fill" style="width: 12px; height: 12px; color: #BA7D85;" />
          <span style="height: 1px; width: 40px; background: rgba(186, 125, 133, 0.5);"></span>
        </div>

        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; width: 100%; margin-top: 4px; margin-bottom: 4px;">
          <a v-if="invitation.resepsi_map_url" :href="invitation.resepsi_map_url" target="_blank" class="hover:scale-[1.03] active:scale-[0.98] transition-all duration-300" style="display: inline-flex; align-items: center; gap: 6px; padding: 7px 18px; border-radius: 9999px; background: linear-gradient(135deg, #8FA47F 0%, #6E875C 100%); color: #ffffff !important; font-weight: 700; font-size: 11.5px; text-decoration: none; box-shadow: 0px 3px 10px rgba(0,0,0,0.15); border: 1px solid rgba(255,255,255,0.25);">
            <Icon icon="ph:map-trifold-duotone" style="width: 14px; height: 14px;" /> Buka Maps
          </a>
          <a v-if="invitation.resepsi_date" :href="getResepsiCalendarUrl()" target="_blank" class="hover:scale-[1.03] active:scale-[0.98] transition-all duration-300" style="display: inline-flex; align-items: center; gap: 6px; padding: 7px 18px; border-radius: 9999px; background: linear-gradient(135deg, #D49BA2 0%, #BA7D85 100%); color: #ffffff !important; font-weight: 700; font-size: 11.5px; text-decoration: none; box-shadow: 0px 3px 10px rgba(0,0,0,0.15); border: 1px solid rgba(255,255,255,0.25);">
            <Icon icon="ph:calendar-plus-duotone" style="width: 14px; height: 14px; color: white;" /> Ingatkan Saya
          </a>
        </div>
      </div>
    </div>

    <!-- Step 3: Live Streaming Section (Info above the bridge) -->
    <div 
      v-if="invitation.streaming_enabled && invitation.streaming_url"
      ref="streamingCardRef"
      class="absolute inset-0 z-[2] pointer-events-none opacity-0"
    >
      <div 
        style="
          position: absolute;
          top: 5dvh;                  /* MUDAH DIEDIT: Posisi dari atas */
          left: 50%;
          transform: translateX(-50%);
          width: 85%;
          max-width: 350px;
          height: 38dvh;              /* MUDAH DIEDIT: Tinggi kontainer */
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 20px 24px 20px; /* MUDAH DIEDIT: Padding kontainer */
          overflow: hidden;           /* NO SCROLL */
          pointer-events: auto;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255, 255, 255, 0.55);
          border-radius: 9999px 9999px 0px 0px;
          box-shadow: 0px 10px 30px rgba(106, 78, 66, 0.1);
        "
      >
        <!-- Heart Divider (Top) -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; opacity: 0.8; margin-top: 5px; margin-bottom: 8px;">
          <span style="height: 1px; width: 40px; background: rgba(186, 125, 133, 0.5);"></span>
          <Icon icon="ph:heart-fill" style="width: 12px; height: 12px; color: #BA7D85;" />
          <span style="height: 1px; width: 40px; background: rgba(186, 125, 133, 0.5);"></span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; text-align: center; width: 100%; margin-top: 4px; margin-bottom: 4px;">
          <div style="display: flex; align-items: center; gap: 8px; justify-content: center; width: 100%; margin-bottom: 6px;">
            <Icon icon="ph:video-camera-duotone" style="width: 16px; height: 16px; color: #BA7D85;" />
            <span style="font-weight: 700; font-size: 13.5px; color: #5A1E25;">Live Streaming</span>
          </div>
          <p style="font-size: 11px; color: rgba(106, 78, 66, 0.9); font-weight: 500; line-height: 1.5; max-width: 260px; margin-bottom: 8px;">
            Anda dapat mengikuti acara kami secara virtual melalui tautan berikut:
          </p>
          <div style="position: relative; width: 100%; max-width: 180px; aspect-ratio: 16/9; border-radius: 8px; overflow: hidden; box-shadow: 0px 2px 8px rgba(0,0,0,0.1); border: 1px solid rgba(186, 125, 133, 0.2); background: rgba(0,0,0,0.05);">
            <iframe 
              :src="getEmbedUrl(invitation.streaming_url, invitation.streaming_platform || 'youtube') || ''" 
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen>
            </iframe>
          </div>
        </div>

        <!-- Heart Divider (Bottom) -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; opacity: 0.8; margin-top: 8px; margin-bottom: 12px;">
          <span style="height: 1px; width: 40px; background: rgba(186, 125, 133, 0.5);"></span>
          <Icon icon="ph:heart-fill" style="width: 12px; height: 12px; color: #BA7D85;" />
          <span style="height: 1px; width: 40px; background: rgba(186, 125, 133, 0.5);"></span>
        </div>

        <div style="display: flex; justify-content: center; width: 100%; margin-top: 4px; margin-bottom: 4px;">
          <a :href="invitation.streaming_url" target="_blank" class="hover:scale-[1.03] active:scale-[0.98] transition-all duration-300" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 18px; border-radius: 9999px; background: linear-gradient(135deg, #D49BA2 0%, #BA7D85 100%); color: #ffffff !important; font-weight: 700; font-size: 11px; text-decoration: none; box-shadow: 0px 3px 10px rgba(0,0,0,0.15); border: 1px solid rgba(255,255,255,0.25);">
            <Icon icon="ph:play-circle-duotone" style="width: 12px; height: 12px;" /> Gabung Live
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
const akadTitleRef = ref<HTMLElement | null>(null);
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
    if (akadTitleRef.value) {
      gsap.set(akadTitleRef.value, { opacity: 0, scale: 0.95 });
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

    if (akadTitleRef.value) {
      tl.to(akadTitleRef.value, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, 0.3);
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
    if (akadTitleRef.value) {
      tl.to(akadTitleRef.value, {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: 'power2.in',
      }, '<');
    }
    if (akadCardRef.value) {
      tl.to(akadCardRef.value, {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: 'power2.in',
      }, '<');
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
