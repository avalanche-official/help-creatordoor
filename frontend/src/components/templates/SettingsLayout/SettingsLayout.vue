<!-- components/templates/SettingsLayout/SettingsLayout.vue -->
<script setup>
import SettingsHeader from '@/components/organisms/SettingsHeader/SettingsHeader.vue'

defineProps({
  chipLabel: {
    type: String,
    default: '',
  },
  showBack: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div class="max-w-4xl mx-auto py-10">
    <!-- Settings Header (stays at top) -->
    <SettingsHeader :chip-label="chipLabel" :show-back="showBack" />

    <!-- Two Column Layout - Flexbox 50/50 -->
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Left: User Card (50% width on desktop, STICKY) -->
      <div class="flex-1 md:sticky md:top-6 md:self-start">
        <slot name="sidebar" />
      </div>

      <!-- Right: Settings Content (50% width on desktop, SCROLLABLE) -->
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>
