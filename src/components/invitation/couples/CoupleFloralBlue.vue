<template>
  <section id="couple-section-fb" ref="sectionRef" style="position: relative; z-index: 10; width: 100%; min-height: 100dvh; display: flex; flex-direction: column; justify-content: center; overflow: hidden; background-color: #f0f0f0;">
    <!-- Proportional Container that acts like object-fit: cover while allowing precise absolute positioning -->
    <div style="position: absolute; top: 50%; left: 50%; width: 100vw; height: 177.778vw; min-height: 100vh; min-width: 56.25vh; transform: translate(-50%, -50%);">
      <!-- Background Image -->
      <img src="https://media.mengundanganda.com/floral-blue/quotes%20section/randidewi_a3c9baee-e441-4998-811f-127f8c76b04b.webp" alt="Background" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;" />
      
      <!-- Decorative Flower 0 (Behind Flower 1 and Polaroid, Right of Flower 1) -->
      <div style="position: absolute; top: 26%; left: 65%; width: 30%; z-index: 0; transform: translate(-50%, -50%) rotate(15deg);">
        <img class="couple-floral" src="https://media.mengundanganda.com/floral-blue/couple%20section/randidewi_7e970bd9-26cd-4abf-9bd7-90e04996ce54.webp" alt="Flower Decor 0" style="width: 100%; display: block;" />
      </div>

      <!-- Decorative Flower 1 (Behind Polaroid) -->
      <div style="position: absolute; top: 22%; left: 45%; width: 45%; z-index: 1; transform: translate(-50%, -50%) rotate(-25deg);">
        <img class="couple-floral" src="https://media.mengundanganda.com/floral-blue/couple%20section/randidewi_eccc9f3d-2a78-4e3a-8e21-8041ca457375.webp" alt="Flower Decor 1" style="width: 100%; display: block;" />
      </div>
      
      <!-- Decorative Flower 2 (Behind Polaroid, Overlaps Flower 1) -->
      <div style="position: absolute; top: 30%; left: 33%; width: 30%; z-index: 2; transform: translate(-50%, -50%) rotate(-15deg);">
        <img class="couple-floral" src="https://media.mengundanganda.com/floral-blue/couple%20section/randidewi_4213efe0-6c3c-47c0-a7c2-243b2750659a.webp" alt="Flower Decor 2" style="width: 100%; display: block;" />
      </div>

      <!-- Decorative Flower 3 (Behind Polaroid, Left of Flower 2) -->
      <div style="position: absolute; top: 34%; left: 25%; width: 30%; z-index: 3; transform: translate(-50%, -50%) rotate(-35deg);">
        <img class="couple-floral" src="https://media.mengundanganda.com/floral-blue/couple%20section/randidewi_aa6c83fc-f759-4f19-b50a-d1c159fbaa00.webp" alt="Flower Decor 3" style="width: 100%; display: block;" />
      </div>

      <!-- Decorative Flower 4 (Behind Polaroid, Left of Flower 3) -->
      <div style="position: absolute; top: 43%; left: 20%; width: 20%; z-index: 4; transform: translate(-50%, -50%) rotate(-45deg);">
        <img class="couple-floral" src="https://media.mengundanganda.com/floral-blue/couple%20section/randidewi_19487eb2-19e6-4208-9067-0cfb47c3e3fe.webp" alt="Flower Decor 4" style="width: 100%; display: block;" />
      </div>

      <!-- Decorative Flower 5 (On Top of Polaroid) -->
      <div style="position: absolute; top: 35%; left: 20%; width: 15%; z-index: 6; transform: translate(-50%, -50%) rotate(-10deg);">
        <img class="couple-floral" src="https://media.mengundanganda.com/floral-blue/couple%20section/randidewi_de3577cb-8546-400f-9ae9-4a9a1a1c181c.webp" alt="Flower Decor 5" style="width: 100%; display: block;" />
      </div>

      <!-- Decorative Flower 6 (Right Side, Above Flowers, Below Frame) -->
      <div style="position: absolute; top: 38%; left: 70%; width: 30%; z-index: 3; transform: translate(-50%, -50%) rotate(20deg);">
        <img class="couple-floral" src="https://media.mengundanganda.com/floral-blue/couple%20section/randidewi_5f9754e1-2af2-40c3-b5fa-3b408a63cc14.webp" alt="Flower Decor 6" style="width: 100%; display: block;" />
      </div>

      <!-- Decorative Flower 7 (Far Right, Above Flowers and Frame) -->
      <div style="position: absolute; top: 38%; left: 82%; width: 16%; z-index: 7; transform: translate(-50%, -50%) rotate(35deg);">
        <img class="couple-floral" src="https://media.mengundanganda.com/floral-blue/couple%20section/randidewi_5fbf9c26-af30-4d56-a3c6-9f059fb3845b.webp" alt="Flower Decor 7" style="width: 100%; display: block;" />
      </div>

      <!-- Flower Stems (Bottom of frame, behind it) -->
      <div style="position: absolute; top: 80%; left: 55%; width: 30%; z-index: 4; transform: translate(-50%, -50%) rotate(-5deg);">
        <img class="couple-floral-stem" src="https://media.mengundanganda.com/floral-blue/couple%20section/randidewi_92536967-8fbe-4fac-9070-97b89f4b98ae.webp" alt="Flower Stems" style="width: 100%; display: block;" />
      </div>


      <!-- Polaroid Photo Area -->
      <div style="position: absolute; top: 54.5%; left: 51%; width: 62%; height: 42%; transform: translate(-50%, -50%) rotate(-5deg); z-index: 5; background-color: #fcfcfc; box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.2); border-radius: 3px;">
        <!-- Groom Photo -->
        <div ref="groomPhotoRef" style="position: absolute; top: 4%; left: 5%; width: 90%; height: 78%; overflow: hidden; border-radius: 2px;">
          <img v-if="invitation.groom_photo" :src="resolveAssetUrl(invitation.groom_photo, apiBase)" style="width: 100%; height: 100%; object-fit: cover;" />
          <div v-else style="width: 100%; height: 100%; background: #ddd; display: flex; align-items: center; justify-content: center;">Groom</div>
          <!-- Inset Shadow Overlay for Depth -->
          <div style="position: absolute; inset: 0; box-shadow: inset 0px 2px 10px rgba(0,0,0,0.25); pointer-events: none;"></div>
        </div>
        
        <!-- Bride Photo -->
        <div ref="bridePhotoRef" style="position: absolute; top: 4%; left: 5%; width: 90%; height: 78%; overflow: hidden; opacity: 0; border-radius: 2px;">
          <img v-if="invitation.bride_photo" :src="resolveAssetUrl(invitation.bride_photo, apiBase)" style="width: 100%; height: 100%; object-fit: cover;" />
          <div v-else style="width: 100%; height: 100%; background: #ccc; display: flex; align-items: center; justify-content: center;">Bride</div>
          <!-- Inset Shadow Overlay for Depth -->
          <div style="position: absolute; inset: 0; box-shadow: inset 0px 2px 10px rgba(0,0,0,0.25); pointer-events: none;"></div>
        </div>

        <!-- Groom Text -->
        <div ref="groomTextRef" style="position: absolute; bottom: 0; left: 0; width: 100%; height: 18%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: #4a5c6a;" :style="{ fontFamily: themeConfig.fontHeading }">
          The Groom
        </div>

        <!-- Bride Text -->
        <div ref="brideTextRef" style="position: absolute; bottom: 0; left: 0; width: 100%; height: 18%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: #4a5c6a; opacity: 0;" :style="{ fontFamily: themeConfig.fontHeading }">
          The Bride
        </div>

        <!-- Groom Info (Back of Polaroid) -->
        <div ref="groomInfoRef" style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; opacity: 0; z-index: 10;">
          <h2 style="font-family: 'Caveat', cursive; font-size: 2rem; font-weight: 700; color: #2c3e50; margin-bottom: 0.5rem; text-align: center; line-height: 1.1;">
            {{ invitation.groom_full_name }}
          </h2>
          <p style="font-family: 'Caveat', cursive; font-size: 1rem; font-weight: 600; color: #4a5c6a; letter-spacing: 0.05em; line-height: 1.2; text-align: center; margin: 0;">
            Putra dari Bpk. {{ invitation.groom_father }} &amp;<br>Ibu {{ invitation.groom_mother }}
          </p>
        </div>

        <!-- Bride Info (Back of Polaroid) -->
        <div ref="brideInfoRef" style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; opacity: 0; z-index: 10;">
          <h2 style="font-family: 'Caveat', cursive; font-size: 2rem; font-weight: 700; color: #2c3e50; margin-bottom: 0.5rem; text-align: center; line-height: 1.1;">
            {{ invitation.bride_full_name }}
          </h2>
          <p style="font-family: 'Caveat', cursive; font-size: 1rem; font-weight: 600; color: #4a5c6a; letter-spacing: 0.05em; line-height: 1.2; text-align: center; margin: 0;">
            Putri dari Bpk. {{ invitation.bride_father }} &amp;<br>Ibu {{ invitation.bride_mother }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { resolveAssetUrl } from '@/utils/url';

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
  apiBase: string;
}>();

