<template>
  <footer
    ref="footerSection"
    class="min-h-[75dvh] flex flex-col justify-center py-16 md:py-24 px-6 sm:px-8 bg-transparent text-[#1d3d27] relative text-center"
    style="overflow: hidden; margin-top: -50px;"
  >

    <!-- Frame: fill dome putih 70% (muncul setelah animasi daun selesai), bawah terbuka nempel bottom-0 -->
    <div
      ref="frameFill"
      class="absolute bottom-0 left-0 right-0 w-full h-[50dvh] pointer-events-none"
      style="background: rgba(255, 255, 255, 0.7); border-radius: 9999px 9999px 0 0; opacity: 0;"
    ></div>

    <!-- Gerbang daun: daun disusun mengikuti lengkung + sisi frame -->
    <div ref="leafLayer" class="absolute bottom-0 left-0 right-0 h-[50dvh] pointer-events-none">
      <img
        v-for="(leaf, i) in leaves"
        :key="i"
        :src="leaf.src"
        :style="leaf.style"
        :data-ord="leaf.ord"
        class="leaf absolute"
        draggable="false"
        alt=""
      />

      <!-- Mahkota bunga: duduk DI ATAS lengkungan tengah daun, z di atas daun.
           Di dalam leafLayer biar % posisi ikut ukuran lengkung (bottom:100% = puncak lengkung).
           Wrapper buat posisi + miring dasar, img-nya yang di-sway GSAP (pivot tengah bawah) -->
      <div
        v-for="(f, i) in flowers"
        :key="'flower-' + i"
        class="absolute pointer-events-none"
        :style="flowerWrapStyles[i] || f.wrap"
      >
        <img
          :src="f.src"
          class="flower-img block w-full"
          :style="f.img"
          :data-fi="i"
          draggable="false"
          alt=""
        />
      </div>
    </div>

    <!-- Content: ditengahin tepat di gap antara bawah layar (0) & ujung atas svg (50dvh) => center di 25dvh -->
    <div
      class="absolute z-10 left-1/2 bottom-[25dvh] -translate-x-1/2 translate-y-1/2 w-full max-w-[300px] px-5 flex flex-col items-center text-center"
    >

      <!-- Thank You Statement -->
      <div ref="contentRef" class="w-full text-center">
        <p class="text-[11px] md:text-xs uppercase tracking-[0.3em] text-[#1d3d27] font-bold leading-relaxed mb-4 md:mb-5 text-center">Terima Kasih</p>
        <!-- Container full-width, isi teks dikunci di tengah secara horizontal -->
        <div class="w-full flex justify-center mb-8 md:mb-10">
          <p class="text-sm md:text-lg font-serif italic leading-relaxed md:leading-loose text-[#1d3d27]/90 text-center w-full max-w-[250px] sm:max-w-[270px]" style="font-family: 'Cormorant Garamond', Georgia, serif;">
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
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Invitation } from '@/types/invitation';
import type { ThemeConfig } from '@/types/theme';

gsap.registerPlugin(ScrollTrigger);

defineProps<{
  invitation: Invitation;
  themeConfig?: ThemeConfig;
}>();

const footerSection = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const leafLayer = ref<HTMLElement | null>(null);
const frameFill = ref<HTMLElement | null>(null);

// === Gate of leaves ===
const LEAF_URLS = [
  'https://media.mengundanganda.com/evergreen/footer%20section/dewirandi_af8eb934-7144-47e3-96d9-64da558fe291.webp',
  'https://media.mengundanganda.com/evergreen/footer%20section/dewirandi_fa06fa17-7e09-4293-9dc1-94d42921e2c8.webp',
];

type PlacedLeaf = { src: string; style: string; ord: number };
const leaves = ref<PlacedLeaf[]>([]);
// ord maksimum -> dipakai buat ngitung total durasi gerbang daun
let leafMaxOrd = 0;

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]!;

