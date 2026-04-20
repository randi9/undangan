<template>
  <section ref="sectionRef" v-if="hasDate" style="padding-top:40px;" class="py-10 pb-[15%] overflow-hidden relative min-h-[66vh] flex flex-col items-center justify-start px-6 text-center bg-[var(--theme-surface)]">
    
    <img src="https://media.mengundanganda.com/tema%20floral/coundown%20section/7180e6da-fcc2-44b7-b8d4-ffaa3f73b346.webp" class="absolute z-0 pointer-events-none cloud-sweep-fast" style="top: 2%; left: 0; width: clamp(200px, 40vw, 400px); filter: hue-rotate(180deg) saturate(0.5) brightness(1.2);" />
    <img src="https://media.mengundanganda.com/tema%20floral/coundown%20section/9f8283e2-3722-4b71-8eb6-86b67cb8b9ef.webp" class="absolute z-0 pointer-events-none cloud-sweep-slow" style="top: 8%; left: 0; width: clamp(250px, 45vw, 450px); filter: hue-rotate(180deg) saturate(0.5) brightness(1.2);" />
    
    <div class="relative z-10 flex flex-col items-center w-full">
    <h2 class="text-[40px] md:text-4xl text-[var(--theme-primary)]" :style="{ fontFamily: themeConfig.fontHeading }">Menghitung Hari</h2>
    <p style="font-size: 12px" class="text-[var(--theme-text-light)] md:text-base tracking-widest uppercase mt-3 mb-2">Menuju Momen Bahagia Kami</p>
    
    <div class="flex justify-center flex-wrap mx-auto relative z-10 w-full mt-10 md:mt-16 gap-3 md:gap-6 px-4 md:px-8" style="margin-top:100px">
      <div class="flex flex-col items-center w-16 md:w-20 relative" v-for="(unit, idx) in countdownUnits" :key="idx">
        <div class="relative z-10 text-[var(--theme-primary)]" style="display: flex; justify-content: center; font-size: clamp(2rem, 7vw, 4.5rem); font-weight: 300; margin-bottom: 0.8rem; font-family: 'Oswald', sans-serif;">
          <CountdownDigit v-for="(digit, dIdx) in formatNumber(unit.value)" :key="`${unit.label}-${dIdx}`" :target="digit" :isIntersecting="isVisible" />
        </div>
        <div class="relative z-10 text-[var(--theme-text-light)]" style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.25rem; font-weight: 400;">{{ unit.label }}</div>
      </div>
    </div>
    </div>
    
    <img src="https://media.mengundanganda.com/tema%20floral/coundown%20section/2bf93382-fff2-4180-8fa5-d91e7ed668be.webp" class="absolute bottom-0 left-0 w-full h-auto pointer-events-none z-0 transform -scale-x-100" style="filter: hue-rotate(180deg) saturate(0.5) brightness(1.2);" alt="Floral Ornament Bottom" />

    <div v-for="(g, i) in grasses" :key="'grass'+i" class="absolute pointer-events-none z-[1]" :style="{ left: g.left, bottom: g.bottom, transform: g.flip ? 'scaleX(-1)' : 'none' }">
      <img src="https://media.mengundanganda.com/tema%20floral/coundown%20section/fe50069a-9362-4461-b606-1600648e50f1.webp" class="sway-grass drop-shadow-sm" :style="{ width: g.width, animationDuration: g.duration, animationDelay: g.delay, filter: 'hue-rotate(180deg) saturate(0.5) brightness(1.1)' }" />
    </div>

    <div v-for="(d, i) in dandelions" :key="'dandelion'+i" class="absolute pointer-events-none z-[2]" :style="{ left: d.left, bottom: d.bottom, transform: d.flip ? 'scaleX(-1)' : 'none' }">
      <img src="https://media.mengundanganda.com/tema%20floral/coundown%20section/7e196439-ea2b-4325-a844-ebff3113d147.webp" class="sway-dandelion drop-shadow-sm" :style="{ width: d.width, animationDuration: d.duration, animationDelay: d.delay, filter: 'hue-rotate(180deg) saturate(0.5) brightness(1.1)' }" />
    </div>

    <div v-for="(seed, index) in imgSeeds" :key="'imgSeed'+index" class="absolute pointer-events-none z-[10] drift-path" :style="{ left: seed.left, bottom: seed.bottom, width: seed.size, animationDuration: seed.duration, animationDelay: seed.delay, '--tx': seed.tx, '--ty': seed.ty }">
      <img src="https://media.mengundanganda.com/tema%20floral/coundown%20section/ffe221ad-761e-40cf-8a87-5ab68e81c721.webp" class="w-full h-auto seed-wobble" :style="{ animationDuration: seed.wobble, filter: 'hue-rotate(180deg) saturate(0.5)' }" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import CountdownDigit from './CountdownDigit.vue';

gsap.registerPlugin(ScrollTrigger);

