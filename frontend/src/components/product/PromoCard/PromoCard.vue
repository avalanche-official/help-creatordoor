<script setup>
const props = defineProps({
  // Title text
  title: {
    type: String,
    required: true,
  },
  // Description text
  description: {
    type: String,
    required: true,
  },
  // Image URL (optional)
  image: {
    type: String,
    default: '',
  },
  // Badge text (like "Free", "New")
  badge: {
    type: String,
    default: '',
  },
  // Action button text (optional)
  action: {
    type: String,
    default: '',
  },
  // Make entire card clickable
  clickable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click', 'action-click'])

const handleCardClick = () => {
  if (props.clickable) {
    emit('click')
  }
}

const handleActionClick = (e) => {
  e.stopPropagation()
  emit('action-click')
}
</script>

<template>
  <div
    :class="[
      'relative overflow-hidden rounded-2xl bg-background-elevated',
      'border border-border-default',
      'transition-all duration-200',
      clickable && 'cursor-pointer hover:shadow-lg hover:scale-[1.02]',
    ]"
    @click="handleCardClick"
  >
    <!-- Image (if provided) -->
    <div v-if="image" class="relative aspect-[4/3] overflow-hidden">
      <img :src="image" :alt="title" class="w-full h-full object-cover" />
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Badge and Action -->
      <div class="flex items-center justify-between mb-3">
        <!-- Badge -->
        <span
          v-if="badge"
          class="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 text-content-primary text-sm font-medium"
        >
          {{ badge }}
        </span>
        <div v-else />

        <!-- Action Button (Circular Button slot) -->
        <div v-if="$slots.action" @click="handleActionClick">
          <slot name="action" />
        </div>
      </div>

      <!-- Title -->
      <h3 class="text-xl font-bold text-content-primary mb-2 leading-tight">
        {{ title }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-content-secondary leading-relaxed">
        {{ description }}
      </p>

      <!-- Optional CTA Link -->
      <button
        v-if="action"
        @click="handleActionClick"
        class="mt-4 text-sm font-medium text-content-accent hover:underline"
      >
        {{ action }}
      </button>
    </div>
  </div>
</template>
