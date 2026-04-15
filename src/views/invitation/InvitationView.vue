<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, reactive, watch, nextTick, type Component } from "vue";
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';

// === DESKTOP IFRAME MODE ===
// On desktop, we render the invitation inside an iframe so vw units work like mobile
const isInsideIframe = window.self !== window.top;
const windowWidth = ref(window.innerWidth);
const isDesktop = computed(() => windowWidth.value > 768 && !isInsideIframe);

function onResize() { windowWidth.value = window.innerWidth; }
if (!isInsideIframe) {
  window.addEventListener('resize', onResize);
}
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { useRoute } from "vue-router";
import { useInvitationStore } from "@/stores/invitation";
import type { Invitation, LoveStoryItem, Rsvp } from "@/types/invitation";
import type { ThemeConfig } from "@/types/theme";
import { resolveAssetUrl } from "@/utils/url";
import { Icon } from "@iconify/vue";

// Covers
import CoverElegant from "@/components/invitation/covers/CoverElegant.vue";
import CoverFloral from "@/components/invitation/covers/CoverFloral.vue";
import CoverMinimalist from "@/components/invitation/covers/CoverMinimalist.vue";
import CoverElegantBlue from "@/components/invitation/covers/CoverElegantBlue.vue";

// Heroes
import HeroElegant from "@/components/invitation/heroes/HeroElegant.vue";
import HeroFloral from "@/components/invitation/heroes/HeroFloral.vue";
import HeroMinimalist from "@/components/invitation/heroes/HeroMinimalist.vue";
import HeroElegantBlue from "@/components/invitation/heroes/HeroElegantBlue.vue";

// Quotes
import QuoteElegant from "@/components/invitation/quotes/QuoteElegant.vue";
import QuoteFloral from "@/components/invitation/quotes/QuoteFloral.vue";
import QuoteMinimalist from "@/components/invitation/quotes/QuoteMinimalist.vue";
import QuoteElegantBlue from "@/components/invitation/quotes/QuoteElegantBlue.vue";

// Couples
import CoupleElegant from "@/components/invitation/couples/CoupleElegant.vue";
import CoupleFloral from "@/components/invitation/couples/CoupleFloral.vue";
import CoupleMinimalist from "@/components/invitation/couples/CoupleMinimalist.vue";
import CoupleElegantBlue from "@/components/invitation/couples/CoupleElegantBlue.vue";

// Countdowns
import CountdownElegant from "@/components/invitation/countdowns/CountdownElegant.vue";
import CountdownFloral from "@/components/invitation/countdowns/CountdownFloral.vue";
import CountdownMinimalist from "@/components/invitation/countdowns/CountdownMinimalist.vue";
import CountdownElegantBlue from "@/components/invitation/countdowns/CountdownElegantBlue.vue";

// Events
import EventsElegant from "@/components/invitation/events/EventsElegant.vue";
import EventsFloral from "@/components/invitation/events/EventsFloral.vue";
import EventsMinimalist from "@/components/invitation/events/EventsMinimalist.vue";
import EventsElegantBlue from "@/components/invitation/events/EventsElegantBlue.vue";

// Love Story
import LoveStoryElegant from "@/components/invitation/lovestory/LoveStoryElegant.vue";
import LoveStoryFloral from "@/components/invitation/lovestory/LoveStoryFloral.vue";
import LoveStoryMinimalist from "@/components/invitation/lovestory/LoveStoryMinimalist.vue";
import LoveStoryElegantBlue from "@/components/invitation/lovestory/LoveStoryElegantBlue.vue";

// Gallery
import GalleryElegant from "@/components/invitation/gallery/GalleryElegant.vue";
import GalleryFloral from "@/components/invitation/gallery/GalleryFloral.vue";
import GalleryMinimalist from "@/components/invitation/gallery/GalleryMinimalist.vue";
import GalleryElegantBlue from "@/components/invitation/gallery/GalleryElegantBlue.vue";

// RSVP
import RsvpElegant from "@/components/invitation/rsvp/RsvpElegant.vue";
import RsvpFloral from "@/components/invitation/rsvp/RsvpFloral.vue";
import RsvpMinimalist from "@/components/invitation/rsvp/RsvpMinimalist.vue";
import RsvpElegantBlue from "@/components/invitation/rsvp/RsvpElegantBlue.vue";

