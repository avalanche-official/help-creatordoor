<!-- src/components/molecules/SelectableCard/SelectableCard.vue -->
<script setup>
import { computed } from 'vue'
import Image from '@/components/atoms/Image/Image.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  imageSize: {
    type: Number,
    default: 64,
  },
  imageRounded: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
  iconSize: {
    type: Number,
    default: 32,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click', 'select'])

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
    emit('select')
  }
}
</script>

<template>
  <button
    type="button"
    class="relative w-full h-48 p-8 rounded-lg transition-all cursor-pointer bg-stone-100 hover:brightness-95 flex flex-col items-center justify-center text-center"
    :disabled="disabled"
    :class="disabled && 'opacity-50 cursor-not-allowed'"
    @click="handleClick"
  >
    <!-- Media (Image, Icon, or Emoji Slot) -->
    <div class="mb-4">
      <!-- Custom Media Slot (for emoji) -->
      <slot v-if="$slots.media" name="media" />

      <!-- Image -->
      <Image
        v-else-if="image"
        :src="image"
        :width="imageSize"
        :height="imageSize"
        :rounded="imageRounded"
        :alt="title"
      />

      <!-- Icon -->
      <Icon v-else-if="icon" :name="icon" :size="iconSize" color="var(--color-content-primary)" />
    </div>

    <!-- Content -->
    <div class="space-y-2">
      <Text variant="body-large-bold" color="content-primary" class="block">
        {{ title }}
      </Text>

      <Text v-if="description" variant="body-default" color="content-secondary" class="block">
        {{ description }}
      </Text>
    </div>
  </button>
</template>
