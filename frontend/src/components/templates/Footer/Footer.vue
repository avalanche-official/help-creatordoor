<script setup>
import { ref } from 'vue'
import Logo from '../../atoms/Logo/Logo.vue'
import Icon from '../../atoms/Icon/Icon.vue'
import InputField from '../../molecules/InputField/InputField.vue'
import Button from '../../atoms/Button/Button.vue'

const currentYear = new Date().getFullYear()
const newsletterEmail = ref('')

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

const handleNewsletterSubmit = () => {
  // Handle newsletter subscription
  console.log('Newsletter email:', newsletterEmail.value)
  // Add your subscription logic here
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
            <div class="flex gap-2">
              <div class="flex-1">
                <InputField
                  id="newsletter-email"
                  background="light"
                  v-model="newsletterEmail"
                  type="email"
                  class="bg-white"                  placeholder="Email eingeben"
                  size="default"
                  rounded="rounded-lg"
                />
              </div>
              <Button  type="button"    @click="handleNewsletterSubmit" variant="secondary" class="rounded-lg">Anmelden</Button>
   
            </div>
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
/* Optional: Add smooth transitions */
a {
  transition: all 0.2s ease;
}
</style>