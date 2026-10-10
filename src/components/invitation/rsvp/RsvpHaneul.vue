<template>
  <section
    ref="rsvpSection"
    :style="{
      position: 'relative',
      minHeight: '100dvh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '64px 16px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      background: '#F4EDE0',
      fontFamily: themeConfig?.fontBody || `'Plus Jakarta Sans', sans-serif`,
    }"
  >
    <!-- Background Decor (Soft ambient warmth) -->
    <div style="position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:0;">
      <div style="position:absolute;top:20%;right:-80px;width:340px;height:340px;background:rgba(149,169,135,0.18);border-radius:9999px;filter:blur(60px);"></div>
      <div style="position:absolute;bottom:20%;left:-80px;width:340px;height:340px;background:rgba(215,200,180,0.25);border-radius:9999px;filter:blur(60px);"></div>
      <div style="position:absolute;top:40px;left:40px;color:#8F7348;font-size:16px;opacity:0.35;">✦</div>
      <div style="position:absolute;bottom:40px;right:40px;color:#8F7348;font-size:18px;opacity:0.35;">✧</div>
    </div>

    <div style="position:relative;z-index:10;width:100%;max-width:520px;margin:0 auto;display:flex;flex-direction:column;align-items:center;">
      
      <!-- ============================================================
           CONTAINER 1: FORM KONFIRMASI KEHADIRAN (Scalloped Arch Green)
           ============================================================ -->
      <div
        ref="formCardRef"
        class="rsvp-scallop-card"
        style="position:relative;width:100%;box-sizing:border-box;margin-bottom:32px;"
      >
        <!-- Background Scalloped Arch SVG -->
        <svg
          class="scallop-card-svg"
          :viewBox="`0 0 ${formW} ${formH}`"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path :d="formPath" fill="#95a987" />
        </svg>

        <!-- Card Content Container -->
        <div style="position:relative;z-index:2;padding:clamp(44px, 9vw, 64px) clamp(22px, 6vw, 36px) clamp(34px, 7vw, 44px);box-sizing:border-box;width:100%;">
          
          <!-- Arch Header -->
          <div ref="headerRef" style="text-align:center;margin-bottom:26px;">
            <div style="display:inline-flex;align-items:center;gap:8px;padding:3px 14px;border-radius:9999px;background:rgba(255,255,255,0.22);border:1px solid rgba(255,255,255,0.35);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);margin-bottom:12px;">
              <span style="color:#FAF6EE;font-size:11px;">✦</span>
              <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.25em;color:#FAF6EE;font-weight:700;">
                Guest Book &amp; RSVP
              </span>
              <span style="color:#FAF6EE;font-size:11px;">✦</span>
            </div>

            <h2
              :style="{
                fontFamily: themeConfig?.fontHeading || `'Caveat', cursive`,
                fontSize: 'clamp(32px, 7.5vw, 44px)',
                color: '#FFFDF8',
                fontWeight: 600,
                letterSpacing: '-0.015em',
                lineHeight: 1.15,
                margin: 0,
                textShadow: '0 1px 3px rgba(35,55,30,0.18)',
              }"
            >
              Konfirmasi Kehadiran
            </h2>

            <div style="width:48px;height:2px;background:rgba(255,255,255,0.45);margin:12px auto;border-radius:2px;"></div>

            <p style="font-size:13px;color:#FAF5EC;line-height:1.65;margin:0;max-width:380px;margin-left:auto;margin-right:auto;opacity:0.95;">
              Mohon konfirmasi kehadiran dan sampaikan doa restu terbaik Anda untuk kedua mempelai
            </p>
          </div>

          <!-- Form Fields -->
          <form @submit.prevent="submitForm" style="display:flex;flex-direction:column;gap:16px;">
            <!-- Nama Lengkap -->
            <div>
              <label style="display:block;font-size:11px;font-weight:700;color:#FFFDF8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">
                Nama Lengkap
              </label>
              <input
                v-model="form.guest_name"
                type="text"
                required
                placeholder="Contoh: Bpk. Bambang & Keluarga"
                class="haneul-form-input"
              />
            </div>

            <!-- Konfirmasi Kehadiran Toggle -->
            <div>
              <label style="display:block;font-size:11px;font-weight:700;color:#FFFDF8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">
                Konfirmasi Kehadiran
              </label>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                <button
                  type="button"
                  @click="form.attendance = 'hadir'"
                  :style="{
                    padding: '12px 14px',
                    borderRadius: '16px',
                    border: form.attendance === 'hadir' ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.6)',
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    background: form.attendance === 'hadir' ? '#294323' : '#FAF6EE',
                    color: form.attendance === 'hadir' ? '#FFFDF8' : '#334B2E',
                    boxShadow: form.attendance === 'hadir' ? '0 4px 12px rgba(20,38,18,0.25)' : 'none',
                    transition: 'all 0.2s ease',
                  }"
                >
                  <svg style="width:16px;height:16px;flex-shrink:0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ya, Hadir</span>
                </button>

                <button
                  type="button"
                  @click="form.attendance = 'tidak_hadir'"
                  :style="{
                    padding: '12px 14px',
                    borderRadius: '16px',
                    border: form.attendance === 'tidak_hadir' ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.6)',
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    background: form.attendance === 'tidak_hadir' ? '#51654C' : '#FAF6EE',
                    color: form.attendance === 'tidak_hadir' ? '#FFFDF8' : '#334B2E',
                    boxShadow: form.attendance === 'tidak_hadir' ? '0 4px 12px rgba(20,38,18,0.2)' : 'none',
                    transition: 'all 0.2s ease',
                  }"
                >
                  <svg style="width:16px;height:16px;flex-shrink:0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Tidak Hadir</span>
                </button>
              </div>
            </div>

            <!-- Jumlah Tamu (Conditional) -->
            <div v-if="form.attendance === 'hadir'">
              <label style="display:block;font-size:11px;font-weight:700;color:#FFFDF8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">
                Jumlah Tamu
              </label>
              <select
                v-model.number="form.guest_count"
                class="haneul-form-input"
                style="cursor:pointer;"
              >
                <option :value="1">1 Orang</option>
                <option :value="2">2 Orang</option>
                <option :value="3">3 Orang</option>
                <option :value="4">4 Orang</option>
                <option :value="5">5 Orang</option>
              </select>
            </div>

            <!-- Ucapan & Doa Restu Textarea -->
            <div>
              <label style="display:block;font-size:11px;font-weight:700;color:#FFFDF8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">
                Ucapan &amp; Doa Restu
              </label>
              <textarea
                v-model="form.message"
                rows="3"
                placeholder="Tuliskan ucapan dan doa terbaik Anda di sini..."
                class="haneul-form-input"
                style="resize:none;"
              ></textarea>
            </div>

            <!-- Submit Button (Pill style matching reference) -->
            <button
              type="submit"
              :disabled="submitting"
              class="haneul-btn-submit"
            >
              {{ submitting ? 'Mengirim Konfirmasi...' : 'Kirim Konfirmasi & Ucapan' }}
            </button>
          </form>
        </div>
      </div>

      <!-- ============================================================
           CONTAINER 2: UCAPAN & DOA RESTU (Scalloped Arch Green)
           ============================================================ -->
      <div
        v-if="rsvpMessages && rsvpMessages.length > 0"
        ref="wishesRef"
        class="rsvp-scallop-card"
        style="position:relative;width:100%;box-sizing:border-box;"
      >
        <!-- Background Scalloped Arch SVG -->
        <svg
          class="scallop-card-svg"
          :viewBox="`0 0 ${wishesW} ${wishesH}`"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path :d="wishesPath" fill="#95a987" />
        </svg>

        <!-- Card Content Container (Setengah kapsul bawah: padding bawah dibuat luas dan lapang agar konten tidak terjepit oleh lengkungan kubah) -->
        <div style="position:relative;z-index:2;padding:clamp(34px, 6vw, 44px) clamp(22px, 5vw, 34px) clamp(130px, 28vw, 190px);box-sizing:border-box;width:100%;">
          
          <!-- Wishes Header -->
          <div style="text-align:center;margin-bottom:22px;">
            <div style="display:inline-flex;align-items:center;gap:8px;padding:3px 14px;border-radius:9999px;background:rgba(255,255,255,0.22);border:1px solid rgba(255,255,255,0.35);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);margin-bottom:10px;">
              <span style="color:#FAF6EE;font-size:11px;">✦</span>
              <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.25em;color:#FAF6EE;font-weight:700;">
                Doa &amp; Restu Tamu
              </span>
              <span style="color:#FAF6EE;font-size:11px;">✦</span>
            </div>

            <h3
              :style="{
                fontFamily: themeConfig?.fontHeading || `'Caveat', cursive`,
                fontSize: 'clamp(28px, 6.5vw, 38px)',
                fontWeight: 600,
                letterSpacing: '-0.015em',
                color: '#FFFDF8',
                margin: 0,
                lineHeight: 1.15,
                textShadow: '0 1px 3px rgba(35,55,30,0.18)',
              }"
            >
              Ucapan &amp; Doa Restu ({{ rsvpMessages.length }})
            </h3>

            <div style="width:48px;height:2px;background:rgba(255,255,255,0.45);margin:12px auto 0;border-radius:2px;"></div>
          </div>

          <!-- Scrollable Wishes List -->
          <div
            class="custom-scroll"
            style="width:100%;display:flex;flex-direction:column;gap:12px;max-height:380px;overflow-y:auto;padding-right:4px;box-sizing:border-box;"
          >
            <div
              v-for="(rsvp, idx) in rsvpMessages"
              :key="idx"
              style="padding:14px 16px;border-radius:18px;background:#FAF6EE;border:1px solid rgba(255,255,255,0.9);box-shadow:0 2px 8px rgba(35,55,30,0.06);display:flex;flex-direction:column;gap:6px;"
            >
              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
                <div style="display:flex;align-items:center;gap:10px;min-width:0;">
                  <div style="width:32px;height:32px;border-radius:9999px;background:#294323;color:#FFFDF8;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    {{ getInitials(rsvp.guest_name) }}
                  </div>
                  <div style="min-width:0;">
                    <h4 style="font-size:13px;font-weight:700;color:#1F331D;line-height:1.2;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                      {{ rsvp.guest_name }}
                    </h4>
                    <span style="font-size:10px;color:#6C8368;">
                      {{ formatDate(rsvp.created_at) }}
                    </span>
                  </div>
                </div>

                <span
                  :style="{
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    border: '1px solid ' + (rsvp.attendance === 'hadir' ? '#A3D29B' : '#E2D1C5'),
                    background: rsvp.attendance === 'hadir' ? '#EBF7E7' : '#F7EFE9',
                    color: rsvp.attendance === 'hadir' ? '#1E5218' : '#6F4E3D',
                  }"
                >
                  {{ rsvp.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir' }}
                </span>
              </div>

              <p v-if="rsvp.message" style="font-size:12px;color:#2D422B;margin:4px 0 0 42px;line-height:1.6;white-space:pre-line;">
                "{{ rsvp.message }}"
              </p>
            </div>
          </div>

          <!-- Bottom subtle ornament inside the spacious arch curve -->
          <div style="display:flex;justify-content:center;align-items:center;gap:8px;margin-top:20px;color:rgba(255,255,255,0.45);font-size:11px;user-select:none;">
            <span>✦</span>
            <span style="font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:rgba(255,255,255,0.7);font-weight:600;">Doa Restu</span>
            <span>✦</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Rsvp } from "@/types/invitation";
import type { ThemeConfig } from "@/types/theme";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  rsvpMessages?: Rsvp[];
  themeConfig?: ThemeConfig;
  submitting?: boolean;
}>();

