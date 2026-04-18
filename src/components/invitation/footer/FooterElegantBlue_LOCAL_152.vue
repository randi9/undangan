<template>
  <footer style="margin-top: -1px; padding: 100px 24px 60px; text-align: center; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 500px; background: linear-gradient(to bottom, rgba(168, 208, 230, 0.45) 0%, #f8f9f9 85%);" class="text-white">
    
    <!-- Mega Mendung Left Cloud -->
    <img 
      src="https://media.mengundanganda.com/elegant_blue/footer%20section/randidewi_9b370921-2fd3-448b-9923-813fca58a2c4.webp" 
      alt="Mega Mendung Left" 
      class="mega-mendung-left" 
    />

    <!-- Mega Mendung Right Cloud (Flipped) -->
    <img 
      src="https://media.mengundanganda.com/elegant_blue/footer%20section/randidewi_9b370921-2fd3-448b-9923-813fca58a2c4.webp" 
      alt="Mega Mendung Right" 
      class="mega-mendung-right" 
    />
    <!-- End of Clouds -->
    <div style="position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; margin-top: -20px;">
      <p style="font-size: clamp(34px, 8vw, 48px); margin-bottom: 24px; color: #304851; font-weight: 600; letter-spacing: 0.02em; margin-top: 0;" :style="{ fontFamily: themeConfig.fontHeading }">
        {{ invitation.groom_name }} &amp; {{ invitation.bride_name }}
      </p>
      
      <p style="font-size: clamp(13px, 3.5vw, 14px); font-weight: 500; letter-spacing: 0.05em; color: #405C66; max-width: 400px; line-height: 1.6; margin: 0 auto;">
        Terima kasih yang terdalam telah menjadi bagian dari hari bahagia kami. Doa restu Anda adalah anugerah terbesar.
      </p>
      
      <!-- Jarak memisahkan dari Ucapan Terima Kasih -->
      <div style="margin-top: 150px; display: flex; flex-direction: column; align-items: center; gap: 5px; padding-top: 16px; width: 100%; max-width: 280px; margin-left: auto; margin-right: auto; opacity: 0.9;">
        <span style="font-size: clamp(10px, 2.5vw, 11px); text-transform: uppercase; letter-spacing: 0.25em; color: #5B7F8C; font-weight: 700; margin: 0;">POWERED BY</span>
        
        <a href="https://mengundanganda.com" target="_blank" rel="noopener noreferrer" style="display: flex; flex-direction: column; align-items: center; gap: 8px; text-decoration: none; margin-top: 4px; transition: transform 0.3s ease;">
          <img src="/images/logo.webp" alt="MengundangAnda Logo" style="width: 44px; height: 44px; object-fit: contain; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15)); margin: 0;" />
          <span style="font-size: clamp(13px, 3.5vw, 14px); font-weight: 700; letter-spacing: 0.15em; color: #304851; margin-top: 4px;">
            Mengundang<span style="font-weight: 700; color: #3b82f6;">Anda</span>
          </span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';

defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();
</script>

<style scoped>
.mega-mendung-left {
  position: absolute;
  left: -20px;
  top: 10px;
  width: clamp(200px, 45vw, 350px);
  opacity: 0.6;
  z-index: 5;
  pointer-events: none;
  animation: floatCloudLeft 6s ease-in-out infinite alternate;
}

.mega-mendung-right {
  position: absolute;
  right: -20px;
  top: 10px;
  width: clamp(200px, 45vw, 350px);
  opacity: 0.6;
  z-index: 5;
  pointer-events: none;
  animation: floatCloudRight 6s ease-in-out infinite alternate;
  transform: scaleX(-1);
}

@keyframes floatCloudLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(25px); /* Move right inwards */ }
}

@keyframes floatCloudRight {
  0% { transform: scaleX(-1) translateX(0); }
  100% { transform: scaleX(-1) translateX(25px); /* Move left inwards */ }
}


</style>
