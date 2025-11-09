<!-- components/molecules/ProductCard/ProductCard.vue -->
<!-- ✅ UPDATED: Shows "Warnung" status when Stripe not connected -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductCreationStore } from '@/stores/productCreationStore'
import { useAccountTypeStore } from '@/stores/accountTypeStore'
import { useStripeStore } from '@/stores/stripeStore' // ✅ NEW
import { analyticsService } from '@/services/database/analyticsService'
import Card from '@/components/atoms/Card/Card.vue'
import IconButton from '@/components/molecules/IconButton/IconButton.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Chip from '../Chip/Chip.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Modal from '@/components/molecules/Modal/Modal.vue'
import Icon from '@/components/atoms/Icon/Icon.vue' // ✅ NEW

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['click', 'edit'])
const router = useRouter()
const productStore = useProductCreationStore()
const accountTypeStore = useAccountTypeStore()
const stripeStore = useStripeStore() // ✅ NEW

// Modal state
const showRejectionModal = ref(false)
const showStripeWarningModal = ref(false) // ✅ NEW

// ✅ Actual earnings from analytics
const actualEarnings = ref(0)
const loadingEarnings = ref(false)

// ✅ Check current account type
const isAffiliate = computed(() => accountTypeStore.selectedAccountType === 'affiliate')
const isVendor = computed(() => accountTypeStore.selectedAccountType === 'vendor')

// Check product status
const isDraft = computed(() => props.product.status === 'draft')
const isPending = computed(() => props.product.status === 'pending')
const isActive = computed(() => props.product.status === 'active')
const isDeclined = computed(() => props.product.status === 'declined')

// ✅ NEW: Check if Stripe is connected
const isStripeConnected = computed(() => stripeStore.isConnected)

// ✅ NEW: Priority status - Stripe warning overrides everything except draft
const hasStripeWarning = computed(
  () => !isStripeConnected.value && !isDraft.value && isVendor.value,
)

// ✅ UPDATED: Status chip configuration with Stripe warning priority
const statusChip = computed(() => {
  // ✅ PRIORITY 1: Stripe not connected = Warnung (but not for drafts)
  if (hasStripeWarning.value) {
    return {
      text: 'Warnung',
      variant: 'warning',
    }
  }

  // PRIORITY 2: Regular statuses
  if (isDraft.value) {
    return {
      text: 'Entwurf',
      variant: 'neutral',
    }
  }
  if (isPending.value) {
    return {
      text: 'In Prüfung',
      variant: 'primaryLight',
    }
  }
  if (isActive.value) {
    return {
      text: 'Aktiv',
      variant: 'primaryLight',
    }
  }
  if (isDeclined.value) {
    return {
      text: 'Abgelehnt',
      variant: 'neutral',
    }
  }
  return {
    text: props.product.status,
    variant: 'neutral',
  }
})

// ✅ Load actual earnings on mount (for active products only)
onMounted(async () => {
  if (isActive.value && isVendor.value) {
    await loadActualEarnings()
  }
})

// ✅ Load actual earnings from analytics
const loadActualEarnings = async () => {
  loadingEarnings.value = true
  try {
    // Get all-time analytics for this specific product
    const analytics = await analyticsService.getVendorAnalytics(props.product.userId, 365)

    // Find earnings for this specific product
    const productData = analytics.topProducts?.find((p) => p.productId === props.product.$id)
    actualEarnings.value = productData?.revenue || 0

    console.log(`💰 Loaded earnings for ${props.product.productName}:`, actualEarnings.value)
  } catch (error) {
    console.error('Error loading earnings:', error)
    actualEarnings.value = 0
  } finally {
    loadingEarnings.value = false
  }
}

// ✅ Format number with K/M abbreviation
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  }
  return num.toFixed(2)
}

// ✅ Format price based on account type
const formattedPrice = computed(() => {
  const currency = props.product.currency || 'CHF'
  const productPrice = parseFloat(props.product.price) || 0
  let price = 0

  if (isAffiliate.value) {
    // For affiliates: show affiliate commission
    const commissionRate = props.product.affiliateSettings?.defaultCommission || 20
    price = (productPrice * commissionRate) / 100
    return `${getCurrencySymbol(currency)} ${formatNumber(price)}`
  } else if (isVendor.value && isActive.value) {
    // ✅ For active vendor products: show actual earnings
    price = actualEarnings.value
    return `${getCurrencySymbol(currency)} ${formatNumber(price)}`
  } else {
    // ❌ OLD - showing estimated earnings for draft/pending
    // price = productPrice * 0.961

    // ✅ NEW - show actual product price for draft/pending
    price = productPrice
    return `${getCurrencySymbol(currency)} ${formatNumber(price)}`
  }
})

// ✅ Get currency symbol
const getCurrencySymbol = (currency) => {
  const currencySymbols = {
    EUR: '€',
    USD: '$',
    GBP: '£',
    CHF: 'CHF',
  }
  return currencySymbols[currency] || currency
}

