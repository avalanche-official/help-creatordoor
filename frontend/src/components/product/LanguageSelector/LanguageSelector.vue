<script setup>
const props = defineProps({
  currentLanguage: {
    type: Object,
    required: true,
    // Example: { flag: '🇩🇪', code: 'DE', name: 'Deutsch' }
  },
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    @click="emit('click')"
    class="cursor-pointer flex items-center gap-2 justify-center rounded-full hover:bg-background-neutral transition-colors text-content-secondary"
  >
    <span class="text-lg">{{ currentLanguage.flag }}</span>
    <span class="text-body-default font-medium uppercase">{{ currentLanguage.code }}</span>
  </button>
</template>
