<template>
  <section ref="sectionRef" class="relative h-[100dvh] flex flex-col items-center justify-center text-center px-4 md:px-8 overflow-hidden bg-[#aed4da]">

    <!-- ===== LAYER AWAN — TIDAK ikut ngezoom, cuma digeser ke kiri (CLOUD_SHIFT px) =====
         GSAP mentransform wrapper ini; img di dalamnya tetap punya animasi drift sendiri.
         LEBAR (px)  : ganti angka width (makin besar makin lebar)
         POSISI ATAS : ganti angka top (makin besar makin turun)
    -->
    <div ref="cloudLayerRef" class="absolute inset-0 z-0 pointer-events-none will-change-transform">
      <img
        class="royal-cloud"
        src="https://media.mengundanganda.com/royalfantasy/hero%20section/dewirandi_5807c48a-c58a-4d4e-833d-5331855f3ea3.webp"
        alt=""
        style="
          position: absolute;
          z-index: 0;
          user-select: none;
          left: 40%;
          width: 550px;
          max-width: none;
          height: auto;
          top: 100px;
        "
      />
    </div>
    <!-- =================================================== -->

    <!-- ===== ZOOM STAGE — semua aset hero ada di sini, di-zoom bareng pas scroll ===== -->
    <div ref="stageRef" class="absolute inset-0 z-0 will-change-transform">

      <!-- ===== ASET PULAU MELAYANG (kanan atas) — TARGET ZOOM (diakhiran berada di tengah layar) =====
           LEBAR (px) : ganti angka width
           KANAN (px) : makin besar = makin geser ke kiri; angka negatif = keluar layar kanan
           NAIK/TURUN : ganti angka top
      -->
      <img
        class="royal-island"
        src="https://media.mengundanganda.com/royalfantasy/quotes%20section/dewirandi_166a6302-36de-4993-8b89-c050c059387a.webp"
        alt=""
        style="
          position: absolute;
          z-index: 5;
          pointer-events: none;
          user-select: none;
          width: 80px;
          max-width: none;
          height: auto;
          right: 20px;
          top: 300px;
          opacity: 1;
        "
      />
      <!-- ===== ASET PULAU MELAYANG KEDUA (kiri) — posisi & ukuran sama, tinggal ubah ANGKA ===== -->
      <img
        class="royal-island royal-island-b"
        src="https://media.mengundanganda.com/royalfantasy/hero%20section/dewirandi_f06437d6-c277-4827-b8ca-bb806a8a8d67.webp"
        alt=""
        style="
          position: absolute;
          z-index: 5;
          pointer-events: none;
          user-select: none;
          width: 80px;
          max-width: none;
          height: auto;
          left: 20px;
          top: 360px;
          opacity: 1;
        "
      />

      <!-- ===== ASET PULAU MELAYANG KETIGA (kanan bawah) — posisi & ukuran sama, tinggal ubah ANGKA ===== -->
      <img
        class="royal-island royal-island-c"
        src="https://media.mengundanganda.com/royalfantasy/hero%20section/dewirandi_f06437d6-c277-4827-b8ca-bb806a8a8d67.webp"
        alt=""
        style="
          position: absolute;
          z-index: 5;
          pointer-events: none;
          user-select: none;
          width: 150px;
          max-width: none;
          height: auto;
          right: -70px;
          top: 700px;
          opacity: 1;
        "
      />
      <!-- =================================================== -->
    </div>
    <!-- ===== /ZOOM STAGE (BELAKANG — pulau-pulau kecil) ===== -->

    <!-- ===== ZOOM STAGE DEPAN — istana, layer sendiri biar z-index-nya
         BISA DI ATAS container quotes (quotes: z-20, istana: z-30, pulau: z-0).
         Nge-zoom PERSIS SAMA dengan stage belakang (tween ganda di script). ===== -->
    <div ref="stageFrontRef" class="absolute inset-0 z-[30] pointer-events-none will-change-transform">

      <!-- ===== CONTAINER ISTANA + AIR TERJUN =====
            Semua anak di dalam container ini diposisikan pakai PERSEN RELATIF KE GAMBAR ISTANA,
            bukan relatif layar — jadi digeser & di-resize tetap nempel ke istana.
            LEBAR ISTANA (px) : ganti angka width container (misal: 450px, 600px, dll)
            NAIK/TURUN        : ganti angka bottom (angka negatif = makin tenggelam ke bawah)
            GESER TENGAH      : translateX = minus dari setengah width
      -->
      <div
        style="
          position: absolute;
          z-index: 0;
          pointer-events: none;
          user-select: none;
          left: 50%;
          transform: translateX(-225px);
          width: 450px;
          bottom: 0px;
        "
      >
        <img
          src="https://media.mengundanganda.com/royalfantasy/hero%20section/dewirandi_65845113-0042-4e04-86ab-0b520fb6f126.webp"
          alt=""
          style="
            display: block;
            width: 100%;
            height: auto;
          "
        />

        <!-- ===== AIR TERJUN — gaya Fairytale Garden (pita cahaya jatuh + riak filter turbulensi) =====
            GESER KIRI/KANAN : ganti "left" % (0% = tepi kiri istana, 100% = tepi kanan)
            GESER ATAS/BAWAH : ganti "top" % (0% = atas istana, 100% = dasar istana)
            LEBAR            : ganti "width" % (relatif ke lebar gambar istana)
            TINGGI           : ganti "height" % (relatif ke tinggi gambar istana)
            TRANSPARANSI     : ganti angka "opacity" (makin kecil makin bening)
            BESAR RIAK GELOMBANG : ganti angka "scale" di feDisplacementMap di bawah
            KECEPATAN ALIRAN     : ganti durasi di <style> (.rf-stream-1 / .rf-stream-2)
        -->
        <!-- SVG filter tersembunyi — sumber riak air -->
        <svg style="position: absolute; width: 0; height: 0; pointer-events: none">
          <filter id="rf-waterfall-distortion" x="-20%" y="-10%" width="140%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.03 0.06"
              numOctaves="3"
              result="noise"
            >
              <animate
                attributeName="seed"
                from="1"
                to="100"
                dur="18s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>

        <div
          class="rf-waterfall"
          style="
            position: absolute;
            left: 57%;
            top: 62%;
            width: 3%;
            height: 55%;
            opacity: 0.85;
          "
        >
          <div class="rf-waterfall-inner">
            <div class="rf-stream rf-stream-1"></div>
            <div class="rf-stream rf-stream-2"></div>
          </div>
        </div>

        <!-- ===== AIR TERJUN KEDUA — 30px di kanan yang pertama =====
            posisinya pakai calc(57% + 30px): persen relatif istana + geser px.
            tinggal ubah dua angkanya. durasi stream sengaja beda dikit
            (8.4s & 12s vs 7s & 10s) biar keduanya tidak bergerak serempak.
        -->
        <div
          class="rf-waterfall"
          style="
            position: absolute;
            left: 68%;
            top: 62%;
            width: 3%;
            height: 55%;
            opacity: 0.85;
          "
        >
          <div class="rf-waterfall-inner">
            <div class="rf-stream rf-stream-1" style="animation-duration: 8.4s"></div>
            <div class="rf-stream rf-stream-2" style="animation-duration: 12s"></div>
          </div>
        </div>

        <!-- ===== AIR TERJUN KETIGA — kiri istana, lebih pendek =====
            tinggal ubah angkanya juga seperti yang lain. durasi stream beda lagi
            (6.2s & 9s) biar tidak serempak dengan dua sebelumnya.
        -->
        <div
          class="rf-waterfall"
          style="
            position: absolute;
            left: 23%;
            top: 52%;
            width: 3%;
            height: 28%;
            opacity: 0.85;
          "
        >
          <div class="rf-waterfall-inner">
            <div class="rf-stream rf-stream-1" style="animation-duration: 6.2s"></div>
            <div class="rf-stream rf-stream-2" style="animation-duration: 9s"></div>
          </div>
        </div>
        <!-- =================================================== -->
      </div>
      <!-- =================================================== -->
    </div>
    <!-- ===== /ZOOM STAGE DEPAN (istana) ===== -->

    <!-- ===== OVERLAY PEMGELAP BG (VEIL) =====
         Wrapper (veilWrapRef) : dipudarkan scrub BARENG teks & pil saat zoom
         (durasi HERO_TEXT_OUT) → veil hilang sebelum quotes masuk.
         Dalam (veilRef)       : opacity 0 dulu → di-fade-IN-kan GSAP bareng
         munculnya teks & pil (delay PILL_DELAY, lihat script).
         GELAPnya : ubah alpha rgba() — 0.15 nyaris tak terasa, 0.25 lumayan.
         Warna hijau gelap senada teks (#243029) biar "shadow", bukan "malam".
         z-35 : di ATAS semua bg (langit/pulau/istana), di BAWAH teks & pil (z-40). -->
    <div ref="veilWrapRef" class="absolute inset-0 z-[35] pointer-events-none">
      <div
        ref="veilRef"
        class="royal-veil"
        style="
          position: absolute;
          inset: 0;
          background: rgba(36, 48, 41, 0.2);
        "
      ></div>
    </div>

    <!-- Hero Content (Text via Slot) — teks ngumpul di tengah, fades out pas mulai zoom -->
    <div ref="heroTextRef" class="royal-hero-text relative z-[40] w-[85vw] max-w-[420px] mx-auto py-14 flex flex-col items-center justify-center">
      <!-- ===== CONTAINER PIL TEGAK (BELAKANG SEMUA TEKS) =====
           Pil = persegi panjang dengan border-radius full.
           BENTAK PIL DIKUNCI oleh proporsi asli: top/bottom -18vh (tinggi
           jauh > lebar). JANGAN ubah vh untuk mengecilkan — nanti jadi bulet!
           U.KURAN = SATU ANGKA SKALA di "transform: scale(...)" di bawah:
           tinggi & lebar mengecil MEMPER SAMA → bentuk tetap pil ramping.
           (1 = penuh, 0.8 = 80%, 0.65 = lebih kecil lagi)
           TEBAL WARNA : alpha rgba background (makin besar makin pekat). -->
      <div
        ref="textPillRef"
        class="royal-text-pill"
        style="
          position: absolute;
          left: 0;
          right: 0;
          top: -18vh;
          bottom: -18vh;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.75);
          transform: scale(0.8);
          pointer-events: none;
        "
      ></div>
      <slot />
    </div>

    <!-- ===== QUOTE SCENE — muncul di akhir zoom, HANYA teks quotes (pulau sudah di tengah) ===== -->
    <div ref="quoteRef" v-if="quote" class="rf-quote-layer absolute inset-0 z-20 flex items-center justify-center px-6 text-center">
      <!-- Ambient Radial Glow -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.45) 0%, rgba(174, 212, 218, 0) 75%);"
      ></div>

      <!-- Quote Text — container FULL SELAYAR (inset-0). Putih polos TANPA blur,
           sekarang menutupi seluruh layar; posisi z-nya DI ATAS pulau
           kecil (stage z-0) dan DI BAWAH istana (stage depan z-30).
           Font sengaja Playfair Display, BUKAN fontHeading tema (Cinzel Decorative
           = semua glyph kapital). Ukuran teks kecil. -->
      <div class="rf-quote-pill absolute inset-0 flex items-center justify-center bg-white/70">
        <blockquote class="rf-quote w-[72vw] max-w-[340px] mx-auto px-4">
          <p class="rf-quote-body"
            ><span class="rf-quote-mark rf-quote-mark-open" aria-hidden="true">&ldquo;</span>{{
              quoteParts.body
            }}<span class="rf-quote-mark rf-quote-mark-close" aria-hidden="true">&rdquo;</span></p
          >
          <p v-if="quoteParts.source" class="rf-quote-source">{{ quoteParts.source }}</p>
        </blockquote>
      </div>
    </div>
    <!-- ===== /QUOTE SCENE ===== -->
    <ScrollCueRoyalFantasy />
  </section>
