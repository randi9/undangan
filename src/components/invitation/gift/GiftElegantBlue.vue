<template>
  <section v-if="bankList.length > 0" class="gift-section w-full">
    <!-- Header -->
    <h2 class="gift-title" :style="{ fontFamily: themeConfig.fontHeading }">Wedding Gift</h2>
    <div class="gift-divider">
      <div class="gift-line"></div>
      <span class="gift-icon text-xl">🎁</span>
      <div class="gift-line"></div>
    </div>
    
    <p class="gift-desc px-4">
      Doa restu Anda merupakan karunia yang sangat berarti bagi kami.<br />
      Namun, apabila Anda ingin memberikan tanda kasih, kami menyediakan amplop digital di bawah ini.
    </p>

    <!-- Cards Wrapper -->
    <div class="w-full max-w-3xl mx-auto px-4 md:px-6">
      
      <div class="card-stack-wrapper">
         
         <div 
           v-for="(bank, index) in bankList" 
           :key="index"
           class="deck-card flex flex-col justify-between"
           :class="index % 2 === 0 ? 'theme-light' : 'theme-dark'"
           :style="getCardStyle(index)"
           @click="selectCard(index)"
         >
            <!-- Patterns (Absolute) -->
            <div class="card-circle-lg"></div>
            <div class="card-circle-sm"></div>
            
            <!-- Top Row: Chip, Wifi, and Bank Name -->
            <div class="card-top-row z-10 w-full mb-2">
              <div class="flex items-center gap-3 shrink-0">
                <div class="credit-chip">
                   <div class="chip-line chip-l"></div><div class="chip-line chip-r"></div>
                   <div class="chip-line chip-t"></div><div class="chip-line chip-b"></div>
                   <div class="chip-box"></div>
                </div>
                <!-- Contactless Icon -->
                <Icon icon="lucide:wifi" class="text-xl opacity-60 rotate-90 contactless-icon" />
              </div>
              <div class="bank-name-title truncate text-right">
                {{ bank.bank_name || 'Bank' }}
              </div>
            </div>
            
            <!-- Middle Row: Account Number and Action Button -->
            <div class="card-middle-row z-10 w-full flex flex-col justify-center text-left">
              <div class="flex items-center justify-between gap-3 w-full">
                <span class="account-number block truncate">{{ bank.bank_account }}</span>
                <button @click.stop="copyAccount(index)" title="Salin Nomor" class="copy-btn shrink-0">
                  <Icon :icon="copiedIndex === index ? 'lucide:check-circle-2' : 'lucide:copy'" class="text-icon" />
                  <span v-if="copiedIndex !== index" class="copy-text hidden sm:inline-block">Salin</span>
                </button>
              </div>
              <!-- Floating Copied Alert positioned aesthetically below the copy button -->
              <div class="h-4 w-full text-right pr-2">
                <span v-if="copiedIndex === index" class="copied-alert">Tersalin!</span>
              </div>
            </div>

            <!-- Bottom Row: Holder and Decorative Rings -->
            <div class="card-bottom-row z-10 w-full flex justify-between items-end">
              <div class="holder-group truncate pr-4 text-left">
                <span class="holder-label">A.N. Rekening</span>
                <span class="holder-name block truncate">{{ bank.bank_holder }}</span>
              </div>
              
              <!-- Emulated Mastercard Logo -->
              <div class="card-rings shrink-0 flex items-center">
                <div class="ring ring-red"></div>
                <div class="ring ring-yellow"></div>
              </div>
            </div>

         </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, computed } from 'vue';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation, BankAccount } from '@/types/invitation';

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

const copiedIndex = ref<number | null>(null);

// Animasi ngocok kartu state
const activeFront = ref(0);
const oldFrontIndex = ref<number | null>(null);
const animatingToIndex = ref<number | null>(null);
const isShuffling = ref(false);

const bankList = computed<BankAccount[]>(() => {
  if (props.invitation.banks && Array.isArray(props.invitation.banks) && props.invitation.banks.length > 0) {
    return props.invitation.banks.filter((b: BankAccount) => b.bank_name || b.bank_account);
  }
  if (props.invitation.bank_name) {
    return [{ 
      bank_name: props.invitation.bank_name, 
      bank_account: props.invitation.bank_account || '', 
      bank_holder: props.invitation.bank_holder || '' 
    }];
  }
  return [];
});

