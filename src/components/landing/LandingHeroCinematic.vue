<template>
  <section class="cinematic-hero-section">
    <!-- Animated Mesh Gradient Background -->
    <div class="hero-mesh-bg" aria-hidden="true"></div>

    <!-- Floating Sparkle Particles -->
    <div class="hero-particles" aria-hidden="true">
      <div
        v-for="n in 18"
        :key="n"
        class="sparkle"
        :class="`sparkle-${n}`"
      ></div>
    </div>

    <!-- Decorative Dot Grid Pattern -->
    <div class="hero-dot-pattern" aria-hidden="true"></div>

    <!-- Radial Glow behind 3D model -->
    <div class="hero-backplate-glow" ref="glowRef"></div>

    <div class="lp-container hero-container">
      <div class="hero-grid">
        <!-- Left Column: Compelling Typography & CTAs -->
        <div class="hero-left-col">
          <h1 class="hero-title" ref="titleRef">
            <span class="hero-title-line">Undangan Digital</span>
            <span class="hero-title-accent">Elegan</span>
            <span class="hero-title-line">untuk Hari Spesialmu</span>
          </h1>

          <p class="hero-sub" ref="subRef">
            Buat tamu terkesan sejak klik pertama dengan undangan modern,
            praktis, dan berkelas.
          </p>

          <div class="hero-cta-group" ref="actionsRef">
            <div class="hero-actions">
              <a href="/login" class="hero-btn hero-btn-primary">
                <svg class="hero-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                Buat Undangan Gratis
                <span class="hero-btn-shine"></span>
              </a>
              <a href="#tema" class="hero-btn hero-btn-ghost">
                <svg class="hero-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Lihat Demo
              </a>
            </div>
          </div>
        </div>

        <!-- Right Column: 3D Wedding Couple Model -->
        <div class="hero-right-col" ref="modelContainerRef">
          <div class="hero-model-wrapper">
            <!-- Decorative ring behind model -->
            <div class="hero-model-ring hero-model-ring-1" aria-hidden="true"></div>
            <div class="hero-model-ring hero-model-ring-2" aria-hidden="true"></div>
            <img
              src="/images/hero-model.webp"
              alt="MengundangAnda 3D Wedding Couple Model"
              class="hero-model-img"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom decorative wave -->
    <div class="hero-bottom-wave" aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,64 C320,120 620,20 960,64 C1200,96 1380,48 1440,32 L1440,120 L0,120 Z" fill="currentColor"/>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";

const titleRef = ref(null);
const subRef = ref(null);
const actionsRef = ref(null);
const modelContainerRef = ref(null);
const glowRef = ref(null);

let tl: gsap.core.Timeline | null = null;
let floatTween: gsap.core.Tween | null = null;

onMounted(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) {
    gsap.set(
      [
        glowRef.value,
        titleRef.value,
        subRef.value,
        actionsRef.value,
        modelContainerRef.value,
      ],
      {
        opacity: 1,
        y: 0,
        scale: 1,
      },
    );
    return;
  }

  // Allow DOM to settle and start cinematic intro
  setTimeout(() => {
    initAnimation();
  }, 100);
});

onUnmounted(() => {
  if (tl) tl.kill();
  if (modelContainerRef.value) {
    gsap.killTweensOf(modelContainerRef.value);
  }
});

function initAnimation() {
  // 1. Initial State Settings
  gsap.set(glowRef.value, { opacity: 0, scale: 0.6 });
  gsap.set(
    [titleRef.value, subRef.value, actionsRef.value],
    {
      y: 40,
      opacity: 0,
    },
  );
  gsap.set(modelContainerRef.value, { y: 80, opacity: 0, scale: 0.8 });

  tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  // 2. Cinematic Entrance Sequence — model comes first for visual impact
  tl.to(
    glowRef.value,
    {
      opacity: 1,
      scale: 1,
      duration: 2,
      ease: "power3.out",
    },
    0,
  );

  tl.to(
    modelContainerRef.value,
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.8,
      ease: "back.out(1.4)",
    },
    0.1,
  );

  // Text elements stagger in
  tl.to(
    titleRef.value,
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    },
    0.3,
  );

  tl.to(
    subRef.value,
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    },
    0.45,
  );

  tl.to(
    actionsRef.value,
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    },
    0.6,
  );

  // 3. Initiate Gentle Infinite Floating Animation for the 3D Model
  tl.call(() => {
    startFloating();
  });
}

