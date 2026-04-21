<template>
  <div
    :class="[
      'fixed inset-0 z-50 flex flex-col overflow-hidden w-full h-[100dvh] transition-all duration-[1200ms] ease-in-out',
      isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100',
    ]"
  >
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <img
        src="https://media.mengundanganda.com/floral-blue/cover%20section/randidewi_28658e27-e94d-40ca-b897-607ef8ea0d83.webp"
        alt="Cover Background"
        class="min-w-full min-h-full w-full h-full object-cover object-center scale-110"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-[#2c5f82]/20 via-[#2c5f82]/10 to-[#2c5f82]/80"
      ></div>
    </div>

    <!-- Bunga 3 Atas — sebelah kiri -->
    <div
      ref="flowerTop3Ref"
      style="
        position: absolute;
        top: -50px;
        left: 0;
        right: 60px;
        display: flex;
        justify-content: center;
        z-index: 6;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerTop3ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_4d6cafd2-4a43-4616-a4ec-869c939b1a6d.webp"
        style="width: clamp(80px, 15vw, 500px); max-width: none"
        alt="Bunga Atas 3"
      />
    </div>

    <!-- Bunga 4 Atas — lebih kiri lagi -->
    <div
      ref="flowerTop4Ref"
      style="
        position: absolute;
        top: -75px;
        left: 0;
        right: 150px;
        display: flex;
        justify-content: center;
        z-index: 7;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerTop4ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_d08596a5-88ad-4275-bbda-0a20c4e93f57.webp"
        style="width: clamp(70px, 14vw, 450px); max-width: none"
        alt="Bunga Atas 4"
      />
    </div>

    <!-- Bunga 11 Atas — di antara 4 dan 5 -->
    <div
      ref="flowerTop11Ref"
      style="
        position: absolute;
        top: -85px;
        left: 0;
        right: 200px;
        display: flex;
        justify-content: center;
        z-index: 7.5;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerTop11ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_40d2639b-831c-4525-b8a3-e35f245b9acb.webp"
        style="width: clamp(75px, 15vw, 480px); max-width: none"
        alt="Bunga Atas 11"
      />
    </div>

    <!-- Bunga 5 Atas — paling kiri -->
    <div
      ref="flowerTop5Ref"
      style="
        position: absolute;
        top: -5px;
        left: 25px;
        z-index: 8;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerTop5ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_a6a577bf-f7cd-47c9-8d6f-ed243d09447b.webp"
        style="width: clamp(70px, 14vw, 450px); max-width: none"
        alt="Bunga Atas 5"
      />
    </div>

    <!-- Bunga 6 Atas — lebih kiri lagi -->
    <div
      ref="flowerTop6Ref"
      style="
        position: absolute;
        top: -5px;
        left: -10px;
        z-index: 9;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerTop6ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_49b0c001-18f5-4b55-9ce0-9c57b3ec8eb3.webp"
        style="width: clamp(60px, 13vw, 400px); max-width: none"
        alt="Bunga Atas 6"
      />
    </div>

    <!-- Bunga 1 Atas -->
    <div
      ref="flowerTop1Ref"
      style="
        position: absolute;
        top: -70px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        z-index: 5;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerTop1ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_d9576633-c08e-471f-99e6-bf67366a8dff.webp"
        style="width: clamp(50px, 15vw, 500px); max-width: none"
        alt="Bunga Atas 1"
      />
    </div>

    <!-- Bunga 2 Atas -->
    <div
      ref="flowerTop2Ref"
      style="
        position: absolute;
        top: -5px;
        left: 60px;
        right: 0;
        display: flex;
        justify-content: center;
        z-index: 4;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerTop2ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_8054f96f-c3c3-48e1-9282-88705e0e83ec.webp"
        style="width: clamp(50px, 15vw, 550px); max-width: none"
        alt="Bunga Atas 2"
      />
    </div>

    <!-- Bunga 7 Atas — di kanan bunga 2 -->
    <div
      ref="flowerTop7Ref"
      style="
        position: absolute;
        top: -60px;
        left: 150px;
        right: 0;
        display: flex;
        justify-content: center;
        z-index: 10;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerTop7ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_36d19996-0c8b-4e4d-98b5-d0381cdc1d49.webp"
        style="width: clamp(110px, 14vw, 450px); max-width: none"
        alt="Bunga Atas 7"
      />
    </div>

    <!-- Bunga 8 Atas — lebih kanan -->
    <div
      ref="flowerTop8Ref"
      style="
        position: absolute;
        top: 0px;
        left: 250px;
        right: 0;
        display: flex;
        justify-content: center;
        z-index: 11;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerTop8ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_a6e8b046-526f-48c7-bd09-82d9c9a3144b.webp"
        style="width: clamp(60px, 12vw, 400px); max-width: none"
        alt="Bunga Atas 8"
      />
    </div>

    <!-- Bunga 9 Atas — lebih kanan lagi -->
    <div
      ref="flowerTop9Ref"
      style="
        position: absolute;
        top: -45px;
        left: 280px;
        right: 0;
        display: flex;
        justify-content: center;
        z-index: 12;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerTop9ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_d08596a5-88ad-4275-bbda-0a20c4e93f57.webp"
        style="width: clamp(60px, 13vw, 420px); max-width: none"
        alt="Bunga Atas 9"
      />
    </div>

    <!-- Bunga 10 Atas — paling kanan -->
    <div
      ref="flowerTop10Ref"
      style="
        position: absolute;
        top: -50px;
        left: 360px;
        right: 0;
        display: flex;
        justify-content: center;
        z-index: 13;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerTop10ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_4d6cafd2-4a43-4616-a4ec-869c939b1a6d.webp"
        style="width: clamp(90px, 14vw, 450px); max-width: none"
        alt="Bunga Atas 10"
      />
    </div>

    <!-- Bunga 12 Atas — paling kanan luar -->
    <div
      ref="flowerTop12Ref"
      style="
        position: absolute;
        top: -70px;
        left: 400px;
        right: 0;
        display: flex;
        justify-content: center;
        z-index: 14;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerTop12ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_033fe3ae-ccab-4731-b76e-d3bdd790c3fa.webp"
        style="width: clamp(80px, 13vw, 400px); max-width: none"
        alt="Bunga Atas 12"
      />
    </div>

    <!-- Bunga 2 Bawah -->
    <div
      ref="flowerBottom2Ref"
      style="
        position: absolute;
        bottom: -5px;
        left: 60px;
        right: 0;
        display: flex;
        justify-content: center;
        z-index: 4;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerBottom2ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_8054f96f-c3c3-48e1-9282-88705e0e83ec.webp"
        style="
          width: clamp(50px, 15vw, 550px);
          max-width: none;
          transform-origin: center bottom;
        "
        alt="Bunga Bawah 2"
      />
    </div>

    <!-- Bunga 7 Bawah — di kanan bunga 2 -->
    <div
      ref="flowerBottom7Ref"
      style="
        position: absolute;
        bottom: -60px;
        left: 0;
        right: -150px;
        display: flex;
        justify-content: center;
        z-index: 10;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerBottom7ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_36d19996-0c8b-4e4d-98b5-d0381cdc1d49.webp"
        style="
          width: clamp(110px, 14vw, 450px);
          max-width: none;
          transform-origin: center bottom;
        "
        alt="Bunga Bawah 7"
      />
    </div>

    <!-- Bunga 8 Bawah — lebih kanan -->
    <div
      ref="flowerBottom8Ref"
      style="
        position: absolute;
        bottom: 0px;
        left: 0;
        right: -250px;
        display: flex;
        justify-content: center;
        z-index: 11;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerBottom8ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_a6e8b046-526f-48c7-bd09-82d9c9a3144b.webp"
        style="
          width: clamp(60px, 12vw, 400px);
          max-width: none;
          transform-origin: center bottom;
        "
        alt="Bunga Bawah 8"
      />
    </div>

    <!-- Bunga 9 Bawah — lebih kanan lagi -->
    <div
      ref="flowerBottom9Ref"
      style="
        position: absolute;
        bottom: -45px;
        left: 0;
        right: -280px;
        display: flex;
        justify-content: center;
        z-index: 12;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerBottom9ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_d08596a5-88ad-4275-bbda-0a20c4e93f57.webp"
        style="
          width: clamp(60px, 13vw, 420px);
          max-width: none;
          transform-origin: center bottom;
        "
        alt="Bunga Bawah 9"
      />
    </div>

    <!-- Bunga 10 Bawah — paling kanan -->
    <div
      ref="flowerBottom10Ref"
      style="
        position: absolute;
        bottom: -50px;
        left: 0;
        right: -360px;
        display: flex;
        justify-content: center;
        z-index: 13;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerBottom10ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_4d6cafd2-4a43-4616-a4ec-869c939b1a6d.webp"
        style="
          width: clamp(90px, 14vw, 450px);
          max-width: none;
          transform-origin: center bottom;
        "
        alt="Bunga Bawah 10"
      />
    </div>

    <!-- Bunga 12 Bawah — paling kanan luar -->
    <div
      ref="flowerBottom12Ref"
      style="
        position: absolute;
        bottom: -70px;
        left: 0;
        right: -400px;
        display: flex;
        justify-content: center;
        z-index: 14;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerBottom12ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_033fe3ae-ccab-4731-b76e-d3bdd790c3fa.webp"
        style="
          width: clamp(80px, 13vw, 400px);
          max-width: none;
          transform-origin: center bottom;
        "
        alt="Bunga Bawah 12"
      />
    </div>

    <!-- Bunga 1 Bawah -->
    <div
      ref="flowerBottom1Ref"
      style="
        position: absolute;
        bottom: -70px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        z-index: 5;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerBottom1ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_d9576633-c08e-471f-99e6-bf67366a8dff.webp"
        style="
          width: clamp(50px, 15vw, 500px);
          max-width: none;
          transform-origin: center bottom;
        "
        alt="Bunga Bawah 1"
      />
    </div>

    <!-- Bunga 3 Bawah — sebelah kiri -->
    <div
      ref="flowerBottom3Ref"
      style="
        position: absolute;
        bottom: -50px;
        left: 0;
        right: 60px;
        display: flex;
        justify-content: center;
        z-index: 6;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerBottom3ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_4d6cafd2-4a43-4616-a4ec-869c939b1a6d.webp"
        style="
          width: clamp(80px, 15vw, 500px);
          max-width: none;
          transform-origin: center bottom;
        "
        alt="Bunga Bawah 3"
      />
    </div>

    <!-- Bunga 4 Bawah — lebih kiri lagi -->
    <div
      ref="flowerBottom4Ref"
      style="
        position: absolute;
        bottom: -75px;
        left: 0;
        right: 150px;
        display: flex;
        justify-content: center;
        z-index: 7;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerBottom4ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_d08596a5-88ad-4275-bbda-0a20c4e93f57.webp"
        style="
          width: clamp(70px, 14vw, 450px);
          max-width: none;
          transform-origin: center bottom;
        "
        alt="Bunga Bawah 4"
      />
    </div>

    <!-- Bunga 11 Bawah — di antara 4 dan 5 -->
    <div
      ref="flowerBottom11Ref"
      style="
        position: absolute;
        bottom: -85px;
        left: 0;
        right: 200px;
        display: flex;
        justify-content: center;
        z-index: 7.5;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerBottom11ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_40d2639b-831c-4525-b8a3-e35f245b9acb.webp"
        style="
          width: clamp(75px, 15vw, 480px);
          max-width: none;
          transform-origin: center bottom;
        "
        alt="Bunga Bawah 11"
      />
    </div>

    <!-- Bunga 5 Bawah — paling kiri -->
    <div
      ref="flowerBottom5Ref"
      style="
        position: absolute;
        bottom: -5px;
        left: 25px;
        z-index: 8;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerBottom5ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_a6a577bf-f7cd-47c9-8d6f-ed243d09447b.webp"
        style="
          width: clamp(70px, 14vw, 450px);
          max-width: none;
          transform-origin: center bottom;
        "
        alt="Bunga Bawah 5"
      />
    </div>

    <!-- Bunga 6 Bawah — lebih kiri lagi -->
    <div
      ref="flowerBottom6Ref"
      style="
        position: absolute;
        bottom: -5px;
        left: -10px;
        z-index: 9;
        pointer-events: none;
        opacity: 0;
      "
    >
      <img
        ref="flowerBottom6ImgRef"
        src="https://media.mengundanganda.com/floral-blue/cover%20section/flower/randidewi_49b0c001-18f5-4b55-9ce0-9c57b3ec8eb3.webp"
        style="
          width: clamp(60px, 13vw, 400px);
          max-width: none;
          transform-origin: center bottom;
        "
        alt="Bunga Bawah 6"
      />
    </div>

    <div class="absolute z-10 inset-0 flex items-center justify-center px-6">
      <div
        class="w-full h-full bg-white/20 flex flex-col items-center justify-center text-center text-white gap-6 md:gap-8"
      >
        <h1
          class="leading-[1.1] drop-shadow-md flex flex-wrap items-center justify-center gap-x-2 gap-y-0 md:gap-x-4 w-full px-2"
          :style="{
            fontFamily: fontHeading,
            fontSize:
              groomName.length + brideName.length > 14
                ? 'clamp(28px, 8.5vw, 52px)'
                : 'clamp(42px, 12vw, 75px)',
          }"
        >
          <span>{{ groomName }}</span>
          <span
            class="text-white/70"
            :style="{
              fontSize:
                groomName.length + brideName.length > 14
                  ? 'clamp(22px, 6.5vw, 38px)'
                  : 'clamp(30px, 9vw, 55px)',
            }"
            >&amp;</span
          >
          <span>{{ brideName }}</span>
        </h1>
        <!-- Custom Frame Image with Rounded Photo -->
        <div
          v-if="coverImage && !coverImage.includes('randidewi_28658')"
          style="
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 270px;
            height: 240px;
            margin-bottom: 20px;
          "
        >
          <img
            :src="coverImage"
            style="
              position: relative;
              z-index: 10;
              width: 190px;
              height: 190px;
              border-radius: 50%;
              object-fit: cover;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            "
            alt="Cover Photo"
          />
        </div>

        <div class="w-12 md:w-16 h-px bg-white/30 my-6 md:my-10"></div>

        <div
          class="w-full max-w-[240px] md:max-w-[360px] lg:max-w-[420px] h-fit flex flex-col items-center gap-2 md:gap-4"
        >
          <div class="flex items-center justify-center gap-3 mb-3 md:mb-5">
            <div class="h-px w-8 md:w-12 bg-white/40"></div>
            <MailOpen class="w-4 md:w-5 h-4 md:h-5 text-white/70" />
            <div class="h-px w-8 md:w-12 bg-white/40"></div>
          </div>

          <p
            class="text-[15px] md:text-[18px] uppercase tracking-[0.2em] text-white/70 font-medium"
            :style="{ fontFamily: fontBody }"
          >
            Kepada Yth.
          </p>
          <h3
            class="text-base md:text-xl lg:text-2xl font-semibold tracking-wide text-white break-words mb-10 md:mb-14 mt-4 md:mt-6"
            :style="{ fontFamily: fontBody }"
          >
            {{ guestName || "Tamu Undangan" }}
          </h3>

          <button
            ref="stampRef"
            @click="bukaAmplop"
            class="w-16 md:w-20 h-16 md:h-20 rounded-full flex-shrink-0 flex flex-col items-center justify-center gap-1 bg-white/20 backdrop-blur-xl border border-white/40 text-white hover:bg-white/30 transition-colors duration-300 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
          >
            <Mail class="w-6 md:w-8 h-6 md:h-8" />
            <span
              class="text-[8px] md:text-[10px] tracking-widest uppercase font-semibold"
              >Buka</span
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import { Mail, MailOpen } from "lucide-vue-next";
import { gsap } from "gsap";

