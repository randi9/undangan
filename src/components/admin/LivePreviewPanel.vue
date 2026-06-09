<template>
  <!-- Area Kanan: Live Preview (Desktop) -->
  <div class="editor-preview-area">
    <!-- Smartphone CSS Frame Mockup -->
    <div class="smartphone-frame-wrapper">
      <div class="smartphone-frame">
        <div class="smartphone-notch"></div>
        <div class="smartphone-screen">
          <iframe
            ref="previewIframe"
            class="editor-preview-iframe"
            :src="`/invitation/preview`"
            title="Live Preview"
          ></iframe>
        </div>
      </div>
    </div>
  </div>

  <!-- Tombol FAB Mobile Preview -->
  <button class="mobile-preview-fab" @click="showMobilePreview = true">
    <Icon icon="lucide:eye" style="font-size: 20px" /> Lihat Preview
  </button>

  <!-- Modal Fullscreen Mobile Preview -->
  <div v-if="showMobilePreview" class="mobile-preview-modal block">
    <button
      class="mobile-preview-close-fab"
      @click="showMobilePreview = false"
      title="Tutup Preview"
    >
      <Icon icon="lucide:x" style="font-size: 22px" />
    </button>
    <div style="width: 100%; height: 100vh; overflow: hidden">
      <iframe
        ref="mobilePreviewIframe"
        class="editor-preview-iframe"
        :src="`/invitation/preview`"
        title="Live Preview Mobile"
        style="height: 100%"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { usePreviewSync } from "@/composables/usePreviewSync";
import type { InvitationFormData } from "@/composables/useInvitationForm";

const props = defineProps<{
  form: InvitationFormData;
}>();

const { previewIframe, mobilePreviewIframe, showMobilePreview } =
  usePreviewSync(props.form);

function openMobilePreview() {
  showMobilePreview.value = true;
}

defineExpose({
  openMobilePreview,
});
</script>

<style>
/* Override editor-preview-area yang didefinisikan di main.css */
.editor-preview-area {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  overflow: visible !important;
}
</style>

<style scoped>
/* Smartphone Frame Mockup */
.smartphone-frame-wrapper {
  position: relative;
  width: 100%;
  max-width: 440px;
  padding: 20px 30px 60px 30px; /* Dipersempit ke 30px agar muat di sidebar editor 420px tanpa memotong isi */
  perspective: 1000px;
  display: flex;
  justify-content: center;
}

.smartphone-frame {
  position: relative;
  width: 100%;
  max-width: 300px;
  aspect-ratio: 9 / 19.5;
  background: #000;
  border-radius: 40px;
  border: 10px solid #1a1a1a;
  box-shadow:
    -20px 30px 60px -10px rgba(0, 0, 0, 0.45),
    inset 0 0 0 1px rgba(255, 255, 255, 0.15);
  z-index: 2;
  transform: rotateY(-8deg) rotateX(3deg);
  transition:
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.5s ease;
}

.smartphone-frame:hover {
  transform: rotateY(0deg) rotateX(0deg);
  box-shadow:
    0 40px 80px -15px rgba(0, 0, 0, 0.3),
    inset 0 0 0 1px rgba(255, 255, 255, 0.15);
}

.smartphone-notch {
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

.smartphone-notch::after {
  content: "";
  position: absolute;
  top: 6px;
  right: 25px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.smartphone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 28px;
  overflow: hidden;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}

.editor-preview-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 390px;
  height: 139.27%; /* 100% / 0.718 */
  transform: scale(0.718);
  transform-origin: top left;
  border: none;
  background: #fff;
  scrollbar-width: none;
}

.editor-preview-iframe::-webkit-scrollbar {
  display: none;
}

/* Mobile Preview Components */
.mobile-preview-close-fab {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  width: 44px;
  height: 44px;
  background: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e293b;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.2s;
}
.mobile-preview-close-fab:active {
  transform: scale(0.95);
  background: #f1f5f9;
}
</style>
