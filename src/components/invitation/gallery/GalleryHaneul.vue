<template>
  <!-- Section gabungan galeri + love story (DECOUPLED).
       Foto: crossfade + slow zoom otomatis via timer (tidak tergantung scroll).
       Story: scroll-based pin (ada >1 story) menggerakkan teks + garis progres saja.
       Mode tanpa-pin: story fallback mengikuti/mandiri via timer. -->
  <div
    ref="scrollWrapRef"
    :style="scrollMode ? { height: `${100 + timelineItems.length * 90}svh` } : {}"
    style="position:relative; width:100%; margin:0; padding:0; box-sizing:border-box;"
  >
  <section
    v-if="photos && photos.length > 0"
    ref="gallerySection"
    class="relative w-full h-screen h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden select-none bg-black text-white"
    :style="{
      fontFamily: themeConfig?.fontBody || `'Plus Jakarta Sans', sans-serif`,
      width: '100%',
      minHeight: '100svh',
    }"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <!-- 1. FULLSCREEN CROSSFADE BACKGROUND PHOTOS
         (fade + slow zoom; sengaja BUKAN slide agar beda dari animasi love story) -->
    <div class="absolute inset-0 w-full h-full z-0" style="width:100%;height:100%;">
      <div
        v-for="(p, i) in photoList"
        :key="`fade-${i}-${p.id || p.url}`"
        class="absolute inset-0 w-full h-full overflow-hidden cursor-zoom-in"
        :style="{
          width: '100%',
          height: '100%',
          opacity: i === activeIndex ? 1 : 0,
          zIndex: i === activeIndex ? 1 : 0,
          transition: 'opacity 1.4s ease',
          pointerEvents: i === activeIndex ? 'auto' : 'none',
        }"
        @click="onPhotoClick"
      >
        <img
          :src="resolveUrl(p.url)"
          :alt="p.caption || `Foto galeri ${i + 1}`"
          :fetchpriority="i < 2 ? 'high' : 'low'"
          :loading="i < 2 ? 'eager' : 'lazy'"
          draggable="false"
          class="w-full h-full object-cover object-center pointer-events-none select-none"
          :class="photoList.length <= 1 ? 'kenburns-single' : ''"
          :style="
            photoList.length <= 1
              ? { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }
              : {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                  transform: i === activeIndex ? 'scale(1.08)' : 'scale(1)',
                  transition: 'opacity 1.4s ease, transform 6.5s ease-out',
                }
          "
        />
      </div>
    </div>

    <!-- 2. TOP VIGNETTE & SUBTLE HEADER -->
    <div class="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none z-10"></div>
    <header class="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-5 pt-6 sm:pt-8 pointer-events-none">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/15">
        <span class="text-[#D4AF37] text-xs">✦</span>
        <span
          class="text-xs uppercase tracking-[0.2em] text-white/90 font-medium drop-shadow-sm"
          :style="{ fontFamily: themeConfig?.fontHeading || `'Cinzel', serif` }"
        >
          Moments Of Joy
        </span>
      </div>

      <!-- Photo Counter -->
      <span class="text-xs font-semibold tracking-widest text-white/80 px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-md border border-white/15 drop-shadow-sm">
        {{ String(activeIndex + 1).padStart(2, "0") }} / {{ String(photos.length).padStart(2, "0") }}
      </span>
    </header>

    <!-- 3. LEFT & RIGHT GALLERY ARROWS (foto independen -> selalu tampil; navigasi foto tidak pakai scroll) -->
    <button
      v-if="photos && photos.length > 1"
      type="button"
      @click.stop="prevPhoto"
      class="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/25 hover:bg-black/45 active:scale-90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg"
      aria-label="Foto sebelumnya"
    >
      <svg class="w-5 h-5 -translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button
      v-if="photos && photos.length > 1"
      type="button"
      @click.stop="nextPhoto"
      class="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/25 hover:bg-black/45 active:scale-90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg"
      aria-label="Foto berikutnya"
    >
      <svg class="w-5 h-5 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- 4. BOTTOM VIGNETTE OVERLAY (love story, full inline CSS) -->
    <div
      style="position:absolute;left:0;right:0;bottom:0;z-index:20;display:flex;flex-direction:column;justify-content:flex-end;pointer-events:none;background:linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.65) 25%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.12) 80%, transparent 100%);"
    >
      <div style="width:100%;max-width:400px;margin:0 auto;padding:112px 20px 32px;pointer-events:auto;display:flex;flex-direction:column;text-align:left;">
        <!-- STORY CONTENT (Fades on story change) -->
        <transition name="story-fade" mode="out-in">
          <div :key="storyIndex" style="display:flex;flex-direction:column;">
            <!-- Year / Date -->
            <span
              v-if="currentStory?.date"
              style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,8vw,36px);font-weight:400;letter-spacing:-0.01em;line-height:1;margin:0;color:#ffffff;text-shadow:0 2px 8px rgba(0,0,0,0.7);"
            >
              {{ currentStory.date }}
            </span>

            <!-- Title -->
            <h3
              v-if="currentStory?.title"
              style="font-style:italic;font-size:clamp(20px,5.5vw,26px);font-weight:500;line-height:1.3;margin:8px 0;color:#EAE0D2;text-shadow:0 2px 8px rgba(0,0,0,0.7);"
              :style="{ fontFamily: themeConfig?.fontHeading || `'Playfair Display', 'Caveat', serif` }"
            >
              {{ currentStory.title }}
            </h3>

            <!-- Description -->
            <p
              v-if="currentStory?.description"
              style="font-size:13px;font-weight:300;line-height:1.7;margin:0;color:rgba(255,255,255,0.92);text-shadow:0 1px 4px rgba(0,0,0,0.8);white-space:pre-line;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;"
            >
              {{ currentStory.description }}
            </p>
          </div>
        </transition>

        <!-- "Lihat Foto →" action link -->
        <button
          type="button"
          @click="emit('open-lightbox', activeIndex)"
          style="display:inline-flex;align-items:center;gap:6px;background:none;border:none;padding:0;font-size:12px;font-weight:500;letter-spacing:0.04em;color:rgba(255,255,255,0.95);margin:14px 0 22px;cursor:pointer;width:fit-content;text-shadow:0 1px 3px rgba(0,0,0,0.7);"
        >
          <span>Lihat Foto</span>
          <span>→</span>
        </button>

        <!-- 5. PROGRESS PATH / MILESTONE NODES (Path bulat penunjuk progres) -->
        <div
          v-if="timelineItems && timelineItems.length > 0"
          style="position:relative;width:100%;padding-top:4px;"
        >
          <!-- Background connecting line -->
          <div style="position:absolute;top:16px;left:6%;right:6%;height:1.5px;background:rgba(255,255,255,0.25);z-index:0;"></div>

          <!-- Active progress fill line (melangkah lembut per bullet, bukan merangkak) -->
          <div
            style="position:absolute;top:16px;left:6%;height:1.5px;background:#EAE0D2;z-index:0;transition:width 1.4s cubic-bezier(0.65, 0, 0.35, 1);"
            :style="{ width: progressWidth }"
          ></div>

          <!-- Efek bersinar lembut di ujung garis -->
          <div
            v-if="timelineItems.length > 1"
            style="position:absolute;top:11px;width:12px;height:12px;border-radius:9999px;background:radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0) 70%);z-index:1;transform:translateX(-50%);pointer-events:none;animation:tip-glow-pulse 2.2s ease-in-out infinite;"
            :style="{ left: 'calc(6% + ' + progressWidth + ')' }"
          ></div>

          <!-- Milestone nodes container -->
          <div style="position:relative;z-index:10;display:flex;align-items:flex-start;justify-content:space-between;width:100%;">
            <button
              v-for="(item, idx) in timelineItems"
              :key="`milestone-${idx}`"
              type="button"
              @click="onSelectMilestone(idx)"
              style="display:flex;flex-direction:column;align-items:center;position:relative;text-align:center;background:none;border:none;padding:0;cursor:pointer;min-width:48px;max-width:85px;font-family:inherit;"
            >
              <!-- Circular node on path -->
              <div style="height:24px;display:flex;align-items:center;justify-content:center;margin-bottom:6px;">
                <!-- Active node: outer ring with glowing inner dot -->
                <div
                  v-if="idx === storyIndex"
                  style="width:20px;height:20px;border-radius:9999px;border:2px solid #ffffff;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;box-shadow:0 0 12px rgba(255,255,255,0.75);"
                >
                  <span style="width:8px;height:8px;border-radius:9999px;background:#ffffff;"></span>
                </div>

                <!-- Past completed node: filled dot -->
                <div
                  v-else-if="idx < storyIndex"
                  style="width:12px;height:12px;border-radius:9999px;background:rgba(255,255,255,0.8);"
                ></div>

                <!-- Future node: hollow dot -->
                <div
                  v-else
                  style="width:12px;height:12px;border-radius:9999px;border:1px solid rgba(255,255,255,0.45);background:rgba(0,0,0,0.4);"
                ></div>
              </div>

              <!-- Node labels: Year / Date -->
              <span
                style="font-size:11px;letter-spacing:-0.01em;line-height:1.2;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;text-shadow:0 1px 3px rgba(0,0,0,0.8);"
                :style="idx === storyIndex ? { color: '#ffffff', fontWeight: 600 } : { color: 'rgba(255,255,255,0.7)', fontWeight: 400 }"
              >
                {{ item.date || `0${idx + 1}` }}
              </span>

              <!-- Node labels: Title / Milestone -->
              <span
                style="font-size:10px;line-height:1.3;margin-top:2px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-shadow:0 1px 3px rgba(0,0,0,0.8);"
                :style="idx === storyIndex ? { color: '#EAE0D2', fontWeight: 500 } : { color: 'rgba(255,255,255,0.5)', fontWeight: 400 }"
              >
                {{ item.title }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Photo, LoveStoryItem } from "@/types/invitation";
