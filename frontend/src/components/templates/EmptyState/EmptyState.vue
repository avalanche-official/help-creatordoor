<!-- components/templates/EmptyState/EmptyState.vue -->
<script setup>
import Text from '@/components/atoms/Text/Text.vue'
import Button from '@/components/atoms/Button/Button.vue'

const props = defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  imageWidth: {
    type: Number,
    default: 200,
  },
  imageHeight: {
    type: Number,
    default: 200,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  buttonText: {
    type: String,
    default: '',
  },
  buttonVariant: {
    type: String,
    default: 'primary',
  },
  // ✅ NEW: Loading prop
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['action'])

const handleAction = () => {
  emit('action')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center py-12 px-4">
    <!-- Image -->
    <img
      :src="imageSrc"
      :alt="title"
      :width="imageWidth"
      :height="imageHeight"
      class="mb-6 object-contain"
    />

    <!-- Title -->
    <Text variant="title-section" color="content-primary" class="mb-2">
      {{ title }}
    </Text>

    <!-- Subtitle -->
    <Text v-if="subtitle" variant="body-default" color="content-secondary" class="mb-6 max-w-md">
      {{ subtitle }}
    </Text>

    <!-- Actions Slot (for custom buttons) or Default Button -->
    <slot name="actions">
      <Button
        v-if="buttonText"
        :variant="buttonVariant"
        :loading="loading"
        :disabled="loading"
        @click="handleAction"
      >
        {{ buttonText }}
      </Button>
    </slot>
  </div>
</template>
