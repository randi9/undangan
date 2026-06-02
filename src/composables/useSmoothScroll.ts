/**
 * useSmoothScroll — Lenis + GSAP ScrollTrigger integration
 *
 * Provides buttery-smooth scrolling for invitation pages by using Lenis
 * as the scroll interpolation layer and syncing it with GSAP's ScrollTrigger
 * via gsap.ticker (ensures single rAF loop, no double-tick issues).
 *
 * Usage:
 *   const { init, destroy } = useSmoothScroll()
 *   onMounted(() => init())
 *   onBeforeUnmount(() => destroy())
 */
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref, type Ref } from 'vue'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  const lenis: Ref<Lenis | null> = ref(null)

  function init() {
    // Prevent double-init
    if (lenis.value) return

    lenis.value = new Lenis({
      lerp: 0.07,          // Low lerp = very smooth, slightly "floaty" (premium feel)
      duration: 1.2,        // Scroll animation duration
      smoothWheel: true,    // Smooth mouse wheel / trackpad
      wheelMultiplier: 0.8, // Slightly dampen wheel speed for elegance
      touchMultiplier: 1.5, // Make touch swipes responsive
      // smoothTouch: false — default; native touch scroll feels more natural on mobile
    })

    // Connect Lenis scroll events to GSAP ScrollTrigger
    // This ensures ScrollTrigger positions update in sync with Lenis's interpolated scroll
    lenis.value.on('scroll', ScrollTrigger.update)

    // Drive Lenis via GSAP's ticker (single rAF loop, avoids double-frame issues)
    gsap.ticker.add((time: number) => {
      lenis.value?.raf(time * 1000)
    })

    // Disable GSAP's built-in lag smoothing so Lenis handles it
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger after Lenis is ready to recalculate all trigger positions
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  }

  function destroy() {
    if (!lenis.value) return

    // Remove the ticker callback (GSAP doesn't provide removeByRef, so we destroy Lenis which stops rAF)
    lenis.value.destroy()
    lenis.value = null
  }

  /**
   * Temporarily stop Lenis (e.g. when opening a modal/lightbox)
   */
  function stop() {
    lenis.value?.stop()
  }

  /**
   * Resume Lenis after stopping
   */
  function start() {
    lenis.value?.start()
  }

  /**
   * Programmatic scroll to a target element or position
   */
  function scrollTo(target: string | HTMLElement | number, options?: { offset?: number; duration?: number }) {
    lenis.value?.scrollTo(target, options)
  }

  return {
    lenis,
    init,
    destroy,
    stop,
    start,
    scrollTo,
  }
}