function selectCard(index: number) {
  if (bankList.value.length <= 1) return;
  if (index === activeFront.value || isShuffling.value) return;

  isShuffling.value = true;
  oldFrontIndex.value = activeFront.value;
  animatingToIndex.value = index;

  // Phase 2: Tukar posisi logis secara instan, biarkan CSS memuluskannya jatuh
  setTimeout(() => {
    activeFront.value = index;
  }, 250);

  // Komplit dan reset statenya
  setTimeout(() => {
    isShuffling.value = false;
    oldFrontIndex.value = null;
    animatingToIndex.value = null;
  }, 500);
}

function getCardStyle(index: number) {
  if (bankList.value.length === 1) {
    return { zIndex: 10, transform: 'translate(-50%, 0)' };
  }

  let isOldFront = oldFrontIndex.value === index;
  let isAnimatingTo = animatingToIndex.value === index;
  
  // Hitung kedalaman tumpukan logis. 0 = paling depan, 1 = dibelakangnya, dst.
  let pos = (index - activeFront.value + bankList.value.length) % bankList.value.length;

  let zIndex = 10 - pos;
  // DIPERBESAR: Jeda mengintip (peeking area) lebih lebar agar mudah diklik
  let targetX = pos * 24; // offset mengintip ke Kanan
  let targetY = pos * -32; // offset mengintip ke Atas
  let scale = 1 - (pos * 0.04); // scale menyusut supaya terasa ada depth 3D

  // Jika sedang proses pengocokan (shuffling 2 tahapan)
  if (isShuffling.value) {
    if (isAnimatingTo) {
      if (activeFront.value !== index) {
        // Phase 1: Kartu belakang terbang KE ATAS dan KIRI!
        targetX = -60;
        targetY = -140;
        zIndex = 20; // pastikan langsung lompat layer terblow
        scale = 1.05;
      } else {
        // Phase 2: Mendarat turun ke posisi front paling depan!
        zIndex = 20; 
      }
    } else if (isOldFront) {
      if (activeFront.value === index) {
        // Phase 1: Kartu depan menghindar, melorot ke KANAN BAWAH!
        targetX = 160; 
        targetY = 40;
        zIndex = 5; // turun class-layer segera biar disalip
        scale = 0.95;
      } else {
        // Phase 2: Meluncur rapih parkir di slot urutan belakang
        zIndex = 5;
      }
    }
  }

  return {
    zIndex,
    // Kalkulasi mutlak supaya center rata tengah tapi tetep dapet transform offset tumpukannya
    transform: `translate(calc(-50% + ${targetX}px), ${targetY}px) scale(${scale})`,
    opacity: pos >= 3 ? 0 : 1 // Sembunyikan kartu kalau terlalu banyak
  };
}

function copyAccount(index: number) {
  const bank = bankList.value[index];
  if (!bank?.bank_account) return;
  navigator.clipboard.writeText(bank.bank_account);
  copiedIndex.value = index;
  setTimeout(() => {
    copiedIndex.value = null;
  }, 2000);
}
</script>

<style scoped>
.gift-section {
  padding: 96px 0px;
  background-color: #405C66;
  text-align: center;
  overflow: hidden;
}

.gift-title {
  color: #fffdf5;
  font-size: clamp(1.875rem, 5vw, 3rem);
  margin-bottom: 8px;
  letter-spacing: 0.1em;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.gift-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
  color: rgba(255, 253, 245, 0.5);
}
.gift-line {
  height: 1px;
  width: 64px;
  background-color: rgba(255, 253, 245, 0.3);
}

.gift-desc {
  max-width: 36rem;
  margin: 0 auto 64px auto;
  color: rgba(255, 253, 245, 0.8);
  font-size: clamp(0.875rem, 3vw, 1rem);
  font-weight: 300;
  line-height: 1.6;
}

/* WADAH TUMPUKAN KARTU */
.card-stack-wrapper {
  position: relative;
  width: 100%;
  height: 250px;
  margin: 0 auto;
}
@media (min-width: 768px) {
  .card-stack-wrapper {
    height: 280px;
  }
}

/* FISIK KARTU FISIK DEBIT */
.deck-card {
  position: absolute;
  top: 50px;
  left: 50%;
  width: calc(100% - 32px);
  max-width: 340px;
  height: 190px;
  /* Tambahan padding luas agar tidak nempel pojokan! */
  padding: 22px 24px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  
  transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), 
              opacity 0.3s ease;
}
@media (min-width: 768px) {
  .deck-card { 
    max-width: 360px;
    height: 200px;
    padding: 24px 28px;
  }
}

