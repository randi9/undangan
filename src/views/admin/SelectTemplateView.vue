<template>
  <div class="admin-layout">
    <header class="admin-header">
      <router-link to="/" class="admin-logo">
        <div class="logo-icon">💒</div>
        <span>Undangan<span style="color: var(--admin-primary)">Gen</span></span>
      </router-link>
      <nav class="admin-nav">
        <router-link to="/">Dashboard</router-link>
        <router-link to="/create" class="router-link-active">+ Buat Undangan</router-link>
      </nav>
    </header>

    <div class="admin-container">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 class="admin-page-title">Pilih Tema Undangan</h1>
        <p class="admin-page-subtitle">Pilih desain template yang paling sesuai untuk momen spesial Anda</p>
      </div>

      <div class="theme-grid">
        <!-- Elegant Theme -->
        <div class="theme-card" @click="selectTheme('elegant')">
          <div class="theme-preview theme-elegant-preview">
            <div class="tp-content">
              <div class="tp-title">The Wedding Of</div>
              <div class="tp-names">Romeo & Juliet</div>
            </div>
          </div>
          <div class="theme-info">
            <div class="theme-name">Elegant Gold</div>
            <div class="theme-desc">Desain klasik premium dengan aksen emas dan font serif yang mewah.</div>
            <button class="btn btn-outline btn-block mt-3">Pilih Tema Ini</button>
          </div>
        </div>

        <!-- Minimalist Theme -->
        <div class="theme-card" @click="selectTheme('minimalist')">
          <div class="theme-preview theme-minimalist-preview">
            <div class="tp-content">
              <div class="tp-title">THE WEDDING OF</div>
              <div class="tp-names">ROMEO & JULIET</div>
            </div>
          </div>
          <div class="theme-info">
            <div class="theme-name">Modern Minimalist</div>
            <div class="theme-desc">Tampilan bersih, modern, dengan ruang putih luas dan font sans-serif tebal.</div>
            <button class="btn btn-outline btn-block mt-3">Pilih Tema Ini</button>
          </div>
        </div>

        <!-- Floral Theme -->
        <div class="theme-card" @click="selectTheme('floral')">
          <div class="theme-preview theme-floral-preview">
            <div class="tp-decoration tp-dec-top">🌿</div>
            <div class="tp-content">
              <div class="tp-title">The Wedding Of</div>
              <div class="tp-names">Romeo & Juliet</div>
            </div>
            <div class="tp-decoration tp-dec-bottom">🌿</div>
          </div>
          <div class="theme-info">
            <div class="theme-name">Romantic Floral</div>
            <div class="theme-desc">Desain romantis dengan ornamen daun dan bunga, warna pastel lembut.</div>
            <button class="btn btn-outline btn-block mt-3">Pilih Tema Ini</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function selectTheme(theme: string) {
  router.push({ path: '/create', query: { theme } })
}
</script>

<style scoped>
.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;
}

.theme-card {
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

.theme-card:hover {
  transform: translateY(-8px);
  border-color: var(--admin-primary);
  box-shadow: 0 12px 30px rgba(0,0,0,0.4);
}

.theme-card:hover .btn {
  background: var(--admin-primary);
  color: white;
  border-color: var(--admin-primary);
}

.theme-preview {
  height: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--admin-border);
  overflow: hidden;
}

.tp-content {
  text-align: center;
  z-index: 2;
}

/* Elegant Preview */
.theme-elegant-preview {
  background: #2c2417;
  color: #fff;
}
.theme-elegant-preview::before {
  content: '';
  position: absolute;
  inset: 16px;
  border: 1px solid rgba(201, 169, 110, 0.3);
}
.theme-elegant-preview .tp-title {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #c9a96e;
  margin-bottom: 12px;
}
.theme-elegant-preview .tp-names {
  font-family: 'Great Vibes', cursive;
  font-size: 36px;
  color: #fff;
}

/* Minimalist Preview */
.theme-minimalist-preview {
  background: #ffffff;
  color: #111;
}
.theme-minimalist-preview .tp-title {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #666;
  margin-bottom: 8px;
}
.theme-minimalist-preview .tp-names {
  font-family: 'Inter', sans-serif;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -1px;
}

/* Floral Preview */
.theme-floral-preview {
  background: #fdfbf7;
  color: #4a5d4e;
}
.theme-floral-preview .tp-content {
  background: rgba(255,255,255,0.8);
  padding: 24px;
  border-radius: 50%;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid rgba(138, 154, 91, 0.2);
}
.theme-floral-preview .tp-title {
  font-family: 'Playfair Display', serif;
  font-size: 12px;
  font-style: italic;
  color: #8a9a5b;
  margin-bottom: 8px;
}
.theme-floral-preview .tp-names {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 600;
}
.tp-decoration {
  position: absolute;
  font-size: 40px;
  opacity: 0.5;
}
.tp-dec-top { top: 16px; left: 16px; transform: rotate(135deg); }
.tp-dec-bottom { bottom: 16px; right: 16px; transform: rotate(-45deg); }

.theme-info {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.theme-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--admin-text);
  margin-bottom: 8px;
}

.theme-desc {
  font-size: 14px;
  color: var(--admin-text-secondary);
  line-height: 1.5;
  flex: 1;
}

.mt-3 {
  margin-top: 16px;
}
</style>
