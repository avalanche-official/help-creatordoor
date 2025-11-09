<script setup>
import { computed } from 'vue'
import Button from '@/components/atoms/Button/Button.vue'
const props = defineProps({
  // Type: celebration, confirmation
  type: {
    type: String,
    default: 'celebration',
    validator: (value) => ['celebration', 'confirmation'].includes(value),
  },
  // Background: purple, white (only for confirmation)
  background: {
    type: String,
    default: 'purple',
    validator: (value) => ['purple', 'white'].includes(value),
  },
  // Title text
  title: {
    type: String,
    required: true,
  },
  // Description text
  description: {
    type: String,
    default: '',
  },
  // Illustration (emoji or image URL)
  illustration: {
    type: String,
    default: '🎉',
  },
  // Primary button text
  primaryButton: {
    type: String,
    default: '',
  },
  // Secondary button text
  secondaryButton: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['primary-click', 'secondary-click'])

const handlePrimaryClick = () => {
  emit('primary-click')
}

const handleSecondaryClick = () => {
  emit('secondary-click')
}

// Background color based on type and background prop
const bgColor = computed(() => {
  if (props.type === 'celebration') {
    return 'bg-primary-purple' // ✅ Changed to purple
  }
  return props.background === 'purple' ? 'bg-primary-purple' : 'bg-white'
})

// Text color
const textColor = computed(() => {
  return props.background === 'white' && props.type === 'confirmation'
    ? 'text-content-primary'
    : 'text-white'
})

const descColor = computed(() => {
  return props.background === 'white' && props.type === 'confirmation'
    ? 'text-content-secondary'
    : 'text-white/90'
})

// Button styles
const primaryButtonClass = computed(() => {
  if (props.background === 'white' && props.type === 'confirmation') {
    return 'bg-primary-purple text-white hover:opacity-90' // ✅ Purple button on white
  }
  return 'bg-white text-primary-purple hover:opacity-90' // ✅ White button on purple
})

const secondaryButtonClass = computed(() => {
  if (props.background === 'white' && props.type === 'confirmation') {
    return 'border-2 border-gray-300 text-content-primary hover:bg-background-elevated'
  }
  return 'border-2 border-white text-white hover:bg-white/10'
})
</script>

<template>
  <div :class="['min-h-screen flex flex-col items-center justify-center px-6 py-12', bgColor]">
    <!-- Illustration -->
    <div class="mb-8">
      <!-- If it's an emoji or simple text -->
      <div v-if="!illustration.includes('.')" class="text-9xl mb-4">
        {{ illustration }}
      </div>
      <!-- If it's an image URL -->
      <img v-else :src="illustration" :alt="title" class="w-64 h-64 object-contain mb-4" />
    </div>

    <!-- Title -->
    <h1 :class="[' display-small sm:display-medium  mb-4 max-w-xl text-center', textColor]">
      {{ title }}
    </h1>

    <!-- Description -->
    <p
      v-if="description"
      :class="['body-large mb-12 max-w-xl text-center leading-relaxed', descColor]"
    >
      {{ description }}
    </p>

    <!-- Buttons -->
    <div class="w-full max-w-xl space-y-4">
      <!-- Primary Button -->

      <Button variant="primary-reversed" class="w-full" size="large " @click="handlePrimaryClick">
        {{ primaryButton }}</Button
      >

      <Button
        variant="outline"
        class="w-full text-white"
        size="large "
        @click="handleSecondaryClick"
      >
        {{ secondaryButton }}</Button
      >
    </div>

    <!-- Slot for custom actions -->
    <div v-if="$slots.actions" class="mt-6 w-full max-w-xl">
      <slot name="actions" />
    </div>
  </div>
</template>
