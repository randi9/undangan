<template>
  <section 
    ref="sectionRef" 
    style="position: relative; padding: 60px 24px 120px 24px; text-align: center; background-color: #5C3D2E; height: 100dvh; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center;"
  >

    <!-- Main Background Image (Very Back) -->
    <div style="position: absolute; top: -70px; left: -35px; right: 0; width: 120%; pointer-events: none; z-index: 1; opacity: 0.1;">
      <img 
        src="https://media.mengundanganda.com/nyunda/couple%20section/dewirandi_36e99b3a-0a96-4ba3-aa84-f2d1be0ecf41.webp" 
        alt="Couple Section Background" 
        style="width: 100%; height: auto; display: block;" 
      />
    </div>

    <!-- Bottom Center Ornament -->
    <div style="position: absolute; bottom: -20px; left: 0; right: 0; display: flex; justify-content: center; pointer-events: none; z-index: 5; overflow: visible;">
      <div 
        ref="bottomOrnament" 
        style="width: 150%; max-width: 900px; flex-shrink: 0;"
      >
        <img 
          src="https://media.mengundanganda.com/nyunda/couple%20section/dewirandi_eaa899e0-4822-427a-b6f3-ad99c4c2b659.webp" 
          alt="Couple Decor Bottom" 
          style="width: 100%; height: auto; display: block;" 
        />
      </div>
    </div>

    <!-- Left Overlay Panel (Bride) -->
    <div 
      ref="leftPanel"
      style="position: absolute; left: 0; top: 0; bottom: 0; width: 15%; background-color: #f5e6d0; z-index: 10; display: flex; align-items: center; justify-content: center; overflow: hidden; box-shadow: 4px 0 15px rgba(92, 61, 46, 0.15);"
    >
      <!-- Bottom Left Ornament -->
      <img 
        ref="leftPanelDecor"
        src="https://media.mengundanganda.com/nyunda/couple%20section/dewirandi_c835bc08-c49c-43a3-8938-a01f2fd44d33.webp" 
        alt="Bride Panel Decor" 
        style="position: absolute; left: -50px; bottom: 0; height: 85dvh; width: auto; max-width: none !important; pointer-events: none; z-index: 1; opacity: 0;" 
      />
      <!-- Vertical Label -->
      <div 
        ref="leftLabel"
        :style="{ 
          fontFamily: themeConfig.fontHeading || 'Playfair Display, serif', 
          color: '#5C3D2E',
          fontSize: 'clamp(2rem, 6vw, 3rem)',
          fontWeight: '600',
          textTransform: 'uppercase',
          transform: 'rotate(-90deg)',
          whiteSpace: 'nowrap',
          letterSpacing: '0.3em'
        }"
      >
        {{ (invitation.bride_name || invitation.bride_full_name || '').toUpperCase() }}
      </div>

      <!-- Detailed Info (Bride) -->
      <div 
        ref="leftInfo"
        style="position: absolute; width: 100%; max-width: 450px; padding: 24px; text-align: center; opacity: 0; pointer-events: none; display: flex; flex-direction: column; align-items: center; justify-content: center; transform: translateY(-20px); z-index: 2;"
      >
        <!-- Bride Title & Ornament Wrapper -->
        <div ref="leftTitle" style="opacity: 0; margin-bottom: 20px; display: flex; flex-direction: column; align-items: center; width: 100%;">
          <img 
            src="https://media.mengundanganda.com/nyunda/couple%20section/dewirandi_2b6a1b81-f8d7-49da-8ae7-f564bae913dc.webp" 
            alt="Bride Title Above Ornament" 
            style="width: 100%; max-width: 195px; height: auto; display: block; margin: 0 auto 4px auto;"
          />
          <h4 :style="{ fontFamily: themeConfig.fontHeading || 'Playfair Display, serif', color: '#8C6A5C', fontSize: 'clamp(1.85rem, 6vw, 2.5rem)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '3px', margin: '0 0 6px 0' }">The Bride</h4>
          <img 
            src="https://media.mengundanganda.com/nyunda/couple%20section/dewirandi_f78ea361-eed1-49c5-a753-82b420920071.png" 
            alt="Bride Title Under Ornament" 
            style="width: 100%; max-width: 180px; height: auto; display: block; margin: 0 auto;"
          />
        </div>
        
        <div ref="leftPhotoWrapper" style="position: relative; width: clamp(200px, 35dvh, 288px); height: clamp(200px, 35dvh, 288px); margin: 0 auto 8px auto; opacity: 0;">
          <!-- Photo Container (1:1 mask) -->
          <div style="position: absolute; inset: 8px; overflow: hidden; border-radius: 16px; z-index: 1; box-shadow: 0 10px 30px rgba(92, 61, 46, 0.12); border: 1px solid rgba(255, 255, 255, 0.15);">
            <img v-if="invitation.bride_photo" :src="resolveAssetUrl(invitation.bride_photo, apiBase)" alt="Bride" style="width: 100%; height: 100%; object-fit: cover;" />
            <div v-else style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: #A67B5B; background-color: #F5E6D0;">👤</div>
          </div>
          <!-- Frame Overlay -->
          <img 
            src="https://media.mengundanganda.com/nyunda/couple%20section/dewirandi_7a3c4b74-6b84-4a84-b54c-975dac32e14a.webp" 
            alt="Bride Frame" 
            style="position: absolute; inset: 0; width: 100%; height: 100%; z-index: 2; pointer-events: none; object-fit: contain; opacity: 0.9;" 
          />
        </div>

        <h3 ref="leftName" :style="{ fontFamily: themeConfig.fontHeading || 'Playfair Display, serif', fontSize: 'clamp(1.9rem, 5.8vw, 2.65rem)', fontWeight: '800', color: '#5C3D2E', margin: '0 0 4px 0', opacity: 0 }">
          {{ invitation.bride_full_name || invitation.bride_name }}
        </h3>

        <div ref="leftParents" v-if="invitation.bride_father || invitation.bride_mother" style="opacity: 0;">
          <!-- Elegant Separator -->
          <div style="width: 40px; height: 1.5px; background-color: #8C6A5C; margin: 6px auto 10px auto; opacity: 0.5;"></div>
          <p style="font-size: clamp(0.85rem, 3vw, 1rem); color: #8C6A5C; line-height: 1.4; margin: 0; font-family: 'Inter', sans-serif;">
            Putri dari<br />
            <span style="font-weight: 600; color: #5C3D2E; display: inline-block; margin-top: 3px;" v-if="invitation.bride_father">Bapak {{ invitation.bride_father }}</span>
            <span v-if="invitation.bride_father && invitation.bride_mother"> &amp; </span>
            <span style="font-weight: 600; color: #5C3D2E; display: inline-block; margin-top: 3px;" v-if="invitation.bride_mother">Ibu {{ invitation.bride_mother }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Right Overlay Panel (Groom) -->
    <div 
      ref="rightPanel"
      style="position: absolute; right: 0; top: 0; bottom: 0; width: 15%; background-color: #f5e6d0; z-index: 10; display: flex; align-items: center; justify-content: center; overflow: hidden; box-shadow: -4px 0 15px rgba(92, 61, 46, 0.15);"
    >
      <!-- Bottom Right Ornament -->
      <img 
        ref="rightPanelDecor"
        src="https://media.mengundanganda.com/nyunda/couple%20section/dewirandi_7e13d17f-5259-4049-82c7-d46422531f24.webp" 
        alt="Groom Panel Decor" 
        style="position: absolute; right: -50px; bottom: 0; height: 85dvh; width: auto; max-width: none !important; pointer-events: none; z-index: 1; opacity: 0;" 
      />
      <!-- Vertical Label -->
      <div 
        ref="rightLabel"
        :style="{ 
          fontFamily: themeConfig.fontHeading || 'Playfair Display, serif', 
          color: '#5C3D2E',
          fontSize: 'clamp(2rem, 6vw, 3rem)',
          fontWeight: '600',
          textTransform: 'uppercase',
          transform: 'rotate(90deg)',
          whiteSpace: 'nowrap',
          letterSpacing: '0.3em'
        }"
      >
        {{ (invitation.groom_name || invitation.groom_full_name || '').toUpperCase() }}
      </div>

      <!-- Detailed Info (Groom) -->
      <div 
        ref="rightInfo"
        style="position: absolute; width: 100%; max-width: 450px; padding: 24px; text-align: center; opacity: 0; pointer-events: none; display: flex; flex-direction: column; align-items: center; justify-content: center; transform: translateY(-20px); z-index: 2;"
      >
        <!-- Groom Title & Ornament Wrapper -->
        <div ref="rightTitle" style="opacity: 0; margin-bottom: 20px; display: flex; flex-direction: column; align-items: center; width: 100%;">
          <img 
            src="https://media.mengundanganda.com/nyunda/couple%20section/dewirandi_2b6a1b81-f8d7-49da-8ae7-f564bae913dc.webp" 
            alt="Groom Title Above Ornament" 
            style="width: 100%; max-width: 195px; height: auto; display: block; margin: 0 auto 4px auto;"
          />
          <h4 :style="{ fontFamily: themeConfig.fontHeading || 'Playfair Display, serif', color: '#8C6A5C', fontSize: 'clamp(1.85rem, 6vw, 2.5rem)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '3px', margin: '0 0 6px 0' }">The Groom</h4>
          <img 
            src="https://media.mengundanganda.com/nyunda/couple%20section/dewirandi_f78ea361-eed1-49c5-a753-82b420920071.png" 
            alt="Groom Title Under Ornament" 
            style="width: 100%; max-width: 180px; height: auto; display: block; margin: 0 auto;"
          />
        </div>
        
        <div ref="rightPhotoWrapper" style="position: relative; width: clamp(200px, 35dvh, 288px); height: clamp(200px, 35dvh, 288px); margin: 0 auto 8px auto; opacity: 0;">
          <!-- Photo Container (1:1 mask) -->
          <div style="position: absolute; inset: 8px; overflow: hidden; border-radius: 16px; z-index: 1; box-shadow: 0 10px 30px rgba(92, 61, 46, 0.12); border: 1px solid rgba(255, 255, 255, 0.15);">
            <img v-if="invitation.groom_photo" :src="resolveAssetUrl(invitation.groom_photo, apiBase)" alt="Groom" style="width: 100%; height: 100%; object-fit: cover;" />
            <div v-else style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: #A67B5B; background-color: #F5E6D0;">👤</div>
          </div>
          <!-- Frame Overlay -->
          <img 
            src="https://media.mengundanganda.com/nyunda/couple%20section/dewirandi_7a3c4b74-6b84-4a84-b54c-975dac32e14a.webp" 
            alt="Groom Frame" 
            style="position: absolute; inset: 0; width: 100%; height: 100%; z-index: 2; pointer-events: none; object-fit: contain; opacity: 0.9;" 
          />
        </div>

        <h3 ref="rightName" :style="{ fontFamily: themeConfig.fontHeading || 'Playfair Display, serif', fontSize: 'clamp(1.9rem, 5.8vw, 2.65rem)', fontWeight: '800', color: '#5C3D2E', margin: '0 0 4px 0', opacity: 0 }">
          {{ invitation.groom_full_name || invitation.groom_name }}
        </h3>

        <div ref="rightParents" v-if="invitation.groom_father || invitation.groom_mother" style="opacity: 0;">
          <!-- Elegant Separator -->
          <div style="width: 40px; height: 1.5px; background-color: #8C6A5C; margin: 6px auto 10px auto; opacity: 0.5;"></div>
          <p style="font-size: clamp(0.85rem, 3vw, 1rem); color: #8C6A5C; line-height: 1.4; margin: 0; font-family: 'Inter', sans-serif;">
            Putra dari<br />
            <span style="font-weight: 600; color: #5C3D2E; display: inline-block; margin-top: 3px;" v-if="invitation.groom_father">Bapak {{ invitation.groom_father }}</span>
            <span v-if="invitation.groom_father && invitation.groom_mother"> &amp; </span>
            <span style="font-weight: 600; color: #5C3D2E; display: inline-block; margin-top: 3px;" v-if="invitation.groom_mother">Ibu {{ invitation.groom_mother }}</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { resolveAssetUrl } from '@/utils/url';

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
  apiBase: string;
}>();

