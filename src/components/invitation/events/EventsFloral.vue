<template>
  <!-- h-[100dvh] digunakan supaya Section murni seukuran 1 layar dinamis dan tidak merusak layout GSAP Pin Spacer -->
  <section v-if="invitation.akad_venue || invitation.resepsi_venue" ref="sectionRef" class="w-full h-[100dvh] overflow-hidden relative bg-[var(--theme-surface)]">
    
    <!-- Background Pemandian Event Utama -->
    <div ref="bgRef" class="absolute inset-0 w-full h-full" style="
      background-image: url('https://media.mengundanganda.com/tema%20floral/acara%20section/7de1e0a0-702e-4cbd-845e-a7b44faa28db.webp');
      background-size: cover;
      background-position: center;
      transform-origin: 0% 58%;
    "></div>

    <!-- Title / Initials Wrapper (Tampil di awal, hilang saat zoom) -->
    <div ref="titleRef" class="absolute top-[15%] inset-x-0 flex flex-col items-center justify-center z-10 pointer-events-none">
      <div v-if="invitation.groom_name && invitation.bride_name" style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 0.5rem; text-shadow: 1px 1px 4px rgba(255,255,255,0.8);">
        <span :style="{ fontFamily: themeConfig.fontHeading, fontSize: '2.75rem', color: 'var(--theme-primary)', transform: 'rotate(-5deg)' }">{{ invitation.groom_name.charAt(0).toUpperCase() }}</span>
        <span :style="{ fontFamily: themeConfig.fontHeading, fontSize: '2rem', color: 'var(--theme-secondary)', fontStyle: 'italic', opacity: 0.8 }">&amp;</span>
        <span :style="{ fontFamily: themeConfig.fontHeading, fontSize: '2.75rem', color: 'var(--theme-primary)', transform: 'rotate(5deg)' }">{{ invitation.bride_name.charAt(0).toUpperCase() }}</span>
      </div>
    </div>

    <!-- Overlay Hitam Pembayangan (untuk background warna terang) -->
    <div ref="overlayRef" class="absolute inset-0 pointer-events-none z-[1]" style="background-color: rgba(0,0,0,0);"></div>

    <!-- Kontainer Konten Dalam Papan Papan -->
    <div ref="boardRef" class="absolute inset-0 flex items-center justify-center z-[2]" style="opacity: 0;">
      <div class="relative flex items-center justify-center transform translate-y-[-1%]" style="width: clamp(280px, 70vw, 420px);">
        
        <!-- Papan Kosong Tak Kasatmata untuk menjaga dimensi pembungkus papan -->
        <img src="https://media.mengundanganda.com/tema%20floral/acara%20section/7de1e0a0-702e-4cbd-845e-a7b44faa28db.webp" 
             class="w-full pointer-events-none opacity-0" />

        <!-- TAB 1: INFORMASI AKAD NIKAH -->
        <div ref="akadRef" class="absolute inset-0 flex flex-col items-center justify-center px-10 pb-8 pt-2 text-center" style="opacity: 0;">
          <h3 class="text-2xl md:text-2xl font-medium drop-shadow-md tracking-[0.15em]" :style="{ fontFamily: themeConfig.fontHeading, color: 'white', marginTop: '-10px', marginBottom: '4px' }">Akad Nikah</h3>
          <img src="https://media.mengundanganda.com/tema%20floral/quotes%20section/sashkeh_f229438c-f0ae-4381-9521-b52bd72d0308.webp" style="width: clamp(144px, 20vw, 176px); opacity: 0.9; margin-top: -70px; margin-bottom: -45px; filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.3)); pointer-events: none;" alt="Decoration" />
          <div class="space-y-1 text-[11px] md:text-sm font-medium" style="color: white; text-shadow: 1px 1px 4px rgba(0,0,0,0.6);">
            <p v-if="invitation.akad_date">{{ formatDateLong(invitation.akad_date) }}</p>
            <p v-if="invitation.akad_time">{{ invitation.akad_time }}</p>
            <p v-if="invitation.akad_venue" class="font-semibold text-sm" style="margin-top:6px;">{{ invitation.akad_venue }}</p>
            <p v-if="invitation.akad_address" class="text-[10px] italic md:text-xs font-light opacity-90" style="margin-top:2px; margin-bottom:0px; line-height: 1.2;">{{ invitation.akad_address }}</p>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-top: 12px;">
            <a v-if="invitation.akad_map_url" :href="invitation.akad_map_url" target="_blank" 
               style="display: inline-flex; align-items: center; justify-content: center; padding: 6px 20px; border-radius: 9999px; font-size: 11px; font-weight: 600; color: white; background-color: transparent; border: 1.5px solid white; box-shadow: 0px 4px 6px rgba(0,0,0,0.2); transition: all 0.2s ease; cursor: pointer; text-decoration: none;"
               onmouseenter="this.style.backgroundColor='white'; this.style.color='black';"
               onmouseleave="this.style.backgroundColor='transparent'; this.style.color='white'; this.style.transform='scale(1)';"
               onmousedown="this.style.transform='scale(0.95)';"
               onmouseup="this.style.transform='scale(1)';">
              <Icon icon="ph:map-trifold-bold" style="font-size: 14px; margin-right: 6px;" /> Buka Maps
            </a>
            <a v-if="invitation.akad_date" :href="getAkadCalendarUrl()" target="_blank" 
               style="display: inline-flex; align-items: center; justify-content: center; padding: 6px 20px; border-radius: 9999px; font-size: 11px; font-weight: 600; color: white; background-color: transparent; border: 1.5px solid white; box-shadow: 0px 4px 6px rgba(0,0,0,0.2); transition: all 0.2s ease; cursor: pointer; text-decoration: none;"
               onmouseenter="this.style.backgroundColor='white'; this.style.color='black';"
               onmouseleave="this.style.backgroundColor='transparent'; this.style.color='white'; this.style.transform='scale(1)';"
               onmousedown="this.style.transform='scale(0.95)';"
               onmouseup="this.style.transform='scale(1)';">
              <Icon icon="ph:calendar-plus-bold" style="font-size: 14px; margin-right: 6px;" /> Ingatkan
            </a>
          </div>
        </div>

        <!-- TAB 2: INFORMASI RESEPSI PESTA -->
        <div ref="resepsiRef" class="absolute inset-0 flex flex-col items-center justify-center px-10 pb-8 pt-2 text-center translate-y-[-2%]" style="opacity: 0;">
          <h3 class="text-2xl md:text-2xl font-medium drop-shadow-md tracking-[0.15em]" :style="{ fontFamily: themeConfig.fontHeading, color: 'white', marginTop: '-10px', marginBottom: '4px' }">Resepsi</h3>
          <img src="https://media.mengundanganda.com/tema%20floral/quotes%20section/sashkeh_f229438c-f0ae-4381-9521-b52bd72d0308.webp" style="width: clamp(144px, 20vw, 176px); opacity: 0.9; margin-top: -70px; margin-bottom: -45px; filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.3)); pointer-events: none;" alt="Decoration" />
          <div class="space-y-1 text-[11px] md:text-sm font-medium" style="color: white; text-shadow: 1px 1px 4px rgba(0,0,0,0.6);">
            <p v-if="invitation.resepsi_date">{{ formatDateLong(invitation.resepsi_date) }}</p>
            <p v-if="invitation.resepsi_time">{{ invitation.resepsi_time }}</p>
            <p v-if="invitation.resepsi_venue" class="font-semibold text-sm" style="margin-top:6px;">{{ invitation.resepsi_venue }}</p>
            <p v-if="invitation.resepsi_address" class="text-[10px] italic md:text-xs font-light opacity-90" style="margin-top:2px; margin-bottom:0px; line-height: 1.2;">{{ invitation.resepsi_address }}</p>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-top: 12px;">
            <a v-if="invitation.resepsi_map_url" :href="invitation.resepsi_map_url" target="_blank"
               style="display: inline-flex; align-items: center; justify-content: center; padding: 6px 20px; border-radius: 9999px; font-size: 11px; font-weight: 600; color: white; background-color: transparent; border: 1.5px solid white; box-shadow: 0px 4px 6px rgba(0,0,0,0.2); transition: all 0.2s ease; cursor: pointer; text-decoration: none;"
               onmouseenter="this.style.backgroundColor='white'; this.style.color='black';"
               onmouseleave="this.style.backgroundColor='transparent'; this.style.color='white'; this.style.transform='scale(1)';"
               onmousedown="this.style.transform='scale(0.95)';"
               onmouseup="this.style.transform='scale(1)';">
              <Icon icon="ph:map-trifold-bold" style="font-size: 14px; margin-right: 6px;" /> Buka Maps
            </a>
            <a v-if="invitation.resepsi_date" :href="getResepsiCalendarUrl()" target="_blank"
               style="display: inline-flex; align-items: center; justify-content: center; padding: 6px 20px; border-radius: 9999px; font-size: 11px; font-weight: 600; color: white; background-color: transparent; border: 1.5px solid white; box-shadow: 0px 4px 6px rgba(0,0,0,0.2); transition: all 0.2s ease; cursor: pointer; text-decoration: none;"
               onmouseenter="this.style.backgroundColor='white'; this.style.color='black';"
               onmouseleave="this.style.backgroundColor='transparent'; this.style.color='white'; this.style.transform='scale(1)';"
               onmousedown="this.style.transform='scale(0.95)';"
               onmouseup="this.style.transform='scale(1)';">
              <Icon icon="ph:calendar-plus-bold" style="font-size: 14px; margin-right: 6px;" /> Ingatkan
            </a>
          </div>
        </div>

        <!-- TAB 3: LIVE STREAMING -->
        <div v-if="invitation.streaming_enabled && invitation.streaming_url" ref="streamRef" class="absolute inset-0 flex flex-col items-center justify-center px-6 pb-6 pt-2 text-center translate-y-[-2%]" style="opacity: 0;">
          <h3 class="text-2xl md:text-2xl font-medium drop-shadow-md tracking-[0.15em]" :style="{ fontFamily: themeConfig.fontHeading, color: 'white', marginTop: '-10px', marginBottom: '4px' }">Live Streaming</h3>
          <img src="https://media.mengundanganda.com/tema%20floral/quotes%20section/sashkeh_f229438c-f0ae-4381-9521-b52bd72d0308.webp" style="width: clamp(144px, 20vw, 176px); opacity: 0.9; margin-top: -70px; margin-bottom: -35px; filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.3)); pointer-events: none;" alt="Decoration" />
          <div class="space-y-1 text-[11px] md:text-sm font-medium" style="color: white; text-shadow: 1px 1px 4px rgba(0,0,0,0.6);">
            <p class="mt-4 mb-2 opacity-90 leading-snug">Ikuti prosesi acara kami secara virtual.</p>
          </div>
          <div style="width: 100%; max-width: 280px; aspect-ratio: 16/9; margin-top: 10px; border-radius: 8px; overflow: hidden; border: 1.5px solid rgba(255,255,255,0.3); box-shadow: 0px 4px 10px rgba(0,0,0,0.3); pointer-events: auto;">
            <iframe 
              :src="getEmbedUrl(invitation.streaming_url, invitation.streaming_platform || 'youtube') || ''" 
              style="width: 100%; height: 100%; border: none;"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen>
            </iframe>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { generateGoogleCalendarUrl } from '@/utils/calendar';
