<script setup>
import { ref, computed } from 'vue'

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
    type: String,
    default: '',
  },
  // Placeholder text
  placeholder: {
    type: String,
    default: 'Search',
  },
  // Disabled state
  disabled: {
    type: Boolean,
    default: false,
  },
  // Size: 'small', 'medium', 'large'
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue', 'search', 'clear'])

const searchId = ref(`search-${Math.random().toString(36).substr(2, 9)}`)
const inputRef = ref(null)

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleSearch = () => {
  emit('search', props.modelValue)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

const handleKeydown = (event) => {
  if (event.key === 'Enter') {
    handleSearch()
  }
}

const sizeClasses = computed(() => {
  const sizes = {
    small: 'px-10 py-2 text-sm',
    medium: 'px-12 py-3 text-base',
    large: 'px-14 py-4 text-lg',
  }
  return sizes[props.size]
})

const iconSizeClasses = computed(() => {
  const sizes = {
    small: 'w-4 h-4 left-3',
    medium: 'w-5 h-5 left-4',
    large: 'w-6 h-6 left-4',
  }
  return sizes[props.size]
})

const clearButtonClasses = computed(() => {
  const sizes = {
    small: 'w-5 h-5 right-2',
    medium: 'w-6 h-6 right-3',
    large: 'w-7 h-7 right-4',
  }
  return sizes[props.size]
})
</script>

<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" :for="searchId" class="block text-sm font-medium text-content-primary mb-2">
      {{ label }}
    </label>

    <!-- Description -->
    <p v-if="description" class="text-sm text-content-secondary mb-2">
      {{ description }}
    </p>

    <!-- Search Input Container -->
    <div class="relative">
      <!-- Search Icon -->
      <div
        :class="[
          'absolute top-1/2 -translate-y-1/2 pointer-events-none text-gray-400',
          iconSizeClasses,
        ]"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <!-- Input -->
      <input
        :id="searchId"
        ref="inputRef"
        type="search"
        :value="modelValue"
        @input="handleInput"
        @keydown="handleKeydown"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full rounded-full border border-gray-300 bg-white',
          'focus:outline-none focus:border-2 focus:border-[#25ccbf] focus:ring-2 focus:ring-[#25ccbf]/20',
          'hover:border-[#25ccbf]',
          'transition-all',
          'text-content-primary placeholder:text-content-secondary',
          sizeClasses,
          disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
        ]"
      />

      <!-- Clear Button -->
      <button
        v-if="modelValue && !disabled"
        @click="handleClear"
        :class="[
          'absolute top-1/2 -translate-y-1/2',
          'flex items-center justify-center',
          'bg-gray-400 text-white rounded-full',
          'hover:bg-gray-500 transition-colors',
          clearButtonClasses,
        ]"
        aria-label="Clear search"
        type="button"
      >
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
