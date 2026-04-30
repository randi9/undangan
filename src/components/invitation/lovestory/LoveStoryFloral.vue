<template>
  <section
    v-if="stories.length > 0"
    class="min-h-[100dvh] w-full mx-auto text-center bg-[#fffaf2] overflow-hidden"
    style="
      padding-top: 50px;
      padding-bottom: 100px;
      padding-left: 20px;
      padding-right: 20px;
    "
  >
    <h2
      class="text-[var(--theme-primary)]"
      :style="{ fontFamily: themeConfig.fontHeading }"
      style="margin-bottom: 5px; font-size: 40px; font-weight: 700;"
    >
      Our Love Story
    </h2>
    <div class="flex justify-center mb-[80px]">
      <img
        src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_7b945e09-e486-4cb3-a299-6c6f214d4787.png"
        alt="Decoration"
        class="w-[150px] md:w-[300px] object-contain opacity-80"
        style="margin-bottom: 30px;"
      />
    </div>


    <div
      class="relative w-full max-w-6xl mx-auto flex flex-col items-center pb-24"
    >
      <div
        v-for="(story, i) in stories"
        :key="i"
        class="flex items-center w-full relative story-row"
        :style="{ zIndex: 10 + i, marginTop: i > 0 ? '40px' : '0px' }"
      >
        <!-- Left Area -->
        <div
          :class="[
            !story.photo
              ? 'flex-1'
              : i % 2 === 0
                ? 'flex-1'
                : 'w-2 md:w-8 shrink-0',
            'relative flex flex-col justify-center',
          ]"
          style="padding-left: 15px; padding-right: 15px"
        >
          <!-- TEXT (Even Index) -->
          <div v-if="story.photo && i % 2 === 0" class="text-right">
            <div
              class="font-bold text-[var(--theme-primary)] text-[10px] md:text-sm mb-1"
            >
              {{ story.date }}
            </div>
            <h4
              class="font-bold text-sm md:text-2xl text-[var(--theme-primary)] mb-1 md:mb-3 leading-tight"
            >
              {{ story.title }}
            </h4>
            <p
              class="text-[9px] md:text-sm text-[var(--theme-text-light)] leading-relaxed md:line-clamp-none"
            >
              {{ story.description }}
            </p>
          </div>

          <!-- BUNGA KIRI (Muncul saat tulisan ada di kanan / Odd Index) -->
          <div
            v-if="story.photo ? i % 2 === 1 : true"
            class="absolute inset-0 pointer-events-none"
          >
            <!-- JIKA ADA FOTO -->
            <template v-if="story.photo">
              <div class="absolute -z-10" :style="{ width: '70px', top: '-150px', right: '-90px', transform: 'rotate(15deg)' }">
                <img
                  src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_3c16b77d-3a6b-4239-8e9e-68a976fd8c71.webp"
                  class="w-full drop-shadow-sm max-w-none flower-photo"
                />
              </div>
              <div class="absolute -z-10" :style="{ width: '70px', top: '-120px', right: '-40px', transform: 'rotate(-10deg) scaleX(-1)' }">
                <img
                  src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_78c5a10f-c4e7-48f8-8e2e-7d7cc702d814.webp"
                  class="w-full drop-shadow-sm max-w-none flower-photo"
                />
              </div>
              <div class="absolute -z-10" :style="{ width: '70px', bottom: '10px', right: '-50px', transform: 'rotate(-1deg) scaleX(-1)' }">
                <img
                  src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_ec4bf919-6310-40d6-9313-b276df6d2a7b.webp"
                  class="w-full drop-shadow-sm max-w-none flower-photo"
                />
              </div>
            </template>

            <!-- JIKA TIDAK ADA FOTO (Bunga Baru Kiri) -->
            <template v-else>
              <div 
                class="absolute transition-all duration-700"
                :class="i % 2 === 0 ? '-z-10' : 'z-20'"
                :style="{ 
                  width: '120px', 
                  bottom: i % 2 === 0 ? '-140px' : '20px', 
                  right: '-50px', 
                  transform: 'rotate(-10deg)' 
                }"
              >
                <img
                  :src="i % 2 === 0 ? 'https://media.mengundanganda.com/floral/lovestory%20section/randidewi_85037f75-8904-4133-abea-d32d2b44b1f0.webp' : 'https://media.mengundanganda.com/floral/lovestory%20section/randidewi_d31a618a-dd19-441c-b521-0e1e1fd4c169.webp'"
                  class="w-full drop-shadow-sm max-w-none flower-nophoto-bottom"
                />
              </div>
            </template>
          </div>
        </div>

        <!-- Center Frame (Always in center, alternates rotation) -->
        <div
          :class="[
            !story.photo ? 'w-[200px] md:w-[320px]' : 'w-[140px] md:w-[260px]',
            'shrink-0 relative transition-transform duration-500 hover:scale-105',
          ]"
          :style="{ transform: `rotate(${i % 2 === 0 ? '-4deg' : '4deg'})` }"
        >
          <!-- The Polaroid Frame Background -->
          <img
            src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_217b045a-3695-41e6-b879-e6738da90277.png"
            class="absolute inset-0 w-full h-full object-fill pointer-events-none z-0 drop-shadow-xl"
            alt="Frame"
          />

          <!-- Content Inside Frame -->
          <div
            class="relative z-10"
            style="
              padding: 12% 8% 13% 8%;
              transform: rotate(-0.2deg) translateY(-3%);
            "
          >
            <!-- Condition 1: Has Photo -->
            <img
              v-if="story.photo"
              :src="resolveAssetUrl(story.photo, apiBase)"
              class="w-full aspect-[4.5/5] object-cover rounded-[2px]"
              :alt="story.title"
            />

            <!-- Condition 2: No Photo (White Card with Text) -->
            <div
              v-else
              class="w-full aspect-[4/5] bg-[#ffffff] p-4 md:p-6 flex flex-col items-center justify-center text-center rounded-[2px] overflow-hidden shadow-inner"
            >
              <div
                class="font-bold text-[var(--theme-primary)] text-[10px] md:text-xs mb-1 md:mb-2"
              >
                {{ story.date }}
              </div>
              <h4
                class="font-bold text-xs md:text-lg text-[var(--theme-primary)] mb-2 md:mb-3 leading-tight"
              >
                {{ story.title }}
              </h4>
              <p
                class="text-[9px] md:text-xs leading-relaxed text-[var(--theme-text-light)] line-clamp-6 md:line-clamp-none"
              >
                {{ story.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right Area -->
        <div
          :class="[
            !story.photo
              ? 'flex-1'
              : i % 2 === 1
                ? 'flex-1'
                : 'w-2 md:w-8 shrink-0',
            'relative flex flex-col justify-center',
          ]"
          style="padding-left: 15px; padding-right: 15px"
        >
          <!-- TEXT (Odd Index) -->
          <div v-if="story.photo && i % 2 === 1" class="text-left">
            <div
              class="font-bold text-[var(--theme-primary)] text-[10px] md:text-sm mb-1"
            >
              {{ story.date }}
            </div>
            <h4
              class="font-bold text-sm md:text-2xl text-[var(--theme-primary)] mb-1 md:mb-3 leading-tight"
            >
              {{ story.title }}
            </h4>
            <p
              class="text-[9px] md:text-sm text-[var(--theme-text-light)] leading-relaxed md:line-clamp-none"
            >
              {{ story.description }}
            </p>
          </div>

          <!-- BUNGA KANAN (Muncul saat tulisan ada di kiri / Even Index) -->
          <div
            v-if="story.photo ? i % 2 === 0 : true"
            class="absolute inset-0 pointer-events-none"
          >
            <!-- JIKA ADA FOTO -->
            <template v-if="story.photo">
              <div class="absolute -z-10" :style="{ width: '70px', top: '-150px', left: '-90px', transform: 'rotate(-15deg) scaleX(-1)' }">
                <img
                  src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_3c16b77d-3a6b-4239-8e9e-68a976fd8c71.webp"
                  class="w-full drop-shadow-sm max-w-none flower-photo"
                />
              </div>
              <div class="absolute -z-10" :style="{ width: '70px', top: '-120px', left: '-40px', transform: 'rotate(10deg)' }">
                <img
                  src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_78c5a10f-c4e7-48f8-8e2e-7d7cc702d814.webp"
                  class="w-full drop-shadow-sm max-w-none flower-photo"
                />
              </div>
              <div class="absolute -z-10" :style="{ width: '70px', bottom: '10px', left: '-50px', transform: 'rotate(1deg)' }">
                <img
                  src="https://media.mengundanganda.com/floral/lovestory%20section/randidewi_ec4bf919-6310-40d6-9313-b276df6d2a7b.webp"
                  class="w-full drop-shadow-sm max-w-none flower-photo"
                />
              </div>
            </template>

            <!-- JIKA TIDAK ADA FOTO (Bunga Baru Kanan) -->
            <template v-else>
              <div 
                class="absolute transition-all duration-700" 
                :class="i % 2 === 0 ? 'z-20' : '-z-10'"
                :style="{ 
                  width: '130px', 
                  top: i % 2 === 0 ? '-130px' : '20px', 
                  left: '-50px', 
                  transform: 'rotate(15deg) scaleX(-1)' 
                }"
              >
                <img
                  :src="i % 2 === 0 ? 'https://media.mengundanganda.com/floral/lovestory%20section/randidewi_d31a618a-dd19-441c-b521-0e1e1fd4c169.webp' : 'https://media.mengundanganda.com/floral/lovestory%20section/randidewi_85037f75-8904-4133-abea-d32d2b44b1f0.webp'"
                  class="w-full drop-shadow-sm max-w-none flower-nophoto-top"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import type { ThemeConfig } from "@/types/theme";
