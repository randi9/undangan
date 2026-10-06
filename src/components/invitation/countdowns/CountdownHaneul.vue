<template>
  <section
    ref="countdownSection"
    class="relative w-full flex flex-col items-center justify-center overflow-hidden box-border"
    :style="{
      background: '#F4EDE0',
      fontFamily: themeConfig?.fontBody || `'Plus Jakarta Sans', sans-serif`,
      minHeight: '100dvh',
      margin: '0',
      padding: 'clamp(48px, 10vw, 80px) clamp(16px, 5vw, 32px)',
    }"
  >
    <!-- Tanpa background ambient / shadow tengah -->

    <div class="relative z-10 w-full mx-auto flex flex-col items-center text-center" style="max-width: 36rem; margin: 0 auto; padding: 0;">
      <!-- Mini Calendar — tabel garis kotak-kotak, tanpa fill putih -->
      <div
        v-if="hasCalendar"
        ref="calendarRef"
        style="width: min(88vw, 360px); margin: 0 auto clamp(22px, 5vw, 32px) auto; padding: 0; background: transparent;"
      >
        <!-- Month title -->
        <p style="font-size: clamp(10px, 2.8vw, 11px); text-transform: uppercase; letter-spacing: 0.28em; text-indent: 0.28em; color: #486B5C; font-weight: 700; margin: 0 0 4px 0; padding: 0;">
          Kalender Acara
        </p>
        <p
          :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }"
          style="font-size: clamp(1.4rem, 6vw, 1.8rem); color: #1E354D; font-weight: 700; line-height: 1.2; margin: 0; padding: 0; text-transform: capitalize;"
        >
          {{ monthLabel }}
        </p>
        <div style="margin: 12px auto 14px auto; padding: 0;">
          <span style="font-size: 10px; color: #D4AF37;">✦</span>
        </div>

        <!-- Tanggal saja, tanpa garis & tanpa header hari -->
        <table style="width: 100%; border-collapse: collapse; margin: 0; padding: 0; border: none; background: transparent;">
          <tbody>
            <tr v-for="(week, wi) in weeks" :key="wi">
              <td
                v-for="(day, di) in week"
                :key="`${wi}-${di}`"
                style="margin: 0; padding: 3px; text-align: center; vertical-align: middle; border: none;"
              >
                <span v-if="day !== null" :style="dayCellStyle(day)">{{ day }}</span>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Legend -->
        <div v-if="legendItems.length > 0" style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 6px 16px; margin: 14px 0 0 0; padding: 12px 4px 0 4px;">
          <span
            v-for="item in legendItems"
            :key="item.label"
            style="display: inline-flex; align-items: center; gap: 7px; margin: 0; padding: 0; font-size: clamp(10px, 2.8vw, 11px); color: #486B5C; font-weight: 600;"
          >
            <span :style="{ background: item.color, display: 'inline-block', width: '10px', height: '10px', borderRadius: '9999px', margin: '0', padding: '0', boxShadow: '0 0 0 2px #F4EDE0, 0 0 0 3px rgba(149,169,135,0.7)' }"></span>
            {{ item.label }} · {{ item.date }}
          </span>
        </div>
      </div>

      <!-- Countdown (Hari/Jam/Menit/Detik) — HIDE sementara, lagi dipikirin penempatannya -->
      <!-- TODO: tampilkan lagi setelah posisi final diputuskan -->
      <div
        v-if="false && hasDate"
        ref="gridRef"
        class="w-full grid grid-cols-4"
        style="gap: 0; max-width: 24rem; margin: 0 auto clamp(20px, 5vw, 28px) auto; padding: 0; border: none; background: transparent;"
      >
        <!-- Days -->
        <div class="haneul-countdown-box flex flex-col items-center justify-center" style="margin: 0; padding: clamp(8px, 2.5vw, 14px) clamp(4px, 1.5vw, 8px); background: transparent;">
          <span
            :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }"
            style="font-size: clamp(1.15rem, 5.5vw, 1.9rem); font-weight: 700; color: #1E354D; letter-spacing: -0.02em; line-height: 1; font-variant-numeric: tabular-nums; margin: 0 0 4px 0; padding: 0;"
          >
            {{ pad(countdown.days) }}
          </span>
          <span style="font-size: clamp(8px, 2.2vw, 10px); text-transform: uppercase; letter-spacing: 0.14em; color: #486B5C; font-weight: 600; margin: 0; padding: 0;">
            Hari
          </span>
        </div>

        <!-- Hours -->
        <div class="haneul-countdown-box flex flex-col items-center justify-center" style="margin: 0; padding: clamp(8px, 2.5vw, 14px) clamp(4px, 1.5vw, 8px); background: transparent;">
          <span
            :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }"
            style="font-size: clamp(1.15rem, 5.5vw, 1.9rem); font-weight: 700; color: #1E354D; letter-spacing: -0.02em; line-height: 1; font-variant-numeric: tabular-nums; margin: 0 0 4px 0; padding: 0;"
          >
            {{ pad(countdown.hours) }}
          </span>
          <span style="font-size: clamp(8px, 2.2vw, 10px); text-transform: uppercase; letter-spacing: 0.14em; color: #486B5C; font-weight: 600; margin: 0; padding: 0;">
            Jam
          </span>
        </div>

        <!-- Minutes -->
        <div class="haneul-countdown-box flex flex-col items-center justify-center" style="margin: 0; padding: clamp(8px, 2.5vw, 14px) clamp(4px, 1.5vw, 8px); background: transparent;">
          <span
            :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }"
            style="font-size: clamp(1.15rem, 5.5vw, 1.9rem); font-weight: 700; color: #1E354D; letter-spacing: -0.02em; line-height: 1; font-variant-numeric: tabular-nums; margin: 0 0 4px 0; padding: 0;"
          >
            {{ pad(countdown.minutes) }}
          </span>
          <span style="font-size: clamp(8px, 2.2vw, 10px); text-transform: uppercase; letter-spacing: 0.14em; color: #486B5C; font-weight: 600; margin: 0; padding: 0;">
            Menit
          </span>
        </div>

        <!-- Seconds -->
        <div class="haneul-countdown-box flex flex-col items-center justify-center" style="margin: 0; padding: clamp(8px, 2.5vw, 14px) clamp(4px, 1.5vw, 8px); background: transparent;">
          <span
            :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }"
            style="font-size: clamp(1.15rem, 5.5vw, 1.9rem); font-weight: 700; color: #486B5C; letter-spacing: -0.02em; line-height: 1; font-variant-numeric: tabular-nums; margin: 0 0 4px 0; padding: 0;"
          >
            {{ pad(countdown.seconds) }}
          </span>
          <span style="font-size: clamp(8px, 2.2vw, 10px); text-transform: uppercase; letter-spacing: 0.14em; color: #486B5C; font-weight: 600; margin: 0; padding: 0;">
            Detik
          </span>
        </div>
      </div>

      <!-- Add to Calendar Button -->
      <div ref="actionRef" class="w-full flex justify-center" style="margin: 0; padding: 0;">
        <a
          v-if="calendarUrl"
          :href="calendarUrl"
          target="_blank"
          class="inline-flex items-center hover:scale-105 active:scale-95"
          style="gap: 10px; margin: 0; padding: clamp(10px, 3vw, 12px) clamp(22px, 6vw, 28px); border-radius: 9999px; background: transparent; border: 1px solid rgba(149,169,135,0.8); color: #3E5648; font-size: clamp(11px, 3.2vw, 13px); font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; transition: transform 0.3s ease, background 0.3s ease;"
        >
          <svg style="width: 16px; height: 16px; color: #486B5C; margin: 0; padding: 0; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span style="margin: 0; padding: 0;">Simpan Ke Kalender</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Invitation } from "@/types/invitation";
