<!-- components/molecules/ProductCard/ProductCard.vue -->
<script setup>
import Text from '@/components/atoms/Text/Text.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import RenderHTML from '@/components/atoms/RenderHTML/RenderHTML.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  isAffiliate: {
    type: Boolean,
    default: false,
  },
  categoryLabel: {
    type: String,
    default: '',
  },
  categoryIcon: {
    type: String,
    default: 'package',
  },
  categoryColor: {
    type: String,
    default: 'bg-stone-100 text-stone-600',
  },
})

const emit = defineEmits(['click', 'join-affiliate'])

const getFirstLetter = (name) => {
  return name ? name.charAt(0).toUpperCase() : '?'
}

const handleClick = () => {
  emit('click', props.product)
}

const handleJoinAffiliate = (event) => {
  event.stopPropagation()
  emit('join-affiliate', props.product)
}
</script>

<template>
  <div
    class="group bg-white border border-stone-200 rounded-2xl p-6 hover:border-primary-purple hover:shadow-lg transition-all cursor-pointer"
    @click="handleClick"
  >
    <!-- Product Header -->
    <div class="flex items-start gap-4 mb-4">
      <!-- Product Icon/Avatar -->
      <div
        v-if="product.iconUrl"
        class="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-stone-200"
      >
        <img :src="product.iconUrl" :alt="product.productName" class="w-full h-full object-cover" />
      </div>
      <div
        v-else
        class="w-14 h-14 rounded-full bg-black flex items-center justify-center flex-shrink-0"
      >
        <Text variant="title-subsection" style="color: #d4af37">
          {{ getFirstLetter(product.productName) }}
        </Text>
      </div>

      <!-- Product Info -->
      <div class="flex-1 min-w-0">
        <Text variant="body-default-bold" color="content-primary" class="mb-1">
          {{ product.productName }}
        </Text>

        <!-- Category Badge -->
        <div
          class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs"
          :class="categoryColor"
        >
          <Icon :name="categoryIcon" :size="14" />
          <span class="font-medium">{{ categoryLabel }}</span>
        </div>
      </div>

      <!-- Price -->
      <div class="text-right flex-shrink-0">
        <Text variant="title-subsection" color="content-primary">
          {{ product.currency }} {{ product.price }}
        </Text>
      </div>
    </div>

    <!-- Product Description with RenderHTML -->
    <div class="mb-4">
      <RenderHTML
        v-if="product.description"
        :html="product.description"
        variant="body-default"
        color="content-secondary"
        :max-lines="2"
      />
      <Text v-else variant="body-default" color="content-secondary" class="line-clamp-2">
        Keine Beschreibung verfügbar
      </Text>
    </div>

    <!-- Product Stats -->
    <div class="flex items-center gap-6 mb-4 text-sm">
      <div class="flex items-center gap-1.5">
        <Icon name="users" :size="16" class="text-stone-400" />
        <Text variant="body-default" color="content-tertiary">
          {{ product.soldCount || 0 }} Verkäufe
        </Text>
      </div>
      <div class="flex items-center gap-1.5">
        <Icon name="percent" :size="16" class="text-stone-400" />
        <Text variant="body-default" color="content-tertiary">
          {{ product.affiliateSettings?.defaultCommission || 20 }}% Provision
        </Text>
      </div>
    </div>

    <!-- Action Button -->
    <Button
      v-if="isAffiliate"
      variant="primary"
      size="small"
      class="w-full"
      @click="handleJoinAffiliate"
    >
      <Icon name="link" :size="16" class="mr-2" />
      Affiliate werden
    </Button>
    <Button v-else variant="outline" size="small" class="w-full"> Details ansehen </Button>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
