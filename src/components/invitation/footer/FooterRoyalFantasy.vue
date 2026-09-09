<template>
  <div
    ref="footerRef"
    class="relative w-full py-6 md:py-10 px-2 md:px-4 text-center overflow-visible flex flex-col items-center justify-center select-none"
  >
    <!-- Ambient Radial Glow -->
    <div
      class="absolute inset-0 pointer-events-none -z-10"
      style="background: radial-gradient(circle at 50% 50%, rgba(120, 165, 195, 0.2) 0%, transparent 70%);"
    ></div>


    <!-- ================================================================= -->
    <!-- (INFO TULISAN FOOTER SEMENTARA DI-HIDE SESUAI REQUEST)            -->
    <!-- ================================================================= -->
    <div v-if="false" class="hidden-original-footer-info">
      <div ref="crownRef" class="w-14 h-14 rounded-full border border-[#708478]/50 bg-[#243029]/80 flex items-center justify-center mb-6">
        <svg class="w-7 h-7 text-[#D4A6AD]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5m14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
        </svg>
      </div>
      <h2 class="text-3xl md:text-5xl font-serif text-[#ECE0D3]">
        {{ invitation.groom_name }} &amp; {{ invitation.bride_name }}
      </h2>
      <p class="text-xs md:text-sm text-[#ECE0D3]/80">
        Terima kasih yang terdalam telah menjadi bagian dari kisah dan hari bahagia kami.
      </p>
    </div>

    <!-- ================================================================= -->
    <!-- 3D BOOK STAGE & PAGE-TURN ANIMATION                               -->
    <!-- ================================================================= -->
    <div class="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
      
      <!-- Header / Hint — DI-HIDE SESUAI REQUEST (jangan tampilkan di mana pun) -->
      <div v-if="false" class="mb-6 hidden flex flex-col items-center gap-1.5">
        <div class="flex items-center gap-2">
          <span class="text-[#DEB56C] text-xs">✦</span>
          <span class="text-[11px] md:text-xs uppercase tracking-[0.3em] text-[#DEB56C] font-semibold">
            Lembar Penutup
          </span>
          <span class="text-[#DEB56C] text-xs">✦</span>
        </div>
        <p class="text-[12px] text-[#A2B8C6]/80 font-light">
          Gulir untuk melihat animasi lembaran menutup
        </p>
      </div>

      <!-- Theater Viewport with 3D Perspective -->
      <div class="book-viewport relative w-full flex items-center justify-center py-6">
        
        <!-- ELEMEN ZOOM: transform .book-zoom DIMILIKI EKSKLUSIF oleh GSAP
             parent (scale raksasa -> 1 + rotation 0deg -> +10deg ke kanan,
             terscrub).
             JANGAN pernah taruh CSS transform/transition di sini. Semua
             pergeseran manual buku hidup di .book-scene (Kenop --book-x/y).
                 v
        -->
        <div class="book-zoom">
        <!-- Book Stage (satu kesatuan: kertas+daun+cover+gambar halaman) -->
        <div class="book-scene relative">
          <!-- BOOK CONTAINER -->
          <div class="book-box relative flex items-center justify-center">

            <!-- 1. RIGHT SIDE: BASE PAPER (PNG Kertas Diam) + GAMBAR BG
                 (.page-art = muka halaman). Gambar bg adalah BAGIAN dari buku:
                 saat parent men-zoom .book-zoom raksasa, inilah yang mengisi
                 layar — gambar & buku bergerak sebagai satu kesatuan.
                 Crop/posisi gambarnya di-setel lewat kenop --art-* di style. -->
            <div class="page-right-base relative z-0">
              <img
                :src="paperSrc"
                alt="Halaman Buku"
                class="book-img pointer-events-none select-none block"
                loading="eager"
              />

              <!-- MUKA HALAMAN KANAN: gambar background dari parent -->
              <img
                :src="bgSrc"
                alt=""
                aria-hidden="true"
                class="page-art"
                loading="eager"
              />

              <!-- Optional Paper Content Overlay (Teks yang ada di atas kertas kanan)
                   — DI-HIDE SESUAI REQUEST (jangan tampilkan di mana pun) -->
              <div v-if="false" class="paper-text-overlay hidden pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-8">
                <div class="w-[75%] max-w-[280px] text-center opacity-85 translate-x-2 -translate-y-2 rotate-[-2deg] skew-y-[-1deg]">
                  <div class="text-[10px] uppercase tracking-[0.25em] text-[#8C7A65] mb-2 font-serif">
                    Bab Kebahagiaan
                  </div>
                  <h3 class="text-lg md:text-xl font-serif text-[#3E3427] font-bold mb-3 tracking-wide" style="font-family: 'Cinzel Decorative', serif;">
                    {{ invitation.groom_name }} &amp; {{ invitation.bride_name }}
                  </h3>
                  <div class="w-12 h-[1px] bg-[#C4A87C] mx-auto mb-3"></div>
                  <p class="text-[11px] md:text-xs text-[#5C4F3D] italic leading-relaxed font-serif">
                    "Dan di antara tanda-tanda kebesaran-Nya diciptakan-Nya untukmu pasangan hidup agar kamu merasa tenteram bersamanya."
                  </p>
                </div>
              </div>
            </div>

            <!-- 2. FLIPPER COVER: engsel = garis vertikal tepi KANAN daun SVG -->
            <!-- Berputar rotateY(-180° -> 0°); tepi engsel diam, sisi kiri daun mengayun -->
            <div class="book-flipper absolute inset-0 z-20">
              <!-- SISI DALAM (Menghadap kita saat buku TERBUKA) = SVG Halaman Kiri -->
              <div class="flipper-face flipper-front">
                <div class="leaf-frame">
                  <svg
                    viewBox="0 0 1384 1920"
                    preserveAspectRatio="none"
                    class="w-full h-full block"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <!--
                      Bentuk daun: trapesium, BUKAN kotak + CSS rotate.
                      Catatan geometri: .flipper-front punya rotateY(180deg) sendiri
                      yang membatalkan mirror dari flipper -180deg, jadi sisi KANAN
                      viewBox = sisi engsel/spine yang tampil di layar.
                      Sisi x=1384: lurus VERTIKAL penuh 195-1920, sudut tajam —
                      sisi ini jatuh presisi di atas sumbu rotateY, sehingga
                      kanan-atas & kanan-bawah daun DIAM TOTAL saat flip.
                      Kemiringan (≈8°, kiri lebih tinggi seperti tuning lama)
                      digambar lewat tepi atas/bawah + sisi kiri yang lebih pendek
                      dengan sudut rounded (r≈36 unit ≈ 8px).
                    -->
                    <path
                      d="M 0 36 Q 0 0 35.6 5 L 1384 195 L 1384 1920 L 35.6 1730 Q 0 1725 0 1689 L 0 36 Z"
                      fill="var(--leaf-color, #7CA2BE)"
                    />
                  </svg>
                </div>
              </div>

              <!-- SISI LUAR / BELAKANG (Menghadap kita saat buku TERTUTUP) = PNG Cover Depan -->
              <div class="flipper-face flipper-back">
                <img
                  :src="coverSrc"
                  alt="Cover Buku"
                  class="book-img pointer-events-none select-none block"
                  loading="eager"
                />
              </div>
            </div>

          </div>
        </div>
        </div><!-- /.book-zoom -->

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// `landed` dikendalikan parent (RsvpGiftRoyalFantasy): 0 = bg masih
// full-screen / sedang shrink (klon menutupi buku), 1 = bg sudah mendarat
// di kertas kanan -> cover boleh auto-close.
const props = withDefaults(
  defineProps<{
    invitation: Invitation;
    themeConfig: ThemeConfig;
    landed?: number;
    // Gambar bg dari parent — tampil SEBAGAI HALAMAN KANAN BUKU (.page-art),
    // supaya saat zoom-out animasi gambar & buku satu kesatuan sejati.
    bgSrc: string;
  }>(),
  { landed: 0 },
);

