<script setup>
import Logo from '@/components/atoms/Logo/Logo.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <header class="border-b bg-white" style="border-color: var(--color-border-neutral)">
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <Logo />

        <!-- Close Button -->
        <button
          @click="handleClose"
          class="p-2 rounded-full transition-colors"
          style="background-color: transparent"
          @mouseenter="$event.target.style.backgroundColor = 'var(--color-background-neutral)'"
          @mouseleave="$event.target.style.backgroundColor = 'transparent'"
          aria-label="Close"
        >
          <Icon name="close" size="lg" color="var(--color-content-secondary)" />
        </button>
      </div>
    </div>
  </header>
</template>
