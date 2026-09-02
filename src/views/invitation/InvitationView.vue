<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  reactive,
  watch,
  watchEffect,
  nextTick,
  type Component,
  defineAsyncComponent,
} from "vue";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

// === DESKTOP IFRAME MODE ===
// On desktop, we render the invitation inside an iframe so vw units work like mobile
const isInsideIframe = window.self !== window.top;
const windowWidth = ref(window.innerWidth);
const isDesktop = computed(() => windowWidth.value > 500 && !isInsideIframe);

function onResize() {
  windowWidth.value = window.innerWidth;
}
if (!isInsideIframe) {
  window.addEventListener("resize", onResize);
}
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
if (typeof window !== "undefined") {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  ScrollTrigger.clearScrollMemory("manual");
}
import { useRoute, useRouter } from "vue-router";
import { useInvitationStore } from "@/stores/invitation";
import { useAuthStore } from "@/stores/auth";
import type { Invitation, LoveStoryItem, Rsvp } from "@/types/invitation";
import type { ThemeConfig } from "@/types/theme";
import { resolveAssetUrl } from "@/utils/url";
import { Icon } from "@iconify/vue";
import { useSmoothScroll } from "@/composables/useSmoothScroll";

// --- PROPS (optional static data for sample pages) ---
const props = defineProps<{
  staticData?: Invitation | null;
}>();

// --- ASYNC COMPONENT MAPS ---
const coverComponents: Record<string, Component> = {
  elegant: defineAsyncComponent(
    () => import("@/components/invitation/covers/CoverElegant.vue"),
  ),
  floral: defineAsyncComponent(
    () => import("@/components/invitation/covers/CoverFloral.vue"),
  ),
  minimalist: defineAsyncComponent(
    () => import("@/components/invitation/covers/CoverMinimalist.vue"),
  ),
  elegant_blue: defineAsyncComponent(
    () => import("@/components/invitation/covers/CoverElegantBlue.vue"),
  ),
  floral_blue: defineAsyncComponent(
    () => import("@/components/invitation/covers/CoverFloralBlue.vue"),
  ),
  nyunda: defineAsyncComponent(
    () => import("@/components/invitation/covers/CoverNyunda.vue"),
  ),
  fairytale_garden: defineAsyncComponent(
    () => import("@/components/invitation/covers/CoverFairytaleGarden.vue"),
  ),
  evergreen: defineAsyncComponent(
    () => import("@/components/invitation/covers/CoverEvergreen.vue"),
  ),
  royal_fantasy: defineAsyncComponent(
    () => import("@/components/invitation/covers/CoverRoyalFantasy.vue"),
  ),
};

const heroComponents: Record<string, Component> = {
  elegant: defineAsyncComponent(
    () => import("@/components/invitation/heroes/HeroElegant.vue"),
  ),
  floral: defineAsyncComponent(
    () => import("@/components/invitation/heroes/HeroFloral.vue"),
  ),
  minimalist: defineAsyncComponent(
    () => import("@/components/invitation/heroes/HeroMinimalist.vue"),
  ),
  elegant_blue: defineAsyncComponent(
    () => import("@/components/invitation/heroes/HeroElegantBlue.vue"),
  ),
  floral_blue: defineAsyncComponent(
    () => import("@/components/invitation/heroes/HeroFloralBlue.vue"),
  ),
  nyunda: defineAsyncComponent(
    () => import("@/components/invitation/heroes/HeroNyunda.vue"),
  ),
  fairytale_garden: defineAsyncComponent(
    () => import("@/components/invitation/heroes/HeroFairytaleGarden.vue"),
  ),
  evergreen: defineAsyncComponent(
    () => import("@/components/invitation/heroes/HeroEvergreen.vue"),
  ),
  royal_fantasy: defineAsyncComponent(
    () => import("@/components/invitation/heroes/HeroRoyalFantasy.vue"),
  ),
};

const quoteComponents: Record<string, Component> = {
  elegant: defineAsyncComponent(
    () => import("@/components/invitation/quotes/QuoteElegant.vue"),
  ),
  floral: defineAsyncComponent(
    () => import("@/components/invitation/quotes/QuoteFloral.vue"),
  ),
  minimalist: defineAsyncComponent(
    () => import("@/components/invitation/quotes/QuoteMinimalist.vue"),
  ),
  elegant_blue: defineAsyncComponent(
    () => import("@/components/invitation/quotes/QuoteElegantBlue.vue"),
  ),
  floral_blue: defineAsyncComponent(
    () => import("@/components/invitation/quotes/QuoteFloralBlue.vue"),
  ),
  nyunda: defineAsyncComponent(
    () => import("@/components/invitation/quotes/QuoteNyunda.vue"),
  ),
  fairytale_garden: defineAsyncComponent(
    () => import("@/components/invitation/quotes/QuoteFairytaleGarden.vue"),
  ),
  evergreen: defineAsyncComponent(
    () => import("@/components/invitation/quotes/QuoteEvergreen.vue"),
  ),
  royal_fantasy: defineAsyncComponent(
    () => import("@/components/invitation/quotes/QuoteRoyalFantasy.vue"),
  ),
};

const coupleComponents: Record<string, Component> = {
  elegant: defineAsyncComponent(
    () => import("@/components/invitation/couples/CoupleElegant.vue"),
  ),
  floral: defineAsyncComponent(
    () => import("@/components/invitation/couples/CoupleFloral.vue"),
  ),
  minimalist: defineAsyncComponent(
    () => import("@/components/invitation/couples/CoupleMinimalist.vue"),
  ),
  elegant_blue: defineAsyncComponent(
    () => import("@/components/invitation/couples/CoupleElegantBlue.vue"),
  ),
  floral_blue: defineAsyncComponent(
    () => import("@/components/invitation/couples/CoupleFloralBlue.vue"),
  ),
  nyunda: defineAsyncComponent(
    () => import("@/components/invitation/couples/CoupleNyunda.vue"),
  ),
  fairytale_garden: defineAsyncComponent(
    () => import("@/components/invitation/couples/CoupleFairytaleGarden.vue"),
  ),
  evergreen: defineAsyncComponent(
    () => import("@/components/invitation/couples/CoupleEvergreen.vue"),
  ),
  royal_fantasy: defineAsyncComponent(
    () => import("@/components/invitation/couples/CoupleRoyalFantasy.vue"),
  ),
};

const countdownComponents: Record<string, Component> = {
  elegant: defineAsyncComponent(
    () => import("@/components/invitation/countdowns/CountdownElegant.vue"),
  ),
  floral: defineAsyncComponent(
    () => import("@/components/invitation/countdowns/CountdownFloral.vue"),
  ),
  minimalist: defineAsyncComponent(
    () => import("@/components/invitation/countdowns/CountdownMinimalist.vue"),
  ),
  elegant_blue: defineAsyncComponent(
    () => import("@/components/invitation/countdowns/CountdownElegantBlue.vue"),
  ),
  floral_blue: defineAsyncComponent(
    () => import("@/components/invitation/countdowns/CountdownFloralBlue.vue"),
  ),
  nyunda: defineAsyncComponent(
    () => import("@/components/invitation/countdowns/CountdownNyunda.vue"),
  ),
  fairytale_garden: defineAsyncComponent(
    () => import("@/components/invitation/countdowns/CountdownFairytaleGarden.vue"),
  ),
  evergreen: defineAsyncComponent(
    () => import("@/components/invitation/countdowns/CountdownEvergreen.vue"),
  ),
  royal_fantasy: defineAsyncComponent(
    () => import("@/components/invitation/countdowns/CountdownRoyalFantasy.vue"),
  ),
};

const eventsComponents: Record<string, Component> = {
  elegant: defineAsyncComponent(
    () => import("@/components/invitation/events/EventsElegant.vue"),
  ),
  floral: defineAsyncComponent(
    () => import("@/components/invitation/events/EventsFloral.vue"),
  ),
  minimalist: defineAsyncComponent(
    () => import("@/components/invitation/events/EventsMinimalist.vue"),
  ),
  elegant_blue: defineAsyncComponent(
    () => import("@/components/invitation/events/EventsElegantBlue.vue"),
  ),
  floral_blue: defineAsyncComponent(
    () => import("@/components/invitation/events/EventsFloralBlue.vue"),
  ),
  nyunda: defineAsyncComponent(
    () => import("@/components/invitation/events/EventsNyunda.vue"),
  ),
  fairytale_garden: defineAsyncComponent(
    () => import("@/components/invitation/events/EventsFairytaleGarden.vue"),
  ),
  evergreen: defineAsyncComponent(
    () => import("@/components/invitation/events/EventsEvergreen.vue"),
  ),
  royal_fantasy: defineAsyncComponent(
    () => import("@/components/invitation/events/EventsRoyalFantasy.vue"),
  ),
};

