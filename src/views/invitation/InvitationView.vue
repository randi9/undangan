<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, reactive, watch, nextTick, type Component } from "vue";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { useRoute } from "vue-router";
import { useInvitationStore } from "@/stores/invitation";
import type { Invitation, LoveStoryItem, Rsvp } from "@/types/invitation";
import { resolveAssetUrl } from "@/utils/url";
import CoverOverlay from "@/components/invitation/CoverOverlay.vue";
import HeroElegant from "@/components/invitation/heroes/HeroElegant.vue";
import HeroFloral from "@/components/invitation/heroes/HeroFloral.vue";
import HeroMinimalist from "@/components/invitation/heroes/HeroMinimalist.vue";

const heroComponents: Record<string, Component> = {
  elegant: HeroElegant,
  floral: HeroFloral,
  minimalist: HeroMinimalist,
};

// --- THEME DATA SYSTEM ---
interface ThemeConfig {
  name: string;
  bg: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textLight: string;
  fontHeading: string;
  fontBody: string;
  overlayGradient: string;
  coverImage: string;
}

const themes: Record<string, ThemeConfig> = {
  elegant: {
    name: 'elegant',
    bg: '#faf8f4',
    surface: '#f5efe6',
    primary: '#8b6f4e',
    secondary: '#c9a96e',
    text: '#3d3425',
    textLight: '#7a6e5d',
    fontHeading: "'Playfair Display', serif",
    fontBody: "'Inter', sans-serif",
    overlayGradient: 'linear-gradient(180deg, rgba(44,36,23,0.6) 0%, rgba(44,36,23,0.8) 100%)',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1080&q=80',
  },
  floral: {
    name: 'floral',
    bg: '#fdfbf7',
    surface: '#f4f6e9',
    primary: '#4a5d4e',
    secondary: '#8a9a5b',
    text: '#3d4a40',
    textLight: '#6b7a6e',
    fontHeading: "'Great Vibes', cursive",
    fontBody: "'Inter', sans-serif",
    overlayGradient: 'linear-gradient(180deg, rgba(74,93,78,0.5) 0%, rgba(74,93,78,0.8) 100%)',
    coverImage: 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=1080&q=80',
  },
  minimalist: {
    name: 'minimalist',
    bg: '#ffffff',
    surface: '#f9f9f9',
    primary: '#111111',
    secondary: '#666666',
    text: '#222222',
    textLight: '#555555',
    fontHeading: "'Inter', sans-serif",
    fontBody: "'Inter', sans-serif",
    overlayGradient: 'linear-gradient(180deg, rgba(17,17,17,0.3) 0%, rgba(17,17,17,0.7) 100%)',
    coverImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1080&q=80',
  }
};

const route = useRoute();
const store = useInvitationStore();
const apiBase = import.meta.env.VITE_API_URL || "";

const loading = ref(true);
const invitation = ref<Invitation | null>(null);
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);
const copied = ref(false);
const rsvpSubmitting = ref(false);
const rsvpMessages = ref<Rsvp[]>([]);

const guestName = ref(route.query.to ? String(route.query.to) : '');
const isOpened = ref(false);
const isClosingOverlay = ref(false);
const isPlaying = ref(false);

// Hero oval animation refs
const heroOval = ref<HTMLElement | null>(null);
const heroTextItems = ref<HTMLElement[]>([]);

// Quote animation refs
const quoteSection = ref<HTMLElement | null>(null);
const quoteCard = ref<HTMLElement | null>(null);

function setHeroTextRef(el: any) {
  if (el) heroTextItems.value.push(el);
}

function animateHeroOval() {
  if (!heroOval.value) return;
  
  // Set initial states
  gsap.set(heroOval.value, { scale: 0.6, opacity: 0 });
  gsap.set(heroTextItems.value, { y: 30, opacity: 0 });

  const tl = gsap.timeline({ delay: 4 });

  // Stage 1: Container scale-up + fade-in
  tl.to(heroOval.value, {
    scale: 1,
    opacity: 1,
    duration: 1,
    ease: 'back.out(1.4)',
  })
  // Stage 2: Text elements slide-up one by one
  .to(heroTextItems.value, {
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.15,
  }, '-=0.01');
}

