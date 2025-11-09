<!-- components/molecules/DateInput/DateInput.vue -->
<script setup>
import { ref, computed, watch } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'
import Input from '@/components/atoms/Input/Input.vue'
import Dropdown from '@/components/molecules/Dropdown/Dropdown.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '', // Format: YYYY-MM-DD
  },
  label: {
    type: String,
    default: 'Date of birth',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'success', 'error'].includes(value),
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

// Parse the date value
const parsedDate = computed(() => {
  if (!props.modelValue) return { day: '', month: '', year: '' }
  const [year, month, day] = props.modelValue.split('-')
  return { day, month, year }
})

const selectedDay = ref(parsedDate.value.day)
const selectedMonth = ref(parsedDate.value.month)
const selectedYear = ref(parsedDate.value.year)

const isFocusedDay = ref(false)
const isFocusedYear = ref(false)

const monthOptions = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
]

// Border classes for Day input
const borderClassesDay = computed(() => {
  if (props.disabled) return 'border-stone-300'
  if (props.state === 'error') return 'border-red-500'
  if (props.state === 'success') return 'border-green-500'
  if (isFocusedDay.value) return 'border-black'
  return 'border-stone-300'
})

// Border classes for Year input
const borderClassesYear = computed(() => {
  if (props.disabled) return 'border-stone-300'
  if (props.state === 'error') return 'border-red-500'
  if (props.state === 'success') return 'border-green-500'
  if (isFocusedYear.value) return 'border-black'
  return 'border-stone-300'
})

// Ring classes
const ringClassesDay = computed(() => {
  if (isFocusedDay.value && props.state === 'default' && !props.disabled) {
    return 'ring-2 ring-black'
  }
  return ''
})

const ringClassesYear = computed(() => {
  if (isFocusedYear.value && props.state === 'default' && !props.disabled) {
    return 'ring-2 ring-black'
  }
  return ''
})

// Update the full date when any part changes
watch([selectedDay, selectedMonth, selectedYear], ([day, month, year]) => {
  if (day && month && year) {
    emit('update:modelValue', `${year}-${month}-${day}`)
  }
})

// Watch for external changes
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      const parsed = newValue.split('-')
      selectedYear.value = parsed[0]
      selectedMonth.value = parsed[1]
      selectedDay.value = parsed[2]
    }
  },
)

const handleDayInput = (value) => {
  // Only allow numbers and limit to 2 digits
  const numValue = value.replace(/\D/g, '').slice(0, 2)
  if (numValue === '' || (parseInt(numValue) >= 1 && parseInt(numValue) <= 31)) {
    selectedDay.value = numValue.padStart(2, '0')
  }
}

const handleYearInput = (value) => {
  // Only allow numbers and limit to 4 digits
  const numValue = value.replace(/\D/g, '').slice(0, 4)
  selectedYear.value = numValue
}
</script>

<template>
  <div class="w-full px-1">
    <!-- Label -->
    <label v-if="label" class="block mb-1">
      <Text variant="body-default-bold" color="content-primary">
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </Text>
    </label>

    <!-- Date Inputs -->
    <div class="grid grid-cols-3 gap-3">
      <!-- Day Input -->
      <div
        class="relative flex items-center w-full border rounded-lg transition-all duration-200 border-stone-200"
        :class="[
          borderClassesDay,
          ringClassesDay,
          {
            'cursor-not-allowed opacity-50': disabled,
          },
        ]"
      >
        <Input
          :model-value="selectedDay"
          placeholder="DD"
          type="text"
          inputmode="numeric"
          maxlength="2"
          :disabled="disabled"
          :required="required"
          @update:model-value="handleDayInput"
          @focus="isFocusedDay = true"
          @blur="isFocusedDay = false"
        />
      </div>

      <!-- Month Dropdown -->
      <Dropdown
        v-model="selectedMonth"
        :options="monthOptions"
        placeholder="Month"
        :disabled="disabled"
        :error="state === 'error'"
      />

      <!-- Year Input -->
      <div
        class="relative flex items-center w-full border rounded-lg transition-all duration-200 border-stone-200"
        :class="[
          borderClassesYear,
          ringClassesYear,
          {
            'cursor-not-allowed opacity-50': disabled,
          },
        ]"
      >
        <Input
          :model-value="selectedYear"
          placeholder="YYYY"
          type="text"
          inputmode="numeric"
          maxlength="4"
          :disabled="disabled"
          :required="required"
          @update:model-value="handleYearInput"
          @focus="isFocusedYear = true"
          @blur="isFocusedYear = false"
        />
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="state === 'error' && errorMessage" class="flex items-start gap-2 mt-2">
      <Icon name="alert-circle" :size="16" class="mt-0.5 shrink-0 text-red-500" />
      <Text variant="body-default" color="content-secondary" class="text-red-500">
        {{ errorMessage }}
      </Text>
    </div>

    <!-- Success Message -->
    <div v-if="state === 'success'" class="flex items-start gap-2 mt-2">
      <Icon name="check" :size="16" class="mt-0.5 shrink-0 text-green-500" />
      <Text variant="body-default" color="content-secondary" class="text-green-500">
        Looks good!
      </Text>
    </div>
  </div>
</template>