const loveStoryComponents: Record<string, Component> = {
  elegant: defineAsyncComponent(
    () => import("@/components/invitation/lovestory/LoveStoryElegant.vue"),
  ),
  floral: defineAsyncComponent(
    () => import("@/components/invitation/lovestory/LoveStoryFloral.vue"),
  ),
  minimalist: defineAsyncComponent(
    () => import("@/components/invitation/lovestory/LoveStoryMinimalist.vue"),
  ),
  elegant_blue: defineAsyncComponent(
    () => import("@/components/invitation/lovestory/LoveStoryElegantBlue.vue"),
  ),
  floral_blue: defineAsyncComponent(
    () => import("@/components/invitation/lovestory/LoveStoryFloralBlue.vue"),
  ),
  nyunda: defineAsyncComponent(
    () => import("@/components/invitation/lovestory/LoveStoryNyunda.vue"),
  ),
  fairytale_garden: defineAsyncComponent(
    () => import("@/components/invitation/lovestory/LoveStoryFairytaleGarden.vue"),
  ),
  evergreen: defineAsyncComponent(
    () => import("@/components/invitation/lovestory/LoveStoryEvergreen.vue"),
  ),
  royal_fantasy: defineAsyncComponent(
    () => import("@/components/invitation/lovestory/LoveStoryRoyalFantasy.vue"),
  ),
};

const galleryComponents: Record<string, Component> = {
  elegant: defineAsyncComponent(
    () => import("@/components/invitation/gallery/GalleryElegant.vue"),
  ),
  floral: defineAsyncComponent(
    () => import("@/components/invitation/gallery/GalleryFloral.vue"),
  ),
  minimalist: defineAsyncComponent(
    () => import("@/components/invitation/gallery/GalleryMinimalist.vue"),
  ),
  elegant_blue: defineAsyncComponent(
    () => import("@/components/invitation/gallery/GalleryElegantBlue.vue"),
  ),
  floral_blue: defineAsyncComponent(
    () => import("@/components/invitation/gallery/GalleryFloralBlue.vue"),
  ),
  nyunda: defineAsyncComponent(
    () => import("@/components/invitation/gallery/GalleryNyunda.vue"),
  ),
  fairytale_garden: defineAsyncComponent(
    () => import("@/components/invitation/gallery/GalleryFairytaleGarden.vue"),
  ),
  evergreen: defineAsyncComponent(
    () => import("@/components/invitation/gallery/GalleryEvergreen.vue"),
  ),
  royal_fantasy: defineAsyncComponent(
    () => import("@/components/invitation/gallery/GalleryRoyalFantasy.vue"),
  ),
};

const rsvpComponents: Record<string, Component> = {
  elegant: defineAsyncComponent(
    () => import("@/components/invitation/rsvp/RsvpElegant.vue"),
  ),
  floral: defineAsyncComponent(
    () => import("@/components/invitation/rsvp/RsvpFloral.vue"),
  ),
  minimalist: defineAsyncComponent(
    () => import("@/components/invitation/rsvp/RsvpMinimalist.vue"),
  ),
  elegant_blue: defineAsyncComponent(
    () => import("@/components/invitation/rsvp/RsvpElegantBlue.vue"),
  ),
  floral_blue: defineAsyncComponent(
    () => import("@/components/invitation/rsvp/RsvpFloralBlue.vue"),
  ),
  nyunda: defineAsyncComponent(
    () => import("@/components/invitation/rsvp/RsvpNyunda.vue"),
  ),
  fairytale_garden: defineAsyncComponent(
    () => import("@/components/invitation/rsvp/RsvpFairytaleGarden.vue"),
  ),
  evergreen: defineAsyncComponent(
    () => import("@/components/invitation/rsvp/RsvpEvergreen.vue"),
  ),
  royal_fantasy: defineAsyncComponent(
    () => import("@/components/invitation/rsvp/RsvpRoyalFantasy.vue"),
  ),
};

const giftComponents: Record<string, Component> = {
  elegant: defineAsyncComponent(
    () => import("@/components/invitation/gift/GiftElegant.vue"),
  ),
  floral: defineAsyncComponent(
    () => import("@/components/invitation/gift/GiftFloral.vue"),
  ),
  minimalist: defineAsyncComponent(
    () => import("@/components/invitation/gift/GiftMinimalist.vue"),
  ),
  elegant_blue: defineAsyncComponent(
    () => import("@/components/invitation/gift/GiftElegantBlue.vue"),
  ),
  floral_blue: defineAsyncComponent(
    () => import("@/components/invitation/gift/GiftFloralBlue.vue"),
  ),
  nyunda: defineAsyncComponent(
    () => import("@/components/invitation/gift/GiftNyunda.vue"),
  ),
  fairytale_garden: defineAsyncComponent(
    () => import("@/components/invitation/gift/GiftFairytaleGarden.vue"),
  ),
  evergreen: defineAsyncComponent(
    () => import("@/components/invitation/gift/GiftEvergreen.vue"),
  ),
  royal_fantasy: defineAsyncComponent(
    () => import("@/components/invitation/gift/GiftRoyalFantasy.vue"),
  ),
};

const footerComponents: Record<string, Component> = {
  elegant: defineAsyncComponent(
    () => import("@/components/invitation/footer/FooterElegant.vue"),
  ),
  floral: defineAsyncComponent(
    () => import("@/components/invitation/footer/FooterFloral.vue"),
  ),
  minimalist: defineAsyncComponent(
    () => import("@/components/invitation/footer/FooterMinimalist.vue"),
  ),
  elegant_blue: defineAsyncComponent(
    () => import("@/components/invitation/footer/FooterElegantBlue.vue"),
  ),
  floral_blue: defineAsyncComponent(
    () => import("@/components/invitation/footer/FooterFloralBlue.vue"),
  ),
  nyunda: defineAsyncComponent(
    () => import("@/components/invitation/footer/FooterNyunda.vue"),
  ),
  fairytale_garden: defineAsyncComponent(
    () => import("@/components/invitation/footer/FooterFairytaleGarden.vue"),
  ),
  evergreen: defineAsyncComponent(
    () => import("@/components/invitation/footer/FooterEvergreen.vue"),
  ),
  royal_fantasy: defineAsyncComponent(
    () => import("@/components/invitation/footer/FooterRoyalFantasy.vue"),
  ),
};

// --- THEME DATA SYSTEM (from centralized registry) ---
import { THEME_REGISTRY } from "@/config/themes";

// Build themes Record from registry for backward compat
const themes: Record<string, ThemeConfig> = Object.fromEntries(
  Object.entries(THEME_REGISTRY).map(([key, entry]) => [
    key,
    entry.themeConfig,
  ]),
);

const route = useRoute();
const router = useRouter();
const store = useInvitationStore();
const authStore = useAuthStore();
const apiBase = import.meta.env.VITE_API_URL || "";

// === RECORD MODE ===
// When ?record=true, this invitation is inside RecordModeView's iframe.
// We listen for scroll control messages from the parent and report progress.
const isRecordMode = computed(() => route.query.record === "true");
let recordScrollRAF: number | null = null;
let recordScrollSpeed = 1.5;

function recordScrollStart(speed: number) {
  recordScrollSpeed = speed;
  if (recordScrollRAF) cancelAnimationFrame(recordScrollRAF);
  function step() {
    window.scrollBy(0, recordScrollSpeed);
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'RECORD_SCROLL_PROGRESS', progress }, '*');
    }
    if (progress >= 100) {
      recordScrollRAF = null;
      if (window.parent !== window) {
        window.parent.postMessage({ type: 'RECORD_SCROLL_DONE' }, '*');
      }
      return;
    }
    recordScrollRAF = requestAnimationFrame(step);
  }
  recordScrollRAF = requestAnimationFrame(step);
}

function recordScrollPause() {
  if (recordScrollRAF) {
    cancelAnimationFrame(recordScrollRAF);
    recordScrollRAF = null;
  }
}

function recordScrollReset() {
  recordScrollPause();
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (window.parent !== window) {
    window.parent.postMessage({ type: 'RECORD_SCROLL_PROGRESS', progress: 0 }, '*');
  }
}

function onRecordMessage(event: MessageEvent) {
  if (!event.data?.type) return;
  switch (event.data.type) {
    case 'RECORD_SCROLL_START':
      recordScrollStart(event.data.speed || 1.5);
      break;
    case 'RECORD_SCROLL_PAUSE':
      recordScrollPause();
      break;
    case 'RECORD_SCROLL_RESET':
      recordScrollReset();
      break;
    case 'RECORD_SCROLL_SPEED':
      recordScrollSpeed = event.data.speed || 1.5;
      break;
  }
}

const goHome = () => {
  if (authStore.user) {
    router.push("/dashboard");
  } else {
    router.push("/");
  }
};

const loading = ref(true);
const assetsLoaded = ref(false);
const loadingFadeOut = ref(false);
const invitation = ref<Invitation | null>(null);
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);

// --- SMOOTH SCROLL (Lenis) ---
const {
  init: initSmoothScroll,
  destroy: destroySmoothScroll,
  stop: stopScroll,
  start: startScroll,
} = useSmoothScroll();
const rsvpSubmitting = ref(false);
const rsvpMessages = ref<Rsvp[]>([]);

const guestName = ref(route.query.to ? String(route.query.to) : "");
const isOpened = ref(false);
const isClosingOverlay = ref(false);
const isPlaying = ref(false);

const invitationContainer = ref<HTMLElement | null>(null);

