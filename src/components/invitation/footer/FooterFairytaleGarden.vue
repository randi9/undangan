<template>
  <footer
    ref="footerSection"
    class="px-6 text-center text-white relative overflow-hidden flex flex-col items-center justify-center"
    style="min-height: 100dvh"
  >
    <!-- Background Cover Image (Scale 2.4) -->
    <div
      ref="bgImageRef"
      class="absolute inset-0 z-0 bg-[#6A4E42]"
      style="
        background-image: url(&quot;https://media.mengundanganda.com/fairygarden/footer%20section/dewirandi_b928e5b1-d044-45bc-b314-24b25b4ca215.webp&quot;);
        background-size: cover;
        background-position: center;
        transform: scale(2.4);
      "
    ></div>

    <!-- White Overlay Layer -->
    <div
      ref="whiteOverlayRef"
      class="absolute inset-0 z-[1] bg-white pointer-events-none"
      style="opacity: 0.5"
    ></div>

    <!-- Slide 1: Love Story Section Content -->
    <div
      v-show="stories && stories.length > 0"
      ref="lovestoryWrapper"
      class="absolute inset-0 z-10 flex flex-col items-center justify-start px-4 overflow-y-auto hide-scrollbar"
      style="
        padding-top: 8dvh;
        padding-bottom: 8dvh;
        padding-left: 24px;
        padding-right: 24px;
        box-sizing: border-box;
      "
      @wheel="lovestoryScroll.handleWheel"
      @touchstart="lovestoryScroll.handleTouchStart"
      @touchmove="lovestoryScroll.handleTouchMove"
    >
      <LoveStoryFairytaleGarden
        :stories="stories"
        :theme-config="themeConfig"
        :is-inline="true"
        :api-base="apiBase"
      />
    </div>

    <!-- Slide 2: Gallery Section Content -->
    <div
      v-show="photos && photos.length > 0"
      ref="galleryWrapper"
      class="absolute inset-0 z-10 flex flex-col items-center justify-center px-4"
    >
      <div class="w-full max-w-2xl px-4 py-2 flex flex-col gap-6">
        <!-- Header -->
        <div class="text-center">
          <h2
            class="text-5xl md:text-7xl mb-2 drop-shadow-md"
            :style="{ fontFamily: themeConfig.fontHeading }"
            style="
              color: #8a4e56;
              font-weight: 700;
              text-shadow: 0 1px 3px rgba(255, 255, 255, 0.85);
              line-height: 1.3;
              padding-top: 12px;
            "
          >
            Galeri Foto
          </h2>
          <div
            class="flex items-center justify-center gap-4 mb-2 text-[#EBCFD1] opacity-80"
          >
            <svg viewBox="0 0 60 2" class="w-10 md:w-14 opacity-40">
              <rect width="60" height="1" fill="currentColor" />
            </svg>
            <svg viewBox="0 0 24 24" class="w-4 h-4 opacity-60">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                fill="currentColor"
              />
            </svg>
            <svg viewBox="0 0 60 2" class="w-10 md:w-14 opacity-40">
              <rect width="60" height="1" fill="currentColor" />
            </svg>
          </div>
        </div>

        <!-- Gallery content -->
        <div class="w-full">
          <!-- Dispatch Masonry or Carousel dynamically inside the footer card -->
          <div
            v-if="galleryType === 'masonry'"
            class="bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-[#EBCFD1] shadow-xl w-full"
          >
            <GalleryMasonryLayout
              :photos="photos"
              :api-base="apiBase"
              @open-lightbox="(i) => $emit('openLightbox', i)"
            />
          </div>
          <div v-else class="w-full">
            <GalleryFairytaleGardenCarousel
              :photos="photos"
              :theme-config="themeConfig"
              :api-base="apiBase"
              :is-inline="true"
              @open-lightbox="(i) => $emit('openLightbox', i)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Slide 3: RSVP Section Content -->
    <div
      ref="rsvpWrapper"
      class="absolute inset-0 z-10 flex flex-col items-center justify-start overflow-y-auto py-24 hide-scrollbar"
      style="padding-left: 24px; padding-right: 24px; box-sizing: border-box"
      @wheel="rsvpScroll.handleWheel"
      @touchstart="rsvpScroll.handleTouchStart"
      @touchmove="rsvpScroll.handleTouchMove"
    >
      <!-- RSVP container (scrollable for mobile screens) -->
      <div
        style="
          width: 100%;
          max-width: 580px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-sizing: border-box;
        "
      >
        <!-- Header -->
        <div class="text-center" style="margin-bottom: 8px">
          <h2
            class="text-5xl md:text-7xl mb-2 drop-shadow-md"
            :style="{ fontFamily: themeConfig.fontHeading }"
            style="
              color: #8a4e56;
              font-weight: 700;
              text-shadow: 0 1px 3px rgba(255, 255, 255, 0.85);
              line-height: 1.3;
              padding-top: 12px;
            "
          >
            Reservasi & Ucapan
          </h2>
          <div
            class="flex items-center justify-center gap-4 mb-2 text-[#EBCFD1] opacity-80"
          >
            <svg viewBox="0 0 60 2" class="w-10 md:w-14 opacity-40">
              <rect width="60" height="1" fill="currentColor" />
            </svg>
            <svg viewBox="0 0 24 24" class="w-4 h-4 opacity-60">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                fill="currentColor"
              />
            </svg>
            <svg viewBox="0 0 60 2" class="w-10 md:w-14 opacity-40">
              <rect width="60" height="1" fill="currentColor" />
            </svg>
          </div>
          <p class="text-xs md:text-sm text-[#F8F3EE] opacity-90">
            Kehadiran Anda merupakan kebahagiaan bagi kami
          </p>
        </div>

        <!-- RSVP Form & Messages side-by-side or stacked -->
        <div
          class="grid md:grid-cols-2 gap-4 text-left items-start"
          style="position: relative; z-index: 10"
        >
          <!-- Form -->
          <div
            style="
              position: relative;
              background: rgba(252, 248, 244, 0.97);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              padding: 16px 14px;
              border-radius: 20px 40px 20px 40px;
              border: 1.5px solid #ebcfd1;
              box-shadow: 0px 10px 25px rgba(106, 78, 66, 0.05);
              box-sizing: border-box;
            "
          >
            <!-- Elegant dashed inner border -->
            <div
              style="
                position: absolute;
                top: 6px;
                bottom: 6px;
                left: 6px;
                right: 6px;
                border: 1px dashed rgba(174, 184, 163, 0.4);
                border-radius: 14px 34px 14px 34px;
                pointer-events: none;
                box-sizing: border-box;
              "
            ></div>

            <form
              @submit.prevent="onSubmit"
              class="space-y-3"
              style="position: relative; z-index: 10"
            >
              <div>
                <label
                  style="
                    display: block;
                    font-size: 10px;
                    font-weight: 700;
                    color: #6a4e42;
                    margin-bottom: 4px;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    font-family: sans-serif;
                  "
                  >Nama Lengkap</label
                >
                <input
                  v-model="form.guest_name"
                  type="text"
                  maxlength="50"
                  placeholder="Nama Anda"
                  required
                  class="premium-input"
                  style="width: 100%; px-4; height: 34px; padding-left: 10px; padding-right: 10px; rounded-lg; border: 1.5px solid #EBCFD1; background: rgba(255,255,255,0.85); color: #6A4E42; font-size: 12px; outline: none; border-radius: 10px; box-sizing: border-box;"
                />
              </div>

              <div>
                <label
                  style="
                    display: block;
                    font-size: 10px;
                    font-weight: 700;
                    color: #6a4e42;
                    margin-bottom: 6px;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    font-family: sans-serif;
                  "
                  >Konfirmasi Kehadiran</label
                >
                <div class="flex gap-2">
                  <button
                    type="button"
                    @click="form.attendance = 'hadir'"
                    :style="
                      form.attendance === 'hadir'
                        ? 'flex: 1; py-2; height: 34px; rounded-xl; border: none; background: linear-gradient(135deg, #8FA47F 0%, #6E875C 100%); color: white; font-weight: 700; font-size: 12px; cursor: pointer; border-radius: 10px; box-shadow: 0 4px 12px rgba(110,135,92,0.2);'
                        : 'flex: 1; py-2; height: 34px; rounded-xl; border: 1.5px dashed #AEB8A3; background: transparent; color: #6E875C; font-weight: 600; font-size: 12px; cursor: pointer; border-radius: 10px;'
                    "
                  >
                    Hadir
                  </button>
                  <button
                    type="button"
                    @click="form.attendance = 'tidak_hadir'"
                    :style="
                      form.attendance === 'tidak_hadir'
                        ? 'flex: 1; py-2; height: 34px; rounded-xl; border: none; background: linear-gradient(135deg, #D49BA2 0%, #BA7D85 100%); color: white; font-weight: 700; font-size: 12px; cursor: pointer; border-radius: 10px; box-shadow: 0 4px 12px rgba(186,125,133,0.2);'
                        : 'flex: 1; py-2; height: 34px; rounded-xl; border: 1.5px dashed #EBCFD1; background: transparent; color: #BA7D85; font-weight: 600; font-size: 12px; cursor: pointer; border-radius: 10px;'
                    "
                  >
                    Absen
                  </button>
                </div>
              </div>

              <div v-show="form.attendance === 'hadir'">
                <label
                  style="
                    display: block;
                    font-size: 10px;
                    font-weight: 700;
                    color: #6a4e42;
                    margin-bottom: 4px;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    font-family: sans-serif;
                  "
                  >Jumlah Tamu</label
                >
                <div
                  style="display: flex; align-items: center; justify-content: space-between; rounded-lg; border: 1.5px solid #EBCFD1; background: rgba(255,255,255,0.85); overflow: hidden; height: 34px; border-radius: 10px; box-sizing: border-box;"
                >
                  <button
                    type="button"
                    @click="
                      form.guest_count = Math.max(1, form.guest_count - 1)
                    "
                    style="
                      width: 34px;
                      height: 100%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      color: #6e875c;
                      font-weight: bold;
                      background: transparent;
                      border: none;
                      cursor: pointer;
                    "
                  >
                    -
                  </button>
                  <span
                    style="
                      color: #6a4e42;
                      font-weight: 700;
                      font-size: 12px;
                      font-family: sans-serif;
                    "
                    >{{ form.guest_count }} Orang</span
                  >
                  <button
                    type="button"
                    @click="
                      form.guest_count = Math.min(10, form.guest_count + 1)
                    "
                    style="
                      width: 34px;
                      height: 100%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      color: #6e875c;
                      font-weight: bold;
                      background: transparent;
                      border: none;
                      cursor: pointer;
                    "
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label
                  style="
                    display: block;
                    font-size: 10px;
                    font-weight: 700;
                    color: #6a4e42;
                    margin-bottom: 4px;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    font-family: sans-serif;
                  "
                  >Ucapan &amp; Doa</label
                >
                <textarea
                  v-model="form.message"
                  rows="2"
                  maxlength="500"
                  placeholder="Tulis ucapan selamat..."
                  class="premium-input"
                  style="width: 100%; padding: 8px 10px; rounded-lg; border: 1.5px solid #EBCFD1; background: rgba(255,255,255,0.85); color: #6A4E42; font-size: 12px; outline: none; border-radius: 10px; resize: none; box-sizing: border-box; font-family: var(--font-body), sans-serif;"
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="submitting"
                class="premium-submit-btn"
                style="width: 100%; py-2.5; height: 38px; rounded-lg; background: linear-gradient(135deg, #8FA47F 0%, #6E875C 100%); color: white; font-weight: 700; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; border: none; border-radius: 10px; box-shadow: 0 6px 15px rgba(110,135,92,0.2); cursor: pointer; display: flex; align-items: center; justify-content: center;"
              >
                {{ submitting ? "Mengirim..." : "Kirim Ucapan" }}
              </button>
            </form>
          </div>

          <!-- Messages List -->
          <div
            style="
              position: relative;
              background: rgba(252, 248, 244, 0.97);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              padding: 16px 14px;
              border-radius: 40px 20px 40px 20px;
              border: 1.5px solid #ebcfd1;
              box-shadow: 0px 10px 25px rgba(106, 78, 66, 0.05);
              box-sizing: border-box;
              align-self: stretch;
              display: flex;
              flex-direction: column;
            "
          >
            <!-- Elegant dashed inner border -->
            <div
              style="
                position: absolute;
                top: 8px;
                bottom: 8px;
                left: 8px;
                right: 8px;
                border: 1px dashed rgba(174, 184, 163, 0.4);
                border-radius: 34px 14px 34px 14px;
                pointer-events: none;
                box-sizing: border-box;
              "
            ></div>

            <div
              style="
                position: relative;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 12px;
                border-bottom: 1px dashed rgba(235, 207, 209, 0.6);
                padding-bottom: 8px;
                box-sizing: border-box;
              "
            >
              <span
                style="
                  font-size: 12px;
                  font-weight: 700;
                  color: #6a4e42;
                  font-family: var(--font-body), sans-serif;
                  letter-spacing: 0.05em;
                  text-transform: uppercase;
                "
                >Pesan Tamu</span
              >
              <span
                style="
                  background: #ebcfd1;
                  color: #8a4e56;
                  padding: 2px 8px;
                  border-radius: 9999px;
                  font-size: 10px;
                  font-weight: 700;
                  font-family: sans-serif;
                "
                >{{ rsvpMessages.length }}</span
              >
            </div>

            <div
              class="pr-1 space-y-3"
              style="
                position: relative;
                z-index: 20;
                overflow-y: auto !important;
                height: 210px;
                max-height: 210px;
                overscroll-behavior: contain;
                -webkit-overflow-scrolling: touch;
              "
              data-lenis-prevent
              @touchstart.stop
              @touchmove.stop
              @wheel.stop
            >
              <div
                v-if="rsvpMessages.length === 0"
                class="text-center py-12 text-xs text-gray-400 font-light font-sans"
              >
                Belum ada ucapan
              </div>
              <div
                v-else
                v-for="msg in rsvpMessages"
                :key="msg.id"
                style="
                  position: relative;
                  padding: 16px;
                  background: rgba(255, 255, 255, 0.92);
                  border-radius: 12px 24px 12px 24px;
                  border: 1.5px solid rgba(235, 207, 209, 0.4);
                  box-shadow: 0 4px 15px rgba(106, 78, 66, 0.03);
                  box-sizing: border-box;
                "
              >
                <!-- Card Inner Info -->
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 8px;
                    box-sizing: border-box;
                  "
                >
                  <span
                    style="
                      font-weight: 700;
                      font-size: 12.5px;
                      color: #5a1e25;
                      font-family: sans-serif;
                      max-width: 130px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    "
                    >{{ msg.guest_name }}</span
                  >
                  <span
                    :style="
                      msg.attendance === 'hadir'
                        ? 'font-size: 8.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 3px 8px; border-radius: 6px; background: rgba(110, 135, 92, 0.12); color: #6E875C; font-family: sans-serif;'
                        : 'font-size: 8.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 3px 8px; border-radius: 6px; background: rgba(186, 125, 133, 0.12); color: #BA7D85; font-family: sans-serif;'
                    "
                  >
                    {{ msg.attendance === "hadir" ? "Hadir" : "Absen" }}
                  </span>
                </div>
                <p
                  style="
                    font-size: 11.5px;
                    line-height: 1.6;
                    color: #6a4e42;
                    font-weight: 400;
                    font-family: var(--font-body), sans-serif;
                    margin: 0;
                    white-space: pre-line;
                    word-break: break-word;
                  "
                >
                  {{ msg.message }}
                </p>
                <div
                  v-if="msg.reply_text"
                  style="
                    margin-top: 10px;
                    background: rgba(252, 248, 244, 0.9);
                    padding: 10px;
                    border-radius: 8px 16px 8px 16px;
                    border: 1px dashed rgba(235, 207, 209, 0.7);
                    box-sizing: border-box;
                  "
                >
                  <div
                    style="
                      font-size: 8px;
                      font-weight: 800;
                      text-transform: uppercase;
                      letter-spacing: 0.1em;
                      color: #ba7d85;
                      margin-bottom: 4px;
                      display: block;
                      font-family: sans-serif;
                    "
                  >
                    Balasan Mempelai
                  </div>
                  <p
                    style="
                      font-size: 11px;
                      line-height: 1.5;
                      color: #6a4e42;
                      font-weight: 400;
                      font-family: var(--font-body), sans-serif;
                      margin: 0;
                      word-break: break-word;
                    "
                  >
                    {{ msg.reply_text }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Slide 4: Gift Section Content -->
    <div
      v-show="hasGift"
      ref="giftWrapper"
      class="absolute inset-0 z-10 flex flex-col items-center justify-start px-4 overflow-y-auto hide-scrollbar"
      style="padding: 4dvh 16px; box-sizing: border-box"
      @wheel="giftScroll.handleWheel"
      @touchstart="giftScroll.handleTouchStart"
      @touchmove="giftScroll.handleTouchMove"
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 600px;
          margin-top: auto;
          margin-bottom: auto;
          box-sizing: border-box;
        "
      >
        <GiftFairytaleGarden
          :invitation="invitation"
          :theme-config="themeConfig"
          :is-inline="true"
        />
      </div>
    </div>

    <!-- Gate Assets — independent layer, NOT inside footerWrapper -->
    <div
      class="absolute inset-0 z-[5] pointer-events-none overflow-hidden"
      style="perspective: 1200px"
    >
      <!-- Left Gate -->
      <div
        ref="leftGateRef"
        style="
          position: absolute;
          top: 25%;
          left: 10%;
          width: 41%;
          height: auto;
          opacity: 0;
          transform-origin: left center;
          transform: rotateY(-60deg);
        "
      >
        <img
          src="https://media.mengundanganda.com/fairygarden/footer%20section/dewirandi_3a822cdf-ccca-4384-9045-074cb36c06fe.webp"
          alt="Left Gate"
          style="width: 100%; height: auto; object-fit: contain"
        />
      </div>
      <!-- Right Gate (Flipped horizontally) -->
      <div
        ref="rightGateRef"
        style="
          position: absolute;
          top: 25%;
          right: 10%;
          width: 41%;
          height: auto;
          opacity: 0;
          transform-origin: right center;
          transform: rotateY(60deg);
        "
      >
        <img
          src="https://media.mengundanganda.com/fairygarden/footer%20section/dewirandi_3a822cdf-ccca-4384-9045-074cb36c06fe.webp"
          alt="Right Gate"
          style="
            width: 100%;
            height: auto;
            object-fit: contain;
            transform: scaleX(-1);
          "
        />
      </div>
    </div>

    <!-- Slide 2: Footer Section Content -->
    <div
      ref="footerWrapper"
      class="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
    >
      <!-- Footer Content Wrapper styled as a soft circular white shadow container -->
      <div
        class="relative z-10 flex flex-col items-center justify-center text-center"
        style="
          background: radial-gradient(
            ellipse closest-side,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.65) 65%,
            rgba(255, 255, 255, 0) 98%
          );
          border-radius: 50%;
          padding: 5rem 2.5rem;
          max-width: 380px;
          width: 90%;
          border: none;
          outline: none;
        "
      >
        <p
          class="text-[9px] md:text-sm tracking-[0.3em] uppercase mb-3 font-semibold"
          style="
            color: #8c655a;
            text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
          "
        >
          The Wedding Of
        </p>

        <!-- Name with margin-bottom: mb-16 to increase vertical distance -->
        <p
          class="text-4xl md:text-6xl lg:text-7xl mb-16 leading-tight font-medium"
          :style="{
            fontFamily: themeConfig.fontHeading,
            color: '#4A2E2B',
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
          }"
        >
          {{ invitation.groom_name }}
          <span
            style="
              display: inline-block;
              margin: 0 0.5rem;
              font-size: 1.75rem;
              opacity: 0.85;
              font-weight: 300;
            "
            >&amp;</span
          >
          {{ invitation.bride_name }}
        </p>

        <p
          class="text-xs md:text-sm font-light tracking-wide max-w-sm mx-auto leading-relaxed"
          style="
            color: #5c3e35;
            text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
          "
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>

        <p
          class="text-xs md:text-sm italic mt-4 opacity-90"
          style="
            color: #5c3e35;
            text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
          "
        >
          Terima kasih.
        </p>
      </div>

      <!-- Credit positioned absolute bottom-0 -->
      <div
        style="
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 85%;
          max-width: 300px;
          border-top: 1px solid rgba(255, 255, 255, 0.25);
          padding-top: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          pointer-events: auto;
        "
      >
        <div
          style="
            font-size: 9px;
            color: rgba(255, 255, 255, 0.7);
            text-transform: uppercase;
            letter-spacing: 0.15em;
            font-family: sans-serif;
          "
        >
          Dibuat dengan
        </div>
        <div
          style="
            font-weight: bold;
            letter-spacing: 0.1em;
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 0.25rem;
            color: #ffffff;
            font-family: sans-serif;
          "
        >
          Mengundang<span style="color: rgba(255, 255, 255, 0.85)">Anda</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/vue";