function animateQuoteSection() {
  if (!quoteSection.value || !quoteCard.value) return;
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: quoteSection.value,
      start: "top top",
      end: "+=80%",
      scrub: 0.6,
    }
  });

  tl.to(quoteCard.value, {
    rotation: -5,
    transformOrigin: "bottom left",
    duration: 0.3,
  })
  .to(quoteCard.value, {
    y: "-60vh",
    duration: 0.7,
  });
}

watch(isOpened, (val) => {
  if (val) {
    heroTextItems.value = [];
    nextTick(() => {
      animateHeroOval();
      animateQuoteSection();
    });
  }
});
const musicPlayer = ref<HTMLAudioElement>();

// Reactive Theme Selector
const activeTheme = computed((): ThemeConfig => {
  const themeKey = invitation.value?.theme || 'elegant';
  return themes[themeKey] ?? themes['elegant']!;
});

const activeHero = computed(() => heroComponents[activeTheme.value.name] || HeroElegant);

// Map Theme to CSS Variables for Tailwind to Use
const themeStyles = computed(() => ({
  '--theme-bg': activeTheme.value.bg,
  '--theme-surface': activeTheme.value.surface,
  '--theme-primary': activeTheme.value.primary,
  '--theme-secondary': activeTheme.value.secondary,
  '--theme-text': activeTheme.value.text,
  '--theme-text-light': activeTheme.value.textLight,
  '--theme-overlay': activeTheme.value.overlayGradient,
  '--font-heading': activeTheme.value.fontHeading,
  '--font-body': activeTheme.value.fontBody,
}));

function openInvitation() {
  isClosingOverlay.value = true;
  isOpened.value = true;
  if (invitation.value?.music_url && musicPlayer.value) {
    musicPlayer.value.play().then(() => {
      isPlaying.value = true;
    }).catch(e => console.error("Audio blocked by browser:", e));
  }
  // Remove cover from view after fade-out completes (1.2s CSS transition + buffer)
  setTimeout(() => {
    isClosingOverlay.value = false;
  }, 1400);
}

function toggleMusic() {
  if (!musicPlayer.value) return;
  if (isPlaying.value) {
    musicPlayer.value.pause();
    isPlaying.value = false;
  } else {
    musicPlayer.value.play();
    isPlaying.value = true;
  }
}

const rsvpForm = reactive({
  guest_name: "",
  attendance: "hadir" as "hadir" | "tidak_hadir",
  guest_count: 1,
  message: "",
});

const countdown = reactive({ days: 0, hours: 0, minutes: 0, seconds: 0 });
let countdownTimer: ReturnType<typeof setInterval>;