</template>

<script setup lang="ts">
import ScrollCueRoyalFantasy from '@/components/invitation/royal/ScrollCueRoyalFantasy.vue';
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = withDefaults(
  defineProps<{
    overlayGradient?: string;
    heroImage?: string;
    themeConfig?: any;
    invitation?: any;
    quote?: string;
    apiBase?: string;
  }>(),
  {
    heroImage: '',
  }
);

/* ===== PEMECAH TEKS QUOTES =====
   Pisahkan isi quotes dan atribusi "Q.S. ..." (mendukung varian Q.S., Q.S, QS, Q S).
   Kutip pembuka/penutup bawaan data dibuang dulu — tanda kutip digambar sendiri
   oleh template biar bisa di-styling. Kalau tidak ada "Q.S.", seluruh teks
   dianggap isi quotes. */
const quoteParts = computed(() => {
  const raw = (props.quote || '').trim();
  const q = raw.replace(/^[\u201C\u201D"]+|[\u201C\u201D"]+$/g, '').trim();
  const m = q.match(/\bQ\.?\s?S\.?\b/i);
  const idx = m?.index ?? 0;
  if (m && idx > 0) {
    // ekor body: kupas kutip penutup / tanda baca / strip yang nempel "Q.S."
    // (diloop supaya urutan apapun — mis. `..." — Q.S.` — bersih semua)
    let body = q.slice(0, idx).trim();
    let prev;
    do {
      prev = body;
      body = body.replace(/["\u201C\u201D]+$/, '').replace(/[,;:.–—\s]+$/, '');
    } while (body !== prev);
    return { body, source: q.slice(idx).trim() };
  }
  return { body: q, source: '' };
});

const sectionRef = ref<HTMLElement | null>(null);
const cloudLayerRef = ref<HTMLElement | null>(null);
const stageRef = ref<HTMLElement | null>(null);
const stageFrontRef = ref<HTMLElement | null>(null);
const heroTextRef = ref<HTMLElement | null>(null);
const textPillRef = ref<HTMLElement | null>(null);
const veilWrapRef = ref<HTMLElement | null>(null);
const veilRef = ref<HTMLElement | null>(null);
const quoteRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

/* =====================================================
   ===== PENGATURAN ZOOM SCROLL — tinggal ubah ANGKA =====
   SCROLL      : panjang scroll buat zoom ("200%" = 2 layar;
                 makin besar = makin "berat", quotes punya lebih banyak
                 ruang scroll buat dinikmatin sebelum pindah section)
   SCALE       : seberapa dekat "terbang"-nya (4 = 4x pembesaran)
   ZOOM_END    : % selesainya zoom (0-1). Di titik ini pulau melayang
                 pertama (kanan atas) sudah BENAR-BENAR di tengah layar —
                 penengahannya dihitung otomatis, tidak pakai FOCUS X/Y lagi.
    HERO_TEXT_OUT : % akhir memudarnya teks hero (0-1)
    QUOTE_IN    : % mulai fade-IN teks quotes (setelah pulau di tengah)
    QUOTE_FADE  : lama fade-IN teks quotes (0-1)
    Quotes TIDAK fade-out lagi — tetap tampil penuh sampai pin selesai
    dan section berikutnya (couple) masuk.
    CLOUD_SHIFT : geser awan ke kiri selama scroll (px, angka negatif = kiri).
                  Awan TIDAK ikut zoom — dia cuma jalan geser.
    PILL_DELAY  : kapan pil teks mulai slide-up (detik setelah cover dibuka).
                  2.0 = bareng teks pertama muncul, setelah bg dipamerkan ±2s
                  (startDelay royal_fantasy 1.0 + 1.0 anim heroOval − overlap
                  0.01 di animateHeroOval — kalau startDelay diubah, ikutin juga).
                  MELESET? geser angkanya (lebih besar = telat).
    VEIL_FADE_IN: lama memudarnya overlay gelap masuk (detik). Lebih panjang
                  dari anim teks (0.9) → bg jelas dulu, gelapnya nyusul pelan.
 ===================================================== */
const SCROLL = '200%';
const SCALE = 3;
const ZOOM_END = 0.55;
const HERO_TEXT_OUT = 0.35;
const QUOTE_IN = 0.62;
const QUOTE_FADE = 0.15;
const CLOUD_SHIFT = -50;
const PILL_DELAY = 2.0;
const VEIL_FADE_IN = 1.4;
/* =================================================== */

onMounted(() => {
  if (!sectionRef.value || !stageRef.value) return;
  ctx = gsap.context(() => {
    const stage = stageRef.value as HTMLElement;
    const section = sectionRef.value as HTMLElement;
    // target zoom = pulau melayang pertama (kanan atas)
    const island = section.querySelector('.royal-island') as HTMLElement | null;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${SCROLL}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // stage zoom "terbang" sampai pulau target berada di TENGAH LAYAR.
    // transformOrigin "0 0" → posisi akhir titik (ix, iy) = s*(ix, iy) + (x, y).
    // Kita paksa hasilnya = tengah viewport: x = w/2 - s*ix, y = h/2 - s*iy.
    // offsetLeft/offsetTop = nilai layout (tidak terpengaruh transform), jadi
    // aman dihitung ulang tiap GSAP invalidate saat scrub/resize.
    // TWEEN DIPAKAI DUA KALI (stage belakang + stage depan/istana) supaya
    // istana bisa punya z-index di ATAS quotes sementara pulau tetap di bawah.
    const stageFront = stageFrontRef.value as HTMLElement | null;
    if (island) {
      const zoomVars = {
        scale: SCALE,
        transformOrigin: '0 0',
        x: () => stage.offsetWidth / 2 - SCALE * (island.offsetLeft + island.offsetWidth / 2),
        // island punya translateY(-50%) → pusat rendernya persis di offsetTop
        y: () => stage.offsetHeight / 2 - SCALE * island.offsetTop,
        ease: 'none',
        duration: ZOOM_END,
      };
      tl.to(stage, zoomVars, 0);
      if (stageFront) tl.to(stageFront, zoomVars, 0);
    } else {
      // fallback kalau aset pulau tidak ketemu: zoom ke tengah biasa
      const zoomVars = { scale: SCALE, transformOrigin: '50% 50%', ease: 'none', duration: ZOOM_END };
      tl.to(stage, zoomVars, 0);
      if (stageFront) tl.to(stageFront, zoomVars, 0);
    }

    // awan TIDAK ikut zoom — layer sendiri, cuma digeser ke kiri pelan
    if (cloudLayerRef.value) {
      tl.to(cloudLayerRef.value, { x: CLOUD_SHIFT, ease: 'none' }, 0);
    }

    // teks hero memudar di awal zoom
    if (heroTextRef.value) {
      tl.to(heroTextRef.value, { opacity: 0, ease: 'none', duration: HERO_TEXT_OUT }, 0);
    }

    // veil juga ikut memudar di awal zoom (bareng teks & pil) —
    // cukup wrapper-nya yang di-scrub; isi veil (veilRef) punya fade-in sendiri di bawah.
    if (veilWrapRef.value) {
      tl.to(veilWrapRef.value, { opacity: 0, ease: 'none', duration: HERO_TEXT_OUT }, 0);
    }

    // teks quotes: fade-IN setelah pulau di tengah, lalu HOLD sampai pin
    // selesai — TIDAK ada fade-out lagi sebelum section couple datang
    if (quoteRef.value) {
      tl.fromTo(
        quoteRef.value,
        { opacity: 0, scale: 1.12 },
        {
          opacity: 1,
          scale: 1,
          ease: 'none',
          transformOrigin: '50% 50%',
          immediateRender: false,
          duration: QUOTE_FADE,
        },
        QUOTE_IN
      );
    }

    // penahan durasi: total timeline dipaksa habis tepat di posisi 1.0
    // supaya semua angka persentase di atas (QUOTE_IN, ZOOM_END, dll)
    // tetap memetakan lurus ke progres scroll, sama seperti sebelumnya
    // (dulu diisi oleh tween fade-out quotes yang sekarang dihapus).
    tl.to({ hold: 0 }, { hold: 0, duration: 0.001 }, 0.999);

    // ===== PIL TEKS — animasi MASUK sendiri (bukan bagian timeline scrub) =====
    // Kurva disamakan persis dengan slide-up teks di animateHeroOval
    // (InvitationView.vue): y 30→0, 0.9s, power3.out → muncul "bareng" teks.
    // Fade-out ke quotes TIDAK perlu diurus di sini: pil ada di dalam
    // heroTextRef yang sudah dipudarkan scrub (HERO_TEXT_OUT) sebelum
    // quotes fade-in (QUOTE_IN).
    if (textPillRef.value) {
      gsap.fromTo(
        textPillRef.value,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: PILL_DELAY }
      );
    }

    // ===== VEIL — fade-IN bareng teks & pil (bukan scrub) =====
    // Opasitas efektif = veilRef (0→1, ini) × veilWrapRef (1→0, scrub di atas),
    // jadi veil "hadir" persis saat teks muncul & hilang saat mulai zoom.
    // Durasinya dibikin lebih panjang biar bg dulu yang tampil, baru gelapnya merayap.
    if (veilRef.value) {
      gsap.fromTo(
        veilRef.value,
        { opacity: 0 },
        { opacity: 1, duration: VEIL_FADE_IN, ease: 'power2.out', delay: PILL_DELAY }
      );
    }
  }, sectionRef.value);

  // Setelah pin spacer Hero dibuat, sort & refresh agar section
  // berikutnya (Couple, Events, dll) menghitung posisi dengan benar.
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
});
</script>

<style>
/* ===== Animasi awan — drift pelan & elegan seolah tertiup angin =====
   (translateX(-250px) = geser tengah, dipertahankan di class & keyframes) */
.royal-cloud {
  transform: translateX(-250px);
  animation: royal-cloud-drift 45s ease-in-out infinite alternate;
  will-change: transform;
}

@keyframes royal-cloud-drift {
  from {
    transform: translateX(-250px) translate(0px, 0px) scale(1);
  }
  to {
    transform: translateX(-250px) translate(45px, -10px) scale(1.04);
  }
}

/* ===== Animasi AIR TERJUN — gaya Fairytale Garden =====
   Aliran  : ganti durasi 7s / 10s (makin besar makin pelan)
   Gelombang/riak : angka "scale" di feDisplacementMap (template) */
.rf-waterfall {
  pointer-events: none;
  filter: url(#rf-waterfall-distortion);
  /* ATAS pudar sampai opasitas habis → BAWAH tekat */
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.25) 25%,
    black 65%,
    rgba(0, 0, 0, 0.55) 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.25) 25%,
    black 65%,
    rgba(0, 0, 0, 0.55) 100%
  );
}
/* elemen terpisah buat pudar kiri-kanan (mask vertikal + horizontal ditumpuk) */
.rf-waterfall-inner {
  position: absolute;
  inset: 0;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 35%,
    black 65%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 35%,
    black 65%,
    transparent 100%
  );
}
/* pita cahaya jatuh */
.rf-stream {
  position: absolute;
  inset: 0;
  mix-blend-mode: screen;
}
.rf-stream-1 {
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.65) 15%,
    rgba(255, 255, 255, 0.95) 25%,
    rgba(255, 255, 255, 1) 35%,
    rgba(255, 255, 255, 0.65) 45%,
    rgba(255, 255, 255, 0) 60%
  );
  background-size: 100% 100px;
  animation: rf-waterfall-flow-1 7s linear infinite;
}
.rf-stream-2 {
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.45) 20%,
    rgba(255, 255, 255, 0.8) 35%,
    rgba(255, 255, 255, 0.9) 45%,
    rgba(255, 255, 255, 0.45) 60%,
    rgba(255, 255, 255, 0) 80%
  );
  background-size: 100% 140px;
  transform: scaleX(-1);
  animation: rf-waterfall-flow-2 10s linear infinite;
}
/* jarak = kelipatan persis background-size biar loop-nya mulus tanpa patah */
@keyframes rf-waterfall-flow-1 {
  from {
    background-position-y: 0px;
  }
  to {
    background-position-y: 500px; /* 5 × 100px */
  }
}
@keyframes rf-waterfall-flow-2 {
  from {
    background-position-y: 0px;
  }
  to {
    background-position-y: 700px; /* 5 × 140px */
  }
}

