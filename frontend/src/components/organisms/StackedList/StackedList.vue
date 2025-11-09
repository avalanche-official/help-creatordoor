<!-- src/components/organisms/StackedList/StackedList.vue -->
<script setup>
import { ref, computed } from 'vue'
import ListItem from '@/components/molecules/ListItem/ListItem.vue'
import IconButton from '@/components/molecules/IconButton/IconButton.vue'
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  spacing: {
    type: String,
    default: '3',
  },
  iconHoverEffect: {
    type: Boolean,
    default: false,
  },
  collapsedCount: {
    type: Number,
    default: 2,
  },
})

const emit = defineEmits(['select', 'toggle'])

const isExpanded = ref(false)

// ✅ Check if there are multiple items to show expand/collapse
const hasMultipleItems = computed(() => props.items.length > 1)

// Items to display based on expansion state
const displayedItems = computed(() => {
  if (isExpanded.value || !hasMultipleItems.value) {
    return props.items
  }
  return props.items.slice(0, props.collapsedCount)
})

// Items that are "stacked" behind (only in collapsed state)
const stackedItems = computed(() => {
  if (isExpanded.value || !hasMultipleItems.value) return []
  return props.items.slice(0, Math.min(3, props.items.length))
})

const toggleExpansion = () => {
  isExpanded.value = !isExpanded.value
  emit('toggle', isExpanded.value)
}

const handleItemClick = (value) => {
  emit('select', value)
}
</script>

<template>
  <div class="space-y-4">
    <!-- Header with title and toggle button (only show button if multiple items) -->
    <div class="flex items-center justify-between px-2 sm:px-4">
      <Text variant="title-subsection" class="text-content-primary">{{ title }}</Text>
      <IconButton
        v-if="hasMultipleItems"
        :icon="isExpanded ? 'chevron-up' : 'chevron-down'"
        variant="neutral"
        size="small"
        :aria-label="isExpanded ? 'Collapse' : 'Expand'"
        @click="toggleExpansion"
      />
    </div>

    <!-- Stacked Cards Container -->
    <div class="relative px-2 sm:px-4">
      <!-- Stack Effect (only visible when collapsed AND has multiple items) -->
      <div v-if="!isExpanded && hasMultipleItems && items.length > 0" class="relative">
        <!-- Background stacked cards (visual effect only) -->
        <div
          v-for="(item, index) in stackedItems.slice(1, 3)"
          :key="`stack-${index}`"
          class="absolute inset-x-0 rounded-lg bg-stone-200 transition-all duration-300"
          :style="{
            top: `${(index + 1) * 8}px`,
            height: '72px',
            transform: `scale(${1 - (index + 1) * 0.03})`,
            zIndex: stackedItems.length - index - 1,
            opacity: 0.6,
          }"
        />

        <!-- First visible card -->
        <div class="relative z-10">
          <ListItem
            v-if="items[0]"
            :title="items[0].label"
            :description="items[0].description"
            :icon="items[0].icon"
            :icon-size="items[0].iconSize || 22"
            :icon-color="items[0].iconColor || '#0e0e11'"
            :icon-bg-color="items[0].iconBgColor || 'bg-stone-200'"
            :icon-hover-effect="iconHoverEffect"
            :amount="items[0].amount"
            :bg-color="items[0].bgColor"
            :hover-bg-color="items[0].hoverBgColor"
            :action-button="items[0].actionButton"
            :disabled="items[0].disabled"
            @click="handleItemClick(items[0].value)"
          />
        </div>
      </div>

      <!-- Single item view (no stacking, no animation) -->
      <div v-if="!hasMultipleItems && items.length > 0">
        <ListItem
          :title="items[0].label"
          :description="items[0].description"
          :icon="items[0].icon"
          :icon-size="items[0].iconSize || 22"
          :icon-color="items[0].iconColor || '#0e0e11'"
          :icon-bg-color="items[0].iconBgColor || 'bg-stone-200'"
          :icon-hover-effect="iconHoverEffect"
          :amount="items[0].amount"
          :bg-color="items[0].bgColor"
          :hover-bg-color="items[0].hoverBgColor"
          :action-button="items[0].actionButton"
          :disabled="items[0].disabled"
          @click="handleItemClick(items[0].value)"
        />
      </div>

      <!-- Expanded List with Animation (only for multiple items) -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="isExpanded && hasMultipleItems" :class="`space-y-${spacing}`">
          <ListItem
            v-for="item in displayedItems"
            :key="item.value"
            :title="item.label"
            :description="item.description"
            :icon="item.icon"
            :icon-size="item.iconSize || 22"
            :icon-color="item.iconColor || '#0e0e11'"
            :icon-bg-color="item.iconBgColor || 'bg-stone-200'"
            :icon-hover-effect="iconHoverEffect"
            :amount="item.amount"
            :bg-color="item.bgColor"
            :hover-bg-color="item.hoverBgColor"
            :action-button="item.actionButton"
            :disabled="item.disabled"
            @click="handleItemClick(item.value)"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>
