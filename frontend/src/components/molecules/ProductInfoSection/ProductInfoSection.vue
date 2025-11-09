<!-- components/molecules/ProductInfoSection/ProductInfoSection.vue -->
<script setup>
import Text from '@/components/atoms/Text/Text.vue'
import RenderHTML from '@/components/atoms/RenderHTML/RenderHTML.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  fields: {
    type: Array,
    required: true,
    // Expected format: [{ label: 'Name', value: 'Product', type: 'text' }]
  },
  columns: {
    type: Number,
    default: 2,
    validator: (v) => [1, 2].includes(v),
  },
})

const formatValue = (field) => {
  if (field.type === 'html' && field.value) {
    return field.value
  }
  return field.value || 'Keine Angabe'
}
</script>

<template>
  <div class="space-y-2">
    <!-- Section Title -->
    <div>
      <Text variant="body-default-bold" color="content-secondary">{{ title }}</Text>
    </div>
    <div class="border-b border-stone-300"></div>

    <!-- Fields Grid -->
    <div
      :class="['gap-6 py-4', columns === 2 ? 'grid grid-cols-1 md:grid-cols-2' : 'flex flex-col']"
    >
      <div v-for="(field, index) in fields" :key="index" class="flex flex-col">
        <Text color="content-secondary" variant="body-default">{{ field.label }}</Text>

        <!-- HTML Content -->
        <RenderHTML
          v-if="field.type === 'html' && field.value"
          :html="field.value"
          variant="body-default"
        />

        <!-- Regular Text -->
        <Text v-else variant="body-default">{{ formatValue(field) }}</Text>
      </div>
    </div>
  </div>
</template>