/* THEMES */
.theme-light {
  background: linear-gradient(135deg, #fffdf5, #f8f9fa);
  --text-primary: #1a252c;
  --text-secondary: #304851;
  --text-muted: rgba(48,72,81,0.6);
  --btn-bg: rgba(48,72,81,0.08); /* Halus elegan */
  --btn-text: #304851;
  --btn-hover: rgba(48,72,81,0.12);
  --circle-border: rgba(48,72,81,0.06);
}

.theme-dark {
  background: linear-gradient(135deg, #1d2b32, #2a3d46);
  --text-primary: #ffffff;
  --text-secondary: #e2e8f0;
  --text-muted: rgba(255,255,255,0.5);
  --btn-bg: rgba(255,255,255,0.15);
  --btn-text: #ffffff;
  --btn-hover: rgba(255,255,255,0.25);
  --circle-border: rgba(255,255,255,0.05);
}

/* POLA DEKORASI */
.card-circle-lg {
  position: absolute;
  right: -60px;
  top: -60px;
  width: 220px;
  height: 220px;
  border: 1px solid var(--circle-border);
  border-radius: 50%;
  pointer-events: none;
}
.card-circle-sm {
  position: absolute;
  right: -30px;
  top: -30px;
  width: 140px;
  height: 140px;
  border: 1px solid var(--circle-border);
  border-radius: 50%;
  pointer-events: none;
}

/* KONTEN KARTU */
.card-top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.contactless-icon {
  color: var(--text-primary);
}
.credit-chip {
  width: 36px;
  height: 26px;
  background: linear-gradient(135deg, #e5c875, #d4af37);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
  border: 1px solid rgba(0,0,0,0.1);
}
.chip-line { position: absolute; background-color: rgba(0,0,0,0.15); }
.chip-l { top: 0; bottom: 0; left: 8px; width: 1px; }
.chip-r { top: 0; bottom: 0; right: 8px; width: 1px; }
.chip-t { left: 0; right: 0; top: 8px; height: 1px; }
.chip-b { left: 0; right: 0; bottom: 8px; height: 1px; }
.chip-box {
  position: absolute;
  top: 8px; bottom: 8px; left: 8px; right: 8px;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 2px;
}

.bank-name-title {
  font-weight: 800;
  font-size: clamp(0.9rem, 3vw, 1.1rem);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-secondary);
  text-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.card-middle-row {
  margin-top: auto;
  margin-bottom: auto;
}
.account-number {
  font-weight: 700;
  font-family: 'Courier New', Courier, monospace;
  font-size: clamp(1.25rem, 5vw, 1.5rem);
  letter-spacing: 0.12em;
  color: var(--text-primary);
  text-shadow: 0 2px 6px rgba(0,0,0,0.15); /* Embossed effect */
}

.copy-btn {
  background-color: var(--btn-bg);
  border: 1px solid rgba(255,255,255,0.05);
  color: var(--btn-text);
  padding: 6px 12px;
  border-radius: 20px; /* Lebh membulat ala iOS pill */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
}
.copy-btn:hover {
  background-color: var(--btn-hover);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.text-icon { font-size: 1.1rem; color: var(--btn-text); }
.copy-text {
  margin-left: 6px;
  font-weight: bold;
  color: var(--btn-text);
  text-transform: uppercase;
  font-size: 0.65rem;
  letter-spacing: 0.05em;
}

.copied-alert {
  font-size: 0.6rem;
  font-weight: bold;
  color: #16a34a;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  animation: fadeUp 0.3s ease forwards;
}

.holder-label {
  font-size: 0.55rem;
  color: var(--text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 2px;
}
.holder-name {
  font-size: clamp(0.75rem, 3vw, 0.9rem);
  font-weight: bold;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.12em; /* wider tracking */
  line-height: 1.2;
}

/* DECORATIVE RINGS (MASTERCARD VIBE) */
.ring {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  mix-blend-mode: normal; /* solid overlapping colors */
  opacity: 0.85;
}
.ring-red { 
  background-color: #eb001b; 
}
.ring-yellow { 
  background-color: #f79e1b; 
  margin-left: -10px; 
}

@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(5px); }
  100% { opacity: 1; transform: translateY(0); }
}
</style>
