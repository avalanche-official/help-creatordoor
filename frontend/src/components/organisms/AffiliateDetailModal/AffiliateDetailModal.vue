<!-- src/components/organisms/AffiliateDetailModal/AffiliateDetailModal.vue -->
<script setup>
import { ref, watch, computed } from 'vue'
import Modal from '@/components/molecules/Modal/Modal.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Avatar from '@/components/atoms/Avatar/Avatar.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Dropdown from '@/components/molecules/Dropdown/Dropdown.vue'
import TextInput from '@/components/molecules/TextInput/TextInput.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  affiliate: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close', 'save'])

// Local state
const localStatus = ref('active')
const localCommission = ref(0)
const isSaving = ref(false)
const linkCopied = ref(false)
const showRejectModal = ref(false)
const rejectionReason = ref('')
const isSubmittingRejection = ref(false)

// Watch for affiliate changes
watch(
  () => props.affiliate,
  (newAffiliate) => {
    if (newAffiliate) {
      localStatus.value = newAffiliate.status
      localCommission.value = newAffiliate.commission
    }
  },
  { immediate: true },
)

// Status options for dropdown (removed pending)
const statusOptions = [
  { label: '✅ Aktiv', value: 'active' },
  { label: '❌ Abgelehnt', value: 'declined' },
]

// Get initials
const getInitials = computed(() => {
  if (!props.affiliate?.affiliateName) return 'UN'
  const parts = props.affiliate.affiliateName.split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return props.affiliate.affiliateName.substring(0, 2).toUpperCase()
})

// Get username
const getUsername = computed(() => {
  if (!props.affiliate) return ''
  return props.affiliate.affiliateUsername
    ? props.affiliate.affiliateUsername
    : props.affiliate.affiliateEmail?.split('@')[0] || 'No username'
})

// Generate affiliate link
const affiliateLink = computed(() => {
  if (!props.affiliate) return ''
  return `https://creatordoor.com/products/${props.affiliate.productSlug}?ref=${props.affiliate.$id}`
})

