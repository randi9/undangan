<template>
  <footer
    ref="footerSection"
    class="min-h-[50dvh] flex flex-col justify-center py-16 md:py-24 px-6 sm:px-8 bg-transparent text-[#1d3d27] relative text-center"
    style="overflow: hidden; margin-top: -50px;"
  >

    <!-- Content -->
    <div
      class="relative z-10 w-full max-w-md mx-auto px-8 sm:px-12 flex flex-col items-center text-center my-auto"
      style="transform: translateY(-70px);"
    >

      <!-- Thank You Statement -->
      <div ref="contentRef" class="w-full text-center opacity-0 translate-y-6">
        <p class="text-[11px] md:text-xs uppercase tracking-[0.3em] text-[#1d3d27] font-bold leading-relaxed mb-4 md:mb-5 text-center">Terima Kasih</p>
        <!-- Container full-width, isi teks dikunci di tengah secara horizontal -->
        <div class="w-full flex justify-center mb-8 md:mb-10">
          <p class="text-sm md:text-lg font-serif italic leading-relaxed md:leading-loose text-[#1d3d27]/90 text-center w-full max-w-[290px] sm:max-w-sm" style="font-family: 'Cormorant Garamond', Georgia, serif;">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.
          </p>
        </div>

        <div class="w-12 h-[1.5px] bg-[#1d3d27]/30 mx-auto mb-8 md:mb-10"></div>

        <h3 class="text-[26px] md:text-5xl font-serif text-[#1d3d27] font-semibold tracking-wide leading-tight mb-4 md:mb-5 break-words text-center" style="font-family: 'Cormorant Garamond', Georgia, serif;">
          {{ invitation.groom_name }} &amp; {{ invitation.bride_name }}
        </h3>
        <p class="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#1d3d27]/80 font-semibold leading-relaxed text-center mt-12 md:mt-16">Sampai Jumpa Di Hari Bahagia Kami</p>
      </div>
    </div>

    <!-- Lily Pad Asset 1 (Left) -->
    <div
      ref="lilyPad1Ref"
      style="
        position: absolute;
        z-index: -5;
        pointer-events: none;
        bottom: -15%;
        left: -120px;
        width: 85%;
        transform: rotate(0deg) scaleY(0.9);
        opacity: 0;
      "
    >
      <img
        src="https://media.mengundanganda.com/evergreen/rsvp/dewirandi_989d1ad6-7758-4528-bff2-f5d561e21e8e.webp"
        alt="Evergreen Lily Pad 1"
        style="
          width: 100%;
          height: auto;
          display: block;
        "
      />
    </div>

    <!-- Lily Pad Asset 2 (Right) -->
    <div
      ref="lilyPad2Ref"
      style="
        position: absolute;
        z-index: -5;
        pointer-events: none;
        bottom: -5%;
        right: -150px;
        width: 70%;
        transform: rotate(0deg) scaleY(0.9);
        opacity: 0;
      "
    >
      <img
        src="https://media.mengundanganda.com/evergreen/rsvp/dewirandi_3b2fe303-8fb3-4ecf-bcbf-f3477320de08.webp"
        alt="Evergreen Lily Pad 2"
        style="
          width: 100%;
          height: auto;
          display: block;
        "
      />
    </div>

    <!-- Brand Footer -->
    <div
      class="absolute bottom-4 left-0 right-0 flex flex-col justify-center items-center pointer-events-none select-none"
    >
      <span style="font-family: sans-serif; font-size: 9px; font-weight: 300; letter-spacing: 0.1em; color: #1d3d27; opacity: 0.6; text-transform: uppercase; margin-bottom: 2px;">
        powered by
      </span>
      <div style="font-family: sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.03em; color: #1d3d27;">
        MengundangAnda
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Invitation } from '@/types/invitation';
import type { ThemeConfig } from '@/types/theme';

gsap.registerPlugin(ScrollTrigger);

const props = withDefaults(
  defineProps<{
    invitation: Invitation;
    themeConfig?: ThemeConfig;
    footerImage?: string;
    bgPosition?: string; // Contoh: 'center top', 'center 30%', '50% 70%', dll.
  }>(),
  {
    footerImage:
      'https://media.mengundanganda.com/evergreen/footer%20section/dewirandi_9edcca27-d0d2-4074-90dc-354e6938866b.webp',
    // POSISI BACKGROUND IMAGE: Ubah nilai di bawah ini untuk menggeser gambar background
    // Contoh opsi: 'center top', 'center bottom', 'center 30%', '50% 80%'
    bgPosition: 'center center',
  }
);

