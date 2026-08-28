<template>
  <div
    ref="coverRoot"
    style="position: fixed; inset: 0; z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100dvh; overflow: hidden; user-select: none; box-sizing: border-box; padding: 20px 16px; background-color: #ECF1ED;"
    :class="isOpening ? 'pointer-events-none' : 'pointer-events-auto'"
    :style="{
      fontFamily: fontBody || `'Plus Jakarta Sans', sans-serif`,
    }"
  >
    <!-- ========================================================================= -->
    <!-- ARCH VIEWPORT CONTAINER (Memuat Background & Semua Dekorasi Hero di Arch) -->
    <!-- ========================================================================= -->
    <div
      ref="archViewport"
      style="
        position: absolute;
        top: 105px; /* Jarak lengkungan arch dari atas layar */
        left: 50%;
        transform: translateX(-50%);
        width: 280px; /* Lebar lengkungan arch */
        height: 410px; /* Tinggi lengkungan arch */
        border-top-left-radius: 140px; /* Setengah oval atas */
        border-top-right-radius: 140px;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
        overflow: hidden;
        z-index: 1;
        pointer-events: none;
      "
    >
      <!-- 1. Background Image (Langit & Danau) -->
      <div
        style="
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        "
        :style="{
          backgroundImage: `url('${coverImage || 'https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_003c89a6-d363-423d-83c4-2f34746fb0fb.webp'}')`,
        }"
      ></div>

      <!-- Overlay Soft Light Ambient (Opasitas 0.35) -->
      <div
        ref="ambientOverlay"
        style="
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.25);
          pointer-events: none;
          z-index: 8;
        "
      ></div>

      <!-- 2. Dekorasi Awan Melayang (Statis) -->
      <div
        ref="cloudAsset"
        style="
          position: absolute;
          top: 13.5px;
          left: -11px;
          width: 179px;
          opacity: 0.85;
          z-index: 1;
          pointer-events: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_4fb989c3-cdd6-4a38-ba48-52964e15d067.webp"
          alt="Dekorasi Awan"
          style="display: block; width: 100%; height: auto; object-fit: contain;"
        />
      </div>

      <!-- 3. Dekorasi Statis Tengah 1 (Pohon / Semak) -->
      <div
        ref="tree1Asset"
        style="
          position: absolute;
          top: 54%;
          left: 68%;
          transform: translate(-50%, -50%);
          width: 52%;
          z-index: 2;
          pointer-events: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_e774a1c8-6977-4f6a-9a27-ed773d7a85d6.webp"
          alt="Dekorasi Pohon Tengah"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
            clip-path: inset(0 0 20% 0);
            -webkit-clip-path: inset(0 0 20% 0);
          "
        />
      </div>

      <!-- 4. Dekorasi Statis Tengah 2 (Pohon Tambahan) -->
      <div
        ref="tree2Asset"
        style="
          position: absolute;
          top: 54%;
          left: 74%;
          transform: translate(-50%, -50%);
          width: 38%;
          z-index: 2;
          pointer-events: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_e774a1c8-6977-4f6a-9a27-ed773d7a85d6.webp"
          alt="Dekorasi Pohon Tambahan"
          style="
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
            clip-path: inset(0 0 10% 0);
            -webkit-clip-path: inset(0 0 10% 0);
          "
        />
      </div>

      <!-- 5. Dekorasi Gazebo -->
      <div
        ref="gazeboAsset"
        style="
          position: absolute;
          top: 58%;
          left: 78%;
          transform: translate(-50%, -50%);
          width: 62%;
          z-index: 2;
          pointer-events: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_ffe34cdf-422b-4ae5-bb75-93af3d918859.webp"
          alt="Dekorasi Gazebo"
          style="display: block; width: 100%; height: auto; object-fit: contain;"
        />
      </div>

      <!-- 6. Dekorasi Dahan Utama (Kanan Atas) -->
      <div
        ref="dahan1Asset"
        style="
          position: absolute;
          top: -17px;
          right: -28px;
          width: 95%;
          display: flex;
          justify-content: flex-end;
          z-index: 3;
          pointer-events: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_714d21a6-f5bc-414f-88b1-b44248b731c5.webp"
          alt="Dahan Kanan Atas"
          style="display: block; width: 100%; height: auto;"
        />
      </div>

      <!-- 7. Dekorasi Dahan Layer 2 -->
      <div
        ref="dahan2Asset"
        style="
          position: absolute;
          top: 34px;
          right: -17px;
          width: 65%;
          display: flex;
          justify-content: flex-end;
          z-index: 4;
          pointer-events: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_fc91163f-8a66-4463-b5e7-674cfabf2339.webp"
          alt="Dahan Layer 2"
          style="display: block; width: 100%; height: auto;"
        />
      </div>

      <!-- 8. Dekorasi Dahan Layer 3 -->
      <div
        ref="dahan3Asset"
        style="
          position: absolute;
          top: 73px;
          right: -20px;
          width: 55%;
          display: flex;
          justify-content: flex-end;
          z-index: 5;
          pointer-events: none;
        "
      >
        <img
          src="https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_fc91163f-8a66-4463-b5e7-674cfabf2339.webp"
          alt="Dahan Layer 3"
          style="display: block; width: 100%; height: auto;"
        />
      </div>

      <!-- 9. Teks "The Wedding Of" & Nama Mempelai (Tanpa Container Box - Tepat di Tengah Vertikal) -->
      <div
        ref="archText"
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 0 16px;
          box-sizing: border-box;
          text-align: center;
          z-index: 10;
          pointer-events: none;
        "
      >
        <!-- "THE WEDDING OF" Header -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;">
          <span style="width: 22px; height: 1.5px; background: #ffffff; opacity: 0.85; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);"></span>
          <span
            style="
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.3em;
              color: #ffffff;
              font-weight: 700;
              white-space: nowrap;
              text-shadow: 0 2px 6px rgba(20, 35, 27, 0.45), 0 1px 3px rgba(0, 0, 0, 0.25);
            "
          >
            The Wedding Of
          </span>
          <span style="width: 22px; height: 1.5px; background: #ffffff; opacity: 0.85; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);"></span>
        </div>

        <!-- COUPLE NAMES -->
        <h1
          style="
            color: #ffffff;
            font-weight: 600;
            line-height: 1.12;
            margin: 4px 0 0 0;
            letter-spacing: 0.02em;
            text-shadow: 0 3px 10px rgba(20, 35, 27, 0.55), 0 1px 4px rgba(0, 0, 0, 0.3);
          "
          :style="{ fontFamily: fontHeading || `'Cormorant Garamond', Georgia, serif` }"
        >
          <span style="display: block; font-size: 45px; font-weight: 600;">{{ groomName }}</span>
          <span
            style="
              display: block;
              font-size: 24px;
              color: #ffffff;
              font-style: italic;
              font-weight: 400;
              margin: 1px 0;
              opacity: 0.9;
              text-shadow: 0 2px 5px rgba(20, 35, 27, 0.45);
            "
          >
            &amp;
          </span>
          <span style="display: block; font-size: 45px; font-weight: 600;">{{ brideName }}</span>
        </h1>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- ASSET COVER SECTION (Dekat kubah)                                         -->
    <!-- Ngotak-ngatik: ubah angka di coverDekatStyle (script) atau langsung di    -->
    <!-- komentar tiap properti di bawah ini.                                      -->
    <!-- ========================================================================= -->
    <div
      ref="coverDekatAsset"
      :style="coverDekatStyle"
    >
      <img
        src="https://media.mengundanganda.com/evergreen/cover%20section/dewirandi_13b7814f-f84d-4340-b166-ea603f3f0192.webp"
        alt="Dekorasi Cover"
        style="display: block; width: 100%; height: 100%; object-fit: contain;"
      />
    </div>

    <!-- ========================================================================= -->
    <!-- SOLID OVERLAY LAYER (Menutup layar di luar area lengkungan arch)          -->
    <!-- ========================================================================= -->
    <div
      ref="cutoutOverlay"
      style="
        position: absolute;
        top: 105px; /* Jarak lengkungan arch dari atas layar */
        left: 50%;
        transform: translateX(-50%);
        width: 280px; /* Lebar lengkungan arch */
        height: 410px; /* Tinggi lengkungan arch */
        border-top-left-radius: 140px; /* Setengah oval atas */
        border-top-right-radius: 140px;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
        z-index: 2;
        pointer-events: none;
        
        /* ============================================================== */
        /* KONTROL WARNA LAYER DI SINI                                    */
        /* ============================================================== */
        box-shadow: 0 0 0 9999px #ECF1ED; /* Warna solid putih agak sage menutup layar */
      "
    ></div>

    <!-- ========================================================================= -->
    <!-- WEDDING CONTENT CONTAINER (Teks & Tombol di bawah Arch)                   -->
    <!-- ========================================================================= -->
    <div
      ref="cardContainer"
      style="
        position: relative;
        z-index: 10;
        width: 100%;
        max-width: 350px;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end; /* Container YTH & button dipaksa nempel bottom */
        padding-top: 105px;
        padding-bottom: 36px;
      "
    >
      <!-- Spacer to match the Arch height exactly -->
      <div style="width: 280px; height: 410px; flex-shrink: 0; pointer-events: none;"></div>

      <!-- Content Area below the Arch Cutout (Sticking to the bottom) -->
      <div
        style="
          flex-grow: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          box-sizing: border-box;
          text-align: center;
        "
      >

        <!-- Delicate Divider -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 4px; opacity: 0.85;">
          <span style="width: 26px; height: 1px; background: #7A9A8B;"></span>
          <svg style="width: 9px; height: 9px; color: #5C7367;" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"/>
          </svg>
          <span style="width: 26px; height: 1px; background: #7A9A8B;"></span>
        </div>

        <!-- 3. Guest Recipient Badge -->
        <div
          style="
            width: 100%;
            max-width: 240px;
            margin-bottom: 15px; /* Geser badge Kepada Yth 15px ke atas, button tetap di posisinya */
            padding: 8px 12px;
            border-radius: 12px;
            background: rgba(74, 107, 91, 0.07);
            border: 1px solid rgba(74, 107, 91, 0.12);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
          "
        >
          <p style="font-size: 8.5px; letter-spacing: 0.2em; text-transform: uppercase; color: #5C7367; font-weight: 600; margin: 0 0 2px 0;">
            Kepada Yth.
          </p>
          <p style="font-size: 9px; color: #7A9A8B; letter-spacing: 0.05em; font-weight: 400; margin: 0 0 3px 0;">
            Bapak/Ibu/Saudara/i:
          </p>
          <h3
            style="
              font-size: 14.5px;
              font-weight: 600;
              color: #2D3E35;
              letter-spacing: 0.03em;
              line-height: 1.25;
              margin: 0;
              word-break: break-word;
              max-width: 210px;
            "
            :style="{ fontFamily: fontHeading || `'Cormorant Garamond', Georgia, serif` }"
          >
            {{ guestName || 'Tamu Undangan' }}
          </h3>
        </div>

        <!-- 4. Buka Undangan Button -->
        <button
          ref="bukaBtn"
          @click="bukaAmplop"
          type="button"
          style="
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 13px 32px;
            border-radius: 9999px;
            background: #354C3F;
            color: #ffffff;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            border: none;
            box-shadow: 0 4px 12px rgba(53, 76, 63, 0.25);
            cursor: pointer;
            transition: all 0.3s ease;
            outline: none;
            margin-top: 4px;
          "
          onmouseenter="this.style.transform='scale(1.03)'; this.style.boxShadow='0 6px 16px rgba(53, 76, 63, 0.4)';"
          onmouseleave="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(53, 76, 63, 0.25)';"
          onmousedown="this.style.transform='scale(0.96)';"
          onmouseup="this.style.transform='scale(1.03)';"
        >
          <svg
            style="width: 15px; height: 15px; color: #ffffff;"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span>Buka Undangan</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { gsap } from 'gsap';