const sectionRef = ref<HTMLElement | null>(null);
const bridePhotoRef = ref<HTMLElement | null>(null);
const brideTextRef = ref<HTMLElement | null>(null);
const groomPhotoRef = ref<HTMLElement | null>(null);
const groomTextRef = ref<HTMLElement | null>(null);
const groomInfoRef = ref<HTMLElement | null>(null);
const brideInfoRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  ctx = gsap.context(() => {
    const crossfadeTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: '+=800%',
        pin: true,
        scrub: 1, // Add smoothing so fast scrolling doesn't skip animations
      }
    });

    // Hold Groom Photo initially
    crossfadeTl.to({}, { duration: 0.5 });

    // 1. Fade out Groom Photo & "The Groom"
    crossfadeTl.to([groomPhotoRef.value, groomTextRef.value], { opacity: 0, ease: 'none', duration: 1 });
    
    // 2. Fade in Groom Info (Back of polaroid)
    crossfadeTl.to(groomInfoRef.value, { opacity: 1, ease: 'none', duration: 1 });
    
    // Hold Groom Info
    crossfadeTl.to({}, { duration: 1.5 });

    // 3. Fade out Groom Info
    crossfadeTl.to(groomInfoRef.value, { opacity: 0, ease: 'none', duration: 1 });
    
    // 4. Fade in Bride Photo & "The Bride"
    crossfadeTl.to([bridePhotoRef.value, brideTextRef.value], { opacity: 1, ease: 'none', duration: 1 });
    
    // Hold Bride Photo
    crossfadeTl.to({}, { duration: 1.5 });

    // 5. Fade out Bride Photo & "The Bride"
    crossfadeTl.to([bridePhotoRef.value, brideTextRef.value], { opacity: 0, ease: 'none', duration: 1 });
    
    // 6. Fade in Bride Info
    crossfadeTl.to(brideInfoRef.value, { opacity: 1, ease: 'none', duration: 1 });

    // 7. Hold Bride Info so it doesn't immediately scroll away
    crossfadeTl.to({}, { duration: 2 });

    const florals = gsap.utils.toArray('.couple-floral');
    const stem = gsap.utils.toArray('.couple-floral-stem')[0] as HTMLElement | undefined;

    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 75%", // Triggers when 25% of the section is visible
        toggleActions: "play none none reverse"
      }
    });

    // Stem animates from scale 0
    if (stem) {
      entranceTl.from(stem, {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
      }, 0);
    }

    florals.forEach((floral: any, index: number) => {
      // Entrance pop-in (scale + opacity only to preserve exact y/x coordinates)
      entranceTl.from(floral, {
        scale: 0,
        opacity: 0,
        duration: 1.5 + Math.random() * 0.5,
        ease: "back.out(1.2)"
      }, index * 0.2); // stagger by 0.2s

      // Continuous random sway
      const swayDirection = Math.random() > 0.5 ? 1 : -1;
      const swayAngle = 6 + Math.random() * 6; // 6 to 12 degrees (stronger sway)
      
      gsap.to(floral, {
        rotation: `+=${swayAngle * swayDirection}`,
        duration: 1.5 + Math.random() * 1.5, // 1.5s to 3s (faster sway)
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: (index * 0.2) + 1.5 
      });
    });
  }, sectionRef.value!);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');
/* Removed the wavy masks to ensure the section connects directly to the previous one without empty spaces */
</style>
