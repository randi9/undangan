<template>
  <section
    ref="coupleSection"
    class="relative isolate h-[100dvh] bg-[#aed4da] flex flex-col items-center justify-center text-center w-full overflow-hidden"
  >
    <!-- KANVAS UTUH (wrapper): membungkus background utama couple + ASET
         LATAR TAMBAHAN yang "menempel" padanya. Seluruh transform GSAP
         (geser slide, zoom, pergeseran fase countdown) menyasar WRAPPER ini,
         jadi aset tambahan selalu ikut bergerak & posisinya relatif terhadap
         gambar utama TETAP — termasuk saat pindah ke section countdown
         (hanya gambar utama yang fade-out, aset tambahan tetap tampil,
         dan saat fase countdown wrapper diturunkan ke z-index:-2 sehingga
         seluruh kanvas — termasuk aset ini — berada di PALING BELAKANG,
         di bawah jam & aset countdown).
         CSS awal 200%x100% object-cover hanya untuk render pertama; saat
         setup, JS mengubah ukuran wrapper jadi KANVAS UTUH sesuai rasio asli
         gambar — tidak ada bagian yang kepotong, viewport cuma jendela. -->
    <div
      ref="canvasWrapRef"
      style="
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 100%;
        z-index: 1;
        pointer-events: none;
      "
    >
      <img
        ref="bgImageRef"
        src="https://media.mengundanganda.com/royalfantasy/couple%20section/dewirandi_ed705207-88fe-479e-9a91-d35d9043817d.webp"
        alt="bg"
        style="
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          max-width: none;
          object-fit: cover;
          z-index: 1; /* di atas aset latar tambahan */
        "
      />

      <!-- ============================================================
           ASET LATAR TAMBAHAN — MENEMPEL DI GAMBAR UTAMA
           Semua koordinat RELATIF TERHADAP KANVAS (gambar utama),
           bukan layar. Jadi kalau gambar utama digeser/zoom, aset ini
           ikut nempel persis di posisinya, juga saat fase countdown.
           Z-INDEX: z-index:0 = PALING BAWAH di dalam kanvas (di belakang
           gambar utama, hanya terlihat lewat area transparan gambar
           utama). Mau ditaruh di atas gambar utama? naikkan jadi 2.
           CATATAN: saat memasuki fase countdown, JS menurunkan SELURUH
           wrapper kanvas ke z-index:-2 — di bawah jam (z:-1) & aset
           countdown (z:0) — jadi di section countdown pun latar ini tetap
           berada di paling belakang. Scroll balik ke couple phase? naik
           lagi otomatis ke z:1. Urutan layer section: latar ini (-2) →
           jam (-1) → aset countdown (0) → gambar utama (dalam wrapper) →
           overlay/kartu (5+).
           CARA OTAK-ATIK:
           - Geser     : ubah left & top (persen terhadap ukuran kanvas).
                         0% 0% = pojok kiri-atas gambar utama.
           - Tengah    : left:50% + translateX(-50%) → biarkan.
           - Naik/turun: kecilkan/besarkan top.
           - Ukuran    : ubah height (persen dari tinggi kanvas).
                         width:auto menjaga rasio asli gambar.
                         Mau berdasarkan lebar? tukar: width:30%; height:auto.
           ============================================================ -->
      <img
        src="https://media.mengundanganda.com/royalfantasy/countdown%20section/dewirandi_3d0caf40-f0a4-473f-bc4f-48cc6a21e796.webp"
        alt=""
        style="
          position: absolute;
          left: 50%;
          top: 5%;
          transform: translateX(-50%);
          height: 75%;
          width: auto;
          max-width: none;
          opacity: 0.5;
          z-index: 0; /* paling bawah: di belakang gambar utama */
        "
      />
    </div>

    <!-- Thin white veil over background (very low opacity), fades out on scroll
         bersama header agar tidak menimpa aset countdown -->
    <div
      ref="whiteOverlayRef"
      style="
        position: absolute;
        inset: 0;
        background-color: rgba(255, 255, 255, 0.15);
        z-index: 5;
        pointer-events: none;
      "
    ></div>

    <!-- Header Text — di tengah layar, di atas kabut oval horizontal.
         Fog dirender div tersendiri di BELAKANG teks (tepi memudar via
         mask radial → menyatu dengan background), jadi teks tetap tajam.
         GSAP memudarkan seluruh wrapper ini (fog + teks) saat scroll. -->
    <!-- ===== KOTAK TEKS (headerRef — dipakai GSAP, JANGAN hapus ref) =====
         TENGAH LAYAR : top 50% + left 50% + translate -50% -50% = pas tengah.
                        Geser NAIK  : kecilkan top (mis. 45%).
                        Geser TURUN : besarkan top (mis. 55%).
                        Geser KIRI/KANAN : ubah left (50% = tengah).
         LEBAR        : width 94% dari layar; max-width 560px = batas maksimal
                        di layar besar. Kecilkan max-width biar kolom teks menyempit. -->
    <div
      ref="headerRef"
      style="position: absolute; top: 50%; left: 50%; translate: -50% -50%; z-index: 10; width: 94%; max-width: 560px;"
    >
      <!-- ===== KABUT OVAL (di belakang teks) =====
           TINGGI/LEBAR KABUT : dua angka di "inset" = (atas-bawah) (kiri-kanan).
                        Makin negatif makin melebar. Contoh: -120% -60%.
           KEPUTIHAN          : angka alpha di background (0 transparan – 1 solid).
                        Contoh: 0.95 = hampir solid, 0.7 = lebih tipis.
           KEPUDARAN TEPI     : dua persen di mask-image. Persen pertama = zona
                        putih solid tengah; persen kedua = titik hilang total.
                        Contoh: black 5%, transparent 80% = pudar sangat bertahap. -->
      <div
        aria-hidden="true"
        style="
          position: absolute;
          inset: -100% -80%;
          background: rgba(255, 255, 255, 0.92);
          border-radius: 50%;
          -webkit-mask-image: radial-gradient(ellipse at center, black 12%, transparent 72%);
          mask-image: radial-gradient(ellipse at center, black 12%, transparent 72%);
          pointer-events: none;
        "
      ></div>
      <!-- ===== ISI TEKS =====
           RUANG DALAM : padding (atas-bawah 28px, kiri-kanan 32px).
                         Besarkan biar teks tidak mepet kabut. -->
      <div style="position: relative; padding: 28px 32px; text-align: center;">
        <!-- ===== ORNAMEN ATAS =====
             LEBAR            : ganti angka width (px). max-width 65% = tidak
                                boleh lebih lebar dari 65% kotak teks.
             TENGAH/KIRI/KANAN: "margin: 0 auto ..." = tengah. Rata kiri:
                                "margin: 0 auto 16px 0". Rata kanan:
                                "margin: 0 0 16px auto".
             JARAK KE JUDUL   : angka 16px di margin (bawah ornamen).
             NAIK/TURUN       : tambah "position: relative; top: -10px" (naik)
                                atau "top: 10px" (turun). -->
        <img
          src="https://media.mengundanganda.com/royalfantasy/couple%20section/dewirandi_511c7bc5-f397-4cc0-820e-97761d953707%20(1).webp"
          alt=""
          style="display: block; position: relative; top: 14px; width: 340px; max-width: 90%; height: auto; margin: 0 auto 16px auto; pointer-events: none;"
        />
        <!-- ===== JUDUL "Pasangan Mempelai" =====
             UKURAN HURUF     : tiga angka di clamp(MIN, FLEKSIBEL, MAX).
                                MIN 19px = paling kecil di HP; MAX 28px = di
                                layar besar; 5.8vw = mengikuti lebar layar.
                                "white-space: nowrap" = paksa 1 baris, JANGAN hapus.
             TEBAL            : font-weight (400 normal, 500 medium, 700 bold).
             JARAK KE ORNAMEN BAWAH : margin judul 0 = mepet. Jarak diatur dari
                                margin ornamen bawah (16px di margin-nya). -->
        <h2
          style="margin: 0; font-family: 'Cinzel Decorative', 'Playfair Display', serif; font-weight: 500; font-size: clamp(19px, 5.8vw, 28px); white-space: nowrap; letter-spacing: 0.05em; color: #243029; text-shadow: 0 3px 14px rgba(36, 48, 41, 0.3);"
        >
          Pasangan Mempelai
        </h2>
        <!-- ===== ORNAMEN BAWAH (cermin ornamen atas) =====
             Pengaturan SAMA seperti ornamen atas (width, margin, top).
             "transform: scaleY(-1)" = cermin atas-bawah. JANGAN hapus baris
             itu kalau mau tetap mirror. -->
        <img
          src="https://media.mengundanganda.com/royalfantasy/couple%20section/dewirandi_511c7bc5-f397-4cc0-820e-97761d953707%20(1).webp"
          alt=""
          style="display: block; width: 180px; max-width: 60%; height: auto; margin: 16px auto 0 auto; transform: scaleY(-1); pointer-events: none;"
        />
      </div>
    </div>

    <!-- ===== INFO GROOM — container = gambar frame (bukan kartu putih) =====
         POSISI       : top 50% + left 50% + "translate: -50% -50%" = pas tengah
                        layar horizontal & vertikal. (Pakai properti "translate",
                        BUKAN "transform", supaya tidak ketimpa animasi GSAP.)
                        Geser: ubah top/left.
         UKURAN FRAME : ganti angka width (px). max-width 92vw = tidak lebih
                        lebar dari layar HP. height auto = ikut rasio asli.
         ref="groomRef" dipakai GSAP (fade/scale saat scroll) — JANGAN hapus. -->
    <!-- ===== OVERLAY GELAP INFO GROOM =====
         Muncul saat kartu groom tampil (layar jadi agak gelap supaya frame
         menonjol), hilang bareng fade-out kartu groom (diatur di timeline).
         KEGELAPAN : angka alpha di background (0 transparan – 1 hitam pekat).
                     Contoh: 0.35 = samar, 0.65 = gelap.
         z-index 15 = di ATAS background & veil putih, di BAWAH frame (z 20). -->
    <div
      ref="groomVeilRef"
      style="
        position: absolute;
        inset: 0;
        background: rgba(24, 32, 27, 0.5);
        z-index: 15;
        opacity: 0;
        pointer-events: none;
      "
    >
      <!-- ===== BLING-BLING GROOM: sparkle cenit-cenit acak =====
           Hidup/mati & pindah posisi diatur di script (startSparkles).
           left/top di bawah cuma TITIK MULAI — nanti pindah sendiri. -->
      <span
        v-for="s in groomSparkles"
        :key="'groom-' + s.id"
        class="rf-sparkle"
        :style="{ position: 'absolute', left: s.x + '%', top: s.y + '%', width: s.size + 'px', height: s.size + 'px', opacity: 0, pointerEvents: 'none' }"
      >
        <svg viewBox="0 0 24 24" style="display: block; width: 100%; height: 100%; overflow: visible;">
          <path
            :fill="s.color"
            d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"
            style="filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.9));"
          />
        </svg>
      </span>
    </div>
    <div
      ref="groomRef"
      style="
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        width: 340px;
        max-width: 92vw;
        z-index: 20;
        opacity: 0;
        pointer-events: none;
      "
    >
      <!-- gambar frame sebagai wadah -->
      <img
        src="https://media.mengundanganda.com/royalfantasy/couple%20section/dewirandi_1ecf7fbb-a059-4ed1-a72f-79df06749b44.webp"
        alt=""
        style="display: block; width: 100%; height: auto; pointer-events: none;"
      />
      <!-- ISI TEKS — menempel di tengah frame.
           POSISI ISI : inset 0 + flex center = pas tengah frame.
                        Geser isi ke BAWAH : tambah "padding-top: 20px".
                        Geser isi ke ATAS  : tambah "padding-bottom: 20px".
           RUANG TEPI : padding 12% (atas-bawah) 14% (kiri-kanan) biar teks
                        tidak keluar dari bingkai frame. -->
      <div
        class="text-center"
        style="
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20% 13% 10%;
          gap: 0;
        "
      >
        <img
          v-if="invitation.groom_photo"
          :src="resolveUrl(invitation.groom_photo)"
          :alt="invitation.groom_name"
          class="object-cover rounded-full mx-auto border-2 border-white/80 shadow-md"
          style="width: 76px; height: 76px; margin-bottom: 10px;"
        />
        <h3
          :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
          style="margin: 0 0 4px 0; font-weight: 700; font-size: clamp(22px, 6.4vw, 30px); line-height: 1.2; letter-spacing: 0.04em; color: #243029;"
        >
          {{ invitation.groom_name }}
        </h3>
        <p style="margin: 0 0 10px 0; font-size: 12.5px; font-weight: 500; letter-spacing: 0.08em; color: #5a6b60; line-height: 1.5;">
          {{ invitation.groom_full_name || invitation.groom_name }}
        </p>
        <div style="width: 44px; height: 1.5px; background: linear-gradient(90deg, transparent, #b0808a, transparent); margin: 0 0 10px 0;"></div>
        <p style="margin: 0; font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #8a9a90; line-height: 1.6;">
          Putra tercinta dari
        </p>
        <p style="margin: 4px 0 0 0; font-size: 13.5px; font-weight: 700; color: #243029; line-height: 1.7;">
          {{ invitation.groom_father }}<br />
          <span style="font-weight: 400; font-style: italic; font-size: 12px; color: #b0808a;">&amp;</span><br />
          {{ invitation.groom_mother }}
        </p>
        <p
          v-if="invitation.groom_origin"
          style="margin: 8px 0 0 0; display: inline-flex; align-items: center; justify-content: center; gap: 5px; background: none; border: none; padding: 0; color: #6b7d72; font-size: 12px; font-weight: 500; font-style: italic; letter-spacing: 0.04em; line-height: 1.5;"
        >
          <Icon icon="ph:map-pin-duotone" style="width: 13px; height: 13px; flex-shrink: 0; color: #b0808a;" />
          {{ invitation.groom_origin }}
        </p>
      </div>
    </div>

    <!-- ===== INFO BRIDE — container = gambar frame (bukan kartu putih) =====
         POSISI       : top 50% + left 50%, penengahannya via xPercent/yPercent
                        GSAP (di setupAnimation) — dijamin tidak ketimpa animasi
                        scale/y. Geser manual: ubah top/left.
         UKURAN FRAME : ganti angka width (px). max-width 92vw = tidak lebih
                        lebar dari layar HP. height auto = ikut rasio asli.
         ref="brideRef" dipakai GSAP (fade/scale saat scroll) — JANGAN hapus. -->
    <!-- ===== OVERLAY GELAP INFO BRIDE =====
         Muncul saat kartu bride tampil, hilang bareng fade-out-nya.
         KEGELAPAN : angka alpha di background (0 transparan – 1 hitam pekat). -->
    <div
      ref="brideVeilRef"
      style="
        position: absolute;
        inset: 0;
        background: rgba(24, 32, 27, 0.5);
        z-index: 15;
        opacity: 0;
        pointer-events: none;
      "
    >
      <!-- ===== BLING-BLING BRIDE: sparkle cenit-cenit acak =====
           Hidup/mati & pindah posisi diatur di script (startSparkles).
           left/top di bawah cuma TITIK MULAI — nanti pindah sendiri. -->
      <span
        v-for="s in brideSparkles"
        :key="'bride-' + s.id"
        class="rf-sparkle"
        :style="{ position: 'absolute', left: s.x + '%', top: s.y + '%', width: s.size + 'px', height: s.size + 'px', opacity: 0, pointerEvents: 'none' }"
      >
        <svg viewBox="0 0 24 24" style="display: block; width: 100%; height: 100%; overflow: visible;">
          <path
            :fill="s.color"
            d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"
            style="filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.9));"
          />
        </svg>
      </span>
    </div>
    <div
      ref="brideRef"
      style="
        position: absolute;
        top: 50%;
        left: 50%;
        width: 300px;
        max-width: 92vw;
        z-index: 20;
        opacity: 0;
        pointer-events: none;
      "
    >
      <!-- gambar frame sebagai wadah -->
      <img
        src="https://media.mengundanganda.com/royalfantasy/couple%20section/dewirandi_862ab3ae-ada6-47fe-91d8-ecb5a5670869.webp"
        alt=""
        style="display: block; width: 100%; height: auto; pointer-events: none;"
      />
      <!-- ISI TEKS — menempel di tengah frame.
           Geser isi ke BAWAH : tambah "padding-top: 20px".
           Geser isi ke ATAS  : tambah "padding-bottom: 20px". -->
      <div
        class="text-center"
        style="
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20% 13% 10%;
          gap: 0;
        "
      >
        <img
          v-if="invitation.bride_photo"
          :src="resolveUrl(invitation.bride_photo)"
          :alt="invitation.bride_name"
          class="object-cover rounded-full mx-auto border-2 border-white/80 shadow-md"
          style="width: 76px; height: 76px; margin-bottom: 10px;"
        />
        <h3
          :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
          style="margin: 0 0 4px 0; font-weight: 700; font-size: clamp(22px, 6.4vw, 30px); line-height: 1.2; letter-spacing: 0.04em; color: #243029;"
        >
          {{ invitation.bride_name }}
        </h3>
        <p style="margin: 0 0 10px 0; font-size: 12.5px; font-weight: 500; letter-spacing: 0.08em; color: #5a6b60; line-height: 1.5;">
          {{ invitation.bride_full_name || invitation.bride_name }}
        </p>
        <div style="width: 44px; height: 1.5px; background: linear-gradient(90deg, transparent, #b0808a, transparent); margin: 0 0 10px 0;"></div>
        <p style="margin: 0; font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #8a9a90; line-height: 1.6;">
          Putri tercinta dari
        </p>
        <p style="margin: 4px 0 0 0; font-size: 13.5px; font-weight: 700; color: #243029; line-height: 1.7;">
          {{ invitation.bride_father }}<br />
          <span style="font-weight: 400; font-style: italic; font-size: 12px; color: #b0808a;">&amp;</span><br />
          {{ invitation.bride_mother }}
        </p>
        <p
          v-if="invitation.bride_origin"
          style="margin: 8px 0 0 0; display: inline-flex; align-items: center; justify-content: center; gap: 5px; background: none; border: none; padding: 0; color: #6b7d72; font-size: 12px; font-weight: 500; font-style: italic; letter-spacing: 0.04em; line-height: 1.5;"
        >
          <Icon icon="ph:map-pin-duotone" style="width: 13px; height: 13px; flex-shrink: 0; color: #b0808a;" />
          {{ invitation.bride_origin }}
        </p>
      </div>
    </div>

    <!-- ============================================================
         ASET GAMBAR COUNTDOWN
         posisinya DI BELAKANG background couple (z:0 < z:1) — saat fase
         countdown, background di-fade-out sehingga aset inilah yang tersisa.
         CARA OTAK-ATIK:
         - Tengah horizontal : left:50% + translateX(-50%) → biarin.
           Rata kiri         : ganti left jadi 0, hapus transform.
           Rata kanan        : left:auto; right:0; hapus transform.
         - Naik/turun        : ubah top (0 = nempel atas, 10% = turun dikit).
         - Tinggi full viewport: height:100dvh + width:auto + max-width:none
           → tinggi selayar, lebar ikut rasio asli; kalau kelebaran, kiri-kanan
           kepotong rapi (efek "zoom"), TIDAK ketarik.
           Mau lebih kecil  : ganti 80dvh / 90dvh, dst.
         - Index              : z:0 → di bawah background (z:1) & semua kartu.
           Tidak perlu diubah kecuali mau aset di atas background.
         ============================================================ -->
    <img
      v-if="hasDate"
      ref="cdAssetRef"
      src="https://media.mengundanganda.com/royalfantasy/countdown%20section/dewirandi_b3591fea-40d4-4a05-a587-c1def48a9acb.webp"
      alt=""
      style="
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 100dvh;
        width: auto;
        max-width: none; /* WAJIB: tanpa ini max-width:100% dari Tailwind
                            membuat gambar ketarik saat aslinya lebih lebar
                            dari layar. Dengan none → rasio asli terjaga,
                            bagian kiri/kanan yang berlebih ter-crop (zoom). */
        z-index: 0;
        pointer-events: none;
        opacity: 0;
      "
    />

    <!-- ============================================================
          ASET COUNTDOWN — "JAM" (SATU-SATUNYA, TENGAH) + JARUM SVG
          Layer z-index:-1 — di bawah aset countdown (z:0), di atas
          kanvas couple.
          Wrapper ini = ACUAN POSISI JARUM: jarum diukur PERSEN
          terhadap kotak gambar jam, jadi kalau gambar jam digeser
          atau diubah ukurannya, jarum otomatis ikut nempel.
          CARA OTAK-ATIK:
          - Jam di layar   : ubah top pada wrapper (25% = saat ini).
                             Tengah horizontal: left:50% +
                             translateX(-50%) → biarkan keduanya.
          - Ukuran jam     : ubah height pada <img> jam (70dvh ≈ 70%
                             tinggi layar).
          - Pusat jarum    : geser left/top pada <img> jarum
                             (50%/50% = tengah gambar; samakan dengan
                             titik poros yang ada di ilustrasi jam).
          - Besar jarum    : ubah width pada <img> jarum (persen dari
                             lebar gambar jam).
          Bentuk/warna/kecepatan jarum : edit file
          public/images/clock-hands.svg (jarum sudah berputar sendiri
          via SMIL: menit 4s/putaran, jam 12s/putaran — disengaja
          dipercepat agar terlihat di preview).
          CATATAN: JANGAN mengubah xPercent/x wrapper lewat GSAP —
          inline translateX(-50%) di atas yang membuat jam tengah,
          biarkan animasi hanya menyentuh opacity & scale.
          ============================================================ -->
    <div
      v-if="hasDate"
      ref="cdAsset2Ref"
      style="
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translateX(-50%);
        z-index: -1;
        pointer-events: none;
      "
    >
      <!-- gambar jam (acuan ukuran & posisi jarum) -->
      <img
        src="https://media.mengundanganda.com/royalfantasy/countdown%20section/dewirandi_56f18bc4-e860-4aa4-bd3c-95594b5d2697.webp"
        alt=""
        style="
          display: block;
          height: 70dvh;
          width: auto;
          max-width: none;
          opacity: 0.9;
        "
      />
      <!-- jarum jam SVG — menempel pada gambar jam, bukan viewport.
           scaleX(-1) = cermin horizontal → arah putar jarum terlihat
           BERLAWANAN dengan jarum jam (ke kiri). Hapus scaleX(-1)
           untuk kembali searah jarum jam. -->
      <img
        src="/images/clock-hands.svg"
        alt=""
        style="
          position: absolute;
          left: 50%;
          top: 50%;
          width: 40%;
          transform: translate(-50%, -50%) scaleX(-1);
        "
      />
    </div>

    <!-- Countdown Foggy Card — GABUNGAN section countdown: muncul setelah
         gambar slide ke tengah lalu zoom ke bagian tengah-atasnya -->
    <div
      v-if="hasDate"
      ref="cdRef"
      class="absolute z-20 w-[90%] max-w-sm px-6 py-6 rounded-3xl text-slate-900 text-center shadow-2xl"
      style="
        background: rgba(255, 255, 255, 0.75);
        backdrop-filter: blur(12px) saturate(180%);
        -webkit-backdrop-filter: blur(12px) saturate(180%);
        border: 1px solid rgba(255, 255, 255, 0.6);
        box-shadow: 0 12px 32px rgba(31, 38, 135, 0.15);
        top: 32%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        pointer-events: none;
      "
    >
      <span class="text-[10px] uppercase tracking-[0.35em] text-[#B0808A] font-semibold block mb-1">Save The Date</span>
      <h3
        class="text-xl sm:text-2xl font-bold text-slate-900 mb-4"
        :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
      >
        Menghitung Hari
      </h3>

      <div class="grid grid-cols-4 gap-2">
        <div class="flex flex-col items-center py-3 px-1 rounded-2xl border border-[#708478]/50 bg-[#243029]/85">
          <span class="text-lg sm:text-2xl font-bold text-[#ECE0D3]">{{ padZero(countdown?.days ?? 0) }}</span>
          <span class="text-[9px] md:text-[10px] uppercase tracking-widest text-[#D4A6AD] mt-1 font-medium">Hari</span>
        </div>
        <div class="flex flex-col items-center py-3 px-1 rounded-2xl border border-[#708478]/50 bg-[#243029]/85">
          <span class="text-lg sm:text-2xl font-bold text-[#ECE0D3]">{{ padZero(countdown?.hours ?? 0) }}</span>
          <span class="text-[9px] md:text-[10px] uppercase tracking-widest text-[#D4A6AD] mt-1 font-medium">Jam</span>
        </div>
        <div class="flex flex-col items-center py-3 px-1 rounded-2xl border border-[#708478]/50 bg-[#243029]/85">
          <span class="text-lg sm:text-2xl font-bold text-[#ECE0D3]">{{ padZero(countdown?.minutes ?? 0) }}</span>
          <span class="text-[9px] md:text-[10px] uppercase tracking-widest text-[#D4A6AD] mt-1 font-medium">Menit</span>
        </div>
        <div class="flex flex-col items-center py-3 px-1 rounded-2xl border border-[#708478]/50 bg-[#243029]/85">
          <span class="text-lg sm:text-2xl font-bold text-[#ECE0D3]">{{ padZero(countdown?.seconds ?? 0) }}</span>
          <span class="text-[9px] md:text-[10px] uppercase tracking-widest text-[#D4A6AD] mt-1 font-medium">Detik</span>
        </div>
      </div>

      <a
        v-if="invitation && (invitation.akad_date || invitation.resepsi_date)"
        :href="getCalendarUrl()"
        target="_blank"
        class="inline-flex items-center gap-2 mt-5 px-6 py-2.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider text-[#18201B] bg-gradient-to-r from-[#D4A6AD] via-[#ECE0D3] to-[#D4A6AD] shadow-[0_4px_20px_rgba(212,166,173,0.35)] hover:scale-105 transition-transform duration-300"
      >
        <Icon icon="ph:calendar-plus-duotone" class="w-4 h-4 text-[#18201B]" />
        Simpan ke Google Calendar
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/vue';
import type { Invitation } from '@/types/invitation';
import type { ThemeConfig } from '@/types/theme';
import { resolveAssetUrl } from '@/utils/url';
import { generateGoogleCalendarUrl } from '@/utils/calendar';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
  apiBase?: string;
  countdown?: { days: number; hours: number; minutes: number; seconds: number };
  hasDate?: boolean;
}>();

