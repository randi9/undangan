<template>
  <section
    v-if="hasStories || showDoa"
    ref="storySection"
    class="relative h-[100dvh] w-full bg-[#AED4DA] overflow-hidden text-center flex items-center justify-center isolate"
  >
    <!-- Background Cover (mencakup section Love Story & Doa sekaligus)
         tinggi full (auto 100%), lebar mengikuti rasio gambar, di-center -->
    <div
      aria-hidden="true"
      style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -20;
        pointer-events: none;
        user-select: none;
        background-image: url('https://media.mengundanganda.com/royalfantasy/lovestory%20section/dewirandi_94877491-73ef-4791-a079-c3df9522c320.webp');
        background-size: auto 100%;
        background-position: center center;
        background-repeat: no-repeat;
      "
    ></div>

    <!-- Ambient Glow -->
    <div
      class="absolute inset-0 pointer-events-none -z-10"
      style="background: radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.5) 0%, transparent 70%);"
    ></div>

    <!-- ===== ASSET BUNGA — tinggal ubah ANGKA =====
         UKURAN        : ganti width (420px) → makin besar makin lebar
         KIRI / KANAN  : ganti "50%" di left (50% = tengah pas)
         NAIK / TURUN  : ganti bottom (0px) → positif = naik, negatif = turun / tenggelam
         Z-INDEX       : 5 (di bawah card info story & doa, di bawah KACA)
    -->
    <img
      src="https://media.mengundanganda.com/royalfantasy/lovestory%20section/dewirandi_a21322ca-2a29-4a60-b174-4e40e3d70375.webp"
      alt=""
      class="flower-float"
      style="
        position: absolute;
        z-index: 5;
        pointer-events: none;
        user-select: none;
        left: 50%;
        bottom: 50px;
        transform: translateX(-50%);
        width: 150px;
        max-width: none;
        height: auto;
      "
    />
    <!-- ============================================ -->

    <!-- ===== ASSET KACA PELINDUNG — tinggal ubah ANGKA =====
         UKURAN        : ganti width (520px) → makin besar makin lebar
         KIRI / KANAN  : ganti "50%" di left (50% = tengah pas)
         NAIK / TURUN  : ganti bottom (0px) → positif = naik, negatif = turun / tenggelam
         Z-INDEX       : 6 (DI ATAS bunga, tetap DI BAWAH card info story & doa)
    -->
    <img
      src="https://media.mengundanganda.com/royalfantasy/lovestory%20section/dewirandi_66fc97bc-c597-4c78-a56e-22ee6922ff81.webp"
      alt=""
      style="
        position: absolute;
        z-index: 6;
        pointer-events: none;
        user-select: none;
        left: 50%;
        bottom: 50px;
        transform: translateX(-50%);
        width: 250px;
        max-width: none;
        height: auto;
      "
    />
    <!-- ============================================ -->

    <!-- ============ PART 1: LOVE STORY (100dvh, pinned) ============ -->
    <div
      v-if="hasStories"
      ref="storyPanel"
      class="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center px-4 md:px-8"
      :class="{ 'pointer-events-auto': true }"
    >
      <div class="w-full max-w-3xl mx-auto flex flex-col items-center">
        <!-- Section Header -->
        <div class="mb-5 md:mb-7 text-center">
          <div class="flex items-center justify-center gap-2 mb-1">
            <span class="text-[#B0808A] text-xs">✦</span>
            <span class="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B0808A] font-semibold">Kisah Cinta</span>
            <span class="text-[#B0808A] text-xs">✦</span>
          </div>
          <h2
            class="text-2xl sm:text-3xl md:text-4xl font-serif text-[#243029] font-normal"
            :style="{ fontFamily: themeConfig?.fontHeading || `'Cinzel Decorative', serif` }"
          >
            Cerita Perjalanan Kami
          </h2>
          <p class="text-[11px] md:text-xs text-[#4A5B52] mt-1 max-w-md mx-auto leading-relaxed font-medium">
            Setiap momen dan cerita indah yang mengantarkan kami menuju gerbang kebahagiaan
          </p>
          <div class="w-12 md:w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#B0808A] to-transparent mx-auto mt-2"></div>
        </div>

        <!-- Single Story Layout (jika hanya ada 1 item) -->
        <div
          v-if="stories.length === 1 && firstStory"
          class="w-full max-w-md mx-auto"
        >
          <div
            class="story-card relative p-5 sm:p-6 md:p-7 rounded-3xl border border-[#708478]/50 bg-white/70 backdrop-blur-md shadow-[0_10px_35px_rgba(36,48,41,0.25),0_0_20px_rgba(176,128,138,0.15)] text-left flex flex-col"
          >
            <span class="absolute top-3 left-4 text-[#B0808A]/60 text-xs">❖</span>
            <span class="absolute top-3 right-4 text-[#B0808A]/60 text-xs">❖</span>

            <div class="mb-2.5">
              <span class="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-[#18201B] bg-gradient-to-r from-[#D4A6AD] via-[#ECE0D3] to-[#D4A6AD] shadow-sm">
                {{ firstStory.date }}
              </span>
            </div>

            <h3
              class="text-lg sm:text-xl font-normal text-[#243029] mb-1.5"
              :style="{ fontFamily: themeConfig?.fontHeading || `'Cinzel Decorative', serif` }"
            >
              {{ firstStory.title }}
            </h3>

            <p class="text-xs sm:text-sm text-[#4A5B52] leading-relaxed whitespace-pre-line mb-3 font-light max-h-28 overflow-y-auto">
              {{ firstStory.description }}
            </p>

            <div
              v-if="firstStory.photo"
              class="w-full rounded-2xl overflow-hidden border border-[#708478]/40 aspect-[16/9] max-h-40 sm:max-h-44 shadow-md bg-black/40"
            >
              <img
                :src="resolveUrl(firstStory.photo)"
                :alt="firstStory.title"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <!-- Multiple Stories Layout (list vertikal ke bawah, scroll di dalam 100dvh) -->
        <div
          v-else
          class="w-full flex justify-center"
        >
          <div
            class="w-full max-w-xl mx-auto max-h-[58dvh] overflow-y-auto py-2 px-2 sm:px-4 no-scrollbar flex flex-col gap-4 sm:gap-5"
            style="scrollbar-width: none; -ms-overflow-style: none;"
          >
            <div
              v-for="(item, idx) in stories"
              :key="idx"
              class="story-card w-full relative p-5 sm:p-6 rounded-3xl border border-[#708478]/50 bg-white/70 backdrop-blur-md shadow-[0_10px_35px_rgba(36,48,41,0.25),0_0_20px_rgba(176,128,138,0.15)] text-left flex flex-col justify-between"
            >
              <span class="absolute top-3 left-4 text-[#B0808A]/60 text-xs">❖</span>
              <span class="absolute top-3 right-4 text-[#B0808A]/60 text-xs">❖</span>

              <div>
                <div class="mb-2">
                  <span class="inline-flex items-center px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#18201B] bg-gradient-to-r from-[#D4A6AD] via-[#ECE0D3] to-[#D4A6AD] shadow-sm">
                    {{ item.date }}
                  </span>
                </div>

                <h3
                  class="text-base sm:text-lg font-normal text-[#243029] mb-1"
                  :style="{ fontFamily: themeConfig?.fontHeading || `'Cinzel Decorative', serif` }"
                >
                  {{ item.title }}
                </h3>

                <p class="text-xs text-[#4A5B52] leading-relaxed whitespace-pre-line mb-3 font-light">
                  {{ item.description }}
                </p>
              </div>

              <div
                v-if="item.photo"
                class="w-full rounded-2xl overflow-hidden border border-[#708478]/40 aspect-[16/9] max-h-40 shadow-md bg-black/40 mt-auto"
              >
                <img
                  :src="resolveUrl(item.photo)"
                  :alt="item.title"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============ PART 2: DOA PENGANTIN (100dvh, pinned/fading in) ============ -->
    <div
      v-if="showDoa"
      ref="doaPanel"
      class="absolute inset-0 z-10 w-full h-full flex items-center justify-center px-4 md:px-8"
      :style="{ pointerEvents: hasStories ? 'none' : 'auto' }"
    >
      <div
        ref="doaCard"
        class="doa-card relative w-full max-w-xl p-6 sm:p-8 md:p-10 rounded-3xl border border-[#708478]/50 bg-white/70 backdrop-blur-md shadow-[0_10px_35px_rgba(36,48,41,0.25),0_0_20px_rgba(176,128,138,0.15)] text-center"
      >
        <!-- Corner Accents -->
        <span class="absolute top-3 left-4 text-[#B0808A]/60 text-xs">❖</span>
        <span class="absolute top-3 right-4 text-[#B0808A]/60 text-xs">❖</span>

        <!-- Label -->
        <div class="flex items-center justify-center gap-2 mb-3">
          <span class="text-[#B0808A] text-xs">✦</span>
          <span class="text-[10px] md:text-xs uppercase tracking-[0.35em] text-[#B0808A] font-semibold">Doa Pengantin</span>
          <span class="text-[#B0808A] text-xs">✦</span>
        </div>

        <!-- Title -->
        <h3
          class="text-xl sm:text-2xl md:text-3xl font-normal text-[#243029] mb-4 sm:mb-6"
          :style="{ fontFamily: themeConfig?.fontHeading || `'Cinzel Decorative', serif` }"
        >
          Bārakallāhu Laka
        </h3>

        <!-- Teks Arab -->
        <p
          class="text-[#243029] mb-4 sm:mb-6 w-full text-center"
          style="
            font-family: 'Amiri', 'Traditional Arabic', serif;
            direction: rtl;
            font-size: clamp(17px, 4.5vw, 25px);
            line-height: 2;
          "
        >
          بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </p>

        <!-- Divider -->
        <div class="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#708478] to-transparent mx-auto mb-4 sm:mb-6"></div>

        <!-- Terjemahan -->
        <p class="text-xs sm:text-sm text-[#4A5B52] leading-relaxed font-light italic max-w-md mx-auto mb-3 sm:mb-4">
          &ldquo;Semoga Allah memberkahimu dan memberkahi apa yang menjadi tanggung
          jawabmu, serta menyatukan kalian berdua dalam kebaikan.&rdquo;
        </p>

        <!-- Sumber -->
        <p class="text-[10px] md:text-xs text-[#B0808A] font-semibold tracking-wider">
          (HR. Abu Dawud no. 2130)
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { LoveStoryItem } from '@/types/invitation';
import type { ThemeConfig } from '@/types/theme';
import { resolveAssetUrl } from '@/utils/url';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  stories: LoveStoryItem[];
  themeConfig?: ThemeConfig;
  apiBase?: string;
  showDoa?: boolean;
}>();