import type { ThemeConfig } from "@/types/theme";
import { resolveAssetUrl } from "@/utils/url";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  photos: Photo[];
  stories?: LoveStoryItem[];
  themeConfig?: ThemeConfig;
  apiBase?: string;
  galleryType?: "carousel" | "masonry";
}>();

const emit = defineEmits<{
  (e: "open-lightbox", index: number): void;
}>();

const gallerySection = ref<HTMLElement | null>(null);
const scrollWrapRef = ref<HTMLElement | null>(null);
let pinST: ScrollTrigger | null = null;

// Mode gabungan: love story scroll-based (pin) + galeri mengikuti otomatis.
// Aktif kalau ada >1 story; kalau tidak, pakai autoplay timer seperti semula.
const scrollMode = computed(() => hasStories.value && timelineItems.value.length > 1);

// ---- Crossfade gallery: foto ditumpuk, yang aktif opacity 1 + slow zoom ----
const photoList = computed(() => props.photos ?? []);
const activeIndex = ref(0);

const storyIndex = ref(0);
// Floating head of the glowing progress line (in bullet units: 0 = first bullet)
const lineHead = ref(0);
const STORY_SEGMENT_MS = 4500;
const STORY_END_HOLD_MS = 5000;
let lastStoryTick = 0;
let storyEndHoldStart = 0;

