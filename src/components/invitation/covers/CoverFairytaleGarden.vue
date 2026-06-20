<template>
  <div
    :class="[
      'fixed inset-0 z-[100] flex flex-col items-center justify-center w-full h-[100dvh] transition-opacity duration-[400ms] ease-out select-none',
      isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100',
    ]"
    :style="{ 
      backgroundColor: '#F8F3EE', 
      fontFamily: fontBody,
      backgroundImage: coverImage ? `url(${coverImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
  >
    <!-- Soft dark transparent overlay with warm brown/rose tint -->
    <div class="absolute inset-0 z-[1]" style="background: linear-gradient(180deg, rgba(106, 78, 66, 0.35) 0%, rgba(106, 78, 66, 0.6) 100%);"></div>

    <!-- Content Container -->
    <div class="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12 w-full max-w-[450px]">
      
      <!-- Fairytale garden logo/ornament -->
      <div class="mb-6 text-[#EBCFD1]" style="text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
        <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      </div>

      <!-- Groom & Bride Names -->
      <h1 
        :style="{ 
          fontFamily: fontHeading, 
          color: '#F8F3EE', 
          fontSize: '3.5rem', 
          fontWeight: 'normal', 
          textAlign: 'center', 
          margin: '0 0 24px 0',
          textShadow: '2px 3px 6px rgba(0, 0, 0, 0.4)'
        }"
      >
        {{ groomName }}
        <span style="display: block; color: #EBCFD1; font-size: 2.5rem; font-style: italic; margin: 4px 0;">&amp;</span>
        {{ brideName }}
      </h1>

      <!-- Guest -->
      <div style="text-align: center; margin-top: 32px; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);">
        <p style="font-size: 11px; letter-spacing: 0.2em; color: #EBCFD1; text-transform: uppercase; margin: 0 0 8px 0; font-weight: 500;">
          Kepada Yth.
        </p>
        <h3 style="font-size: 20px; font-weight: 600; color: #F8F3EE; margin: 0; letter-spacing: 0.05em;">
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
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
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
