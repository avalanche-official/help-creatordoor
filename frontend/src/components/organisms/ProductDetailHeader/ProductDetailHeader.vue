<!-- components/organisms/ProductDetailHeader/ProductDetailHeader.vue -->
<!-- ✅ UPDATED: Shows Stripe connection warning when not connected -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStripeStore } from '@/stores/stripeStore'
import { affiliateService } from '@/services/database/affiliateService'
import Text from '@/components/atoms/Text/Text.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import Chip from '@/components/molecules/Chip/Chip.vue'
import IconButtonMenu from '@/components/molecules/IconButtonMenu/IconButtonMenu.vue'
import Spinner from '@/components/atoms/Spinner/Spinner.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  isAffiliate: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'menu-select',
  'copy-link',
  'status-click',
  'affiliates-click',
  'analytics-click',
  'status-change',
  'delete',
])

const router = useRouter()
const stripeStore = useStripeStore()

const linkCopied = ref(false)
const loadingVendorLink = ref(true)
const vendorAffiliateLink = ref(null)

// ✅ Check if Stripe is connected
const isStripeConnected = computed(() => stripeStore.isConnected)

// ✅ Generate vendor's affiliate tracking link (same as affiliate system!)
const productLink = computed(() => {
  if (!vendorAffiliateLink.value) return ''

  const functionDomain = import.meta.env.VITE_APPWRITE_FUNCTION_AFFILIATE_REDIRECT_DOMAIN

  // Use vendor's affiliate link ID (same as regular affiliates)
  return `${functionDomain}/${vendorAffiliateLink.value.$id}`
})

// Check if product has icon
const hasProductIcon = computed(() => {
  return props.product.iconUrl && props.product.iconUrl.trim() !== ''
})

// ✅ Load vendor's affiliate link on mount
onMounted(async () => {
  await loadVendorAffiliateLink()
})

// ✅ Load vendor's own affiliate link
const loadVendorAffiliateLink = async () => {
  if (!props.product?.$id || !props.product?.userId) {
    loadingVendorLink.value = false
    return
  }

  loadingVendorLink.value = true

  try {
    console.log('📥 Loading vendor affiliate link for product:', props.product.$id)

    // Get vendor's affiliate link (where affiliateUserId === productOwnerId)
    const links = await affiliateService.getMyAffiliateLinks(props.product.userId)

    // Find the link for this specific product where vendor is the affiliate
    vendorAffiliateLink.value = links.find(
      (link) =>
        link.productId === props.product.$id && link.affiliateUserId === props.product.userId,
    )

    if (!vendorAffiliateLink.value) {
      console.warn('⚠️ No vendor affiliate link found, creating one...')
      // Optionally auto-create vendor link here
      await createVendorAffiliateLink()
    } else {
      console.log('✅ Vendor affiliate link loaded:', vendorAffiliateLink.value.$id)
    }
  } catch (error) {
    console.error('❌ Error loading vendor affiliate link:', error)
  } finally {
    loadingVendorLink.value = false
  }
}

// ✅ Create vendor's affiliate link if it doesn't exist
const createVendorAffiliateLink = async () => {
  try {
    const result = await affiliateService.createAffiliateLink(
      props.product.userId, // Vendor is the affiliate
      props.product.$id,
      props.product.userId, // Product owner (same person)
    )

    if (result.success) {
      vendorAffiliateLink.value = result.affiliateLink
      console.log('✅ Vendor affiliate link created:', vendorAffiliateLink.value.$id)
    }
  } catch (error) {
    console.error('❌ Error creating vendor affiliate link:', error)
  }
}

// ✅ Navigate to Stripe connection
const handleConnectStripe = () => {
  router.push('/dashboard/payment')
}

// Dynamic menu items based on product status
const menuItems = computed(() => {
  const status = props.product.status

  // For affiliates - different menu
  if (props.isAffiliate) {
    return [{ label: 'Statistiken anzeigen', icon: 'bar-chart', action: 'view-stats' }]
  }

  // PENDING (waiting for admin approval)
  if (status === 'pending') {
    return [
      { label: 'Zu Entwurf ändern', icon: 'file-text', action: 'set-draft' },
      { label: 'Produkt löschen', icon: 'trash', action: 'delete' },
    ]
  }

  // DRAFT (work in progress)
  if (status === 'draft') {
    return [
      { label: 'Zur Prüfung einreichen', icon: 'send', action: 'submit-review' },
      { label: 'Produkt löschen', icon: 'trash', action: 'delete' },
    ]
  }

  // ACTIVE (live and selling)
  if (status === 'active') {
    return [
      { label: 'Pausieren', icon: 'pause', action: 'pause' },
      { label: 'Zu Entwurf ändern', icon: 'file-text', action: 'set-draft' },
      { label: 'Produkt löschen', icon: 'trash', action: 'delete' },
    ]
  }

  // DECLINED/REJECTED (admin rejected)
  if (status === 'declined') {
    return [
      { label: 'Erneut einreichen', icon: 'refresh-cw', action: 'resubmit' },
      { label: 'Zu Entwurf ändern', icon: 'file-text', action: 'set-draft' },
      { label: 'Produkt löschen', icon: 'trash', action: 'delete' },
    ]
  }

  // INACTIVE/PAUSED (vendor paused it)
  if (status === 'inactive') {
    return [
      { label: 'Aktivieren', icon: 'play', action: 'activate' },
      { label: 'Zu Entwurf ändern', icon: 'file-text', action: 'set-draft' },
      { label: 'Produkt löschen', icon: 'trash', action: 'delete' },
    ]
  }

  // Fallback
  return [{ label: 'Produkt löschen', icon: 'trash', action: 'delete' }]
})

