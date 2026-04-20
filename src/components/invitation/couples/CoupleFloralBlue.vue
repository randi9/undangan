<template>
  <section id="couple-section-fb" class="max-w-5xl mx-auto text-center relative z-10 overflow-visible pt-[60px] pb-[50px] px-[50px]" ref="sectionRef">
    <!-- Wavy Extender Layer -->
    <div class="absolute top-0 left-0 w-full h-[40px] transform -translate-y-[99%] z-20 pointer-events-none" style="
      -webkit-mask-image: url('data:image/svg+xml,%3Csvg viewBox=&apos;0 0 1440 60&apos; xmlns=&apos;http://www.w3.org/2000/svg&apos; preserveAspectRatio=&apos;none&apos;%3E%3Cpath d=&apos;M0,60 C320,0 420,60 740,30 C1060,0 1120,60 1440,0 L1440,60 L0,60 Z&apos; fill=&apos;black&apos;/%3E%3C/svg%3E');
      mask-image: url('data:image/svg+xml,%3Csvg viewBox=&apos;0 0 1440 60&apos; xmlns=&apos;http://www.w3.org/2000/svg&apos; preserveAspectRatio=&apos;none&apos;%3E%3Cpath d=&apos;M0,60 C320,0 420,60 740,30 C1060,0 1120,60 1440,0 L1440,60 L0,60 Z&apos; fill=&apos;black&apos;/%3E%3C/svg%3E');
      mask-size: 100% 100%;
    ">
      <div class="absolute inset-0" style="background-color: var(--theme-bg, #ffffff);"></div>
      <div class="absolute inset-0 bg-[#dce8f0]"></div>
      <svg class="absolute inset-0 w-full h-[40px] opacity-[0.1]">
        <defs>
          <pattern id="damask-ext-fb" x="-45" y="-5" width="180" height="180" patternUnits="userSpaceOnUse">
            <image href="https://media.mengundanganda.com/fd166631-b96a-455b-9159-e0a9cfccc7b5.webp" x="30" y="30" width="120" height="120" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#damask-ext-fb)" />
      </svg>
    </div>

    <!-- MAIN BACKGROUND WRAPPER -->
    <div class="absolute top-0 left-0 w-full h-[calc(100%+40px)] z-[0] pointer-events-none" style="
      -webkit-mask-image: linear-gradient(black, black), url('data:image/svg+xml,%3Csvg viewBox=&apos;0 0 1440 60&apos; xmlns=&apos;http://www.w3.org/2000/svg&apos; preserveAspectRatio=&apos;none&apos;%3E%3Cpath d=&apos;M0,0 L1440,0 L1440,20 C1120,60 1060,0 740,30 C420,60 320,0 0,20 Z&apos; fill=&apos;black&apos;/%3E%3C/svg%3E');
      mask-image: linear-gradient(black, black), url('data:image/svg+xml,%3Csvg viewBox=&apos;0 0 1440 60&apos; xmlns=&apos;http://www.w3.org/2000/svg&apos; preserveAspectRatio=&apos;none&apos;%3E%3Cpath d=&apos;M0,0 L1440,0 L1440,20 C1120,60 1060,0 740,30 C420,60 320,0 0,20 Z&apos; fill=&apos;black&apos;/%3E%3C/svg%3E');
      -webkit-mask-size: 100% calc(100% - 39px), 100% 40px;
      mask-size: 100% calc(100% - 39px), 100% 40px;
      -webkit-mask-position: top left, bottom left;
      mask-position: top left, bottom left;
      -webkit-mask-repeat: no-repeat, no-repeat;
      mask-repeat: no-repeat, no-repeat;
    ">
      <div class="absolute inset-0 bg-[#dce8f0]"></div>
      <svg class="absolute inset-0 w-full h-full opacity-[0.1]">
        <defs>
          <pattern id="damask-flip-fb" x="-45" y="-45" width="180" height="180" patternUnits="userSpaceOnUse">
            <image href="https://media.mengundanganda.com/fd166631-b96a-455b-9159-e0a9cfccc7b5.webp" x="30" y="30" width="120" height="120" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#damask-flip-fb)" />
      </svg>
    </div>

    <div class="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8">
      <!-- Groom -->
      <div class="flex-1 flex flex-col items-center fb-groom-section pt-4 md:pt-0">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; z-index: 10; margin-bottom: -10px;">
          <img src="https://media.mengundanganda.com/tema%20floral/couple%20section/82c51b8b-c9f4-4608-826d-4c116b501296.webp" style="width: 100%; max-width: 180px; opacity: 0.9; margin-top: -80px; margin-bottom: -80px; filter: hue-rotate(180deg) saturate(0.6) brightness(1.1);" alt="Ornament Top" />
          <h2 style="font-size: clamp(34px, 6vw, 44px); font-weight: 600; color: var(--theme-primary); position: relative; z-index: 10; margin: 0; line-height: 1;" :style="{ fontFamily: themeConfig.fontHeading }">The Groom</h2>
          <img src="https://media.mengundanganda.com/tema%20floral/couple%20section/82c51b8b-c9f4-4608-826d-4c116b501296.webp" style="width: 100%; max-width: 180px; opacity: 0.9; margin-top: -80px; margin-bottom: -60px; transform: scaleY(-1); filter: hue-rotate(180deg) saturate(0.6) brightness(1.1);" alt="Ornament Bottom" />
        </div>

        <div class="relative" style="width: 280px; height: 280px; margin-top: 10px; margin-bottom: 60px;">
          <div class="absolute inset-0 fb-groom-photo">
            <div class="absolute inset-0 rounded-full overflow-hidden border-[3px] shadow-[0_10px_25px_rgba(0,0,0,0.15)] border-[#2c5f82]">
              <img v-if="invitation.groom_photo" :src="resolveAssetUrl(invitation.groom_photo, apiBase)" class="w-full h-full object-cover" alt="Groom" />
              <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400">👤</div>
            </div>
            <div class="absolute inset-0 rounded-full border-[1px] border-[#2c5f82] opacity-60"></div>
          </div>
          
          <img v-for="(leaf, i) in groomLeafItems" :key="'gl' + i" :src="leaf.src" class="absolute fb-groom-leaf drop-shadow-md" :style="{ width: leaf.size + 'px', left: leaf.left + 'px', top: leaf.top + 'px', transform: `rotate(${leaf.rotate}deg)${leaf.flip ? ' scaleX(-1)' : ''}`, transformOrigin: 'bottom center', filter: 'hue-rotate(180deg) saturate(0.6) brightness(1.1)' }" />

          <div class="absolute inset-0 z-10 pointer-events-none fb-groom-flowers" style="transform-origin: bottom center;">
            <img :src="flower2" class="absolute drop-shadow-xl" style="width: 170px; bottom: -45px; left: -10px; filter: hue-rotate(180deg) saturate(0.6) brightness(1.1);" />
            <img :src="flower1" class="absolute drop-shadow-xl" style="width: 220px; bottom: -90px; right: 20px; filter: hue-rotate(180deg) saturate(0.6) brightness(1.1);" />
          </div>
        </div>
        <h3 class="text-2xl md:text-3xl font-bold mb-3 text-[var(--theme-primary)] fb-groom-text" :style="{ fontFamily: themeConfig.fontHeading }">{{ invitation.groom_full_name || invitation.groom_name }}</h3>
        <p v-if="invitation.groom_father || invitation.groom_mother" class="text-sm md:text-base text-[var(--theme-text-light)] fb-groom-text">
          <span class="text-xs font-light italic">Putra dari</span><br/>
          <span v-if="invitation.groom_father" class="text-md font-semibold">Bapak {{ invitation.groom_father }}</span>
          <span v-if="invitation.groom_father && invitation.groom_mother"> &amp; </span>
          <span v-if="invitation.groom_mother" class="text-md font-semibold">Ibu {{ invitation.groom_mother }}</span>
        </p>
      </div>
      
      <!-- Bride -->
      <div class="flex-1 flex flex-col items-center fb-bride-section mt-12 md:mt-0">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; z-index: 10; margin-bottom: -10px;">
          <img src="https://media.mengundanganda.com/tema%20floral/couple%20section/82c51b8b-c9f4-4608-826d-4c116b501296.webp" style="width: 100%; max-width: 180px; opacity: 0.9; margin-top: -80px; margin-bottom: -80px; filter: hue-rotate(180deg) saturate(0.6) brightness(1.1);" alt="Ornament Top" />
          <h2 style="font-size: clamp(34px, 6vw, 44px); font-weight: 600; color: var(--theme-primary); position: relative; z-index: 10; margin: 0; line-height: 1;" :style="{ fontFamily: themeConfig.fontHeading }">The Bride</h2>
          <img src="https://media.mengundanganda.com/tema%20floral/couple%20section/82c51b8b-c9f4-4608-826d-4c116b501296.webp" style="width: 100%; max-width: 180px; opacity: 0.9; margin-top: -80px; margin-bottom: -60px; transform: scaleY(-1); filter: hue-rotate(180deg) saturate(0.6) brightness(1.1);" alt="Ornament Bottom" />
        </div>

        <div class="relative" style="width: 280px; height: 280px; margin-top: 10px; margin-bottom: 60px;">
          <div class="absolute inset-0 fb-bride-photo">
            <div class="absolute inset-0 rounded-full overflow-hidden border-[3px] shadow-[0_10px_25px_rgba(0,0,0,0.15)] border-[#2c5f82]">
              <img v-if="invitation.bride_photo" :src="resolveAssetUrl(invitation.bride_photo, apiBase)" class="w-full h-full object-cover" alt="Bride" />
              <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400">👤</div>
            </div>
            <div class="absolute inset-0 rounded-full border-[1px] border-[#2c5f82] opacity-60"></div>
          </div>
          
          <img v-for="(leaf, i) in brideLeafItems" :key="'bl' + i" :src="leaf.src" class="absolute fb-bride-leaf drop-shadow-md" :style="{ width: leaf.size + 'px', left: leaf.left + 'px', top: leaf.top + 'px', transform: `rotate(${leaf.rotate}deg)${leaf.flip ? ' scaleX(-1)' : ''}`, transformOrigin: 'bottom center', filter: 'hue-rotate(180deg) saturate(0.6) brightness(1.1)' }" />

          <div class="absolute inset-0 z-10 pointer-events-none fb-bride-flowers" style="transform-origin: bottom center; transform: scaleX(-1);">
             <img :src="flower2" class="absolute drop-shadow-xl" style="width: 170px; bottom: -45px; left: -10px; filter: hue-rotate(180deg) saturate(0.6) brightness(1.1);" />
            <img :src="flower1" class="absolute drop-shadow-xl" style="width: 220px; bottom: -90px; right: 20px; filter: hue-rotate(180deg) saturate(0.6) brightness(1.1);" />
          </div>
        </div>
        <h3 class="text-2xl md:text-3xl font-bold mb-3 text-[var(--theme-primary)] fb-bride-text" :style="{ fontFamily: themeConfig.fontHeading }">{{ invitation.bride_full_name || invitation.bride_name }}</h3>
        <p v-if="invitation.bride_father || invitation.bride_mother" class="text-sm md:text-base text-[var(--theme-text-light)] fb-bride-text">
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