const props = defineProps<{
  groomName: string;
  brideName: string;
  guestName: string;
  isClosing: boolean;
  fontHeading?: string;
  fontBody?: string;
  coverImage: string;
  isLoaded?: boolean;
}>();

const emit = defineEmits<{
  (e: "open"): void;
}>();

const stampRef = ref(null);
const flowerTop1Ref = ref<HTMLElement | null>(null);
const flowerTop1ImgRef = ref<HTMLImageElement | null>(null);
const flowerTop2Ref = ref<HTMLElement | null>(null);
const flowerTop2ImgRef = ref<HTMLImageElement | null>(null);
const flowerBottom1Ref = ref<HTMLElement | null>(null);
const flowerBottom1ImgRef = ref<HTMLImageElement | null>(null);
const flowerBottom2Ref = ref<HTMLElement | null>(null);
const flowerBottom2ImgRef = ref<HTMLImageElement | null>(null);
const flowerTop3Ref = ref<HTMLElement | null>(null);
const flowerTop3ImgRef = ref<HTMLImageElement | null>(null);
const flowerTop4Ref = ref<HTMLElement | null>(null);
const flowerTop4ImgRef = ref<HTMLImageElement | null>(null);
const flowerBottom3Ref = ref<HTMLElement | null>(null);
const flowerBottom3ImgRef = ref<HTMLImageElement | null>(null);
const flowerBottom4Ref = ref<HTMLElement | null>(null);
const flowerBottom4ImgRef = ref<HTMLImageElement | null>(null);
const flowerTop5Ref = ref<HTMLElement | null>(null);
const flowerTop5ImgRef = ref<HTMLImageElement | null>(null);
const flowerBottom5Ref = ref<HTMLElement | null>(null);
const flowerBottom5ImgRef = ref<HTMLImageElement | null>(null);
const flowerTop6Ref = ref<HTMLElement | null>(null);
const flowerTop6ImgRef = ref<HTMLImageElement | null>(null);
const flowerBottom6Ref = ref<HTMLElement | null>(null);
const flowerBottom6ImgRef = ref<HTMLImageElement | null>(null);
const flowerTop7Ref = ref<HTMLElement | null>(null);
const flowerTop7ImgRef = ref<HTMLImageElement | null>(null);
const flowerBottom7Ref = ref<HTMLElement | null>(null);
const flowerBottom7ImgRef = ref<HTMLImageElement | null>(null);
const flowerTop8Ref = ref<HTMLElement | null>(null);
const flowerTop8ImgRef = ref<HTMLImageElement | null>(null);
const flowerBottom8Ref = ref<HTMLElement | null>(null);
const flowerBottom8ImgRef = ref<HTMLImageElement | null>(null);
const flowerTop9Ref = ref<HTMLElement | null>(null);
const flowerTop9ImgRef = ref<HTMLImageElement | null>(null);
const flowerBottom9Ref = ref<HTMLElement | null>(null);
const flowerBottom9ImgRef = ref<HTMLImageElement | null>(null);
const flowerTop10Ref = ref<HTMLElement | null>(null);
const flowerTop10ImgRef = ref<HTMLImageElement | null>(null);
const flowerBottom10Ref = ref<HTMLElement | null>(null);
const flowerBottom10ImgRef = ref<HTMLImageElement | null>(null);
const flowerTop11Ref = ref<HTMLElement | null>(null);
const flowerTop11ImgRef = ref<HTMLImageElement | null>(null);
const flowerBottom11Ref = ref<HTMLElement | null>(null);
const flowerBottom11ImgRef = ref<HTMLImageElement | null>(null);
const flowerTop12Ref = ref<HTMLElement | null>(null);
const flowerTop12ImgRef = ref<HTMLImageElement | null>(null);
const flowerBottom12Ref = ref<HTMLElement | null>(null);
const flowerBottom12ImgRef = ref<HTMLImageElement | null>(null);

