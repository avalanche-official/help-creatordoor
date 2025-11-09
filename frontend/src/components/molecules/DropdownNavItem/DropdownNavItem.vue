<!-- components/molecules/DropdownNavItem/DropdownNavItem.vue -->
<script setup>
import { ref } from 'vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import Text from '@/components/atoms/Text/Text.vue'
import NavItem from '@/components/molecules/NavItem/NavItem.vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
    // items: [{ label: 'Sub Item', to: '/path', icon: 'icon-name' }]
  },
  defaultOpen: {
    type: Boolean,
    default: false,
  },
})

const isOpen = ref(props.defaultOpen)
const isHovered = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div>
    <!-- Parent button -->
    <button
      type="button"
      :class="[
        'cursor-pointer w-full flex items-center gap-4 px-4 py-3 rounded-full transition-all',
      ]"
      @click="toggleDropdown"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <Icon
        :name="icon"
        :size="20"
        :class="[
          'transition-colors',
          isHovered ? 'text-content-primary' : 'text-content-secondary',
        ]"
      />

      <Text
        :variant="isHovered ? 'body-default-bold' : 'body-default'"
        :color="isHovered ? 'content-primary' : 'content-secondary'"
        class="flex-1 text-left transition-all"
      >
        {{ label }}
      </Text>

      <!-- Chevron icon with rotation animation -->
      <Icon
        name="chevron-down"
        :size="16"
        :class="[
          'transition-all duration-300 ease-in-out',
          isOpen ? 'rotate-180' : 'rotate-0',
          isHovered ? 'text-content-primary' : 'text-content-secondary',
        ]"
      />
    </button>

    <!-- Dropdown items with smooth slide animation -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-2 max-h-0"
      enter-to-class="opacity-100 translate-y-0 max-h-screen"
      leave-from-class="opacity-100 translate-y-0 max-h-screen"
      leave-to-class="opacity-0 -translate-y-2 max-h-0"
    >
      <div v-show="isOpen" class="ml-6 space-y-1 overflow-hidden">
        <NavItem
          v-for="(item, index) in items"
          :key="index"
          :label="item.label"
          :icon="item.icon"
          :to="item.to"
          :active="item.active"
        />
      </div>
    </Transition>
  </div>
</template>
