<!-- components/product/LinkSection/LinkSection.vue -->
<script setup>
import Text from '@/components/atoms/Text/Text.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  links: {
    type: Array,
    required: true,
  },
  iconComponents: {
    // Add this
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="flex-1">
    <Text
      variant="body-default"
      color="content-secondary"
      as="h3"
      class="border-b border-stone-200 mx-2 mb-4 pb-2"
    >
      {{ title }}
    </Text>
    <ul class="space-y-2">
      <li v-for="link in links" :key="link.href">
        <a
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          class="flex items-center gap-2 hover:bg-background-accent w-fit px-2 py-1.5 rounded-full hover:bg-stone transition-colors"
        >
          <component
            :is="iconComponents[link.icon]"
            v-if="link.icon && iconComponents[link.icon]"
            class="w-7 h-7 text-purple-600 bg-stone-100 p-1.5 rounded-full flex-shrink-0"
          />
          <Text variant="body-large-bold" color="content-primary">
            {{ link.label }}
          </Text>
        </a>
      </li>
    </ul>
  </div>
</template>
