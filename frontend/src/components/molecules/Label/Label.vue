<!-- components/molecules/Label.vue -->
<script setup>
import Text from '@/components/atoms/Text/Text.vue'

defineProps({
  text: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  htmlFor: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <label :for="htmlFor" class="block mb-1">
    <Text variant="body-default-bold" color="content-secondary">
      {{ text }}
      <Text v-if="required" color="sentiment-negative">*</Text>
    </Text>
  </label>
</template>
