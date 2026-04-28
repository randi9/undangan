<template>
  <div
    :class="[
      'fixed inset-0 z-50 flex flex-col overflow-hidden w-full h-[100dvh] transition-all duration-[1200ms] ease-in-out',
      isClosing ? '-translate-y-full opacity-0 pointer-events-none' : 'opacity-100',
    ]"
  >
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden flex justify-center">
      <img
        src="https://media.mengundanganda.com/floral/cover%20section/randidewi_7f11acf7-704a-4a8d-a243-8edc44457a9b.webp"
        alt="Cover Background"
        class="h-full w-auto object-cover min-w-full max-w-none"
      />
      <div class="absolute inset-0 backdrop-blur-[2px]"></div>
    </div>

    <!-- ========================================== -->
    <!-- DEKORASI BUNGA (Bisa diotak-atik posisinya)  -->
    <!-- ========================================== -->
    <div class="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
      <!-- ================== DAUN ATAS KANAN ================== -->
      <img
        ref="topLeaf1"
        src="https://media.mengundanganda.com/floral/cover%20section/randidewi_8e2288a1-f494-4b52-9b12-49332ee50643.webp"
        style="position: absolute; top: -10px; right: -10px; width: 200px; transform: rotate(0deg); opacity: 0; z-index: 5; transform-origin: top center;"
        alt="Daun Top Right"
      />

      <img
        ref="topLeaf2"
        src="https://media.mengundanganda.com/floral/cover%20section/randidewi_8e2288a1-f494-4b52-9b12-49332ee50643.webp"
        style="position: absolute; top: -30px; right: -100px; width: 200px; transform: rotate(0deg); opacity: 0; z-index: 5; transform-origin: top center;"
        alt="Daun Top Right"
      />

      <img
        ref="topLeaf3"
        src="https://media.mengundanganda.com/floral/cover%20section/randidewi_8e2288a1-f494-4b52-9b12-49332ee50643.webp"
        style="position: absolute; top: -50px; right: -10px; width: 150px; transform: rotate(0deg); opacity: 0; z-index: 5; transform-origin: top center;"
        alt="Daun Top Right"
      />

      <img
        ref="topLeaf4"
        src="https://media.mengundanganda.com/floral/cover%20section/randidewi_8e2288a1-f494-4b52-9b12-49332ee50643.webp"
        style="position: absolute; top: -50px; right: 100px; width: 150px; transform: rotate(0deg); opacity: 0; z-index: 5; transform-origin: top center;"
        alt="Daun Top Right"
      />

      <img
        ref="topLeaf5"
        src="https://media.mengundanganda.com/floral/cover%20section/randidewi_8e2288a1-f494-4b52-9b12-49332ee50643.webp"
        style="position: absolute; top: -200px; right: 10px; width: 300px; transform: rotate(0deg); opacity: 0; z-index: 5; transform-origin: top center;"
        alt="Daun Top Right"
      />

      <img
        ref="topLeaf6"
        src="https://media.mengundanganda.com/floral/cover%20section/randidewi_8e2288a1-f494-4b52-9b12-49332ee50643.webp"
        style="position: absolute; top: -150px; right: -50px; width: 300px; transform: rotate(0deg); opacity: 0; z-index: 5; transform-origin: top center;"
        alt="Daun Top Right"
      />

      <!-- ================== KIRI ================== -->
      
      <!-- Bunga 1 -->
      <img
        ref="flower1L"
        src="https://media.mengundanganda.com/floral/cover%20section/flower/randidewi_254b0ba6-8e49-429e-bdf1-05cc2598317f.webp"
        style="position: absolute; bottom: -80px; left: -5px; width: 100px; transform: rotate(0deg); opacity: 0; z-index: 5; transform-origin: bottom center;"
        alt="Bunga 1 L"
      />

      <!-- Bunga 2 -->
      <img
        ref="flower2L"
        src="https://media.mengundanganda.com/floral/cover%20section/flower/randidewi_32f87c32-f5dd-424b-a6ec-69fcc5f918d4.webp"
        style="position: absolute; bottom: -50px; left: -50px; width: 85px; transform: rotate(15deg); opacity: 0; z-index: 4; transform-origin: bottom center;"
        alt="Bunga 2 L"
      />

      <!-- Bunga 5 -->
      <img
        ref="flower5L"
        src="https://media.mengundanganda.com/floral/cover%20section/flower/randidewi_e09f15fa-536e-47e9-9650-55a812c9e560.webp"
        style="position: absolute; bottom: -100px; left: -20px; width: 130px; transform: rotate(5deg); opacity: 0; z-index: 3; transform-origin: bottom center;"
        alt="Bunga 5 L"
      />
      <!-- Bunga 3 -->
      <img
        ref="flower3L"
        src="https://media.mengundanganda.com/floral/cover%20section/flower/randidewi_3c16b77d-3a6b-4239-8e9e-68a976fd8c71.webp"
        style="position: absolute; bottom: 40px; left: -10px; width: 80px; transform: rotate(-10deg); opacity: 0; z-index: 2; transform-origin: bottom center;"
        alt="Bunga 3 L"
      />
      <!-- Bunga 4 -->
      <img
        ref="flower4L"
        src="https://media.mengundanganda.com/floral/cover%20section/flower/randidewi_ec4bf919-6310-40d6-9313-b276df6d2a7b.webp"
        style="position: absolute; bottom: 60px; left: 20px; width: 70px; transform: rotate(25deg); opacity: 0; z-index: 1; transform-origin: bottom center;"
        alt="Bunga 4 L"
      />
      
      <!-- ================== KANAN ================== -->
      
      <!-- Bunga 1 Kanan -->
      <img
        ref="flower1R"
        src="https://media.mengundanganda.com/floral/cover%20section/flower/randidewi_254b0ba6-8e49-429e-bdf1-05cc2598317f.webp"
        style="position: absolute; bottom: -80px; right: -5px; width: 100px; transform: scaleX(-1) rotate(0deg); opacity: 0; z-index: 5; transform-origin: bottom center;"
        alt="Bunga 1 R"
      />

      <!-- Bunga 2 Kanan -->
      <img
        ref="flower2R"
        src="https://media.mengundanganda.com/floral/cover%20section/flower/randidewi_32f87c32-f5dd-424b-a6ec-69fcc5f918d4.webp"
        style="position: absolute; bottom: -50px; right: -50px; width: 85px; transform: scaleX(-1) rotate(15deg); opacity: 0; z-index: 4; transform-origin: bottom center;"
        alt="Bunga 2 R"
      />

      <!-- Bunga 5 Kanan -->
      <img
        ref="flower5R"
        src="https://media.mengundanganda.com/floral/cover%20section/flower/randidewi_e09f15fa-536e-47e9-9650-55a812c9e560.webp"
        style="position: absolute; bottom: -100px; right: -20px; width: 130px; transform: scaleX(-1) rotate(5deg); opacity: 0; z-index: 3; transform-origin: bottom center;"
        alt="Bunga 5 R"
      />
      <!-- Bunga 3 Kanan -->
      <img
        ref="flower3R"
        src="https://media.mengundanganda.com/floral/cover%20section/flower/randidewi_3c16b77d-3a6b-4239-8e9e-68a976fd8c71.webp"
        style="position: absolute; bottom: 40px; right: -10px; width: 80px; transform: scaleX(-1) rotate(-10deg); opacity: 0; z-index: 2; transform-origin: bottom center;"
        alt="Bunga 3 R"
      />
      <!-- Bunga 4 Kanan -->
      <img
        ref="flower4R"
        src="https://media.mengundanganda.com/floral/cover%20section/flower/randidewi_ec4bf919-6310-40d6-9313-b276df6d2a7b.webp"
        style="position: absolute; bottom: 60px; right: 20px; width: 70px; transform: scaleX(-1) rotate(25deg); opacity: 0; z-index: 1; transform-origin: bottom center;"
        alt="Bunga 4 R"
      />

    </div>
    <!-- ========================================== -->


    <div class="absolute z-10 inset-0 flex items-center justify-center px-6">
      <div
        class="
          w-full h-full
          bg-white/20
          flex flex-col items-center justify-center text-center text-white gap-4 md:gap-6 py-6
        "
      >
        <h1
          class="text-[60px] md:text-[80px] lg:text-[100px] leading-[1.1] drop-shadow-md"
          :style="{ fontFamily: fontHeading }"
        >
          {{ groomName }}
          <span class="block text-[40px] md:text-[50px] lg:text-[60px] text-white/70 my-1 md:my-2">&amp;</span>
          {{ brideName }}
        </h1>

        <!-- Custom Frame Image with Rounded Photo (Exactly Centered) -->
        <div
          v-if="coverImage && !coverImage.includes('randidewi_28658')"
          style="
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 220px;
            height: 280px;
            margin-top: -10px;
          "
        >
          <!-- Frame Image (z-index 10) -->
          <img
            src="https://media.mengundanganda.com/floral/cover%20section/randidewi_a38a2800-a6a7-469a-8230-73e0237887d4.png"
            style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 100%;
              height: 100%;
              object-fit: contain;
              z-index: 10;
              pointer-events: none;
            "
            alt="Floral Frame"
          />
          
          <!-- Cover Image (z-index 20) -->
          <div style="z-index: 20; position: relative;">
            <img
              :src="coverImage"
              style="
                display: block;
                width: 196px;
                height: 256px;
                object-fit: cover;
              "
              alt="Cover Photo"
            />
          </div>
        </div>

        <div class="w-full max-w-[240px] md:max-w-[360px] lg:max-w-[420px] h-fit flex flex-col items-center gap-2 md:gap-4 mt-2">
          <div class="flex items-center justify-center gap-3 mb-3 md:mb-5">
            <div class="h-px w-8 md:w-12 bg-white/40"></div>
            <MailOpen class="w-4 md:w-5 h-4 md:h-5 text-white/70" />
            <div class="h-px w-8 md:w-12 bg-white/40"></div>
          </div>

          <p class="text-[15px] md:text-[18px] uppercase tracking-[0.2em] text-white/70 font-medium ">Kepada Yth.</p>
          <h3 class="text-base md:text-xl lg:text-2xl font-semibold tracking-wide text-white break-words mb-6 md:mb-10 mt-2 md:mt-4">{{ guestName || 'Tamu Undangan' }}</h3>

          <button
            ref="stampRef"
            @click="bukaAmplop"
            class="
              w-16 md:w-20 h-16 md:h-20 rounded-full flex-shrink-0
              flex flex-col items-center justify-center gap-1
              bg-white/20 backdrop-blur-xl border border-white/40
              text-white hover:bg-white/30
              transition-colors duration-300 active:scale-95
              shadow-[0_4px_20px_rgba(0,0,0,0.2)]
            "
          >
            <Mail class="w-6 md:w-8 h-6 md:h-8" />
            <span class="text-[8px] md:text-[10px] tracking-widest uppercase font-semibold">Buka</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Mail, MailOpen } from 'lucide-vue-next';
