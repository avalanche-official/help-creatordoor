<!-- components/molecules/AffiliateLinkCard/AffiliateLinkCard.vue -->
<!-- ✅ UPDATED: Shows "Warnung" status when Stripe not connected -->
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStripeStore } from '@/stores/stripeStore'
import Card from '@/components/atoms/Card/Card.vue'
import IconButton from '@/components/molecules/IconButton/IconButton.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Chip from '@/components/molecules/Chip/Chip.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Modal from '@/components/molecules/Modal/Modal.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  affiliateLink: {
    type: Object,
    required: true,
  },
  product: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['click', 'delete'])
const router = useRouter()
const stripeStore = useStripeStore()

// Modal state
const showPendingModal = ref(false)
const showDeclinedModal = ref(false)
const showDeleteModal = ref(false)
const showStripeWarningModal = ref(false) // ✅ NEW
const isDeleting = ref(false)

// Check affiliate link status
const isPending = computed(() => props.affiliateLink.status === 'pending')
const isActive = computed(() => props.affiliateLink.status === 'active')
const isDeclined = computed(() => props.affiliateLink.status === 'declined')

// ✅ NEW: Check if Stripe is connected
const isStripeConnected = computed(() => stripeStore.isConnected)

// ✅ NEW: Priority status - Stripe warning overrides everything
const hasStripeWarning = computed(() => !isStripeConnected.value)

// ✅ UPDATED: Status chip configuration with Stripe warning priority
const statusChip = computed(() => {
  // ✅ PRIORITY 1: Stripe not connected = Warnung
  if (hasStripeWarning.value) {
    return {
      text: 'Warnung',
      variant: 'warning',
    }
  }

  // PRIORITY 2: Regular statuses
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
      variant: 'error',
    }
  }
  return {
    text: props.affiliateLink.status,
    variant: 'neutral',
  }
})

// Format commission
const formattedCommission = computed(() => {
  const commission = parseFloat(props.affiliateLink.commission) || 0
  return `${commission}%`
})

