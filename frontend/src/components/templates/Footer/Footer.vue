<!-- src/components/Footer.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import newsletterService from '../../../services/newsletterService'
import Text from '../../atoms/Text/Text.vue'
import Button from '../../atoms/Button/Button.vue'
import Icon from '../../atoms/Icon/Icon.vue'
import Logo from '../../atoms/Logo/Logo.vue'
const router = useRouter()

// Newsletter state
const email = ref('')
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Newsletter subscription handler
const handleSubscribe = async () => {
  // Clear previous messages
  errorMessage.value = ''
  successMessage.value = ''

  // Validate email
  if (!email.value || !email.value.trim()) {
    errorMessage.value = 'Bitte gib eine E-Mail-Adresse ein'
    return
  }

  if (!email.value.includes('@')) {
    errorMessage.value = 'Bitte gib eine gültige E-Mail-Adresse ein'
    return
  }

  isLoading.value = true

  try {
    console.log('📧 Subscribing to newsletter:', email.value)

    const result = await newsletterService.subscribe({
      email: email.value.trim(),
      source: 'footer_newsletter',
    })

    if (result.success) {
      successMessage.value = '🎉 Erfolgreich angemeldet!'
      email.value = '' // Clear input

      // Clear success message after 5 seconds
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    } else {
      errorMessage.value = result.message || 'Anmeldung fehlgeschlagen. Bitte versuche es erneut.'
    }
  } catch (error) {
    console.error('❌ Newsletter subscription error:', error)
    errorMessage.value = 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.'
  } finally {
    isLoading.value = false
  }
}

// Navigation handlers
const navigateTo = (path) => {
  router.push(path)
}

