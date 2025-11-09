<!-- components/organisms/CountryList/CountryList.vue -->
<script setup>
import CountryCard from '@/components/molecules/CountryCard/CountryCard.vue'

const props = defineProps({
  countries: {
    type: Array,
    required: true,
    // Example: [{ code: 'de', name: 'Deutschland', features: [...] }]
  },
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <CountryCard
      v-for="country in countries"
      :key="country.code"
      :country-code="country.code"
      :country-name="country.name"
      :features="country.features"
    />
  </div>
</template>
