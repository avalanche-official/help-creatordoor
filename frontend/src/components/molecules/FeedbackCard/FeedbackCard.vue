<!-- components/molecules/FeedbackCard/FeedbackCard.vue -->
<script setup>
import { ref } from 'vue'
import Card from '@/components/atoms/Card/Card.vue'
import Text from '@/components/atoms/Text/Text.vue'
import IconButton from '../IconButton/IconButton.vue'

import Image from '@/components/atoms/Image/Image.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  linkText: {
    type: String,
    required: true,
  },
  linkHref: {
    type: String,
    default: '#',
  },
  imageSrc: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    default: 'Feedback image',
  },
  backgroundColor: {
    type: String,
    default: 'bg-purple-50',
  },
})

const emit = defineEmits(['close', 'link-click'])

const isVisible = ref(true)

const handleClose = () => {
  isVisible.value = false
  emit('close')
}

const handleLinkClick = () => {
  emit('link-click')
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    leave-active-class="transition-all duration-200 ease-in"
    enter-from-class="opacity-0 transform translate-y-4"
    enter-to-class="opacity-100 transform translate-y-0"
    leave-from-class="opacity-100 transform translate-y-0"
    leave-to-class="opacity-0 transform translate-y-4"
  >
    <Card
      v-if="isVisible"
      :bg="backgroundColor"
      rounded="rounded-2xl"
      class="relative overflow-hidden"
    >
      <div class="relative p-">
        <!-- Close Button (Top Right) -->
        <IconButton
          icon="x"
          variant="neutral"
          size="small"
          aria-label="Close feedback card"
          class="absolute top-4 right-4 z-10"
          @click="handleClose"
        />

        <!-- Centered Content -->
        <div class="flex items-center justify-start px-24 min-h-[100px]">
          <div class="flex-col text-left z-10">
            <div>
              <Text variant="body-default" color="content-primary">
                {{ title }}
              </Text>
            </div>
            <div>
              <a :href="linkHref" class="inline-block" @click.prevent="handleLinkClick">
                <Text
                  variant="body-default"
                  color="primary-purple"
                  class="hover:text-[#7646ff] transition-colors underline"
                >
                  {{ linkText }}
                </Text>
              </a>
            </div>
          </div>
        </div>

        <!-- Image (Bottom Left, Overflow) -->
        <div class="absolute -bottom-4 -left-4 w-20 h-20 pointer-events-none opacity-80">
          <Image :src="imageSrc" :alt="imageAlt" width="80" height="80" object-fit="contain" />
        </div>
      </div>
    </Card>
  </Transition>
</template>