const emit = defineEmits<{
  (
    e: "submit-rsvp",
    form: {
      guest_name: string;
      attendance: "hadir" | "tidak_hadir";
      guest_count: number;
      message: string;
    }
  ): void;
}>();

const rsvpSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const formCardRef = ref<HTMLElement | null>(null);
const wishesRef = ref<HTMLElement | null>(null);

const form = reactive({
  guest_name: "",
  attendance: "hadir" as "hadir" | "tidak_hadir",
  guest_count: 1,
  message: "",
});

const submitForm = () => {
  if (!form.guest_name) return;
  emit("submit-rsvp", { ...form });
  form.message = "";
};

const getInitials = (name?: string) => {
  if (!name) return "✦";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0];
  const second = parts[1];
  if (first && second) {
    return (first.charAt(0) + second.charAt(0)).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};

// ============================================================
// SCALLOPED ARCH GENERATOR (Kubah Renda Bergelombang)
// Sesuai bentuk pada referensi gambar:
// - Bagian atas berupa kubah lengkung (arch)
// - Sisi kiri, kanan, bawah lurus
// - Seluruh tepian memiliki gerigi gelombang (scallops) cembung
// ============================================================
const formW = ref(460);
const formH = ref(620);
const wishesW = ref(460);
const wishesH = ref(480);

