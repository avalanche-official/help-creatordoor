<!-- components/organisms/AffiliateCard/AffiliateCard.vue -->
<!-- ✅ UPDATED: Shows Stripe connection warning when not connected -->
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStripeStore } from '@/stores/stripeStore'
import Text from '@/components/atoms/Text/Text.vue'
import CopyBlock from '@/components/molecules/CopyBlock/CopyBlock.vue'
import Chip from '@/components/molecules/Chip/Chip.vue'
import InputField from '@/components/molecules/InputField/InputField.vue'
import IconButton from '@/components/molecules/IconButton/IconButton.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Display',
  },
  description: {
    type: String,
    default: 'Share your affiliate link',
  },
  link: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary'].includes(v),
  },
  inputLabel: {
    type: String,
    default: 'Your affiliate link',
  },
})

const emit = defineEmits(['copy', 'share'])

const router = useRouter()
const stripeStore = useStripeStore()

const copied = ref(false)

// ✅ Check if Stripe is connected
const isStripeConnected = computed(() => stripeStore.isConnected)

// Variant styles
const variantStyles = computed(() => {
  const styles = {
    primary: {
      bg: 'bg-primary-purple',
      titleColor: 'white',
      descColor: 'white',
      labelColor: 'white',
      chipVariant: 'primaryLight',
    },
    secondary: {
      bg: 'bg-stone-100',
      titleColor: 'content-primary',
      descColor: 'content-secondary',
      labelColor: 'content-secondary',
      chipVariant: 'primary',
    },
  }
  return styles[props.variant]
})

const handleCopy = () => {
  navigator.clipboard.writeText(props.link)
  copied.value = true
  emit('copy', props.link)

  setTimeout(() => {
    copied.value = false
  }, 2000)
}

const handleShare = () => {
  emit('share', props.link)
}

// ✅ Navigate to Stripe connection
const handleConnectStripe = () => {
  router.push('/dashboard/payment')
}
</script>

<template>
  <div :class="['rounded-3xl overflow-hidden w-full', variantStyles.bg]">
    <div class="flex flex-col md:flex-row">
      <!-- Content Section -->
      <div class="w-full md:w-[60%] p-6 sm:p-6 flex flex-col justify-center space-y-4">
        <!-- Title + Description using CopyBlock -->
        <CopyBlock
          :title="title"
          :description="
            isStripeConnected
              ? 'Hier ist dein persönlicher Affiliate Link. Teile ihn, damit du Provisionen für das verkaufte Produkt erhältst.'
              : 'Verbinde dein Stripe-Konto, um deinen Affiliate Link zu aktivieren und Provisionen zu erhalten.'
          "
          title-variant="display-medium"
          mobile-title-variant="display-small"
          description-variant="body-large"
          mobile-description-variant="body-large"
          :title-color="variantStyles.titleColor"
          :description-color="variantStyles.descColor"
          :title-clamp="2"
          align="center"
          class="md:!text-left"
          spacing="3"
          as="h2"
        />

        <!-- Image on Mobile (hidden on desktop) -->
        <div class="flex items-center justify-center md:hidden py-4">
          <img :src="imageSrc" :alt="title" class="max-w-full h-[150px] object-contain" />
        </div>

        <!-- ✅ STRIPE WARNING (Priority over link input) -->
        <div v-if="!isStripeConnected" class="space-y-3">
          <div class="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-4">
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 mt-0.5">
                <Icon name="alert-triangle" :size="20" color="#d97706" />
              </div>
              <div class="flex-1">
                <Text variant="body-default-bold" class="mb-1 text-yellow-900">
                  Stripe-Konto erforderlich
                </Text>
                <Text variant="body-default" class="text-yellow-800">
                  Um Provisionen zu erhalten, musst du zuerst dein Stripe-Konto verbinden.
                </Text>
              </div>
            </div>
          </div>

          <Button variant="secondary" size="medium" class="w-full" @click="handleConnectStripe">
            Stripe jetzt verbinden
          </Button>
        </div>

        <!-- ✅ LINK INPUT (Only show when Stripe connected) -->
        <div v-else class="space-y-2">
          <!-- Label -->
          <Text
            variant="body-default"
            :color="variantStyles.labelColor"
            class="text-center md:text-left"
          >
            {{ inputLabel }}
          </Text>

          <!-- Input with Copy Button -->
          <div class="relative">
            <InputField :model-value="link" type="text" :disabled="true" placeholder="" />
            <!-- Copy Button (absolute positioned inside input) -->
            <div class="absolute right-2 top-1/2 -translate-y-1/2 z-10">
              <IconButton
                :icon="copied ? 'check' : 'copy'"
                variant="neutral"
                size="small"
                :aria-label="copied ? 'Copied!' : 'Copy link'"
                @click="handleCopy"
              />
            </div>
          </div>

          <!-- Share Chip (full width on mobile) -->
          <Chip
            label="Teilen"
            variant="secondary"
            size="medium"
            class="w-full sm:w-fit justify-center"
            @click="handleShare"
          />
        </div>
      </div>

      <!-- Image Section (Desktop only) -->
      <div class="hidden md:flex md:w-[40%] items-center justify-center p-6">
        <img :src="imageSrc" :alt="title" class="max-w-full h-[200px] object-contain" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Override CopyBlock alignment on desktop */
.md\:\!text-left {
  @media (min-width: 768px) {
    text-align: left !important;
  }
}
</style>