// ✅ Earnings label based on account type and status
const earningsLabel = computed(() => {
  if (isAffiliate.value) {
    return 'Provision'
  }
  if (isActive.value && isVendor.value) {
    return 'Verdient' // Actual earnings for active products
  }
  // For draft/pending vendor products
  return 'Preis' // Show it's the price, not earnings yet
})

// Product icon based on account type
const productIcon = computed(() => {
  return props.product.accountType === 'creator' ? 'download' : 'package'
})

// Check if product has uploaded icon
const hasProductIcon = computed(() => {
  return props.product.iconUrl && props.product.iconUrl.trim() !== ''
})

// Check if product has thumbnail
const hasThumbnail = computed(() => {
  return props.product.thumbnailUrl && props.product.thumbnailUrl.trim() !== ''
})

// Progressive draft state: determine what to show
const draftDisplayState = computed(() => {
  if (hasProductIcon.value && hasThumbnail.value) {
    return 'full'
  }
  if (hasThumbnail.value && !hasProductIcon.value) {
    return 'thumbnail-only'
  }
  if (hasProductIcon.value && !hasThumbnail.value) {
    return 'icon-only'
  }
  return 'empty'
})

// Text color based on status
const textColor = computed(() => {
  if (isDraft.value) {
    if (hasThumbnail.value) return 'white'
    return 'content-primary'
  }
  return 'white'
})