function generateScallopArchPath(W: number, H: number): string {
  if (W <= 0 || H <= 0) return "";

  const amp = 8; // tinggi tonjolan gelombang (keluar)
  const targetStep = 32; // jarak ideal antar lekukan gelombang

  // Titik dasar sebelum ditambah cembung gelombang
  const leftX = amp;
  const rightX = W - amp;
  const bottomY = H - amp;

  // Kubah atas dengan radius R dan pusat di (Xc, Yspring)
  const maxR = (W - 2 * amp) / 2;
  const R = Math.max(40, Math.min(maxR, (H - 2 * amp) * 0.44));
  const Xc = W / 2;
  const Yspring = amp + R;

  let d = `M ${leftX.toFixed(1)} ${bottomY.toFixed(1)} `;

  // 1. SISI KIRI (dari bawah naik ke arch spring)
  const leftHeight = bottomY - Yspring;
  const nLeft = Math.max(2, Math.round(leftHeight / targetStep));
  const stepLeft = leftHeight / nLeft;

  for (let i = 0; i < nLeft; i++) {
    const y0 = bottomY - i * stepLeft;
    const y1 = bottomY - (i + 1) * stepLeft;
    const len = y0 - y1;
    const cp1x = leftX - amp * 1.35;
    const cp1y = y0 - len * 0.25;
    const cp2x = leftX - amp * 1.35;
    const cp2y = y1 + len * 0.25;
    d += `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${leftX.toFixed(1)} ${y1.toFixed(1)} `;
  }

  // 2. KUBAH ATAS (melengkung searah jarum jam dari kiri ke kanan)
  const arcLength = Math.PI * R;
  const nArch = Math.max(4, Math.round(arcLength / targetStep));

  for (let i = 0; i < nArch; i++) {
    const theta0 = Math.PI - (i * Math.PI) / nArch;
    const theta1 = Math.PI - ((i + 1) * Math.PI) / nArch;
    const p0x = Xc + R * Math.cos(theta0);
    const p0y = Yspring - R * Math.sin(theta0);
    const p1x = Xc + R * Math.cos(theta1);
    const p1y = Yspring - R * Math.sin(theta1);

    const dx = p1x - p0x;
    const dy = p1y - p0y;
    const chordLen = Math.hypot(dx, dy);
    const ux = dx / chordLen;
    const uy = dy / chordLen;

    const thetaMid = (theta0 + theta1) / 2;
    const nx = Math.cos(thetaMid);
    const ny = -Math.sin(thetaMid);

    const cp1x = p0x + ux * chordLen * 0.25 + nx * amp * 1.35;
    const cp1y = p0y + uy * chordLen * 0.25 + ny * amp * 1.35;
    const cp2x = p1x - ux * chordLen * 0.25 + nx * amp * 1.35;
    const cp2y = p1y - uy * chordLen * 0.25 + ny * amp * 1.35;

    d += `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p1x.toFixed(1)} ${p1y.toFixed(1)} `;
  }

  // 3. SISI KANAN (dari arch spring turun ke bawah)
  const rightHeight = bottomY - Yspring;
  const nRight = Math.max(2, Math.round(rightHeight / targetStep));
  const stepRight = rightHeight / nRight;

  for (let i = 0; i < nRight; i++) {
    const y0 = Yspring + i * stepRight;
    const y1 = Yspring + (i + 1) * stepRight;
    const len = y1 - y0;
    const cp1x = rightX + amp * 1.35;
    const cp1y = y0 + len * 0.25;
    const cp2x = rightX + amp * 1.35;
    const cp2y = y1 - len * 0.25;
    d += `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${rightX.toFixed(1)} ${y1.toFixed(1)} `;
  }

  // 4. SISI BAWAH (horizontal dari kanan ke kiri)
  const bottomWidth = rightX - leftX;
  const nBottom = Math.max(2, Math.round(bottomWidth / targetStep));
  const stepBottom = bottomWidth / nBottom;

  for (let i = 0; i < nBottom; i++) {
    const x0 = rightX - i * stepBottom;
    const x1 = rightX - (i + 1) * stepBottom;
    const len = x0 - x1;
    const cp1x = x0 - len * 0.25;
    const cp1y = bottomY + amp * 1.35;
    const cp2x = x1 + len * 0.25;
    const cp2y = bottomY + amp * 1.35;
    d += `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${x1.toFixed(1)} ${bottomY.toFixed(1)} `;
  }

  d += "Z";
  return d;
}

