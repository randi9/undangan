import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// Force full-reload for invitation components to prevent GSAP ScrollTrigger + HMR conflicts.
// GSAP injects pin-spacer wrappers and inline styles directly into the DOM which Vue's
// virtual DOM diffing cannot reconcile during hot module replacement, causing layout chaos.
function invitationFullReloadPlugin() {
  return {
    name: 'invitation-full-reload',
    handleHotUpdate({ file, server }: { file: string; server: any }) {
      const normalized = file.replace(/\\/g, '/');
      if (normalized.includes('/src/components/invitation/') || 
          normalized.includes('/src/views/invitation/')) {
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    invitationFullReloadPlugin(),
  ],
  esbuild: {
    target: 'esnext'
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8788',
    },
    watch: {
      ignored: ['**/.wrangler/**']
    }
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@vue')) return 'vendor-vue';
            if (id.includes('@supabase')) return 'vendor-supabase';
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('@iconify')) return 'vendor-icons';
            if (id.includes('@clerk')) return 'vendor-clerk';
            return 'vendor-core';
          }
        }
      }
    }
  }
})