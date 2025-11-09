<!-- components/organisms/ProductDetailsTab/ProductDetailsTab.vue -->
<script setup>
import { computed } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'
import RenderHTML from '@/components/atoms/RenderHTML/RenderHTML.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('de-CH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0)
}

// Get status label
const getStatusLabel = (status) => {
  const labels = {
    active: 'Aktiv',
    draft: 'Entwurf',
    inactive: 'Inaktiv',
    pending: 'In Prüfung',
    declined: 'Abgelehnt',
  }
  return labels[status] || status
}
</script>

<template>
  <div class="space-y-6">
    <!-- Product Information -->
    <div class="space-y-2">
      <div>
        <Text variant="body-default-bold" color="content-secondary">Produktinformation</Text>
      </div>
      <div class="border-b border-stone-300"></div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        <!-- Left Column -->
        <div class="space-y-6">
          <div class="flex flex-col">
            <Text color="content-secondary" variant="body-default">Produkt Name</Text>
            <Text variant="body-default">{{ product.productName }}</Text>
          </div>

          <div class="flex flex-col">
            <Text color="content-secondary" variant="body-default">Kategorie</Text>
            <Text variant="body-default">{{ product.category }}</Text>
          </div>

          <div class="flex flex-col">
            <Text color="content-secondary" variant="body-default">Beschreibung</Text>
            <RenderHTML
              v-if="product.description"
              :html="product.description"
              variant="body-default"
            />
            <Text v-else variant="body-default">Keine Beschreibung</Text>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <div class="flex flex-col">
            <Text color="content-secondary" variant="body-default">Preis</Text>
            <Text variant="body-default">
              {{ product.currency }} {{ formatCurrency(product.price) }}
            </Text>
          </div>

          <div class="flex flex-col">
            <Text color="content-secondary" variant="body-default">Status</Text>
            <Text variant="body-default">{{ getStatusLabel(product.status) }}</Text>
          </div>

          <div v-if="product.accountType === 'vendor'" class="flex flex-col">
            <Text color="content-secondary" variant="body-default">Bestand</Text>
            <Text variant="body-default">
              {{ product.inventory === -1 ? 'Unbegrenzt' : product.inventory }}
            </Text>
          </div>

          <div v-if="product.accountType === 'creator'" class="flex flex-col">
            <Text color="content-secondary" variant="body-default">Download Link</Text>
            <Text variant="body-default">{{ product.downloadLink || 'Nicht gesetzt' }}</Text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
