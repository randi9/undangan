<template>
  <section v-if="photos && photos.length > 0" ref="gallerySection" style="position: relative; width: 100%; padding: 96px 24px 120px; text-align: center; background-color: var(--theme-surface); overflow: hidden; z-index: 20;">
    
    <!-- Top Decorative Line -->
    <div ref="headerRef" class="opacity-0 translate-y-6" style="margin-bottom: 48px;">
      <h2 :style="{ fontFamily: themeConfig.fontHeading, color: 'var(--theme-primary)', fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '12px' }">Galeri Cinta</h2>
      <div style="display: flex; align-items: center; justify-content: center; gap: 16px;">
        <svg viewBox="0 0 60 2" width="60" style="opacity: 0.4;"><rect width="60" height="1.5" rx="0.75" fill="var(--theme-secondary)"/></svg>
        <svg viewBox="0 0 24 24" width="20" height="20" style="opacity: 0.6;">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" fill="var(--theme-secondary)"/>
        </svg>
        <svg viewBox="0 0 60 2" width="60" style="opacity: 0.4;"><rect width="60" height="1.5" rx="0.75" fill="var(--theme-secondary)"/></svg>
      </div>
    </div>
    
    <div ref="carouselRef" class="gallery-container opacity-0 translate-y-8" style="position: relative; z-index: 10;">
      
      <!-- Main Featured Image -->
      <div 
        class="main-image-wrapper"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <transition :name="slideDirectionName">
          <div :key="selectedIndex" class="main-image cursor-pointer" @click="$emit('openLightbox', selectedIndex)">
            <!-- Elegant Gold Frame Inner Border -->
            <div style="position: absolute; inset: 12px; border: 1px solid rgba(201,169,110,0.4); z-index: 10; pointer-events: none;">
              <div style="position: absolute; top: -4px; left: -4px; width: 8px; height: 8px; background-color: var(--theme-secondary);"></div>
              <div style="position: absolute; top: -4px; right: -4px; width: 8px; height: 8px; background-color: var(--theme-secondary);"></div>
              <div style="position: absolute; bottom: -4px; left: -4px; width: 8px; height: 8px; background-color: var(--theme-secondary);"></div>
              <div style="position: absolute; bottom: -4px; right: -4px; width: 8px; height: 8px; background-color: var(--theme-secondary);"></div>
            </div>
            
            <img 
              :src="resolveAssetUrl(photos[selectedIndex]?.url ?? '', apiBase)" 
              style="width: 100%; height: 100%; object-fit: cover;"
            />
          </div>
        </transition>

        <!-- Nav Buttons -->
        <button @click.stop="prevSlide" class="nav-button nav-prev" :style="{ color: 'var(--theme-primary)', borderColor: 'rgba(201,169,110,0.3)' }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button @click.stop="nextSlide" class="nav-button nav-next" :style="{ color: 'var(--theme-primary)', borderColor: 'rgba(201,169,110,0.3)' }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      <!-- Thumbnail Row -->
      <div class="thumbnail-wrapper">
        <div class="thumbnail-track">
          <div 
            v-for="item in visibleThumbnails" 
            :key="item.key" 
            class="thumbnail-item cursor-pointer"
            :class="{ 'active': item.offset === 0 }"
            :style="item.offset === 0 ? { borderColor: 'var(--theme-secondary)' } : {}"
            @click="changeSlide(item.index)"
          >
            <img :src="resolveAssetUrl(item.photo?.url ?? '', apiBase)" class="thumbnail-img" />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Photo } from '@/types/invitation';
import { resolveAssetUrl } from '@/utils/url';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  photos: Photo[];
  themeConfig: ThemeConfig;
  apiBase: string;
}>();

defineEmits<{
  (e: 'openLightbox', index: number): void;
}>();

const gallerySection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const carouselRef = ref<HTMLElement | null>(null);

const selectedIndex = ref(0);
const slideDirectionName = ref('slide-right');

const visibleThumbnails = computed(() => {
  const n = props.photos.length;
  if (!props.photos || n === 0) return [];
  
  const result = [];
  for (let i = -2; i <= 2; i++) {
    const realIndex = (((selectedIndex.value + i) % n) + n) % n;
    const uniqueKey = `idx-${realIndex}-offset-${i}`; 
    result.push({ key: uniqueKey, photo: props.photos[realIndex], index: realIndex, offset: i });
  }
  return result;
});