const footerSection = ref<HTMLElement | null>(null);
const iconRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const lilyPad1Ref = ref<HTMLElement | null>(null);
const lilyPad2Ref = ref<HTMLElement | null>(null);

// pembersih listener gating animasi lily pad (diisi di onMounted)
let removeLilyGate: (() => void) | null = null;

onMounted(() => {
  if (!footerSection.value) return;

  // === Text content animation ===
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: footerSection.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }
  });

  tl.to(iconRef.value, {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: 'back.out(1.5)'
  })
  .to(contentRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out'
  }, "-=0.4");

  // === Lily Pad slide-in + wave animation ===
  // Animasi hanya boleh mulai saat section footer tampil 100% di viewport.
  // Tidak pakai ScrollTrigger untuk gating-nya (scroll di sini memakai Lenis,
  // event onUpdate bisa tidak terpanggil) — gunakan listener scroll native window.
  const lilyTweens: gsap.core.Tween[] = [];
  let lilyStarted = false;

  const isSectionFullyVisible = () => {
    const el = footerSection.value;
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    // Toleransi 2px untuk pembulatan sub-pixel
    return r.top >= -2 && r.bottom <= vh + 2;
  };
  // Fallback: footer adalah section terakhir, jadi saat scroll sudah mentok
  // ke bawah halaman, section pasti terlihat penuh.
  const isAtPageBottom = () => {
    const doc = document.scrollingElement || document.documentElement;
    return doc.scrollTop + window.innerHeight >= doc.scrollHeight - 4;
  };

  const checkLilyStart = () => {
    if (lilyStarted) return;
    if (isSectionFullyVisible() || isAtPageBottom()) {
      lilyStarted = true;
      lilyTweens.forEach(t => t.play());
      removeLilyGate?.();
    }
  };
  window.addEventListener('scroll', checkLilyStart, { passive: true });
  window.addEventListener('resize', checkLilyStart);
  removeLilyGate = () => {
    window.removeEventListener('scroll', checkLilyStart);
    window.removeEventListener('resize', checkLilyStart);
    ScrollTrigger.removeEventListener('refresh', checkLilyStart);
  };
  // Cek sekali lagi setelah layout final (mis. footer sudah terlihat penuh saat load)
  requestAnimationFrame(checkLilyStart);
  ScrollTrigger.addEventListener('refresh', checkLilyStart);

  // Lily Pad 1 (left): starts 50px further left, slides to final left position
  if (lilyPad1Ref.value) {
    gsap.set(lilyPad1Ref.value, { x: -50, opacity: 0 });

    lilyTweens.push(gsap.to(lilyPad1Ref.value, {
      x: 0,
      opacity: 0.6,
      duration: 2.5,
      ease: 'power2.out',
      paused: true,
      onComplete: () => {
        // After slide-in, stay still in place for 1 second, then start gentle wave bobbing
        gsap.to(lilyPad1Ref.value, {
          y: -6,
          duration: 2.8,
          delay: 1.0,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
        gsap.to(lilyPad1Ref.value, {
          rotation: 1.2,
          duration: 3.5,
          delay: 1.0,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }
    }));
  }

  // Lily Pad 2 (right): starts 50px further right, slides to final right position
  if (lilyPad2Ref.value) {
    gsap.set(lilyPad2Ref.value, { x: 50, opacity: 0 });

    lilyTweens.push(gsap.to(lilyPad2Ref.value, {
      x: 0,
      opacity: 0.6,
      duration: 2.5,
      delay: 0.4,
      ease: 'power2.out',
      paused: true,
      onComplete: () => {
        // After slide-in, stay still in place for 1 second, then start gentle wave bobbing
        gsap.to(lilyPad2Ref.value, {
          y: -5,
          duration: 3.2,
          delay: 1.0,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
        gsap.to(lilyPad2Ref.value, {
          rotation: -1,
          duration: 4,
          delay: 1.0,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }
    }));
  }
});

onBeforeUnmount(() => {
  removeLilyGate?.();
  removeLilyGate = null;
  ScrollTrigger.getAll().forEach(st => st.kill());
  gsap.killTweensOf(lilyPad1Ref.value);
  gsap.killTweensOf(lilyPad2Ref.value);
});
</script>
