<!-- components/molecules/MetricsCard/MetricsCard.vue -->
<script setup>
import { computed } from 'vue'
import Card from '@/components/atoms/Card/Card.vue'
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  metrics: {
    type: Array,
    required: true,
  },
  variant: {
    type: String,
    default: 'card',
    validator: (v) => ['default', 'outlined', 'dashed', 'elevated', 'card', 'ghost'].includes(v),
  },
  rounded: {
    type: String,
    default: 'rounded-xl',
  },
  columns: {
    type: Number,
    default: null,
  },
})

const gridColumns = computed(() => {
  if (props.columns) return props.columns

  const count = props.metrics.length
  if (count <= 2) return 2
  if (count === 3) return 3
  if (count === 4) return 4
  return 3
})

const gridClass = computed(() => {
  return `grid-cols-1 md:grid-cols-${gridColumns.value}`
})
</script>

<template>
  <div>
    <Text v-if="title" variant="title-subsection" as="h3" class="mb-4">
      {{ title }}
    </Text>
    <Card :variant="variant" :rounded="rounded">
      <div class="p-6">
        <div :class="['grid gap-6', gridClass]">
          <div v-for="(metric, index) in metrics" :key="index" class="text-center">
            <Text variant="body-default" class="mb-1">{{ metric.label }}</Text>
            <div class="flex items-baseline gap-1 justify-center">
              <Text variant="title-subsection" as="span">{{ metric.value }}</Text>
              <Text v-if="metric.suffix" variant="title-subsection" as="span">
                {{ metric.suffix }}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