// Gift
import GiftElegant from "@/components/invitation/gift/GiftElegant.vue";
import GiftFloral from "@/components/invitation/gift/GiftFloral.vue";
import GiftMinimalist from "@/components/invitation/gift/GiftMinimalist.vue";
import GiftElegantBlue from "@/components/invitation/gift/GiftElegantBlue.vue";

// Footer
import FooterElegant from "@/components/invitation/footer/FooterElegant.vue";
import FooterFloral from "@/components/invitation/footer/FooterFloral.vue";
import FooterMinimalist from "@/components/invitation/footer/FooterMinimalist.vue";
import FooterElegantBlue from "@/components/invitation/footer/FooterElegantBlue.vue";

// --- COMPONENT MAPS ---
const coverComponents: Record<string, Component> = {
  elegant: CoverElegant,
  floral: CoverFloral,
  minimalist: CoverMinimalist,
  elegant_blue: CoverElegantBlue,
};
const heroComponents: Record<string, Component> = {
  elegant: HeroElegant,
  floral: HeroFloral,
  minimalist: HeroMinimalist,
  elegant_blue: HeroElegantBlue,
};

const quoteComponents: Record<string, Component> = {
  elegant: QuoteElegant,
  floral: QuoteFloral,
  minimalist: QuoteMinimalist,
  elegant_blue: QuoteElegantBlue,
};

const coupleComponents: Record<string, Component> = {
  elegant: CoupleElegant,
  floral: CoupleFloral,
  minimalist: CoupleMinimalist,
  elegant_blue: CoupleElegantBlue,
};

const countdownComponents: Record<string, Component> = {
  elegant: CountdownElegant,
  floral: CountdownFloral,
  minimalist: CountdownMinimalist,
  elegant_blue: CountdownElegantBlue,
};

const eventsComponents: Record<string, Component> = {
  elegant: EventsElegant,
  floral: EventsFloral,
  minimalist: EventsMinimalist,
  elegant_blue: EventsElegantBlue,
};

const loveStoryComponents: Record<string, Component> = {
  elegant: LoveStoryElegant,
  floral: LoveStoryFloral,
  minimalist: LoveStoryMinimalist,
  elegant_blue: LoveStoryElegantBlue,
};

const galleryComponents: Record<string, Component> = {
  elegant: GalleryElegant,
  floral: GalleryFloral,
  minimalist: GalleryMinimalist,
  elegant_blue: GalleryElegantBlue,
};

const rsvpComponents: Record<string, Component> = {
  elegant: RsvpElegant,
  floral: RsvpFloral,
  minimalist: RsvpMinimalist,
  elegant_blue: RsvpElegantBlue,
};

const giftComponents: Record<string, Component> = {
  elegant: GiftElegant,
  floral: GiftFloral,
  minimalist: GiftMinimalist,
  elegant_blue: GiftElegantBlue,
};

const footerComponents: Record<string, Component> = {
  elegant: FooterElegant,
  floral: FooterFloral,
  minimalist: FooterMinimalist,
  elegant_blue: FooterElegantBlue,
};

// --- THEME DATA SYSTEM ---
const themes: Record<string, ThemeConfig> = {
  elegant_blue: {
    name: 'elegant_blue',
    bg: '#FCFBF8',
    surface: '#F8FAFC',
    primary: '#a8d0e6',
    secondary: '#1E293B',
    text: '#1E293B',
    textLight: '#64748B',
    fontHeading: "'Playfair Display', serif",
    fontBody: "'Playfair Display', serif",
    overlayGradient: 'linear-gradient(180deg, rgba(30,41,59,0.4) 0%, rgba(30,41,59,0.85) 100%)',
    coverImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1080&q=80',
  },
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
    coverImage: 'https://media.mengundanganda.com/tema%20floral/8a5a275c-909d-448b-8d1d-adaa5a7a39f3.webp',
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
const assetsLoaded = ref(false);
const loadingFadeOut = ref(false);
const invitation = ref<Invitation | null>(null);
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);
const rsvpSubmitting = ref(false);
const rsvpMessages = ref<Rsvp[]>([]);

const guestName = ref(route.query.to ? String(route.query.to) : '');
const isOpened = ref(false);
const isClosingOverlay = ref(false);
const isPlaying = ref(false);

