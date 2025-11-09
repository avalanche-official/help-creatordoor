<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    // Example: [{ id: 1, question: 'What is an IBAN?', answer: '...' }]
  },
  allowMultiple: {
    type: Boolean,
    default: false, // If false, only one item can be open at a time
  },
  defaultOpen: {
    type: [Number, Array],
    default: null, // Index(es) of item(s) to be open by default
  },
})

// Track which items are open
const openItems = ref(new Set())

// Initialize default open items
if (props.defaultOpen !== null) {
  if (Array.isArray(props.defaultOpen)) {
    openItems.value = new Set(props.defaultOpen)
  } else {
    openItems.value = new Set([props.defaultOpen])
  }
}

const toggleItem = (index) => {
  if (openItems.value.has(index)) {
    // Close the item
    openItems.value.delete(index)
  } else {
    // Open the item
    if (!props.allowMultiple) {
      // Close all other items if allowMultiple is false
      openItems.value.clear()
    }
    openItems.value.add(index)
  }
  // Trigger reactivity
  openItems.value = new Set(openItems.value)
}

const isOpen = (index) => openItems.value.has(index)
</script>

<template>
  <div class="accordion w-full">
    <div
      v-for="(item, index) in items"
      :key="item.id || index"
      class="accordion-item border-b border-border-default last:border-b-0"
    >
      <!-- Question/Header Button -->
      <button
        :aria-expanded="isOpen(index)"
        :aria-controls="`accordion-content-${index}`"
        class="accordion-header w-full flex items-center justify-between py-5 text-left transition-colors hover:bg-background-elevated/50"
        @click="toggleItem(index)"
      >
        <span class="text-base font-medium text-content-primary pr-4 leading-snug">
          {{ item.question }}
        </span>

        <!-- Toggle Icon -->
        <span
          :class="[
            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
            isOpen(index)
              ? 'bg-content-positive text-white rotate-45'
              : 'bg-gray-200 text-content-primary',
          ]"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </span>
      </button>

      <!-- Answer/Content Panel -->
      <div
        :id="`accordion-content-${index}`"
        :class="['accordion-content overflow-hidden transition-all duration-300 ease-in-out']"
        :style="{
          maxHeight: isOpen(index) ? '1000px' : '0',
          opacity: isOpen(index) ? '1' : '0',
        }"
      >
        <div class="pb-6 pr-12 text-content-secondary leading-relaxed">
          <!-- If answer is a string -->
          <p v-if="typeof item.answer === 'string'" class="text-sm">
            {{ item.answer }}
          </p>

          <!-- If answer is HTML or structured content -->
          <div v-else-if="item.answer" v-html="item.answer" class="text-sm space-y-3" />

          <!-- Slot for custom content -->
          <slot :name="`answer-${index}`" :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure smooth transitions */
.accordion-content {
  transition:
    max-height 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
}

/* Optional: Add focus styles for accessibility */
.accordion-header:focus {
  outline: 2px solid var(--color-content-accent);
  outline-offset: -2px;
}

.accordion-header:focus:not(:focus-visible) {
  outline: none;
}
</style>
