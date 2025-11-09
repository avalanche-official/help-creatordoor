<!-- components/organisms/MobileBottomNav/MobileBottomNav.vue -->
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Icon from '@/components/atoms/Icon/Icon.vue'

const route = useRoute()
const router = useRouter()

const navItems = [
  { label: 'Home', icon: 'home', to: '/dashboard' },
  { label: 'Berichte', icon: 'chart-no-axes-column', to: '/dashboard/analytics' },
  { label: 'Marktplatz', icon: 'store', to: '/dashboard/marketplace' },
  { label: 'Produkte', icon: 'package', to: '/dashboard/products' },
]

const isActive = (path) => {
  return route.path === path
}

const navigate = (to) => {
  router.push(to)
}
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white md:hidden z-50">
    <div class="flex items-center justify-center gap-2 px-2 py-4 safe-area-bottom">
      <button
        v-for="item in navItems"
        :key="item.to"
        type="button"
        :class="[
          'flex flex-col items-center justify-center gap-1 px-4 pb-3 rounded-lg transition-all min-w-[64px]',
          isActive(item.to)
            ? 'text-interactive-accent'
            : 'text-content-secondary hover:text-content-primary',
        ]"
        @click="navigate(item.to)"
      >
        <!-- Icon -->
        <Icon :name="item.icon" :size="18" />

        <!-- Label with new nav-mobile class -->
        <span
          :class="[
            'text-xs leading-none',
            isActive(item.to) ? 'text-content-primary' : 'text-content-secondary',
          ]"
        >
          {{ item.label }}
        </span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
