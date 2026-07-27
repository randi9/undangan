<template>
  <div ref="doaSectionRef" class="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
    <!-- ELEGANT DOUBLE LINE BORDER FRAME OVERLAY (Responsive with dvh margins) -->
    <div
      class="doa-anim-item pointer-events-none absolute z-[2]"
      style="
        top: 3.5dvh;
        bottom: 3.5dvh;
        left: 16px;
        right: 16px;
        box-sizing: border-box;
      "
    >
      <!-- Top Straight Lines -->
      <div style="position: absolute; top: 0; left: 40px; right: 40px; height: 1.2px; background: rgba(138, 78, 86, 0.75);"></div>
      <div style="position: absolute; top: 6px; left: 40px; right: 40px; height: 1.2px; background: rgba(138, 78, 86, 0.75);"></div>

      <!-- Bottom Straight Lines -->
      <div style="position: absolute; bottom: 0; left: 40px; right: 40px; height: 1.2px; background: rgba(138, 78, 86, 0.75);"></div>
      <div style="position: absolute; bottom: 6px; left: 40px; right: 40px; height: 1.2px; background: rgba(138, 78, 86, 0.75);"></div>

      <!-- Left Straight Lines -->
      <div style="position: absolute; left: 0; top: 40px; bottom: 40px; width: 1.2px; background: rgba(138, 78, 86, 0.75);"></div>
      <div style="position: absolute; left: 6px; top: 40px; bottom: 40px; width: 1.2px; background: rgba(138, 78, 86, 0.75);"></div>

      <!-- Right Straight Lines -->
      <div style="position: absolute; right: 0; top: 40px; bottom: 40px; width: 1.2px; background: rgba(138, 78, 86, 0.75);"></div>
      <div style="position: absolute; right: 6px; top: 40px; bottom: 40px; width: 1.2px; background: rgba(138, 78, 86, 0.75);"></div>

      <!-- Top-Left Corner Notch SVG -->
      <svg
        viewBox="0 0 40 40"
        style="position: absolute; top: 0; left: 0; width: 40px; height: 40px; color: rgba(138, 78, 86, 0.75);"
        fill="none"
        stroke="currentColor"
        stroke-width="1.2"
      >
        <path d="M 0 40 L 0 16 L 16 16 L 16 0 L 40 0" />
        <path d="M 6 40 L 6 22 L 22 22 L 22 6 L 40 6" />
      </svg>

      <!-- Top-Right Corner Notch SVG -->
      <svg
        viewBox="0 0 40 40"
        style="position: absolute; top: 0; right: 0; width: 40px; height: 40px; color: rgba(138, 78, 86, 0.75);"
        fill="none"
        stroke="currentColor"
        stroke-width="1.2"
      >
        <path d="M 0 0 L 24 0 L 24 16 L 40 16 L 40 40" />
        <path d="M 0 6 L 18 6 L 18 22 L 34 22 L 34 40" />
      </svg>

      <!-- Bottom-Right Corner Notch SVG -->
      <svg
        viewBox="0 0 40 40"
        style="position: absolute; bottom: 0; right: 0; width: 40px; height: 40px; color: rgba(138, 78, 86, 0.75);"
        fill="none"
        stroke="currentColor"
        stroke-width="1.2"
      >
        <path d="M 40 0 L 40 24 L 24 24 L 24 40 L 0 40" />
        <path d="M 34 0 L 34 18 L 18 18 L 18 34 L 0 34" />
      </svg>

      <!-- Bottom-Left Corner Notch SVG -->
      <svg
        viewBox="0 0 40 40"
        style="position: absolute; bottom: 0; left: 0; width: 40px; height: 40px; color: rgba(138, 78, 86, 0.75);"
        fill="none"
        stroke="currentColor"
        stroke-width="1.2"
      >
        <path d="M 40 40 L 16 40 L 16 24 L 0 24 L 0 0" />
        <path d="M 40 34 L 22 34 L 22 18 L 6 18 L 6 0" />
      </svg>
    </div>

    <!-- ========================================================================= -->
    <!-- DEKORASI BUNGA KIRI & KANAN BAWAH -->
    <!-- ========================================================================= -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden z-10">
      <div
        v-for="(item, index) in floralItems"
        :key="index"
        :style="item.style"
        class="doa-flower-anim"
      >
        <img
          :ref="(el) => { if (el) flowerRefs[index] = el as HTMLElement }"
          :src="item.src"
          :alt="item.name"
          class="w-full h-full object-contain"
        />
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- GAMBAR LUKISAN TENGAH (PAINTERLY WATERCOLOR BACKGROUND COVER) -->
    <!-- ========================================================================= -->
    <div
      class="doa-anim-item pointer-events-none absolute inset-0 z-[5] overflow-hidden"
    >
      <div
        style="
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-image: url(&quot;https://media.mengundanganda.com/fairygarden/doa%20section/dewirandi_de68c436-3af6-4abb-a57a-6fb4187d69a6.webp&quot;);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.75;
          filter: contrast(0.95) saturate(1.1);
          mask-image: radial-gradient(ellipse 90% 120% at 50% 10%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.85) 40%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0) 95%);
          -webkit-mask-image: radial-gradient(ellipse 90% 120% at 50% 10%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.85) 40%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0) 95%);
        "
      ></div>
    </div>

    <!-- Doa Content Text -->
    <div
      style="
        position: relative;
        z-index: 20;
        width: 100%;
        max-width: 640px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 24px 28px;
        box-sizing: border-box;
        margin: 0 auto;
      "
    >
      <!-- Judul -->
      <h2
        class="doa-anim-item text-4xl sm:text-5xl md:text-6xl mb-4 font-bold"
        :style="{ fontFamily: themeConfig?.fontHeading || 'serif' }"
        style="
          color: #6a4e42;
          text-shadow: 0 2px 4px rgba(255, 255, 255, 0.9);
          line-height: 1.25;
        "
      >
        Doa Pengantin
      </h2>

      <!-- Teks Arab (Selalu 1 Baris) -->
      <p
        class="doa-anim-item my-4 font-arabic"
        style="
          font-family: 'Amiri', 'Traditional Arabic', serif;
          direction: rtl;
          color: #5a1e25;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9);
          white-space: nowrap;
          font-size: clamp(18px, 4.8vw, 34px);
          line-height: 1.6;
          width: 100%;
          text-align: center;
        "
      >
        بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
      </p>

      <!-- Terjemahan -->
      <p
        class="doa-anim-item text-sm sm:text-base md:text-lg my-3 font-medium max-w-md mx-auto leading-relaxed"
        style="
          color: #5c3e35;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9);
        "
      >
        &ldquo;Semoga Allah memberkahimu dan memberkahi apa yang menjadi
        tanggung jawabmu, serta menyatukan kalian berdua dalam kebaikan.&rdquo;
      </p>

      <!-- Sumber Hadits -->
      <p
        class="doa-anim-item text-xs sm:text-sm font-bold mt-2"
        style="
          color: #ba7d85;
          letter-spacing: 0.05em;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9);
        "
      >
        (HR. Abu Dawud no. 2130)
      </p>

      <!-- Bottom Decorative Divider -->
      <div class="doa-anim-item flex items-center justify-center gap-3 mt-4 text-[#8A4E56] opacity-60">
        <svg viewBox="0 0 60 2" class="w-16 md:w-24 opacity-40">
          <rect width="60" height="1" fill="currentColor" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ThemeConfig } from "@/types/theme";

