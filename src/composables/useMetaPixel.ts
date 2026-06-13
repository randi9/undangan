/**
 * Meta Pixel (Facebook Pixel) composable for Vue 3 SPA.
 *
 * Usage:
 *   import { initMetaPixel, trackPageView, trackEvent } from '@/composables/useMetaPixel';
 *
 *   // Call once at app startup (e.g. in router module)
 *   initMetaPixel();
 *
 *   // Track SPA page views in router.afterEach
 *   trackPageView();
 *
 *   // Track conversion events
 *   trackEvent('Lead');
 *   trackEvent('Purchase', { value: 50000, currency: 'IDR' });
 */

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

let initialized = false;

/**
 * Injects the Meta Pixel base script into the page and calls fbq('init').
 * Safe to call multiple times — only executes once (singleton).
 * Gracefully skips if PIXEL_ID is not configured.
 */
export function initMetaPixel(): void {
  if (initialized) return;
  if (!PIXEL_ID || PIXEL_ID === 'YOUR_PIXEL_ID_HERE') {
    if (import.meta.env.DEV) {
      console.warn('[Meta Pixel] VITE_META_PIXEL_ID is not configured. Skipping pixel initialization.');
    }
    return;
  }

  initialized = true;

  // --- Official Meta Pixel base code ---
  /* eslint-disable */
  const f = window as any;
  const n = (f.fbq = function (...args: unknown[]) {
    if (n.callMethod) {
      n.callMethod(...args);
    } else {
      n.queue!.push(args);
    }
  } as any);

  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];
  /* eslint-enable */

  // Inject the fbevents.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript?.parentNode?.insertBefore(script, firstScript);

  // Initialize with Pixel ID and fire first PageView
  window.fbq('init', PIXEL_ID);
  window.fbq('track', 'PageView');
}

/**
 * Tracks a PageView event. Call this in router.afterEach() for SPA navigation.
 */
export function trackPageView(): void {
  if (!initialized) return;
  window.fbq('track', 'PageView');
}

/**
 * Tracks a standard Meta Pixel event.
 *
 * @see https://developers.facebook.com/docs/meta-pixel/reference#standard-events
 *
 * Common events:
 *  - 'Lead' — user signs up or submits a form
 *  - 'CompleteRegistration' — user completes registration
 *  - 'InitiateCheckout' — user starts checkout
 *  - 'Purchase' — user completes a purchase (include { value, currency })
 *  - 'ViewContent' — user views specific content
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (!initialized) return;
  if (params) {
    window.fbq('track', eventName, params);
  } else {
    window.fbq('track', eventName);
  }
}

/**
 * Tracks a custom (non-standard) Meta Pixel event.
 */
export function trackCustom(eventName: string, params?: Record<string, unknown>): void {
  if (!initialized) return;
  if (params) {
    window.fbq('trackCustom', eventName, params);
  } else {
    window.fbq('trackCustom', eventName);
  }
}
