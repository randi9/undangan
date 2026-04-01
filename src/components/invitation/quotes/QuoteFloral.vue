<template>
  <section ref="sectionRef" v-if="quote" class="relative overflow-visible z-0 bg-[#ffdfd4]/20">
    
    <!-- Background Image -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <img
        src="https://media.mengundanganda.fun/tema%20floral/quotes%20section/6cd02fb2-7e3f-47a4-b2d6-9f3ea8a653be.webp"
        alt="Quotes Background"
        class="min-w-full min-h-full w-full h-full object-cover object-center scale-[1.15]"
      />
      <div class="absolute inset-0 bg-[#ffdfd4]/10 mix-blend-multiply"></div>
    </div>
    

    
    <!-- Flex Layout Layer -->
    <div class="relative w-full min-h-screen flex flex-col items-center justify-center py-12 md:py-24 px-6 text-center">
      
      <!-- Margin bottom palsu (250px) agar komposisi di tengah layar sempurna dan tidak akan menyentuh bagian Footer! -->
      <div class="relative w-[250px] md:w-[420px] lg:w-[480px] max-w-[80vw] aspect-[2/3] mx-auto z-10 flex items-center justify-center mb-[250px] md:mb-[350px]">
      
      <!-- Top Corner Flowers (Behind) -->
      <div class="absolute top-[5%] md:top-[8%] -left-[100px] md:-left-[160px] lg:-left-[200px] z-[5] scale-x-[-1]">
        <img ref="elTopFlowerL" src="https://media.mengundanganda.fun/tema%20floral/quotes%20section/779b40ba-3585-4cd0-b13c-52c7db3ed79f.webp" class="w-[200px] md:w-[260px] lg:w-[320px] origin-bottom object-contain opacity-0" />
      </div>
      <div class="absolute top-[5%] md:top-[8%] -right-[100px] md:-right-[160px] lg:-right-[200px] z-[5]">
        <img ref="elTopFlowerR" src="https://media.mengundanganda.fun/tema%20floral/quotes%20section/779b40ba-3585-4cd0-b13c-52c7db3ed79f.webp" class="w-[200px] md:w-[260px] lg:w-[320px] origin-bottom object-contain opacity-0" />
      </div>
      
      <!-- Kupu-Kupu (Hinggap di bunga kiri atas) -->
      <div ref="butterflyWrap" class="absolute top-[8%] md:top-[10%] -left-[30px] md:-left-[70px] lg:-left-[90px] z-[30] w-12 md:w-16 h-12 md:h-16 pointer-events-none opacity-0 drop-shadow-[0_5px_5px_rgba(0,0,0,0.15)]" style="perspective: 800px;">
        <!-- Wadah Sayap Kanan (Box utuh) -->
        <div class="absolute inset-0" style="transform-style: preserve-3d;">
          <img ref="wingR" src="https://media.mengundanganda.fun/tema%20floral/quotes%20section/4ae3ad21-d1a3-4894-9ca3-9168237469ba.webp" class="absolute left-[50%] top-0 h-[120%] w-auto max-w-none object-contain origin-left block" />
        </div>
        <!-- Wadah Sayap Kiri (Box utuh yang sama 100% hanya di-mirror, anti-menghilang dari awal!) -->
        <div class="absolute inset-0" style="transform: scaleX(-1); transform-style: preserve-3d;">
          <img ref="wingL" src="https://media.mengundanganda.fun/tema%20floral/quotes%20section/4ae3ad21-d1a3-4894-9ca3-9168237469ba.webp" class="absolute left-[50%] top-0 h-[120%] w-auto max-w-none object-contain origin-left block" />
        </div>
      </div>
      
      <!-- Top Leaves (Behind) -->
      <div class="absolute top-[40%] md:top-[35%] -left-20 md:-left-32 lg:-left-36 z-0 scale-x-[-1]">
        <img ref="elTopLeafL" src="https://media.mengundanganda.fun/tema%20floral/quotes%20section/c9a1f603-e986-409b-a60a-2321fa6c315f.webp" class="w-40 md:w-60 lg:w-72 origin-bottom object-contain opacity-0" />
      </div>
      <div class="absolute top-[40%] md:top-[35%] -right-20 md:-right-32 lg:-right-36 z-0">
        <img ref="elTopLeafR" src="https://media.mengundanganda.fun/tema%20floral/quotes%20section/c9a1f603-e986-409b-a60a-2321fa6c315f.webp" class="w-40 md:w-60 lg:w-72 origin-bottom object-contain opacity-0" />
      </div>

      <!-- Pink Lilies (Behind) -->
      <div class="absolute bottom-[10%] md:bottom-[15%] -left-20 md:-left-32 lg:-left-40 z-[5] scale-x-[-1]">
        <img ref="elLilyL" src="https://media.mengundanganda.fun/tema%20floral/quotes%20section/a2eac167-6565-4119-8f80-a630b7c4be8f.webp" class="w-[140px] md:w-[220px] lg:w-[260px] origin-bottom object-contain opacity-0" />
      </div>
      <div class="absolute bottom-[15%] md:bottom-[20%] -right-20 md:-right-32 lg:-right-40 z-[5]">
        <img ref="elLilyR" src="https://media.mengundanganda.fun/tema%20floral/quotes%20section/a2eac167-6565-4119-8f80-a630b7c4be8f.webp" class="w-[140px] md:w-[220px] lg:w-[260px] origin-bottom object-contain opacity-0" />
      </div>

      <!-- The Main Oval Container -->
      <div ref="elContainer" class="absolute inset-0 bg-white rounded-[125px] md:rounded-[210px] lg:rounded-[240px] shadow-[0_15px_40px_rgba(0,0,0,0.1)] opacity-0 z-10 flex items-center justify-center border border-white/60 p-6 md:p-10">
        <blockquote class="w-[70%] max-w-[200px] md:max-w-[300px] lg:max-w-[340px] mx-auto text-[10px] md:text-sm lg:text-base italic font-light text-center text-[var(--theme-secondary)] leading-loose md:leading-relaxed lg:leading-loose tracking-[0.1em] md:tracking-[0.15em] break-words">
           "{{ quote }}"
        </blockquote>
      </div>

      <!-- Slanted Flowers (Front) -->
      <div class="absolute -bottom-[7%] md:-bottom-[5%] -left-10 md:-left-16 lg:-left-20 z-[15] scale-x-[-1] drop-shadow-md">
        <!-- Base rotation adjustment to fix slant after mirror -->
        <img ref="elSlantedL" src="https://media.mengundanganda.fun/tema%20floral/quotes%20section/9d8274ec-db48-45ba-af73-f1ab2fe09a5b.webp" class="w-36 md:w-56 lg:w-64 origin-bottom object-contain opacity-0" style="transform: rotate(10deg)" />
      </div>
      <div class="absolute -bottom-[8%] md:-bottom-[6%] -right-16 md:-right-20 lg:-right-24 z-[15] drop-shadow-md">
        <img ref="elSlantedR" src="https://media.mengundanganda.fun/tema%20floral/quotes%20section/9d8274ec-db48-45ba-af73-f1ab2fe09a5b.webp" class="w-36 md:w-56 lg:w-64 origin-bottom object-contain opacity-0" style="transform: rotate(-10deg)" />
      </div>

      <!-- Center Flower (Front) -->
      <div class="absolute -bottom-24 md:-bottom-36 lg:-bottom-40 left-1/2 -translate-x-1/2 z-[20] drop-shadow-lg w-[240px] md:w-[380px] lg:w-[440px]">
        <img ref="elCenter" src="https://media.mengundanganda.fun/tema%20floral/quotes%20section/6d9799cc-d69c-4f9c-bbef-71910b1154a3.webp" class="w-full origin-bottom object-contain opacity-0" />
      </div>

      <!-- Hanging Flowers (Langsung di main container, tanpa wrapper terpisah) -->
      <!-- Bunga Gantung 1 (Kiri Luar) -->
      <img ref="elHang1" src="https://media.mengundanganda.fun/tema%20floral/quotes%20section/f70692c3-8e4e-41a5-a0ac-1c29ca9e5190.webp" class="absolute bottom-[-30%] md:bottom-[-30%] lg:bottom-[-30%] -left-[15%] md:-left-[15%] lg:-left-[15%] w-[150px] md:w-[250px] lg:w-[290px] origin-top object-contain opacity-0 z-[15] pointer-events-none drop-shadow-sm" />

      <!-- Bunga Gantung 2 (Kiri Dalam) -->
      <img ref="elHang2" src="https://media.mengundanganda.fun/tema%20floral/quotes%20section/ed906d03-4e79-406f-92cb-8e2ab5295fc0.webp" class="absolute bottom-[-45%] md:bottom-[-45%] lg:bottom-[-45%] left-[-5%] md:left-[2%] lg:left-[2%] w-[180px] md:w-[300px] lg:w-[350px] origin-top object-contain opacity-0 z-[15] pointer-events-none drop-shadow-sm" />

      <!-- Bunga Gantung 3 (Kanan Dalam) -->
      <img ref="elHang3" src="https://media.mengundanganda.fun/tema%20floral/quotes%20section/87409c71-6799-4d5c-bbf8-bfde4df717b6.webp" class="absolute bottom-[-50%] md:bottom-[-50%] lg:bottom-[-50%] -right-[5%] md:-right-[5%] lg:-right-[5%] w-[190px] md:w-[320px] lg:w-[360px] origin-top object-contain opacity-0 z-[15] pointer-events-none drop-shadow-sm" />
      
      <!-- Bunga Gantung 4 (Kanan Luar) -->
      <img ref="elHang4" src="https://media.mengundanganda.fun/tema%20floral/quotes%20section/ed906d03-4e79-406f-92cb-8e2ab5295fc0.webp" class="absolute bottom-[-35%] md:bottom-[-35%] lg:bottom-[-35%] -right-[20%] md:-right-[20%] lg:-right-[20%] w-[150px] md:w-[250px] lg:w-[290px] origin-top object-contain opacity-0 z-[15] pointer-events-none drop-shadow-sm" />

    </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  quote: string;
  themeConfig: ThemeConfig;
}>();

