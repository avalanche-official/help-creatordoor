<!-- components/templates/PanelLayout/PanelLayout.vue -->
<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useAccountTypeStore } from '@/stores/accountTypeStore'
import PanelHeader from '@/components/organisms/PanelHeader/PanelHeader.vue'
import SettingsHeader from '@/components/organisms/SettingsHeader/SettingsHeader.vue'

const props = defineProps({
  headerVariant: {
    type: String,
    default: 'panel',
    validator: (value) => ['panel', 'settings'].includes(value),
  },
  showBack: {
    type: Boolean,
    default: false,
  },
  backRoute: {
    type: String,
    default: '/dashboard',
  },
  showChip: {
    type: Boolean,
    default: true,
  },
})

const authStore = useAuthStore()
const accountTypeStore = useAccountTypeStore()

// Get user name from Auth
const userName = computed(() => {
  if (!authStore.user) return 'User'

  if (authStore.user.name && authStore.user.name.trim() !== '') {
    return authStore.user.name
  }

  return authStore.user.email?.split('@')[0] || 'User'
})

// Get initials from name
const avatar = computed(() => {
  if (!userName.value) return 'U'

  const nameParts = userName.value.trim().split(' ')
  if (nameParts.length >= 2) {
    return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
  }

  return userName.value.substring(0, 2).toUpperCase()
})

// Chip options
const chipOptions = [
  { value: 'vendor', label: 'Vendor', icon: 'shield-user' },
  { value: 'affiliate', label: 'Affiliate', icon: 'user' },
]

// Handle account type change
const handleAccountTypeChange = async (option) => {
  if (authStore.user) {
    await accountTypeStore.setAccountType(authStore.user.$id, option.value)
  }
}

onMounted(async () => {
  // Load account type from database on mount
  if (authStore.user) {
    await accountTypeStore.loadAccountType(authStore.user.$id)
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto py-4 sm:py-10">
    <!-- Dynamic Header based on variant -->
    <PanelHeader
      v-if="headerVariant === 'panel' && !accountTypeStore.isLoading"
      :chip-label="accountTypeStore.accountTypeLabel"
      :chip-options="chipOptions"
      :selected-account-type="accountTypeStore.selectedAccountType"
      :avatar="avatar"
      :user-name="userName"
      :show-back="showBack"
      :back-route="backRoute"
      @account-type-change="handleAccountTypeChange"
    />

    <SettingsHeader
      v-else-if="headerVariant === 'settings' && !accountTypeStore.isLoading"
      :chip-label="accountTypeStore.accountTypeLabel"
      :show-back="showBack"
      :show-chip="showChip"
      :back-route="backRoute"
    />

    <!-- Content slot -->
    <slot />
  </div>
</template>
