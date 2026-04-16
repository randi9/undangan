import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  build: {
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