function startFloating() {
  if (!modelContainerRef.value) return;

  // Gentle vertical float
  floatTween = gsap.to(modelContainerRef.value, {
    y: -14,
    duration: 4.2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });

  // Gentle horizontal drift
  gsap.to(modelContainerRef.value, {
    x: 8,
    duration: 5.8,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });

  // Gentle tilt rotation
  gsap.to(modelContainerRef.value, {
    rotation: 1.5,
    duration: 5.0,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
}
</script>

<style scoped>
/* =============================================
   HERO SECTION — Premium Redesign
   ============================================= */

.cinematic-hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #f8fbff;
  padding: 100px 0 80px;
}

/* --- Animated Mesh Gradient Background --- */
.hero-mesh-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 70%),
    radial-gradient(ellipse 60% 80% at 80% 70%, rgba(147, 197, 253, 0.12) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 50% 50%, rgba(219, 234, 254, 0.15) 0%, transparent 80%),
    radial-gradient(ellipse 40% 40% at 70% 20%, rgba(96, 165, 250, 0.06) 0%, transparent 50%);
  animation: meshShift 12s ease-in-out infinite alternate;
  z-index: 0;
}

@keyframes meshShift {
  0% {
    background:
      radial-gradient(ellipse 80% 60% at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 70%),
      radial-gradient(ellipse 60% 80% at 80% 70%, rgba(147, 197, 253, 0.12) 0%, transparent 60%),
      radial-gradient(ellipse 50% 50% at 50% 50%, rgba(219, 234, 254, 0.15) 0%, transparent 80%),
      radial-gradient(ellipse 40% 40% at 70% 20%, rgba(96, 165, 250, 0.06) 0%, transparent 50%);
  }
  100% {
    background:
      radial-gradient(ellipse 70% 70% at 40% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%),
      radial-gradient(ellipse 80% 60% at 60% 30%, rgba(147, 197, 253, 0.08) 0%, transparent 60%),
      radial-gradient(ellipse 50% 60% at 30% 70%, rgba(219, 234, 254, 0.12) 0%, transparent 80%),
      radial-gradient(ellipse 45% 45% at 80% 60%, rgba(96, 165, 250, 0.09) 0%, transparent 50%);
  }
}

/* --- Floating Sparkle Particles --- */
.hero-particles {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.35);
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
  animation: sparkleFloat 8s ease-in-out infinite;
}

/* Generate different positions and delays for each sparkle */
.sparkle-1 { top: 12%; left: 8%; animation-delay: 0s; animation-duration: 7s; width: 3px; height: 3px; }
.sparkle-2 { top: 25%; left: 15%; animation-delay: 1.2s; animation-duration: 9s; width: 5px; height: 5px; background: rgba(147, 197, 253, 0.4); }
.sparkle-3 { top: 45%; left: 5%; animation-delay: 2.4s; animation-duration: 6s; }
.sparkle-4 { top: 70%; left: 12%; animation-delay: 0.8s; animation-duration: 10s; width: 3px; height: 3px; }
.sparkle-5 { top: 85%; left: 25%; animation-delay: 3s; animation-duration: 8s; background: rgba(96, 165, 250, 0.3); }
.sparkle-6 { top: 15%; right: 10%; animation-delay: 1.5s; animation-duration: 7.5s; width: 6px; height: 6px; background: rgba(147, 197, 253, 0.25); }
.sparkle-7 { top: 35%; right: 18%; animation-delay: 0.3s; animation-duration: 9.5s; }
.sparkle-8 { top: 55%; right: 8%; animation-delay: 2s; animation-duration: 6.5s; width: 3px; height: 3px; }
.sparkle-9 { top: 75%; right: 15%; animation-delay: 4s; animation-duration: 8.5s; background: rgba(59, 130, 246, 0.2); }
.sparkle-10 { top: 90%; right: 30%; animation-delay: 1s; animation-duration: 7.2s; width: 5px; height: 5px; }
.sparkle-11 { top: 8%; left: 40%; animation-delay: 3.5s; animation-duration: 11s; width: 3px; height: 3px; background: rgba(219, 234, 254, 0.5); }
.sparkle-12 { top: 30%; left: 55%; animation-delay: 0.5s; animation-duration: 8s; }
.sparkle-13 { top: 60%; right: 40%; animation-delay: 2.8s; animation-duration: 9s; width: 4px; height: 4px; }
.sparkle-14 { top: 20%; right: 35%; animation-delay: 1.8s; animation-duration: 7s; background: rgba(96, 165, 250, 0.35); }
.sparkle-15 { top: 50%; left: 30%; animation-delay: 4.5s; animation-duration: 10s; width: 3px; height: 3px; }
.sparkle-16 { top: 80%; left: 45%; animation-delay: 0.2s; animation-duration: 6.8s; }
.sparkle-17 { top: 40%; left: 65%; animation-delay: 3.2s; animation-duration: 8.8s; width: 5px; height: 5px; background: rgba(147, 197, 253, 0.3); }
.sparkle-18 { top: 65%; left: 70%; animation-delay: 1.6s; animation-duration: 7.5s; }

