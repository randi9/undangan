<template>
  <!-- ============================================================
    EVENT HANEUL — semua styling pakai CSS INLINE (style="...")
    Struktur 1 layar pinned (100svh):
    - Judul di atas | peta di tengah (flex:1) | indikator di bawah.
    - Scroll menggerakkan pin + memunculkan kartu (lihat script).
    Cara ngotak-ngatik:
    - Margin/jarak: ubah "margin" / "padding" tiap blok di bawah.
    - Ukuran judul: ubah "font-size" di <h2> (clamp = otomatis
      kecil di HP, besar di layar lebar).
    - Kartu akad/resepsi: ubah "padding" / "font-size" / warna
      di blok AKAD CARD / RESEPSI CARD.
    ============================================================ -->
  <section
    v-if="hasEvent"
    ref="eventsSection"
    :style="{ fontFamily: themeConfig?.fontBody || `'Plus Jakarta Sans', sans-serif` }"
    style="position:relative; width:100%; overflow:hidden; background:#F4EDE0; margin:0; padding:0; box-sizing:border-box;"
  >
    <!-- Journey (pinned 100dvh: judul + peta + info dalam satu layar) -->
    <div
      ref="journeyWrapper"
      :style="{ height: wrapperHeight }"
      style="position:relative; width:100%; z-index:10; margin:0; padding:0; box-sizing:border-box;"
    >
      <div
        ref="journeyPinRef"
        style="height:100svh; width:100%; display:flex; flex-direction:column; align-items:center; margin:0; padding:12px 16px 16px; overflow:hidden; box-sizing:border-box;"
      >
        <!-- JUDUL (di atas. Ubah: ukuran=font-size | warna=color |
             jarak bawah=margin di ornamen svg) -->
        <div
          ref="headerRef"
          style="flex-shrink:0; display:flex; flex-direction:column; align-items:center; text-align:center; margin:0; padding:clamp(8px,2dvh,20px) 16px 0;"
        >
          <h2
            :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }"
            style="margin:0; padding:0; font-size:clamp(1.7rem,7.5vw,2.6rem); font-weight:600; letter-spacing:-0.01em; line-height:1.2; color:#1E354D;"
          >
            Wedding Journey
          </h2>
          <!-- thin wedding ornament (hiasan garis, bukan tulisan) -->
          <svg viewBox="0 0 320 32" fill="none" style="width:min(58vw,260px); height:auto; display:block; margin:10px auto 0; padding:0; color:#8B6F47;">
            <line x1="10" y1="16" x2="120" y2="16" stroke="currentColor" stroke-width="1" opacity="0.5" />
            <line x1="200" y1="16" x2="310" y2="16" stroke="currentColor" stroke-width="1" opacity="0.5" />
            <g transform="translate(160,16)">
              <path d="M0,-7 C4,-2 4,2 0,7 C-4,2 -4,-2 0,-7 Z" fill="#D4AF37" opacity="0.9" />
              <path d="M-22,0 C-14,-6 -6,-6 -1,-1 C-6,1 -14,2 -22,0 Z" fill="none" stroke="currentColor" stroke-width="1" opacity="0.7" />
              <path d="M22,0 C14,-6 6,-6 1,-1 C6,1 14,2 22,0 Z" fill="none" stroke="currentColor" stroke-width="1" opacity="0.7" />
              <circle cx="-26" cy="0" r="1.6" fill="currentColor" opacity="0.6" />
              <circle cx="26" cy="0" r="1.6" fill="currentColor" opacity="0.6" />
            </g>
          </svg>
        </div>

        <!-- STAGE / PETA (di tengah, mengisi sisa ruang.
             Ubah: jarak atas-bawah=margin | lebar max=max-width) -->
        <div
          ref="stageRef"
          style="position:relative; width:100%; max-width:64rem; flex:1 1 auto; min-height:0; display:flex; align-items:center; justify-content:center; margin:10px 0; padding:0; box-sizing:border-box;"
        >
          <!-- SVG MAP (statis penuh + animasi travel via script) -->
          <svg
            ref="svgRef"
            viewBox="0 0 400 920"
            style="height:100%; max-height:100%; width:auto; max-width:min(80vw,400px); display:block; margin:0; padding:0; overflow:visible; user-select:none;"
          >
            <defs>
              <linearGradient id="haneulJourneyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#7DA8CC" />
                <stop offset="55%" stop-color="#386B99" />
                <stop offset="100%" stop-color="#C9A227" />
              </linearGradient>
              <filter id="haneulSoft" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#386B99" flood-opacity="0.18" />
              </filter>
            </defs>

            <!-- (paper blobs dihapus — tanpa shape berwarna di belakang peta) -->

            <!-- sparkles -->
            <g fill="#D4AF37" opacity="0.55">
              <path d="M52,180 l2,6 6,2 -6,2 -2,6 -2,-6 -6,-2 6,-2 Z" />
              <path d="M348,420 l1.6,5 5,1.6 -5,1.6 -1.6,5 -1.6,-5 -5,-1.6 5,-1.6 Z" opacity="0.7" />
              <path d="M70,760 l1.6,5 5,1.6 -5,1.6 -1.6,5 -1.6,-5 -5,-1.6 5,-1.6 Z" opacity="0.6" />
            </g>

            <!-- thin leaf ornaments -->
            <g stroke-linecap="round" fill="none" opacity="0.85">
              <g transform="translate(58,330)">
                <path d="M0,0 C-2,-22 8,-38 26,-44" stroke="#9DB9A0" stroke-width="1.4" />
                <path d="M4,-12 C-4,-14 -10,-12 -14,-6 C-6,-4 -1,-7 4,-12 Z" fill="#B9CFAE" stroke="none" opacity="0.9" />
                <path d="M10,-26 C2,-28 -4,-26 -8,-20 C0,-18 6,-21 10,-26 Z" fill="#CBDDBE" stroke="none" opacity="0.9" />
                <circle cx="26" cy="-44" r="3" fill="#E9B9C4" stroke="none" opacity="0.9" />
              </g>
              <g transform="translate(344,600) scale(-1,1)">
                <path d="M0,0 C-2,-22 8,-38 26,-44" stroke="#9DB9A0" stroke-width="1.4" />
                <path d="M4,-12 C-4,-14 -10,-12 -14,-6 C-6,-4 -1,-7 4,-12 Z" fill="#B9CFAE" stroke="none" opacity="0.9" />
                <path d="M10,-26 C2,-28 -4,-26 -8,-20 C0,-18 6,-21 10,-26 Z" fill="#CBDDBE" stroke="none" opacity="0.9" />
                <circle cx="26" cy="-44" r="3" fill="#A7C7E7" stroke="none" opacity="0.9" />
              </g>
              <g transform="translate(70,560)">
                <path d="M0,0 C6,10 16,14 28,12" stroke="#C9B895" stroke-width="1.2" />
                <circle cx="30" cy="12" r="2.2" fill="#D4AF37" stroke="none" opacity="0.8" />
              </g>
              <g transform="translate(330,250)">
                <path d="M0,0 C-6,10 -16,14 -28,12" stroke="#C9B895" stroke-width="1.2" />
                <circle cx="-30" cy="12" r="2.2" fill="#D4AF37" stroke="none" opacity="0.8" />
              </g>
            </g>

            <!-- base road -->
            <path :d="PATH_D" fill="none" stroke="#E3D5B8" stroke-width="16" stroke-linecap="round" opacity="0.95" />
            <path :d="PATH_D" fill="none" stroke="#FFFEF9" stroke-width="11" stroke-linecap="round" opacity="1" />
            <!-- travelled (animasi scroll via script) -->
            <path
              ref="progressPathRef"
              :d="PATH_D"
              fill="none"
              stroke="url(#haneulJourneyGrad)"
              stroke-width="7"
              stroke-linecap="round"
            />
            <!-- map dashes -->
            <path :d="PATH_D" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-dasharray="0.5 10" opacity="0.9" />
            <!-- invisible measuring path -->
            <path ref="basePathRef" :d="PATH_D" fill="none" stroke="none" />

            <!-- START (tanpa tulisan) -->
            <g :transform="`translate(${startPt.x},${startPt.y})`">
              <circle r="7" fill="#fff" stroke="#8B6F47" stroke-width="1.6" opacity="0.95" />
              <circle r="2.6" fill="#8B6F47" />
            </g>

            <!-- AKAD NODE -->
            <g v-if="hasAkad" :transform="`translate(${akadPt.x},${akadPt.y})`">
              <circle v-if="isAkadActive && !akadDone" r="22" fill="#D4AF37" opacity="0.18">
                <animate attributeName="r" values="16;24;16" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.25;0.08;0.25" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="13" fill="#fff" :stroke="akadDone ? '#386B99' : '#D4AF37'" stroke-width="3" filter="url(#haneulSoft)" />
              <circle v-if="!akadDone" r="4.5" :fill="isAkadActive ? '#D4AF37' : '#7DA8CC'" />
              <path v-else d="M-5,0 L-1.5,3.5 L5,-3.5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
              <circle v-if="akadDone" r="13" fill="#386B99" opacity="0.12" />
              <g :transform="akadPt.x > 200 ? `translate(20,-28)` : `translate(-20,-28)`">
                <text y="-1" text-anchor="middle" font-size="9.5" letter-spacing="1.6" fill="#386B99" font-weight="800">AKAD</text>
                <text y="10" text-anchor="middle" font-size="8.5" fill="#8B6F47">{{ shortTime(invitation.akad_time) }}</text>
              </g>
              <!-- small flower at node -->
              <g transform="translate(14,12)">
                <circle r="4" fill="#F6D9DE" stroke="#E9B9C4" stroke-width="1" />
                <circle cx="0" cy="0" r="1.4" fill="#C98A96" />
              </g>
            </g>

            <!-- RESEPSI NODE -->
            <g v-if="hasResepsi" :transform="`translate(${resepsiPt.x},${resepsiPt.y})`">
              <circle v-if="isResepsiActive && !resepsiDone" r="22" fill="#D4AF37" opacity="0.18">
                <animate attributeName="r" values="16;24;16" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.25;0.08;0.25" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="13" fill="#fff" :stroke="resepsiDone ? '#386B99' : '#D4AF37'" stroke-width="3" filter="url(#haneulSoft)" />
              <circle v-if="!resepsiDone" r="4.5" :fill="isResepsiActive ? '#D4AF37' : '#7DA8CC'" />
              <path v-else d="M-5,0 L-1.5,3.5 L5,-3.5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
              <g :transform="resepsiPt.x > 200 ? `translate(20,-28)` : `translate(-20,-28)`">
                <text y="-1" text-anchor="middle" font-size="9.5" letter-spacing="1.6" fill="#1E354D" font-weight="800">RESEPSI</text>
                <text y="10" text-anchor="middle" font-size="8.5" fill="#8B6F47">{{ shortTime(invitation.resepsi_time) }}</text>
              </g>
              <g transform="translate(-15,12)">
                <circle r="4" fill="#CDE0F2" stroke="#7DA8CC" stroke-width="1" />
                <circle cx="0" cy="0" r="1.4" fill="#386B99" />
              </g>
            </g>

            <!-- END flag -->
            <g :transform="`translate(${endPt.x},${endPt.y})`">
              <text y="30" text-anchor="middle" font-size="10" letter-spacing="2.2" fill="#8B6F47" font-weight="700">TUJUAN ♥</text>
            </g>

            <!-- PIN (scroll-driven) -->
            <g ref="pinRef">
              <g ref="pinInnerRef">
                <ellipse cx="0" cy="8" rx="11" ry="3.6" fill="#1E354D" opacity="0.16" />
                <path
                  d="M0,-36 C-13.5,-36 -21.5,-26.5 -21.5,-14.5 C-21.5,-1.5 0,14 0,14 C0,14 21.5,-1.5 21.5,-14.5 C21.5,-26.5 13.5,-36 0,-36 Z"
                  fill="#1E354D"
                  stroke="#fff"
                  stroke-width="2.6"
                  filter="url(#haneulSoft)"
                />
                <circle cx="0" cy="-15" r="9.5" fill="#fff" />
                <path
                  d="M0,-10.2 C-1.8,-12.6 -6,-13.4 -7.6,-10.6 C-9,-8 -7,-5 0,-1.2 C7,-5 9,-8 7.6,-10.6 C6,-13.4 1.8,-12.6 0,-10.2 Z"
                  fill="#D4AF37"
                />
                <circle cx="-5.5" cy="-19.5" r="1.6" fill="#fff" opacity="0.9" />
              </g>
            </g>
          </svg>

          <!-- AKAD CARD (di tengah stage. Ubah: lebar=width | padding kartu) -->
          <div
            v-if="hasAkad"
            :style="akadCardStyle"
            style="position:absolute; z-index:20; left:50%; top:50%; width:min(84%,300px); margin:0; padding:0; box-sizing:border-box; transition:opacity 0.5s ease-out, transform 0.5s ease-out;"
          >
            <div style="position:relative; margin:0; padding:18px; border-radius:26px; background:rgba(255,255,255,0.92); border:1px solid #FFFFFF; box-shadow:0 18px 50px rgba(44,74,111,0.16); text-align:center; overflow:hidden; box-sizing:border-box;">
              <div style="position:absolute; top:0; left:0; right:0; height:4px; margin:0; padding:0; background:linear-gradient(to right,#7DA8CC,#386B99,#D4AF37);"></div>
              <span style="display:inline-block; margin:0 0 4px; padding:0; font-size:10px; text-transform:uppercase; letter-spacing:0.24em; color:#7DA8CC; font-weight:700;">Pemberhentian 01 · Prosesi Sakral</span>
              <h3 :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }" style="margin:0; padding:0; font-size:20px; line-height:1.25; font-weight:700; color:#1E354D;">Akad Nikah</h3>
              <div style="margin:8px 0 0; padding:0; font-size:13px; font-weight:600; color:#2C4A6F;">{{ formatEventDate(invitation.akad_date) }}</div>
              <div v-if="invitation.akad_time" style="margin:2px 0 0; padding:0; font-size:11px; font-weight:500; color:#5B7B99;">Pukul {{ invitation.akad_time }}</div>
              <div style="width:40px; height:1px; background:#CDE0F2; margin:10px auto; padding:0;"></div>
              <div style="margin:0; padding:0; font-size:13px; font-weight:700; color:#1E354D;">{{ invitation.akad_venue }}</div>
              <p v-if="invitation.akad_address" style="margin:4px 0 0; padding:0; font-size:11px; color:#5B7B99; line-height:1.6; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">{{ invitation.akad_address }}</p>
              <div style="display:flex; flex-direction:column; gap:8px; margin:14px 0 0; padding:0;">
                <a v-if="invitation.akad_map_url" :href="invitation.akad_map_url" target="_blank" style="display:inline-flex; align-items:center; justify-content:center; gap:8px; margin:0; padding:7px 14px; border-radius:9999px; background:#386B99; color:#FFFFFF; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; text-decoration:none;">Buka Maps</a>
                <a v-if="invitation.akad_date" :href="getAkadCalendarUrl()" target="_blank" style="display:inline-flex; align-items:center; justify-content:center; gap:8px; margin:0; padding:7px 14px; border-radius:9999px; background:#FFFFFF; color:#2C4A6F; border:1px solid #CDE0F2; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; text-decoration:none;">Ingatkan Saya</a>
              </div>
            </div>
          </div>

          <!-- RESEPSI CARD (di tengah stage. Ubah sama seperti AKAD CARD) -->
          <div
            v-if="hasResepsi"
            :style="resepsiCardStyle"
            style="position:absolute; z-index:20; left:50%; top:50%; width:min(84%,300px); margin:0; padding:0; box-sizing:border-box; transition:opacity 0.5s ease-out, transform 0.5s ease-out;"
          >
            <div style="position:relative; margin:0; padding:18px; border-radius:26px; background:rgba(30,53,77,0.95); border:1px solid rgba(255,255,255,0.2); box-shadow:0 18px 50px rgba(30,53,77,0.35); text-align:center; overflow:hidden; box-sizing:border-box;">
              <div style="position:absolute; top:0; left:0; right:0; height:4px; margin:0; padding:0; background:linear-gradient(to right,#E2C285,#D4AF37,#7DA8CC);"></div>
              <span style="display:inline-block; margin:0 0 4px; padding:0; font-size:10px; text-transform:uppercase; letter-spacing:0.24em; color:#E2C285; font-weight:700;">Pemberhentian 02 · Perayaan</span>
              <h3 :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }" style="margin:0; padding:0; font-size:20px; line-height:1.25; font-weight:700; color:#FFFFFF;">Resepsi</h3>
              <div style="margin:8px 0 0; padding:0; font-size:13px; font-weight:600; color:#F4EDE0;">{{ formatEventDate(invitation.resepsi_date) }}</div>
              <div v-if="invitation.resepsi_time" style="margin:2px 0 0; padding:0; font-size:11px; font-weight:500; color:#CDE0F2;">Pukul {{ invitation.resepsi_time }}</div>
              <div style="width:40px; height:1px; background:rgba(255,255,255,0.2); margin:10px auto; padding:0;"></div>
              <div style="margin:0; padding:0; font-size:13px; font-weight:700; color:#FFFFFF;">{{ invitation.resepsi_venue }}</div>
              <p v-if="invitation.resepsi_address" style="margin:4px 0 0; padding:0; font-size:11px; color:rgba(205,224,242,0.9); line-height:1.6; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">{{ invitation.resepsi_address }}</p>
              <div style="display:flex; flex-direction:column; gap:8px; margin:14px 0 0; padding:0;">
                <a v-if="invitation.resepsi_map_url" :href="invitation.resepsi_map_url" target="_blank" style="display:inline-flex; align-items:center; justify-content:center; gap:8px; margin:0; padding:7px 14px; border-radius:9999px; background:#D4AF37; color:#1E354D; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; text-decoration:none;">Buka Maps</a>
                <a v-if="invitation.resepsi_date" :href="getResepsiCalendarUrl()" target="_blank" style="display:inline-flex; align-items:center; justify-content:center; gap:8px; margin:0; padding:7px 14px; border-radius:9999px; background:rgba(255,255,255,0.1); color:#FFFFFF; border:1px solid rgba(255,255,255,0.25); font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; text-decoration:none;">Ingatkan Saya</a>
              </div>
            </div>
          </div>
        </div>

        <!-- INDIKATOR BAWAH (di bawah. Ubah: ukuran=font-size | warna=color) -->
        <p style="flex-shrink:0; margin:8px 0 0; padding:0 16px 4px; font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(91,123,153,0.7); font-weight:500; text-align:center;">
          <span v-if="!akadDone && hasAkad">01 — Akad Nikah</span>
          <span v-else-if="hasResepsi && !resepsiDone">02 — Resepsi Pernikahan</span>
          <span v-else>Sampai jumpa di hari bahagia ♥</span>
        </p>
      </div>
    </div>
  </section>

  <!-- Streaming + khutbah (flow normal di bawah section event) -->
  <div
    v-if="(invitation.streaming_enabled && invitation.streaming_url) || invitation.khutbah_nikah"
    style="position:relative; z-index:10; width:100%; max-width:36rem; margin:0 auto; padding:48px 20px; background:#F4EDE0; box-sizing:border-box; display:flex; flex-direction:column; align-items:center;"
  >
    <div
      v-if="invitation.streaming_enabled && invitation.streaming_url"
      style="width:100%; margin:0; padding:24px; border-radius:24px; background:rgba(255,255,255,0.7); border:1px solid rgba(255,255,255,0.8); box-shadow:0 4px 16px rgba(44,74,111,0.1); text-align:center; display:flex; flex-direction:column; align-items:center; box-sizing:border-box;"
    >
      <div style="display:inline-flex; align-items:center; gap:8px; margin:0 0 12px; padding:4px 12px; border-radius:9999px; background:#FEF2F2; color:#DC2626; font-size:12px; font-weight:600; border:1px solid #FECACA;">
        <span class="animate-ping" style="width:8px; height:8px; border-radius:9999px; background:#EF4444; display:inline-block;"></span>
        <span>Live Streaming</span>
      </div>
      <h4 :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }" style="margin:0 0 8px; padding:0; font-size:20px; font-weight:700; letter-spacing:-0.01em; color:#1E354D;">Siaran Langsung Acara</h4>
      <p style="margin:0 0 20px; padding:0; font-size:12px; color:#5B7B99; max-width:28rem; line-height:1.6;">Bagi yang tidak dapat hadir langsung, saksikan momen bahagia kami secara virtual:</p>
      <a :href="invitation.streaming_url" target="_blank" style="display:inline-flex; align-items:center; gap:10px; margin:0; padding:10px 24px; border-radius:9999px; background:#DC2626; color:#FFFFFF; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; text-decoration:none;">Tonton Live Streaming</a>
    </div>
    <div v-if="invitation.khutbah_nikah" style="width:100%; margin:32px 0 0; padding:24px; border-radius:24px; background:rgba(255,255,255,0.6); border:1px solid rgba(255,255,255,0.7); text-align:center; box-sizing:border-box;">
      <span style="display:block; margin:0 0 8px; padding:0; font-size:12px; text-transform:uppercase; letter-spacing:0.2em; color:#386B99; font-weight:700;">Pesan &amp; Nasehat Pernikahan</span>
      <p style="margin:0; padding:0; font-size:12px; color:#2C4A6F; font-style:italic; line-height:1.7; white-space:pre-line;">"{{ invitation.khutbah_nikah }}"</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Invitation } from "@/types/invitation";
