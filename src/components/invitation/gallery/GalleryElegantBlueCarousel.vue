<template>
  <section v-if="photos && photos.length > 0" ref="gallerySection" class="gallery-section">
    <div class="gallery-container">
      <h2 class="gallery-title" :style="{ fontFamily: themeConfig.fontHeading }">Our Gallery</h2>
      
      <div class="gallery-divider">
        <div class="divider-line"></div>
        <div class="divider-diamond"></div>
        <div class="divider-line"></div>
      </div>
      
      <p class="gallery-subtitle">
        A glimpse into our beautiful moments
      </p>

      <!-- Main Featured Image -->
      <div 
        class="main-image-wrapper"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <transition :name="slideDirectionName">
          <img 
            :key="selectedIndex"
            :src="resolveAssetUrl(photos[selectedIndex]?.url ?? '', apiBase)" 
            class="main-image cursor-pointer" 
            @click="$emit('openLightbox', selectedIndex)"
          />
        </transition>

        <!-- Nav Buttons -->
        <button @click.stop="prevSlide" class="nav-button nav-prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button @click.stop="nextSlide" class="nav-button nav-next">
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
import type { ThemeConfig } from '@/types/theme';
import type { Photo } from '@/types/invitation';
import { resolveAssetUrl } from '@/utils/url';

const props = defineProps<{
  photos: Photo[];
  themeConfig: ThemeConfig;
  apiBase: string;
}>();

defineEmits<{
  (e: 'openLightbox', index: number): void;
}>();

const gallerySection = ref<HTMLElement | null>(null);
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

onMounted(() => { startAutoPlay(); });
onUnmounted(() => { stopAutoPlay(); });
</script>

<style scoped>
.gallery-section {
  width: 100%;
  padding: 100px 0;
  background-color: rgba(168, 208, 230, 0.45);
  position: relative;
  overflow: hidden;
}

.gallery-container {
  max-width: 42rem;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.gallery-title {
  color: #1a252c;
  font-size: clamp(2.5rem, 5vw, 4rem);
  text-align: center;
  margin-bottom: 0;
  letter-spacing: 0.05em;
  text-shadow: 0 1px 2px rgba(0,0,0,0.02);
}

.gallery-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.divider-line {
  height: 1px;
  width: 60px;
  background: linear-gradient(90deg, transparent, rgba(48,72,81,0.3), transparent);
}
.divider-diamond {
  width: 6px;
  height: 6px;
  background-color: #405C66;
  transform: rotate(45deg);
}

.gallery-subtitle {
  text-align: center;
  color: rgba(48,72,81,0.7);
  font-size: clamp(0.75rem, 3vw, 0.95rem);
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.main-image-wrapper {
  width: 80%; 
  max-width: 380px;
  margin: 0 auto;
  aspect-ratio: 4 / 5;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 15px 35px rgba(48,72,81,0.15);
  background-color: #f0f4f8;
}

.main-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  box-shadow: 0 4px 12px rgba(48,72,81,0.15);
  transition: all 0.3s ease;
  z-index: 20;
  border: 1px solid rgba(48,72,81,0.1);
  cursor: pointer;
  color: #405C66;
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
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  opacity: 0.5;
  transform: scale(0.9);
  border: 2px solid transparent;
}
@media (min-width: 768px) { .thumbnail-item { width: 4.5rem; } }

.thumbnail-item:hover { opacity: 0.9; }

.thumbnail-item.active {
  width: 5rem;
  opacity: 1;
  transform: scale(1);
  box-shadow: 0 4px 12px rgba(48,72,81,0.15);
  border-color: #405C66;
}
@media (min-width: 768px) { .thumbnail-item.active { width: 6rem; } }

.thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Slide Animations */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active { transition: all 1.5s cubic-bezier(0.25, 0.8, 0.25, 1); }

.slide-right-enter-from { transform: translateX(10%); opacity: 0; }
.slide-right-leave-to { transform: translateX(-10%); opacity: 0; }
.slide-left-enter-from { transform: translateX(-10%); opacity: 0; }
.slide-left-leave-to { transform: translateX(10%); opacity: 0; }
</style>
