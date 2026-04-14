<template>
  <!-- h-screen digunakan supaya Section murni seukuran 1 layar dan tidak merusak layout GSAP Pin Spacer -->
  <section v-if="invitation.akad_venue || invitation.resepsi_venue" ref="sectionRef" class="w-full h-screen overflow-hidden relative bg-[var(--theme-surface)]">
    
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

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { generateGoogleCalendarUrl } from '@/utils/calendar';
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
const titleRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;
let currentStep = 0;
const totalSteps = 3; // 0 (Awal), 1 (Zoom+Akad), 2 (Resepsi)
let isAnimating = false;
let isTrapActive = false;
let pendingRelease: 'down' | 'up' | null = null;

// Debounce untuk mencegah dobel trigger
let lastStepTime = 0;
const STEP_COOLDOWN = 300; // ms minimum antar step

function freezeScroll() {
  if (document.body.style.overflow === 'hidden') return;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  document.body.style.overflow = 'hidden';
}

function unfreezeScroll() {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}

// ---------------------------------------------
// ANIMASI PER STEP
// ---------------------------------------------
function animateToStep(targetStep: number, onDone: () => void) {
  if (targetStep === 1 && currentStep === 0) {
    // 0 -> 1: Teks hilang (0-0.5s), BARU Zoom In (0.5s)
    const tl = gsap.timeline({ onComplete: onDone });
    tl.to(titleRef.value, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 0);
    tl.to(bgRef.value, { scale: 3.5, duration: 2.0, ease: 'power2.inOut' }, 0.5);
    tl.to(overlayRef.value, { backgroundColor: 'rgba(0,0,0,0.5)', duration: 2.0, ease: 'power2.inOut' }, 0.5);
    tl.to(boardRef.value, { opacity: 1, duration: 0.5, ease: 'power1.out' }, 1.5);
    tl.to(akadRef.value, { opacity: 1, duration: 0.8 }, 2.3);
  } 
  else if (targetStep === 2 && currentStep === 1) {
    // 1 -> 2: Akad ke Resepsi
    gsap.timeline({ onComplete: onDone })
      .to(akadRef.value, { opacity: 0, duration: 0.4 })
      .to(resepsiRef.value, { opacity: 1, duration: 0.8 }, '+=0.1');
  } 
  else if (targetStep === 1 && currentStep === 2) {
    // 2 -> 1: Resepsi kembali ke Akad
    gsap.timeline({ onComplete: onDone })
      .to(resepsiRef.value, { opacity: 0, duration: 0.4 })
      .to(akadRef.value, { opacity: 1, duration: 0.8 }, '+=0.1');
  }
  else if (targetStep === 0 && currentStep === 1) {
    // 1 -> 0: Zoom Out dahulu, BARU teks muncul di akhir
    const tl = gsap.timeline({ onComplete: onDone });
    tl.to([akadRef.value, resepsiRef.value, boardRef.value], { opacity: 0, duration: 0.4 }, 0);
    tl.to(bgRef.value, { scale: 1, duration: 1.8, ease: 'power2.inOut' }, 0.2);
    tl.to(overlayRef.value, { backgroundColor: 'rgba(0,0,0,0)', duration: 1.8, ease: 'power2.inOut' }, 0.2);
    tl.to(titleRef.value, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 1.8);
  }
  else {
    onDone();
  }
}

function processStep(direction: 1 | -1) {
  const now = Date.now();
  if (now - lastStepTime < STEP_COOLDOWN) return;
  if (isAnimating) return;

  const nextStep = currentStep + direction;

  // Keluar ke bawah: sudah di step terakhir, scroll down
  if (nextStep >= totalSteps) {
    pendingRelease = 'down';
    isTrapActive = false;
    unfreezeScroll();
    isAnimating = false;
    return;
  }
  // Keluar ke atas: sudah di step 0, scroll up
  if (nextStep < 0) {
    pendingRelease = 'up';
    isTrapActive = false;
    unfreezeScroll();
    isAnimating = false;
    return;
  }

  lastStepTime = now;
  isAnimating = true;
  pendingRelease = null;

  animateToStep(nextStep, () => {
    currentStep = nextStep;
    isAnimating = false;
  });
}

