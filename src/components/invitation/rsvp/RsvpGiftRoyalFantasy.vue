<template>
  <section
    ref="rgSection"
    class="relative w-full overflow-hidden text-center flex items-center justify-center isolate"
    style="background:#AED4DA;height:100dvh;min-height:100dvh;max-height:100dvh;"
  >
    <div
      ref="bgLayer"
      aria-hidden="true"
      :style="{
        backgroundImage: `url('${bgSrc}')`,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -20,
        pointerEvents: 'none',
        userSelect: 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }"
    ></div>

    <!-- ================= -->
    <!-- PANEL 1 : RSVP    -->
    <!-- ================= -->
    <div
      ref="rsvpPanel"
      class="rg-scroll absolute inset-0 z-10 w-full overflow-y-auto"
      style="padding:20px 14px;pointer-events:auto;overscroll-behavior:contain;touch-action:pan-y;-webkit-overflow-scrolling:touch;"
    >
      <div style="max-width:720px;margin:0 auto;display:flex;flex-direction:column;align-items:center;">
        <!-- Margin atas: ruang napas sebelum konten -->
        <div style="height:48px;flex-shrink:0;" aria-hidden="true"></div>
        <!-- Header -->
        <div style="margin:0 0 16px;text-align:center;">
          <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:6px;">
            <span style="font-size:10px;color:#B0808A;">✦</span>
            <span style="font-size:10px;font-weight:700;letter-spacing:0.28em;text-transform:uppercase;color:#B0808A;">Buku Tamu &amp; Kehadiran</span>
            <span style="font-size:10px;color:#B0808A;">✦</span>
          </div>
          <h2 style="margin:0;font-size:24px;line-height:1.2;font-weight:400;color:#243029;" :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }">
            Konfirmasi Kehadiran &amp; Doa
          </h2>
          <p style="margin:6px auto 0;max-width:420px;font-size:12px;line-height:1.6;color:#4A5B52;">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
          </p>
          <div style="width:48px;height:2px;margin:10px auto 0;background:linear-gradient(to right,transparent,#708478,transparent);border-radius:2px;"></div>
        </div>

        <!-- Grid -->
        <div style="width:100%;display:grid;grid-template-columns:1fr;gap:12px;text-align:left;" class="rg-grid">
          <!-- Form -->
          <div style="position:relative;border-radius:16px;border:1px solid rgba(112,132,120,0.45);background:rgba(255,255,255,0.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 8px 24px rgba(36,48,41,0.16);padding:16px;">
            <h3 style="margin:0 0 12px;display:flex;align-items:center;gap:7px;font-size:16px;font-weight:400;color:#243029;" :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }">
              <svg style="width:17px;height:17px;color:#B0808A;flex-shrink:0;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-7 4.5L5 8V6l7 4.5L19 6v2z"/>
              </svg>
              Kirim Konfirmasi
            </h3>

            <form @submit.prevent="onSubmit" style="display:flex;flex-direction:column;gap:10px;">
              <div>
                <label style="display:block;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8A6E75;margin-bottom:5px;">Nama Lengkap</label>
                <input
                  v-model="form.guest_name"
                  type="text"
                  maxlength="50"
                  placeholder="Masukkan nama Anda"
                  required
                  autocomplete="name"
                  inputmode="text"
                  enterkeyhint="next"
                  style="width:100%;height:40px;padding:0 12px;border-radius:10px;border:1px solid rgba(112,132,120,0.5);background:rgba(255,255,255,0.9);color:#243029;font-size:13px;outline:none;box-sizing:border-box;"
                />
              </div>

              <div>
                <label style="display:block;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8A6E75;margin-bottom:5px;">Konfirmasi Kehadiran</label>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                  <button
                    type="button"
                    @click="form.attendance = 'hadir'"
                    :style="form.attendance === 'hadir'
                      ? 'height:38px;border-radius:10px;border:1px solid #B0808A;background:linear-gradient(to right,#D4A6AD,#ECE0D3);color:#243029;font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 4px 12px rgba(176,128,138,0.35);'
                      : 'height:38px;border-radius:10px;border:1px solid rgba(112,132,120,0.4);background:rgba(255,255,255,0.6);color:rgba(36,48,41,0.75);font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;'"
                  >
                    <span>✓</span> Hadir
                  </button>
                  <button
                    type="button"
                    @click="form.attendance = 'tidak_hadir'"
                    :style="form.attendance === 'tidak_hadir'
                      ? 'height:38px;border-radius:10px;border:1px solid #F5C1C1;background:#FDECEC;color:#A33A3A;font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 4px 12px rgba(163,58,58,0.2);'
                      : 'height:38px;border-radius:10px;border:1px solid rgba(112,132,120,0.4);background:rgba(255,255,255,0.6);color:rgba(36,48,41,0.75);font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;'"
                  >
                    <span>✕</span> Tidak Hadir
                  </button>
                </div>
              </div>

              <div v-show="form.attendance === 'hadir'">
                <label style="display:block;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8A6E75;margin-bottom:5px;">Jumlah Tamu</label>
                <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px;border-radius:10px;border:1px solid rgba(112,132,120,0.5);background:rgba(255,255,255,0.9);">
                  <button
                    type="button"
                    @click="form.guest_count = Math.max(1, form.guest_count - 1)"
                    style="width:32px;height:32px;border-radius:8px;border:none;background:transparent;color:#243029;font-size:16px;cursor:pointer;"
                  >−</button>
                  <div style="font-size:13px;font-weight:700;color:#243029;">{{ form.guest_count }} Orang</div>
                  <button
                    type="button"
                    @click="form.guest_count = Math.min(10, form.guest_count + 1)"
                    style="width:32px;height:32px;border-radius:8px;border:none;background:transparent;color:#243029;font-size:16px;cursor:pointer;"
                  >+</button>
                </div>
              </div>

              <div>
                <label style="display:block;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8A6E75;margin-bottom:5px;">Ucapan &amp; Doa Restu</label>
                <textarea
                  v-model="form.message"
                  rows="2"
                  maxlength="500"
                  placeholder="Tulis doa restu Anda untuk kedua mempelai..."
                  enterkeyhint="send"
                  @keydown="onTextareaKeydown"
                  style="width:100%;min-height:70px;padding:10px 12px;border-radius:10px;border:1px solid rgba(112,132,120,0.5);background:rgba(255,255,255,0.9);color:#243029;font-size:13px;line-height:1.55;outline:none;resize:none;box-sizing:border-box;font-family:inherit;"
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="submitting"
                style="width:100%;min-height:42px;border:none;border-radius:10px;background:linear-gradient(to right,#D4A6AD,#ECE0D3,#D4A6AD);color:#243029;font-size:11px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 16px rgba(176,128,138,0.35);opacity:1;"
              >
                <svg v-if="submitting" style="width:16px;height:16px;animation:spin 1s linear infinite;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle style="opacity:0.25;" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path style="opacity:0.75;" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ submitting ? 'Mengirim...' : 'Kirim Ucapan & Konfirmasi' }}</span>
              </button>
            </form>
          </div>

          <!-- Wishes -->
          <div style="position:relative;border-radius:16px;border:1px solid rgba(112,132,120,0.45);background:rgba(255,255,255,0.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 8px 24px rgba(36,48,41,0.16);padding:16px;display:flex;flex-direction:column;min-height:220px;">
            <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid rgba(112,132,120,0.3);">
              <h3 style="margin:0;font-size:16px;font-weight:400;color:#243029;" :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }">Ucapan Doa</h3>
              <span style="padding:3px 10px;border-radius:999px;font-size:11px;font-weight:700;border:1px solid rgba(176,128,138,0.4);color:#B0808A;background:rgba(255,255,255,0.7);white-space:nowrap;">{{ rsvpMessages.length }} Pesan</span>
            </div>

            <div v-if="rsvpMessages.length === 0" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px 0;">
              <div style="width:52px;height:52px;border-radius:50%;border:1px solid rgba(112,132,120,0.4);background:rgba(255,255,255,0.7);display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:10px;">💌</div>
              <p style="margin:0;font-size:12px;line-height:1.7;color:#B0808A;">Belum ada ucapan.<br />Jadilah yang pertama menyampaikan doa restu!</p>
            </div>

            <div v-else class="rg-scroll custom-scroll" data-lenis-prevent style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:8px;padding-right:4px;max-height:220px;min-height:0;overscroll-behavior:contain;touch-action:pan-y;-webkit-overflow-scrolling:touch;">
              <div
                v-for="msg in rsvpMessages"
                :key="msg.id"
                style="padding:13px 14px;border-radius:14px;border:1px solid rgba(112,132,120,0.3);background:rgba(255,255,255,0.7);"
              >
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                  <div style="width:36px;height:36px;border-radius:50%;flex-shrink:0;border:1px solid rgba(176,128,138,0.5);background:linear-gradient(135deg,#D4A6AD,#708478);color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:14px;">
                    {{ msg.guest_name.charAt(0).toUpperCase() }}
                  </div>
                  <div style="min-width:0;">
                    <h4 style="margin:0;font-size:13.5px;font-weight:700;color:#243029;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ msg.guest_name }}</h4>
                    <span style="font-size:10.5px;font-weight:600;display:flex;align-items:center;gap:4px;" :style="{ color: msg.attendance === 'hadir' ? '#B0808A' : '#9AA5A0' }">
                      <span style="font-size:8px;">●</span> {{ msg.attendance === 'hadir' ? 'Akan Hadir' : 'Berhalangan' }}
                      <span v-if="msg.attendance === 'hadir' && msg.guest_count > 1">({{ msg.guest_count }} orang)</span>
                    </span>
                  </div>
                </div>
                <p style="margin:0;padding-top:8px;border-top:1px solid rgba(112,132,120,0.2);font-size:13px;line-height:1.65;color:rgba(36,48,41,0.85);white-space:pre-wrap;word-break:break-word;">{{ msg.message }}</p>
                <div v-if="msg.reply_text" style="margin-top:8px;padding:9px 11px;border-radius:10px;background:#fff;border-left:3px solid #B0808A;font-size:12px;">
                  <div style="font-size:10px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#B0808A;margin-bottom:3px;">Balasan Mempelai</div>
                  <p style="margin:0;color:#243029;line-height:1.6;">{{ msg.reply_text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Margin bawah: fade-out baru boleh jalan setelah margin ini tampil (mentok scroll) -->
        <div style="height:64px;flex-shrink:0;" aria-hidden="true"></div>
      </div>
    </div>

    <!-- ================= -->
    <!-- PANEL 2 : GIFT    -->
    <!-- ================= -->
    <div
      v-if="hasGift"
      ref="giftPanel"
      class="rg-scroll absolute inset-0 z-10 w-full overflow-y-auto"
      style="padding:20px 14px 40px;pointer-events:none;overscroll-behavior:contain;touch-action:pan-y;-webkit-overflow-scrolling:touch;"
    >
      <div style="width:100%;max-width:400px;margin:auto;display:flex;flex-direction:column;align-items:center;">
        <div style="margin:0 0 12px;text-align:center;">
          <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:6px;">
            <span style="font-size:10px;color:#B0808A;">✦</span>
            <span style="font-size:10px;font-weight:700;letter-spacing:0.28em;text-transform:uppercase;color:#B0808A;">Tanda Kasih</span>
            <span style="font-size:10px;color:#B0808A;">✦</span>
          </div>
          <h2 style="margin:0;font-size:22px;line-height:1.2;font-weight:400;color:#243029;" :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }">
            Wedding Gift
          </h2>
          <p style="margin:6px auto 0;max-width:320px;font-size:11.5px;line-height:1.6;color:#4A5B52;">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun apabila Anda ingin memberikan tanda kasih, Anda dapat menggunakan amplop di bawah ini:
          </p>
          <div style="width:48px;height:2px;margin:8px auto 0;background:linear-gradient(to right,transparent,#708478,transparent);border-radius:2px;"></div>
        </div>

        <div style="width:100%;display:flex;flex-direction:column;gap:10px;">
          <div v-for="(bank, index) in bankList" :key="index" style="width:100%;">
            <div style="width:100%;box-sizing:border-box;aspect-ratio:1.586;border-radius:16px;padding:16px 18px;border:1px solid rgba(112,132,120,0.45);background:linear-gradient(135deg,#FFFFFF 0%,#FBF3EE 55%,#EADAE0 100%);box-shadow:0 8px 20px rgba(36,48,41,0.18);position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;text-align:left;">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
                <div style="width:42px;height:30px;border-radius:7px;border:1px solid rgba(176,128,138,0.6);background:linear-gradient(135deg,#ECE0D3,#D4A6AD);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                  <div style="width:26px;height:16px;border:1px solid rgba(112,132,120,0.5);border-radius:2px;display:grid;grid-template-columns:1fr 1fr;opacity:0.7;">
                    <div style="border-right:1px solid rgba(112,132,120,0.5);"></div>
                    <div></div>
                  </div>
                </div>
                <span style="font-size:15px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#243029;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }">
                  {{ bank.bank_name }}
                </span>
              </div>

              <div style="margin:0;">
                <span style="display:block;font-size:9px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#B0808A;margin-bottom:2px;">Nomor Rekening</span>
                <div style="font-size:19px;font-weight:800;letter-spacing:1.8px;color:#243029;font-family:ui-monospace,monospace;word-break:break-all;line-height:1.3;">{{ bank.bank_account }}</div>
              </div>

              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
                <div style="min-width:0;flex:1;">
                  <span style="display:block;font-size:8px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#B0808A;">Atas Nama</span>
                  <span style="font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#243029;word-break:break-word;line-height:1.3;">{{ bank.bank_holder || '-' }}</span>
                </div>
                <button
                  @click="copyAccount(index)"
                  :style="copiedIndex === index
                    ? 'flex-shrink:0;padding:8px 14px;border:none;border-radius:8px;background:#10B981;color:#fff;font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;gap:5px;'
                    : 'flex-shrink:0;padding:8px 14px;border:none;border-radius:8px;background:linear-gradient(to right,#D4A6AD,#ECE0D3,#D4A6AD);color:#243029;font-size:11px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;gap:5px;box-shadow:0 3px 10px rgba(176,128,138,0.35);'"
                >
                  <Icon v-if="copiedIndex === index" icon="ph:check-bold" style="width:12px;height:12px;" />
                  <Icon v-else icon="ph:copy-duotone" style="width:12px;height:12px;" />
                  {{ copiedIndex === index ? 'Tersalin' : 'Salin' }}
                </button>
              </div>
            </div>
          </div>

          <div
            v-if="invitation.gift_address"
            style="width:100%;box-sizing:border-box;padding:14px 16px;border-radius:14px;border:1px solid rgba(112,132,120,0.45);background:rgba(255,255,255,0.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 8px 20px rgba(36,48,41,0.15);text-align:left;"
          >
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <Icon icon="ph:gift-duotone" style="width:18px;height:18px;color:#B0808A;flex-shrink:0;" />
              <h3 style="margin:0;font-size:14px;font-weight:400;color:#243029;" :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }">Kirim Kado Fisik</h3>
            </div>
            <p style="margin:0 0 8px;font-size:12px;line-height:1.6;color:rgba(36,48,41,0.85);">{{ invitation.gift_address }}</p>
            <div v-if="invitation.gift_recipient || invitation.gift_phone" style="margin-bottom:10px;display:flex;flex-direction:column;gap:3px;font-size:11px;color:#B0808A;">
              <p v-if="invitation.gift_recipient" style="margin:0;">Penerima: <strong style="color:#243029;">{{ invitation.gift_recipient }}</strong></p>
              <p v-if="invitation.gift_phone" style="margin:0;">No. Telepon: <strong style="color:#243029;">{{ invitation.gift_phone }}</strong></p>
            </div>
            <button
              @click="copyAddress"
              :style="copiedAddress
                ? 'padding:8px 16px;border:none;border-radius:999px;background:#10B981;color:#fff;font-size:11px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center;gap:6px;'
                : 'padding:8px 16px;border:none;border-radius:999px;background:linear-gradient(to right,#D4A6AD,#ECE0D3,#D4A6AD);color:#243029;font-size:11px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 3px 10px rgba(176,128,138,0.35);'"
            >
              <Icon v-if="copiedAddress" icon="ph:check-bold" style="width:13px;height:13px;" />
              <Icon v-else icon="ph:copy-duotone" style="width:13px;height:13px;" />
              {{ copiedAddress ? 'Alamat Tersalin' : 'Salin Alamat' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== -->
    <!-- PANEL 3 : FOOTER     -->
    <!-- ==================== -->
    <div
      ref="footerPanel"
      class="rg-scroll absolute inset-0 z-10 w-full flex overflow-y-auto px-4 md:px-8 py-8 md:py-12"
      style="pointer-events: none;"
    >
      <!-- Background Image Footer -->
      <img
        src="https://media.mengundanganda.com/royalfantasy/footer%20section/dewirandi_b4e23ba2-4bac-422f-a55b-f0bdde5a48a2.webp"
        alt=""
        aria-hidden="true"
        style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        "
      />

      <!-- Info teks lama di-hide sementara sesuai request -->
      <div v-if="false" class="hidden-old-footer-info">
        <!-- Royal Crown Ornament -->
        <div
          ref="crownRef"
          class="w-14 h-14 rounded-full border border-[#708478]/50 bg-white/70 backdrop-blur-md flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(176,128,138,0.35)]"
        >
          <svg class="w-7 h-7 text-[#B0808A]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5m14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
          </svg>
        </div>

        <!-- Couple Initials / Names -->
        <h2
          class="text-3xl md:text-5xl font-serif text-[#243029] font-normal mb-4 drop-shadow-[0_2px_12px_rgba(255,255,255,0.65)]"
          :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
        >
          {{ invitation.groom_name }} &amp; {{ invitation.bride_name }}
        </h2>

        <!-- Thank you message -->
        <p class="text-xs md:text-sm text-[#4A5B52] leading-relaxed max-w-md mx-auto mb-12 font-light">
          Terima kasih yang terdalam telah menjadi bagian dari kisah dan hari bahagia kami. Doa restu Anda adalah anugerah terbesar bagi awal perjalanan rumah tangga kami.
        </p>

        <!-- Branding / Powered By -->
        <div class="flex flex-col items-center gap-2 pt-8 border-t border-[#708478]/30 w-full max-w-xs opacity-90">
          <span class="text-[10px] uppercase tracking-[0.3em] text-[#B0808A] font-semibold">
            POWERED BY
          </span>
          <a
            href="https://mengundanganda.com"
            target="_blank"
            rel="noopener noreferrer"
            class="flex flex-col items-center gap-2 text-decoration-none hover:scale-105 transition-transform duration-300"
          >
            <img src="/images/logo.webp" alt="MengundangAnda Logo" class="w-10 h-10 object-contain drop-shadow-md" />
            <span class="text-sm font-bold tracking-widest text-[#243029]">
              Mengundang<span class="text-[#B0808A]">Anda</span>
            </span>
          </a>
        </div>
      </div>

      <!-- ANIMASI BUKU 3D (FOOTER ROYAL FANTASY) -->
      <div class="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center my-auto">
        <FooterRoyalFantasy
          :invitation="invitation"
          :theme-config="themeConfig"
          :landed="footerState.landed"
          :bg-src="bgSrc"
        />
      </div>
    </div>
    <ScrollCueRoyalFantasy />
  </section>
</template>

<script setup lang="ts">
import ScrollCueRoyalFantasy from '@/components/invitation/royal/ScrollCueRoyalFantasy.vue';
import { reactive, ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/vue';
import FooterRoyalFantasy from '@/components/invitation/footer/FooterRoyalFantasy.vue';
import type { Invitation, BankAccount, Rsvp } from '@/types/invitation';
import type { ThemeConfig } from '@/types/theme';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  rsvpMessages: Rsvp[];
  themeConfig: ThemeConfig;
  submitting: boolean;
}>();

const emit = defineEmits<{
  (e: 'submitRsvp', form: { guest_name: string; attendance: 'hadir' | 'tidak_hadir'; guest_count: number; message: string }): void;
}>();

const form = reactive({
  guest_name: '',
  attendance: 'hadir' as 'hadir' | 'tidak_hadir',
  guest_count: 1,
  message: '',
});

const rgSection = ref<HTMLElement | null>(null);
const rsvpPanel = ref<HTMLElement | null>(null);
const giftPanel = ref<HTMLElement | null>(null);
const footerPanel = ref<HTMLElement | null>(null);
const crownRef = ref<HTMLElement | null>(null);
const bgLayer = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

// Background royal fantasy — dipakai layer asli (bgLayer) DAN halaman kanan
// buku (.page-art di FooterRoyalFantasy) — satu sumber string, jangan duplikat URL.
const bgSrc =
  'https://media.mengundanganda.com/royalfantasy/rsvp%20section/dewirandi_3d0caf40-f0a4-473f-bc4f-48cc6a21e796.webp';

// landed : 1 setelah buku selesai zoom-out mendarat -> anak boleh auto-close cover
const footerState = reactive({ landed: 0 });

// ===== KENOP ZOOM BUKU (animasi saja; posisi/ukuran buku = CSS kenop di
// FooterRoyalFantasy). Cerita baru: gambar bg = halaman kanan buku itu
// sendiri (.page-art). Saat fase footer dimulai buku di-scale raksasa
// (zoomStartScale) TANPA rotasi di awal, lalu SELAMA zoom-out berputar
// ZOOM.rotEndDeg ke kanan; buku mendarat dalam kemiringan rest-nya.
const ZOOM = {
  rotStartDeg: 0,    // AWAL (raksasa): TANPA rotasi — gambar langsung apa adanya
  rotEndDeg: 10,     // SELAMA zoom-out: buku berputar 10deg ke KANAN (miring rest)
  margin: 2.2,      // cadangan scale besar supaya layar tertutup rapat penuh di awal zoom
  duration: 1.6,
  ease: 'power1.inOut',
  hold: 3.0,        // waktu cover anak merampungkan auto-close sebelum unpin
} as const;

// S0: scale yang membuat rect halaman kanan (ukuran layout TANPA transform)
// menutupi viewport + margin rotasi. Function-based => dihitung ulang tiap
// invalidateOnRefresh (resize / orientation / breakpoint buku 170-320px).
function zoomStartScale(): number {
  const paper = rgSection.value?.querySelector('.page-right-base') as HTMLElement | null;
  if (!paper || !paper.offsetWidth || !paper.offsetHeight) return 6;
  return Math.max(
    window.innerWidth / paper.offsetWidth,
    window.innerHeight / paper.offsetHeight,
  ) * ZOOM.margin;
}

const copiedIndex = ref<number | null>(null);
const copiedAddress = ref(false);

const bankList = computed<BankAccount[]>(() => {
  if (
    props.invitation.banks &&
    Array.isArray(props.invitation.banks) &&
    props.invitation.banks.length > 0
  ) {
    return props.invitation.banks.filter((b) => b.bank_name || b.bank_account);
  }
  if (props.invitation.bank_name) {
    return [
      {
        bank_name: props.invitation.bank_name,
        bank_account: props.invitation.bank_account,
        bank_holder: props.invitation.bank_holder,
      },
    ];
  }
  return [];
});

const hasGift = computed(
  () => bankList.value.length > 0 || !!props.invitation.gift_address,
);

function copyAccount(index: number) {
  const bank = bankList.value[index];
  if (!bank?.bank_account) return;
  navigator.clipboard.writeText(bank.bank_account);
  copiedIndex.value = index;
  setTimeout(() => {
    copiedIndex.value = null;
  }, 2500);
}

function copyAddress() {
  if (!props.invitation.gift_address) return;
  let text = props.invitation.gift_address;
  if (props.invitation.gift_recipient) {
    text += `\n(Penerima: ${props.invitation.gift_recipient}`;
    if (props.invitation.gift_phone) text += `, Telp: ${props.invitation.gift_phone}`;
    text += `)`;
  }
  navigator.clipboard.writeText(text);
  copiedAddress.value = true;
  setTimeout(() => {
    copiedAddress.value = false;
  }, 2500);
}


onMounted(() => {
  if (
    !rgSection.value ||
    !rsvpPanel.value ||
    !footerPanel.value ||
    !bgLayer.value
  )
    return;

  ctx = gsap.context(() => {
    // Section di-PINNING pada 100dvh dengan 1 background yang sama.
    // Info bergantian saat scroll: RSVP tampil dulu -> fade out ->
    // Gift fade in -> fade out lagi -> FOOTER: buku (yang gambar bg-nya
    // adalah halaman kanan buku sendiri) di-scrub ZOOM-OUT dari raksasa
    // full-screen sampai ukuran rest, lalu cover buku auto-close.
    gsap.set(rsvpPanel.value, { opacity: 1, scale: 1, y: 0, scrollTop: 0 });
    gsap.set(footerPanel.value, { opacity: 0, scale: 0.92, y: 30 });
    // Cue scroll-down: sembunyi permanen saat fase footer dimulai
    // (footer = ujung undangan, tidak ada scroll lanjutan).
    const cueEl = rgSection.value?.querySelector<HTMLElement>('.rf-scroll-cue');
    if (giftPanel.value) {
      gsap.set(giftPanel.value, { opacity: 0, scale: 0.92, y: 30, scrollTop: 0 });
    }
    // Elemen zoom buku disetel ke posisi zoom raksasa sejak awal mount,
    // sehingga saat footerPanel pertama kali muncul, buku PASTI sudah dalam keadaan zoom!
    gsap.set('.book-zoom', {
      scale: zoomStartScale(),
      rotation: ZOOM.rotStartDeg,
      transformOrigin: '50% 50%',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rgSection.value,
        start: 'top top',
        // Gift selalu ada (3 fase tetap): RSVP slide-up -> Gift -> Footer buku.
        // end dikunci 480% agar ritme footer tidak berubah-ubah.
        end: '+=480%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // Resize/rotate: S0 dihitung ulang otomatis oleh invalidateOnRefresh
        // (scale: zoomStartScale bersifat function-based).
      },
    });

    // Tahan (hold) sejenak agar user sempat mengisi form RSVP
    tl.to({}, { duration: 0.5 });
    // SLIDE-UP OTOMATIS: konten RSVP yang melebihi 100vh di-scroll ke bawah
    // dulu (info atas naik, info bawah + margin bawah tampil di viewport),
    // BARU fade-out ke Gift. Terdorong scrub scroll window, berlaku
    // mouse + touch tanpa perlu scroll manual di dalam panel.
    tl.to(rsvpPanel.value, {
      scrollTop: () =>
        Math.max(0, rsvpPanel.value!.scrollHeight - rsvpPanel.value!.clientHeight),
      duration: 1.6,
      ease: 'none',
    });
    // Jeda saat posisi mentok bawah (margin bawah sudah tampil)
    tl.to({}, { duration: 0.4 })
      // RSVP fade out & bergeser ke atas
      .to(rsvpPanel.value, {
        opacity: 0,
        scale: 0.95,
        y: -30,
        duration: 1.2,
        ease: 'power2.inOut',
        onStart: () => {
          if (rsvpPanel.value) rsvpPanel.value.style.pointerEvents = 'none';
        },
        onReverseComplete: () => {
          if (rsvpPanel.value) rsvpPanel.value.style.pointerEvents = 'auto';
        },
      });

    // FASE GIFT (hanya kalau ada data bank / alamat kado)
    if (giftPanel.value) {
      tl.to(
        giftPanel.value,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          onStart: () => {
            if (giftPanel.value) giftPanel.value.style.pointerEvents = 'auto';
          },
          onReverseComplete: () => {
            if (giftPanel.value) giftPanel.value.style.pointerEvents = 'none';
          },
        },
        '-=0.4'
      )
        // Tahan agar user sempat melihat awal kartu rekening
        .to({}, { duration: 0.5 })
        // SLIDE-UP OTOMATIS gift juga: sampai kartu terakhir + margin
        // bawah tampil penuh, baru fade-out ke footer.
        .to(giftPanel.value, {
          scrollTop: () =>
            Math.max(0, giftPanel.value!.scrollHeight - giftPanel.value!.clientHeight),
          duration: 1.2,
          ease: 'none',
        })
        .to({}, { duration: 0.4 })
        // Gift fade out & bergeser ke atas
        .to(giftPanel.value, {
          opacity: 0,
          scale: 0.95,
          y: -30,
          duration: 1.2,
          ease: 'power2.inOut',
          onStart: () => {
            if (giftPanel.value) giftPanel.value.style.pointerEvents = 'none';
          },
          onComplete: () => {
            if (giftPanel.value) giftPanel.value.style.pointerEvents = 'none';
          },
          onReverseComplete: () => {
            if (giftPanel.value) giftPanel.value.style.pointerEvents = 'auto';
          },
        });
    }

    // ============ FASE FOOTER : ZOOM-OUT BUKU (SATU KESATUAN) ============
    // Gambar bg = halaman kanan buku itu sendiri (.page-art di anak).
    // Semua set() digabung di POSISI SAMA (footerStart) supaya dieksekusi
    // GSAP dalam satu frame yang sama: panel footer dimunculkan + bg asli
    // dimatikan + buku (sudah dalam posisi raksasa dari fromTo) menutupi
    // layar — swap tak kelihatan karena yang tampil = gambar yang sama.
    // PENTING immediateRender:false di set(): default true akan me-render
    // nilai AKHIR begitu tween ditambahkan ke timeline (panel & bg hilang
    // muncul di fase RSVP!). Dengan false, nilai awal direkam saat playhead
    // pertama kali lewat, dan scrub reverse otomatis mengembalikan keadaan semula.
    const footerStart = '-=0.4'; // menyambung ekor fade-out Gift
    // Cue scroll ikut fade-out tepat saat fase footer dimulai; scrub balik
    // otomatis memunculkannya lagi (immediateRender false).
    if (cueEl) {
      tl.to(
        cueEl,
        { autoAlpha: 0, duration: 0.5, ease: 'power1.out', immediateRender: false },
        footerStart,
      );
    }
    tl.set(
      footerPanel.value,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        // 'none' (bukan 'auto'): buku raksasa menambah scrollable area SEMU
        // di dalam panel .rg-scroll (overflow-y-auto) yang bisa MENANGKAP
        // wheel/touch dan membekukan ScrollTrigger. Panel footer tidak punya
        // elemen interaktif (tombol sudah dihapus; hanya teks "Tamat") ->
        // pointer-events none = wheel menembus ke window, scrub tetap lancar.
        pointerEvents: 'none',
        immediateRender: false,
      },
      footerStart,
    )
      .set(bgLayer.value, { autoAlpha: 0, immediateRender: false }, footerStart)
      // GERAK ZOOM-OUT utama (terscrub scroll): seluruh buku (paper + daun
      // SVG + cover + gambar halaman) mengecil seragam dari raksasa -> rest,
      // SEKALIGUS berputar 0deg -> +10deg ke kanan selama animasi berjalan.
      // Dimulai TEPAT di footerStart bersamaan dengan tampilnya footerPanel.
      .fromTo(
        '.book-zoom',
        {
          scale: () => zoomStartScale(),
          rotation: ZOOM.rotStartDeg,
          transformOrigin: '50% 50%',
        },
        {
          scale: 1,
          rotation: ZOOM.rotEndDeg,
          duration: ZOOM.duration,
          ease: ZOOM.ease,
        },
        footerStart,
      )
      // Flag mendarat -> anak boleh menjalankan auto-close cover flipper
      // (watch `landed` di FooterRoyalFantasy — tak diubah). Reverse scrub:
      // landed turun -> anak reset instan; buku langsung tertutup lagi oleh
      // zoom raksasanya sendiri, jadi pergantian tak kelihatan.
      .to(footerState, { landed: 1, duration: 0.01 })
      // Hold: beri waktu auto-close buku (~1.6dtk) selesai sebelum section unpin
      .to({}, { duration: ZOOM.hold });

    // Mahkota melayang naik-turun halus di panel footer
    if (crownRef.value) {
      gsap.to(crownRef.value, {
        y: -6,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, rgSection.value);

  // NOTE: tidak ada wheel-gate manual lagi. Slide-up konten RSVP/Gift yang
  // melebihi 100dvh kini didorong timeline scrub (tween scrollTop di atas),
  // jadi scroll window/page otomatis menggeser isi panel sampai margin bawah
  // tampil penuh sebelum fade-out. Berlaku untuk mouse & touch.
  // Refresh sekali setelah layout stabil agar scrollHeight (mentok) terukur
  // tepat setelah font/image/list ucapan render. Tidak mengubah timeline footer.
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
  if (typeof document !== 'undefined' && document.fonts) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }
});

onBeforeUnmount(() => {
  ctx?.revert();
  ScrollTrigger.getAll().forEach((st) => {
    if (st.trigger === rgSection.value) {
      st.kill();
    }
  });
});

function onSubmit() {
  emit('submitRsvp', { ...form });
  form.guest_name = '';
  form.attendance = 'hadir';
  form.guest_count = 1;
  form.message = '';
}

// Kirim dari keyboard: Ctrl/Cmd+Enter di textarea (Enter biasa = baris baru).
// Tombol fisik tetap utama karena ada pilihan Hadir + jumlah tamu yang butuh tap.
function onTextareaKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    onSubmit();
  }
}
</script>

<style scoped>
/* 2 kolom di desktop */
@media (min-width: 1024px) {
  .rg-grid { grid-template-columns: 1fr 1fr !important; }
  .rg-grid .rg-scroll, .rg-scroll { max-height: none !important; }
}
@media (min-width: 768px) {
  section > div { padding-left: 32px !important; padding-right: 32px !important; }
}
@keyframes spin { to { transform: rotate(360deg); } }
/* Sembunyikan scrollbar pada panel (scroll tetap jalan) */
.rg-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.rg-scroll::-webkit-scrollbar { display: none; }
.custom-scroll { scrollbar-width: thin; }
.custom-scroll::-webkit-scrollbar { width: 4px; display: block; }
.custom-scroll::-webkit-scrollbar-track { background: rgba(36,48,41,0.06); border-radius: 4px; }
.custom-scroll::-webkit-scrollbar-thumb { background: rgba(176,128,138,0.4); border-radius: 4px; }
.custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(176,128,138,0.7); }
@keyframes shimmer {
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(200%) skewX(-12deg); }
}
.animate-shimmer { animation: shimmer 6s infinite ease-in-out; }
</style>
