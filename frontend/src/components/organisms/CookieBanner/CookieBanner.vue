<!-- components/organisms/CookieBanner/CookieBanner.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import Button from '@/components/atoms/Button/Button.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const showBanner = ref(false)
const isVisible = ref(false)

// Cookie preferences
const COOKIE_CONSENT_KEY = 'cookie_consent'
const COOKIE_CONSENT_EXPIRY = 365 // days

// Check if user has already given consent
const checkConsent = () => {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
  if (!consent) {
    // Show banner after a small delay for better UX
    setTimeout(() => {
      showBanner.value = true
      setTimeout(() => {
        isVisible.value = true
      }, 100)
    }, 1000)
  }
}

// Save consent to localStorage
const saveConsent = (preference) => {
  const consentData = {
    timestamp: new Date().toISOString(),
    preference: preference, // 'all' or 'necessary'
    version: '1.0',
  }

  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData))

  // Apply cookie settings
  if (preference === 'all') {
    enableAllCookies()
  } else {
    enableNecessaryCookiesOnly()
  }

  closeBanner()
}

// Enable all cookies (analytics, marketing, etc.)
const enableAllCookies = () => {
  console.log('✅ All cookies enabled')

  // Enable Google Analytics
  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
    })
  }

  // Enable Facebook Pixel
  if (window.fbq) {
    window.fbq('consent', 'grant')
  }

  // Add other tracking scripts here
}

// Enable only necessary cookies
const enableNecessaryCookiesOnly = () => {
  console.log('✅ Only necessary cookies enabled')

  // Disable Google Analytics
  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
    })
  }

  // Disable Facebook Pixel
  if (window.fbq) {
    window.fbq('consent', 'revoke')
  }
}

// Accept all cookies
const acceptAll = () => {
  saveConsent('all')
}

// Accept only necessary cookies
const acceptNecessary = () => {
  saveConsent('necessary')
}

// Close banner with animation
const closeBanner = () => {
  isVisible.value = false
  setTimeout(() => {
    showBanner.value = false
  }, 300)
}

// Navigate to cookie policy
const goToCookiePolicy = () => {
  window.location.href = '/cookie-policy'
}

onMounted(() => {
  checkConsent()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="slide-up">
      <div
        v-if="showBanner"
        :class="[
          'fixed bottom-6 left-0 right-0 z-50 transition-all duration-300 px-4',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
        ]"
      >
        <div class="max-w-4xl mx-auto bg-white border border-stone-200 rounded-2xl shadow-2xl">
          <div class="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <!-- Icon -->
              <div
                class="hidden sm:flex flex-shrink-0 w-10 h-10 bg-primary-purple/10 rounded-full items-center justify-center"
              >
                <Icon name="cookie" :size="20" color="text-primary-purple" />
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <Text variant="body-default-bold" color="content-primary" class="mb-1">
                  🍪 Wir verwenden Cookies
                </Text>
                <Text variant="body-default" color="content-secondary" class="pr-4">
                  Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und unsere Website zu
                  optimieren. Sie können wählen, welche Cookies Sie akzeptieren möchten.
                  <button
                    @click="goToCookiePolicy"
                    class="text-primary-purple hover:underline font-medium ml-1"
                  >
                    Mehr erfahren
                  </button>
                </Text>
              </div>

              <!-- Actions -->
              <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:flex-shrink-0">
                <Button
                  variant="outline"
                  size="small"
                  @click="acceptNecessary"
                  class="w-full sm:w-auto whitespace-nowrap"
                >
                  Nur notwendige
                </Button>
                <Button
                  variant="primary"
                  size="small"
                  @click="acceptAll"
                  class="w-full sm:w-auto whitespace-nowrap"
                >
                  Alle akzeptieren
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
