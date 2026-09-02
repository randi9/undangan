<template>
  <section
    v-if="bankList.length > 0 || invitation.gift_address"
    ref="giftSection"
    class="relative py-24 px-4 md:px-8 bg-[#18201B] overflow-hidden text-center"
  >
    <!-- Ambient Radial Glow -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(circle at 50% 50%, rgba(112, 132, 120, 0.2) 0%, transparent 70%);"
    ></div>

    <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
      <!-- Section Header -->
      <div ref="headerRef" class="opacity-0 translate-y-6 mb-16 text-center">
        <div class="flex items-center justify-center gap-2 mb-2">
          <span class="text-[#D4A6AD] text-xs">✦</span>
          <span class="text-xs uppercase tracking-[0.35em] text-[#D4A6AD] font-semibold">Tanda Kasih</span>
          <span class="text-[#D4A6AD] text-xs">✦</span>
        </div>
        <h2
          class="text-3xl md:text-5xl font-serif text-[#ECE0D3] font-normal"
          :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
        >
          Wedding Gift
        </h2>
        <p class="text-xs md:text-sm text-[#D4A6AD] mt-3 max-w-md mx-auto leading-relaxed">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun apabila Anda ingin memberikan tanda kasih secara digital, Anda dapat menggunakan amplop di bawah ini:
        </p>
        <div class="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#708478] to-transparent mx-auto mt-4"></div>
      </div>

      <!-- Bank Cards List -->
      <div class="w-full flex flex-col items-center gap-8 max-w-md mx-auto">
        <div
          v-for="(bank, index) in bankList"
          :key="index"
          :ref="(el) => { if (el) cardRefs[index] = el as HTMLElement; }"
          class="w-full opacity-0 translate-y-8 flex flex-col items-center"
        >
          <!-- Royal Glassmorphic Debit Card -->
          <div class="w-full aspect-[1.58] rounded-3xl p-6 md:p-8 border border-[#708478]/50 bg-gradient-to-br from-[#243029] via-[#1E2622] to-[#141A17] shadow-[0_12px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(212,166,173,0.15)] relative overflow-hidden flex flex-col justify-between text-left">
            <!-- Shimmer Animation Overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none transform -skew-x-12 animate-shimmer"></div>

            <!-- Top Row: Chip & Bank Name -->
            <div class="flex justify-between items-center relative z-10">
              <!-- Golden EMV Chip Icon -->
              <div class="w-12 h-9 rounded-lg border border-[#D4A6AD]/60 bg-gradient-to-br from-[#ECE0D3] to-[#D4A6AD] flex items-center justify-center shadow-md">
                <div class="w-8 h-5 border border-[#708478]/40 rounded-sm grid grid-cols-2 gap-0.5 opacity-60">
                  <div class="border-r border-[#708478]/40"></div>
                  <div></div>
                </div>
              </div>

              <!-- Bank Name Badge -->
              <span
                class="text-lg md:text-xl font-bold uppercase tracking-wider text-[#ECE0D3]"
                :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
              >
                {{ bank.bank_name }}
              </span>
            </div>

            <!-- Middle: Account Number -->
            <div class="relative z-10 my-2">
              <span class="text-[10px] uppercase tracking-widest text-[#D4A6AD] block mb-1">Nomor Rekening</span>
              <div class="text-xl md:text-2xl font-mono font-bold tracking-widest text-[#ECE0D3] drop-shadow-sm">
                {{ bank.bank_account }}
              </div>
            </div>

            <!-- Bottom Row: Card Holder & Copy Button -->
            <div class="flex justify-between items-end relative z-10">
              <div>
                <span class="text-[9px] uppercase tracking-widest text-[#D4A6AD] block">Atas Nama</span>
                <span class="text-sm font-semibold uppercase tracking-wider text-[#ECE0D3]">
                  {{ bank.bank_holder || '-' }}
                </span>
              </div>

              <button
                @click="copyAccount(index)"
                class="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-md"
                :class="
                  copiedIndex === index
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gradient-to-r from-[#D4A6AD] via-[#ECE0D3] to-[#D4A6AD] text-[#18201B] hover:scale-105'
                "
              >
                <Icon v-if="copiedIndex === index" icon="ph:check-bold" class="w-3.5 h-3.5" />
                <Icon v-else icon="ph:copy-duotone" class="w-3.5 h-3.5 text-[#18201B]" />
                {{ copiedIndex === index ? 'Tersalin' : 'Salin' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Gift Delivery Address (if provided) -->
        <div
          v-if="invitation.gift_address"
          class="w-full p-6 md:p-8 rounded-3xl border border-[#708478]/50 bg-[#243029]/80 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.5)] text-left relative"
        >
          <div class="flex items-center gap-3 mb-4">
            <Icon icon="ph:gift-duotone" class="w-6 h-6 text-[#D4A6AD]" />
            <h3
              class="text-xl font-normal text-[#ECE0D3]"
              :style="{ fontFamily: themeConfig.fontHeading || `'Cinzel Decorative', serif` }"
            >
              Kirim Kado Fisik
            </h3>
          </div>

          <p class="text-xs md:text-sm text-[#ECE0D3]/80 leading-relaxed mb-4">
            {{ invitation.gift_address }}
          </p>

          <div v-if="invitation.gift_recipient || invitation.gift_phone" class="text-xs text-[#D4A6AD] space-y-1 mb-4">
            <p v-if="invitation.gift_recipient">
              Penerima: <strong class="text-[#ECE0D3]">{{ invitation.gift_recipient }}</strong>
            </p>
            <p v-if="invitation.gift_phone">
              No. Telepon: <strong class="text-[#ECE0D3]">{{ invitation.gift_phone }}</strong>
            </p>
          </div>

          <button
            @click="copyAddress"
            class="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-md"
            :class="
              copiedAddress
                ? 'bg-emerald-500 text-white'
                : 'bg-gradient-to-r from-[#D4A6AD] via-[#ECE0D3] to-[#D4A6AD] text-[#18201B] hover:scale-105'
            "
          >
            <Icon v-if="copiedAddress" icon="ph:check-bold" class="w-4 h-4" />
            <Icon v-else icon="ph:copy-duotone" class="w-4 h-4 text-[#18201B]" />
            {{ copiedAddress ? 'Alamat Tersalin' : 'Salin Alamat' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/vue';
import type { Invitation, BankAccount } from '@/types/invitation';
import type { ThemeConfig } from '@/types/theme';

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
  if (!giftSection.value) return;

  gsap.to(headerRef.value, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: giftSection.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  if (cardRefs.value.length > 0) {
    ScrollTrigger.batch(cardRefs.value, {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2,
        });
      },
      start: 'top 85%',
      once: true,
    });
  }
});
</script>

<style scoped>
@keyframes shimmer {
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(200%) skewX(-12deg); }
}

.animate-shimmer {
  animation: shimmer 6s infinite ease-in-out;
}
</style>
