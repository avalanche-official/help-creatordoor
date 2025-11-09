<!-- components/molecules/BalanceCard/BalanceCard.vue -->
<script setup>
import Card from '@/components/atoms/Card/Card.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

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
  currency: {
    type: String,
    default: 'CHF',
  },
  metrics: {
    type: Array,
    default: () => [],
    // Expected format: [
    //   { label: 'Bereit für Auszahlung', value: 'Ja' },
    //   { label: 'Nächste Auszahlung', value: '2024-01-15' },
    // ]
  },
  iconColor: {
    type: String,
    default: '#7a7a85',
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'outlined', 'card'].includes(v),
  },
})
</script>

<template>
  <Card :variant="variant" rounded="rounded-xl">
    <div class="p-6">
      <!-- Header with Icon and Label -->
      <div class="flex items-center gap-2 mb-4">
        <Icon :name="icon" :size="20" :color="iconColor" />
        <Text variant="body-3-semibold">{{ label }}</Text>
      </div>

      <!-- Main Value -->
      <div class="mb-2">
        <Text variant="display-small" as="span">{{ value }}</Text>
        <Text variant="body-default" class="ml-1" as="span">{{ currency }}</Text>
      </div>

      <!-- Additional Metrics -->
      <div v-if="metrics.length > 0" class="space-y-2 mt-4 pt-4 border-t border-stone-200">
        <div v-for="(metric, index) in metrics" :key="index" class="flex justify-between">
          <Text variant="body-default" class="text-xs">{{ metric.label }}</Text>
          <Text v-if="metric.value" variant="body-default" class="text-xs">{{ metric.value }}</Text>
        </div>
      </div>
    </div>
  </Card>
</template>
