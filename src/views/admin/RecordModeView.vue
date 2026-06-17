<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { THEME_REGISTRY } from '@/config/themes'

const route = useRoute()
const router = useRouter()

// Sidebar visibility
const panelVisible = ref(true)

// Determine mode: sample theme or real invitation slug
const isSampleMode = computed(() => route.name === 'record-sample')
const themeId = computed(() => route.params.themeId as string || '')
const slug = computed(() => route.params.slug as string || '')

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

onMounted(() => {
  window.addEventListener('message', onMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', onMessage)
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
    <!-- Toggle Sidebar Button (visible when panel hidden) -->
    <button
      v-if="!panelVisible"
      class="toggle-panel-floating"
      @click="panelVisible = true"
      title="Tampilkan Panel"
    >
      <Icon icon="ph:sidebar-simple-bold" />
    </button>

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
          class="hide-panel-btn"
          @click="panelVisible = false"
          title="Sembunyikan Panel"
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

      <!-- Background Selector -->
      <div class="section">
        <div class="section-label">Background</div>
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
            <span class="speed-value">{{ speedLabel }}</span>
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

      <!-- Tips -->
      <div class="section tips-section">
        <div class="section-label">
          <Icon icon="ph:lightbulb-filament-duotone" />
          Tips
        </div>
        <ul class="tips-list">
          <li>Gunakan <strong>screen recorder</strong> (OBS, ShareX, dll) untuk merekam</li>
          <li>Background hijau bisa di-<strong>chroma key</strong> di CapCut/Premiere</li>
          <li>Klik <strong>Buka Undangan</strong> di HP dulu, lalu tekan Start</li>
          <li>Atur kecepatan scroll sesuai kebutuhan</li>
        </ul>
      </div>
    </div>

    <!-- Phone Frame -->
    <div class="phone-area">
      <div class="phone-frame">
        <div class="phone-notch"></div>
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
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: background 0.3s ease;
}

/* === CONTROL PANEL === */
.control-panel {
  width: 320px;
  min-width: 320px;
  background: #0f0f0f;
  color: #e5e5e5;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-y: auto;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  scrollbar-width: thin;
  scrollbar-color: #333 #0f0f0f;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 20px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.back-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;
}
.back-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-2px);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
  flex: 1;
}

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
  margin-left: auto;
}
.hide-panel-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #e5e5e5;
}

/* Panel hide/show */
.control-panel.hidden {
  width: 0;
  min-width: 0;
  padding: 0;
  overflow: hidden;
  border-right: none;
}

.toggle-panel-floating {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 100;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
.toggle-panel-floating:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.05);
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
  padding: 16px 20px;
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

/* Theme Info */
.theme-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
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

/* === PHONE AREA === */
.phone-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.phone-frame {
  position: relative;
  width: 300px;
  aspect-ratio: 9 / 19.5;
  background: #000;
  border-radius: 40px;
  border: 10px solid #1a1a1a;
  /* NO shadow — clean edges for chroma key */
}

.phone-notch {
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

.phone-notch::after {
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

.phone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 28px;
  overflow: hidden;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}

.phone-iframe {
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
.phone-iframe::-webkit-scrollbar {
  display: none;
}

/* === RESPONSIVE: Hide control panel on very small screens === */
@media (max-width: 900px) {
  .record-page {
    flex-direction: column;
  }
  .control-panel {
    width: 100%;
    min-width: unset;
    max-height: 40vh;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  .phone-area {
    padding: 20px;
  }
}
</style>
