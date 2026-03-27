<template>
  <div class="admin-page-simple">
    <header class="simple-topbar">
      <router-link to="/" class="simple-topbar-brand">
        <div class="sidebar-brand-icon" style="width:32px;height:32px;border-radius:10px">
          <span class="material-symbols-rounded" style="font-size:18px">church</span>
        </div>
        <span class="sidebar-brand-text" style="font-size:17px">Undangan<span>Gen</span></span>
      </router-link>
      <nav class="simple-topbar-nav">
        <router-link to="/" class="btn btn-outline btn-sm">
          <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-3px">arrow_back</span>
          Kembali ke Dashboard
        </router-link>
      </nav>
    </header>

    <div class="simple-container">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 class="admin-page-title">Pilih Tema Undangan</h1>
        <p class="admin-page-subtitle">Pilih desain template yang paling sesuai untuk momen spesial Anda</p>
      </div>

      <!-- Filter Categories -->
      <div class="theme-filters">
        <button 
          v-for="category in categories" 
          :key="category.value"
          @click="activeFilter = category.value"
          :class="['filter-btn', { active: activeFilter === category.value }]"
        >
          {{ category.label }}
        </button>
      </div>

      <div class="theme-grid">
        <div 
          v-for="theme in filteredThemes" 
          :key="theme.id"
          class="theme-card" 
          @click="selectTheme(theme.id)"
        >
          <div :class="['theme-preview', `theme-${theme.id}-preview`]">
            <template v-if="theme.id === 'elegant'">
              <div class="tp-content">
                <div class="tp-title">The Wedding Of</div>
                <div class="tp-names">Romeo & Juliet</div>
              </div>
            </template>
            <template v-if="theme.id === 'minimalist'">
              <div class="tp-content">
                <div class="tp-title">THE WEDDING OF</div>
                <div class="tp-names">ROMEO & JULIET</div>
              </div>
            </template>
            <template v-if="theme.id === 'floral'">
              <div class="tp-decoration tp-dec-top">🌿</div>
              <div class="tp-content">
                <div class="tp-title">The Wedding Of</div>
                <div class="tp-names">Romeo & Juliet</div>
              </div>
              <div class="tp-decoration tp-dec-bottom">🌿</div>
            </template>
          </div>
          <div class="theme-info">
            <div class="theme-name">{{ theme.name }}</div>
            <div class="theme-desc">{{ theme.description }}</div>
            <button class="btn btn-outline btn-block mt-3">Pilih Tema Ini</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeFilter = ref('all')

const categories = [
  { label: 'Semua Tema', value: 'all' },
  { label: 'Elegan', value: 'elegant' },
  { label: 'Minimalis', value: 'minimalist' },
  { label: 'Floral', value: 'floral' }
]

const themes = [
  {
    id: 'elegant',
    category: 'elegant',
    name: 'Elegant Gold',
    description: 'Desain klasik premium dengan aksen emas dan font serif yang mewah.'
  },
  {
    id: 'minimalist',
    category: 'minimalist',
    name: 'Modern Minimalist',
    description: 'Tampilan bersih, modern, dengan ruang putih luas dan font sans-serif tebal.'
  },
  {
    id: 'floral',
    category: 'floral',
    name: 'Romantic Floral',
    description: 'Desain romantis dengan ornamen daun dan bunga, warna pastel lembut.'
  }
]

const filteredThemes = computed(() => {
  if (activeFilter.value === 'all') return themes
  return themes.filter(t => t.category === activeFilter.value)
})

function selectTheme(theme: string) {
  router.push({ path: '/create', query: { theme } })
}
</script>

<style scoped>
.theme-filters {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
}

.filter-btn {
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
  color: var(--admin-text-secondary);
  padding: 8px 16px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.filter-btn:hover {
  background: var(--admin-surface-hover);
  color: var(--admin-text);
}

.filter-btn.active {
  background: var(--admin-primary);
  color: #fff;
  border-color: var(--admin-primary);
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
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
  box-shadow: 0 12px 30px rgba(0,0,0,0.1);
}

.theme-card:hover .btn {
  background: var(--admin-primary);
  color: white;
  border-color: var(--admin-primary);
}

.theme-preview {
  height: 200px;
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
  inset: 12px;
  border: 1px solid rgba(201, 169, 110, 0.3);
}
.theme-elegant-preview .tp-title {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #c9a96e;
  margin-bottom: 8px;
}
.theme-elegant-preview .tp-names {
  font-family: 'Great Vibes', cursive;
  font-size: 28px;
  color: #fff;
}

/* Minimalist Preview */
.theme-minimalist-preview {
  background: #ffffff;
  color: #111;
}
.theme-minimalist-preview .tp-title {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #666;
  margin-bottom: 6px;
}
.theme-minimalist-preview .tp-names {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
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
  padding: 16px;
  border-radius: 50%;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid rgba(138, 154, 91, 0.2);
}
.theme-floral-preview .tp-title {
  font-family: 'Playfair Display', serif;
  font-size: 10px;
  font-style: italic;
  color: #8a9a5b;
  margin-bottom: 6px;
}
.theme-floral-preview .tp-names {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 600;
}
.tp-decoration {
  position: absolute;
  font-size: 32px;
  opacity: 0.5;
}
.tp-dec-top { top: 12px; left: 12px; transform: rotate(135deg); }
.tp-dec-bottom { bottom: 12px; right: 12px; transform: rotate(-45deg); }

.theme-info {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.theme-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--admin-text);
  margin-bottom: 6px;
}

.theme-desc {
  font-size: 13px;
  color: var(--admin-text-secondary);
  line-height: 1.5;
  flex: 1;
}

.mt-3 {
  margin-top: 12px;
}

@media (max-width: 768px) {
  .theme-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .theme-filters {
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .filter-btn {
    padding: 6px 12px;
    font-size: 13px;
    flex: 1 1 calc(50% - 8px);
    text-align: center;
  }
}
</style>
