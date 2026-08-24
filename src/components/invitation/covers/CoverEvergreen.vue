<template>
  <div
    ref="coverRoot"
    style="position: fixed; inset: 0; z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100dvh; overflow: hidden; user-select: none; box-sizing: border-box; padding: 20px 16px; background-color: transparent;"
    :class="isOpening ? 'pointer-events-none' : 'pointer-events-auto'"
    :style="{
      fontFamily: fontBody || `'Plus Jakarta Sans', sans-serif`,
    }"
  >
    <!-- Background Image Spanning Entire Screen -->
    <div
      ref="bgImg"
      style="position: absolute; inset: 0; z-index: 0; pointer-events: none; width: 100%; height: 100%; transform: translateZ(0);"
      :style="{
        backgroundImage: `url('${coverImage || 'https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_003c89a6-d363-423d-83c4-2f34746fb0fb.webp'}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }"
    ></div>

    <!-- ======================================================== -->
    <!-- 3 ASSET DEKORASI DAHAN (DI BAWAH LAYER GELAP) -->
    <!-- ======================================================== -->
    <div
      ref="branchesContainer"
      style="position: absolute; inset: 0; pointer-events: none; user-select: none; overflow: hidden; z-index: 1;"
    >
      <!-- Asset 1: Dahan Utama Kanan Atas -->
      <div
        style="
          position: absolute;
          top: -50px;
          right: -160px;
          width: calc(100% + 80px);
          display: flex;
          justify-content: flex-end;
          z-index: 1;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_714d21a6-f5bc-414f-88b1-b44248b731c5.webp"
          alt="Dekorasi Dahan Kanan Atas"
          class="evergreen-branch-sway-1"
          style="
            display: block;
            width: calc(100% + 80px);
            max-width: none;
            height: auto;
          "
        />
      </div>

      <!-- Asset 2: Dahan Tengah -->
      <div
        style="
          position: absolute;
          top: 60px;
          right: -50px;
          width: calc(70% + 30px);
          display: flex;
          justify-content: flex-end;
          z-index: 2;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_fc91163f-8a66-4463-b5e7-674cfabf2339.webp"
          alt="Dekorasi Dahan Layer 2"
          class="evergreen-branch-sway-2"
          style="
            display: block;
            width: 100%;
            height: auto;
          "
        />
      </div>

      <!-- Asset 3: Dahan Depan -->
      <div
        style="
          position: absolute;
          top: 140px;
          right: -70px;
          width: calc(65% + 30px);
          display: flex;
          justify-content: flex-end;
          z-index: 3;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_fc91163f-8a66-4463-b5e7-674cfabf2339.webp"
          alt="Dekorasi Dahan Layer 3"
          class="evergreen-branch-sway-3"
          style="
            display: block;
            width: 100%;
            height: auto;
          "
        />
      </div>
    </div>

    <!-- Soft Ambient Overlays (Layer Gelap Di Atas Dahan) -->
    <div
      ref="darkOverlay1"
      style="position: absolute; inset: 0; z-index: 2; pointer-events: none; background-color: rgba(21, 35, 28, 0.35);"
    ></div>
    <div
      ref="darkOverlay2"
      style="position: absolute; inset: 0; z-index: 3; pointer-events: none; background: radial-gradient(circle at 50% 50%, rgba(20, 32, 26, 0.2) 0%, rgba(10, 18, 14, 0.65) 100%);"
    ></div>

    <!-- CENTERED WEDDING CARD (~2/3 SCREEN HEIGHT) -->
    <div
      ref="cardContainer"
      style="
        position: relative;
        z-index: 10;
        width: 100%;
        max-width: 350px;
        height: 64vh;
        max-height: 520px;
        min-height: 440px;
        box-sizing: border-box;
        border-radius: 28px;
        background: rgba(18, 33, 25, 0.82);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border: 1px solid rgba(255, 255, 255, 0.18);
        box-shadow: 0 20px 45px rgba(0, 0, 0, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.15);
        padding: 8px;
        display: flex;
        flex-direction: column;
      "
    >
      <!-- Inner Stationery Border Frame -->
      <div
        style="
          width: 100%;
          height: 100%;
          border-radius: 22px;
          border: 1px solid rgba(162, 184, 166, 0.22);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(0, 0, 0, 0.08) 100%);
          box-sizing: border-box;
          padding: 20px 16px 18px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          text-align: center;
        "
      >
        <!-- 1. TOP SECTION (FLEX: 1 TO VERTICALLY CENTER IN REMAINING SPACE) -->
        <div
          style="
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 8px 0;
          "
        >
          <!-- Botanical Crest Emblem -->
          <div style="color: #A2B8A6; opacity: 0.9; margin-bottom: 8px;">
            <svg style="width: 28px; height: 28px; display: block;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="M12 21c4.97 0 9-4.03 9-9 0-4.97-4.03-9-9-9-4.97 0-9 4.03-9 9 0 4.97 4.03 9 9 9z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="M12 3v18"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="M8 8c1.5 1.5 3 2 4 2s2.5-.5 4-2"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="M8 16c1.5-1.5 3-2 4-2s2.5.5 4 2"/>
            </svg>
          </div>

          <!-- "THE WEDDING OF" Header with subtle divider lines -->
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; margin-bottom: 10px;">
            <span style="width: 26px; height: 1px; background: linear-gradient(to right, transparent, rgba(142, 169, 150, 0.6));"></span>
            <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.3em; color: #D0DFD5; font-weight: 500; white-space: nowrap;">
              The Wedding Of
            </span>
            <span style="width: 26px; height: 1px; background: linear-gradient(to left, transparent, rgba(142, 169, 150, 0.6));"></span>
          </div>

          <!-- COUPLE NAMES (LARGER TYPOGRAPHY) -->
          <h1
            style="
              color: #ffffff;
              font-weight: 400;
              line-height: 1.1;
              margin: 4px 0 0 0;
              text-shadow: 0 2px 10px rgba(0,0,0,0.45);
              letter-spacing: 0.02em;
            "
            :style="{ fontFamily: fontHeading || `'Cormorant Garamond', Georgia, serif` }"
          >
            <span style="display: block; font-size: 38px; font-weight: 500;">{{ groomName }}</span>
            <span style="display: block; font-size: 26px; color: #C8D8CC; font-style: italic; font-weight: 300; margin: 2px 0; opacity: 0.9;">
              &amp;
            </span>
            <span style="display: block; font-size: 38px; font-weight: 500;">{{ brideName }}</span>
          </h1>

          <!-- Delicate Botanical Flourish Divider -->
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 12px; opacity: 0.75;">
            <span style="width: 32px; height: 1px; background: linear-gradient(to right, transparent, #7A9A8B);"></span>
            <svg style="width: 11px; height: 11px; color: #A2B8A6;" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"/>
            </svg>
            <span style="width: 32px; height: 1px; background: linear-gradient(to left, transparent, #7A9A8B);"></span>
          </div>
        </div>

        <!-- 2. BOTTOM GROUP (GUEST RECIPIENT BADGE + BUKA UNDANGAN BUTTON) -->
        <div style="width: 100%; display: flex; flex-direction: column; align-items: center; gap: 10px; margin-top: 8px;">
          <!-- Guest Recipient Badge -->
          <div
            style="
              width: 100%;
              max-width: 250px;
              padding: 8px 14px;
              border-radius: 14px;
              background: rgba(0, 0, 0, 0.28);
              border: 1px solid rgba(255, 255, 255, 0.12);
              backdrop-filter: blur(6px);
              -webkit-backdrop-filter: blur(6px);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              box-sizing: border-box;
            "
          >
            <p style="font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; color: #A2B8A6; font-weight: 600; margin: 0 0 2px 0;">
              Kepada Yth.
            </p>
            <p style="font-size: 9.5px; color: rgba(216, 229, 220, 0.75); letter-spacing: 0.05em; font-weight: 300; margin: 0 0 3px 0;">
              Bapak/Ibu/Saudara/i:
            </p>
            <h3
              style="
                font-size: 15px;
                font-weight: 600;
                color: #ffffff;
                letter-spacing: 0.03em;
                line-height: 1.25;
                margin: 0;
                word-break: break-word;
                max-width: 220px;
                text-shadow: 0 1px 4px rgba(0,0,0,0.5);
              "
              :style="{ fontFamily: fontHeading || `'Cormorant Garamond', Georgia, serif` }"
            >
              {{ guestName || 'Tamu Undangan' }}
            </h3>
          </div>

          <!-- Buka Undangan Button -->
          <button
            ref="bukaBtn"
            @click="bukaAmplop"
            type="button"
            style="
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              padding: 10px 26px;
              border-radius: 9999px;
              background: linear-gradient(135deg, #3D5E4D 0%, #263D31 100%);
              color: #ffffff;
              font-size: 11px;
              font-weight: 600;
              letter-spacing: 0.2em;
              text-transform: uppercase;
              border: 1px solid rgba(162, 184, 166, 0.45);
              box-shadow: 0 6px 18px rgba(10, 22, 16, 0.5), 0 0 10px rgba(162, 184, 166, 0.12);
              cursor: pointer;
              transition: all 0.3s ease;
              outline: none;
            "
            onmouseenter="this.style.transform='scale(1.03)'; this.style.boxShadow='0 8px 24px rgba(61,94,77,0.6)';"
            onmouseleave="this.style.transform='scale(1)'; this.style.boxShadow='0 6px 18px rgba(10,22,16,0.5), 0 0 10px rgba(162,184,166,0.12)';"
            onmousedown="this.style.transform='scale(0.96)';"
            onmouseup="this.style.transform='scale(1.03)';"
          >
            <svg
              style="width: 14px; height: 14px; color: #D8E5DC;"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span style="text-shadow: 0 1px 2px rgba(0,0,0,0.3);">Buka Undangan</span>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { gsap } from 'gsap';

withDefaults(
  defineProps<{
    groomName: string;
    brideName: string;
    guestName: string;
    fontHeading?: string;
    fontBody?: string;
    coverImage?: string;
    isClosing?: boolean;
    isLoaded?: boolean;
  }>(),
  {
    coverImage:
      'https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_003c89a6-d363-423d-83c4-2f34746fb0fb.webp',
  }
);

const emit = defineEmits<{
  (e: 'open'): void;
}>();

const coverRoot = ref<HTMLElement | null>(null);
const bgImg = ref<HTMLElement | null>(null);
const cardContainer = ref<HTMLElement | null>(null);
const branchesContainer = ref<HTMLElement | null>(null);
const bukaBtn = ref<HTMLElement | null>(null);

// Overlays
const darkOverlay1 = ref<HTMLElement | null>(null);
const darkOverlay2 = ref<HTMLElement | null>(null);

const isOpening = ref(false);

const bukaAmplop = () => {
  if (isOpening.value) return;
  isOpening.value = true;

  // Emit 'open' immediately so Hero mounts directly underneath with full opacity
  emit('open');

  const tl = gsap.timeline();

  // Step 0: Subtle button press feedback
  tl.to(bukaBtn.value, {
    scale: 0.94,
    opacity: 0.6,
    duration: 0.16,
    ease: 'power2.out',
  });

  // Step 1: Circular dissolve of card
  const maskState = { progress: 0 };
  
  tl.to(maskState, {
    progress: 1,
    duration: 0.7,
    ease: 'power2.inOut',
    onUpdate: () => {
      const p = maskState.progress;
      const W = 75;
      const R = (1 - p) * 115 - p * W;
      
      const s0 = Math.max(0, R);
      const s1 = Math.max(0, R + W * 0.1);
      const s2 = Math.max(0, R + W * 0.2);
      const s3 = Math.max(0, R + W * 0.3);
      const s4 = Math.max(0, R + W * 0.4);
      const s5 = Math.max(0, R + W * 0.5);
      const s6 = Math.max(0, R + W * 0.6);
      const s7 = Math.max(0, R + W * 0.7);
      const s8 = Math.max(0, R + W * 0.8);
      const s9 = Math.max(0, R + W * 0.9);
      const s10 = Math.max(0, R + W);

      const maskValue = `radial-gradient(circle at 50% 50%, ` +
        `rgba(0,0,0,1) 0%, ` +
        `rgba(0,0,0,1) ${s0.toFixed(1)}%, ` +
        `rgba(0,0,0,0.9) ${s1.toFixed(1)}%, ` +
        `rgba(0,0,0,0.8) ${s2.toFixed(1)}%, ` +
        `rgba(0,0,0,0.7) ${s3.toFixed(1)}%, ` +
        `rgba(0,0,0,0.6) ${s4.toFixed(1)}%, ` +
        `rgba(0,0,0,0.5) ${s5.toFixed(1)}%, ` +
        `rgba(0,0,0,0.4) ${s6.toFixed(1)}%, ` +
        `rgba(0,0,0,0.3) ${s7.toFixed(1)}%, ` +
        `rgba(0,0,0,0.2) ${s8.toFixed(1)}%, ` +
        `rgba(0,0,0,0.1) ${s9.toFixed(1)}%, ` +
        `rgba(0,0,0,0) ${s10.toFixed(1)}%)`;

      if (cardContainer.value) {
        cardContainer.value.style.webkitMaskImage = maskValue;
        cardContainer.value.style.maskImage = maskValue;
      }
    }
  }, "+=0.01");

  tl.to(cardContainer.value, {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  }, "<+=0.06");

  // Hilangkan layer gelap ambient secara halus (membuka tabir ke tampilan terang seperti di Hero)
  tl.to([darkOverlay1.value, darkOverlay2.value].filter(Boolean), {
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
  }, "<");

  // Transisi halus fade out elemen cover (bg & branches) ke hero underneath
  tl.to([bgImg.value, branchesContainer.value].filter(Boolean), {
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
  }, "<");
};
</script>

<style>
/* Wind Sway Animation for Hanging Branches (Swaying right from the start) */
.evergreen-branch-sway-1 {
  transform-origin: 100% 50%;
  animation: evergreenBranchSway1 4.5s ease-in-out infinite;
}

.evergreen-branch-sway-2 {
  transform-origin: 100% 50%;
  animation: evergreenBranchSway2 5.2s ease-in-out infinite;
}

.evergreen-branch-sway-3 {
  transform-origin: 100% 50%;
  animation: evergreenBranchSway3 4.8s ease-in-out infinite;
}

@keyframes evergreenBranchSway1 {
  0% {
    transform: rotate(0deg);
  }
  28% {
    transform: rotate(2.0deg);
  }
  68% {
    transform: rotate(-1.5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes evergreenBranchSway2 {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(2.8deg);
  }
  70% {
    transform: rotate(-2.0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes evergreenBranchSway3 {
  0% {
    transform: rotate(0deg);
  }
  27% {
    transform: rotate(3.4deg);
  }
  67% {
    transform: rotate(-2.5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
