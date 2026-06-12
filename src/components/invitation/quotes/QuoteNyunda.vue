<template>
  <section 
    v-if="quote" 
    ref="sectionRef"
    :style="{
      minHeight: '90dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      textAlign: 'center',
      backgroundColor: themeConfig?.bg || '#FFF8E7',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }"
  >
    <!-- Background Damask Pattern -->
    <div 
      style="
        position: absolute;
        inset: 0;
        background-image: url('https://media.mengundanganda.com/nyunda/quotes%20section/dewirandi_f9a640eb-27a5-4cdd-9cb4-7518187da80c.webp');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        opacity: 0.3;                /* SESUAIKAN OPASITAS DI SINI: dikurangi setengah dari 0.2 menjadi 0.1 */
        pointer-events: none;
        z-index: 1;
      "
    ></div>

    <!-- Quote Text Container -->
    <div 
      ref="quoteTextRef" 
      :style="{
        maxWidth: '240px',
        width: '100%',
        opacity: 0,
        transform: 'translateY(24px)',
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'rgba(236, 232, 223, 0.75)',
        backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45), rgba(236, 232, 223, 0.25))',
        backdropFilter: 'blur(50px)',
        WebkitBackdropFilter: 'blur(50px)',
        borderRadius: '120px 120px 0 0',
        padding: '50px 20px 35px 20px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box'
      }"
    >
      <!-- Elegant Quote Mark (Top) -->
      <div 
        :style="{ 
          fontFamily: 'Georgia, serif', 
          fontSize: '2.4rem', 
          lineHeight: '1', 
          color: '#5B5A4B',
          opacity: 0.25,
          marginBottom: '-6px'
        }"
      >
        “
      </div>

      <blockquote 
        :style="{ 
          fontFamily: '\'Cormorant Garamond\', Georgia, serif',
          fontWeight: '600',
          fontSize: '1.1rem',
          fontStyle: 'italic',
          color: '#5A5848',
          lineHeight: '1.6',
          margin: '0 auto',
          whiteSpace: 'pre-line',
          wordBreak: 'break-word',
          position: 'relative',
          zIndex: 2
        }"
      >
        {{ quote }}
      </blockquote>

      <!-- Elegant Quote Mark (Bottom) -->
      <div 
        :style="{ 
          fontFamily: 'Georgia, serif', 
          fontSize: '2.4rem', 
          lineHeight: '1', 
          color: '#5B5A4B',
          opacity: 0.25,
          marginTop: '6px',
          display: 'inline-block',
          transform: 'rotate(180deg)'
        }"
      >
        “
      </div>
    </div>

    <!-- Flower Center Decor Wrapper: Animate entrance here -->
    <div
      ref="flowerRef"
      style="
        position: absolute;
        bottom: -20px;           /* SESUAIKAN POSISI VERTIKAL: e.g. -20px untuk lebih ke bawah, 10px untuk lebih ke atas */
        left: 52%;             /* Centering horizontal */
        transform: translateX(-50%) translateY(300px) scale(0.85); /* Animasi awal: geser jauh ke bawah (300px) agar tidak terlihat */
        opacity: 0;            /* Mulai dari tidak terlihat */
        width: 470px;          /* SESUAIKAN UKURAN LEBAR DI SINI: e.g. 120px untuk lebih kecil, 180px untuk lebih besar */
        z-index: 5;            /* Sesuaikan tumpukan jika ingin di depan/belakang container teks */
        pointer-events: none;  /* Agar tidak mengganggu klik/interaksi sentuh */
      "
    >
      <!-- Flower Image with CSS Sway Animation -->
      <img 
        src="https://media.mengundanganda.com/nyunda/quotes%20section/dewirandi_a39f6ede-6c09-4976-a13b-55dba23a53bc.webp"
        class="sway-flower"
        style="
          width: 100%;
          max-width: none !important; /* Mencegah batasan lebar layar dari CSS global/reset */
          height: auto;          /* Menjaga proporsi gambar */
          display: block;
        "
        alt="Flower Center Decor"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { ThemeConfig } from '@/types/theme';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

defineProps<{
  quote: string;
  themeConfig: ThemeConfig;
}>();

const sectionRef = ref<HTMLElement | null>(null);
const quoteTextRef = ref<HTMLElement | null>(null);
const flowerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!sectionRef.value || !quoteTextRef.value) return;

  gsap.to(quoteTextRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 30%',
      toggleActions: 'play none none none'
    }
  });

  if (flowerRef.value) {
    gsap.to(flowerRef.value, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.5, // Durasi sedikit lebih lama agar gerakan meluncur dari bawah terlihat anggun
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 30%',
        toggleActions: 'play none none none'
      }
    });
  }
});
</script>

<style scoped>
@keyframes flower-sway {
  0% {
    transform: rotate(-1.5deg);
  }
  100% {
    transform: rotate(1.5deg);
  }
}

.sway-flower {
  animation: flower-sway 6s ease-in-out infinite alternate;
  transform-origin: bottom center;
}
</style>