// Copy to clipboard
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(affiliateLink.value)
    linkCopied.value = true
    setTimeout(() => {
      linkCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Format date
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

// Handle save
const handleSave = () => {
  // If changing to declined status, show rejection modal first
  if (localStatus.value === 'declined' && props.affiliate.status !== 'declined') {
    showRejectModal.value = true
    return
  }

  // Otherwise proceed with normal save
  isSaving.value = true
  emit('save', {
    affiliateId: props.affiliate.$id,
    status: localStatus.value,
    commission: localCommission.value,
    previousStatus: props.affiliate.status,
  })

  setTimeout(() => {
    isSaving.value = false
  }, 1000)
}

// Handle rejection submission
const submitRejection = () => {
  if (!rejectionReason.value.trim()) {
    alert('Bitte gib einen Ablehnungsgrund ein.')
    return
  }

  isSubmittingRejection.value = true
  showRejectModal.value = false

  // Emit save with rejection reason
  emit('save', {
    affiliateId: props.affiliate.$id,
    status: 'declined',
    commission: localCommission.value,
    previousStatus: props.affiliate.status,
    rejectionReason: rejectionReason.value.trim(),
  })

  setTimeout(() => {
    isSubmittingRejection.value = false
    rejectionReason.value = ''
  }, 1000)
}

// Close rejection modal
const closeRejectModal = () => {
  showRejectModal.value = false
  rejectionReason.value = ''
  // Reset status back to original
  localStatus.value = props.affiliate.status
}

// Handle close
const handleClose = () => {
  emit('close')
}
</script>

<template>
  <Modal
    :show="show"
    title="Affiliate Details"
    :show-primary-button="true"
    primary-button-text="Änderungen speichern"
    :primary-button-loading="isSaving"
    :show-back-button="true"
    back-button-text="Schliessen"
    max-width="2xl"
    @close="handleClose"
    @back="handleClose"
    @primary="handleSave"
  >
    <div v-if="affiliate" class="space-y-2">
      <!-- ✅ Affiliate Header -->
      <div class="flex items-center gap-4 pb-6">
        <Avatar
          :initials="getInitials"
          size="large"
          background-color="bg-stone-100"
          text-color="text-stone-800"
        />
        <div class="flex-col flex">
          <Text variant="title-body" color="content-primary">
            {{ affiliate.affiliateName || 'Unknown User' }}
          </Text>
          <Text variant="body-default" color="content-tertiary">
            {{ getUsername }}
          </Text>
          <Text variant="body-default" color="content-tertiary">
            {{ affiliate.affiliateEmail }}
          </Text>
        </div>
      </div>

      <!-- ✅ Read-only Fields (ProductDetailView style) -->
      <div class="space-y-2">
        <div>
          <Text variant="body-default-bold" color="content-secondary">Affiliate Information</Text>
        </div>
        <div class="border-b border-stone-300"></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div class="flex flex-col">
            <Text color="content-secondary" variant="body-default">Affiliate ID</Text>
            <Text variant="body-default" class="font-mono text-sm">{{ affiliate.$id }}</Text>
          </div>

          <div class="flex flex-col">
            <Text color="content-secondary" variant="body-default">Produkt</Text>
            <Text variant="body-default">{{ affiliate.productName || 'Unbekannt' }}</Text>
          </div>

          <div class="flex flex-col">
            <Text color="content-secondary" variant="body-default">Produkt ID</Text>
            <Text variant="body-default" class="font-mono text-sm">{{ affiliate.productId }}</Text>
          </div>
          <div class="flex flex-col">
            <Text color="content-secondary" variant="body-default">Registriert</Text>
            <Text variant="body-default">
              {{ formatDate(affiliate.$createdAt) }}
            </Text>
          </div>
        </div>
      </div>

      <!-- ✅ Editable Fields -->
      <div class="space-y-2">
        <div class="space-y-6 py-4">
          <!-- Status Dropdown -->
          <div>
            <label class="block mb-2">
              <Text variant="body-default-bold" color="content-primary">Status</Text>
            </label>
            <Dropdown
              v-model="localStatus"
              :options="statusOptions"
              placeholder="Status auswählen"
            />
          </div>

          <!-- Commission Input -->
          <div>
            <TextInput
              v-model="localCommission"
              label="Provision (%)"
              type="number"
              placeholder="z.B. 20"
              :required="true"
            />
          </div>
        </div>
      </div>

      <!-- ✅ Affiliate Link (TextInput with copy button) -->
      <div class="space-y-2">
        <div class="py-4">
          <div class="flex gap-2 items-end">
            <div class="flex-1">
              <TextInput
                label="Affiliate Link"
                :model-value="affiliateLink"
                :disabled="true"
                placeholder="Affiliate Link"
              />
            </div>
            <div>
              <Button variant="outline" size="medium" @click="copyLink">
                <Icon :name="linkCopied ? 'check' : 'copy'" :size="16" />
                {{ linkCopied ? 'Kopiert!' : 'Kopieren' }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ Rejection Modal (inside detail modal) -->
    <Modal
      :show="showRejectModal"
      title="Affiliate ablehnen"
      :show-primary-button="true"
      primary-button-text="Ablehnen"
      :primary-button-disabled="!rejectionReason.trim()"
      :primary-button-loading="isSubmittingRejection"
      :show-back-button="true"
      back-button-text="Abbrechen"
      @close="closeRejectModal"
      @back="closeRejectModal"
      @primary="submitRejection"
    >
      <div class="space-y-4">
        <Text variant="body-default" color="content-secondary">
          Bitte gib einen Grund für die Ablehnung an. Dieser wird dem Affiliate angezeigt.
        </Text>

        <div>
          <label class="block mb-2">
            <Text variant="body-default-bold" color="content-primary"> Ablehnungsgrund * </Text>
          </label>
          <textarea
            v-model="rejectionReason"
            rows="4"
            placeholder="z.B. Dein Profil erfüllt nicht unsere Anforderungen..."
            class="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary-purple resize-none"
          />
        </div>

        <div v-if="affiliate" class="bg-stone-50 p-4 rounded-xl">
          <Text variant="body-default" color="content-tertiary" class="mb-2">
            Affiliate wird abgelehnt:
          </Text>
          <Text variant="body-default-bold" color="content-primary">
            {{ affiliate.affiliateName }}
          </Text>
          <Text variant="body-default" color="content-secondary">
            Produkt: {{ affiliate.productName }}
          </Text>
        </div>
      </div>
    </Modal>
  </Modal>
</template>
