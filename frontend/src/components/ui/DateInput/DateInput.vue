<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  // Label text
  label: {
    type: String,
    default: 'Date of birth',
  },
  // Description text
  description: {
    type: String,
    default: '',
  },
  // Model value (Date object or null)
  modelValue: {
    type: Object,
    default: null,
  },
  // Date format: 'DMY', 'MDY', 'YMD'
  format: {
    type: String,
    default: 'DMY',
    validator: (value) => ['DMY', 'MDY', 'YMD'].includes(value),
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

const day = ref('')
const month = ref('')
const year = ref('')

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

// Initialize from modelValue
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      day.value = String(newVal.day || '')
      month.value = String(newVal.month || '')
      year.value = String(newVal.year || '')
    }
  },
  { immediate: true },
)

// Emit changes
const updateValue = () => {
  const dateObj = {
    day: day.value ? parseInt(day.value) : null,
    month: month.value || null,
    year: year.value ? parseInt(year.value) : null,
  }
  emit('update:modelValue', dateObj)
}

watch([day, month, year], updateValue)

const borderClasses = computed(() => {
  if (props.state === 'error') {
    return 'border-2 border-red-500'
  }
  if (props.state === 'success') {
    return 'border-2 border-green-500'
  }
  return 'border border-gray-300 hover:border-[#25ccbf] focus-within:border-2 focus-within:border-[#25ccbf]'
})

// Get field order based on format
const fieldOrder = computed(() => {
  const fields = {
    DMY: ['day', 'month', 'year'],
    MDY: ['month', 'day', 'year'],
    YMD: ['year', 'month', 'day'],
  }
  return fields[props.format]
})

const getFieldWidth = (field) => {
  if (field === 'year') return 'flex-[0_0_120px]'
  if (field === 'month') return 'flex-1'
  if (field === 'day') return 'flex-[0_0_100px]'
}

const getFieldLabel = (field) => {
  if (field === 'day') return 'Day'
  if (field === 'month') return 'Month'
  if (field === 'year') return 'Year'
}
</script>

<template>
  <div class="w-full">
    <!-- Label -->
    <label class="block text-sm font-medium text-content-primary mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Description -->
    <p v-if="description" class="text-sm text-content-secondary mb-2">
      {{ description }}
    </p>

    <!-- Date Fields -->
    <div class="flex gap-3">
      <div v-for="field in fieldOrder" :key="field" :class="getFieldWidth(field)">
        <!-- Field Label -->
        <label class="block text-sm text-content-secondary mb-2">
          {{ getFieldLabel(field) }}
        </label>

        <!-- Day Input -->
        <input
          v-if="field === 'day'"
          v-model="day"
          type="text"
          inputmode="numeric"
          maxlength="2"
          placeholder="12"
          :disabled="disabled"
          :class="[
            'w-full px-4 py-3 text-base text-content-primary rounded-lg transition-all',
            'focus:outline-none',
            borderClasses,
            disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
          ]"
        />

        <!-- Month Select -->
        <select
          v-if="field === 'month'"
          v-model="month"
          :disabled="disabled"
          :class="[
            'w-full px-4 py-3 text-base text-content-primary rounded-lg transition-all appearance-none',
            'focus:outline-none',
            'bg-white',
            borderClasses,
            disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
          ]"
          style="
            background-image: url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e');
            background-repeat: no-repeat;
            background-position: right 1rem center;
            background-size: 1.25rem;
            padding-right: 2.5rem;
          "
        >
          <option value="">Select month</option>
          <option v-for="(monthName, index) in months" :key="index" :value="monthName">
            {{ monthName }}
          </option>
        </select>

        <!-- Year Input -->
        <input
          v-if="field === 'year'"
          v-model="year"
          type="text"
          inputmode="numeric"
          maxlength="4"
          placeholder="1990"
          :disabled="disabled"
          :class="[
            'w-full px-4 py-3 text-base text-content-primary rounded-lg transition-all',
            'focus:outline-none',
            borderClasses,
            disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
          ]"
        />
      </div>
    </div>

    <!-- Error Message -->
    <p v-if="state === 'error' && errorMessage" class="mt-2 text-sm text-red-500">
      {{ errorMessage }}
    </p>
  </div>
</template>