// === COVER SCROLL LOCK ===
// While the cover overlay is still visible (before the guest taps "Buka
// Undangan"), the invitation content is not mounted, so the page must not
// scroll. The 100dvh wrapper can slightly overflow the layout viewport on
// some devices/themes (e.g. Royal Fantasy), which produced an unwanted
// scrollbar on the cover screen. Locking overflow removes the scrollbar.
watchEffect(() => {
  if (typeof document === "undefined" || isDesktop.value) return;
  const coverShowing = !loading.value && !!invitation.value && !isOpened.value;
  document.documentElement.classList.toggle("cover-locked", coverShowing);
});

// Preload all images/backgrounds used in the invitation
// Preload all images/backgrounds used in the invitation
async function preloadAllAssets() {
  await nextTick(); // wait for DOM to render
  await nextTick(); // extra tick for child components

  const urls = new Set<string>();

  // Programmatically add database-driven invitation photos to preloader
  if (invitation.value) {
    const apiBaseUrl = import.meta.env.VITE_API_URL || "";
    const resolve = (url: string) => resolveAssetUrl(url, apiBaseUrl);
    
    if (invitation.value.groom_photo) {
      urls.add(resolve(invitation.value.groom_photo));
    }
    if (invitation.value.bride_photo) {
      urls.add(resolve(invitation.value.bride_photo));
    }
    if (invitation.value.cover_photo) {
      urls.add(resolve(invitation.value.cover_photo));
    }
    if (invitation.value.photos && Array.isArray(invitation.value.photos)) {
      invitation.value.photos.forEach((p: any) => {
        if (p.url) urls.add(resolve(p.url));
      });
    }
  }

  // Preload fairytale garden theme specific large backdrop and decoration assets
  if (themeName.value === "fairytale_garden") {
    urls.add("https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_55a618a5-052e-4be3-ac4b-2fbed28dd8c2.webp");
    urls.add("https://media.mengundanganda.com/fairygarden/event%20section/dewirandi_00144412-c4d7-4fe2-b445-9f6051ec6c59.webp");
    urls.add("https://media.mengundanganda.com/fairygarden/event%20section/dewirandi_b4ec478d-7d99-45e5-8de8-f6f41b3fec27.webp");
    urls.add("https://media.mengundanganda.com/fairygarden/event%20section/dewirandi_9df48ccf-e2e6-40d6-9877-9f82de6cd479.webp");
    urls.add("https://media.mengundanganda.com/fairygarden/couple%20section/dewirandi_b98ad2d7-375d-453a-9f0d-b60141522925.webp");
    urls.add("https://media.mengundanganda.com/fairygarden/footer%20section/dewirandi_b928e5b1-d044-45bc-b314-24b25b4ca215.webp");
    urls.add("https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_e5766616-8b07-419a-b12f-cb576a738daa.webp");
    urls.add("https://media.mengundanganda.com/fairygarden/quotes%20section/dewirandi_16ea4f80-300c-41c5-91b1-4ba941ed161a.webp");
    urls.add("https://media.mengundanganda.com/fairygarden/couple%20section/dewirandi_b42881e0-cb77-4565-8f1f-d4603ff53253.webp");
    urls.add("https://media.mengundanganda.com/fairygarden/couple%20section/dewirandi_f558ffe0-5a6f-400f-a20c-22300414bcd6.webp");
    urls.add("https://media.mengundanganda.com/fairygarden/doa%20section/dewirandi_1343c9af-32d3-43eb-a58c-818547757131.webp");
    urls.add("https://media.mengundanganda.com/fairygarden/doa%20section/dewirandi_24da44b6-7c06-4a02-804d-8f3b7405757d.webp");
    urls.add("https://media.mengundanganda.com/fairygarden/doa%20section/dewirandi_71303b0e-9d65-4b90-beb2-56d03eb8646e.webp");
    urls.add("https://media.mengundanganda.com/fairygarden/doa%20section/dewirandi_88f47fca-57f4-482c-96af-9960019456d7.webp");
    urls.add("https://media.mengundanganda.com/fairygarden/doa%20section/dewirandi_a0d79529-b4ec-4782-a57f-66c26dc108ba.webp");
    urls.add("https://media.mengundanganda.com/fairygarden/doa%20section/dewirandi_a85b9cb6-04b8-48db-9012-3bf32572dfb6.webp");
    urls.add("https://media.mengundanganda.com/fairygarden/doa%20section/dewirandi_de68c436-3af6-4abb-a57a-6fb4187d69a6.webp");
  }

  if (themeName.value === "evergreen") {
    urls.add("https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_003c89a6-d363-423d-83c4-2f34746fb0fb.webp");
    urls.add("https://media.mengundanganda.com/evergreen/cover%20section/dewirandi_5c873aaf-ce25-4a6c-af4d-1ef512a28810.webp");
    urls.add("https://media.mengundanganda.com/evergreen/quotes%20section/dewirandi_af16b8e4-ad73-48ec-8073-bf36703f3b8e.webp");
    urls.add("https://media.mengundanganda.com/evergreen/countdown%20section/dewirandi_9dbeed92-b311-4f90-8c41-3a4f21b005c4.webp");
    urls.add("https://media.mengundanganda.com/evergreen/countdown%20section/dewirandi_3413e0a7-5e28-44d0-a2ef-5bb6d9e052da.webp");
    urls.add("https://media.mengundanganda.com/evergreen/lovestory%20section/dewirandi_3df150cb-e69e-4f29-899d-2ea0abe58183.webp");
    urls.add("https://media.mengundanganda.com/evergreen/footer%20section/dewirandi_ad5c156d-47bf-47c8-872e-0ae7ab0ab0bd.webp");
    urls.add("https://media.mengundanganda.com/evergreen/footer%20section/dewirandi_ab26493f-4e9e-4dae-9111-cd1df542fb75.webp");
    urls.add("https://media.mengundanganda.com/evergreen/rsvp/dewirandi_9fe27500-64c2-44a6-981e-91f7e7403647.webp");
    urls.add("https://media.mengundanganda.com/evergreen/doa%20section/dewirandi_8e39084d-974b-4077-8195-b34bb666f3e0.webp");
    urls.add("https://media.mengundanganda.com/evergreen/doa%20section/dewirandi_2128f278-e2d1-4cf0-9627-3a052bcaa028.webp");
  }

  // Collect all <img> src attributes
  document.querySelectorAll("img[src]").forEach((img) => {
    const src = (img as HTMLImageElement).src;
    if (src && !src.startsWith("data:")) urls.add(src);
  });

  // Collect background-image URLs from inline styles
  document.querySelectorAll("[style]").forEach((el) => {
    const style = (el as HTMLElement).style.backgroundImage;
    if (style) {
      const match = style.match(/url\(["']?(.*?)["']?\)/);
      if (match?.[1]) urls.add(match[1]);
    }
  });

  // Collect <image> elements inside SVG (damask patterns etc)
  document.querySelectorAll("image[href]").forEach((img) => {
    const href = img.getAttribute("href");
    if (href) urls.add(href);
  });

  // Preload all discovered URLs
  const promises = Array.from(urls).map((url) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // don't block on broken images
      img.src = url;
    });
  });

  // Also enforce a minimum display time of 2 seconds so animation is visible
  const minTime = new Promise<void>((r) => setTimeout(r, 2000));

  await Promise.all([...promises, minTime]);

  // Trigger fade-out transition
  loadingFadeOut.value = true;
  setTimeout(() => {
    assetsLoaded.value = true;
    setTimeout(() => {
      ScrollTrigger.refresh();
      // Also refresh on font loaded
      if (typeof document !== 'undefined' && document.fonts) {
        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
        });
      }
    }, 50); // Refresh GSAP heights after loading screen goes away to prevent pin jumpers
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

  if (themeName.value === 'evergreen') {
    gsap.set(heroOval.value, { opacity: 0, scale: 0.98 });
    gsap.set(heroTextItems.value, { y: 20, opacity: 0 });

    const tl = gsap.timeline({
      delay: 2.0, // Sinkron dengan akhir animasi cover evergreen (~2.25s total)
    });

    tl.to(heroOval.value, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    }).to(
      heroTextItems.value,
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power2.out",
        stagger: 0.12, // Muncul mulus bertahap tanpa delay
      },
      "-=0.3"
    );
    return;
  }

  gsap.set(heroOval.value, { scale: 0.6, opacity: 0 });
  gsap.set(heroTextItems.value, { y: 30, opacity: 0 });

  // Wait for all flowers to finish their entry animation (delay + duration = 5.3s) in fairytale garden theme
  const startDelay = themeName.value === 'fairytale_garden' ? 7.3 : 0.2;
  const tl = gsap.timeline({ 
    delay: startDelay,
    onComplete: () => {
      // Re-enable scroll after the card and texts finish animating in
      if (themeName.value === 'fairytale_garden') {
        startScroll();
      }
    }
  });

  tl.to(heroOval.value, {
    scale: 1,
    opacity: 1,
    duration: 1,
    ease: "back.out(1.4)",
  }).to(
    heroTextItems.value,
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.15,
    },
    "-=0.01",
  );
}

