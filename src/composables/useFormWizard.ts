import { ref, computed } from 'vue'

export interface WizardStep {
  id: string
  label: string
  icon: string
  description?: string
}

export type StepValidator = (stepIndex: number) => string[] // returns array of error messages

export function useFormWizard(steps: WizardStep[], validator?: StepValidator) {
  const currentStepIndex = ref(0)
  const stepErrors = ref<string[]>([])
  const showStepErrors = ref(false)

  const currentStep = computed(() => steps[currentStepIndex.value])
  const isFirstStep = computed(() => currentStepIndex.value === 0)
  const isLastStep = computed(() => currentStepIndex.value === steps.length - 1)
  const progress = computed(() => ((currentStepIndex.value + 1) / steps.length) * 100)

  function validateCurrentStep(): boolean {
    if (!validator) return true
    const errors = validator(currentStepIndex.value)
    stepErrors.value = errors
    showStepErrors.value = errors.length > 0
    return errors.length === 0
  }

  function dismissErrors() {
    showStepErrors.value = false
  }

  function goToStep(index: number) {
    if (index >= 0 && index < steps.length) {
      // Going backward is always allowed
      if (index < currentStepIndex.value) {
        stepErrors.value = []
        showStepErrors.value = false
        currentStepIndex.value = index
        return
      }
      // Going forward requires validation of all steps in between
      for (let i = currentStepIndex.value; i < index; i++) {
        if (validator) {
          const errors = validator(i)
          if (errors.length > 0) {
            // Navigate to the first failing step and show its errors
            currentStepIndex.value = i
            stepErrors.value = errors
            showStepErrors.value = true
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
          }
        }
      }
      stepErrors.value = []
      showStepErrors.value = false
      currentStepIndex.value = index
    }
  }

  function nextStep() {
    if (!isLastStep.value) {
      if (!validateCurrentStep()) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      stepErrors.value = []
      showStepErrors.value = false
      currentStepIndex.value++
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function prevStep() {
    if (!isFirstStep.value) {
      stepErrors.value = []
      showStepErrors.value = false
      currentStepIndex.value--
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  /** Navigate directly to a step WITHOUT validation — for draft restore only */
  function goToStepDirect(index: number) {
    if (index >= 0 && index < steps.length) {
      stepErrors.value = []
      showStepErrors.value = false
      currentStepIndex.value = index
    }
  }

  return {
    steps,
    currentStepIndex,
    currentStep,
    isFirstStep,
    isLastStep,
    progress,
    stepErrors,
    showStepErrors,
    dismissErrors,
    goToStep,
    goToStepDirect,
    nextStep,
    prevStep,
  }
}