// Handle menu actions
const handleMenuSelect = (action) => {
  console.log('🎯 Menu action selected:', action)

  switch (action) {
    case 'submit-review':
      emit('status-change', 'pending')
      break

    case 'pause':
      emit('status-change', 'inactive')
      break

    case 'activate':
      emit('status-change', 'pending')
      break

    case 'resubmit':
      emit('status-change', 'pending')
      break

    case 'set-draft':
      emit('status-change', 'draft')
      break

    case 'delete':
      emit('delete')
      break

    case 'view-stats':
      emit('menu-select', action)
      break

    default:
      emit('menu-select', action)
      break
  }
}

// Handle copy link
const handleCopyLink = async () => {
  if (!productLink.value) {
    console.warn('⚠️ No link to copy yet')
    return
  }

  try {
    await navigator.clipboard.writeText(productLink.value)
    console.log('✅ Link copied:', productLink.value)
    linkCopied.value = true
    setTimeout(() => {
      linkCopied.value = false
    }, 2000)
    emit('copy-link', productLink.value)
  } catch (err) {
    console.error('❌ Copy failed:', err)
  }
}

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('de-CH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0)
}

// Get status chip variant
const getStatusVariant = (status) => {
  const variants = {
    active: 'success',
    pending: 'primaryLight',
    draft: 'warning',
    declined: 'neutral',
    inactive: 'neutral',
  }
  return variants[status] || 'neutral'
}

// Get status label
const getStatusLabel = (status) => {
  const labels = {
    active: 'Aktiv',
    draft: 'Entwurf',
    inactive: 'Pausiert',
    pending: 'In Prüfung',
    declined: 'Abgelehnt',
  }
  return labels[status] || status
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex justify-between items-start">
      <div class="flex-col items-center space-y-6">
        <!-- Product Icon: Show uploaded icon OR fallback to letter -->
        <div
          v-if="hasProductIcon"
          class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-stone-200"
        >
          <img
            :src="product.iconUrl"
            :alt="product.productName"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Fallback: First letter with background -->
        <div
          v-else
          class="w-16 h-16 rounded-full bg-stone-900 flex items-center justify-center flex-shrink-0"
        >
          <Text variant="title-screen" style="color: #d4af37">
            {{ product.productName.charAt(0).toUpperCase() }}
          </Text>
        </div>

        <div class="flex flex-col space-y-4">
          <!-- Product Name -->
          <Text variant="title-screen" as="h1">{{ product.productName }}</Text>

          <!-- Price -->
          <div class="flex items-center gap-3">
            <Text variant="title-subsection" color="content-secondary">
              {{ product.currency }} {{ formatCurrency(product.price) }}
            </Text>
          </div>
        </div>
      </div>

      <!-- Menu Button -->
      <IconButtonMenu
        icon="ellipsis-vertical"
        variant="neutral"
        size="medium"
        :menu-items="menuItems"
        @select="handleMenuSelect"
        position="left"
        width="250px"
      />
    </div>

    <!-- ✅ STRIPE WARNING (Priority over link) -->
    <div v-if="!isStripeConnected" class="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0">
          <Icon name="alert-triangle" :size="24" color="#d97706" />
        </div>
        <div class="flex-1">
          <Text variant="body-default-bold" class="mb-1 text-yellow-900">
            Stripe-Konto verbinden
          </Text>
          <Text variant="body-default" class="mb-3 text-yellow-800">
            Verbinde dein Stripe-Konto, um Zahlungen zu empfangen und deinen Produkt-Link zu
            aktivieren.
          </Text>
          <Button variant="primary" size="small" @click="handleConnectStripe">
            Jetzt verbinden
          </Button>
        </div>
      </div>
    </div>

    <!-- ✅ COPY LINK SECTION (Only show when Stripe connected) -->
    <div v-else class="bg-stone-50 border border-stone-200 rounded-2xl p-4">
      <!-- ✅ Loading State -->
      <div v-if="loadingVendorLink" class="flex items-center justify-center py-4">
        <Spinner size="small" />
        <Text variant="body-default" color="content-secondary" class="ml-3">
          Link wird geladen...
        </Text>
      </div>

      <!-- ✅ Link Ready -->
      <div v-else class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div class="flex-1 min-w-0">
          <Text variant="body-default" color="content-secondary" class="mb-1">
            Dein Produkt Link (mit Tracking)
          </Text>
          <Text variant="body-default" class="truncate font-mono text-sm">
            {{ productLink || 'Kein Link verfügbar' }}
          </Text>
        </div>
        <Button
          variant="outline"
          size="medium"
          class="flex-shrink-0 w-full sm:w-auto"
          :disabled="!productLink"
          @click="handleCopyLink"
        >
          <Icon :name="linkCopied ? 'check' : 'copy'" :size="16" class="mr-2" />
          {{ linkCopied ? 'Kopiert!' : 'Link kopieren' }}
        </Button>
      </div>
    </div>

    <!-- Quick Actions Chips -->
    <div class="flex gap-2 flex-wrap">
      <Chip
        :label="getStatusLabel(product.status)"
        :variant="getStatusVariant(product.status)"
        size="small"
        class="w-fit cursor-pointer hover:opacity-80 transition-opacity"
        @click="$emit('status-click')"
      />
      <Chip
        label="Affiliates"
        class="cursor-pointer hover:opacity-80 transition-opacity"
        @click="$emit('affiliates-click')"
      />
      <Chip
        label="Berichte"
        class="cursor-pointer hover:opacity-80 transition-opacity"
        @click="$emit('analytics-click')"
      />
    </div>
  </div>
</template>