// Clean stories list
const filteredStories = computed(() =>
  (props.stories ?? []).filter(
    (s) => s && ((s.title || "").trim() || (s.date || "").trim() || (s.description || "").trim())
  )
);
const hasStories = computed(() => filteredStories.value.length > 0);

// Timeline items: uses love story if available, or falls back to photos
const timelineItems = computed(() => {
  if (hasStories.value) {
    return filteredStories.value;
  }
  return photoList.value.map((p, idx) => ({
    date: `0${idx + 1}`,
    title: p.caption || `Foto ${idx + 1}`,
    description: p.caption || "Kenangan perjalanan cinta kami.",
  }));
});

// Currently active story item
const currentStory = computed(() => {
  if (timelineItems.value.length === 0) return null;
  return timelineItems.value[storyIndex.value] || timelineItems.value[0];
});

// Progress fill mengikuti lineHead (kontinu) — di mode timer lineHead
// maju per waktu, di mode scroll lineHead = posisi scroll. Bullet menyala
// tepat saat garis tiba di tengahnya karena storyIndex hanya berubah
// pada momen arrival, dan garis melangkah lembut ke sana.
const progressWidth = computed(() => {
  const n = timelineItems.value.length;
  if (n <= 1) return "0%";
  const ratio = Math.min(1, Math.max(0, lineHead.value / (n - 1)));
  return `${ratio * 88}%`;
});

const resolveUrl = (url: string | undefined) => {
  if (!url) return "";
  return resolveAssetUrl(url, props.apiBase || "");
};

