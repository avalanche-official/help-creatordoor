<!-- components/organisms/PaymentMethodsList/PaymentMethodsList.vue -->
<script setup>
import { computed } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  methods: {
    type: Array,
    required: true,
  },
})

// ✅ Create SVG data URLs for payment icons
const getPaymentIconSvg = (iconName) => {
  const svgMap = {
    // Cards
    generic:
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzUwIiBoZWlnaHQ9IjQ3MSIgdmlld0JveD0iMCAwIDc1MCA0NzEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9Ijc1MCIgaGVpZ2h0PSI0NzEiIHJ4PSI0MCIgZmlsbD0iI0VCRUJFQiIvPjwvc3ZnPg==',
    cartes_bancaires: 'data:image/svg+xml;base64,...', // Add actual base64
  }

  // If no SVG mapping, use Unpkg CDN
  const iconNameMap = {
    generic: 'generic',
    cartes_bancaires: 'cartes-bancaires',
    applepay: 'applepay',
    googlepay: 'googlepay',
    paypal: 'paypal',
    link: 'stripe',
    alipay: 'alipay',
    wechat: 'wechatpay',
    amazon: 'amazon',
    mbway: 'mbway',
    multibanco: 'multibanco',
    bancontact: 'bancontact',
    eps: 'eps',
    giropay: 'giropay',
    ideal: 'ideal',
    przelewy24: 'generic',
    sofort: 'generic',
    twint: 'twint',
    billie: 'generic',
    klarna: 'klarna',
    affirm: 'affirm',
    ach: 'ach',
    sepa: 'sepa',
    bank: 'generic',
  }

  const mappedName = iconNameMap[iconName] || 'generic'
  // Use Unpkg to get SVG from react-pay-icons package
  return `https://unpkg.com/react-pay-icons@latest/lib/${mappedName}.svg`
}

// Group methods by type
const groupedMethods = computed(() => {
  const groups = {}
  props.methods.forEach((method) => {
    if (!groups[method.type]) {
      groups[method.type] = []
    }
    groups[method.type].push(method)
  })
  return groups
})

// Fallback Lucide icon
const getFallbackIcon = (methodId) => {
  const iconMap = {
    card: 'credit-card',
    paypal: 'wallet',
    applepay: 'smartphone',
    googlepay: 'smartphone',
  }
  return iconMap[methodId] || 'credit-card'
}

const handleImageError = (event, methodId) => {
  event.target.style.display = 'none'
  event.target.nextElementSibling.style.display = 'flex'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Loop through each type group -->
    <div v-for="(methods, type) in groupedMethods" :key="type" class="space-y-3">
      <!-- Type Header -->
      <div class="flex items-center gap-2 pb-2 border-b border-stone-200">
        <Text
          variant="body-default-bold"
          color="content-primary"
          class="uppercase text-xs tracking-wide"
        >
          {{ type }}
        </Text>
        <span class="text-xs text-content-tertiary">({{ methods.length }})</span>
      </div>

      <!-- Methods in this type -->
      <div class="grid grid-cols-1 gap-3">
        <div
          v-for="method in methods"
          :key="method.id"
          class="border border-stone-200 rounded-xl p-4 hover:border-primary-purple hover:bg-purple-50/30 transition-all group cursor-pointer"
        >
          <div class="flex items-start gap-3">
            <!-- Payment Icon -->
            <div class="flex-shrink-0 mt-0.5">
              <div
                class="w-12 h-12 rounded-lg bg-white border border-stone-200 flex items-center justify-center p-2 group-hover:border-primary-purple transition-colors"
              >
                <!-- SVG Image -->
                <img
                  :src="getPaymentIconSvg(method.icon)"
                  :alt="method.name"
                  class="w-full h-full object-contain"
                  loading="lazy"
                  @error="(e) => handleImageError(e, method.id)"
                />

                <!-- Fallback Icon -->
                <Icon
                  :name="getFallbackIcon(method.id)"
                  :size="24"
                  color="text-primary-purple"
                  style="display: none"
                />
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1 flex-wrap">
                <Text variant="body-default-bold" color="content-primary" class="truncate">
                  {{ method.name }}
                </Text>
                <span
                  v-if="method.popular"
                  class="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full flex-shrink-0"
                >
                  <Icon name="star" :size="12" />
                  Beliebt
                </span>
              </div>
              <Text variant="body-default" color="content-secondary" class="text-sm mb-2">
                {{ method.description }}
              </Text>
              <div class="flex items-center gap-1">
                <Icon name="map-pin" :size="12" color="text-content-tertiary" />
                <Text variant="body-default" color="content-tertiary" class="text-xs">
                  {{ method.regions.join(', ') }}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
