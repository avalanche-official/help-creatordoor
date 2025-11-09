<!-- src/components/organisms/auth/TwoFactorStep.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboardingStore'
import { useAuthStore } from '@/stores/authStore'
import { account } from '@/lib/appwrite'
import Text from '@/components/atoms/Text/Text.vue'
import Button from '@/components/atoms/Button/Button.vue'
import PhoneInput from '@/components/molecules/PhoneInput/PhoneInput.vue'
import CodeInput from '@/components/molecules/CodeInput/CodeInput.vue'
import Alert from '@/components/organisms/Alert/Alert.vue'
import CopyBlock from '@/components/molecules/CopyBlock/CopyBlock.vue'
import Image from '@/components/atoms/Image/Image.vue'
import phone from '@/assets/images/phone.png'

const router = useRouter()
const onboardingStore = useOnboardingStore()
const authStore = useAuthStore()

const phase = ref('phone')
const countryCode = ref(onboardingStore.formData.countryCode || '+41')
const phoneNumber = ref(onboardingStore.formData.phoneNumber || '')
const verificationCode = ref('')
const error = ref('')
const isLoading = ref(false)
const userId = ref('')
const showApiError = ref(false)
const apiError = ref('')
const apiErrorLinkText = ref('')
const apiErrorLinkHref = ref('')

// Mask phone number (show last 4 digits)
const maskedPhone = computed(() => {
  if (!phoneNumber.value) return ''
  const lastFour = phoneNumber.value.slice(-4)
  return `****${lastFour}`
})

const fullPhoneNumber = computed(() => `${countryCode.value}${phoneNumber.value}`)