// Gallery navigation: foto independen (crossfade, tanpa lock transisi).
const goPhoto = (dir: 1 | -1) => {
  const n = photoList.value.length;
  if (n <= 1) return;
  activeIndex.value = (activeIndex.value + dir + n) % n;
};

// Manual (klik panah / swipe): geser + mulai ulang interval autoplay
// supaya tidak langsung loncat tepat setelah klik.
const nextPhoto = () => {
  goPhoto(1);
  restartPhotoAutoplay();
};

const prevPhoto = () => {
  goPhoto(-1);
  restartPhotoAutoplay();
};

const onPhotoClick = () => {
  emit("open-lightbox", activeIndex.value);
};

// Ganti story saja (foto independen, tidak ikut digerakkan).
// Dipakai klik milestone saat tanpa pin + animasi fallback.
const goToStory = (idx: number) => {
  const n = timelineItems.value.length;
  if (n === 0) return;
  const clamped = ((idx % n) + n) % n;
  storyIndex.value = clamped;
  lineHead.value = clamped;
  storyEndHoldStart = 0;
};

// Sinkron dari scroll (mode pin): HANYA story + garis progres.
// Foto dibiarkan autoplay mandiri via timer.
const syncScrollStory = (idx: number) => {
  storyIndex.value = idx;
};

const handlePinnedScroll = (progress: number) => {
  const n = timelineItems.value.length;
  if (n <= 1) return;
  const f = Math.min(n - 1, Math.max(0, progress * (n - 1)));
  lineHead.value = f;
  const idx = Math.min(n - 1, Math.floor(f + 1e-4));
  if (idx !== storyIndex.value) syncScrollStory(idx);
};

// Milestone select: mode scroll = lompat ke posisi scroll-nya (foto tidak ikut),
// mode tanpa-pin = pindah story langsung (foto tetap autoplay mandiri)
const onSelectMilestone = (idx: number) => {
  if (scrollMode.value && pinST) {
    const n = timelineItems.value.length;
    const frac = n <= 1 ? 0 : idx / (n - 1);
    const target = pinST.start + frac * (pinST.end - pinST.start);
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }
  goToStory(idx);
};

// Loop reset: hanya story, foto dibiarkan lanjut autoplay
const resetStoryLoop = () => {
  storyIndex.value = 0;
  lineHead.value = 0;
  storyEndHoldStart = 0;
};

// Auto animation tick (HANYA untuk mode tanpa-pin): garis maju, story pindah
// saat garis tiba. Foto tidak disentuh — jalan via autoSlideTimer sendiri.
const tickStoryAnimation = () => {
  const now = Date.now();
  if (document.hidden) { lastStoryTick = now; return; }
  if (!hasStories.value) { lastStoryTick = now; return; }
  const n = timelineItems.value.length;
  if (n <= 1) { lastStoryTick = now; return; }
  if (scrollMode.value) { lastStoryTick = now; return; }
  if (!lastStoryTick) lastStoryTick = now;
  const dt = now - lastStoryTick;
  lastStoryTick = now;
  if (lineHead.value >= n - 1) {
    if (!storyEndHoldStart) storyEndHoldStart = now;
    if (now - storyEndHoldStart >= STORY_END_HOLD_MS) resetStoryLoop();
    return;
  }
  lineHead.value = Math.min(n - 1, lineHead.value + dt / STORY_SEGMENT_MS);
  const arrived = Math.floor(lineHead.value);
  if (arrived > storyIndex.value) {
    storyIndex.value = arrived;
    storyEndHoldStart = 0;
  }
};

// Touch gestures on main screen (swipe to slide photos)
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;

const onTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0]?.clientX ?? 0;
  touchStartY = e.touches[0]?.clientY ?? 0;
  touchStartTime = Date.now();
};

const onTouchEnd = (e: TouchEvent) => {
  // Foto independen: swipe horizontal selalu geser foto (walau mode scroll).
  // Swipe vertikal dibiarkan untuk scroll halaman (pin story).
  const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX;
  const dy = (e.changedTouches[0]?.clientY ?? 0) - touchStartY;
  const dt = Date.now() - touchStartTime;

  // Horizontal swipe
  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) {
      nextPhoto();
    } else {
      prevPhoto();
    }
  }
};

