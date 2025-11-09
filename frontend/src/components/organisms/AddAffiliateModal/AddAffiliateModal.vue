<!-- src/components/organisms/AddAffiliateModal/AddAffiliateModal.vue -->
<script setup>
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { affiliateService } from '@/services/database/affiliateService'
import { productService } from '@/services/database/productService'
import { userProfileService } from '@/services/database/userProfileService'
import { emailService } from '@/services/email/emailService'
import Modal from '@/components/molecules/Modal/Modal.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Dropdown from '@/components/molecules/Dropdown/Dropdown.vue'
import TextInput from '@/components/molecules/TextInput/TextInput.vue'
import Alert from '@/components/organisms/Alert/Alert.vue'
import Avatar from '@/components/atoms/Avatar/Avatar.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'success'])

const authStore = useAuthStore()

// State
const products = ref([])
const selectedProductId = ref('')
const affiliateIdInput = ref('')
const selectedUser = ref(null)
const commission = ref(20)
const isLoading = ref(false)
const isSearching = ref(false)
const isSaving = ref(false)
const showError = ref(false)
const errorMessage = ref('')

// Load user's products on mount
watch(
  () => props.show,
  async (isVisible) => {
    if (isVisible && authStore.user?.$id) {
      await loadProducts()
    }
  },
)

// Product options for dropdown
const productOptions = computed(() => {
  return products.value.map((product) => ({
    label: product.productName,
    value: product.$id,
  }))
})

// Check if form is valid
const isFormValid = computed(() => {
  return selectedProductId.value && selectedUser.value && commission.value >= 0
})

// Get initials from user
const getUserInitials = computed(() => {
  if (!selectedUser.value?.name) return 'UN'
  const parts = selectedUser.value.name.split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return selectedUser.value.name.substring(0, 2).toUpperCase()
})

// Load products owned by current user
const loadProducts = async () => {
  isLoading.value = true
  try {
    const userProducts = await productService.getUserProducts(authStore.user.$id)
    products.value = userProducts.filter((p) => p.status === 'active')
    console.log('✅ Loaded products:', products.value.length)
  } catch (error) {
    console.error('❌ Error loading products:', error)
  } finally {
    isLoading.value = false
  }
}

// Search for user by affiliateId
const searchUser = async () => {
  if (!affiliateIdInput.value.trim()) {
    selectedUser.value = null
    return
  }

  isSearching.value = true
  showError.value = false

  try {
    const affiliateId = affiliateIdInput.value.trim().toLowerCase()
    console.log('🔍 Searching for affiliateId:', affiliateId)

    // Check if user exists
    const userProfile = await userProfileService.getUserByAffiliateId(affiliateId)

    if (!userProfile) {
      showError.value = true
      errorMessage.value = 'Kein Benutzer mit dieser Affiliate-ID gefunden'
      selectedUser.value = null
      return
    }

    // Check if user is trying to add themselves
    if (userProfile.userId === authStore.user.$id) {
      showError.value = true
      errorMessage.value = 'Du kannst dich nicht selbst als Affiliate hinzufügen'
      selectedUser.value = null
      return
    }

    selectedUser.value = userProfile
    console.log('✅ Found user:', userProfile)
  } catch (error) {
    console.error('❌ Error searching user:', error)
    showError.value = true
    errorMessage.value = 'Fehler bei der Suche'
    selectedUser.value = null
  } finally {
    isSearching.value = false
  }
}