// Setengah kapsul bagian bawah (kubah lengkung menghadap ke bawah)
function generateScallopInvertedArchPath(W: number, H: number): string {
  if (W <= 0 || H <= 0) return "";

  const amp = 8; // tinggi tonjolan gelombang (keluar)
  const targetStep = 32;

  const leftX = amp;
  const rightX = W - amp;
  const topY = amp;

  // Kubah bawah dengan radius R dan pusat di (Xc, Yspring)
  const maxR = (W - 2 * amp) / 2;
  const R = Math.max(40, Math.min(maxR, (H - 2 * amp) * 0.44));
  const Xc = W / 2;
  const Yspring = H - amp - R;

  let d = `M ${leftX.toFixed(1)} ${topY.toFixed(1)} `;

  // 1. SISI ATAS (horizontal lurus dari kiri ke kanan)
  const topWidth = rightX - leftX;
  const nTop = Math.max(2, Math.round(topWidth / targetStep));
  const stepTop = topWidth / nTop;

  for (let i = 0; i < nTop; i++) {
    const x0 = leftX + i * stepTop;
    const x1 = leftX + (i + 1) * stepTop;
    const len = x1 - x0;
    const cp1x = x0 + len * 0.25;
    const cp1y = topY - amp * 1.35;
    const cp2x = x1 - len * 0.25;
    const cp2y = topY - amp * 1.35;
    d += `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${x1.toFixed(1)} ${topY.toFixed(1)} `;
  }

  // 2. SISI KANAN (vertikal lurus dari atas turun ke Yspring)
  const rightHeight = Yspring - topY;
  const nRight = Math.max(2, Math.round(rightHeight / targetStep));
  const stepRight = rightHeight / nRight;

  for (let i = 0; i < nRight; i++) {
    const y0 = topY + i * stepRight;
    const y1 = topY + (i + 1) * stepRight;
    const len = y1 - y0;
    const cp1x = rightX + amp * 1.35;
    const cp1y = y0 + len * 0.25;
    const cp2x = rightX + amp * 1.35;
    const cp2y = y1 - len * 0.25;
    d += `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${rightX.toFixed(1)} ${y1.toFixed(1)} `;
  }

  // 3. KUBAH BAWAH (melengkung ke bawah dari kanan ke kiri)
  // Sudut theta: dari 0 rad (kanan) ke PI rad (kiri).
  // x = Xc + R * cos(theta), y = Yspring + R * sin(theta)
  const arcLength = Math.PI * R;
  const nArch = Math.max(4, Math.round(arcLength / targetStep));

  for (let i = 0; i < nArch; i++) {
    const theta0 = (i * Math.PI) / nArch;
    const theta1 = ((i + 1) * Math.PI) / nArch;
    const p0x = Xc + R * Math.cos(theta0);
    const p0y = Yspring + R * Math.sin(theta0);
    const p1x = Xc + R * Math.cos(theta1);
    const p1y = Yspring + R * Math.sin(theta1);

    const dx = p1x - p0x;
    const dy = p1y - p0y;
    const chordLen = Math.hypot(dx, dy);
    const ux = dx / chordLen;
    const uy = dy / chordLen;

    const thetaMid = (theta0 + theta1) / 2;
    // Normal radial mengarah keluar (ke bawah dan ke samping)
    const nx = Math.cos(thetaMid);
    const ny = Math.sin(thetaMid);

    const cp1x = p0x + ux * chordLen * 0.25 + nx * amp * 1.35;
    const cp1y = p0y + uy * chordLen * 0.25 + ny * amp * 1.35;
    const cp2x = p1x - ux * chordLen * 0.25 + nx * amp * 1.35;
    const cp2y = p1y - uy * chordLen * 0.25 + ny * amp * 1.35;

    d += `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p1x.toFixed(1)} ${p1y.toFixed(1)} `;
  }

  // 4. SISI KIRI (vertikal lurus dari Yspring naik kembali ke topY)
  const leftHeight = Yspring - topY;
  const nLeft = Math.max(2, Math.round(leftHeight / targetStep));
  const stepLeft = leftHeight / nLeft;

  for (let i = 0; i < nLeft; i++) {
    const y0 = Yspring - i * stepLeft;
    const y1 = Yspring - (i + 1) * stepLeft;
    const len = y0 - y1;
    const cp1x = leftX - amp * 1.35;
    const cp1y = y0 - len * 0.25;
    const cp2x = leftX - amp * 1.35;
    const cp2y = y1 + len * 0.25;
    d += `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${leftX.toFixed(1)} ${y1.toFixed(1)} `;
  }

  d += "Z";
  return d;
}

