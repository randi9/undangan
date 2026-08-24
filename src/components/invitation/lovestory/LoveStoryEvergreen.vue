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
      padding-top: 36px;
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
      <!-- Section Header at Top Stone Arch Area -->
      <div
        ref="headerRef"
        style="
          text-align: center;
          margin-bottom: 20px;
          width: 100%;
          opacity: 0;
          transform: translateY(20px);
        "
      >
        <span
          style="
            display: block;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.3em;
            color: #243E30;
            margin-bottom: 4px;
            text-shadow: 0 1px 3px rgba(255, 255, 255, 0.95);
          "
        >
          Kisah Cinta
        </span>
        <h2
          style="
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 28px;
            font-weight: 600;
            color: #152B1E;
            line-height: 1.2;
            margin: 0;
            text-shadow: 0 1px 4px rgba(255, 255, 255, 0.95);
          "
        >
          Cerita Perjalanan Kami
        </h2>
        <div
          style="
            width: 40px;
            height: 1.5px;
            background-color: #385E48;
            margin: 8px auto 0 auto;
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
          gap: 14px;
        "
      >
        <div
          v-for="(item, idx) in stories"
          :key="idx"
          ref="storyNodes"
          style="
            position: relative;
            width: 100%;
            background: rgba(255, 255, 255, 0.38);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.75);
            border-radius: 20px;
            padding: 14px 18px;
            box-shadow: 0 8px 24px rgba(20, 40, 28, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
            box-sizing: border-box;
            opacity: 0;
            transform: translateY(24px);
          "
        >
          <!-- Date / Year Badge -->
          <div style="display: flex; align-items: center; margin-bottom: 6px;">
            <span
              style="
                display: inline-flex;
                align-items: center;
                padding: 2.5px 10px;
                border-radius: 9999px;
                background-color: rgba(36, 62, 48, 0.9);
                color: #FFFFFF;
                font-size: 10px;
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
              font-size: 18px;
              font-weight: 700;
              color: #12261A;
              margin: 0 0 5px 0;
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

  if (!storySection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: storySection.value,
      start: 'top 75%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(headerRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.0,
    ease: 'power3.out'
  });

  if (storyNodes.value.length > 0) {
    tl.to(storyNodes.value, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      stagger: 0.25,
      ease: 'power3.out'
    }, "-=0.6");
  }
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
