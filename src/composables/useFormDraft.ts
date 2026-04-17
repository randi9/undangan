import { watch, type Reactive } from 'vue'

interface DraftData {
  stepIndex: number
  form: Record<string, any>
}

export function useFormDraft(storageKey: string) {
  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  function saveDraft(form: Record<string, any>, stepIndex: number) {
    try {
      const data: DraftData = { stepIndex, form: { ...form } }
      sessionStorage.setItem(storageKey, JSON.stringify(data))
    } catch {
      // sessionStorage full or unavailable — silently ignore
    }
  }

  function loadDraft(): DraftData | null {
    try {
      const raw = sessionStorage.getItem(storageKey)
      if (!raw) return null
      return JSON.parse(raw) as DraftData
    } catch {
      return null
    }
  }

  function clearDraft() {
    sessionStorage.removeItem(storageKey)
  }

  function hasDraft(): boolean {
    return sessionStorage.getItem(storageKey) !== null
  }

  /**
   * Start watching a reactive form object and auto-save on every change.
   * Also watches step index changes. Debounced at 500ms to avoid excessive writes.
   */
  function startAutoSave(form: Reactive<Record<string, any>>, getCurrentStep: () => number) {
    function debouncedSave() {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        saveDraft(form, getCurrentStep())
      }, 500)
    }

    // Watch form data changes
    watch(
      () => JSON.stringify(form),
      debouncedSave,
      { deep: true }
    )

    // Also watch step index changes (getCurrentStep is a getter, so we wrap it)
    watch(getCurrentStep, debouncedSave)
  }

  return {
    saveDraft,
    loadDraft,
    clearDraft,
    hasDraft,
    startAutoSave,
  }
}
