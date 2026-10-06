<template>
  <footer
    ref="footerSection"
    class="relative min-h-[100dvh] w-full flex flex-col items-center justify-between py-10 sm:py-16 px-4 sm:px-8 box-border overflow-hidden text-center select-none"
    :style="{
      background: `url('https://media.mengundanganda.com/haneul/footer%20section/dewirandi_1dbb74e6-1e29-43bf-a622-6b8191fe0be5.webp') center / cover no-repeat`,
      fontFamily: themeConfig?.fontBody || `'Plus Jakarta Sans', sans-serif`,
    }"
  >
    <!-- Soft vignette and ambient lighting overlays -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.12) 0%, rgba(22, 48, 32, 0.18) 70%, rgba(14, 34, 22, 0.4) 100%);"
    ></div>

    <!-- Soft top blend transition -->
    <div
      class="absolute top-0 left-0 right-0 h-24 pointer-events-none"
      style="background: linear-gradient(to bottom, rgba(244, 237, 224, 0.35) 0%, transparent 100%);"
    ></div>

    <!-- ========================================================
         ILALANG FIELD — rumpun ilalang kecil tersebar acak
         di seluruh halaman, tertiup angin ke arah kanan.
         ======================================================== -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden select-none z-[8]" aria-hidden="true">
      <div
        v-for="g in ilalangItems"
        :key="g.id"
        class="ilalang-item"
        :style="{
          top: `${g.top}%`,
          left: `${g.left}%`,
          width: `${g.w}px`,
          height: `${g.h}px`,
          opacity: g.opacity,
          '--fade': `${g.fade}%`,
          animationDuration: `${g.duration}s`,
          animationDelay: `${g.delay}s`,
        }"
      >
        <!-- TYPE 3: mahkota ilalang + malai bulu terdorong kanan (top-down) -->
        <svg v-if="g.type === 3" viewBox="0 0 40 40" class="w-full h-full block" fill="none">
          <path class="ilalang-blade blade-r1" d="M20 20 L8 6 Q14 14 20 20Z" fill="#5D8543" />
          <path class="ilalang-blade blade-r2" d="M20 20 L22 2 Q23 11 20 20Z" fill="#6A964E" />
          <path class="ilalang-blade blade-r3" d="M20 20 L34 10 Q27 16 20 20Z" fill="#7EAE5C" />
          <path class="ilalang-blade blade-r1" d="M20 20 L36 24 Q28 24 20 20Z" fill="#88B866" />
          <path class="ilalang-blade blade-r2" d="M20 20 L26 36 Q23 28 20 20Z" fill="#65904A" />
          <path class="ilalang-blade blade-r3" d="M20 20 L8 32 Q14 26 20 20Z" fill="#75A454" />
          <ellipse cx="27" cy="12" rx="3" ry="4.2" fill="#EDE4CB" opacity="0.95" />
          <ellipse cx="32" cy="20" rx="2.4" ry="3.2" fill="#F2EAD2" opacity="0.9" />
          <ellipse cx="24" cy="18" rx="1.6" ry="2.2" fill="#FFF6DE" opacity="0.9" />
          <circle cx="20" cy="20" r="1.8" fill="#4B6F35" />
        </svg>

        <!-- TYPE 4: pampas top-down — plume besar + helai jarum -->
        <svg v-else viewBox="0 0 44 44" class="w-full h-full block" fill="none">
          <g stroke-linecap="round">
            <path class="ilalang-blade blade-r1" d="M22 22 L6 8" stroke="#5D8543" stroke-width="1.6" />
            <path class="ilalang-blade blade-r2" d="M22 22 L22 3" stroke="#6A964E" stroke-width="1.6" />
            <path class="ilalang-blade blade-r3" d="M22 22 L38 8" stroke="#7EAE5C" stroke-width="1.6" />
            <path class="ilalang-blade blade-r1" d="M22 22 L41 22" stroke="#88B866" stroke-width="1.5" />
            <path class="ilalang-blade blade-r2" d="M22 22 L36 38" stroke="#65904A" stroke-width="1.6" />
            <path class="ilalang-blade blade-r3" d="M22 22 L22 41" stroke="#75A454" stroke-width="1.6" />
            <path class="ilalang-blade blade-r1" d="M22 22 L8 36" stroke="#5D8543" stroke-width="1.5" />
            <path class="ilalang-blade blade-r2" d="M22 22 L3 22" stroke="#7EAE5C" stroke-width="1.5" />
          </g>
          <ellipse cx="25" cy="19" rx="7" ry="8" fill="#EFE6CC" opacity="0.95" />
          <ellipse cx="25" cy="19" rx="4.5" ry="5.2" fill="#F7F0DA" opacity="0.95" />
          <ellipse cx="25" cy="19" rx="2" ry="2.4" fill="#FFFDF4" opacity="0.95" />
          <circle cx="22" cy="22" r="1.6" fill="#4B6F35" />
        </svg>
      </div>

      <!-- Angin Semilir / Breeze Ripple Effect Wave -->
      <div class="haneul-wind-sweep"></div>
    </div>

    <!-- Subtle floating flower petals / meadow particles drifting sideways -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-[9]" aria-hidden="true">
      <div
        v-for="n in 6"
        :key="`petal-${n}`"
        :class="`haneul-petal petal-${n}`"
      >
        <span class="petal-shape"></span>
      </div>
    </div>

    <!-- MAIN CONTENT CONTAINER -->
    <div
      class="relative z-10 w-full flex-1 flex flex-col items-center justify-center max-w-md mx-auto"
      style="margin: 0 auto; padding: 28px 16px 20px;"
    >
      <!-- TOP HEADER: Flourish & Monogram -->
      <div class="w-full flex flex-col items-center" style="margin: 0 0 18px 0; padding: 0;">
        <!-- Symmetrical flourish divider with initials -->
        <div class="flex items-center justify-center gap-3 w-full max-w-[280px] sm:max-w-[320px]" style="margin: 0 0 14px 0; padding: 0;">
          <!-- Left line flourish -->
          <div class="flex-1 flex items-center">
            <div class="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#F4EDE0]/80 to-[#F4EDE0]"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-[#F4EDE0] shadow-sm -ml-0.5 opacity-90"></div>
          </div>

          <!-- Initials & Heart -->
          <div class="flex items-center justify-center" style="margin: 0; padding: 2px 8px;">
            <span
              style="font-family: 'Great Vibes', cursive; font-size: clamp(1.5rem, 6vw, 1.875rem); color: #FFFDF8; font-weight: 400; line-height: 1; margin: 0; padding: 0; text-shadow: 0 2px 10px rgba(18, 42, 30, 0.6), 0 1px 3px rgba(0,0,0,0.3);"
            >
              {{ groomInitial }}
            </span>
            <svg
              class="w-3.5 h-3.5 mx-1.5 text-[#FDF0E2] opacity-90 haneul-heart-pulse"
              viewBox="0 0 24 24"
              fill="currentColor"
              style="filter: drop-shadow(0 1px 4px rgba(18, 42, 30, 0.5));"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span
              style="font-family: 'Great Vibes', cursive; font-size: clamp(1.5rem, 6vw, 1.875rem); color: #FFFDF8; font-weight: 400; line-height: 1; margin: 0; padding: 0; text-shadow: 0 2px 10px rgba(18, 42, 30, 0.6), 0 1px 3px rgba(0,0,0,0.3);"
            >
              {{ brideInitial }}
            </span>
          </div>

          <!-- Right line flourish -->
          <div class="flex-1 flex items-center">
            <div class="w-1.5 h-1.5 rounded-full bg-[#F4EDE0] shadow-sm -mr-0.5 opacity-90"></div>
            <div class="w-full h-[1.5px] bg-gradient-to-l from-transparent via-[#F4EDE0]/80 to-[#F4EDE0]"></div>
          </div>
        </div>

        <!-- Heading: We're Getting Married -->
        <h2
          style="font-family: 'Great Vibes', cursive; font-size: clamp(1.875rem, 8vw, 3rem); color: #FFFDF8; font-weight: 400; letter-spacing: 0.02em; line-height: 1.25; margin: 4px 0 8px 0; padding: 0; text-shadow: 0 2px 12px rgba(18, 42, 30, 0.65), 0 1px 4px rgba(0,0,0,0.4);"
        >
          We're Getting Married
        </h2>

        <!-- Names subtitle -->
        <p
          v-if="invitation?.groom_name && invitation?.bride_name"
          style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 12px; text-transform: uppercase; letter-spacing: 0.22em; color: rgba(244, 237, 224, 0.95); font-weight: 500; line-height: 1.6; margin: 0; padding: 0 12px; text-shadow: 0 1px 6px rgba(18, 42, 30, 0.6);"
        >
          {{ invitation.groom_name }} &amp; {{ invitation.bride_name }}
        </p>
      </div>

      <!-- CENTER COUPLE ILLUSTRATION -->
      <div class="relative" style="margin: 18px 0 16px 0; padding: 0;">
        <!-- Soft ethereal backlight glow -->
        <div
          class="absolute inset-2 sm:inset-4 rounded-full opacity-35 blur-xl pointer-events-none"
          style="background: radial-gradient(circle, rgba(255, 255, 255, 0.65) 0%, rgba(244, 237, 224, 0.3) 50%, transparent 75%);"
        ></div>

        <img
          src="https://media.mengundanganda.com/haneul/footer%20section/dewirandi_72a00c4d-f093-4b7a-8ce7-d7d8364ad1fe.webp"
          alt="Dewi & Randi Wedding Illustration"
          class="haneul-floating-couple block object-contain mx-auto transition-transform duration-500"
          style="
            width: min(76vw, 340px);
            max-width: 100%;
            height: auto;
            max-height: 52dvh;
            filter: drop-shadow(0 14px 26px rgba(16, 40, 26, 0.32)) drop-shadow(0 2px 6px rgba(255, 255, 255, 0.22));
          "
        />
      </div>

      <!-- WARM CLOSING MESSAGE -->
      <div class="max-w-[280px] sm:max-w-xs" style="margin: 0; padding: 0 10px;">
        <p
          style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 13px; color: #FFFDF8; line-height: 1.75; font-weight: 400; font-style: italic; margin: 0; padding: 0; text-shadow: 0 1px 6px rgba(18, 42, 30, 0.65);"
        >
          Terima kasih atas doa restu Anda yang telah menjadi bagian terindah dalam hari bahagia kami.
        </p>
      </div>
    </div>

    <!-- BRANDING FOOTER: Clean Glassmorphic Pill -->
    <div class="relative z-20" style="margin: 0; padding: 14px 0 18px 0;">
      <a
        href="https://mengundanganda.com"
        target="_blank"
        rel="noopener noreferrer"
        class="haneul-brand-pill inline-flex items-center no-underline"
        style="
          gap: 10px;
          margin: 0;
          padding: 8px 18px 8px 14px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          border-radius: 9999px;
          box-shadow: 0 4px 16px rgba(18, 42, 30, 0.14), 0 1px 3px rgba(0, 0, 0, 0.04);
        "
      >
        <img
          src="/images/logo.webp"
          alt="MengundangAnda Logo"
          class="object-contain flex-shrink-0"
          style="width: 18px; height: 18px; margin: 0; padding: 0;"
        />
        <div class="flex flex-col items-start text-left" style="line-height: 1.3; margin: 0; padding: 0;">
          <span
            style="font-size: 7.5px; text-transform: uppercase; letter-spacing: 0.2em; color: #6B7280; font-weight: 600; line-height: 1.4; margin: 0 0 1px 0; padding: 0;"
          >
            Powered by
          </span>
          <span
            style="font-size: 12px; font-weight: 700; color: #1E354D; letter-spacing: -0.01em; line-height: 1.2; margin: 0; padding: 0;"
          >
            Mengundang<span style="color: #386B99;">Anda</span>
          </span>
        </div>
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Invitation } from "@/types/invitation";
import type { ThemeConfig } from "@/types/theme";

