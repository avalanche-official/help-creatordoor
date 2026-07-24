<!-- components/atoms/Logo.vue -->
<script setup>
import { computed } from 'vue'
import LogoFull from '@/assets/CreatorDoor_Logo.png'
import LogoSingle from '@/assets/CreatorDoor_Logo_Single.png'
import LogoFullWhite from '@/assets/CreatorDoor_Logo_White.png'
// Written-out wordmark (CREATORDOOR text) — same asset as the main webapp
import LogoWordmarkWhite from '@/assets/CREATORDOOR_white.png'

const props = defineProps({
  size: {
    type: String,
    default: 'default',
    validator: (v) => ['x-mini', 'mini', 'small', 'default', 'large'].includes(v),
  },
  variant: {
    type: String,
    default: 'full',
    validator: (v) => ['full', 'icon', 'white', 'wordmark-white'].includes(v),
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
  if (props.variant === 'wordmark-white') return LogoWordmarkWhite
  return LogoFull
})

// Size classes
const sizeClasses = computed(() => {
  const sizes = {
    'x-mini': 'h-4', // 16px — wordmark height used in the webapp header
    mini: 'h-6', // 24px
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
