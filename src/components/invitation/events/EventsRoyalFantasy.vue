<template>
  <section
    v-if="invitation.akad_venue || invitation.resepsi_venue"
    ref="eventsSection"
    class="relative h-[100dvh] overflow-hidden bg-[#aa8352] text-center"
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
        <div style="position:relative;width:100%;max-width:360px;margin:0 auto;padding:12px 16px;text-align:center;background:transparent;border:none;border-radius:0;box-shadow:none;backdrop-filter:none;-webkit-backdrop-filter:none;transform:perspective(750px) rotateY(20deg) rotateX(1.5deg) skewY(-2deg) translateY(-55px) translateX(22px);transform-origin:50% 50%;">
          <span style="position:absolute;top:0;left:6px;color:rgba(170,131,82,0.55);font-size:10px;line-height:1;">❖</span>
          <span style="position:absolute;top:0;right:6px;color:rgba(170,131,82,0.55);font-size:10px;line-height:1;">❖</span>

          <svg width="110" height="14" viewBox="0 0 110 14" fill="none" style="display:block;margin:0 auto 10px;">
            <line x1="0" y1="7" x2="40" y2="7" stroke="#aa8352" stroke-width="1" opacity="0.55" />
            <line x1="70" y1="7" x2="110" y2="7" stroke="#aa8352" stroke-width="1" opacity="0.55" />
            <rect x="51" y="3" width="8" height="8" transform="rotate(45 55 7)" fill="none" stroke="#aa8352" stroke-width="1" />
            <circle cx="55" cy="7" r="1.4" fill="#aa8352" />
            <circle cx="44" cy="7" r="1" fill="#aa8352" opacity="0.6" />
            <circle cx="66" cy="7" r="1" fill="#aa8352" opacity="0.6" />
          </svg>
          <h3
            :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif`, margin: '0', color: '#2b2118', fontSize: '22px', lineHeight: '1.2', fontWeight: '700' }"
          >
            Akad Nikah
          </h3>

          <div style="width:52px;height:1.5px;margin:10px auto 14px;border-radius:999px;background:linear-gradient(to right, transparent, #aa8352, transparent);"></div>

          <div style="display:flex;flex-direction:column;gap:10px;align-items:flex-start;font-size:12px;line-height:1.6;color:#57534e;text-align:left;padding-left:52px;">
            <div v-if="invitation.akad_date" style="display:flex;gap:8px;align-items:center;justify-content:flex-start;">
              <Icon icon="ph:calendar-blank-duotone" style="width:17px;height:17px;flex-shrink:0;color:#aa8352;" />
              <span style="font-weight:600;color:#292524;">{{ formatDateLong(invitation.akad_date) }}</span>
            </div>
            <div v-if="invitation.akad_time" style="display:flex;gap:8px;align-items:center;justify-content:flex-start;">
              <Icon icon="ph:clock-duotone" style="width:17px;height:17px;flex-shrink:0;color:#aa8352;" />
              <span>{{ invitation.akad_time }}</span>
            </div>
            <div v-if="invitation.akad_venue" style="display:flex;gap:8px;align-items:flex-start;justify-content:flex-start;text-align:left;">
              <Icon icon="ph:map-pin-duotone" style="width:17px;height:17px;flex-shrink:0;color:#aa8352;margin-top:2px;" />
              <div style="text-align:left;">
                <strong style="display:block;color:#292524;font-size:13px;line-height:1.4;">{{ invitation.akad_venue }}</strong>
                <span v-if="invitation.akad_address" style="display:block;margin-top:3px;font-size:11px;line-height:1.7;color:#57534e;max-width:250px;">
                  {{ invitation.akad_address }}
                </span>
              </div>
            </div>
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:16px;padding-top:14px;border-top:1px solid rgba(170,131,82,0.28);">
            <a
              v-if="invitation.akad_map_url"
              :href="invitation.akad_map_url"
              target="_blank"
              style="display:inline-flex;align-items:center;gap:7px;padding:8px 16px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:0.04em;color:#ffffff;background:#aa8352;border:1px solid #aa8352;box-shadow:0 4px 14px rgba(170,131,82,0.32);text-decoration:none;transition:transform 0.2s ease;"
            >
              <Icon icon="ph:map-trifold-duotone" style="width:14px;height:14px;" /> Buka Google Maps
            </a>
            <a
              v-if="invitation.akad_date"
              :href="getAkadCalendarUrl()"
              target="_blank"
              style="display:inline-flex;align-items:center;gap:7px;padding:8px 16px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:0.04em;color:#aa8352;background:rgba(255,255,255,0.7);border:1px solid rgba(170,131,82,0.6);text-decoration:none;transition:background 0.2s ease;"
            >
              <Icon icon="ph:calendar-plus-duotone" style="width:14px;height:14px;color:#aa8352;" /> Simpan Kalender
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
        <div class="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-6">
          <!-- Resepsi : gaya Akad — tanpa miring, posisi tengah -->
          <div
            v-if="invitation.resepsi_venue"
            style="position:relative;width:100%;max-width:360px;margin:0 auto;padding:12px 16px;text-align:center;background:transparent;border:none;border-radius:0;box-shadow:none;transform:translateY(-55px);"
          >
            <span style="position:absolute;top:0;left:6px;color:rgba(170,131,82,0.55);font-size:10px;line-height:1;">❖</span>
            <span style="position:absolute;top:0;right:6px;color:rgba(170,131,82,0.55);font-size:10px;line-height:1;">❖</span>

            <svg width="110" height="14" viewBox="0 0 110 14" fill="none" style="display:block;margin:0 auto 10px;">
              <line x1="0" y1="7" x2="40" y2="7" stroke="#aa8352" stroke-width="1" opacity="0.55" />
              <line x1="70" y1="7" x2="110" y2="7" stroke="#aa8352" stroke-width="1" opacity="0.55" />
              <rect x="51" y="3" width="8" height="8" transform="rotate(45 55 7)" fill="none" stroke="#aa8352" stroke-width="1" />
              <circle cx="55" cy="7" r="1.4" fill="#aa8352" />
              <circle cx="44" cy="7" r="1" fill="#aa8352" opacity="0.6" />
              <circle cx="66" cy="7" r="1" fill="#aa8352" opacity="0.6" />
            </svg>
            <h3
              :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif`, margin: '0', color: '#2b2118', fontSize: '20px', lineHeight: '1.25', fontWeight: '700' }"
            >
              Resepsi Pernikahan
            </h3>

            <div style="width:52px;height:1.5px;margin:10px auto 14px;border-radius:999px;background:linear-gradient(to right, transparent, #aa8352, transparent);"></div>

            <div style="display:flex;flex-direction:column;gap:10px;align-items:flex-start;font-size:12px;line-height:1.6;color:#57534e;text-align:left;padding-left:52px;">
              <div v-if="invitation.resepsi_date" style="display:flex;gap:8px;align-items:center;justify-content:flex-start;">
                <Icon icon="ph:calendar-blank-duotone" style="width:17px;height:17px;flex-shrink:0;color:#aa8352;" />
                <span style="font-weight:600;color:#292524;">{{ formatDateLong(invitation.resepsi_date) }}</span>
              </div>
              <div v-if="invitation.resepsi_time" style="display:flex;gap:8px;align-items:center;justify-content:flex-start;">
                <Icon icon="ph:clock-duotone" style="width:17px;height:17px;flex-shrink:0;color:#aa8352;" />
                <span>{{ invitation.resepsi_time }}</span>
              </div>
              <div v-if="invitation.resepsi_venue" style="display:flex;gap:8px;align-items:flex-start;justify-content:flex-start;text-align:left;">
                <Icon icon="ph:map-pin-duotone" style="width:17px;height:17px;flex-shrink:0;color:#aa8352;margin-top:2px;" />
                <div style="text-align:left;">
                  <strong style="display:block;color:#292524;font-size:13px;line-height:1.4;">{{ invitation.resepsi_venue }}</strong>
                  <span v-if="invitation.resepsi_address" style="display:block;margin-top:3px;font-size:11px;line-height:1.7;color:#57534e;max-width:250px;">
                    {{ invitation.resepsi_address }}
                  </span>
                </div>
              </div>
            </div>

            <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:16px;padding-top:14px;border-top:1px solid rgba(170,131,82,0.28);">
              <a
                v-if="invitation.resepsi_map_url"
                :href="invitation.resepsi_map_url"
                target="_blank"
                style="display:inline-flex;align-items:center;gap:7px;padding:8px 16px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:0.04em;color:#ffffff;background:#aa8352;border:1px solid #aa8352;box-shadow:0 4px 14px rgba(170,131,82,0.32);text-decoration:none;"
              >
                <Icon icon="ph:map-trifold-duotone" style="width:14px;height:14px;" /> Google Maps
              </a>
              <a
                v-if="invitation.resepsi_date"
                :href="getResepsiCalendarUrl()"
                target="_blank"
                style="display:inline-flex;align-items:center;gap:7px;padding:8px 16px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:0.04em;color:#aa8352;background:rgba(255,255,255,0.7);border:1px solid rgba(170,131,82,0.6);text-decoration:none;"
              >
                <Icon icon="ph:calendar-plus-duotone" style="width:14px;height:14px;color:#aa8352;" /> Kalender
              </a>
            </div>
          </div>

          <!-- Live Streaming : samakan gaya (ramping, tengah, tanpa card) -->
          <div
            v-if="invitation.streaming_enabled && invitation.streaming_url"
            style="width:100%;max-width:360px;margin:0 auto;padding:12px 16px;text-align:center;background:transparent;"
          >
            <Icon icon="ph:video-camera-duotone" style="width:22px;height:22px;margin:0 auto 8px;color:#aa8352;" />
            <h3
              :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif`, margin: '0 0 6px', color: '#2b2118', fontSize: '20px', lineHeight: '1.25', fontWeight: '700' }"
            >
              Live Streaming
            </h3>
            <p style="margin:0 0 12px;font-size:11px;line-height:1.7;color:#57534e;">
              Berhalangan hadir? Ikuti prosesi pernikahan kami secara daring:
            </p>
            <div style="position:relative;width:100%;aspect-ratio:16/9;border-radius:14px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.25);border:1px solid rgba(170,131,82,0.4);background:rgba(0,0,0,0.6);">
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
          style="position:relative;width:100%;max-width:340px;margin:0 auto;padding:12px 16px;text-align:center;background:transparent;border:none;box-shadow:none;transform:perspective(750px) rotateY(-20deg) rotateX(1.5deg) skewY(2deg) translateY(-55px) translateX(-22px);transform-origin:50% 50%;"
        >
          <span style="position:absolute;top:0;left:6px;color:rgba(170,131,82,0.55);font-size:10px;line-height:1;">❖</span>
          <span style="position:absolute;top:0;right:6px;color:rgba(170,131,82,0.55);font-size:10px;line-height:1;">❖</span>

          <svg width="110" height="14" viewBox="0 0 110 14" fill="none" style="display:block;margin:0 auto 10px;">
            <line x1="0" y1="7" x2="40" y2="7" stroke="#aa8352" stroke-width="1" opacity="0.55" />
            <line x1="70" y1="7" x2="110" y2="7" stroke="#aa8352" stroke-width="1" opacity="0.55" />
            <rect x="51" y="3" width="8" height="8" transform="rotate(45 55 7)" fill="none" stroke="#aa8352" stroke-width="1" />
            <circle cx="55" cy="7" r="1.4" fill="#aa8352" />
            <circle cx="44" cy="7" r="1" fill="#aa8352" opacity="0.6" />
            <circle cx="66" cy="7" r="1" fill="#aa8352" opacity="0.6" />
          </svg>
          <h3
            :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif`, margin: '0', color: '#2b2118', fontSize: '20px', lineHeight: '1.25', fontWeight: '700' }"
          >
            Khutbah Nikah
          </h3>
          <div style="width:52px;height:1.5px;margin:10px auto 12px;border-radius:999px;background:linear-gradient(to right, transparent, #aa8352, transparent);"></div>
          <p style="margin:0 0 6px;font-size:11px;line-height:1.7;color:#57534e;">
            Prosesi akad nikah insya Allah akan dibekali khutbah nikah oleh:
          </p>
          <p
            :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif`, margin: '0', color: '#292524', fontSize: '15px', lineHeight: '1.5', fontWeight: '600' }"
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
    <div ref="headerRef" class="absolute top-[10%] inset-x-0 z-20 opacity-0 px-4 text-center pointer-events-none">
      <div
        ref="headerTiltRef"
        style="
          position: relative;
          display: inline-block;
          width: 100%;
          max-width: 320px;
          padding: 20px 44px 22px;
          transform: perspective(750px) translateX(22px) rotateY(14deg) rotateX(1deg);
          transform-origin: 50% 50%;
        "
      >
        <img
          src="https://media.mengundanganda.com/royalfantasy/event%20section/dewirandi_e516f8ae-df2e-4040-b705-081948195982.webp"
          alt=""
          style="
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: fill;
            pointer-events: none;
            filter: drop-shadow(0 4px 12px rgba(170, 131, 82, 0.2));
          "
        />
        <div style="position: relative; z-index: 1; text-align: center;">
          <div class="flex items-center justify-center gap-1.5 mb-1.5">
            <span class="text-[#aa8352] text-[10px]">✦</span>
            <span class="text-[9.5px] uppercase tracking-[0.28em] text-[#aa8352] font-bold">Rangkaian Acara</span>
            <span class="text-[#aa8352] text-[10px]">✦</span>
          </div>
          <h2
            class="font-bold text-[#2b2118]"
            :style="{
              fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif`,
              fontSize: 'clamp(15px, 4vw, 19px)',
              lineHeight: '1.2',
              whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
            }"
          >
            Agenda Pernikahan
          </h2>
        </div>
      </div>
    </div>
    <ScrollCueRoyalFantasy />
  </section>
