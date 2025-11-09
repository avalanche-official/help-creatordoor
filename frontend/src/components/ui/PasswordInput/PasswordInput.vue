<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // Label text
  label: {
    type: String,
    default: 'Password',
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
  // Disabled state
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const inputId = ref(`password-${Math.random().toString(36).substr(2, 9)}`)
const showPassword = ref(false)

const inputType = computed(() => (showPassword.value ? 'text' : 'password'))

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const borderClasses = computed(() => {
  if (props.state === 'error') {
    return 'border-2 border-red-500'
  }
  if (props.state === 'success') {
    return 'border-2 border-green-500'
  }
  return 'border border-gray-300 hover:border-[#25ccbf] focus-within:border-2 focus-within:border-[#25ccbf]'
})
</script>

<template>
  <div class="w-fit">
    <!-- Label -->
    <label :for="inputId" class="block text-sm font-medium text-content-primary mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Description -->
    <p v-if="description" class="text-sm text-content-secondary mb-2">
      {{ description }}
    </p>

    <!-- Input Container -->
    <div class="relative">
      <div
        :class="[
          'flex items-center rounded-lg bg-white transition-all overflow-hidden',
          borderClasses,
          disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
        ]"
      >
        <!-- Input -->
        <input
          :id="inputId"
          :type="inputType"
          :value="modelValue"
          @input="handleInput"
          :disabled="disabled"
          :required="required"
          :class="[
            'flex-1 px-4 py-3 text-base text-content-primary bg-transparent',
            'focus:outline-none',
            'placeholder:text-content-secondary',
          ]"
        />

        <!-- Toggle Visibility Button -->
        <button
          v-if="modelValue"
          type="button"
          @click="togglePasswordVisibility"
          :disabled="disabled"
          class="px-3 text-gray-400 hover:text-gray-600 transition-colors"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="showPassword"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>

        <!-- Success Icon -->
        <div
          v-if="state === 'success'"
          class="px-3 flex items-center justify-center text-green-500"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <!-- Error Icon -->
        <div v-if="state === 'error'" class="px-3 flex items-center justify-center text-red-500">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <p v-if="state === 'error' && errorMessage" class="mt-2 text-sm text-red-500">
      {{ errorMessage }}
    </p>
  </div>
</template>
