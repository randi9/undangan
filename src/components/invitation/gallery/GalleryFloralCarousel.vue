<template>
  <section v-if="photos && photos.length > 0" style="position: relative; width: 100%; padding: 64px 24px 120px; text-align: center; background-color: var(--theme-surface); overflow: hidden; z-index: 20;">
    <!-- Full width floral image sticking to bottom -->
    <img src="https://media.mengundanganda.com/tema%20floral/gallery%20section/ca980a43-47c7-431c-910d-c676e749a8fe.webp" style="position: absolute; bottom: 0; left: 0; width: 100%; height: auto; outline: none; pointer-events: none; z-index: 0;" />
    
    <!-- Container Putih (Overlay) -->
    <div style="position: absolute; inset: 0; background-color: rgba(255, 255, 255, 0.7); z-index: 1; pointer-events: none;"></div>
    
    <!-- Top Right Decoration -->
    <img src="https://media.mengundanganda.com/tema%20floral/gallery%20section/enneggg_7bc7e912-01fb-486e-b873-66803c7e63ae.webp" style="position: absolute; top: 0; right: 0; width: clamp(120px, 25vw, 200px); height: auto; pointer-events: none; z-index: 1;" />
    
    <!-- Top Right Butterfly (Smaller, Faster, Tilted Left) -->
    <div style="position: absolute; right: 5px; top: 10px; width: 50px; height: 50px; perspective: 600px; z-index: 2; transform: rotate(-5deg); pointer-events: none; opacity: 0.8;">
      <img src="https://media.mengundanganda.com/tema%20floral/gallery%20section/sashkeh_6ed3fbd6-b062-4196-bb32-8b2b7206e6bb.webp" class="bw-left" style="animation-duration: 0.22s; animation-delay: -0.1s; position: absolute; left: 50%; top: 0; width: auto; height: 100%; transform-origin: left center; object-fit: contain;" />
      <img src="https://media.mengundanganda.com/tema%20floral/gallery%20section/sashkeh_6ed3fbd6-b062-4196-bb32-8b2b7206e6bb.webp" class="bw-right" style="animation-duration: 0.22s; animation-delay: -0.1s; position: absolute; left: 50%; top: 0; width: auto; height: 100%; transform-origin: left center; object-fit: contain;" />
    </div>

    <!-- Top Left Decoration (Flipped) -->
    <img src="https://media.mengundanganda.com/tema%20floral/gallery%20section/enneggg_7bc7e912-01fb-486e-b873-66803c7e63ae.webp" style="position: absolute; top: 0; left: 0; width: clamp(120px, 25vw, 200px); height: auto; transform: scaleX(-1); pointer-events: none; z-index: 1;" />
    
    <!-- Top Left Butterfly (Larger, Slower, Slightly Tilted Right) -->
    <div style="position: absolute; left: -10px; top: 40px; width: 60px; height: 60px; perspective: 600px; z-index: 2; transform: rotate(18deg); pointer-events: none; opacity: 0.8;">
      <img src="https://media.mengundanganda.com/tema%20floral/gallery%20section/sashkeh_6ed3fbd6-b062-4196-bb32-8b2b7206e6bb.webp" class="bw-left" style="animation-duration: 0.38s; animation-delay: -0.3s; position: absolute; left: 50%; top: 0; width: auto; height: 100%; transform-origin: left center; object-fit: contain;" />
      <img src="https://media.mengundanganda.com/tema%20floral/gallery%20section/sashkeh_6ed3fbd6-b062-4196-bb32-8b2b7206e6bb.webp" class="bw-right" style="animation-duration: 0.38s; animation-delay: -0.3s; position: absolute; left: 50%; top: 0; width: auto; height: 100%; transform-origin: left center; object-fit: contain;" />
    </div>
    
    <h2 :style="{ fontFamily: themeConfig.fontHeading, color: 'var(--theme-primary)', fontSize: 'clamp(36px, 6vw, 60px)', marginBottom: '32px', position: 'relative', zIndex: 10, letterSpacing: '0.025em', textShadow: '0 1px 2px rgba(0,0,0,0.05)' }">Our Gallery</h2>
    
    <div class="gallery-container" style="position: relative; z-index: 10;">
      
      <!-- Main Featured Image (Diperkecil dan mendukung Animasi/Swipe) -->
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

        <!-- Tombol Panah Kiri -->
        <button @click.stop="prevSlide" class="nav-button nav-prev" :style="{ color: 'var(--theme-primary)' }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <!-- Tombol Panah Kanan -->
        <button @click.stop="nextSlide" class="nav-button nav-next" :style="{ color: 'var(--theme-primary)' }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      <!-- Thumbnail Row (Infinite / Nyambung Queue nya) -->
      <div class="thumbnail-wrapper">
        <div class="thumbnail-track">
          <div 
            v-for="item in visibleThumbnails" 
            :key="item.key" 
            class="thumbnail-item cursor-pointer"
            :class="{ 'active': item.offset === 0 }"
            :style="item.offset === 0 ? { borderColor: 'var(--theme-primary)' } : {}"
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

const selectedIndex = ref(0);
const slideDirectionName = ref('slide-right');