// ---- Foto autoplay mandiri (tidak tergantung scroll/story) ----
const PHOTO_INTERVAL_MS = 3500;
let autoSlideTimer: ReturnType<typeof setInterval> | null = null;
let storyTimer: ReturnType<typeof setInterval> | null = null;

const stopPhotoAutoplay = () => {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer);
    autoSlideTimer = null;
  }
};

const startPhotoAutoplay = () => {
  stopPhotoAutoplay();
  // Tunggu foto ada (data undangan datang async). Kalau belum ada, watcher
  // photos di bawah yang akan men-start ulang saat data tiba.
  if (photoList.value.length <= 1) return;
  autoSlideTimer = setInterval(() => {
    if (document.hidden) return;
    goPhoto(1);
    // mode tanpa-pin + tanpa story: story fallback mengikuti foto
    if (!scrollMode.value && !hasStories.value && timelineItems.value.length > 0) {
      storyIndex.value = activeIndex.value % timelineItems.value.length;
      lineHead.value = storyIndex.value;
    }
  }, PHOTO_INTERVAL_MS);
};

// Dipakai tiap interaksi manual: geser timer supaya tidak loncat
// tepat setelah user klik/swipe.
const restartPhotoAutoplay = () => {
  if (photoList.value.length <= 1) return;
  startPhotoAutoplay();
};

watch(
  () => photoList.value.length,
  (len) => {
    if (activeIndex.value > len - 1) activeIndex.value = 0;
    // foto direset, story dibiarkan (decoupled) — hanya reset jika di luar pin
    if (!scrollMode.value) {
      storyIndex.value = 0;
      lineHead.value = 0;
    }
    storyEndHoldStart = 0;
    // Data baru tiba (kasus paling sering: autoplay "mati" karena timer
    // dibuat saat foto masih kosong) -> start ulang di tick berikutnya.
    nextTick(() => startPhotoAutoplay());
  }
);

watch(
  () => timelineItems.value.length,
  (len) => {
    if (storyIndex.value > len - 1) storyIndex.value = 0;
    if (lineHead.value > len - 1) lineHead.value = 0;
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }
);

const setupPin = () => {
  if (!scrollMode.value || !scrollWrapRef.value || !gallerySection.value) return;
  if (pinST) return;
  storyIndex.value = 0;
  lineHead.value = 0;
  storyEndHoldStart = 0;
  lastStoryTick = Date.now();
  pinST = ScrollTrigger.create({
    trigger: scrollWrapRef.value,
    start: "top top",
    end: "bottom bottom",
    pin: gallerySection.value,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => handlePinnedScroll(self.progress),
  });
  ScrollTrigger.refresh();
};

const destroyPin = () => {
  pinST?.kill();
  pinST = null;
};

onMounted(() => {
  // Pin: scroll HANYA menggerakkan story + garis progres.
  setupPin();
  // Foto: selalu autoplay mandiri. nextTick karena data foto bisa
  // terisi tepat setelah mount (async dari API).
  nextTick(() => startPhotoAutoplay());
  // Story fallback timer (untuk mode tanpa-pin). Di mode pin, tick no-op.
  lastStoryTick = Date.now();
  if (storyTimer) clearInterval(storyTimer);
  storyTimer = setInterval(tickStoryAnimation, 100);
  // Refresh pin setelah layout stabil / gambar dimuat
  requestAnimationFrame(() => ScrollTrigger.refresh());
});

watch(scrollMode, () => {
  if (scrollMode.value) {
    setupPin();
  } else {
    destroyPin();
    ScrollTrigger.refresh();
  }
  // pastikan autoplay foto tetap jalan setelah mode berubah
  startPhotoAutoplay();
});

onBeforeUnmount(() => {
  stopPhotoAutoplay();
  if (storyTimer) clearInterval(storyTimer);
  pinST?.kill();
  pinST = null;
});
</script>

<style scoped>
.story-fade-enter-active,
.story-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.story-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.story-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@keyframes tip-glow-pulse {
  0%, 100% { opacity: 0.55; transform: translateX(-50%) scale(1); }
  50% { opacity: 0.95; transform: translateX(-50%) scale(1.18); }
}

/* Kalau cuma 1 foto (tidak bisa slide), kasih gerak zoom halus supaya tidak mati */
.kenburns-single {
  animation: kenburns-zoom 9s ease-in-out infinite alternate;
  will-change: transform;
}
@keyframes kenburns-zoom {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}
</style>