const coupleSection = ref<HTMLElement | null>(null);
const canvasWrapRef = ref<HTMLElement | null>(null); // kanvas utuh: bg utama + aset nempel
const bgImageRef = ref<HTMLImageElement | null>(null);
const whiteOverlayRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const groomVeilRef = ref<HTMLElement | null>(null);
const groomRef = ref<HTMLElement | null>(null);
const brideVeilRef = ref<HTMLElement | null>(null);
const brideRef = ref<HTMLElement | null>(null);

// ===== BLING-BLING / SPARKLE di overlay groom & bride =====
// Sparkle dirender DI DALAM div veil, jadi otomatis ikut fade in/out
// ngikutin veil-nya (tidak perlu animasi scrub sendiri).
// JUMLAH    : ganti SPARKLE_COUNT (makin banyak makin rame).
// UKURAN    : rentang size di makeSparkles (px).
// KECEPATAN : durasi fade in/out di twinkleOne (makin kecil makin cepat).
// AREA ACAK : rentang persen posisi (3-97 = hampir seluruh layar).
interface Sparkle { id: number; x: number; y: number; size: number; color: string; }
const SPARKLE_COUNT = 16;
const SPARKLE_COLORS = ['#FFFFFF', '#FFF6D8', '#FFE9A8'];
const makeSparkles = (): Sparkle[] =>
  Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
    id: i,
    x: gsap.utils.random(3, 97),
    y: gsap.utils.random(3, 97),
    size: gsap.utils.random(8, 20, 1),
    color: SPARKLE_COLORS[i % SPARKLE_COLORS.length] ?? '#FFFFFF',
  }));