// Preload all images/backgrounds used in the invitation
async function preloadAllAssets() {
  await nextTick(); // wait for DOM to render
  await nextTick(); // extra tick for child components

  const urls = new Set<string>();

  // Collect all <img> src attributes
  document.querySelectorAll('img[src]').forEach(img => {
    const src = (img as HTMLImageElement).src;
    if (src && !src.startsWith('data:')) urls.add(src);
  });

  // Collect background-image URLs from inline styles
  document.querySelectorAll('[style]').forEach(el => {
    const style = (el as HTMLElement).style.backgroundImage;
    if (style) {
      const match = style.match(/url\(["']?(.*?)["']?\)/);
      if (match?.[1]) urls.add(match[1]);
    }
  });

  // Collect <image> elements inside SVG (damask patterns etc)
  document.querySelectorAll('image[href]').forEach(img => {
    const href = img.getAttribute('href');
    if (href) urls.add(href);
  });

  // Preload all discovered URLs
  const promises = Array.from(urls).map(url => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // don't block on broken images
      img.src = url;
    });
  });

  // Also enforce a minimum display time of 2 seconds so animation is visible
  const minTime = new Promise<void>(r => setTimeout(r, 2000));

  await Promise.all([...promises, minTime]);

  // Trigger fade-out transition
  loadingFadeOut.value = true;
  setTimeout(() => {
    assetsLoaded.value = true;
  }, 800); // matches CSS transition duration
}

// Hero oval animation refs
const heroOval = ref<HTMLElement | null>(null);
const heroTextItems = ref<HTMLElement[]>([]);

function setHeroTextRef(el: any) {
  if (el) heroTextItems.value.push(el);
}

function animateHeroOval() {
  if (!heroOval.value) return;
  
  gsap.set(heroOval.value, { scale: 0.6, opacity: 0 });
  gsap.set(heroTextItems.value, { y: 30, opacity: 0 });

  const tl = gsap.timeline({ delay: 0.2 });

  tl.to(heroOval.value, {
    scale: 1,
    opacity: 1,
    duration: 1,
    ease: 'back.out(1.4)',
  })
  .to(heroTextItems.value, {
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.15,
  }, '-=0.01');
}

watch(isOpened, (val) => {
  if (val) {
    heroTextItems.value = [];
    nextTick(() => {
      animateHeroOval();
    });
  }
});
const musicPlayer = ref<HTMLAudioElement>();

// Reactive Theme Selector
const activeTheme = computed((): ThemeConfig => {
  const themeKey = invitation.value?.theme || 'elegant';
  return themes[themeKey] ?? themes['elegant']!;
});

const themeName = computed(() => activeTheme.value.name);

// Dynamic component selectors
const activeCover = computed(() => coverComponents[themeName.value] || CoverElegant);
const activeHero = computed(() => heroComponents[themeName.value] || HeroElegant);
const activeQuote = computed(() => quoteComponents[themeName.value] || QuoteElegant);
const activeCouple = computed(() => coupleComponents[themeName.value] || CoupleElegant);
const activeCountdown = computed(() => countdownComponents[themeName.value] || CountdownElegant);
const activeEvents = computed(() => eventsComponents[themeName.value] || EventsElegant);
const activeLoveStory = computed(() => loveStoryComponents[themeName.value] || LoveStoryElegant);
const activeGallery = computed(() => galleryComponents[themeName.value] || GalleryElegant);
const activeRsvp = computed(() => rsvpComponents[themeName.value] || RsvpElegant);
const activeGift = computed(() => giftComponents[themeName.value] || GiftElegant);
const activeFooter = computed(() => footerComponents[themeName.value] || FooterElegant);

// Map Theme to CSS Variables
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
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});

const hasEventDate = computed(() => !!(invitation.value?.akad_date || invitation.value?.resepsi_date));

function openLightbox(index: number) {
  lightboxIndex.value = index;
  lightboxOpen.value = true;
}

const currentPhotoUrl = computed(() => {
  if (!invitation.value?.photos || invitation.value.photos.length === 0) return "";
  const photo = invitation.value.photos[lightboxIndex.value];
  return photo ? resolveAssetUrl(photo.url, apiBase) : "";
});

function parseTimeStr(raw: string | undefined | null): string {
  if (!raw) return '00:00:00';
  // Extract first HH:MM or HH:MM:SS from free-text like "08:00 - 10:00 WIB"
  const match = raw.match(/(\d{1,2}:\d{2}(?::\d{2})?)/);
  return match?.[1] ?? '00:00:00';
}