const leaf1 = "https://media.mengundanganda.com/tema%20floral/couple%20section/18c54d85-bbc7-4169-8b60-ce6f2cd7d500.webp";
const flower1 = "https://media.mengundanganda.com/tema%20floral/couple%20section/cf584d49-6790-4bb8-971f-89cdc91c6e00.webp";
const flower2 = "https://media.mengundanganda.com/tema%20floral/couple%20section/38c7b2f4-88da-4e1c-9457-5b84781baea5.webp";

const R = 140;
const CX = 140;
const CY = 140;

interface LeafItem { src: string; left: number; top: number; rotate: number; size: number; flip: boolean; }

function generateLeafItems(side: 'left' | 'right'): LeafItem[] {
  const items: LeafItem[] = [];
  const count = 16;
  for (let i = 0; i < count; i++) {
    const progress = i / (count - 1);
    const angleDeg = side === 'left' ? 100 + progress * 160 : 80 - progress * 160;
    const angleRad = (angleDeg * Math.PI) / 180;
    const px = CX + R * Math.cos(angleRad);
    const py = CY + R * Math.sin(angleRad);
    const baseSize = 66 - progress * 38;
    const tangent = side === 'left' ? angleDeg + 180 : angleDeg;
    const tilt = 26 + progress * 12;
    let outerRot, innerRot;
    if (side === 'left') { outerRot = tangent - tilt; innerRot = tangent + tilt; }
    else { outerRot = tangent + tilt; innerRot = tangent - tilt; }
    items.push({ src: leaf1, left: px - baseSize / 2, top: py - baseSize, rotate: innerRot, size: baseSize * (0.85 + Math.random() * 0.15), flip: side === 'left' });
    items.push({ src: leaf1, left: px - baseSize / 2, top: py - baseSize, rotate: outerRot, size: baseSize * (0.9 + Math.random() * 0.15), flip: side === 'right' });
  }
  return items;
}

