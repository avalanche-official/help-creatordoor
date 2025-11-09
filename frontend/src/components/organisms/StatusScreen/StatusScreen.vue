<!-- components/organisms/StatusScreen/StatusScreen.vue -->
<script setup>
import Text from '@/components/atoms/Text/Text.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import Image from '@/components/atoms/Image/Image.vue'
import Spinner from '@/components/atoms/Spinner/Spinner.vue'
import Alert from '../Alert/Alert.vue'

const props = defineProps({
  // Visual type
  variant: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'info', 'error', 'warning', 'loading'].includes(value),
  },

  // Background style
  background: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'celebration'].includes(value),
  },

  // Media (Icon, Image, or Spinner)
  mediaType: {
    type: String,
    default: 'icon',
    validator: (value) => ['icon', 'image', 'spinner', 'none'].includes(value),
  },
  icon: {
    type: String,
    default: '',
  },
  iconSize: {
    type: Number,
    default: 48,
  },
  imageSrc: {
    type: String,
    default: '',
  },
  imageSize: {
    type: Number,
    default: 80,
  },

  // Content - FLEXIBLE TITLE (Bold Display Fonts)
  title: {
    type: String,
    required: true,
  },
  titleVariant: {
    type: String,
    default: 'display-large',
    validator: (value) => ['display-large'].includes(value),
  },

  // Description/Subtext (Normal text below title)
  description: {
    type: String,
    default: '',
  },

  // Alert (Uses your Alert component)
  showAlert: {
    type: Boolean,
    default: false,
  },
  alertVariant: {
    type: String,
    default: 'info',
    validator: (v) => ['error', 'warning', 'success', 'info'].includes(v),
  },
  alertMessage: {
    type: String,
    default: '',
  },
  alertLinkText: {
    type: String,
    default: '',
  },
  alertLinkHref: {
    type: String,
    default: '#',
  },
  alertShowCloseButton: {
    type: Boolean,
    default: false,
  },

  // Primary Button
  primaryButtonText: {
    type: String,
    default: '',
  },
  primaryButtonVariant: {
    type: String,
    default: 'primary',
  },
  primaryButtonLoading: {
    type: Boolean,
    default: false,
  },
  primaryButtonDisabled: {
    type: Boolean,
    default: false,
  },

  // Secondary Button
  secondaryButtonText: {
    type: String,
    default: '',
  },
  secondaryButtonVariant: {
    type: String,
    default: 'secondary',
  },
})

defineEmits(['primary-action', 'secondary-action', 'alert-close', 'alert-link-click'])

// Auto-select icon based on variant
const getIcon = () => {
  if (props.icon) return props.icon

  const iconMap = {
    success: 'check-circle',
    info: 'mail',
    error: 'alert-circle',
    warning: 'alert-triangle',
    loading: 'loader',
  }

  return iconMap[props.variant] || 'info'
}

// Icon color based on variant and background
const getIconColor = () => {
  if (props.background === 'celebration') {
    return 'white'
  }

  const colorMap = {
    success: 'bg-primary-purple',
    info: 'var(--color-interactive-primary)',
    error: 'var(--color-sentiment-negative)',
    warning: 'var(--color-sentiment-warning)',
    loading: 'var(--color-interactive-primary)',
  }

  return colorMap[props.variant]
}

// Background classes (Tailwind)
const getBackgroundClass = () => {
  if (props.background === 'celebration') {
    const bgMap = {
      success: 'bg-primary-purple',
      info: 'bg-purple-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
    }
    return bgMap[props.variant] || 'bg-green-500'
  }
  return 'b'
}

// Media container classes (Tailwind)
const getMediaContainerClass = () => {
  if (props.background === 'celebration') {
    return 'bg-white/20'
  }
  return 'bg-stone-100'
}
</script>

<template>
  <div class="flex items-center justify-center px-4" :class="getBackgroundClass()">
    <div class="w-full max-w-lg text-center space-y-6">
      <!-- Media: Icon, Image, Spinner, or None -->
      <div v-if="mediaType !== 'none'" class="flex justify-center">
        <div
          v-if="mediaType !== 'image'"
          class="rounded-full flex items-center justify-center w-20 h-20"
          :class="getMediaContainerClass()"
        >
          <!-- Spinner -->
          <Spinner
            v-if="mediaType === 'spinner'"
            size="xl"
            :color="background === 'celebration' ? 'white' : getIconColor()"
          />

          <!-- Icon -->
          <Icon
            v-else-if="mediaType === 'icon'"
            :name="getIcon()"
            :size="iconSize"
            :color="getIconColor()"
          />
        </div>

        <!-- Image (no background container) -->
        <Image
          v-if="mediaType === 'image' && imageSrc"
          :src="imageSrc"
          :width="imageSize"
          :height="imageSize"
          rounded
          alt="Status illustration"
        />
      </div>

      <!-- Content -->
      <div class="space-y-3">
        <!-- Big Display Title (Bold Fonts) -->
        <Text
          as="h1"
          :variant="titleVariant"
          :color="background === 'celebration' ? 'base-contrast' : 'content-primary'"
        >
          {{ title }}
        </Text>

        <!-- Description/Subtext (Normal) -->
        <Text
          v-if="description"
          variant="body-large"
          :color="background === 'celebration' ? 'base-contrast' : 'content-secondary'"
        >
          {{ description }}
        </Text>

        <!-- Alert Component (Optional) -->
        <Alert
          v-if="showAlert && alertMessage"
          :variant="alertVariant"
          :message="alertMessage"
          :link-text="alertLinkText"
          :link-href="alertLinkHref"
          :show-close-button="alertShowCloseButton"
          @close="$emit('alert-close')"
          @link-click="$emit('alert-link-click', $event)"
        />
      </div>

      <!-- Slot for custom content (optional) -->
      <div v-if="$slots.default" class="space-y-4">
        <slot />
      </div>

      <!-- Action Buttons -->
      <div v-if="primaryButtonText || secondaryButtonText" class="space-y-3">
        <!-- Primary Button -->
        <Button
          v-if="primaryButtonText"
          :variant="primaryButtonVariant"
          class="w-full"
          :loading="primaryButtonLoading"
          :disabled="primaryButtonDisabled"
          @click="$emit('primary-action')"
        >
          {{ primaryButtonText }}
        </Button>

        <!-- Secondary Button -->
        <Button
          v-if="secondaryButtonText"
          :variant="secondaryButtonVariant"
          class="w-full"
          @click="$emit('secondary-action')"
        >
          {{ secondaryButtonText }}
        </Button>
      </div>

      <!-- Slot for additional actions (like links, timer buttons) -->
      <div v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