function updateCountdown() {
  const dateStr = invitation.value?.akad_date || invitation.value?.resepsi_date;
  const timeStr = invitation.value?.akad_date ? invitation.value?.akad_time : invitation.value?.resepsi_time;
  
  if (!dateStr) return;

<<<<<<< HEAD
  // Extract parseable time from free-text (e.g. "08:00 - 10:00 WIB" → "08:00")
=======
  // Extract parseable time from free-text (e.g. "08:00 - 10:00 WIB" ΓåÆ "08:00")
>>>>>>> 19d0ed031155c76783350794b2d1cd93d0549d61
  const safeTime = parseTimeStr(timeStr);
  const targetDateStr = dateStr.includes('T') ? dateStr : `${dateStr}T${safeTime}`;
  
  const target = new Date(targetDateStr).getTime();
  if (isNaN(target)) {
    // Fallback: parse date only without time
    const fallback = new Date(dateStr).getTime();
    if (isNaN(fallback)) return;
    const diff = Math.max(0, fallback - Date.now());
    countdown.days = Math.floor(diff / (1000 * 60 * 60 * 24));
    countdown.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    countdown.minutes = Math.floor((diff / (1000 * 60)) % 60);
    countdown.seconds = Math.floor((diff / 1000) % 60);
    return;
  }

  const now = Date.now();
  const diff = Math.max(0, target - now);

  countdown.days = Math.floor(diff / (1000 * 60 * 60 * 24));
  countdown.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  countdown.minutes = Math.floor((diff / (1000 * 60)) % 60);
  countdown.seconds = Math.floor((diff / 1000) % 60);
}

