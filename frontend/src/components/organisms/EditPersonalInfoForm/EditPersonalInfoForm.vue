<!-- components/organisms/EditPersonalInfoForm/EditPersonalInfoForm.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import CopyBlock from '@/components/molecules/CopyBlock/CopyBlock.vue'
import TextInput from '@/components/molecules/TextInput/TextInput.vue'
import DateInput from '@/components/molecules/DateInput/DateInput.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Spinner from '@/components/atoms/Spinner/Spinner.vue'
import { authService } from '@/services/authService'
import { userProfileService } from '@/services/database/userProfileService'

const emit = defineEmits(['save', 'cancel'])

// State
const isLoading = ref(true)
const isSaving = ref(false)
const currentUser = ref(null)
const userProfile = ref(null)

// Form data
const formData = ref({
  fullName: '',
  dateOfBirth: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
  countryName: '',
})

// ✅ Load user data
const loadUserData = async () => {
  try {
    isLoading.value = true

    // Get current user
    const authResult = await authService.getCurrentUser()
    if (!authResult.success || !authResult.user) {
      console.error('❌ User not authenticated')
      return
    }

    currentUser.value = authResult.user

    // Get user profile
    userProfile.value = await userProfileService.getUserProfile(currentUser.value.$id)

    if (userProfile.value) {
      console.log('✅ User profile loaded:', userProfile.value)

      // Populate form with existing data
      formData.value = {
        fullName: userProfile.value.name || '',
        dateOfBirth: userProfile.value.dateOfBirth || '',
        address: userProfile.value.address || '',
        city: userProfile.value.city || '',
        postalCode: userProfile.value.postalCode || '',
        country: userProfile.value.country || '',
        countryName: userProfile.value.countryName || '',
      }
    }
  } catch (error) {
    console.error('❌ Error loading user data:', error)
  } finally {
    isLoading.value = false
  }
}

// ✅ Save changes
const handleSave = async () => {
  try {
    isSaving.value = true

    console.log('💾 Saving personal info:', formData.value)

    // Update user profile
    const result = await userProfileService.updateUserProfile(currentUser.value.$id, {
      name: formData.value.fullName,
      dateOfBirth: formData.value.dateOfBirth,
      address: formData.value.address,
      city: formData.value.city,
      postalCode: formData.value.postalCode,
      country: formData.value.country,
      countryName: formData.value.countryName,
    })

    if (result.success) {
      console.log('✅ Personal info updated successfully')
      emit('save', formData.value)
    } else {
      console.error('❌ Failed to update personal info:', result.error)
    }
  } catch (error) {
    console.error('❌ Error saving personal info:', error)
  } finally {
    isSaving.value = false
  }
}

const handleCancel = () => {
  emit('cancel')
}

// Load data on mount
onMounted(() => {
  loadUserData()
})
</script>

<template>
  <div class="flex flex-col h-full max-w-xl mx-auto">
    <!-- Header -->
    <div class="flex-shrink-0 mb-6">
      <CopyBlock title="Erzähl uns von dir" />
    </div>

    <!-- ✅ Loading State -->
    <div v-if="isLoading" class="flex-1 flex justify-center items-center py-12">
      <Spinner />
    </div>

    <!-- Form - Scrollable -->
    <div v-else class="flex-1 overflow-y-auto mb-6 space-y-4">
      <!-- ✅ Single Full Name Field -->
      <TextInput
        v-model="formData.fullName"
        label="Vollständiger Name"
        placeholder="Dein vollständiger Name"
        required
      />

      <DateInput
        v-model="formData.dateOfBirth"
        label="Geburtsdatum"
        placeholder="TT.MM.JJJJ"
        required
      />

      <TextInput
        v-model="formData.address"
        label="Adresse"
        placeholder="Straße und Hausnummer"
        required
      />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput v-model="formData.city" label="Stadt" placeholder="Deine Stadt" required />
        <TextInput v-model="formData.postalCode" label="Postleitzahl" placeholder="PLZ" required />
      </div>

      <TextInput
        v-model="formData.countryName"
        label="Land"
        placeholder="Dein Land"
        required
        disabled
      />
    </div>

    <!-- Actions - Fixed at Bottom -->
    <div class="flex flex-col gap-3">
      <Button variant="primary" :disabled="isSaving" :loading="isSaving" @click="handleSave">
        Änderungen speichern
      </Button>
      <Button variant="outline" :disabled="isSaving" @click="handleCancel"> Abbrechen </Button>
    </div>
  </div>
</template>