import type { ThemeConfig } from "@/types/theme";
import { generateGoogleCalendarUrl } from "@/utils/calendar";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  themeConfig?: ThemeConfig;
  hasDate: boolean;
  invitation?: Invitation;
}>();

const countdownSection = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);
const calendarRef = ref<HTMLElement | null>(null);
const actionRef = ref<HTMLElement | null>(null);

const pad = (n: number) => String(n).padStart(2, "0");

const HANEUL_BLUE = "#386B99";
const HANEUL_GREEN = "#486B5C";
const HANEUL_GOLD = "#D4AF37";

const parseYMD = (s?: string) => {
  if (!s) return null;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return null;
  return { y: d.getFullYear(), m: d.getMonth(), date: d.getDate() };
};

const primaryYM = computed(() => {
  const p =
    parseYMD(props.invitation?.akad_date) ||
    parseYMD(props.invitation?.resepsi_date);
  return p ? { y: p.y, m: p.m } : null;
});

const hasCalendar = computed(() => primaryYM.value !== null);

const monthLabel = computed(() => {
  if (!primaryYM.value) return "";
  const { y, m } = primaryYM.value;
  try {
    const s = new Date(y, m, 1).toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric",
    });
    return s.charAt(0).toUpperCase() + s.slice(1);
  } catch {
    return "";
  }
});

const weekdays = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