// Assets provided by user
const paperSrc = 'https://media.mengundanganda.com/royalfantasy/footer%20section/dewirandi_e412f2c9-74f2-4e63-bf81-d78702018027.webp';
const coverSrc = 'https://media.mengundanganda.com/royalfantasy/footer%20section/dewirandi_59bd6dcf-6ea2-4d6d-8875-f88f3c56e0aa.webp';

// State: hanya untuk menampilkan teks "— Tamat —" (dikendalikan timeline GSAP)
const isClosed = ref(false);
const footerRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;
// Reference timeline close, dipakai watch `landed` di luar gsap.context
let bookTl: gsap.core.Timeline | null = null;


onMounted(() => {
  if (!footerRef.value) return;

  ctx = gsap.context(() => {
    // CATATAN: reveal lama (gsap.from y/opacity) dan "Tahap 1" lama (buku
    // awal scale 2 + miring -10deg lalu balik ke normal) DIHAPUS. Panel
    // footer sekarang dimunculkan parent lewat set() di timeline scrubbed,
    // dan buku SELALU diam di posisi istirahat (scale 1, rotation 0) supaya
    // rect .page-right-base stabil sebagai target pendaratan shrink bg.

    // Flipper dipegang penuh GSAP (transform inline override class CSS);
    // posisi buka awal = rotateY(-180deg), sama seperti kondisi awal sebelumnya.
    gsap.set('.book-flipper', { rotateY: -180 });

    const tl = gsap.timeline({ paused: true });

    // Tutup buku (rotateY -180deg -> 0deg) — jalan OTOMATIS begitu bg
    // mendarat di halaman (flag `landed` dari parent, lihat check()/watch).
    tl.to('.book-flipper', {
      rotateY: 0,
      duration: 1.6,
      ease: 'power2.inOut',
      // WAJIB false: default immediateRender=true bikin GSAP ngerender nilai
      // AKHIR (rotateY 0 = TERTUTUP) begitu tween ini ditambahkan ke timeline,
      // menimpa gsap.set(rotateY:-180) di atas -> buku kelihatan sudah nutup
      // dari awal dan animasinya ga keliatan jalan.
      immediateRender: false,
      onStart: () => {
        isClosed.value = true;
      },
    });

    bookTl = tl;

    // ==================== GERBANG ANIMASI (OPASITAS + LANDED) ====================
    // PENTING: footer ini berada DI DALAM section yang di-PIN + scrub oleh
    // RsvpGiftRoyalFantasy.vue (start 'top top', end '+=400%'). Selama pin,
    // rect footer DIAM di tengah layar — gerbang berbasis posisi scroll/rect
    // (bottom-bottom, top-bottom, dll) jadi ga pernah kepicu dengan benar.
    // Sinyal "footer 100% terlihat" yang sesungguhnya = OPASITAS panel footer
    // (di-set parent pas awal fase footer) + prop `landed` (1 setelah animasi
    // shrink bg parent selesai mendarat di kertas kanan). Reset juga pakai
    // sinyal yang sama.

    // Opasitas efektif elemen setelah dikali opasitas semua ancestor
    // (panel footer di-fade oleh parent via timeline scrubbed).
    const effectiveOpacity = (el: HTMLElement): number => {
      let o = 1;
      let cur: HTMLElement | null = el;
      while (cur && o > 0.001) {
        const s = parseFloat(getComputedStyle(cur).opacity);
        o *= Number.isNaN(s) ? 1 : s;
        cur = cur.parentElement;
      }
      return o;
    };

    // MAIN: footer beneran kelihatan (opacity ~1), bg SUDAH mendarat di
    // halaman buku (landed ~1 dari parent), DAN timeline idle di posisi awal.
    const check = () => {
      const el = footerRef.value;
      if (!el || tl.isActive()) return;
      if (
        tl.progress() === 0 &&
        effectiveOpacity(el) >= 0.9 &&
        props.landed >= 0.5
      ) {
        tl.play();
      }
    };

    // RESET: footer udah ga kelihatan lagi (parent fade-out karena scrub
    // reverse, ATAU secara geometri keluar viewport) -> instant reset ke
    // posisi awal (terbuka, diam di resting state). Dilakukan di luar
    // layar/tertutup klon bg, jadi ga perlu animasi reverse. "Tamat" ikut
    // dihapus.
    const resetIfHidden = () => {
      const el = footerRef.value;
      if (!el || tl.isActive() || tl.progress() === 0) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const offscreen = r.bottom < 0 || r.top > vh;
      if (offscreen || effectiveOpacity(el) <= 0.05) {
        tl.pause();
        tl.progress(0);
        isClosed.value = false;
      }
    };

    ScrollTrigger.create({
      trigger: footerRef.value,
      // Range selebar mungkin: dari section mulai kelihatan sampai mentok
      // dokumen, supaya onUpdate kepicu di SEMUA fase (pin, hold, unpin).
      start: 'top bottom',
      end: 'max',
      onUpdate: () => {
        check();
        resetIfHidden();
      },
      onEnter: check,
      onEnterBack: check,
      onLeaveBack: resetIfHidden,
      onLeave: resetIfHidden,
      onRefresh: check,
    });

    // Safety: hard-refresh / scroll-restore langsung di fase footer.
    gsap.delayedCall(0.8, check);
  }, footerRef.value);
});

