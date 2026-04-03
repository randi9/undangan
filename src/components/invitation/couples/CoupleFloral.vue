<template>
  <section id="couple-section" class="max-w-5xl mx-auto text-center relative z-10 overflow-visible pt-[60px] pb-[50px] px-[50px]" ref="sectionRef">
    <!-- Wavy Extender Layer overlapping Hero (height reduced to 40px) -->
    <div class="absolute top-0 left-0 w-full h-[40px] transform -translate-y-[99%] z-20 pointer-events-none" style="
      -webkit-mask-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 1440 60\' xmlns=\'http://www.w3.org/2000/svg\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0,60 C320,0 420,60 740,30 C1060,0 1120,60 1440,0 L1440,60 L0,60 Z\' fill=\'black\'/%3E%3C/svg%3E');
      mask-image: url('data:image/svg+xml,%3Csvg viewBox=\'0 0 1440 60\' xmlns=\'http://www.w3.org/2000/svg\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0,60 C320,0 420,60 740,30 C1060,0 1120,60 1440,0 L1440,60 L0,60 Z\' fill=\'black\'/%3E%3C/svg%3E');
      mask-size: 100% 100%;
    ">
      <!-- Base color mathing standard theme bg to hide straight lines underneath -->
      <div class="absolute inset-0" style="background-color: var(--theme-bg, #ffffff);"></div>
      <!-- Overlay matching the pink couple section -->
      <div class="absolute inset-0 bg-[#fbebeb]"></div>
      
      <!-- Seamless Damask Pattern Offset -->
      <svg class="absolute inset-0 w-full h-[40px] opacity-[0.1]">
        <defs>
          <!-- Using y="-5" seamlessly aligns this pattern with y="-45" below it since this is elevated by 40px -->
          <pattern id="damask-extender" x="-45" y="-5" width="180" height="180" patternUnits="userSpaceOnUse">
            <image href="https://media.mengundanganda.fun/fd166631-b96a-455b-9159-e0a9cfccc7b5.webp" x="30" y="30" width="120" height="120" />
            <image href="https://media.mengundanganda.fun/fd166631-b96a-455b-9159-e0a9cfccc7b5.webp" x="-60" y="-60" width="120" height="120" transform="rotate(180 0 0)" />
            <image href="https://media.mengundanganda.fun/fd166631-b96a-455b-9159-e0a9cfccc7b5.webp" x="120" y="-60" width="120" height="120" transform="rotate(180 180 0)" />
            <image href="https://media.mengundanganda.fun/fd166631-b96a-455b-9159-e0a9cfccc7b5.webp" x="-60" y="120" width="120" height="120" transform="rotate(180 0 180)" />
            <image href="https://media.mengundanganda.fun/fd166631-b96a-455b-9159-e0a9cfccc7b5.webp" x="120" y="120" width="120" height="120" transform="rotate(180 180 180)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#damask-extender)" />
      </svg>
    </div>

    <!-- MAIN BACKGROUND WRAPPER (Includes pink bg + damask) -->
    <!-- Extends 40px below the element to drape over CountdownFloral -->
    <div class="absolute top-0 left-0 w-full h-[calc(100%+40px)] z-[0] pointer-events-none" style="
      -webkit-mask-image: 
        linear-gradient(black, black),
        url('data:image/svg+xml,%3Csvg viewBox=\'0 0 1440 60\' xmlns=\'http://www.w3.org/2000/svg\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0,0 L1440,0 L1440,20 C1120,60 1060,0 740,30 C420,60 320,0 0,20 Z\' fill=\'black\'/%3E%3C/svg%3E');
      mask-image: 
        linear-gradient(black, black),
        url('data:image/svg+xml,%3Csvg viewBox=\'0 0 1440 60\' xmlns=\'http://www.w3.org/2000/svg\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0,0 L1440,0 L1440,20 C1120,60 1060,0 740,30 C420,60 320,0 0,20 Z\' fill=\'black\'/%3E%3C/svg%3E');
      -webkit-mask-size: 100% calc(100% - 39px), 100% 40px;
      mask-size: 100% calc(100% - 39px), 100% 40px;
      -webkit-mask-position: top left, bottom left;
      mask-position: top left, bottom left;
      -webkit-mask-repeat: no-repeat, no-repeat;
      mask-repeat: no-repeat, no-repeat;
    ">
      <div class="absolute inset-0 bg-[#fbebeb]"></div>
      
      <!-- Damask Background Overlay (Using SVG Pattern for precise spacing and flipping) -->
      <!-- Pattern is naturally seamless up to the extended height! -->
      <svg class="absolute inset-0 w-full h-full opacity-[0.1]">
        <defs>
          <pattern id="damask-flip" x="-45" y="-45" width="180" height="180" patternUnits="userSpaceOnUse">
            <image href="https://media.mengundanganda.fun/fd166631-b96a-455b-9159-e0a9cfccc7b5.webp" x="30" y="30" width="120" height="120" />
            <image href="https://media.mengundanganda.fun/fd166631-b96a-455b-9159-e0a9cfccc7b5.webp" x="-60" y="-60" width="120" height="120" transform="rotate(180 0 0)" />
            <image href="https://media.mengundanganda.fun/fd166631-b96a-455b-9159-e0a9cfccc7b5.webp" x="120" y="-60" width="120" height="120" transform="rotate(180 180 0)" />
            <image href="https://media.mengundanganda.fun/fd166631-b96a-455b-9159-e0a9cfccc7b5.webp" x="-60" y="120" width="120" height="120" transform="rotate(180 0 180)" />
            <image href="https://media.mengundanganda.fun/fd166631-b96a-455b-9159-e0a9cfccc7b5.webp" x="120" y="120" width="120" height="120" transform="rotate(180 180 180)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#damask-flip)" />
      </svg>
    </div>

    <!-- INNER CONTENT - Placed naturally above the absolute z-[0] background, keeping flowers safe from the CSS mask! -->
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; z-index: 10;">
      <!-- Ornament Atas (Inline CSS Murni) -->
      <img src="https://media.mengundanganda.fun/tema%20floral/couple%20section/82c51b8b-c9f4-4608-826d-4c116b501296.webp" style="width: 100%; max-width: 280px; opacity: 0.9; margin-top: -120px; margin-bottom: -125px;" alt="Ornament Top" />
      
      <!-- Judul -->
      <!-- Menggunakan clamp() untuk responsive sizing dari 50px - 60px -->
      <h2 style="font-size: clamp(50px, 8vw, 60px); font-weight: 600; color: var(--theme-primary); position: relative; z-index: 10; margin: 0; line-height: 1;" :style="{ fontFamily: themeConfig.fontHeading }">Mempelai</h2>
      
      <!-- Ornament Bawah (Flipped) -->
      <img src="https://media.mengundanganda.fun/tema%20floral/couple%20section/82c51b8b-c9f4-4608-826d-4c116b501296.webp" style="width: 100%; max-width: 280px; opacity: 0.9; margin-top: -125px; margin-bottom: -100px ;transform: scaleY(-1);" alt="Ornament Bottom" />
    </div>
    
    <div class="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8">
      <!-- Groom -->
      <div class="flex-1 flex flex-col items-center groom-section">
        <!-- Wrapper bingkai + daun -->
        <div class="relative" style="width: 280px; height: 280px; margin-top: 40px; margin-bottom: 60px;">
          <div class="absolute inset-0 groom-photo">
            <!-- Foto (Layer paling bawah) -->
            <div class="absolute inset-0 rounded-full overflow-hidden border-[6px] shadow-[0_10px_25px_rgba(0,0,0,0.15)] border-[#21552e]">
              <img v-if="invitation.groom_photo" :src="resolveAssetUrl(invitation.groom_photo, apiBase)" class="w-full h-full object-cover" alt="Groom" />
              <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400">👤</div>
            </div>

            <!-- Cincin CSS -->
            <div class="absolute inset-0 rounded-full border-[3px] border-[#21552e] opacity-60"></div>
          </div>
          
          <!-- Daun-daun Groom -->
          <img
            v-for="(leaf, i) in groomLeafItems"
            :key="'gl' + i"
            :src="leaf.src"
            class="absolute groom-leaf drop-shadow-md"
            :style="{
              width: leaf.size + 'px',
              left: leaf.left + 'px',
              top: leaf.top + 'px',
              transform: `rotate(${leaf.rotate}deg)${leaf.flip ? ' scaleX(-1)' : ''}`,
              transformOrigin: 'bottom center',
            }"
          />

          <!-- Bunga Bawah Groom -->
          <div class="absolute inset-0 z-10 pointer-events-none groom-flowers" style="transform-origin: bottom center;">
            <img :src="flower2" class="absolute drop-shadow-xl" style="width: 170px; bottom: -45px; left: -10px;" />
            <img :src="flower1" class="absolute drop-shadow-xl" style="width: 220px; bottom: -90px; right: 20px;" />
          </div>

          <!-- Kupu-Kupu Groom -->
          <div class="absolute bottom-[-15px] left-[35%] -translate-x-1/2 z-[30] w-12 md:w-16 h-12 md:h-16 pointer-events-none drop-shadow-md groom-butterfly" style="perspective: 800px; transform: rotate(15deg);">
            <div class="absolute inset-0" style="transform-style: preserve-3d;">
              <img :src="butterfly1" class="absolute left-[50%] top-0 h-[100%] w-auto max-w-none object-contain origin-left block groom-wing-r" />
            </div>
            <div class="absolute inset-0" style="transform: scaleX(-1); transform-style: preserve-3d;">
              <img :src="butterfly1" class="absolute left-[50%] top-0 h-[100%] w-auto max-w-none object-contain origin-left block groom-wing-l" />
            </div>
          </div>
        </div>
        <h3 class="text-2xl md:text-3xl font-bold mb-3 text-[var(--theme-primary)] groom-text" :style="{ fontFamily: themeConfig.fontHeading }">{{ invitation.groom_full_name || invitation.groom_name }}</h3>
        <p v-if="invitation.groom_father || invitation.groom_mother" class="text-sm md:text-base text-[var(--theme-text-light)] groom-text">
          <span class="text-xs font-light italic">Putra dari</span><br/>
          <span v-if="invitation.groom_father" class="text-md font-semibold">Bapak {{ invitation.groom_father }}</span>
          <span v-if="invitation.groom_father && invitation.groom_mother"> &amp; </span>
          <span v-if="invitation.groom_mother" class="text-md font-semibold">Ibu {{ invitation.groom_mother }}</span>
        </p>
      </div>
      
      <!-- Divider -->
      <div class="relative z-10 text-5xl md:text-7xl text-[var(--theme-primary)] opacity-100" :style="{ fontFamily: themeConfig.fontHeading }">&amp;</div>
      
      <!-- Bride -->
      <div class="flex-1 flex flex-col items-center bride-section">
        <!-- Wrapper bingkai + daun -->
        <div class="relative" style="width: 280px; height: 280px; margin-bottom: 60px;">
          <div class="absolute inset-0 bride-photo">
            <!-- Foto (Layer paling bawah) -->
            <div class="absolute inset-0 rounded-full overflow-hidden border-[6px] shadow-[0_10px_25px_rgba(0,0,0,0.15)] border-[#21552e]">
              <img v-if="invitation.bride_photo" :src="resolveAssetUrl(invitation.bride_photo, apiBase)" class="w-full h-full object-cover" alt="Bride" />
              <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400">👤</div>
            </div>

            <!-- Cincin CSS -->
            <div class="absolute inset-0 rounded-full border-[3px] border-[#21552e] opacity-60"></div>
          </div>
          
          <!-- Daun-daun Bride -->
          <img
            v-for="(leaf, i) in brideLeafItems"
            :key="'bl' + i"
            :src="leaf.src"
            class="absolute bride-leaf drop-shadow-md"
            :style="{
              width: leaf.size + 'px',
              left: leaf.left + 'px',
              top: leaf.top + 'px',
              transform: `rotate(${leaf.rotate}deg)${leaf.flip ? ' scaleX(-1)' : ''}`,
              transformOrigin: 'bottom center',
            }"
          />

          <!-- Bunga Bawah Bride (Di-flip karena posisi daun di kanan) -->
          <div class="absolute inset-0 z-10 pointer-events-none bride-flowers" style="transform-origin: bottom center; transform: scaleX(-1);">
             <img :src="flower2" class="absolute drop-shadow-xl" style="width: 170px; bottom: -45px; left: -10px;" />
            <img :src="flower1" class="absolute drop-shadow-xl" style="width: 220px; bottom: -90px; right: 20px;" />
          </div>

          <!-- Kupu-Kupu Bride -->
          <div class="absolute bottom-[-5px] left-[65%] -translate-x-1/2 z-[30] w-12 md:w-16 h-12 md:h-16 pointer-events-none drop-shadow-md bride-butterfly" style="perspective: 800px; transform: rotate(-20deg);">
            <div class="absolute inset-0" style="transform-style: preserve-3d;">
              <img :src="butterfly2" class="absolute left-[50%] top-0 h-[100%] w-auto max-w-none object-contain origin-left block bride-wing-r" />
            </div>
            <div class="absolute inset-0" style="transform: scaleX(-1); transform-style: preserve-3d;">
              <img :src="butterfly2" class="absolute left-[50%] top-0 h-[100%] w-auto max-w-none object-contain origin-left block bride-wing-l" />
            </div>
          </div>
        </div>
        <h3 class="text-2xl md:text-3xl font-bold mb-3 text-[var(--theme-primary)] bride-text" :style="{ fontFamily: themeConfig.fontHeading }">{{ invitation.bride_full_name || invitation.bride_name }}</h3>
        <p v-if="invitation.bride_father || invitation.bride_mother" class="text-sm md:text-base text-[var(--theme-text-light)] bride-text">
          <span class="text-xs font-light italic">Putri dari</span><br/>
          <span v-if="invitation.bride_father" class="text-md font-semibold">Bapak {{ invitation.bride_father }}</span>
          <span v-if="invitation.bride_father && invitation.bride_mother"> &amp; </span>
          <span v-if="invitation.bride_mother" class="text-md font-semibold">Ibu {{ invitation.bride_mother }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { resolveAssetUrl } from '@/utils/url';

defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
  apiBase: string;
}>();