const storySection = ref<HTMLElement | null>(null);
const storyPanel = ref<HTMLElement | null>(null);
const doaPanel = ref<HTMLElement | null>(null);
const doaCard = ref<HTMLElement | null>(null);

const hasStories = computed(() => !!(props.stories && props.stories.length > 0));
const hasBoth = computed(() => hasStories.value && !!props.showDoa);
const firstStory = computed(() => props.stories?.[0]);

let ctx: gsap.Context | null = null;

const resolveUrl = (url: string | undefined) => {
  if (!url) return '';
  return resolveAssetUrl(url, props.apiBase || '');
};

onMounted(() => {
  if (!storySection.value) return;

  ctx = gsap.context(() => {
    // KASUS 1: Keduanya ada (Love Story + Doa) -> Section di-PINNING pada 100dvh,
    // Love Story tampil dulu, lalu fade out dan digantikan oleh Doa.
    if (hasBoth.value && storyPanel.value && doaPanel.value) {
      gsap.set(storyPanel.value, { opacity: 1, scale: 1, y: 0 });
      gsap.set(doaPanel.value, { opacity: 0, scale: 0.92, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: storySection.value,
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Tahan (hold) sejenak agar user sempat melihat Love Story
      tl.to({}, { duration: 0.8 })
        // Love story fade out & bergeser ke atas
        .to(storyPanel.value, {
          opacity: 0,
          scale: 0.95,
          y: -30,
          duration: 1.2,
          ease: 'power2.inOut',
          onStart: () => {
            if (storyPanel.value) storyPanel.value.style.pointerEvents = 'none';
          },
          onReverseComplete: () => {
            if (storyPanel.value) storyPanel.value.style.pointerEvents = 'auto';
          },
        })
        // Doa fade in & masuk ke tengah layar
        .to(
          doaPanel.value,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            onStart: () => {
              if (doaPanel.value) doaPanel.value.style.pointerEvents = 'auto';
            },
            onReverseComplete: () => {
              if (doaPanel.value) doaPanel.value.style.pointerEvents = 'none';
            },
          },
          '-=0.4'
        )
        // Tahan (hold) pada Doa agar user sempat membaca sebelum section unpin
        .to({}, { duration: 1.6 });
    }
    // KASUS 2: Hanya Love Story (tanpa Doa) -> 100dvh tampil dengan entrance halus
    else if (hasStories.value && storyPanel.value) {
      gsap.from(storyPanel.value, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: storySection.value,
          start: 'top 75%',
        },
      });
    }
    // KASUS 3: Hanya Doa (tanpa Love Story) -> 100dvh tampil dengan entrance halus
    else if (props.showDoa && doaPanel.value) {
      gsap.from(doaPanel.value, {
        opacity: 0,
        scale: 0.94,
        y: 30,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: storySection.value,
          start: 'top 75%',
        },
      });
    }
  }, storySection.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
  ScrollTrigger.getAll().forEach((st) => {
    if (st.trigger === storySection.value) {
      st.kill();
    }
  });
});
</script>

<style scoped>
/* Animasi bunga melayang naik-turun (terbang perlahan) */
.flower-float {
  animation: flower-hover 4.5s ease-in-out infinite;
  will-change: transform;
}

@keyframes flower-hover {
  0%,
  100% {
    transform: translateX(-50%) translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateX(-50%) translateY(-12px) rotate(1.5deg);
  }
  50% {
    transform: translateX(-50%) translateY(-20px) rotate(0deg);
  }
  75% {
    transform: translateX(-50%) translateY(-10px) rotate(-1.5deg);
  }
}

/* Hormati preferensi reduced motion */
@media (prefers-reduced-motion: reduce) {
  .flower-float {
    animation: none;
  }
}
</style>
