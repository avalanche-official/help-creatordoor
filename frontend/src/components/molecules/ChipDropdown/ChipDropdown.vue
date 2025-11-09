<!-- components/molecules/ChipDropdown/ChipDropdown.vue -->
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import Chip from '@/components/molecules/Chip/Chip.vue'
import DropdownMenu from '@/components/atoms/DropdownMenu/DropdownMenu.vue'
import BottomSheet from '@/components/organisms/BottomSheet/BottomSheet.vue'
import InputField from '@/components/molecules/InputField/InputField.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: 'chevron-down',
  },
  iconPosition: {
    type: String,
    default: 'right',
    validator: (v) => ['left', 'right'].includes(v),
  },
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'default',
  },
  options: {
    type: Array,
    required: true,
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  searchPlaceholder: {
    type: String,
    default: 'Suchen...',
  },
  dropdownPosition: {
    type: String,
    default: 'right',
    validator: (v) => ['left', 'center', 'right'].includes(v),
  },
  dropdownWidth: {
    type: String,
    default: '250px',
  },
  // Current selected value
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['select', 'update:modelValue'])

const isOpen = ref(false)
const chipRef = ref(null)
const currentLabel = ref(props.label)
const searchQuery = ref('')

// Detect if mobile (screen width < 768px)
const isMobile = ref(false)

const checkIfMobile = () => {
  isMobile.value = window.innerWidth < 768
}

// Filtered options for search
const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options

  const query = searchQuery.value.toLowerCase()
  return props.options.filter((option) => option.label.toLowerCase().includes(query))
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  // Reset search when opening
  if (isOpen.value) {
    searchQuery.value = ''
  }
}

const selectOption = (option) => {
  // Update the label to the selected option
  currentLabel.value = option.label

  // Emit both events
  emit('select', option)
  emit('update:modelValue', option.value)

  // Close dropdown/sheet
  isOpen.value = false
  searchQuery.value = ''
}

// Close dropdown when clicking outside (desktop only)
const handleClickOutside = (event) => {
  if (!isMobile.value && chipRef.value && !chipRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  checkIfMobile()
  window.addEventListener('resize', checkIfMobile)
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkIfMobile)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="chipRef" class="relative inline-block">
    <!-- Clickable Chip with animated icon -->
    <button type="button" class="cursor-pointer" @click="toggleDropdown">
      <Chip
        :label="currentLabel"
        :icon="icon"
        :icon-position="iconPosition"
        :variant="variant"
        :size="size"
        :is-open="isOpen"
      />
    </button>

    <!-- Desktop: Dropdown Menu -->
    <DropdownMenu
      v-if="!isMobile"
      :is-open="isOpen"
      :options="options"
      :selected-value="modelValue"
      :searchable="searchable"
      :search-placeholder="searchPlaceholder"
      :position="dropdownPosition"
      :width="dropdownWidth"
      @select="selectOption"
    />

    <!-- Mobile: Bottom Sheet -->
    <BottomSheet
      v-if="isMobile"
      v-model:is-open="isOpen"
      :title="label"
      height-mode="fit"
      :show-header="false"
      @close="isOpen = false"
    >
      <!-- Search Slot (if searchable) -->
      <template v-if="searchable" #search>
        <InputField
          v-model="searchQuery"
          type="text"
          :placeholder="searchPlaceholder"
          prefix-icon="search"
          size="medium"
        />
      </template>

      <!-- Options List - Clean text with chevron -->
      <div class="space-y-1">
        <button
          v-for="option in filteredOptions"
          :key="option.value"
          type="button"
          class="w-full flex items-center justify-between p-4 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          @click="selectOption(option)"
        >
          <!-- Left: Label -->
          <Text
            :variant="modelValue === option.value ? 'body-large-bold' : 'body-large'"
            :color="modelValue === option.value ? 'content-primary' : 'content-primary'"
          >
            {{ option.label }}
          </Text>

          <!-- Right: Chevron (always visible, acts as visual affordance) -->
          <Icon
            name="chevron-right"
            :size="20"
            :color="
              modelValue === option.value
                ? 'var(--color-blue-600)'
                : 'var(--color-content-tertiary)'
            "
          />
        </button>
      </div>

      <!-- Empty State for Search -->
      <div v-if="searchable && filteredOptions.length === 0" class="py-8 text-center">
        <Text variant="body-default" color="content-tertiary"> Keine Ergebnisse gefunden </Text>
      </div>
    </BottomSheet>
  </div>
</template>
