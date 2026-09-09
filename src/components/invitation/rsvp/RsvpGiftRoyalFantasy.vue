<template>
  <section
    ref="rgSection"
    class="relative h-[100dvh] w-full bg-[#AED4DA] overflow-hidden text-center flex items-center justify-center isolate"
  >
    <!-- Background Cover (mencakup panel RSVP, Gift & Footer sekaligus)
         tinggi full, lebar mengikuti rasio gambar, ngecover seluruh section.
         ref=bgLayer: di-fade-out saat fase footer dimulai — posisinya
         digantikan GAMBAR YANG SAMA di halaman kanan buku (.page-art di
         FooterRoyalFantasy) yang sedang di-zoom-in raksasa (lihat ZOOM). -->
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
      class="rg-scroll absolute inset-0 z-10 w-full overflow-y-auto px-4 md:px-8 py-8 md:py-12"
    >
      <div class="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <!-- Section Header -->
        <div class="mb-8 md:mb-10 text-center">
          <div class="flex items-center justify-center gap-2 mb-2">
            <span class="text-[#B0808A] text-xs">✦</span>
            <span class="text-xs uppercase tracking-[0.35em] text-[#B0808A] font-semibold">Buku Tamu &amp; Kehadiran</span>
            <span class="text-[#B0808A] text-xs">✦</span>
          </div>
          <h2
            class="text-2xl md:text-4xl font-serif text-[#243029] font-normal"
            :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
          >
            Konfirmasi Kehadiran &amp; Doa
          </h2>
          <p class="text-[11px] md:text-sm text-[#4A5B52] mt-2 max-w-md mx-auto leading-relaxed">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
          </p>
          <div class="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#708478] to-transparent mx-auto mt-3"></div>
        </div>

        <!-- Main Two Column Grid (Form & Wishes) -->
        <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch text-left">
          <!-- Form Column -->
          <div class="rg-card p-5 sm:p-7 md:p-8 rounded-3xl border border-[#708478]/50 bg-white/70 backdrop-blur-md shadow-[0_10px_35px_rgba(36,48,41,0.25),0_0_20px_rgba(176,128,138,0.15)] relative overflow-hidden flex flex-col justify-between">
            <span class="absolute top-3 left-4 text-[#B0808A]/60 text-xs">❖</span>
            <span class="absolute top-3 right-4 text-[#B0808A]/60 text-xs">❖</span>

            <div>
              <h3
                class="text-xl md:text-2xl font-normal text-[#243029] mb-5 flex items-center gap-2"
                :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
              >
                <svg class="w-5 h-5 md:w-6 md:h-6 text-[#B0808A]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-7 4.5L5 8V6l7 4.5L19 6v2z"/>
                </svg>
                Kirim Konfirmasi
              </h3>

              <form @submit.prevent="onSubmit" class="space-y-4 md:space-y-5">
                <!-- Name Input -->
                <div>
                  <label class="block text-xs font-semibold uppercase tracking-wider text-[#B0808A] mb-2">Nama Lengkap</label>
                  <input
                    v-model="form.guest_name"
                    type="text"
                    maxlength="50"
                    placeholder="Masukkan nama Anda"
                    required
                    class="w-full px-4 py-3 rounded-2xl border border-[#708478]/50 bg-white/70 text-[#243029] placeholder-[#243029]/40 focus:outline-none focus:border-[#B0808A] focus:ring-1 focus:ring-[#B0808A] transition-all text-sm"
                  />
                </div>

                <!-- Attendance Choice -->
                <div>
                  <label class="block text-xs font-semibold uppercase tracking-wider text-[#B0808A] mb-2">Konfirmasi Kehadiran</label>
                  <div class="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      @click="form.attendance = 'hadir'"
                      class="py-3 px-4 rounded-2xl border text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                      :class="
                        form.attendance === 'hadir'
                          ? 'border-[#B0808A] bg-gradient-to-r from-[#D4A6AD] to-[#ECE0D3] text-[#243029] shadow-md'
                          : 'border-[#708478]/30 bg-white/50 text-[#243029]/80 hover:border-[#B0808A]/50'
                      "
                    >
                      <span>✓</span> Hadir
                    </button>
                    <button
                      type="button"
                      @click="form.attendance = 'tidak_hadir'"
                      class="py-3 px-4 rounded-2xl border text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                      :class="
                        form.attendance === 'tidak_hadir'
                          ? 'border-red-300 bg-red-50 text-red-700 shadow-md'
                          : 'border-[#708478]/30 bg-white/50 text-[#243029]/80 hover:border-[#B0808A]/50'
                      "
                    >
                      <span>✕</span> Tidak Hadir
                    </button>
                  </div>
                </div>

                <!-- Guest Count -->
                <div v-show="form.attendance === 'hadir'">
                  <label class="block text-xs font-semibold uppercase tracking-wider text-[#B0808A] mb-2">Jumlah Tamu</label>
                  <div class="flex items-center justify-between px-3 py-1.5 rounded-2xl border border-[#708478]/50 bg-white/70">
                    <button
                      type="button"
                      @click="form.guest_count = Math.max(1, form.guest_count - 1)"
                      class="w-10 h-10 rounded-xl flex items-center justify-center text-lg text-[#243029] hover:bg-[#B0808A]/20 transition-all cursor-pointer"
                    >
                      −
                    </button>
                    <div class="text-sm font-semibold text-[#243029]">
                      {{ form.guest_count }} Orang
                    </div>
                    <button
                      type="button"
                      @click="form.guest_count = Math.min(10, form.guest_count + 1)"
                      class="w-10 h-10 rounded-xl flex items-center justify-center text-lg text-[#243029] hover:bg-[#B0808A]/20 transition-all cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <!-- Message -->
                <div>
                  <label class="block text-xs font-semibold uppercase tracking-wider text-[#B0808A] mb-2">Ucapan &amp; Doa Restu</label>
                  <textarea
                    v-model="form.message"
                    rows="3"
                    maxlength="500"
                    placeholder="Tulis doa restu Anda untuk kedua mempelai..."
                    class="w-full px-4 py-3 rounded-2xl border border-[#708478]/50 bg-white/70 text-[#243029] placeholder-[#243029]/40 focus:outline-none focus:border-[#B0808A] focus:ring-1 focus:ring-[#B0808A] transition-all text-sm resize-none"
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  :disabled="submitting"
                  class="w-full py-3.5 px-6 rounded-2xl text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[#243029] bg-gradient-to-r from-[#D4A6AD] via-[#ECE0D3] to-[#D4A6AD] shadow-[0_4px_20px_rgba(176,128,138,0.35)] hover:shadow-[0_6px_25px_rgba(176,128,138,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg v-if="submitting" class="animate-spin h-4 w-4 text-[#243029]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{{ submitting ? 'Mengirim...' : 'Kirim Ucapan & Konfirmasi' }}</span>
                </button>
              </form>
            </div>
          </div>

          <!-- Wishes List Column -->
          <div class="rg-card p-5 sm:p-7 md:p-8 rounded-3xl border border-[#708478]/50 bg-white/70 backdrop-blur-md shadow-[0_10px_35px_rgba(36,48,41,0.25),0_0_20px_rgba(176,128,138,0.15)] relative overflow-hidden flex flex-col">
            <span class="absolute top-3 left-4 text-[#B0808A]/60 text-xs">❖</span>
            <span class="absolute top-3 right-4 text-[#B0808A]/60 text-xs">❖</span>

            <div class="flex justify-between items-center mb-4 pb-3 border-b border-[#708478]/30">
              <h3
                class="text-xl md:text-2xl font-normal text-[#243029]"
                :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
              >
                Ucapan Doa
              </h3>
              <span class="px-3 py-1 rounded-full text-xs font-semibold border border-[#B0808A]/40 text-[#B0808A] bg-white/60">
                {{ rsvpMessages.length }} Pesan
              </span>
            </div>

            <!-- Empty State -->
            <div v-if="rsvpMessages.length === 0" class="flex-1 flex flex-col items-center justify-center text-center text-[#4A5B52] py-8">
              <div class="w-14 h-14 rounded-full border border-[#708478]/50 bg-white/60 flex items-center justify-center text-2xl mb-3">
                💌
              </div>
              <p class="text-xs text-[#B0808A]">
                Belum ada ucapan.<br />Jadilah yang pertama menyampaikan doa restu!
              </p>
            </div>

            <!-- Messages Scrollable List -->
            <div v-else class="rg-scroll flex-1 overflow-y-auto space-y-3 md:space-y-4 pr-2 custom-scroll max-h-[30dvh] lg:max-h-[46dvh]">
              <div
                v-for="msg in rsvpMessages"
                :key="msg.id"
                class="p-4 rounded-2xl border border-[#708478]/30 bg-white/60 space-y-2"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-full border border-[#B0808A]/50 bg-gradient-to-br from-[#D4A6AD] to-[#708478] text-[#243029] font-bold flex items-center justify-center text-sm shadow-sm">
                      {{ msg.guest_name.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <h4 class="text-sm font-semibold text-[#243029]">{{ msg.guest_name }}</h4>
                      <span
                        class="text-[10px] font-medium flex items-center gap-1"
                        :class="msg.attendance === 'hadir' ? 'text-[#B0808A]' : 'text-gray-500'"
                      >
                        <span>●</span> {{ msg.attendance === 'hadir' ? 'Akan Hadir' : 'Berhalangan' }}
                        <span v-if="msg.attendance === 'hadir' && msg.guest_count > 1">({{ msg.guest_count }} orang)</span>
                      </span>
                    </div>
                  </div>
                </div>

                <p class="text-xs text-[#243029]/80 leading-relaxed pt-2 border-t border-[#708478]/20 whitespace-pre-wrap">
                  {{ msg.message }}
                </p>

                <!-- Couple Reply (if any) -->
                <div v-if="msg.reply_text" class="mt-2 p-3 rounded-xl bg-white/80 border-l-2 border-[#B0808A] text-xs">
                  <div class="text-[10px] font-semibold uppercase tracking-wider text-[#B0808A] mb-1">Balasan Mempelai</div>
                  <p class="text-[#243029]">{{ msg.reply_text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= -->
    <!-- PANEL 2 : GIFT    -->
    <!-- ================= -->
    <div
      v-if="hasGift"
      ref="giftPanel"
      class="rg-scroll absolute inset-0 z-10 w-full flex overflow-y-auto px-4 md:px-8 py-8 md:py-12"
      style="pointer-events: none;"
    >
      <div class="relative z-10 w-full max-w-md mx-auto flex flex-col items-center my-auto">
        <!-- Section Header -->
        <div class="mb-8 md:mb-10 text-center">
          <div class="flex items-center justify-center gap-2 mb-2">
            <span class="text-[#B0808A] text-xs">✦</span>
            <span class="text-xs uppercase tracking-[0.35em] text-[#B0808A] font-semibold">Tanda Kasih</span>
            <span class="text-[#B0808A] text-xs">✦</span>
          </div>
          <h2
            class="text-2xl md:text-4xl font-serif text-[#243029] font-normal"
            :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
          >
            Wedding Gift
          </h2>
          <p class="text-[11px] md:text-sm text-[#4A5B52] mt-2 max-w-md mx-auto leading-relaxed">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun apabila Anda ingin memberikan tanda kasih secara digital, Anda dapat menggunakan amplop di bawah ini:
          </p>
          <div class="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#708478] to-transparent mx-auto mt-3"></div>
        </div>

        <!-- Bank Cards List -->
        <div class="w-full flex flex-col items-center gap-6 md:gap-8">
          <div
            v-for="(bank, index) in bankList"
            :key="index"
            class="w-full flex flex-col items-center"
          >
            <!-- Royal Glassmorphic Debit Card -->
            <div class="w-full aspect-[1.58] rounded-3xl p-5 sm:p-6 md:p-8 border border-[#708478]/50 bg-gradient-to-br from-white via-[#FBF3EE] to-[#E9D9DE] shadow-[0_12px_35px_rgba(36,48,41,0.25),0_0_25px_rgba(176,128,138,0.2)] relative overflow-hidden flex flex-col justify-between text-left">
              <!-- Shimmer Animation Overlay -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none transform -skew-x-12 animate-shimmer"></div>

              <!-- Top Row: Chip & Bank Name -->
              <div class="flex justify-between items-center relative z-10">
                <!-- Golden EMV Chip Icon -->
                <div class="w-12 h-9 rounded-lg border border-[#B0808A]/60 bg-gradient-to-br from-[#ECE0D3] to-[#D4A6AD] flex items-center justify-center shadow-md">
                  <div class="w-8 h-5 border border-[#708478]/40 rounded-sm grid grid-cols-2 gap-0.5 opacity-60">
                    <div class="border-r border-[#708478]/40"></div>
                    <div></div>
                  </div>
                </div>

                <!-- Bank Name Badge -->
                <span
                  class="text-lg md:text-xl font-bold uppercase tracking-wider text-[#243029]"
                  :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
                >
                  {{ bank.bank_name }}
                </span>
              </div>

              <!-- Middle: Account Number -->
              <div class="relative z-10 my-2">
                <span class="text-[10px] uppercase tracking-widest text-[#B0808A] block mb-1">Nomor Rekening</span>
                <div class="text-xl md:text-2xl font-mono font-bold tracking-widest text-[#243029] drop-shadow-sm">
                  {{ bank.bank_account }}
                </div>
              </div>

              <!-- Bottom Row: Card Holder & Copy Button -->
              <div class="flex justify-between items-end relative z-10">
                <div>
                  <span class="text-[9px] uppercase tracking-widest text-[#B0808A] block">Atas Nama</span>
                  <span class="text-sm font-semibold uppercase tracking-wider text-[#243029]">
                    {{ bank.bank_holder || '-' }}
                  </span>
                </div>

                <button
                  @click="copyAccount(index)"
                  class="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-md"
                  :class="
                    copiedIndex === index
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gradient-to-r from-[#D4A6AD] via-[#ECE0D3] to-[#D4A6AD] text-[#243029] hover:scale-105'
                  "
                >
                  <Icon v-if="copiedIndex === index" icon="ph:check-bold" class="w-3.5 h-3.5" />
                  <Icon v-else icon="ph:copy-duotone" class="w-3.5 h-3.5 text-[#243029]" />
                  {{ copiedIndex === index ? 'Tersalin' : 'Salin' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Gift Delivery Address (if provided) -->
          <div
            v-if="invitation.gift_address"
            class="w-full p-5 sm:p-6 md:p-8 rounded-3xl border border-[#708478]/50 bg-white/70 backdrop-blur-md shadow-[0_10px_35px_rgba(36,48,41,0.25)] text-left relative"
          >
            <div class="flex items-center gap-3 mb-4">
              <Icon icon="ph:gift-duotone" class="w-6 h-6 text-[#B0808A]" />
              <h3
                class="text-lg md:text-xl font-normal text-[#243029]"
                :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
              >
                Kirim Kado Fisik
              </h3>
            </div>

            <p class="text-xs md:text-sm text-[#243029]/80 leading-relaxed mb-4">
              {{ invitation.gift_address }}
            </p>

            <div v-if="invitation.gift_recipient || invitation.gift_phone" class="text-xs text-[#B0808A] space-y-1 mb-4">
              <p v-if="invitation.gift_recipient">
                Penerima: <strong class="text-[#243029]">{{ invitation.gift_recipient }}</strong>
              </p>
              <p v-if="invitation.gift_phone">
                No. Telepon: <strong class="text-[#243029]">{{ invitation.gift_phone }}</strong>
              </p>
            </div>

            <button
              @click="copyAddress"
              class="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-md"
              :class="
                copiedAddress
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gradient-to-r from-[#D4A6AD] via-[#ECE0D3] to-[#D4A6AD] text-[#243029] hover:scale-105'
              "
            >
              <Icon v-if="copiedAddress" icon="ph:check-bold" class="w-4 h-4" />
              <Icon v-else icon="ph:copy-duotone" class="w-4 h-4 text-[#243029]" />
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
  </section>
</template>

<script setup lang="ts">
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
    gsap.set(rsvpPanel.value, { opacity: 1, scale: 1, y: 0 });
    gsap.set(footerPanel.value, { opacity: 0, scale: 0.92, y: 30 });
    if (giftPanel.value) {
      gsap.set(giftPanel.value, { opacity: 0, scale: 0.92, y: 30 });
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
        // Scroll lebih panjang kalau panel Gift ikut ada (3 fase).
        // Diperpanjang dari 300/220 karena fase footer sekarang memuat
        // animasi zoom-out buku (1.6) + hold auto-close (3.0).
        end: giftPanel.value ? '+=400%' : '+=320%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // Resize/rotate: S0 dihitung ulang otomatis oleh invalidateOnRefresh
        // (scale: zoomStartScale bersifat function-based).
      },
    });

    // Tahan (hold) sejenak agar user sempat mengisi form RSVP
    tl.to({}, { duration: 0.8 })
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
        // Tahan agar user sempat melihat & menyalin rekening
        .to({}, { duration: 1.0 })
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
</script>

<style scoped>
/* Sembunyikan scrollbar pada panel (scroll tetap jalan) */
.rg-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.rg-scroll::-webkit-scrollbar {
  display: none;
}

/* Scrollbar halus untuk daftar ucapan */
.custom-scroll::-webkit-scrollbar {
  width: 4px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: rgba(36, 48, 41, 0.06);
  border-radius: 4px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(176, 128, 138, 0.4);
  border-radius: 4px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(176, 128, 138, 0.7);
}

@keyframes shimmer {
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(200%) skewX(-12deg); }
}

.animate-shimmer {
  animation: shimmer 6s infinite ease-in-out;
}


</style>
