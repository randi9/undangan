<template>
  <!-- h-screen digunakan supaya Section murni seukuran 1 layar dan tidak merusak layout GSAP Pin Spacer -->
  <section v-if="invitation.akad_venue || invitation.resepsi_venue" ref="sectionRef" class="w-full h-screen overflow-hidden relative bg-[var(--theme-surface)]">
    
    <!-- Background Pemandian Event Utama -->
    <div ref="bgRef" class="absolute inset-0 w-full h-full" style="
      background-image: url('https://media.mengundanganda.fun/tema%20floral/acara%20section/7de1e0a0-702e-4cbd-845e-a7b44faa28db.webp');
      background-size: cover;
      background-position: center;
      transform-origin: 0% 58%;
    "></div>

    <!-- Overlay Hitam Pembayangan (untuk background warna terang) -->
    <div ref="overlayRef" class="absolute inset-0 pointer-events-none z-[1]" style="background-color: rgba(0,0,0,0);"></div>

    <!-- Kontainer Konten Dalam Papan Papan -->
    <div ref="boardRef" class="absolute inset-0 flex items-center justify-center z-[2]" style="opacity: 0;">
      <div class="relative flex items-center justify-center transform translate-y-[-5%]" style="width: clamp(280px, 70vw, 420px);">
        
        <!-- Papan Kosong Tak Kasatmata untuk menjaga dimensi pembungkus papan -->
        <img src="https://media.mengundanganda.fun/tema%20floral/acara%20section/7de1e0a0-702e-4cbd-845e-a7b44faa28db.webp" 
             class="w-full pointer-events-none opacity-0" />

        <!-- TAB 1: INFORMASI AKAD NIKAH -->
        <div ref="akadRef" class="absolute inset-0 flex flex-col items-center justify-center px-10 py-6 text-center" style="opacity: 0;">
          <div class="text-3xl mb-2 drop-shadow-md" style="line-height:1;">💍</div>
          <h3 class="text-2xl md:text-3xl font-bold mb-4 drop-shadow-md" :style="{ fontFamily: themeConfig.fontHeading, color: 'white' }">Akad Nikah</h3>
          <div class="space-y-2 text-sm md:text-base font-medium" style="color: white; text-shadow: 1px 1px 4px rgba(0,0,0,0.6);">
            <p v-if="invitation.akad_date">{{ formatDateLong(invitation.akad_date) }}</p>
            <p v-if="invitation.akad_time">{{ invitation.akad_time }}</p>
            <p v-if="invitation.akad_venue" class="font-bold mt-2 text-lg">{{ invitation.akad_venue }}</p>
            <p v-if="invitation.akad_address" class="text-xs md:text-sm font-light opacity-90">{{ invitation.akad_address }}</p>
          </div>
          <a v-if="invitation.akad_map_url" :href="invitation.akad_map_url" target="_blank" 
             class="inline-flex shadow-sm items-center gap-2 mt-5 px-6 py-2.5 rounded-full text-xs font-semibold text-white hover:bg-white hover:text-black transition-colors"
             style="border: 1.5px solid white; box-shadow: 0px 4px 6px rgba(0,0,0,0.2);">
            📍 Buka Maps
          </a>
        </div>

        <!-- TAB 2: INFORMASI RESEPSI PESTA -->
        <div ref="resepsiRef" class="absolute inset-0 flex flex-col items-center justify-center px-10 py-6 text-center" style="opacity: 0;">
          <div class="text-3xl mb-2 drop-shadow-md" style="line-height:1;">🎉</div>
          <h3 class="text-2xl md:text-3xl font-bold mb-4 drop-shadow-md" :style="{ fontFamily: themeConfig.fontHeading, color: 'white' }">Resepsi</h3>
          <div class="space-y-2 text-sm md:text-base font-medium" style="color: white; text-shadow: 1px 1px 4px rgba(0,0,0,0.6);">
            <p v-if="invitation.resepsi_date">{{ formatDateLong(invitation.resepsi_date) }}</p>
            <p v-if="invitation.resepsi_time">{{ invitation.resepsi_time }}</p>
            <p v-if="invitation.resepsi_venue" class="font-bold mt-2 text-lg">{{ invitation.resepsi_venue }}</p>
            <p v-if="invitation.resepsi_address" class="text-xs md:text-sm font-light opacity-90">{{ invitation.resepsi_address }}</p>
          </div>
          <a v-if="invitation.resepsi_map_url" :href="invitation.resepsi_map_url" target="_blank"
             class="inline-flex shadow-sm items-center gap-2 mt-5 px-6 py-2.5 rounded-full text-xs font-semibold text-white hover:bg-white hover:text-black transition-colors"
             style="border: 1.5px solid white; box-shadow: 0px 4px 6px rgba(0,0,0,0.2);">
            📍 Buka Maps
          </a>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

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

let ctx: gsap.Context | null = null;
let currentStep = 0;
const totalSteps = 3; // 0 (Awal), 1 (Zoom+Akad), 2 (Resepsi)
let isAnimating = false;
let trapEnabled = false;

// ---------------------------------------------
// SISTEM INTENT-SCROLL (1 Kedutan = 1 Langkah Full)
// ---------------------------------------------