// ================= GATE `landed` DARI PARENT =================
// landed naik ke 1  : bg shrink sudah mendarat di kertas kanan -> auto-close.
// landed turun ke 0 : user scroll naik lagi (klon bg membesar menutupi buku)
// -> reset instan ke kondisi terbuka; pergantian tak kelihatan karena buku
// kembali tertutup klon bg yang sedang membesar.
watch(
  () => props.landed,
  (v) => {
    const tl = bookTl;
    if (!tl) return;
    if (v >= 0.5) {
      if (tl.progress() === 0 && !tl.isActive()) tl.play();
    } else if (tl.progress() > 0 || tl.isActive()) {
      tl.pause();
      tl.progress(0);
      isClosed.value = false;
    }
  },
);

onUnmounted(() => {
  ctx?.revert();
});
</script>

<style scoped>
/* ==========================================================================
   3D BOOK THEATER STYLES
   ========================================================================== */

/* Perspective Container */
.book-viewport {
  perspective: 2400px;
  perspective-origin: 50% 50%;
  overflow: visible;
}

/* ==========================================================================
   PUSAT KENOP TUNING — "SEBUAH BUKU, SEMUA BAGIANNYA IKUT"
   --------------------------------------------------------------------------
   A. POSISI/UKURAN BUKU (file ini, <style>) — semuanya bergerak bareng:
      paper (buku-img), daun SVG (leaf), cover (flipper-back), DAN gambar
      halaman (.page-art).
       | Kenop                                  | Mengatur                        |
       | ---------------------------------------|---------------------------------|
       | --book-scale (1 = ukuran asli)         | BESAR SELURUH buku, semua bagian |
       |                                        | (png/svg/art/offset px) proporsional |
       | --book-x / --book-y                    | geser SELURUH buku (semua bagian) |
       | .book-box width @media (170/210/280/320)| ukuran dasar per layar (dikali --book-scale) |
      | --leaf-w/h/x/y/rot/color               | daun / halaman kiri             |
      | --art-x/y/s/rot                        | gambar bg di dlm halaman kanan  |
      | paperSrc / coverSrc / bgSrc (script)   | ganti asset gambar              |
   B. ANIMASI ZOOM (file PARENT RsvpGiftRoyalFantasy.vue, const ZOOM):
      | ZOOM.rotStartDeg | rotasi buku saat raksasa (0 = tanpa rotasi)    |
      | ZOOM.rotEndDeg   | rotasi rest setelah zoom-out (10 = miring kanan)|
      | ZOOM.margin      | cadangan S0, naikkan bila pojok layar bocor  |
      | ZOOM.duration / ease / hold | kecepatan zoom & jeda sebelum unpin |
      S0 dihitung OTOMATIS dari ukuran layout .page-right-base vs viewport.
   PENTING: transform .book-zoom milik eksklusif GSAP parent — JANGAN taruh
   CSS transform/transition di .book-zoom; pakai --book-x/y untuk menggeser.
   ========================================================================== */
