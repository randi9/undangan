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
        backgroundImage: coverImage ? `url(${coverImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transformOrigin: '70% 40%'
      }"
    ></div>

    <!-- Soft white transparent overlay (fades out faster) -->
    <div 
      class="absolute inset-0 z-[1] transition-opacity duration-[700ms] ease-out"
      :class="isClosing ? 'opacity-0' : 'opacity-100'"
      style="background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.22) 100%); backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px);"
    ></div>

    <!-- Content Container (fades out faster) -->
    <div 
      class="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12 w-full max-w-[450px] transition-all duration-[700ms] ease-out"
      :class="isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'"
    >
      
      <!-- Fairytale garden logo/ornament -->
      <div class="mb-6 text-[#6A4E42]">
        <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      </div>

      <!-- Groom & Bride Names -->
      <h1 
        :style="{ 
          fontFamily: fontHeading, 
          color: '#6A4E42', 
          fontSize: '3.5rem', 
          fontWeight: 'normal', 
          textAlign: 'center', 
          margin: '0 0 24px 0',
          textShadow: '1px 1px 3px rgba(255, 255, 255, 0.8)'
        }"
      >
        {{ groomName }}
        <span style="display: block; color: #AEB8A3; font-size: 2.5rem; font-style: italic; margin: 4px 0;">&amp;</span>
        {{ brideName }}
      </h1>

      <!-- Guest -->
      <div style="text-align: center; margin-top: 32px;">
        <p style="font-size: 11px; letter-spacing: 0.2em; color: #9A7B6B; text-transform: uppercase; margin: 0 0 8px 0; font-weight: 500;">
          Kepada Yth.
          </p>
        <h3 style="font-size: 20px; font-weight: 600; color: #6A4E42; margin: 0; letter-spacing: 0.05em;">
          {{ guestName || 'Tamu Undangan' }}
        </h3>
      </div>

      <!-- Open Button -->
      <button
        @click="emit('open')"
        style="
          margin-top: 48px; 
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
  filter: blur(0px);
}

.cover-bg-zoom.animate-zoom {
  animation: cover-bg-zoom-fade 3.2s ease-in-out forwards;
}

@keyframes cover-bg-zoom-fade {
  0% {
    transform: scale(1);
    opacity: 1;
    filter: blur(0px);
  }
  35% {
    transform: scale(1.6);
    opacity: 1;
    filter: blur(2px);
  }
  100% {
    transform: scale(4.5);
    opacity: 0;
    filter: blur(15px);
  }
}
</style>
