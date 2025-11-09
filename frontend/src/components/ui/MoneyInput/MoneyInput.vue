<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // Label text
  label: {
    type: String,
    default: 'You send',
  },
  // Model value for amount
  modelValue: {
    type: [String, Number],
    default: '',
  },
  // Selected currency
  currency: {
    type: String,
    default: 'EUR',
  },
  // Currency options
  currencies: {
    type: Array,
    default: () => [
      { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
      { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
      { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    ],
  },
  // Disable currency selector
  disableCurrencySelector: {
    type: Boolean,
    default: false,
  },
  // Read-only amount
  readOnly: {
    type: Boolean,
    default: false,
  },
  // Disabled state
  disabled: {
    type: Boolean,
    default: false,
  },
  // Show info icon
  showInfo: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'update:currency', 'info-click'])

const showCurrencyDropdown = ref(false)

const selectedCurrency = computed(() => {
  return props.currencies.find((c) => c.code === props.currency) || props.currencies[0]
})

const handleInput = (event) => {
  let value = event.target.value
  // Allow only numbers and decimal point
  value = value.replace(/[^0-9.]/g, '')
  // Allow only one decimal point
  const parts = value.split('.')
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('')
  }
  emit('update:modelValue', value)
}

const selectCurrency = (currencyCode) => {
  emit('update:currency', currencyCode)
  showCurrencyDropdown.value = false
}

const toggleCurrencyDropdown = () => {
  if (!props.disableCurrencySelector && !props.disabled) {
    showCurrencyDropdown.value = !showCurrencyDropdown.value
  }
}

const handleInfoClick = () => {
  emit('info-click')
}
</script>

<template>
  <div class="w-full">
    <!-- Label -->
    <label class="block text-sm font-medium text-content-primary mb-2">
      {{ label }}
    </label>

    <!-- Input Container -->
    <div class="relative">
      <div
        :class="[
          'flex items-center rounded-lg border transition-all',
          'border-gray-300 hover:border-[#25ccbf] focus-within:border-2 focus-within:border-[#25ccbf]',
          disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
        ]"
      >
        <!-- Amount Input -->
        <input
          type="text"
          inputmode="decimal"
          :value="modelValue"
          @input="handleInput"
          :readonly="readOnly"
          :disabled="disabled"
          :class="[
            'flex-1 px-4 py-3 text-base text-content-primary bg-transparent',
            'focus:outline-none',
            readOnly && 'cursor-default',
          ]"
          placeholder="0.00"
        />

        <!-- Info Icon -->
        <button
          v-if="showInfo"
          type="button"
          @click="handleInfoClick"
          class="px-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="More information"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Currency Selector -->
        <div class="relative">
          <button
            type="button"
            @click="toggleCurrencyDropdown"
            :disabled="disableCurrencySelector || disabled"
            :class="[
              'flex items-center gap-2 px-4 py-3 min-w-[120px]',
              'border-l border-gray-300',
              'font-semibold text-base',
              disableCurrencySelector || disabled
                ? 'cursor-default'
                : 'hover:bg-background-elevated cursor-pointer',
            ]"
          >
            <span class="text-2xl">{{ selectedCurrency.flag }}</span>
            <span>{{ selectedCurrency.code }}</span>
            <svg
              v-if="!disableCurrencySelector"
              class="w-4 h-4 text-gray-400"
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
          </button>

          <!-- Currency Dropdown -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-2"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="showCurrencyDropdown"
              class="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10 max-h-80 overflow-y-auto"
            >
              <button
                v-for="curr in currencies"
                :key="curr.code"
                type="button"
                @click="selectCurrency(curr.code)"
                :class="[
                  'w-full flex items-center gap-3 px-4 py-3 text-left',
                  'hover:bg-background-elevated transition-colors',
                  curr.code === currency && 'bg-content-accent/10',
                ]"
              >
                <span class="text-2xl">{{ curr.flag }}</span>
                <div class="flex-1">
                  <div class="font-medium">{{ curr.code }}</div>
                  <div class="text-xs text-content-secondary">{{ curr.name }}</div>
                </div>
                <svg
                  v-if="curr.code === currency"
                  class="w-5 h-5 text-content-accent"
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
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>
