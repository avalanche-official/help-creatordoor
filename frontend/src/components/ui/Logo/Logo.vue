<script setup>
defineProps({
  size: {
    type: String,
    default: 'default',
    validator: (v) => ['small', 'default'].includes(v),
  },
  href: {
    type: String,
    default: '/',
  },
})

const sizeClasses = {
  small: 'w-md h-md',
  default: 'w-xl h-xl',
}
</script>

<template>
  <a :href="href" class="flex items-center">
    <img
      src="../../../assets/CreatorHub_Logo.png"
      :class="sizeClasses[size]"
      alt="CreatorHub Logo"
    />
  </a>
</template>