import type { ThemeConfig } from "@/types/theme";
import { generateGoogleCalendarUrl } from "@/utils/calendar";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig?: ThemeConfig;
}>();

// Organic river-like route (top -> bottom S curve)
const PATH_D =
  "M200,24 C268,102 348,168 286,258 C224,348 84,356 92,470 C100,584 296,548 310,656 C322,756 188,788 200,896";

const eventsSection = ref<HTMLElement | null>(null);
const journeyWrapper = ref<HTMLElement | null>(null);
const journeyPinRef = ref<HTMLElement | null>(null);
const stageRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const basePathRef = ref<SVGPathElement | null>(null);
const progressPathRef = ref<SVGPathElement | null>(null);
const pinRef = ref<SVGGElement | null>(null);
const pinInnerRef = ref<SVGGElement | null>(null);

const progress = ref(0);
const pathLen = ref(1000);
const akadPt = ref({ x: 150, y: 340 });
const resepsiPt = ref({ x: 250, y: 680 });
const startPt = ref({ x: 200, y: 24 });
const endPt = ref({ x: 200, y: 896 });

const hasAkad = computed(() => !!props.invitation?.akad_venue);
const hasResepsi = computed(() => !!props.invitation?.resepsi_venue);
const hasEvent = computed(() => hasAkad.value || hasResepsi.value);
const hasBoth = computed(() => hasAkad.value && hasResepsi.value);

