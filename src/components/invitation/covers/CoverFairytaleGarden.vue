<template>
  <div
    :class="[
      'fixed inset-0 z-[100] flex flex-col items-center justify-center w-full h-[100dvh] select-none pointer-events-auto',
      isClosing ? 'pointer-events-none' : '',
    ]"
    :style="{ 
      backgroundColor: isClosing ? 'transparent' : '#F8F3EE', 
      fontFamily: fontBody,
      transition: 'background-color 500ms ease-out'
    }"
  >
    <!-- Background Image with Zoom transition -->
    <div
      class="cover-bg-zoom"
      :class="{ 'animate-zoom': isClosing }"
      :style="{
        backgroundImage: `url('https://media.mengundanganda.com/fairygarden/cover%20section/dewirandi_e782ab8b-eee1-44b8-85af-ce428272bb40.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transformOrigin: '70% 40%'
      }"
    ></div>

    <!-- Soft white transparent overlay (fades out faster) -->
    <div 
      class="absolute inset-0 z-[1] transition-opacity duration-[700ms] ease-out"
      :class="isClosing ? 'opacity-0' : 'opacity-100'"
      style="background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.22) 100%);"
    ></div>

    <!-- Content Container (fades out faster) -->
    <div 
      class="relative z-10 flex flex-col items-center justify-between text-center px-6 w-full max-w-[450px] transition-all duration-[700ms] ease-out"
      :class="isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'"
      style="height: 100dvh; padding-top: 15dvh; padding-bottom: 8dvh; box-sizing: border-box;"
    >
      
      <!-- Fairytale garden logo/ornament removed -->

      <!-- Groom & Bride Names -->
      <h1 
        :style="{ 
          fontFamily: fontHeading, 
          color: '#6A4E42', 
          fontSize: '3.5rem', 
          fontWeight: 'normal', 
          textAlign: 'center', 
          margin: '0',
          textShadow: '0 0 15px rgba(255, 255, 255, 0.95), 0 0 30px rgba(255, 255, 255, 0.8), 0 0 45px rgba(255, 255, 255, 0.5)'
        }"
      >
        {{ groomName }}
        <span style="display: block; color: #AEB8A3; font-size: 2.5rem; font-style: italic; margin: 1dvh 0;">&amp;</span>
        {{ brideName }}
      </h1>

      <!-- Guest and Button Wrapper -->
      <div style="display: flex; flex-direction: column; align-items: center; width: 100%; gap: 3dvh;">
        <!-- Guest -->
        <div style="text-align: center;">
          <p style="font-size: 11px; letter-spacing: 0.2em; color: #FFFFFF; text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8), 0 4px 15px rgba(0, 0, 0, 0.5); text-transform: uppercase; margin: 0 0 1dvh 0; font-weight: 500;">
            Kepada Yth.
          </p>
          <h3 style="font-size: 20px; font-weight: 600; color: #FFFFFF; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8), 0 4px 20px rgba(0, 0, 0, 0.6); margin: 0; letter-spacing: 0.05em;">
            {{ guestName || 'Tamu Undangan' }}
          </h3>
        </div>

        <!-- Open Button -->
        <button
          @click="emit('open')"
          style="
            margin-top: 1dvh; 
            padding: 14px 44px; 
            background-color: #EBCFD1; 
            color: #6A4E42; 
            border: 1px solid rgba(106, 78, 66, 0.2); 
            border-radius: 9999px; 
            font-size: 12px; 
            font-weight: 600;
            cursor: pointer; 
            letter-spacing: 0.2em; 
            text-transform: uppercase;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
          "
          onmouseenter="this.style.backgroundColor='#F8F3EE'; this.style.color='#6A4E42'; this.style.transform='scale(1.04)';"
          onmouseleave="this.style.backgroundColor='#EBCFD1'; this.style.color='#6A4E42'; this.style.transform='scale(1)';"
        >
          Buka Undangan
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  groomName: string;
  brideName: string;
  guestName: string;
  isClosing: boolean;
  fontHeading?: string;
  fontBody?: string;
  coverImage: string;
}>();

const emit = defineEmits<{
  (e: 'open'): void;
}>();
</script>

<style scoped>
.cover-bg-zoom {
  position: absolute;
  inset: 0;
  transform: scale(1);
  opacity: 1;
}

.cover-bg-zoom.animate-zoom {
  animation: cover-bg-zoom-fade 3.2s ease-in-out forwards;
}

@keyframes cover-bg-zoom-fade {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(4.5);
    opacity: 0;
  }
}
</style>
