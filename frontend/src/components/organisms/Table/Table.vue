<!-- components/organisms/Table/Table.vue -->
<script setup>
defineProps({
  headers: {
    type: Array,
    required: true,
    // Example: ['Payment', 'Due', 'Amount', 'Status']
  },
  responsive: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div class="w-full overflow-x-auto rounded-lg bg-stone-100">
    <table class="w-full border-collapse">
      <!-- Header -->
      <thead>
        <tr class="bg-stone-100">
          <th
            v-for="(header, index) in headers"
            :key="index"
            :class="[
              'px-4 py-3 text-left body-default-bold text-content-primary',
              index === headers.length - 1 && 'text-right',
            ]"
          >
            {{ header }}
          </th>
        </tr>
      </thead>

      <!-- Body -->
      <tbody class="bg-white">
        <slot />
      </tbody>
    </table>
  </div>
</template>
