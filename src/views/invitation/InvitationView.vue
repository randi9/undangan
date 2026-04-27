<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  reactive,
  watch,
  nextTick,
  type Component,
  defineAsyncComponent,
} from "vue";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

// === DESKTOP IFRAME MODE ===
// On desktop, we render the invitation inside an iframe so vw units work like mobile
const isInsideIframe = window.self !== window.top;
const windowWidth = ref(window.innerWidth);
const isDesktop = computed(() => windowWidth.value > 768 && !isInsideIframe);

function onResize() {
  windowWidth.value = window.innerWidth;
}
if (!isInsideIframe) {
  window.addEventListener("resize", onResize);
}
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { useRoute, useRouter } from "vue-router";
import { useInvitationStore } from "@/stores/invitation";
import { useAuthStore } from "@/stores/auth";
import type { Invitation, LoveStoryItem, Rsvp } from "@/types/invitation";
import type { ThemeConfig } from "@/types/theme";
import { resolveAssetUrl } from "@/utils/url";
import { Icon } from "@iconify/vue";

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
const rsvpSubmitting = ref(false);
const rsvpMessages = ref<Rsvp[]>([]);

const guestName = ref(route.query.to ? String(route.query.to) : "");
const isOpened = ref(false);
const isClosingOverlay = ref(false);
const isPlaying = ref(false);

// Preload all images/backgrounds used in the invitation
async function preloadAllAssets() {
  await nextTick(); // wait for DOM to render
  await nextTick(); // extra tick for child components

  const urls = new Set<string>();

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
    setTimeout(() => ScrollTrigger.refresh(), 50); // Refresh GSAP heights after loading screen goes away to prevent pin jumpers
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
  if (invitation.value?.music_url && musicPlayer.value) {
    musicPlayer.value
      .play()
      .then(() => {
        isPlaying.value = true;
      })
      .catch((e) => console.error("Audio blocked by browser:", e));
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

  // On desktop, we only render the iframe shell — skip all data loading
  if (isDesktop.value) return;

  // Hide scrollbar when inside iframe (desktop phone frame)
  if (isInsideIframe) {
    document.documentElement.classList.add("hide-scrollbar");
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
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  if (countdownTimer) clearInterval(countdownTimer);
  ScrollTrigger.getAll().forEach((t) => t.kill());
  window.removeEventListener("resize", onResize);
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
    style="font-family: var(--font-sans, &quot;Inter&quot;, sans-serif)"
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
    <div v-if="isOpened" class="animate-fade-in">
      <!-- HERO (Dynamic per theme) -->
      <component
        :is="activeHero"
        :overlay-gradient="activeTheme.overlayGradient"
      >
        <div
          ref="heroOval"
          :class="[
            'flex flex-col gap-4 items-center justify-center mx-auto opacity-0 p-6 md:p-10 text-center relative z-10',
            !['elegant_blue', 'floral_blue'].includes(themeName)
              ? 'w-[280px] md:w-[380px] lg:w-[450px] h-[420px] md:h-[570px] lg:h-[675px] rounded-full bg-white/30 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.05)]'
              : themeName === 'elegant_blue'
                ? 'w-[360px] h-[520px] sm:w-[440px] sm:h-[640px] md:w-[500px] md:h-[720px] lg:w-[580px] lg:h-[840px] max-w-[95vw]'
                : 'w-full max-w-[600px]'
          ]"
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
            class="uppercase tracking-[0.4em] text-sm md:text-base lg:text-lg mb-4 mt-2 text-[#3d4a40] drop-shadow-sm font-medium opacity-0"
          >
            The Wedding of
          </p>
          <h1
            :ref="setHeroTextRef"
            class="text-5xl md:text-7xl lg:text-8xl mb-1 opacity-0 text-[#3d4a40] drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]"
            :style="{ fontFamily: activeTheme.fontHeading }"
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
            class="text-[#3d4a40] mt-4 text-sm md:text-base lg:text-lg tracking-[0.2em] font-semibold opacity-0 drop-shadow-sm"
          >
            {{ formattedDate }}
          </p>
        </div>
      </component>

      <!-- QUOTE (Dynamic per theme) -->
      <component
        :is="activeQuote"
        v-if="invitation.quote"
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

      <!-- FOOTER (Dynamic per theme) -->
      <component
        :is="activeFooter"
        :invitation="invitation"
        :theme-config="activeTheme"
      />

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
    -1px 0 0 rgba(0, 0, 0, 0.06),
    1px 0 0 rgba(0, 0, 0, 0.06),
    -4px 0 16px rgba(0, 0, 0, 0.08),
    4px 0 16px rgba(0, 0, 0, 0.08),
    -8px 0 30px rgba(0, 0, 0, 0.05),
    8px 0 30px rgba(0, 0, 0, 0.05);
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
</style>