const openExternal = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-stone-900 text-stone-100 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- Column 1: About -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <Logo variant="white" />
          </div>
          <Text variant="body-default" color="content-inverse" class="opacity-80">
            Create. Connect. Earn
          </Text>
          <!-- Social Media Links -->
          <div class="flex space-x-4 pt-2">
            <button
              @click="openExternal('https://twitter.com/creatordoor_de')"
              class="text-stone-400 hover:text-primary-purple transition-colors cursor-pointer"
              aria-label="Twitter"
            >
              <Icon name="twitter" :size="20" />
            </button>
            <button
              @click="openExternal('https://instagram.com/creatordoor_de')"
              class="text-stone-400 hover:text-primary-purple transition-colors cursor-pointer"
              aria-label="Instagram"
            >
              <Icon name="instagram" :size="20" />
            </button>
            <button
              @click="openExternal('https://tiktok.com/creatordoor_de')"
              class="text-stone-400 hover:text-primary-purple transition-colors cursor-pointer"
              aria-label="phone"
            >
              <Icon name="smartphone" :size="20" />
            </button>
          </div>
        </div>

        <!-- Column 2: Product -->
        <div class="space-y-4">
          <Text variant="body-default-bold" color="content-inverse">Schnellzugriff</Text>
          <nav class="space-y-1 mt-2">
            <button
              @click="openExternal('https://creatordoor.com')"
              class="cursor-pointer block text-stone-400 hover:text-primary-purple transition-colors text-left"
            >
              <Text variant="body-default">Startseite</Text>
            </button>
            <button
              @click="openExternal('https://creatordoor.com/dashboard')"
              class="cursor-pointer block text-stone-400 hover:text-primary-purple transition-colors text-left"
            >
              <Text variant="body-default">Dashboard</Text>
            </button>
            <button
              @click="openExternal('https://creatordoor.com/register')"
              class="cursor-pointer block text-stone-400 hover:text-primary-purple transition-colors text-left"
            >
              <Text variant="body-default">Registrieren</Text>
            </button>
            <button
              @click="openExternal('https://creatordoor.com/login')"
              class="cursor-pointer block text-stone-400 hover:text-primary-purple transition-colors text-left"
            >
              <Text variant="body-default">Login</Text>
            </button>
          </nav>
        </div>
        <!-- Column 3: Support -->
        <div class="space-y-4">
          <Text variant="body-default-bold" color="content-inverse">Support</Text>
          <nav class="space-y-1 mt-2">
            <button
              @click="navigateTo('/')"
              class="cursor-pointer block text-stone-400 hover:text-primary-purple transition-colors text-left"
            >
              <Text variant="body-default">Hilfe-Center</Text>
            </button>
            <button
              @click="openExternal('https://creatordoorstatus.statuspage.io/')"
              class="cursor-pointer block text-stone-400 hover:text-primary-purple transition-colors text-left"
            >
              <Text variant="body-default">Statusseite</Text>
            </button>
            <button
              @click="openExternal('https://creatordoor.com/contact')"
              class="cursor-pointer block text-stone-400 hover:text-primary-purple transition-colors text-left"
            >
              <Text variant="body-default">Kontakt</Text>
            </button>
          </nav>
        </div>

        <!-- Column 3: Support -->
        <div class="space-y-4">
          <Text variant="body-default-bold" color="content-inverse">Legal</Text>
          <nav class="space-y-1 mt-2">
            <button
              @click="openExternal('https://creatordoor.com/agb')"
              class="cursor-pointer block text-stone-400 hover:text-primary-purple transition-colors text-left"
            >
              <Text variant="body-default">AGB</Text>
            </button>
            <button
              @click="openExternal('https://creatordoor.com/datenschutz')"
              class="cursor-pointer block text-stone-400 hover:text-primary-purple transition-colors text-left"
            >
              <Text variant="body-default">Datenschutz</Text>
            </button>
            <button
              @click="openExternal('https://creatordoor.com/impressum')"
              class="cursor-pointer block text-stone-400 hover:text-primary-purple transition-colors text-left"
            >
              <Text variant="body-default">Impressum</Text>
            </button>
          </nav>
        </div>

        <!-- Column 4: Newsletter -->
        <div class="space-y-4">
          <Text variant="body-default-bold" color="content-inverse">Newsletter</Text>

          <form @submit.prevent="handleSubscribe" class="space-y-3">
            <!-- Email Input -->
            <div>
              <input
                v-model="email"
                type="email"
                placeholder=""
                :disabled="isLoading"
                class="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <!-- Submit Button -->
            <Button
              type="submit"
              variant="primary"
              size="medium"
              :loading="isLoading"
              :disabled="isLoading"
              class="w-full"
            >
              {{ isLoading ? 'Wird gesendet...' : 'Abonnieren' }}
            </Button>
          </form>

          <!-- Success Message -->
          <div v-if="successMessage" class="p-3 bg-green-900/30 border border-green-700 rounded-lg">
            <Text variant="body-default" color="sentiment-positive">
              {{ successMessage }}
            </Text>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="p-3 bg-red-900/30 border border-red-700 rounded-lg">
            <Text variant="body-default" color="sentiment-negative">
              {{ errorMessage }}
            </Text>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="pt-8 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
      >
        <Text variant="body-default" color="content-inverse" class="opacity-60">
          © {{ currentYear }} CreatorDoor. Alle Rechte vorbehalten.
        </Text>

        <!-- Payment Methods -->
        <div class="flex items-center space-x-4">
          <Text variant="body-default" color="content-inverse" class="opacity-60">
            Sichere Zahlung mit
          </Text>
          <div class="flex items-center space-x-2">
            <div class="px-2 py-1 bg-stone-800 rounded">
              <Text variant="body-default" color="content-inverse" class="text-xs font-medium">
                VISA
              </Text>
            </div>
            <div class="px-2 py-1 bg-stone-800 rounded">
              <Text variant="body-default" color="content-inverse" class="text-xs font-medium">
                Paypal
              </Text>
            </div>
            <div class="px-2 py-1 bg-stone-800 rounded">
              <Text variant="body-default" color="content-inverse" class="text-xs font-medium">
                Klarna
              </Text>
            </div>
            <div class="px-2 py-1 bg-stone-800 rounded">
              <Text variant="body-default" color="content-inverse" class="text-xs font-medium">
                +20
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Custom scrollbar for dark theme */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgb(28, 25, 23);
}

::-webkit-scrollbar-thumb {
  background: rgb(87, 83, 78);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(120, 113, 108);
}
</style>
