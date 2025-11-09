<!-- src/components/templates/ProductCreationLayout/ProductCreationLayout.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductCreationStore } from '@/stores/productCreationStore'
import { productService } from '@/services/database/productService'
import SimpleHeader from '@/components/organisms/SimpleHeader/SimpleHeader.vue'
import Modal from '@/components/molecules/Modal/Modal.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Image from '@/components/atoms/Image/Image.vue'
import settingsRose from '@/assets/images/settings-rose.png'

const router = useRouter()
const route = useRoute()
const productStore = useProductCreationStore()

const currentStep = computed(() => productStore.currentStep)
const config = computed(() => productStore.config)
const showBackButton = computed(() => true)

// Modal state
const showCancelModal = ref(false)
const isDeletingDraft = ref(false)

const handleClose = () => {
  // Show confirmation modal instead of browser confirm
  showCancelModal.value = true
}

const handleCancelConfirm = () => {
  // User confirmed - reset and go to dashboard (saves as draft)
  productStore.resetProductCreation()
  showCancelModal.value = false
  router.push('/dashboard')
}

const handleCancelBack = () => {
  // User clicked back/cancel - just close modal
  showCancelModal.value = false
}

// ✅ Handle delete draft - Actually deletes the product from database
const handleDeleteDraft = async () => {
  if (!productStore.currentProductId) {
    console.warn('⚠️ No product ID to delete')
    productStore.resetProductCreation()
    showCancelModal.value = false
    router.push('/dashboard')
    return
  }

  isDeletingDraft.value = true

  try {
    console.log('🗑️ Deleting draft product:', productStore.currentProductId)

    // Delete the product from database
    const result = await productService.deleteProduct(productStore.currentProductId)

    if (result.success) {
      console.log('✅ Draft product deleted successfully')

      // Reset store and redirect
      productStore.resetProductCreation()
      showCancelModal.value = false
      router.push('/dashboard')
    } else {
      console.error('❌ Failed to delete draft:', result.error)
      alert('Fehler beim Löschen des Entwurfs. Bitte versuche es erneut.')
    }
  } catch (error) {
    console.error('❌ Error deleting draft:', error)
    alert('Fehler beim Löschen des Entwurfs. Bitte versuche es erneut.')
  } finally {
    isDeletingDraft.value = false
  }
}

const handleBack = () => {
  if (currentStep.value === 1) {
    // On first step, go back to dashboard
    router.push('/dashboard')
  } else {
    // Navigate to previous step WITH productId
    productStore.previousStep()

    // Map step numbers to route names
    const stepRoutes = {
      1: 'ProductCreateStep1',
      2: 'ProductCreateStep2',
      3: 'ProductCreateStep3',
      4: 'ProductCreateStep4',
      5: 'ProductCreateStep5',
      6: 'ProductCreateStep6',
    }

    const targetRoute = stepRoutes[productStore.currentStep]

    if (targetRoute) {
      router.push({
        name: targetRoute,
        query: { productId: productStore.currentProductId },
      })
    }
  }
}
</script>

<template>
  <div class="bg-background-screen h-screen flex flex-col overflow-hidden">
    <!-- Header with progress -->
    <SimpleHeader
      py="4"
      logo-size="small"
      :show-progress="true"
      :current-step="currentStep"
      :total-steps="config.totalSteps"
      :step-names="config.stepNames"
      :completed-offset="1"
      :show-close-button="true"
      :show-back-button="showBackButton"
      @close="handleClose"
      @back="handleBack"
    />

    <!-- Main Content -->
    <div
      class="flex-1 flex sm:items-start items-center justify-center px-4 py-8 md:overflow-y-auto overflow-hidden"
    >
      <div class="w-full max-w-2xl h-full md:h-auto">
        <slot />
      </div>
    </div>

    <!-- ✅ Cancel Confirmation Modal with Delete Button -->
    <Modal
      :show="showCancelModal"
      title="Produkterstellung abbrechen?"
      :show-primary-button="true"
      primary-button-text="Als Entwurf speichern"
      :show-back-button="true"
      back-button-text="Zurück zur Bearbeitung"
      :show-tertiary-button="true"
      tertiary-button-text="Entwurf löschen"
      tertiary-button-variant="primary-negative"
      :tertiary-button-loading="isDeletingDraft"
      :tertiary-button-disabled="!productStore.currentProductId"
      max-width="md"
      @close="handleCancelBack"
      @back="handleCancelBack"
      @primary="handleCancelConfirm"
      @tertiary="handleDeleteDraft"
    >
      <div class="space-y-4 mx-auto items-center justify-center align-center flex flex-col">
        <Image :src="settingsRose" height="150px" />

        <Text variant="body-default-bold" color="content-secondary" class="text-center">
          Deine Änderungen werden automatisch als Entwurf gespeichert. Du kannst jederzeit zur
          Bearbeitung zurückkehren.
        </Text>
      </div>
    </Modal>
  </div>
</template>