// === Mahkota bunga di puncak lengkungan daun ===
// wrap = posisi % terhadap leaf area (bottom:100% = persis di puncak lengkung),
// miring dasar lewat rotate wrapper; img-nya yg di-sway GSAP dengan pivot tengah bawah.
// img = mask gradasi biar potongan tangkai di bawah bunga pudar (ga keliatan terpotong).
const FLOWER_FADE =
  'opacity:0;' +
  '-webkit-mask-image:linear-gradient(to top, transparent 0, rgba(0,0,0,0.35) 7%, #000 24%);' +
  'mask-image:linear-gradient(to top, transparent 0, rgba(0,0,0,0.35) 7%, #000 24%);';
// kiri & kanan agak nempel ke tengah; 2 bunga tambahan (paling kiri & paling kanan)
// order: [paling-kiri, kiri, TENGAH, kanan, paling-kanan] -> index 2 = tengah
const flowers = [
  {
    // bunga paling kiri (mirror paling kanan)
    src: 'https://media.mengundanganda.com/evergreen/footer%20section/dewirandi_a289f39b-8d0a-4e73-b01e-950d6f1437e2.webp',
    wrap: 'left:27%;bottom:97%;width:clamp(51px,16%,76px);z-index:3;transform:translate(-50%,0) rotate(-34deg);transform-origin:50% 100%;',
    img: FLOWER_FADE,
    amp: 4, dur: 2.4, dly: 0.16,
  },
  {
    // bunga kiri — agak nempel ke tengah
    src: 'https://media.mengundanganda.com/evergreen/footer%20section/dewirandi_a289f39b-8d0a-4e73-b01e-950d6f1437e2.webp',
    wrap: 'left:40%;bottom:98%;width:clamp(51px,16%,76px);z-index:4;transform:translate(-50%,0) rotate(-24deg);transform-origin:50% 100%;',
    img: FLOWER_FADE,
    amp: 3.5, dur: 2.6, dly: 0.08,
  },
  {
    // bunga tengah — paling besar & paling atas
    src: 'https://media.mengundanganda.com/evergreen/footer%20section/dewirandi_d7a825c1-d891-4e40-94c6-febc3835f0d2.webp',
    wrap: 'left:50%;bottom:99%;width:clamp(60px,19%,92px);z-index:5;transform:translate(-50%,0);transform-origin:50% 100%;',
    img: FLOWER_FADE,
    amp: 2.4, dur: 3.1, dly: 0,
  },
  {
    // bunga kanan — agak nempel ke tengah (mirror kiri)
    src: 'https://media.mengundanganda.com/evergreen/footer%20section/dewirandi_db3c540c-19a1-4ab4-88d8-29a91416de58.webp',
    wrap: 'left:60%;bottom:98%;width:clamp(51px,16%,76px);z-index:4;transform:translate(-50%,0) rotate(24deg);transform-origin:50% 100%;',
    img: FLOWER_FADE,
    amp: 3.5, dur: 2.9, dly: 0.08,
  },
  {
    // bunga paling kanan
    src: 'https://media.mengundanganda.com/evergreen/footer%20section/dewirandi_db3c540c-19a1-4ab4-88d8-29a91416de58.webp',
    wrap: 'left:73%;bottom:97%;width:clamp(51px,16%,76px);z-index:3;transform:translate(-50%,0) rotate(34deg);transform-origin:50% 100%;',
    img: FLOWER_FADE,
    amp: 4, dur: 2.7, dly: 0.16,
  },
];

// posisi bunga = PAKAI RUMUS LENGKUNGAN DAUN ASLI (ujung svg jadi patokan),
// dihitung ulang tiap buildLeaves() biar selalu nempel di garis lengkung + responsif.
// xr = posisi x relatif lebar, dx = geser tambahan dlm pixel (negatif = ke kiri),
// sink = px dasar bunga "tenggelam" ke garis daun.
const FLOWER_POS = [
  { xr: 0.27, dx: 0,  rot: -34, w: 'clamp(51px,16%,76px)', z: 3 },   // paling kiri
  { xr: 0.40, dx: 0,  rot: -24, w: 'clamp(51px,16%,76px)', z: 4 },   // kiri (nempel tengah)
  { xr: 0.50, dx: 0,  rot: 0,   w: 'clamp(60px,19%,92px)', z: 5 },   // tengah
  { xr: 0.60, dx: 0,  rot: 24,  w: 'clamp(51px,16%,76px)', z: 4 },   // kanan (nempel tengah)
  { xr: 0.73, dx: -5, rot: 34,  w: 'clamp(51px,16%,76px)', z: 3 },   // paling kanan (geser 5px ke kiri)
];
const flowerWrapStyles = ref<string[]>(['', '', '', '', '']);

