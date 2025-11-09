<!-- components/organisms/DashboardSidebar/DashboardSidebar.vue -->
<!-- ✅ UPDATED: Hides Management when in affiliate mode -->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAccountTypeStore } from '@/stores/accountTypeStore'
import Logo from '@/components/atoms/Logo/Logo.vue'
import NavItem from '@/components/molecules/NavItem/NavItem.vue'
import DropdownNavItem from '@/components/molecules/DropdownNavItem/DropdownNavItem.vue'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle-collapse'])
const route = useRoute()
const accountTypeStore = useAccountTypeStore()

// ✅ Check if user is affiliate
const isAffiliate = computed(() => accountTypeStore.selectedAccountType === 'affiliate')

const isActive = (path) => {
  // For dashboard home, only match exact path
  if (path === '/dashboard') {
    return route.path === '/dashboard'
  }
  // For other routes, match path and sub-paths
  return route.path === path || route.path.startsWith(path + '/')
}

// Check if any item in a dropdown is active
const isDropdownActive = (items) => {
  return items.some((item) => isActive(item.to))
}
</script>

<template>
  <aside
    :class="[
      'bg-white sticky top-0 h-screen',
      'flex flex-col transition-all duration-300',
      collapsed ? 'w-20' : 'w-64',
    ]"
  >
    <!-- Header: Logo -->
    <div class="flex items-center justify-center pt-10 pb-8 flex-shrink-0">
      <Logo :variant="collapsed ? 'icon' : 'full'" size="default" href="/dashboard" />
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto p-4 space-y-1">
      <NavItem label="Home" icon="home" to="/dashboard" :active="isActive('/dashboard')" />
      <NavItem
        label="Produkte"
        icon="package"
        to="/dashboard/products"
        :active="isActive('/dashboard/products')"
      />
      <NavItem
        label="Berichte"
        icon="bar-chart"
        to="/dashboard/analytics"
        :active="isActive('/dashboard/analytics')"
      />

      <!-- ✅ Only show Management when NOT affiliate -->
      <NavItem
        v-if="!isAffiliate"
        label="Management"
        icon="users"
        to="/dashboard/affiliates"
        :active="isActive('/dashboard/affiliates')"
      />

      <DropdownNavItem
        label="Finanzen"
        icon="wallet"
        :active="
          isDropdownActive([
            { to: '/dashboard/payment' },
            { to: '/dashboard/payment/history' },
            { to: '/dashboard/stripe' },
          ])
        "
        :items="[
          { label: 'Konto', icon: 'circle-dollar-sign', to: '/dashboard/payment' },
          { label: 'Historie', icon: 'scroll-text', to: '/dashboard/payment/history' },
          {
            label: 'Stripe öffnen',
            icon: 'square-arrow-out-up-right',
            to: '/dashboard/stripe',
          },
        ]"
      />

      <NavItem
        label="Marktplatz"
        icon="store"
        to="/dashboard/marketplace"
        :active="isActive('/dashboard/marketplace')"
      />

      <NavItem
        label="Motomation VIP"
        icon="gem"
        to="/dashboard/motomation-vip"
        :active="isActive('/dashboard/motomation')"
      />
    </nav>
  </aside>
</template>
