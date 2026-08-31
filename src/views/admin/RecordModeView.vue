<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { THEME_REGISTRY } from '@/config/themes'

const route = useRoute()
const router = useRouter()

// Sidebar visibility & Clean mode
const panelVisible = ref(true)
const cleanMode = ref(false) // When true, hides even floating quick controls for 100% clean video capture

// Display Mode: 'phone' (Mockup Frame) | 'portrait' (Full Screen Portrait)
const displayMode = ref<'phone' | 'portrait'>('portrait')
// Portrait Aspect Ratio: '9:16' | '9:19.5' | 'full'
const portraitRatio = ref<'9:16' | '9:19.5' | 'full'>('9:16')

// Browser Fullscreen tracking
const isFullscreen = ref(false)

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.warn('Fullscreen request failed:', err)
    })
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch((err) => {
        console.warn('Exit fullscreen failed:', err)
      })
    }
  }
}

function onFullscreenChange() {
  isFullscreen.value = !!document.fullscreenElement
}

// Determine mode: sample theme or real invitation slug
const isSampleMode = computed(() => route.name === 'record-sample')
const themeId = computed(() => (route.params.themeId as string) || '')
const slug = computed(() => (route.params.slug as string) || '')

// Theme info for display
const themeInfo = computed(() => {
  if (isSampleMode.value && themeId.value) {
    return THEME_REGISTRY[themeId.value] || null
  }
  return null
})

// Build iframe URL
const iframeUrl = computed(() => {
  if (isSampleMode.value) {
    return `/sample/${themeId.value}?record=true`
  }
  return `/invitation/${slug.value}?record=true`
})

// Background options
const bgPresets = [
  { name: 'Green Screen', color: '#00FF00', icon: 'ph:selection-background-duotone' },
  { name: 'Magenta', color: '#FF00FF', icon: 'ph:paint-bucket-duotone' },
  { name: 'Blue', color: '#0000FF', icon: 'ph:drop-duotone' },
  { name: 'Transparan', color: 'checkerboard', icon: 'ph:checks-duotone' },
]

const activeBg = ref('#00FF00')
const customColor = ref('#00FF00')
const bgStyle = computed(() => {
  if (activeBg.value === 'checkerboard') {
    return {
      background: `repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50% / 20px 20px`,
    }
  }
  return { background: activeBg.value }
})

function selectBg(color: string) {
  activeBg.value = color
  if (color !== 'checkerboard') {
    customColor.value = color
  }
}

function onCustomColorChange(e: Event) {
  const val = (e.target as HTMLInputElement).value
  customColor.value = val
  activeBg.value = val
}

// Scroll control
const iframeRef = ref<HTMLIFrameElement | null>(null)
const isScrolling = ref(false)
const scrollSpeed = ref(1.5) // pixels per frame
const scrollProgress = ref(0)
const iframeReady = ref(false)

function sendToIframe(message: Record<string, unknown>) {
  if (iframeRef.value?.contentWindow) {
    iframeRef.value.contentWindow.postMessage(message, '*')
  }
}

function startAutoScroll() {
  isScrolling.value = true
  sendToIframe({ type: 'RECORD_SCROLL_START', speed: scrollSpeed.value })
}

function pauseAutoScroll() {
  isScrolling.value = false
  sendToIframe({ type: 'RECORD_SCROLL_PAUSE' })
}

function toggleAutoScroll() {
  if (isScrolling.value) {
    pauseAutoScroll()
  } else {
    startAutoScroll()
  }
}

function resetScroll() {
  isScrolling.value = false
  scrollProgress.value = 0
  sendToIframe({ type: 'RECORD_SCROLL_RESET' })
}

watch(scrollSpeed, (newSpeed) => {
  if (isScrolling.value) {
    sendToIframe({ type: 'RECORD_SCROLL_SPEED', speed: newSpeed })
  }
})

// Listen for messages from iframe
function onMessage(event: MessageEvent) {
  if (event.data?.type === 'RECORD_SCROLL_PROGRESS') {
    scrollProgress.value = event.data.progress || 0
  }
  if (event.data?.type === 'RECORD_IFRAME_READY') {
    iframeReady.value = true
  }
  if (event.data?.type === 'RECORD_SCROLL_DONE') {
    isScrolling.value = false
    scrollProgress.value = 100
  }
}

