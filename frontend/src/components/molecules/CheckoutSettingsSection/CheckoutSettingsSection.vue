<!-- components/molecules/CheckoutSettingsSection/CheckoutSettingsSection.vue -->
<script setup>
import { ref } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'
import RenderHTML from '@/components/atoms/RenderHTML/RenderHTML.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import Modal from '@/components/molecules/Modal/Modal.vue'
import RichTextEditor from '@/components/organisms/RichTextEditor/RichTextEditor.vue'

const props = defineProps({
  checkoutSettings: {
    type: Object,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:orderConfirmation'])

// Modal state
const showOrderConfirmationModal = ref(false)
const editingOrderConfirmation = ref('')
const isSaving = ref(false)

// Open modal with current content
const openOrderConfirmationModal = () => {
  editingOrderConfirmation.value = props.checkoutSettings.orderConfirmationDescription || ''
  showOrderConfirmationModal.value = true
}

// Close modal
const closeOrderConfirmationModal = () => {
  showOrderConfirmationModal.value = false
  editingOrderConfirmation.value = ''
}

// Save order confirmation
const saveOrderConfirmation = async () => {
  isSaving.value = true
  try {
    emit('update:orderConfirmation', editingOrderConfirmation.value)
    closeOrderConfirmationModal()
  } catch (error) {
    console.error('Error saving order confirmation:', error)
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="space-y-2">
    <div>
      <Text variant="body-default-bold" color="content-secondary">Checkout-Einstellungen</Text>
    </div>
    <div class="border-b border-stone-300"></div>

    <div class="space-y-6 py-4">
      <!-- Order Confirmation Description Section -->
      <div class="flex flex-col">
        <div class="flex items-center justify-between mb-2">
          <Text color="content-secondary" variant="body-default">Bestellbestätigung</Text>
          <Button v-if="!disabled" variant="ghost" size="small" @click="openOrderConfirmationModal">
            <Icon name="edit" :size="16" class="mr-1" />
            Bearbeiten
          </Button>
        </div>

        <!-- Show Order Confirmation Content -->
        <div
          v-if="checkoutSettings.orderConfirmationDescription"
          class="bg-stone-50 border border-stone-200 rounded-xl p-4 cursor-pointer hover:bg-stone-100 transition-colors"
          @click="openOrderConfirmationModal"
        >
          <RenderHTML
            :html="checkoutSettings.orderConfirmationDescription"
            variant="body-default"
            color="content-secondary"
            :max-lines="5"
          />
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="bg-stone-50 border border-stone-200 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-stone-100 transition-colors"
          @click="openOrderConfirmationModal"
        >
          <Icon name="file-text" :size="32" class="text-stone-400 mx-auto mb-2" />
          <Text variant="body-default" color="content-tertiary">
            Keine Bestellbestätigung gesetzt
          </Text>
          <Text variant="body-small" color="content-tertiary" class="mt-1">
            Klicken zum Hinzufügen
          </Text>
        </div>
      </div>
    </div>

    <!-- Order Confirmation Modal -->
    <Modal
      :show="showOrderConfirmationModal"
      title="Bestellbestätigung bearbeiten"
      :show-primary-button="true"
      primary-button-text="Speichern"
      :primary-button-loading="isSaving"
      :primary-button-disabled="isSaving"
      :show-back-button="true"
      back-button-text="Abbrechen"
      @close="closeOrderConfirmationModal"
      @back="closeOrderConfirmationModal"
      @primary="saveOrderConfirmation"
    >
      <div class="space-y-4">
        <Text variant="body-default" color="content-secondary">
          Diese Nachricht wird dem Kunden nach dem Kauf in der Bestellbestätigung angezeigt.
        </Text>

        <RichTextEditor
          v-model="editingOrderConfirmation"
          placeholder="Schreibe deine Bestellbestätigungsnachricht hier..."
          min-height="300px"
          :max-length="5000"
          :show-char-count="true"
          :disabled="isSaving"
        />
      </div>
    </Modal>
  </div>
</template>
