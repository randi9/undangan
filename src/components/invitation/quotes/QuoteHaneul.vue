<template>
  <section
    v-if="quote"
    ref="quoteSection"
    class="relative min-h-[100dvh] w-full flex flex-col items-center justify-center py-6 px-5 box-border overflow-hidden"
    :style="{
      background: '#F4EDE0',
      fontFamily: themeConfig?.fontBody || `'Plus Jakarta Sans', sans-serif`,
    }"
  >
    <!-- Background image dihapus sesuai request -->

    <!-- Background Decor Elements -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute -top-20 -left-20 w-80 h-80 bg-[#CDE0F2]/40 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-20 -right-20 w-80 h-80 bg-[#A7C7E7]/30 rounded-full blur-3xl"></div>
      <div class="absolute top-1/4 right-8 text-[#D4AF37] text-lg opacity-40">✦</div>
      <div class="absolute bottom-1/4 left-8 text-[#D4AF37] text-base opacity-40">✧</div>
    </div>

    <!-- Quote (container kapsul vertikal ke atas, transparan tanpa border) -->
    <div
      ref="cardRef"
      class="relative z-10 w-full max-w-[240px] sm:max-w-[260px] min-h-[75dvh] mx-auto flex flex-col items-center justify-center text-center px-5 py-20 rounded-[999px] bg-transparent border-0"
    >
      <!-- Quote Body -->
      <p
        class="text-base sm:text-lg md:text-xl text-[#3E5648] leading-relaxed sm:leading-loose mb-6 whitespace-pre-line"
        :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }"
      >
        "{{ parsedQuote.body }}"
      </p>

      <!-- Divider with Star -->
      <div class="flex items-center gap-3 my-2">
        <div class="w-12 h-[1px] bg-[#3E5648]/25"></div>
        <span class="text-[#3E5648] text-xs">✦</span>
        <div class="w-12 h-[1px] bg-[#3E5648]/25"></div>
      </div>

      <!-- Source / Surah -->
      <p
        v-if="parsedQuote.source"
        class="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#3E5648] mt-3"
      >
        {{ parsedQuote.source }}
      </p>

      <!-- BUNGA HIASAN (nempel ke CONTAINER, bukan ke layar)
           CARA NGATUR (edit style inline di bawah, semua pakai %):
           - bottom : % dari TINGGI container (75dvh). 0% = nempel bawah, makin besar = naik ke atas
           - right  : % dari LEBAR container (240px). -15% = keluar kanan (~-36px), 0% = nempel dalam
           - width  : ukuran responsif hp kecil vs hp besar
                      clamp(MIN, IDEAL, MAX) = clamp(170px, 60vw, 280px)
           - rotate : putar bunga (mis. 0deg, 15deg) -->
      <img
        ref="flower1Ref"
        :src="FLOWER_SRC"
        alt=""
        aria-hidden="true"
        draggable="false"
        style="position: absolute; bottom: 15%; right: -20%; width: clamp(170px, 60vw, 280px); height: auto; display: block; z-index: 20; pointer-events: none; transform: rotate(0deg);"
      />

      <!-- BUNGA KEDUA (nempel ke CONTAINER, kanan-atas, z-index di bawah bunga pertama)
           CARA NGATUR (edit style inline di bawah, semua pakai %):
           - bottom : % dari TINGGI container. 5% = bawah, 30% = tengah-atas, 60% = atas
           - right  : % dari LEBAR container. -25% = keluar kanan jauh, -15% = keluar dikit
           - width  : clamp(MIN, IDEAL, MAX) = clamp(70px, 26vw, 120px)
           - rotate : putar bunga -->
      <img
        ref="flower2Ref"
        :src="FLOWER_SRC_2"
        alt=""
        aria-hidden="true"
        draggable="false"
        style="position: absolute; bottom: 30%; right: -30%; width: clamp(70px, 26vw, 120px); height: auto; display: block; z-index: 10; pointer-events: none; transform: rotate(0deg);"
      />

      <!-- BUNGA KETIGA (nempel ke CONTAINER, kiri-bawah, mirror bunga pertama)
           CARA NGATUR (edit style inline di bawah, semua pakai %):
           - bottom : % dari TINGGI container. samain kayak bunga pertama biar sejajar
           - left   : % dari LEBAR container. -20% = keluar kiri (mirror right -20%)
           - width  : clamp(MIN, IDEAL, MAX) = clamp(120px, 42vw, 200px)
           - rotate : putar bunga -->
      <img
        ref="flower3Ref"
        :src="FLOWER_SRC_3"
        alt=""
        aria-hidden="true"
        draggable="false"
        style="position: absolute; bottom: 15%; left: -25%; width: clamp(120px, 42vw, 200px); height: auto; display: block; z-index: 20; pointer-events: none; transform: rotate(0deg);"
      />

      <!-- BUNGA KEEMPAT (nempel ke CONTAINER, pinggir kiri, z di bawah bunga ketiga)
           CARA NGATUR (edit style inline di bawah, semua pakai %):
           - bottom : % dari TINGGI container. 45% = tengah-kiri
           - left   : % dari LEBAR container. negatif = keluar kiri
           - width  : clamp(MIN, IDEAL, MAX)
           - rotate : putar bunga -->
      <img
        ref="flower4Ref"
        :src="FLOWER_SRC_4"
        alt=""
        aria-hidden="true"
        draggable="false"
        style="position: absolute; bottom: 20%; left: -35%; width: clamp(70px, 26vw, 120px); height: auto; display: block; z-index: 10; pointer-events: none; transform: rotate(0deg);"
      />

      <!-- BUNGA KELIMA (nempel ke CONTAINER, kiri di atas bunga keempat, z di bawah bunga keempat)
           CARA NGATUR (edit style inline di bawah, semua pakai %):
           - bottom : % dari TINGGI container. 45% = di atas bunga keempat (25%)
           - left   : % dari LEBAR container. negatif = keluar kiri
           - width  : clamp(MIN, IDEAL, MAX)
           - rotate : putar bunga -->
      <img
        ref="flower5Ref"
        :src="FLOWER_SRC_5"
        alt=""
        aria-hidden="true"
        draggable="false"
        style="position: absolute; bottom: 40%; left: -35%; width: clamp(70px, 26vw, 120px); height: auto; display: block; z-index: 5; pointer-events: none; transform: rotate(0deg);"
      />

      <!-- BUNGA KEENAM (nempel ke CONTAINER, kiri di atas bunga kelima, z paling bawah)
           CARA NGATUR (edit style inline di bawah, semua pakai %):
           - bottom : % dari TINGGI container. 62% = di atas bunga kelima (45%)
           - left   : % dari LEBAR container. negatif = keluar kiri
           - width  : clamp(MIN, IDEAL, MAX)
           - rotate : putar bunga -->
      <img
        ref="flower6Ref"
        :src="FLOWER_SRC_6"
        alt=""
        aria-hidden="true"
        draggable="false"
        style="position: absolute; bottom: 70%; left: -15%; width: clamp(85px, 30vw, 140px); height: auto; display: block; z-index: 1; pointer-events: none; transform: rotate(0deg);"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ThemeConfig } from "@/types/theme";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  quote?: string;
  themeConfig?: ThemeConfig;
}>();

