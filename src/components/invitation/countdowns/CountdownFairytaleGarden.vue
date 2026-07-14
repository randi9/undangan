<template>
  <section
    v-if="hasDate"
    ref="countdownSection"
    class="px-6 text-center relative overflow-hidden bg-[#FAF0F2]"
    style="
      height: 100vh;
      height: 100dvh;
      max-height: 100vh;
      max-height: 100dvh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    "
  >
    <!-- Warm subtle fairytale gradient -->
    <div
      class="absolute inset-0 w-full h-full bg-gradient-to-b from-[#FAF0F2] via-[#EBCFD1]/35 to-[#FAF0F2] -z-10"
    ></div>

    <!-- Large overlapping image container -->
    <div
      ref="bigOvalRef"
      class="absolute top-0 left-0 z-[1] shadow-[8px_8px_40px_rgba(106,78,66,0.06)]"
      style="
        width: 90vw;
        height: 86dvh;
        background-image: url(&quot;https://media.mengundanganda.com/fairygarden/event%20section/dewirandi_00144412-c4d7-4fe2-b445-9f6051ec6c59.webp&quot;);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border-bottom-right-radius: clamp(150px, 25vw, 360px);
        box-sizing: border-box;
        overflow: hidden;
      "
    >

      <!-- Floating flowers on the river -->
      <img
        v-for="flower in floatingFlowers"
        :key="flower.id"
        :src="flower.src"
        class="floating-flower absolute pointer-events-none select-none z-[2]"
        :style="{
          ...flower.style,
          '--float-x': flower.floatX,
          '--float-y': flower.floatY,
          '--float-rot': flower.floatRot,
          '--float-dur': flower.floatDur,
          '--float-delay': flower.floatDelay,
          '--float-base-rot': flower.baseRot
        }"
        alt="Floating Flower"
      />
    </div>

    <!-- Small white/ivory container with text -->
    <div
      ref="headerRef"
      class="absolute top-0 left-0 z-20 text-left shadow-[6px_6px_30px_rgba(106,78,66,0.05)]"
      style="
        width: 55vw;
        height: 35dvh;
        background-color: #f8f3ee;
        border-bottom-right-radius: clamp(60px, 12vw, 160px);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding-top: clamp(28px, 6dvh, 56px);
        padding-left: calc(clamp(24px, 5vw, 48px) + 10px);
        box-sizing: border-box;
      "
    >
      <h2
        class="font-light tracking-[0.2em] text-[#6A4E42] leading-[1.2]"
        :style="{ fontFamily: themeConfig.fontHeading }"
        style="font-size: clamp(2.3rem, 5vw, 4.2rem)"
      >
        Save<br />The<br />Date
      </h2>
      <p
        v-if="formattedDate"
        class="font-medium text-[#6A4E42]/80 mt-3 md:mt-4 tracking-wide"
        style="font-size: clamp(0.75rem, 1.4vw, 0.95rem)"
      >
        {{ formattedDate }}
      </p>
    </div>

    <div
      class="flex justify-center gap-3 md:gap-6 max-w-lg mx-auto relative z-10"
    >
      <div
        v-for="(unit, idx) in units"
        :key="unit.label"
        :ref="
          (el) => {
            if (el) digitRefs[idx] = el as HTMLElement;
          }
        "
        class="flex flex-col items-center opacity-0"
      >
        <!-- Card with white background -->
        <div
          class="relative w-[64px] sm:w-[70px] md:w-[85px] aspect-square rounded-2xl bg-white border border-[#EBCFD1] shadow-[0_8px_30px_rgba(106,78,66,0.06)] flex flex-col items-center justify-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(106,78,66,0.12)]"
        >
          <span
            class="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#6A4E42] tabular-nums leading-none mb-1 md:mb-1.5"
            :style="{ fontFamily: themeConfig.fontHeading }"
            >{{ unit.value }}</span
          >
          <span
            class="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-[#9A7B6B] font-medium leading-none"
            >{{ unit.label }}</span
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ThemeConfig } from "@/types/theme";
import type { Invitation } from "@/types/invitation";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  themeConfig: ThemeConfig;
  hasDate: boolean;
  invitation?: Invitation;
}>();

const countdownSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const bigOvalRef = ref<HTMLElement | null>(null);
const digitRefs = ref<HTMLElement[]>([]);

const floatingFlowers = [
  // Bottom layer (y: 5% - 25%)
  {
    id: 1,
    src: "https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp",
    style: { bottom: "5%", left: "12%", width: "clamp(45px, 8vw, 85px)", opacity: "0.9" },
    floatX: "30px", floatY: "-15px", floatRot: "25deg", floatDur: "7.2s", floatDelay: "-1.5s", baseRot: "15deg"
  },
  {
    id: 2,
    src: "https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp",
    style: { bottom: "10%", left: "35%", width: "clamp(35px, 6vw, 70px)", opacity: "0.85" },
    floatX: "-25px", floatY: "20px", floatRot: "-35deg", floatDur: "6.5s", floatDelay: "-3.2s", baseRot: "-25deg"
  },
  {
    id: 3,
    src: "https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp",
    style: { bottom: "14%", left: "58%", width: "clamp(50px, 8vw, 90px)", opacity: "0.9" },
    floatX: "28px", floatY: "-18px", floatRot: "30deg", floatDur: "8.1s", floatDelay: "-0.8s", baseRot: "-15deg"
  },
  {
    id: 4,
    src: "https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp",
    style: { bottom: "8%", left: "82%", width: "clamp(35px, 6vw, 70px)", opacity: "0.95" },
    floatX: "-35px", floatY: "15px", floatRot: "-20deg", floatDur: "5.8s", floatDelay: "-4.5s", baseRot: "60deg"
  },

  // Lower-middle layer (y: 25% - 45%)
  {
    id: 5,
    src: "https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp",
    style: { bottom: "27%", left: "15%", width: "clamp(30px, 5vw, 65px)", opacity: "0.8" },
    floatX: "20px", floatY: "-20px", floatRot: "20deg", floatDur: "6.9s", floatDelay: "-2.1s", baseRot: "-10deg"
  },
  {
    id: 6,
    src: "https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp",
    style: { bottom: "32%", left: "40%", width: "clamp(40px, 7vw, 80px)", opacity: "0.9" },
    floatX: "-22px", floatY: "25px", floatRot: "-25deg", floatDur: "7.7s", floatDelay: "-5.0s", baseRot: "30deg"
  },
  {
    id: 7,
    src: "https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp",
    style: { bottom: "38%", left: "65%", width: "clamp(45px, 8vw, 85px)", opacity: "0.85" },
    floatX: "25px", floatY: "-15px", floatRot: "35deg", floatDur: "8.5s", floatDelay: "-1.2s", baseRot: "-20deg"
  },
  {
    id: 8,
    src: "https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp",
    style: { bottom: "29%", left: "90%", width: "clamp(35px, 6vw, 75px)", opacity: "0.85" },
    floatX: "-30px", floatY: "18px", floatRot: "-30deg", floatDur: "6.2s", floatDelay: "-3.8s", baseRot: "20deg"
  },

  // Upper-middle layer (y: 45% - 65%)
  {
    id: 9,
    src: "https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp",
    style: { bottom: "48%", left: "8%", width: "clamp(55px, 9vw, 95px)", opacity: "0.95" },
    floatX: "35px", floatY: "-25px", floatRot: "40deg", floatDur: "8.9s", floatDelay: "-0.5s", baseRot: "25deg"
  },
  {
    id: 10,
    src: "https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp",
    style: { bottom: "52%", left: "32%", width: "clamp(40px, 7vw, 80px)", opacity: "0.9" },
    floatX: "-18px", floatY: "22px", floatRot: "-20deg", floatDur: "7.0s", floatDelay: "-4.2s", baseRot: "-15deg"
  },
  {
    id: 11,
    src: "https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp",
    style: { bottom: "58%", left: "55%", width: "clamp(50px, 8vw, 90px)", opacity: "0.9" },
    floatX: "22px", floatY: "-20px", floatRot: "30deg", floatDur: "8.3s", floatDelay: "-2.7s", baseRot: "35deg"
  },
  {
    id: 12,
    src: "https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp",
    style: { bottom: "46%", left: "78%", width: "clamp(35px, 6vw, 75px)", opacity: "0.85" },
    floatX: "-28px", floatY: "15px", floatRot: "-35deg", floatDur: "6.4s", floatDelay: "-5.8s", baseRot: "-10deg"
  },

  // Top layer (y: 65% - 90%)
  {
    id: 13,
    src: "https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp",
    style: { bottom: "72%", left: "22%", width: "clamp(30px, 5vw, 65px)", opacity: "0.8" },
    floatX: "25px", floatY: "-15px", floatRot: "25deg", floatDur: "7.5s", floatDelay: "-1.9s", baseRot: "-30deg"
  },
  {
    id: 14,
    src: "https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp",
    style: { bottom: "82%", left: "48%", width: "clamp(35px, 6vw, 70px)", opacity: "0.9" },
    floatX: "-32px", floatY: "25px", floatRot: "-40deg", floatDur: "6.8s", floatDelay: "-3.5s", baseRot: "-25deg"
  },
  {
    id: 15,
    src: "https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp",
    style: { bottom: "75%", left: "74%", width: "clamp(45px, 8vw, 85px)", opacity: "0.85" },
    floatX: "30px", floatY: "-18px", floatRot: "35deg", floatDur: "8.0s", floatDelay: "-0.2s", baseRot: "-15deg"
  },
  {
    id: 16,
    src: "https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp",
    style: { bottom: "85%", left: "92%", width: "clamp(35px, 6vw, 75px)", opacity: "0.9" },
    floatX: "-25px", floatY: "20px", floatRot: "-30deg", floatDur: "6.1s", floatDelay: "-4.9s", baseRot: "50deg"
  }
];