const leaf1 = "https://media.mengundanganda.fun/tema%20floral/couple%20section/18c54d85-bbc7-4169-8b60-ce6f2cd7d500.webp";
const flower1 = "https://media.mengundanganda.fun/tema%20floral/couple%20section/cf584d49-6790-4bb8-971f-89cdc91c6e00.webp";
const flower2 = "https://media.mengundanganda.fun/tema%20floral/couple%20section/38c7b2f4-88da-4e1c-9457-5b84781baea5.webp";
const butterfly1 = "https://media.mengundanganda.fun/29d5acff-4f27-431b-9c56-3e96b0c83a8a.webp"; // Kupu-kupu Groom
const butterfly2 = "https://media.mengundanganda.fun/517b341e-b782-430a-b8ef-b9ec0b21bdb7.webp"; // Kupu-kupu Bride

// Radius lingkaran = 140px, center = 140,140
const R = 140;
const CX = 140;
const CY = 140;

interface LeafItem {
  src: string;
  left: number;
  top: number;
  rotate: number;
  size: number;
  flip: boolean;
}

function generateLeafItems(side: 'left' | 'right'): LeafItem[] {
  const items: LeafItem[] = [];
  const count = 16; // Dibanyakin dari 10 ke 16

  for (let i = 0; i < count; i++) {
    const progress = i / (count - 1);

    // Kiri: 100° (hampir tengah bawah) -> 260° (hampir tengah atas)
    // Kanan: 80° (hampir tengah bawah) -> -80°/280° (hampir tengah atas)
    const angleDeg = side === 'left' 
      ? 100 + progress * 160 
      : 80 - progress * 160;

    const angleRad = (angleDeg * Math.PI) / 180;

    const px = CX + R * Math.cos(angleRad);
    const py = CY + R * Math.sin(angleRad);

    const baseSize = 66 - progress * 38; // Base 66px di pangkal bawah, menyusut drastis ke 28px di pucuk atas
    
    // Tangent = arah rambat daun ke atas (kiri CCW, kanan CW)
    const tangent = side === 'left' ? angleDeg + 180 : angleDeg;

    // V-shape spread (makin ke atas makin terbuka rotasinya)
    const tilt = 26 + progress * 12; // Base 26, membesar di atas jadi 38

    let outerRot, innerRot;
    if (side === 'left') {
      outerRot = tangent - tilt; // Miring kiri (luar lingkaran)
      innerRot = tangent + tilt; // Miring kanan (dalam lingkaran)
    } else {
      outerRot = tangent + tilt; // Miring kanan (luar lingkaran)
      innerRot = tangent - tilt; // Miring kiri (dalam lingkaran)
    }

    // INNER Leaf (mengarah ke tengah bukaan V)
    items.push({
      src: leaf1,
      left: px - baseSize / 2,
      top: py - baseSize,
      rotate: innerRot,
      size: baseSize * (0.85 + Math.random() * 0.15),
      flip: side === 'left', // Di Groom di-flip, di Bride normal agar lengkungan simetris natural
    });

    // OUTER Leaf (mengarah keluar)
    items.push({
      src: leaf1,
      left: px - baseSize / 2,
      top: py - baseSize,
      rotate: outerRot,
      size: baseSize * (0.9 + Math.random() * 0.15),
      flip: side === 'right', // Di Bride di-flip, di Groom normal agar lengkungan simetris natural
    });
  }

  return items;
}