// Mengembalikan semua animasi ke state awal (saat masuk ulang dari arah atas)
function resetToInitial() {
  currentStep = 0;
  isAnimating = false;
  pendingRelease = null;
  gsap.set(bgRef.value, { scale: 1 });
  gsap.set(titleRef.value, { opacity: 1 });
  gsap.set(overlayRef.value, { backgroundColor: 'rgba(0,0,0,0)' });
  gsap.set(boardRef.value, { opacity: 0 });
  gsap.set(akadRef.value, { opacity: 0 });
  gsap.set(resepsiRef.value, { opacity: 0 });
}

// Mengembalikan ke state akhir (saat masuk ulang dari arah bawah)
function resetToFinal() {
  currentStep = totalSteps - 1; // step 2
  isAnimating = false;
  pendingRelease = null;
  gsap.set(bgRef.value, { scale: 3.5 });
  gsap.set(titleRef.value, { opacity: 0 });
  gsap.set(overlayRef.value, { backgroundColor: 'rgba(0,0,0,0.5)' });
  gsap.set(boardRef.value, { opacity: 1 });
  gsap.set(akadRef.value, { opacity: 0 });
  gsap.set(resepsiRef.value, { opacity: 1 });
}

// ---- SCROLL HANDLERS ----

function handleWheel(e: WheelEvent) {
  if (!isTrapActive) return;
  
  const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;

  // Jika sudah mentok dan arah sesuai, biarkan native scroll
  if (pendingRelease === 'down' && dir === 1) return;
  if (pendingRelease === 'up' && dir === -1) return;

  // Kalau user balik arah dari pending release, cancel release
  if (pendingRelease && ((pendingRelease === 'down' && dir === -1) || (pendingRelease === 'up' && dir === 1))) {
    pendingRelease = null;
  }

  // Wajib preventDefault saat trap aktif agar tidak ada scroll native/geser
  e.preventDefault();
  e.stopPropagation();
  processStep(dir);
}

let touchStartY = 0;
let touchHandled = false;

function handleTouchStart(e: TouchEvent) {
  touchStartY = e.touches?.[0]?.clientY || 0;
  touchHandled = false;
}

function handleTouchMove(e: TouchEvent) {
  if (!isTrapActive || !e.touches?.length) return;

  const currentY = e.touches[0]?.clientY ?? 0;
  const deltaY = touchStartY - currentY;
  const dir: 1 | -1 = deltaY > 0 ? 1 : -1;

  // Jika pending release searah, biarkan native
  if (pendingRelease === 'down' && dir === 1) return;
  if (pendingRelease === 'up' && dir === -1) return;

  // Cancel release jika arah balik
  if (pendingRelease && ((pendingRelease === 'down' && dir === -1) || (pendingRelease === 'up' && dir === 1))) {
    pendingRelease = null;
  }

  e.preventDefault();

  if (Math.abs(deltaY) > 40 && !touchHandled) {
    touchHandled = true;
    processStep(dir);
    touchStartY = currentY;
  }
}

onMounted(() => {
  if (!sectionRef.value) return;

  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: false });

  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top top',
      // Hanya detect transisi saat boundary viewport dilewati, tidak menggunakan mode pin GSAP
      onEnter: () => {
        if (!isTrapActive && pendingRelease !== 'down') {
          isTrapActive = true;
          pendingRelease = null;
          freezeScroll();
          window.scrollTo({ top: sectionRef.value?.offsetTop ?? 0 }); // Instan framing presisi
          resetToInitial();
        }
      },
      onLeaveBack: () => {
        if (!isTrapActive && pendingRelease !== 'up') {
          isTrapActive = true;
          pendingRelease = null;
          freezeScroll();
          window.scrollTo({ top: sectionRef.value?.offsetTop ?? 0 });
          resetToFinal();
        }
      }
    });
  });
});

onUnmounted(() => {
  unfreezeScroll();
  ctx?.revert();
  window.removeEventListener('wheel', handleWheel);
  window.removeEventListener('touchstart', handleTouchStart);
  window.removeEventListener('touchmove', handleTouchMove);
});
</script>

<style scoped>
</style>