/* ===== Animasi pulau melayang — goyang naik-turun pelan, biar terkesan magis =====
   (translateY(-50%) tetap dipertahankan di keyframes agar posisi tidak berubah) */
.royal-island {
  transform: translateY(-50%);
  animation: royal-island-float 8s ease-in-out infinite;
  will-change: transform;
}
.royal-island-b {
  animation-duration: 10s;
  animation-delay: -3s;
}
.royal-island-c {
  animation-duration: 12s;
  animation-delay: -6s;
}

@keyframes royal-island-float {
  0%,
  100% {
    transform: translateY(-50%) translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-50%) translateY(-14px) rotate(1.5deg);
  }
}

/* Quote layer awal tersembunyi — GSAP yang munculin pas scroll */
.rf-quote-layer {
  opacity: 0;
  pointer-events: none;
}

/* ===== QUOTES — isi miring + kutip dekoratif, "Q.S. ..." di baris baru =====
   MARK kutip pakai satuan em → otomatis ikut besar-kecilnya font isi.
   MAU GANTI WARNA KUTIP? ubah #B0808A (rose senada "&" di nama). */
.rf-quote {
  font-family: 'Playfair Display', serif;
  color: #243029;
  text-align: center;
}

/* isi quotes: tetap italic seperti aslinya */
.rf-quote-body {
  margin: 0;
  font-style: italic;
  font-size: 0.95rem;
  line-height: 1.75;
  letter-spacing: 0.02em;
}