// Handle save
const handleSave = async () => {
  if (!isFormValid.value) return

  isSaving.value = true
  showError.value = false

  try {
    // Check if affiliate link already exists
    const existingLink = await affiliateService.getAffiliateProductLink(
      selectedUser.value.userId,
      selectedProductId.value,
    )

    if (existingLink) {
      showError.value = true
      errorMessage.value = 'Dieser Affiliate existiert bereits für dieses Produkt'
      isSaving.value = false
      return
    }

    // Get product to check affiliate settings
    const product = await productService.getProduct(selectedProductId.value)

    if (!product) {
      showError.value = true
      errorMessage.value = 'Produkt nicht gefunden'
      isSaving.value = false
      return
    }

    // Parse affiliate settings
    let affiliateSettings = {}
    try {
      affiliateSettings =
        typeof product.affiliateSettings === 'string'
          ? JSON.parse(product.affiliateSettings)
          : product.affiliateSettings || {}
    } catch (e) {
      affiliateSettings = {}
    }

    // Check if affiliate program is enabled
    if (!affiliateSettings.enabled) {
      showError.value = true
      errorMessage.value = 'Das Partnerprogramm ist für dieses Produkt nicht aktiviert'
      isSaving.value = false
      return
    }

    // Create affiliate link
    const result = await affiliateService.createAffiliateLink(
      selectedUser.value.userId,
      selectedProductId.value,
      {
        commission: commission.value,
      },
    )

    if (result.success) {
      console.log('✅ Affiliate link created:', result.affiliateLink.$id)

      // ✅ Send email notification if auto-approved
      const isAutoApproved = affiliateSettings.autoApprove === true
      if (isAutoApproved) {
        console.log('📧 Sending approval email to:', selectedUser.value.email)

        await emailService.sendAffiliateApprovalEmail({
          productId: selectedProductId.value,
          affiliateEmail: selectedUser.value.email,
          affiliateName: selectedUser.value.name,
        })
      }

      emit('success', result.affiliateLink)
      handleClose()
    } else {
      showError.value = true
      errorMessage.value = result.error || 'Fehler beim Erstellen des Affiliate-Links'
    }
  } catch (error) {
    console.error('❌ Error creating affiliate link:', error)
    showError.value = true
    errorMessage.value = 'Ein unerwarteter Fehler ist aufgetreten'
  } finally {
    isSaving.value = false
  }
}

// Handle close
const handleClose = () => {
  // Reset form
  selectedProductId.value = ''
  affiliateIdInput.value = ''
  selectedUser.value = null
  commission.value = 20
  showError.value = false
  errorMessage.value = ''

  emit('close')
}

// Watch affiliateId input for changes
watch(affiliateIdInput, (newValue) => {
  if (!newValue.trim()) {
    selectedUser.value = null
    showError.value = false
  }
})
</script>

<template>
  <Modal
    :show="show"
    title="Affiliate hinzufügen"
    :show-primary-button="true"
    primary-button-text="Affiliate hinzufügen"
    :primary-button-disabled="!isFormValid"
    :primary-button-loading="isSaving"
    :show-back-button="true"
    back-button-text="Abbrechen"
    max-width="lg"
    @close="handleClose"
    @back="handleClose"
    @primary="handleSave"
  >
    <div class="space-y-6">
      <!-- Error Alert -->
      <Alert
        v-if="showError"
        variant="error"
        :message="errorMessage"
        :show-close-button="true"
        @close="showError = false"
      />

      <!-- Product Selection -->
      <div>
        <label class="block mb-2">
          <Text variant="body-default-bold" color="content-primary">Produkt auswählen *</Text>
        </label>
        <Dropdown
          v-model="selectedProductId"
          :options="productOptions"
          placeholder="Wähle ein Produkt"
          :disabled="isLoading"
        />
        <Text v-if="isLoading" variant="body-small" color="content-tertiary" class="mt-1">
          Lade Produkte...
        </Text>
      </div>

      <!-- Affiliate ID Search -->
      <div>
        <TextInput
          v-model="affiliateIdInput"
          label="Affiliate-ID des Benutzers *"
          placeholder="z.B. creatordoor"
          :disabled="isSearching"
        />
        <div class="mt-2">
          <button
            type="button"
            class="text-sm text-primary-purple hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!affiliateIdInput.trim() || isSearching"
            @click="searchUser"
          >
            {{ isSearching ? 'Suche...' : 'Benutzer suchen' }}
          </button>
        </div>
      </div>

      <!-- User Preview (if found) -->
      <div
        v-if="selectedUser"
        class="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3"
      >
        <Avatar
          :initials="getUserInitials"
          size="medium"
          background-color="bg-stone-100"
          text-color="text-stone-800"
        />
        <div>
          <Text variant="body-default-bold" color="content-primary">
            {{ selectedUser.name || 'Unknown User' }}
          </Text>
          <Text variant="body-small" color="content-secondary">
            @{{ selectedUser.affiliateId }}
          </Text>
          <Text variant="body-small" color="content-tertiary">
            {{ selectedUser.email }}
          </Text>
        </div>
      </div>

      <!-- Commission Input -->
      <div>
        <TextInput
          v-model="commission"
          label="Provision (%) *"
          type="number"
          placeholder="z.B. 20"
          :required="true"
        />
      </div>

      <!-- Info Box -->
      <div class="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <div class="flex items-start gap-2">
          <Text variant="body-small" color="content-secondary">
            💡 Der Affiliate wird automatisch genehmigt, wenn in den Produkteinstellungen
            "Auto-Approve" aktiviert ist. Ansonsten wird der Status auf "Ausstehend" gesetzt.
          </Text>
        </div>
      </div>
    </div>
  </Modal>
</template>
