<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
    <!-- SCENE WRAPPER FOR ZOOM -->
    <div ref="sceneWrapper" class="absolute inset-0 z-0 origin-bottom pointer-events-none will-change-transform">
      <!-- Background — full cover -->
      <div class="absolute inset-0 overflow-hidden">
        <img
          src="https://media.mengundanganda.fun/tema%20floral/6fbdb9f8-603e-4e50-a194-5027e82ba992.webp"
          alt="Cover Background"
          class="min-w-full min-h-full w-full h-full object-cover object-bottom"
        />
      </div>

      <!-- RIGHT FLOWERS LAYER -->
      <img v-for="(f, i) in flowersList" :key="'r'+i"
           :src="f.url" :class="['absolute pointer-events-none will-change-transform', f.w, f.posR]"
           :style="{ transformOrigin: f.originR, zIndex: f.z }"
           :ref="el => { if (el) rightFlowers[i] = el as HTMLImageElement }" alt="" />

      <!-- LEFT FLOWERS LAYER (MIRRORED) -->
      <img v-for="(f, i) in flowersList" :key="'l'+i"
           :src="f.url" :class="['absolute pointer-events-none will-change-transform', f.w, f.posL]"
           :style="{ transformOrigin: f.originL, zIndex: f.z }"
           :ref="el => { if (el) leftFlowers[i] = el as HTMLImageElement }" alt="" />
    </div>

    <!-- Intro Text (Inside Arch) -->
    <div ref="archText" class="absolute inset-0 z-[5] flex items-center justify-center px-6 pointer-events-none pb-[20vh]">
      <h2 class="text-sm md:text-base lg:text-lg tracking-[0.2em] font-semibold text-[#3d4a40] text-center uppercase">
        <div class="block">
          <span v-for="(char, i) in 'STEP INTO OUR'.split('')" :key="'l1'+i" class="char-anim inline-block whitespace-pre">{{ char }}</span>
        </div>
        <div class="block mt-2">
          <span v-for="(char, i) in 'BEAUTIFUL BEGINNING...'.split('')" :key="'l2'+i" class="char-anim inline-block whitespace-pre">{{ char }}</span>
        </div>
      </h2>
    </div>

    <!-- Falling Petals Container -->
    <div ref="petalsContainer" class="absolute inset-0 z-[25] pointer-events-none overflow-hidden"></div>

    <!-- Content Slot (names, date — from parent) -->
    <div ref="heroContent" class="relative z-10 w-full max-w-2xl mx-auto py-20 flex justify-center text-white opacity-0 translate-y-8">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

defineProps<{
  overlayGradient: string;
}>();

const sceneWrapper = ref<HTMLDivElement | null>(null);
const archText = ref<HTMLDivElement | null>(null);
const heroContent = ref<HTMLDivElement | null>(null);
const petalsContainer = ref<HTMLDivElement | null>(null);

