<template>
  <section style="min-height: 100dvh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 16px; background-color: #FFF8E7; background-image: url('https://media.mengundanganda.com/nyunda/hero%20section/randidewi_bc46b489-f8dc-4982-a645-0753fc7391eb.webp'); background-size: cover; background-position: center; position: relative; overflow: hidden;">
    
    <!-- Corner Decorations -->
    <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_ab9a0d5a-4fe4-4b48-adbb-b4751f116c28.webp" alt="Decoration" class="decor-right" style="position: absolute; top: 0px; right: -120px; width: 350px; height: auto; z-index: 30; pointer-events: none;" />
    <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_ab9a0d5a-4fe4-4b48-adbb-b4751f116c28.webp" alt="Decoration" class="decor-left" style="position: absolute; top: 0px; left: -120px; width: 350px; height: auto; z-index: 30; pointer-events: none;" />

    <!-- Tree Decorations -->
    <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_bedbdf0f-9600-49f5-9476-24457c1a9a4a.webp" alt="Tree Right" class="tree-top-right" style="position: absolute; top: 120px; right: -80px; width: 200px; height: auto; z-index: 25; pointer-events: none;" />
    <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_bedbdf0f-9600-49f5-9476-24457c1a9a4a.webp" alt="Tree Left" class="tree-top-left" style="position: absolute; top: 120px; left: -80px; width: 200px; height: auto; z-index: 25; pointer-events: none;" />
    <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_bedbdf0f-9600-49f5-9476-24457c1a9a4a.webp" alt="Tree Right" class="tree-bottom-right" style="position: absolute; top: 250px; right: -60px; width: 150px; height: auto; z-index: 24; pointer-events: none;" />
    <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_bedbdf0f-9600-49f5-9476-24457c1a9a4a.webp" alt="Tree Left" class="tree-bottom-left" style="position: absolute; top: 250px; left: -60px; width: 150px; height: auto; z-index: 24; pointer-events: none;" />

    <!-- Flock of Birds (5 Birds) -->
    <div class="bird-flight bird-1">
      <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_43d3a779-4e39-4610-8439-fc146c7901bd.webp" class="bird-frame frame-1" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain;" />
      <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_531332c3-6827-42f2-8232-e76db1ece3dc.webp" class="bird-frame frame-2" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0;" />
      <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_928c6487-90db-4270-99b4-649fd1990ad4.webp" class="bird-frame frame-3" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0;" />
    </div>
    
    <div class="bird-flight bird-2">
      <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_43d3a779-4e39-4610-8439-fc146c7901bd.webp" class="bird-frame frame-1" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain;" />
      <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_531332c3-6827-42f2-8232-e76db1ece3dc.webp" class="bird-frame frame-2" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0;" />
      <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_928c6487-90db-4270-99b4-649fd1990ad4.webp" class="bird-frame frame-3" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0;" />
    </div>

    <div class="bird-flight bird-3">
      <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_43d3a779-4e39-4610-8439-fc146c7901bd.webp" class="bird-frame frame-1" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain;" />
      <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_531332c3-6827-42f2-8232-e76db1ece3dc.webp" class="bird-frame frame-2" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0;" />
      <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_928c6487-90db-4270-99b4-649fd1990ad4.webp" class="bird-frame frame-3" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0;" />
    </div>

    <div class="bird-flight bird-4">
      <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_43d3a779-4e39-4610-8439-fc146c7901bd.webp" class="bird-frame frame-1" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain;" />
      <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_531332c3-6827-42f2-8232-e76db1ece3dc.webp" class="bird-frame frame-2" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0;" />
      <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_928c6487-90db-4270-99b4-649fd1990ad4.webp" class="bird-frame frame-3" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0;" />
    </div>

    <div class="bird-flight bird-5">
      <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_43d3a779-4e39-4610-8439-fc146c7901bd.webp" class="bird-frame frame-1" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain;" />
      <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_531332c3-6827-42f2-8232-e76db1ece3dc.webp" class="bird-frame frame-2" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0;" />
      <img src="https://media.mengundanganda.com/nyunda/hero%20section/randidewi_928c6487-90db-4270-99b4-649fd1990ad4.webp" class="bird-frame frame-3" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0;" />
    </div>

    <div style="width: 100%; max-width: 600px; margin: 0 auto; color: #5C3D2E; z-index: 20; position: relative; transform: translateY(-18vh);">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  overlayGradient: string;
}>();
</script>

<style scoped>
.bird-flight {
  position: absolute;
  pointer-events: none;
  animation: fly-across 4.5s linear infinite;
}

/* Formasi Burung (Tersebar acak / natural) */
.bird-1 { top: 2vh; left: 0; width: 42px; height: 42px; z-index: 15; }
.bird-2 { top: 6vh; left: -60px; width: 45px; height: 45px; z-index: 14; }
.bird-3 { top: -2vh; left: -150px; width: 32px; height: 32px; z-index: 11; }
.bird-4 { top: 1vh; left: -240px; width: 38px; height: 38px; z-index: 13; }
.bird-5 { top: -4vh; left: -380px; width: 30px; height: 30px; z-index: 12; }