// Keyboard shortcuts handler
function onKeyDown(e: KeyboardEvent) {
  const target = e.target as HTMLElement
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
    return
  }

  if (e.code === 'Space') {
    e.preventDefault()
    toggleAutoScroll()
  } else if (e.key === 'r' || e.key === 'R') {
    e.preventDefault()
    resetScroll()
  } else if (e.key === 'f' || e.key === 'F') {
    e.preventDefault()
    toggleFullscreen()
  } else if (e.key === 'h' || e.key === 'H') {
    e.preventDefault()
    if (panelVisible.value) {
      panelVisible.value = false
    } else {
      cleanMode.value = !cleanMode.value
      if (!cleanMode.value) {
        panelVisible.value = true
      }
    }
  } else if (e.key === '1') {
    displayMode.value = 'phone'
  } else if (e.key === '2') {
    displayMode.value = 'portrait'
  }
}

onMounted(() => {
  window.addEventListener('message', onMessage)
  window.addEventListener('keydown', onKeyDown)
  document.addEventListener('fullscreenchange', onFullscreenChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', onMessage)
  window.removeEventListener('keydown', onKeyDown)
  document.removeEventListener('fullscreenchange', onFullscreenChange)
})

// Speed labels
const speedLabel = computed(() => {
  if (scrollSpeed.value <= 0.5) return 'Sangat Lambat'
  if (scrollSpeed.value <= 1) return 'Lambat'
  if (scrollSpeed.value <= 2) return 'Normal'
  if (scrollSpeed.value <= 3) return 'Cepat'
  return 'Sangat Cepat'
})
</script>

<template>
  <div class="record-page" :style="bgStyle">
    <!-- Floating Mini Toolbar (visible when sidebar is hidden and not in pure clean mode) -->
    <Transition name="fade-bar">
      <div v-if="!panelVisible && !cleanMode" class="floating-quick-bar">
        <button
          class="quick-btn show-panel-btn"
          @click="panelVisible = true"
          title="Buka Panel Kontrol"
        >
          <Icon icon="ph:sidebar-simple-bold" />
          <span class="quick-btn-label">Panel</span>
        </button>

        <div class="quick-divider"></div>

        <!-- Mode Indicator / Quick Toggle -->
        <button
          class="quick-btn mode-quick-btn"
          @click="displayMode = displayMode === 'portrait' ? 'phone' : 'portrait'"
          :title="displayMode === 'portrait' ? 'Ganti ke Mockup HP (1)' : 'Ganti ke Full Screen Portrait (2)'"
        >
          <Icon :icon="displayMode === 'portrait' ? 'ph:frame-corners-bold' : 'ph:device-mobile-bold'" />
          <span class="quick-btn-label">{{ displayMode === 'portrait' ? 'Portrait' : 'Mockup HP' }}</span>
        </button>

        <div class="quick-divider"></div>

        <!-- Play / Pause -->
        <button
          v-if="!isScrolling"
          class="quick-btn quick-start-btn"
          @click="startAutoScroll"
          title="Mulai Auto-Scroll (Spasi)"
        >
          <Icon icon="ph:play-fill" />
          <span class="quick-btn-label">Mulai</span>
        </button>
        <button
          v-else
          class="quick-btn quick-pause-btn"
          @click="pauseAutoScroll"
          title="Pause Auto-Scroll (Spasi)"
        >
          <Icon icon="ph:pause-fill" />
          <span class="quick-btn-label">Pause</span>
        </button>

        <!-- Reset -->
        <button
          class="quick-btn"
          @click="resetScroll"
          title="Reset ke Atas (R)"
        >
          <Icon icon="ph:arrow-counter-clockwise-bold" />
        </button>

        <!-- Progress Badge -->
        <div class="quick-progress-badge" title="Progress Scroll">
          <span>{{ Math.round(scrollProgress) }}%</span>
        </div>

        <div class="quick-divider"></div>

        <!-- Fullscreen Browser -->
        <button
          class="quick-btn"
          @click="toggleFullscreen"
          :title="isFullscreen ? 'Keluar Layar Penuh (F)' : 'Layar Penuh Browser (F)'"
        >
          <Icon :icon="isFullscreen ? 'ph:arrows-in-bold' : 'ph:arrows-out-bold'" />
        </button>

        <!-- Clean View Mode (Hide all UI) -->
        <button
          class="quick-btn clean-mode-btn"
          @click="cleanMode = true"
          title="Sembunyikan Semua UI / Rekam Bersih (H)"
        >
          <Icon icon="ph:eye-slash-bold" />
        </button>
      </div>
    </Transition>

    <!-- Clean Mode Floating Restore Trigger (appears subtly on top right when clean mode is active) -->
    <div v-if="cleanMode" class="clean-mode-restore-trigger" @click="cleanMode = false" title="Tampilkan Kontrol Kembali (Tekan H)">
      <div class="clean-mode-restore-pill">
        <Icon icon="ph:eye-bold" />
        <span>Tampilkan UI (H)</span>
      </div>
    </div>

    <!-- Control Panel (left side) -->
    <div class="control-panel" :class="{ hidden: !panelVisible }">
      <div class="panel-header">
        <button class="back-btn" @click="router.back()" title="Kembali">
          <Icon icon="ph:arrow-left-bold" />
        </button>
        <div class="panel-title">
          <Icon icon="ph:record-fill" class="rec-icon" />
          <span>Record Mode</span>
        </div>
        <button
          class="header-action-btn"
          @click="toggleFullscreen"
          :title="isFullscreen ? 'Keluar Fullscreen (F)' : 'Fullscreen Browser (F)'"
        >
          <Icon :icon="isFullscreen ? 'ph:arrows-in-bold' : 'ph:arrows-out-bold'" />
        </button>
        <button
          class="hide-panel-btn"
          @click="panelVisible = false"
          title="Sembunyikan Panel (H)"
        >
          <Icon icon="ph:x-bold" />
        </button>
      </div>

      <!-- Theme Info -->
      <div v-if="themeInfo" class="section theme-info">
        <div class="section-label">Tema</div>
        <div class="theme-badge">
          <Icon :icon="themeInfo.icon" />
          <span>{{ themeInfo.name }}</span>
        </div>
      </div>
      <div v-else-if="slug" class="section theme-info">
        <div class="section-label">Undangan</div>
        <div class="theme-badge">
          <Icon icon="ph:link-bold" />
          <span>{{ slug }}</span>
        </div>
      </div>

      <!-- Display Mode Selector (Mockup HP vs Full Screen Portrait) -->
      <div class="section">
        <div class="section-label">
          <Icon icon="ph:devices-duotone" />
          Mode Tampilan
        </div>
        <div class="display-mode-selector">
          <button
            class="mode-btn"
            :class="{ active: displayMode === 'portrait' }"
            @click="displayMode = 'portrait'"
          >
            <Icon icon="ph:frame-corners-duotone" class="mode-icon" />
            <div class="mode-text">
              <span class="mode-title">Full Screen Portrait</span>
              <span class="mode-desc">Tanpa bezel & notch, 9:16</span>
            </div>
            <span v-if="displayMode === 'portrait'" class="mode-check">
              <Icon icon="ph:check-bold" />
            </span>
          </button>

          <button
            class="mode-btn"
            :class="{ active: displayMode === 'phone' }"
            @click="displayMode = 'phone'"
          >
            <Icon icon="ph:device-mobile-duotone" class="mode-icon" />
            <div class="mode-text">
              <span class="mode-title">Mockup HP</span>
              <span class="mode-desc">Frame smartphone & notch</span>
            </div>
            <span v-if="displayMode === 'phone'" class="mode-check">
              <Icon icon="ph:check-bold" />
            </span>
          </button>
        </div>

        <!-- Portrait Ratio Options (only shown in portrait mode) -->
        <div v-if="displayMode === 'portrait'" class="portrait-ratio-container">
          <div class="sub-section-label">Rasio Portrait:</div>
          <div class="ratio-options">
            <button
              class="ratio-btn"
              :class="{ active: portraitRatio === '9:16' }"
              @click="portraitRatio = '9:16'"
              title="Standar Reels / TikTok / Shorts (1080x1920)"
            >
              <span class="ratio-name">9:16</span>
              <span class="ratio-tag">Reels/TikTok</span>
            </button>
            <button
              class="ratio-btn"
              :class="{ active: portraitRatio === '9:19.5' }"
              @click="portraitRatio = '9:19.5'"
              title="Layar Smartphone Modern (iPhone/Samsung)"
            >
              <span class="ratio-name">9:19.5</span>
              <span class="ratio-tag">HP Modern</span>
            </button>
            <button
              class="ratio-btn"
              :class="{ active: portraitRatio === 'full' }"
              @click="portraitRatio = 'full'"
              title="Isi seluruh tinggi & lebar area kerja"
            >
              <span class="ratio-name">Full</span>
              <span class="ratio-tag">Viewport</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Background Selector -->
      <div class="section">
        <div class="section-label">Background / Chroma Key</div>
        <div class="bg-options">
          <button
            v-for="preset in bgPresets"
            :key="preset.color"
            class="bg-option"
            :class="{ active: activeBg === preset.color }"
            @click="selectBg(preset.color)"
            :title="preset.name"
          >
            <span
              v-if="preset.color !== 'checkerboard'"
              class="bg-swatch"
              :style="{ background: preset.color }"
            ></span>
            <span v-else class="bg-swatch checkerboard-swatch"></span>
            <span class="bg-option-name">{{ preset.name }}</span>
          </button>
        </div>
        <div class="custom-color-row">
          <label class="custom-label">Custom:</label>
          <input
            type="color"
            :value="customColor"
            @input="onCustomColorChange"
            class="custom-picker"
          />
          <span class="custom-hex">{{ customColor }}</span>
        </div>
      </div>

      <!-- Scroll Controls -->
      <div class="section">
        <div class="section-label">Auto-Scroll</div>
        <div class="scroll-buttons">
          <button
            v-if="!isScrolling"
            class="control-btn start-btn"
            @click="startAutoScroll"
          >
            <Icon icon="ph:play-fill" />
            <span>Mulai</span>
          </button>
          <button
            v-else
            class="control-btn pause-btn"
            @click="pauseAutoScroll"
          >
            <Icon icon="ph:pause-fill" />
            <span>Pause</span>
          </button>
          <button
            class="control-btn reset-btn"
            @click="resetScroll"
          >
            <Icon icon="ph:arrow-counter-clockwise-bold" />
            <span>Reset</span>
          </button>
        </div>

        <!-- Speed slider -->
        <div class="speed-control">
          <div class="speed-header">
            <span class="speed-label">Kecepatan</span>
            <span class="speed-value">{{ speedLabel }} ({{ scrollSpeed }}x)</span>
          </div>
          <input
            type="range"
            min="0.3"
            max="5"
            step="0.1"
            v-model.number="scrollSpeed"
            class="speed-slider"
          />
          <div class="speed-range-labels">
            <span>Lambat</span>
            <span>Cepat</span>
          </div>
        </div>

        <!-- Progress bar -->
        <div class="progress-section">
          <div class="progress-header">
            <span>Progress</span>
            <span>{{ Math.round(scrollProgress) }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: scrollProgress + '%' }"></div>
          </div>
        </div>
      </div>

      <!-- Shortcuts & Tips -->
      <div class="section shortcuts-section">
        <div class="section-label">
          <Icon icon="ph:keyboard-duotone" />
          Shortcut Keyboard
        </div>
        <div class="shortcuts-grid">
          <div class="shortcut-item">
            <kbd class="shortcut-key">Spasi</kbd>
            <span class="shortcut-desc">Mulai / Jeda Scroll</span>
          </div>
          <div class="shortcut-item">
            <kbd class="shortcut-key">R</kbd>
            <span class="shortcut-desc">Reset Scroll</span>
          </div>
          <div class="shortcut-item">
            <kbd class="shortcut-key">F</kbd>
            <span class="shortcut-desc">Fullscreen Browser</span>
          </div>
          <div class="shortcut-item">
            <kbd class="shortcut-key">H</kbd>
            <span class="shortcut-desc">Sembunyikan UI</span>
          </div>
          <div class="shortcut-item">
            <kbd class="shortcut-key">1 / 2</kbd>
            <span class="shortcut-desc">Ganti Mockup / Portrait</span>
          </div>
        </div>
      </div>

      <!-- Tips -->
      <div class="section tips-section">
        <div class="section-label">
          <Icon icon="ph:lightbulb-filament-duotone" />
          Tips Rekam Video
        </div>
        <ul class="tips-list">
          <li>Gunakan <strong>Full Screen Portrait</strong> untuk konten TikTok / Reels / Shorts 9:16.</li>
          <li>Tekan <strong>F</strong> untuk fullscreen browser, lalu <strong>H</strong> untuk sembunyikan UI sebelum merekam.</li>
          <li>Gunakan <strong>OBS Studio</strong> atau <strong>ShareX</strong> untuk menangkap video jernih 60 FPS.</li>
          <li>Background hijau / magenta bisa di-<strong>chroma key</strong> langsung di CapCut / Premiere.</li>
        </ul>
      </div>
    </div>

    <!-- Phone Area / Canvas Area -->
    <div
      class="phone-area"
      :class="{
        'is-portrait-mode': displayMode === 'portrait',
        'is-fullscreen-canvas': isFullscreen
      }"
    >
      <div
        class="phone-frame"
        :class="[
          displayMode === 'portrait' ? 'mode-portrait' : 'mode-phone',
          displayMode === 'portrait' ? `ratio-${portraitRatio.replace(':', '-')}` : ''
        ]"
      >
        <!-- Notch (only rendered in mockup phone mode) -->
        <div v-if="displayMode === 'phone'" class="phone-notch"></div>

        <div class="phone-screen">
          <iframe
            ref="iframeRef"
            :src="iframeUrl"
            class="phone-iframe"
            title="Record Undangan"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* === LAYOUT === */
