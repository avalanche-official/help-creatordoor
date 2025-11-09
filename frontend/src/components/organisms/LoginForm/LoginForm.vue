<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import TextInput from '@/components/molecules/TextInput/TextInput.vue'
import Button from '@/components/atoms/Button/Button.vue'
import TurnstileWidget from '@/components/molecules/TurnstileWidget/TurnstileWidget.vue'

const props = defineProps({
  turnstileSiteKey: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['submit', 'success', 'error'])

const router = useRouter()
const loading = ref(false)
const turnstileToken = ref(null)

const formData = reactive({
  email: '',
  password: '',
})

const formErrors = reactive({
  email: '',
  password: '',
})

const isFormValid = computed(() => {
  return formData.email && formData.password && turnstileToken.value && !loading.value
})

const handleTurnstileVerified = (token) => {
  turnstileToken.value = token
}

const handleTurnstileError = () => {
  turnstileToken.value = null
}

const handleTurnstileExpired = () => {
  turnstileToken.value = null
}

const validateEmail = () => {
  if (!formData.email) {
    formErrors.email = 'Email is required'
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    formErrors.email = 'Please enter a valid email'
    return false
  }
  formErrors.email = ''
  return true
}

const validatePassword = () => {
  if (!formData.password) {
    formErrors.password = 'Password is required'
    return false
  }
  if (formData.password.length < 8) {
    formErrors.password = 'Password must be at least 8 characters'
    return false
  }
  formErrors.password = ''
  return true
}

const handleSubmit = async () => {
  // Validate form
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()

  if (!isEmailValid || !isPasswordValid) {
    return
  }

  if (!turnstileToken.value) {
    emit('error', 'Please complete the verification')
    return
  }

  loading.value = true

  try {
    // Emit the form data for parent to handle
    emit('submit', {
      email: formData.email,
      password: formData.password,
      turnstileToken: turnstileToken.value,
    })
  } catch (error) {
    emit('error', error.message)
  } finally {
    loading.value = false
  }
}

const handleForgotPassword = () => {
  router.push('/forgot-password')
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6 max-w-4xl mx-auto">
    <!-- Email Input -->
    <TextInput
      v-model="formData.email"
      label="Email"
      type="email"
      placeholder="info@royalcandles.ch"
      required
      :disabled="loading"
      :state="formErrors.email ? 'error' : 'default'"
      :error-message="formErrors.email"
      @blur="validateEmail"
    />

    <!-- Password Input -->
    <TextInput
      v-model="formData.password"
      label="Password"
      type="password"
      placeholder="Enter your password"
      toggleable
      required
      :disabled="loading"
      :state="formErrors.password ? 'error' : 'default'"
      :error-message="formErrors.password"
      @blur="validatePassword"
    />

    <!-- Forgot Password -->
    <div class="text-right">
      <button
        type="button"
        @click="handleForgotPassword"
        class="text-sm font-medium transition-colors"
        style="color: var(--color-content-secondary)"
        @mouseenter="$event.target.style.color = 'var(--color-interactive-primary)'"
        @mouseleave="$event.target.style.color = 'var(--color-content-secondary)'"
        :disabled="loading"
      >
        Forgot password?
      </button>
    </div>

    <!-- Cloudflare Turnstile -->
    <TurnstileWidget
      :site-key="turnstileSiteKey"
      @verified="handleTurnstileVerified"
      @error="handleTurnstileError"
      @expired="handleTurnstileExpired"
    />

    <!-- Submit Button -->
    <div class="pt-2">
      <Button variant="primary" size="large" type="submit" full-width :disabled="!isFormValid">
        {{ loading ? 'Signing in...' : 'Login' }}
      </Button>
    </div>
  </form>
</template>