// stop positions on path (0..1)
const akadT = computed(() => (hasBoth.value ? 0.36 : 0.5));
const resepsiT = computed(() => (hasBoth.value ? 0.78 : 0.5));

const wrapperHeight = computed(() => (hasBoth.value ? "300svh" : "210svh"));

// alokasi scroll: ringan di awal (cepat sampai info), ujung akhir
// ditahan agak lama buat baca kartu (kesan pinning).
// Pin STAY di tiap point selama kartunya tampil: petakan scroll -> journey
// lewat titik-titik kontrol; segmen datar (journey sama) = pin diam.
function buildStops(): Array<[number, number]> {
  if (hasBoth.value) {
    const a = akadT.value;
    const r = resepsiT.value;
    return [
      [0, 0],
      [0.04, 0],
      [0.2, a - 0.02],
      [0.23, a],
      [0.35, a], // stay di point akad (kartu tampil)
      [0.43, a + 0.22], // pergi, kartu akad fade out
      [0.58, r - 0.02],
      [0.61, r],
      [0.75, r], // stay di point resepsi (kartu tampil)
      [0.84, 1],
      [1, 1],
    ];
  }
  const t = 0.5;
  return [
    [0, 0],
    [0.04, 0],
    [0.24, t - 0.02],
    [0.27, t],
    [0.45, t], // stay di point (kartu tampil)
    [0.55, t + 0.22], // pergi, kartu fade out
    [0.72, 1],
    [1, 1],
  ];
}

