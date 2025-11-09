<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Logo from '@/components/atoms/Logo/Logo.vue'
import HeaderActions from '@/components/product/HeaderActions/HeaderActions.vue'
import DesktopNavigation from './DesktopNavigation.vue'
import MegaMenuDropdown from './MegaMenuDropdown.vue'
import MobileMenu from './MobileMenu.vue'
import IconButton from '@/components/molecules/IconButton/IconButton.vue'

// Props
const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
  additionalLinks: {
    type: Array,
    default: () => [],
  },
  iconComponents: {
    type: Object,
    required: true,
  },
  currentLanguage: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['language-click'])

// State
const isScrolled = ref(false)
const isVisible = ref(true)
const lastScrollY = ref(0)
const activeMegaMenu = ref(null)
const isPinned = ref(false)
const hoverTimeout = ref(null)
const isMobileMenuOpen = ref(false)
const activeMobileSubmenu = ref(null)

// Scroll handler
const handleScroll = () => {
  const currentScrollY = window.scrollY
  isScrolled.value = currentScrollY > 50

  if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
    isVisible.value = false
  } else {
    isVisible.value = true
  }

  lastScrollY.value = currentScrollY
}

// Mega menu handlers
const toggleMegaMenu = (menuId) => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
    hoverTimeout.value = null
  }

  if (activeMegaMenu.value === menuId && isPinned.value) {
    isPinned.value = false
    activeMegaMenu.value = null
  } else {
    isPinned.value = true
    activeMegaMenu.value = menuId
  }
}

const handleMouseEnter = (menuId) => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
    hoverTimeout.value = null
  }

  if (!isPinned.value) {
    activeMegaMenu.value = menuId
  }
}

const handleMenuMouseEnter = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
    hoverTimeout.value = null
  }
}

const handleMenuMouseLeave = () => {
  if (!isPinned.value) {
    hoverTimeout.value = setTimeout(() => {
      if (!isPinned.value) {
        activeMegaMenu.value = null
      }
      hoverTimeout.value = null
    }, 150)
  }
}

const closeMegaMenu = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
    hoverTimeout.value = null
  }
  activeMegaMenu.value = null
  isPinned.value = false
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.mega-menu-container')) {
    closeMegaMenu()
  }
}

// Mobile menu handlers
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (!isMobileMenuOpen.value) {
    activeMobileSubmenu.value = null
  }
}

const openMobileSubmenu = (menuId) => {
  activeMobileSubmenu.value = menuId
}

const closeMobileSubmenu = () => {
  activeMobileSubmenu.value = null
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <!-- Backdrop -->
  <transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="activeMegaMenu"
      class="fixed inset-0 backdrop-blur-sm bg-black/40 z-40"
      @click="closeMegaMenu"
    ></div>
  </transition>

  <!-- Header -->
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white' : 'bg-white',
      isVisible ? 'translate-y-0' : '-translate-y-full',
    ]"
  >
    <div class="xl:max-w-7xl lg:max-w-[1440px] mx-auto px-8 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Left: Logo + Navigation -->
        <div class="flex items-center gap-8">
          <Logo size="small" />

          <DesktopNavigation
            :menu-items="menuItems"
            :active-menu-id="activeMegaMenu"
            @toggle-menu="toggleMegaMenu"
            @mouse-enter="handleMouseEnter"
          />
        </div>

        <!-- Right: Actions -->
        <HeaderActions
          :current-language="currentLanguage"
          @language-click="emit('language-click')"
        />

        <!-- Mobile Menu Button -->
        <IconButton icon="menu" size="12" variant="" @click="toggleMobileMenu" class="lg:hidden" />
      </div>
    </div>
  </header>

  <!-- Mobile Menu -->
  <MobileMenu
    :is-open="isMobileMenuOpen"
    :menu-items="menuItems"
    :additional-links="additionalLinks"
    :current-language="currentLanguage"
    :icon-components="iconComponents"
    :active-submenu="activeMobileSubmenu"
    @close="toggleMobileMenu"
    @language-click="emit('language-click')"
    @open-submenu="openMobileSubmenu"
    @close-submenu="closeMobileSubmenu"
  />

  <!-- Spacer -->
  <div class="h-20"></div>
</template>
