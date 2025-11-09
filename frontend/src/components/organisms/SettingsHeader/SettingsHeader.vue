<!-- components/organisms/SettingsHeader/SettingsHeader.vue -->
<script setup>
import { useRouter } from 'vue-router'
import Chip from '@/components/molecules/Chip/Chip.vue'
import IconButton from '@/components/molecules/IconButton/IconButton.vue'

const props = defineProps({
  chipLabel: {
    type: String,
    default: '',
  },
  showBack: {
    type: Boolean,
    default: true,
  },
  showChip: {
    type: Boolean,
    default: true,
  },
  backRoute: {
    type: String,
    default: '/dashboard',
  },
})

const router = useRouter()

const handleBack = () => {
  router.push(props.backRoute)
}
</script>

<template>
  <header class="flex items-center justify-between mb-10 pb-3">
    <!-- Left: Back Button -->
    <IconButton
      v-if="showBack"
      icon="arrow-left"
      variant="neutral"
      size="large"
      aria-label="Back"
      @click="handleBack"
    />
    <div v-else />

    <!-- Right: Chip (conditionally shown) -->

    <div v-else />
  </header>
</template>
