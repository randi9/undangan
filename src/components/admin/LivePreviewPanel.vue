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
    <div class="mobile-preview-header">
      <span style="display: flex; align-items: center; gap: 8px;">
        <span class="material-symbols-rounded" style="color: var(--admin-primary); font-size: 20px;">visibility</span>
        Live Preview
      </span>
      <button class="btn btn-outline btn-sm" @click="showMobilePreview = false" style="border: none; padding: 4px;">
        <span class="material-symbols-rounded">close</span>
      </button>
    </div>
    <div style="flex: 1; height: calc(100vh - 60px);">
      <iframe 
        ref="mobilePreviewIframe" 
        class="editor-preview-iframe"
        :src="`/invitation/preview`"
        title="Live Preview Mobile"
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
