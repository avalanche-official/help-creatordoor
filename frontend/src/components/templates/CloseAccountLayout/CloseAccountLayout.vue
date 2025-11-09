<!-- components/templates/CloseAccountLayout/CloseAccountLayout.vue -->
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCloseAccountStore } from '@/stores/closeAccountStore'
import SimpleHeader from '@/components/organisms/SimpleHeader/SimpleHeader.vue'

const router = useRouter()
const closeAccountStore = useCloseAccountStore()

const currentStep = computed(() => closeAccountStore.currentStep)

// Configuration for close account flow
const closeAccountConfig = {
  totalSteps: 2,
  completedOffset: 1,
  stepNames: ['Reason', 'Summary'],
}

const showBackButton = computed(() => true)

const handleClose = () => {
  closeAccountStore.reset()
  router.push('/dashboard/settings/close-account')
}

const handleBack = () => {
  if (currentStep.value === 1) {
    closeAccountStore.reset()
    router.push('/dashboard/settings/close-account')
  } else {
    closeAccountStore.previousStep()
  }
}
</script>

<template>
  <div class="bg-background-screen h-screen flex flex-col overflow-hidden">
    <!-- Header with Progress -->
    <SimpleHeader
      logo-size="small"
      py="4"
      :show-progress="true"
      :current-step="currentStep"
      :total-steps="closeAccountConfig.totalSteps"
      :step-names="closeAccountConfig.stepNames"
      :completed-offset="closeAccountConfig.completedOffset"
      :show-close-button="true"
      @close="handleClose"
      @back="handleBack"
    />

    <!-- Main Content -->
    <div
      class="flex-1 flex sm:items-start items-center justify-center px-4 py-8 md:overflow-y-auto overflow-hidden"
    >
      <div class="w-full max-w-lg h-full md:h-auto">
        <slot />
      </div>
    </div>
  </div>
</template>
