<!-- components/organisms/MarketplaceFilters/MarketplaceFilters.vue -->
<script setup>
import { ref, watch } from 'vue'
import Sidebar from '@/components/atoms/Sidebar/Sidebar.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  initialFilters: {
    type: Object,
    default: () => ({
      category: 'all',
      priceRange: 'all',
      sortBy: 'newest',
    }),
  },
  categories: {
    type: Array,
    required: true,
  },
  priceRanges: {
    type: Array,
    required: true,
  },
  sortOptions: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['close', 'apply'])

// Local filter state
const filters = ref({
  category: props.initialFilters.category || 'all',
  priceRange: props.initialFilters.priceRange || 'all',
  sortBy: props.initialFilters.sortBy || 'newest',
})

// Apply filters
const applyFilters = () => {
  emit('apply', { ...filters.value })
  emit('close')
}

// Reset filters
const resetFilters = () => {
  filters.value = {
    category: 'all',
    priceRange: 'all',
    sortBy: 'newest',
  }
}

// Close sidebar
const closeSidebar = () => {
  emit('close')
}

// Watch for prop changes
watch(
  () => props.initialFilters,
  (newFilters) => {
    filters.value = { ...newFilters }
  },
  { deep: true },
)
</script>

<template>
  <Sidebar :is-open="isOpen" title="Filter" @close="closeSidebar">
    <div class="space-y-6">
      <!-- Categories -->
      <div>
        <Text variant="body-default-bold" color="content-primary" class="mb-3">Kategorien</Text>
        <div class="space-y-1">
          <button
            v-for="category in categories"
            :key="category.value"
            :class="[
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left',
              filters.category === category.value
                ? 'bg-primary-purple/10 text-primary-purple'
                : 'hover:bg-stone-50 text-stone-700',
            ]"
            @click="filters.category = category.value"
          >
            <Icon
              :name="category.icon"
              :size="18"
              :color="
                filters.category === category.value
                  ? 'var(--color-primary-purple)'
                  : 'var(--color-stone-600)'
              "
            />
            <Text
              variant="body-default"
              :color="filters.category === category.value ? 'primary-purple' : 'content-secondary'"
            >
              {{ category.label }}
            </Text>
          </button>
        </div>
      </div>

      <!-- Price Range -->
      <div>
        <Text variant="body-default-bold" color="content-primary" class="mb-3">Preis</Text>
        <div class="space-y-1">
          <button
            v-for="range in priceRanges"
            :key="range.value"
            :class="[
              'w-full flex items-center px-3 py-2 rounded-lg transition-all text-left',
              filters.priceRange === range.value
                ? 'bg-primary-purple/10 text-primary-purple'
                : 'hover:bg-stone-50 text-stone-700',
            ]"
            @click="filters.priceRange = range.value"
          >
            <Text
              variant="body-default"
              :color="filters.priceRange === range.value ? 'primary-purple' : 'content-secondary'"
            >
              {{ range.label }}
            </Text>
          </button>
        </div>
      </div>

      <!-- Sort By -->
      <div>
        <Text variant="body-default-bold" color="content-primary" class="mb-3">Sortieren</Text>
        <select
          v-model="filters.sortBy"
          class="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-purple"
        >
          <option v-for="option in sortOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 pt-4">
        <Button variant="secondary" size="medium" class="flex-1" @click="resetFilters">
          Zurücksetzen
        </Button>
        <Button variant="primary" size="medium" class="flex-1" @click="applyFilters">
          Anwenden
        </Button>
      </div>
    </div>
  </Sidebar>
</template>