@keyframes sparkleFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  50% {
    transform: translate(20px, -30px) scale(1.5);
    opacity: 0.8;
  }
  90% {
    opacity: 0.3;
  }
}

/* --- Decorative Dot Grid Pattern --- */
.hero-dot-pattern {
  position: absolute;
  top: 10%;
  right: 5%;
  width: 120px;
  height: 120px;
  background-image: radial-gradient(circle, rgba(59, 130, 246, 0.12) 1.5px, transparent 1.5px);
  background-size: 16px 16px;
  z-index: 1;
  opacity: 0.6;
}

/* --- Radial Glow behind 3D model --- */
.hero-backplate-glow {
  position: absolute;
  top: 50%;
  right: 18%;
  transform: translate(50%, -50%);
  width: 600px;
  height: 600px;
  background:
    radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.16) 0%, transparent 60%),
    radial-gradient(circle at 60% 60%, rgba(139, 92, 246, 0.12) 0%, transparent 65%),
    radial-gradient(circle at 50% 50%, rgba(201, 169, 110, 0.08) 0%, transparent 70%);
  filter: blur(60px);
  z-index: 1;
  pointer-events: none;
  will-change: transform, opacity;
}

/* --- Layout --- */
.hero-container {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 0 80px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  width: 100%;
}

/* ---- Left Column ---- */
.hero-left-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding-right: 24px;
}

/* Kicker with decorative lines */
.hero-kicker-wrapper {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.hero-kicker-line {
  display: block;
  width: 32px;
  height: 2px;
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.6), rgba(59, 130, 246, 0.1));
  border-radius: 2px;
}

.hero-kicker-line:last-child {
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.6));
}

.hero-kicker {
  font-family: var(--lp-font-sans, sans-serif);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--lp-accent-hover, #2563eb);
  margin: 0;
  background: linear-gradient(135deg, #2563eb, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Title with accent word */
.hero-title {
  font-family: var(--lp-font-serif, serif);
  font-size: clamp(32px, 3.8vw, 52px);
  font-weight: 700;
  color: var(--lp-primary, #1e3a5f);
  line-height: 1.15;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
}

.hero-title-line {
  display: block;
}

.hero-title-accent {
  display: inline-block;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #2563eb 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientText 4s ease-in-out infinite;
  font-style: italic;
  font-family: var(--lp-font-script, 'Dancing Script', cursive);
  font-size: clamp(44px, 5.5vw, 72px);
  line-height: 1.2;
  margin: 6px 0;
  padding: 4px 0; /* Add safety padding so flowy ascenders/descenders aren't clipped */
}

@keyframes gradientText {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 200% center; }
}

.hero-sub {
  font-family: var(--lp-font-sans, sans-serif);
  font-size: clamp(15px, 1.2vw, 17px);
  color: #64748b;
  line-height: 1.8;
  margin-bottom: 36px;
  max-width: 480px;
}

/* ---- CTA Group ---- */
.hero-cta-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

/* ---- Premium Buttons ---- */
.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 32px;
  border-radius: 14px;
  font-family: var(--lp-font-sans, sans-serif);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  letter-spacing: 0.3px;
  position: relative;
  overflow: hidden;
}

.hero-btn-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.hero-btn-primary {
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #1d4ed8 100%);
  color: #ffffff;
  border-color: transparent;
  box-shadow:
    0 8px 24px rgba(37, 99, 235, 0.3),
    0 2px 8px rgba(37, 99, 235, 0.2),
    inset 0 1px 0 rgba(255,255,255,0.15);
}

.hero-btn-primary:hover {
  transform: translateY(-3px);
  box-shadow:
    0 14px 36px rgba(37, 99, 235, 0.4),
    0 4px 12px rgba(37, 99, 235, 0.25),
    inset 0 1px 0 rgba(255,255,255,0.2);
}

/* Shine sweep effect */
.hero-btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 100%
  );
  animation: btnShineSweep 5s ease-in-out infinite;
}

@keyframes btnShineSweep {
  0%, 70%, 100% { left: -100%; }
  30% { left: 100%; }
}