/* tanda kutip dekoratif: gede, bold, warna aksen */
.rf-quote-mark {
  font-style: normal;
  font-weight: 700;
  color: #b0808a;
  line-height: 0;
  text-shadow: 0 2px 10px rgba(176, 128, 138, 0.35);
}
.rf-quote-mark-open {
  font-size: 2.4em;
  vertical-align: -0.45em;
  margin-right: 0.06em;
}
.rf-quote-mark-close {
  font-size: 1.5em;
  vertical-align: -0.28em;
  margin-left: 0.06em;
}

/* baris "Q.S. ...": TIDAK italic, bold, sedikit lebih besar + garis pemisah halus */
.rf-quote-source {
  margin: 0.9rem 0 0;
  font-style: normal;
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.08em;
  color: #243029;
}
.rf-quote-source::before {
  content: '';
  display: block;
  width: 42px;
  height: 2px;
  margin: 0 auto 0.65rem;
  background: linear-gradient(90deg, transparent, #b0808a, transparent);
}

@media (min-width: 768px) {
  .rf-quote-body {
    font-size: 1.05rem;
  }
  .rf-quote-source {
    font-size: 1.15rem;
  }
}

/* ===== PIL TEGAK DI BELAKANG TEKS HERO =====
   Sisanya (ukuran, jarak atas-bawah, warna) sudah jadi CSS inline di template.
   Class ini cuma menjaga pil tetap tersembunyi sebelum GSAP slide-up —
   mencegah "kedip" pas komponen baru mount */
.royal-text-pill {
  opacity: 0;
}

/* Overlay gelap (veil) — awal tersembunyi biar tidak "kedip" sebelum GSAP fade-in.
   Warna/kegelapan sudah jadi CSS inline di template (background rgba). */
.royal-veil {
  opacity: 0;
}

/* Hormati pengguna yang mengurangi animasi */
@media (prefers-reduced-motion: reduce) {
  .royal-island,
  .royal-cloud,
  .rf-stream {
    animation: none;
  }
}

/* Typography styles inside Royal Fantasy Hero slot (dibuat terbaca di bg terang #aed4da) */
.royal-hero-text p {
  color: #B0808A !important;
  letter-spacing: 0.35em !important;
  text-transform: uppercase !important;
  font-size: 0.8rem !important;
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  /* shadow biar teks menonjol dari pil — geser angka terakhir buat ngatur pekat */
  text-shadow: 0 2px 10px rgba(36, 48, 41, 0.25) !important;
}

/* UKURAN NAMA — dulu ikut kelas Tailwind slot (3rem / 4.5rem / 6rem),
   sekarang di-diskon ~20% di sini: 2.4rem → 3.6rem (tablet) → 4.8rem (desktop).
   MAU LEBIH KECIL/BESAR ? ubah tiga angka rem ini. */
.royal-hero-text h1 {
  color: #243029 !important;
  font-family: 'Cinzel Decorative', 'Playfair Display', serif !important;
  font-weight: 500 !important;
  line-height: 1.15 !important;
  margin: 0.75rem 0 !important;
  font-size: 2.4rem !important;
  /* shadow lembut biar nama timbul di atas pil putih */
  text-shadow: 0 3px 14px rgba(36, 48, 41, 0.3) !important;
}

@media (min-width: 768px) {
  .royal-hero-text h1 {
    font-size: 3.6rem !important;
  }
}

@media (min-width: 1024px) {
  .royal-hero-text h1 {
    font-size: 4.8rem !important;
  }
}

.royal-hero-text h1 span {
  color: #B0808A !important;
  font-style: italic !important;
  font-family: 'Cinzel Decorative', 'Playfair Display', serif !important;
  /* "&" ikut proporsi nama (0.63 × ukuran h1) — tidak perlu rem terpisah,
     dan text-shadow otomatis warisan dari h1 */
  font-size: 0.63em !important;
}
</style>
