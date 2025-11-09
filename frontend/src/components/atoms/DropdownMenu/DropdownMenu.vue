<!-- src/components/atoms/DropdownMenu/DropdownMenu.vue -->
<script setup>
import { ref, computed } from 'vue'
import Text from '@/components/atoms/Text/Text.vue'
import Input from '@/components/atoms/Input/Input.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  selectedValue: {
    type: String,
    default: '',
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  searchPlaceholder: {
    type: String,
    default: 'Search...',
  },
  position: {
    type: String,
    default: 'center',
    validator: (v) => ['left', 'center', 'right'].includes(v),
  },
  width: {
    type: String,
    default: '250px',
  },
  // ✅ NEW: Size prop
  size: {
    type: String,
    default: 'default',
    validator: (v) => ['small', 'default', 'large'].includes(v),
  },
})

const emit = defineEmits(['select'])

const searchQuery = ref('')

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.options
  }

  const query = searchQuery.value.toLowerCase()
  return props.options.filter((option) => option.label.toLowerCase().includes(query))
})

const positionClasses = computed(() => {
  const positions = {
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0',
  }
  return positions[props.position]
})

const widthClasses = computed(() => {
  if (props.width === 'fit') {
    return 'w-fit min-w-[150px]'
  }
  return ''
})

const customWidthStyle = computed(() => {
  if (props.width === 'fit') {
    return null
  }
  return { width: props.width }
})

// ✅ NEW: Size-based max height
const maxHeightClasses = computed(() => {
  const heights = {
    small: 'max-h-40',
    default: 'max-h-60',
    large: 'max-h-80',
  }
  return heights[props.size]
})

const selectOption = (option) => {
  emit('select', option)
  searchQuery.value = ''
}

const handleClearSearch = () => {
  searchQuery.value = ''
}
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-100"
    enter-from-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition ease-in duration-75"
    leave-from-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
  >
    <div
      v-if="isOpen"
      :class="[
        'absolute z-50 mt-2 bg-white border border-stone-300 rounded-lg shadow-lg overflow-hidden flex flex-col',
        positionClasses,
        widthClasses,
        maxHeightClasses,
      ]"
      :style="customWidthStyle"
    >
      <!-- Search Input (Optional) -->
      <div v-if="searchable" class="p-2">
        <div class="relative">
          <div
            class="relative flex items-center w-full border border-stone-300 rounded-lg transition-all duration-200 bg-white"
          >
            <Icon name="search" :size="20" class="ml-3 text-stone-400" />
            <Input v-model="searchQuery" :placeholder="searchPlaceholder" type="text" />
          </div>
          <button
            v-if="searchQuery"
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-stone-100 rounded-lg p-1 transition-colors z-10"
            @click="handleClearSearch"
          >
            <Icon name="x" :size="16" class="text-stone-400" />
          </button>
        </div>
      </div>

      <!-- Options List -->
      <div class="overflow-y-auto">
        <div class="py-1 px-2">
          <button
            v-for="option in filteredOptions"
            :key="option.value"
            type="button"
            :class="[
              'cursor-pointer',
              'hover:bg-stone-100',
              'rounded-md',
              'w-full',
              'px-3',
              'py-2',
              'mb-1',
              'text-left',
              'flex items-center',
              'justify-between',
              'gap-2',
              'transition-colors duration-150',
            ]"
            @click="selectOption(option)"
          >
            <div class="flex items-center gap-2">
              <Icon
                v-if="option.icon"
                :name="option.icon"
                :size="18"
                color="#6b7280"
                class="shrink-0"
              />
              <span v-else-if="option.prefix" class="text-xl">{{ option.prefix }}</span>

              <Text variant="body-default" color="content-primary">
                {{ option.label }}
              </Text>
            </div>

            <Icon
              v-if="option.value === selectedValue"
              name="check"
              :size="20"
              class="text-black shrink-0"
            />
          </button>
        </div>

        <div v-if="searchable && filteredOptions.length === 0" class="px-3 py-2 text-center">
          <Text variant="body-large" color="content-tertiary"> No results found </Text>
        </div>
      </div>
    </div>
  </Transition>
</template>