.hero-btn-ghost {
  background: rgba(255, 255, 255, 0.6);
  color: var(--lp-primary, #1e3a5f);
  border-color: rgba(30, 58, 95, 0.15);
  backdrop-filter: blur(8px);
}

.hero-btn-ghost:hover {
  background: #ffffff;
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}

/* ---- Trust Badges Row ---- */
.hero-trust-row {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 36px;
  padding: 14px 24px;
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  box-shadow: 
    0 8px 32px rgba(15, 23, 42, 0.03),
    0 1px 3px rgba(59, 130, 246, 0.02);
}

.hero-trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.trust-icon {
  width: 18px;
  height: 18px;
  color: var(--lp-accent-hover, #2563eb);
  flex-shrink: 0;
}

.hero-trust-item span {
  font-family: var(--lp-font-sans, sans-serif);
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  white-space: nowrap;
}

.hero-trust-divider {
  width: 1px;
  height: 20px;
  background: rgba(59, 130, 246, 0.15);
  flex-shrink: 0;
}

/* ---- Right Column: 3D Model ---- */
.hero-right-col {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  will-change: transform;
}

.hero-model-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* Decorative rings behind the model */
.hero-model-ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid rgba(59, 130, 246, 0.1);
  pointer-events: none;
}

.hero-model-ring-1 {
  width: 400px;
  height: 400px;
  animation: ringPulse 6s ease-in-out infinite;
}

.hero-model-ring-2 {
  width: 320px;
  height: 320px;
  border-color: rgba(147, 197, 253, 0.15);
  animation: ringPulse 6s ease-in-out infinite 1.5s;
}

@keyframes ringPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.08);
    opacity: 0.3;
  }
}

.hero-model-img {
  width: 100%;
  max-width: 480px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 20px 50px rgba(15, 23, 42, 0.1)) drop-shadow(0 8px 20px rgba(59, 130, 246, 0.08));
  position: relative;
  z-index: 2;
}

/* ---- Bottom Decorative Wave ---- */
.hero-bottom-wave {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  z-index: 3;
  line-height: 0;
  color: #ffffff;
}

.hero-bottom-wave svg {
  width: 100%;
  height: 60px;
  display: block;
}

/* ---- Responsive ---- */
@media (max-width: 992px) {
  .cinematic-hero-section {
    padding: 110px 0 80px;
    min-height: auto;
  }

  .hero-container {
    padding: 0 24px;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .hero-left-col {
    align-items: center;
    text-align: center;
    padding-right: 0;
  }

  .hero-title {
    align-items: center;
  }

  .hero-sub {
    max-width: 100%;
    margin-bottom: 28px;
  }

  .hero-cta-group {
    align-items: center;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-trust-row {
    justify-content: center;
    flex-wrap: nowrap;
    gap: 12px;
    width: 100%;
    padding: 12px 16px;
  }

  .hero-backplate-glow {
    top: auto;
    bottom: 15%;
    right: 50%;
    transform: translate(50%, 0);
    width: 320px;
    height: 320px;
  }

  .hero-model-img {
    max-width: 340px;
  }

  .hero-model-ring-1 {
    width: 300px;
    height: 300px;
  }

  .hero-model-ring-2 {
    width: 240px;
    height: 240px;
  }

  .hero-dot-pattern {
    display: none;
  }
}

@media (max-width: 480px) {
  .cinematic-hero-section {
    padding: 100px 0 60px;
  }

  .hero-title {
    font-size: 28px;
  }

  .hero-title-accent {
    font-size: 40px;
  }

  .hero-model-img {
    max-width: 280px;
  }

  /* Full-width Stacked Mobile Button layout */
  .hero-actions {
    flex-direction: column;
    width: 100%;
    gap: 12px;
    align-items: stretch;
  }

  .hero-btn {
    width: 100%;
    justify-content: center;
    padding: 14px 24px;
    font-size: 15px;
  }

  /* Balanced 3-column Trust grid on Mobile */
  .hero-trust-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding: 12px 8px;
    width: 100%;
  }

  .hero-trust-item {
    flex-direction: column;
    gap: 6px;
    text-align: center;
  }

  .hero-trust-item span {
    font-size: 11px;
    line-height: 1.25;
    white-space: normal; /* allow clean multi-line wrapping */
  }

  .hero-trust-divider {
    display: none;
  }

  .hero-kicker-line {
    width: 20px;
  }

  .hero-bottom-wave svg {
    height: 36px;
  }
}

/* --- Accessibility: Reduced Motion --- */
@media (prefers-reduced-motion: reduce) {
  .hero-mesh-bg,
  .sparkle,
  .hero-model-ring,
  .hero-btn-shine,
  .hero-title-accent {
    animation: none !important;
  }

  .sparkle {
    opacity: 0.4;
  }
}
</style>
