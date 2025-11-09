<script setup>
import Logo from '@/components/atoms/Logo/Logo.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import FeaturedCard from '@/components/product/FeaturedCard/FeaturedCard.vue'
import LinkSection from '@/components/product/LinkSection/LinkSection.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  menuItems: {
    type: Array,
    required: true,
  },
  additionalLinks: {
    type: Array,
    default: () => [],
  },
  currentLanguage: {
    type: Object,
    required: true,
  },
  iconComponents: {
    type: Object,
    required: true,
  },
  activeSubmenu: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['close', 'language-click', 'open-submenu', 'close-submenu'])

const getMobileSubmenuTitle = (menuId) => {
  const item = props.menuItems.find((item) => item.id === menuId)
  return item ? item.label : ''
}
</script>

<template>
  <transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
      <!-- Mobile Menu Header -->
      <div class="border-b border-gray-200">
        <div class="flex items-center justify-between h-20 px-8">
          <!-- Back button or Logo -->
          <button
            v-if="activeSubmenu"
            @click="emit('close-submenu')"
            class="flex items-center gap-2 text-gray-900 text-base font-semibold"
          >
            <Icon name="chevron-left" size="20" />
            {{ getMobileSubmenuTitle(activeSubmenu) }}
          </button>
          <Logo v-else size="small" />

          <!-- Close button -->
          <button @click="emit('close')" class="p-2">
            <Icon name="x" size="24" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu Content -->
      <div class="flex flex-col h-[calc(100vh-5rem)]">
        <!-- Main Menu -->
        <template v-if="!activeSubmenu">
          <div class="flex-1 overflow-y-auto">
            <nav class="py-4 px-4">
              <!-- Main Menu Items (Vendoren, Affiliates, Plattform) -->
              <button
                v-for="item in menuItems"
                :key="item.id"
                @click="emit('open-submenu', item.id)"
                class="w-full flex items-center justify-between px-6 py-4 text-left text-lg font-semibold text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span>{{ item.label }}</span>
                <Icon name="chevron-right" size="20" class="text-gray-400" />
              </button>

              <!-- Additional Links (Hilfebereich, Einloggen) -->
              <div v-if="additionalLinks.length > 0" class="mt-6 pt-6 border-t border-gray-200">
                <a
                  v-for="link in additionalLinks"
                  :key="link.id"
                  :href="link.href"
                  class="w-full flex items-center justify-between px-6 py-4 text-left text-lg font-semibold text-gray-900 hover:bg-gray-100 rounded-lg transition-colors block"
                >
                  <span>{{ link.label }}</span>
                  <Icon name="chevron-right" size="20" class="text-gray-400" />
                </a>
              </div>
            </nav>
          </div>

          <!-- Bottom Register Button -->
          <div class="border-t border-gray-200 p-6">
            <Button as="a" href="/register" variant="primary" size="large" class="w-full">
              Registrieren
            </Button>
          </div>
        </template>

        <!-- Submenu - Similar to Desktop Mega Menu -->
        <div v-else class="flex-1 overflow-y-auto">
          <div v-for="item in menuItems" :key="item.id">
            <div v-if="activeSubmenu === item.id" class="py-6 px-4">
              <!-- Featured Card (Same as Desktop) -->
              <div class="mb-8">
                <FeaturedCard
                  :image="item.image"
                  :title="item.card.title"
                  :description="item.card.description"
                  :link="item.card.link"
                />
              </div>

              <!-- Link Sections (Same as Desktop) -->
              <div class="space-y-8">
                <LinkSection
                  v-for="(section, idx) in item.sections"
                  :key="idx"
                  :title="section.title"
                  :links="section.links"
                  :icon-components="iconComponents"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
