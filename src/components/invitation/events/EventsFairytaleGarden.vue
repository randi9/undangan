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

    <!-- Title and Introduction Header -->
    <div 
      ref="headerRef"
      class="absolute top-[10%] left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-10 flex flex-col items-center pointer-events-none"
    >
      <div v-if="invitation.groom_name && invitation.bride_name" style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: -0.25rem;">
        <span :style="{ fontFamily: themeConfig.fontHeading, fontSize: '2.5rem', color: '#D9A9AF', transform: 'rotate(-5deg)' }">{{ invitation.groom_name.charAt(0).toUpperCase() }}</span>
        <span :style="{ fontFamily: themeConfig.fontHeading, fontSize: '1.5rem', color: '#AEB8A3', fontStyle: 'italic', opacity: 0.8 }">&amp;</span>
        <span :style="{ fontFamily: themeConfig.fontHeading, fontSize: '2.5rem', color: '#D9A9AF', transform: 'rotate(5deg)' }">{{ invitation.bride_name.charAt(0).toUpperCase() }}</span>
      </div>
      <h2 class="text-3xl md:text-5xl mb-2 text-[#D9A9AF]" :style="{ fontFamily: themeConfig.fontHeading }">Acara</h2>
      <div class="flex items-center justify-center gap-4 text-[#AEB8A3]">
        <div class="h-px w-16 bg-[#AEB8A3] opacity-50"></div>
        <Icon icon="ph:calendar-heart-duotone" class="w-8 h-8" />
        <div class="h-px w-16 bg-[#AEB8A3] opacity-50"></div>
      </div>
    </div>

    <!-- Step 1: Akad Nikah Card (Bottom) -->
    <div 
      v-if="invitation.akad_venue"
      ref="akadCardRef"
      class="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[90%] max-w-[500px] p-6 md:p-8 rounded-3xl text-left shadow-lg pointer-events-auto"
      style="
        background: rgba(255, 255, 255, 0.45);
        backdrop-filter: blur(12px) saturate(120%);
        -webkit-backdrop-filter: blur(12px) saturate(120%);
        border: 1px solid rgba(255, 255, 255, 0.25);
        box-shadow: 0 8px 32px 0 rgba(255, 255, 255, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.2);
        z-index: 10;
        opacity: 0;
      "
    >
      <div class="flex items-center gap-4 mb-4">
        <Icon icon="ph:rings-duotone" class="w-10 h-10 text-[#AEB8A3]" />
        <h3 class="text-2xl font-normal text-[#D9A9AF]" :style="{ fontFamily: themeConfig.fontHeading }">Akad Nikah</h3>
      </div>
      <div class="space-y-3 text-sm md:text-base text-[#6A4E42]">
        <div v-if="invitation.akad_date" class="flex gap-3">
          <Icon icon="ph:calendar-blank-duotone" class="w-5 h-5 flex-shrink-0 mt-0.5 text-[#AEB8A3]" /> 
          <span>{{ formatDateLong(invitation.akad_date) }}</span>
        </div>
        <div v-if="invitation.akad_time" class="flex gap-3">
          <Icon icon="ph:clock-duotone" class="w-5 h-5 flex-shrink-0 mt-0.5 text-[#AEB8A3]" /> 
          <span>{{ invitation.akad_time }}</span>
        </div>
        <div v-if="invitation.akad_venue" class="flex gap-3">
          <Icon icon="ph:map-pin-duotone" class="w-5 h-5 flex-shrink-0 mt-0.5 text-[#AEB8A3]" />
          <span>
            <strong class="text-[#6A4E42]">{{ invitation.akad_venue }}</strong>
            <br v-if="invitation.akad_address" />
            <span class="text-xs text-[#9A7B6B]">{{ invitation.akad_address }}</span>
          </span>
        </div>
      </div>
      <div class="flex flex-wrap gap-2 mt-6">
        <a v-if="invitation.akad_map_url" :href="invitation.akad_map_url" target="_blank" class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#AEB8A3] text-white font-medium text-xs hover:bg-[#9A7B6B] transition-colors">
          <Icon icon="ph:map-trifold-duotone" class="w-4 h-4" /> Buka Maps
        </a>
        <a v-if="invitation.akad_date" :href="getAkadCalendarUrl()" target="_blank" class="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#AEB8A3] text-[#6A4E42] font-medium text-xs hover:bg-white/35 transition-colors">
          <Icon icon="ph:calendar-plus-duotone" class="w-4 h-4 text-[#AEB8A3]" /> Ingatkan Saya
        </a>
      </div>
    </div>

    <!-- Step 2: Resepsi & Live Streaming Card (Top) -->
    <div 
      v-if="invitation.resepsi_venue || (invitation.streaming_enabled && invitation.streaming_url)"
      ref="resepsiCardRef"
      class="absolute top-[6%] left-1/2 -translate-x-1/2 w-[90%] max-w-[700px] p-6 md:p-8 rounded-3xl text-left shadow-lg pointer-events-auto"
      style="
        background: rgba(255, 255, 255, 0.45);
        backdrop-filter: blur(12px) saturate(120%);
        -webkit-backdrop-filter: blur(12px) saturate(120%);
        border: 1px solid rgba(255, 255, 255, 0.25);
        box-shadow: 0 8px 32px 0 rgba(255, 255, 255, 0.15), inset 0 0 20px rgba(255, 255, 255, 0.2);
        max-height: 88dvh;
        overflow-y: auto;
        z-index: 10;
        opacity: 0;
      "
    >
      <div 
        :class="[
          'grid gap-6 w-full',
          invitation.resepsi_venue && invitation.streaming_enabled && invitation.streaming_url 
            ? 'md:grid-cols-2' 
            : 'grid-cols-1'
        ]"
      >
        <!-- Resepsi Column -->
        <div v-if="invitation.resepsi_venue" class="flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-4 mb-4">
              <Icon icon="ph:confetti-duotone" class="w-10 h-10 text-[#AEB8A3]" />
              <h3 class="text-2xl font-normal text-[#D9A9AF]" :style="{ fontFamily: themeConfig.fontHeading }">Resepsi</h3>
            </div>
            <div class="space-y-3 text-sm text-[#6A4E42]">
              <div v-if="invitation.resepsi_date" class="flex gap-3">
                <Icon icon="ph:calendar-blank-duotone" class="w-5 h-5 flex-shrink-0 mt-0.5 text-[#AEB8A3]" /> 
                <span>{{ formatDateLong(invitation.resepsi_date) }}</span>
              </div>
              <div v-if="invitation.resepsi_time" class="flex gap-3">
                <Icon icon="ph:clock-duotone" class="w-5 h-5 flex-shrink-0 mt-0.5 text-[#AEB8A3]" /> 
                <span>{{ invitation.resepsi_time }}</span>
              </div>
              <div v-if="invitation.resepsi_venue" class="flex gap-3">
                <Icon icon="ph:map-pin-duotone" class="w-5 h-5 flex-shrink-0 mt-0.5 text-[#AEB8A3]" />
                <span>
                  <strong class="text-[#6A4E42]">{{ invitation.resepsi_venue }}</strong>
                  <br v-if="invitation.resepsi_address" />
                  <span class="text-xs text-[#9A7B6B]">{{ invitation.resepsi_address }}</span>
                </span>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 mt-6">
            <a v-if="invitation.resepsi_map_url" :href="invitation.resepsi_map_url" target="_blank" class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#AEB8A3] text-white font-medium text-xs hover:bg-[#9A7B6B] transition-colors">
              <Icon icon="ph:map-trifold-duotone" class="w-4 h-4" /> Buka Maps
            </a>
            <a v-if="invitation.resepsi_date" :href="getResepsiCalendarUrl()" target="_blank" class="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#AEB8A3] text-[#6A4E42] font-medium text-xs hover:bg-white/35 transition-colors">
              <Icon icon="ph:calendar-plus-duotone" class="w-4 h-4 text-[#AEB8A3]" /> Ingatkan Saya
            </a>
          </div>
        </div>

        <!-- Live Streaming Column -->
        <div v-if="invitation.streaming_enabled && invitation.streaming_url" class="flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#EBCFD1]/30 pt-6 md:pt-0 md:pl-6">
          <div>
            <div class="flex items-center gap-4 mb-4">
              <Icon icon="ph:video-camera-duotone" class="w-10 h-10 text-[#AEB8A3]" />
              <h3 class="text-2xl font-normal text-[#D9A9AF]" :style="{ fontFamily: themeConfig.fontHeading }">Live Streaming</h3>
            </div>
            <p class="text-xs text-[#6A4E42] mb-4">
              Bagi keluarga & sahabat yang berhalangan hadir secara langsung, Anda dapat mengikuti acara kami secara virtual melalui tautan berikut:
            </p>
            <div class="relative w-full aspect-video rounded-xl overflow-hidden shadow-md border border-black/5 bg-black/5">
              <iframe 
                :src="getEmbedUrl(invitation.streaming_url, invitation.streaming_platform || 'youtube') || ''" 
                class="absolute top-0 left-0 w-full h-full"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
              </iframe>
            </div>
          </div>
          <div class="mt-4">
            <a :href="invitation.streaming_url" target="_blank" class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#D9A9AF] text-white font-medium text-xs hover:bg-[#c8989e] transition-colors">
              <Icon icon="ph:play-circle-duotone" class="w-4 h-4" /> Gabung Live
            </a>
          </div>
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
const resepsiCardRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    if (!eventSectionRef.value || !boatRef.value) return;

    // Create scroll timeline with ScrollTrigger pinning
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: eventSectionRef.value,
        start: 'top top',
        end: '+=300%', // 3 scroll steps
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
      gsap.set(akadCardRef.value, { opacity: 0, y: 50, scale: 0.95 });
    }
    if (resepsiCardRef.value) {
      gsap.set(resepsiCardRef.value, { opacity: 0, y: -50, scale: 0.95 });
    }

    // --- Phase 1: Scroll 1 ---
    // - Header fades out
    // - Boat moves to top: 10%
    // - Akad card fades in at the bottom
    tl.to(boatRef.value, {
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
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, 0.3);
    }

    // Spacer pause at the end of Phase 1 to let user read Akad Card
    tl.to({}, { duration: 0.4 });

    // --- Phase 2: Scroll 2 ---
    // - Akad card fades out
    // - Boat moves to top: 50%, size increases to 260px
    // - Resepsi card fades in at the top
    if (akadCardRef.value) {
      tl.to(akadCardRef.value, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.6,
        ease: 'power2.in',
      });
    }

    tl.to(boatRef.value, {
      top: '50%',
      duration: 1.0,
      ease: 'power1.inOut',
    }, '+=0.1');

    if (resepsiCardRef.value) {
      tl.to(resepsiCardRef.value, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, '+=0.2');
    }

    // Spacer pause at the end of Phase 2 to let user read Resepsi Card
    tl.to({}, { duration: 0.4 });

    // --- Phase 3: Scroll 3 ---
    // - Resepsi card fades out
    // - Boat moves past the bottom to top: 120% and size increases to 600px
    if (resepsiCardRef.value) {
      tl.to(resepsiCardRef.value, {
        opacity: 0,
        y: -50,
        scale: 0.95,
        duration: 0.6,
        ease: 'power2.in',
      });
    }

    tl.to(boatRef.value, {
      top: '120%',
      duration: 0.8, // Boat sails away off screen quickly
      ease: 'power1.in',
    }, '+=0.1');

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
</script>
