<template>
  <section ref="sectionRef" class="relative min-h-[100dvh] w-full overflow-hidden">
    <!-- Quote Content -->
    <div class="absolute top-40 md:top-32 left-1/2 -translate-x-1/2 z-10 w-full px-6 max-w-[70vw] sm:max-w-[400px] md:max-w-[600px] text-center">
      <div v-if="quote" class="relative">
        <!-- Decorative Top Quote -->
        <div class="font-serif text-6xl md:text-8xl text-[#2c3e50] opacity-30 leading-none h-6 md:h-8 -mb-4 md:-mb-2 text-center">
          &ldquo;
        </div>
        
        <blockquote class="whitespace-pre-line text-base md:text-lg lg:text-xl italic font-light text-[#2c3e50] leading-relaxed tracking-wider drop-shadow-sm relative z-10">
          {{ parsedQuote.text }}
        </blockquote>
        
        <!-- Decorative Bottom Quote -->
        <div class="font-serif text-6xl md:text-8xl text-[#2c3e50] opacity-30 leading-none h-8 md:h-12 mt-2 md:mt-4 text-center">
          &rdquo;
        </div>

        <div v-if="parsedQuote.source" class="mt-6 md:mt-10 text-base md:text-lg font-semibold text-[#2c3e50] tracking-widest">
          {{ parsedQuote.source }}
        </div>
      </div>
    </div>

    <!-- Floral Asset 1 -->
    <img 
      class="quote-floral"
      src="https://media.mengundanganda.com/floral-blue/quotes%20section/randidewi_15b853ed-da02-460c-8a43-6cc6270e0e29.webp" 
      alt="Floral Decor 1" 
      style="position: absolute; bottom: -100px; left: 80px; width: 250px; height: auto; z-index: 5; transform-origin: bottom center;"
    />

    <!-- Floral Asset 2 -->
    <img 
      class="quote-floral"
      src="https://media.mengundanganda.com/floral-blue/quotes%20section/randidewi_d28fa7d1-1c5f-4deb-9193-befd72c49a7b.webp" 
      alt="Floral Decor 2" 
      style="position: absolute; bottom: 170px; left: -90px; width: 180px; height: auto; z-index: 5; transform-origin: bottom center;"
    />

    <!-- Floral Asset 3 -->
    <img 
      class="quote-floral"
      src="https://media.mengundanganda.com/floral-blue/quotes%20section/randidewi_be5d540b-47f0-4f99-96da-779b59d1e6b5.webp" 
      alt="Floral Decor 3" 
      style="position: absolute; bottom: 90px; left: 20px; width: 170px; height: auto; z-index: 5; transform-origin: bottom center;"
    />

    <!-- Floral Asset 4 -->
    <img 
      class="quote-floral"
      src="https://media.mengundanganda.com/floral-blue/quotes%20section/randidewi_86d95fec-466c-4562-837d-f66b1d04c75f.webp" 
      alt="Floral Decor 4" 
      style="position: absolute; bottom: 70px; left: -50px; width: 170px; height: auto; z-index: 5; transform-origin: bottom center;"
    />

    <!-- Floral Asset 5 -->
    <img 
      class="quote-floral"
      src="https://media.mengundanganda.com/floral-blue/quotes%20section/randidewi_a82836b3-40f1-4167-a663-18fc71e500f4.webp" 
      alt="Floral Decor 5" 
      style="position: absolute; bottom: -70px; left: -50px; width: 250px; height: auto; z-index: 5; transform-origin: bottom center;"
    />

    <!-- Floral Asset 6 -->
    <img 
      class="quote-floral"
      src="https://media.mengundanganda.com/floral-blue/quotes%20section/randidewi_b9fca0ed-4cb7-41d1-98cc-86e741c3e592.webp" 
      alt="Floral Decor 6" 
      style="position: absolute; bottom: 0px; right: 150px; width: 200px; height: auto; z-index: 1; transform-origin: bottom center;"
    />

    <!-- Floral Asset 7 -->
    <img 
      class="quote-floral"
      src="https://media.mengundanganda.com/floral-blue/quotes%20section/randidewi_776edb77-a094-48b7-b41a-037060d5ad28.webp" 
      alt="Floral Decor 7" 
      style="position: absolute; bottom: 250px; left: -100px; width: 180px; height: auto; z-index: 1; transform-origin: bottom center;"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  quote?: string;
  themeConfig?: ThemeConfig;
}>();

const parsedQuote = computed(() => {
  if (!props.quote) return { text: '', source: '' };
  
  // Extract source enclosed in parentheses at the end of the text
  const sourceRegex = /\s*(\([^)]+\))$/;
  const match = props.quote.match(sourceRegex);
  
  if (match) {
    const textPart = props.quote.replace(sourceRegex, '').replace(/^"|"$/g, '').trim();
    return {
      text: textPart,
      source: match[1]
    };
  }
  
  return {
    text: props.quote.replace(/^"|"$/g, '').trim(),
    source: ''
  };
});

const sectionRef = ref<HTMLElement | null>(null);
let entranceTimeline: gsap.core.Timeline | null = null;
let swayTweens: gsap.core.Tween[] = [];

onMounted(() => {
  if (!sectionRef.value) return;

  let florals = gsap.utils.toArray<HTMLImageElement>('.quote-floral');

  // Sort by z-index descending so higher index enters first
  florals.sort((a, b) => {
    const zA = parseInt(a.style.zIndex) || 0;
    const zB = parseInt(b.style.zIndex) || 0;
    return zB - zA;
  });

  // Entrance Timeline
  entranceTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 25%", // Triggers when the section is about 75% opened in the viewport
      toggleActions: "play none none reverse"
    }
  });

  florals.forEach((floral, index) => {
    // Set initial state
    gsap.set(floral, { y: 150, opacity: 0 });

    // Sequential stagger based on sorted order
    const delay = index * 0.3; // 0.3s between each flower's entrance

    // Staggered entrance
    entranceTimeline!.to(floral, {
      y: 0,
      opacity: 1,
      duration: 1.5 + Math.random() * 0.5, // 1.5s to 2.0s
      ease: "power2.out"
    }, delay);

    // Continuous randomized sway
    const swayDirection = Math.random() > 0.5 ? 1.5 : -1.5;
    const swayAngle = 2 + Math.random() * 2; // 2 to 4 degrees
    
    const swayTween = gsap.to(floral, {
      rotation: swayAngle * swayDirection,
      duration: 1.5 + Math.random() * 1.5, // 1.5s to 3.0s (faster)
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.5 + Math.random() * 1 // Start swaying after entrance
    });
    
    swayTweens.push(swayTween);
  });
});

onBeforeUnmount(() => {
  if (entranceTimeline) entranceTimeline.kill();
  swayTweens.forEach(t => t.kill());
});
</script>

<style scoped>
</style>
