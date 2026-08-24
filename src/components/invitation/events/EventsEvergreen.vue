<template>
  <section
    ref="sectionRef"
    class="relative min-h-[100dvh] w-full flex flex-col items-center justify-center box-border overflow-hidden bg-[#2D3E35]"
  >
    <!-- ======================================================== -->
    <!-- 1. SHARED BACKGROUND IMAGE (PANORAMA VERTIKAL GAZEBO)    -->
    <!-- PANDUAN NGE-EDIT:                                        -->
    <!-- - Tinggi Panorama     : 'height: 200%' di bgWrapperRef (2x tinggi layar) -->
    <!-- - Posisi Awal (Bawah) : translateY(-50%) (fokus 100% padang rumput bawah) -->
    <!-- - Posisi Akhir (Atas) : yPercent: 0 (fokus 100% puncak kubah gazebo atas) -->
    <!-- ======================================================== -->
    <div
      ref="bgContainerRef"
      style="
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
      "
    >
      <div
        ref="bgWrapperRef"
        style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 200%;
          will-change: transform;
        "
      >
        <img
          ref="bgImageRef"
          src="https://media.mengundanganda.com/evergreen/countdown%20section/dewirandi_9dbeed92-b311-4f90-8c41-3a4f21b005c4.webp"
          alt="Evergreen Gazebo Garden"
          style="
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center top;
            will-change: transform;
          "
        />

        <!-- ======================================================== -->
        <!-- 4 BATU PIJAKAN GROUND (MENEMPEL DI RUMPUT & IKUT SLIDE)  -->
        <!-- PANDUAN NGE-EDIT POSISI & UKURAN:                        -->
        <!-- ======================================================== -->
        <div
          ref="countdownDecorRef"
          style="
            position: absolute;
            top: 50%;
            height: 50%;
            left: 0;
            width: 100%;
            pointer-events: none;
            user-select: none;
            z-index: 5;
          "
        >
          <!-- ---------------------------------------------------- -->
          <!-- 1. BATU 4 (PALING ATAS - DETIK)                      -->
          <!-- PANDUAN: top: 23.8%, left: 52%, width: 155px         -->
          <!-- ---------------------------------------------------- -->
          <div
            style="
              position: absolute;
              top: 23.8%;
              left: 52%;
              transform: translate(-50%, -50%);
              width: 155px;
              opacity: 1;
            "
          >
            <div style="position: relative; width: 100%; height: 100%;">
              <img
                src="https://media.mengundanganda.com/evergreen/countdown%20section/dewirandi_3413e0a7-5e28-44d0-a2ef-5bb6d9e052da.webp"
                alt="Batu Detik"
                style="display: block; width: 100%; height: auto; object-fit: contain;"
              />
              <div
                v-if="hasDateSafe"
                style="
                  position: absolute;
                  inset: 0;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  transform: translateY(-3px);
                "
              >
                <span
                  class="font-serif font-bold text-white leading-none"
                  style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 34px; text-shadow: 0 2px 6px rgba(0, 0, 0, 0.45), 0 1px 2px rgba(0, 0, 0, 0.55);"
                >
                  {{ pad(safeCountdown.seconds) }}
                </span>
                <span
                  class="font-semibold text-white/95 uppercase tracking-wider"
                  style="font-size: 11px; margin-top: 1px; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);"
                >
                  Detik
                </span>
              </div>
            </div>
          </div>

          <!-- ---------------------------------------------------- -->
          <!-- 2. BATU 3 (TENGAH ATAS - MENIT)                      -->
          <!-- PANDUAN: top: 38.5%, left: 46%, width: 210px         -->
          <!-- ---------------------------------------------------- -->
          <div
            style="
              position: absolute;
              top: 38.5%;
              left: 46%;
              transform: translate(-50%, -50%);
              width: 210px;
              opacity: 1;
            "
          >
            <div style="position: relative; width: 100%; height: 100%;">
              <img
                src="https://media.mengundanganda.com/evergreen/countdown%20section/dewirandi_3413e0a7-5e28-44d0-a2ef-5bb6d9e052da.webp"
                alt="Batu Menit"
                style="display: block; width: 100%; height: auto; object-fit: contain;"
              />
              <div
                v-if="hasDateSafe"
                style="
                  position: absolute;
                  inset: 0;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  transform: translateY(-4px);
                "
              >
                <span
                  class="font-serif font-bold text-white leading-none"
                  style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 46px; text-shadow: 0 2px 6px rgba(0, 0, 0, 0.45), 0 1px 2px rgba(0, 0, 0, 0.55);"
                >
                  {{ pad(safeCountdown.minutes) }}
                </span>
                <span
                  class="font-semibold text-white/95 uppercase tracking-wider"
                  style="font-size: 13px; margin-top: 1.5px; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);"
                >
                  Menit
                </span>
              </div>
            </div>
          </div>

          <!-- ---------------------------------------------------- -->
          <!-- 3. BATU 2 (TENGAH BAWAH - JAM)                       -->
          <!-- PANDUAN: top: 58%, left: 53.5%, width: 265px         -->
          <!-- ---------------------------------------------------- -->
          <div
            style="
              position: absolute;
              top: 58%;
              left: 53.5%;
              transform: translate(-50%, -50%);
              width: 265px;
              opacity: 1;
            "
          >
            <div style="position: relative; width: 100%; height: 100%;">
              <img
                src="https://media.mengundanganda.com/evergreen/countdown%20section/dewirandi_3413e0a7-5e28-44d0-a2ef-5bb6d9e052da.webp"
                alt="Batu Jam"
                style="display: block; width: 100%; height: auto; object-fit: contain;"
              />
              <div
                v-if="hasDateSafe"
                style="
                  position: absolute;
                  inset: 0;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  transform: translateY(-5px);
                "
              >
                <span
                  class="font-serif font-bold text-white leading-none"
                  style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 58px; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.45), 0 1px 2px rgba(0, 0, 0, 0.55);"
                >
                  {{ pad(safeCountdown.hours) }}
                </span>
                <span
                  class="font-semibold text-white/95 uppercase tracking-wider"
                  style="font-size: 15px; margin-top: 2px; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);"
                >
                  Jam
                </span>
              </div>
            </div>
          </div>

          <!-- ---------------------------------------------------- -->
          <!-- 4. BATU 1 (PALING BAWAH - HARI)                      -->
          <!-- PANDUAN: top: 85%, left: 47%, width: 320px           -->
          <!-- ---------------------------------------------------- -->
          <div
            style="
              position: absolute;
              top: 85%;
              left: 47%;
              transform: translate(-50%, -50%);
              width: 320px;
              opacity: 1;
            "
          >
            <div style="position: relative; width: 100%; height: 100%;">
              <img
                src="https://media.mengundanganda.com/evergreen/countdown%20section/dewirandi_3413e0a7-5e28-44d0-a2ef-5bb6d9e052da.webp"
                alt="Batu Hari"
                style="display: block; width: 100%; height: auto; object-fit: contain;"
              />
              <div
                v-if="hasDateSafe"
                style="
                  position: absolute;
                  inset: 0;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  transform: translateY(-6px);
                "
              >
                <span
                  class="font-serif font-bold text-white leading-none"
                  style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 72px; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.6);"
                >
                  {{ pad(safeCountdown.days) }}
                </span>
                <span
                  class="font-semibold text-white/95 uppercase tracking-widest"
                  style="font-size: 17px; margin-top: 2px; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);"
                >
                  Hari
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- 2. KONTEN HEADER COUNTDOWN (DI POSISI ATAS LAYAR)        -->
    <!-- ======================================================== -->
    <div
      ref="countdownContainerRef"
      class="w-full max-w-3xl mx-auto px-4 relative z-10 flex flex-col items-center justify-start text-center"
      style="position: absolute; top: 6.5%; left: 0; right: 0; margin: auto;"
    >
      <!-- Countdown Header Title -->
      <div class="mb-3">
        <span
          class="text-xs uppercase tracking-[0.3em] text-white font-bold block mb-1.5"
          style="text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6), 0 1px 2px rgba(0, 0, 0, 0.85);"
        >
          Menghitung Hari
        </span>
        <h2
          class="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-semibold leading-tight"
          style="font-family: 'Cormorant Garamond', Georgia, serif; text-shadow: 0 3px 8px rgba(0, 0, 0, 0.65), 0 1px 3px rgba(0, 0, 0, 0.85);"
        >
          Menuju Hari Bahagia
        </h2>
        <div class="w-12 h-[1.5px] bg-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] mx-auto mt-2.5"></div>
      </div>

      <!-- Tombol Simpan Ke Kalender -->
      <div v-if="calendarUrl" style="margin-top: 14px; margin-bottom: 8px;">
        <a
          :href="calendarUrl"
          target="_blank"
          rel="noopener noreferrer"
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 12px 28px;
            border-radius: 9999px;
            background-color: rgba(39, 70, 53, 0.4);
            color: #ffffff;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            text-decoration: none;
            border: 1px solid rgba(255, 255, 255, 0.5);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            transition: all 0.3s ease;
          "
        >
          <svg style="width: 16px; height: 16px; flex-shrink: 0; color: #ffffff;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <span style="color: #ffffff; font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);">Simpan Ke Kalender</span>
        </a>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- 3. KONTEN EVENTS / RANGKAIAN ACARA (FASE 2: DI DEPAN GAZEBO) -->
    <!-- ======================================================== -->
    <div
      ref="eventsContainerRef"
      class="w-full max-w-lg mx-auto px-4 relative z-20 flex flex-col items-center justify-center text-center opacity-0"
      style="position: absolute; inset: 0; margin: auto; height: fit-content; pointer-events: none;"
    >
      <!-- Events Header -->
      <div ref="eventsHeaderRef" class="mb-4 sm:mb-5">
        <span
          class="text-[10.5px] uppercase tracking-[0.3em] text-[#1F3A2C] font-bold block mb-1"
          style="text-shadow: 0 1px 3px rgba(255, 255, 255, 0.85);"
        >
          Rangkaian Acara
        </span>
        <h2
          class="text-2xl sm:text-3xl md:text-4xl font-serif text-[#162B20] font-semibold leading-tight"
          style="font-family: 'Cormorant Garamond', Georgia, serif; text-shadow: 0 2px 6px rgba(255, 255, 255, 0.9);"
        >
          Waktu & Lokasi
        </h2>
        <div class="w-10 h-[1.5px] bg-[#3F6350] mx-auto mt-2"></div>
      </div>

      <!-- Single Elegant Glass Card Container (Menampung Akad & Resepsi bergantian) -->
      <div
        ref="eventCardWrapperRef"
        class="relative w-full max-w-[340px] sm:max-w-[370px] min-h-[330px] sm:min-h-[350px] bg-white/85 backdrop-blur-md rounded-[28px] sm:rounded-[32px] border border-white/80 shadow-[0_20px_50px_rgba(27,48,36,0.25)] p-5 sm:p-6 flex items-center justify-center overflow-hidden pointer-events-auto"
      >
        <!-- Garis Aksen Dekoratif Lengkung Bagian Dalam (Inner Border) -->
        <div
          style="
            position: absolute;
            inset: 6px;
            border: 1px solid rgba(47, 74, 59, 0.2);
            border-radius: 24px;
            pointer-events: none;
          "
        ></div>

        <!-- ===================================================== -->
        <!-- KONTEN INFO AKAD NIKAH                                -->
        <!-- ===================================================== -->
        <div
          v-if="invitation.akad_date"
          ref="akadContentRef"
          class="w-full flex flex-col items-center justify-between text-center relative z-10 py-1"
        >
          <!-- Badge Akad Nikah -->
          <div class="flex items-center justify-center gap-1.5 mb-2.5">
            <span class="px-3.5 py-1 rounded-full bg-[#E4ECE7]/95 text-[#1F3A2C] text-[10px] font-bold uppercase tracking-widest border border-[#C2D6C9] shadow-xs">
              Akad Nikah
            </span>
          </div>

          <!-- Tanggal Akad -->
          <h3
            class="text-xl sm:text-2xl font-serif font-bold text-[#162B20] mb-2.5"
            style="font-family: 'Cormorant Garamond', Georgia, serif;"
          >
            {{ formatDate(invitation.akad_date) }}
          </h3>

          <!-- Detail Waktu & Lokasi -->
          <div class="space-y-2 text-xs text-[#3D5447] mb-4 w-full max-w-[280px]">
            <!-- Waktu -->
            <div class="flex items-center justify-center gap-2">
              <svg class="w-3.5 h-3.5 text-[#3F6350] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="font-medium">{{ invitation.akad_time || '08:00 WIB - Selesai' }}</span>
            </div>

            <!-- Tempat & Alamat -->
            <div class="flex flex-col items-center text-center gap-0.5">
              <div class="flex items-center gap-1 text-[#1B3024] font-semibold">
                <svg class="w-3.5 h-3.5 text-[#3F6350] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>{{ invitation.akad_venue }}</span>
              </div>
              <p v-if="invitation.akad_address" class="text-[11px] text-[#5C7367] leading-relaxed line-clamp-2">
                {{ invitation.akad_address }}
              </p>
            </div>
          </div>

          <!-- Tombol Peta Lokasi & Streaming -->
          <div class="w-full flex flex-col gap-2">
            <a
              v-if="invitation.akad_map_url"
              :href="invitation.akad_map_url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-full bg-[#2F4A3B] hover:bg-[#23382C] text-white transition-all duration-300 text-[10.5px] font-semibold uppercase tracking-wider shadow-sm"
            >
              <span>Buka Peta Lokasi</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>

            <!-- Streaming Button if no resepsi -->
            <a
              v-if="!invitation.resepsi_date && invitation.streaming_enabled && invitation.streaming_url"
              :href="invitation.streaming_url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-full bg-[#E4ECE7] hover:bg-[#D4E2D8] text-[#1F3A2C] text-[10px] font-semibold uppercase tracking-wider"
            >
              <span>Siaran Langsung (Live Streaming)</span>
            </a>
          </div>
        </div>

        <!-- ===================================================== -->
        <!-- KONTEN INFO RESEPSI PERNIKAHAN                        -->
        <!-- ===================================================== -->
        <div
          v-if="invitation.resepsi_date"
          ref="resepsiContentRef"
          class="w-full flex flex-col items-center justify-between text-center py-1"
          :style="invitation.akad_date ? 'position: absolute; inset: 0; padding: 20px 24px; z-index: 10; opacity: 0; pointer-events: none;' : 'position: relative; z-index: 10;'"
        >
          <!-- Badge Resepsi -->
          <div class="flex items-center justify-center gap-1.5 mb-2.5">
            <span class="px-3.5 py-1 rounded-full bg-[#E4ECE7]/95 text-[#1F3A2C] text-[10px] font-bold uppercase tracking-widest border border-[#C2D6C9] shadow-xs">
              Resepsi Pernikahan
            </span>
          </div>

          <!-- Tanggal Resepsi -->
          <h3
            class="text-xl sm:text-2xl font-serif font-bold text-[#162B20] mb-2.5"
            style="font-family: 'Cormorant Garamond', Georgia, serif;"
          >
            {{ formatDate(invitation.resepsi_date) }}
          </h3>

          <!-- Detail Waktu & Lokasi -->
          <div class="space-y-2 text-xs text-[#3D5447] mb-4 w-full max-w-[280px]">
            <!-- Waktu -->
            <div class="flex items-center justify-center gap-2">
              <svg class="w-3.5 h-3.5 text-[#3F6350] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="font-medium">{{ invitation.resepsi_time || '11:00 WIB - Selesai' }}</span>
            </div>

            <!-- Tempat & Alamat -->
            <div class="flex flex-col items-center text-center gap-0.5">
              <div class="flex items-center gap-1 text-[#1B3024] font-semibold">
                <svg class="w-3.5 h-3.5 text-[#3F6350] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>{{ invitation.resepsi_venue }}</span>
              </div>
              <p v-if="invitation.resepsi_address" class="text-[11px] text-[#5C7367] leading-relaxed line-clamp-2">
                {{ invitation.resepsi_address }}
              </p>
            </div>
          </div>

          <!-- Tombol Peta Lokasi & Streaming -->
          <div class="w-full flex flex-col gap-2">
            <a
              v-if="invitation.resepsi_map_url"
              :href="invitation.resepsi_map_url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-full bg-[#2F4A3B] hover:bg-[#23382C] text-white transition-all duration-300 text-[10.5px] font-semibold uppercase tracking-wider shadow-sm"
            >
              <span>Buka Peta Lokasi</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>

            <!-- Live Streaming Button -->
            <a
              v-if="invitation.streaming_enabled && invitation.streaming_url"
              :href="invitation.streaming_url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-full bg-[#E4ECE7] hover:bg-[#D4E2D8] text-[#1F3A2C] text-[10px] font-semibold uppercase tracking-wider"
            >
              <span>Siaran Langsung (Live Streaming)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Invitation } from '@/types/invitation';
