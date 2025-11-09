<!-- components/molecules/TransactionRow/TransactionRow.vue -->
<script setup>
import TableRow from '@/components/molecules/TableRow/TableRow.vue'
import TableCell from '@/components/molecules/TableCell/TableCell.vue'
import Avatar from '@/components/atoms/Avatar/Avatar.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

defineProps({
  transaction: {
    type: Object,
    required: true,
    // Example structure:
    // {
    //   name: 'Christie Pepper',
    //   description: 'Website design',
    //   avatar: 'CP',
    //   avatarSrc: null,
    //   due: '11 Oct 2024',
    //   amount: '3,582.00',
    //   currency: 'EUR',
    //   currencyFlag: '🇪🇺',
    //   status: 'overdue',
    //   statusText: 'Overdue',
    //   statusSubtext: '1 day ago'
    // }
  },
})

const emit = defineEmits(['click'])

const getStatusIcon = (status) => {
  const icons = {
    overdue: 'clock',
    paid: 'check-circle',
    pending: 'clock',
    alert: 'alert-circle',
  }
  return icons[status] || 'circle'
}

const getStatusColor = (status) => {
  const colors = {
    overdue: 'bg-[#FFC043] text-black',
    paid: 'bg-[#00B67A] text-white',
    pending: 'bg-[#FFC043] text-black',
    alert: 'bg-[#A8200D] text-white',
  }
  return colors[status] || 'bg-gray-200 text-black'
}
</script>

<template>
  <TableRow :clickable="true" @click="emit('click')">
    <!-- Leading Cell: Avatar + Name -->
    <TableCell type="leading">
      <div class="flex items-center gap-3">
        <Avatar :initials="transaction.avatar" :src="transaction.avatarSrc" size="medium" />
        <div>
          <Text variant="body-3-semibold" color="content-primary" class="block">
            {{ transaction.name }}
          </Text>
          <Text variant="body-3" color="content-secondary" class="block">
            {{ transaction.description }}
          </Text>
        </div>
      </div>
    </TableCell>

    <!-- Due Date -->
    <TableCell type="text">
      <Text variant="body-2" color="content-primary">
        {{ transaction.due }}
      </Text>
    </TableCell>

    <!-- Amount + Currency -->
    <TableCell type="currency" align="right">
      <div class="flex items-center justify-end gap-2">
        <Text variant="body-3-semibold" color="content-primary">
          {{ transaction.amount }} {{ transaction.currency }}
        </Text>
        <span class="text-xl">{{ transaction.currencyFlag }}</span>
      </div>
    </TableCell>

    <!-- Status -->
    <TableCell type="status" align="right">
      <div class="flex items-center justify-end gap-2">
        <div
          :class="[
            'w-10 h-10 rounded-full flex items-center justify-center',
            getStatusColor(transaction.status),
          ]"
        >
          <Icon :name="getStatusIcon(transaction.status)" :size="20" />
        </div>
        <div class="text-right">
          <Text variant="body-3-semibold" color="content-primary" class="block">
            {{ transaction.statusText }}
          </Text>
          <Text variant="body-3" color="content-secondary" class="block">
            {{ transaction.statusSubtext }}
          </Text>
        </div>
      </div>
    </TableCell>
  </TableRow>
</template>