// Grid minggu (Senin duluan) untuk bulan event
const weeks = computed<(number | null)[][]>(() => {
  if (!primaryYM.value) return [];
  const { y, m } = primaryYM.value;
  const first = (new Date(y, m, 1).getDay() + 6) % 7; // Senin = 0
  const total = new Date(y, m + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array<null>(first).fill(null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
  return rows;
});

// Tanggal penting di bulan yang tampil: akad (biru) & resepsi (ijo)
const eventOfDay = (day: number): "akad" | "resepsi" | "both" | null => {
  if (!primaryYM.value) return null;
  const { y, m } = primaryYM.value;
  const a = parseYMD(props.invitation?.akad_date);
  const r = parseYMD(props.invitation?.resepsi_date);
  const isA = !!a && a.y === y && a.m === m && a.date === day;
  const isR = !!r && r.y === y && r.m === m && r.date === day;
  if (isA && isR) return "both";
  if (isA) return "akad";
  if (isR) return "resepsi";
  return null;
};

const dayCellStyle = (day: number): Record<string, string> => {
  const base: Record<string, string> = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "clamp(26px, 8vw, 32px)",
    height: "clamp(26px, 8vw, 32px)",
    fontSize: "clamp(11px, 3.2vw, 13px)",
    fontWeight: "500",
    color: "#2C4A6F",
    lineHeight: "1",
    margin: "0 auto",
    padding: "0",
    borderRadius: "9999px",
    background: "transparent",
  };
  const kind = eventOfDay(day);
  if (kind === "akad") {
    Object.assign(base, {
      background: HANEUL_BLUE,
      color: "#FFFFFF",
      fontWeight: "700",
      boxShadow: `0 0 0 1.5px #F4EDE0, 0 0 0 2.5px ${HANEUL_GOLD}`,
    });
  } else if (kind === "resepsi") {
    Object.assign(base, {
      background: HANEUL_GREEN,
      color: "#FFFFFF",
      fontWeight: "700",
      boxShadow: `0 0 0 1.5px #F4EDE0, 0 0 0 2.5px ${HANEUL_GOLD}`,
    });
  } else if (kind === "both") {
    Object.assign(base, {
      background: `linear-gradient(135deg, ${HANEUL_BLUE} 50%, ${HANEUL_GREEN} 50%)`,
      color: "#FFFFFF",
      fontWeight: "700",
      boxShadow: `0 0 0 1.5px #F4EDE0, 0 0 0 2.5px ${HANEUL_GOLD}`,
    });
  }
  return base;
};

const formatShortDate = (s?: string) => {
  const p = parseYMD(s);
  if (!p) return "";
  try {
    return new Date(p.y, p.m, p.date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });
  } catch {
    return `${p.date}`;
  }
};

const legendItems = computed(() => {
  if (!primaryYM.value) return [];
  const { y, m } = primaryYM.value;
  const items: { label: string; color: string; date: string }[] = [];
  const a = parseYMD(props.invitation?.akad_date);
  const r = parseYMD(props.invitation?.resepsi_date);
  if (a && a.y === y && a.m === m) {
    items.push({
      label: "Akad",
      color: HANEUL_BLUE,
      date: formatShortDate(props.invitation?.akad_date),
    });
  }
  if (r && r.y === y && r.m === m) {
    const sameDay = !!a && a.y === r.y && a.m === r.m && a.date === r.date;
    items.push({
      label: sameDay ? "Akad & Resepsi" : "Resepsi",
      color: sameDay ? HANEUL_GOLD : HANEUL_GREEN,
      date: formatShortDate(props.invitation?.resepsi_date),
    });
    if (sameDay) items.shift();
  }
  return items;
});

const calendarUrl = computed(() => {
  const date = props.invitation?.akad_date || props.invitation?.resepsi_date;
  if (!date) return "";
  return generateGoogleCalendarUrl({
    title: `Pernikahan ${props.invitation?.groom_name || ""} & ${props.invitation?.bride_name || ""}`,
    date,
    time: props.invitation?.akad_time || props.invitation?.resepsi_time,
    venue: props.invitation?.akad_venue || props.invitation?.resepsi_venue,
    address: props.invitation?.akad_address || props.invitation?.resepsi_address,
  });
});

onMounted(() => {
  if (!countdownSection.value) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: countdownSection.value,
      start: "top 80%",
    },
  });

  if (calendarRef.value) {
    tl.fromTo(
      calendarRef.value,
      { opacity: 0, y: 30, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
      }
    );
  }

  if (gridRef.value) {
    tl.fromTo(
      gridRef.value.children,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "back.out(1.3)",
      },
      "-=0.4"
    );
  }

  if (actionRef.value) {
    tl.fromTo(
      actionRef.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );
  }
});
</script>

<style scoped>
.haneul-countdown-box {
  transition: background 0.3s ease;
}

.haneul-countdown-box:hover {
  background: rgba(149, 169, 135, 0.1);
}
</style>
