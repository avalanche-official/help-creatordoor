<!-- src/components/molecules/Dropdown/Dropdown.vue -->
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import Select from '@/components/atoms/Select/Select.vue'
import DropdownMenu from '@/components/atoms/DropdownMenu/DropdownMenu.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Wähle eine Option',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  searchPlaceholder: {
    type: String,
    default: 'Suchen...',
  },
  // ✅ NEW: Add width prop
  width: {
    type: String,
    default: '100%',
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const dropdownRef = ref(null)

const selectedOption = computed(() => {
  return props.options.find((opt) => opt.value === props.modelValue)
})

const displayText = computed(() => {
  return selectedOption.value?.label || ''
})

const prefix = computed(() => {
  return selectedOption.value?.prefix || ''
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
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

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="relative w-full">
    <!-- Select Button (Atom) -->
    <Select
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :error="error"
      :is-open="isOpen"
      :display-text="displayText"
      :prefix="prefix"
      @click="toggleDropdown"
    />

    <!-- Dropdown Menu (Atom) -->
    <DropdownMenu
      :is-open="isOpen"
      :options="options"
      :selected-value="modelValue"
      :searchable="searchable"
      :search-placeholder="searchPlaceholder"
      :width="width"
      @select="selectOption"
    />
  </div>
</template>
