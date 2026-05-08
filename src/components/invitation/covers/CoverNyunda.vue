<template>
  <div
    :class="[
      'fixed inset-0 z-[100] flex flex-col items-center justify-center w-full h-[100dvh] transition-opacity duration-[400ms] ease-out',
      isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100',
    ]"
    :style="{ backgroundColor: '#FFF8E7', fontFamily: fontBody }"
  >
    <!-- Cover Photo -->
    <div v-if="coverImage" style="width: 200px; height: 200px; border-radius: 50%; overflow: hidden; margin-bottom: 32px;">
      <img :src="coverImage" alt="Cover" style="width: 100%; height: 100%; object-fit: cover;" />
    </div>

    <!-- Groom & Bride Names -->
    <h1 :style="{ fontFamily: fontHeading, color: '#5C3D2E', fontSize: '2.5rem', fontWeight: 500, textAlign: 'center', margin: '0 0 16px 0' }">
      {{ groomName }}
      <span style="display: block; color: #A67B5B;">&amp;</span>
      {{ brideName }}
    </h1>

    <!-- Guest -->
    <div style="text-align: center; margin-top: 24px;">
      <p style="font-size: 12px; letter-spacing: 0.15em; color: #8B6F5C; text-transform: uppercase; margin: 0 0 6px 0;">Kepada Yth.</p>
      <h3 style="font-size: 16px; font-weight: 700; color: #5C3D2E; margin: 0;">{{ guestName || 'Tamu Undangan' }}</h3>
    </div>

    <!-- Open Button -->
    <button
      @click="emit('open')"
      style="margin-top: 40px; padding: 12px 32px; background-color: #5C3D2E; color: #FFF8E7; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; letter-spacing: 0.1em; text-transform: uppercase;"
    >
      Buka Undangan
    </button>
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
