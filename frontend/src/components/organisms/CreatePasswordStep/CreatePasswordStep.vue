<!-- src/components/organisms/auth/CreatePasswordStep.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboardingStore'
import { useAuthStore } from '@/stores/authStore'
import { account } from '@/lib/appwrite'
import Text from '@/components/atoms/Text/Text.vue'
import Button from '@/components/atoms/Button/Button.vue'
import TextInput from '@/components/organisms/TextInput/TextInput.vue'
import CopyBlock from '@/components/molecules/CopyBlock/CopyBlock.vue'

const router = useRouter()
const onboardingStore = useOnboardingStore()
const authStore = useAuthStore()

const password = ref('')
const passwordError = ref('')
const isLoading = ref(false)

// Password strength validation
const passwordStrength = computed(() => {
  if (!password.value) return null

  let strength = 0
  if (password.value.length >= 8) strength++
  if (password.value.length >= 12) strength++
  if (/[a-z]/.test(password.value)) strength++
  if (/[A-Z]/.test(password.value)) strength++
  if (/[0-9]/.test(password.value)) strength++
  if (/[^a-zA-Z0-9]/.test(password.value)) strength++

  if (strength <= 2) return { level: 'weak', label: 'Schwach', color: 'sentiment-negative' }
  if (strength <= 4) return { level: 'medium', label: 'Mittel', color: 'sentiment-warning' }
  return { level: 'strong', label: 'Stark', color: 'sentiment-positive' }
})

const passwordRequirements = computed(() => [
  {
    text: 'Mindestens 8 Zeichen',
    met: password.value.length >= 8,
  },
  {
    text: 'Enthält Großbuchstaben',
    met: /[A-Z]/.test(password.value),
  },
  {
    text: 'Enthält Kleinbuchstaben',
    met: /[a-z]/.test(password.value),
  },
  {
    text: 'Enthält eine Zahl',
    met: /[0-9]/.test(password.value),
  },
])

const validatePassword = () => {
  passwordError.value = ''

  if (!password.value) {
    passwordError.value = 'Bitte gib ein Passwort ein'
    return false
  }

  if (password.value.length < 8) {
    passwordError.value = 'Passwort muss mindestens 8 Zeichen lang sein'
    return false
  }

  return true
}

const handleContinue = async () => {
  if (!validatePassword()) return

  isLoading.value = true
  console.log('🔐 Creating final password...')

  try {
    // 1️⃣ Update password in Appwrite Auth (replace temp password)
    await account.updatePassword(password.value, 'TempPassword123!')
    console.log('✅ Password updated in Appwrite Auth')

    // 2️⃣ Mark onboarding as complete in Auth Preferences
    await account.updatePrefs({ onboardingCompleted: true })
    console.log('✅ Onboarding marked as complete in preferences')

    // 3️⃣ Reload the session to get updated preferences
    await authStore.loadSession()
    console.log('✅ Session reloaded with updated preferences')

    // 4️⃣ Mark onboarding as complete in store
    onboardingStore.complete()
    console.log('✅ Onboarding marked as complete in store')

    // 5️⃣ Navigate to success
    router.push('/onboarding/success')
  } catch (error) {
    console.error('❌ Password update error:', error)
    passwordError.value = 'Fehler beim Erstellen des Passworts'
  } finally {
    isLoading.value = false
  }
}

const handlePasswordInput = () => {
  if (passwordError.value) {
    passwordError.value = ''
  }
}
</script>

<template>
  <div class="w-full max-w-lg mx-auto space-y-8">
    <div class="text-center space-y-2">
      <CopyBlock
        title="Erstelle ein sicheres Passwort"
        description="Dein Passwort sollte mindestens 8 Zeichen lang sein"
      />
    </div>

    <div class="space-y-3">
      <TextInput
        v-model="password"
        label="Passwort"
        type="password"
        placeholder="Gib dein Passwort ein"
        prefixIcon="lock"
        showPasswordToggle
        :error="passwordError"
        @input="handlePasswordInput"
      />

      <div v-if="password && passwordStrength" class="space-y-2">
        <div class="flex items-center gap-2">
          <div class="flex-1 h-1 bg-[var(--color-background-neutral)] rounded-full overflow-hidden">
            <div
              :class="[
                'h-full transition-all duration-300',
                passwordStrength.level === 'weak'
                  ? 'w-1/3 bg-[var(--color-sentiment-negative)]'
                  : '',
                passwordStrength.level === 'medium'
                  ? 'w-2/3 bg-[var(--color-sentiment-warning)]'
                  : '',
                passwordStrength.level === 'strong'
                  ? 'w-full bg-[var(--color-sentiment-positive)]'
                  : '',
              ]"
            />
          </div>
          <Text variant="body-3" :color="passwordStrength.color" class="font-medium">
            {{ passwordStrength.label }}
          </Text>
        </div>

        <div class="space-y-1">
          <div
            v-for="(req, index) in passwordRequirements"
            :key="index"
            class="flex items-center gap-2"
          >
            <div
              :class="[
                'w-4 h-4 rounded-full flex items-center justify-center text-xs',
                req.met
                  ? 'bg-[var(--color-sentiment-positive)] text-white'
                  : 'bg-[var(--color-background-neutral)] text-[var(--color-content-tertiary)]',
              ]"
            >
              ✓
            </div>
            <Text variant="body-3" :color="req.met ? 'content-primary' : 'content-tertiary'">
              {{ req.text }}
            </Text>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-3">
      <Button
        variant="primary"
        size="large"
        class="w-full"
        :disabled="isLoading"
        @click="handleContinue"
      >
        {{ isLoading ? 'Wird erstellt...' : 'Konto erstellen' }}
      </Button>
    </div>
  </div>
</template>
