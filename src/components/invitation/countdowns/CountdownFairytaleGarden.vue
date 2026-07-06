<template>
  <section v-if="hasDate" ref="countdownSection" class="px-6 text-center relative overflow-hidden bg-[#FAF0F2]" style="height: 100vh; height: 100dvh; max-height: 100vh; max-height: 100dvh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <!-- Warm subtle fairytale gradient -->
    <div class="absolute inset-0 w-full h-full bg-gradient-to-b from-[#FAF0F2] via-[#EBCFD1]/35 to-[#FAF0F2] -z-10"></div>
    
    <!-- Large overlapping image container -->
    <div 
      ref="bigOvalRef"
      class="absolute top-0 left-0 opacity-0 translate-y-6 z-[1] shadow-[8px_8px_40px_rgba(106,78,66,0.06)]"
      style="
        width: 90vw;
        height: 86dvh;
        background-image: url('https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_82a7086f-8895-4b10-8183-cb8692f6334d.webp');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border-bottom-right-radius: clamp(150px, 25vw, 360px);
        box-sizing: border-box;
        overflow: hidden;
      "
    >
      <!-- White overlay with reduced opacity -->
      <div style="position: absolute; inset: 0; background-color: rgba(255, 255, 255, 0.25); pointer-events: none;"></div>

      <!-- Floating flowers on the river -->
      <img
        v-for="flower in floatingFlowers"
        :key="flower.id"
        :src="flower.src"
        class="floating-flower absolute pointer-events-none select-none z-[2]"
        :style="flower.style"
        alt="Floating Flower"
      />
    </div>

    <!-- Small white/ivory container with text -->
    <div 
      ref="headerRef" 
      class="absolute top-0 left-0 opacity-0 translate-y-6 z-20 text-left shadow-[6px_6px_30px_rgba(106,78,66,0.05)]"
      style="
        width: 55vw;
        height: 35dvh;
        background-color: #F8F3EE;
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
        style="font-size: clamp(2.3rem, 5vw, 4.2rem);"
      >
        Save<br>The<br>Date
      </h2>
      <p 
        v-if="formattedDate"
        class="font-medium text-[#6A4E42]/80 mt-3 md:mt-4 tracking-wide"
        style="font-size: clamp(0.75rem, 1.4vw, 0.95rem);"
      >
        {{ formattedDate }}
      </p>
    </div>
    
    <div class="flex justify-center gap-3 md:gap-6 max-w-lg mx-auto relative z-10">
      <div v-for="(unit, idx) in units" :key="unit.label" 
        :ref="el => { if (el) digitRefs[idx] = el as HTMLElement }"
        class="flex flex-col items-center opacity-0 translate-y-8"
      >
        <!-- Card with white background -->
        <div class="relative w-[64px] sm:w-[70px] md:w-[85px] aspect-square rounded-2xl bg-white border border-[#EBCFD1] shadow-[0_8px_30px_rgba(106,78,66,0.06)] flex flex-col items-center justify-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(106,78,66,0.12)]">
          <span class="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[#6A4E42] tabular-nums leading-none mb-1 md:mb-1.5" 
            :style="{ fontFamily: themeConfig.fontHeading }"
          >{{ unit.value }}</span>
          <span class="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-[#9A7B6B] font-medium leading-none">{{ unit.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';

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
  // Bottom layer (y: 3% - 25%)
  {
    id: 1,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp',
    style: {
      bottom: '5%',
      left: '12%',
      width: 'clamp(45px, 8vw, 85px)',
      transform: 'rotate(15deg)',
      opacity: '0.9',
    }
  },
  {
    id: 2,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp',
    style: {
      bottom: '10%',
      left: '20%',
      width: 'clamp(35px, 6vw, 70px)',
      transform: 'rotate(-25deg)',
      opacity: '0.85',
    }
  },
  {
    id: 3,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp',
    style: {
      bottom: '7%',
      left: '35%',
      width: 'clamp(55px, 9vw, 95px)',
      transform: 'rotate(45deg)',
      opacity: '0.95',
    }
  },
  {
    id: 4,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp',
    style: {
      bottom: '18%',
      left: '45%',
      width: 'clamp(40px, 7vw, 75px)',
      transform: 'rotate(10deg)',
      opacity: '0.9',
    }
  },
  {
    id: 5,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp',
    style: {
      bottom: '14%',
      left: '58%',
      width: 'clamp(50px, 8vw, 90px)',
      transform: 'rotate(-15deg)',
      opacity: '0.9',
    }
  },
  {
    id: 6,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp',
    style: {
      bottom: '8%',
      left: '70%',
      width: 'clamp(35px, 6vw, 70px)',
      transform: 'rotate(60deg)',
      opacity: '0.95',
    }
  },
  {
    id: 7,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp',
    style: {
      bottom: '22%',
      left: '82%',
      width: 'clamp(45px, 8vw, 80px)',
      transform: 'rotate(-40deg)',
      opacity: '0.9',
    }
  },
  {
    id: 8,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp',
    style: {
      bottom: '11%',
      left: '90%',
      width: 'clamp(35px, 6vw, 75px)',
      transform: 'rotate(20deg)',
      opacity: '0.85',
    }
  },

  // Lower-middle layer (y: 25% - 45%)
  {
    id: 9,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp',
    style: {
      bottom: '27%',
      left: '15%',
      width: 'clamp(30px, 5vw, 65px)',
      transform: 'rotate(-10deg)',
      opacity: '0.8',
    }
  },
  {
    id: 10,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp',
    style: {
      bottom: '35%',
      left: '28%',
      width: 'clamp(40px, 7vw, 80px)',
      transform: 'rotate(35deg)',
      opacity: '0.85',
    }
  },
  {
    id: 11,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp',
    style: {
      bottom: '30%',
      left: '50%',
      width: 'clamp(45px, 8vw, 85px)',
      transform: 'rotate(-25deg)',
      opacity: '0.9',
    }
  },
  {
    id: 12,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp',
    style: {
      bottom: '40%',
      left: '63%',
      width: 'clamp(35px, 6vw, 70px)',
      transform: 'rotate(15deg)',
      opacity: '0.9',
    }
  },
  {
    id: 13,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp',
    style: {
      bottom: '33%',
      left: '75%',
      width: 'clamp(50px, 9vw, 95px)',
      transform: 'rotate(-15deg)',
      opacity: '0.85',
    }
  },
  {
    id: 14,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp',
    style: {
      bottom: '45%',
      left: '88%',
      width: 'clamp(40px, 7vw, 80px)',
      transform: 'rotate(50deg)',
      opacity: '0.95',
    }
  },

  // Upper-middle layer (y: 45% - 65%)
  {
    id: 15,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp',
    style: {
      bottom: '48%',
      left: '22%',
      width: 'clamp(35px, 6vw, 70px)',
      transform: 'rotate(-30deg)',
      opacity: '0.85',
    }
  },
  {
    id: 16,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp',
    style: {
      bottom: '55%',
      left: '38%',
      width: 'clamp(45px, 8vw, 85px)',
      transform: 'rotate(25deg)',
      opacity: '0.9',
    }
  },
  {
    id: 17,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp',
    style: {
      bottom: '50%',
      left: '56%',
      width: 'clamp(50px, 9vw, 95px)',
      transform: 'rotate(-20deg)',
      opacity: '0.85',
    }
  },
  {
    id: 18,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp',
    style: {
      bottom: '60%',
      left: '70%',
      width: 'clamp(35px, 6vw, 70px)',
      transform: 'rotate(40deg)',
      opacity: '0.8',
    }
  },
  {
    id: 19,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp',
    style: {
      bottom: '53%',
      left: '80%',
      width: 'clamp(40px, 7vw, 80px)',
      transform: 'rotate(-15deg)',
      opacity: '0.9',
    }
  },
  {
    id: 20,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp',
    style: {
      bottom: '65%',
      left: '92%',
      width: 'clamp(30px, 5vw, 65px)',
      transform: 'rotate(45deg)',
      opacity: '0.85',
    }
  },

  // Top layer (y: 65% - 90%)
  {
    id: 21,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp',
    style: {
      bottom: '68%',
      left: '10%',
      width: 'clamp(30px, 5vw, 65px)',
      transform: 'rotate(-10deg)',
      opacity: '0.8',
    }
  },
  {
    id: 22,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp',
    style: {
      bottom: '74%',
      left: '25%',
      width: 'clamp(45px, 8vw, 85px)',
      transform: 'rotate(35deg)',
      opacity: '0.85',
    }
  },
  {
    id: 23,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp',
    style: {
      bottom: '70%',
      left: '48%',
      width: 'clamp(35px, 6vw, 70px)',
      transform: 'rotate(-25deg)',
      opacity: '0.9',
    }
  },
  {
    id: 24,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp',
    style: {
      bottom: '80%',
      left: '60%',
      width: 'clamp(40px, 7vw, 80px)',
      transform: 'rotate(15deg)',
      opacity: '0.9',
    }
  },
  {
    id: 25,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp',
    style: {
      bottom: '75%',
      left: '74%',
      width: 'clamp(45px, 8vw, 85px)',
      transform: 'rotate(-15deg)',
      opacity: '0.85',
    }
  },
  {
    id: 26,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp',
    style: {
      bottom: '85%',
      left: '86%',
      width: 'clamp(35px, 6vw, 75px)',
      transform: 'rotate(50deg)',
      opacity: '0.9',
    }
  },
  {
    id: 27,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp',
    style: {
      bottom: '82%',
      left: '18%',
      width: 'clamp(30px, 5vw, 65px)',
      transform: 'rotate(-30deg)',
      opacity: '0.8',
    }
  },
  {
    id: 28,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp',
    style: {
      bottom: '88%',
      left: '40%',
      width: 'clamp(40px, 7vw, 80px)',
      transform: 'rotate(25deg)',
      opacity: '0.9',
    }
  },
  {
    id: 29,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_4a421d46-3a2a-4794-b253-03e32774ffb0.webp',
    style: {
      bottom: '62%',
      left: '40%',
      width: 'clamp(35px, 6vw, 70px)',
      transform: 'rotate(-20deg)',
      opacity: '0.85',
    }
  },
  {
    id: 30,
    src: 'https://media.mengundanganda.com/fairygarden/coundown%20section/dewirandi_280f2877-0473-47c5-88b9-798630001460.webp',
    style: {
      bottom: '78%',
      left: '92%',
      width: 'clamp(45px, 8vw, 85px)',
      transform: 'rotate(40deg)',
      opacity: '0.9',
    }
  }
];

const formattedDate = computed(() => {
  const dateStr = props.invitation?.akad_date || props.invitation?.resepsi_date;
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
});

const units = computed(() => [
  { value: props.countdown.days, label: 'Hari' },
  { value: props.countdown.hours, label: 'Jam' },
  { value: props.countdown.minutes, label: 'Menit' },
  { value: props.countdown.seconds, label: 'Detik' },
]);

let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    if (!countdownSection.value) return;

    // Header & Big Oval entrance
    gsap.to([bigOvalRef.value, headerRef.value], {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: countdownSection.value,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Digit cards stagger entrance
    gsap.to(digitRefs.value, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: countdownSection.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Floating flowers animation - enhanced decoupled motions for more visible floating/bobbing effect
    const floatingElements = countdownSection.value.querySelectorAll('.floating-flower');
    floatingElements.forEach((el, index) => {
      // Larger horizontal sway (drift)
      gsap.to(el, {
        x: 'random(-45, 45)',
        duration: 'random(5.5, 8)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.12
      });

      // Larger vertical bobbing
      gsap.to(el, {
        y: 'random(-28, 28)',
        duration: 'random(3.5, 5.5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.08
      });

      // Larger rotation sway
      gsap.to(el, {
        rotation: '+=random(-45, 45)',
        duration: 'random(6.5, 9)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.15
      });
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
}
.floating-flower:hover {
  filter: drop-shadow(0 6px 12px rgba(106, 78, 66, 0.2)) brightness(1.1);
}
</style>
