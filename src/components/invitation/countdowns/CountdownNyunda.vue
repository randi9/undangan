<template>
  <section v-if="hasDate" ref="sectionRef" :class="{ 'start-animation': isAnimated }" style="height: 75dvh; padding: 24px; text-align: center; background-color: #6F4E3F; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center;">
    
    <!-- ========================================== -->
    <!-- GROUP 1: BOTTOM FLOWER ORNAMENTS (Berjejer) -->
    <!-- ========================================== -->
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_efb79ed3-e335-4c8b-9a4e-abbfdd60e6db.webp" 
      alt="Flower Bottom 1" 
      class="decor-flower flower-bottom"
      style="position: absolute; bottom: -100px; left: -10%; width: 150px; height: auto; z-index: 2; pointer-events: none; --enter-delay: 0.0s; --sway-dur: 9.2s; --sway-max: 8deg; --sway-min: -8deg;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_d7340a5c-64e9-4d49-98ff-65c76ecf7d50.webp" 
      alt="Flower Bottom 2" 
      class="decor-flower flower-bottom"
      style="position: absolute; bottom: -80px; left: 10%; width: 140px; height: auto; z-index: 3; pointer-events: none; --enter-delay: 0.2s; --sway-dur: 8.5s; --sway-max: -9deg; --sway-min: 9deg;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_b5c15a67-7388-4dd9-817b-ad2237f0319f.webp" 
      alt="Flower Bottom 3" 
      class="decor-flower flower-bottom"
      style="position: absolute; bottom: -80px; left: 13%; width: 210px; height: auto; z-index: 2; pointer-events: none; --enter-delay: 0.4s; --sway-dur: 10.8s; --sway-max: 7deg; --sway-min: -7deg;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_9fda990a-cdff-46e3-bc11-70878d128962.webp" 
      alt="Flower Bottom 4" 
      class="decor-flower flower-bottom"
      style="position: absolute; bottom: -100px; left: 38%; width: 160px; height: auto; z-index: 1; pointer-events: none; --enter-delay: 0.6s; --sway-dur: 9.8s; --sway-max: -8deg; --sway-min: 8deg;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_214868fb-3d32-4992-9025-77275e6c9840.webp" 
      alt="Flower Bottom 5" 
      class="decor-flower flower-bottom"
      style="position: absolute; bottom: -160px; left: 70%; width: 340px; height: auto; z-index: 2; pointer-events: none; --enter-delay: 0.8s; --sway-dur: 11.2s; --sway-max: 10deg; --sway-min: -10deg;" 
    />

    <!-- ========================================== -->
    <!-- GROUP 2: TOP FLOWER ORNAMENTS (Mirrored Vertically) -->
    <!-- ========================================== -->
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_efb79ed3-e335-4c8b-9a4e-abbfdd60e6db.webp" 
      alt="Flower Top 1" 
      class="decor-flower flower-top"
      style="position: absolute; top: -120px; left: -10%; width: 150px; height: auto; z-index: 2; pointer-events: none; --enter-delay: 0.0s; --sway-dur: 9.1s; --sway-max: -8deg; --sway-min: 8deg;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_d7340a5c-64e9-4d49-98ff-65c76ecf7d50.webp" 
      alt="Flower Top 2" 
      class="decor-flower flower-top"
      style="position: absolute; top: -70px; left: 10%; width: 140px; height: auto; z-index: 3; pointer-events: none; --enter-delay: 0.2s; --sway-dur: 8.4s; --sway-max: 9deg; --sway-min: -9deg;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_b5c15a67-7388-4dd9-817b-ad2237f0319f.webp" 
      alt="Flower Top 3" 
      class="decor-flower flower-top"
      style="position: absolute; top: -80px; left: 13%; width: 210px; height: auto; z-index: 2; pointer-events: none; --enter-delay: 0.4s; --sway-dur: 10.6s; --sway-max: -7deg; --sway-min: 7deg;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_9fda990a-cdff-46e3-bc11-70878d128962.webp" 
      alt="Flower Top 4" 
      class="decor-flower flower-top"
      style="position: absolute; top: -100px; left: 38%; width: 160px; height: auto; z-index: 1; pointer-events: none; --enter-delay: 0.6s; --sway-dur: 10.0s; --sway-max: 8deg; --sway-min: -8deg;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_214868fb-3d32-4992-9025-77275e6c9840.webp" 
      alt="Flower Top 5" 
      class="decor-flower flower-top"
      style="position: absolute; top: -180px; left: 70%; width: 340px; height: auto; z-index: 2; pointer-events: none; --enter-delay: 0.8s; --sway-dur: 11.0s; --sway-max: -10deg; --sway-min: 10deg;" 
    />

    <!-- ========================================== -->
    <!-- GROUP 3: LEFT FLOWER ORNAMENTS (Rotated 90deg Clockwise) -->
    <!-- ========================================== -->
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_d7340a5c-64e9-4d49-98ff-65c76ecf7d50.webp" 
      alt="Flower Left 2" 
      class="decor-flower flower-left"
      style="position: absolute; top: 7%; left: -70px; width: 140px; height: auto; z-index: 1; pointer-events: none; --enter-delay: 1.0s; --sway-dur: 8.8s; --sway-max: 8deg; --sway-min: -8deg;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_b5c15a67-7388-4dd9-817b-ad2237f0319f.webp" 
      alt="Flower Left 3" 
      class="decor-flower flower-left"
      style="position: absolute; top: 14%; left: -120px; width: 210px; height: auto; z-index: 1; pointer-events: none; --enter-delay: 1.2s; --sway-dur: 10.5s; --sway-max: -9deg; --sway-min: 9deg;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_9fda990a-cdff-46e3-bc11-70878d128962.webp" 
      alt="Flower Left 4" 
      class="decor-flower flower-left"
      style="position: absolute; top: 28%; left: -80px; width: 150px; height: auto; z-index: 1; pointer-events: none; --enter-delay: 1.4s; --sway-dur: 9.9s; --sway-max: 7deg; --sway-min: -7deg;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_d7340a5c-64e9-4d49-98ff-65c76ecf7d50.webp" 
      alt="Flower Left 2" 
      class="decor-flower flower-left"
      style="position: absolute; top: 49%; left: -70px; width: 140px; height: auto; z-index: 2; pointer-events: none; --enter-delay: 1.6s; --sway-dur: 10.7s; --sway-max: -8deg; --sway-min: 8deg;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_214868fb-3d32-4992-9025-77275e6c9840.webp" 
      alt="Flower Left 5" 
      class="decor-flower flower-left"
      style="position: absolute; top: 69%; left: -195px; width: 310px; height: auto; z-index: 1; pointer-events: none; --enter-delay: 1.8s; --sway-dur: 11.1s; --sway-max: 9deg; --sway-min: -9deg;" 
    />

    <!-- ========================================== -->
    <!-- GROUP 4: RIGHT FLOWER ORNAMENTS (Rotated -90deg Counter-Clockwise) -->
    <!-- ========================================== -->
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_d7340a5c-64e9-4d49-98ff-65c76ecf7d50.webp" 
      alt="Flower Right 2" 
      class="decor-flower flower-right"
      style="position: absolute; top: 8%; right: -70px; width: 140px; height: auto; z-index: 1; pointer-events: none; --enter-delay: 1.0s; --sway-dur: 8.9s; --sway-max: -8deg; --sway-min: 8deg;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_b5c15a67-7388-4dd9-817b-ad2237f0319f.webp" 
      alt="Flower Right 3" 
      class="decor-flower flower-right"
      style="position: absolute; top: 18%; right: -100px; width: 210px; height: auto; z-index: 1; pointer-events: none; --enter-delay: 1.2s; --sway-dur: 10.6s; --sway-max: 9deg; --sway-min: -9deg;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_9fda990a-cdff-46e3-bc11-70878d128962.webp" 
      alt="Flower Right 4" 
      class="decor-flower flower-right"
      style="position: absolute; top: 36%; right: -99px; width: 150px; height: auto; z-index: 1; pointer-events: none; --enter-delay: 1.4s; --sway-dur: 10.0s; --sway-max: -7deg; --sway-min: 7deg;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_214868fb-3d32-4992-9025-77275e6c9840.webp" 
      alt="Flower Right 5" 
      class="decor-flower flower-right"
      style="position: absolute; top: 50%; right: -150px; width: 260px; height: auto; z-index: 1; pointer-events: none; --enter-delay: 1.6s; --sway-dur: 10.9s; --sway-max: 8deg; --sway-min: -8deg;" 
    />

    <!-- Subtle background pattern -->
    <div style="position: absolute; inset: 0; opacity: 0.02; pointer-events: none; background-image: radial-gradient(#F5E6D0 1.2px, transparent 1.2px); background-size: 24px 24px; z-index: 0;"></div>

    <h2 :style="{ 
      fontFamily: themeConfig.fontHeading || 'Playfair Display, serif', 
      color: '#F5E6D0', 
      fontSize: 'clamp(1.6rem, 5vw, 2.1rem)', 
      fontWeight: '600',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      textShadow: '2px 4px 8px rgba(0, 0, 0, 0.35)',
      lineHeight: '1.3',
      marginBottom: '40px',
      position: 'relative',
      zIndex: 2
    }">
      Menuju<br />Hari Bahagia
    </h2>

    <!-- Countdown Cards (Portrait 3:4 aspect ratio, split into 2 rows) -->
    <div style="display: flex; flex-direction: column; align-items: center; gap: clamp(12px, 3.5vw, 20px); position: relative; z-index: 2; width: 100%;">
      <!-- Row 1: Hari & Jam -->
      <div style="display: flex; justify-content: center; gap: clamp(12px, 3.5vw, 20px); width: 100%;">
        <!-- Days Card -->
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: clamp(80px, 22vw, 100px);
          height: clamp(107px, 29.3vw, 133px);
          border: 1px solid rgba(245, 230, 208, 0.25);
          background-color: rgba(245, 230, 208, 0.05);
          border-radius: 12px;
          backdrop-filter: blur(4px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        ">
          <div style="font-size: clamp(2rem, 6vw, 2.8rem); font-weight: 700; color: #F5E6D0; line-height: 1; font-family: 'Playfair Display', serif;">{{ countdown.days }}</div>
          <div style="font-size: clamp(0.75rem, 2.2vw, 0.9rem); color: #EAD0B3; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 6px; font-weight: 500;">Hari</div>
        </div>

        <!-- Hours Card -->
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: clamp(80px, 22vw, 100px);
          height: clamp(107px, 29.3vw, 133px);
          border: 1px solid rgba(245, 230, 208, 0.25);
          background-color: rgba(245, 230, 208, 0.05);
          border-radius: 12px;
          backdrop-filter: blur(4px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        ">
          <div style="font-size: clamp(2rem, 6vw, 2.8rem); font-weight: 700; color: #F5E6D0; line-height: 1; font-family: 'Playfair Display', serif;">{{ countdown.hours }}</div>
          <div style="font-size: clamp(0.75rem, 2.2vw, 0.9rem); color: #EAD0B3; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 6px; font-weight: 500;">Jam</div>
        </div>
      </div>

      <!-- Row 2: Menit & Detik -->
      <div style="display: flex; justify-content: center; gap: clamp(12px, 3.5vw, 20px); width: 100%;">
        <!-- Minutes Card -->
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: clamp(80px, 22vw, 100px);
          height: clamp(107px, 29.3vw, 133px);
          border: 1px solid rgba(245, 230, 208, 0.25);
          background-color: rgba(245, 230, 208, 0.05);
          border-radius: 12px;
          backdrop-filter: blur(4px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        ">
          <div style="font-size: clamp(2rem, 6vw, 2.8rem); font-weight: 700; color: #F5E6D0; line-height: 1; font-family: 'Playfair Display', serif;">{{ countdown.minutes }}</div>
          <div style="font-size: clamp(0.75rem, 2.2vw, 0.9rem); color: #EAD0B3; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 6px; font-weight: 500;">Menit</div>
        </div>

        <!-- Seconds Card -->
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: clamp(80px, 22vw, 100px);
          height: clamp(107px, 29.3vw, 133px);
          border: 1px solid rgba(245, 230, 208, 0.25);
          background-color: rgba(245, 230, 208, 0.05);
          border-radius: 12px;
          backdrop-filter: blur(4px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        ">
          <div style="font-size: clamp(2rem, 6vw, 2.8rem); font-weight: 700; color: #F5E6D0; line-height: 1; font-family: 'Playfair Display', serif;">{{ countdown.seconds }}</div>
          <div style="font-size: clamp(0.75rem, 2.2vw, 0.9rem); color: #EAD0B3; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 6px; font-weight: 500;">Detik</div>
        </div>
      </div>
    </div>

    <!-- Calendar Reminder -->
    <a 
      v-if="invitation && (invitation.akad_date || invitation.resepsi_date)" 
      :href="getCalendarUrl()" 
      target="_blank" 
      class="calendar-btn"
      style="display: inline-block; margin-top: 40px; padding: 12px 32px; background-color: #F5E6D0; color: #6F4E3F; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; letter-spacing: 0.1em; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25); transition: all 0.3s ease; position: relative; z-index: 2;"
    >
      Ingatkan Saya
    </a>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { generateGoogleCalendarUrl } from '@/utils/calendar';

const props = defineProps<{
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  themeConfig: ThemeConfig;
  hasDate: boolean;
  invitation?: Invitation;
}>();

const sectionRef = ref<HTMLElement | null>(null);
const isAnimated = ref(false);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (sectionRef.value) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isAnimated.value = true;
          observer?.disconnect();
        }
      });
    }, {
      threshold: 0.9
    });
    observer.observe(sectionRef.value);
  }
});