function buildLeaves() {
  const el = leafLayer.value;
  // ukur elemen frame aslinya (bukan window) biar 100% sinkron dgn tinggi CSS-nya
  const W = el ? el.clientWidth : window.innerWidth;
  const H = el ? el.clientHeight : window.innerHeight * 0.5;
  // radius dome = clamp CSS rounded-full: min(½W, ½H)
  const R = Math.min(W / 2, H / 2);
  const cx = W / 2;
  const cy = R; // PUSAT lingkaran ada di atas container (bukan H - R!)

  const base = Math.max(34, Math.min(52, W * 0.11)); // ukuran dinaikkan sedikit
  const spacing = base * 0.7;
  const out: PlacedLeaf[] = [];

  // Pasangkan daun: 1 di kiri garis, 1 di kanan garis, nempel di sepanjang garis frame
  const rows = [
    { off: -0.4, tilt: -14 },
    { off: 0.4, tilt: 14 },
  ];

  // rot = derajat CSS arah normal (mata daun menghadap keluar frame)
  // ord = urutan kemunculan: bawah -> naik -> finish di tengah atas (kiri & kananbarengan)
  const place = (x: number, y: number, rot: number, ord: number) => {
    const nRad = (rot * Math.PI) / 180;
    const nx = Math.sin(nRad);
    const ny = -Math.cos(nRad);
    for (const r of rows) {
      const w = base * rand(0.85, 1.25);
      const deg = rot + r.tilt + rand(-12, 12) - 6; // -6 = serong kiri khas daun
      const off = r.off * base * 0.62;
      const px = x + nx * off + rand(-3, 3);
      const py = y + ny * off + rand(-3, 3);
      const flip = Math.random() > 0.5 ? -1 : 1;
      out.push({
        src: pick(LEAF_URLS),
        ord,
        style:
          `left:${px.toFixed(1)}px;top:${py.toFixed(1)}px;width:${w.toFixed(1)}px;opacity:0;` +
          `transform:translate(-50%,-50%) rotate(${deg.toFixed(1)}deg) scaleX(${flip});`,
      });
    }
  };

  // Bangun SATU jalur (kanan): dasar -> naik sisi lurus -> lengkungan -> puncak tengah
  const strand: { x: number; y: number; rot: number }[] = [];

  // sisi lurus kanan, dari bawah ke atas
  for (let y = H; y >= cy; y -= spacing) {
    strand.push({ x: W - 2, y, rot: 90 });
  }

  if (W / 2 <= H / 2) {
    // portrait: perempat lingkaran kanan -> apex tengah
    const steps = Math.max(4, Math.floor(((Math.PI / 2) * R) / spacing));
    for (let i = 0; i <= steps; i++) {
      const a = ((Math.PI / 2) * i) / steps;
      strand.push({ x: cx + R * Math.cos(a), y: cy - R * Math.sin(a), rot: 90 - (a * 180) / Math.PI });
    }
  } else {
    // landscape: perempat lingkaran di sudut kanan atas...
    const steps = Math.max(4, Math.floor(((Math.PI / 2) * R) / spacing));
    for (let i = 0; i <= steps; i++) {
      const a = ((Math.PI / 2) * i) / steps;
      strand.push({ x: W - R + R * Math.cos(a), y: R - R * Math.sin(a), rot: 90 - (a * 180) / Math.PI });
    }
    // ...lalu tepi lurus atas dari x=W-R menyusut ke tengah
    for (let x = W - R - spacing; x >= cx; x -= spacing) {
      strand.push({ x, y: 0, rot: 0 });
    }
  }

  // Pasang daun: titik ke-i di kanan + cerminannya di kiri -> ord sama (barengan).
  // Urutan dibalik: puncak tengah = ord 0 (muncul pertama), merambat turun ke kanan & kiri,
  // titik paling bawah = ord terakhir (finish di dasar kiri & kanan)
  const n = strand.length;
  leafMaxOrd = n - 1;
  strand.forEach((p, i) => {
    const ord = n - 1 - i;
    place(p.x, p.y, p.rot, ord);
    place(W - p.x, p.y, -p.rot, ord);
  });

  leaves.value = out;

  // === Posisi bunga: kunci ke GARIS LENGKUNGAN daun (bukan angka % karangan) ===
  // archYAt(x) = jarak vertikal (dari atas leafLayer) garis lengkung di x tertentu,
  // rumusnya sama persis dgn pembentuk strand daun (lingkaran R di portrait,
  // sudut lingkaran + tepi lurus datar di landscape).
  const archYAt = (x: number): number => {
    const dx = Math.abs(x - cx);
    if (W / 2 <= H / 2) {
      // portrait: satu lingkaran penuh di tengah -> y = cy - akar(R^2 - dx^2)
      return cy - Math.sqrt(Math.max(0, R * R - dx * dx));
    }
    // landscape: datar di tengah, arc lingkaran di sudut kiri/kanan
    const flat = W / 2 - R;
    if (dx <= flat) return 0;
    const d = dx - flat;
    return R - Math.sqrt(Math.max(0, R * R - d * d));
  };
  const sink = Math.max(6, base * 0.25) + 12; // dasar bunga nenggelam ke daun (total +12px dari garis lengkung)
  flowerWrapStyles.value = FLOWER_POS.map((p) => {
    const x = W * p.xr + p.dx;
    const y = archYAt(x);
    return (
      `left:${x.toFixed(1)}px;bottom:${(H - y - sink).toFixed(1)}px;width:${p.w};z-index:${p.z};` +
      `transform:translate(-50%,0) rotate(${p.rot}deg);transform-origin:50% 100%;`
    );
  });
}

