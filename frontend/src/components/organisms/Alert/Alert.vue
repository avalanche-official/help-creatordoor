<!-- components/organisms/Alert/Alert.vue -->
<script setup>
import { computed } from 'vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Button from '@/components/atoms/Button/Button.vue'
import IconButton from '@/components/molecules/IconButton/IconButton.vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'error',
    validator: (v) => ['error', 'warning', 'success', 'info'].includes(v),
  },
  message: {
    type: String,
    default: '',
  },
  linkText: {
    type: String,
    default: '',
  },
  linkHref: {
    type: String,
    default: '#',
  },
  showCloseButton: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['close', 'linkClick'])

// Variant configurations - ONLY icon color changes
const variantConfig = computed(() => {
  const configs = {
    error: {
      iconColor: 'text-sentiment-negative',
      defaultIcon: 'x-circle',
    },
    warning: {
      iconColor: 'text-sentiment-warning',
      defaultIcon: 'alert-triangle',
    },
    success: {
      iconColor: 'text-sentiment-positive',
      defaultIcon: 'check-circle',
    },
    info: {
      iconColor: 'text-primary-purple',
      defaultIcon: 'info',
    },
  }
  return configs[props.variant]
})

// Use custom icon or default from variant
const displayIcon = computed(() => props.icon || variantConfig.value.defaultIcon)

const handleClose = () => {
  emit('close')
}

const handleLinkClick = (event) => {
  if (props.linkHref === '#') {
    event.preventDefault()
  }
  emit('linkClick', event)
}
</script>

<template>
  <div class="flex items-start gap-3 p-4 rounded-xl bg-stone-100" role="alert">
    <!-- Left Icon -->
    <div class="flex-shrink-0 pt-1">
      <Icon :name="displayIcon" :size="20" :color="variantConfig.iconColor" />
    </div>

    <!-- Content (Message + Optional Link) -->
    <div class="flex-1 min-w-0 text-left">
      <div class="flex flex-col gap-1">
        <!-- ✅ If slot is provided, use slot (supports HTML/bold) -->
        <div v-if="$slots.default">
          <slot />
        </div>

        <!-- ✅ Otherwise, use message prop -->
        <Text v-else-if="message" variant="body-large" color="content-primary">
          {{ message }}
        </Text>

        <!-- Optional Link Button -->
        <Button
          v-if="linkText"
          variant="link"
          size="small"
          fontSize="body-link"
          :href="linkHref"
          class="self-start"
          @click="handleLinkClick"
        >
          {{ linkText }}
        </Button>
      </div>
    </div>

    <!-- Close Button -->
    <div v-if="showCloseButton" class="flex-shrink-0">
      <IconButton
        icon="x"
        variant="ghost"
        size="small"
        aria-label="Schließen"
        @click="handleClose"
      />
    </div>
  </div>
</template>