import type { ThemeConfig } from '@/types/theme';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig?: ThemeConfig;
  countdown?: { days: number; hours: number; minutes: number; seconds: number };
  hasDate?: boolean;
}>();

const sectionRef = ref<HTMLElement | null>(null);
const bgContainerRef = ref<HTMLElement | null>(null);
const bgWrapperRef = ref<HTMLElement | null>(null);
const bgImageRef = ref<HTMLElement | null>(null);
const countdownDecorRef = ref<HTMLElement | null>(null);
const countdownContainerRef = ref<HTMLElement | null>(null);
const eventsContainerRef = ref<HTMLElement | null>(null);
const eventsHeaderRef = ref<HTMLElement | null>(null);
const eventCardWrapperRef = ref<HTMLElement | null>(null);
const akadContentRef = ref<HTMLElement | null>(null);
const resepsiContentRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;

const pad = (num: number) => String(Math.max(0, num)).padStart(2, '0');

const safeCountdown = computed(() => {
  return props.countdown || { days: 0, hours: 0, minutes: 0, seconds: 0 };
});

const hasDateSafe = computed(() => {
  return props.hasDate !== undefined
    ? props.hasDate
    : !!(props.invitation?.akad_date || props.invitation?.resepsi_date);
});

const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const calendarUrl = computed(() => {
  const dateStr = props.invitation?.akad_date || props.invitation?.resepsi_date;
  if (!dateStr) return '';

  const title = encodeURIComponent(
    `Pernikahan ${props.invitation?.groom_name || ''} & ${props.invitation?.bride_name || ''}`
  );
  const details = encodeURIComponent(
    `Acara Pernikahan ${props.invitation?.groom_full_name || ''} & ${props.invitation?.bride_full_name || ''}`
  );
  const location = encodeURIComponent(
    props.invitation?.akad_venue || props.invitation?.resepsi_venue || ''
  );

  const formattedDate = dateStr.replace(/-/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${formattedDate}/${formattedDate}`;
});

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    // POSISI AWAL (FASE COUNTDOWN):
    // yPercent: -50 menaikkan wrapper setinggi 100vh sehingga yang terlihat di layar adalah DASAR/BAWAH GAMBAR (padang rumput hijau)
    if (bgWrapperRef.value) {
      gsap.set(bgWrapperRef.value, { yPercent: -50 });
    }
    if (bgImageRef.value) {
      gsap.set(bgImageRef.value, { scale: 1.25, transformOrigin: 'center center' });
    }

    // PINNING TIMELINE: COUNTDOWN -> FULL SLIDE TO GAZEBO (TOP OF IMAGE) -> EVENTS IN -> AKAD -> RESEPSI -> EXIT
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
      },
    });

    // 1. Tahan tampilan countdown di awal (melihat bagian rumput/bawah gambar)
    tl.to({}, { duration: 0.2 });

    // 2. Header Countdown fade out & geser naik sedikit (Batu tetap utuh menempel di tanah dan ikut meluncur ke bawah bersama background)
    if (countdownContainerRef.value) {
      tl.to(countdownContainerRef.value, {
        opacity: 0,
        y: -25,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          if (countdownContainerRef.value) {
            countdownContainerRef.value.style.pointerEvents = 'none';
          }
        },
        onReverseComplete: () => {
          if (countdownContainerRef.value) {
            countdownContainerRef.value.style.pointerEvents = 'auto';
          }
        },
      });
    }

    // 3. SLIDE CEPAT & MULUS DARI DASAR BAWAH MENUJU PUNCAK ATAS (GAZEBO):
    //    yPercent bergerak dari -50% (bawah) menuju 0% (tepat pucuk atas kubah gazebo & langit)
    //    sambil zoom out dari 1.25 ke 1.0
    if (bgWrapperRef.value) {
      tl.to(
        bgWrapperRef.value,
        {
          yPercent: 0, // Pindah ke puncak atas gambar
          duration: 1.2,
          ease: 'power2.inOut',
        },
        'slideToGazebo'
      );
    }

    if (bgImageRef.value) {
      tl.to(
        bgImageRef.value,
        {
          scale: 1.0,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        'slideToGazebo'
      );
    }

    // 4. Jeda setelah slide mencapai gazebo
    tl.to({}, { duration: 0.2 });

    // 5. Events Container & Header mulai Fade In di depan Gazebo
    if (eventsContainerRef.value) {
      tl.to(
        eventsContainerRef.value,
        {
          opacity: 1,
          duration: 0.65,
          ease: 'power2.out',
          onStart: () => {
            if (eventsContainerRef.value) {
              eventsContainerRef.value.style.pointerEvents = 'auto';
            }
          },
          onReverseComplete: () => {
            if (eventsContainerRef.value) {
              eventsContainerRef.value.style.pointerEvents = 'none';
            }
          },
        },
        'eventsAppear'
      );
    }

    if (eventsHeaderRef.value) {
      tl.fromTo(
        eventsHeaderRef.value,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        'eventsAppear+=0.05'
      );
    }

    if (eventCardWrapperRef.value) {
      tl.fromTo(
        eventCardWrapperRef.value,
        { opacity: 0, scale: 0.94, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: 'power2.out' },
        'eventsAppear+=0.1'
      );
    }

    // 6. Hold info Akad Nikah
    tl.to({}, { duration: 1.1 });

    // 7. Jika ada Resepsi Pernikahan, lakukan pergantian halus (Akad out -> Resepsi in)
    const hasBoth = props.invitation?.akad_date && props.invitation?.resepsi_date;
    if (hasBoth) {
      if (akadContentRef.value) {
        tl.to(
          akadContentRef.value,
          {
            opacity: 0,
            y: -18,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
              if (akadContentRef.value) akadContentRef.value.style.pointerEvents = 'none';
            },
            onReverseComplete: () => {
              if (akadContentRef.value) akadContentRef.value.style.pointerEvents = 'auto';
            },
          },
          'akadOut'
        );
      }

      // Jeda gap card kosong sejenak
      tl.to({}, { duration: 0.35 });

      if (resepsiContentRef.value) {
        tl.fromTo(
          resepsiContentRef.value,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            onStart: () => {
              if (resepsiContentRef.value) resepsiContentRef.value.style.pointerEvents = 'auto';
            },
            onReverseComplete: () => {
              if (resepsiContentRef.value) resepsiContentRef.value.style.pointerEvents = 'none';
            },
          },
          'resepsiIn'
        );
      }

      // Hold info Resepsi
      tl.to({}, { duration: 1.1 });
    }

    // 8. Keluar ke section berikutnya (Love Story)
    if (eventsContainerRef.value) {
      tl.to(eventsContainerRef.value, {
        opacity: 0,
        y: -15,
        scale: 0.96,
        duration: 0.75,
        ease: 'power2.inOut',
      });
    }
  }, sectionRef.value);
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
});
</script>

<style scoped>
/* Scoped transitions & adjustments for Evergreen Countdown & Events */
</style>

