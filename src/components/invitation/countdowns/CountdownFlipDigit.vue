<template>
  <div 
    class="relative flex-shrink-0 font-bold text-white shadow-xl rounded-md bg-[#1F2F37]"
    :class="[sizeClass]"
    style="perspective: 500px;"
  >
    
    <!-- Static Top (Next Value) -->
    <div class="absolute top-0 left-0 w-full h-1/2 overflow-hidden rounded-t-md brightness-90 bg-black/10 z-0">
       <div class="absolute inset-x-0 top-0 h-[200%] flex items-center justify-center leading-none">{{ nextValue }}</div>
    </div>
    
    <!-- Static Bottom (Current Value) -->
    <div class="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden rounded-b-md bg-[#253942] z-0">
       <div class="absolute inset-x-0 bottom-0 h-[200%] flex items-center justify-center leading-none">{{ currentValue }}</div>
    </div>

    <!-- Flipping Top Flap (Current Value going down) -->
    <div 
      class="absolute top-0 left-0 w-full h-1/2 overflow-hidden origin-bottom rounded-t-md bg-[#253942] z-10"
      :class="{ 'flip-top': isFlipping }"
    >
       <div class="absolute inset-x-0 top-0 h-[200%] flex items-center justify-center leading-none">{{ currentValue }}</div>
    </div>

    <!-- Flipping Bottom Flap (Next Value coming down) -->
    <div 
      class="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden origin-top rounded-b-md bg-[#253942] z-20"
      :class="isFlipping ? 'flip-bottom' : 'hidden'"
    >
       <div class="absolute inset-x-0 bottom-0 h-[200%] flex items-center justify-center leading-none">{{ nextValue }}</div>
    </div>

    <!-- Sangat tipis garis semu pembatas -->
    <div class="absolute top-1/2 left-0 right-0 border-t border-black/30 z-30 pointer-events-none shadow-[0_1px_0_rgba(255,255,255,0.05)]"></div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

const props = defineProps<{
  target: string | number;
}>();

const sizeClass = computed(() => {
  // Explicitly smaller mobile size: w-26px, h-36px. Total width of 8 digits + gaps <= 280px!
  return 'w-[26px] h-[36px] text-lg md:w-[48px] md:h-[64px] md:text-5xl';
});

const currentValue = ref(props.target);
const nextValue = ref(props.target);
const isFlipping = ref(false);

watch(() => props.target, (newVal) => {
  if (newVal !== currentValue.value) {
    nextValue.value = newVal;
    isFlipping.value = false;
    // Tiny delay to let browser reset CSS animations
    setTimeout(() => {
      isFlipping.value = true;
    }, 20);
  }
});

watch(isFlipping, (val) => {
  if (val) {
    setTimeout(() => {
      currentValue.value = nextValue.value;
      isFlipping.value = false;
    }, 600); // 600ms total flip time
  }
});
</script>

<style scoped>
.flip-top {
  animation: flipTopOut 0.3s cubic-bezier(0.37, 0, 0.63, 1) forwards;
}

.flip-bottom {
  transform: rotateX(90deg); /* Start hidden */
  animation: flipBottomIn 0.3s cubic-bezier(0.12, 0.9, 0.33, 1) 0.3s forwards;
}

@keyframes flipTopOut {
  0% {
    transform: rotateX(0deg);
    filter: brightness(1);
  }
  100% {
    transform: rotateX(-90deg);
    filter: brightness(0.5); /* Dim as it folds away */
  }
}

@keyframes flipBottomIn {
  0% {
    transform: rotateX(90deg);
    filter: brightness(0.5);
  }
  100% {
    transform: rotateX(0deg);
    filter: brightness(1); /* Brighten as it faces viewer */
  }
}
</style>
