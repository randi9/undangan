<template>
  <footer
    ref="footerSection"
    class="px-6 text-center text-white relative overflow-hidden flex flex-col items-center justify-center"
    style="height: 100dvh;"
  >
    <!-- Background Cover Image (Scale 2.4) -->
    <div 
      ref="bgImageRef"
      class="absolute inset-0 z-0 bg-[#6A4E42]" 
      style="background-image: url('https://media.mengundanganda.com/fairygarden/footer%20section/dewirandi_b928e5b1-d044-45bc-b314-24b25b4ca215.webp'); background-size: cover; background-position: center; transform: scale(2.4);"
    ></div>

    <!-- Slide 1: Gift Section Content -->
    <div
      v-if="bankList.length > 0 || invitation.gift_address"
      ref="giftWrapper"
      class="absolute inset-0 z-10 flex flex-col items-center justify-center px-4"
    >
      <!-- Header -->
      <div class="mb-8">
        <h2
          class="text-3xl md:text-5xl mb-3 text-[#EBCFD1] drop-shadow-md font-medium"
          :style="{ fontFamily: themeConfig.fontHeading }"
        >
          Wedding Gift
        </h2>
        <div class="flex items-center justify-center gap-4 mb-3 text-[#EBCFD1] opacity-80">
          <svg viewBox="0 0 60 2" class="w-10 md:w-14" style="opacity: 0.4">
            <rect width="60" height="1" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 24 24" class="w-4 h-4" style="opacity: 0.6">
            <path
              d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"
              fill="currentColor"
            />
          </svg>
          <svg viewBox="0 0 60 2" class="w-10 md:w-14" style="opacity: 0.4">
            <rect width="60" height="1" fill="currentColor" />
          </svg>
        </div>
        <p class="max-w-md mx-auto text-xs md:text-sm leading-relaxed text-[#F8F3EE] opacity-90 px-4">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami.<br />
          Namun, apabila Anda ingin memberikan tanda kasih, kami menyediakan
          amplop digital di bawah ini.
        </p>
      </div>

      <!-- Gift Cards Container (Horizontal on Desktop, Vertical on Mobile) -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-4xl px-4 py-2 overflow-y-auto max-h-[55dvh]">
        
        <!-- Bank Accounts -->
        <div
          v-for="(bank, index) in bankList"
          :key="index"
          class="flex flex-col items-center gap-2 w-full max-w-[340px]"
        >
          <!-- Debit Card Design -->
          <div
            class="group w-full aspect-[1.58] bg-white/95 p-5 rounded-2xl shadow-xl border border-[#EBCFD1] relative overflow-hidden flex flex-col justify-between text-left transition-transform duration-500 hover:scale-[1.02]"
          >
            <!-- Elegant Pattern Decor -->
            <div class="absolute -right-12 -top-12 w-48 h-48 border-[1.5px] border-[#EBCFD1]/30 rounded-full pointer-events-none"></div>
            <div class="absolute -right-6 -top-6 w-32 h-32 border-[1.5px] border-[#EBCFD1]/40 rounded-full pointer-events-none"></div>
            <div class="absolute -left-12 -bottom-12 w-40 h-40 border-[1px] border-[#EBCFD1]/20 rounded-full pointer-events-none"></div>

            <!-- Top Row: Chip and Bank Name -->
            <div class="flex justify-between items-start z-10">
              <!-- EMV Chip -->
              <div class="w-10 h-7 rounded-md relative overflow-hidden shadow-sm border border-black/10 bg-gradient-to-br from-[#EBCFD1] to-[#D9A9AF]">
                <div class="absolute inset-y-0 left-2.5 w-px bg-black/10"></div>
                <div class="absolute inset-y-0 right-2.5 w-px bg-black/10"></div>
                <div class="absolute inset-x-0 top-2.5 h-px bg-black/10"></div>
                <div class="absolute inset-x-0 bottom-2.5 h-px bg-black/10"></div>
              </div>

              <div class="font-bold text-base tracking-widest uppercase text-[#D9A9AF]">
                {{ bank.bank_name }}
              </div>
            </div>

            <!-- Middle: Account Number -->
            <div class="z-10 mt-auto mb-4 relative">
              <div class="text-lg md:text-xl font-bold tracking-[0.12em] font-mono drop-shadow-sm flex items-center gap-2 text-[#6A4E42]">
                {{ bank.bank_account }}
                <button
                  @click="copyAccount(index)"
                  title="Salin Nomor"
                  class="bg-white border border-[#EBCFD1] text-gray-700 p-1.5 rounded-lg hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center hover:scale-105 active:scale-95"
                >
                  <svg v-if="copiedIndex !== index" viewBox="0 0 24 24" class="w-3.5 h-3.5 text-[#AEB8A3] fill-current">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                  </svg>
                  <svg v-else viewBox="0 0 24 24" class="w-3.5 h-3.5 text-green-600 fill-current">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </button>
              </div>
              <div
                v-show="copiedIndex === index"
                class="absolute mt-0.5 text-[9px] font-bold uppercase tracking-wider text-green-600 animate-fade-in"
              >
                Berhasil Disalin!
              </div>
            </div>

            <!-- Bottom Row: Card Holder & Rings -->
            <div class="flex justify-between items-end z-10">
              <div class="flex flex-col">
                <span class="text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">A.N. Rekening</span>
                <span class="text-xs md:text-sm font-bold uppercase tracking-widest leading-tight text-[#6A4E42]">
                  {{ bank.bank_holder }}
                </span>
              </div>
              <!-- Debit Card Rings Mock -->
              <div class="flex opacity-50 items-center drop-shadow-sm">
                <div class="w-7 h-7 rounded-full mix-blend-multiply bg-[#AEB8A3]"></div>
                <div class="w-7 h-7 rounded-full mix-blend-multiply -ml-3 bg-[#EBCFD1]"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Physical Gift Address Card -->
        <div
          v-if="invitation.gift_address"
          class="flex flex-col items-center gap-2 w-full max-w-[340px]"
        >
          <div class="group w-full p-5 rounded-2xl shadow-xl border border-[#EBCFD1] bg-white/95 relative overflow-hidden flex flex-col justify-between text-left transition-transform duration-500 hover:scale-[1.02]">
            <!-- Pattern decor -->
            <div class="absolute -right-12 -top-12 w-48 h-48 border-[1.5px] border-[#EBCFD1]/30 rounded-full pointer-events-none"></div>

            <div class="flex justify-between items-start z-10 mb-2">
              <div class="font-bold text-xs tracking-wider uppercase text-[#D9A9AF]">
                Kirim Kado
              </div>
              <svg viewBox="0 0 24 24" class="w-4 h-4 text-[#AEB8A3] fill-current">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>

            <div class="z-10 mb-2">
              <p class="text-xs text-[#6A4E42] leading-relaxed font-semibold mb-2" style="white-space: pre-line">
                {{ invitation.gift_address }}
              </p>
              <div class="text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">
                Penerima
              </div>
              <div class="text-xs font-bold uppercase tracking-wider text-[#D9A9AF]">
                {{ invitation.gift_recipient || "-" }}
              </div>
              <div v-if="invitation.gift_phone" class="text-[10px] text-gray-500 mt-0.5 font-mono">
                Telp: {{ invitation.gift_phone }}
              </div>
            </div>

            <div class="flex justify-between items-center z-10 mt-1">
              <button
                @click="copyAddress"
                class="bg-white border border-[#EBCFD1] text-[#6A4E42] px-3.5 py-1.5 rounded-lg hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-1.5 text-[10px] font-semibold hover:scale-102 active:scale-95"
              >
                <svg v-if="!copiedAddress" viewBox="0 0 24 24" class="w-3.5 h-3.5 text-[#AEB8A3] fill-current">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
                <svg v-else viewBox="0 0 24 24" class="w-3.5 h-3.5 text-green-600 fill-current">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                {{ copiedAddress ? "Alamat Disalin!" : "Salin Alamat" }}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Gate Assets — independent layer, NOT inside footerWrapper -->
    <div class="absolute inset-0 z-[5] pointer-events-none overflow-hidden" style="perspective: 1200px;">
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
          style="width: 100%; height: auto; object-fit: contain;"
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
          style="width: 100%; height: auto; object-fit: contain; transform: scaleX(-1);"
        />
      </div>
    </div>

    <!-- Slide 2: Footer Section Content -->
    <div
      ref="footerWrapper"
      class="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
    >
      <!-- Footer Content Wrapper -->
      <div class="relative z-10 flex flex-col items-center justify-center">
        <!-- Decorative Top Divider -->
        <div class="mb-10 flex items-center justify-center gap-4">
          <svg viewBox="0 0 100 2" class="w-16 md:w-24 opacity-60"><line x1="0" y1="1" x2="100" y2="1" stroke="#EBCFD1" stroke-width="1.5"/></svg>
          <svg viewBox="0 0 24 24" class="w-6 h-6 text-[#EBCFD1] opacity-80" fill="none" stroke="currentColor" stroke-width="1.5">
             <path d="M12 2 L15 9 L22 9 L16 14 L18 21 L12 17 L6 21 L8 14 L2 9 L9 9 Z" stroke-linejoin="round"/>
          </svg>
          <svg viewBox="0 0 100 2" class="w-16 md:w-24 opacity-60"><line x1="0" y1="1" x2="100" y2="1" stroke="#EBCFD1" stroke-width="1.5"/></svg>
        </div>

        <p class="text-[9px] md:text-sm tracking-[0.3em] uppercase mb-4 opacity-80 text-[#EBCFD1]">The Wedding Of</p>
        
        <p class="text-4xl md:text-6xl lg:text-7xl mb-10 drop-shadow-lg text-[#EBCFD1]" :style="{ fontFamily: themeConfig.fontHeading }">
          {{ invitation.groom_name }}
          <span class="inline-block mx-2 md:mx-4 text-3xl md:text-5xl opacity-70">&amp;</span>
          {{ invitation.bride_name }}
        </p>
        
        <p class="text-sm md:text-base font-light tracking-wide opacity-90 max-w-md mx-auto leading-relaxed text-[#F8F3EE]">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
        
        <p class="text-sm md:text-base italic mt-4 opacity-80 text-[#F8F3EE]">
          Terima kasih.
        </p>

        <div class="mt-16 pt-6 border-t border-white/20 w-[80%] max-w-sm flex flex-col items-center gap-2">
          <div class="text-[10px] md:text-xs opacity-60 uppercase tracking-widest text-[#F8F3EE]">Dibuat dengan</div>
          <div class="font-bold tracking-widest text-sm opacity-80 flex items-center gap-1.5 text-[#F8F3EE]">
            Mengundang<span class="text-[#EBCFD1]">Anda</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation, BankAccount } from '@/types/invitation';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

