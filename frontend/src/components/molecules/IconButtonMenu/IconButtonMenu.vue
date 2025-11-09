<!-- components/molecules/IconButtonMenu/IconButtonMenu.vue -->
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import IconButton from '@/components/molecules/IconButton/IconButton.vue'
import DropdownMenu from '@/components/atoms/DropdownMenu/DropdownMenu.vue'

const props = defineProps({
  icon: {
    type: String,
    default: 'ellipsis-vertical',
  },
  variant: {
    type: String,
    default: 'neutral',
  },
  size: {
    type: String,
    default: 'medium',
  },
  menuItems: {
    type: Array,
    required: true,
    // Expected format: [{ label: 'Download PDF', icon: 'download', action: 'download-pdf' }]
  },
  position: {
    type: String,
    default: 'right',
    validator: (v) => ['left', 'right'].includes(v),
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  searchPlaceholder: {
    type: String,
    default: 'Suchen...',
  },
})

const emit = defineEmits(['select'])

const isOpen = ref(false)
const menuRef = ref(null)
const selectedValue = ref('')

// Transform menuItems to match DropdownMenu format
const dropdownOptions = computed(() => {
  return props.menuItems.map((item) => ({
    value: item.action,
    label: item.label,
    prefix: item.icon ? null : item.prefix, // Use prefix if no icon
    icon: item.icon, // Custom property for icons
  }))
})

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option) => {
  emit('select', option.value)
  isOpen.value = false
}

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="menuRef" class="relative">
    <!-- IconButton Trigger -->
    <IconButton
      :icon="icon"
      :variant="variant"
      :size="size"
      aria-label="Menu öffnen"
      @click="toggleMenu"
    />

    <!-- Reusing existing DropdownMenu component -->
    <DropdownMenu
      :is-open="isOpen"
      :options="dropdownOptions"
      :selected-value="selectedValue"
      :searchable="searchable"
      :search-placeholder="searchPlaceholder"
      @select="selectOption"
      position="right"
      width="200px"
    />
  </div>
</template>