const sectionRef = ref<HTMLElement | null>(null);
const leftPanel = ref<HTMLElement | null>(null);
const rightPanel = ref<HTMLElement | null>(null);
const leftLabel = ref<HTMLElement | null>(null);
const rightLabel = ref<HTMLElement | null>(null);
const leftInfo = ref<HTMLElement | null>(null);
const rightInfo = ref<HTMLElement | null>(null);
const bottomOrnament = ref<HTMLElement | null>(null);
const leftPanelDecor = ref<HTMLElement | null>(null);
const rightPanelDecor = ref<HTMLElement | null>(null);

// Sub-elements for staggered fade-in
const leftTitle = ref<HTMLElement | null>(null);
const leftPhotoWrapper = ref<HTMLElement | null>(null);
const leftName = ref<HTMLElement | null>(null);
const leftParents = ref<HTMLElement | null>(null);

const rightTitle = ref<HTMLElement | null>(null);
const rightPhotoWrapper = ref<HTMLElement | null>(null);
const rightName = ref<HTMLElement | null>(null);
const rightParents = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;

onMounted(() => {
  const sectionEl = sectionRef.value;
  if (!sectionEl || !leftPanel.value || !rightPanel.value) return;

  ctx = gsap.context(() => {
    // Set initial layout properties
    gsap.set(leftPanel.value, { width: "15%", zIndex: 10 });
    gsap.set(rightPanel.value, { width: "15%", zIndex: 10 });
    gsap.set(leftLabel.value, { opacity: 1 });
    gsap.set(rightLabel.value, { opacity: 1 });
    gsap.set(leftPanelDecor.value, { opacity: 0, x: -100 });
    gsap.set(rightPanelDecor.value, { opacity: 0, x: 100 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: "top top",
        end: "+=200%", // pinned for 2 full screen scroll lengths
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // --- PHASE 1: Groom (Right Panel) slides in & reveals details ---
    tl.set(rightPanel.value, { zIndex: 12 }, "groomSlideStart");
    tl.set(leftPanel.value, { zIndex: 10 }, "groomSlideStart");

    tl.to(rightPanel.value, {
      width: "100%",
      x: 0,
      duration: 1.5,
      ease: "power2.inOut"
    }, "groomSlideStart");

    // Slide only the left panel to the left
    tl.to(leftPanel.value, {
      x: "-85vw",
      width: "15%",
      duration: 1.5,
      ease: "power2.inOut"
    }, "groomSlideStart");

    tl.to(rightLabel.value, {
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut"
    }, "groomSlideStart");

    tl.to(leftLabel.value, {
      opacity: 1,
      duration: 1.2,
      ease: "power2.inOut"
    }, "groomSlideStart");

    // (No rightPanelDecor animation during door swipe)

    // Reveal Groom detailed info
    tl.to(rightInfo.value, {
      opacity: 1,
      y: -50,
      pointerEvents: "auto",
      duration: 1,
      ease: "power2.out"
    }, "groomReveal-=.3");

    // Scroll-triggered reveals for Groom elements (one by one)
    tl.fromTo(rightTitle.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "groomReveal");
    tl.fromTo(rightPhotoWrapper.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "groomReveal+=0.3");
    tl.fromTo(rightName.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "groomReveal+=0.6");
    if (rightParents.value) {
      tl.fromTo(rightParents.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "groomReveal+=0.9");
    }

    // Reveal Groom corner decor
    tl.to(rightPanelDecor.value, {
      opacity: 0.38,
      x: 0,
      duration: 1,
      ease: "power2.out"
    }, "groomReveal-=.3");

    // Hold Groom info
    tl.to({}, { duration: 1 });

    // --- PHASE 2: Reset Groom & Expand Bride (Left Panel) ---
    // Hide Groom detailed info
    tl.to(rightInfo.value, {
      opacity: 0,
      y: -80,
      pointerEvents: "none",
      duration: 0.8,
      ease: "power2.in"
    }, "groomHide");

    // Hide Groom corner decor
    tl.to(rightPanelDecor.value, {
      opacity: 0,
      x: 100,
      duration: 0.8,
      ease: "power2.in"
    }, "groomHide");

    // Shrink Groom panel back and slide left elements back to center
    tl.set(rightPanel.value, { zIndex: 10 }, "resetGroom");
    tl.set(leftPanel.value, { zIndex: 10 }, "resetGroom");

    tl.to(rightPanel.value, {
      width: "15%",
      x: 0,
      duration: 1.5,
      ease: "power2.inOut"
    }, "resetGroom");

    tl.to(leftPanel.value, {
      x: 0,
      width: "15%",
      duration: 1.5,
      ease: "power2.inOut"
    }, "resetGroom");

    tl.to(rightLabel.value, {
      opacity: 1,
      duration: 1.2,
      ease: "power2.inOut"
    }, "resetGroom");

    tl.to(leftLabel.value, {
      opacity: 1,
      duration: 1.2,
      ease: "power2.inOut"
    }, "resetGroom");

    // Set z-indexes for bride slide
    tl.set(leftPanel.value, { zIndex: 12 }, "brideSlideStart");
    tl.set(rightPanel.value, { zIndex: 10 }, "brideSlideStart");

    // Expand Bride panel
    tl.to(leftPanel.value, {
      width: "100%",
      x: 0,
      duration: 1.5,
      ease: "power2.inOut"
    }, "brideSlideStart");

    // Slide only the right panel to the right
    tl.to(rightPanel.value, {
      x: "85vw",
      width: "15%",
      duration: 1.5,
      ease: "power2.inOut"
    }, "brideSlideStart");

    tl.to(leftLabel.value, {
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut"
    }, "brideSlideStart");

    tl.to(rightLabel.value, {
      opacity: 1,
      duration: 1.2,
      ease: "power2.inOut"
    }, "brideSlideStart");

    // (No leftPanelDecor animation during door swipe)

    // Reveal Bride detailed info
    tl.to(leftInfo.value, {
      opacity: 1,
      y: -50,
      pointerEvents: "auto",
      duration: 1,
      ease: "power2.out"
    }, "brideReveal-=.3");

    // Scroll-triggered reveals for Bride elements (one by one)
    tl.fromTo(leftTitle.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "brideReveal");
    tl.fromTo(leftPhotoWrapper.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "brideReveal+=0.3");
    tl.fromTo(leftName.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "brideReveal+=0.6");
    if (leftParents.value) {
      tl.fromTo(leftParents.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "brideReveal+=0.9");
    }

    // Reveal Bride corner decor
    tl.to(leftPanelDecor.value, {
      opacity: 0.38,
      x: 0,
      duration: 1,
      ease: "power2.out"
    }, "brideReveal-=.3");

    // Hold Bride info
    tl.to({}, { duration: 1 });

  }, sectionEl);
});

onUnmounted(() => {
  if (ctx) {
    ctx.revert();
  }
});
</script>
