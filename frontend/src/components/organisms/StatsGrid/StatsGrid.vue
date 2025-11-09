<!-- components/organisms/StatsGrid/StatsGrid.vue -->
<script setup>
import StatsCard from '@/components/molecules/StatsCard/StatsCard.vue'

defineProps({
  stats: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(
        (stat) => stat.icon && stat.label && (stat.value !== undefined || stat.value !== null),
      )
    },
  },
})
</script>

<template>
  <!-- Mobile: Horizontal Scroll -->
  <div class="md:hidden">
    <div class="overflow-x-auto scrollbar-hide">
      <div class="flex gap-4 min-w-min pb-2">
        <div v-for="(stat, index) in stats" :key="index" class="flex-shrink-0 w-[280px]">
          <StatsCard
            :icon="stat.icon"
            :label="stat.label"
            :value="stat.value"
            :icon-color="stat.iconColor || '#7a7a85'"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Desktop: Grid -->
  <div class="hidden md:grid grid-cols-3 gap-4">
    <StatsCard
      v-for="(stat, index) in stats"
      :key="index"
      :icon="stat.icon"
      :label="stat.label"
      :value="stat.value"
      :icon-color="stat.iconColor || '#7a7a85'"
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
