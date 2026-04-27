<template>
  <section ref="sectionRef" class="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
    <!-- Background — full cover -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <img
        src="https://media.mengundanganda.com/floral-blue/cover%20section/randidewi_28658e27-e94d-40ca-b897-607ef8ea0d83.webp"
        alt="Hero Background"
        class="min-w-full min-h-full w-full h-full object-cover object-center"
      />
    </div>

    <!-- Clouds -->
    <div class="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
      <!-- Cloud 1 -->
      <img
        ref="cloud1"
        src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_77adac33-7d52-45df-8195-3e0f017d4570.webp"
        class="absolute top-[-5%] -left-[10%] w-[60%] min-w-[300px] opacity-100"
        alt="Cloud"
      />
      <!-- Cloud 2 -->
      <img
        ref="cloud2"
        src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_77adac33-7d52-45df-8195-3e0f017d4570.webp"
        class="absolute top-[10%] -right-[15%] w-[70%] min-w-[350px] opacity-90 scale-x-[-1]"
        alt="Cloud"
      />
    </div>

    <!-- Trees (Background layer) -->
    <div class="absolute inset-0 z-[15] pointer-events-none">
      <!-- Left side trees -->
      <img src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_26b3b4da-bed4-4bc4-af6d-b939051e375f.webp" class="hero-tree absolute object-contain origin-bottom" style="bottom: 25%; left: -25%; width: auto; height: 45dvh; z-index: 4;" data-opacity="1" alt="Tree" />
      <img src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_26b3b4da-bed4-4bc4-af6d-b939051e375f.webp" class="hero-tree absolute object-contain origin-bottom" style="bottom: 25%; left: -15%; width: auto; height: 40dvh; z-index: 3;" data-opacity="1" alt="Tree" />
      <img src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_26b3b4da-bed4-4bc4-af6d-b939051e375f.webp" class="hero-tree absolute object-contain origin-bottom" style="bottom: 25%; left: -5%; width: auto; height: 35dvh; z-index: 2;" data-opacity="1" alt="Tree" />
      <img src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_26b3b4da-bed4-4bc4-af6d-b939051e375f.webp" class="hero-tree absolute object-contain origin-bottom" style="bottom: 25%; left: 10%; width: auto; height: 20dvh; z-index: 1;" data-opacity="1" alt="Tree" />

      <!-- Right side trees -->
      <img src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_26b3b4da-bed4-4bc4-af6d-b939051e375f.webp" class="hero-tree absolute object-contain origin-bottom" style="bottom: 25%; right: -25%; width: auto; height: 45dvh; z-index: 4;" data-flipped="true" data-opacity="1" alt="Tree" />
      <img src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_26b3b4da-bed4-4bc4-af6d-b939051e375f.webp" class="hero-tree absolute object-contain origin-bottom" style="bottom: 25%; right: -15%; width: auto; height: 40dvh; z-index: 3;" data-flipped="true" data-opacity="1" alt="Tree" />
      <img src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_26b3b4da-bed4-4bc4-af6d-b939051e375f.webp" class="hero-tree absolute object-contain origin-bottom" style="bottom: 25%; right: -5%; width: auto; height: 35dvh; z-index: 2;" data-flipped="true" data-opacity="1" alt="Tree" />
      <img src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_26b3b4da-bed4-4bc4-af6d-b939051e375f.webp" class="hero-tree absolute object-contain origin-bottom" style="bottom: 25%; right: 10%; width: auto; height: 20dvh; z-index: 1;" data-flipped="true" data-opacity="1" alt="Tree" />
    </div>

    <!-- Content Slot -->
    <div ref="heroContent" class="absolute top-[12%] z-10 w-full flex justify-center text-white opacity-0">
      <slot />
    </div>

    <!-- Bottom Decors -->
    <img
      src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_dc409f5e-f691-4ee4-8d4e-41adcdd18b13.webp"
      alt="Hero Bottom Decor 1"
      class="absolute bottom-0 left-0 w-full h-auto max-w-none z-20 pointer-events-none object-cover object-bottom"
    />
    <img
      ref="animatedAsset"
      src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_d0bdf3a2-2c25-4d19-b1b3-048763513026.webp"
      alt="Hero Bottom Decor 2"
      class="absolute bottom-[-10px] left-0 w-full h-auto max-w-none z-30 pointer-events-none object-cover object-bottom"
    />

    <!-- Butterflies -->
    <div
      v-for="b in butterfliesConfig"
      :key="b.id"
      class="butterfly-container absolute z-[40] pointer-events-none flex justify-center w-[40px] h-[40px] opacity-0"
      :style="`bottom: ${b.bottom}; ${b.horizontal}; perspective: 300px; transform-style: preserve-3d;`"
    >
      <div class="butterfly-left w-1/2 h-full origin-right">
        <img src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_eee2a456-5544-48be-af54-13d254482903.webp" class="w-full h-full object-contain object-right" style="transform: scaleX(-1);" alt="Left Wing" />
      </div>
      <div class="butterfly-right w-1/2 h-full origin-left">
        <img src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_eee2a456-5544-48be-af54-13d254482903.webp" class="w-full h-full object-contain object-left" alt="Right Wing" />
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

defineProps<{
  overlayGradient: string;
}>();

const sectionRef = ref<HTMLElement | null>(null);
const heroContent = ref<HTMLDivElement | null>(null);
const animatedAsset = ref<HTMLImageElement | null>(null);

