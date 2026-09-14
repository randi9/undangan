<template>
  <!-- ============================================================
    CARD FRAME — Royal Fantasy Minimalist (champagne gold line-art)
    - Warna mudah diganti via CSS var --card-gold (default #B89A62)
    - viewBox 0 0 400 280 + preserveAspectRatio="none" => mengisi
      card apa pun; vector-effect non-scaling-stroke menjaga semua
      garis tetap 1-1.2px di segala ukuran.
    - Bingkai SENGAJA mepet tepi (±10px) agar tidak menutupi teks:
      area konten tengah 100% bersih, dekorasi hanya di margin.
    - Grup berlabel jelas agar mudah dimodifikasi:
      OUTER (bingkai utama) | INNER (bingkai dalam terputus) |
      EMBLEM (diamond atas/bawah + stasiun kiri/kanan) |
      CORNERS (flourish Victorian identik ×4, simetris cermin) |
      SEPARATOR (flourish pemisah bab bawah-tengah) | DOTS
    ============================================================ -->
  <svg
    class="rf-card-decor"
    viewBox="0 0 400 280"
    preserveAspectRatio="none"
    aria-hidden="true"
    focusable="false"
  >
    <g vector-effect="non-scaling-stroke">
      <!-- LAPIS 1 : bingkai utama (±10px dari tepi, garis 1.2px) -->
      <rect class="ln" x="10" y="10" width="380" height="260" rx="3" stroke-width="1.2" />

      <!-- LAPIS 2 : bingkai dalam terputus (±12px di dalam lapis 1) +
           rel horizontal pengapit emblem atas & bawah -->
      <g class="ln" stroke-width="1">
        <path d="M22 22 H112" />
        <path d="M288 22 H378" />
        <path d="M22 258 H112" />
        <path d="M288 258 H378" />
        <path d="M22 22 V92" />
        <path d="M22 188 V258" />
        <path d="M378 22 V92" />
        <path d="M378 188 V258" />
        <path d="M124 22 H170" />
        <path d="M230 22 H276" />
        <path d="M124 258 H170" />
        <path d="M230 258 H276" />
      </g>

      <!-- EMBLEM : diamond geometris berlapis (atas & bawah, titik fokus) -->
      <g class="ln" stroke-width="1.1">
        <path d="M200 11.5 L208.5 22 L200 32.5 L191.5 22 Z" />
        <path d="M200 16.5 L204.5 22 L200 27.5 L195.5 22 Z" />
        <path d="M200 247.5 L208.5 258 L200 268.5 L191.5 258 Z" />
        <path d="M200 252.5 L204.5 258 L200 263.5 L195.5 258 Z" />
      </g>

      <!-- STASIUN SISI : diamond mungil diapit garis pendek (tepat di
           garis bingkai dalam, area tengah dibiarkan kosong) -->
      <g class="ln" stroke-width="1">
        <path d="M22 135.5 L26.5 140 L22 144.5 L17.5 140 Z" />
        <path d="M8 140 H15.5" />
        <path d="M28.5 140 H36" />
        <path d="M378 135.5 L382.5 140 L378 144.5 L373.5 140 Z" />
        <path d="M364 140 H371.5" />
        <path d="M384.5 140 H392" />
      </g>

      <!-- SUDUT : flourish Victorian/Art Nouveau identik (~48px, hidup di
           margin tepi). Sumbu tiap grup = sudut bingkai luar; 3 sudut
           lain = cerminan. Spike luar DIPENDEKKAN agar tidak terpotong. -->
      <g class="ln" stroke-width="1.1">
        <g transform="translate(10,10)">
          <path d="M0 0 L-4 -4" />
          <path d="M-4 -6.8 L-2 -4 L-4 -1.2 L-6 -4 Z" />
          <path d="M3 30 C5 17 17 5 30 3" />
          <path d="M30 3 C35.5 3 38.5 7 37 11 C35.8 14.2 31.8 13.6 31.6 10.4 C31.4 8 34 6.6 35.6 8.2" />
          <path d="M3 30 C3 35.5 7 38.5 11 37 C14.2 35.8 13.6 31.8 10.4 31.6 C8 31.4 6.6 34 8.2 35.6" />
          <path d="M11.5 20.5 C14 17.8 17.6 16.6 20.6 16.8 C20.2 19.8 17.4 22.2 14.2 22.4 C13 22.5 11.7 21.7 11.5 20.5 Z" />
          <path d="M20.5 11.5 C21.7 11.7 22.5 13 22.4 14.2 C22.2 17.4 19.8 20.2 16.8 20.6 C16.6 17.6 17.8 14 20.5 11.5 Z" />
        </g>
        <g transform="translate(390,10) scale(-1,1)">
          <path d="M0 0 L-4 -4" />
          <path d="M-4 -6.8 L-2 -4 L-4 -1.2 L-6 -4 Z" />
          <path d="M3 30 C5 17 17 5 30 3" />
          <path d="M30 3 C35.5 3 38.5 7 37 11 C35.8 14.2 31.8 13.6 31.6 10.4 C31.4 8 34 6.6 35.6 8.2" />
          <path d="M3 30 C3 35.5 7 38.5 11 37 C14.2 35.8 13.6 31.8 10.4 31.6 C8 31.4 6.6 34 8.2 35.6" />
          <path d="M11.5 20.5 C14 17.8 17.6 16.6 20.6 16.8 C20.2 19.8 17.4 22.2 14.2 22.4 C13 22.5 11.7 21.7 11.5 20.5 Z" />
          <path d="M20.5 11.5 C21.7 11.7 22.5 13 22.4 14.2 C22.2 17.4 19.8 20.2 16.8 20.6 C16.6 17.6 17.8 14 20.5 11.5 Z" />
        </g>
        <g transform="translate(10,270) scale(1,-1)">
          <path d="M0 0 L-4 -4" />
          <path d="M-4 -6.8 L-2 -4 L-4 -1.2 L-6 -4 Z" />
          <path d="M3 30 C5 17 17 5 30 3" />
          <path d="M30 3 C35.5 3 38.5 7 37 11 C35.8 14.2 31.8 13.6 31.6 10.4 C31.4 8 34 6.6 35.6 8.2" />
          <path d="M3 30 C3 35.5 7 38.5 11 37 C14.2 35.8 13.6 31.8 10.4 31.6 C8 31.4 6.6 34 8.2 35.6" />
          <path d="M11.5 20.5 C14 17.8 17.6 16.6 20.6 16.8 C20.2 19.8 17.4 22.2 14.2 22.4 C13 22.5 11.7 21.7 11.5 20.5 Z" />
          <path d="M20.5 11.5 C21.7 11.7 22.5 13 22.4 14.2 C22.2 17.4 19.8 20.2 16.8 20.6 C16.6 17.6 17.8 14 20.5 11.5 Z" />
        </g>
        <g transform="translate(390,270) scale(-1,-1)">
          <path d="M0 0 L-4 -4" />
          <path d="M-4 -6.8 L-2 -4 L-4 -1.2 L-6 -4 Z" />
          <path d="M3 30 C5 17 17 5 30 3" />
          <path d="M30 3 C35.5 3 38.5 7 37 11 C35.8 14.2 31.8 13.6 31.6 10.4 C31.4 8 34 6.6 35.6 8.2" />
          <path d="M3 30 C3 35.5 7 38.5 11 37 C14.2 35.8 13.6 31.8 10.4 31.6 C8 31.4 6.6 34 8.2 35.6" />
          <path d="M11.5 20.5 C14 17.8 17.6 16.6 20.6 16.8 C20.2 19.8 17.4 22.2 14.2 22.4 C13 22.5 11.7 21.7 11.5 20.5 Z" />
          <path d="M20.5 11.5 C21.7 11.7 22.5 13 22.4 14.2 C22.2 17.4 19.8 20.2 16.8 20.6 C16.6 17.6 17.8 14 20.5 11.5 Z" />
        </g>
      </g>

      <!-- SEPARATOR : flourish pemisah bab bawah-tengah (±78px × ±8px).
           Disembunyikan via prop bila card pendek (timeline mini). -->
      <g v-if="showSeparator" class="ln" stroke-width="1">
        <path d="M164 217 H172" />
        <path d="M228 217 H236" />
        <path d="M175.5 217 C179.8 217 181 213.6 185.5 213.6 C190 213.6 191.5 217 195.5 217" />
        <path d="M204.5 217 C208.5 217 210 213.6 214.5 213.6 C219 213.6 220.2 217 224.5 217" />
        <path d="M200 213.8 L203.2 217 L200 220.2 L196.8 217 Z" />
      </g>
    </g>

    <!-- TITIK AKSEN (fill tipis, bukan garis) -->
    <g class="dot">
      <circle cx="120" cy="22" r="1" />
      <circle cx="280" cy="22" r="1" />
      <circle cx="120" cy="258" r="1" />
      <circle cx="280" cy="258" r="1" />
      <circle v-if="showSeparator" cx="161" cy="217" r="1" />
      <circle v-if="showSeparator" cx="239" cy="217" r="1" />
    </g>
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ showSeparator?: boolean }>(), { showSeparator: true });
</script>

<style scoped>
.rf-card-decor {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  pointer-events: none;
  z-index: 0;
  opacity: 0.95;
}
.rf-card-decor .ln {
  fill: none;
  stroke: var(--card-gold, #b89a62);
  stroke-linecap: round;
  stroke-linejoin: round;
}
.rf-card-decor .dot {
  fill: var(--card-gold, #b89a62);
  stroke: none;
}
</style>
