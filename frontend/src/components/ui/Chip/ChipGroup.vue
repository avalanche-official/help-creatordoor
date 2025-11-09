<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  // Type: choice or filter
  type: {
    type: String,
    default: 'choice',
    validator: (value) => ['choice', 'filter'].includes(value),
  },
  // Model value for v-model support
  modelValue: {
    type: [String, Array],
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const selectedValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    selectedValue.value = newVal
  },
)

const handleChipClick = (value) => {
  if (props.type === 'choice') {
    // Choice chips - single selection
    selectedValue.value = value
    emit('update:modelValue', value)
  } else {
    // Filter chips - multiple selection
    const currentValues = Array.isArray(selectedValue.value) ? selectedValue.value : []

    if (currentValues.includes(value)) {
      // Remove if already selected
      const newValues = currentValues.filter((v) => v !== value)
      selectedValue.value = newValues
      emit('update:modelValue', newValues)
    } else {
      // Add if not selected
      const newValues = [...currentValues, value]
      selectedValue.value = newValues
      emit('update:modelValue', newValues)
    }
  }
}

const isSelected = (value) => {
  if (props.type === 'choice') {
    return selectedValue.value === value
  } else {
    return Array.isArray(selectedValue.value) && selectedValue.value.includes(value)
  }
}
</script>

<template>
  <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
    <slot :handleChipClick="handleChipClick" :isSelected="isSelected" />
  </div>
</template>

<style scoped>
/* Hide scrollbar but keep functionality */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