const groomLeafItems = generateLeafItems('left');
const brideLeafItems = generateLeafItems('right');

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const tlGroom = gsap.timeline({
    scrollTrigger: { trigger: '.fb-groom-section', start: 'top+=33% bottom' }
  });
  tlGroom.addLabel("start")
  .from('.fb-groom-photo', { x: "-100vw", duration: 1.5, ease: 'power1.out' }, "start")
  .from('.fb-groom-flowers', { scale: 0, opacity: 0, duration: 1.2, ease: 'back.out(1.3)' }, "start+=1.0")
  .from('.fb-groom-leaf', { scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(1.3)', stagger: 0.05 }, "start+=1.4")
  .from('.fb-groom-text', { x: "100vw", duration: 1.5, ease: 'power1.out', stagger: 0.2 }, "start");

  const tlBride = gsap.timeline({
    scrollTrigger: { trigger: '.fb-bride-section', start: 'top+=33% bottom' }
  });
  tlBride.addLabel("start")
  .from('.fb-bride-photo', { x: "100vw", duration: 1.5, ease: 'power1.out' }, "start")
  .from('.fb-bride-flowers', { scale: 0, opacity: 0, duration: 1.2, ease: 'back.out(1.3)' }, "start+=1.0")
  .from('.fb-bride-leaf', { scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(1.3)', stagger: 0.05 }, "start+=1.4")
  .from('.fb-bride-text', { x: "-100vw", duration: 1.5, ease: 'power1.out', stagger: 0.2 }, "start");
});
</script>