const formPath = computed(() => generateScallopArchPath(formW.value, formH.value));
const wishesPath = computed(() => generateScallopInvertedArchPath(wishesW.value, wishesH.value));

const updateDimensions = () => {
  if (formCardRef.value) {
    const w = formCardRef.value.offsetWidth || formCardRef.value.clientWidth;
    const h = formCardRef.value.offsetHeight || formCardRef.value.clientHeight;
    if (w > 0) formW.value = Math.round(w);
    if (h > 0) formH.value = Math.round(h);
  }
  if (wishesRef.value) {
    const w = wishesRef.value.offsetWidth || wishesRef.value.clientWidth;
    const h = wishesRef.value.offsetHeight || wishesRef.value.clientHeight;
    if (w > 0) wishesW.value = Math.round(w);
    if (h > 0) wishesH.value = Math.round(h);
  }
};

watch(() => form.attendance, () => {
  nextTick(() => updateDimensions());
});

watch(() => props.rsvpMessages?.length, () => {
  nextTick(() => {
    updateDimensions();
    if (wishesRef.value && ro) {
      ro.observe(wishesRef.value);
    }
  });
});

let ro: ResizeObserver | null = null;

onMounted(() => {
  if (!rsvpSection.value) return;

  updateDimensions();
  nextTick(() => updateDimensions());

  ro = new ResizeObserver(() => {
    updateDimensions();
  });

  if (formCardRef.value) ro.observe(formCardRef.value);
  if (wishesRef.value) ro.observe(wishesRef.value);

  // GSAP Entrance Animations
  if (formCardRef.value) {
    gsap.fromTo(
      formCardRef.value,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formCardRef.value,
          start: "top 85%",
        },
      }
    );
  }

  if (wishesRef.value) {
    gsap.fromTo(
      wishesRef.value,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wishesRef.value,
          start: "top 85%",
        },
      }
    );
  }
});