watch(isOpened, (val) => {
  if (val) {
    heroTextItems.value = [];
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Initialize Lenis smooth scrolling after invitation is opened
    // Delayed slightly to let async components render first
    // Skip in record mode — programmatic scrollBy needs direct scroll, not Lenis interpolation
    if (!isRecordMode.value) {
      setTimeout(() => {
        initSmoothScroll();
        // Prevent scrolling during the entry animations in Fairytale Garden theme
        if (themeName.value === 'fairytale_garden') {
          stopScroll();
        }
      }, 200);
    }

    // Refresh ScrollTrigger when web fonts are loaded and rendered
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        setTimeout(() => ScrollTrigger.refresh(true), 100);
        setTimeout(() => ScrollTrigger.refresh(true), 500);
      });
    }

    // Tunggu sampai ref heroOval benar-benar ada (terikat ke DOM)
    // sebab pada komponen Async, render DOM mungkin terjadi lebih telat dari sekadar nextTick
    const unwatchHero = watch(
      heroOval,
      (el) => {
        if (el) {
          nextTick(() => {
            animateHeroOval();
            setTimeout(() => ScrollTrigger.refresh(true), 150);
            setTimeout(() => ScrollTrigger.refresh(true), 600);
            unwatchHero();
          });
        }
      },
      { immediate: true },
    );
  }
});

// Stop smooth scroll when lightbox is open (prevent background scrolling)
watch(lightboxOpen, (open) => {
  if (open) {
    stopScroll();
  } else {
    startScroll();
  }
});


const musicPlayer = ref<HTMLAudioElement>();

// Reactive Theme Selector
const activeTheme = computed((): ThemeConfig => {
  const themeKey = invitation.value?.theme || "elegant";
  return themes[themeKey] ?? themes["elegant"]!;
});

const themeName = computed(() => activeTheme.value.name);

// Dynamic component selectors
const activeCover = computed(
  () => coverComponents[themeName.value] || coverComponents["elegant"],
);
const activeHero = computed(
  () => heroComponents[themeName.value] || heroComponents["elegant"],
);
const activeQuote = computed(
  () => quoteComponents[themeName.value] || quoteComponents["elegant"],
);
const activeCouple = computed(
  () => coupleComponents[themeName.value] || coupleComponents["elegant"],
);
const activeCountdown = computed(
  () => countdownComponents[themeName.value] || countdownComponents["elegant"],
);
const activeEvents = computed(
  () => eventsComponents[themeName.value] || eventsComponents["elegant"],
);
const activeLoveStory = computed(
  () => loveStoryComponents[themeName.value] || loveStoryComponents["elegant"],
);
const activeGallery = computed(
  () => galleryComponents[themeName.value] || galleryComponents["elegant"],
);
const activeRsvp = computed(
  () => rsvpComponents[themeName.value] || rsvpComponents["elegant"],
);
const activeGift = computed(
  () => giftComponents[themeName.value] || giftComponents["elegant"],
);
const activeFooter = computed(
  () => footerComponents[themeName.value] || footerComponents["elegant"],
);

// Map Theme to CSS Variables
const themeStyles = computed(() => ({
  "--theme-bg": activeTheme.value.bg,
  "--theme-surface": activeTheme.value.surface,
  "--theme-primary": activeTheme.value.primary,
  "--theme-secondary": activeTheme.value.secondary,
  "--theme-text": activeTheme.value.text,
  "--theme-text-light": activeTheme.value.textLight,
  "--theme-overlay": activeTheme.value.overlayGradient,
  "--font-heading": activeTheme.value.fontHeading,
  "--font-body": activeTheme.value.fontBody,
}));

function openInvitation() {
  isClosingOverlay.value = true;
  isOpened.value = true;

  // Preload background images for Fairytale Garden theme to prevent blank flashes when scrolling
  if (themeName.value === "fairytale_garden") {
    const imagesToPreload = [
      "https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_55a618a5-052e-4be3-ac4b-2fbed28dd8c2.webp",
      "https://media.mengundanganda.com/fairygarden/event%20section/dewirandi_00144412-c4d7-4fe2-b445-9f6051ec6c59.webp",
      "https://media.mengundanganda.com/fairygarden/footer%20section/dewirandi_b928e5b1-d044-45bc-b314-24b25b4ca215.webp",
      "https://media.mengundanganda.com/fairygarden/couple%20section/dewirandi_b98ad2d7-375d-453a-9f0d-b60141522925.webp",
    ];
    imagesToPreload.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }

  // Reset scroll position to top when opening the invitation
  window.scrollTo({ top: 0, behavior: "instant" });

  // Enforce scroll position after DOM updates from async components
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  });

  // Request fullscreen mode on user click gesture (only on mobile devices/screens, and not inside iframe)
  if (!isRecordMode.value && !isInsideIframe && window.innerWidth <= 500) {
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().catch((err) => {
        console.warn("Fullscreen request rejected:", err);
      });
    } else if ((docEl as any).webkitRequestFullscreen) {
      (docEl as any).webkitRequestFullscreen().catch((err: any) => {
        console.warn("WebKit fullscreen request rejected:", err);
      });
    }
  }

  if (invitation.value?.music_url && musicPlayer.value && !isRecordMode.value) {
    musicPlayer.value
      .play()
      .then(() => {
        isPlaying.value = true;
      })
      .catch((e) => console.error("Audio blocked by browser:", e));
  }
  const closeDelay = themeName.value === 'fairytale_garden' ? 3200 : themeName.value === 'evergreen' ? 2750 : 1400;
  setTimeout(() => {
    isClosingOverlay.value = false;
  }, closeDelay);
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

function handleVisibilityChange() {
  if (!musicPlayer.value) return;
  if (document.hidden) {
    if (isPlaying.value) {
      musicPlayer.value.pause();
    }
  } else {
    if (isPlaying.value) {
      musicPlayer.value
        .play()
        .catch((e) => console.error("Auto-play resumed error:", e));
    }
  }
}

const countdown = reactive({ days: 0, hours: 0, minutes: 0, seconds: 0 });
let countdownTimer: ReturnType<typeof setInterval>;

const loveStory = computed<LoveStoryItem[]>(() => {
  if (!invitation.value?.love_story) return [];
  try {
    const parsed =
      typeof invitation.value.love_story === "string"
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

const hasEventDate = computed(
  () => !!(invitation.value?.akad_date || invitation.value?.resepsi_date),
);

function openLightbox(index: number) {
  lightboxIndex.value = index;
  lightboxOpen.value = true;
}

const currentPhotoUrl = computed(() => {
  if (!invitation.value?.photos || invitation.value.photos.length === 0)
    return "";
  const photo = invitation.value.photos[lightboxIndex.value];
  return photo ? resolveAssetUrl(photo.url, apiBase) : "";
});

function parseTimeStr(raw: string | undefined | null): string {
  if (!raw) return "00:00:00";
  // Extract first HH:MM or HH:MM:SS from free-text like "08:00 - 10:00 WIB"
  const match = raw.match(/(\d{1,2}:\d{2}(?::\d{2})?)/);
  return match?.[1] ?? "00:00:00";
}

function updateCountdown() {
  const dateStr = invitation.value?.akad_date || invitation.value?.resepsi_date;
  const timeStr = invitation.value?.akad_date
    ? invitation.value?.akad_time
    : invitation.value?.resepsi_time;

  if (!dateStr) return;

  // Extract parseable time from free-text (e.g. "08:00 - 10:00 WIB" → "08:00")
  const safeTime = parseTimeStr(timeStr);
  const targetDateStr = dateStr.includes("T")
    ? dateStr
    : `${dateStr}T${safeTime}`;

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

async function handleSubmitRsvp(form: {
  guest_name: string;
  attendance: "hadir" | "tidak_hadir";
  guest_count: number;
  message: string;
}) {
  if (!form.guest_name || !form.attendance) return;

  // Guard: prevent concurrent submissions (rapid double-click)
  if (rsvpSubmitting.value) return;

  rsvpSubmitting.value = true;

  // In sample/static mode, mock the RSVP submission locally
  if (props.staticData) {
    setTimeout(() => {
      rsvpMessages.value.unshift({
        guest_name: form.guest_name,
        attendance: form.attendance,
        guest_count: form.guest_count,
        message: form.message,
        created_at: new Date().toISOString(),
      });
      rsvpSubmitting.value = false;
    }, 800);
    return;
  }

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
  document.addEventListener("visibilitychange", handleVisibilityChange);

  // === RECORD MODE: Listen for scroll commands from parent ===
  if (isRecordMode.value) {
    window.addEventListener('message', onRecordMessage);
    // Notify parent that iframe is ready
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'RECORD_IFRAME_READY' }, '*');
    }
  }

  // On desktop, we only render the iframe shell — skip all data loading
  if (isDesktop.value) return;

  // Hide native scrollbars on invitation view (mobile, iframe, and desktop preview)
  if (typeof document !== "undefined") {
    document.documentElement.classList.add("hide-scrollbar");
    document.body.classList.add("hide-scrollbar");
  }

  // -- STATIC SAMPLE MODE --
  // If static data is provided via prop, use it directly without API fetch
  if (props.staticData) {
    invitation.value = props.staticData;
    rsvpMessages.value = props.staticData.rsvps || [];
    updateCountdown();
    countdownTimer = setInterval(updateCountdown, 1000);
    loading.value = false;
    nextTick(() => preloadAllAssets());

    // Auto-open invitation if requested (bypasses cover)
    if (route.query.autoOpen === "true") {
      isOpened.value = true;
      window.addEventListener(
        "scroll",
        () => {
          if (window.parent !== window) {
            window.parent.postMessage({ type: "DEMO_SCROLLED" }, "*");
          }
        },
        { once: true, passive: true },
      );
    }
    return;
  }

  const slug =
    (route.meta.subdomain as string) || (route.params.slug as string);

  // -- LIVE PREVIEW INTERCEPT --
  if (slug === "preview") {
    loading.value = true;
    window.addEventListener("message", (event) => {
      if (event.data?.type === "LIVE_PREVIEW") {
        invitation.value = event.data.data;
        if (invitation.value) {
          rsvpMessages.value = invitation.value.rsvps || [];
          updateCountdown();
          if (countdownTimer) clearInterval(countdownTimer);
          countdownTimer = setInterval(updateCountdown, 1000);

          // Initiate asset preloading only on the first preview load
          if (!assetsLoaded.value) {
            nextTick(() => preloadAllAssets());
          }
        }
        loading.value = false;
        assetsLoaded.value = true; // Skip asset preloading overlay in preview mode
      }
    });
    if (window.parent !== window) {
      window.parent.postMessage({ type: "PREVIEW_READY" }, "*");
    }
    return;
  }

  // Detect if this is an admin preview (skip view counting)
  const isAdminPreview =
    route.query.preview === "true" || document.referrer.includes("/dashboard");

  const data = await store.fetchInvitationBySlug(slug, isAdminPreview);
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
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  document.documentElement.classList.remove("cover-locked");
  if (typeof document !== "undefined") {
    document.documentElement.classList.remove("hide-scrollbar");
    document.body.classList.remove("hide-scrollbar");
  }
  if (countdownTimer) clearInterval(countdownTimer);
  destroySmoothScroll();
  ScrollTrigger.getAll().forEach((t) => t.kill());
  window.removeEventListener("resize", onResize);
  // Record mode cleanup
  if (isRecordMode.value) {
    window.removeEventListener('message', onRecordMessage);
    recordScrollPause();
  }
});
</script>

