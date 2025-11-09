<!-- components/molecules/CountryCard/CountryCard.vue -->
<script setup>
import Text from '@/components/atoms/Text/Text.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  countryCode: {
    type: String,
    required: true,
  },
  countryName: {
    type: String,
    required: true,
  },
  features: {
    type: Array,
    default: () => [],
    // Example: [{ icon: 'check', text: 'Lokale Währung' }]
  },
})
</script>

<template>
  <div class="border border-stone-200 rounded-2xl p-4">
    <!-- Top: Flag + Country Name -->
    <div class="flex items-center gap-3 mb-3">
      <!-- Flag Icon (rounded with wrapper) -->
      <div class="flex-shrink-0">
        <span
          :class="`fi fi-${countryCode.toLowerCase()}`"
          class="text-3xl rounded-full overflow-hidden inline-block w-10 h-10 bg-fill bg-center"
          style="box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1)"
        ></span>
      </div>

      <!-- Country Name -->
      <Text variant="body-default-bold" color="content-primary">
        {{ countryName }}
      </Text>
    </div>

    <!-- Bottom: Features (icons with text) -->
    <div v-if="features.length > 0" class="space-y-2">
      <div v-for="(feature, index) in features" :key="index" class="flex items-center gap-2">
        <Icon :name="feature.icon" :size="16" color="var(--color-stone-600)" />
        <Text variant="body-default" color="content-secondary" class="text-sm">
          {{ feature.text }}
        </Text>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure flag icons are properly rounded */
.fi {
  border-radius: 50%;
}
</style>