onUnmounted(() => {
  ro?.disconnect();
});
</script>

<style scoped>
.rsvp-scallop-card {
  filter: drop-shadow(0 14px 30px rgba(50, 75, 45, 0.16));
}

.scallop-card-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: visible;
  animation: haneul-card-in 1.4s ease both;
}

@keyframes haneul-card-in {
  from { opacity: 0; transform: scale(0.985); }
  to { opacity: 1; transform: scale(1); }
}

.haneul-form-input {
  width: 100%;
  padding: 13px 16px;
  border-radius: 16px;
  background: #FAF6EE;
  border: 1px solid rgba(255, 255, 255, 0.85);
  color: #1F331D;
  font-size: 13px;
  outline: none;
  box-sizing: border-box;
  font-family: inherit;
  box-shadow: 0 2px 6px rgba(25, 45, 20, 0.05);
  transition: all 0.2s ease;
}

.haneul-form-input::placeholder {
  color: #7D9479;
}

.haneul-form-input:focus {
  border-color: #294323;
  box-shadow: 0 0 0 3px rgba(41, 67, 35, 0.2);
  background: #FFFFFF;
}

.haneul-btn-submit {
  width: 100%;
  margin-top: 8px;
  padding: 15px 28px;
  border-radius: 9999px;
  background: #294323;
  color: #FFFDF8;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 6px 18px rgba(22, 42, 18, 0.3);
  cursor: pointer;
  transition: all 0.25s ease;
}

.haneul-btn-submit:hover:not(:disabled) {
  background: #1D3219;
  transform: translateY(-1px);
  box-shadow: 0 8px 22px rgba(22, 42, 18, 0.38);
}

.haneul-btn-submit:active:not(:disabled) {
  transform: translateY(0);
}

.haneul-btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.custom-scroll::-webkit-scrollbar {
  width: 5px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.55);
  border-radius: 9999px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.85);
}
</style>
