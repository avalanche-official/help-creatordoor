<!-- src/components/templates/Footer/Footer.vue
     Port of the creatordoor.com footer (full variant): pinned near-black
     surface, desktop column grid, mobile accordion layout with app button
     and store badges. -->
<script setup>
import { ref } from 'vue'
import Text from '../../atoms/Text/Text.vue'
import Icon from '../../atoms/Icon/Icon.vue'
import Logo from '../../atoms/Logo/Logo.vue'

// App store badges (same assets as the main webapp)
import appStoreBadge from '@/assets/mobileApp/appstore.svg'
import googlePlayBadge from '@/assets/mobileApp/google-play.svg'

const currentYear = new Date().getFullYear()

// ── Mobile accordion state ──
const openSection = ref(null)
const toggleSection = (key) => {
  openSection.value = openSection.value === key ? null : key
}

// ── Links (help-center context: internal help home, rest → creatordoor.com) ──
const linkColumns = [
  {
    title: 'Schnellzugriff',
    links: [
      { label: 'Startseite', href: 'https://creatordoor.com' },
      { label: 'Dashboard', href: 'https://creatordoor.com/dashboard' },
      { label: 'Registrieren', href: 'https://creatordoor.com/register' },
      { label: 'Login', href: 'https://creatordoor.com/login' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Hilfe-Center', to: '/' },
      { label: 'Statusseite', href: 'https://creatordoorstatus.statuspage.io/' },
      { label: 'Kontakt', href: 'https://creatordoor.com/contact' },
      { label: 'Blog', href: 'https://creatordoor.com/blog' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'AGB', href: 'https://creatordoor.com/agb' },
      { label: 'Datenschutz', href: 'https://creatordoor.com/datenschutz' },
      { label: 'Impressum', href: 'https://creatordoor.com/impressum' },
    ],
  },
]

const socialLinks = [
  { url: 'https://twitter.com/creatordoor_de', icon: 'twitter', label: 'Twitter' },
  { url: 'https://instagram.com/creatordoor_de', icon: 'instagram', label: 'Instagram' },
  { url: 'https://tiktok.com/creatordoor_de', icon: 'smartphone', label: 'TikTok' },
]

const paymentLabels = ['VISA', 'Paypal', 'RatePay', '+20']

const appStoreUrl = 'https://apps.apple.com/app/creatordoor'
const googlePlayUrl = 'https://play.google.com/store/apps/details?id=com.creatordoor'
</script>

<template>
  <!-- Pinned near-black surface — never inverts -->
  <footer class="mt-auto w-full bg-[#0c0c0d]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <!-- ═══ MOBILE: centered logo → tagline → app button → socials →
           link accordions → copyright + store badges ═══ -->
      <div class="md:hidden flex flex-col items-center text-center">
        <Logo variant="wordmark-white" size="x-mini" />
        <Text variant="body-default" class="text-white/70 mt-3">Create. Connect. Earn</Text>

        <!-- Smart app link: detects iOS/Android on the main site -->
        <a
          href="https://creatordoor.com/app"
          class="w-full mt-6 inline-flex items-center justify-center px-4 py-3 rounded-full bg-white text-[#141414] text-sm font-semibold hover:opacity-90 active:opacity-80 transition-opacity"
        >
          Hol dir unsere App
        </a>

        <!-- Socials -->
        <div class="flex items-center gap-6 mt-6">
          <a
            v-for="social in socialLinks"
            :key="social.icon"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white/60 hover:text-white transition-colors"
            :aria-label="social.label"
          >
            <Icon :name="social.icon" :size="20" />
          </a>
        </div>

        <!-- Link accordions -->
        <div class="w-full mt-8 divide-y divide-white/10 border-b border-white/10">
          <div v-for="col in linkColumns" :key="col.title">
            <button
              class="w-full flex items-center justify-between px-4 py-4 cursor-pointer"
              @click="toggleSection(col.title)"
            >
              <Text variant="body-default-bold" class="text-white">{{ col.title }}</Text>
              <Icon
                name="chevron-down"
                :size="16"
                class="text-white/50 transition-transform duration-200"
                :class="openSection === col.title ? 'rotate-180' : ''"
              />
            </button>
            <nav
              v-show="openSection === col.title"
              class="px-4 pb-4 flex flex-col items-start gap-1 text-left"
            >
              <template v-for="link in col.links" :key="link.label">
                <router-link
                  v-if="link.to"
                  :to="link.to"
                  class="block py-1 text-white/70 hover:text-white transition-colors"
                >
                  <Text variant="body-default">{{ link.label }}</Text>
                </router-link>
                <a
                  v-else
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block py-1 text-white/70 hover:text-white transition-colors"
                >
                  <Text variant="body-default">{{ link.label }}</Text>
                </a>
              </template>
            </nav>
          </div>
        </div>

        <!-- Bottom: copyright + store badges -->
        <Text variant="body-small" class="text-white/50 mt-8">
          © {{ currentYear }} Creatordoor. Alle Rechte vorbehalten.
        </Text>
        <div class="flex items-center justify-center gap-3 mt-4">
          <a
            :href="appStoreUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on the App Store"
          >
            <img :src="appStoreBadge" alt="Download on the App Store" class="h-9 object-contain" />
          </a>
          <a
            :href="googlePlayUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get it on Google Play"
          >
            <img :src="googlePlayBadge" alt="Get it on Google Play" class="h-9 object-contain" />
          </a>
        </div>
      </div>

      <!-- ═══ DESKTOP: column layout ═══ -->
      <div class="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10">
        <!-- About -->
        <div class="lg:col-span-4 space-y-4 flex flex-col">
          <Logo variant="wordmark-white" size="x-mini" />
          <Text variant="body-default" class="text-white/70">Create. Connect. Earn</Text>
          <div class="flex space-x-4 pt-2">
            <a
              v-for="social in socialLinks"
              :key="social.icon"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-white/60 hover:text-white transition-colors"
              :aria-label="social.label"
            >
              <Icon :name="social.icon" :size="20" />
            </a>
          </div>

          <!-- App store badges -->
          <div class="flex items-center gap-3 pt-1">
            <a
              :href="appStoreUrl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
            >
              <img
                :src="appStoreBadge"
                alt="Download on the App Store"
                class="h-8 object-contain"
              />
            </a>
            <a
              :href="googlePlayUrl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
            >
              <img :src="googlePlayBadge" alt="Get it on Google Play" class="h-8 object-contain" />
            </a>
          </div>
        </div>

        <!-- Link columns -->
        <div class="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div v-for="col in linkColumns" :key="col.title" class="space-y-4">
            <Text variant="body-default-bold" class="text-white">{{ col.title }}</Text>
            <nav class="space-y-1 mt-2">
              <template v-for="link in col.links" :key="link.label">
                <router-link
                  v-if="link.to"
                  :to="link.to"
                  class="block text-white/70 hover:text-white transition-colors"
                >
                  <Text variant="body-default">{{ link.label }}</Text>
                </router-link>
                <a
                  v-else
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block text-white/70 hover:text-white transition-colors"
                >
                  <Text variant="body-default">{{ link.label }}</Text>
                </a>
              </template>
            </nav>
          </div>

        </div>
      </div>

      <!-- Bottom Bar (desktop) -->
      <div class="hidden md:flex pt-8 border-t border-white/10 flex-row justify-between items-center">
        <Text variant="body-default" class="text-white/50">
          © {{ currentYear }} Creatordoor. Alle Rechte vorbehalten.
        </Text>
        <div class="flex items-center space-x-4">
          <Text variant="body-default" class="text-white/50">Sichere Zahlung mit</Text>
          <div class="flex items-center space-x-2">
            <div
              v-for="label in paymentLabels"
              :key="label"
              class="px-2 py-1 rounded bg-white/5 border border-white/10"
            >
              <Text variant="body-small" class="text-white/70">{{ label }}</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