.book-zoom {
  /* Wrapper khusus GSAP (scale + rotation zoom-out). chain 3D harus tetap
     hidup menembusnya: perspective (viewport) -> .book-zoom -> .book-scene
     -> .book-box -> .book-flipper (rotateY). */
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  will-change: transform;
  transform: scale(6); /* Default awal selalu di posisi zoom raksasa agar tidak pernah bocor kecil di awal */
}

/* ==========================================================================
   KENOP TUNING
   --book-x / --book-y : geser SELURUH buku satu kesatuan (px, +x kanan, +y bawah)
   --leaf-*            : posisi daun (sisi dalam cover). POSISI TETAP SAMA
   SEPERTI TUNING ASLI (x:23 y:-20 w:90% h:80%) — yang berubah HANYA sumbu
   rotasinya.
   ENGSEL animasi = garis vertikal di tepi KANAN daun. Karena .flipper-front
   ber-rotateY(180deg) (membatalkan mirror flipper), tepi kanan daun = tepi
   kanan .leaf-frame (lokal), yang ter-mirror ke koordinat flipper di:
   sumbu = calc(50% - --leaf-w/2 - --leaf-x). Aturan main:
   --leaf-x / --leaf-y : geser daun (px) — sumbu ikut bergeser otomatis,
              engsel selalu menempel di tepi kanan daun.
   --leaf-rot : 0deg secara sengaja — kemiringan daun sudah digambar di
              DALAM path SVG (trapesium, kiri lebih tinggi ≈8°). Frame tidak
              di-rotate agar tepi kanan benar2 vertikal & presisi di sumbu,
              sehingga kanan-atas & kanan-bawah DIAM TOTAL saat flip.
   --leaf-w/h : ukuran daun, 100% = seukuran penuh 1 halaman
   --leaf-radius : 0 — pembulatan sudut KIRI daun kini dilukis di path SVG.
   --art-*           : GAMBAR BACKGROUND yang jadi muka halaman kanan
   (.page-art). --art-x/y geser (px), --art-s zoom (1 = pas cover halaman),
   --art-rot putar (deg). Berguna untuk merapikan crop saat swap awal zoom
   dan posisi gambar ketika buku istirahat. Ter-clip oleh .page-right-base.
   ========================================================================== */