// Array infinite yang selalu menempatkan gambar terpilih di tengah (offset 0)
// dan sisa gambar di antrian kiri/kanannya (offset negatif dan positif)
const visibleThumbnails = computed(() => {
  const n = props.photos.length;
  if (!props.photos || n === 0) return [];
  
  const result = [];
  // Tampilkan 5 thumbnail sekaligus (-2, -1, 0, 1, 2)
  for (let i = -2; i <= 2; i++) {
    // Math wrap around untuk array infinite circular logic
    const realIndex = (((selectedIndex.value + i) % n) + n) % n;
    
    // Key menggunakan kombinasi indeks foto dan offset visual agar Vue mengenali ketika antrian bergeser (untuk animasi)
    const uniqueKey = `idx-${realIndex}-offset-${i}`; 
    
    result.push({
      key: uniqueKey,
      photo: props.photos[realIndex],
      index: realIndex,
      offset: i
    });
  }
  return result;
});

function prevSlide() {
  changeSlide(selectedIndex.value - 1);
}

function nextSlide() {
  changeSlide(selectedIndex.value + 1);
}

function changeSlide(newIndex: number) {
  const n = props.photos.length;
  if (n === 0) return;
  
  // Deteksi arah geseran untuk memutar animasi masuk/keluar ke arah yang tepat
  if (newIndex > selectedIndex.value || (selectedIndex.value === n - 1 && newIndex === 0)) {
     slideDirectionName.value = 'slide-right';
  } else {
     slideDirectionName.value = 'slide-left';
  }
  
  // Wrap array ke belakang atau depan
  selectedIndex.value = ((newIndex % n) + n) % n;

  // Reset timer auto-play setiap kali gambar berganti (baik manual maupun otomatis)
  resetAutoPlay();
}

// --------------------------------
// Swipe Handler untuk Gambar Utama
// --------------------------------
let touchStartX = 0;
let touchEndX = 0;

function onTouchStart(e: TouchEvent) {
  touchStartX = e.changedTouches[0]?.screenX ?? 0;
}

function onTouchEnd(e: TouchEvent) {
  touchEndX = e.changedTouches[0]?.screenX ?? 0;
  handleSwipeGesture();
}

function handleSwipeGesture() {
  const swipeDistance = touchStartX - touchEndX;
  // Membutuhkan tarikan minimal 50px agar slide berpindah
  if (swipeDistance > 50) {
    nextSlide(); // Geser ke kiri (gambar selanjutnya)
  } else if (swipeDistance < -50) {
    prevSlide(); // Geser ke kanan (gambar sebelumnya)
  }
}

// --------------------------------
// Auto-play Slider (Interval)
// --------------------------------
let autoPlayTimer: ReturnType<typeof setInterval> | null = null;

function startAutoPlay() {
  stopAutoPlay(); // Pastikan tidak ada timer ganda
  // Set interval 5000ms: 3000ms untuk efek transisi SUPER lambat + 2000ms waktu diam/menonton
  autoPlayTimer = setInterval(() => {
    nextSlide();
  }, 5000);
}

function stopAutoPlay() {
  if (autoPlayTimer) clearInterval(autoPlayTimer);
}

// Me-restart timer ketika user melakukan klik/geser manual, agar slider tidak tiba-tiba pindah
function resetAutoPlay() {
  startAutoPlay();
}

onMounted(() => {
  // Mulai autoplay saat galeri muncul
  startAutoPlay();
});

onUnmounted(() => {
  // Bersihkan memori timer saat berpindah halaman
  stopAutoPlay();
});
</script>

<style scoped>
/* Reset global utilities replacement for layout */
.gallery-container {
  max-width: 42rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
}

/* Main Featured Image */
.main-image-wrapper {
  /* Lebar dikurangi & margin ditambahkan */
  width: 80%; 
  max-width: 320px;
  margin: 0 auto;
  aspect-ratio: 4 / 5;
  border-radius: 0.75rem;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border: 1px solid rgba(0,0,0,0.05);
  background-color: #f3f4f6;
}

.main-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.main-image:hover {
  transform: scale(1.05);
}

.cursor-pointer {
  cursor: pointer;
}

/* Nav Buttons */
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
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  z-index: 10;
  border: none;
  cursor: pointer;
}

.nav-button:hover {
  background-color: white;
}

.nav-prev { left: 0.75rem; }
.nav-next { right: 0.75rem; }

/* Thumbnails */
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
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.3s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Dimensi & state untuk thumbnail mati */
  width: 3.5rem;
  opacity: 0.4;
  transform: scale(0.9);
}

@media (min-width: 768px) {
  .thumbnail-item { width: 4rem; }
}

.thumbnail-item:hover {
  opacity: 0.8;
}

/* Dimensi & state untuk thumbnail aktif */
.thumbnail-item.active {
  width: 5rem;
  opacity: 1;
  transform: scale(1);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border: 2px solid transparent; /* warna border diset inline via style */
  outline: 2px solid white;
  outline-offset: -2px;
}

@media (min-width: 768px) {
  .thumbnail-item.active { width: 6rem; }
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

/* ---------------------------------
   ANIMASI SLIDE MAIN IMAGE (FADE+SLIDE)
   --------------------------------- */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Bergerak Maju (Next) */
.slide-right-enter-from { transform: translateX(10%); opacity: 0; }
.slide-right-leave-to { transform: translateX(-10%); opacity: 0; }

/* Bergerak Mundur (Prev) */
.slide-left-enter-from { transform: translateX(-10%); opacity: 0; }
.slide-left-leave-to { transform: translateX(10%); opacity: 0; }

/* Butterfly Animations */
.bw-right {
  animation: flap-right 0.3s ease-in-out infinite alternate;
}
.bw-left {
  animation: flap-left 0.3s ease-in-out infinite alternate;
}

@keyframes flap-right {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(70deg); }
}
@keyframes flap-left {
  0% { transform: rotateY(180deg); }
  100% { transform: rotateY(110deg); }
}
</style>