@keyframes fly-across {
  0% {
    transform: translate(-150px, 25vh) rotate(-5deg) scale(0.8);
  }
  100% {
    transform: translate(calc(100vw + 500px), 5vh) rotate(0deg) scale(1.2);
  }
}

.bird-frame {
  animation-duration: 0.4s; /* Kepakan sayap diperlambat kembali */
  animation-timing-function: step-end;
  animation-iteration-count: infinite;
}
.frame-1 {
  animation-name: bird-anim-1;
}
.frame-2 {
  animation-name: bird-anim-2;
}
.frame-3 {
  animation-name: bird-anim-3;
}

/* Desinkronisasi kepakan setiap burung agar natural */
.bird-1 .bird-frame { animation-delay: 0s; }
.bird-2 .bird-frame { animation-delay: -0.1s; }
.bird-3 .bird-frame { animation-delay: -0.25s; }
.bird-4 .bird-frame { animation-delay: -0.15s; }
.bird-5 .bird-frame { animation-delay: -0.3s; }

/* 
  Siklus kepakan:
  0% - 30%  : Sayap ke atas (glide sebentar)
  30% - 45% : Sayap tengah
  45% - 65% : Sayap ke bawah (power stroke)
  65% - 100%: Sayap tengah kembali naik
*/
@keyframes bird-anim-1 {
  0% { opacity: 1; }
  30% { opacity: 0; }
  100% { opacity: 0; }
}
@keyframes bird-anim-2 {
  0% { opacity: 0; }
  30% { opacity: 1; }
  45% { opacity: 0; }
  65% { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes bird-anim-3 {
  0% { opacity: 0; }
  45% { opacity: 1; }
  65% { opacity: 0; }
  100% { opacity: 0; }
}
.decor-right {
  transform-origin: center center;
  opacity: 0;
  animation: 
    decor-enter-right 2s cubic-bezier(0.25, 1, 0.5, 1) forwards,
    sway-right 4s ease-in-out 2s infinite alternate;
}

.decor-left {
  transform-origin: center center;
  opacity: 0;
  animation: 
    decor-enter-left 2s cubic-bezier(0.25, 1, 0.5, 1) forwards,
    sway-left 4s ease-in-out 2s infinite alternate;
}

.tree-top-right {
  transform-origin: center center;
  opacity: 0;
  animation: 
    tree-enter-right 2s cubic-bezier(0.25, 1, 0.5, 1) 1s forwards,
    sway-right 2.5s ease-in-out 3s infinite alternate;
}

.tree-top-left {
  transform-origin: center center;
  opacity: 0;
  animation: 
    tree-enter-left 2s cubic-bezier(0.25, 1, 0.5, 1) 1s forwards,
    sway-left 2.5s ease-in-out 3s infinite alternate;
}

.tree-bottom-right {
  transform-origin: center center;
  opacity: 0;
  animation: 
    tree-enter-right 2s cubic-bezier(0.25, 1, 0.5, 1) 2s forwards,
    sway-right 2.5s ease-in-out 4s infinite alternate;
}

.tree-bottom-left {
  transform-origin: center center;
  opacity: 0;
  animation: 
    tree-enter-left 2s cubic-bezier(0.25, 1, 0.5, 1) 2s forwards,
    sway-left 2.5s ease-in-out 4s infinite alternate;
}

@keyframes decor-enter-right {
  0% { opacity: 0; transform: translate(60px, -30px) scale(0.6) rotate(10deg); }
  100% { opacity: 1; transform: translate(-5px, 0) rotate(-1.5deg) scale(0.98); }
}

@keyframes decor-enter-left {
  0% { opacity: 0; transform: scaleX(-1) translate(60px, -30px) scale(0.6) rotate(10deg); }
  100% { opacity: 1; transform: scaleX(-1) translate(-5px, 0) rotate(-1.5deg) scale(0.98); }
}

@keyframes tree-enter-right {
  0% { opacity: 0; transform: translate(100px, 30px) scale(0.8) rotate(15deg); }
  100% { opacity: 1; transform: translate(-5px, 0) rotate(-1.5deg) scale(0.98); }
}

@keyframes tree-enter-left {
  0% { opacity: 0; transform: scaleX(-1) translate(100px, 30px) scale(0.8) rotate(15deg); }
  100% { opacity: 1; transform: scaleX(-1) translate(-5px, 0) rotate(-1.5deg) scale(0.98); }
}

@keyframes sway-right {
  0% { transform: translate(-5px, 0) rotate(-1.5deg) scale(0.98); }
  100% { transform: translate(15px, 0) rotate(3deg) scale(1.02); }
}

@keyframes sway-left {
  0% { transform: scaleX(-1) translate(-5px, 0) rotate(-1.5deg) scale(0.98); }
  100% { transform: scaleX(-1) translate(15px, 0) rotate(3deg) scale(1.02); }
}
</style>
