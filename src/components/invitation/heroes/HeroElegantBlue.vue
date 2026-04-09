<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#F8F9FA]">
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-b from-[#1e3a8a]/5 to-transparent z-10 w-full h-full mix-blend-multiply"></div>
      
      <!-- Primary smaller pattern -->
      <div class="absolute inset-0 z-0 opacity-[0.12]" style="background-image: url('https://media.mengundanganda.fun/desain%20web%20elegan%20blue%20(2).png'); background-size: 100px; background-repeat: repeat; background-position: center;"></div>
      
      <!-- Secondary larger shifted pattern for variation -->
      <div class="absolute inset-[0] z-0 opacity-[0.08]" style="background-image: url('https://media.mengundanganda.fun/desain%20web%20elegan%20blue%20(2).png'); background-size: 160px; background-repeat: repeat; transform: rotate(180deg); transform-origin: center; background-position: 25px 25px;"></div>
    </div>
    <div class="relative z-10 w-full max-w-2xl mx-auto py-20 flex justify-center text-slate-800 hero-content-elegant">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  overlayGradient: string;
}>();
</script>