.record-page {
  display: flex;
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: background 0.3s ease;
  overflow: hidden;
  position: relative;
}

/* === CONTROL PANEL === */
.control-panel {
  width: 330px;
  min-width: 330px;
  height: 100vh;
  height: 100dvh;
  background: #0f0f0f;
  color: #e5e5e5;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-y: auto;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  scrollbar-width: thin;
  scrollbar-color: #333 #0f0f0f;
  z-index: 50;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 18px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: sticky;
  top: 0;
  background: #0f0f0f;
  z-index: 10;
}

.back-btn {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 15px;
}
.back-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-2px);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.02em;
  flex: 1;
}

.header-action-btn,
.hide-panel-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}
.header-action-btn:hover,
.hide-panel-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

/* Panel hide/show */
.control-panel.hidden {
  width: 0;
  min-width: 0;
  padding: 0;
  overflow: hidden;
  border-right: none;
}

/* === FLOATING QUICK TOOLBAR === */
.floating-quick-bar {
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: rgba(15, 15, 15, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
  color: #fff;
  transition: all 0.25s ease;
}
.floating-quick-bar:hover {
  background: rgba(15, 15, 15, 0.95);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55);
}

.quick-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: 999px;
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.06);
  color: #e5e5e5;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.quick-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  transform: translateY(-1px);
}

