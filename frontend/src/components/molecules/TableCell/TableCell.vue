<!-- components/molecules/TableCell/TableCell.vue -->
<script setup>
defineProps({
  type: {
    type: String,
    default: 'text',
    validator: (v) => ['leading', 'text', 'currency', 'status'].includes(v),
  },
  align: {
    type: String,
    default: 'left',
    validator: (v) => ['left', 'right', 'center'].includes(v),
  },
})
</script>

<template>
  <td
    :class="[
      'px-4 py-4',
      align === 'left' && 'text-left',
      align === 'right' && 'text-right',
      align === 'center' && 'text-center',
    ]"
  >
    <slot />
  </td>
</template>