const props = defineProps<{
  invitation: Invitation;
  themeConfig?: ThemeConfig;
  rsvpMessages?: any[];
  submitting?: boolean;
  stories?: any[];
  photos?: any[];
  galleryType?: string;
  apiBase?: string;
}>();

const footerSection = ref<HTMLElement | null>(null);

const groomInitial = computed(() => (props.invitation?.groom_name || "A").trim().charAt(0).toUpperCase());
const brideInitial = computed(() => (props.invitation?.bride_name || "B").trim().charAt(0).toUpperCase());

// Ilalang kecil acak di seluruh halaman — posisi & ukuran random,
// animasi tertiup angin ke arah kanan. Banyak (±80), kecil.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260927);

const ilalangItems = Array.from({ length: 220 }, (_, i) => {
  const type = rand() < 0.5 ? 3 : 4; // ilalang saja (mahkota + pampas)
  // Kecil-kecil saja (dibesarkan dikit): 12–42px
  const tier = rand();
  let s: number;
  if (tier < 0.5) {
    s = Math.round(12 + rand() * 10); // mungil: 12–22px
  } else if (tier < 0.85) {
    s = Math.round(22 + rand() * 10); // kecil: 22–32px
  } else {
    s = Math.round(32 + rand() * 10); // agak besar: 32–42px
  }
  // Sedikit non-kotak biar organik (0.85–1.15)
  const w = Math.round(s * (0.85 + rand() * 0.3));
  const h = Math.round(s * (0.85 + rand() * 0.3));
  return {
    id: i + 1,
    top: +(rand() * 97).toFixed(2),
    left: +(rand() * 98).toFixed(2),
    w,
    h,
    duration: +(2.4 + rand() * 2.6).toFixed(2),
    delay: +(-(rand() * 6)).toFixed(2),
    type,
    opacity: +(0.32 + rand() * 0.33).toFixed(2),
    // Titik mulai fade bawah (70–85%) — dikurangi biar rumput lebih kelihatan
    fade: Math.round(70 + rand() * 15),
  };
});
</script>

