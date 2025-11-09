<!-- layouts/AuthLayout.vue -->
<script setup>
import SimpleHeader from '@/components/organisms/SimpleHeader/SimpleHeader.vue'

defineProps({
  maxWidth: {
    type: String,
    default: 'max-w-lg',
  },
  showBackButton: {
    type: Boolean,
    default: false,
  },
  backRoute: {
    type: String,
    default: null,
  },
  showCloseButton: {
    type: Boolean,
    default: true,
  },
  closeRoute: {
    type: String,
    default: '/',
  },
  logoSize: {
    type: String,
    default: 'small',
  },
})
</script>

<template>
  <div class="flex flex-col bg-background-screen">
    <!-- Header - Same for all auth pages -->
    <SimpleHeader
      py="4"
      :show-back-button="showBackButton"
      :back-route="backRoute"
      :show-close-button="showCloseButton"
      :close-route="closeRoute"
      :logo-size="logoSize"
    />

    <!-- Main Content - Centered vertically and horizontally -->
    <main class="flex-1 flex items-center justify-center px-4 py-8">
      <div class="w-full" :class="maxWidth">
        <!-- This is where each page's content goes -->
        <slot />
      </div>
    </main>
  </div>
</template>