const groomLeafItems = generateLeafItems('left');
const brideLeafItems = generateLeafItems('right');

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  
  // Animasi kepakan awal Groom saat terbang
  gsap.fromTo(['.groom-wing-r', '.groom-wing-l'], 
    { rotationY: 10 }, 
    { rotationY: 75, duration: 0.08, yoyo: true, repeat: -1, ease: "sine.inOut" }
  );
  // Animasi kepakan awal Bride saat terbang (tempo rotasi sedikit beda)
  gsap.fromTo(['.bride-wing-r', '.bride-wing-l'], 
    { rotationY: 10 }, 
    { rotationY: 75, duration: 0.06, yoyo: true, repeat: -1, ease: "power1.inOut" }
  );

  // Timeline Animasi Groom
  const tlGroom = gsap.timeline({
    scrollTrigger: {
      trigger: '.groom-section',
      start: 'top+=33% bottom',
    }
  });

  tlGroom.addLabel("start")
  .from('.groom-photo', {
    x: "-100vw",
    duration: 1.5,
    ease: 'power1.out',
  }, "start")
  .from('.groom-flowers', {
    scale: 0,
    opacity: 0,
    duration: 1.2,
    ease: 'back.out(1.3)',
  }, "start+=1.0")
  .from('.groom-butterfly', {
    x: -300, 
    y: 80, 
    rotation: 80, 
    opacity: 0,
    duration: 4, 
    ease: 'power1.out',
    onComplete: () => {
      gsap.killTweensOf(['.groom-wing-r', '.groom-wing-l']);
      gsap.fromTo(['.groom-wing-r', '.groom-wing-l'], 
        { rotationY: 10 }, 
        { rotationY: 70, duration: 0.8, yoyo: true, repeat: -1, ease: "sine.inOut" }
      );
    }
  }, "start+=1.2")
  .from('.groom-leaf', {
    scale: 0,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.3)',
    stagger: 0.05,
  }, "start+=1.4")
  .from('.groom-text', {
    x: "100vw",
    duration: 1.5,
    ease: 'power1.out',
    stagger: 0.2,
  }, "start");

  // Timeline Animasi Bride
  const tlBride = gsap.timeline({
    scrollTrigger: {
      trigger: '.bride-section',
      start: 'top+=33% bottom',
    }
  });

  tlBride.addLabel("start")
  .from('.bride-photo', {
    x: "100vw",
    duration: 1.5,
    ease: 'power1.out',
  }, "start")
  .from('.bride-flowers', {
    scale: 0,
    opacity: 0,
    duration: 1.2,
    ease: 'back.out(1.3)',
  }, "start+=1.0")
  .from('.bride-butterfly', {
    x: 280, 
    y: 40,
    rotation: -80, 
    opacity: 0,
    duration: 4.5, 
    ease: 'sine.out',
    onComplete: () => {
      gsap.killTweensOf(['.bride-wing-r', '.bride-wing-l']);
      gsap.fromTo(['.bride-wing-r', '.bride-wing-l'], 
        { rotationY: 10 }, 
        { rotationY: 70, duration: 1.1, yoyo: true, repeat: -1, ease: "power1.inOut" }
      );
    }
  }, "start+=1.0")
  .from('.bride-leaf', {
    scale: 0,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.3)',
    stagger: 0.05,
  }, "start+=1.4")
  .from('.bride-text', {
    x: "-100vw",
    duration: 1.5,
    ease: 'power1.out',
    stagger: 0.2,
  }, "start");
});
</script>

<style scoped>
</style>
