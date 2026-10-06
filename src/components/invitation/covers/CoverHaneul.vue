<template>
  <!-- ============================================================
    COVER HANEUL — semua styling pakai CSS INLINE (style="...")
    Cara ngotak-ngatik:
    - Ukuran font / jarak / warna / bentuk: ubah langsung angka
      di style="..." tiap elemen di bawah (sudah dikasih label).
    - Pindah posisi vertikal: potong-tempel blok elemennya
      (mis. <img> foto) ke atas / bawah dalam file ini.
    - Geser kiri-kanan: tambah "align-self:flex-start;" (kiri)
      atau "align-self:flex-end;" (kanan) di style elemennya.
    - Efek hover & animasi glow saja yang wajib di <style> bawah
      (tidak bisa inline), selebihnya semua inline.
    ============================================================ -->
  <div
    ref="coverRoot"
    style="position:fixed; inset:0; z-index:50; display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; height:100dvh; overflow:hidden; user-select:none; box-sizing:border-box; padding:3dvh 5vw; background:#F4EDE0; transition:opacity 1s ease-in-out;"
    :style="{
      fontFamily: fontBody || `'Plus Jakarta Sans', sans-serif`,
      opacity: isClosing ? 0 : 1,
      pointerEvents: isClosing ? 'none' : 'auto',
    }"
  >

    <!-- DEKORASI CORNER KIRI ATAS (nempel top-0 left-0.
         Ubah: ukuran=width (relatif, otomatis menyesuaikan HP kecil/besar).
         Pindah sudut: ubah "top:0; left:0;" mis. jadi top/right/bottom/left.
         Lapisan: ubah "z-index:20;" (makin gede = makin di depan). -->
    <img
      src="https://media.mengundanganda.com/haneul/cover%20section/dewirandi_63e451ec-6f25-4bb9-893a-2a79f9d134ea.webp"
      alt="Dekorasi Corner"
      style="position:absolute; top:0; left:0; z-index:20; width:min(48vw,210px); height:auto; display:block; pointer-events:none;"
    />

    <!-- DEKORASI CORNER KANAN ATAS (mirror horizontal dari kiri atas) -->
    <img
      src="https://media.mengundanganda.com/haneul/cover%20section/dewirandi_63e451ec-6f25-4bb9-893a-2a79f9d134ea.webp"
      alt="Dekorasi Corner"
      style="position:absolute; top:0; right:0; z-index:20; width:min(48vw,210px); height:auto; display:block; pointer-events:none; transform:scaleX(-1);"
    />

    <!-- DEKORASI CORNER KIRI BAWAH (mirror vertikal dari kiri atas) -->
    <img
      src="https://media.mengundanganda.com/haneul/cover%20section/dewirandi_63e451ec-6f25-4bb9-893a-2a79f9d134ea.webp"
      alt="Dekorasi Corner"
      style="position:absolute; bottom:0; left:0; z-index:20; width:min(48vw,210px); height:auto; display:block; pointer-events:none; transform:scaleY(-1);"
    />

    <!-- DEKORASI CORNER KANAN BAWAH (mirror horizontal + vertikal) -->
    <img
      src="https://media.mengundanganda.com/haneul/cover%20section/dewirandi_63e451ec-6f25-4bb9-893a-2a79f9d134ea.webp"
      alt="Dekorasi Corner"
      style="position:absolute; bottom:0; right:0; z-index:20; width:min(48vw,210px); height:auto; display:block; pointer-events:none; transform:scale(-1,-1);"
    />

    <!-- CONTAINER PIL (ubah: tinggi=height | lebar=width | warna=background | bentuk=border-radius) -->
    <div
      ref="centerCardRef"
      style="position:relative; z-index:10; display:flex; flex-direction:column; align-items:center; justify-content:flex-start; text-align:center; gap:1.2dvh; width:min(86vw,22rem); height:66dvh; padding:7dvh 6vw 3.5dvh; border-radius:9999px; overflow:hidden; background:#95a987; border:6px solid #95a987; box-shadow:0 20px 50px rgba(70,90,65,0.28); box-sizing:border-box;"
    >
      <!-- LABEL THE WEDDING OF (di tengah atas container, di atas nama mempelai.
           Ubah: ukuran=font-size | warna=color | jarak huruf=letter-spacing) -->
      <p
        :style="{ fontFamily: `'Cormorant Garamond', serif` }"
        style="position:relative; z-index:1; margin:-1dvh 0 0 0; text-align:center; font-size:clamp(0.72rem,3.6vw,0.9rem); letter-spacing:0.35em; text-indent:0.35em; color:#F4EDE0; font-weight:500; text-decoration:underline; text-underline-offset:5px; text-decoration-thickness:1px; padding-bottom:5px;"
      >
        THE WEDDING OF
      </p>
      <!-- NAMA MEMPELAI (tidak bold, medium saja. z-index:1 = di bawah gambar.
           Ubah: ukuran=font-size | warna=color | ketebalan=font-weight | bayangan=text-shadow.
           Baris atas margin kanannya lebih besar dari baris bawah
           karena pil melengkung (atas lebih menjorok ke dalam).) -->
      <h1
        :style="{ fontFamily: `'Great Vibes', cursive` }"
        style="position:relative; z-index:1; margin:0; align-self:stretch; text-align:right; font-size:clamp(2.5rem,14vw,4rem); color:#F4EDE0; font-weight:400; line-height:1.15; -webkit-text-stroke:0.7px #486B5C; paint-order:stroke fill; text-shadow:0 1px 6px rgba(28,42,36,0.35);"
      >
        <span style="display:block; margin-right:clamp(1.5rem,8vw,3rem);">{{ groomName }} <span style="font-size:clamp(1.5rem,8vw,2.4rem);">&amp;</span></span>
        <span style="display:block; margin-right:clamp(0.5rem,3vw,1rem);">{{ brideName }}</span>
      </h1>

      <!-- GARIS DIVIDER (ubah: lebar=width | warna ganti #7DA8CC) -->
      <div style="width:clamp(3.5rem,18vw,5rem); height:1.5px; background:linear-gradient(to right, transparent, #7DA8CC, transparent);"></div>

      <!-- FOTO di dalam container, menempel ke bawah container.
           Ukuran RELATIF terhadap TINGGI pil (height:%) supaya proporsional
           di semua HP — jangan pakai vw/dvh atau width + max-height
           (kombinasi itu bikin foto gepeng / kebesaran di HP kecil).
           - height 144% ≈ tinggi 800px saat pil 66dvh di HP 390x844
             (hasil sama seperti sebelumnya di HP mid-large).
           - width:auto → lebar ngikutin rasio asli 3:4, tidak gepeng.
           - bottom -62% ≈ -41dvh saat pil 66dvh.
           - TANPA max-height / max-width apapun. Jangan ditambah!
           HP kecil → pil pendek → foto otomatis mengecil & tetap
           di dalam pil (tidak nyundul ke atas).
           Naik-turun: ubah "bottom" (makin minus = makin turun).
           Kiri-kanan: ubah "+ 2.35%" (makin gede = makin ke kanan).
           Besar-kecil: ubah "height" (mis. 130% = lebih kecil).
           PENTING: "max-width:none;" wajib ada — tanpanya gambar dikunci
           selebar container oleh aturan global img { max-width:100% }.
           Jangan dihapus! -->
      <img
        src="https://media.mengundanganda.com/haneul/cover%20section/dewirandi_673e323c-ced2-46a8-a84b-2d7b6010060a.webp"
        alt="Foto Mempelai"
        class="haneul-cover-photo"
        style="position:absolute; z-index:2; bottom:-62%; left:50%; transform:translateX(calc(-50% + 2.35%)); height:144%; width:auto; max-width:none; display:block;"
      />
    </div>

    <!-- TEKS TAMU — tanpa container, di atas tombol -->
    <div style="position:relative; z-index:10; margin-top:2.5dvh; text-align:center; padding:0 5vw;">
      <p style="margin:0 0 0.4dvh 0; font-size:clamp(0.55rem,2.6vw,0.65rem); letter-spacing:0.22em; text-indent:0.22em; text-transform:uppercase; color:#8A9B7E; font-weight:500;">
        Kepada Yth. Bapak/Ibu/Saudara/i
      </p>
      <p style="margin:0; font-family:'Cormorant Garamond', serif; font-size:clamp(0.95rem,4.2vw,1.1rem); font-weight:700; color:#3E5648; letter-spacing:0.03em; line-height:1.2; overflow-wrap:break-word;">
        {{ guestName || "Tamu Undangan" }}
      </p>
    </div>

    <!-- TOMBOL -->
    <div ref="bottomBtnRef" style="position:relative; z-index:10; margin-top:1.2dvh; display:flex; flex-direction:column; align-items:center;">
      <button
        ref="bukaBtnRef"
        @click="handleOpen"
        :disabled="isOpening"
        class="haneul-open-btn"
        style="position:relative; display:inline-flex; align-items:center; gap:clamp(0.5rem,2.5vw,0.75rem); padding:2dvh 8vw; border-radius:9999px; border:none; background:linear-gradient(to right, #486B5C, #5D8373, #486B5C); color:#fff; font-size:clamp(0.72rem,3.4vw,0.875rem); font-weight:600; letter-spacing:0.05em; text-transform:uppercase; box-shadow:0 10px 25px rgba(72,107,92,0.4); cursor:pointer; transition:transform 0.3s, box-shadow 0.3s;"
      >
        <!-- GLOW TOMBOL (ubah: warna=background | redup-terang=opacity di keyframes bawah) -->
        <span class="haneul-btn-glow" style="position:absolute; inset:-3px; border-radius:9999px; background:linear-gradient(90deg, #A8C8E8, #E2C285, #A8C8E8); opacity:0.4; z-index:-1; filter:blur(8px); animation:pulseGlow 3s ease-in-out infinite;"></span>

        <!-- IKON AMPLOP (ubah: ukuran=width/height | warna=color) -->
        <svg style="width:clamp(0.9rem,4vw,1rem); height:clamp(0.9rem,4vw,1rem); color:#F9C5D5; transition:transform 0.3s;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span>{{ isOpening ? 'Membuka...' : 'Buka Undangan' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { gsap } from "gsap";

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
    guestName: "",
  }
);

