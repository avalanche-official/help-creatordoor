<!-- components/molecules/StatsCard/StatsCard.vue -->
<script setup>
import Icon from '@/components/atoms/Icon/Icon.vue'
import Text from '@/components/atoms/Text/Text.vue'

defineProps({
  icon: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  iconColor: {
    type: String,
    default: '#7a7a85',
  },
})
</script>

<template>
  <div class="bg-stone-100 rounded-xl p-6">
    <div class="flex items-center gap-2 mb-2">
      <Icon :name="icon" :size="20" :color="iconColor" />
      <Text variant="body-default" color="content-secondary">{{ label }}</Text>
    </div>
    <Text variant="title-section" color="content-primary">{{ value }}</Text>
  </div>
</template>