import type { ThemeConfig } from "@/types/theme";
import type {
  Invitation,
  BankAccount,
  Rsvp,
  LoveStoryItem,
  Photo,
} from "@/types/invitation";
import GalleryMasonryLayout from "../gallery/GalleryMasonryLayout.vue";
import GalleryFairytaleGardenCarousel from "../gallery/GalleryFairytaleGardenCarousel.vue";
import GiftFairytaleGarden from "../gift/GiftFairytaleGarden.vue";
import LoveStoryFairytaleGarden from "../lovestory/LoveStoryFairytaleGarden.vue";
import { resolveAssetUrl } from "@/utils/url";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
  rsvpMessages: Rsvp[];
  submitting: boolean;
  stories: LoveStoryItem[];
  photos: Photo[];
  galleryType: "carousel" | "masonry";
  apiBase: string;
}>();

const emit = defineEmits<{
  (
    e: "submitRsvp",
    form: {
      guest_name: string;
      attendance: "hadir" | "tidak_hadir";
      guest_count: number;
      message: string;
    },
  ): void;
  (e: "openLightbox", index: number): void;
}>();

const footerSection = ref<HTMLElement | null>(null);
const bgImageRef = ref<HTMLElement | null>(null);
const whiteOverlayRef = ref<HTMLElement | null>(null);
const lovestoryWrapper = ref<HTMLElement | null>(null);
const galleryWrapper = ref<HTMLElement | null>(null);
const rsvpWrapper = ref<HTMLElement | null>(null);
const giftWrapper = ref<HTMLElement | null>(null);
const footerWrapper = ref<HTMLElement | null>(null);
const leftGateRef = ref<HTMLElement | null>(null);
const rightGateRef = ref<HTMLElement | null>(null);

