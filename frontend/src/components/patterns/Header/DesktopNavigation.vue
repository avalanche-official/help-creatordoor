<!-- components/patterns/Header/DesktopNavigation.vue -->
<script setup>
import MegaMenuButton from '@/components/product/MegaMenuButton/MegaMenuButton.vue'

defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
  activeMenuId: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['toggle-menu', 'mouse-enter'])
</script>

<template>
  <nav class="hidden lg:flex items-center gap-2">
    <div v-for="item in menuItems" :key="item.id" class="relative mega-menu-container">
      <MegaMenuButton
        :label="item.label"
        :is-active="activeMenuId === item.id"
        @click="emit('toggle-menu', item.id)"
        @mouseenter="emit('mouse-enter', item.id)"
      />
    </div>
  </nav>
</template>
