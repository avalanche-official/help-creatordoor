<!-- components/organisms/PromoCard/PromoCard.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import Card from '@/components/atoms/Card/Card.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Button from '@/components/atoms/Button/Button.vue'
import IconButton from '@/components/molecules/IconButton/IconButton.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import Modal from '@/components/molecules/Modal/Modal.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'simple'].includes(v),
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  imageSrc: {
    type: String,
    default: null,
  },
  imageAlt: {
    type: String,
    default: 'Promo image',
  },
  bgColor: {
    type: String,
    default: 'var(--color-background-elevated)',
  },
  closable: {
    type: Boolean,
    default: true,
  },
  showActions: {
    type: Boolean,
    default: true,
  },
  clickAction: {
    type: String,
    default: 'emit',
    validator: (v) => ['emit', 'route', 'modal'].includes(v),
  },
  routeTo: {
    type: String,
    default: null,
  },
  actionRouteTo: {
    type: String,
    default: null,
  },
  modalTitle: {
    type: String,
    default: '',
  },
  modalContent: {
    type: String,
    default: '',
  },
  modalButtonText: {
    type: String,
    default: 'Verstanden',
  },
  // ✅ NEW: Unique ID for this promo card (used for caching)
  promoId: {
    type: String,
    required: true,
  },
  // ✅ NEW: Optional expiry in days (null = never expires)
  expiryDays: {
    type: Number,
    default: null, // null = permanent dismissal
  },
})

const emit = defineEmits(['close', 'learn-more', 'action', 'click'])
const router = useRouter()

// Modal state
const showModal = ref(false)

// ✅ Cache key for localStorage
const STORAGE_KEY = 'closedPromoCards'

// ✅ Check if card is closed (from cache)
const isCardClosed = ref(false)

// ✅ Load closed state on mount
onMounted(() => {
  checkIfClosed()
})

// ✅ Check if this promo card was previously closed
const checkIfClosed = () => {
  try {
    const closedCards = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    const cardData = closedCards[props.promoId]

    if (cardData) {
      // Check if expired
      if (props.expiryDays && cardData.closedAt) {
        const closedDate = new Date(cardData.closedAt)
        const expiryDate = new Date(closedDate.getTime() + props.expiryDays * 24 * 60 * 60 * 1000)
        const now = new Date()

        if (now > expiryDate) {
          // Expired - show card again and remove from cache
          removeFromCache()
          isCardClosed.value = false
        } else {
          // Not expired yet - keep hidden
          isCardClosed.value = true
        }
      } else {
        // No expiry - permanently hidden
        isCardClosed.value = true
      }
    }
  } catch (error) {
    console.error('Error loading promo card cache:', error)
  }
}

// ✅ Save closed state to cache
const saveToCache = () => {
  try {
    const closedCards = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    closedCards[props.promoId] = {
      closedAt: new Date().toISOString(),
      title: props.title,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(closedCards))
    console.log(`✅ PromoCard "${props.promoId}" dismissed`)
  } catch (error) {
    console.error('Error saving promo card cache:', error)
  }
}

// ✅ Remove from cache (for expiry)
const removeFromCache = () => {
  try {
    const closedCards = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    delete closedCards[props.promoId]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(closedCards))
  } catch (error) {
    console.error('Error removing promo card from cache:', error)
  }
}

const handleClose = () => {
  isCardClosed.value = true
  saveToCache()
  emit('close')
}

const handleLearnMore = () => {
  if (props.clickAction === 'route' && props.routeTo) {
    router.push(props.routeTo)
  } else if (props.clickAction === 'modal') {
    showModal.value = true
  } else {
    emit('learn-more')
  }
}

const handleAction = () => {
  if (props.actionRouteTo) {
    router.push(props.actionRouteTo)
  } else {
    emit('action')
  }
}

const handleClick = () => {
  handleLearnMore()
}

const closeModal = () => {
  showModal.value = false
}

// ✅ Computed: Should card be visible?
const isVisible = computed(() => !isCardClosed.value)
</script>

<template>
  <!-- ✅ Only render if not closed -->
  <div v-if="isVisible">
    <!-- Default Variant: Full promo with gradient -->
    <Card
      v-if="variant === 'default'"
      variant="elevated"
      class="relative overflow-hidden aspect-square rounded-3xl cursor-pointer"
      @click="handleClick"
    >
      <!-- Image Background -->
      <div
        class="absolute inset-0 flex items-center justify-center"
        :style="{ backgroundColor: bgColor }"
      >
        <img v-if="imageSrc" :src="imageSrc" :alt="imageAlt" class="w-full h-full object-cover" />
        <div v-else class="text-6xl text-color-content-tertiary">
          <Icon name="image" :size="80" />
        </div>
      </div>

      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <!-- Content -->
      <div class="relative h-full flex flex-col p-4">
        <!-- Top: Title/Subtitle + Close -->
        <div class="flex justify-between items-start gap-2">
          <div class="flex-1">
            <Text variant="display-small" class="block mb-2 text-white uppercase">
              {{ title }}
            </Text>
            <Text v-if="subtitle" variant="body-large-bold" class="block text-white/90">
              {{ subtitle }}
            </Text>
          </div>

          <IconButton
            v-if="closable"
            icon="x"
            variant="neutral"
            size="small"
            aria-label="Close"
            @click.stop="handleClose"
          />
        </div>

        <!-- Bottom: Action Buttons -->
        <div v-if="showActions" class="flex items-center justify-end gap-2 mt-auto">
          <Button variant="primary" size="default" @click.stop="handleLearnMore">
            Mehr erfahren
          </Button>

          <IconButton
            icon="arrow-right"
            variant="neutral"
            size="large"
            aria-label="Go to details"
            @click.stop="handleAction"
          />
        </div>
      </div>
    </Card>

    <!-- Simple Variant: Text top, image center -->
    <Card
      v-else-if="variant === 'simple'"
      variant="elevated"
      class="relative overflow-hidden rounded-lg cursor-pointer"
      :style="{ backgroundColor: bgColor }"
      @click="handleClick"
    >
      <div class="relative h-full flex flex-col p-4">
        <!-- Top: Title + Close -->
        <div class="flex justify-between items-start gap-4 mb-2">
          <div class="flex-1">
            <Text variant="title-body" color="content-primary" class="block">
              {{ title }}
            </Text>
          </div>

          <IconButton
            v-if="closable"
            icon="x"
            variant="neutral"
            size="small"
            aria-label="Close"
            @click.stop="handleClose"
          />
        </div>

        <!-- Center: Image -->
        <div class="flex-1 flex items-center justify-center">
          <img v-if="imageSrc" :src="imageSrc" :alt="imageAlt" class="w-24 object-contain" />
          <Icon v-else name="image" :size="120" color="var(--color-content-tertiary)" />
        </div>
      </div>
    </Card>

    <!-- Modal (if clickAction is 'modal') -->
    <Modal
      v-if="clickAction === 'modal'"
      :show="showModal"
      :title="modalTitle"
      :show-back-button="false"
      :show-primary-button="true"
      :primary-button-text="modalButtonText"
      @close="closeModal"
      @primary="closeModal"
    >
      <div class="space-y-4">
        <Text variant="body-default" color="content-secondary">
          {{ modalContent }}
        </Text>
      </div>
    </Modal>
  </div>
</template>
