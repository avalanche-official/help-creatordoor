<!-- components/atoms/ProgressBar/ProgressBar.vue -->
<script setup>
const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  totalSteps: {
    type: Number,
    required: true,
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'success'].includes(v),
  },
})

const variantClasses = {
  primary: 'bg-primary-purple',
  secondary: 'bg-stone-500',
  success: 'bg-green-500',
}

const segmentClass = (index) => {
  if (index < props.currentStep) {
    return variantClasses[props.variant]
  }
  return 'bg-stone-300' // ✅ Visible gray for incomplete steps
}
</script>

<template>
  <div class="w-full flex gap-2">
    <div
      v-for="step in totalSteps"
      :key="step"
      class="flex-1 h-1 rounded-full transition-all duration-300"
      :class="segmentClass(step)"
    />
  </div>
</template>
