/**
 * TypeScript declarations for Meta Pixel (Facebook Pixel).
 * Extends the global Window interface to include fbq and _fbq.
 */

interface MetaPixelFunction {
  (action: 'init', pixelId: string): void;
  (action: 'set', key: string, value: unknown): void;
  (action: 'track', eventName: string, params?: Record<string, unknown>): void;
  (action: 'trackSingle', pixelId: string, eventName: string, params?: Record<string, unknown>): void;
  (action: 'trackCustom', eventName: string, params?: Record<string, unknown>): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  loaded?: boolean;
  version?: string;
  push?: (...args: unknown[]) => void;
}

declare global {
  interface Window {
    fbq: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
  }

  // Allow bare fbq() calls without window. prefix
  // eslint-disable-next-line no-var
  var fbq: MetaPixelFunction;
}

export {};
