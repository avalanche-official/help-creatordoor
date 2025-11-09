<!-- components/molecules/UserSettingsCard/UserSettingsCard.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useStripeStore } from '@/stores/stripeStore'
import { useAccountTypeStore } from '@/stores/accountTypeStore'
import { useOnboardingStore } from '@/stores/onboardingStore'
import { storage, account, CONFIG } from '@/lib/appwrite'
import { ID } from 'appwrite'
import Card from '@/components/atoms/Card/Card.vue'
import AvatarUpload from '@/components/molecules/AvatarUpload/AvatarUpload.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Chip from '../Chip/Chip.vue'

const emit = defineEmits(['complete-account', 'open-business', 'logout'])

const router = useRouter()
const authStore = useAuthStore()
const stripeStore = useStripeStore()
const accountTypeStore = useAccountTypeStore()
const onboardingStore = useOnboardingStore()
const uploading = ref(false)

// ✅ Real user data from auth store
const userName = computed(() => authStore.user?.name || 'User')
const userEmail = computed(() => authStore.user?.email || 'user@example.com')
const userId = computed(() => authStore.user?.$id || '')
const userAvatar = computed(() => authStore.user?.prefs?.avatarUrl || null)

// ✅ Generate initials from name
const userInitials = computed(() => {
  const name = userName.value
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

// ✅ Handle avatar upload
const handleAvatarUpload = async (file) => {
  if (!file || !userId.value) return

  uploading.value = true

  try {
    console.log('🚀 Uploading avatar for user:', userId.value)
    console.log('📁 File:', file.name, file.size, file.type)

    const response = await storage.createFile(CONFIG.storageBucketId, ID.unique(), file)

    console.log('✅ Avatar uploaded:', response.$id)

    const fileUrl = storage.getFileView(CONFIG.storageBucketId, response.$id)
    const avatarUrl = fileUrl?.href || fileUrl?.toString() || fileUrl

    console.log('🔗 Avatar URL:', avatarUrl)

    await account.updatePrefs({
      ...authStore.user.prefs,
      avatarUrl: avatarUrl,
    })

    console.log('✅ User preferences updated')
    await authStore.loadSession()
    console.log('✅ User data refreshed')
    alert('Profilbild erfolgreich hochgeladen! ✅')
  } catch (error) {
    console.error('❌ Error uploading avatar:', error)
    alert('Fehler beim Hochladen des Profilbilds')
  } finally {
    uploading.value = false
  }
}

const handleCompleteAccount = () => {
  emit('complete-account')
}

const handleOpenBusiness = () => {
  emit('open-business')
}

// ✅ FIXED: Proper logout with correct store method calls
const handleLogout = async () => {
  try {
    console.log('🚪 Starting logout process...')

    // 1. Clear localStorage FIRST
    console.log('🗑️ Clearing localStorage...')
    localStorage.clear()

    // 2. Reset all stores (with correct method names)
    console.log('🧹 Clearing all stores...')
    if (typeof stripeStore.reset === 'function') {
      stripeStore.reset()
    }
    if (typeof accountTypeStore.$reset === 'function') {
      accountTypeStore.$reset()
    }
    if (typeof onboardingStore.fullReset === 'function') {
      onboardingStore.fullReset()
    }

    // 3. Logout from Appwrite
    console.log('🔐 Logging out from Appwrite...')
    await authStore.logout()

    console.log('✅ Logout complete!')

    // 4. Hard redirect to homepage
    console.log('🏠 Redirecting to homepage...')
    window.location.href = '/'
  } catch (error) {
    console.error('❌ Logout error:', error)

    // Force cleanup on error
    console.log('⚠️ Error occurred, forcing cleanup...')
    localStorage.clear()

    if (typeof authStore.resetState === 'function') {
      authStore.resetState()
    }

    // Force redirect even on error
    console.log('🏠 Force redirecting to homepage...')
    window.location.href = '/'
  }
}
</script>

<template>
  <div class="space-y-3">
    <Card variant="ghost" bg="bg-stone-100" rounded="rounded-4xl">
      <div class="flex flex-col items-center text-center space-y-4 py-16">
        <AvatarUpload
          size="x-large"
          :icon-size="26"
          :initials="userInitials"
          :src="userAvatar"
          :loading="uploading"
          @upload="handleAvatarUpload"
        />

        <div>
          <Text variant="display-small" color="content-primary" class="block mb-1">
            {{ userName }}
          </Text>
          <Text variant="body-default-bold" color="content-secondary" class="block mb-2">
            Persönlicher Account
          </Text>
          <Chip :label="userEmail" icon="settings" variant="neutral" size="small" />
        </div>
      </div>
    </Card>

    <div class="px-2">
      <Button variant="secondary-neutral" size="small" class="w-fit" @click="handleLogout">
        Log out
      </Button>
    </div>
  </div>
</template>