const groomSparkles = ref<Sparkle[]>(makeSparkles());
const brideSparkles = ref<Sparkle[]>(makeSparkles());

// Semua timeline sparkle yang hidup — di-kill saat komponen dilepas.
const sparkleTls: gsap.core.Timeline[] = [];

// Satu sparkle: muncul (cenit) → hilang → pindah posisi acak → ulangi.
const twinkleOne = (el: HTMLElement) => {
  gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.15 });
  const loop = () => {
    const tl = gsap.timeline({
      delay: gsap.utils.random(0.5, 2.5),
      onComplete: () => {
        const i = sparkleTls.indexOf(tl);
        if (i > -1) sparkleTls.splice(i, 1);
        loop();
      },
    });
    sparkleTls.push(tl);
    tl.to(el, {
        opacity: gsap.utils.random(0.6, 1),
        scale: gsap.utils.random(0.8, 1.4),
        duration: gsap.utils.random(0.9, 1.8),
        ease: 'sine.inOut',
      })
      .to(el, {
        opacity: 0,
        scale: 0.15,
        duration: gsap.utils.random(0.9, 1.8),
        ease: 'sine.inOut',
      }, '+=0.5')
      // pindah ke titik acak baru (instan, dilakukan saat tak terlihat)
      .set(el, {
        left: () => `${gsap.utils.random(3, 97)}%`,
        top: () => `${gsap.utils.random(3, 97)}%`,
      });
  };
  loop();
};