withDefaults(
  defineProps<{
    themeConfig?: ThemeConfig;
    isInline?: boolean;
  }>(),
  {
    isInline: true,
  }
);

const doaSectionRef = ref<HTMLElement | null>(null);
const flowerRefs = ref<HTMLElement[]>([]);

let ctx: gsap.Context | null = null;
let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (!doaSectionRef.value) return;

  ctx = gsap.context(() => {
    // Helper to reset flowers to initial hidden position below the screen
    const resetFlowers = () => {
      flowerRefs.value.forEach((el) => {
        if (el) {
          gsap.killTweensOf(el);
          gsap.set(el, {
            opacity: 0,
            scale: 0.85,
            y: 220,
            rotation: 0,
            transformOrigin: "bottom center",
          });
        }
      });
    };

    resetFlowers();

    let autoTl: gsap.core.Timeline | null = null;

    const playFlowersPairByPair = () => {
      resetFlowers();
      if (autoTl) {
        autoTl.kill();
      }

      autoTl = gsap.timeline();

      // 5 pairs of matching flowers:
      // Pair 0: (0 Kiri & 5 Kanan), Pair 1: (1 Kiri & 6 Kanan), Pair 2: (2 Kiri & 7 Kanan), Pair 3: (3 Kiri & 8 Kanan), Pair 4: (4 Kiri & 9 Kanan)
      const pairsCount = 5;
      for (let i = 0; i < pairsCount; i++) {
        const leftEl = flowerRefs.value[i];
        const rightEl = flowerRefs.value[i + 5];
        const pair: HTMLElement[] = [leftEl, rightEl].filter(
          (el): el is HTMLElement => Boolean(el)
        );

        if (pair.length > 0) {
          autoTl.to(
            pair,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.0,
              ease: "power3.out",
              onComplete: () => {
                pair.forEach((el, index) => {
                  if (!el) return;
                  const direction = index === 0 ? 1 : -1;
                  const angle = direction * (3.5 + Math.random() * 2);
                  const dur = 3.8 + Math.random() * 1.2;
                  gsap.to(el, {
                    rotation: `+=${angle}`,
                    duration: dur,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                  });
                });
              },
            },
            i * 0.25 // Stagger interval per pair: pair 1, then pair 2, pair 3...
          );
        }
      }
    };

    // Trigger automatic pair-by-pair animation when entering section
    let hasPlayed = false;
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            if (!hasPlayed) {
              hasPlayed = true;
              playFlowersPairByPair();
            }
          } else if (entry.intersectionRatio < 0.1) {
            if (hasPlayed) {
              hasPlayed = false;
              if (autoTl) autoTl.kill();
              resetFlowers();
            }
          }
        });
      },
      { threshold: [0.1, 0.25, 0.5] }
    );

    if (doaSectionRef.value) {
      observer.observe(doaSectionRef.value);
    }
  }, doaSectionRef.value);
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
  if (ctx) {
    ctx.revert();
  }
});