import type { LoveStoryItem } from "@/types/invitation";
import { resolveAssetUrl } from "@/utils/url";

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  stories: LoveStoryItem[];
  themeConfig: ThemeConfig;
  apiBase: string;
}>();

onMounted(() => {
  const rows = document.querySelectorAll('.story-row');
  
  rows.forEach((row) => {
    // 1. Animasi untuk "JIKA TIDAK ADA FOTO"
    const nophotoBottom = row.querySelectorAll('.flower-nophoto-bottom');
    const nophotoTop = row.querySelectorAll('.flower-nophoto-top');
    
    if (nophotoBottom.length > 0 || nophotoTop.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
        }
      });
      
      tl.fromTo(nophotoBottom, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
      )
      .fromTo(nophotoTop,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
        "-=1" // Muncul perlahan bersamaan
      );
    }
    
    // 2. Animasi untuk "JIKA ADA FOTO"
    const photoFlowers = row.querySelectorAll('.flower-photo');
    if (photoFlowers.length > 0) {
      gsap.fromTo(photoFlowers,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2, // Muncul satu per satu
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
          },
          onComplete: () => {
            // Sway animation (ayun layaknya ditiup angin pelan)
            photoFlowers.forEach((flower) => {
              gsap.to(flower, {
                rotation: `+=${gsap.utils.random(-6, 6)}`,
                x: `+=${gsap.utils.random(-4, 4)}`,
                y: `+=${gsap.utils.random(-4, 4)}`,
                duration: gsap.utils.random(4, 6),
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                delay: gsap.utils.random(0, 1)
              });
            });
          }
        }
      );
    }
  });
});
</script>