.book-scene {
  /* MASTER SCALE — satu-satunya kenop BESAR BUKU. Ganti nilainya (mis. 0.7
     atau 1.3) dan SEMUA ikut menyesuaikan proporsional: lebar .book-box per
     breakpoint (PNG paper & cover ikut, karena width/height mereka 100%),
     daun SVG (--leaf-w/h persen), gambar halaman (--art-*), plus offset px
     (--leaf-x/y, --art-x/y) yang di-kalikan lewat calc di bawah.
     CATATAN: sengaja bukan transform:scale — parent menghitung scale awal
     zoom (S0) dari paper.offsetWidth yang TIDAK membaca transform, jadi
     buku harus berubah lewat ukuran layout sungguhan supaya zoom-out &
     pendaratan bg tetap presisi. S0 dihitung ulang otomatis oleh parent. */
  --book-scale: 2;

  --book-x: 0px;
  --book-y: 0px;

  /* ANGKATAN PLANE COVER (px). BUG YANG DICEGAH: sumbu rotasi flipper
     (engsel) berada sedikit di KANAN tepi kiri box, sementara PNG cover
     membentang penuh inset:0 — ada irisan kiri SEBESAR offset engsel
     (±5% lebar + --leaf-x) yang saat rotateY berjalan turun ke z NEGATIF
     (di bawah bidang kertas) sehingga kiri-bawah cover terlihat terpotong,
     lalu muncul lagi begitu tween berhenti tepat di rotateY(0) (sebidang).
     translateZ ini mengangkat plane cover sejauh lebih dari irisan itu,
     proporsional --book-scale. Kalau sudut masih kepotong: besarkan;
     kalau tepi cover tampak "melayang/melebar" dibanding kertas: kecilkan. */
  --cover-lift: calc(30px * var(--book-scale));

  --leaf-w: 90%;
  --leaf-h: 90%;
  --leaf-x: calc(-10px * var(--book-scale));
  --leaf-y: calc(-20px * var(--book-scale));
  --leaf-rot: 10deg;
  --leaf-radius: 0px;
  --leaf-color: #7CA2BE;

  --art-x: calc(0px * var(--book-scale));
  --art-y: calc(0px * var(--book-scale));
  --art-s: 0.65;
  --art-rot: 0deg;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  /* patokan: kertas (1 halaman) di-center oleh flex viewport;
     scene diam di 0 — daun menjuntai ke kiri relatif ke buku */
  transform: translate(var(--book-x), var(--book-y));
}

/* Frame pembungkus daun SVG (posisi sama seperti tuning asli).
   PENTING: .flipper-front ber-rotateY(180deg) sehingga mirror-nya flipper
   (-180deg) terbatal — daun tampil TIDAK ter-mirror. Artinya tepi KANAN
   frame ini = sisi engsel/spine daun yang tampak di layar. Pivot rotate
   ditaruh di tepi kanan agar bila --leaf-rot diutak-atik, tengah tepi
   spine tetap menempel di sumbu. */
.leaf-frame {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--leaf-w);
  height: var(--leaf-h);
  transform: translate(-50%, -50%) translate(var(--leaf-x), var(--leaf-y)) rotate(var(--leaf-rot));
  transform-origin: 100% 50%;
  border-radius: var(--leaf-radius);
  overflow: hidden;
}

/* Base book dimensions responsive: spread open = 2x page width.
   SEMUA dikalikan --book-scale (dikunci di .book-scene) supaya satu kenop
   master mengubah besar buku di setiap breakpoint sekaligus. */