const loveStory = computed<LoveStoryItem[]>(() => {
  if (!invitation.value?.love_story) return [];
  try {
    const parsed = typeof invitation.value.love_story === "string" 
      ? JSON.parse(invitation.value.love_story) 
      : invitation.value.love_story;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
});

const formattedDate = computed(() => {
  const dateStr = invitation.value?.akad_date || invitation.value?.resepsi_date;
  if (!dateStr) return "";
  return formatDateLong(dateStr);
});

function formatDateLong(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function openLightbox(index: number) {
  lightboxIndex.value = index;
  lightboxOpen.value = true;
}

function copyAccount() {
  if (!invitation.value?.bank_account) return;
  navigator.clipboard.writeText(invitation.value.bank_account);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

const currentPhotoUrl = computed(() => {
  if (!invitation.value?.photos || invitation.value.photos.length === 0) return "";
  const photo = invitation.value.photos[lightboxIndex.value];
  return photo ? resolveAssetUrl(photo.url, apiBase) : "";
});

function updateCountdown() {
  const dateStr = invitation.value?.akad_date || invitation.value?.resepsi_date;
  if (!dateStr) return;

  const target = new Date(dateStr).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  countdown.days = Math.floor(diff / (1000 * 60 * 60 * 24));
  countdown.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  countdown.minutes = Math.floor((diff / (1000 * 60)) % 60);
  countdown.seconds = Math.floor((diff / 1000) % 60);
}

async function submitRsvp() {
  if (!rsvpForm.guest_name || !rsvpForm.attendance) return;
  rsvpSubmitting.value = true;

  try {
    const res = await fetch(`${apiBase}/api/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        invitation_id: invitation.value?.id,
        ...rsvpForm,
      }),
    });
    if (res.ok) {
      const newRsvp = await res.json();
      rsvpMessages.value.unshift(newRsvp);
      rsvpForm.guest_name = "";
      rsvpForm.message = "";
      rsvpForm.guest_count = 1;
    }
  } catch {
  } finally {
    rsvpSubmitting.value = false;
  }
}

onMounted(async () => {
  const slug = (route.meta.subdomain as string) || (route.params.slug as string);
  const data = await store.fetchInvitationBySlug(slug);
  invitation.value = data;
  loading.value = false;

  if (data) {
    rsvpMessages.value = data.rsvps || [];
    updateCountdown();
    countdownTimer = setInterval(updateCountdown, 1000);
  }
});

onBeforeUnmount(() => {
  if (countdownTimer) clearInterval(countdownTimer);
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <div v-if="loading" class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-amber-700"></div>
  </div>

  <div v-else-if="!invitation" class="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
    <div class="text-6xl">💌</div>
    <h2 class="text-2xl font-serif text-amber-800">Undangan Tidak Ditemukan</h2>
    <p class="text-gray-500">Link undangan yang Anda cari tidak tersedia.</p>
    <router-link to="/" class="mt-2 px-6 py-2 border border-amber-600 text-amber-700 rounded-full hover:bg-amber-50 transition">← Kembali</router-link>
  </div>

  <!-- Main UI Wrapper -->
  <div v-else :style="themeStyles" class="relative bg-[var(--theme-bg)] text-[var(--theme-text)] font-[var(--font-body)] overflow-x-hidden min-h-screen selection:bg-[var(--theme-primary)] selection:text-white pb-32">

    <!-- COVER OVERLAY (Buka Undangan) -->
    <CoverOverlay
      v-show="!isOpened || isClosingOverlay"
      :groom-name="invitation.groom_name"
      :bride-name="invitation.bride_name"
      :guest-name="guestName"
      :is-closing="isClosingOverlay"
      :font-heading="activeTheme.fontHeading"
      :font-body="activeTheme.fontBody"
      :cover-image="invitation.cover_photo ? resolveAssetUrl(invitation.cover_photo, apiBase) : activeTheme.coverImage"
      @open="openInvitation"
    />

    <!-- MAIN INVITATION CONTENT -->
    <div v-if="isOpened" class="animate-fade-in">
      
      <!-- HERO COVER INSIDE (Dynamic per theme) -->
      <component :is="activeHero" :overlay-gradient="activeTheme.overlayGradient">
        <div ref="heroOval" class="flex flex-col  gap-4 items-center justify-center w-[260px] h-[400px] mx-auto rounded-full bg-white backdrop-blur-sm border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.1)] opacity-0">
          <p :ref="setHeroTextRef" class="uppercase tracking-[0.4em] text-sm mb-6 text-[var(--theme-secondary)] drop-shadow-md opacity-0">The Wedding of</p>
          <h1 :ref="setHeroTextRef" class="text-5xl md:text-7xl mb-1 opacity-0 text-[var(--theme-secondary)]" :style="{ fontFamily: activeTheme.fontHeading }">
            {{ invitation.groom_name }}
            <span class="block text-3xl text-[var(--theme-secondary)] my-2">&amp;</span>
            {{ invitation.bride_name }}
          </h1>
          <p v-if="formattedDate" :ref="setHeroTextRef" class="text-[var(--theme-secondary)] mt-4 text-sm md:text-base tracking-[0.2em] font-light opacity-0">{{ formattedDate }}</p>
        </div>
        
      </component>

      <!-- QUOTE -->
      <section v-if="invitation.quote" ref="quoteSection" class="h-screen flex items-center justify-center py-20 px-6 text-center overflow-hidden">
        <div ref="quoteCard" class="rounded-lg bg-[var(--theme-secondary)] aspect-square w-[calc(100%-2rem)] max-w-[400px] mx-auto flex items-center justify-center relative overflow-hidden shadow-2xl origin-bottom-left will-change-transform">
          <blockquote class="w-10/12 md:w-3/4 lg:w-2/3 mx-auto text-sm md:text-base italic font-light text-[var(--theme-surface)] leading-relaxed tracking-[0.2em] break-words">
             "{{ invitation.quote }}"
          </blockquote>
        </div>
      </section>

      <!-- COUPLE PROFILES -->
      <section class="py-24 px-6 max-w-5xl mx-auto text-center">
        <h2 class="text-3xl md:text-5xl mb-2 text-[var(--theme-primary)]" :style="{ fontFamily: activeTheme.fontHeading }">Mempelai</h2>
        <div class="flex items-center justify-center gap-4 mb-16 text-[var(--theme-secondary)]">
          <div class="h-px w-16 bg-[var(--theme-secondary)] opacity-50"></div>
          <span class="text-xl">♥</span>
          <div class="h-px w-16 bg-[var(--theme-secondary)] opacity-50"></div>
        </div>
        
        <div class="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8">
          <!-- Groom -->
          <div class="flex-1 flex flex-col items-center">
            <div class="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 border-4 shadow-xl" :style="{ borderColor: activeTheme.secondary }">
              <img v-if="invitation.groom_photo" :src="resolveAssetUrl(invitation.groom_photo, apiBase)" class="w-full h-full object-cover" alt="Groom" />
              <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400">👤</div>
            </div>
            <h3 class="text-2xl md:text-3xl font-bold mb-3 text-[var(--theme-primary)]" :style="{ fontFamily: activeTheme.fontHeading }">{{ invitation.groom_full_name || invitation.groom_name }}</h3>
            <p v-if="invitation.groom_father || invitation.groom_mother" class="text-sm md:text-base text-[var(--theme-text-light)]">
              Putra dari<br/>
              <span v-if="invitation.groom_father">Bapak {{ invitation.groom_father }}</span>
              <span v-if="invitation.groom_father && invitation.groom_mother"> &amp; </span>
              <span v-if="invitation.groom_mother">Ibu {{ invitation.groom_mother }}</span>
            </p>
          </div>
          
          <!-- Divider -->
          <div class="text-5xl md:text-7xl text-[var(--theme-secondary)] opacity-50" :style="{ fontFamily: activeTheme.fontHeading }">&amp;</div>
          
          <!-- Bride -->
          <div class="flex-1 flex flex-col items-center">
            <div class="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-6 border-4 shadow-xl" :style="{ borderColor: activeTheme.secondary }">
              <img v-if="invitation.bride_photo" :src="resolveAssetUrl(invitation.bride_photo, apiBase)" class="w-full h-full object-cover" alt="Bride" />
              <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400">👤</div>
            </div>
            <h3 class="text-2xl md:text-3xl font-bold mb-3 text-[var(--theme-primary)]" :style="{ fontFamily: activeTheme.fontHeading }">{{ invitation.bride_full_name || invitation.bride_name }}</h3>
            <p v-if="invitation.bride_father || invitation.bride_mother" class="text-sm md:text-base text-[var(--theme-text-light)]">
              Putri dari<br/>
              <span v-if="invitation.bride_father">Bapak {{ invitation.bride_father }}</span>
              <span v-if="invitation.bride_father && invitation.bride_mother"> &amp; </span>
              <span v-if="invitation.bride_mother">Ibu {{ invitation.bride_mother }}</span>
            </p>
          </div>
        </div>
      </section>

      <!-- COUNTDOWN -->
      <section v-if="invitation.akad_date || invitation.resepsi_date" class="py-20 px-6 text-center bg-[var(--theme-surface)]">
        <h2 class="text-3xl md:text-4xl mb-2 text-[var(--theme-primary)]" :style="{ fontFamily: activeTheme.fontHeading }">Menghitung Hari</h2>
        <div class="flex items-center justify-center gap-4 mb-12 text-[var(--theme-secondary)]">
          <div class="h-px w-12 bg-[var(--theme-secondary)] opacity-50"></div>
          <span class="text-xl">⏳</span>
          <div class="h-px w-12 bg-[var(--theme-secondary)] opacity-50"></div>
        </div>
        
        <div class="flex justify-center gap-4 md:gap-8 max-w-lg mx-auto">
          <div class="flex flex-col items-center w-20">
            <div class="text-4xl md:text-5xl font-bold text-[var(--theme-primary)] mb-2" :style="{ fontFamily: activeTheme.fontHeading }">{{ countdown.days }}</div>
            <div class="text-xs tracking-widest uppercase text-[var(--theme-text-light)]">Hari</div>
          </div>
          <div class="flex flex-col items-center w-20">
            <div class="text-4xl md:text-5xl font-bold text-[var(--theme-primary)] mb-2" :style="{ fontFamily: activeTheme.fontHeading }">{{ countdown.hours }}</div>
            <div class="text-xs tracking-widest uppercase text-[var(--theme-text-light)]">Jam</div>
          </div>
          <div class="flex flex-col items-center w-20">
            <div class="text-4xl md:text-5xl font-bold text-[var(--theme-primary)] mb-2" :style="{ fontFamily: activeTheme.fontHeading }">{{ countdown.minutes }}</div>
            <div class="text-xs tracking-widest uppercase text-[var(--theme-text-light)]">Menit</div>
          </div>
          <div class="flex flex-col items-center w-20">
            <div class="text-4xl md:text-5xl font-bold text-[var(--theme-primary)] mb-2" :style="{ fontFamily: activeTheme.fontHeading }">{{ countdown.seconds }}</div>
            <div class="text-xs tracking-widest uppercase text-[var(--theme-text-light)]">Detik</div>
          </div>
        </div>
      </section>

      <!-- EVENTS -->
      <section v-if="invitation.akad_venue || invitation.resepsi_venue" class="py-24 px-6 max-w-5xl mx-auto text-center">
        <h2 class="text-3xl md:text-5xl mb-2 text-[var(--theme-primary)]" :style="{ fontFamily: activeTheme.fontHeading }">Acara</h2>
        <div class="flex items-center justify-center gap-4 mb-16 text-[var(--theme-secondary)]">
          <div class="h-px w-16 bg-[var(--theme-secondary)] opacity-50"></div>
          <span class="text-xl">📅</span>
          <div class="h-px w-16 bg-[var(--theme-secondary)] opacity-50"></div>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <!-- Akad -->
          <div v-if="invitation.akad_venue" class="p-8 md:p-10 rounded-2xl bg-[var(--theme-surface)] border border-black/5 shadow-sm text-left relative overflow-hidden group hover:shadow-md transition-shadow">
            <div class="text-4xl mb-6">💍</div>
            <h3 class="text-2xl font-bold text-[var(--theme-primary)] mb-6" :style="{ fontFamily: activeTheme.fontHeading }">Akad Nikah</h3>
            <div class="space-y-4 text-sm md:text-base text-[var(--theme-text-light)]">
              <div v-if="invitation.akad_date" class="flex gap-4">
                <span class="w-6 text-center">📅</span> <span>{{ formatDateLong(invitation.akad_date) }}</span>
              </div>
              <div v-if="invitation.akad_time" class="flex gap-4">
                <span class="w-6 text-center">🕐</span> <span>{{ invitation.akad_time }}</span>
              </div>
              <div v-if="invitation.akad_venue" class="flex gap-4">
                <span class="w-6 text-center">📍</span>
                <span>
                  <strong class="text-[var(--theme-text)]">{{ invitation.akad_venue }}</strong>
                  <br v-if="invitation.akad_address" />
                  <span class="text-sm opacity-90">{{ invitation.akad_address }}</span>
                </span>
              </div>
            </div>
            <a v-if="invitation.akad_map_url" :href="invitation.akad_map_url" target="_blank" class="inline-flex items-center gap-2 mt-8 px-6 py-2.5 rounded-full border border-[var(--theme-secondary)] text-[var(--theme-primary)] font-medium text-sm hover:bg-[var(--theme-secondary)] hover:text-white transition-colors">
              📍 Buka Maps
            </a>
          </div>
          
          <!-- Resepsi -->
          <div v-if="invitation.resepsi_venue" class="p-8 md:p-10 rounded-2xl bg-[var(--theme-surface)] border border-black/5 shadow-sm text-left relative overflow-hidden group hover:shadow-md transition-shadow">
            <div class="text-4xl mb-6">🎉</div>
            <h3 class="text-2xl font-bold text-[var(--theme-primary)] mb-6" :style="{ fontFamily: activeTheme.fontHeading }">Resepsi</h3>
            <div class="space-y-4 text-sm md:text-base text-[var(--theme-text-light)]">
              <div v-if="invitation.resepsi_date" class="flex gap-4">
                <span class="w-6 text-center">📅</span> <span>{{ formatDateLong(invitation.resepsi_date) }}</span>
              </div>
              <div v-if="invitation.resepsi_time" class="flex gap-4">
                <span class="w-6 text-center">🕐</span> <span>{{ invitation.resepsi_time }}</span>
              </div>
              <div v-if="invitation.resepsi_venue" class="flex gap-4">
                <span class="w-6 text-center">📍</span>
                <span>
                  <strong class="text-[var(--theme-text)]">{{ invitation.resepsi_venue }}</strong>
                  <br v-if="invitation.resepsi_address" />
                  <span class="text-sm opacity-90">{{ invitation.resepsi_address }}</span>
                </span>
              </div>
            </div>
            <a v-if="invitation.resepsi_map_url" :href="invitation.resepsi_map_url" target="_blank" class="inline-flex items-center gap-2 mt-8 px-6 py-2.5 rounded-full border border-[var(--theme-secondary)] text-[var(--theme-primary)] font-medium text-sm hover:bg-[var(--theme-secondary)] hover:text-white transition-colors">
              📍 Buka Maps
            </a>
          </div>
        </div>
      </section>

      <!-- LOVE STORY -->
      <section v-if="loveStory.length > 0" class="py-20 px-6 max-w-3xl mx-auto text-center bg-[var(--theme-surface)] rounded-3xl mb-24">
        <h2 class="text-3xl md:text-4xl mb-2 text-[var(--theme-primary)]" :style="{ fontFamily: activeTheme.fontHeading }">Love Story</h2>
        <div class="flex items-center justify-center gap-4 mb-16 text-[var(--theme-secondary)]">
          <div class="h-px w-12 bg-[var(--theme-secondary)] opacity-50"></div>
          <span class="text-xl">💕</span>
          <div class="h-px w-12 bg-[var(--theme-secondary)] opacity-50"></div>
        </div>
        
        <div class="relative">
          <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[var(--theme-secondary)] opacity-30 md:-translate-x-1/2"></div>
          <div v-for="(story, i) in loveStory" :key="i" class="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 mb-12 last:mb-0">
            <div class="md:w-1/2 md:pr-12 text-left md:text-right w-full pl-12 md:pl-0">
              <div class="font-bold text-[var(--theme-primary)] text-sm mb-1" :style="{ fontFamily: activeTheme.fontHeading }">{{ story.date }}</div>
            </div>
            <div class="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[var(--theme-secondary)] border-4 border-[var(--theme-surface)] -translate-x-[7px] md:-translate-x-1/2 mt-0.5 md:mt-0 z-10"></div>
            <div class="md:w-1/2 md:pl-12 text-left w-full pl-12 md:pl-0">
              <h4 class="font-bold text-lg text-[var(--theme-primary)] mb-2">{{ story.title }}</h4>
              <p class="text-sm text-[var(--theme-text-light)] leading-relaxed">{{ story.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- GALLERY -->
      <section v-if="invitation.photos && invitation.photos.length > 0" class="py-24 px-6 max-w-5xl mx-auto text-center">
        <h2 class="text-3xl md:text-5xl mb-2 text-[var(--theme-primary)]" :style="{ fontFamily: activeTheme.fontHeading }">Galeri</h2>
        <div class="flex items-center justify-center gap-4 mb-12 text-[var(--theme-secondary)]">
          <div class="h-px w-16 bg-[var(--theme-secondary)] opacity-50"></div>
          <span class="text-xl">📸</span>
          <div class="h-px w-16 bg-[var(--theme-secondary)] opacity-50"></div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <div v-for="(photo, i) in invitation.photos" :key="i" @click="openLightbox(i)" class="aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all">
            <img :src="resolveAssetUrl(photo.url, apiBase)" alt="Galeri Photo" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
        </div>
      </section>

      <!-- RSVP -->
      <section class="py-24 px-6 max-w-3xl mx-auto text-center">
        <h2 class="text-3xl md:text-5xl mb-2 text-[var(--theme-primary)]" :style="{ fontFamily: activeTheme.fontHeading }">RSVP</h2>
        <div class="flex items-center justify-center gap-4 mb-8 text-[var(--theme-secondary)]">
          <div class="h-px w-16 bg-[var(--theme-secondary)] opacity-50"></div>
          <span class="text-xl">💌</span>
          <div class="h-px w-16 bg-[var(--theme-secondary)] opacity-50"></div>
        </div>
        
        <p class="text-[var(--theme-text-light)] mb-10 text-sm md:text-base">Kehadiran Anda merupakan kebahagiaan bagi kami</p>
        
        <div class="bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-black/5 text-left mb-16">
          <form @submit.prevent="submitRsvp" class="space-y-6">
            <div>
              <label class="block text-sm font-semibold mb-2 text-[var(--theme-text)]">Nama Lengkap</label>
              <input v-model="rsvpForm.guest_name" type="text" placeholder="Masukkan nama Anda" required class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 outline-none transition-all" />
            </div>
            
            <div>
              <label class="block text-sm font-semibold mb-2 text-[var(--theme-text)]">Konfirmasi Kehadiran</label>
              <div class="flex flex-col sm:flex-row gap-4">
                <button type="button" @click="rsvpForm.attendance = 'hadir'" :class="['flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all', rsvpForm.attendance === 'hadir' ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] font-semibold' : 'border-gray-200 text-gray-500 hover:bg-gray-50']">
                  ✅ Hadir
                </button>
                <button type="button" @click="rsvpForm.attendance = 'tidak_hadir'" :class="['flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all', rsvpForm.attendance === 'tidak_hadir' ? 'border-red-500 bg-red-50 text-red-600 font-semibold' : 'border-gray-200 text-gray-500 hover:bg-gray-50']">
                  ❌ Tidak Hadir
                </button>
              </div>
            </div>
            
            <div v-show="rsvpForm.attendance === 'hadir'">
              <label class="block text-sm font-semibold mb-2 text-[var(--theme-text)]">Jumlah Tamu</label>
              <input v-model.number="rsvpForm.guest_count" type="number" min="1" max="10" placeholder="1" class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 outline-none transition-all" />
            </div>
            
            <div>
              <label class="block text-sm font-semibold mb-2 text-[var(--theme-text)]">Ucapan &amp; Doa</label>
              <textarea v-model="rsvpForm.message" rows="4" placeholder="Tulis doa untuk kedua mempelai" class="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[var(--theme-primary)] focus:ring-2 focus:ring-[var(--theme-primary)]/20 outline-none transition-all resize-y"></textarea>
            </div>
            
            <button type="submit" :disabled="rsvpSubmitting" class="w-full py-4 rounded-xl bg-[var(--theme-primary)] text-white font-semibold text-lg hover:bg-opacity-90 disabled:opacity-50 transition-all shadow-md">
              {{ rsvpSubmitting ? 'Mengirim...' : 'Kirim Ucapan' }}
            </button>
          </form>
        </div>
        
        <!-- Wishes Feed -->
        <div v-if="rsvpMessages.length > 0" class="text-left bg-[var(--theme-surface)] rounded-2xl p-6 md:p-8">
          <h3 class="text-xl md:text-2xl font-bold mb-6 text-[var(--theme-primary)]" :style="{ fontFamily: activeTheme.fontHeading }">Ucapan ({{ rsvpMessages.length }})</h3>
          <div class="space-y-4 max-h-96 overflow-y-auto pr-2" style="scrollbar-width: thin; scrollbar-color: var(--theme-secondary) transparent;">
            <div v-for="msg in rsvpMessages" :key="msg.id" class="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div class="flex justify-between items-start mb-2">
                <span class="font-bold text-[var(--theme-text)]">{{ msg.guest_name }}</span>
                <span class="text-xs px-2 py-1 rounded-md" :class="msg.attendance === 'hadir' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                  {{ msg.attendance === 'hadir' ? 'Akan Hadir' : 'Berhalangan' }}
                  <span v-if="msg.attendance === 'hadir' && msg.guest_count > 1">({{ msg.guest_count }})</span>
                </span>
              </div>
              <p class="text-sm text-gray-600 leading-relaxed break-words">{{ msg.message }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- GIFT -->
      <section v-if="invitation.bank_name" class="py-24 px-6 text-center bg-[var(--theme-surface)]">
        <h2 class="text-3xl md:text-4xl mb-2 text-[var(--theme-primary)]" :style="{ fontFamily: activeTheme.fontHeading }">Wedding Gift</h2>
        <div class="flex items-center justify-center gap-4 mb-8 text-[var(--theme-secondary)]">
          <div class="h-px w-12 bg-[var(--theme-secondary)] opacity-50"></div>
          <span class="text-xl">🎁</span>
          <div class="h-px w-12 bg-[var(--theme-secondary)] opacity-50"></div>
        </div>
        
        <p class="text-[var(--theme-text-light)] max-w-xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami.<br />
          Namun, apabila Anda ingin memberikan tanda kasih, kami menyediakan amplop digital di bawah ini.
        </p>
        
        <div class="inline-block p-8 md:p-12 bg-white rounded-3xl shadow-sm border border-[var(--theme-secondary)]/20">
          <div class="font-bold text-xl text-[var(--theme-primary)] mb-2 tracking-wide uppercase">{{ invitation.bank_name }}</div>
          <div class="text-3xl md:text-4xl font-bold tracking-widest text-gray-800 mb-2 font-mono">{{ invitation.bank_account }}</div>
          <div class="text-sm text-gray-500 mb-8 uppercase tracking-widest">A.N. {{ invitation.bank_holder }}</div>
          <button @click="copyAccount" class="px-8 py-3 rounded-full border-2 border-[var(--theme-primary)] text-[var(--theme-primary)] font-semibold hover:bg-[var(--theme-primary)] hover:text-white transition-all w-full md:w-auto">
            {{ copied ? '✅ Tersalin!' : '📋 Salin Nomor Rekening' }}
          </button>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="py-20 px-6 text-center text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-gray-900 z-0"></div>
        <div class="absolute inset-0" :style="{ background: activeTheme.overlayGradient }"></div>
        <div class="relative z-10">
          <p class="text-4xl md:text-5xl mb-4 text-[var(--theme-secondary)]" :style="{ fontFamily: activeTheme.fontHeading }">
            {{ invitation.groom_name }} &amp; {{ invitation.bride_name }}
          </p>
          <p class="text-sm font-light tracking-wide opacity-80">Terima kasih telah menjadi bagian dari kebahagiaan kami</p>
          <div class="mt-12 text-xs opacity-40">
            Dibuat dengan MengundangAnda
          </div>
        </div>
      </footer>

      <!-- LIGHTBOX -->
      <div v-if="lightboxOpen && invitation.photos" class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm" @click="lightboxOpen = false">
        <button class="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full text-white text-2xl hover:bg-white/20 transition-colors flex items-center justify-center" @click.stop="lightboxOpen = false">×</button>
        <button v-if="lightboxIndex > 0" class="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full text-white text-2xl hover:bg-white/20 flex items-center justify-center transition-colors" @click.stop="lightboxIndex--">‹</button>
        <img v-if="currentPhotoUrl" :src="currentPhotoUrl" alt="Gallery preview" class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" @click.stop />
        <button v-if="invitation.photos && lightboxIndex < invitation.photos.length - 1" class="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full text-white text-2xl hover:bg-white/20 flex items-center justify-center transition-colors" @click.stop="lightboxIndex++">›</button>
      </div>
    </div>

    <!-- Music Player -->
    <audio ref="musicPlayer" v-if="invitation.music_url" :src="resolveAssetUrl(invitation.music_url, apiBase)" loop preload="auto"></audio>
    <button v-if="invitation.music_url && isOpened" @click="toggleMusic" :class="['fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all bg-[var(--theme-primary)] text-white hover:scale-110', isPlaying ? 'animate-pulse' : '']">
      <span>{{ isPlaying ? '🎵' : '🔇' }}</span>
    </button>
  </div>
</template>