// Flower bottom assets layer by layer (from back to front)
const flowersList = [
  // 1. Grass (Far Back)
  { url: 'https://media.mengundanganda.fun/tema%20floral/4862353c-2015-49cd-83e1-3567b88caa21.webp', z: 9, w: 'w-[50vw] md:w-[35vw]', 
    posR: '-right-4 md:-right-8 -bottom-4', posL: '-left-4 md:-left-8 -bottom-4', 
    originR: 'bottom center', originL: 'bottom center', sway: 5, dur: 4.2 },
  // 2. Lily Bud
  { url: 'https://media.mengundanganda.fun/tema%20floral/9f3dbc82-c549-4f19-9eb0-bef851f6c4c8.webp', z: 10, w: 'w-[33vw] md:w-[15vw]', 
    posR: '-right-[3%] md:right-[8%] bottom-4', posL: '-left-[3%] md:left-[8%] bottom-4', 
    originR: 'bottom center', originL: 'bottom center', sway: 8, dur: 6 },
  // 3. Calla Lily
  { url: 'https://media.mengundanganda.fun/tema%20floral/8d5b9f60-bb1b-4ef3-a986-1626a0581f5e.webp', z: 12, w: 'w-[30vw] md:w-[24vw]', 
    posR: 'right-[5%] md:right-[18%] -bottom-2', posL: 'left-[15%] md:left-[18%] -bottom-2', 
    originR: 'bottom center', originL: 'bottom center', sway: 7, dur: 4.4 },
  // 4. Back Clusters
  { url: 'https://media.mengundanganda.fun/tema%20floral/07fcad59-d8b0-4e51-b48f-47fdb4242c0b.webp', z: 11, w: 'w-[35vw] md:w-[26vw]', 
    posR: 'right-[10%] md:right-[15%] -bottom-5', posL: 'left-[10%] md:left-[15%] -bottom-5', 
    originR: 'bottom center', originL: 'bottom center', sway: 5, dur: 4.8 },
  // 5. White Flowers (Edge)
  { url: 'https://media.mengundanganda.fun/tema%20floral/4d2f8810-a681-4267-b35a-155e887dd790.webp', z: 13, w: 'w-[30vw] md:w-[40vw]', 
    posR: '-right-6 md:-right-10 -bottom-6', posL: '-left-6 md:-left-10 -bottom-6', 
    originR: 'bottom center', originL: 'bottom center', sway: 8, dur: 5.5 },
  // 6. Main Rose
  { url: 'https://media.mengundanganda.fun/tema%20floral/85b4ed96-bfa7-4952-9b27-139f446a94b3.webp', z: 14, w: 'w-[35vw] md:w-[30vw]', 
    posR: 'right-[10%] md:right-[18%] -bottom-16', posL: 'left-[10%] md:left-[18%] -bottom-16', 
    originR: 'bottom center', originL: 'bottom center', sway: 6, dur: 4.6 },
  // 7. Pink Tulip (Front)
  { url: 'https://media.mengundanganda.fun/tema%20floral/1d810e5c-94dc-4a24-8faf-20af72ba2417.webp', z: 15, w: 'w-[35vw] md:w-[35vw]', 
    posR: 'right-[23%] md:right-[32%] -bottom-15', posL: 'left-[23%] md:left-[32%] -bottom-15', 
    originR: 'bottom center', originL: 'bottom center', sway: 2, dur: 5 },
];

const rightFlowers = ref<HTMLImageElement[]>([]);
const leftFlowers = ref<HTMLImageElement[]>([]);

const petalImages = [
  'https://media.mengundanganda.fun/tema%20floral/c3afb699-1d69-47f7-821c-a42030035cab.webp'
];

let activeAnimations: gsap.core.Tween[] = [];
let spawnTimer: gsap.core.Tween | null = null;
let initialTimers: gsap.core.Tween[] = [];
let flowerSwayTimers: gsap.core.Tween[] = [];
let entranceTimeline: gsap.core.Timeline | null = null;

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function spawnPetal() {
  const container = petalsContainer.value;
  if (!container) return;

  const img = document.createElement('img');
  img.src = petalImages[0] || '';
  img.alt = '';
  img.style.position = 'absolute';
  img.style.pointerEvents = 'none';
  img.style.willChange = 'transform, opacity';

  // Random size for variety
  const size = randomRange(10, 20);
  img.style.width = `${size}px`;
  img.style.height = 'auto';

  // Start well above the viewport with a random X position
  const startX = randomRange(-10, 100); 
  img.style.left = `${startX}%`;
  img.style.top = `-50px`;

  // Random initial rotation & random static opacity
  img.style.transform = `rotate(${randomRange(0, 180)}deg)`;
  img.style.opacity = String(randomRange(1, 1)); // Opacity stays constant so it doesn't fade weirdly

  container.appendChild(img);

  const containerHeight = container.offsetHeight || window.innerHeight;
  const fallDuration = randomRange(10, 18); // very slow and peaceful fall

  // 1. Independent Main Fall (Y-Axis)
  const masterTween = gsap.to(img, {
    y: containerHeight + 100, 
    duration: fallDuration,
    ease: 'none',
    onComplete: () => {
      // Kill all tweens associated with this element to prevent memory leaks
      gsap.killTweensOf(img);
      img.remove();
      const idx = activeAnimations.indexOf(masterTween);
      if (idx > -1) activeAnimations.splice(idx, 1);
    },
  });

  // 2. Organic Horizontal Drift (Sway X)
  const driftX = randomRange(50, 150) * (Math.random() > 0.5 ? 1 : -1);
  gsap.to(img, {
    x: `+=${driftX}`,
    duration: randomRange(2.5, 4.5), // Independent duration from fall
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  });

  // 3. Gentle 2D Rocking (Rotation)
  gsap.to(img, {
    rotation: `+=${randomRange(15, 35) * (Math.random() > 0.5 ? 1 : -1)}`, // Just rock back and forth 15-35 degrees
    duration: randomRange(2, 4),
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  });

  activeAnimations.push(masterTween);
}

