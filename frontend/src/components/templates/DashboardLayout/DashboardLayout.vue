<!-- components/templates/DashboardLayout/DashboardLayout.vue -->
<script setup>
import { ref } from 'vue'
import DashboardSidebar from '@/components/organisms/DashboardSidebar/DashboardSidebar.vue'
import MobileBottomNav from '@/components/organisms/MobileBottomNav/MobileBottomNav.vue'

const isCollapsed = ref(false)

const handleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <div class="flex min-h-screen max-w-[1440px] mx-auto px-2">
    <!-- Sidebar (hidden on mobile, visible on desktop) -->
    <DashboardSidebar
      :collapsed="isCollapsed"
      @toggle-collapse="handleCollapse"
      class="hidden md:flex flex-shrink-0"
    />

    <!-- Main Content Area -->
    <main class="flex-1 min-w-0 pb-16 md:pb-0">
      <slot />
    </main>

    <!-- Mobile Bottom Navigation -->
    <MobileBottomNav />
  </div>
</template>
