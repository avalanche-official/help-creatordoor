<!-- components/organisms/AccordionGroup/AccordionGroup.vue -->
<script setup>
import { ref } from 'vue'
import Accordion from '@/components/molecules/Accordion/Accordion.vue'
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
    required: true,
    // Each item: { title: String, content: String, contentIsHtml?: Boolean }
  },
  // ✅ Only allow one item open at a time
  singleOpen: {
    type: Boolean,
    default: false,
  },
  // ✅ Icon for all accordions
  icon: {
    type: String,
    default: 'chevron-down',
  },
  // ✅ Border style
  showBorders: {
    type: Boolean,
    default: true,
  },
})

const openItems = ref(new Set())

const handleToggle = (index, isOpen) => {
  if (props.singleOpen) {
    // Close all other items
    openItems.value.clear()
    if (isOpen) {
      openItems.value.add(index)
    }
  } else {
    // Allow multiple open
    if (isOpen) {
      openItems.value.add(index)
    } else {
      openItems.value.delete(index)
    }
  }
}

const isItemOpen = (index) => {
  return openItems.value.has(index)
}
</script>

<template>
  <div class="accordion-group space-y-0">
    <!-- Optional Title -->
    <div v-if="title" class="mb-6">
      <Text variant="title-section" color="content-primary">
        {{ title }}
      </Text>
    </div>

    <!-- Accordions -->
    <div class="space-y-0">
      <Accordion
        v-for="(item, index) in items"
        :key="index"
        :title="item.title"
        :content="item.content"
        :content-is-html="item.contentIsHtml || false"
        :initial-open="isItemOpen(index)"
        :icon="icon"
        :show-border="showBorders"
        :border-position="index === 0 ? 'both' : 'bottom'"
        @toggle="(isOpen) => handleToggle(index, isOpen)"
      >
        <!-- Pass through slot content if needed -->
        <slot :name="`item-${index}`" />
      </Accordion>
    </div>
  </div>
</template>
