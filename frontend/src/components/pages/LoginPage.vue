<script setup>
import { useRouter, RouterLink } from 'vue-router'
import { authService } from '@/lib/auth.js'
import { databaseService } from '@/lib/database.js'
import { useAuth } from '@/stores/auth.js'
import { useNotification } from '@/composables/useNotification.js'
import AuthLayout from '@/components/templates/AuthLayout.vue'
import LoginForm from '@/components/organisms/LoginForm.vue'

const router = useRouter()
const { updateUserProfile, initializeAuth, isAuthenticated, needsOnboarding } = useAuth()
const { showSuccess, showError } = useNotification()

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || 'YOUR_TURNSTILE_SITE_KEY'

const handleClose = () => {
  router.push('/')
}

const handleLoginSubmit = async ({ email, password, turnstileToken }) => {
  try {
    await authService.login(email, password)
    const currentUser = await authService.getCurrentUser()

    if (!currentUser) {
      throw new Error('No session found')
    }

    const userProfile = await databaseService.getUserProfile(currentUser.$id)
    updateUserProfile(userProfile)
    await initializeAuth()

    if (!isAuthenticated.value) {
      throw new Error('Authentication failed')
    }

    showSuccess('Welcome back!', 'Successfully signed in')

    if (needsOnboarding.value) {
      await router.push('/onboarding')
    } else {
      await router.push('/members')
    }
  } catch (error) {
    handleLoginError(error.message)
  }
}

const handleLoginError = (message) => {
  showError('Sign in failed', message)
}
</script>

<template>
  <AuthLayout @close="handleClose">
    <template #header>
      <h1 class="text-4xl sm:text-5xl font-bold" style="color: var(--color-content-primary)"></h1>
      <p class="text-lg" style="color: var(--color-content-secondary)">
        New at CreatorHub?
        <RouterLink
          to="/signup"
          class="font-semibold hover:underline ml-1 transition-colors"
          style="color: var(--color-interactive-primary)"
        >
          Sign Up
        </RouterLink>
      </p>
    </template>

    <LoginForm
      :turnstile-site-key="TURNSTILE_SITE_KEY"
      @submit="handleLoginSubmit"
      @error="handleLoginError"
    />
  </AuthLayout>
</template>