/**
 * =========================================================================
 * KONFIGURASI BUNGA BUNGA DEKORASI (KANAN BAWAH)
 * =========================================================================
 * Kamu bisa sangat mudah mengedit ukuran (width), posisi (bottom, right),
 * urutan penumpukan (zIndex), opasitas (opacity), maupun rotasi (transform)
 * untuk setiap bunga di bawah ini:
 */
const floralItems = ref([
  // --- KIRI BAWAH ---
  {
    name: "Bunga 1 (Kiri)",
    src: "https://media.mengundanganda.com/fairygarden/doa%20section/new%20flower/dewirandi_215a7743-22db-4cf2-938e-56c306d4d6ca.webp",
    style: {
      position: "absolute" as const,
      bottom: "-200px",
      left: "-30px",
      width: "220px",
      height: "auto",
      zIndex: 6,
      opacity: 0.95,
      transform: "rotate(0deg)",
      pointerEvents: "none" as const,
    },
  },
  {
    name: "Bunga 2 (Kiri)",
    src: "https://media.mengundanganda.com/fairygarden/doa%20section/new%20flower/dewirandi_32c7d5bb-52cd-4c26-a878-edf7c1adc73b.webp",
    style: {
      position: "absolute" as const,
      bottom: "-250px",
      left: "50px",
      width: "170px",
      height: "auto",
      zIndex: 5,
      opacity: 0.9,
      transform: "rotate(-10deg)",
      pointerEvents: "none" as const,
    },
  },
  {
    name: "Bunga 5 (Kiri)",
    src: "https://media.mengundanganda.com/fairygarden/doa%20section/new%20flower/dewirandi_32c7d5bb-52cd-4c26-a878-edf7c1adc73b.webp",
    style: {
      position: "absolute" as const,
      bottom: "-220px",
      left: "-30px",
      width: "170px",
      height: "auto",
      zIndex: 7,
      opacity: 0.9,
      transform: "rotate(-10deg)",
      pointerEvents: "none" as const,
    },
  },
  {
    name: "Bunga 3 (Kiri)",
    src: "https://media.mengundanganda.com/fairygarden/doa%20section/new%20flower/dewirandi_46b23a8e-4fae-4872-a70b-ce41bac90927.webp",
    style: {
      position: "absolute" as const,
      bottom: "-200px",
      left: "-10px",
      width: "160px",
      height: "auto",
      zIndex: 8,
      opacity: 0.9,
      transform: "rotate(15deg)",
      pointerEvents: "none" as const,
    },
  },
  {
    name: "Bunga 4 (Kiri)",
    src: "https://media.mengundanganda.com/fairygarden/doa%20section/new%20flower/dewirandi_f6085634-13ce-48c8-ac95-8875a214e66c.webp",
    style: {
      position: "absolute" as const,
      bottom: "-200px",
      left: "90px",
      width: "140px",
      height: "auto",
      zIndex: 9,
      opacity: 0.85,
      transform: "rotate(-5deg)",
      pointerEvents: "none" as const,
    },
  },

  // --- KANAN BAWAH (MIRRORED TERHADAP SUMBU Y) ---
  {
    name: "Bunga 1 (Kanan)",
    src: "https://media.mengundanganda.com/fairygarden/doa%20section/new%20flower/dewirandi_215a7743-22db-4cf2-938e-56c306d4d6ca.webp",
    style: {
      position: "absolute" as const,
      bottom: "-200px",
      right: "-30px",
      width: "220px",
      height: "auto",
      zIndex: 6,
      opacity: 0.95,
      transform: "scaleX(-1) rotate(0deg)",
      pointerEvents: "none" as const,
    },
  },
  {
    name: "Bunga 2 (Kanan)",
    src: "https://media.mengundanganda.com/fairygarden/doa%20section/new%20flower/dewirandi_32c7d5bb-52cd-4c26-a878-edf7c1adc73b.webp",
    style: {
      position: "absolute" as const,
      bottom: "-250px",
      right: "50px",
      width: "170px",
      height: "auto",
      zIndex: 5,
      opacity: 0.9,
      transform: "scaleX(-1) rotate(10deg)",
      pointerEvents: "none" as const,
    },
  },
  {
    name: "Bunga 5 (Kanan)",
    src: "https://media.mengundanganda.com/fairygarden/doa%20section/new%20flower/dewirandi_32c7d5bb-52cd-4c26-a878-edf7c1adc73b.webp",
    style: {
      position: "absolute" as const,
      bottom: "-220px",
      right: "-30px",
      width: "170px",
      height: "auto",
      zIndex: 7,
      opacity: 0.9,
      transform: "scaleX(-1) rotate(10deg)",
      pointerEvents: "none" as const,
    },
  },
  {
    name: "Bunga 3 (Kanan)",
    src: "https://media.mengundanganda.com/fairygarden/doa%20section/new%20flower/dewirandi_46b23a8e-4fae-4872-a70b-ce41bac90927.webp",
    style: {
      position: "absolute" as const,
      bottom: "-200px",
      right: "-10px",
      width: "160px",
      height: "auto",
      zIndex: 8,
      opacity: 0.9,
      transform: "scaleX(-1) rotate(-15deg)",
      pointerEvents: "none" as const,
    },
  },
  {
    name: "Bunga 4 (Kanan)",
    src: "https://media.mengundanganda.com/fairygarden/doa%20section/new%20flower/dewirandi_f6085634-13ce-48c8-ac95-8875a214e66c.webp",
    style: {
      position: "absolute" as const,
      bottom: "-200px",
      right: "90px",
      width: "140px",
      height: "auto",
      zIndex: 9,
      opacity: 0.85,
      transform: "scaleX(-1) rotate(5deg)",
      pointerEvents: "none" as const,
    },
  },
]);
</script>