function startSpawningLoop() {
  spawnPetal();
  // Schedule next petal -> GSAP's delayedCall automatically pauses when the tab is inactive!
  spawnTimer = gsap.delayedCall(randomRange(0.6, 1.2), startSpawningLoop);
}

onMounted(() => {
// === START BOTTOM FLOWERS ANIMATION ===
  flowersList.forEach((f, i) => {
    // Buat satu angka acak unik untuk jenis bunga ini, 
    // biar bunga kiri dan kanan jenis ini mulainya persis berbarengan!
    const randomStart = Math.random(); 

    // Animate Right Side
    const rEl = rightFlowers.value[i];
    if (rEl) {
      // Swing fully from -sway to +sway for wider left/right swaying
      const tl = gsap.fromTo(rEl, 
        { rotation: -f.sway },
        {
          rotation: f.sway,
          duration: f.dur,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }
      );
      // Offset start time randomly so they don't move exactly together
      tl.progress(randomStart); 
      flowerSwayTimers.push(tl);
    }

    // Animate Left Side (Mirrored)
    const lEl = leftFlowers.value[i];
    if (lEl) {
      // Force GSAP to apply the flip correctly so it doesn't conflict with rotation
      gsap.set(lEl, { scaleX: -1 }); 
      
      // Kunci untuk bikin gerakannya "wiper" (semua ke kiri bareng ditiup angin):
      // Karena dia di-flip (-1), kita balik rotasinya (+ ke - bukan - ke +)
      const tl2 = gsap.fromTo(lEl, 
        { rotation: f.sway },
        {
          rotation: -f.sway,
          duration: f.dur,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }
      );
      tl2.progress(randomStart); 
      flowerSwayTimers.push(tl2);
    }
  });

  // === START ENTRANCE TIMELINE ===
  const tl = gsap.timeline();
  entranceTimeline = tl;

  // Set Initial States (Zoomed in on the bottom center)
  gsap.set(sceneWrapper.value, { scale: 1.85, transformOrigin: 'center bottom' }); 
  gsap.set(petalsContainer.value, { opacity: 0 }); // Hidden until zoom out

  // Character initial states (invisible, NO shifting down so it looks like typing)
  gsap.set('.char-anim', { opacity: 0 });

  // Play Sequence
  tl.to('.char-anim', { opacity: 1, duration: 0.01, stagger: 0.06, ease: 'none', delay: 1.5 })
    .to(archText.value, { opacity: 1, duration: 1.5 }) // Hold text
    .to(archText.value, { opacity: 0, duration: 1.0 }) // Fade out text
    .to(sceneWrapper.value, { scale: 1.0, duration: 2.5, ease: 'power2.inOut' }) // Zoom out Scene (Background + Flowers)
    .addLabel("zoomEnd")
    .to(petalsContainer.value, { 
      opacity: 1, 
      duration: 1, 
      onStart: () => {
        // Start petal spawning right after zoom out completes
        for (let i = 0; i < 8; i++) {
          initialTimers.push(gsap.delayedCall(i * 0.4, spawnPetal));
        }
        spawnTimer = gsap.delayedCall(3.2, startSpawningLoop);
      }
    }, "zoomEnd-=0.5")
    // Wait ~1.5 seconds after zoom out, then reveal hero content (names/glassmorphism oval)
    .to(heroContent.value, { opacity: 1, y: 0, duration: 1.8, ease: 'power3.out' }, "zoomEnd+=1.5");
});

onBeforeUnmount(() => {
  if (spawnTimer) spawnTimer.kill();
  initialTimers.forEach(t => t.kill());
  flowerSwayTimers.forEach(t => t.kill());
  if (entranceTimeline) entranceTimeline.kill();
  activeAnimations.forEach(tween => tween.kill());
  activeAnimations = [];
});
</script>
