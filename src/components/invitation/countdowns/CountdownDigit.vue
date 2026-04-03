<template>
  <div class="roller-container relative overflow-hidden flex items-center justify-center">
    <!-- Inner viewport exactly 1 digit tall (1.2em) aligned in the middle -->
    <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.2em]">
      <div 
        class="flex flex-col absolute left-0 right-0 w-full"
        :style="{ 
          transform: `translateY(${translateY}em)`,
          transition: isReady ? `transform ${duration}s ${easing}` : 'none'
        }"
      >
        <span v-for="(num, idx) in strip" :key="idx" class="h-[1.2em] flex items-center justify-center shrink-0">
          {{ num }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';

const props = defineProps<{
  target: string;
  isIntersecting: boolean;
}>();

// Assign random behaviors for the slot-machine effect per digit uniquely
// Menurunkan tempo: jarak strip lebih pendek dan durasi diperpanjang
const spinLength = 10 + Math.floor(Math.random() * 10); // 10 to 19 digits
const spinDuration = 1.5 + Math.random() * 1.0; // 1.5s to 2.5s
const direction = Math.random() > 0.5 ? 'up' : 'down';

const strip = ref<string[]>([]);
const currentIndex = ref(0);
const duration = ref(0);
const easing = ref('cubic-bezier(0.1, 0.8, 0.1, 1)'); // Decelerates like a drum stopping
const isReady = ref(false);

const translateY = ref(0);

onMounted(() => {
  const tempStrip: string[] = [];
  
  if (direction === 'down') {
    // Numbers roll DOWN: implies strip moves UP. Target is at the end.
    for (let i = 0; i < spinLength - 1; i++) {
        tempStrip.push(Math.floor(Math.random() * 10).toString());
    }
    tempStrip.push(props.target);
    strip.value = tempStrip;
    currentIndex.value = 0;
    translateY.value = 0;
  } else {
    // Numbers roll UP: implies strip moves DOWN. Target is at the beginning.
    tempStrip.push(props.target);
    for (let i = 0; i < spinLength - 1; i++) {
        tempStrip.push(Math.floor(Math.random() * 10).toString());
    }
    strip.value = tempStrip;
    currentIndex.value = tempStrip.length - 1;
    translateY.value = -currentIndex.value * 1.2;
  }
});

watch(() => props.isIntersecting, async (visible) => {
  if (visible && !isReady.value) {
    await nextTick();
    isReady.value = true;
    duration.value = spinDuration;
    easing.value = 'cubic-bezier(0.1, 0.8, 0.1, 1)';
    
    // Force a reflow to ensure the 'transition: none' state is applied with starting position
    void document.body.offsetHeight;
    
    if (direction === 'down') {
      currentIndex.value = strip.value.length - 1;
    } else {
      currentIndex.value = 0;
    }
    translateY.value = -currentIndex.value * 1.2;
  }
});

watch(() => props.target, async (newVal) => {
  if (!isReady.value) return; 
  if (newVal === strip.value[currentIndex.value]) return;
  
  // Normal countdown tick: 
  // Wait to reset position silently
  duration.value = 0;
  
  const currentVal = strip.value[currentIndex.value] || '0';
  strip.value = [currentVal, newVal];
  currentIndex.value = 0;
  translateY.value = 0;
  
  await nextTick();
  void document.body.offsetHeight; // Force reflow
  
  // Trigger animation for tick
  duration.value = 0.5;
  easing.value = 'cubic-bezier(0.4, 0, 0.2, 1)';
  currentIndex.value = 1;
  translateY.value = -1.2; 
});
</script>

<style scoped>
.roller-container {
  /* Expand height to slightly reveal numbers tumbling from above and below */
  height: 1.6em; 
  width: 0.75em;
  
  /* Alpha mask to fade numbers smoothly at the top and bottom edge boundaries */
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);

  /* Keeps spacing without the ugly background boxes */
  margin: 0 1px;
}
</style>
