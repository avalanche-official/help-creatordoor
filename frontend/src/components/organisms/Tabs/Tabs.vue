<!-- components/organisms/Tabs/Tabs.vue -->
<script setup>
import { ref, watch } from 'vue'
import Tab from '@/components/molecules/Tab/Tab.vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const activeTab = ref(props.modelValue || props.tabs[0]?.value)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      activeTab.value = newValue
    }
  },
)

const handleTabClick = (tabValue) => {
  activeTab.value = tabValue
  emit('update:modelValue', tabValue)
  emit('change', tabValue)
}
</script>

<template>
  <div class="border-b border-stone-300">
    <div class="overflow-x-auto scrollbar-hide">
      <div class="flex min-w-min">
        <Tab
          v-for="tab in tabs"
          :key="tab.value"
          :label="tab.label"
          :active="activeTab === tab.value"
          :disabled="tab.disabled"
          class="flex-shrink-0"
          @click="handleTabClick(tab.value)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
