<!-- components/organisms/SummaryList/SummaryList.vue -->
<script setup>
import Summary from '@/components/molecules/Summary/Summary.vue'

defineProps({
  items: {
    type: Array,
    required: true,
    // Example: [
    //   {
    //     status: 'done',
    //     title: 'You verified your address',
    //     description: '10 Downing Street, Westminster, London SW1A 2AA',
    //     actionText: 'Edit address',
    //   }
    // ]
  },
})

const emit = defineEmits(['action-click', 'info-click'])

const handleActionClick = (item, index) => {
  emit('action-click', { item, index })
}

const handleInfoClick = (item, index) => {
  emit('info-click', { item, index })
}
</script>

<template>
  <Summary
    v-for="(item, index) in items"
    :key="index"
    :status="item.status"
    :icon="item.icon"
    :title="item.title"
    :description="item.description"
    :action-text="item.actionText"
    :show-info="item.showInfo"
    @action-click="handleActionClick(item, index)"
    @info-click="handleInfoClick(item, index)"
  />
</template>
