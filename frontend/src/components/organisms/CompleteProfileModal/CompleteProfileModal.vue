<!-- src/components/organisms/CompleteProfileModal/CompleteProfileModal.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { account } from '@/lib/appwrite'
import { userProfileService } from '@/services/database/userProfileService'
import { transactionService } from '@/services/database/transactionService'
import { affiliateService } from '@/services/database/affiliateService'
import { productService } from '@/services/database/productService'
import Modal from '@/components/molecules/Modal/Modal.vue'
import Text from '@/components/atoms/Text/Text.vue'
import TextInput from '@/components/organisms/TextInput/TextInput.vue'
import Alert from '@/components/organisms/Alert/Alert.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'complete'])

const authStore = useAuthStore()

const fullName = ref('')
const affiliateId = ref('')
const nameError = ref('')
const affiliateIdError = ref('')
const isLoading = ref(false)
const showApiError = ref(false)
const apiError = ref('')

// ✅ FIXED: Check if form is valid (allow - and _)
const isFormValid = computed(() => {
  const trimmedName = fullName.value.trim()
  const trimmedAffiliateId = affiliateId.value.trim()
  return (
    trimmedName.length >= 3 &&
    trimmedAffiliateId.length >= 3 &&
    /^[a-zA-Z0-9_-]+$/.test(trimmedAffiliateId) // ✅ Allow letters, numbers, underscore, hyphen
  )
})

const validateForm = () => {
  nameError.value = ''
  affiliateIdError.value = ''

  let isValid = true

  // Validate name
  if (!fullName.value || fullName.value.trim().length < 3) {
    nameError.value = 'Name muss mindestens 3 Zeichen lang sein'
    isValid = false
  }

  // ✅ FIXED: Validate affiliate ID (allow - and _)
  if (!affiliateId.value || affiliateId.value.trim().length < 3) {
    affiliateIdError.value = 'Affiliate-ID muss mindestens 3 Zeichen lang sein'
    isValid = false
  } else if (!/^[a-zA-Z0-9_-]+$/.test(affiliateId.value.trim())) {
    affiliateIdError.value = 'Nur Buchstaben, Zahlen, Unterstrich (_) und Bindestrich (-) erlaubt'
    isValid = false
  }

  return isValid
}

/**
 * ✅ Auto-create affiliate links for purchased products
 */