.show-panel-btn {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
  color: #60a5fa;
}
.show-panel-btn:hover {
  background: rgba(59, 130, 246, 0.25);
  color: #fff;
}

.mode-quick-btn {
  background: rgba(139, 92, 246, 0.15);
  border-color: rgba(139, 92, 246, 0.3);
  color: #c4b5fd;
}
.mode-quick-btn:hover {
  background: rgba(139, 92, 246, 0.25);
  color: #fff;
}

.quick-start-btn {
  background: #22c55e;
  color: #fff;
}
.quick-start-btn:hover {
  background: #16a34a;
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.5);
}

.quick-pause-btn {
  background: #f59e0b;
  color: #fff;
}
.quick-pause-btn:hover {
  background: #d97706;
}

.clean-mode-btn {
  color: #aaa;
}
.clean-mode-btn:hover {
  color: #ef4444;
}

.quick-divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.12);
  margin: 0 2px;
}

.quick-progress-badge {
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  color: #38bdf8;
  font-variant-numeric: tabular-nums;
}

.quick-btn-label {
  font-size: 12px;
  font-weight: 600;
}

/* Clean Mode Restore */
.clean-mode-restore-trigger {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 100;
  cursor: pointer;
  opacity: 0.25;
  transition: opacity 0.3s ease, transform 0.2s ease;
}
.clean-mode-restore-trigger:hover {
  opacity: 1;
  transform: scale(1.05);
}
.clean-mode-restore-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 999px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
}

