<template>
  <section
    v-if="invitation.akad_venue || invitation.resepsi_venue"
    ref="eventsSection"
    class="relative h-[100dvh] overflow-hidden bg-[#aed4da] text-center"
  >
    <!-- ============================================================
         GAMBAR PANORAMA (latar)
         Tinggi full viewport, lebar ikut rasio asli (auto).
         Awalnya yang terlihat = SEBELAH KIRI gambar.
         Saat scroll, "kamera" bergeser ke kanan melewati gambar
         (gambar tergeser ke kiri) — dipindah GSAP lewat ref panoRef.
         ============================================================ -->
    <!-- WRAPPER PANORAMA: lebarnya otomatis = lebar render bg (tinggi
         full viewport, lebar auto). GSAP menggeser WRAPPER ini, jadi
         bg + container info + aset atas bergerak sebagai satu kesatuan
         yang SELALU sejajar 1:1, meski rasio asli kedua gambar berbeda.
         Urutan lapisan (z-index) di dalam wrapper:
           bg img        = z 0  (paling bawah)
           layer putih   = z 1  (0.8, menutupi SELURUH gambar bg)
           stage info    = z 2  (teks tanpa warna, pas-pasan isi)
           aset atas     = z 3  (paling atas)
         Container info TIDAK ada animasi fade — mereka diam menempel
         di koordinat gambarnya masing-masing; pergeseran wrapper-lah
         yang membuat tiap "slide" bergantian masuk ke viewport. -->
    <div
      ref="panoWrapRef"
      style="
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        z-index: 0;
        pointer-events: none;
      "
    >
      <img
        ref="panoRef"
        src="https://media.mengundanganda.com/royalfantasy/event%20section/dewirandi_787a23b3-1199-424f-9f32-e2eb1ab0fee2.webp"
        alt="bg"
        style="
          display: block;
          position: relative;
          z-index: 0;
          height: 100%;
          width: auto;
          max-width: none; /* WAJIB: rasio asli terjaga, bagian kanan gambar
                              memang sengaja di luar viewport (panorama) */
        "
      />

      <!-- LAYER PUTIH GLOBAL — menutupi SELURUH gambar bg (ikut lebar
           panorama, tinggi full layar) dengan ketebalan 0.8. Satu-satunya
           "layar putih" di konsep ini; posisi diapit bg (bawah) dan
           aset depan (atas), ikut bergeser bersama wrapper. -->
      <div
        class="absolute inset-0"
        style="background: #ffffff; opacity: 0.8; z-index: 1;"
      ></div>

      <!-- ========================================================
           PANGGUNG / STAGE INFO — di DALAM wrapper panorama.
           Lebar tiap stage = lebar viewport; posisi `left`-nya
           dihitung JS (layoutStages) agar tepat berada di area
           gambar yang terlihat pada fase masing-masing:
             AKAD     -> fase 1 (kamera kiri)
             RESEPSI  -> fase 2 (kamera tengah)
             KHUTBAH  -> fase 3 (kamera kanan)
           Container teks hanya pas-pasan isi (fit), TANPA warna
           sendiri — yang putih adalah layer global di bawahnya.
           Tanpa fade in/out.
           ======================================================== -->

      <!-- FASE 1 : AKAD (pinggir kiri gambar) -->
      <div
        ref="akadStageRef"
        class="absolute top-0 h-full flex items-center justify-center px-4"
        style="left: 0; z-index: 2;"
      >
        <div class="relative p-6 md:p-8 text-left w-full max-w-sm">
          <span class="absolute top-3 left-4 text-[#B0808A]/60 text-xs">❖</span>
          <span class="absolute top-3 right-4 text-[#B0808A]/60 text-xs">❖</span>

          <div class="w-12 h-12 rounded-2xl border border-white/60 bg-white/70 flex items-center justify-center mb-5 shadow-[0_4px_15px_rgba(31,38,135,0.12)]">
            <Icon icon="ph:rings-duotone" class="w-6 h-6 text-[#B0808A]" />
          </div>

          <h3
            class="text-2xl md:text-3xl font-bold text-slate-900 mb-5"
            :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
          >
            Akad Nikah
          </h3>

          <div class="space-y-3.5 text-xs md:text-sm text-slate-700">
            <div v-if="invitation.akad_date" class="flex gap-3.5 items-start">
              <Icon icon="ph:calendar-blank-duotone" class="w-5 h-5 flex-shrink-0 text-[#B0808A] mt-0.5" />
              <span class="font-medium text-slate-900">{{ formatDateLong(invitation.akad_date) }}</span>
            </div>
            <div v-if="invitation.akad_time" class="flex gap-3.5 items-start">
              <Icon icon="ph:clock-duotone" class="w-5 h-5 flex-shrink-0 text-[#B0808A] mt-0.5" />
              <span>{{ invitation.akad_time }}</span>
            </div>
            <div v-if="invitation.akad_venue" class="flex gap-3.5 items-start">
              <Icon icon="ph:map-pin-duotone" class="w-5 h-5 flex-shrink-0 text-[#B0808A] mt-0.5" />
              <div>
                <strong class="text-slate-900 block text-sm">{{ invitation.akad_venue }}</strong>
                <span v-if="invitation.akad_address" class="text-xs text-slate-700 leading-relaxed block mt-1">
                  {{ invitation.akad_address }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-3 mt-6 pt-4 border-t border-slate-900/10">
            <a
              v-if="invitation.akad_map_url"
              :href="invitation.akad_map_url"
              target="_blank"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider text-slate-900 bg-gradient-to-r from-white via-[#E7F4F7] to-white border border-white/80 shadow-md hover:scale-105 transition-all"
            >
              <Icon icon="ph:map-trifold-duotone" class="w-4 h-4" /> Buka Google Maps
            </a>
            <a
              v-if="invitation.akad_date"
              :href="getAkadCalendarUrl()"
              target="_blank"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider text-slate-900 border border-[#B0808A]/60 hover:bg-[#B0808A]/15 transition-all"
            >
              <Icon icon="ph:calendar-plus-duotone" class="w-4 h-4 text-[#B0808A]" /> Simpan Kalender
            </a>
          </div>
        </div>
      </div>

      <!-- FASE 2 : RESEPSI + LIVE STREAMING (tengah gambar) -->
      <div
        ref="resepsiStageRef"
        class="absolute top-0 h-full flex items-center justify-center px-4"
        style="left: 0; z-index: 2;"
      >
        <div class="w-full max-w-4xl flex flex-col md:flex-row items-stretch justify-center gap-6">
          <!-- Resepsi Card -->
          <div
            v-if="invitation.resepsi_venue"
            class="relative p-6 md:p-8 text-left flex flex-col w-full md:w-80"
          >
            <span class="absolute top-3 left-4 text-[#B0808A]/60 text-xs">❖</span>
            <span class="absolute top-3 right-4 text-[#B0808A]/60 text-xs">❖</span>

            <div class="w-12 h-12 rounded-2xl border border-white/60 bg-white/70 flex items-center justify-center mb-5 shadow-[0_4px_15px_rgba(31,38,135,0.12)]">
              <Icon icon="ph:confetti-duotone" class="w-6 h-6 text-[#B0808A]" />
            </div>

            <h3
              class="text-xl md:text-2xl font-bold text-slate-900 mb-4"
              :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
            >
              Resepsi Pernikahan
            </h3>

            <div class="space-y-3 text-xs md:text-sm text-slate-700">
              <div v-if="invitation.resepsi_date" class="flex gap-3.5 items-start">
                <Icon icon="ph:calendar-blank-duotone" class="w-5 h-5 flex-shrink-0 text-[#B0808A] mt-0.5" />
                <span class="font-medium text-slate-900">{{ formatDateLong(invitation.resepsi_date) }}</span>
              </div>
              <div v-if="invitation.resepsi_time" class="flex gap-3.5 items-start">
                <Icon icon="ph:clock-duotone" class="w-5 h-5 flex-shrink-0 text-[#B0808A] mt-0.5" />
                <span>{{ invitation.resepsi_time }}</span>
              </div>
              <div v-if="invitation.resepsi_venue" class="flex gap-3.5 items-start">
                <Icon icon="ph:map-pin-duotone" class="w-5 h-5 flex-shrink-0 text-[#B0808A] mt-0.5" />
                <div>
                  <strong class="text-slate-900 block text-sm">{{ invitation.resepsi_venue }}</strong>
                  <span v-if="invitation.resepsi_address" class="text-xs text-slate-700 leading-relaxed block mt-1">
                    {{ invitation.resepsi_address }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap gap-2.5 mt-5 pt-4 border-t border-slate-900/10">
              <a
                v-if="invitation.resepsi_map_url"
                :href="invitation.resepsi_map_url"
                target="_blank"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold tracking-wider text-slate-900 bg-gradient-to-r from-white via-[#E7F4F7] to-white border border-white/80 shadow-md hover:scale-105 transition-all"
              >
                <Icon icon="ph:map-trifold-duotone" class="w-4 h-4" /> Google Maps
              </a>
              <a
                v-if="invitation.resepsi_date"
                :href="getResepsiCalendarUrl()"
                target="_blank"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold tracking-wider text-slate-900 border border-[#B0808A]/60 hover:bg-[#B0808A]/15 transition-all"
              >
                <Icon icon="ph:calendar-plus-duotone" class="w-4 h-4 text-[#B0808A]" /> Kalender
              </a>
            </div>
          </div>

          <!-- Live Streaming Card -->
          <div
            v-if="invitation.streaming_enabled && invitation.streaming_url"
            class="p-6 md:p-8 text-center flex flex-col justify-center w-full md:w-96"
          >
            <Icon icon="ph:video-camera-duotone" class="w-8 h-8 mx-auto mb-2 text-[#B0808A]" />
            <h3
              class="text-xl font-bold text-slate-900 mb-2"
              :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
            >
              Live Streaming
            </h3>
            <p class="text-[11px] md:text-xs text-slate-700 mb-4 leading-relaxed">
              Berhalangan hadir? Ikuti prosesi pernikahan kami secara daring:
            </p>
            <div class="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-white/60 bg-black/60">
              <iframe
                :src="getEmbedUrl(invitation.streaming_url, invitation.streaming_platform || 'youtube') || ''"
                class="absolute top-0 left-0 w-full h-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <!-- FASE 3 : KHUTBAH NIKAH (pinggir kanan gambar) -->
      <div
        ref="khutbahStageRef"
        class="absolute top-0 h-full flex items-center justify-center px-4"
        style="left: 0; z-index: 2;"
      >
        <div
          v-if="invitation.khutbah_nikah"
          class="relative p-8 md:p-10 text-center w-full max-w-md"
        >
          <span class="absolute top-3 left-4 text-[#B0808A]/60 text-xs">❖</span>
          <span class="absolute top-3 right-4 text-[#B0808A]/60 text-xs">❖</span>

          <Icon icon="ph:book-open-duotone" class="w-10 h-10 mx-auto mb-4 text-[#B0808A]" />
          <h3
            class="text-2xl font-bold text-slate-900 mb-3"
            :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
          >
            Khutbah Nikah
          </h3>
          <p class="text-xs md:text-sm text-slate-700 mb-2 leading-relaxed">
            Prosesi akad nikah insya Allah akan dibekali khutbah nikah oleh:
          </p>
          <p
            class="text-base md:text-lg font-semibold text-slate-900"
            :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
          >
            {{ invitation.khutbah_nikah }}
          </p>
        </div>
      </div>

      <!-- ASET DI ATAS PANORAMA — menutupi kotak render bg persis,
           berada DI ATAS container info (z-index 2). Aset ini biasanya
           punya area transparan sebagai "jendela" tempat info terlihat.
           object-fit:fill → ditaruh dalam kotak yang sama; kalau aset ini
           rasionya SAMA dengan bg, hasilnya presisi tanpa distorsi. -->
      <img
        ref="panoTopRef"
        src="https://media.mengundanganda.com/royalfantasy/event%20section/dewirandi_001e7c16-d887-4625-a1dd-0dce339969d2.webp"
        alt=""
        style="
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: fill;
          z-index: 3;
        "
      />
    </div>

    <!-- Veil lembut biar teks tetap kebaca di atas gambar -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.2) 100%); z-index: 1;"
    ></div>

    <!-- Section Header (diam di atas, semua fase) -->
    <div ref="headerRef" class="absolute top-[5%] inset-x-0 z-20 opacity-0 translate-y-6 px-4 text-center">
      <div class="flex items-center justify-center gap-2 mb-2">
        <span class="text-[#B0808A] text-xs">✦</span>
        <span class="text-xs uppercase tracking-[0.35em] text-[#B0808A] font-semibold">Rangkaian Acara</span>
        <span class="text-[#B0808A] text-xs">✦</span>
      </div>
      <h2
        class="text-3xl md:text-5xl font-bold text-slate-900"
        :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
      >
        Agenda Pernikahan
      </h2>
      <div class="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#7FB3C0] to-transparent mx-auto mt-4"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';
import { generateGoogleCalendarUrl } from '@/utils/calendar';
import { getEmbedUrl } from '@/utils/streaming';
import { Icon } from '@iconify/vue';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
  countdown?: { days: number; hours: number; minutes: number; seconds: number };
  hasDate?: boolean;
}>();

const eventsSection = ref<HTMLElement | null>(null);
const panoWrapRef = ref<HTMLElement | null>(null); // kanvas: bg + stage info + aset atas, digeser bersama
const panoRef = ref<HTMLImageElement | null>(null);
const panoTopRef = ref<HTMLImageElement | null>(null); // aset nempel di atas panorama (paling atas)
const headerRef = ref<HTMLElement | null>(null);
const akadStageRef = ref<HTMLElement | null>(null);
const resepsiStageRef = ref<HTMLElement | null>(null);
const khutbahStageRef = ref<HTMLElement | null>(null);

// ============================================================
// X = POSISI KAMERA PANORAMA PER FASE — OTAK-ATIK DI SINI!
// Nilai dalam FRAKSI jarak jelajah kamera (lihat X_PAD di bawah:
// ujung kiri & kanan gambar TIDAK PERNAH ditampilkan, jadi 0 =
// sedekat mungkin ke kiri tanpa memperlihatkan tembok).
//   0   = batas kiri area aman  (fase Akad)
//   0.5 = tengah gambar         (fase Resepsi + Streaming)
//   1   = batas kanan area aman (fase Khutbah)
// Boleh angka bebas, mis. 0.35, 0.6, dst. Kalau gambar kurang
// lebar buat geser, bagian yang kehabisan gambar diam di tempat.
// Nilai yang sama dipakai layoutStages() untuk menempatkan tiap
// container info tepat di area gambar fase tersebut.
// ============================================================
const X_AKAD = 0;
const X_RESEPSI = 0.5;
const X_KHUTBAH = 1;

// Scroll "tahan" (hold) per fase — makin besar makin lama kamera
// diam sebelum bergeser ke fase berikutnya.
const HOLD = 1.2;

// BATAS UJUNG KIRI-KANAN (px): bagian pinggir gambar panorama tidak
// pernah ditampilkan — di ujung asli gambar ada tembok yang mengganggu.
// Kamera cuma boleh menjelajah dari X_PAD px setelah tepi kiri, sampai
// X_PAD px sebelum tepi kanan. Ubah angka kalau 30px kurang/lebih.
const X_PAD = 60;

function getAkadCalendarUrl() {
  return generateGoogleCalendarUrl({
    title: `Akad Nikah ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`,
    date: props.invitation.akad_date!,
    time: props.invitation.akad_time,
    venue: props.invitation.akad_venue,
    address: props.invitation.akad_address,
    description: `Undangan Pernikahan ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`,
  });
}

function getResepsiCalendarUrl() {
  return generateGoogleCalendarUrl({
    title: `Resepsi ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`,
    date: props.invitation.resepsi_date!,
    time: props.invitation.resepsi_time,
    venue: props.invitation.resepsi_venue,
    address: props.invitation.resepsi_address,
    description: `Undangan Pernikahan ${props.invitation.groom_name || ''} & ${props.invitation.bride_name || ''}`,
  });
}

function formatDateLong(dateStr: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Rentang jelajah kamera dalam px (sama seperti rumus di xFor).
function getUsableSpan() {
  const img = panoRef.value;
  const container = eventsSection.value;
  if (!img || !container) return { vw: 0, usable: 0, maxShift: 0 };
  const vw = container.offsetWidth;
  const maxShift = Math.max(0, img.offsetWidth - vw);
  return { vw, maxShift, usable: maxShift - X_PAD * 2 };
}

// posisi x gambar (px) untuk fraksi fase — dihitung ulang tiap refresh.
// Rentang kamera dibatasi X_PAD di kedua ujung: x = -X_PAD (paling kiri,
// tembok kiri terdorong keluar layar) ... x = -(lebih geser - X_PAD)
// (paling kanan, tembok kanan terdorong keluar layar).
const xFor = (frac: number) => {
  const { maxShift, usable } = getUsableSpan();
  if (usable <= 0) return -maxShift / 2; // gambar kurang lebar → tengahkan saja
  return -X_PAD - usable * frac; // negatif = gambar bergeser ke kiri, kamera lihat kanan
};

// ============================================================
// TEMPATKAN CONTAINER INFO DI KOORDINAT GAMBAR (bukan layar).
// Tiap stage selebar viewport, `left`-nya = titik awal jendela
// kamera pada fase tersebut, sehingga saat kamera tiba di posisi
// fase itu, stage-nya sudah pas berada di dalam viewport — tanpa
// animasi fade apa pun. Dipanggil saat setup & setiap resize.
// ============================================================
function layoutStages() {
  const { vw, usable } = getUsableSpan();
  if (!vw) return;
  const safeUsable = Math.max(0, usable);
  const place = (el: HTMLElement | null, frac: number) => {
    if (!el) return;
    el.style.width = `${vw}px`;
    el.style.left = `${X_PAD + safeUsable * frac}px`;
  };
  place(akadStageRef.value, X_AKAD);
  place(resepsiStageRef.value, X_RESEPSI);
  place(khutbahStageRef.value, X_KHUTBAH);
}

const setupAnimation = () => {
  if (!eventsSection.value || !panoRef.value) return;

  const container = eventsSection.value;

  // tempatkan stage info di koordinat gambar masing-masing fase
  layoutStages();

  // awal: kamera di pinggir kiri gambar — wrapper (bg + stage + aset atas) digeser bersama
  const panTarget = panoWrapRef.value;
  gsap.set(panTarget, { x: () => xFor(X_AKAD) });

  // ===== timeline utama: SCROLL-BASED (scrub) + PIN =====
  // Tidak ada fade in/out stage — hanya pergeseran kamera.
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=380%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // FASE 1 — AKAD (kamera di kiri; stage akad sudah nempel di sini)
  tl.to({}, { duration: HOLD })

    // geser kamera ke fase 2: gambar meluncur, stage resepsi sudah nempel di tempatnya
    .to(panTarget, { x: () => xFor(X_RESEPSI), duration: 1.6, ease: 'power1.inOut' })

    // FASE 2 — RESEPSI + STREAMING (kamera di tengah)
    .to({}, { duration: HOLD })

    // geser kamera ke fase 3: gambar meluncur lagi, stage khutbah sudah nempel
    .to(panTarget, { x: () => xFor(X_KHUTBAH), duration: 1.6, ease: 'power1.inOut' })

    // FASE 3 — KHUTBAH (kamera di kanan)
    .to({}, { duration: HOLD });

  // ===== entrance (bukan scrub): hanya header muncul saat section terlihat =====
  const intro = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
      once: true,
    },
  });

  intro.to(headerRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
  });
};

const onResize = () => {
  layoutStages();
};

onMounted(() => {
  if (!panoRef.value) return;

  window.addEventListener('resize', onResize);

  const initAndRefresh = () => {
    setupAnimation();
    // Setelah pin spacer Events dibuat, sort & refresh agar section
    // berikutnya (LoveStory, dll) menghitung posisi start/end
    // mereka dengan benar — termasuk memperhitungkan pin spacer ini.
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  };

  if (panoRef.value.complete && panoRef.value.offsetWidth > 0) {
    initAndRefresh();
  } else {
    panoRef.value.onload = () => {
      initAndRefresh();
    };
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
  // Hanya kill ScrollTrigger milik section ini, bukan semuanya
  ScrollTrigger.getAll().forEach((st) => {
    if (st.trigger === eventsSection.value) {
      st.kill();
    }
  });
});
</script>
