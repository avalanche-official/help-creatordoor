<!-- components/molecules/ContentBlock/ContentBlock.vue -->
<!-- ✅ ENHANCED: Supports both image and slot content, text FIRST on mobile -->
<script setup>
import Image from '@/components/atoms/Image/Image.vue'
import CopyBlock from '@/components/molecules/CopyBlock/CopyBlock.vue'
import Button from '@/components/atoms/Button/Button.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // ✅ Image props (optional if using slot)
  imageSrc: {
    type: String,
    default: '',
  },
  imageAlt: {
    type: String,
    default: '',
  },
  imageWidth: {
    type: String,
    default: '80%',
  },
  // ✅ Content mode
  contentMode: {
    type: String,
    default: 'image', // 'image' or 'slot'
    validator: (v) => ['image', 'slot'].includes(v),
  },
  // Button props
  buttonText: {
    type: String,
    default: '',
  },
  buttonVariant: {
    type: String,
    default: 'primary',
  },
  // Layout variant
  variant: {
    type: String,
    default: 'left',
    validator: (v) => ['left', 'right'].includes(v),
  },
  // ✅ NEW: Max width for slot content
  slotMaxWidth: {
    type: String,
    default: '400px',
  },
})

const emit = defineEmits(['buttonClick'])

const handleButtonClick = () => {
  emit('buttonClick')
}
</script>

<template>
  <div class="w-full">
    <!-- Left variant: Content on left (desktop), text first on mobile -->
    <div v-if="variant === 'left'" class="flex flex-col md:flex-row gap-8 md:gap-24 items-center">
      <!-- Text Content Section - shows FIRST on mobile -->
      <div class="w-full md:w-1/2 order-1 md:order-1">
        <div class="w-4/5 mx-auto md:w-full md:mx-0 space-y-6">
          <!-- Title + Description -->
          <CopyBlock
            :title="title"
            :description="description"
            title-variant="display-small"
            description-variant="body-large"
            title-color="content-primary"
            description-color="content-secondary"
            align="center"
            class="md:!text-left"
            spacing="4"
            as="h3"
          />

          <!-- Button -->
          <div v-if="buttonText" class="flex justify-center md:justify-start">
            <Button :variant="buttonVariant" @click="handleButtonClick">
              {{ buttonText }}
            </Button>
          </div>
        </div>
      </div>

      <!-- Visual Section (Image or Slot) - shows SECOND on mobile -->
      <div class="w-full md:w-1/2 flex justify-center order-2 md:order-2">
        <!-- Image Mode -->
        <Image
          v-if="contentMode === 'image' && imageSrc"
          :src="imageSrc"
          :alt="imageAlt || title"
          :width="imageWidth"
          height="auto"
          object-fit="contain"
        />

        <!-- Slot Mode -->
        <div
          v-else-if="contentMode === 'slot'"
          class="w-full flex justify-center"
          :style="{ maxWidth: slotMaxWidth }"
        >
          <slot name="visual" />
        </div>
      </div>
    </div>

    <!-- Right variant: Content on right (desktop), text first on mobile -->
    <div v-else class="flex flex-col md:flex-row gap-8 md:gap-24 items-center">
      <!-- Text Content Section - shows FIRST on mobile -->
      <div class="w-full md:w-1/2 order-1 md:order-2">
        <div class="w-4/5 mx-auto md:w-full md:mx-0 space-y-6">
          <!-- Title + Description -->
          <CopyBlock
            :title="title"
            :description="description"
            title-variant="display-small"
            description-variant="body-large"
            title-color="content-primary"
            description-color="content-secondary"
            align="center"
            class="md:!text-left"
            spacing="4"
            as="h3"
          />

          <!-- Button -->
          <div v-if="buttonText" class="flex justify-center md:justify-start">
            <Button :variant="buttonVariant" @click="handleButtonClick">
              {{ buttonText }}
            </Button>
          </div>
        </div>
      </div>

      <!-- Visual Section (Image or Slot) - shows SECOND on mobile -->
      <div class="w-full md:w-1/2 flex justify-center order-2 md:order-1">
        <!-- Image Mode -->
        <Image
          v-if="contentMode === 'image' && imageSrc"
          :src="imageSrc"
          :alt="imageAlt || title"
          :width="imageWidth"
          height="auto"
          object-fit="contain"
        />

        <!-- Slot Mode -->
        <div
          v-else-if="contentMode === 'slot'"
          class="w-full flex justify-center"
          :style="{ maxWidth: slotMaxWidth }"
        >
          <slot name="visual" />
        </div>
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
