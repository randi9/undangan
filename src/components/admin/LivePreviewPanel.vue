<template>
  <!-- Area Kanan: Live Preview (Desktop) -->
  <div class="editor-preview-area">
    <iframe 
      ref="previewIframe" 
      class="editor-preview-iframe"
      :src="`/invitation/preview`"
      title="Live Preview"
    ></iframe>
  </div>

  <!-- Tombol FAB Mobile Preview -->
  <button class="mobile-preview-fab" @click="showMobilePreview = true">
    <Icon icon="lucide:eye" style="font-size: 20px;" /> Lihat Preview
  </button>

  <!-- Modal Fullscreen Mobile Preview -->
  <div v-if="showMobilePreview" class="mobile-preview-modal block">
    <button class="mobile-preview-close-fab" @click="showMobilePreview = false" title="Tutup Preview">
      <Icon icon="lucide:x" style="font-size: 22px;" />
    </button>
    <div style="width: 100%; height: 100vh; overflow: hidden;">
      <iframe 
        ref="mobilePreviewIframe" 
        class="editor-preview-iframe"
        :src="`/invitation/preview`"
        title="Live Preview Mobile"
        style="height: 100%;"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { usePreviewSync } from '@/composables/usePreviewSync';
import type { InvitationFormData } from '@/composables/useInvitationForm';

const props = defineProps<{
  form: InvitationFormData;
}>();

const {
  previewIframe,
  mobilePreviewIframe,
  showMobilePreview
} = usePreviewSync(props.form);

function openMobilePreview() {
  showMobilePreview.value = true;
}

defineExpose({
  openMobilePreview
});
</script>

<style scoped>
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