function journeyAt(p: number): number {
  const stops = buildStops();
  if (p <= stops[0][0]) return stops[0][1];
  for (let i = 1; i < stops.length; i++) {
    if (p <= stops[i][0]) {
      const p0 = stops[i - 1][0];
      const j0 = stops[i - 1][1];
      const p1 = stops[i][0];
      const j1 = stops[i][1];
      if (p1 === p0) return j1;
      const k = (p - p0) / (p1 - p0);
      return j0 + (j1 - j0) * k;
    }
  }
  return stops[stops.length - 1][1];
}
// card windows — info muncul bersamaan dengan animasi
const showAkadCard = computed(() => {
  if (!hasAkad.value) return false;
  // kartu akad DITAHAN agak lama sebelum fade out (kesan pinning)
  return progress.value >= akadT.value - 0.02 && progress.value <= akadT.value + 0.22;
});
const showResepsiCard = computed(() => {
  if (!hasResepsi.value) return false;
  return progress.value >= resepsiT.value - 0.02;
});

// posisi kartu: selalu di TENGAH stage (horizontal + vertikal),
// tanpa buntut bubble — tanpa anchor ke point
function centerCardStyle(show: boolean): Record<string, string | number> {
  return {
    opacity: show ? 1 : 0,
    transform: show
      ? "translate(-50%, -50%) scale(1)"
      : "translate(-50%, -50%) scale(0.9)",
    transformOrigin: "50% 50%",
    pointerEvents: show ? "auto" : "none",
  };
}