// GANTI URL BUNGA DI SINI (asset bunga untuk bawah-kanan container quotes)
const FLOWER_SRC =
  "https://media.mengundanganda.com/haneul/quotes%20section/dewirandi_15bf53a5-3e6d-46ab-8efa-5465c0841370.webp";

// BUNGA KEDUA (kiri, z-index di bawah bunga pertama)
const FLOWER_SRC_2 =
  "https://media.mengundanganda.com/haneul/quotes%20section/dewirandi_e9a8c9b3-bf58-4c9d-bf40-34377625cde6.webp";

// BUNGA KETIGA (kiri-bawah, mirror bunga pertama kanan-bawah)
const FLOWER_SRC_3 =
  "https://media.mengundanganda.com/haneul/quotes%20section/dewirandi_210167ce-495c-4b3a-a815-0d0465d5e29e.webp";

// BUNGA KEEMPAT (pinggir kiri, z-index di bawah bunga ketiga)
const FLOWER_SRC_4 =
  "https://media.mengundanganda.com/haneul/quotes%20section/dewirandi_a4c111de-f3cf-4986-ae41-c1d6aac39290.webp";

// BUNGA KELIMA (kiri, di atas bunga keempat, z di bawah bunga keempat)
const FLOWER_SRC_5 =
  "https://media.mengundanganda.com/haneul/quotes%20section/dewirandi_046f8c68-f01b-4a17-89ab-9430e6ff9f21.webp";

// BUNGA KEENAM (kiri, di atas bunga kelima, z paling bawah)
const FLOWER_SRC_6 =
  "https://media.mengundanganda.com/haneul/quotes%20section/dewirandi_4899f73d-e37a-4bb0-9673-a407d8bf967f.webp";

