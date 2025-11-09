<!-- components/molecules/Accordion/Accordion.vue -->
<script setup>
import { ref } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'
import IconButton from '@/components/molecules/IconButton/IconButton.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: '',
  },
  // ✅ Support HTML content
  contentIsHtml: {
    type: Boolean,
    default: false,
  },
  // ✅ Initial open/closed state
  initialOpen: {
    type: Boolean,
    default: false,
  },
  // ✅ Icon customization
  icon: {
    type: String,
    default: 'chevron-down',
  },
  iconSize: {
    type: String,
    default: 'medium',
  },
  // ✅ Border options
  showBorder: {
    type: Boolean,
    default: true,
  },
  borderPosition: {
    type: String,
    default: 'bottom', // 'top', 'bottom', 'both'
    validator: (v) => ['top', 'bottom', 'both', 'none'].includes(v),
  },
})

const emit = defineEmits(['toggle'])

const isOpen = ref(props.initialOpen)

const toggle = () => {
  isOpen.value = !isOpen.value
  emit('toggle', isOpen.value)
}

// Border classes
const borderClasses = () => {
  if (!props.showBorder || props.borderPosition === 'none') return ''

  const classes = []
  if (props.borderPosition === 'top' || props.borderPosition === 'both') {
    classes.push('border-t')
  }
  if (props.borderPosition === 'bottom' || props.borderPosition === 'both') {
    classes.push('border-b')
  }
  classes.push('border-stone-200')
  return classes.join(' ')
}
</script>

<template>
  <div :class="['accordion', borderClasses()]">
    <!-- Header (clickable) -->
    <button
      type="button"
      class="w-full flex items-center justify-between py-4 cursor-pointer group"
      @click="toggle"
    >
      <!-- Title -->
      <Text
        variant="body-large-bold"
        color="content-primary"
        class="text-left pr-4 group-hover:text-primary-purple transition-colors"
      >
        {{ title }}
      </Text>

      <!-- Icon Button -->
      <div
        class="transform transition-transform duration-300 flex-shrink-0"
        :class="{ 'rotate-180': isOpen }"
      >
        <IconButton
          :icon="icon"
          variant="ghost"
          :size="iconSize"
          aria-label="Toggle"
          :group-hover="false"
        />
      </div>
    </button>

    <!-- Content (expandable) -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[500px]"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 max-h-[500px]"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="isOpen" class="overflow-hidden">
        <div class="pb-4 pr-12">
          <!-- HTML Content -->
          <div
            v-if="contentIsHtml"
            class="text-stone-600 leading-relaxed prose prose-sm max-w-none"
            v-html="content"
          />

          <!-- Plain Text Content -->
          <Text v-else variant="body-large" color="content-secondary" class="leading-relaxed">
            {{ content }}
          </Text>

          <!-- Slot for custom content -->
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Smooth height transitions */
.accordion {
  @apply transition-all duration-300;
}
</style>