const form = reactive({
  guest_name: "",
  attendance: "hadir" as "hadir" | "tidak_hadir",
  guest_count: 1,
  message: "",
});

let pinTimeline: gsap.core.Timeline | null = null;

function onSubmit() {
  emit("submitRsvp", { ...form });
  form.guest_name = "";
  form.attendance = "hadir";
  form.guest_count = 1;
  form.message = "";
}

// Custom CSS class to hide scrollbars cleanly inside scrollable divs
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    .hide-scrollbar {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `;
  document.head.appendChild(style);
}

function createScrollHandler(wrapperRef: { value: HTMLElement | null }) {
  let touchStartY = 0;

  return {
    handleWheel(e: WheelEvent) {
      const el = wrapperRef.value;
      if (!el) return;

      const isScrollingDown = e.deltaY > 0;
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      const isScrollingUp = e.deltaY < 0;
      const isAtTop = el.scrollTop <= 0;

      if ((isScrollingDown && !isAtBottom) || (isScrollingUp && !isAtTop)) {
        e.stopPropagation();
      }
    },
    handleTouchStart(e: TouchEvent) {
      if (e.touches && e.touches.length === 1 && e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
    },
    handleTouchMove(e: TouchEvent) {
      const el = wrapperRef.value;
      if (!el || !e.touches || e.touches.length !== 1 || !e.touches[0]) return;

      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY;

      const isScrollingDown = deltaY > 0;
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      const isScrollingUp = deltaY < 0;
      const isAtTop = el.scrollTop <= 0;

      if ((isScrollingDown && !isAtBottom) || (isScrollingUp && !isAtTop)) {
        e.stopPropagation();
      }
    },
  };
}

const lovestoryScroll = createScrollHandler(lovestoryWrapper);
const rsvpScroll = createScrollHandler(rsvpWrapper);
const giftScroll = createScrollHandler(giftWrapper);

const hasGift = computed(() => {
  return (
    (props.invitation.banks && props.invitation.banks.length > 0) ||
    !!props.invitation.bank_name ||
    !!props.invitation.gift_address
  );
});

onMounted(() => {
  const hasLoveStory = props.stories && props.stories.length > 0;
  const hasGallery = props.photos && props.photos.length > 0;
  const hasGiftVal = hasGift.value;

  if (footerSection.value) {
    // Initial states: Slide 1 starts at y: "0%", others start below the screen at y: "100%"
    // We keep opacity: 1 on all of them, since they are hidden off-screen by translating y
    if (hasLoveStory) {
      gsap.set(lovestoryWrapper.value, {
        y: "0%",
        opacity: 1,
        pointerEvents: "auto",
      });
    }
    if (hasGallery) {
      gsap.set(galleryWrapper.value, {
        y: hasLoveStory ? "100%" : "0%",
        opacity: 1,
        pointerEvents: hasLoveStory ? "none" : "auto",
      });
    }
    const rsvpStartBelow = hasLoveStory || hasGallery;
    gsap.set(rsvpWrapper.value, {
      y: rsvpStartBelow ? "100%" : "0%",
      opacity: 1,
      pointerEvents: rsvpStartBelow ? "none" : "auto",
    });
    if (hasGiftVal) {
      gsap.set(giftWrapper.value, {
        y: "100%",
        opacity: 1,
        pointerEvents: "none",
      });
    }
    gsap.set(footerWrapper.value, { opacity: 0, y: 40, pointerEvents: "none" });
    // Gates start wide open (swung inward) and invisible
    gsap.set(leftGateRef.value, { rotateY: -60, opacity: 0 });
    gsap.set(rightGateRef.value, { rotateY: 60, opacity: 0 });

    // Calculate dynamic length based on active sections
    let scrollEndMultiplier = 250;
    if (hasLoveStory) scrollEndMultiplier += 110;
    if (hasGallery) scrollEndMultiplier += 110;
    if (hasGiftVal) scrollEndMultiplier += 110;

    pinTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: footerSection.value,
        start: "top top",
        end: `+=${scrollEndMultiplier}%`,
        pin: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    let activeWrapper: any = null;

    // Slide 1: Love Story
    if (hasLoveStory) {
      activeWrapper = lovestoryWrapper.value;
    }

    // Slide 2: Gallery
    if (hasGallery) {
      if (activeWrapper) {
        // Transition from previous slide: previous slides UP off-screen, gallery slides UP to center
        pinTimeline.to(activeWrapper, {
          y: "-100%",
          duration: 1.0,
          ease: "power2.inOut",
          pointerEvents: "none",
        });
        pinTimeline.to(
          galleryWrapper.value,
          {
            y: "0%",
            duration: 1.0,
            ease: "power2.inOut",
            pointerEvents: "auto",
          },
          "<",
        );
      }
      activeWrapper = galleryWrapper.value;
    }

    // Slide 3: RSVP
    if (activeWrapper) {
      pinTimeline.to(activeWrapper, {
        y: "-100%",
        duration: 1.0,
        ease: "power2.inOut",
        pointerEvents: "none",
      });
      pinTimeline.to(
        rsvpWrapper.value,
        {
          y: "0%",
          duration: 1.0,
          ease: "power2.inOut",
          pointerEvents: "auto",
        },
        "<",
      );
    }
    activeWrapper = rsvpWrapper.value;

    // Slide 4: Gift
    if (hasGiftVal) {
      pinTimeline.to(activeWrapper, {
        y: "-100%",
        duration: 1.0,
        ease: "power2.inOut",
        pointerEvents: "none",
      });
      pinTimeline.to(
        giftWrapper.value,
        {
          y: "0%",
          duration: 1.0,
          ease: "power2.inOut",
          pointerEvents: "auto",
        },
        "<",
      );
      activeWrapper = giftWrapper.value;
    }

    // Slide 5: Transition to Footer greeting
    pinTimeline.to(activeWrapper, {
      y: "-100%",
      duration: 1.0,
      ease: "power2.inOut",
      pointerEvents: "none",
    });

    // Background zooms out first
    pinTimeline.to(bgImageRef.value, {
      scale: 1.0,
      duration: 1.5,
      ease: "power2.inOut",
    });

    // White overlay fades out to 0 at the same time
    if (whiteOverlayRef.value) {
      pinTimeline.to(
        whiteOverlayRef.value,
        {
          opacity: 0,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "<",
      );
    }

    // After zoom-out is done, gates fade in and swing shut
    // Starts when zoom-out is at ~80% (0.3s before zoom-out finishes)
    pinTimeline.to(
      [leftGateRef.value, rightGateRef.value],
      {
        opacity: 0.9,
        duration: 0.3,
        ease: "power1.in",
      },
      "-=0.3",
    );

    pinTimeline.to(
      leftGateRef.value,
      {
        rotateY: 0,
        duration: 1.5,
        ease: "power2.inOut",
      },
      "<",
    );

    pinTimeline.to(
      rightGateRef.value,
      {
        rotateY: 0,
        duration: 1.5,
        ease: "power2.inOut",
      },
      "<",
    );

    // Footer text fades in after gates are closed
    pinTimeline.to(
      footerWrapper.value,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        pointerEvents: "auto",
      },
      "-=0.3",
    );
  } else {
    // Standard layout (no dynamic sections): footerWrapper is immediately fully visible
    if (footerWrapper.value) {
      gsap.set(footerWrapper.value, { opacity: 1, y: 0 });
    }
    if (whiteOverlayRef.value) {
      gsap.set(whiteOverlayRef.value, { opacity: 0 });
    }
  }
});

onBeforeUnmount(() => {
  if (pinTimeline) {
    pinTimeline.kill();
    if (pinTimeline.scrollTrigger) pinTimeline.scrollTrigger.kill();
  }
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.premium-input {
  transition: all 0.3s ease !important;
}
.premium-input:focus {
  border-color: #ba7d85 !important;
  background-color: #ffffff !important;
  box-shadow: 0 0 0 3px rgba(186, 125, 133, 0.15) !important;
}
.premium-submit-btn {
  transition: all 0.3s ease !important;
}
.premium-submit-btn:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 10px 22px rgba(110, 135, 92, 0.35) !important;
  filter: brightness(1.03);
}
.premium-submit-btn:active {
  transform: translateY(0) scale(1);
}
</style>
