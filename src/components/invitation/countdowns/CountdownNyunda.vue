<template>
  <section v-if="hasDate" style="height: 75dvh; padding: 24px; text-align: center; background-color: #5C3D2E; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center;">
    
    <!-- ========================================== -->
    <!-- GROUP 1: BOTTOM FLOWER ORNAMENTS (Berjejer) -->
    <!-- ========================================== -->
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_efb79ed3-e335-4c8b-9a4e-abbfdd60e6db.webp" 
      alt="Flower Bottom 1" 
      style="position: absolute; bottom: -90px; left: -10%; width: 160px; height: auto; z-index: 2; opacity: 1; pointer-events: none;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_d7340a5c-64e9-4d49-98ff-65c76ecf7d50.webp" 
      alt="Flower Bottom 2" 
      style="position: absolute; bottom: -70px; left: 10%; width: 150px; height: auto; z-index: 3; opacity: 1; pointer-events: none;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_b5c15a67-7388-4dd9-817b-ad2237f0319f.webp" 
      alt="Flower Bottom 3" 
      style="position: absolute; bottom: -70px; left: 13%; width: 220px; height: auto; z-index: 2; opacity: 1; pointer-events: none;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_9fda990a-cdff-46e3-bc11-70878d128962.webp" 
      alt="Flower Bottom 4" 
      style="position: absolute; bottom: -90px; left: 38%; width: 170px; height: auto; z-index: 1; opacity: 1; pointer-events: none;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_214868fb-3d32-4992-9025-77275e6c9840.webp" 
      alt="Flower Bottom 5" 
      style="position: absolute; bottom: -130px; left: 70%; width: 350px; height: auto; z-index: 2; opacity: 1; pointer-events: none;" 
    />

    <!-- ========================================== -->
    <!-- GROUP 2: TOP FLOWER ORNAMENTS (Mirrored Vertically) -->
    <!-- ========================================== -->
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_efb79ed3-e335-4c8b-9a4e-abbfdd60e6db.webp" 
      alt="Flower Top 1" 
      style="position: absolute; top: -110px; left: -10%; width: 160px; height: auto; z-index: 2; opacity: 1; transform: scaleY(-1); pointer-events: none;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_d7340a5c-64e9-4d49-98ff-65c76ecf7d50.webp" 
      alt="Flower Top 2" 
      style="position: absolute; top: -70px; left: 10%; width: 150px; height: auto; z-index: 3; opacity: 1; transform: scaleY(-1); pointer-events: none;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_b5c15a67-7388-4dd9-817b-ad2237f0319f.webp" 
      alt="Flower Top 3" 
      style="position: absolute; top: -70px; left: 13%; width: 220px; height: auto; z-index: 2; opacity: 1; transform: scaleY(-1); pointer-events: none;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_9fda990a-cdff-46e3-bc11-70878d128962.webp" 
      alt="Flower Top 4" 
      style="position: absolute; top: -90px; left: 38%; width: 170px; height: auto; z-index: 1; opacity: 1; transform: scaleY(-1); pointer-events: none;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_214868fb-3d32-4992-9025-77275e6c9840.webp" 
      alt="Flower Top 5" 
      style="position: absolute; top: -150px; left: 70%; width: 350px; height: auto; z-index: 2; opacity: 1; transform: scaleY(-1); pointer-events: none;" 
    />

    <!-- ========================================== -->
    <!-- GROUP 3: LEFT FLOWER ORNAMENTS (Rotated 90deg Clockwise) -->
    <!-- ========================================== -->
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_d7340a5c-64e9-4d49-98ff-65c76ecf7d50.webp" 
      alt="Flower Left 2" 
      style="position: absolute; top: 13%; left: -60px; width: 150px; height: auto; z-index: 1; opacity: 1; transform: rotate(90deg); pointer-events: none;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_b5c15a67-7388-4dd9-817b-ad2237f0319f.webp" 
      alt="Flower Left 3" 
      style="position: absolute; top: 25%; left: -110px; width: 220px; height: auto; z-index: 1; opacity: 1; transform: rotate(90deg); pointer-events: none;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_9fda990a-cdff-46e3-bc11-70878d128962.webp" 
      alt="Flower Left 4" 
      style="position: absolute; top: 40%; left: -85px; width: 160px; height: auto; z-index: 1; opacity: 1; transform: rotate(90deg); pointer-events: none;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_214868fb-3d32-4992-9025-77275e6c9840.webp" 
      alt="Flower Left 5" 
      style="position: absolute; top: 70%; left: -160px; width: 270px; height: auto; z-index: 1; opacity: 1; transform: rotate(90deg); pointer-events: none;" 
    />

    <!-- ========================================== -->
    <!-- GROUP 4: RIGHT FLOWER ORNAMENTS (Rotated -90deg Counter-Clockwise) -->
    <!-- ========================================== -->
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_d7340a5c-64e9-4d49-98ff-65c76ecf7d50.webp" 
      alt="Flower Right 2" 
      style="position: absolute; top: 13%; right: -60px; width: 150px; height: auto; z-index: 1; opacity: 1; transform: rotate(-90deg); pointer-events: none;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_b5c15a67-7388-4dd9-817b-ad2237f0319f.webp" 
      alt="Flower Right 3" 
      style="position: absolute; top: 25%; right: -110px; width: 220px; height: auto; z-index: 1; opacity: 1; transform: rotate(-90deg); pointer-events: none;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_9fda990a-cdff-46e3-bc11-70878d128962.webp" 
      alt="Flower Right 4" 
      style="position: absolute; top: 40%; right: -85px; width: 160px; height: auto; z-index: 1; opacity: 1; transform: rotate(-90deg); pointer-events: none;" 
    />
    <img 
      src="https://media.mengundanganda.com/nyunda/counter%20section/dewirandi_214868fb-3d32-4992-9025-77275e6c9840.webp" 
      alt="Flower Right 5" 
      style="position: absolute; top: 60%; right: -160px; width: 270px; height: auto; z-index: 1; opacity: 1; transform: rotate(-90deg); pointer-events: none;" 
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
      marginBottom: '40px',
      position: 'relative',
      zIndex: 2
    }">
      Menghitung Hari
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
      style="display: inline-block; margin-top: 40px; padding: 12px 32px; background-color: #F5E6D0; color: #5C3D2E; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; letter-spacing: 0.1em; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15); transition: all 0.3s ease; position: relative; z-index: 2;"
    >
      Ingatkan Saya
    </a>
  </section>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { generateGoogleCalendarUrl } from '@/utils/calendar';

const props = defineProps<{
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  themeConfig: ThemeConfig;
  hasDate: boolean;
  invitation?: Invitation;
}>();

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
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25) !important;
  background-color: #FFF8E7 !important;
}
</style>