let ctx: gsap.Context | null = null;
let swayTweens: gsap.core.Tween[] = [];

onMounted(() => {
  nextTick(() => {
    ctx = gsap.context(() => {
      // List asli tidak diubah sama sekali
      const flowerList = [
        { ref: flowerBottom1Ref, y: 150, scaleY: 1 },
        { ref: flowerBottom2Ref, y: 150, scaleY: 1 },
        { ref: flowerTop1Ref, y: -150, scaleY: -1 },
        { ref: flowerTop2Ref, y: -150, scaleY: -1 },
        { ref: flowerBottom3Ref, y: 150, scaleY: 1 },
        { ref: flowerTop3Ref, y: -150, scaleY: -1 },
        { ref: flowerBottom4Ref, y: 150, scaleY: 1 },
        { ref: flowerTop4Ref, y: -150, scaleY: -1 },
        { ref: flowerBottom11Ref, y: 150, scaleY: 1 },
        { ref: flowerTop11Ref, y: -150, scaleY: -1 },
        { ref: flowerBottom5Ref, y: 150, scaleY: 1 },
        { ref: flowerTop5Ref, y: -150, scaleY: -1 },
        { ref: flowerTop6Ref, y: -150, scaleY: -1 },
        { ref: flowerBottom6Ref, y: 150, scaleY: 1 },
        { ref: flowerBottom7Ref, y: 150, scaleY: 1 },
        { ref: flowerTop7Ref, y: -150, scaleY: -1 },
        { ref: flowerBottom8Ref, y: 150, scaleY: 1 },
        { ref: flowerTop8Ref, y: -150, scaleY: -1 },
        { ref: flowerBottom9Ref, y: 150, scaleY: 1 },
        { ref: flowerTop9Ref, y: -150, scaleY: -1 },
        { ref: flowerBottom10Ref, y: 150, scaleY: 1 },
        { ref: flowerTop10Ref, y: -150, scaleY: -1 },
        { ref: flowerBottom12Ref, y: 150, scaleY: 1 },
        { ref: flowerTop12Ref, y: -150, scaleY: -1 },
      ];

      // Perhatikan kata "item" di bawah ini
      flowerList.forEach((item) => {
        // Kita akses ref-nya menggunakan item.ref.value
        if (item.ref.value) {
          // Bunga dengan scaleY -1 (atas) masuk dari atas (-1000), bunga dengan scaleY 1 (bawah) masuk dari bawah (1000)
          const offscreenY = item.scaleY === -1 ? -1000 : 1000;

          // 1. Set posisi awal: jauh di bawah/atas, transparan, dan pastikan scaleY aslinya (agar bunga atas tetap terbalik)
          gsap.set(item.ref.value, {
            y: offscreenY,
            opacity: 0,
            scaleY: item.scaleY,
          });
        }
      });

      const playEntrance = () => {
        flowerList.forEach((item) => {
          if (item.ref.value) {
            gsap.to(item.ref.value, {
              y: 0,
              opacity: 1,
              duration: 2.2, // Sedikit dipercepat agar lebih natural saat fade out
              ease: "power3.out",
              delay: 0, // Tanpa delay tambahan
            });
          }
        });
      };

      // Mainkan segera jika isLoaded tidak terdefinisi (misal untuk tes),
      // tapi jika isLoaded false, kita tunda lewat watcher.
      if (props.isLoaded !== false) {
        playEntrance();
      }

      watch(
        () => props.isLoaded,
        (newVal) => {
          if (newVal) {
            playEntrance();
          }
        },
      );

      const swayConfigs = [
        { el: flowerTop1ImgRef, rot: 5, dur: 1 },
        { el: flowerTop2ImgRef, rot: -4, dur: 2 },
        { el: flowerTop3ImgRef, rot: -4, dur: 1 },
        { el: flowerTop4ImgRef, rot: 3, dur: 2 },
        { el: flowerTop11ImgRef, rot: -5, dur: 3 },
        { el: flowerTop5ImgRef, rot: -5, dur: 1 },
        { el: flowerTop6ImgRef, rot: 4, dur: 3 },
        { el: flowerTop7ImgRef, rot: -4, dur: 2 },
        { el: flowerTop8ImgRef, rot: 4, dur: 1 },
        { el: flowerTop9ImgRef, rot: -3, dur: 2 },
        { el: flowerTop10ImgRef, rot: 5, dur: 3 },
        { el: flowerBottom1ImgRef, rot: 4, dur: 2 },
        { el: flowerBottom2ImgRef, rot: -5, dur: 3 },
        { el: flowerBottom3ImgRef, rot: 5, dur: 1 },
        { el: flowerBottom4ImgRef, rot: -3, dur: 2 },
        { el: flowerBottom11ImgRef, rot: 4, dur: 1 },
        { el: flowerBottom5ImgRef, rot: 4, dur: 2 },
        { el: flowerBottom6ImgRef, rot: -4, dur: 3 },
        { el: flowerBottom7ImgRef, rot: 5, dur: 1 },
        { el: flowerBottom8ImgRef, rot: -4, dur: 2 },
        { el: flowerBottom9ImgRef, rot: 4, dur: 2 },
        { el: flowerBottom10ImgRef, rot: -4, dur: 3 },
        { el: flowerTop12ImgRef, rot: 4, dur: 1 },
        { el: flowerBottom12ImgRef, rot: -5, dur: 2 },
      ];

      swayConfigs.forEach((s) => {
        if (s.el.value) {
          const tween = gsap.to(s.el.value, {
            rotation: s.rot,
            duration: s.dur,
            ease: "sine.inOut",
            transformOrigin: "center bottom",
            yoyo: true,
            repeat: -1,
            delay: 1,
          });
          swayTweens.push(tween);
        }
      });
    });
  });
});

onUnmounted(() => {
  ctx?.revert(); // GSAP Context automatic cleanup
  swayTweens.forEach((t) => t.kill());
});

const bukaAmplop = () => {
  gsap.to(stampRef.value, {
    scale: 1.5,
    opacity: 0,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      emit("open");
    },
  });
};
</script>