/* Animations for Quick Bar */
.fade-bar-enter-active,
.fade-bar-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-bar-enter-from,
.fade-bar-leave-to {
  opacity: 0;
  transform: translate(-50%, -12px);
}

.rec-icon {
  color: #ef4444;
  animation: pulse-rec 2s ease-in-out infinite;
}

@keyframes pulse-rec {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* === SECTIONS === */
.section {
  padding: 16px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.section-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #888;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.sub-section-label {
  font-size: 11px;
  font-weight: 600;
  color: #777;
  margin-bottom: 6px;
}

/* Theme Info */
.theme-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
}

/* === DISPLAY MODE SELECTOR === */
.display-mode-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mode-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: #ccc;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  position: relative;
}
.mode-btn:hover {
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.06);
}
.mode-btn.active {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.12);
  color: #fff;
}

.mode-icon {
  font-size: 22px;
  color: #94a3b8;
  flex-shrink: 0;
}
.mode-btn.active .mode-icon {
  color: #38bdf8;
}

.mode-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.mode-title {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}

.mode-desc {
  font-size: 11px;
  color: #888;
}

.mode-check {
  font-size: 14px;
  color: #38bdf8;
  margin-left: auto;
}

/* Portrait Ratio Options */
.portrait-ratio-container {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed rgba(255, 255, 255, 0.08);
}