withDefaults(
  defineProps<{
    groomName: string;
    brideName: string;
    guestName: string;
    fontHeading?: string;
    fontBody?: string;
    coverImage?: string;
    isClosing?: boolean;
    isLoaded?: boolean;
  }>(),
  {
    coverImage:
      'https://media.mengundanganda.com/evergreen/hero%20section/dewirandi_003c89a6-d363-423d-83c4-2f34746fb0fb.webp',
  }
);

const emit = defineEmits<{
  (e: 'open'): void;
}>();

const coverRoot = ref<HTMLElement | null>(null);
const archViewport = ref<HTMLElement | null>(null);
const archText = ref<HTMLElement | null>(null);
const cardContainer = ref<HTMLElement | null>(null);
const cutoutOverlay = ref<HTMLElement | null>(null);
const bukaBtn = ref<HTMLElement | null>(null);
const ambientOverlay = ref<HTMLElement | null>(null);

// Refs for assets inside viewport
const cloudAsset = ref<HTMLElement | null>(null);
const tree1Asset = ref<HTMLElement | null>(null);
const tree2Asset = ref<HTMLElement | null>(null);
const gazeboAsset = ref<HTMLElement | null>(null);
const dahan1Asset = ref<HTMLElement | null>(null);
const dahan2Asset = ref<HTMLElement | null>(null);
const dahan3Asset = ref<HTMLElement | null>(null);