const formattedDate = computed(() => {
  const dateStr = props.invitation?.akad_date || props.invitation?.resepsi_date;
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});

const units = computed(() => [
  { value: props.countdown.days, label: "Hari" },
  { value: props.countdown.hours, label: "Jam" },
  { value: props.countdown.minutes, label: "Menit" },
  { value: props.countdown.seconds, label: "Detik" },
]);

let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    if (!countdownSection.value) return;

    // Set initial states for digit cards alternating top/bottom
    digitRefs.value.forEach((el, idx) => {
      const startY = idx % 2 === 0 ? -32 : 32;
      gsap.set(el, { opacity: 0, y: startY });
    });

    // Digit cards stagger entrance
    gsap.to(digitRefs.value, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: countdownSection.value,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });


  });

  // Force ScrollTrigger refresh on mount to recalculate positions correctly
  // after this async component is loaded and added to the DOM.
  nextTick(() => {
    ScrollTrigger.refresh();
  });
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 150);
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
});
</script>

<style scoped>
.floating-flower {
  filter: drop-shadow(0 2px 4px rgba(106, 78, 66, 0.1));
  transition: filter 0.3s ease;
  will-change: transform;
  animation: flower-float var(--float-dur) ease-in-out var(--float-delay) infinite alternate;
}
.floating-flower:hover {
  filter: drop-shadow(0 6px 12px rgba(106, 78, 66, 0.2)) brightness(1.1);
}

@keyframes flower-float {
  0% {
    transform: translate(0, 0) rotate(var(--float-base-rot, 0deg));
  }
  100% {
    transform: translate(var(--float-x), var(--float-y)) rotate(var(--float-rot));
  }
}
</style>
