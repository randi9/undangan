<template>
  <Teleport to="body">
    <div class="crop-modal-overlay" @click.self="$emit('cancel')">
      <div class="crop-modal">
        <!-- Header -->
        <div class="crop-modal-header">
          <h3 class="crop-modal-title">
            <Icon icon="lucide:crop" style="font-size: 20px;" />
            Sesuaikan Foto
          </h3>
          <button class="crop-modal-close" @click="$emit('cancel')">
            <Icon icon="lucide:x" style="font-size: 20px;" />
          </button>
        </div>

        <!-- Cropper Area -->
        <div class="crop-modal-body">
          <Cropper
            ref="cropperRef"
            class="crop-area"
            :src="imageSrc"
            :stencil-component="activeStencil"
            :stencil-props="stencilProps"
            :default-size="defaultSize"
            image-restriction="stencil"
          />
        </div>

        <!-- Footer -->
        <div class="crop-modal-footer">
          <button type="button" class="btn btn-outline" @click="$emit('cancel')">
            Batal
          </button>
          <button type="button" class="btn btn-primary" @click="handleConfirm" :disabled="processing">
            <span v-if="processing" class="loading-spinner" style="margin-right: 6px;"></span>
            <Icon v-else icon="lucide:check" style="font-size: 16px; margin-right: 4px;" />
            {{ processing ? 'Memproses...' : 'Terapkan' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, markRaw } from 'vue'
import { Cropper, CircleStencil, RectangleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  imageSrc: string
  aspectRatio?: number
  stencilShape?: 'circle' | 'rectangle'
}>()

const emit = defineEmits<{
  (e: 'confirm', blob: Blob): void
  (e: 'cancel'): void
}>()

const cropperRef = ref()
const processing = ref(false)

const activeStencil = computed(() => {
  return props.stencilShape === 'circle' ? markRaw(CircleStencil) : markRaw(RectangleStencil)
})

const stencilProps = computed(() => {
  if (props.aspectRatio) {
    return { aspectRatio: props.aspectRatio }
  }
  return {}
})

function defaultSize({ imageSize }: { imageSize: { width: number; height: number } }) {
  return {
    width: Math.min(imageSize.width, imageSize.height) * 0.8,
    height: Math.min(imageSize.width, imageSize.height) * 0.8,
  }
}

async function handleConfirm() {
  if (!cropperRef.value) return
  processing.value = true

  try {
    const { canvas } = cropperRef.value.getResult()
    if (!canvas) return

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b: Blob | null) => {
          if (b) resolve(b)
          else reject(new Error('Failed to create blob'))
        },
        'image/webp',
        0.85
      )
    })

    emit('confirm', blob)
  } catch (err) {
    console.error('Crop error:', err)
  } finally {
    processing.value = false
  }
}
</script>

<style scoped>
.crop-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.crop-modal {
  background: var(--admin-surface-solid, #fff);
  border-radius: 16px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.25s ease;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.crop-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--admin-border, #e5e7eb);
}

.crop-modal-title {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--admin-text, #1f2937);
  margin: 0;
}

.crop-modal-close {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--admin-text-secondary, #6b7280);
  cursor: pointer;
  transition: all 0.2s;
}

.crop-modal-close:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--admin-text, #1f2937);
}

.crop-modal-body {
  flex: 1;
  min-height: 0;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.crop-area {
  width: 100%;
  max-height: 60vh;
  background: #1a1a2e;
  border-radius: 12px;
  overflow: hidden;
}

.crop-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 20px;
  border-top: 1px solid var(--admin-border, #e5e7eb);
}
</style>
