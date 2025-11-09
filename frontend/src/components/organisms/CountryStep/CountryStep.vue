<!-- src/components/organisms/auth/CountryStep.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboardingStore'
import { useAuthStore } from '@/stores/authStore'
import { userProfileService } from '@/services/database/userProfileService'
import Text from '@/components/atoms/Text/Text.vue'
import Button from '@/components/atoms/Button/Button.vue'
import CountrySelector from '@/components/molecules/CountrySelector/CountrySelector.vue'

const router = useRouter()
const onboardingStore = useOnboardingStore()
const authStore = useAuthStore()

const selectedCountry = ref(onboardingStore.formData.country || '')
const error = ref('')
const loading = ref(false)

const handleContinue = async () => {
  if (!selectedCountry.value) {
    error.value = 'Bitte wähle dein Land aus'
    return
  }

  loading.value = true
  console.log('📝 Country selected:', selectedCountry.value)

  const countryCode = selectedCountry.value.code || selectedCountry.value
  const countryName = selectedCountry.value.name || selectedCountry.value

  // Save to Pinia store
  onboardingStore.formData.country = countryCode
  onboardingStore.formData.countryName = countryName

  // ✅ Save to database
  if (authStore.user) {
    const result = await userProfileService.updateUserProfile(authStore.user.$id, {
      country: countryCode,
      countryName: countryName,
    })

    if (!result.success) {
      error.value = 'Fehler beim Speichern'
      loading.value = false
      return
    }
  }

  // ✅ Mark step as complete
  onboardingStore.markStepComplete(2)

  loading.value = false
  error.value = ''
  onboardingStore.nextStep()
}

const handleCountryChange = (value) => {
  selectedCountry.value = value
  if (error.value) {
    error.value = ''
  }
}
</script>

<template>
  <div class="w-full max-w-lg mx-auto space-y-8">
    <div class="md:hidden text-center space-y-2">
      <Text as="h2" variant="title-section" color="content-primary">
        Was ist dein hauptsächliches Wohnsitzland?
      </Text>
      <Text variant="body-3" color="content-secondary">
        Aus rechtlichen Gründen benötigen wir möglicherweise einen Adressnachweis von dir.
      </Text>
    </div>

    <div class="hidden md:block text-center space-y-2">
      <Text as="h2" variant="title-section" color="content-primary">
        Was ist dein hauptsächliches Wohnsitzland?
      </Text>
      <Text variant="body-default" color="content-secondary">
        Aus rechtlichen Gründen benötigen wir möglicherweise einen Adressnachweis von dir.
      </Text>
    </div>

    <div class="space-y-6">
      <CountrySelector
        :model-value="selectedCountry"
        placeholder="Land oder Region"
        :error="error"
        @update:model-value="handleCountryChange"
      />
    </div>

    <div class="space-y-3">
      <Button
        variant="primary"
        size="large"
        class="w-full"
        :disabled="loading"
        @click="handleContinue"
      >
        {{ loading ? 'Wird gespeichert...' : 'Weiter' }}
      </Button>
    </div>
  </div>
</template>