import { getEmbedUrl } from '@/utils/streaming';
import { Icon } from '@iconify/vue';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

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

const sectionRef = ref<HTMLElement | null>(null);
const bgRef = ref<HTMLElement | null>(null);
const overlayRef = ref<HTMLElement | null>(null);
const boardRef = ref<HTMLElement | null>(null);
const akadRef = ref<HTMLElement | null>(null);
const resepsiRef = ref<HTMLElement | null>(null);
const streamRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;
const hasStream = computed(() => props.invitation.streaming_enabled && props.invitation.streaming_url);
const onResize = () => ScrollTrigger.refresh();

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    // Initial states
    gsap.set(akadRef.value, { opacity: 0, pointerEvents: 'none' });
    gsap.set(resepsiRef.value, { opacity: 0, pointerEvents: 'none' });
    if (streamRef.value) gsap.set(streamRef.value, { opacity: 0, pointerEvents: 'none' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: hasStream.value ? '+=250%' : '+=150%',
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // SCROLL 1: Zoom In
    tl.to(titleRef.value, { opacity: 0, duration: 0.3, ease: 'power1.inOut' });
    tl.to(bgRef.value, { scale: 3.5, duration: 0.8, ease: 'power2.inOut' }, "<0.1");
    tl.to(overlayRef.value, { backgroundColor: 'rgba(0,0,0,0.5)', duration: 0.8, ease: 'power2.inOut' }, "<");
    tl.to(boardRef.value, { opacity: 1, duration: 0.3, ease: 'power1.inOut' }, "-=0.3");
    
    // Show Akad
    tl.to(akadRef.value, { opacity: 1, pointerEvents: 'auto', duration: 0.4 }, "-=0.1");
    tl.to({}, { duration: 0.3 }); // hold

    // SCROLL 2: Akad -> Resepsi
    if (props.invitation.resepsi_venue) {
      tl.to(akadRef.value, { opacity: 0, pointerEvents: 'none', duration: 0.3 });
      tl.to(resepsiRef.value, { opacity: 1, pointerEvents: 'auto', duration: 0.3 }, "<");
      tl.to({}, { duration: 0.3 }); // hold
    }

    // SCROLL 3: Resepsi -> Stream
    if (hasStream.value) {
      const prevRef = props.invitation.resepsi_venue ? resepsiRef.value : akadRef.value;
      if (prevRef) {
        tl.to(prevRef, { opacity: 0, pointerEvents: 'none', duration: 0.3 });
      }
      tl.to(streamRef.value, { opacity: 1, pointerEvents: 'auto', duration: 0.3 }, "<");
      tl.to({}, { duration: 0.3 }); // hold
    }

    // Prevent premature triggering by refreshing ScrollTrigger after components mount and load
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

  // Refresh ScrollTrigger ketika viewport berubah (address bar Chrome mobile muncul/hilang)
  window.addEventListener('resize', onResize);

  }, sectionRef.value);
});

onUnmounted(() => {
  ctx?.revert();
  window.removeEventListener('resize', onResize);
});
</script>

<style scoped>
</style>
