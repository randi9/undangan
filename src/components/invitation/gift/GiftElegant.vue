<template>
  <section v-if="invitation.bank_name" class="py-24 px-6 text-center bg-[var(--theme-surface)]">
    <h2 class="text-3xl md:text-4xl mb-2 text-[var(--theme-primary)]" :style="{ fontFamily: themeConfig.fontHeading }">Wedding Gift</h2>
    <div class="flex items-center justify-center gap-4 mb-8 text-[var(--theme-secondary)]">
      <div class="h-px w-12 bg-[var(--theme-secondary)] opacity-50"></div>
      <span class="text-xl">🎁</span>
      <div class="h-px w-12 bg-[var(--theme-secondary)] opacity-50"></div>
    </div>
    
    <p class="text-[var(--theme-text-light)] max-w-xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
      Doa restu Anda merupakan karunia yang sangat berarti bagi kami.<br />
      Namun, apabila Anda ingin memberikan tanda kasih, kami menyediakan amplop digital di bawah ini.
    </p>
    
    <div class="inline-block p-8 md:p-12 bg-white rounded-3xl shadow-sm border border-[var(--theme-secondary)]/20">
      <div class="font-bold text-xl text-[var(--theme-primary)] mb-2 tracking-wide uppercase">{{ invitation.bank_name }}</div>
      <div class="text-3xl md:text-4xl font-bold tracking-widest text-gray-800 mb-2 font-mono">{{ invitation.bank_account }}</div>
      <div class="text-sm text-gray-500 mb-8 uppercase tracking-widest">A.N. {{ invitation.bank_holder }}</div>
      <button @click="copyAccount" class="px-8 py-3 rounded-full border-2 border-[var(--theme-primary)] text-[var(--theme-primary)] font-semibold hover:bg-[var(--theme-primary)] hover:text-white transition-all w-full md:w-auto">
        {{ copied ? '✅ Tersalin!' : '📋 Salin Nomor Rekening' }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ThemeConfig } from '@/types/theme';
import type { Invitation } from '@/types/invitation';

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
}>();

const copied = ref(false);

function copyAccount() {
  if (!props.invitation.bank_account) return;
  navigator.clipboard.writeText(props.invitation.bank_account);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>