// Background styling with overlay
const cardBackgroundStyle = computed(() => {
  if (
    (isDeclined.value ||
      isPending.value ||
      isActive.value ||
      isDraft.value ||
      hasStripeWarning.value) &&
    hasThumbnail.value
  ) {
    return {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props.product.thumbnailUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }
  return {}
})

// ✅ UPDATED: Handle card click with Stripe warning priority
const handleClick = async () => {
  emit('click', props.product)

  // ✅ PRIORITY 1: Stripe warning
  if (hasStripeWarning.value) {
    console.log('⚠️ Stripe not connected, showing warning')
    showStripeWarningModal.value = true
    return
  }

  // PRIORITY 2: Regular statuses
  if (isDraft.value) {
    console.log('📝 Resuming draft product:', props.product.$id)
    productStore.resetStore()
    router.push({
      path: '/products/create',
      query: { productId: props.product.$id },
    })
  } else if (isPending.value) {
    console.log('⏳ Viewing pending product:', props.product.$id)
    router.push(`/dashboard/products/${props.product.$id}`)
  } else if (isDeclined.value) {
    console.log('❌ Editing declined product:', props.product.$id)
    productStore.resetStore()
    router.push({
      path: '/products/create',
      query: { productId: props.product.$id },
    })
  } else {
    router.push(`/dashboard/products/${props.product.$id}`)
  }
}

// Handle edit button click (for draft products only)
const handleEditClick = (event) => {
  event.stopPropagation()
  emit('edit', props.product)
  console.log('✏️ Editing product:', props.product.$id)
  productStore.resetStore()
  router.push({
    path: '/products/create',
    query: { productId: props.product.$id },
  })
}

// ✅ NEW: Handle "Mehr erfahren" for Stripe warning
const handleLearnMoreStripe = (event) => {
  event.stopPropagation()
  showStripeWarningModal.value = true
}

// Handle "Learn More" button click for declined products
const handleLearnMore = (event) => {
  event.stopPropagation()
  showRejectionModal.value = true
}

// ✅ NEW: Navigate to Stripe connection page
const handleConnectStripe = () => {
  showStripeWarningModal.value = false
  router.push('/dashboard/payment')
}

// Close rejection modal
const closeRejectionModal = () => {
  showRejectionModal.value = false
}

// ✅ NEW: Close Stripe warning modal
const closeStripeWarningModal = () => {
  showStripeWarningModal.value = false
}
</script>

<template>
  <div>
    <Card
      class="border-1 border-primary-purple"
      bg="bg-stone-100"
      variant="default"
      :clickable="true"
      :class="[
        'h-50 p-4 flex flex-col justify-between overflow-hidden transition-all bg-stone relative',
        isDraft && 'hover:brightness-95',
      ]"
      :style="cardBackgroundStyle"
      @click="handleClick"
    >
      <!-- Top Section: Product Icon or Edit Button + Product Name -->
      <div class="flex items-center gap-3">
        <!-- For Active/Pending/Declined Products with Icon -->
        <div
          v-if="(isActive || isPending || isDeclined || hasStripeWarning) && hasProductIcon"
          class="w-12 h-12 rounded-full border-2 border-white overflow-hidden flex-shrink-0 shadow-md"
        >
          <img
            :src="product.iconUrl"
            :alt="product.productName"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- For Draft Products: Progressive Display -->
        <template v-else-if="isDraft">
          <div
            v-if="draftDisplayState === 'full'"
            class="w-12 h-12 rounded-full border-2 border-white overflow-hidden flex-shrink-0 shadow-md"
          >
            <img
              :src="product.iconUrl"
              :alt="product.productName"
              class="w-full h-full object-cover"
            />
          </div>

          <div
            v-else-if="draftDisplayState === 'icon-only'"
            class="w-12 h-12 rounded-full border-2 border-stone-300 overflow-hidden flex-shrink-0"
          >
            <img
              :src="product.iconUrl"
              :alt="product.productName"
              class="w-full h-full object-cover"
            />
          </div>

          <IconButton
            v-else
            icon="pencil"
            variant="darkneutral"
            :class="draftDisplayState === 'thumbnail-only' ? '' : 'bg-stone-300'"
            size="large"
            aria-label="Edit product"
            :group-hover="true"
            @click="handleEditClick"
          />
        </template>

        <!-- Fallback icon -->
        <IconButton
          v-else
          :icon="productIcon"
          variant="darkNeutral"
          size="large"
          aria-label="Product"
          :group-hover="true"
        />

        <!-- Product Name -->
        <Text variant="body-large-bold" :color="textColor" class="line-clamp-1">
          {{ product.productName }}
        </Text>
      </div>

      <!-- Bottom Section: Price/Button (left) + Status Chip (right) -->
      <div class="flex items-end justify-between mt-auto">
        <!-- ✅ NEW: For Stripe Warning: Show "Mehr erfahren" Button -->
        <Button
          v-if="hasStripeWarning"
          variant="link"
          font-size="link-default"
          class="text-white hover:text-white/80"
          @click="handleLearnMoreStripe"
        >
          Mehr erfahren
        </Button>

        <!-- For Declined: Show "Learn More" Button -->
        <Button
          v-else-if="isDeclined"
          variant="link"
          font-size="link-default"
          class="text-white hover:text-white/80"
          @click="handleLearnMore"
        >
          Mehr erfahren
        </Button>

        <!-- ✅ For Active: Show Actual Earnings -->
        <div v-else-if="isActive" class="flex flex-col">
          <Text variant="body-default" :color="textColor" class="opacity-80 text-sm">
            {{ earningsLabel }}
          </Text>
          <Text variant="title-subsection" :color="textColor">
            <span v-if="loadingEarnings">...</span>
            <span v-else>{{ formattedPrice }}</span>
          </Text>
        </div>

        <!-- Empty div to maintain spacing -->
        <div v-else></div>

        <!-- Status Chip -->
        <Chip :label="statusChip.text" size="small" :variant="statusChip.variant" />
      </div>
    </Card>

    <!-- ✅ NEW: Stripe Warning Modal -->
    <Modal
      :show="showStripeWarningModal"
      title="Stripe-Konto verbinden"
      :show-back-button="false"
      :show-primary-button="true"
      primary-button-text="Jetzt verbinden"
      @close="closeStripeWarningModal"
      @primary="handleConnectStripe"
    >
      <div class="space-y-4">
        <!-- Warning Icon -->
        <div class="flex justify-center py-4">
          <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <Icon name="alert-triangle" :size="32" color="#d97706" />
          </div>
        </div>

        <Text variant="body-default" color="content-secondary">
          Um Zahlungen zu empfangen und Einnahmen zu erzielen, musst du zuerst dein Stripe-Konto
          verbinden.
        </Text>

        <Card variant="card" class="p-4 space-y-3">
          <!-- Product Name -->
          <Text variant="body-default-bold" color="content-primary">
            {{ product.productName }}
          </Text>

          <!-- Price with Icon -->
          <div class="flex items-center gap-2">
            <Icon name="circle-dollar-sign" :size="24" color="text-primary-purple" />
            <Text variant="body-default" color="content-secondary">
              {{ formattedPrice }} potenzielle Einnahmen
            </Text>
          </div>
        </Card>

        <div class="p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div class="flex items-start gap-3">
            <div class="text-blue-600 flex-shrink-0">💡</div>
            <div>
              <Text variant="body-default" class="text-blue-700">
                Nach der Verbindung kannst du sofort mit dem Verkauf beginnen und Einnahmen
                erzielen.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Modal>

    <!-- Rejection Reason Modal -->
    <Modal
      :show="showRejectionModal"
      title="Ablehnungsgrund"
      :show-back-button="false"
      :show-primary-button="true"
      primary-button-text="Verstanden"
      @close="closeRejectionModal"
      @primary="closeRejectionModal"
    >
      <div class="space-y-4">
        <Text variant="body-default" color="content-secondary">
          Dein Produkt wurde aus folgendem Grund abgelehnt:
        </Text>

        <div class="p-4 bg-stone-50 rounded-xl border border-stone-200">
          <Text variant="body-default" color="content-primary">
            {{
              product.rejectionReason ||
              'Kein spezifischer Grund angegeben. Bitte kontaktiere den Support für weitere Informationen.'
            }}
          </Text>
        </div>

        <Text variant="body-default" color="content-secondary">
          Du kannst dein Produkt bearbeiten und erneut zur Überprüfung einreichen, indem du auf die
          Karte klickst.
        </Text>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