<template>
  <div v-if="isDesktop" class="desktop-phone-wrapper">
    <!-- Smartphone CSS Frame Mockup -->
    <div class="smartphone-frame-wrapper">
      <div class="smartphone-frame">
        <div class="smartphone-notch"></div>
        <div class="smartphone-screen">
          <iframe
            :src="currentUrl"
            class="phone-iframe"
            title="Undangan Pernikahan"
          ></iframe>
        </div>
      </div>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- MOBILE MODE: Render normally (or inside iframe) -->
  <!-- ========================================= -->
  <div
    v-else-if="loading"
    class="min-h-[100dvh] flex items-center justify-center"
    style="background: #fffdf5"
  >
    <DotLottieVue
      src="/loading.lottie"
      background="transparent"
      :speed="1"
      style="width: 200px; height: 200px"
      autoplay
      loop
    />
  </div>

  <div
    v-else-if="!invitation"
    class="min-h-[100dvh] flex flex-col items-center justify-center p-6 lg:p-10 bg-[#f8fafc] relative overflow-hidden"
    style="font-family: var(--font-sans, 'Inter', sans-serif)"
  >
    <!-- Modern ambient blobs -->
    <div
      class="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[350px] bg-blue-200/40 rounded-full blur-[80px] md:blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[450px] bg-amber-200/40 rounded-full blur-[80px] md:blur-[120px] -translate-x-1/3 translate-y-1/3 pointer-events-none"
    ></div>

    <!-- Content Container -->
    <div
      class="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-[400px]"
      style="transform: translateY(-5vh)"
    >
      <!-- Premium Icon Container -->
      <div
        class="relative w-28 h-28 flex items-center justify-center group cursor-default"
      >
        <div
          class="absolute inset-0 bg-white shadow-xl shadow-slate-200/50 rounded-[1.8rem] rotate-6 transition-transform duration-500 group-hover:rotate-12"
        ></div>
        <div
          class="absolute inset-0 bg-amber-50 rounded-[1.8rem] border border-amber-100/60 backdrop-blur-sm -rotate-3 flex items-center justify-center transition-transform duration-500 group-hover:rotate-0"
        >
          <Icon
            icon="ph:envelope-open-duotone"
            class="text-[52px] text-amber-500"
          />
        </div>
      </div>

      <div style="height: 48px; width: 100%"></div>

      <!-- Typography -->
      <div class="flex flex-col items-center">
        <h1
          class="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-none"
        >
          404
        </h1>
        <div style="height: 12px; width: 100%"></div>
        <h2 class="text-xl md:text-2xl font-bold text-slate-700">
          Tidak Ditemukan
        </h2>
      </div>

      <div style="height: 24px; width: 100%"></div>

      <p class="text-base text-slate-500 leading-relaxed px-4 max-w-[320px]">
        Oops! Halaman yang Anda coba tuju sepertinya salah ketik atau URL-nya
        sudah tidak aktif.
      </p>

      <div style="height: 40px; width: 100%"></div>

      <!-- Deep premium button -->
      <button
        @click="goHome"
        class="group w-full max-w-[280px] bg-blue-600 text-white font-semibold py-4 px-8 rounded-[1.25rem] transition-all duration-300 hover:bg-blue-700 hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(37,99,235,0.45)] active:scale-[0.98]"
      >
        <div class="flex items-center justify-center gap-3">
          <span class="tracking-wide">{{
            authStore.user ? "Ke Dashboard" : "Buat Undangan Gratis"
          }}</span>
          <Icon
            icon="ph:arrow-right-bold"
            class="text-lg group-hover:translate-x-1 transition-transform duration-300"
          />
        </div>
      </button>
    </div>
  </div>

  <!-- Main UI Wrapper -->
  <div
    v-else
    :style="themeStyles"
    class="relative bg-[var(--theme-bg)] text-[var(--theme-text)] font-[var(--font-body)] overflow-x-hidden min-h-[100dvh] selection:bg-[var(--theme-primary)] selection:text-white pb-32"
  >
    <!-- ASSET LOADING OVERLAY -->
    <Transition name="loading-fade">
      <div
        v-if="!assetsLoaded"
        :class="[
          'fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-700',
          loadingFadeOut ? 'opacity-0' : 'opacity-100',
        ]"
        style="background: #fffdf5"
      >
        <DotLottieVue
          src="/loading.lottie"
          background="transparent"
          :speed="1"
          style="width: 200px; height: 200px"
          autoplay
          loop
        />
      </div>
    </Transition>

    <!-- Powered by branding moved to after Footer component -->

    <!-- COVER OVERLAY -->
    <component
      :is="activeCover"
      v-show="!isOpened || isClosingOverlay"
      :groom-name="invitation.groom_name"
      :bride-name="invitation.bride_name"
      :guest-name="guestName"
      :is-closing="isClosingOverlay"
      :is-loaded="assetsLoaded || loadingFadeOut"
      :font-heading="activeTheme.fontHeading"
      :font-body="activeTheme.fontBody"
      :cover-image="
        invitation.cover_photo
          ? resolveAssetUrl(invitation.cover_photo, apiBase)
          : activeTheme.coverImage
      "
      @open="openInvitation"
    />

    <!-- MAIN INVITATION CONTENT -->
    <div v-if="isOpened" ref="invitationContainer" :class="themeName === 'evergreen' ? '' : 'animate-fade-in'" style="overflow-anchor: none">
      <!-- HERO WRAPPER (prevents layout shift flash of quotes) -->
      <div style="min-height: 100dvh; width: 100%">
        <!-- HERO (Dynamic per theme) -->
        <component
          :is="activeHero"
          :overlay-gradient="activeTheme.overlayGradient"
          :quote="invitation.quote"
          :theme-config="activeTheme"
          :invitation="invitation"
          :api-base="apiBase"
        >
          <div
            ref="heroOval"
            :class="[
              'flex flex-col gap-4 p-6 md:p-10 relative z-10 opacity-0',
              !['elegant_blue', 'floral_blue', 'nyunda', 'fairytale_garden', 'evergreen', 'royal_fantasy'].includes(themeName)
                ? 'items-center justify-center mx-auto text-center w-[280px] md:w-[380px] lg:w-[450px] h-[420px] md:h-[570px] lg:h-[675px] rounded-full bg-white/30 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.05)]'
                : themeName === 'nyunda'
                  ? ''
                  : themeName === 'elegant_blue'
                    ? 'items-center justify-center mx-auto text-center w-[360px] h-[520px] sm:w-[440px] sm:h-[640px] md:w-[500px] md:h-[720px] lg:w-[580px] lg:h-[840px] max-w-[95vw]'
                    : themeName === 'fairytale_garden'
                      ? 'fairytale-hero-card'
                      : 'items-center justify-center mx-auto text-center w-full max-w-[600px]',
            ]"
            :style="
              ['nyunda', 'fairytale_garden', 'evergreen', 'royal_fantasy'].includes(themeName)
                ? {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    textAlign: 'center',
                    margin: '0 auto',
                  }
                : {}
            "
          >
            <img
              v-if="themeName === 'elegant_blue'"
              src="https://media.mengundanganda.com/elegant_blue/hero%20section/randidewi_9c4e42a1-0bb6-4e36-85a9-d581e9767bd7.webp"
              alt="Frame"
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain -z-10 pointer-events-none"
              style="max-width: none"
            />


            <p
              :ref="setHeroTextRef"
              class="uppercase tracking-[0.4em] text-sm md:text-base lg:text-lg mb-2 mt-1 text-[#3d4a40] drop-shadow-sm font-medium opacity-0"
              :style="themeName === 'nyunda' ? { textAlign: 'center' } : {}"
            >
              The Wedding of
            </p>
            <h1
              :ref="setHeroTextRef"
              class="text-5xl md:text-7xl lg:text-8xl mb-1 text-[#3d4a40] drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] opacity-0"
              :style="
                themeName === 'nyunda'
                  ? { fontFamily: activeTheme.fontHeading, textAlign: 'center' }
                  : { fontFamily: activeTheme.fontHeading }
              "
            >
              {{ invitation.groom_name }}
              <span
                class="block text-3xl md:text-5xl lg:text-6xl text-[#3d4a40] my-2 drop-shadow-sm"
                >&amp;</span
              >
              {{ invitation.bride_name }}
            </h1>
            <p
              v-if="formattedDate"
              :ref="setHeroTextRef"
              class="text-[#3d4a40] mt-3 text-sm md:text-base lg:text-lg tracking-[0.2em] font-semibold drop-shadow-sm opacity-0"
            >
              {{ formattedDate }}
            </p>

            <!-- Bottom Divider & Undangan Pernikahan for Evergreen -->
            <div
              v-if="themeName === 'evergreen'"
              :ref="setHeroTextRef"
              class="mt-5 flex flex-col items-center gap-2 opacity-0"
            >
              <div class="w-[1px] h-7 bg-white/60 drop-shadow-sm"></div>
              <span class="text-[10px] uppercase tracking-[0.3em] text-white/90 font-medium drop-shadow-md">Undangan Pernikahan</span>
            </div>
          </div>
        </component>
      </div>

      <!-- QUOTE (Dynamic per theme) — royal_fantasy sudah jadi 1 section dengan hero -->
      <component
        :is="activeQuote"
        v-if="invitation.quote && themeName !== 'evergreen' && themeName !== 'royal_fantasy'"
        :quote="invitation.quote"
        :theme-config="activeTheme"
      />

      <!-- COUPLE PROFILES (Dynamic per theme) -->
      <component
        :is="activeCouple"
        :invitation="invitation"
        :theme-config="activeTheme"
        :api-base="apiBase"
      />

      <!-- COUNTDOWN (Dynamic per theme) -->
      <component
        :is="activeCountdown"
        v-if="themeName !== 'evergreen'"
        :countdown="countdown"
        :theme-config="activeTheme"
        :has-date="hasEventDate"
        :invitation="invitation"
      />

      <!-- EVENTS (Dynamic per theme) -->
      <component
        :is="activeEvents"
        :invitation="invitation"
        :theme-config="activeTheme"
        :countdown="countdown"
        :has-date="hasEventDate"
      />

      <!-- LOVE STORY (Dynamic per theme) -->
      <component
        :is="activeLoveStory"
        :stories="loveStory"
        :theme-config="activeTheme"
        :api-base="apiBase"
      />

      <!-- GALLERY (Dynamic per theme) -->
      <component
        :is="activeGallery"
        v-if="invitation.photos && invitation.photos.length > 0"
        :photos="invitation.photos"
        :theme-config="activeTheme"
        :api-base="apiBase"
        :gallery-type="invitation.gallery_type || 'carousel'"
        @open-lightbox="openLightbox"
      />

      <!-- RSVP, GIFT, & FOOTER WRAPPER (Unified 250dvh section) -->
      <div
        class="rsvp-gift-wrapper"
        style="position: relative; width: 100%; z-index: 10"
      >
        <!-- Shared Background for RSVP & Gift in Blue themes -->
        <div
          v-if="['floral_blue', 'elegant_blue'].includes(themeName)"
          style="
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100vw;
            background-image: url('https://media.mengundanganda.com/floral-blue/rsv%20section/randidewi_1cd310ab-cb74-40d2-942c-07e3f50c594d.webp');
            background-size: cover;
            background-position: center;
            z-index: -1;
          "
        >
          <!-- Light blue overlay to match gallery, with increased opacity -->
          <div
            style="
              position: absolute;
              inset: 0;
              background-color: rgba(168, 208, 230, 0.7);
            "
          ></div>
        </div>

        <!-- Shared Unified Background for Evergreen (Biru polos sampai footer, tanpa gradasi hijau) -->
        <div
          v-if="themeName === 'evergreen'"
          class="absolute inset-0 w-full pointer-events-none -z-10 overflow-hidden"
          style="background: rgba(163, 199, 216, 0.7)"
        ></div>

        <!-- Background Asset Antara RSVP dan Gift untuk Tema Evergreen -->
        <div
          v-if="themeName === 'evergreen'"
          style="
            position: absolute;
            left: 50%;
            transform: translateX(-50%); /* Menjaga asset tetap di tengah saat lebar disesuaikan */
            z-index: -5;           /* Di bawah form/card RSVP dan Gift, di atas background dasar */
            pointer-events: none;   /* Mencegah mengganggu interaksi form */
            
            /* ============================================================== */
            /* SILAKAN ATUR POSISI NAIK/TURUN (GESER-GESER) DI SINI           */
            /* Ubah persentase atau gunakan pixel, contoh: '25%', '30%', '950px' */
            /* ============================================================== */
            top: 55%;

            /* ============================================================== */
            /* SILAKAN ATUR UKURAN LEBAR DI SINI                             */
            /* Contoh: '100%' (layar penuh), '120%' (lebih besar/lebar), '80%' */
            /* ============================================================== */
            width: 150%;

            /* ============================================================== */
            /* SILAKAN ATUR OPASITAS (TRANSPARANSI) DI SINI                  */
            /* Nilai dari 0.0 (transparan penuh) sampai 1.0 (padat/jelas)     */
            /* ============================================================== */
            opacity: 1;
          "
        >
          <img
            src="https://media.mengundanganda.com/evergreen/rsvp/dewirandi_d08d670f-ed92-4c32-b59f-f796ef232a4e.webp"
            alt="Evergreen RSVP Divider Bg"
            style="
              width: 100%;
              height: auto;
              display: block;
              -webkit-mask-image: linear-gradient(
                to bottom,
                #000 0%,
                #000 30%,
                rgba(0, 0, 0, 0.7) 40%,
                rgba(0, 0, 0, 0.3) 50%,
                transparent 60%
              );
              mask-image: linear-gradient(
                to bottom,
                #000 0%,
                #000 30%,
                rgba(0, 0, 0, 0.7) 40%,
                rgba(0, 0, 0, 0.3) 50%,
                transparent 60%
              );
            "
          />
        </div>

        <!-- ============================================================= -->
        <!-- DOA PENGANTIN (Tema Evergreen) — pindah ke area RSVP          -->
        <!-- Tinggi 100dvh, background ikut wrapper biru RSVP/Gift.        -->
        <!-- ============================================================= -->
        <section
          v-if="themeName === 'evergreen' && invitation.show_doa_pengantin"
          class="relative w-full flex flex-col items-center justify-center px-8 text-center box-border"
          style="height: 100dvh; z-index: 5"
        >
          <!-- ========== AWAN KIRI (DOA SECTION) ========== -->
          <!-- ^^ NGOTAK-NGATIK: ubah 'top' (naik/turun), 'left' (geser kiri/kanan), -->
          <!-- 'width' (ukuran), dan 'opacity' (transparansi) langsung di style di bawah ^^ -->
          <img
            class="doa-cloud-left"
            src="https://media.mengundanganda.com/evergreen/doa%20section/dewirandi_8e39084d-974b-4077-8195-b34bb666f3e0.webp"
            alt="Awan Kiri"
            style="
              position: absolute;
              top: 12%;              /* >>> ATUR POSISI NAIK/TURUN (contoh: '5%', '20%', '-50px', '120px') */
              left: -100vw;           /* >>> ATUR GESER KIRI/KANAN (makin negatif = makin keluar layar kiri) */
              width: 200vw;           /* >>> ATUR UKURAN LEBAR — BEBAS! 100vw = seukuran layar, mau 150vw/200vw juga bisa */
              max-width: none;       /* JANGAN DIHAPUS: mematikan batas max-width:100% global Tailwind */
              height: auto;
              transform: rotate(0deg); /* >>> ATUR PUSARAN/ROTASI DI SINI (contoh: '10deg', '-15deg', '0.5turn') */
              z-index: -1;           /* -1 = di belakang teks doa, ubah ke 1 kalau mau di depan */
              pointer-events: none;
              user-select: none;
              opacity: 0.6;            /* >>> ATUR TRANSPARANSI (0.0 - 1.0) */
            "
          />

          <!-- ========== AWAN KANAN (DOA SECTION) ========== -->
          <!-- ^^ NGOTAK-NGATIK: ubah 'top' (naik/turun), 'right' (geser kanan/kiri), -->
          <!-- 'width' (ukuran), dan 'opacity' (transparansi) langsung di style di bawah ^^ -->
          <img
            class="doa-cloud-right"
            src="https://media.mengundanganda.com/evergreen/doa%20section/dewirandi_2128f278-e2d1-4cf0-9627-3a052bcaa028.webp"
            alt="Awan Kanan"
            style="
              position: absolute;
              top: 73%;              /* >>> ATUR POSISI NAIK/TURUN (contoh: '60%', '75%', '-80px', '500px') */
              right: -200vw;          /* >>> ATUR GESER KIRI/KANAN (makin negatif = makin keluar layar kanan) */
              width: 300vw;           /* >>> ATUR UKURAN LEBAR — BEBAS! 100vw = seukuran layar, mau 150vw/200vw juga bisa */
              max-width: none;       /* JANGAN DIHAPUS: mematikan batas max-width:100% global Tailwind */
              height: auto;
              transform: rotate(0deg); /* >>> ATUR PUSARAN/ROTASI DI SINI (contoh: '10deg', '-15deg', '0.5turn') */
              z-index: -1;           /* -1 = di belakang teks doa, ubah ke 1 kalau mau di depan */
              pointer-events: none;
              user-select: none;
              opacity: 0.6;            /* >>> ATUR TRANSPARANSI (0.0 - 1.0) */
            "
          />
          <!-- ========== /AWAN DOA SECTION ========== -->

          <!-- Ornamen kutipan -->
          <div
            class="flex items-center justify-center gap-3 mb-6"
            style="color: #2f4a3b; opacity: 0.8"
          >
            <span
              style="
                width: 36px;
                height: 1px;
                background: linear-gradient(to right, #3f6350, transparent);
              "
            ></span>
            <svg
              style="width: 18px; height: 18px"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
              />
            </svg>
            <span
              style="
                width: 36px;
                height: 1px;
                background: linear-gradient(to left, #3f6350, transparent);
              "
            ></span>
          </div>

          <!-- Judul -->
          <h3
            style="
              font-family: 'Cormorant Garamond', Georgia, serif;
              font-size: 28px;
              font-weight: 600;
              color: #1b3024;
              letter-spacing: 0.02em;
              margin-bottom: 20px;
            "
          >
            Doa Pengantin
          </h3>

          <!-- Teks Arab -->
          <p
            style="
              font-family: 'Amiri', 'Traditional Arabic', serif;
              font-size: clamp(18px, 5.2vw, 25px);
              line-height: 1.8;
              color: #1b3024;
              direction: rtl;
              word-spacing: 2px;
              margin-bottom: 20px;
              white-space: nowrap;
              max-width: 100%;
              text-align: center;
            "
          >
            بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>

          <!-- Terjemahan -->
          <p
            style="
              font-family: 'Montserrat', sans-serif;
              font-size: 13px;
              line-height: 1.7;
              color: #2f4a3b;
              font-style: italic;
              opacity: 0.95;
              max-width: 340px;
            "
          >
            "Semoga Allah memberkahimu dan memberkahi apa yang menjadi
            tanggung jawabmu, serta menyatukan kalian berdua dalam kebaikan."
          </p>

          <!-- Sumber -->
          <p
            style="
              font-family: 'Montserrat', sans-serif;
              font-size: 11px;
              font-weight: 700;
              color: #3f6350;
              margin-top: 14px;
              letter-spacing: 0.05em;
            "
          >
            (HR. Abu Dawud no. 2130)
          </p>

          <!-- Garis aksen dekoratif -->
          <div
            class="flex items-center justify-center gap-2 mt-8"
            style="opacity: 0.75"
          >
            <span
              style="
                width: 40px;
                height: 1px;
                background: linear-gradient(to right, #3f6350, transparent);
              "
            ></span>
            <span
              style="
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background-color: #2f4a3b;
              "
            ></span>
            <span
              style="
                width: 40px;
                height: 1px;
                background: linear-gradient(to left, #3f6350, transparent);
              "
            ></span>
          </div>
        </section>

        <!-- RSVP (Dynamic per theme) -->
        <component
          :is="activeRsvp"
          :rsvp-messages="rsvpMessages.filter((r: any) => !r.is_hidden)"
          :theme-config="activeTheme"
          :submitting="rsvpSubmitting"
          @submit-rsvp="handleSubmitRsvp"
        />

        <!-- GIFT (Dynamic per theme) -->
        <component
          :is="activeGift"
          :invitation="invitation"
          :theme-config="activeTheme"
        />

        <!-- ============================================================= -->
        <!-- DIVIDER GIFT → FOOTER (Tema Evergreen)                        -->
        <!-- Layer luar = clipper (top:0 bottom:0 + overflow-hidden)       -->
        <!-- supaya asset yang menjuntai ke bawah TIDAK menambah tinggi    -->
        <!-- halaman. Lebar clipper dibuat 300vw agar bebas memperlebar    -->
        <!-- asset tanpa terpotong.                                         -->
        <!-- ============================================================= -->
        <div
          v-if="themeName === 'evergreen'"
          style="
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 300vw;
            overflow: hidden;
            z-index: -5;
            pointer-events: none;
          "
        >
          <img
            src="https://media.mengundanganda.com/evergreen/footer%20section/dewirandi_ab26493f-4e9e-4dae-9111-cd1df542fb75.webp"
            alt="Evergreen Gift-Footer Divider Bg"
            style="
              position: absolute;
              left: 50%;
              transform: translateX(-50%); /* Menjaga asset tetap di tengah */

              /* ============================================================== */
              /* ATUR POSISI NAIK/TURUN DI SINI                                 */
              /* Contoh: '78%', '86%', '90%' — makin besar makin ke bawah       */
              /* ============================================================== */
              top: 75%;

              /* ============================================================== */
              /* ATUR LEBAR ASSET DI SINI (pakai vw)                            */
              /* 100vw = seukuran layar, 150vw = 1,5x layar, bisa sampai 300vw  */
              /* ============================================================== */
              width: 150vw;
              height: auto;
              display: block;
              opacity: 0.7; /* ATUR OPASITAS — 0.0 s/d 1.0 */

              /* ============================================================== */
              /* FADE ATAS, BAWAH, KIRI & KANAN                                 */
              /* Layer 1 = fade vertikal: 0%→58% atas, 65%→100% bawah.          */
              /* Layer 2 = fade horizontal: kiri pudar sampai 58%, kanan s/d 68%. */
              /* mask-composite: intersect → kedua fade digabung (dikali).      */
              /* ============================================================== */
              -webkit-mask-image: linear-gradient(
                  to bottom,
                  transparent 0%,
                  rgba(0, 0, 0, 0.02) 8%,
                  rgba(0, 0, 0, 0.06) 16%,
                  rgba(0, 0, 0, 0.12) 24%,
                  rgba(0, 0, 0, 0.22) 32%,
                  rgba(0, 0, 0, 0.35) 40%,
                  rgba(0, 0, 0, 0.52) 48%,
                  rgba(0, 0, 0, 0.75) 54%,
                  #000 58%,
                  #000 65%,
                  rgba(0, 0, 0, 0.85) 70%,
                  rgba(0, 0, 0, 0.55) 76%,
                  rgba(0, 0, 0, 0.25) 84%,
                  rgba(0, 0, 0, 0.05) 92%,
                  transparent 100%
                ),
                linear-gradient(
                  to right,
                  transparent 0%,
                  rgba(0, 0, 0, 0.08) 10%,
                  rgba(0, 0, 0, 0.18) 20%,
                  rgba(0, 0, 0, 0.32) 30%,
                  rgba(0, 0, 0, 0.5) 40%,
                  rgba(0, 0, 0, 0.72) 48%,
                  rgba(0, 0, 0, 0.9) 54%,
                  #000 58%,
                  #000 68%,
                  rgba(0, 0, 0, 0.5) 80%,
                  rgba(0, 0, 0, 0.2) 90%,
                  transparent 100%
                );
              mask-image: linear-gradient(
                  to bottom,
                  transparent 0%,
                  rgba(0, 0, 0, 0.02) 8%,
                  rgba(0, 0, 0, 0.06) 16%,
                  rgba(0, 0, 0, 0.12) 24%,
                  rgba(0, 0, 0, 0.22) 32%,
                  rgba(0, 0, 0, 0.35) 40%,
                  rgba(0, 0, 0, 0.52) 48%,
                  rgba(0, 0, 0, 0.75) 54%,
                  #000 58%,
                  #000 65%,
                  rgba(0, 0, 0, 0.85) 70%,
                  rgba(0, 0, 0, 0.55) 76%,
                  rgba(0, 0, 0, 0.25) 84%,
                  rgba(0, 0, 0, 0.05) 92%,
                  transparent 100%
                ),
                linear-gradient(
                  to right,
                  transparent 0%,
                  rgba(0, 0, 0, 0.08) 10%,
                  rgba(0, 0, 0, 0.18) 20%,
                  rgba(0, 0, 0, 0.32) 30%,
                  rgba(0, 0, 0, 0.5) 40%,
                  rgba(0, 0, 0, 0.72) 48%,
                  rgba(0, 0, 0, 0.9) 54%,
                  #000 58%,
                  #000 68%,
                  rgba(0, 0, 0, 0.5) 80%,
                  rgba(0, 0, 0, 0.2) 90%,
                  transparent 100%
                );
              -webkit-mask-composite: source-in;
              mask-composite: intersect;
            "
          />
        </div>

        <!-- FOOTER (Dynamic per theme) -->
        <component
          :is="activeFooter"
          :invitation="invitation"
          :theme-config="activeTheme"
          :rsvp-messages="rsvpMessages.filter((r: any) => !r.is_hidden)"
          :submitting="rsvpSubmitting"
          :stories="loveStory"
          :photos="invitation.photos || []"
          :gallery-type="invitation.gallery_type || 'carousel'"
          :api-base="apiBase"
          @submit-rsvp="handleSubmitRsvp"
          @open-lightbox="openLightbox"
        />
      </div>

      <!-- Powered by branding (trial only, sticky bottom) -->
      <div v-if="invitation.is_trial" class="powered-by-sticky">
        <a
          href="https://mengundanganda.com"
          target="_blank"
          class="powered-by-link"
        >
          <img
            src="/images/logo.webp"
            alt="Logo MengundangAnda"
            class="powered-by-logo"
          />
          <div class="powered-by-text">
            <span class="powered-by-title">Dibuat dengan</span>
            <span class="powered-by-brand">MengundangAnda.com</span>
          </div>
        </a>
      </div>

      <!-- LIGHTBOX -->
      <div
        v-if="lightboxOpen && invitation.photos"
        class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
        @click="lightboxOpen = false"
      >
        <button
          class="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full text-white text-2xl hover:bg-white/20 transition-colors flex items-center justify-center"
          @click.stop="lightboxOpen = false"
        >
          ×
        </button>
        <button
          v-if="lightboxIndex > 0"
          class="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full text-white text-2xl hover:bg-white/20 flex items-center justify-center transition-colors"
          @click.stop="lightboxIndex--"
        >
          ‹
        </button>
        <img
          v-if="currentPhotoUrl"
          :src="currentPhotoUrl"
          alt="Gallery preview"
          class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          @click.stop
        />
        <button
          v-if="
            invitation.photos && lightboxIndex < invitation.photos.length - 1
          "
          class="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full text-white text-2xl hover:bg-white/20 flex items-center justify-center transition-colors"
          @click.stop="lightboxIndex++"
        >
          ›
        </button>
      </div>
    </div>

    <!-- Music Player -->
    <audio
      ref="musicPlayer"
      v-if="invitation.music_url"
      :src="resolveAssetUrl(invitation.music_url, apiBase)"
      loop
      preload="auto"
    ></audio>
    <button
      v-if="invitation.music_url && isOpened"
      @click="toggleMusic"
      :class="[
        'fixed right-6 z-50 w-12 h-12 rounded-full shadow-lg border border-white/50 backdrop-blur-md flex items-center justify-center transition-all duration-300',
        invitation.is_trial ? 'bottom-20' : 'bottom-8',
        isPlaying
          ? 'bg-white/40 text-[var(--theme-primary)] hover:scale-105 active:scale-95'
          : 'bg-white/20 text-gray-500 opacity-80 hover:opacity-100 hover:scale-105 active:scale-95',
      ]"
    >
      <Icon
        :icon="
          isPlaying ? 'ph:music-notes-simple-fill' : 'ph:speaker-slash-fill'
        "
        class="w-5 h-5 drop-shadow-sm"
      />
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
  height: 100dvh;
  overflow: hidden; /* No scrollbar on the desktop phone-frame shell */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #f8fafc; /* Latar belakang premium yang kontras dengan frame HP hitam */
}

/* Smartphone Mockup Styles */
.smartphone-frame-wrapper {
  position: relative;
  width: 100%;
  max-width: 440px;
  padding: 20px 30px 60px 30px; /* Dipersempit ke 30px agar tidak memotong isi pada viewport lebih kecil */
  perspective: 1000px;
  display: flex;
  justify-content: center;
  /* Shrink the mockup on short windows so it always fits without scrolling */
  transform: scale(min(1, calc(100dvh / 830px)));
}

.smartphone-frame {
  position: relative;
  width: 100%;
  max-width: 300px;
  aspect-ratio: 9 / 19.5;
  background: #000;
  border-radius: 40px;
  border: 10px solid #1a1a1a;
  box-shadow:
    -20px 30px 60px -10px rgba(0, 0, 0, 0.45),
    inset 0 0 0 1px rgba(255, 255, 255, 0.15);
  z-index: 2;
  transform: rotateY(-8deg) rotateX(3deg) translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  will-change: transform;
  transition:
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.5s ease;
}

.smartphone-frame:hover {
  transform: rotateY(0deg) rotateX(0deg) translateZ(0);
  box-shadow:
    0 40px 80px -15px rgba(0, 0, 0, 0.3),
    inset 0 0 0 1px rgba(255, 255, 255, 0.15);
}

.smartphone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 110px;
  height: 24px;
  background: #1a1a1a;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  z-index: 10;
}

.smartphone-notch::after {
  content: "";
  position: absolute;
  top: 6px;
  right: 25px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.smartphone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 28px;
  overflow: hidden;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
.smartphone-screen::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

.phone-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 390px;
  height: calc(100% / 0.725);
  transform: scale(0.725) translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  will-change: transform;
  transform-origin: top left;
  border: none;
  background: #fff;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
.phone-iframe::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
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

/* POWERED BY FIXED BANNER (trial only) */
.powered-by-sticky {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 90;
  background-color: #f0f7ff; /* Warna biru muda yang lembut */
  border-top: 1px solid #cce4ff;
  box-shadow: 0 -4px 12px rgba(0, 100, 255, 0.06);
  padding: 10px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.powered-by-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  background: white;
  padding: 6px 16px 6px 6px;
  border-radius: 99px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.powered-by-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}
.powered-by-logo {
  height: 28px;
  width: 28px;
  border-radius: 50%;
  object-fit: cover;
  background: white;
}
.powered-by-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.powered-by-title {
  font-size: 10px;
  color: #64748b;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}
.powered-by-brand {
  font-size: 13px;
  font-weight: 700;
  color: #0284c7; /* Warna biru identitas logo */
  line-height: 1.2;
}

/* Fairytale Theme Arch Glass Card */
.fairytale-hero-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
  width: 85%;
  max-width: 320px;
  height: 420px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1.5px solid rgba(255, 255, 255, 0.65);
  /* Arch shape: semi-circle top, rounded bottom corners */
  border-radius: 160px 160px 24px 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05), inset 0 0 12px rgba(255, 255, 255, 0.2);
  padding: 48px 24px 24px 24px;
}

/* ==============================
   ANIMASI AWAN SECTION DOA (EVERGREEN) — CSS murni, tanpa GSAP
   Awan kiri melaju pelan ke kanan, awan kanan pelan ke kiri,
   lalu balik lagi perlahan (bolak-balik terus / alternate).
   ============================== */
.doa-cloud-left {
  animation: doa-drift-right 18s ease-in-out infinite alternate;
}
.doa-cloud-right {
  animation: doa-drift-left 18s ease-in-out infinite alternate;
}
/* ANIMASI PAKAI 'translate', BUKAN 'transform' — jadi rotate di style
   inline tiap awan tetap jalan dan tidak ditimpa oleh animasi ini. */

/* >>> ATUR JAUH GERAK AWAN KIRI DI SINI (naikkan = makin jauh) */
@keyframes doa-drift-right {
  from { translate: 0 0; }
  to   { translate: 80px 0; }
}
/* >>> ATUR JAUH GERAK AWAN KANAN DI SINI (negatif = ke kiri) */
@keyframes doa-drift-left {
  from { translate: 0 0; }
  to   { translate: -80px 0; }
}
</style>

<!-- Non-scoped: targets html/body element across invitation views & iframe -->
<style>
html.hide-scrollbar,
html.hide-scrollbar body,
body.hide-scrollbar,
.hide-scrollbar {
  scrollbar-width: none !important; /* Firefox */
  -ms-overflow-style: none !important; /* IE/Edge */
}

html.hide-scrollbar::-webkit-scrollbar,
html.hide-scrollbar body::-webkit-scrollbar,
html.hide-scrollbar *::-webkit-scrollbar,
body.hide-scrollbar::-webkit-scrollbar,
body.hide-scrollbar *::-webkit-scrollbar,
.hide-scrollbar::-webkit-scrollbar,
::-webkit-scrollbar {
  display: none !important; /* Chrome/Safari/Edge */
  width: 0 !important;
  height: 0 !important;
  background: transparent !important;
}

/* Lock document scroll (and remove the scrollbar) while the cover is shown */
html.cover-locked,
html.cover-locked body {
  overflow: hidden !important;
}
</style>
