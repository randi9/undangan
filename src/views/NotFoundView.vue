<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { Icon } from '@iconify/vue';

const router = useRouter();
const authStore = useAuthStore();

const isLoggedIn = computed(() => !!authStore.user);

const goHome = () => {
  if (isLoggedIn.value) {
    router.push('/dashboard');
  } else {
    router.push('/');
  }
};
</script>

<template>
  <div class="min-h-[100dvh] flex flex-col items-center justify-center p-6 lg:p-10 bg-[#f8fafc] relative overflow-hidden" style="font-family: var(--font-sans, 'Inter', sans-serif);">
    <!-- Modern ambient blobs -->
    <div class="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[350px] bg-blue-200/40 rounded-full blur-[80px] md:blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[450px] bg-indigo-200/40 rounded-full blur-[80px] md:blur-[120px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

    <!-- Content Container -->
    <div class="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-[400px]" style="transform: translateY(-5vh)">
      
      <!-- Premium Icon Container -->
      <div class="relative w-28 h-28 flex items-center justify-center group cursor-default">
        <div class="absolute inset-0 bg-white shadow-xl shadow-slate-200/50 rounded-[1.8rem] rotate-6 transition-transform duration-500 group-hover:rotate-12"></div>
        <div class="absolute inset-0 bg-blue-50 rounded-[1.8rem] border border-blue-100/60 backdrop-blur-sm -rotate-3 flex items-center justify-center transition-transform duration-500 group-hover:rotate-0">
          <Icon icon="solar:minimalistic-magnifer-bold-duotone" class="text-[52px] text-blue-500" />
        </div>
      </div>
      
      <div style="height: 48px; width: 100%;"></div>
      
      <!-- Typography -->
      <div class="flex flex-col items-center">
        <h1 class="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-none">
          404
        </h1>
        <div style="height: 12px; width: 100%;"></div>
        <h2 class="text-xl md:text-2xl font-bold text-slate-700">
          Oops! Anda Tersesat
        </h2>
      </div>
      
      <div style="height: 24px; width: 100%;"></div>
      
      <p class="text-base text-slate-500 leading-relaxed px-4 max-w-[320px]">
        Halaman yang Anda cari sudah dihapus, salah ketik, atau memang tidak pernah ada.
      </p>

      <div style="height: 40px; width: 100%;"></div>

      <!-- Deep premium button -->
      <button @click="goHome" class="group w-full max-w-[280px] bg-blue-600 text-white font-semibold py-4 px-8 rounded-[1.25rem] transition-all duration-300 hover:bg-blue-700 hover:-translate-y-1 hover:shadow-[0_12px_24px_-8px_rgba(37,99,235,0.45)] active:scale-[0.98]">
        <div class="flex items-center justify-center gap-3">
          <span class="tracking-wide">{{ isLoggedIn ? 'Tarik Saya ke Dashboard' : 'Kembali ke Beranda' }}</span>
          <Icon icon="ph:arrow-right-bold" class="text-lg group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </button>
    </div>
  </div>
</template>