let leafTl: gsap.core.Timeline | null = null;
let flowerSways: gsap.core.Tween[] = [];

function animateLeaves() {
  const layer = leafLayer.value;
  const footer = footerSection.value;
  if (!layer || !footer) return;
  if (leafTl) {
    leafTl.scrollTrigger?.kill();
    leafTl.kill();
  }
  flowerSways.forEach(t => t.kill());
  flowerSways = [];
  const els = layer.querySelectorAll<HTMLElement>('.leaf');
  if (!els.length) return;
  const fill = frameFill.value;
  const content = contentRef.value;
  const flowerEls = Array.from(layer.querySelectorAll<HTMLElement>('.flower-img'));
  gsap.set(els, { opacity: 0 });
  if (fill) gsap.set(fill, { opacity: 0 });
  if (content) gsap.set(content, { opacity: 0, y: 24 });
  // bunga: nguncup di pivot tengah bawah (sumbu sway), wait di timeline buat mekar
  flowerEls.forEach((el, i) => {
    gsap.set(el, {
      opacity: 0,
      scale: 0.65,
      rotation: -(flowers[i]?.amp ?? 0),
      transformOrigin: '50% 100%',
    });
  });
  leafTl = gsap.timeline({
    paused: true,
    scrollTrigger: {
      trigger: footer,
      // PENTING: gerbang daun ada di 50dvh BAWAH footer.
      // Kalau pakai 'top bottom', trigger kepicu pas footer baru masuk ->
      // animasi selesai saat daunnya masih di luar layar (kelihatan ga pernah muncul).
      // Dasar footer = dasar dokumen (footer 100% terlihat HANYA di scroll mentok),
      // jadi pakai 'bottom bottom+=40': kepicu ~40px sebelum mentok (jamin kepacu
      // walau ada pembulatan pixel) saat footer sudah penuh di layar.
      start: 'bottom bottom+=40',
      // onEnter (scroll turun, footer penuh) -> jalan MAJU dari posisi sekarang
      //   (progress 0 = replay penuh; ketengah = nyambung, ga lompat)
      // onLeaveBack (scroll naik, footer keluar) -> REVERSE halus: fill hilang duluan,
      //   daun rontok dari bawah -> naik ke puncak (bukan hilang instan kayak 'reset')
      onEnter: () => { if (leafTl) { leafTl.timeScale(1); leafTl.play(); } },
      // reverse dibuat 1.5x biar gak kerasa kelamaan pas mastiin perginya
      onLeaveBack: () => { if (leafTl) { leafTl.timeScale(1.5); leafTl.reverse(); } },
    },
  });
  // delay tiap daun = urutannya (ord): mulai dari puncak tengah -> merambat ke kiri & kanan -> finish di bawah
  // pacing: agak cepat tapi masih kebaca urutannya (total gerbang ~1.2-1.5dtk)
  const LEAF_STAGGER = 0.06;
  leafTl.to(els, {
    opacity: 1,
    duration: 0.4,
    ease: 'power1.inOut',
    stagger: (_i: number, target: Element) =>
      Number((target as HTMLElement).dataset.ord || 0) * LEAF_STAGGER,
  });
  // total durasi gerbang daun = delay daun terakhir (ord maks * stagger) + durasi fade-nya
  const leafDur = leafMaxOrd * LEAF_STAGGER + 0.4;
  // Fill dome: baru muncul SETELAH semua daun selesai muncul
  if (fill) {
    leafTl.to(fill, {
      opacity: 1,
      duration: 0.7,
      ease: 'power1.out',
    }, '>-0.2');
  }
  // Teks: muncul saat animasi daun uda setengah jalan menuju selesai
  // (ditempatkan absolut di ~55% total durasi daun, bukan nunggu di akhir)
  if (content) {
    leafTl.to(content, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
    }, leafDur * 0.55);
  }
  // Bunga: LANGSUNG mekar begitu bagian TENGAH atas daun terisi.
  // Daun mulai dari ord 0 = puncak tengah, jadi tengah "kelar" ~0.6-0.8dtk dari awal
  // (ord kecil * stagger 0.06 + durasi fade). Gak nunggu gerbang penuh.
  if (flowerEls.length) {
    leafTl.to(flowerEls, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(2)',
      stagger: (_i: number, target: Element) =>
        (flowers[Number((target as HTMLElement).dataset.fi || 0)] || { dly: 0.2 }).dly,
    }, 0.65);
    // sway kanan-kiri terus-terusan dengan pivot tengah bawah gambar
    flowerEls.forEach((el, i) => {
      flowerSways.push(
        gsap.to(el, {
          rotation: flowers[i]?.amp ?? 0,
          duration: flowers[i]?.dur ?? 2.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 0.35 * i, // fase beda-beda biar ga serempak keliatan
        })
      );
    });
  }
  // recalc posisi trigger biar start 'top bottom' selalu akurat
  // (menghindani kasus animasi gak kepicu karena posisi lama dari sebelum layout final)
  leafTl.scrollTrigger?.refresh();
}

let resizeTimer: ReturnType<typeof setTimeout> | null = null;
const onResize = () => {
  if (resizeTimer) clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    buildLeaves();
    nextTick(animateLeaves);
  }, 200);
};

onMounted(() => {
  buildLeaves();
  nextTick(animateLeaves);
  window.addEventListener('resize', onResize);
  // NOTE: animasi teks sudah digabung ke timeline daun (leafTl) di animateLeaves(),
  // jadi TIDAK perlu ScrollTrigger terpisah lagi -> teks mulai muncul pas daun ~55% jalan, fill setelah daun kelar.
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
  if (resizeTimer) clearTimeout(resizeTimer);
  flowerSways.forEach(t => t.kill());
  flowerSways = [];
  if (leafTl) {
    leafTl.scrollTrigger?.kill();
    leafTl.kill();
  }
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>
