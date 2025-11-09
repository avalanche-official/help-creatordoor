<!-- components/atoms/RadioOption/RadioOption.vue -->
<script setup>
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['change'])

const handleChange = (event) => {
  if (!props.disabled) {
    emit('change', event.target.value)
  }
}
</script>

<template>
  <label
    :class="[
      'flex items-center justify-between p-4 cursor-pointer transition-all hover:bg-stone-100 rounded-lg',
      disabled && 'opacity-50 cursor-not-allowed',
    ]"
  >
    <!-- Label Text (Left) -->
    <Text variant="body-large-bold" color="content-primary">
      {{ label }}
    </Text>

    <!-- Radio Input (Right) -->
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      class="w-6 h-6 cursor-pointer accent-primary-purple focus:outline-none"
      @change="handleChange"
    />
  </label>
</template>

<style scoped>
input[type='radio'] {
  accent-color: var(--color-primary-purple);
}

input[type='radio']:focus {
  outline: none;
  box-shadow: none;
}
</style>
