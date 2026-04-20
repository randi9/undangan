  <template>
  <section class="cinematic-hero-section">
    <!-- Full Background Video (No Loop) -->
    <video 
      class="hero-video-bg" 
      ref="heroVideoRef"
      autoplay 
      muted 
      playsinline
    >
      <source :src="'/landinghero.mp4'" type="video/mp4" />
    </video>

    <!-- Dark Overlay that fades in at 1.5s -->
    <div class="hero-dark-overlay" ref="overlayRef"></div>

    <div class="lp-container hero-container">
      <div class="hero-content-wrapper">
        
        <p class="hero-kicker" ref="kickerRef">Undangan Digital Premium</p>
        <h1 class="hero-title" ref="titleRef">
          Undangan Digital Elegan untuk Hari Spesialmu
        </h1>
        <p class="hero-sub" ref="subRef">
          Buat tamu terkesan sejak klik pertama dengan undangan modern, praktis, dan berkelas.
        </p>

        <div class="hero-cta-group" ref="actionsRef">
          <div class="hero-actions">
             <a href="#tema" class="lp-btn lp-btn-primary glow-btn">Lihat Demo</a>
             <a href="/login" class="lp-btn lp-btn-outline">Buat Undangan</a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { Icon } from '@iconify/vue'

const heroVideoRef = ref<HTMLVideoElement | null>(null)
const overlayRef = ref(null)

const kickerRef = ref(null)
const titleRef = ref(null)
const subRef = ref(null)
const actionsRef = ref(null)

let tl: gsap.core.Timeline | null = null

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    gsap.set(overlayRef.value, { opacity: 0.65 })
    gsap.set([kickerRef.value, titleRef.value, subRef.value, actionsRef.value], { y: 0, opacity: 1 })
    return
  }
  
  // Allow DOM to settle
  setTimeout(() => { initAnimation() }, 100)
  
  // Explicitly play video to bypass some browser autoplay policies initially
  if (heroVideoRef.value) {
    heroVideoRef.value.play().catch(e => console.log("Video must be interacted with to play", e))
  }
})

onUnmounted(() => {
  if (tl) tl.kill()
})

function initAnimation() {
  // Hide all text and overlay initially
  gsap.set(overlayRef.value, { opacity: 0 })
  gsap.set([kickerRef.value, titleRef.value, subRef.value, actionsRef.value], { y: 40, opacity: 0 })
  
  tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  
  // 1. At exactly 1.5 seconds, fade in the dark overlay
  tl.to(overlayRef.value, {
    opacity: 0.85, // Full opacity dari overlay yang pekat
    duration: 1.0,
    ease: 'power2.inOut'
  }, 1.5) // 1.5s absolute delay from timeline start
  
  // 2. Cascade fade-in all text elements and CTA starting at 1.5 seconds
  tl.to([kickerRef.value, titleRef.value, subRef.value, actionsRef.value], {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.15
  }, 1.5) 
}
</script>

<style scoped>
.cinematic-hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #0f172a; /* Fallback */
}

.hero-video-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}

.hero-dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1;
}

.hero-container {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 60px; /* offset for nav */
}

.hero-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 900px;
  padding: 0 20px;
}

.hero-kicker {
  font-family: var(--lp-font-sans, sans-serif);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--lp-gold, #c9a96e);
  margin-bottom: 24px;
}

.hero-title {
  font-family: var(--lp-font-serif, serif);
  font-size: clamp(42px, 5vw, 84px);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.15;
  margin-bottom: 24px;
  text-shadow: 0 4px 16px rgba(0,0,0,0.4);
}

.hero-sub {
  font-family: var(--lp-font-sans, sans-serif);
  font-size: clamp(16px, 1.8vw, 20px);
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  max-width: 85%;
  margin: 0 auto;
}

.hero-cta-group {
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  justify-content: center;
}


.lp-btn {
  display: inline-flex; 
  align-items: center; 
  justify-content: center; 
  padding: 16px 40px;
  border-radius: 40px; 
  font-family: var(--lp-font-sans, sans-serif); 
  font-size: 16px;
  font-weight: 600; 
  text-decoration: none; 
  transition: all 0.3s ease; 
  border: 2px solid transparent;
}

.lp-btn-primary {
  background: var(--lp-accent-hover, #2563eb); 
  color: #fff; 
  border-color: var(--lp-accent-hover, #2563eb); 
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.25);
}

.lp-btn-primary:hover { 
  background: #1d4ed8; 
  border-color: #1d4ed8; 
  transform: translateY(-2px); 
  box-shadow: 0 12px 32px rgba(37, 99, 235, 0.35); 
}

.glow-btn { 
  position: relative; 
  overflow: hidden; 
}
.glow-btn::after {
  content: ''; 
  position: absolute; 
  top: -50%; left: -50%; 
  width: 200%; height: 200%;
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
  transform: rotate(30deg) translateX(-100%); 
  animation: shine 6s infinite;
}
@keyframes shine { 
  0% { transform: rotate(30deg) translateX(-100%); } 
  20%, 100% { transform: rotate(30deg) translateX(100%); } 
}

.lp-btn-outline { 
  background: transparent; 
  color: #ffffff; 
  border-color: rgba(255, 255, 255, 0.4); 
}
.lp-btn-outline:hover { 
  background: rgba(255, 255, 255, 0.1); 
  border-color: #ffffff; 
}

@media (max-width: 768px) {
  .hero-title { font-size: 36px; }
  .hero-sub { max-width: 100%; }
}
</style>
