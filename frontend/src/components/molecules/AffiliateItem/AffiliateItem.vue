<!-- components/molecules/AffiliateItem/AffiliateItem.vue -->
<script setup>
import { computed } from 'vue'
import Avatar from '@/components/atoms/Avatar/Avatar.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  avatarSrc: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: 'pending',
    validator: (v) => ['pending', 'approved', 'cancelled'].includes(v),
  },
  earnings: {
    type: String,
    default: 'CHF 0',
  },
  date: {
    type: String,
    required: true,
  },
})

const statusConfig = {
  pending: {
    color: 'bg-gold',
    text: 'Pending',
    textColor: 'text-black',
    icon: 'clock',
    iconColor: '#ffffff',
  },
  approved: {
    color: 'bg-green-600',
    text: 'Approved',
    icon: 'check',
    textColor: 'text-white',
    iconColor: '#ffffff',
  },
  cancelled: {
    color: 'bg-coral-red',
    text: 'Cancelled',
    icon: 'x',
    textColor: 'text-black',
    iconColor: '#ffffff',
  },
}

// Mask email function
const maskedEmail = computed(() => {
  if (!props.email) return ''

  const [localPart, domain] = props.email.split('@')

  if (!localPart || !domain) return props.email

  // Show first 2 characters, mask the rest before @
  const visibleChars = Math.min(2, localPart.length)
  const maskedLocal = localPart.substring(0, visibleChars) + '***'

  // For domain, show first letter and everything after the last dot
  const domainParts = domain.split('.')
  const tld = domainParts[domainParts.length - 1]
  const maskedDomain = domain.charAt(0) + '***.' + tld

  return `${maskedLocal}@${maskedDomain}`
})
</script>

<template>
  <div class="flex items-center justify-between hover:bg-stone-50 transition-colors">
    <!-- Left: Avatar + Info -->
    <div class="flex items-center gap-3">
      <Avatar
        :icon="statusConfig[status].icon"
        :icon-size="20"
        size="small"
        :background-color="statusConfig[status].color"
        :text-color="statusConfig[status].textColor"
      />
      <div>
        <Text variant="body-default" color="content-secondary" class="text-sm">
          {{ maskedEmail }}
        </Text>
      </div>
    </div>

    <!-- Right: Status, Earnings, Date -->
    <div class="flex items-center gap-6">
      <!-- Status -->
      <div class="flex items-center gap-2">
        <Text variant="body-default" color="content-secondary">
          {{ statusConfig[status].text }}
        </Text>
      </div>

      <!-- Earnings -->
      <Text variant="body-default-bold" color="content-primary">{{ earnings }}</Text>

      <!-- Date -->
      <Text variant="body-default" color="content-tertiary" class="text-sm">{{ date }}</Text>
    </div>
  </div>
</template>