onUnmounted(() => {
  observer?.disconnect();
});

function getCalendarUrl() {
  if (!props.invitation) return '#';
  const dateStr = props.invitation.akad_date || props.invitation.resepsi_date;
  const timeStr = props.invitation.akad_date ? props.invitation.akad_time : props.invitation.resepsi_time;
  const venue = props.invitation.akad_date ? props.invitation.akad_venue : props.invitation.resepsi_venue;
  const address = props.invitation.akad_date ? props.invitation.akad_address : props.invitation.resepsi_address;
  if (!dateStr) return '#';
  return generateGoogleCalendarUrl({
    title: `Pernikahan ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`,
    date: dateStr,
    time: timeStr,
    venue: venue,
    address: address,
    description: `Undangan Pernikahan ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`,
  });
}
</script>

<style scoped>
.calendar-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.35) !important;
  background-color: #FFF8E7 !important;
}

.calendar-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.35) !important;
  background-color: #FFF8E7 !important;
}

.decor-flower {
  opacity: 0;
  transform-origin: center center;
}

/* Bottom Flowers */
.decor-flower.flower-bottom {
  transform-origin: bottom center;
  --base-transform: scale(1);
  --enter-translate: translateY(60px);
}

/* Top Flowers */
.decor-flower.flower-top {
  transform-origin: center center;
  --base-transform: scaleY(-1);
  --enter-translate: translateY(-60px);
}