.ratio-options {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6px;
}

.ratio-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 7px 4px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: #aaa;
  cursor: pointer;
  transition: all 0.2s;
}
.ratio-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}
.ratio-btn.active {
  border-color: #8b5cf6;
  background: rgba(139, 92, 246, 0.15);
  color: #c4b5fd;
}

.ratio-name {
  font-size: 12px;
  font-weight: 700;
}

.ratio-tag {
  font-size: 9px;
  color: #777;
}
.ratio-btn.active .ratio-tag {
  color: #a78bfa;
}

/* === BACKGROUND OPTIONS === */
.bg-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 12px;
}

.bg-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: #ccc;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 12px;
  font-weight: 500;
}
.bg-option:hover {
  border-color: rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.06);
}
.bg-option.active {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
  color: #fff;
}

.bg-swatch {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
}

.checkerboard-swatch {
  background: repeating-conic-gradient(#999 0% 25%, #fff 0% 50%) 50% / 8px 8px;
}

.bg-option-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-color-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.custom-label {
  font-size: 12px;
  color: #888;
  font-weight: 500;
}

.custom-picker {
  width: 32px;
  height: 28px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: none;
  padding: 0;
}
.custom-picker::-webkit-color-swatch-wrapper {
  padding: 0;
}
.custom-picker::-webkit-color-swatch {
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.custom-hex {
  font-size: 12px;
  color: #888;
  font-family: 'SF Mono', 'Fira Code', monospace;
}

/* === SCROLL CONTROLS === */
.scroll-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.control-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 10px;
  border: none;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.start-btn {
  background: #22c55e;
  color: #fff;
}
.start-btn:hover {
  background: #16a34a;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.pause-btn {
  background: #f59e0b;
  color: #fff;
}
.pause-btn:hover {
  background: #d97706;
}

.reset-btn {
  background: rgba(255, 255, 255, 0.08);
  color: #ccc;
}
.reset-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

/* Speed control */
.speed-control {
  margin-bottom: 16px;
}

.speed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.speed-label {
  font-size: 12px;
  color: #888;
  font-weight: 500;
}

.speed-value {
  font-size: 12px;
  color: #3b82f6;
  font-weight: 600;
}

.speed-slider {
  width: 100%;
  height: 4px;
  appearance: none;
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}
.speed-slider::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #3b82f6;
  border: 2px solid #0f0f0f;
  cursor: pointer;
  transition: transform 0.15s;
}
.speed-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
.speed-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #3b82f6;
  border: 2px solid #0f0f0f;
  cursor: pointer;
}