const sectionRef = ref<HTMLElement | null>(null);

const elContainer = ref(null);
const elTopLeafL = ref(null);
const elTopLeafR = ref(null);
const elTopFlowerL = ref(null);
const elTopFlowerR = ref(null);
const butterflyWrap = ref(null);
const wingR = ref(null);
const wingL = ref(null);
const elLilyL = ref(null);
const elLilyR = ref(null);
const elSlantedL = ref(null);
const elSlantedR = ref(null);
const elCenter = ref(null);
const elHang1 = ref(null);
const elHang2 = ref(null);
const elHang3 = ref(null);
const elHang4 = ref(null);


let tl: gsap.core.Timeline | null = null;
let swayAnimation: (gsap.core.Tween | gsap.core.Timeline)[] = [];

onMounted(() => {
  if (!sectionRef.value) return;

  const allElements = [
    elContainer.value,
    elCenter.value,
    elSlantedL.value, elSlantedR.value,
    elLilyL.value, elLilyR.value,
    elTopLeafL.value, elTopLeafR.value,
    elTopFlowerL.value, elTopFlowerR.value,
    butterflyWrap.value,
    elHang1.value, elHang2.value, elHang3.value, elHang4.value
  ].filter(Boolean);

  // Set initial states
  gsap.set(allElements, { opacity: 0, scale: 0.5 });
  gsap.set(butterflyWrap.value, { rotation: 15 }); // Butterfly sits rotated by 15deg natively



  tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 70%",
      toggleActions: "play none none none"
    },
    onComplete: startSwayAnimation
  });

  // 1. Container fade + scale
  tl.to(elContainer.value, {
    opacity: 1,
    scale: 1,
    duration: 1.2,
    ease: "back.out(1.2)"
  })
  // 2. Center flower
  .to(elCenter.value, {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.6")
  // 3. Slanted flowers
  .to([elSlantedL.value, elSlantedR.value], {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.6")
  // 4. Pink lilies
  .to([elLilyL.value, elLilyR.value], {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.6")
  // 5. Top leaves
  .to([elTopLeafL.value, elTopLeafR.value], {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.6")
  // 5.5 Top Flowers
  .to([elTopFlowerL.value, elTopFlowerR.value], {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.6")
  // 5.7 Butterfly
  .to(butterflyWrap.value, {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: "back.out(1.5)"
  }, "-=0.4")
  // 6. Hanging flowers
  .to([elHang1.value, elHang2.value, elHang3.value, elHang4.value], {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: "back.out(1.5)",
    stagger: 0.15
  }, "-=0.4");

  function startSwayAnimation() {
    // Continuous subtle wind sway animation
    swayAnimation = [
      gsap.to(elCenter.value, {
        rotation: 2, duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut"
      }),
      gsap.to([elSlantedL.value], {
        rotation: "+=4", duration: 3.5, yoyo: true, repeat: -1, ease: "sine.inOut"
      }),
      gsap.to([elSlantedR.value], {
        rotation: "-=4", duration: 3.8, yoyo: true, repeat: -1, ease: "sine.inOut"
      }),
      gsap.to([elLilyL.value, elLilyR.value], {
        rotation: 3, duration: 4.2, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.6
      }),
      gsap.to([elTopLeafL.value, elTopLeafR.value], {
        rotation: 5, duration: 4.5, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.4
      }),
      gsap.to([elTopFlowerL.value, elTopFlowerR.value], {
        rotation: 4, duration: 4.8, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.5
      }),
      // Pengaturan Sway (Ayunan Angin) untuk Hanging Flowers
      // Bunga 1 (Kiri Luar)
      gsap.to(elHang1.value, {
        rotation: 6, duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut"
      }),
      // Bunga 2 (Kiri Dalam) - Dibuat ayunan sedikit lebih lambat
      gsap.to(elHang2.value, {
        rotation: 5, duration: 3.6, yoyo: true, repeat: -1, ease: "sine.inOut"
      }),
      // Bunga 3 (Kanan Dalam)
      gsap.to(elHang3.value, {
        rotation: 7, duration: 3.0, yoyo: true, repeat: -1, ease: "sine.inOut"
      }),
      // Bunga 4 (Kanan Luar)
      gsap.to(elHang4.value, {
        rotation: 8, duration: 3.8, yoyo: true, repeat: -1, ease: "sine.inOut"
      })
    ];

    // --- BUTTERFLY FLIGHT LOGIC ---
    const setFlapSpeed = (speed: number) => {
      if (!wingR.value || !wingL.value) return;
      gsap.killTweensOf(wingR.value);
      gsap.killTweensOf(wingL.value);
      // rotationY: 10 = sedikit meregang ke bawah, 75 = mengepak menutup ke atas
      gsap.fromTo(wingR.value, { rotationY: 10 }, { rotationY: 75, duration: speed, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.fromTo(wingL.value, { rotationY: 10 }, { rotationY: 75, duration: speed, yoyo: true, repeat: -1, ease: "sine.inOut" });
    };

    setFlapSpeed(0.8); // Mode santai (diam di bunga) sedikit diperlambat

    if (butterflyWrap.value) {
      const flyTl = gsap.timeline({ repeat: -1, repeatDelay: 5 }); // Diam hinggap 5 detik sebelum terbang lagi

      flyTl.add(() => setFlapSpeed(0.08)) // Kepakan saat terbang dikurangi temponya agar tidak terlalu ngebut
        // Lepas landas ke kanan atas
        .to(butterflyWrap.value, { 
            x: 120, y: -250, rotation: 70, scale: 1.2,
            duration: 2.5, ease: "power1.out" 
        })
        // Meliuk di angkasa (atas tengah melengkung)
        .to(butterflyWrap.value, {
            x: 350, y: -200, rotation: 120, scale: 1.5,
            duration: 3.5, ease: "sine.inOut"
        })
        // Putar arah ke kiri perlahan sambil turun
        .to(butterflyWrap.value, {
            x: 250, y: -50, rotation: 220, scale: 1.2,
            duration: 2.5, ease: "sine.inOut"
        })
        // Menukik ke kiri bawah arah bunga asal
        .to(butterflyWrap.value, {
            x: 50, y: -20, rotation: 330, scale: 1.0,
            duration: 2.5, ease: "sine.inOut"
        })
        // Mendarat kembali pas ke titik 0, rotation 375 (360 + 15deg posisi awal) 
        .to(butterflyWrap.value, {
            x: 0, y: 0, rotation: 375,
            duration: 2.5, ease: "power2.out"
        })
        // Begitu landing, reset semuanya ke state awal yg tenang
        .add(() => {
           gsap.set(butterflyWrap.value, { rotation: 15 }); // reset rotasi murni
           setFlapSpeed(0.8); // Mode santai lagi
        });
      
      swayAnimation.push(flyTl); // Masukkan ke dalam pool sway buat di auto-kill saat unmount
    }
  }
});

onBeforeUnmount(() => {
  if (tl) tl.kill();
  swayAnimation.forEach(anim => anim.kill());
  if (wingR.value) gsap.killTweensOf(wingR.value);
  if (wingL.value) gsap.killTweensOf(wingL.value);
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>
