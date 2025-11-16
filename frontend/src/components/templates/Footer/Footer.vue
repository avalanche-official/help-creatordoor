<script setup>
import { ref } from 'vue'
import { newsletterService } from '@/services/newsletterService'
import Logo from '../../atoms/Logo/Logo.vue'
import Icon from '../../atoms/Icon/Icon.vue'
import InputField from '../../molecules/InputField/InputField.vue'
import Button from '../../atoms/Button/Button.vue'

const currentYear = new Date().getFullYear()
const newsletterEmail = ref('')
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const legalLinks = [
  { name: 'Impressum', href: '/impressum' },
  { name: 'Datenschutz', href: '/datenschutz' },
  { name: 'AGB', href: '/agb' },
  { name: 'Cookies', href: '/cookie-policy' },
]

const socialLinks = [
  { name: 'Instagram', icon: 'instagram', href: 'https://instagram.com/creatordoor_de' },
  { name: 'Twitter', icon: 'twitter', href: 'https://x.com/creatordoor_de' },
  { name: 'TikTok', icon: 'smartphone', href: 'https://tiktok.com/@creatordoor_de' },
]

const handleNewsletterSubmit = async () => {
  // Clear previous messages
  errorMessage.value = ''
  successMessage.value = ''

  // Validate email
  if (!newsletterEmail.value || !newsletterEmail.value.trim()) {
    errorMessage.value = 'Bitte gib eine E-Mail-Adresse ein'
    return
  }

  if (!newsletterEmail.value.includes('@')) {
    errorMessage.value = 'Bitte gib eine gültige E-Mail-Adresse ein'
    return
  }

  isLoading.value = true

  try {
    const result = await newsletterService.subscribe({
      email: newsletterEmail.value.trim(),
      source: 'help_center_footer',
    })

    if (result.success) {
      successMessage.value = '🎉 Erfolgreich angemeldet!'
      newsletterEmail.value = '' // Clear input

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
</script>

<template>
  <footer class="bg-neutral-900 border-t border-neutral-800 mt-auto">
    <div class="mx-auto px-4 py-10 md:py-14 max-w-6xl">
      <!-- Mobile-First Layout -->
      <div class="space-y-8">
        <!-- Logo & Description Section -->
        <div class="space-y-4">
          <Logo variant="white" />

          <p class="text-neutral-300 text-sm leading-relaxed max-w-sm">
            Create. Connect. Earn.
          </p>

          <!-- Social Media Icons -->
          <div class="flex items-center gap-4 pt-2">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="text-neutral-400 hover:text-white transition-colors"
              :aria-label="social.name"
            >
              <Icon :name="social.icon" :size="20" />
            </a>
          </div>

          <!-- Newsletter Subscription -->
          <div class="pt-4 max-w-md">
            <label for="newsletter-email" class="block text-sm font-medium text-neutral-300 mb-2">
              Unser Newsletter
            </label>
            <form @submit.prevent="handleNewsletterSubmit" class="space-y-2">
              <div class="flex gap-2">
                <div class="flex-1">
                  <InputField
                    id="newsletter-email"
                    background="light"
                    v-model="newsletterEmail"
                    type="email"
                    class="bg-white"
                    placeholder="Email eingeben"
                    size="default"
                    rounded="rounded-lg"
                    :disabled="isLoading"
                  />
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  class="rounded-lg"
                  :disabled="isLoading"
                >
                  {{ isLoading ? 'Lädt...' : 'Anmelden' }}
                </Button>
              </div>

              <!-- Success Message -->
              <p v-if="successMessage" class="text-green-400 text-sm">
                {{ successMessage }}
              </p>

              <!-- Error Message -->
              <p v-if="errorMessage" class="text-red-400 text-sm">
                {{ errorMessage }}
              </p>
            </form>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-neutral-800"></div>

        <!-- Bottom Section: Copyright & Legal -->
        <div class="space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <!-- Copyright & Support -->
          <div class="space-y-1 order-2 md:order-1">
            <p class="text-neutral-400 text-xs">
              © {{ currentYear }} CreatorDoor. Alle Rechte vorbehalten.
            </p>
            <p class="text-neutral-400 text-xs">
              Support Email: support@creatordoor.com
            </p>
          </div>

          <!-- Legal Links -->
          <nav class="order-1 md:order-2">
            <ul class="flex flex-wrap gap-x-6 gap-y-2">
              <li v-for="link in legalLinks" :key="link.name">
                <a
                  :href="link.href"
                  class="text-neutral-400 hover:text-white transition-colors text-xs"
                >
                  {{ link.name }}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
a {
  transition: all 0.2s ease;
}
</style>