.speed-range-labels {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #555;
  margin-top: 4px;
}

/* Progress */
.progress-section {
  margin-top: 0;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
  margin-bottom: 6px;
  font-weight: 500;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 3px;
  transition: width 0.3s ease;
}

/* === SHORTCUTS === */
.shortcuts-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.shortcut-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
}

.shortcut-key {
  display: inline-flex;
  align-items: center;
  padding: 2px 7px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  font-family: inherit;
  font-size: 11px;
  font-weight: 600;
  color: #38bdf8;
}

.shortcut-desc {
  color: #888;
  font-size: 11px;
}

/* === TIPS === */
.tips-section {
  border-bottom: none;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tips-list li {
  font-size: 12px;
  color: #888;
  line-height: 1.5;
  padding-left: 16px;
  position: relative;
}
.tips-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #555;
}
.tips-list li strong {
  color: #bbb;
  font-weight: 600;
}

/* === CANVAS / PHONE AREA === */
.phone-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  height: 100dvh;
  padding: 30px;
  overflow: hidden;
  position: relative;
  transition: padding 0.3s ease;
}

.phone-area.is-portrait-mode {
  padding: 0;
}

/* Mode Phone (Mockup Frame) */
.phone-frame.mode-phone {
  position: relative;
  width: 300px;
  aspect-ratio: 9 / 19.5;
  background: #000;
  border-radius: 40px;
  border: 10px solid #1a1a1a;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.phone-frame.mode-phone .phone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 110px;
  height: 24px;
  background: #1a1a1a;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  z-index: 10;
}

.phone-frame.mode-phone .phone-notch::after {
  content: '';
  position: absolute;
  top: 6px;
  right: 25px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.phone-frame.mode-phone .phone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 28px;
  overflow: hidden;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}

.phone-frame.mode-phone .phone-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 390px;
  height: calc(100% / 0.725);
  transform: scale(0.725) translateZ(0);
  transform-origin: top left;
  border: none;
  background: #fff;
  scrollbar-width: none;
}

/* Mode Portrait (Full Screen Portrait Edge-to-Edge) */
.phone-frame.mode-portrait {
  position: relative;
  height: 100vh;
  height: 100dvh;
  max-height: 100vh;
  max-height: 100dvh;
  background: #fff;
  border: none;
  border-radius: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.phone-frame.mode-portrait.ratio-9-16 {
  aspect-ratio: 9 / 16;
  max-width: calc(100vh * 9 / 16);
  width: auto;
}

.phone-frame.mode-portrait.ratio-9-19-5 {
  aspect-ratio: 9 / 19.5;
  max-width: calc(100vh * 9 / 19.5);
  width: auto;
}

.phone-frame.mode-portrait.ratio-full {
  width: 100%;
  max-width: 480px;
  aspect-ratio: auto;
}

.phone-frame.mode-portrait .phone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 0;
  overflow: hidden;
}

.phone-frame.mode-portrait .phone-iframe {
  width: 100%;
  height: 100%;
  position: relative;
  transform: none;
  border: none;
  background: #fff;
  scrollbar-width: none;
}

.phone-iframe::-webkit-scrollbar {
  display: none;
}

/* === RESPONSIVE: Small screen handling === */
@media (max-width: 900px) {
  .record-page {
    flex-direction: column;
  }
  .control-panel {
    width: 100%;
    min-width: unset;
    height: auto;
    max-height: 45vh;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .phone-area {
    padding: 10px;
    height: calc(100vh - 45vh);
  }
  .phone-area.is-portrait-mode {
    padding: 0;
  }
}
</style>