const emit = defineEmits<{
  (e: "open"): void;
}>();

const coverRoot = ref<HTMLElement | null>(null);
const centerCardRef = ref<HTMLElement | null>(null);
const bottomBtnRef = ref<HTMLElement | null>(null);
const bukaBtnRef = ref<HTMLElement | null>(null);

const isOpening = ref(false);

const handleOpen = () => {
  if (isOpening.value) return;
  isOpening.value = true;

  // Sound and opening trigger in parent
  emit("open");

  // Visual feedback & exit transition
  const tl = gsap.timeline();

  tl.to(bukaBtnRef.value, {
    scale: 0.92,
    opacity: 0.7,
    duration: 0.15,
    ease: "power2.out",
  });

  tl.to(bottomBtnRef.value, {
    opacity: 0,
    y: 20,
    duration: 0.45,
    ease: "power2.in",
  }, 0.1);

  tl.to(centerCardRef.value, {
    scale: 1.05,
    opacity: 0,
    duration: 0.65,
    ease: "power2.inOut",
  }, 0.2);

  tl.to(coverRoot.value, {
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut",
  }, 0.6);
};
</script>

<style scoped>
/* Efek hover tombol (hover tidak bisa ditulis inline, jadi di sini.
   Ubah: membesar=scale | bayangan=box-shadow) */
.haneul-open-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 14px 30px rgba(72, 107, 92, 0.45);
}
.haneul-open-btn:active {
  transform: scale(0.95);
}
.haneul-open-btn:hover svg {
  transform: scale(1.1);
}

/* Animasi glow tombol (keyframes wajib di sini, tidak bisa inline.
   Ubah: redup-terang=opacity | membesar-mengecil=scale) */
@keyframes pulseGlow {
  0%, 100% { opacity: 0.3; transform: scale(0.98); }
  50% { opacity: 0.7; transform: scale(1.04); }
}

/* HP kecil (≤380px): foto diturunkan — makin minus = makin turun.
   !important wajib karena posisi dasar ditulis inline. */
@media (max-width: 380px) {
  .haneul-cover-photo {
    bottom: -74% !important;
  }
}
</style>