/* Left Flowers */
.decor-flower.flower-left {
  transform-origin: center center;
  --base-transform: rotate(90deg);
  --enter-translate: translateX(-60px);
}

/* Right Flowers */
.decor-flower.flower-right {
  transform-origin: center center;
  --base-transform: rotate(-90deg);
  --enter-translate: translateX(60px);
}

.decor-flower {
  transform: var(--enter-translate) var(--base-transform);
}

.start-animation .decor-flower {
  animation: 
    flower-enter 2.2s cubic-bezier(0.25, 1, 0.5, 1) var(--enter-delay, 0s) forwards,
    sway var(--sway-dur, 10s) ease-in-out calc(var(--enter-delay, 0s) + 2.2s) infinite;
}

@keyframes flower-enter {
  0% {
    opacity: 0;
    transform: var(--enter-translate) var(--base-transform);
  }
  100% {
    opacity: 1;
    transform: translate(0) var(--base-transform);
  }
}

@keyframes sway {
  0% {
    transform: var(--base-transform, scale(1)) rotate(0deg);
  }
  25% {
    transform: var(--base-transform, scale(1)) rotate(var(--sway-max, 8deg));
  }
  75% {
    transform: var(--base-transform, scale(1)) rotate(var(--sway-min, -8deg));
  }
  100% {
    transform: var(--base-transform, scale(1)) rotate(0deg);
  }
}
</style>
