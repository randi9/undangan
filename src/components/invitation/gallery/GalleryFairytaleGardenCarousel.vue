<template>
  <div 
    v-if="photos && photos.length > 0" 
    ref="gallerySection" 
    :class="[
      'relative overflow-hidden w-full text-center',
      isInline ? 'bg-transparent py-4' : 'bg-[#F8F3EE] pt-24 pb-32 max-w-5xl mx-auto'
    ]"
  >
    <!-- Parchment texture pattern overlay -->
    <div 
      v-if="!isInline"
      class="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply bg-repeat z-0" 
      style="background-image: url('https://www.transparenttextures.com/patterns/creampaper.png');"
    ></div>

    <!-- Header section -->
    <div v-if="!isInline" ref="headerRef" class="mb-16 px-6 relative z-10">
      <h2 class="text-3xl md:text-5xl font-normal tracking-wide text-[#6A4E42] mb-4" :style="{ fontFamily: themeConfig.fontHeading }">Galeri Foto</h2>
      <div class="flex items-center justify-center gap-4 text-[#AEB8A3]">
        <div class="h-[1px] w-8 bg-[#AEB8A3]"></div>
        <div class="w-1.5 h-1.5 border border-[#AEB8A3] transform rotate-45"></div>
        <div class="h-[1px] w-8 bg-[#AEB8A3]"></div>
      </div>
    </div>
    
    <!-- Horizon Carousel -->
    <div 
      ref="scrollRef" 
      class="w-full flex overflow-x-auto snap-x snap-mandatory hide-scroll gap-6 px-6 md:px-12 py-16 items-center relative z-10"
    >
      <div 
        v-for="(photo, i) in extendedPhotos" 
        :key="i" 
        @click="$emit('openLightbox', getOriginalIndex(i))" 
        :ref="el => { if (el) itemRefs[i] = el as HTMLElement }"
        :class="['snap-center flex-shrink-0 w-[60vw] sm:w-[45vw] md:w-[320px] aspect-[3/4] rounded-[2rem] overflow-hidden cursor-pointer group shadow-[0_15px_40px_rgba(106,78,66,0.06)] border border-[#EBCFD1] bg-white focus:outline-none gallery-item', getOriginalIndex(i) % 2 === 0 ? 'stagger-even' : 'stagger-odd']"
      >
        <img :src="resolveAssetUrl(photo.url, apiBase)" alt="Galeri Photo" class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hide-scroll {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.hide-scroll::-webkit-scrollbar {
  display: none;
}

.gallery-item {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.stagger-even {
  transform: translateY(24px);
}

.stagger-odd {
  transform: translateY(-24px);
}

.gallery-item.stagger-even:hover {
  transform: translateY(14px) scale(1.03);
  box-shadow: 0 25px 50px rgba(106, 78, 66, 0.12);
}

.gallery-item.stagger-odd:hover {
  transform: translateY(-34px) scale(1.03);
  box-shadow: 0 25px 50px rgba(106, 78, 66, 0.12);
}
</style>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Photo } from '@/types/invitation';
import { resolveAssetUrl } from '@/utils/url';

gsap.registerPlugin(ScrollTrigger);

const props = withDefaults(defineProps<{
  photos: Photo[];
  themeConfig: ThemeConfig;
  apiBase: string;
  isInline?: boolean;
}>(), {
  isInline: false
});

defineEmits<{
  (e: 'openLightbox', index: number): void;
}>();

const gallerySection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const scrollRef = ref<HTMLElement | null>(null);
const itemRefs = ref<HTMLElement[]>([]);

let tl: gsap.core.Timeline | null = null;
const currentIndex = ref(0);
let autoPlayInterval: ReturnType<typeof setInterval> | null = null;

// Dynamic clones based on the size of the photos array
const cloneCount = computed(() => {
  const N = props.photos.length;
  if (N <= 1) return 0;
  return Math.min(3, N);
});

// Build list with cloned items at the beginning and the end to achieve infinite loop scrolling
const extendedPhotos = computed(() => {
  const list = props.photos;
  if (!list || list.length <= 1) return list || [];
  const clonesStart = list.slice(-cloneCount.value);
  const clonesEnd = list.slice(0, cloneCount.value);
  return [...clonesStart, ...list, ...clonesEnd];
});

const getOriginalIndex = (index: number) => {
  const N = props.photos.length;
  if (N <= 1) return 0;
  return (index - cloneCount.value + N) % N;
};

function scrollToIndex(index: number, smooth = true) {
  currentIndex.value = index;
  const container = scrollRef.value;
  const targetEl = itemRefs.value[index];
  if (container && targetEl) {
    const containerWidth = container.clientWidth;
    const targetLeft = targetEl.offsetLeft - (containerWidth - targetEl.clientWidth) / 2;
    container.scrollTo({
      left: targetLeft,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }
}

function startAutoPlay() {
  stopAutoPlay();
  if (!props.photos || props.photos.length <= 1) return;
  autoPlayInterval = setInterval(() => {
    // Move to next slide relative to current extended list index
    const nextIndex = currentIndex.value + 1;
    scrollToIndex(nextIndex, true);
  }, 4000); // 4 seconds delay
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
}

function handleScroll() {
  if (!scrollRef.value || itemRefs.value.length === 0) return;
  const container = scrollRef.value;
  const containerCenter = container.scrollLeft + container.clientWidth / 2;
  
  let closestIndex = 0;
  let minDistance = Infinity;
  
  itemRefs.value.forEach((item, index) => {
    if (!item) return;
    const itemCenter = item.offsetLeft + item.clientWidth / 2;
    const distance = Math.abs(containerCenter - itemCenter);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  });
  
  const N = props.photos.length;
  if (N <= 1) {
    currentIndex.value = closestIndex;
    return;
  }
  
  const clone = cloneCount.value;
  
  if (currentIndex.value !== closestIndex) {
    currentIndex.value = closestIndex;
    
    // Jump positions instantly without animation if scroll is out of original bounds
    if (closestIndex < clone) {
      const targetIndex = closestIndex + N;
      scrollToIndex(targetIndex, false);
    } else if (closestIndex >= clone + N) {
      const targetIndex = closestIndex - N;
      scrollToIndex(targetIndex, false);
    }
  }
}

function onInteractionStart() {
  stopAutoPlay();
}

function onInteractionEnd() {
  startAutoPlay();
}

function handleResize() {
  scrollToIndex(currentIndex.value, false);
}

onMounted(() => {
  const N = props.photos.length;
  
  if (N > 1) {
    currentIndex.value = cloneCount.value;
    nextTick(() => {
      // Set initial scroll position to show the first real photo (skipping prepended clones)
      scrollToIndex(cloneCount.value, false);
      startAutoPlay();
    });
  }
  
  // Attach interaction and scroll listeners
  const container = scrollRef.value;
  if (container) {
    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('touchstart', onInteractionStart, { passive: true });
    container.addEventListener('touchend', onInteractionEnd, { passive: true });
    container.addEventListener('mousedown', onInteractionStart, { passive: true });
    container.addEventListener('mouseup', onInteractionEnd, { passive: true });
    container.addEventListener('mouseleave', onInteractionEnd, { passive: true });
  }
  
  window.addEventListener('resize', handleResize);

  if (!props.isInline && gallerySection.value) {
    // Set initial hidden state via GSAP
    gsap.set(headerRef.value, { opacity: 0, y: 24 });
    if (itemRefs.value.length) {
      gsap.set(itemRefs.value, { opacity: 0 });
    }

    tl = gsap.timeline({
      scrollTrigger: {
        trigger: gallerySection.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    });

    tl.to(headerRef.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    
    if (itemRefs.value.length) {
      tl.to(itemRefs.value, { 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.15 
      }, "-=0.6");
    }
  } else if (props.isInline && itemRefs.value.length) {
    // Clean fade-in for inline components
    gsap.set(itemRefs.value, { opacity: 0 });
    gsap.to(itemRefs.value, {
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.2
    });
  }
});

onBeforeUnmount(() => {
  stopAutoPlay();
  
  const container = scrollRef.value;
  if (container) {
    container.removeEventListener('scroll', handleScroll);
    container.removeEventListener('touchstart', onInteractionStart);
    container.removeEventListener('touchend', onInteractionEnd);
    container.removeEventListener('mousedown', onInteractionStart);
    container.removeEventListener('mouseup', onInteractionEnd);
    container.removeEventListener('mouseleave', onInteractionEnd);
  }
  
  window.removeEventListener('resize', handleResize);

  if (tl) {
    tl.kill();
    if (tl.scrollTrigger) tl.scrollTrigger.kill();
  }
});
</script>