const quoteSection = ref<HTMLElement | null>(null);
const cardRef = ref<HTMLElement | null>(null);
const flower1Ref = ref<HTMLImageElement | null>(null);
const flower2Ref = ref<HTMLImageElement | null>(null);
const flower3Ref = ref<HTMLImageElement | null>(null);
const flower4Ref = ref<HTMLImageElement | null>(null);
const flower5Ref = ref<HTMLImageElement | null>(null);
const flower6Ref = ref<HTMLImageElement | null>(null);

// PENGATURAN ANIMASI BUNGA (gampang diutak-atik):
// - DURATION = lama muncul tiap bunga (detik) — makin besar makin pelan
// - GAP = jeda antar bunga (detik)
// - URUTAN = 1, 3, 2, 4, 5, 6
const FLOWER_ANIM = { duration: 0.8, gap: 0.15, y: 24, scale: 0.6 };

// PENGATURAN SWAY (goyang acak, pivot tengah-bawah):
// - MIN_DUR / MAX_DUR = durasi goyang acak per bunga (1.8–2.4 dtk = sedang)
// - ROTATE / X / Y = jarak goyang maksimal
// - ORIGIN = pivot animasi (tengah-bawah)
const FLOWER_SWAY = { minDur: 1.8, maxDur: 2.4, rotate: 4, x: 4, y: 5, origin: "50% 100%" };

const parsedQuote = computed(() => {
  if (!props.quote) return { body: "", source: "" };
  const raw = props.quote.trim();

  if (raw.includes("\n")) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length > 1) {
      const lastLine = lines[lines.length - 1];
      const bodyLines = lines.slice(0, -1);
      return {
        body: bodyLines.join("\n").replace(/^[“"']+|[”"']+$/g, "").trim(),
        source: (lastLine ?? "").replace(/^[-—–\s]+/, "").trim(),
      };
    }
  }

  const qsMatch = raw.match(
    /^(.*?)(?:[\s—–-]+|\s+)([(]?(?:Q\.S\.|QS\.|Surah|H\.R\.|HR\.|Q\.S|QS)[^)]*[)]?)$/i
  );
  if (qsMatch && qsMatch[1] && qsMatch[2]) {
    return {
      body: qsMatch[1].replace(/^[“"']+|[”"']+$/g, "").trim(),
      source: qsMatch[2].replace(/^[-—–\s]+/, "").trim(),
    };
  }

  return {
    body: raw.replace(/^[“"']+|[”"']+$/g, "").trim(),
    source: "",
  };
});

onMounted(() => {
  if (!quoteSection.value || !cardRef.value) return;

  gsap.fromTo(
    cardRef.value,
    { opacity: 0, y: 35, scale: 0.96 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: quoteSection.value,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  );

  // Animasi kemunculan bunga berurutan: 1, 3, 2, 4, 5, 6
  const flowerOrder = [
    flower1Ref.value,
    flower3Ref.value,
    flower2Ref.value,
    flower4Ref.value,
    flower5Ref.value,
    flower6Ref.value,
  ].filter(Boolean) as HTMLImageElement[];
  if (flowerOrder.length) {
    gsap.set(flowerOrder, {
      opacity: 0,
      y: FLOWER_ANIM.y,
      scale: FLOWER_ANIM.scale,
    });
    gsap.to(flowerOrder, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: FLOWER_ANIM.duration,
      ease: "power2.out",
      stagger: FLOWER_ANIM.gap,
      scrollTrigger: {
        trigger: quoteSection.value,
        start: "top 70%",
        toggleActions: "play none none none",
      },
      onComplete: startSway,
    });
  }

  // Sway acak untuk bunga 2, 4, 5, 6 (pivot tengah-bawah, jalan setelah kemunculan selesai)
  function startSway() {
    const swayTargets = [
      flower2Ref.value,
      flower4Ref.value,
      flower5Ref.value,
      flower6Ref.value,
    ].filter(Boolean) as HTMLImageElement[];
    gsap.set(swayTargets, { transformOrigin: FLOWER_SWAY.origin });
    swayTargets.forEach((el, i) => {
      gsap.to(el, {
        rotation: gsap.utils.random(-FLOWER_SWAY.rotate, FLOWER_SWAY.rotate),
        x: gsap.utils.random(-FLOWER_SWAY.x, FLOWER_SWAY.x),
        y: gsap.utils.random(-FLOWER_SWAY.y, FLOWER_SWAY.y),
        duration: gsap.utils.random(FLOWER_SWAY.minDur, FLOWER_SWAY.maxDur),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        repeatRefresh: true,
        delay: i * 0.25,
      });
    });
  }
});
</script>
