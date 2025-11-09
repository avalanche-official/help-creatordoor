<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  // Label text
  label: {
    type: String,
    default: '',
  },
  // Description text
  description: {
    type: String,
    default: '',
  },
  // Model value for v-model
  modelValue: {
    type: [String, Number],
    default: '',
  },
  // Options array: [{ label: 'Option 1', value: 'opt1' }, ...]
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  // Placeholder text
  placeholder: {
    type: String,
    default: 'Select an option',
  },
  // Enable search
  searchable: {
    type: Boolean,
    default: false,
  },
  // Search placeholder
  searchPlaceholder: {
    type: String,
    default: 'Search...',
  },
  // State: default, success, error
  state: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'success', 'error'].includes(value),
  },
  // Error message
  errorMessage: {
    type: String,
    default: '',
  },
  // Required field
  required: {
    type: Boolean,
    default: false,
  },
  // Optional field
  optional: {
    type: Boolean,
    default: false,
  },
  // Disabled state
  disabled: {
    type: Boolean,
    default: false,
  },
  // No results message
  noResultsMessage: {
    type: String,
    default: 'Keine Ergebnisse gefunden',
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const selectId = ref(`select-${Math.random().toString(36).substr(2, 9)}`)
const isOpen = ref(false)
const searchQuery = ref('')
const dropdownRef = ref(null)

const handleSelect = (value) => {
  emit('update:modelValue', value)
  emit('change', value)
  isOpen.value = false
  searchQuery.value = ''
}

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
    if (!isOpen.value) {
      searchQuery.value = ''
    }
  }
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
    searchQuery.value = ''
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const borderClasses = computed(() => {
  if (props.state === 'error') {
    return 'border-2 border-red-500'
  }
  if (props.state === 'success') {
    return 'border-2 border-green-500'
  }
  return 'border border-gray-300 hover:border-[#1a1a1a] hover:border-1.5 focus-within:border-1 focus-within:border-gray-300'
})

const selectedLabel = computed(() => {
  const selected = props.options.find((opt) => opt.value === props.modelValue)
  return selected ? selected.label : ''
})

const filteredOptions = computed(() => {
  if (!searchQuery.value) {
    return props.options
  }
  return props.options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})
</script>

<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" :for="selectId" class="block text-sm text-content-primary mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
      <span v-if="optional" class="text-content-secondary font-normal ml-1">(Optional)</span>
    </label>

    <!-- Description -->
    <p v-if="description" class="text-sm text-content-secondary mb-2">
      {{ description }}
    </p>

    <!-- Select Container -->
    <div class="relative" ref="dropdownRef">
      <div
        @click="toggleDropdown"
        :class="[
          'relative rounded-lg bg-white transition-all cursor-pointer',
          borderClasses,
          disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
        ]"
      >
        <!-- Display Value -->
        <div
          class="px-4 py-3 pr-10 text-base text-content-primary"
          :class="{ 'text-content-secondary': !modelValue }"
        >
          {{ selectedLabel || placeholder }}
        </div>

        <!-- Chevron Icon -->
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            class="w-5 h-5 text-gray-400 transition-transform"
            :class="{ 'rotate-180': isOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <!-- Custom Dropdown Menu -->
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isOpen"
          class="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-2 max-h-60 overflow-hidden"
        >
          <!-- Search Bar -->
          <div v-if="searchable" class="px-1 pb-2">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="searchPlaceholder"
                class="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-gray-400"
                @click.stop
              />
            </div>
          </div>

          <!-- Options List -->
          <div class="overflow-y-auto max-h-48 space-y-1">
            <button
              v-for="option in filteredOptions"
              :key="option.value"
              @click="handleSelect(option.value)"
              class="cursor-pointer w-full text-left px-4 py-2.5 text-base rounded-2xl transition-colors"
              :class="
                modelValue === option.value
                  ? 'border border-neutral-400 text-neutral-900 font-medium'
                  : 'text-neutral-700 hover:bg-neutral-100'
              "
            >
              {{ option.label }}
            </button>

            <!-- No results -->
            <div
              v-if="filteredOptions.length === 0"
              class="px-4 py-3 text-sm text-gray-500 text-center"
            >
              {{ noResultsMessage }}
            </div>
          </div>
        </div>
      </transition>

      <!-- Success Icon -->
      <div
        v-if="state === 'success'"
        class="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center"
      >
        <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <!-- Error Icon -->
      <div
        v-if="state === 'error'"
        class="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center"
      >
        <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <!-- Error Message -->
    <p v-if="state === 'error' && errorMessage" class="mt-2 text-sm text-red-500">
      {{ errorMessage }}
    </p>
  </div>
</template>