<style scoped>
/* Gentle floating breathing animation for couple illustration */
.haneul-floating-couple {
  animation: haneulFloat 4.5s ease-in-out infinite alternate;
}

@keyframes haneulFloat {
  0% {
    transform: translateY(0px) scale(1);
  }
  100% {
    transform: translateY(-6px) scale(1.012);
  }
}

/* Heart subtle pulse */
.haneul-heart-pulse {
  animation: heartPulse 2.4s ease-in-out infinite;
}

@keyframes heartPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.85;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* Brand pill hover effect */
.haneul-brand-pill {
  pointer-events: auto;
  user-select: none;
}
.haneul-brand-pill:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 6px 20px rgba(18, 42, 30, 0.2) !important;
}
.haneul-brand-pill:active {
  transform: translateY(0px) scale(0.98);
}

/* Floating delicate petals/specks drifting to the side (ke pinggir) */
.haneul-petal {
  position: absolute;
  pointer-events: none;
  opacity: 0;
  will-change: transform, opacity;
}

.petal-shape {
  display: block;
  width: 8px;
  height: 10px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 240, 245, 0.75) 100%);
  border-radius: 50% 50% 50% 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.4));
}

.petal-1 {
  top: 14%;
  left: -30px;
  animation: petalDriftSideways 11s linear infinite;
  animation-delay: 0s;
}
.petal-2 {
  top: 28%;
  left: -30px;
  animation: petalDriftSidewaysAlt 13s linear infinite;
  animation-delay: 2.5s;
}
.petal-3 {
  top: 48%;
  left: -30px;
  animation: petalDriftSideways 12s linear infinite;
  animation-delay: 5s;
}
.petal-4 {
  top: 65%;
  left: -30px;
  animation: petalDriftSidewaysAlt 14s linear infinite;
  animation-delay: 1.5s;
}
.petal-5 {
  top: 78%;
  left: -30px;
  animation: petalDriftSideways 12.5s linear infinite;
  animation-delay: 7s;
}
.petal-6 {
  top: 90%;
  left: -30px;
  animation: petalDriftSidewaysAlt 11.5s linear infinite;
  animation-delay: 4s;
}