</template>

<script setup lang="ts">
import ScrollCueRoyalFantasy from '@/components/invitation/royal/ScrollCueRoyalFantasy.vue';
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
const headerTiltRef = ref<HTMLElement | null>(null);
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

  // awal: kamera di fase pertama yang ADA datanya
  const panTarget = panoWrapRef.value;

  // Fase yang aktif mengikuti data user:
  //  hanya akad               -> [akad] (tanpa slide, langsung ke Love Story)
  //  akad + resepsi           -> [akad, resepsi] (slide sekali, lalu ke Love Story)
  //  lengkap                  -> [akad, resepsi, khutbah]
  type Phase = 'akad' | 'resepsi' | 'khutbah';
  const hasAkad = !!(props.invitation.akad_venue || props.invitation.akad_date);
  const hasResepsi = !!(
    props.invitation.resepsi_venue ||
    props.invitation.resepsi_date ||
    (props.invitation.streaming_enabled && props.invitation.streaming_url)
  );
  const hasKhutbah = !!props.invitation.khutbah_nikah;
  const phases: Phase[] = [];
  if (hasAkad) phases.push('akad');
  if (hasResepsi) phases.push('resepsi');
  if (hasKhutbah) phases.push('khutbah');
  if (!phases.length) phases.push('akad');

  // Posisi kamera + pose judul per fase (judul 1 grup dengan dinding gazebo).
  const camFrac: Record<Phase, number> = { akad: X_AKAD, resepsi: X_RESEPSI, khutbah: X_KHUTBAH };
  const headerPose: Record<Phase, { x: number; ry: number; rx: number }> = {
    akad: { x: 22, ry: 14, rx: 1 },
    resepsi: { x: 0, ry: 0, rx: 0 },
    khutbah: { x: -22, ry: -14, rx: 1 },
  };

  const firstPhase: Phase = phases[0] ?? 'akad';
  gsap.set(panTarget, { x: () => xFor(camFrac[firstPhase]) });

  // Judul 1 grup dengan dinding melengkung gazebo (pose awal = fase pertama).
  const headerState = { ...headerPose[firstPhase] };
  const applyHeaderTilt = () => {
    if (!headerTiltRef.value) return;
    headerTiltRef.value.style.transform = `perspective(750px) translateX(${headerState.x}px) rotateY(${headerState.ry}deg) rotateX(${headerState.rx}deg)`;
  };
  applyHeaderTilt();

  // ===== timeline utama: SCROLL-BASED (scrub) + PIN =====
  // Jumlah slide = jumlah fase aktif - 1. Tidak ada fade in/out stage —
  // hanya pergeseran kamera. Jarak pin menyesuaikan jumlah slide.
  const slideCount = phases.length - 1;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: `+=${130 + slideCount * 125}%`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Tahan di fase pertama, lalu geser ke tiap fase aktif berikutnya.
  // Judul ikut berubah pose paralel dengan gerakan kamera ('<').
  tl.to({}, { duration: HOLD });
  for (let i = 1; i < phases.length; i++) {
    const phase: Phase = phases[i] ?? 'akad';
    const frac = camFrac[phase];
    const pose = headerPose[phase];
    tl.to(panTarget, { x: () => xFor(frac), duration: 1.6, ease: 'power1.inOut' })
      .to(headerState, { ...pose, duration: 1.6, ease: 'power1.inOut', onUpdate: applyHeaderTilt }, '<')
      .to({}, { duration: HOLD });
  }

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
