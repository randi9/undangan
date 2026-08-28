<template>
  <section
    v-if="stories && stories.length > 0"
    ref="storySection"
    style="
      position: relative;
      min-height: 100dvh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding-top: 56px;
      padding-bottom: 60px;
      padding-left: 16px;
      padding-right: 16px;
      box-sizing: border-box;
      overflow: hidden;
      background-color: #EBF2EE;
    "
  >
    <!-- Background Image Spanning Entire Section (Full Cover) -->
    <div
      ref="bgImg"
      style="
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background-size: cover;
        background-position: center top;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        will-change: transform;
      "
      :style="{
        backgroundImage: `url('${backgroundImage || 'https://media.mengundanganda.com/evergreen/lovestory%20section/dewirandi_3df150cb-e69e-4f29-899d-2ea0abe58183.webp'}')`,
      }"
    ></div>

    <!-- Asset Dekorasi Kanan Atas (Silakan atur posisi dan ukurannya di inline style di bawah ini) -->
    <img
      ref="decorRight1"
      src="https://media.mengundanganda.com/evergreen/lovestory%20section/dewirandi_68ff4aac-d08f-40ae-ae82-37fba3e68f8d.webp"
      alt="Love Story Decor Top Right"
      style="
        position: absolute;
        top: -10px;            /* <--- ATUR POSISI ATAS DI SINI (misal: 0px, 20px, atau -10px) */
        right: -30px;          /* <--- ATUR POSISI KANAN DI SINI (misal: 0px, 20px, atau -10px) */
        width: 100px;        /* <--- ATUR UKURAN LEBAR ASSET DI SINI */
        height: auto;        /* <--- TINGGI OTOMATIS MENGIKUTI LEBAR */
        z-index: 1;          /* <--- POSISI LAYER (1 di atas background, di bawah teks/card. Naikkan jika ingin di depan card) */
        pointer-events: none; /* <--- Mencegah asset menghalangi klik/touch pada tombol/card */
      "
    />

    <img
      ref="decorRight2"
      src="https://media.mengundanganda.com/evergreen/lovestory%20section/dewirandi_68ff4aac-d08f-40ae-ae82-37fba3e68f8d.webp"
      alt="Love Story Decor Top Right 2"
      style="
        position: absolute;
        top: -40px;            /* <--- ATUR POSISI ATAS DI SINI (misal: 0px, 20px, atau -10px) */
        right: 30px;          /* <--- ATUR POSISI KANAN DI SINI (misal: 0px, 20px, atau -10px) */
        width: 90px;        /* <--- ATUR UKURAN LEBAR ASSET DI SINI */
        height: auto;        /* <--- TINGGI OTOMATIS MENGIKUTI LEBAR */
        z-index: 1;          /* <--- POSISI LAYER (1 di atas background, di bawah teks/card. Naikkan jika ingin di depan card) */
        pointer-events: none; /* <--- Mencegah asset menghalangi klik/touch pada tombol/card */
      "
    />

    <!-- Asset Dekorasi Kiri Atas (Silakan atur posisi dan ukurannya di inline style di bawah ini) -->
    <img
      ref="decorLeft1"
      src="https://media.mengundanganda.com/evergreen/lovestory%20section/dewirandi_68ff4aac-d08f-40ae-ae82-37fba3e68f8d.webp"
      alt="Love Story Decor Top Left"
      style="
        position: absolute;
        top: -10px;            /* <--- ATUR POSISI ATAS DI SINI (misal: 0px, 20px, atau -10px) */
        left: -30px;          /* <--- ATUR POSISI KANAN DI SINI (misal: 0px, 20px, atau -10px) */
        width: 100px;        /* <--- ATUR UKURAN LEBAR ASSET DI SINI */
        height: auto;        /* <--- TINGGI OTOMATIS MENGIKUTI LEBAR */
        z-index: 1;          /* <--- POSISI LAYER (1 di atas background, di bawah teks/card. Naikkan jika ingin di depan card) */
        pointer-events: none; /* <--- Mencegah asset menghalangi klik/touch pada tombol/card */
      "
    />

    <img
      ref="decorLeft2"
      src="https://media.mengundanganda.com/evergreen/lovestory%20section/dewirandi_68ff4aac-d08f-40ae-ae82-37fba3e68f8d.webp"
      alt="Love Story Decor Top Left 2"
      style="
        position: absolute;
        top: -40px;            /* <--- ATUR POSISI ATAS DI SINI (misal: 0px, 20px, atau -10px) */
        left: 30px;          /* <--- ATUR POSISI KANAN DI SINI (misal: 0px, 20px, atau -10px) */
        width: 90px;        /* <--- ATUR UKURAN LEBAR ASSET DI SINI */
        height: auto;        /* <--- TINGGI OTOMATIS MENGIKUTI LEBAR */
        z-index: 1;          /* <--- POSISI LAYER (1 di atas background, di bawah teks/card. Naikkan jika ingin di depan card) */
        pointer-events: none; /* <--- Mencegah asset menghalangi klik/touch pada tombol/card */
      "
    />

    <div
      style="
        position: relative;
        z-index: 10;
        width: 100%;
        max-width: 380px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
      "
    >
      <!-- Section Header with Margin Top & Prominent White Text Shadow -->
      <div
        ref="headerRef"
        style="
          text-align: center;
          margin-top: 20px;
          margin-bottom: 22px;
          width: 100%;
          opacity: 0;
          transform: translateY(20px);
        "
      >
        <span
          style="
            display: block;
            font-size: 11.5px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.28em;
            color: #FFFFFF;
            margin-bottom: 5px;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7), 0 1px 3px rgba(0, 0, 0, 0.9);
          "
        >
          Kisah Cinta
        </span>
        <h2
          style="
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 30px;
            font-weight: 700;
            color: #FFFFFF;
            line-height: 1.2;
            margin: 0;
            text-shadow: 0 2px 12px rgba(0, 0, 0, 0.75), 0 1px 4px rgba(0, 0, 0, 0.9);
          "
        >
          Cerita Perjalanan Kami
        </h2>
        <div
          style="
            width: 40px;
            height: 2px;
            background-color: #FFFFFF;
            box-shadow: 0 1px 6px rgba(0, 0, 0, 0.6);
            margin: 9px auto 0 auto;
            border-radius: 2px;
          "
        ></div>
      </div>

      <!-- Story Items Container with clean gap -->
      <div
        style="
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 15px;
        "
      >
        <div
          v-for="(item, idx) in stories"
          :key="idx"
          ref="storyNodes"
          style="
            position: relative;
            width: 100%;
            background: rgba(255, 255, 255, 0.42);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.75);
            border-radius: 20px;
            padding: 15px 18px;
            box-shadow: 0 8px 24px rgba(20, 40, 28, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
            box-sizing: border-box;
            opacity: 0;
            will-change: transform, opacity;
          "
        >
          <!-- Date / Year Badge -->
          <div style="display: flex; align-items: center; margin-bottom: 6px;">
            <span
              style="
                display: inline-flex;
                align-items: center;
                padding: 2px 10px;
                border-radius: 9999px;
                background-color: rgba(36, 62, 48, 0.9);
                color: #FFFFFF;
                font-size: 9.5px;
                font-weight: 700;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
              "
            >
              {{ item.date }}
            </span>
          </div>

          <!-- Title -->
          <h3
            style="
              font-family: 'Cormorant Garamond', Georgia, serif;
              font-size: 17.5px;
              font-weight: 700;
              color: #12261A;
              margin: 0 0 4px 0;
              line-height: 1.25;
            "
          >
            {{ item.title }}
          </h3>

          <!-- Description -->
          <p
            style="
              font-size: 12px;
              color: #274031;
              line-height: 1.5;
              white-space: pre-line;
              margin: 0;
              font-weight: 400;
            "
          >
            {{ item.description }}
          </p>

          <!-- Optional Photo -->
          <div
            v-if="item.photo"
            style="
              margin-top: 10px;
              border-radius: 12px;
              overflow: hidden;
              width: 100%;
              aspect-ratio: 16/9;
              border: 1px solid rgba(255, 255, 255, 0.6);
            "
          >
            <img
              :src="resolveUrl(item.photo)"
              :alt="item.title"
              style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
              "
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { LoveStoryItem } from '@/types/invitation';
import type { ThemeConfig } from '@/types/theme';
import { resolveAssetUrl } from '@/utils/url';

gsap.registerPlugin(ScrollTrigger);

const props = withDefaults(
  defineProps<{
    stories: LoveStoryItem[];
    themeConfig?: ThemeConfig;
    apiBase?: string;
    backgroundImage?: string;
  }>(),
  {
    backgroundImage:
      'https://media.mengundanganda.com/evergreen/lovestory%20section/dewirandi_3df150cb-e69e-4f29-899d-2ea0abe58183.webp',
  }
);

const storySection = ref<HTMLElement | null>(null);
const bgImg = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const storyNodes = ref<HTMLElement[]>([]);

const decorRight1 = ref<HTMLElement | null>(null);
const decorRight2 = ref<HTMLElement | null>(null);
const decorLeft1 = ref<HTMLElement | null>(null);
const decorLeft2 = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;

const resolveUrl = (url: string | undefined) => {
  if (!url) return '';
  return resolveAssetUrl(url, props.apiBase || '');
};

onMounted(() => {
  if (bgImg.value) {
    gsap.to(bgImg.value, {
      scale: 1.05,
      duration: 20,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    });
  }

  // Animasi sway (ketiup angin) pelan & random untuk dekorasi kanan dan kiri
  if (decorRight1.value) {
    gsap.to(decorRight1.value, {
      rotation: 6,
      duration: 4.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      transformOrigin: 'top right',
    });
  }
  if (decorRight2.value) {
    gsap.to(decorRight2.value, {
      rotation: -5,
      duration: 5.2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      transformOrigin: 'top right',
      delay: 0.8,
    });
  }
  if (decorLeft1.value) {
    gsap.to(decorLeft1.value, {
      rotation: -7,
      duration: 4.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      transformOrigin: 'top left',
      delay: 0.4,
    });
  }
  if (decorLeft2.value) {
    gsap.to(decorLeft2.value, {
      rotation: 8,
      duration: 5.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      transformOrigin: 'top left',
      delay: 1.2,
    });
  }

  if (!storySection.value) return;

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: storySection.value,
        start: 'top 85%', // Terpicu saat bagian atas section mencapai 85% tinggi viewport
        toggleActions: 'play none none none',
      },
    });

    // 1. Judul/Header fade in & slide up dari bawah
    if (headerRef.value) {
      tl.to(headerRef.value, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power2.out',
      });
    }

    // 2. Card-card love story muncul selang-seling kiri - kanan dengan efek slide pelan
    storyNodes.value.forEach((node, idx) => {
      if (!node) return;
      // Index genap dari kiri (-100px), index ganjil dari kanan (+100px)
      const isLeft = idx % 2 === 0;
      const xOffset = isLeft ? -100 : 100;

      tl.fromTo(
        node,
        {
          opacity: 0,
          x: xOffset,
          y: 0,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.4, // Slide pelan
          ease: 'power2.out',
        },
        idx === 0 ? '-=0.6' : '-=1.1' // Efek stagger mengalir cantik
      );
    });
  }, storySection.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
});
</script>
