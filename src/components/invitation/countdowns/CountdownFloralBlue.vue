<template>
  <section v-if="hasDate || invitation.akad_venue || invitation.resepsi_venue" ref="sectionRef" class="relative min-h-[100dvh] overflow-hidden flex items-center justify-center">
    
    <!-- Background Layer (Sky) -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <img
        src="https://media.mengundanganda.com/floral-blue/cover%20section/randidewi_28658e27-e94d-40ca-b897-607ef8ea0d83.webp"
        alt="Sky Background"
        class="min-w-full min-h-full w-full h-full object-cover object-center"
      />
    </div>

    <!-- Container for all content -->
    <div class="relative z-10 w-full h-full flex items-center justify-center">
      
      <!-- LAYER 1: COUNTDOWN -->
      <div ref="countdownRef" class="absolute inset-0 flex flex-col items-center justify-center text-center px-4" style="opacity: 1;">
        <h2 class="text-3xl md:text-4xl mb-8 font-bold" :style="{ fontFamily: themeConfig.fontHeading, color: themeConfig.primary || '#1e293b' }">
          Menghitung Hari
        </h2>
        <div class="flex gap-4 md:gap-8 justify-center">
          <div class="flex flex-col items-center">
            <div class="text-4xl md:text-5xl font-bold text-[#2c3e50]" :style="{ fontFamily: themeConfig.fontHeading }">{{ countdown.days }}</div>
            <div class="text-xs md:text-sm uppercase tracking-widest text-[#4a5c6a] mt-2">Hari</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-4xl md:text-5xl font-bold text-[#2c3e50]" :style="{ fontFamily: themeConfig.fontHeading }">{{ countdown.hours }}</div>
            <div class="text-xs md:text-sm uppercase tracking-widest text-[#4a5c6a] mt-2">Jam</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-4xl md:text-5xl font-bold text-[#2c3e50]" :style="{ fontFamily: themeConfig.fontHeading }">{{ countdown.minutes }}</div>
            <div class="text-xs md:text-sm uppercase tracking-widest text-[#4a5c6a] mt-2">Menit</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-4xl md:text-5xl font-bold text-[#2c3e50]" :style="{ fontFamily: themeConfig.fontHeading }">{{ countdown.seconds }}</div>
            <div class="text-xs md:text-sm uppercase tracking-widest text-[#4a5c6a] mt-2">Detik</div>
          </div>
        </div>
      </div>

      <!-- LAYER 2 & 3 moved to decorContainerRef -->

      <!-- BACKGROUND DECOR (Zooms) -->
      <div ref="decorBgRef" class="absolute inset-0 pointer-events-none z-10" style="transform-origin: 50% 80%;">
        <!-- Event Decoration -->
        <img
          ref="eventDecorRef"
          src="https://media.mengundanganda.com/floral-blue/event%20section/randidewi_8903c563-e7ae-47f8-93c1-751c9a0581cf.webp"
          alt="Decoration"
          class="absolute bottom-0 left-0 w-full object-cover object-bottom"
          style="opacity: 0;"
        />
  
        <!-- Resepsi Decoration -->
        <img
          ref="resepsiDecorRef"
          src="https://media.mengundanganda.com/floral-blue/event%20section/randidewi_9ff09159-90b3-416a-bad5-a99a71be6993.webp"
          alt="Resepsi Decoration"
          class="absolute bottom-0 left-0 w-full object-cover object-bottom"
          style="opacity: 0;"
        />
      </div>

      <!-- TEXT OVERLAY (Full Screen, Does NOT Zoom) -->
      <div ref="overlayRef" class="absolute inset-0 z-[15] pointer-events-auto flex items-center justify-center px-6 pb-[8vh]" style="visibility: hidden; opacity: 0;">
        <div class="grid w-full max-w-[320px]">
          
          <!-- LAYER 2: AKAD -->
          <div ref="akadRef" class="row-start-1 col-start-1 flex flex-col items-center justify-center pointer-events-none" style="visibility: hidden; opacity: 0;">
            <div style="background: rgba(255,255,255,0.55); backdrop-filter: blur(24px) saturate(1.6); -webkit-backdrop-filter: blur(24px) saturate(1.6); border: 1px solid rgba(255,255,255,0.7); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.3) inset; padding: 28px 24px 22px; text-align: center; display: flex; flex-direction: column; align-items: center; width: 100%;" class="pointer-events-auto">
              <h2 class="text-4xl md:text-5xl mb-2 font-bold" :style="{ fontFamily: themeConfig.fontHeading, color: themeConfig.primary || '#1e293b' }">
                Akad Nikah
              </h2>
              <p class="text-sm font-semibold text-[#2c3e50] mb-0.5">{{ formatDateLong(invitation.akad_date) }}</p>
              <p class="text-xs font-medium tracking-[0.15em] uppercase text-[#4a5c6a]/80 mb-3">{{ invitation.akad_time }} WIB</p>
              <div style="width: 32px; height: 1px; background: rgba(44,62,80,0.15); margin-bottom: 12px; border-radius: 1px;"></div>
              <p class="font-bold text-[#1e293b] text-base mb-1">{{ invitation.akad_venue }}</p>
              <p class="text-xs text-[#4a5c6a] leading-relaxed px-1">{{ invitation.akad_address }}</p>
              
              <div style="display: flex; gap: 10px; width: 100%; margin-top: 18px;">
                <a v-if="invitation.akad_map_url" :href="invitation.akad_map_url" target="_blank" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 10px 0; background: var(--theme-primary); backdrop-filter: blur(8px); color: white; border-radius: 14px; font-size: 12px; font-weight: 600; letter-spacing: 0.03em; text-decoration: none; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 1px solid rgba(255,255,255,0.2); transition: all 0.2s;">
                  <Icon icon="ph:map-pin-fill" style="font-size: 15px;" />
                  Buka Maps
                </a>
                <a v-if="invitation.akad_date" :href="getAkadCalendarUrl()" target="_blank" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 10px 0; background: rgba(255,255,255,0.8); backdrop-filter: blur(8px); color: var(--theme-primary); border: 1px solid var(--theme-primary); border-radius: 14px; font-size: 12px; font-weight: 600; letter-spacing: 0.03em; text-decoration: none; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 0.2s;">
                  <Icon icon="ph:calendar-plus-fill" style="font-size: 15px;" />
                  Ingatkan
                </a>
              </div>
            </div>
          </div>

          <!-- LAYER 3: RESEPSI -->
          <div ref="resepsiRef" class="row-start-1 col-start-1 flex flex-col items-center justify-center pointer-events-none" style="visibility: hidden; opacity: 0;">
            <div style="background: rgba(255,255,255,0.55); backdrop-filter: blur(24px) saturate(1.6); -webkit-backdrop-filter: blur(24px) saturate(1.6); border: 1px solid rgba(255,255,255,0.7); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.3) inset; padding: 28px 24px 22px; text-align: center; display: flex; flex-direction: column; align-items: center; width: 100%;" class="pointer-events-auto">
              <h2 class="text-4xl md:text-5xl mb-2 font-bold" :style="{ fontFamily: themeConfig.fontHeading, color: themeConfig.primary || '#1e293b' }">
                Resepsi
              </h2>
              <p class="text-sm font-semibold text-[#2c3e50] mb-0.5">{{ formatDateLong(invitation.resepsi_date) }}</p>
              <p class="text-xs font-medium tracking-[0.15em] uppercase text-[#4a5c6a]/80 mb-3">{{ invitation.resepsi_time }} WIB</p>
              <div style="width: 32px; height: 1px; background: rgba(44,62,80,0.15); margin-bottom: 12px; border-radius: 1px;"></div>
              <p class="font-bold text-[#1e293b] text-base mb-1">{{ invitation.resepsi_venue }}</p>
              <p class="text-xs text-[#4a5c6a] leading-relaxed px-1">{{ invitation.resepsi_address }}</p>
              
              <div style="display: flex; gap: 10px; width: 100%; margin-top: 18px;">
                <a v-if="invitation.resepsi_map_url" :href="invitation.resepsi_map_url" target="_blank" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 10px 0; background: var(--theme-primary); backdrop-filter: blur(8px); color: white; border-radius: 14px; font-size: 12px; font-weight: 600; letter-spacing: 0.03em; text-decoration: none; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 1px solid rgba(255,255,255,0.2); transition: all 0.2s;">
                  <Icon icon="ph:map-pin-fill" style="font-size: 15px;" />
                  Buka Maps
                </a>
                <a v-if="invitation.resepsi_date" :href="getResepsiCalendarUrl()" target="_blank" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 10px 0; background: rgba(255,255,255,0.8); backdrop-filter: blur(8px); color: var(--theme-primary); border: 1px solid var(--theme-primary); border-radius: 14px; font-size: 12px; font-weight: 600; letter-spacing: 0.03em; text-decoration: none; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 0.2s;">
                  <Icon icon="ph:calendar-plus-fill" style="font-size: 15px;" />
                  Ingatkan
                </a>
              </div>
            </div>
          </div>

          <!-- LAYER 4: STREAM -->
          <div v-if="invitation.streaming_enabled && invitation.streaming_url" ref="streamRef" class="row-start-1 col-start-1 flex flex-col items-center justify-center pointer-events-none" style="visibility: hidden; opacity: 0;">
            <div style="background: rgba(255,255,255,0.55); backdrop-filter: blur(24px) saturate(1.6); -webkit-backdrop-filter: blur(24px) saturate(1.6); border: 1px solid rgba(255,255,255,0.7); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.3) inset; padding: 28px 24px 22px; text-align: center; display: flex; flex-direction: column; align-items: center; width: 100%;" class="pointer-events-auto">
              <h2 class="text-4xl md:text-5xl mb-2 font-bold" :style="{ fontFamily: themeConfig.fontHeading, color: themeConfig.primary || '#1e293b' }">
                Live Streaming
              </h2>
              <p class="text-xs font-medium text-[#2c3e50] mb-4 leading-relaxed px-2">Ikuti prosesi acara kami secara virtual.</p>
              
              <div class="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/50" style="box-shadow: 0 4px 16px rgba(0,0,0,0.1) inset;">
                <iframe 
                  :src="getEmbedUrl(invitation.streaming_url, invitation.streaming_platform || 'youtube') || ''" 
                  class="absolute top-0 left-0 w-full h-full"
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowfullscreen>
                </iframe>
              </div>
            </div>
          </div>


        </div>
      </div>

      <!-- FOREGROUND DECOR (Zooms) -->
      <div ref="decorFgRef" class="absolute inset-0 pointer-events-none z-30" style="transform-origin: 50% 80%;">
        
        <!-- ========================================== -->
        <!-- Bunga Top (Atas)                           -->
        <!-- ========================================== -->
        
        <!-- Perintilan Top Decoration (Kiri) -->
        <img
          ref="perintilanTopLeftRef"
          src="https://media.mengundanganda.com/floral-blue/event%20section/perintilan/randidewi_f47b576c-7d61-42b3-9aa5-2a119383c3ca.webp"
          alt="Perintilan Atas Kiri"
          class="absolute z-30 pointer-events-none"
          style="top: 0%; left: 0%; width: 60%; opacity: 0; transform: rotate(25deg);"
        />

        <!-- Perintilan Top Decoration 3 (Kiri) -->
        <img
          ref="perintilanTopLeft3Ref"
          src="https://media.mengundanganda.com/floral-blue/event%20section/perintilan/randidewi_b04dd7d3-1bda-4602-b5a5-a275fc86b4ab.webp"
          alt="Perintilan Atas Kiri 3"
          class="absolute z-30 pointer-events-none"
          style="top: 0; left: -10%; width: 60%; opacity: 0; transform: rotate(30deg);"
        />

        <!-- Perintilan Top Decoration 2 (Kiri) -->
        <img
          ref="perintilanTopLeft2Ref"
          src="https://media.mengundanganda.com/floral-blue/event%20section/perintilan/randidewi_cd05e830-e7bd-4a51-8850-13b86721fb0a.webp"
          alt="Perintilan Atas Kiri 2"
          class="absolute z-30 pointer-events-none"
          style="top: 10%; left: -10%; width: 60%; opacity: 0; transform: rotate(60deg);"
        />

        <!-- Perintilan Top Decoration (Kanan) -->
        <img
          ref="perintilanTopRightRef"
          src="https://media.mengundanganda.com/floral-blue/event%20section/perintilan/randidewi_f47b576c-7d61-42b3-9aa5-2a119383c3ca.webp"
          alt="Perintilan Atas Kanan"
          class="absolute z-30 pointer-events-none"
          style="top: 0%; right: 0%; width: 60%; opacity: 0; transform: scaleX(-1) rotate(25deg);"
        />

        <!-- Perintilan Top Decoration 3 (Kanan) -->
        <img
          ref="perintilanTopRight3Ref"
          src="https://media.mengundanganda.com/floral-blue/event%20section/perintilan/randidewi_b04dd7d3-1bda-4602-b5a5-a275fc86b4ab.webp"
          alt="Perintilan Atas Kanan 3"
          class="absolute z-30 pointer-events-none"
          style="top: 0; right: -10%; width: 60%; opacity: 0; transform: scaleX(-1) rotate(30deg);"
        />

        <!-- Perintilan Top Decoration 2 (Kanan) -->
        <img
          ref="perintilanTopRight2Ref"
          src="https://media.mengundanganda.com/floral-blue/event%20section/perintilan/randidewi_cd05e830-e7bd-4a51-8850-13b86721fb0a.webp"
          alt="Perintilan Atas Kanan 2"
          class="absolute z-30 pointer-events-none"
          style="top: 10%; right: -10%; width: 60%; opacity: 0; transform: scaleX(-1) rotate(60deg);"
        />

        <!-- Perintilan Top Decoration 4 (Kiri) - Mirrored -->
        <img
          ref="perintilanTopLeft4Ref"
          src="https://media.mengundanganda.com/floral-blue/event%20section/perintilan/randidewi_008764dc-96dc-4c3b-9ed9-11c261d2b7ba.webp"
          alt="Perintilan Atas Kiri 4"
          class="absolute z-40 pointer-events-none"
          style="top: 0; left: -50%; width: 60%; opacity: 0; transform: scaleX(-1) rotate(-15deg); transform-origin: top center;"
        />

        <!-- Perintilan Top Decoration 4 (Kanan) - Original -->
        <img
          ref="perintilanTopRight4Ref"
          src="https://media.mengundanganda.com/floral-blue/event%20section/perintilan/randidewi_008764dc-96dc-4c3b-9ed9-11c261d2b7ba.webp"
          alt="Perintilan Atas Kanan 4"
          class="absolute z-40 pointer-events-none"
          style="top: 0; right: -50%; width: 60%; opacity: 0; transform: rotate(-15deg); transform-origin: top center;"
        />

        <!-- Perintilan Top Decoration 5 (Kiri) - Original -->
        <img
          ref="perintilanTopLeft5Ref"
          src="https://media.mengundanganda.com/floral-blue/event%20section/perintilan/randidewi_56291f2d-a728-4ae7-a629-7f18ea29ce48.webp"
          alt="Perintilan Atas Kiri 5"
          class="absolute z-30 pointer-events-none"
          style="top: 0%; left: -10%; width: 50%; opacity: 0; transform: rotate(30deg);"
        />

        <!-- Perintilan Top Decoration 5 (Kanan) - Mirrored -->
        <img
          ref="perintilanTopRight5Ref"
          src="https://media.mengundanganda.com/floral-blue/event%20section/perintilan/randidewi_56291f2d-a728-4ae7-a629-7f18ea29ce48.webp"
          alt="Perintilan Atas Kanan 5"
          class="absolute z-30 pointer-events-none"
          style="top: 0%; right: -10%; width: 55%; opacity: 0; transform: scaleX(-1) rotate(30deg);"
        />




        <!-- ========================================== -->
        <!-- Bunga Bottom (Bawah)                       -->
        <!-- ========================================== -->

        <!-- Perintilan Decoration (Bawah Tengah) -->
        <img
          ref="perintilanBottomCenterRef"
          src="https://media.mengundanganda.com/floral-blue/event%20section/perintilan/randidewi_eccc9f3d-2a78-4e3a-8e21-8041ca457375.webp"
          alt="Perintilan Bawah Tengah"
          class="absolute z-30 pointer-events-none"
          style="bottom: -5%; left: 50%; transform: translateX(-50%); width: 40%; opacity: 0;"
        />

        <!-- Perintilan Decoration 6 (Bawah Kiri Dekat Tengah) -->
        <img
          ref="perintilanBottomLeft6Ref"
          src="https://media.mengundanganda.com/floral-blue/event%20section/perintilan/randidewi_56291f2d-a728-4ae7-a629-7f18ea29ce48.webp"
          alt="Perintilan Bawah Kiri Tengah"
          class="absolute z-30 pointer-events-none"
          style="bottom: -5%; left: 30%; width: 35%; opacity: 0;"
        />

        <!-- Perintilan Decoration 6 (Bawah Kanan Dekat Tengah) - Mirrored -->
        <img
          ref="perintilanBottomRight6Ref"
          src="https://media.mengundanganda.com/floral-blue/event%20section/perintilan/randidewi_56291f2d-a728-4ae7-a629-7f18ea29ce48.webp"
          alt="Perintilan Bawah Kanan Tengah"
          class="absolute z-30 pointer-events-none"
          style="bottom: -5%; right: 30%; width: 35%; opacity: 0; transform: scaleX(-1);"
        />

        <!-- Perintilan Decoration 3 (Bawah Kiri) - Original -->
        <img
          ref="perintilanBottomLeft3Ref"
          src="https://media.mengundanganda.com/floral-blue/event%20section/perintilan/randidewi_386e97bb-f51d-42a5-b50c-cbe70f575298.webp"
          alt="Perintilan Bawah Kiri 3"
          class="absolute z-20 pointer-events-none"
          style="bottom: -5%; left: 0%; width: 45%; opacity: 0;"
        />

        <!-- Perintilan Decoration 3 (Bawah Kanan) - Mirrored -->
        <img
          ref="perintilanBottomRight3Ref"
          src="https://media.mengundanganda.com/floral-blue/event%20section/perintilan/randidewi_386e97bb-f51d-42a5-b50c-cbe70f575298.webp"
          alt="Perintilan Bawah Kanan 3"
          class="absolute z-20 pointer-events-none"
          style="bottom: -5%; right: 0%; width: 45%; opacity: 0; transform: scaleX(-1);"
        />


        <!-- Perintilan Decoration 5 (Bawah Kiri) - Original -->
        <img
          ref="perintilanBottomLeft5Ref"
          src="https://media.mengundanganda.com/floral-blue/event%20section/perintilan/randidewi_735213a4-916e-4141-b8f7-09920df94a59.webp"
          alt="Perintilan Bawah Kiri 5"
          class="absolute z-20 pointer-events-none"
          style="bottom: -5%; left: -10%; width: 45%; opacity: 0;"
        />

        <!-- Perintilan Decoration 5 (Bawah Kanan) - Mirrored -->
        <img
          ref="perintilanBottomRight5Ref"
          src="https://media.mengundanganda.com/floral-blue/event%20section/perintilan/randidewi_735213a4-916e-4141-b8f7-09920df94a59.webp"
          alt="Perintilan Bawah Kanan 5"
          class="absolute z-20 pointer-events-none"
          style="bottom: -5%; right: -10%; width: 45%; opacity: 0; transform: scaleX(-1);"
        />

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { generateGoogleCalendarUrl } from '@/utils/calendar';
import { getEmbedUrl } from '@/utils/streaming';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  themeConfig: ThemeConfig;
  hasDate: boolean;
  invitation: Invitation;
}>();

const sectionRef = ref<HTMLElement | null>(null);
const countdownRef = ref<HTMLElement | null>(null);
const akadRef = ref<HTMLElement | null>(null);
const resepsiRef = ref<HTMLElement | null>(null);
const streamRef = ref<HTMLElement | null>(null);
const overlayRef = ref<HTMLElement | null>(null);
const decorBgRef = ref<HTMLElement | null>(null);
const decorFgRef = ref<HTMLElement | null>(null);
const eventDecorRef = ref<HTMLElement | null>(null);
const resepsiDecorRef = ref<HTMLElement | null>(null);
const perintilanLeftRef = ref<HTMLElement | null>(null);
const perintilanRightRef = ref<HTMLElement | null>(null);
const perintilanBottomCenterRef = ref<HTMLElement | null>(null);
const perintilanBottomLeft2Ref = ref<HTMLElement | null>(null);
const perintilanBottomRight2Ref = ref<HTMLElement | null>(null);
const perintilanBottomLeft3Ref = ref<HTMLElement | null>(null);
const perintilanBottomRight3Ref = ref<HTMLElement | null>(null);
const perintilanBottomLeft4Ref = ref<HTMLElement | null>(null);
const perintilanBottomRight4Ref = ref<HTMLElement | null>(null);
const perintilanBottomLeft5Ref = ref<HTMLElement | null>(null);
const perintilanBottomRight5Ref = ref<HTMLElement | null>(null);
const perintilanBottomLeft6Ref = ref<HTMLElement | null>(null);
const perintilanBottomRight6Ref = ref<HTMLElement | null>(null);
const perintilanBottomLeft7Ref = ref<HTMLElement | null>(null);
const perintilanBottomRight7Ref = ref<HTMLElement | null>(null);
const perintilanTopLeftRef = ref<HTMLElement | null>(null);
const perintilanTopRightRef = ref<HTMLElement | null>(null);
const perintilanTopLeft2Ref = ref<HTMLElement | null>(null);
const perintilanTopRight2Ref = ref<HTMLElement | null>(null);
const perintilanTopLeft3Ref = ref<HTMLElement | null>(null);
const perintilanTopRight3Ref = ref<HTMLElement | null>(null);
const perintilanTopLeft4Ref = ref<HTMLElement | null>(null);
const perintilanTopRight4Ref = ref<HTMLElement | null>(null);
const perintilanTopLeft5Ref = ref<HTMLElement | null>(null);
const perintilanTopRight5Ref = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;

function formatDateLong(dateStr?: string) { 
  if (!dateStr) return ''; 
  return new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); 
}

function getAkadCalendarUrl() { 
  return generateGoogleCalendarUrl({ 
    title: `Akad Nikah ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`, 
    date: props.invitation.akad_date!, 
    time: props.invitation.akad_time, 
    venue: props.invitation.akad_venue, 
    address: props.invitation.akad_address, 
    description: `Undangan Pernikahan ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}` 
  }); 
}

function getResepsiCalendarUrl() { 
  return generateGoogleCalendarUrl({ 
    title: `Resepsi ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`, 
    date: props.invitation.resepsi_date!, 
    time: props.invitation.resepsi_time, 
    venue: props.invitation.resepsi_venue, 
    address: props.invitation.resepsi_address, 
    description: `Undangan Pernikahan ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}` 
  }); 
}

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    // Determine active event layers (if missing data, skip them)
    const hasAkad = !!props.invitation.akad_venue;
    const hasResepsi = !!props.invitation.resepsi_venue;
    const hasStream = !!(props.invitation.streaming_enabled && props.invitation.streaming_url);
    
    // Independent entrance animation for the first decor (shows with Countdown)
    gsap.fromTo(eventDecorRef.value,
      { opacity: 0, y: '30%' },
      { opacity: 1, y: '0%', duration: 1.5, ease: 'power2.out', scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 80%',
        } 
      }
    );

    // Create the pinned timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: hasStream ? '+=500%' : '+=400%',
        pin: true,
        scrub: 1,
        refreshPriority: 5,
      }
    });

    // SCROLL 1: Zoom in to couple
    const firstEventRef = hasAkad ? akadRef.value : (hasResepsi ? resepsiRef.value : null);
    
    if (firstEventRef) {
      // Fade out countdown & zoom container
      tl.to(countdownRef.value, { 
        opacity: 0, 
        scale: 1.1, 
        duration: 1, 
        ease: 'power1.inOut' 
      });
      tl.to([decorBgRef.value, decorFgRef.value], { scale: 2.2, duration: 1, ease: 'power1.inOut' }, "<");

      // Hold zoom momentarily
      tl.to({}, { duration: 0.2 });

      // SCROLL 2: Crossfade Decors while zoomed
      tl.to(eventDecorRef.value, { opacity: 0, duration: 1, ease: 'none' });
      tl.fromTo(resepsiDecorRef.value, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'none' }, "<");

      // Hold crossfaded image momentarily
      tl.to({}, { duration: 0.2 });

      // SCROLL 3: Zoom out & Fade in Overlay + First Event
      tl.to([decorBgRef.value, decorFgRef.value], { scale: 1, duration: 1, ease: 'power1.inOut' });
      tl.fromTo(overlayRef.value,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1, ease: 'power2.out' },
        "<"
      );
      tl.fromTo(firstEventRef, 
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1, ease: 'power2.out' },
        "<"
      );
      const allPerintilans = [
          perintilanLeftRef.value, 
          perintilanRightRef.value, 
          perintilanBottomCenterRef.value,
          perintilanBottomLeft2Ref.value,
          perintilanBottomRight2Ref.value,
          perintilanBottomLeft3Ref.value,
          perintilanBottomRight3Ref.value,
          perintilanBottomLeft4Ref.value,
          perintilanBottomRight4Ref.value,
          perintilanBottomLeft5Ref.value,
          perintilanBottomRight5Ref.value,
          perintilanBottomLeft6Ref.value,
          perintilanBottomRight6Ref.value,
          perintilanBottomLeft7Ref.value,
          perintilanBottomRight7Ref.value,
          perintilanTopLeftRef.value, 
          perintilanTopRightRef.value,
          perintilanTopLeft2Ref.value,
          perintilanTopRight2Ref.value,
          perintilanTopLeft3Ref.value,
          perintilanTopRight3Ref.value,
          perintilanTopLeft4Ref.value,
          perintilanTopRight4Ref.value,
          perintilanTopLeft5Ref.value,
          perintilanTopRight5Ref.value
      ].filter(Boolean);

      tl.fromTo(allPerintilans,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power1.inOut' },
        "<"
      );

      // Separate assets into Top and Bottom pairs for identical partner sway
      const bottomPairs = [
        [perintilanBottomCenterRef.value], // Tengah tidak punya pasangan
        [perintilanBottomLeft2Ref.value, perintilanBottomRight2Ref.value],
        [perintilanBottomLeft3Ref.value, perintilanBottomRight3Ref.value],
        [perintilanBottomLeft4Ref.value, perintilanBottomRight4Ref.value],
        [perintilanBottomLeft5Ref.value, perintilanBottomRight5Ref.value],
        [perintilanBottomLeft6Ref.value, perintilanBottomRight6Ref.value],
        [perintilanBottomLeft7Ref.value, perintilanBottomRight7Ref.value]
      ].map(pair => pair.filter(Boolean)).filter(pair => pair.length > 0);

      const topPairs = [
        [perintilanTopLeftRef.value, perintilanTopRightRef.value],
        [perintilanTopLeft2Ref.value, perintilanTopRight2Ref.value],
        [perintilanTopLeft3Ref.value, perintilanTopRight3Ref.value],
        [perintilanTopLeft4Ref.value, perintilanTopRight4Ref.value],
        [perintilanTopLeft5Ref.value, perintilanTopRight5Ref.value]
      ].map(pair => pair.filter(Boolean)).filter(pair => pair.length > 0);

      // Bottom Flowers: Fast and pronounced sway
      bottomPairs.forEach((pair) => {
        gsap.set(pair, { transformOrigin: '50% 100%' }); // Pivot di bawah
        let rotVal = gsap.utils.random(4, 8);
        if (Math.random() > 0.5) rotVal = -rotVal; // Randomize starting direction
        const dur = gsap.utils.random(1.5, 3);
        const del = gsap.utils.random(0, 1.5);

        if (pair[0]) {
          gsap.to(pair[0], {
            rotation: `+=${rotVal}`,
            duration: dur,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: del
          });
        }
        if (pair[1]) {
          gsap.to(pair[1], {
            rotation: `-=${rotVal}`, // Berlawanan arah dengan kiri
            duration: dur,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: del
          });
        }
      });

      // Top Flowers: Fast sway, keep default pivot so they don't shift from their inline rotations
      topPairs.forEach((pair) => {
        let rotVal = gsap.utils.random(4, 8);
        if (Math.random() > 0.5) rotVal = -rotVal; // Randomize starting direction
        const dur = gsap.utils.random(1.5, 3);
        const del = gsap.utils.random(0, 2);

        if (pair[0]) {
          gsap.to(pair[0], {
            rotation: `+=${rotVal}`,
            duration: dur,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: del
          });
        }
        if (pair[1]) {
          gsap.to(pair[1], {
            rotation: `-=${rotVal}`, // Berlawanan arah dengan kiri
            duration: dur,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: del
          });
        }
      });
  
      // Hold First Event
      tl.to({}, { duration: 0.5 });
      
      // SCROLL 4: Transition from First Event to Second Event (if both exist)
      if (hasAkad && hasResepsi) {
        tl.to(akadRef.value, { 
          autoAlpha: 0, 
          duration: 1, 
          ease: 'power2.inOut' 
        });

        tl.fromTo(resepsiRef.value, 
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1, ease: 'power2.inOut' }
        );
        
        tl.to({}, { duration: 0.5 });
      }

      // SCROLL 5: Transition to Stream (if exists)
      if (hasStream) {
        const prevEventRef = (hasAkad && hasResepsi) ? resepsiRef.value : (hasResepsi ? resepsiRef.value : (hasAkad ? akadRef.value : null));
        if (prevEventRef) {
          tl.to(prevEventRef, { 
            autoAlpha: 0, 
            duration: 1, 
            ease: 'power2.inOut' 
          });
        }
        tl.fromTo(streamRef.value, 
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1, ease: 'power2.inOut' }
        );
        tl.to({}, { duration: 0.5 });
      }
    } else {
      tl.to(countdownRef.value, { 
        opacity: 0, 
        scale: 1.1, 
        duration: 1, 
        ease: 'power1.inOut' 
      });
      tl.to(eventDecorRef.value, { opacity: 0, duration: 1, ease: 'none' }, "<");
    }

  }, sectionRef.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>
