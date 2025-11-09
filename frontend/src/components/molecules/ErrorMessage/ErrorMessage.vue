<!-- components/molecules/ErrorMessage.vue -->
<script setup>
import Text from '@/components/atoms/Text/Text.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

defineProps({
  message: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div v-if="message" class="flex items-center gap-1 mt-1">
    <Icon name="info" :size="18" color="text-sentiment-negative" />
    <Text variant="body-default" color="sentiment-negative">{{ message }}</Text>
  </div>
</template>