async function handleSubmitRsvp(form: { guest_name: string; attendance: 'hadir' | 'tidak_hadir'; guest_count: number; message: string }) {
  if (!form.guest_name || !form.attendance) return;
  rsvpSubmitting.value = true;

  try {
    const res = await fetch(`${apiBase}/api/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        invitation_id: invitation.value?.id,
        ...form,
      }),
    });
    if (res.ok) {
      const newRsvp = await res.json();
      rsvpMessages.value.unshift(newRsvp);
    }
  } catch {
  } finally {
    rsvpSubmitting.value = false;
  }
}

// Current URL for iframe src (desktop mode)
const currentUrl = computed(() => window.location.href);

onMounted(async () => {
<<<<<<< HEAD
  // On desktop, we only render the iframe shell — skip all data loading
=======
  // On desktop, we only render the iframe shell ΓÇö skip all data loading
>>>>>>> 19d0ed031155c76783350794b2d1cd93d0549d61
  if (isDesktop.value) return;

  // Hide scrollbar when inside iframe (desktop phone frame)
  if (isInsideIframe) {
    document.documentElement.classList.add('hide-scrollbar');
  }

  const slug = (route.meta.subdomain as string) || (route.params.slug as string);
  
  // -- LIVE PREVIEW INTERCEPT --
  if (slug === 'preview') {
    loading.value = true;
    window.addEventListener('message', (event) => {
      if (event.data?.type === 'LIVE_PREVIEW') {
        invitation.value = event.data.data;
        if (invitation.value) {
          rsvpMessages.value = invitation.value.rsvps || [];
          updateCountdown();
          if (countdownTimer) clearInterval(countdownTimer);
          countdownTimer = setInterval(updateCountdown, 1000);
<<<<<<< HEAD

          // Initiate asset preloading only on the first preview load
          if (!assetsLoaded.value) {
            nextTick(() => preloadAllAssets());
          }
=======
>>>>>>> 19d0ed031155c76783350794b2d1cd93d0549d61
        }
        loading.value = false;
        assetsLoaded.value = true; // Skip asset preloading overlay in preview mode
      }
    });
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'PREVIEW_READY' }, '*');
    }
    return;
  }

  const data = await store.fetchInvitationBySlug(slug);
  invitation.value = data;
  loading.value = false;

  if (data) {
    rsvpMessages.value = data.rsvps || [];
    updateCountdown();
    countdownTimer = setInterval(updateCountdown, 1000);

    // Start preloading assets after invitation data is ready
    nextTick(() => preloadAllAssets());
  }
});

onBeforeUnmount(() => {
  if (countdownTimer) clearInterval(countdownTimer);
  ScrollTrigger.getAll().forEach(t => t.kill());
  window.removeEventListener('resize', onResize);
});
</script>

<template>
  <!-- ========================================= -->
  <!-- DESKTOP MODE: Render inside phone-frame iframe -->
  <!-- ========================================= -->
  <div v-if="isDesktop" class="desktop-phone-wrapper">
    <div class="desktop-phone-frame">
      <iframe 
        :src="currentUrl" 
        class="phone-iframe"
        title="Undangan Pernikahan"
      ></iframe>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- MOBILE MODE: Render normally (or inside iframe) -->
  <!-- ========================================= -->
<<<<<<< HEAD
  <div v-else-if="loading" class="min-h-[100dvh] flex items-center justify-center" style="background: #fffdf5;">
    <DotLottieVue src="/loading.lottie" background="transparent" :speed="1" style="width: 200px; height: 200px;" autoplay loop />
  </div>

  <div v-else-if="!invitation" class="min-h-[100dvh] flex flex-col items-center justify-center bg-gray-50 gap-4">
    <div class="text-6xl">💌</div>
    <h2 class="text-2xl font-serif text-amber-800">Undangan Tidak Ditemukan</h2>
    <p class="text-gray-500">Link undangan yang Anda cari tidak tersedia.</p>
    <router-link to="/" class="mt-2 px-6 py-2 border border-amber-600 text-amber-700 rounded-full hover:bg-amber-50 transition">← Kembali</router-link>
  </div>

  <!-- Main UI Wrapper -->
  <div v-else :style="themeStyles" class="relative bg-[var(--theme-bg)] text-[var(--theme-text)] font-[var(--font-body)] overflow-x-hidden min-h-[100dvh] selection:bg-[var(--theme-primary)] selection:text-white pb-32">
=======
  <div v-else-if="loading" class="min-h-screen flex items-center justify-center" style="background: #fffdf5;">
    <DotLottieVue src="/loading.lottie" background="transparent" :speed="1" style="width: 200px; height: 200px;" autoplay loop />
  </div>

  <div v-else-if="!invitation" class="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
    <div class="text-6xl">≡ƒÆî</div>
    <h2 class="text-2xl font-serif text-amber-800">Undangan Tidak Ditemukan</h2>
    <p class="text-gray-500">Link undangan yang Anda cari tidak tersedia.</p>
    <router-link to="/" class="mt-2 px-6 py-2 border border-amber-600 text-amber-700 rounded-full hover:bg-amber-50 transition">ΓåÉ Kembali</router-link>
  </div>

  <!-- Main UI Wrapper -->
  <div v-else :style="themeStyles" class="relative bg-[var(--theme-bg)] text-[var(--theme-text)] font-[var(--font-body)] overflow-x-hidden min-h-screen selection:bg-[var(--theme-primary)] selection:text-white pb-32">
>>>>>>> 19d0ed031155c76783350794b2d1cd93d0549d61

    <!-- ASSET LOADING OVERLAY -->
    <Transition name="loading-fade">
      <div v-if="!assetsLoaded" :class="['fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-700', loadingFadeOut ? 'opacity-0' : 'opacity-100']" style="background: #fffdf5;">
        <DotLottieVue src="/loading.lottie" background="transparent" :speed="1" style="width: 200px; height: 200px;" autoplay loop />
      </div>
    </Transition>

    <!-- Free INFO BANNER -->
    <div v-if="invitation.is_trial && isOpened" class="trial-banner">
      <div class="trial-banner-content">
<<<<<<< HEAD
        <span class="trial-badge">⏱️ Free</span>
        <span v-if="invitation.views_remaining !== null && invitation.views_remaining !== undefined">
          Sisa {{ invitation.views_remaining }} akses
        </span>
        <span class="trial-separator">•</span>
=======
        <span class="trial-badge">ΓÅ▒∩╕Å Free</span>
        <span v-if="invitation.views_remaining !== null && invitation.views_remaining !== undefined">
          Sisa {{ invitation.views_remaining }} akses
        </span>
        <span class="trial-separator">ΓÇó</span>
>>>>>>> 19d0ed031155c76783350794b2d1cd93d0549d61
        <span>Upgrade untuk hapus Free Banner & akses penuh</span>
        <span>Kunjungi <a href="https://mengundanganda.com" style="color: blue;">mengundanganda.com</a></span>
      </div>
    </div>

    <!-- COVER OVERLAY -->
    <component :is="activeCover"
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
      
      <!-- HERO (Dynamic per theme) -->
<<<<<<< HEAD
      <component :is="activeHero" :overlay-gradient="activeTheme.overlayGradient">
=======
      <component :is="activeHero" :overlay-gradient="activeTheme.overlayGradient" :theme-config="activeTheme">
>>>>>>> 19d0ed031155c76783350794b2d1cd93d0549d61
        <div ref="heroOval" :class="[
            'flex flex-col gap-4 items-center justify-center mx-auto opacity-0 p-6 md:p-10 text-center relative z-10',
            themeName !== 'elegant_blue' 
              ? 'w-[280px] md:w-[380px] lg:w-[450px] h-[420px] md:h-[570px] lg:h-[675px] rounded-full bg-white/30 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.05)]'
              : 'w-[360px] h-[520px] sm:w-[440px] sm:h-[640px] md:w-[500px] md:h-[720px] lg:w-[580px] lg:h-[840px] max-w-[95vw]'
          ]"
        >
          <img v-if="themeName === 'elegant_blue'" src="https://media.mengundanganda.com/desain%20web%20elegan%20blue%20(10).png" alt="Frame" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain -z-10 pointer-events-none" style="max-width: none;" />

          <p :ref="setHeroTextRef" class="uppercase tracking-[0.4em] text-sm md:text-base lg:text-lg mb-4 mt-2 text-[#3d4a40] drop-shadow-sm font-medium opacity-0">The Wedding of</p>
          <h1 :ref="setHeroTextRef" class="text-5xl md:text-7xl lg:text-8xl mb-1 opacity-0 text-[#3d4a40] drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]" :style="{ fontFamily: activeTheme.fontHeading }">
            {{ invitation.groom_name }}
            <span class="block text-3xl md:text-5xl lg:text-6xl text-[#3d4a40] my-2 drop-shadow-sm">&amp;</span>
            {{ invitation.bride_name }}
          </h1>
          <p v-if="formattedDate" :ref="setHeroTextRef" class="text-[#3d4a40] mt-4 text-sm md:text-base lg:text-lg tracking-[0.2em] font-semibold opacity-0 drop-shadow-sm">{{ formattedDate }}</p>
        </div>
      </component>

      <!-- QUOTE (Dynamic per theme) -->
      <component :is="activeQuote"
        v-if="invitation.quote"
        :quote="invitation.quote"
        :theme-config="activeTheme"
      />

      <!-- COUPLE PROFILES (Dynamic per theme) -->
      <component :is="activeCouple"
        :invitation="invitation"
        :theme-config="activeTheme"
        :api-base="apiBase"
      />

      <!-- COUNTDOWN (Dynamic per theme) -->
      <component :is="activeCountdown"
        :countdown="countdown"
        :theme-config="activeTheme"
        :has-date="hasEventDate"
<<<<<<< HEAD
        :invitation="invitation"
=======
>>>>>>> 19d0ed031155c76783350794b2d1cd93d0549d61
      />

      <!-- EVENTS (Dynamic per theme) -->
      <component :is="activeEvents"
        :invitation="invitation"
        :theme-config="activeTheme"
      />

      <!-- LOVE STORY (Dynamic per theme) -->
      <component :is="activeLoveStory"
        :stories="loveStory"
        :theme-config="activeTheme"
      />

      <!-- GALLERY (Dynamic per theme) -->
      <component :is="activeGallery"
        v-if="invitation.photos && invitation.photos.length > 0"
        :photos="invitation.photos"
        :theme-config="activeTheme"
        :api-base="apiBase"
        :gallery-type="invitation.gallery_type || 'carousel'"
        @open-lightbox="openLightbox"
      />

      <!-- RSVP (Dynamic per theme) -->
      <component :is="activeRsvp"
        :rsvp-messages="rsvpMessages.filter((r: any) => !r.is_hidden)"
        :theme-config="activeTheme"
        :submitting="rsvpSubmitting"
        @submit-rsvp="handleSubmitRsvp"
      />

      <!-- GIFT (Dynamic per theme) -->
      <component :is="activeGift"
        :invitation="invitation"
        :theme-config="activeTheme"
      />

      <!-- FOOTER (Dynamic per theme) -->
      <component :is="activeFooter"
        :invitation="invitation"
        :theme-config="activeTheme"
      />

      <!-- LIGHTBOX -->
      <div v-if="lightboxOpen && invitation.photos" class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm" @click="lightboxOpen = false">
<<<<<<< HEAD
        <button class="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full text-white text-2xl hover:bg-white/20 transition-colors flex items-center justify-center" @click.stop="lightboxOpen = false">×</button>
        <button v-if="lightboxIndex > 0" class="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full text-white text-2xl hover:bg-white/20 flex items-center justify-center transition-colors" @click.stop="lightboxIndex--">‹</button>
        <img v-if="currentPhotoUrl" :src="currentPhotoUrl" alt="Gallery preview" class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" @click.stop />
        <button v-if="invitation.photos && lightboxIndex < invitation.photos.length - 1" class="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full text-white text-2xl hover:bg-white/20 flex items-center justify-center transition-colors" @click.stop="lightboxIndex++">›</button>
=======
        <button class="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full text-white text-2xl hover:bg-white/20 transition-colors flex items-center justify-center" @click.stop="lightboxOpen = false">├ù</button>
        <button v-if="lightboxIndex > 0" class="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full text-white text-2xl hover:bg-white/20 flex items-center justify-center transition-colors" @click.stop="lightboxIndex--">ΓÇ╣</button>
        <img v-if="currentPhotoUrl" :src="currentPhotoUrl" alt="Gallery preview" class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" @click.stop />
        <button v-if="invitation.photos && lightboxIndex < invitation.photos.length - 1" class="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full text-white text-2xl hover:bg-white/20 flex items-center justify-center transition-colors" @click.stop="lightboxIndex++">ΓÇ║</button>
>>>>>>> 19d0ed031155c76783350794b2d1cd93d0549d61
      </div>
    </div>

    <!-- Music Player -->
    <audio ref="musicPlayer" v-if="invitation.music_url" :src="resolveAssetUrl(invitation.music_url, apiBase)" loop preload="auto"></audio>
    <button v-if="invitation.music_url && isOpened" @click="toggleMusic" :class="['fixed bottom-8 right-6 z-50 w-12 h-12 rounded-full shadow-lg border border-white/50 backdrop-blur-md flex items-center justify-center transition-all duration-300', isPlaying ? 'bg-white/40 text-[var(--theme-primary)] hover:scale-105 active:scale-95' : 'bg-white/20 text-gray-500 opacity-80 hover:opacity-100 hover:scale-105 active:scale-95']">
      <Icon :icon="isPlaying ? 'ph:music-notes-simple-fill' : 'ph:speaker-slash-fill'" class="w-5 h-5 drop-shadow-sm" />
    </button>
  </div>
</template>

<style scoped>
/* ==============================
   DESKTOP: Phone Frame Wrapper
   ============================== */
.desktop-phone-wrapper {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: #ffffff;
}

.desktop-phone-frame {
  position: relative;
  width: 390px;
  height: 95vh;
  height: 95dvh;
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    -1px 0 0 rgba(0,0,0,0.06),
    1px 0 0 rgba(0,0,0,0.06),
    -4px 0 16px rgba(0,0,0,0.08),
    4px 0 16px rgba(0,0,0,0.08),
    -8px 0 30px rgba(0,0,0,0.05),
    8px 0 30px rgba(0,0,0,0.05);
  background: #fff;
}

.phone-iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: #fff;
}

/* WATERMARK OVERLAY */
.watermark-overlay {
  position: fixed;
  inset: 0;
  z-index: 90;
  pointer-events: none;
  overflow: hidden;
}
.watermark-grid {
  position: absolute;
  inset: -50%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 80px;
  transform: rotate(-35deg);
}
.watermark-text {
  font-size: 1.5rem;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.06);
  white-space: nowrap;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  user-select: none;
}

/* TRIAL BANNER */
.trial-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  color: white;
  padding: 10px 16px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}
.trial-banner-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}
.trial-badge {
  background: rgba(255,255,255,0.2);
  padding: 2px 10px;
  border-radius: 99px;
  font-weight: 700;
  font-size: 0.8rem;
}
.trial-separator {
  opacity: 0.6;
}
</style>

<!-- Non-scoped: targets html element inside iframe -->
<style>
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 19d0ed031155c76783350794b2d1cd93d0549d61
