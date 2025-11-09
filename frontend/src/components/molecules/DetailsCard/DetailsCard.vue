<!-- components/molecules/DetailsCard/DetailsCard.vue -->
<script setup>
import Text from '@/components/atoms/Text/Text.vue'

defineProps({
  title: {
    type: String,
    default: 'Details',
  },
  items: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every((item) => item.label && item.value !== undefined)
    },
  },
})
</script>

<template>
  <div class="bg-white border border-stone-300 rounded-xl p-6 space-y-4">
    <Text variant="title-subsection" color="content-primary">{{ title }}</Text>

    <div class="space-y-3">
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="[
          'flex justify-between py-2',
          index < items.length - 1 ? 'border-b border-stone-200' : '',
        ]"
      >
        <Text variant="body-default" color="content-secondary">{{ item.label }}</Text>

        <!-- If item has custom slot content (like status with dot) -->
        <div v-if="item.status" class="flex items-center gap-2">
          <div :class="['w-2 h-2 rounded-full', item.statusColor || 'bg-green-500']"></div>
          <Text variant="body-default" color="content-primary">{{ item.value }}</Text>
        </div>

        <!-- Regular value -->
        <Text v-else variant="body-default" color="content-primary">{{ item.value }}</Text>
      </div>
    </div>
  </div>
</template>
