<!-- src/components/templates/OnboardingLayout/OnboardingLayout.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboardingStore'
import { useAuthStore } from '@/stores/authStore'
import { accountDeletionService } from '@/services/accountDeletionService'
import SimpleHeader from '@/components/organisms/SimpleHeader/SimpleHeader.vue'
import Modal from '@/components/molecules/Modal/Modal.vue'
import Text from '@/components/atoms/Text/Text.vue'
const router = useRouter()
const onboardingStore = useOnboardingStore()
const authStore = useAuthStore()

const currentStep = computed(() => onboardingStore.currentStep)

// Onboarding configuration
const onboardingConfig = {
  totalSteps: 3,
  completedOffset: 1,
  stepNames: ['Art des Kontos', 'Land', 'Passwort'],
}

// Always show back button in onboarding
const showBackButton = computed(() => true)

// Modal state
const showDeleteModal = ref(false)
const isDeleting = ref(false)
const deleteError = ref('')

// Handle close button - show deletion modal
const handleClose = () => {
  showDeleteModal.value = true
}

// Handle back button
const handleBack = () => {
  // If on first step, show deletion modal
  if (currentStep.value === 1) {
    showDeleteModal.value = true
  } else {
    // Otherwise, go to previous step
    onboardingStore.previousStep()
  }
}

// Confirm account deletion
const confirmDeletion = async () => {
  isDeleting.value = true
  deleteError.value = ''

  try {
    const userId = authStore.user?.$id
    const email = authStore.user?.email || authStore.email

    if (!userId) {
      throw new Error('Keine Benutzer-ID gefunden')
    }

    console.log('🗑️ Deleting incomplete account:', userId)

    // Delete account
    const result = await accountDeletionService.deleteIncompleteAccount(userId, email)

    if (result.success) {
      console.log('✅ Account deleted successfully')

      // Clear all stores
      authStore.resetState()
      onboardingStore.fullReset()

      // Clear localStorage
      localStorage.removeItem('auth')
      localStorage.removeItem('onboarding')

      // Redirect to home
      router.push('/')
    } else {
      throw new Error(result.error || 'Fehler beim Löschen des Kontos')
    }
  } catch (error) {
    console.error('❌ Deletion error:', error)
    deleteError.value = error.message || 'Fehler beim Löschen des Kontos'
  } finally {
    isDeleting.value = false
  }
}

// Cancel deletion
const cancelDeletion = () => {
  showDeleteModal.value = false
  deleteError.value = ''
}
</script>

<template>
  <div class="bg-background-screen h-screen flex flex-col overflow-hidden">
    <!-- Header with back button support -->
    <SimpleHeader
      logo-size="small"
      :show-progress="true"
      :current-step="currentStep"
      :total-steps="onboardingConfig.totalSteps"
      :step-names="onboardingConfig.stepNames"
      :completed-offset="onboardingConfig.completedOffset"
      :show-close-button="true"
      :show-back-button="showBackButton"
      @close="handleClose"
      @back="handleBack"
    />

    <!-- Main Content -->
    <div
      class="flex-1 flex sm:items-start items-center justify-center px-4 py-8 md:overflow-y-auto overflow-hidden"
    >
      <div class="w-full max-w-content h-full md:h-auto">
        <slot />
      </div>
    </div>

    <!-- Delete Account Confirmation Modal -->
    <Modal
      :show="showDeleteModal"
      title="Einrichtung abbrechen?"
      :show-close-button="true"
      :show-back-button="false"
      :show-primary-button="true"
      primary-button-text="Ja, Onboarding abbrechen"
      :primary-button-loading="isDeleting"
      :primary-button-disabled="isDeleting"
      :show-secondary-button="true"
      secondary-button-text="Nein, fortfahren"
      :secondary-button-disabled="isDeleting"
      max-width="md"
      @primary="confirmDeletion"
      @secondary="cancelDeletion"
      @close="cancelDeletion"
    >
      <div class="space-y-4">
        <Text variant="body-large-bold">Möchtest du die Einrichtung wirklich beenden?</Text>

        <!-- Error message -->
        <div v-if="deleteError" class="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-800 text-sm">{{ deleteError }}</p>
        </div>
      </div>
    </Modal>
  </div>
</template>
