<script setup>
import { ref, provide, computed } from 'vue'

const props = defineProps({
  // Model value for v-model (active tab value)
  modelValue: {
    type: [String, Number],
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const tabsRef = ref(null)

const activeTab = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
    emit('change', value)
  },
})

// Provide context to Tab children
provide('tabs', {
  activeTab,
  setActiveTab: (value) => {
    activeTab.value = value
  },
})

const containerClasses = computed(() => {
  return ['relative', 'border-b', 'border-border-default']
})

const tabsListClasses = computed(() => {
  return ['flex', 'overflow-x-auto', 'scrollbar-hide']
})
</script>

<template>
  <div :class="containerClasses">
    <div ref="tabsRef" :class="tabsListClasses" role="tablist">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar but keep functionality */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
