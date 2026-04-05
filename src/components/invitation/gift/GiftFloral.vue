<template>
  <section v-if="bankList.length > 0" style="position: relative; padding: 48px 24px; max-width: 1024px; margin: 0 auto; text-align: center; z-index: 10;">
    
    <!-- Header with Floral Ornament -->
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 64px; position: relative;">
      <img src="https://media.mengundanganda.fun/tema%20floral/couple%20section/82c51b8b-c9f4-4608-826d-4c116b501296.webp" 
           style="width: 100%; max-width: 240px; opacity: 0.9; margin-bottom: -70px; transition: transform 0.7s ease;" 
           alt="Ornament" />
      <h2 style="font-size: clamp(36px, 6vw, 60px); margin-bottom: 16px; color: var(--theme-primary); position: relative; z-index: 10; margin-top: 40px; letter-spacing: 0.025em; text-shadow: 0 1px 2px rgba(0,0,0,0.05);" 
          :style="{ fontFamily: themeConfig.fontHeading }">
        Wedding Gift
      </h2>
      <p style="color: var(--theme-text-light); font-size: clamp(14px, 3vw, 16px); margin-top: 8px; max-width: 512px; margin-left: auto; margin-right: auto; line-height: 1.625;">
        Doa restu Anda merupakan karunia yang sangat berarti bagi kami.<br />
        Namun, apabila Anda ingin memberikan tanda kasih, kami menyediakan amplop digital di bawah ini.
      </p>
    </div>
    
    <!-- Bank Cards Grid -->
    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 32px; align-items: stretch;">
      
      <div v-for="(bank, index) in bankList" :key="index"
           style="flex: 1; min-width: min(100%, 350px); max-width: 450px; background-color: rgba(255, 255, 255, 0.9); padding: 48px 32px; border-radius: 32px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.05); position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 10;">
        
        <!-- Subtle Floral Decor for the Card -->
        <img src="https://media.mengundanganda.fun/tema%20floral/couple%20section/cf584d49-6790-4bb8-971f-89cdc91c6e00.webp" 
             style="position: absolute; top: -30px; right: -30px; width: 140px; opacity: 0.08; transform: rotate(15deg); pointer-events: none; z-index: 0;" />
        <img src="https://media.mengundanganda.fun/tema%20floral/couple%20section/38c7b2f4-88da-4e1c-9457-5b84781baea5.webp" 
             style="position: absolute; bottom: -30px; left: -30px; width: 140px; opacity: 0.08; pointer-events: none; z-index: 0;" />

        <div style="font-weight: 700; font-size: 20px; color: var(--theme-primary); margin-bottom: 16px; letter-spacing: 0.05em; text-transform: uppercase; position: relative; z-index: 10;">
          {{ bank.bank_name }}
        </div>
        
        <div style="font-size: clamp(24px, 5vw, 36px); font-weight: 700; letter-spacing: 0.1em; color: #1f2937; margin-bottom: 8px; font-family: monospace; position: relative; z-index: 10; display: flex; align-items: center; justify-content: center;">
          {{ bank.bank_account }}
        </div>
        
        <div style="font-size: 14px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 40px; position: relative; z-index: 10;">
          A.N. {{ bank.bank_holder }}
        </div>
        
        <button @click="copyAccount(index)" class="btn-copy"
                :style="copiedIndex === index ? 'background-color: var(--theme-primary); color: white; border-color: var(--theme-primary); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(33, 85, 46, 0.2);' : 'background-color: transparent; color: var(--theme-primary); border-color: var(--theme-primary);'"
                style="padding: 14px 40px; border-radius: 9999px; border-width: 2px; border-style: solid; font-weight: 600; font-size: 16px; cursor: pointer; transition: all 0.3s ease; position: relative; z-index: 10; display: inline-flex; align-items: center; justify-content: center; gap: 8px; outline: none;">
          <span v-if="copiedIndex === index" style="font-size: 18px;">✓</span>
          <span v-else style="font-size: 18px;">📋</span>
          {{ copiedIndex === index ? 'Tersalin!' : 'Salin Nomor' }}
        </button>
      </div>
      
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation, BankAccount } from '@/types/invitation';

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

const copiedIndex = ref<number | null>(null);

const bankList = computed<BankAccount[]>(() => {
  if (props.invitation.banks && Array.isArray(props.invitation.banks) && props.invitation.banks.length > 0) {
    return props.invitation.banks.filter(b => b.bank_name || b.bank_account);
  }
  if (props.invitation.bank_name) {
    return [{ bank_name: props.invitation.bank_name, bank_account: props.invitation.bank_account, bank_holder: props.invitation.bank_holder }];
  }
  // Menggunakan data dummy sementara karena kolom banks di tabel belum tersedia
  return [
    { bank_name: 'BCA', bank_account: '1234567890', bank_holder: 'Nama Mempelai Pria' },
    { bank_name: 'Mandiri', bank_account: '0987654321', bank_holder: 'Nama Mempelai Wanita' }
  ];
});

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
.btn-copy:hover {
  background-color: var(--theme-primary) !important;
  color: white !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(33, 85, 46, 0.2);
}
</style>
