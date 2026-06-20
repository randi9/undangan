<template>
  <section
    v-if="bankList.length > 0 || invitation.gift_address"
    ref="giftSection"
    class="py-24 px-6 text-center bg-[#F8F3EE]"
  >
    <!-- Header -->
    <div ref="headerRef" class="opacity-0 translate-y-6 mb-12">
      <h2
        class="text-3xl md:text-5xl mb-3 text-[#D9A9AF]"
        :style="{ fontFamily: themeConfig.fontHeading }"
      >
        Wedding Gift
      </h2>
      <div class="flex items-center justify-center gap-4 mb-4 text-[#AEB8A3]">
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
      <p class="max-w-xl mx-auto text-sm md:text-base leading-relaxed text-[#9A7B6B]">
        Doa restu Anda merupakan karunia yang sangat berarti bagi kami.<br />
        Namun, apabila Anda ingin memberikan tanda kasih, kami menyediakan
        amplop digital di bawah ini.
      </p>
    </div>

    <div class="flex flex-col items-center gap-10 w-full overflow-hidden px-2 py-4">
      <div
        v-for="(bank, index) in bankList"
        :key="index"
        :ref="el => { if (el) cardRefs[index] = el as HTMLElement; }"
        class="flex flex-col items-center gap-6 w-full max-w-[400px] opacity-0 translate-y-12"
      >
        <!-- Debit Card Concept (Rose Garden) -->
        <div
          class="group w-full aspect-[1.58] bg-white p-6 rounded-2xl shadow-xl border border-[#EBCFD1] relative overflow-hidden flex flex-col justify-between text-left transition-transform duration-500 hover:scale-[1.03]"
        >
          <!-- Elegant Pattern Decor -->
          <div class="absolute -right-12 -top-12 w-48 h-48 border-[1.5px] border-[#EBCFD1]/30 rounded-full pointer-events-none"></div>
          <div class="absolute -right-6 -top-6 w-32 h-32 border-[1.5px] border-[#EBCFD1]/40 rounded-full pointer-events-none"></div>
          <div class="absolute -left-12 -bottom-12 w-40 h-40 border-[1px] border-[#EBCFD1]/20 rounded-full pointer-events-none"></div>

          <!-- Top Row: Chip and Bank Name -->
          <div class="flex justify-between items-start z-10">
            <!-- EMV Chip -->
            <div class="w-11 h-8 rounded-md relative overflow-hidden shadow-sm border border-black/10 bg-gradient-to-br from-[#EBCFD1] to-[#D9A9AF]">
              <div class="absolute inset-y-0 left-3 w-px bg-black/10"></div>
              <div class="absolute inset-y-0 right-3 w-px bg-black/10"></div>
              <div class="absolute inset-x-0 top-3 h-px bg-black/10"></div>
              <div class="absolute inset-x-0 bottom-3 h-px bg-black/10"></div>
              <div class="absolute inset-y-2 inset-x-3.5 border border-black/10 rounded-sm"></div>
            </div>

            <div class="font-bold text-xl tracking-widest uppercase text-[#D9A9AF]">
              {{ bank.bank_name }}
            </div>
          </div>

          <!-- Middle: Account Number -->
          <div class="z-10 mt-auto mb-6 relative">
            <div class="text-[clamp(18px,5vw,24px)] font-bold tracking-[0.12em] font-mono drop-shadow-sm flex items-center gap-3 text-[#6A4E42]">
              {{ bank.bank_account }}
              <button
                @click="copyAccount(index)"
                title="Salin Nomor"
                class="bg-white border border-[#EBCFD1] text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center hover:scale-110 active:scale-95"
              >
                <svg v-if="copiedIndex !== index" viewBox="0 0 24 24" class="w-4 h-4 text-[#AEB8A3] fill-current">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
                <svg v-else viewBox="0 0 24 24" class="w-4 h-4 text-green-600 fill-current">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </button>
            </div>
            <div
              v-show="copiedIndex === index"
              class="absolute mt-1.5 text-[11px] font-bold uppercase tracking-wider text-green-600 animate-fade-in"
            >
              Berhasil Disalin!
            </div>
          </div>

          <!-- Bottom Row: Card Holder & Rings -->
          <div class="flex justify-between items-end z-10">
            <div class="flex flex-col">
              <span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">A.N. Rekening</span>
              <span class="text-sm md:text-base font-bold uppercase tracking-widest leading-tight text-[#6A4E42]">
                {{ bank.bank_holder }}
              </span>
            </div>
            <!-- Debit Card Rings Mock -->
            <div class="flex opacity-50 items-center drop-shadow-sm">
              <div class="w-8 h-8 rounded-full mix-blend-multiply bg-[#AEB8A3]"></div>
              <div class="w-8 h-8 rounded-full mix-blend-multiply -ml-4 bg-[#EBCFD1]"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Physical Gift Address Card -->
      <div
        v-if="invitation.gift_address"
        :ref="el => { if (el) cardRefs[bankList.length] = el as HTMLElement; }"
        class="flex flex-col items-center gap-6 w-full max-w-[400px] opacity-0 translate-y-12"
      >
        <div class="group w-full p-6 rounded-2xl shadow-xl border border-[#EBCFD1] bg-white relative overflow-hidden flex flex-col justify-between text-left transition-transform duration-500 hover:scale-[1.03]">
          <!-- Pattern decor -->
          <div class="absolute -right-12 -top-12 w-48 h-48 border-[1.5px] border-[#EBCFD1]/30 rounded-full pointer-events-none"></div>

          <div class="flex justify-between items-start z-10 mb-4">
            <div class="font-bold text-lg tracking-wider uppercase text-[#D9A9AF]">
              Kirim Kado
            </div>
            <svg viewBox="0 0 24 24" class="w-6 h-6 text-[#AEB8A3] fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>

          <div class="z-10 mb-4">
            <p class="text-sm text-[#6A4E42] leading-relaxed font-medium mb-3" style="white-space: pre-line">
              {{ invitation.gift_address }}
            </p>
            <div class="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-1">
              Penerima
            </div>
            <div class="text-sm font-bold uppercase tracking-wider text-[#D9A9AF]">
              {{ invitation.gift_recipient || "-" }}
            </div>
            <div v-if="invitation.gift_phone" class="text-xs text-gray-500 mt-1 font-mono">
              Telp: {{ invitation.gift_phone }}
            </div>
          </div>

          <div class="flex justify-between items-center z-10 mt-2">
            <button
              @click="copyAddress"
              class="bg-white border border-[#EBCFD1] text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-2 text-xs font-semibold hover:scale-105 active:scale-95"
              style="color: #6A4E42;"
            >
              <svg v-if="!copiedAddress" viewBox="0 0 24 24" class="w-4 h-4 text-[#AEB8A3] fill-current">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
              <svg v-else viewBox="0 0 24 24" class="w-4 h-4 text-green-600 fill-current">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              {{ copiedAddress ? "Alamat Disalin!" : "Salin Alamat" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ThemeConfig } from "@/types/theme";
import type { Invitation, BankAccount } from "@/types/invitation";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

const giftSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const cardRefs = ref<HTMLElement[]>([]);

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
  if (!giftSection.value) return;

  gsap.to(headerRef.value, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: giftSection.value,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  if (cardRefs.value.length > 0) {
    ScrollTrigger.batch(cardRefs.value, {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
        });
      },
      start: "top 85%",
      once: true,
    });
  }
});
</script>