@keyframes petalDriftSideways {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(0.8);
    opacity: 0;
  }
  10% {
    opacity: 0.75;
  }
  35% {
    transform: translate(35vw, -14px) rotate(120deg) scale(1);
  }
  65% {
    transform: translate(68vw, 15px) rotate(240deg) scale(0.95);
  }
  90% {
    opacity: 0.75;
  }
  100% {
    transform: translate(calc(100vw + 60px), -6px) rotate(360deg) scale(0.85);
    opacity: 0;
  }
}

@keyframes petalDriftSidewaysAlt {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(0.75);
    opacity: 0;
  }
  12% {
    opacity: 0.7;
  }
  40% {
    transform: translate(40vw, 16px) rotate(140deg) scale(1);
  }
  70% {
    transform: translate(72vw, -12px) rotate(280deg) scale(0.9);
  }
  90% {
    opacity: 0.7;
  }
  100% {
    transform: translate(calc(100vw + 60px), 8px) rotate(420deg) scale(0.8);
    opacity: 0;
  }
}

/* ========================================================
   ILALANG FIELD (TOP-DOWN POV — kamera tegak lurus dari atas)
   Rumpun radial, tertiup angin ke arah kanan.
   ======================================================== */
.ilalang-item {
  position: absolute;
  pointer-events: none;
  transform-origin: 50% 50%;
  filter: drop-shadow(0 2px 5px rgba(10, 30, 18, 0.4)) saturate(1.3) brightness(1.08);
  animation: ilalangWind 3.8s ease-in-out infinite alternate;
  will-change: transform;
}

