<template>
  <section class="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
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
      <!-- Left side trees (berjejer ke kanan) -->
      <img src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_26b3b4da-bed4-4bc4-af6d-b939051e375f.webp" class="hero-tree absolute object-contain origin-bottom" style="bottom: 25%; left: -25%; width: auto; height: 45dvh; z-index: 4;" data-opacity="1" alt="Tree" />
      <img src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_26b3b4da-bed4-4bc4-af6d-b939051e375f.webp" class="hero-tree absolute object-contain origin-bottom" style="bottom: 25%; left: -15%; width: auto; height: 40dvh; z-index: 3;" data-opacity="1" alt="Tree" />
      <img src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_26b3b4da-bed4-4bc4-af6d-b939051e375f.webp" class="hero-tree absolute object-contain origin-bottom" style="bottom: 25%; left: -5%; width: auto; height: 35dvh; z-index: 2;" data-opacity="1" alt="Tree" />
      <img src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_26b3b4da-bed4-4bc4-af6d-b939051e375f.webp" class="hero-tree absolute object-contain origin-bottom" style="bottom: 25%; left: 10%; width: auto; height: 20dvh; z-index: 1;" data-opacity="1" alt="Tree" />

      <!-- Right side trees (berjejer ke kiri) -->
      <img src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_26b3b4da-bed4-4bc4-af6d-b939051e375f.webp" class="hero-tree absolute object-contain origin-bottom" style="bottom: 25%; right: -25%; width: auto; height: 45dvh; z-index: 4;" data-flipped="true" data-opacity="1" alt="Tree" />
      <img src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_26b3b4da-bed4-4bc4-af6d-b939051e375f.webp" class="hero-tree absolute object-contain origin-bottom" style="bottom: 25%; right: -15%; width: auto; height: 40dvh; z-index: 3;" data-flipped="true" data-opacity="1" alt="Tree" />
      <img src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_26b3b4da-bed4-4bc4-af6d-b939051e375f.webp" class="hero-tree absolute object-contain origin-bottom" style="bottom: 25%; right: -5%; width: auto; height: 35dvh; z-index: 2;" data-flipped="true" data-opacity="1" alt="Tree" />
      <img src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_26b3b4da-bed4-4bc4-af6d-b939051e375f.webp" class="hero-tree absolute object-contain origin-bottom" style="bottom: 25%; right: 10%; width: auto; height: 20dvh; z-index: 1;" data-flipped="true" data-opacity="1" alt="Tree" />
    </div>

    <!-- Content Slot (names, date — from parent) -->
    <div ref="heroContent" class="absolute top-[12%] z-10 w-full flex justify-center text-white opacity-0">
      <slot />
    </div>

    <!-- Asset 1 (Lower z-index) -->
    <img
      src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_dc409f5e-f691-4ee4-8d4e-41adcdd18b13.webp"
      alt="Hero Bottom Decor 1"
      class="absolute bottom-0 left-0 w-full h-auto max-w-none z-20 pointer-events-none object-cover object-bottom"
    />
    
    <!-- Asset 2 (Higher z-index, Animated from bottom) -->
    <img
      ref="animatedAsset"
      src="https://media.mengundanganda.com/floral-blue/hero%20section/randidewi_d0bdf3a2-2c25-4d19-b1b3-048763513026.webp"
      alt="Hero Bottom Decor 2"
      class="absolute bottom-0 left-0 w-full h-auto max-w-none z-30 pointer-events-none object-cover object-bottom"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

defineProps<{
  overlayGradient: string;
}>();

const heroContent = ref<HTMLDivElement | null>(null);
const animatedAsset = ref<HTMLImageElement | null>(null);

const cloud1 = ref<HTMLImageElement | null>(null);
const cloud2 = ref<HTMLImageElement | null>(null);
const cloud3 = ref<HTMLImageElement | null>(null);

let entranceTimeline: gsap.core.Timeline | null = null;
let cloudTweens: gsap.core.Tween[] = [];
let treeTweens: gsap.core.Tween[] = [];

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

    // Set initial state
    gsap.set(tree, {
      y: 200,
      opacity: 0,
      scaleX: scaleX,
      rotation: 0 // Explicitly set rotation to prevent CSS matrix parsing issues
    });

    const pairIndex = index % 4;

    // Entrance animation
    tl.to(tree, {
      y: 0,
      opacity: targetOpacity,
      duration: 2.5 + Math.random() * 1.0, // Slowed down from 1.5
      ease: 'power2.out',
    }, "treesStart+=" + (pairIndex * 0.25)); // Sync left and right using pairIndex

    // Sway animation (slow wind effect)
    const swayTween = gsap.to(tree, {
      rotation: isFlipped ? -1.5 + Math.random() * -1.5 : 1.5 + Math.random() * 1.5,
      duration: 4 + Math.random() * 3, // Very slow, varying duration
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2.5 + (pairIndex * 0.25) + Math.random() // Start swaying after entrance
    });
    treeTweens.push(swayTween);
  });
  
  if (animatedAsset.value) {
    tl.fromTo(
      animatedAsset.value,
      { y: 150, opacity: 0 },
      { y: 0, opacity: 1, duration: 2.5, ease: 'power2.out' }, // Slowed down from 1.5
      "treesStart"
    );
  }

  // Text animation (appears last)
  if (heroContent.value) {
    tl.fromTo(
      heroContent.value,
      { y: 150, opacity: 0 },
      { y: 0, opacity: 1, duration: 2.5, ease: 'power2.out' },
      "treesStart+=1.5" // Starts 1.5s after the trees/fence begin
    );
  }

  // Cloud animations (simple drifting back and forth)
  if (cloud1.value) {
    const t1 = gsap.to(cloud1.value, {
      x: 100,
      duration: 30,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
    cloudTweens.push(t1);
  }

  if (cloud2.value) {
    const t2 = gsap.to(cloud2.value, {
      x: -120, // Move left
      duration: 35,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
    cloudTweens.push(t2);
  }

  if (cloud3.value) {
    const t3 = gsap.to(cloud3.value, {
      x: 80,
      duration: 25,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
    cloudTweens.push(t3);
  }
});

onBeforeUnmount(() => {
  if (entranceTimeline) entranceTimeline.kill();
  cloudTweens.forEach((t) => t.kill());
  treeTweens.forEach((t) => t.kill());
});
</script>
