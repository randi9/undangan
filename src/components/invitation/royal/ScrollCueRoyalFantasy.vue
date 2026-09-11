<script setup lang="ts">
// `light` = orb kaca terang untuk section ber-background gelap.
// Default (gelap) = untuk section ber-background terang.
defineProps<{ light?: boolean }>();
</script>

<template>
  <!-- Penunjuk scroll-down Royal Fantasy: orb kaca + diamond + chevron ganda.
       Pakai: <ScrollCueRoyalFantasy /> tepat sebelum </section>.
       Posisi: absolute bawah-tengah, tidak mengganggu klik (pointer-events none). -->
  <div class="rf-scroll-cue" :class="{ 'is-light': light }" aria-hidden="true">
    <div class="cue-pill">
      <svg viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- diamond mungil khas royal -->
        <rect x="10.1" y="2.2" width="3.8" height="3.8" transform="rotate(45 12 4.1)" class="cue-diamond" />
        <!-- chevron atas -->
        <path d="M6 14.5 L12 20.5 L18 14.5" class="cue-chevron cue-chevron-1" />
        <!-- chevron bawah -->
        <path d="M6 22.5 L12 28.5 L18 22.5" class="cue-chevron cue-chevron-2" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.rf-scroll-cue {
  position: absolute;
  left: 50%;
  bottom: max(16px, env(safe-area-inset-bottom, 16px));
  transform: translateX(-50%);
  z-index: 30;
  pointer-events: none;
  animation: rf-cue-breathe 3.8s ease-in-out infinite;
}

/* Pil ramping kaca putih — netral, menyatu dengan tema royal */
.cue-pill {
  position: relative;
  width: 34px;
  height: 58px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(176, 128, 138, 0.55);
  box-shadow:
    0 4px 18px rgba(36, 48, 41, 0.18),
    inset 0 0 12px rgba(255, 255, 255, 0.6);
}

.cue-pill svg {
  display: block;
  width: 20px;
  height: 36px;
  overflow: visible;
}

.cue-diamond {
  fill: #b0808a;
}

.cue-chevron {
  stroke: #243029;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

.cue-chevron-1 {
  animation: rf-cue-fade 2.6s ease-in-out infinite;
}

.cue-chevron-2 {
  animation: rf-cue-fade 2.6s ease-in-out 0.4s infinite;
}

/* Varian terang — pil sedikit lebih solid untuk section background gelap,
   panah tetap warna tema yang sama */
.is-light .cue-pill {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(176, 128, 138, 0.65);
  box-shadow:
    0 4px 18px rgba(0, 0, 0, 0.35),
    inset 0 0 12px rgba(255, 255, 255, 0.7);
}

/* Nafas redup + bounce lembut: muncul — memantul dikit — hilang */
@keyframes rf-cue-breathe {
  0%,
  100% {
    opacity: 0.25;
    transform: translateX(-50%) translateY(0);
  }
  25% {
    opacity: 0.85;
    transform: translateX(-50%) translateY(5px);
  }
  45% {
    opacity: 1;
    transform: translateX(-50%) translateY(1px);
  }
  60% {
    opacity: 1;
    transform: translateX(-50%) translateY(4px);
  }
  80% {
    opacity: 0.6;
    transform: translateX(-50%) translateY(1px);
  }
}

@keyframes rf-cue-fade {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .rf-scroll-cue,
  .cue-chevron-1,
  .cue-chevron-2 {
    animation: none;
  }
}
</style>