function processStepAdvance(direction: 1 | -1) {
  const nextStep = currentStep + direction;

  isAnimating = true;
  
  if (nextStep === 1 && currentStep === 0) {
    // 0 -> 1: Zoom In penuh, di ujung perlambatannya (1.8s) teks langsung muncul
    gsap.to(bgRef.value, { scale: 3.5, duration: 2.0, ease: 'power2.inOut' });
    gsap.to(overlayRef.value, { backgroundColor: 'rgba(0,0,0,0.5)', duration: 2.0, ease: 'power2.inOut' });
    gsap.to(boardRef.value, { opacity: 1, duration: 0.5, delay: 1.0, ease: 'power1.out' });
    
    // Delay 1.8s: Masih dalam sepersekian detik terakhir zoom (menghindari jeda layarkosong yang kaku)
    gsap.to(akadRef.value, { opacity: 1, duration: 0.8, delay: 1.8, onComplete: () => { isAnimating = false; currentStep = 1; }});
  } 
  else if (nextStep === 2 && currentStep === 1) {
    // 1 -> 2: Akad ke Resepsi
    gsap.timeline({ onComplete: () => { isAnimating = false; currentStep = 2; }})
      .to(akadRef.value, { opacity: 0, duration: 0.4 })
      .to(resepsiRef.value, { opacity: 1, duration: 0.8 }, "+=0.1");
  } 
  else if (nextStep === 1 && currentStep === 2) {
    // 2 -> 1: Resepsi kembali ke Akad (Up Scroll)
    gsap.timeline({ onComplete: () => { isAnimating = false; currentStep = 1; }})
      .to(resepsiRef.value, { opacity: 0, duration: 0.4 })
      .to(akadRef.value, { opacity: 1, duration: 0.8 }, "+=0.1");
  }
  else if (nextStep === 0 && currentStep === 1) {
    // 1 -> 0: Zoom Out ke Awal (Up Scroll)
    gsap.to([akadRef.value, resepsiRef.value, boardRef.value], { opacity: 0, duration: 0.5 });
    gsap.to(bgRef.value, { scale: 1, duration: 1.8, ease: 'power2.inOut' });
    gsap.to(overlayRef.value, { backgroundColor: 'rgba(0,0,0,0)', duration: 1.8, ease: 'power2.inOut', onComplete: () => { isAnimating = false; currentStep = 0; } });
  }
}

// Handler Khusus PC (Mouse Scroll / Desktop Trackpad)
function handleWheel(e: WheelEvent) {
  if (!trapEnabled) return;
  
  // Kalau mau lanjut keluar dari Section ini (Udah mentok 3 tapi discroll Down, atau di 0 tapi discroll Up)
  if (e.deltaY > 0 && currentStep >= totalSteps - 1) {
     trapEnabled = false; 
     return; // Lepas Trap! Biarkan Web scroll kebawah normal
  }
  if (e.deltaY < 0 && currentStep <= 0) {
     trapEnabled = false;
     return; // Lepas Trap! Biarkan Web scroll keatas normal
  }

  // Masih didalam urutan? TAHAN LAJU SCROLL!
  e.preventDefault();

  if (!isAnimating) {
    processStepAdvance(e.deltaY > 0 ? 1 : -1);
  }
}

// Handler Khusus HP (Mobile Swipe)
let startY = 0;
function handleTouchStart(e: TouchEvent) {
  startY = e.touches?.[0]?.clientY || 0;
}

function handleTouchMove(e: TouchEvent) {
  if (!trapEnabled || !e.touches?.length) return;
  
  const currentY = e.touches[0].clientY;
  const deltaY = startY - currentY; // Positif jika usap Naik (scroll turun)
  
  // Lepaskan native swipe bila sudah keluar batas Slide Internal
  if (deltaY > 0 && currentStep >= totalSteps - 1) { trapEnabled = false; return; }
  if (deltaY < 0 && currentStep <= 0) { trapEnabled = false; return; }

  // Diwajibkan usapan cukup niat (>40px), bukan sekadar goyangan tak sengaja
  if (Math.abs(deltaY) > 40) {
    e.preventDefault(); // Lumpuhkan dorongan layar alami
    if (!isAnimating) {
      processStepAdvance(deltaY > 0 ? 1 : -1);
      startY = currentY; // Reset jarak agar tdk terspam dobel
    }
  } else {
    // Kalau gesekan pendek / gemetar, layar TIDAK BOLEH NGIBRIT bergerak juga
    e.preventDefault(); 
  }
}

onMounted(() => {
  if (!sectionRef.value) return;

  // Binding Trap System Tepat Sasaran
  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: false });

  // Gunakan ScrollTrigger HANYA untuk "Mendeteksi Garis Radar" & memicu Mode Jebakan
  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top top',
      // Murni saat bagian atas viewport mengenai garis awal => Trap Layar!
      onEnter: (self) => { 
        if (currentStep < totalSteps - 1) {
          trapEnabled = true;
          // Mengarahkan langsung ke elemennya (sectionRef.value) agar GSAP mengakalkulasi ulang posisi akuratnya langsung di frame tersebut.
          gsap.to(window, { duration: 0.6, scrollTo: { y: sectionRef.value, autoKill: false }, ease: 'power2.out' }); 
        } 
      },
      // Saat Scroll UP kembali dari bagian bawah menembus border layar atas
      onLeaveBack: () => { 
        if (currentStep > 0) {
          trapEnabled = true;
          gsap.to(window, { duration: 0.6, scrollTo: { y: sectionRef.value, autoKill: false }, ease: 'power2.out' });
        } 
      }
    });
  }, sectionRef.value);
});

onUnmounted(() => {
  ctx?.revert();
  window.removeEventListener('wheel', handleWheel);
  window.removeEventListener('touchstart', handleTouchStart);
  window.removeEventListener('touchmove', handleTouchMove);
});
</script>

<style scoped>
</style>
