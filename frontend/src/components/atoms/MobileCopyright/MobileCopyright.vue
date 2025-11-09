<!-- src/components/atoms/MobileCopyright/MobileCopyright.vue -->
<script setup>
import Text from '@/components/atoms/Text/Text.vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="md:hidden fixed bottom-0 left-0 right-0 bg-stone-100 py-2 px-4 text-center z-10">
    <Text variant="body-default" color="content-tertiary"> © Creatordoor {{ currentYear }}</Text>
  </div>
</template>