// Format earnings
const formattedEarnings = computed(() => {
  const earnings = parseFloat(props.affiliateLink.earnings) || 0
  return new Intl.NumberFormat('de-CH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(earnings)
})

// Product name or fallback
const productName = computed(() => {
  return props.product?.productName || 'Produkt'
})

// Check if product has icon
const hasProductIcon = computed(() => {
  return props.product?.iconUrl && props.product.iconUrl.trim() !== ''
})

// Check if product has thumbnail
const hasThumbnail = computed(() => {
  return props.product?.thumbnailUrl && props.product.thumbnailUrl.trim() !== ''
})

// Product icon based on account type
const productIcon = computed(() => {
  return props.product?.accountType === 'creator' ? 'download' : 'package'
})

// Text color based on status
const textColor = computed(() => {
  // For affiliates with thumbnail backgrounds, use white text
  if (hasThumbnail.value) return 'white'
  // Otherwise use dark text
  return 'content-primary'
})

// Background styling with overlay
const cardBackgroundStyle = computed(() => {
  // Active/Pending/Declined: show product thumbnail with dark overlay if available
  if (
    (isActive.value || isPending.value || isDeclined.value || hasStripeWarning.value) &&
    hasThumbnail.value
  ) {
    return {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props.product.thumbnailUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }

  // No image: just bg-stone-100
  return {}
})

// ✅ UPDATED: Handle card click with Stripe warning priority
const handleClick = async () => {
  emit('click', props.affiliateLink)

  // ✅ PRIORITY 1: Stripe warning
  if (hasStripeWarning.value) {
    console.log('⚠️ Stripe not connected, showing warning')
    showStripeWarningModal.value = true
    return
  }

  // PRIORITY 2: Regular statuses
  if (isPending.value) {
    console.log('⏳ Viewing pending affiliate link:', props.affiliateLink.$id)
    showPendingModal.value = true
  } else if (isDeclined.value) {
    console.log('❌ Viewing declined affiliate link:', props.affiliateLink.$id)
    showDeclinedModal.value = true
  } else if (isActive.value) {
    console.log('✅ Viewing active affiliate link:', props.affiliateLink.$id)
    router.push(`/dashboard/affiliates/${props.affiliateLink.$id}`)
  }
}

// ✅ NEW: Handle "Mehr erfahren" for Stripe warning
const handleLearnMoreStripe = (event) => {
  event.stopPropagation()
  showStripeWarningModal.value = true
}

// Handle "Learn More" button click for declined links
const handleLearnMore = (event) => {
  event.stopPropagation()
  showDeclinedModal.value = true
}

// ✅ Handle delete request button
const handleDeleteRequest = () => {
  showDeclinedModal.value = false
  showDeleteModal.value = true
}

// ✅ Confirm delete
const confirmDelete = async () => {
  isDeleting.value = true

  // Emit delete event to parent
  emit('delete', props.affiliateLink.$id)

  // Close modal after a short delay (parent will handle actual deletion)
  setTimeout(() => {
    isDeleting.value = false
    showDeleteModal.value = false
  }, 500)
}

// ✅ NEW: Navigate to Stripe connection page
const handleConnectStripe = () => {
  showStripeWarningModal.value = false
  router.push('/dashboard/payment')
}

// Close modals
const closePendingModal = () => {
  showPendingModal.value = false
}

const closeDeclinedModal = () => {
  showDeclinedModal.value = false
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
}

const closeStripeWarningModal = () => {
  showStripeWarningModal.value = false
}
</script>

<template>
  <div>
    <Card
      bg="bg-stone-100"
      variant="default"
      :clickable="true"
      :class="[
        'h-50 p-4 flex flex-col justify-between overflow-hidden transition-all bg-stone relative',
        'hover:brightness-95',
      ]"
      :style="cardBackgroundStyle"
      @click="handleClick"
    >
      <!-- Top Section: Product Icon + Product Name -->
      <div class="flex items-center gap-3">
        <!-- Product Icon with white border (if available) -->
        <div
          v-if="hasProductIcon"
          class="w-12 h-12 rounded-full border-2 border-white overflow-hidden flex-shrink-0 shadow-md"
        >
          <img :src="product.iconUrl" :alt="productName" class="w-full h-full object-cover" />
        </div>

        <!-- Fallback: Show Package/Download Icon -->
        <IconButton
          v-else
          :icon="productIcon"
          variant="darkNeutral"
          size="large"
          aria-label="Product"
        />

        <!-- Product Name -->
        <Text variant="body-large-bold" :color="textColor" class="line-clamp-1">
          {{ productName }}
        </Text>
      </div>

      <!-- Bottom Section: Earnings/Commission/Button (left) + Status Chip (right) -->
      <div class="flex items-end justify-between mt-auto">
        <!-- ✅ NEW: For Stripe Warning: Show "Mehr erfahren" Button -->
        <div v-if="hasStripeWarning">
          <Button
            variant="link"
            font-size="link-default"
            class="text-white hover:text-white/80"
            @click="handleLearnMoreStripe"
          >
            Mehr erfahren
          </Button>
        </div>

        <!-- For Declined: Show "Mehr erfahren" Button -->
        <div v-else-if="isDeclined">
          <Button
            variant="link"
            font-size="link-default"
            class="text-white hover:text-white/80"
            @click="handleLearnMore"
          >
            Mehr erfahren
          </Button>
        </div>

        <!-- For Active: Show Earnings -->
        <div v-else-if="isActive" class="flex flex-col">
          <Text variant="body-default" :color="textColor" class="opacity-80 text-sm">
            Verdienst
          </Text>
          <Text variant="title-subsection" :color="textColor"> CHF {{ formattedEarnings }} </Text>
        </div>

        <!-- For Pending: Show Commission Rate -->
        <div v-else-if="isPending" class="flex flex-col">
          <Text variant="body-default" :color="textColor" class="opacity-80 text-sm">
            Provision
          </Text>
          <Text variant="title-subsection" :color="textColor">
            {{ formattedCommission }}
          </Text>
        </div>

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
          Um Provisionen zu erhalten, musst du zuerst dein Stripe-Konto verbinden.
        </Text>

        <Card variant="card" class="p-4 space-y-3">
          <!-- Product Name -->
          <Text variant="body-default-bold" color="content-primary">
            {{ productName }}
          </Text>

          <!-- Commission with Icon -->
          <div class="flex items-center gap-2">
            <Icon name="hand-coins" :size="24" color="text-primary-purple" />
            <Text variant="body-default" color="content-secondary">
              {{ formattedCommission }} Provision wartet auf dich
            </Text>
          </div>
        </Card>

        <div class="p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div class="flex items-start gap-3">
            <div class="text-blue-600 flex-shrink-0">💡</div>
            <div>
              <Text variant="body-default" class="text-blue-700">
                Nach der Verbindung kannst du sofort Provisionen verdienen und Auszahlungen
                erhalten.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Modal>

    <!-- Pending Status Modal -->
    <Modal
      :show="showPendingModal"
      title="Affiliate Link in Prüfung"
      :show-back-button="false"
      :show-primary-button="true"
      primary-button-text="Verstanden"
      @close="closePendingModal"
      @primary="closePendingModal"
    >
      <div class="space-y-4">
        <Text variant="body-default" color="content-secondary">
          Dein Affiliate Link wird derzeit überprüft.
        </Text>

        <Card variant="card" class="p-4 space-y-3">
          <!-- Product Name -->
          <Text variant="body-default-bold" color="content-primary">
            {{ productName }}
          </Text>

          <!-- Commission with Icon -->
          <div class="flex items-center gap-2">
            <Icon name="hand-coins" :size="24" color="text-primary-purple" />
            <Text variant="body-default" color="content-secondary">
              {{ formattedCommission }} Provision
            </Text>
          </div>
        </Card>

        <Text variant="body-default-bold" color="content-secondary">
          Du wirst benachrichtigt, sobald dein Affiliate Link genehmigt wurde. Dies dauert in der
          Regel 1-2 Werktage.
        </Text>
      </div>
    </Modal>

    <!-- Declined Status Modal -->
    <Modal
      :show="showDeclinedModal"
      title="Affiliate Link Abgelehnt"
      :show-back-button="false"
      :show-primary-button="true"
      :show-secondary-button="true"
      primary-button-text="Verstanden"
      secondary-button-text="Anfrage löschen"
      @close="closeDeclinedModal"
      @primary="closeDeclinedModal"
      @secondary="handleDeleteRequest"
    >
      <div class="space-y-4">
        <Text variant="body-default" color="content-secondary">
          Dein Affiliate Link wurde aus folgendem Grund abgelehnt:
        </Text>

        <!-- Rejection Reason -->
        <Card variant="card" class="p-4">
          <Text variant="body-default" color="content-primary">
            {{
              affiliateLink.rejectionReason ||
              'Kein spezifischer Grund angegeben. Bitte kontaktiere den Support für weitere Informationen.'
            }}
          </Text>
        </Card>

        <Text variant="body-default-bold" color="content-secondary">
          Du kannst dich an den Produktbesitzer oder den Support wenden, um weitere Informationen zu
          erhalten.
        </Text>
      </div>
    </Modal>

    <!-- Delete Confirmation Modal -->
    <Modal
      :show="showDeleteModal"
      title="Affiliate Anfrage löschen"
      :show-back-button="false"
      :show-primary-button="true"
      :show-secondary-button="true"
      primary-button-text="Löschen"
      secondary-button-text="Abbrechen"
      :primary-button-loading="isDeleting"
      @close="closeDeleteModal"
      @primary="confirmDelete"
      @secondary="closeDeleteModal"
    >
      <div class="space-y-4">
        <!-- Warning Icon and Message -->
        <div class="text-center py-4">
          <div class="text-6xl mb-4">⚠️</div>
          <Text variant="title-body" class="mb-2"> Affiliate Anfrage löschen? </Text>
          <Text variant="body-default" color="content-secondary">
            Diese Aktion kann nicht rückgängig gemacht werden.
          </Text>
        </div>

        <!-- Product Info -->
        <div class="p-4 bg-stone-50 rounded-xl border border-stone-200">
          <div class="flex items-center gap-3 mb-2">
            <div v-if="hasProductIcon" class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img :src="product.iconUrl" :alt="productName" class="w-full h-full object-cover" />
            </div>
            <div
              v-else
              class="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center flex-shrink-0"
            >
              <Icon :name="productIcon" :size="20" />
            </div>
            <div class="flex-1">
              <Text variant="body-default-bold" color="content-primary">
                {{ productName }}
              </Text>
              <Text variant="body-default" color="content-secondary">
                {{ formattedCommission }} Provision
              </Text>
            </div>
          </div>
        </div>

        <!-- Info box -->
        <div class="p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div class="flex items-start gap-3">
            <div class="text-blue-600 flex-shrink-0">💡</div>
            <div>
              <Text variant="body-default" class="text-blue-700">
                Nach dem Löschen kannst du dich jederzeit erneut als Affiliate für dieses Produkt
                bewerben.
              </Text>
            </div>
          </div>
        </div>
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
