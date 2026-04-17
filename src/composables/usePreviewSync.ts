import { ref, watch, onMounted } from 'vue'
import type { InvitationFormData } from './useInvitationForm'

export function usePreviewSync(form: InvitationFormData) {
  const previewIframe = ref<HTMLIFrameElement>()
  const mobilePreviewIframe = ref<HTMLIFrameElement>()
  const showMobilePreview = ref(false)

  function sendPreviewData() {
    const payload = {
      type: 'LIVE_PREVIEW',
      data: {
        ...form,
        love_story: form.love_story.filter((s) => s.title || s.date),
      },
    }
    const cleanPayload = JSON.parse(JSON.stringify(payload))
    if (previewIframe.value?.contentWindow) {
      previewIframe.value.contentWindow.postMessage(cleanPayload, '*')
    }
    if (mobilePreviewIframe.value?.contentWindow) {
      mobilePreviewIframe.value.contentWindow.postMessage(cleanPayload, '*')
    }
  }

  // Watch form changes to sync with Preview Iframe
  watch(
    form,
    () => {
      sendPreviewData()
    },
    { deep: true }
  )

  // Listener for PREVIEW_READY from iframe
  onMounted(() => {
    window.addEventListener('message', (event) => {
      if (event.data?.type === 'PREVIEW_READY') {
        sendPreviewData()
      }
    })
  })

  return {
    previewIframe,
    mobilePreviewIframe,
    showMobilePreview,
    sendPreviewData,
  }
}
