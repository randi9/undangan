<template>
  <section
    ref="countdownSection"
    class="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 md:px-8 py-12 overflow-hidden text-center box-border"
  >
    <!-- ======================================================== -->
    <!-- BACKGROUND IMAGE SECTION COUNTDOWN                       -->
    <!-- PANDUAN NGE-EDIT BACKGROUND:                             -->
    <!-- - Zoom (Skala) : Ubah 'scale(2.2)' (misal 2.0, 2.3, 2.5) -->
    <!-- - Geser Bawah/Atas (Y): Ubah nilai Y pada 'translate(0%, 0%)' (misal: 4% makin ke bawah, -4% makin ke atas) -->
    <!-- - Geser Kiri/Kanan (X): Ubah nilai X pada 'translate(0%, 0%)' (misal: -3% kiri, 3% kanan) -->
    <!-- ======================================================== -->
    <div
      style="
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background-image: url('https://media.mengundanganda.com/evergreen/countdown%20section/dewirandi_9dbeed92-b311-4f90-8c41-3a4f21b005c4.webp');
        background-size: cover;
        background-position: center bottom;
        background-repeat: no-repeat;
        transform: scale(2.2) translate(0%, 0%);
        transform-origin: center bottom;
      "
    ></div>

    <div class="w-full max-w-3xl mx-auto relative z-10 my-auto flex flex-col items-center justify-center">
      <!-- Section Header -->
      <div ref="headerRef" class="opacity-0 translate-y-6 mb-8 sm:mb-12">
        <span class="text-xs uppercase tracking-[0.3em] text-[#3D5447] font-bold block mb-2 drop-shadow-xs">
          Menghitung Hari
        </span>
        <h2
          class="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1B3024] font-medium leading-tight"
          style="font-family: 'Cormorant Garamond', Georgia, serif; text-shadow: 0 1px 3px rgba(255, 255, 255, 0.6);"
        >
          Menuju Hari Bahagia
        </h2>
        <div class="w-12 h-[1.5px] bg-[#5C7E6C] mx-auto mt-4"></div>
      </div>

      <!-- Countdown Grid -->
      <div
        v-if="hasDate"
        ref="gridRef"
        class="w-full grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 max-w-xl mx-auto mb-8 sm:mb-12"
      >
        <!-- Days -->
        <div ref="stoneDays" class="opacity-0 translate-y-8 bg-white/75 backdrop-blur-md rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 border border-white/60 shadow-[0_12px_32px_rgba(27,48,36,0.12)] flex flex-col items-center">
          <span class="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1B3024] leading-none mb-1.5 sm:mb-2" style="font-family: 'Cormorant Garamond', Georgia, serif;">
            {{ pad(countdown.days) }}
          </span>
          <span class="text-[9px] sm:text-xs uppercase tracking-widest text-[#3D5447] font-semibold">Hari</span>
        </div>

        <!-- Hours -->
        <div ref="stoneHours" class="opacity-0 translate-y-8 bg-white/75 backdrop-blur-md rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 border border-white/60 shadow-[0_12px_32px_rgba(27,48,36,0.12)] flex flex-col items-center">
          <span class="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1B3024] leading-none mb-1.5 sm:mb-2" style="font-family: 'Cormorant Garamond', Georgia, serif;">
            {{ pad(countdown.hours) }}
          </span>
          <span class="text-[9px] sm:text-xs uppercase tracking-widest text-[#3D5447] font-semibold">Jam</span>
        </div>

        <!-- Minutes -->
        <div ref="stoneMinutes" class="opacity-0 translate-y-8 bg-white/75 backdrop-blur-md rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 border border-white/60 shadow-[0_12px_32px_rgba(27,48,36,0.12)] flex flex-col items-center">
          <span class="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1B3024] leading-none mb-1.5 sm:mb-2" style="font-family: 'Cormorant Garamond', Georgia, serif;">
            {{ pad(countdown.minutes) }}
          </span>
          <span class="text-[9px] sm:text-xs uppercase tracking-widest text-[#3D5447] font-semibold">Menit</span>
        </div>

        <!-- Seconds -->
        <div ref="stoneSeconds" class="opacity-0 translate-y-8 bg-white/75 backdrop-blur-md rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 border border-white/60 shadow-[0_12px_32px_rgba(27,48,36,0.12)] flex flex-col items-center">
          <span class="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2D5A42] leading-none mb-1.5 sm:mb-2" style="font-family: 'Cormorant Garamond', Georgia, serif;">
            {{ pad(countdown.seconds) }}
          </span>
          <span class="text-[9px] sm:text-xs uppercase tracking-widest text-[#3D5447] font-semibold">Detik</span>
        </div>
      </div>

      <!-- Save Date Action Button -->
      <div v-if="calendarUrl" ref="actionRef" class="opacity-0 translate-y-4" style="margin-top: 16px; margin-bottom: 8px;">
        <a
          :href="calendarUrl"
          target="_blank"
          rel="noopener noreferrer"
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 14px 32px;
            border-radius: 9999px;
            background-color: rgba(47, 74, 59, 0.4);
            color: #ffffff;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            text-decoration: none;
            border: 1px solid rgba(255, 255, 255, 0.35);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            transition: all 0.3s ease;
          "
        >
          <svg style="width: 16px; height: 16px; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <span style="letter-spacing: 0.15em; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);">Simpan Ke Kalender</span>
        </a>
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
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  themeConfig: ThemeConfig;
  hasDate: boolean;
  invitation?: Invitation;
}>();

const countdownSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);
const actionRef = ref<HTMLElement | null>(null);

/* ============================================================
   BATU COUNTDOWN — satu per satu fade in
   Otak-atik di sini:
   - STONE_ORDER  : urut mana yang muncul duluan (yang paling
                    "bawah" ditaruh paling depan di array)
   - STONE_GAP    : jeda antar batu (detik)
   - STONE_DURASI : lama fade in tiap batu (detik)
   ============================================================ */
const stoneDays = ref<HTMLElement | null>(null);
const stoneHours = ref<HTMLElement | null>(null);
const stoneMinutes = ref<HTMLElement | null>(null);
const stoneSeconds = ref<HTMLElement | null>(null);

// Urutan: batu paling bawah dulu -> Detik, Menit, Jam, Hari
const STONE_ORDER = [stoneSeconds, stoneMinutes, stoneHours, stoneDays];
const STONE_GAP = 0.25;    // jeda antar batu
const STONE_DURASI = 0.7;  // durasi fade tiap batu

const pad = (num: number) => String(Math.max(0, num)).padStart(2, '0');

const calendarUrl = computed(() => {
  const dateStr = props.invitation?.akad_date || props.invitation?.resepsi_date;
  if (!dateStr) return '';
  
  const title = encodeURIComponent(`Pernikahan ${props.invitation?.groom_name || ''} & ${props.invitation?.bride_name || ''}`);
  const details = encodeURIComponent(`Acara Pernikahan ${props.invitation?.groom_full_name || ''} & ${props.invitation?.bride_full_name || ''}`);
  const location = encodeURIComponent(props.invitation?.akad_venue || props.invitation?.resepsi_venue || '');
  
  // Format YYYYMMDD
  const formattedDate = dateStr.replace(/-/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${formattedDate}/${formattedDate}`;
});

onMounted(() => {
  if (!countdownSection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: countdownSection.value,
      // Batu & header baru muncul setelah section ter-scroll ~setengah layar.
      // Mau lebih "berat" lagi? Kecilkan angkanya (mis. 'top 35%').
      start: 'top 50%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(headerRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.0,
    ease: 'power3.out'
  });

  // Batu muncul fade in satu per satu (tulisan ikut karena nempel di dalam kartu),
  // urutan mengikuti STONE_ORDER -> mulai dari batu paling bawah
  const stones = STONE_ORDER.map(s => s?.value).filter(Boolean) as HTMLElement[];
  if (stones.length) {
    tl.to(stones, {
      opacity: 1,
      y: 0,
      duration: STONE_DURASI,
      stagger: STONE_GAP,
      ease: 'power3.out'
    }, '-=0.5');
  }

  tl.to(actionRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.4');
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
