<template>
  <div
    :class="[
      'fixed inset-0 z-[100] flex flex-col items-center justify-center w-full h-[100dvh] transition-opacity duration-[400ms] ease-out select-none',
      isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100',
    ]"
    :style="{ 
      backgroundColor: '#FFF8E7', 
      fontFamily: fontBody,
      backgroundImage: coverImage ? `url(${coverImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
  >
    <!-- Warm dark brown transparent overlay -->
    <div class="absolute inset-0 z-[1]" style="background-color: rgba(92, 61, 46, 0.45);"></div>

    <!-- Content Container -->
    <div class="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12 w-full max-w-[450px]">
      
      <!-- Groom & Bride Names -->
      <h1 
        :style="{ 
          fontFamily: fontHeading, 
          color: '#FFF8E7', 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          margin: '0 0 24px 0',
          textShadow: '1px 2px 4px rgba(0, 0, 0, 0.4)'
        }"
      >
        {{ groomName }}
        <span style="display: block; color: #EAD0B3; font-size: 2.25rem; font-style: italic; margin: 4px 0;">&amp;</span>
        {{ brideName }}
      </h1>

      <!-- Guest -->
      <div style="text-align: center; margin-top: 32px; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);">
        <p style="font-size: 12px; letter-spacing: 0.15em; color: #EAD0B3; text-transform: uppercase; margin: 0 0 8px 0; font-weight: 500;">
          Kepada Yth.
        </p>
        <h3 style="font-size: 18px; font-weight: 700; color: #FFF8E7; margin: 0;">
          {{ guestName || 'Tamu Undangan' }}
        </h3>
      </div>

      <!-- Open Button -->
      <button
        @click="emit('open')"
        style="
          margin-top: 48px; 
          padding: 14px 40px; 
          background-color: #FFF8E7; 
          color: #5C3D2E; 
          border: none; 
          border-radius: 9999px; 
          font-size: 13px; 
          font-weight: 700;
          cursor: pointer; 
          letter-spacing: 0.15em; 
          text-transform: uppercase;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        "
        onmouseenter="this.style.backgroundColor='#FFF'; this.style.transform='scale(1.03)';"
        onmouseleave="this.style.backgroundColor='#FFF8E7'; this.style.transform='scale(1)';"
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
