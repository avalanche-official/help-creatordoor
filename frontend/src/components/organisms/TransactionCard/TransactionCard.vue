<!-- components/organisms/TransactionCard/TransactionCard.vue -->
<script setup>
import { computed } from 'vue'
import List from '@/components/organisms/List/List.vue'
import SkeletonList from '@/components/molecules/SkeletonList/SkeletonList.vue'

const props = defineProps({
  activities: {
    type: Array,
    required: true,
  },
  limit: {
    type: Number,
    default: 5, // Default to 5, pass null or 0 to show all
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showFadeout: {
    type: Boolean,
    default: true, // Show fadeout by default
  },
})

const emit = defineEmits(['select'])

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('de-CH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Get transaction status text
const getStatusText = (type, status) => {
  // If it's a refund, show that
  if (type === 'refund' || status === 'refunded') {
    return 'Rückerstattung'
  }

  // Otherwise show the actual status
  const statusTexts = {
    succeeded: 'Erfolgreich',
    pending: 'Ausstehend',
    failed: 'Fehlgeschlagen',
    refunded: 'Rückerstattung',
  }
  return statusTexts[status] || 'Unbekannt'
}

// Get description color class (Tailwind class)
const getDescriptionColorClass = (type, status) => {
  // Refunds: red
  if (type === 'refund' || status === 'refunded') {
    return 'text-red-600'
  }

  // Failed: red
  if (status === 'failed') {
    return 'text-red-600'
  }

  // Pending: yellow/orange
  if (status === 'pending') {
    return 'text-yellow-600'
  }

  // Succeeded: normal secondary color (return null to use default)
  return null
}

// Get icon based on status (NOT type!)
const getStatusIcon = (status) => {
  const icons = {
    succeeded: 'arrow-down', // Success = arrow down (money coming in)
    pending: 'clock', // Pending = clock
    failed: 'x', // Failed = X/cross
    refunded: 'undo-2', // Refunded = chargeback/undo icon
  }
  return icons[status] || 'circle'
}

// Get icon background color based on status
const getStatusIconBgColor = (status) => {
  const bgColors = {
    succeeded: 'bg-stone-100',
    pending: 'bg-stone-100',
    failed: 'bg-stone-100',
    refunded: 'bg-stone-100',
  }
  return bgColors[status] || 'bg-stone-100'
}

// Get icon color based on status
const getStatusIconColor = (status) => {
  const colors = {
    succeeded: 'text-stone-500',
    pending: 'text-stone-500',
    failed: 'text-stone-500',
    refunded: 'text-stone-500',
  }
  return colors[status] || 'text-stone-900'
}

// Check if there are more items than the limit (to show fade)
const hasMore = computed(() => {
  return props.activities.length > (props.limit || 5)
})

const activityListItems = computed(() => {
  // Limit activities if limit is set
  const limitedActivities =
    props.limit > 0 ? props.activities.slice(0, props.limit) : props.activities

  return limitedActivities.map((activity) => {
    // Get color class (might be null for default)
    const colorClass = getDescriptionColorClass(activity.type, activity.status)

    // ✅ Determine which amount to show
    let displayAmount = activity.amount // Default fallback

    if (activity.type === 'affiliate_commission') {
      // For affiliates: show commission amount
      displayAmount = activity.affiliateCommission || activity.amount
    } else if (activity.vendorAmount !== undefined && activity.vendorAmount !== null) {
      // For vendors: show vendorAmount (Nettobetrag - what they receive)
      displayAmount = activity.vendorAmount
    }

    // Always use status-based icon (no product images)
    return {
      value: activity.id,
      label: activity.title,
      description: getStatusText(activity.type, activity.status),
      descriptionColorClass: colorClass, // Pass Tailwind class directly
      icon: getStatusIcon(activity.status), // ✅ Icon based on status
      iconSize: 22,
      iconBgColor: getStatusIconBgColor(activity.status), // ✅ BG based on status
      iconColor: getStatusIconColor(activity.status), // ✅ Color based on status
      amount: `${formatCurrency(displayAmount)} ${activity.currency.toUpperCase()}`, // ✅ Shows vendorAmount
    }
  })
})

// Handle activity click
const handleActivityClick = (activityId) => {
  emit('select', activityId)
}
</script>

<template>
  <!-- Loading State -->
  <SkeletonList v-if="loading" :count="limit || 5" :spacing="3" />

  <!-- Loaded State with optional Fade-out -->
  <div v-else class="relative">
    <List :items="activityListItems" :spacing="3" @select="handleActivityClick" />

    <!-- Fade-out gradient overlay (only show if prop is true AND there are more items) -->
    <div
      v-if="showFadeout && hasMore"
      class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"
    />
  </div>
</template>