const butterfliesConfig = [
  // Right side
  { id: 1, side: 'right', bottom: '15%', horizontal: 'right: 18%', scale: 0.6, delay: 0, startX: -200, startY: 300, startRot: -20, endRot: 15 },
  { id: 2, side: 'right', bottom: '18%', horizontal: 'right: 15%', scale: 1.0, delay: 0.2, startX: -250, startY: 350, startRot: -25, endRot: 5 },
  { id: 3, side: 'right', bottom: '16%', horizontal: 'right: 24%', scale: 0.8, delay: 0.4, startX: -180, startY: 280, startRot: -15, endRot: 10 },
  { id: 4, side: 'right', bottom: '20%', horizontal: 'right: 7%', scale: 0.9, delay: 0.6, startX: -300, startY: 320, startRot: -22, endRot: -5 },

  // Left side
  { id: 5, side: 'left', bottom: '15%', horizontal: 'left: 18%', scale: 0.6, delay: 0.1, startX: 200, startY: 300, startRot: 20, endRot: -15 },
  { id: 6, side: 'left', bottom: '18%', horizontal: 'left: 15%', scale: 1.0, delay: 0.3, startX: 250, startY: 350, startRot: 25, endRot: -5 },
  { id: 7, side: 'left', bottom: '16%', horizontal: 'left: 24%', scale: 0.8, delay: 0.5, startX: 180, startY: 280, startRot: 15, endRot: -10 },
  { id: 8, side: 'left', bottom: '20%', horizontal: 'left: 7%', scale: 0.9, delay: 0.7, startX: 300, startY: 320, startRot: 22, endRot: 5 },
];

const cloud1 = ref<HTMLImageElement | null>(null);
const cloud2 = ref<HTMLImageElement | null>(null);

let entranceTimeline: gsap.core.Timeline | null = null;
let cloudTweens: gsap.core.Tween[] = [];
let treeTweens: gsap.core.Tween[] = [];
let butterflyTweens: gsap.core.Tween[] = [];

onMounted(() => {
  const tl = gsap.timeline();
  entranceTimeline = tl;

  tl.addLabel("treesStart", "+=0.5");
  
  // Trees animation
  const treeEls = gsap.utils.toArray<HTMLImageElement>('.hero-tree');
  treeEls.forEach((tree, index) => {
    const isFlipped = tree.getAttribute('data-flipped') === 'true';
    const targetOpacity = parseFloat(tree.getAttribute('data-opacity') || '1');
    const scaleX = isFlipped ? -1 : 1;

    gsap.set(tree, { y: 200, opacity: 0, scaleX: scaleX, rotation: 0 });
    const pairIndex = index % 4;

    tl.to(tree, {
      y: 0,
      opacity: targetOpacity,
      duration: 2.5, 
      ease: 'power2.out',
    }, "treesStart+=" + (pairIndex * 0.25));

    const swayTween = gsap.to(tree, {
      rotation: isFlipped ? -1.5 : 1.5,
      duration: 4 + Math.random() * 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2.5 + (pairIndex * 0.25)
    });
    treeTweens.push(swayTween);
  });
  
  if (animatedAsset.value) {
    tl.fromTo(animatedAsset.value, { y: 150, opacity: 0 }, { y: 0, opacity: 1, duration: 2.5, ease: 'power2.out' }, "treesStart");
  }

  if (heroContent.value) {
    tl.fromTo(heroContent.value, { y: 150, opacity: 0 }, { y: 0, opacity: 1, duration: 2.5, ease: 'power2.out' }, "treesStart+=1.5");
  }

  // Cloud animations
  if (cloud1.value) cloudTweens.push(gsap.to(cloud1.value, { x: 100, duration: 30, ease: 'sine.inOut', yoyo: true, repeat: -1 }));
  if (cloud2.value) cloudTweens.push(gsap.to(cloud2.value, { x: -120, duration: 35, ease: 'sine.inOut', yoyo: true, repeat: -1 }));

  // Butterfly animation
  const butterflyEls = gsap.utils.toArray<HTMLDivElement>('.butterfly-container');
  butterflyEls.forEach((bContainer, index) => {
    const config = butterfliesConfig[index];
    const bLeft = bContainer.querySelector('.butterfly-left');
    const bRight = bContainer.querySelector('.butterfly-right');

    const flapSpeedFast = 0.04 + Math.random() * 0.02;

    // Set initial slight rotation so wings aren't completely flat when open
    gsap.set(bLeft, { rotateY: -10 });
    gsap.set(bRight, { rotateY: 10 });

    const flapLeft = gsap.to(bLeft, {
      rotateY: 65,
      duration: flapSpeedFast,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
    
    const flapRight = gsap.to(bRight, {
      rotateY: -65,
      duration: flapSpeedFast,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    butterflyTweens.push(flapLeft, flapRight);

    tl.fromTo(bContainer,
      { y: config.startY, x: config.startX, opacity: 0, rotation: config.startRot, scale: config.scale * 1.5 },
      {
        y: 0,
        x: 0,
        opacity: 1,
        rotation: config.endRot,
        scale: config.scale,
        duration: 3.5 + Math.random() * 0.5,
        ease: "power2.out",
        onComplete: () => {
          // Smoothly slow down the flapping using timeScale
          gsap.to([flapLeft, flapRight], { timeScale: 0.15 + Math.random() * 0.1, duration: 1 });
          // Butterfly lands completely still (no sway animation)
        }
      },
      "treesStart+=" + (1.5 + config.delay)
    );
  });
});

onBeforeUnmount(() => {
  if (entranceTimeline) entranceTimeline.kill();
  cloudTweens.forEach((t) => t.kill());
  treeTweens.forEach((t) => t.kill());
  butterflyTweens.forEach((t) => t.kill());
});
</script>
