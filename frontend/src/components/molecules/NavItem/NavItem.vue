<!-- components/molecules/NavItem/NavItem.vue -->
<script setup>
import { computed, ref } from 'vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    default: null,
  },
  active: {
    type: Boolean,
    default: false,
  },
  badge: {
    type: [String, Number],
    default: null,
  },
})

const emit = defineEmits(['click'])
const isHovered = ref(false) // ✅ YOU WERE MISSING THIS!

const handleClick = () => {
  emit('click')
}

// Choose text variant based on active state OR hover state
const textVariant = computed(() => {
  return props.active || isHovered.value ? 'body-default-bold' : 'body-default'
})

// Choose color based on active state OR hover state
const textColor = computed(() => {
  return props.active || isHovered.value ? 'content-primary' : 'content-secondary'
})
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    type="button"
    :class="[
      'w-full flex items-center gap-4 px-4 py-3.5 rounded-full transition-all',
      active ? 'bg-stone-100' : '',
    ]"
    @click="handleClick"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <Icon
      :name="icon"
      :size="20"
      :class="[
        'transition-colors',
        active || isHovered ? 'text-content-primary' : 'text-content-secondary',
      ]"
    />

    <Text :variant="textVariant" :color="textColor" class="flex-1 text-left">
      {{ label }}
    </Text>
  </component>
</template>
