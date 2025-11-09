<!-- components/organisms/CloseAccountReasonStep/CloseAccountReasonStep.vue -->
<!-- ✅ GERMAN VERSION -->
<script setup>
import { ref } from 'vue'
import { useCloseAccountStore } from '@/stores/closeAccountStore'
import CopyBlock from '@/components/molecules/CopyBlock/CopyBlock.vue'
import RadioOption from '@/components/atoms/RadioOption/RadioOption.vue'
import Button from '@/components/atoms/Button/Button.vue'

const closeAccountStore = useCloseAccountStore()
const selectedReason = ref(closeAccountStore.reason || '')

const reasons = [
  {
    value: 'transfers',
    label: 'Probleme mit meinen Transaktionen',
  },
  {
    value: 'currency',
    label: 'Konnte die gewünschte Währung nicht finden',
  },
  {
    value: 'account-details',
    label: 'Ich möchte meine Kontodaten ändern',
  },
  {
    value: 'not-using',
    label: 'Ich verwende mein Konto nicht mehr',
  },
  {
    value: 'other',
    label: 'Andere Gründe',
  },
]

const handleReasonChange = (value) => {
  selectedReason.value = value
  closeAccountStore.setReason(value)
}

const handleNext = () => {
  if (selectedReason.value) {
    closeAccountStore.nextStep()
  }
}

const handleBack = () => {
  closeAccountStore.previousStep()
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="flex-shrink-0 mb-6">
      <CopyBlock
        title="Bevor du gehst, sag uns warum du uns verlässt"
        description="Bitte wähle eine Option."
      />
    </div>

    <!-- Radio Options - Scrollable -->
    <div class="flex-1 overflow-y-auto mb-6">
      <RadioOption
        v-for="reason in reasons"
        :key="reason.value"
        :label="reason.label"
        :value="reason.value"
        name="close-reason"
        :checked="selectedReason === reason.value"
        @change="handleReasonChange"
      />
    </div>

    <!-- Actions - Fixed at Bottom -->
    <div class="flex-col flex gap-3">
      <Button variant="primary" :disabled="!selectedReason" @click="handleNext"> Weiter </Button>
    </div>
  </div>
</template>
