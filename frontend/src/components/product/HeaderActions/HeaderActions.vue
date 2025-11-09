<!-- components/product/HeaderActions/HeaderActions.vue -->
<script setup>
import Button from '@/components/atoms/Button/Button.vue'
import LanguageSelector from '@/components/product/LanguageSelector/LanguageSelector.vue'

defineProps({
  currentLanguage: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['language-click'])

const handleLanguageClick = () => {
  emit('language-click')
}
</script>

<template>
  <div class="hidden lg:flex items-center gap-2">
    <!-- Language Selector -->

    <!-- Help Center -->
    <Button variant="textButton" size="small" href="/help"> Hilfebereich </Button>

    <!-- Login -->
    <Button variant="textButton" size="small" href="/login"> Einloggen </Button>

    <!-- Register Button -->
    <Button variant="primary" size="small" href="/register"> Registrieren </Button>
  </div>
</template>