const grasses = [
  { left: '15%', bottom: '20%', width: 'clamp(40px, 12vw, 110px)', duration: '2.4s', delay: '0.7s', flip: true },
  { left: '26%', bottom: '22%', width: 'clamp(50px, 6vw, 60px)', duration: '1.6s', delay: '1.2s', flip: true },
  { left: '38%', bottom: '17%', width: 'clamp(40px, 10vw, 90px)', duration: '2.1s', delay: '0.4s', flip: true },
  { left: '55%', bottom: '12%', width: 'clamp(50px, 14vw, 120px)', duration: '2.6s', delay: '1.5s', flip: false },
  { left: '70%', bottom: '15%', width: 'clamp(45px, 7vw, 70px)', duration: '1.7s', delay: '0.9s', flip: true },
  { left: '82%', bottom: '10%', width: 'clamp(65px, 11vw, 100px)', duration: '2.3s', delay: '0.2s', flip: false },
  { left: '92%', bottom: '12%', width: 'clamp(55px, 9vw, 85px)', duration: '1.9s', delay: '1.1s', flip: true },
  { left: '5%', bottom: '18%', width: 'clamp(35px, 5vw, 50px)', duration: '1.8s', delay: '0.3s', flip: false },
  { left: '46%', bottom: '14%', width: 'clamp(33px, 5vw, 48px)', duration: '1.8s', delay: '0.2s', flip: false },
  { left: '60%', bottom: '19%', width: 'clamp(40px, 6vw, 55px)', duration: '2.2s', delay: '0.6s', flip: false },
];

const dandelions = [
  { left: '8%', bottom: '26%', width: 'clamp(50px, 7vw, 65px)', duration: '3.2s', delay: '0.5s', flip: false },
  { left: '20%', bottom: '24%', width: 'clamp(55px, 9vw, 85px)', duration: '4.1s', delay: '1.2s', flip: true },
  { left: '42%', bottom: '23%', width: 'clamp(35px, 5vw, 55px)', duration: '2.8s', delay: '2.0s', flip: false },
  { left: '60%', bottom: '19%', width: 'clamp(65px, 11vw, 95px)', duration: '4.6s', delay: '0.8s', flip: true },
  { left: '80%', bottom: '17%', width: 'clamp(45px, 8vw, 75px)', duration: '3.5s', delay: '1.8s', flip: false },
];

const imgSeeds = [
  { left: '-15%', bottom: '5%', size: '18px', duration: '16s', delay: '0s', wobble: '1.2s', tx: '95vw', ty: '-60vh' },
  { left: '2%', bottom: '15%', size: '24px', duration: '16s', delay: '0.2s', wobble: '2s', tx: '110vw', ty: '-50vh' },
  { left: '18%', bottom: '2%', size: '20px', duration: '16s', delay: '0.6s', wobble: '1.8s', tx: '90vw', ty: '-45vh' },
  { left: '45%', bottom: '18%', size: '26px', duration: '16s', delay: '8s', wobble: '1.6s', tx: '80vw', ty: '-55vh' },
  { left: '35%', bottom: '5%', size: '20px', duration: '16s', delay: '8.1s', wobble: '1.9s', tx: '85vw', ty: '-50vh' },
];

const props = defineProps<{
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  themeConfig: ThemeConfig;
  hasDate: boolean;
}>();

const countdownUnits = [
  { get value() { return props.countdown.days }, label: 'Hari' },
  { get value() { return props.countdown.hours }, label: 'Jam' },
  { get value() { return props.countdown.minutes }, label: 'Menit' },
  { get value() { return props.countdown.seconds }, label: 'Detik' },
];

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
let observer: IntersectionObserver | null = null;
let ctx: gsap.Context | null = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (!entry) return;
    if (entry.isIntersecting) {
      isVisible.value = true;
      if (observer && sectionRef.value) observer.unobserve(sectionRef.value);
    }
  }, { threshold: 0.3 });

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
    ctx = gsap.context(() => {
      gsap.to(sectionRef.value, {
        scrollTrigger: { trigger: sectionRef.value, start: "top top", end: "bottom top", scrub: true },
        y: () => (sectionRef.value?.offsetHeight || 0) * 0.5,
        scale: 1.1, opacity: 0, filter: "blur(5px)", ease: "none"
      });
    }, sectionRef.value);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  ctx?.revert();
});

const formatNumber = (num: number) => {
  const safe = isNaN(num) ? 0 : num;
  return safe.toString().padStart(2, '0').split('');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400&display=swap');

.sway-grass {
  transform-origin: bottom center;
  animation-name: grass-sway;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  -webkit-mask-image: linear-gradient(to top, transparent 0%, black 30%);
  mask-image: linear-gradient(to top, transparent 0%, black 30%);
}
@keyframes grass-sway {
  0% { transform: rotate(-5deg); filter: brightness(0.95); }
  100% { transform: rotate(5deg); filter: brightness(1.05); }
}

.sway-dandelion {
  transform-origin: bottom center;
  animation-name: dandelion-sway;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  -webkit-mask-image: linear-gradient(to top, transparent 0%, black 30%);
  mask-image: linear-gradient(to top, transparent 0%, black 30%);
}
@keyframes dandelion-sway {
  0% { transform: rotate(-12deg); }
  100% { transform: rotate(18deg); }
}

.drift-path { animation: float-drift linear infinite; opacity: 0; }
.seed-wobble { animation: wobble ease-in-out infinite alternate; transform-origin: bottom center; }

@keyframes float-drift {
  0% { transform: translate(0, 0); opacity: 0; }
  10% { opacity: 0.35; }
  35% { opacity: 0.35; }
  45% { transform: translate(var(--tx), var(--ty)); opacity: 0; }
  100% { transform: translate(var(--tx), var(--ty)); opacity: 0; }
}
@keyframes wobble {
  0% { transform: rotate(-10deg); }
  100% { transform: rotate(15deg); }
}

.cloud-sweep-fast { animation: cloud-sweep 40s linear infinite; animation-delay: -3s; }
.cloud-sweep-slow { animation: cloud-sweep 75s linear infinite; animation-delay: -50s; }
@keyframes cloud-sweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100vw); }
}
</style>