.book-box {
  position: relative;
  width: calc(170px * var(--book-scale));
  height: auto;
  aspect-ratio: 1384 / 1920;
  transform-style: preserve-3d;
}

@media (min-width: 480px) {
  .book-box {
    width: calc(210px * var(--book-scale));
  }
}

@media (min-width: 768px) {
  .book-box {
    width: calc(280px * var(--book-scale));
  }
}

@media (min-width: 1024px) {
  .book-box {
    width: calc(320px * var(--book-scale));
  }
}

/* Book Image Base styling */
.book-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Right Base Page (diam sebagai landasan buku terbuka) + rumah dari
   .page-art (gambar bg). overflow hidden: tunings --art-* yang
   berlebih ter-crop presisi sepanjang halaman; flipper = sibling di
   .book-box, jadi tidak pernah kepotong. */
.page-right-base {
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform-style: preserve-3d;
}

/* MUKA HALAMAN KANAN = gambar background (prop bgSrc dari parent).
   Karena ia anak .page-right-base, SATU kesatuan dengan buku: zoom,
   geser --book-x/y, dan rotasi GSAP otomatis ia ikuti. Kenop --art-*
   untuk mengatur crop-posisi gambar relatif halaman. */
.page-art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(var(--art-x), var(--art-y)) scale(var(--art-s)) rotate(var(--art-rot));
  transform-origin: 50% 50%;
  pointer-events: none;
  user-select: none;
  /* Efek pudar/blur oval halus di semua sisi gambar (feathered vignette) */
  -webkit-mask-image: radial-gradient(
    ellipse 48% 48% at 50% 50%,
    black 35%,
    rgba(0, 0, 0, 0.8) 55%,
    rgba(0, 0, 0, 0.3) 75%,
    transparent 98%
  );
  mask-image: radial-gradient(
    ellipse 48% 48% at 50% 50%,
    black 35%,
    rgba(0, 0, 0, 0.8) 55%,
    rgba(0, 0, 0, 0.3) 75%,
    transparent 98%
  );
}

/* ==========================================================================
   FLIPPER COVER (PAGE TURN 3D)
   Engsel = garis VERTIKAL di tepi kanan daun SVG (sisi spine), BUKAN tepi
   kiri box. Sumbu rotateY dipindah tepat ke garis tepi daun, sehingga saat
   animasi menutup: sudut kanan-atas & kanan-bawah daun DIAM TOTAL (nempel
   sebagai engsel) dan hanya sisi KIRI daun mengayun mengikuti rotasi 3D.
   Rumus sumbu: .flipper-front me-mirror koordinat daun terhadap titik
   tengah box (rotateY 180deg), jadi tepi kanan daun di lokal x = 50% +
   --leaf-w/2 + --leaf-x terproyeksi ke 50% - --leaf-w/2 - --leaf-x.
   ========================================================================== */
.book-flipper {
  width: 100%;
  height: 100%;
  /* Titik tumpu = proyeksi garis tepi daun sisi spine ke koordinat flipper */
  transform-origin: calc(50% - var(--leaf-w) / 2 - var(--leaf-x)) 50%;
  transform-style: preserve-3d;
  /* Kondisi default (TERBUKA): Lembaran berada di sebelah kiri (rotasi -180 deg).
     NOTE: transform kini DIPEGAN PENUH oleh GSAP (timeline auto-close) —
     jangan pakai CSS transition, bentrok dengan update rAF GSAP. */
  transform: rotateY(-180deg);
  will-change: transform;
}

/* Dual Faces of the Flipper Leaf */
.flipper-face {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* SISI DEPAN (Saat terbuka menghadap ke depan = SVG Halaman Kiri) */
/* Karena flipper dirotasi -180deg saat terbuka, sisi yang menghadap kita adalah sisi dengan rotateY(180deg) */
.flipper-front {
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* SISI BELAKANG (Saat tertutup menghadap ke depan = PNG Cover).
   translateZ(--cover-lift): angkat plane cover supaya tidak pernah tenggelam
   di bawah bidang kertas kanan selama rotateY (lihat komentar --cover-lift
   di .book-scene). Di posisi rest (rotateY 0) lift ini hanya menggeser cover
   ±puluhan px ke arah viewer — tak terlihat di perspektif 2400px. */
.flipper-back {
  transform: rotateY(0deg) translateZ(var(--cover-lift));
  display: flex;
  align-items: center;
  justify-content: center;
}


</style>