const isOpening = ref(false);

// Ref untuk asset cover section baru
const coverDekatAsset = ref<HTMLElement | null>(null);

// ============================================================
// KONTROL UKURAN & POSISI ASSET "cover dekat" — EDIT DI SINI
// ============================================================
const coverDekatStyle = {
  position: 'absolute',
  top: '40px',          // jarak dari atas layar (sama dgn viewport arch)
  left: '50%',           // tengah horizontal
  transform: 'translateX(-50%)',
  width: '350px',        // lebar (sama dgn viewport arch)
  height: '520px',       // tinggi (sama dgn viewport arch)
  zIndex: 3,             // 1=di bawah layer putih, 3=di atasnya
  opacity: 1,            // 0..1
  pointerEvents: 'none',
} as const;

const bukaAmplop = () => {
  if (isOpening.value) return;
  isOpening.value = true;

  // Bekukan semua animasi CSS Hero (awan drift, ayunan dahan, daun jatuh)
  // sejak Hero dimount, supaya posisinya "nempel" persis di titik 0% yang
  // sama dengan posisi akhir aset cover → tidak ada cloud dobel saat crossfade.
  document.documentElement.classList.add('evergreen-hero-frozen');

  // Emit 'open' immediately so Hero mounts directly underneath the cover
  emit('open');

  const tl = gsap.timeline();

  // Samakan batas max-width aset dengan yang dipakai Hero, agar saat membesar
  // mereka "mendarat" di ukuran final yang identik (penting untuk crossfade mulus)
  gsap.set(cloudAsset.value, { maxWidth: '90vw' });
  gsap.set([tree1Asset.value, tree2Asset.value].filter(Boolean), { maxWidth: '450px' });
  gsap.set(gazeboAsset.value, { maxWidth: '420px' });

  // Step 0: Subtle button press feedback
  tl.to(bukaBtn.value, {
    scale: 0.94,
    opacity: 0.6,
    duration: 0.16,
    ease: 'power2.out',
  });

  // Step 1: Teks di atas gambar, konten bawah, & asset cover dekat fade out
  tl.to(
    [archText.value, cardContainer.value, coverDekatAsset.value].filter(Boolean),
    { opacity: 0, duration: 0.45, ease: 'power2.out' },
    0.1
  );

  // Step 2: Hilangkan layer putih (ambient overlay) di atas gambar viewport agar warna gambar aslinya keluar penuh
  tl.to(ambientOverlay.value, {
    opacity: 0,
    duration: 0.45,
    ease: 'power2.out',
  }, 0.35);

  // Step 3: Container putih pembatas (cutoutOverlay) & viewport arch membesar secara serentak ke dimensi layar 100%
  // (Sehingga area oval melebar ke samping memenuhi layar, seolah container putih luar menyempit dan menghilang)
  // Background image yang memakai background-size: cover akan melebar alami dan berhenti membesar tepat di ukuran penuh/hero
  tl.to([archViewport.value, cutoutOverlay.value].filter(Boolean), {
    top: 0,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    duration: 1.35,
    ease: 'power2.inOut',
  }, 0.55);

  // Animasi setiap asset dekorasi ke posisi & ukuran persis seperti di Hero
  tl.to(cloudAsset.value, {
    top: "15px",
    left: "0px",
    width: "380px",
    opacity: 0.8,
    duration: 1.35,
    ease: 'power2.inOut',
  }, 0.55);

  tl.to(tree1Asset.value, {
    top: "50%",
    left: "75%",
    width: "70%",
    duration: 1.35,
    ease: 'power2.inOut',
  }, 0.55);

  tl.to(tree2Asset.value, {
    top: "50%",
    left: "80%",
    width: "50%",
    duration: 1.35,
    ease: 'power2.inOut',
  }, 0.55);

  tl.to(gazeboAsset.value, {
    top: "56%",
    left: "93%",
    width: "100%",
    duration: 1.35,
    ease: 'power2.inOut',
  }, 0.55);

  tl.to(dahan1Asset.value, {
    top: "-50px",
    right: "-160px",
    width: "120%",
    duration: 1.35,
    ease: 'power2.inOut',
  }, 0.55);

  tl.to(dahan2Asset.value, {
    top: "60px",
    right: "-50px",
    width: "75%",
    duration: 1.35,
    ease: 'power2.inOut',
  }, 0.55);

  tl.to(dahan3Asset.value, {
    top: "140px",
    right: "-70px",
    width: "70%",
    duration: 1.35,
    ease: 'power2.inOut',
  }, 0.55);

  // Step 4: SEMUA aset cover sudah tiba di posisi final yang persis sama
  // dengan Hero (±1.9s) → langsung crossfade: seluruh cover fade out
  // menembus Hero yang sudah ter-mount di bawahnya. TANPA flash putih.
  tl.to(coverRoot.value, {
    opacity: 0,
    duration: 0.65,
    ease: 'power2.inOut',
  }, 1.95);

  // Step 5: Lepas freeze tepat saat cover nyaris hilang → animasi Hero
  // (awan melayang, dahan bergoyang, daun jatuh) langsung berjalan mulus.
  tl.call(() => {
    document.documentElement.classList.remove('evergreen-hero-frozen');
  }, undefined, 2.4);
};
</script>

<style>
/* Animasi/style custom bisa ditambahkan di sini jika dibutuhkan */
</style>
