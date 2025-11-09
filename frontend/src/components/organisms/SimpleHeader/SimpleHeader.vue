<!-- components/organisms/SimpleHeader/SimpleHeader.vue -->
<script setup>
import { useRouter } from 'vue-router'
import Logo from '@/components/atoms/Logo/Logo.vue'
import IconButton from '@/components/molecules/IconButton/IconButton.vue'
import StepProgress from '@/components/molecules/StepProgress/StepProgress.vue'
import Button from '@/components/atoms/Button/Button.vue'

const router = useRouter()

const props = defineProps({
  // Left side options
  showBackButton: {
    type: Boolean,
    default: false,
  },
  showLogo: {
    type: Boolean,
    default: true,
  },
  logoSize: {
    type: String,
    default: 'default',
    validator: (v) => ['small', 'default', 'large'].includes(v),
  },
  logoVariant: {
    type: String,
    default: 'full',
    validator: (v) => ['full', 'icon'].includes(v),
  },
  backIcon: {
    type: String,
    default: 'arrow-left',
  },
  backRoute: {
    type: String,
    default: null,
  },

  // Right side options
  showCloseButton: {
    type: Boolean,
    default: true,
  },
  closeIcon: {
    type: String,
    default: 'x',
  },
  closeRoute: {
    type: String,
    default: '/',
  },

  // ✅ NEW: Right side buttons
  showButtons: {
    type: Boolean,
    default: false,
  },
  primaryButton: {
    type: Object,
    default: () => ({
      text: 'Registrieren',
      variant: 'primary',
      size: 'small',
      show: true,
      href: '/register',
    }),
  },
  secondaryButton: {
    type: Object,
    default: () => ({
      text: 'Anmelden',
      variant: 'outline',
      size: 'small',
      show: true,
      href: '/login',
    }),
  },

  // Spacing options
  py: {
    type: String,
    default: '7',
    validator: (v) => ['2', '3', '4', '5', '6', '7', '8', '10', '12'].includes(v),
  },

  // Progress props
  showProgress: {
    type: Boolean,
    default: false,
  },
  currentStep: {
    type: Number,
    default: 1,
  },
  totalSteps: {
    type: Number,
    default: 5,
  },
  stepNames: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['close', 'back', 'primary-click', 'secondary-click'])

const handleClose = () => {
  emit('close')
  if (props.closeRoute) {
    router.push(props.closeRoute)
  }
}

const handleBack = () => {
  if (props.backRoute) {
    router.push(props.backRoute)
  } else {
    emit('back')
  }
}

const handlePrimaryClick = () => {
  emit('primary-click')
  if (props.primaryButton.href) {
    router.push(props.primaryButton.href)
  }
}

const handleSecondaryClick = () => {
  emit('secondary-click')
  if (props.secondaryButton.href) {
    router.push(props.secondaryButton.href)
  }
}
</script>

<template>
  <header :class="['w-full border-b border-stone-300 bg-background-screen px-4', `py-${py}`]">
    <div class="max-w-5xl mx-auto">
      <!-- Desktop Layout -->
      <div class="hidden md:flex items-center justify-between gap-8">
        <!-- Left: Back Button OR Logo OR Nothing -->
        <div class="flex items-center flex-shrink-0 w-40">
          <IconButton
            v-if="showBackButton"
            :icon="backIcon"
            variant="neutral"
            size="large"
            aria-label="Back"
            @click="handleBack"
          />
          <Logo v-else-if="showLogo" :size="logoSize" :variant="logoVariant" href="/" />
        </div>

        <!-- Center: Progress (Desktop) -->
        <div v-if="showProgress" class="flex-1 flex justify-center">
          <div class="w-full max-w-2xl">
            <StepProgress
              :current-step="currentStep"
              :total-steps="totalSteps"
              :step-names="stepNames"
            />
          </div>
        </div>

        <!-- Right: Buttons OR Close Button OR Nothing -->
        <div class="flex items-center justify-end gap-3 flex-shrink-0 w-40">
          <!-- ✅ NEW: Action Buttons -->
          <template v-if="showButtons">
            <Button
              v-if="secondaryButton.show"
              :variant="secondaryButton.variant"
              :size="secondaryButton.size"
              :fontSize="secondaryButton.fontSize || 'body-default-bold'"
              @click="handleSecondaryClick"
            >
              {{ secondaryButton.text }}
            </Button>
            <Button
              v-if="primaryButton.show"
              :variant="primaryButton.variant"
              :size="primaryButton.size"
              :fontSize="primaryButton.fontSize || 'body-default-bold'"
              @click="handlePrimaryClick"
            >
              {{ primaryButton.text }}
            </Button>
          </template>

          <!-- Original Close Button -->
          <IconButton
            v-else-if="showCloseButton"
            :icon="closeIcon"
            variant="neutral"
            size="large"
            aria-label="Close"
            @click="handleClose"
          />
        </div>
      </div>

      <!-- Mobile Layout -->
      <div class="md:hidden">
        <div class="flex items-center justify-between gap-4">
          <!-- Left: Back Button OR Logo OR Nothing -->
          <div class="flex-shrink-0">
            <IconButton
              v-if="showBackButton"
              :icon="backIcon"
              variant="ghost"
              size="medium"
              aria-label="Back"
              @click="handleBack"
            />
            <Logo v-else-if="showLogo" :size="logoSize" :variant="logoVariant" href="/" />
          </div>

          <!-- Center: Progress Bar (Mobile - bar only) -->
          <div v-if="showProgress" class="flex-1">
            <StepProgress
              :current-step="currentStep"
              :total-steps="totalSteps"
              :step-names="[]"
              :compact="true"
            />
          </div>

          <!-- Right: Buttons OR Close Button OR Nothing -->
          <div class="flex items-center gap-2 flex-shrink-0">
            <!-- ✅ NEW: Mobile Action Buttons -->
            <template v-if="showButtons">
              <Button
                v-if="secondaryButton.show"
                :variant="secondaryButton.variant"
                :size="secondaryButton.size"
                :fontSize="secondaryButton.fontSize || 'body-default-bold'"
                @click="handleSecondaryClick"
              >
                {{ secondaryButton.text }}
              </Button>
              <Button
                v-if="primaryButton.show"
                :variant="primaryButton.variant"
                :size="primaryButton.size"
                :fontSize="primaryButton.fontSize || 'body-default-bold'"
                @click="handlePrimaryClick"
              >
                {{ primaryButton.text }}
              </Button>
            </template>

            <!-- Original Close Button -->
            <IconButton
              v-else-if="showCloseButton"
              :icon="closeIcon"
              variant="ghost"
              size="medium"
              aria-label="Close"
              @click="handleClose"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>