import { gsap } from 'gsap';

defineProps<{
  groomName: string;
  brideName: string;
  guestName: string;
  isClosing: boolean;
  fontHeading?: string;
  fontBody?: string;
  coverImage: string;
}>();

const emit = defineEmits<{
  (e: 'open'): void;
}>();

const stampRef = ref(null);

const flower1L = ref(null);
const flower2L = ref(null);
const flower3L = ref(null);
const flower4L = ref(null);
const flower5L = ref(null);

const flower1R = ref(null);
const flower2R = ref(null);
const flower3R = ref(null);
const flower4R = ref(null);
const flower5R = ref(null);

const topLeaf1 = ref(null);
const topLeaf2 = ref(null);
const topLeaf3 = ref(null);
const topLeaf4 = ref(null);
const topLeaf5 = ref(null);
const topLeaf6 = ref(null);

onMounted(() => {
  // Entrance animation for flowers (muncul dari bawah)
  // avoiding 'scale' property so we don't accidentally overwrite 'scaleX(-1)' on the right side
  
  const tl = gsap.timeline({ delay: 0.3 });
  
  const flowerPairs = [
    [flower1L.value, flower1R.value],
    [flower2L.value, flower2R.value],
    [flower5L.value, flower5R.value],
    [flower3L.value, flower3R.value],
    [flower4L.value, flower4R.value]
  ];

  flowerPairs.forEach((pair, index) => {
    // 1. Entrance: move up and fade in
    tl.fromTo(pair,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      index * 0.2
    );

    // 2. Sway animation: starts sequentially after entrance
    tl.add(() => {
      const swayAngle = 4 + Math.random() * 1; 
      const swayDuration = 2 + Math.random() * 1.5;
      
      // Kiri
      if (pair[0]) {
        gsap.to(pair[0], {
          rotation: `+=${swayAngle}`,
          duration: swayDuration,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
      }

      // Kanan (karena pakai scaleX(-1), rotasinya harus minus agar searah dengan kiri)
      if (pair[1]) {
        gsap.to(pair[1], {
          rotation: `-=${swayAngle}`,
          duration: swayDuration,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
      }
    }, "-=0.2");
  });

  // Entrance and balanced sway for top leaves
  const topLeaves = [
    topLeaf1.value, topLeaf2.value, topLeaf3.value, 
    topLeaf4.value, topLeaf5.value, topLeaf6.value
  ];

  topLeaves.forEach((leaf) => {
    // Random delay for each leaf to appear randomly
    const randomDelay = Math.random() * 1.5;

    gsap.fromTo(leaf,
      { y: -30, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 1, delay: randomDelay, ease: "power2.out",
        onComplete: () => {
          // Normal balanced sway animation
          const swayAngle = 2 + Math.random() * 4; 
          const swayDuration = 2.5 + Math.random() * 1.5;
          
          gsap.to(leaf, {
            rotation: `+=${swayAngle}`,
            duration: swayDuration,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
          });
        }
      }
    );
  });
});

const bukaAmplop = () => {

  gsap.to(stampRef.value, {
    scale: 1.5,
    opacity: 0,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      emit('open');
    }
  });
};
</script>