<!-- src/components/molecules/CodeInput/CodeInput.vue -->
<script setup>
import { ref, watch, nextTick } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  length: {
    type: Number,
    default: 6,
  },
  error: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'complete'])

const inputs = ref([])
const values = ref(Array(props.length).fill(''))

// Initialize values from modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    const chars = newValue.split('')
    values.value = Array(props.length)
      .fill('')
      .map((_, i) => chars[i] || '')
  },
  { immediate: true },
)

const handleInput = (index, event) => {
  const value = event.target.value

  // Only allow numbers
  if (value && !/^\d$/.test(value)) {
    event.target.value = values.value[index]
    return
  }

  values.value[index] = value

  // Emit the complete code
  const code = values.value.join('')
  emit('update:modelValue', code)

  // Move to next input if value entered
  if (value && index < props.length - 1) {
    nextTick(() => {
      inputs.value[index + 1]?.focus()
    })
  }

  // Emit complete event if all filled
  if (code.length === props.length) {
    emit('complete', code)
  }
}

const handleKeyDown = (index, event) => {
  // Move to previous input on backspace if current is empty
  if (event.key === 'Backspace' && !values.value[index] && index > 0) {
    nextTick(() => {
      inputs.value[index - 1]?.focus()
    })
  }
}

const handlePaste = (event) => {
  event.preventDefault()
  const pastedData = event.clipboardData.getData('text')
  const digits = pastedData.replace(/\D/g, '').slice(0, props.length)

  digits.split('').forEach((digit, index) => {
    if (index < props.length) {
      values.value[index] = digit
    }
  })

  const code = values.value.join('')
  emit('update:modelValue', code)

  // Focus the next empty input or the last one
  const nextEmptyIndex = values.value.findIndex((v) => !v)
  const focusIndex = nextEmptyIndex === -1 ? props.length - 1 : nextEmptyIndex
  nextTick(() => {
    inputs.value[focusIndex]?.focus()
  })

  // Emit complete if all filled
  if (code.length === props.length) {
    emit('complete', code)
  }
}
</script>

<template>
  <div class="w-full space-y-4">
    <!-- Code Inputs -->
    <div class="flex gap-3 justify-center">
      <input
        v-for="(value, index) in values"
        :key="index"
        :ref="(el) => (inputs[index] = el)"
        v-model="values[index]"
        type="text"
        inputmode="numeric"
        maxlength="1"
        :class="[
          'w-12 h-14 text-center title-section',
          'border rounded-lg transition-all duration-200',
          'focus:outline-none focus:ring-1',
          error
            ? 'border-sentiment-negative focus:ring-sentiment-negative'
            : 'border-stone-300 focus:border-primary-purple focus:ring-primary-purple',
          'bg-transparent text-content-primary',
        ]"
        @input="handleInput(index, $event)"
        @keydown="handleKeyDown(index, $event)"
        @paste="handlePaste"
      />
    </div>

    <!-- Error Message -->
    <Text v-if="error" variant="body-default" color="content-error" class="block text-center">
      {{ error }}
    </Text>
  </div>
</template>