const autoCreateAffiliateLinks = async (userId, userEmail) => {
  try {
    console.log('🔗 Auto-creating affiliate links for purchased products...')

    // Get all products user has purchased
    const purchases = await transactionService.getPurchasedProducts(userId, userEmail)

    if (purchases.length === 0) {
      console.log('ℹ️ No purchases found')
      return
    }

    console.log(`📦 Found ${purchases.length} purchased products`)

    // For each purchased product, create affiliate link
    let createdCount = 0
    let skippedCount = 0

    for (const purchase of purchases) {
      try {
        // Check if already affiliate
        const isAlreadyAffiliate = await affiliateService.isAffiliate(userId, purchase.productId)

        if (isAlreadyAffiliate) {
          console.log(`⏭️ Already affiliate for: ${purchase.productName}`)
          skippedCount++
          continue
        }

        // Get product to check affiliate settings
        const product = await productService.getProduct(purchase.productId)

        if (!product) {
          console.warn(`⚠️ Product not found: ${purchase.productId}`)
          continue
        }

        // Parse affiliate settings
        let affiliateSettings = {}
        try {
          affiliateSettings =
            typeof product.affiliateSettings === 'string'
              ? JSON.parse(product.affiliateSettings)
              : product.affiliateSettings || {}
        } catch (e) {
          console.warn('Could not parse affiliate settings:', e)
          affiliateSettings = {}
        }

        // Check if affiliate program is enabled
        if (!affiliateSettings.enabled) {
          console.log(`❌ Affiliate program disabled for: ${purchase.productName}`)
          skippedCount++
          continue
        }

        // ✅ Create affiliate link with correct status based on autoApprove
        const result = await affiliateService.createAffiliateLink(userId, purchase.productId, {
          commission: affiliateSettings.defaultCommission || 20,
        })

        if (result.success) {
          const status = affiliateSettings.autoApprove ? 'active' : 'pending'
          console.log(`✅ Created affiliate link for: ${purchase.productName} (${status})`)
          createdCount++
        } else {
          console.error(`❌ Failed to create affiliate link for: ${purchase.productName}`)
        }
      } catch (error) {
        console.error(`❌ Error processing product ${purchase.productId}:`, error)
      }
    }

    console.log(`🎉 Auto-created ${createdCount} affiliate links (${skippedCount} skipped)`)
  } catch (error) {
    console.error('❌ Error auto-creating affiliate links:', error)
  }
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isLoading.value = true
  showApiError.value = false

  try {
    const trimmedName = fullName.value.trim()
    const trimmedAffiliateId = affiliateId.value.trim().toLowerCase()

    // Check if affiliate ID is unique
    const isUnique = await userProfileService.isAffiliateIdUnique(trimmedAffiliateId)
    if (!isUnique) {
      affiliateIdError.value = 'Diese Affiliate-ID ist bereits vergeben'
      isLoading.value = false
      return
    }

    // 1️⃣ Update name in Appwrite Auth (built-in name field)
    await account.updateName(trimmedName)
    console.log('✅ Name updated in Auth.name:', trimmedName)

    // 2️⃣ Save profileCompleted to Auth preferences
    const currentPrefs = authStore.user?.prefs || {}
    await account.updatePrefs({
      ...currentPrefs,
      profileCompleted: true,
    })
    console.log('✅ profileCompleted saved to Auth.prefs')

    // 3️⃣ Update affiliateId AND name in database
    const result = await userProfileService.updateUserProfile(authStore.user.$id, {
      affiliateId: trimmedAffiliateId,
      name: trimmedName,
    })

    if (!result.success) {
      throw new Error(result.error || 'Profil konnte nicht aktualisiert werden')
    }

    console.log('✅ Name and affiliateId saved to user_profiles')

    // 4️⃣ ✅ Auto-create affiliate links for purchased products
    await autoCreateAffiliateLinks(authStore.user.$id, authStore.user.email)

    // 5️⃣ Reload auth store to get updated user data
    await authStore.loadSession()
    console.log('✅ Auth store reloaded with updated data')

    // 6️⃣ Emit success
    emit('complete', {
      fullName: trimmedName,
      affiliateId: trimmedAffiliateId,
    })

    emit('close')
  } catch (error) {
    console.error('❌ Profile update error:', error)
    showApiError.value = true
    apiError.value = error.message || 'Ein Fehler ist aufgetreten'
  } finally {
    isLoading.value = false
  }
}

const handleNameInput = () => {
  if (nameError.value) nameError.value = ''
  if (showApiError.value) showApiError.value = false
}

const handleAffiliateIdInput = () => {
  if (affiliateIdError.value) affiliateIdError.value = ''
  if (showApiError.value) showApiError.value = false
}
</script>

<template>
  <Modal
    :show="show"
    title="Account Einstellungen"
    :show-close-button="false"
    :show-back-button="false"
    :show-primary-button="true"
    primary-button-text="Profil vervollständigen"
    :primary-button-disabled="!isFormValid"
    :primary-button-loading="isLoading"
    max-width="md"
    @primary="handleSubmit"
  >
    <div class="space-y-6">
      <!-- Description -->
      <Text variant="title-subsection" color="content-primary" class="text-center">
        Vervollständige dein Profil
      </Text>

      <!-- Alert -->
      <Alert
        v-if="showApiError"
        variant="error"
        :message="apiError"
        :show-close-button="true"
        @close="showApiError = false"
      />

      <!-- Form -->
      <div class="space-y-4 mt-4">
        <TextInput
          v-model="fullName"
          label="Vollständiger Name"
          placeholder="Max Mustermann"
          :error="nameError"
          :disabled="isLoading"
          @input="handleNameInput"
        />
        <TextInput
          v-model="affiliateId"
          label="Affiliate-ID"
          placeholder="max_mustermann oder max-mustermann"
          :error="affiliateIdError"
          :disabled="isLoading"
          @input="handleAffiliateIdInput"
        />
      </div>
    </div>
  </Modal>
</template>