const akadCardStyle = computed(() => centerCardStyle(showAkadCard.value));
const resepsiCardStyle = computed(() => centerCardStyle(showResepsiCard.value));
const akadDone = computed(() => hasAkad.value && progress.value > akadT.value + 0.22);
const resepsiDone = computed(() => hasResepsi.value && progress.value > 0.965);
const isAkadActive = computed(() => hasAkad.value && progress.value >= akadT.value - 0.03);
const isResepsiActive = computed(() => hasResepsi.value && progress.value >= resepsiT.value - 0.03);

const shortTime = (t?: string) => {
  if (!t) return "";
  return t.slice(0, 5);
};

const formatEventDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
};

const getAkadCalendarUrl = () => {
  if (!props.invitation?.akad_date) return "";
  return generateGoogleCalendarUrl({
    title: `Akad Nikah ${props.invitation.groom_name} & ${props.invitation.bride_name}`,
    date: props.invitation.akad_date,
    time: props.invitation.akad_time,
    venue: props.invitation.akad_venue,
    address: props.invitation.akad_address,
  });
};
const getResepsiCalendarUrl = () => {
  if (!props.invitation?.resepsi_date) return "";
  return generateGoogleCalendarUrl({
    title: `Resepsi Pernikahan ${props.invitation.groom_name} & ${props.invitation.bride_name}`,
    date: props.invitation.resepsi_date,
    time: props.invitation.resepsi_time,
    venue: props.invitation.resepsi_venue,
    address: props.invitation.resepsi_address,
  });
};