/* Pangkal bawah memudar — makin ke bawah makin transparan
   biar tidak kelihatan nempel di atas background */
.ilalang-item svg {
  width: 100%;
  height: 100%;
  display: block;
  -webkit-mask-image: linear-gradient(
    to bottom,
    #000 var(--fade, 62%),
    rgba(0, 0, 0, 0.55) calc(var(--fade, 62%) + 14%),
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    #000 var(--fade, 62%),
    rgba(0, 0, 0, 0.55) calc(var(--fade, 62%) + 14%),
    transparent 100%
  );
}

@keyframes ilalangWind {
  0% {
    transform: rotate(-3deg) skewX(-2deg) translateX(0);
  }
  40% {
    transform: rotate(6deg) skewX(7deg) translateX(1.5px);
  }
  70% {
    transform: rotate(11deg) skewX(12deg) translateX(3px);
  }
  100% {
    transform: rotate(5deg) skewX(6deg) translateX(1.5px);
  }
}

/* Helai individual — lentur susulan biar hidup */
.ilalang-blade {
  transform-origin: center center;
  transform-box: fill-box;
  animation: ilalangBlade 3.2s ease-in-out infinite alternate;
}

.blade-r2 {
  animation-duration: 2.7s;
  animation-delay: -0.9s;
}

.blade-r3 {
  animation-duration: 3.6s;
  animation-delay: -1.7s;
}

@keyframes ilalangBlade {
  0% {
    transform: rotate(0deg) skewX(0deg);
  }
  50% {
    transform: rotate(7deg) skewX(8deg);
  }
  100% {
    transform: rotate(-2deg) skewX(-2deg);
  }
}

/* Subtle passing wind shimmer ripple across meadow */
.haneul-wind-sweep {
  position: absolute;
  inset: -50%;
  background: radial-gradient(
    ellipse 60% 40% at 50% 50%,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.03) 40%,
    transparent 70%
  );
  pointer-events: none;
  opacity: 0.7;
  animation: windSweepMotion 9s ease-in-out infinite;
}

@keyframes windSweepMotion {
  0% {
    transform: translate(-30%, -20%) rotate(-10deg) scale(0.9);
    opacity: 0.1;
  }
  40% {
    opacity: 0.65;
  }
  60% {
    opacity: 0.65;
  }
  100% {
    transform: translate(30%, 20%) rotate(15deg) scale(1.1);
    opacity: 0;
  }
}
</style>

