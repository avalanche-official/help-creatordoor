<!-- components/atoms/Logo.vue -->
<script setup>
import { computed } from 'vue'
import LogoFull from '@/assets/CreatorDoor_Logo.png'
import LogoSingle from '@/assets/CreatorDoor_Logo_Single.png'
import LogoFullWhite from '@/assets/CreatorDoor_Logo_White.png'

const props = defineProps({
  size: {
    type: String,
    default: 'default',
    validator: (v) => ['small', 'default', 'large'].includes(v),
  },
  variant: {
    type: String,
    default: 'full',
    validator: (v) => ['full', 'icon', 'white'].includes(v),
  },
  href: {
    type: String,
    default: '/',
  },
})

// Choose logo based on variant
const logoSrc = computed(() => {
  if (props.variant === 'icon') return LogoSingle
  if (props.variant === 'white') return LogoFullWhite
  return LogoFull
})

// Size classes
const sizeClasses = computed(() => {
  const sizes = {
    small: 'h-8', // 32px
    default: 'h-10', // 40px
    large: 'h-14', // 56px
  }
  return sizes[props.size]
})
</script>

<template>
  <a :href="href" class="inline-flex items-center">
    <img
      :src="logoSrc"
      :alt="variant === 'icon' ? 'CreatorDoor' : 'CreatorDoor Logo'"
      :class="[sizeClasses, 'object-contain']"
    />
  </a>
</template>