// Jalankan cenit-cenit untuk semua sparkle di kedua veil.
const startSparkles = () => {
  [groomVeilRef.value, brideVeilRef.value].forEach((veil) => {
    veil?.querySelectorAll<HTMLElement>('.rf-sparkle').forEach(twinkleOne);
  });
};
const cdRef = ref<HTMLElement | null>(null);
const cdAssetRef = ref<HTMLImageElement | null>(null);
const cdAsset2Ref = ref<HTMLElement | null>(null); // wrapper JAM tunggal/tengah (gambar + jarum SVG)

const padZero = (val: number) => val.toString().padStart(2, '0');

function getCalendarUrl() {
  const inv = props.invitation;
  if (!inv) return '#';
  const dateStr = inv.akad_date || inv.resepsi_date;
  const timeStr = inv.akad_date ? inv.akad_time : inv.resepsi_time;
  const venue = inv.akad_date ? inv.akad_venue : inv.resepsi_venue;
  const address = inv.akad_date ? inv.akad_address : inv.resepsi_address;
  if (!dateStr) return '#';
  return generateGoogleCalendarUrl({
    title: `Pernikahan ${inv.groom_name || ''} & ${inv.bride_name || ''}`,
    date: dateStr,
    time: timeStr,
    venue: venue,
    address: address,
    description: `Undangan Pernikahan ${inv.groom_name || ''} & ${inv.bride_name || ''}`,
  });
}

