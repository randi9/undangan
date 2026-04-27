<template>
  <section v-if="photos && photos.length > 0" style="position: relative; width: 100%; padding: 64px 24px 32px; text-align: center; background-color: transparent; overflow: hidden; z-index: 20;">
    <h2 :style="{ fontFamily: themeConfig.fontHeading, color: 'var(--theme-primary)', fontSize: 'clamp(56px, 10vw, 90px)', fontWeight: '800', marginBottom: '32px', position: 'relative', zIndex: 10, letterSpacing: '0.025em', textShadow: '0 1px 2px rgba(0,0,0,0.05)' }">Our Gallery</h2>
    
    <div style="max-width: 42rem; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem; position: relative; z-index: 10; width: 100%;">
      <div @touchstart="onTouchStart" @touchend="onTouchEnd" style="width: 80%; max-width: 320px; margin: 0 auto; aspect-ratio: 4 / 5; border-radius: 0.75rem; overflow: hidden; position: relative; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid rgba(0,0,0,0.05); background-color: #f3f4f6;">
        <transition :name="slideDirectionName">
          <img :key="selectedIndex" :src="resolveAssetUrl(photos[selectedIndex]?.url ?? '', apiBase)" @click="$emit('openLightbox', selectedIndex)" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; cursor: pointer; transition: transform 0.7s ease; transform: translateX(0);" class="gallery-main-img" />
        </transition>
        <button @click.stop="prevSlide" :style="{ color: 'var(--theme-primary)', position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '0.75rem', width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.8)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: 'none', cursor: 'pointer', zIndex: 10 }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button @click.stop="nextSlide" :style="{ color: 'var(--theme-primary)', position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '0.75rem', width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.8)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: 'none', cursor: 'pointer', zIndex: 10 }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      <div style="width: 100%; position: relative; display: flex; justify-content: center; align-items: center; height: 6rem; overflow: hidden;">
        <div style="display: flex; justify-content: center; align-items: center; gap: 0.75rem; position: relative; width: 100%; padding: 0 1rem;">
          <div v-for="item in visibleThumbnails" :key="item.key" @click="changeSlide(item.index)" 
               style="flex: none; aspect-ratio: 1/1; border-radius: 0.5rem; overflow: hidden; transition: all 0.3s ease-out; display: flex; align-items: center; justify-content: center; cursor: pointer;"
               :style="item.offset === 0 ? { width: 'min(5rem, 15vw)', opacity: 1, transform: 'scale(1)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '2px solid transparent', outline: '2px solid white', outlineOffset: '-2px' } : { width: 'min(3.5rem, 12vw)', opacity: 0.4, transform: 'scale(0.9)' }">
            <img :src="resolveAssetUrl(item.photo?.url ?? '', apiBase)" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0.5rem;" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { ThemeConfig } from '@/types/theme';
import type { Photo } from '@/types/invitation';
import { resolveAssetUrl } from '@/utils/url';

const props = defineProps<{ photos: Photo[]; themeConfig: ThemeConfig; apiBase: string; }>();
defineEmits<{ (e: 'openLightbox', index: number): void; }>();

const selectedIndex = ref(0);
const slideDirectionName = ref('slide-right');

const visibleThumbnails = computed(() => {
  const n = props.photos.length; if (!props.photos || n === 0) return [];
  const result = [];
  for (let i = -2; i <= 2; i++) {
    const realIndex = (((selectedIndex.value + i) % n) + n) % n;
    result.push({ key: `idx-${realIndex}-offset-${i}`, photo: props.photos[realIndex], index: realIndex, offset: i });
  }
  return result;
});

function prevSlide() { changeSlide(selectedIndex.value - 1); }
function nextSlide() { changeSlide(selectedIndex.value + 1); }
function changeSlide(newIndex: number) {
  const n = props.photos.length; if (n === 0) return;
  slideDirectionName.value = (newIndex > selectedIndex.value || (selectedIndex.value === n - 1 && newIndex === 0)) ? 'slide-right' : 'slide-left';
  selectedIndex.value = ((newIndex % n) + n) % n;
  resetAutoPlay();
}

let touchStartX = 0; let touchEndX = 0;
function onTouchStart(e: TouchEvent) { touchStartX = e.changedTouches[0]?.screenX ?? 0; }
function onTouchEnd(e: TouchEvent) { touchEndX = e.changedTouches[0]?.screenX ?? 0; const d = touchStartX - touchEndX; if (d > 50) nextSlide(); else if (d < -50) prevSlide(); }

let autoPlayTimer: ReturnType<typeof setInterval> | null = null;
function startAutoPlay() { stopAutoPlay(); autoPlayTimer = setInterval(() => nextSlide(), 5000); }
function stopAutoPlay() { if (autoPlayTimer) clearInterval(autoPlayTimer); }
function resetAutoPlay() { startAutoPlay(); }
onMounted(() => startAutoPlay());
onUnmounted(() => stopAutoPlay());
</script>

<style scoped>
.slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active { transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1); }
.slide-right-enter-from { transform: translateX(10%); opacity: 0; }
.slide-right-leave-to { transform: translateX(-10%); opacity: 0; }
.slide-left-enter-from { transform: translateX(-10%); opacity: 0; }
.slide-left-leave-to { transform: translateX(10%); opacity: 0; }
.gallery-main-img:hover { transform: scale(1.05); }
</style>