const handleSendCode = async () => {
  if (!phoneNumber.value || phoneNumber.value.length < 9) {
    error.value = 'Bitte gib eine gültige Telefonnummer ein'
    return
  }

  error.value = ''
  showApiError.value = false
  isLoading.value = true

  const fullPhone = countryCode.value + phoneNumber.value

  console.log('📱 Sending SMS to:', fullPhone)

  try {
    // ✅ First, get current user to check phone status
    const currentUser = await account.get()
    console.log('👤 Current user:', currentUser)
    console.log('📞 Current phone:', currentUser.phone)
    console.log('✓ Phone verified?', currentUser.phoneVerification)

    // ✅ If phone is different or not set, update it
    if (currentUser.phone !== fullPhone) {
      console.log('📝 Updating phone number...')
      await account.updatePhone(fullPhone, 'TempPassword123!')
      console.log('✅ Phone number updated')

      // Wait a moment for Appwrite to process
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    // ✅ Now create verification
    console.log('📤 Creating phone verification...')
    const token = await account.createPhoneVerification()

    console.log('🔍 Verification token:', token)
    console.log('🔐 Secret (code):', token.secret)

    if (!token.secret) {
      console.error('⚠️ No secret in token - this is unusual!')
      console.log('📋 Full token object:', JSON.stringify(token, null, 2))
    }

    userId.value = token.userId
    console.log('✅ SMS process completed!')

    // Save to store
    onboardingStore.formData.countryCode = countryCode.value
    onboardingStore.formData.phoneNumber = phoneNumber.value

    phase.value = 'code'
  } catch (err) {
    console.error('❌ Error:', err)
    console.error('❌ Error code:', err.code)
    console.error('❌ Error type:', err.type)
    console.error('❌ Error message:', err.message)

    if (err.code === 409) {
      showApiError.value = true
      apiError.value = 'Diese Telefonnummer wird bereits verwendet'
      apiErrorLinkText.value = 'Stattdessen einloggen'
      apiErrorLinkHref.value = '/login'
    } else if (err.code === 401) {
      showApiError.value = true
      apiError.value = 'Authentifizierung fehlgeschlagen'
    } else {
      showApiError.value = true
      apiError.value = err.message || 'Ein Fehler ist aufgetreten'
    }
  } finally {
    isLoading.value = false
  }
}

const handleVerifyCode = async () => {
  if (verificationCode.value.length !== 6) {
    error.value = 'Bitte gib den vollständigen 6-stelligen Code ein'
    return
  }

  error.value = ''
  showApiError.value = false
  isLoading.value = true

  console.log('🔐 Verifying code:', verificationCode.value)

  try {
    // ✅ Step 1: Verify the SMS code with Appwrite
    await account.updatePhoneVerification(userId.value, verificationCode.value)
    console.log('✅ Phone verified!')

    // ✅ Step 2: Create SMS target for future MFA logins
    console.log('📱 Creating SMS target for MFA...')
    const { smsTargetService } = await import('@/services/smsTargetService')

    const targetResult = await smsTargetService.createSmsTarget(
      authStore.user.$id,
      fullPhoneNumber.value,
    )

    if (targetResult.success) {
      console.log('✅ SMS target created for MFA!')
    } else {
      console.error('⚠️ SMS target creation failed:', targetResult.error)
      // Don't block onboarding, but log it
    }

    // ✅ Step 3: Enable MFA for FUTURE logins
    try {
      await account.updateMFA(true)
      console.log('✅ MFA enabled for future logins!')
      authStore.mfaEnabled = true
    } catch (mfaError) {
      console.error('⚠️ MFA enable error:', mfaError)
    }

    // Save to store
    onboardingStore.formData.twoFactorVerified = true

    isLoading.value = false

    // ✅ Continue to next step - NO MFA challenge required for this session
    onboardingStore.nextStep()
  } catch (err) {
    console.error('❌ Verify code error:', err)
    showApiError.value = true
    apiError.value = err.message || 'Code ist ungültig'
    isLoading.value = false
  }
}

const handlePhoneChange = ({ countryCode: code, phoneNumber: number }) => {
  countryCode.value = code
  phoneNumber.value = number
  if (error.value) {
    error.value = ''
  }
  if (showApiError.value) {
    showApiError.value = false
  }
}

const handleCodeChange = (value) => {
  verificationCode.value = value
  if (error.value) {
    error.value = ''
  }
  if (showApiError.value) {
    showApiError.value = false
  }
}

const handleResendCode = async () => {
  error.value = ''
  showApiError.value = false
  isLoading.value = true

  console.log('🔄 Resending SMS code...')

  try {
    const token = await account.createPhoneVerification()
    userId.value = token.userId
    console.log('✅ SMS resent successfully!')
  } catch (err) {
    console.error('❌ Resend error:', err)
    showApiError.value = true
    apiError.value = err.message || 'Ein Fehler ist aufgetreten'
  } finally {
    isLoading.value = false
  }
}

const handleApiErrorClose = () => {
  showApiError.value = false
  apiErrorLinkText.value = ''
  apiErrorLinkHref.value = ''
}
</script>

<template>
  <div class="w-full max-w-lg mx-auto space-y-8">
    <!-- PHONE INPUT PHASE -->
    <div v-if="phase === 'phone'" class="space-y-8">
      <div class="md:hidden text-center space-y-2">
        <Text as="h2" variant="title-section" color="content-primary">
          Schütze dein Konto mit 2FA
        </Text>
        <Text variant="body-3" color="content-secondary">
          Wir senden dir einen Bestätigungscode per SMS
        </Text>
      </div>

      <div class="hidden md:block text-center space-y-2">
        <Text as="h2" variant="title-section" color="content-primary">
          Schütze dein Konto mit 2FA
        </Text>
        <Text variant="body-large" color="content-secondary">
          Wir senden dir einen Bestätigungscode per SMS
        </Text>
      </div>

      <Alert
        v-if="showApiError"
        variant="error"
        :message="apiError"
        :link-text="apiErrorLinkText"
        :link-href="apiErrorLinkHref"
        :show-close-button="true"
        @close="handleApiErrorClose"
      />

      <PhoneInput
        :country-code="countryCode"
        :phone-number="phoneNumber"
        label="Telefonnummer"
        :error="error"
        @update:phone="handlePhoneChange"
      />

      <div class="space-y-3">
        <Button
          variant="primary"
          size="large"
          class="w-full"
          :disabled="isLoading"
          @click="handleSendCode"
        >
          {{ isLoading ? 'Wird gesendet...' : 'Code senden' }}
        </Button>
      </div>
    </div>

    <!-- CODE VERIFICATION PHASE -->
    <div v-else-if="phase === 'code'" class="space-y-6">
      <!-- Image -->
      <div class="flex justify-center">
        <Image :src="phone" :width="120" :height="120" alt="Verification method" />
      </div>

      <!-- Title and Description -->
      <CopyBlock
        title="Wir haben dir soeben eine SMS geschickt"
        titleVariant="title-section"
        mobileTitleVariant="section-body"
        align="center"
      >
        <Text variant="body-default" color="content-secondary">
          Um dich einzuloggen, gib bitte den Sicherheitscode ein, den wir an {{ maskedPhone }}
          gesendet haben.
        </Text>
      </CopyBlock>

      <!-- Alert -->
      <Alert
        v-if="showApiError"
        variant="error"
        :message="apiError"
        :link-text="apiErrorLinkText"
        :link-href="apiErrorLinkHref"
        :show-close-button="true"
        @close="handleApiErrorClose"
      />

      <!-- Code Input -->
      <CodeInput
        :model-value="verificationCode"
        :length="6"
        :error="error"
        @update:model-value="handleCodeChange"
        @complete="handleVerifyCode"
      />

      <!-- Resend Code (Left aligned) -->
      <div class="text-left">
        <button
          type="button"
          class="cursor-pointer text-interactive-primary hover:text-interactive-primary-hover underline text-body-link"
          :disabled="isLoading"
          @click="handleResendCode"
        >
          Code erneut senden
        </button>
      </div>

      <!-- Primary Button -->
      <Button
        variant="primary"
        size="large"
        class="w-full"
        :disabled="isLoading || verificationCode.length !== 6"
        @click="handleVerifyCode"
      >
        {{ isLoading ? 'Wird überprüft...' : 'Bestätigen' }}
      </Button>
    </div>
  </div>
</template>
