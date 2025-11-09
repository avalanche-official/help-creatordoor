<!-- components/organisms/CountdownGrid/CountdownGrid.vue -->
<script setup>
import CountdownCard from '@/components/molecules/CountdownCard/CountdownCard.vue'

defineProps({
  countdowns: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every((countdown) => countdown.label && countdown.targetDate)
    },
  },
})
</script>

<template>
  <!-- Mobile: Horizontal Scroll -->
  <div class="md:hidden">
    <div class="overflow-x-auto scrollbar-hide">
      <div class="flex gap-4 min-w-min pb-2">
        <div v-for="(countdown, index) in countdowns" :key="index" class="flex-shrink-0 w-[280px]">
          <CountdownCard
            :icon="countdown.icon || 'clock'"
            :label="countdown.label"
            :target-date="countdown.targetDate"
            :icon-color="countdown.iconColor || '#7a7a85'"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Desktop: Grid -->
  <div class="hidden md:grid grid-cols-2 gap-4">
    <CountdownCard
      v-for="(countdown, index) in countdowns"
      :key="index"
      :icon="countdown.icon || 'clock'"
      :label="countdown.label"
      :target-date="countdown.targetDate"
      :icon-color="countdown.iconColor || '#7a7a85'"
    />
  </div>
</template>

<style scoped>
/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
