<!-- components/organisms/AffiliatesList/AffiliatesList.vue -->
<script setup>
import Text from '@/components/atoms/Text/Text.vue'
import AffiliateItem from '@/components/molecules/AffiliateItem/AffiliateItem.vue'
import EmptyState from '@/components/templates/EmptyState/EmptyState.vue'

const props = defineProps({
  affiliates: {
    type: Array,
    default: () => [],
  },
  emptyStateImage: {
    type: String,
    required: true,
  },
  emptyStateTitle: {
    type: String,
    default: 'No affiliates yet',
  },
  emptyStateDescription: {
    type: String,
    default: 'Start sharing your link to get your first affiliates',
  },
})

const emit = defineEmits(['affiliateClick'])

const handleAffiliateClick = (affiliate) => {
  emit('affiliateClick', affiliate)
}
</script>

<template>
  <div class="space-y-4 border p-6 rounded-2xl border-stone-300">
    <!-- Header -->
    <div class="border-b border-stone-300 pb-1">
      <Text variant="body-default-bold" color="content-primary">Deine Affiliates</Text>
    </div>

    <!-- Affiliates List -->
    <div v-if="affiliates.length > 0" class="space-y-3">
      <AffiliateItem
        v-for="(affiliate, index) in affiliates"
        :key="index"
        :name="affiliate.name"
        :email="affiliate.email"
        :avatar="affiliate.avatar"
        :avatar-src="affiliate.avatarSrc"
        :status="affiliate.status"
        :earnings="affiliate.earnings"
        :date="affiliate.date"
        @click="handleAffiliateClick(affiliate)"
      />
    </div>

    <!-- Empty State -->
    <EmptyState
      v-else
      :image-src="emptyStateImage"
      :title="emptyStateTitle"
      :subtitle="emptyStateDescription"
      :image-width="200"
      :image-height="200"
    />
  </div>
</template>