const resolveUrl = (url: string | undefined) => {
  if (!url) return '';
  return resolveAssetUrl(url, props.apiBase || '');
};

const setupAnimation = () => {
  if (!coupleSection.value || !bgImageRef.value || !canvasWrapRef.value) return;

  const container = coupleSection.value;
  const img = bgImageRef.value;   // background utama (objek fade-out countdown)
  const wrap = canvasWrapRef.value; // kanvas utuh (objek geser/zoom — aset nempel ikut bergerak)

  // ============================================================
  // MODE "KANVAS UTUH" — TIDAK ADA BAGIAN GAMBAR YANG KEPOTONG.
  // object-fit:cover dibuang lewat JS: ukuran WRAPPER dibuat SAMA PERSIS
  // dengan ukuran render gambar aslinya (img di dalamnya 100%x100%).
  // Seluruh isi gambar SELALU ADA di dalam elemen — viewport cuma
  // "jendela". Digeser ke posisi manapun, bagian gambar mana pun bisa
  // muncul, tidak ada yang ter-clip. Aset tambahan ikut wrapper.
  // ============================================================
  const vw = container.offsetWidth;
  const vh = container.offsetHeight;
  // skala "cover" lama: kanvas minimal menutupi viewport secara proporsional
  const sCover = Math.max((vw * 2) / img.naturalWidth, vh / img.naturalHeight);
  const canvasW = img.naturalWidth * sCover; // >= 2 * vw
  const canvasH = img.naturalHeight * sCover; // >= vh
  img.style.objectFit = 'fill'; // kotak = rasio asli → fill tanpa distorsi
  wrap.style.width = `${canvasW}px`;
  wrap.style.height = `${canvasH}px`;

  // Helper: konversi titik fokus lama (fraksi kotak cover 2vw x vh) ke
  // fraksi kanvas utuh, supaya framing zoom groom/bride TIDAK berubah.
  const cropX0 = (canvasW - vw * 2) / 2;
  const cropY0 = (canvasH - vh) / 2;
  const O = (fx: number, fy: number) =>
    `${(((fx * vw * 2 + cropX0) / canvasW) * 100).toFixed(2)}% ${(((fy * vh + cropY0) / canvasH) * 100).toFixed(2)}%`;

  // Posisi horizontal diset supaya kanvas yang terlihat di viewport SAMA
  // persis seperti mode cover dulu (x baru = x lama - cropX0).
  const centerX = -(vw * 2 - vw) / 2 - cropX0; // tengah (archway)
  const leftStairsX = 0 - cropX0; // area tangga kiri
  const rightStairsX = -(vw) - cropX0; // area tangga kanan
  const restY = -(canvasH - vh) / 2; // posisi diam: kanvas terpusat vertikal

  // Initial state: kanvas terpusat di archway, scale 1
  gsap.set(wrap, { x: centerX, y: restY, scale: 1, transformOrigin: O(0.5, 0.5) });

  // Penengah frame BRIDE via GSAP (xPercent/yPercent) — didaftarkan sekali di
  // sini supaya tween scale/y di timeline TIDAK bisa menggesernya (tengah
  // vertikal & horizontal dijaga GSAP sendiri, bukan CSS).
  if (brideRef.value) {
    gsap.set(brideRef.value, { xPercent: -50, yPercent: -50 });
  }

  // Initial state aset countdown: jam mengecil & tersembunyi, kartu tersembunyi
  if (props.hasDate) {
    if (cdAsset2Ref.value) {
      // JANGAN sentuh xPercent/x — inline translateX(-50%) menjaga jam tetap
      // tengah; animasi masuk cukup fade + scale kecil membesar.
      gsap.set(cdAsset2Ref.value, { opacity: 0, scale: 0.85 });
    }
    if (cdRef.value) {
      gsap.set(cdRef.value, { opacity: 0, scale: 0.92, y: 20, pointerEvents: 'none' });
    }
  }

  // Seluruh timeline (termasuk jam & info countdown) dikendalikan secara SCROLL-BASED (scrub)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: props.hasDate ? '+=620%' : '+=450%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Step 1a: Fade out header & thin white veil, slide image to Left Stairs (x = 0)
  tl.to(headerRef.value, {
    opacity: 0,
    y: -30,
    duration: 1,
    ease: 'power2.inOut',
  }, 0)
    .to(whiteOverlayRef.value, {
      opacity: 0,
      duration: 1.2,
      ease: 'power2.inOut',
    }, 0)
    .to(wrap, {
      x: leftStairsX,
      scale: 1,
      transformOrigin: O(0.5, 0.5),
      duration: 1.8,
      ease: 'power2.inOut',
    }, 0)

    // Step 1b: Smooth Zoom-in into Left Staircase
    .to(wrap, {
      scale: 1.35,
      transformOrigin: O(0.15, 0.5),
      duration: 1.5,
      ease: 'power1.inOut',
    })

    // Step 1c: Show Groom card + overlay gelap masuk bareng
    .to(groomRef.value, {
      opacity: 1,
      scale: 1,
      y: 0,
      pointerEvents: 'auto',
      duration: 1,
      ease: 'power2.out',
    }, '-=0.5')
    .to(groomVeilRef.value, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    }, '<')

    // Pause on Groom card
    .to({}, { duration: 1.5 })

    // Step 2a: Hide Groom card + overlay gelap ikut memudar bareng
    .to(groomRef.value, {
      opacity: 0,
      scale: 0.9,
      y: -20,
      pointerEvents: 'none',
      duration: 0.8,
      ease: 'power2.in',
    })
    .to(groomVeilRef.value, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in',
    }, '<')
    .to(wrap, {
      scale: 1,
      transformOrigin: O(0.15, 0.5),
      duration: 1.3,
      ease: 'power1.inOut',
    })

    // Step 2b: Slide image across to Right Stairs
    .to(wrap, {
      x: rightStairsX,
      duration: 1.8,
      ease: 'power2.inOut',
    })

    // Step 2c: Smooth Zoom-in into Right Staircase
    .to(wrap, {
      scale: 1.35,
      transformOrigin: O(0.85, 0.5),
      duration: 1.5,
      ease: 'power1.inOut',
    })

    // Step 2d: Show Bride card + overlay gelap masuk bareng
    .to(brideRef.value, {
      opacity: 1,
      scale: 1,
      y: 0,
      pointerEvents: 'auto',
      duration: 1,
      ease: 'power2.out',
    }, '-=0.5')
    .to(brideVeilRef.value, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    }, '<')

    // Pause on Bride card
    .to({}, { duration: 1.5 });

  // ===== FASE COUNTDOWN (SCROLL-BASED) =====
  if (props.hasDate && cdRef.value) {
    const CD_ZOOM = 1.18;

    // Step 3-0: Saat memasuki fase countdown, TURUNKAN SELURUH kanvas
    // (gambar utama + aset latar tambahan yang menempel) ke lapisan
    // PALING BELAKANG: z-index -2 → di bawah jam (z:-1) & aset countdown
    // (z:0). Gambar utama tak terpengaruh (setelah ini di-fade-out).
    // Scroll balik ke atas? GSAP scrub otomatis mengembalikannya ke z:1.
    tl.set(wrap, { zIndex: -2 })

      // Step 3a: Hide Bride card + overlay gelap ikut memudar bareng
      .to(brideRef.value, {
        opacity: 0,
        scale: 0.9,
        y: -20,
        pointerEvents: 'none',
        duration: 0.8,
        ease: 'power2.in',
      })
      .to(brideVeilRef.value, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in',
      }, '<')

      // Step 3b: ZOOM OUT back to normal scale
      .to(wrap, {
        scale: 1,
        transformOrigin: O(0.85, 0.5),
        duration: 1.3,
        ease: 'power1.inOut',
      })

      // Step 3c: SLIDE image kembali ke TENGAH (posisi archway)
      .to(wrap, {
        x: centerX,
        duration: 1.8,
        ease: 'power2.inOut',
      })

      // Step 3d: SLIDE kamera geser ke ATAS
      .to(wrap, {
        y: 0,
        duration: 1.4,
        ease: 'power2.inOut',
      })

      // Step 3e: LALU ZOOM ke ATAS
      .to(wrap, {
        scale: CD_ZOOM,
        transformOrigin: '50% 0%',
        duration: 1,
        ease: 'power1.inOut',
      })

      // Step 3f: ASET countdown fade-in
      .to(
        cdAssetRef.value,
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power1.out',
        },
        '-=0.4'
      )

      // Step 3g: background couple FADE OUT crossfade ke aset countdown.
      // HANYA gambar utama yang pudar — wrapper (dan aset latar tambahan
      // yang menempel padanya) tetap di posisinya, tetap tampil, dan
      // sudah berada di lapisan paling belakang (z:-2 sejak Step 3-0).
      .to(
        img,
        {
          opacity: 0,
          duration: 1.8,
          ease: 'power1.inOut',
        },
      )

      // Step 3h: JAM MELUNCUR MASUK (SCROLL-BASED)
      // Fade-in sambil membesar dari 0.85 → 1 (tengah layar, xPercent tidak
      // disentuh supaya translateX(-50) penjaga posisi tengah tetap utuh).
      .to(cdAsset2Ref.value, {
        scale: 1,
        opacity: 1,
        duration: 1.6,
        ease: 'power2.out',
      })

      // Step 3i: TEKS & KARTU INFO COUNTDOWN MUNCUL (SCROLL-BASED)
      .to(
        cdRef.value,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          pointerEvents: 'auto',
          duration: 1.2,
          ease: 'power2.out',
        },
        '-=0.4'
      )

      // Pocket buffer scroll agar info countdown tetap tampil dan terbaca sebelum unpin ke section selanjutnya
      .to({}, { duration: 2.2 });
  }
};

onMounted(() => {
  if (!bgImageRef.value) return;

  const initAndRefresh = () => {
    setupAnimation();
    // Setelah pin spacer Couple dibuat, sort & refresh agar section
    // berikutnya (Events, LoveStory, dll) menghitung posisi start/end
    // mereka dengan benar — termasuk memperhitungkan pin spacer ini.
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  };

  if (bgImageRef.value.complete && bgImageRef.value.offsetWidth > 0) {
    initAndRefresh();
  } else {
    bgImageRef.value.onload = () => {
      initAndRefresh();
    };
  }

  // Sparkle bling-bling jalan terus (independen dari scroll); kelihatan
  // hanya saat veil-nya tampil karena sparkle ada DI DALAM veil.
  startSparkles();
});

onBeforeUnmount(() => {
  // Hanya kill ScrollTrigger milik section ini, bukan semuanya
  ScrollTrigger.getAll().forEach((st) => {
    if (st.trigger === coupleSection.value) {
      st.kill();
    }
  });
  // Matikan semua animasi sparkle
  sparkleTls.forEach((tl) => tl.kill());
  sparkleTls.length = 0;
});
</script>