function prevSlide() { changeSlide(selectedIndex.value - 1); }
function nextSlide() { changeSlide(selectedIndex.value + 1); }

function changeSlide(newIndex: number) {
  const n = props.photos.length;
  if (n === 0) return;
  
  if (newIndex > selectedIndex.value || (selectedIndex.value === n - 1 && newIndex === 0)) {
     slideDirectionName.value = 'slide-right';
  } else {
     slideDirectionName.value = 'slide-left';
  }
  
  selectedIndex.value = ((newIndex % n) + n) % n;
  resetAutoPlay();
}

let touchStartX = 0;
let touchEndX = 0;

function onTouchStart(e: TouchEvent) { touchStartX = e.changedTouches[0]?.screenX ?? 0; }
function onTouchEnd(e: TouchEvent) {
  touchEndX = e.changedTouches[0]?.screenX ?? 0;
  handleSwipeGesture();
}

function handleSwipeGesture() {
  const swipeDistance = touchStartX - touchEndX;
  if (swipeDistance > 50) nextSlide();
  else if (swipeDistance < -50) prevSlide();
}

let autoPlayTimer: ReturnType<typeof setInterval> | null = null;
function startAutoPlay() {
  stopAutoPlay();
  autoPlayTimer = setInterval(nextSlide, 5000);
}
function stopAutoPlay() { if (autoPlayTimer) clearInterval(autoPlayTimer); }
function resetAutoPlay() { startAutoPlay(); }

onMounted(() => {
  startAutoPlay();

  if (gallerySection.value) {
    gsap.to(headerRef.value, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: gallerySection.value, start: 'top 80%', toggleActions: 'play none none none' }
    });

    gsap.to(carouselRef.value, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: 0.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: carouselRef.value, start: 'top 85%', toggleActions: 'play none none none' }
    });
  }
});

onUnmounted(() => { stopAutoPlay(); });
</script>

<style scoped>
.gallery-container {
  max-width: 42rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
}

.main-image-wrapper {
  width: 80%; 
  max-width: 380px;
  margin: 0 auto;
  aspect-ratio: 4 / 5;
  border-radius: 4px;
  position: relative;
  box-shadow: 0 15px 35px rgba(139,111,78,0.15);
  background-color: #fff;
  padding: 12px;
}

.main-image {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  bottom: 12px;
  overflow: hidden;
  background-color: #f3f4f6;
}

.cursor-pointer { cursor: pointer; }

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 12px rgba(139,111,78,0.15);
  transition: all 0.3s ease;
  z-index: 20;
  border: 1px solid transparent;
  cursor: pointer;
}
.nav-button:hover { background-color: white; transform: translateY(-50%) scale(1.1); }
.nav-prev { left: -1.25rem; }
.nav-next { right: -1.25rem; }
@media (min-width: 768px) {
  .nav-prev { left: -2rem; }
  .nav-next { right: -2rem; }
}

.thumbnail-wrapper {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  overflow: hidden;
}

.thumbnail-track {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  width: 100%;
  padding: 0 1rem;
}

.thumbnail-item {
  flex: none;
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  opacity: 0.5;
  transform: scale(0.9);
  padding: 4px;
  background: white;
  border: 1px solid rgba(201,169,110,0.2);
}
@media (min-width: 768px) { .thumbnail-item { width: 4.5rem; } }

.thumbnail-item:hover { opacity: 0.9; }

.thumbnail-item.active {
  width: 5rem;
  opacity: 1;
  transform: scale(1);
  box-shadow: 0 4px 12px rgba(139,111,78,0.15);
  border: 2px solid transparent; /* Colored via inline style */
}
@media (min-width: 768px) { .thumbnail-item.active { width: 6rem; } }

.thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Animations */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active { transition: all 1.5s cubic-bezier(0.25, 0.8, 0.25, 1); }

.slide-right-enter-from { transform: translateX(10%); opacity: 0; }
.slide-right-leave-to { transform: translateX(-10%); opacity: 0; }
.slide-left-enter-from { transform: translateX(-10%); opacity: 0; }
.slide-left-leave-to { transform: translateX(10%); opacity: 0; }
</style>
