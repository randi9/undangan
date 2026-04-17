import { ref, computed } from 'vue'

export interface WizardStep {
  id: string
  label: string
  icon: string
  description?: string
}

export function useFormWizard(steps: WizardStep[]) {
  const currentStepIndex = ref(0)

  const currentStep = computed(() => steps[currentStepIndex.value])
  const isFirstStep = computed(() => currentStepIndex.value === 0)
  const isLastStep = computed(() => currentStepIndex.value === steps.length - 1)
  const progress = computed(() => ((currentStepIndex.value + 1) / steps.length) * 100)

  function goToStep(index: number) {
    if (index >= 0 && index < steps.length) {
      currentStepIndex.value = index
    }
  }

  function nextStep() {
    if (!isLastStep.value) {
      currentStepIndex.value++
      // Scroll ke atas form saat pindah step
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function prevStep() {
    if (!isFirstStep.value) {
      currentStepIndex.value--
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return {
    steps,
    currentStepIndex,
    currentStep,
    isFirstStep,
    isLastStep,
    progress,
    goToStep,
    nextStep,
    prevStep,
  }
}
