<template>
  <footer ref="footerSection" class="py-24 px-6 text-center text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
    <!-- Backgrounds -->
    <div class="absolute inset-0 z-0 bg-[#111827]"></div>
    <div class="absolute inset-0 z-[1] opacity-90" :style="{ background: themeConfig.overlayGradient }"></div>
    
    <!-- Seamless Pattern Overlay (Subtle) -->
    <svg class="absolute inset-0 w-full h-full z-[2] opacity-10 pointer-events-none">
      <defs>
        <pattern id="elegant-footer-damask" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M50 10 C54 20, 65 25, 65 40 C65 55, 54 60, 50 70 C46 60, 35 55, 35 40 C35 25, 46 20, 50 10Z" fill="#ffffff"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#elegant-footer-damask)" />
    </svg>

    <div ref="contentRef" class="relative z-10 opacity-0 translate-y-8 flex flex-col items-center">
      
      <!-- Decorative Top Divider -->
      <div class="mb-12 flex items-center justify-center gap-4">
        <svg viewBox="0 0 100 2" class="w-16 md:w-24 opacity-60"><line x1="0" y1="1" x2="100" y2="1" stroke="var(--theme-secondary)" stroke-width="1.5"/></svg>
        <svg viewBox="0 0 24 24" class="w-6 h-6 opacity-80" fill="none" stroke="var(--theme-secondary)" stroke-width="1.5">
           <path d="M12 2 L15 9 L22 9 L16 14 L18 21 L12 17 L6 21 L8 14 L2 9 L9 9 Z" stroke-linejoin="round"/>
        </svg>
        <svg viewBox="0 0 100 2" class="w-16 md:w-24 opacity-60"><line x1="0" y1="1" x2="100" y2="1" stroke="var(--theme-secondary)" stroke-width="1.5"/></svg>
      </div>

      <p class="text-[9px] md:text-sm tracking-[0.3em] uppercase mb-4 opacity-80" :style="{ color: 'var(--theme-secondary)' }">The Wedding Of</p>
      
      <p class="text-4xl md:text-6xl lg:text-7xl mb-12 drop-shadow-lg" :style="{ fontFamily: themeConfig.fontHeading, color: 'var(--theme-secondary)' }">
        {{ invitation.groom_name }}
        <span class="inline-block mx-2 md:mx-4 text-3xl md:text-5xl opacity-70">&amp;</span>
        {{ invitation.bride_name }}
      </p>
      
      <p class="text-sm md:text-base font-light tracking-wide opacity-90 max-w-md mx-auto leading-relaxed">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
      </p>
      
      <p class="text-sm md:text-base italic mt-4 opacity-80">
        Terima kasih.
      </p>

      <div class="mt-20 pt-6 border-t border-white/20 w-[80%] max-w-sm flex flex-col items-center gap-2">
        <div class="text-[10px] md:text-xs opacity-60 uppercase tracking-widest">Dibuat dengan</div>
        <div class="font-bold tracking-widest text-sm opacity-80 flex items-center gap-1.5">
          Mengundang<span :style="{ color: 'var(--theme-secondary)' }">Anda</span>
        </div>
      </div>
    </div>
    
    <!-- Sparkles container -->
    <div ref="sparklesRef" class="absolute inset-0 z-[5] pointer-events-none"></div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

const footerSection = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const sparklesRef = ref<HTMLElement | null>(null);

let activeSparkles: gsap.core.Tween[] = [];
let spawnTimer: gsap.core.Tween | null = null;

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function spawnSparkle() {
  const container = sparklesRef.value;
  if (!container) return;

  const el = document.createElement('div');
  el.style.position = 'absolute';
  el.style.pointerEvents = 'none';
  el.style.willChange = 'transform, opacity';
  
  const size = randomRange(3, 7);
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.borderRadius = '50%';
  // Use CSS variable color via literal string assignment
  el.style.background = `rgba(201,169,110, ${randomRange(0.4, 0.8)})`;
  el.style.boxShadow = `0 0 ${size * 2}px rgba(201,169,110,0.8)`;
  
  const startX = randomRange(5, 95);
  el.style.left = `${startX}%`;
  el.style.top = `${randomRange(10, 90)}%`;
  el.style.opacity = '0';

  container.appendChild(el);

  const masterTween = gsap.to(el, {
    opacity: 1,
    duration: randomRange(1, 2.5),
    ease: 'sine.inOut',
    yoyo: true,
    repeat: 1,
    onComplete: () => {
      gsap.killTweensOf(el);
      el.remove();
      const idx = activeSparkles.indexOf(masterTween);
      if (idx > -1) activeSparkles.splice(idx, 1);
    },
  });

  // Flow slightly upwards
  gsap.to(el, {
    y: randomRange(-20, -50),
    duration: randomRange(3, 6),
    ease: 'none',
  });

  activeSparkles.push(masterTween);
}

function startSparkleLoop() {
  spawnSparkle();
  spawnTimer = gsap.delayedCall(randomRange(0.4, 1.2), startSparkleLoop);
}

onMounted(() => {
  if (!footerSection.value) return;

  gsap.to(contentRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: footerSection.value,
      start: 'top 85%',
      toggleActions: 'play none none none',
      onEnter: () => {
        // Start particles when footer becomes visible
        for (let i = 0; i < 8; i++) {
          gsap.delayedCall(i * 0.3, spawnSparkle);
        }
        startSparkleLoop();
      }
    }
  });
});

onBeforeUnmount(() => {
  if (spawnTimer) spawnTimer.kill();
  activeSparkles.forEach(tween => tween.kill());
  activeSparkles = [];
});
</script>