const footerSection = ref<HTMLElement | null>(null);
const bgImageRef = ref<HTMLElement | null>(null);
const giftWrapper = ref<HTMLElement | null>(null);
const footerWrapper = ref<HTMLElement | null>(null);
const leftGateRef = ref<HTMLElement | null>(null);
const rightGateRef = ref<HTMLElement | null>(null);

const copiedIndex = ref<number | null>(null);
const copiedAddress = ref(false);

let pinTimeline: gsap.core.Timeline | null = null;

// --- Gift Logic & Computations ---
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
    if (props.invitation.gift_phone)
      text += `, Telp: ${props.invitation.gift_phone}`;
    text += `)`;
  }
  navigator.clipboard.writeText(text);
  copiedAddress.value = true;
  setTimeout(() => {
    copiedAddress.value = false;
  }, 2500);
}

onMounted(() => {
  const hasGift = bankList.value.length > 0 || !!props.invitation.gift_address;

  if (hasGift && footerSection.value) {
    // Hide footer content; gates start open (matching inline CSS defaults)
    gsap.set(footerWrapper.value, { opacity: 0, y: 40 });
    // Gates start wide open (swung inward) and invisible
    gsap.set(leftGateRef.value, { rotateY: -60, opacity: 0 });
    gsap.set(rightGateRef.value, { rotateY: 60, opacity: 0 });

    pinTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: footerSection.value,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      }
    });

    // Sequential elegant transitions:
    // 1. GiftWrapper slides up and fades out completely
    pinTimeline.to(giftWrapper.value, {
      opacity: 0,
      y: -40,
      duration: 1.0,
      ease: 'power2.out',
    });

    // 2. Background zooms out first
    pinTimeline.to(bgImageRef.value, {
      scale: 1.0,
      duration: 1.5,
      ease: 'power2.inOut',
    });

    // 3. After zoom-out is done, gates fade in and swing shut
    pinTimeline.to([leftGateRef.value, rightGateRef.value], {
      opacity: 0.9,
      duration: 0.3,
      ease: 'power1.in',
    });

    pinTimeline.to(leftGateRef.value, {
      rotateY: 0,
      duration: 1.5,
      ease: 'power2.inOut',
    }, '<');

    pinTimeline.to(rightGateRef.value, {
      rotateY: 0,
      duration: 1.5,
      ease: 'power2.inOut',
    }, '<');

    // 4. Footer text fades in after gates are closed
    pinTimeline.to(footerWrapper.value, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
    }, '-=0.3');
  } else {
    // Standard layout (no gift content): footerWrapper is immediately fully visible
    if (footerWrapper.value) {
      gsap.set(footerWrapper.value, { opacity: 1, y: 0 });
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
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
