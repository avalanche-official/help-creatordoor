<template>
  <div class="relative" ref="dropdownRef">
    <!-- Dropdown trigger button -->
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-200 border border-neutral-200"
    >
      <span class="text-lg">{{ currentLanguage.flag }}</span>
      <span class="hidden sm:block">{{ currentLanguage.code.toUpperCase() }}</span>
      <svg
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-40 rounded-lg shadow-lg bg-white border border-neutral-200 z-50"
      >
        <div class="py-1">
          <button
            v-for="language in languages"
            :key="language.code"
            @click="selectLanguage(language.code)"
            class="flex items-center w-full px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
            :class="{ 'bg-purple-50 text-purple-600 font-medium': currentLocale === language.code }"
          >
            <span class="text-lg mr-3">{{ language.flag }}</span>
            <span>{{ language.name }}</span>
            <svg
              v-if="currentLocale === language.code"
              class="w-4 h-4 ml-auto text-purple-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isOpen = ref(false)
const dropdownRef = ref(null)

// Language options
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
]

// Current locale - this is what makes it GLOBAL
const currentLocale = computed({
  get: () => locale.value,
  set: (newLocale) => {
    locale.value = newLocale
    localStorage.setItem('user-locale', newLocale)
  },
})

// Get current language info
const currentLanguage = computed(() => {
  return languages.find((lang) => lang.code === currentLocale.value) || languages[0]
})

// Select language function - this changes the ENTIRE app instantly
const selectLanguage = (languageCode) => {
  currentLocale.value = languageCode
  isOpen.value = false

  // Optional: You can emit an event or show a toast here
  console.log(`🌍 Language changed globally to: ${currentLanguage.value.name}`)
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
