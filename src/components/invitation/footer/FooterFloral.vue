<template>
  <footer style="padding: 100px 24px 60px; text-align: center; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; background-color: #ffffff;">
    
    <!-- Background Gradient -->
    <div style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; background: linear-gradient(to bottom, #ffffff, #eefcf2); z-index: 0;"></div>
    
    <!-- Floral Corner Bottom Left -->
    <img src="https://media.mengundanganda.com/tema%20floral/rsvp/sashkeh_48c178dd-6258-42fd-9ac9-b76b30ef3f76.webp" 
         style="position: absolute; bottom: -40px; left: -40px; width: clamp(180px, 40vw, 250px); opacity: 0.4; transform: scaleX(-1) scaleY(-1); pointer-events: none; z-index: 0; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));" 
         alt="" />
         
    <!-- Floral Corner Bottom Right -->
    <img src="https://media.mengundanganda.com/tema%20floral/rsvp/sashkeh_48c178dd-6258-42fd-9ac9-b76b30ef3f76.webp" 
         style="position: absolute; bottom: -40px; right: -40px; width: clamp(180px, 40vw, 250px); opacity: 0.4; transform: scaleY(-1); pointer-events: none; z-index: 0; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));" 
         alt="" />

    <!-- Center Top Floral Decor -->
    <img src="https://media.mengundanganda.com/tema%20floral/rsvp/randidewi_febdf7bf-6b49-40da-954d-b0fd0e4902de.webp" 
         style="position: absolute; top: -40px; left: 50%; transform: translateX(-50%); width: 220px; opacity: 0.35; pointer-events: none; z-index: 0;" 
         alt="" />

    <div style="position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; margin-top: 20px;">
      <p style="font-size: clamp(34px, 8vw, 48px); margin-bottom: 16px; color: #2d5a27; font-weight: 600; letter-spacing: 0.02em; margin-top: 0;" :style="{ fontFamily: themeConfig.fontHeading }">
        {{ invitation.groom_name }} &amp; {{ invitation.bride_name }}
      </p>
      
      <p style="font-size: clamp(13px, 3.5vw, 14px); font-weight: 500; letter-spacing: 0.05em; color: #4d784a; max-width: 400px; line-height: 1.6; margin: 0 auto;">
        Terima kasih yang terdalam telah menjadi bagian dari hari bahagia kami. Doa restu Anda adalah anugerah terbesar.
      </p>
      
      <!-- Jarak ekstrim besar untuk memisahkan dari Ucapan Terima Kasih -->
      <div style="margin-top: 50px; display: flex; flex-direction: column; align-items: center; gap: 5px; padding-top: 16px; width: 100%; max-width: 280px; margin-left: auto; margin-right: auto; opacity: 0.9;">
        <span style="font-size: clamp(10px, 2.5vw, 11px); text-transform: uppercase; letter-spacing: 0.25em; color: #5e8b5a; font-weight: 700; margin: 0;">POWERED BY</span>
        
        <a href="https://mengundanganda.com" target="_blank" rel="noopener noreferrer" style="display: flex; flex-direction: column; align-items: center; gap: 8px; text-decoration: none; margin-top: 4px; transition: transform 0.3s ease;">
          <img src="/images/logo.webp" alt="MengundangAnda Logo" style="width: 44px; height: 44px; object-fit: contain; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15)); margin: 0;" />
          <span style="font-size: clamp(13px, 3.5vw, 14px); font-weight: 700; letter-spacing: 0.15em; color: #374151; margin-top: 4px;">
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