let scrubTween: gsap.core.Tween | null = null;
let bounceTween: gsap.core.Tween | null = null;

function updateJourney() {
  const L = pathLen.value;
  const p = Math.min(1, Math.max(0, progress.value));
  if (progressPathRef.value) {
    progressPathRef.value.style.strokeDasharray = `${L}`;
    progressPathRef.value.style.strokeDashoffset = `${L * (1 - p)}`;
  }
  if (basePathRef.value && pinRef.value) {
    try {
      const pt = basePathRef.value.getPointAtLength(L * p);
      pinRef.value.setAttribute("transform", `translate(${pt.x},${pt.y})`);
    } catch { /* noop */ }
  }
}

onMounted(async () => {
  await nextTick();
  if (!hasEvent.value) return;

  if (headerRef.value) {
    gsap.fromTo(
      headerRef.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: journeyWrapper.value, start: "top 80%" } }
    );
  }

  if (!basePathRef.value || !journeyWrapper.value) return;
  const L = basePathRef.value.getTotalLength();
  pathLen.value = L;
  try {
    startPt.value = basePathRef.value.getPointAtLength(0) as { x: number; y: number };
    endPt.value = basePathRef.value.getPointAtLength(L) as { x: number; y: number };
    if (hasAkad.value) akadPt.value = basePathRef.value.getPointAtLength(L * akadT.value) as { x: number; y: number };
    if (hasResepsi.value) resepsiPt.value = basePathRef.value.getPointAtLength(L * resepsiT.value) as { x: number; y: number };
  } catch { /* keep defaults */ }

  updateJourney();

  // pin idle bounce (inner only, so scrub transform on outer stays intact)
  if (pinInnerRef.value) {
    bounceTween = gsap.to(pinInnerRef.value, { y: -6, duration: 0.8, yoyo: true, repeat: -1, ease: "sine.inOut" });
  }

  // scroll-based travel + pin sampai info resepsi selesai dibaca
  const proxy = { p: 0 };
  const applyScroll = () => {
    // scroll -> journey lewat titik kontrol (ada jeda stay di tiap point)
    progress.value = journeyAt(proxy.p);
    updateJourney();
  };
  scrubTween = gsap.to(proxy, {
    p: 1,
    ease: "none",
    scrollTrigger: {
      trigger: journeyWrapper.value,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.1,
      pin: journeyPinRef.value,
      anticipatePin: 1,
      pinSpacing: true,
      invalidateOnRefresh: true,
      onUpdate: applyScroll,
      onRefresh: applyScroll,
    },
  });

  ScrollTrigger.refresh();
});

onUnmounted(() => {
  scrubTween?.scrollTrigger?.kill();
  scrubTween?.kill();
  bounceTween?.kill();
  ScrollTrigger.getAll().forEach((st) => {
    if (st.trigger === journeyWrapper.value || st.trigger === headerRef.value) st.kill();
  });
});
</script>
