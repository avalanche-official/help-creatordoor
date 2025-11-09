<!-- components/organisms/CloseAccountSummaryStep/CloseAccountSummaryStep.vue -->
<!-- ✅ GERMAN VERSION -->
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useCloseAccountStore } from '@/stores/closeAccountStore'
import CopyBlock from '@/components/molecules/CopyBlock/CopyBlock.vue'
import Avatar from '@/components/atoms/Avatar/Avatar.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Text from '@/components/atoms/Text/Text.vue'

const router = useRouter()
const authStore = useAuthStore()
const closeAccountStore = useCloseAccountStore()
const isLoading = ref(false)

// ✅ Get real user info from auth store
const userName = computed(() => authStore.user?.name || 'Benutzer')
const userEmail = computed(() => authStore.user?.email || 'benutzer@example.com')
const userInitials = computed(() => {
  const name = userName.value
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const consequenceItems = [
  'Deine Karten werden dauerhaft gelöscht',
  'Die Kontodaten zum Empfangen von Geld werden dauerhaft deaktiviert',
  'Alle Zahlungsanfrage-Links funktionieren nicht mehr',
  'Alle geplanten Überweisungen und Lastschriften werden storniert',
]

const handleBack = () => {
  closeAccountStore.previousStep()
}

const handleCloseAccount = async () => {
  if (
    confirm(
      'Bist du dir absolut sicher, dass du dein Konto schließen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.',
    )
  ) {
    isLoading.value = true

    try {
      console.log('🔴 Schließe Konto mit Grund:', closeAccountStore.reason)

      // TODO: Call API to close account
      // await accountService.closeAccount({ reason: closeAccountStore.reason })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log('✅ Konto erfolgreich geschlossen')

      // Clear store and logout
      closeAccountStore.reset()
      await authStore.logout()

      // Redirect to homepage
      router.push('/')
    } catch (error) {
      console.error('❌ Fehler beim Schließen des Kontos:', error)
      alert('Konto konnte nicht geschlossen werden. Bitte versuche es erneut.')
    } finally {
      isLoading.value = false
    }
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="flex-shrink-0 mb-6">
      <CopyBlock title="Was passiert, wenn du dein Konto schließt" />
    </div>

    <!-- Content - Scrollable -->
    <div class="flex-1 space-y-6 mb-6">
      <!-- User Card -->
      <div class="bg-white border border-stone-300 rounded-xl p-8">
        <!-- User Info Section -->
        <div class="flex items-center gap-3">
          <!-- Avatar (Left) -->
          <Avatar :initials="userInitials" size="medium" backgroundColor="bg-stone-100" />

          <!-- Name and Account Type (Right) -->
          <div class="flex-col">
            <div>
              <Text variant="body-default" color="content-secondary">
                {{ userName }}
              </Text>
            </div>

            <Text variant="body-default" color="content-primary"> Persönliches Konto </Text>
          </div>
        </div>

        <!-- Divider (inside padding) -->
        <div class="border-t border-stone-300 my-6"></div>

        <!-- Consequences List (inside padding) -->
        <ul class="space-y-4">
          <li v-for="(item, index) in consequenceItems" :key="index" class="flex items-start gap-2">
            <span class="text-content-secondary">•</span>
            <Text variant="body-large" color="content-secondary">
              {{ item }}
            </Text>
          </li>
        </ul>
      </div>
    </div>

    <!-- Actions - Fixed at Bottom -->
    <div class="flex-col flex gap-3">
      <Button
        variant="primary-negative"
        :loading="isLoading"
        :disabled="isLoading"
        @click="handleCloseAccount"
      >
        Konto schließen
      </Button>
      <Button variant="outline" @click="handleBack"> Zurück </Button>
    </div>
  </div>
</template>
