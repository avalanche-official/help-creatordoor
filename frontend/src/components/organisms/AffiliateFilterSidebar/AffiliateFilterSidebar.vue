<script setup>
import { ref, watch } from 'vue'
import Sidebar from '@/components/atoms/Sidebar/Sidebar.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Chip from '@/components/molecules/Chip/Chip.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  initialFilters: {
    type: Object,
    default: () => ({
      status: 'all',
      commissionMin: null,
      commissionMax: null,
      dateFrom: null,
      dateTo: null,
    }),
  },
})

const emit = defineEmits(['close', 'apply'])

// Local filter state
const filters = ref({
  status: props.initialFilters.status || 'all',
  commissionMin: props.initialFilters.commissionMin || null,
  commissionMax: props.initialFilters.commissionMax || null,
  dateFrom: props.initialFilters.dateFrom || null,
  dateTo: props.initialFilters.dateTo || null,
})

// Status options
const statusOptions = [
  { value: 'all', label: 'Alle', icon: 'users' },
  { value: 'pending', label: 'Ausstehend', icon: 'clock' },
  { value: 'active', label: 'Aktiv', icon: 'check' },
  { value: 'rejected', label: 'Abgelehnt', icon: 'x' },
]

// Apply filters
const applyFilters = () => {
  emit('apply', { ...filters.value })
  emit('close')
}

// Reset filters
const resetFilters = () => {
  filters.value = {
    status: 'all',
    commissionMin: null,
    commissionMax: null,
    dateFrom: null,
    dateTo: null,
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
      <!-- Status Filter -->
      <div>
        <Text variant="body-default-bold" color="content-primary" class="mb-3">Status</Text>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="option in statusOptions"
            :key="option.value"
            @click="filters.status = option.value"
            :class="[
              'flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all',
              filters.status === option.value
                ? 'border-primary-purple bg-primary-purple/5'
                : 'border-stone-200 hover:border-stone-300',
            ]"
          >
            <div
              :class="[
                'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                filters.status === option.value
                  ? 'border-primary-purple bg-primary-purple'
                  : 'border-stone-300',
              ]"
            >
              <div
                v-if="filters.status === option.value"
                class="w-2 h-2 bg-white rounded-full"
              ></div>
            </div>
            <Text
              variant="body-default"
              :color="filters.status === option.value ? 'content-primary' : 'content-secondary'"
            >
              {{ option.label }}
            </Text>
          </button>
        </div>
      </div>

      <!-- Commission Range -->
      <div>
        <Text variant="body-default-bold" color="content-primary" class="mb-3">
          Provision (%)
        </Text>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block mb-2">
              <Text variant="body-default" color="content-tertiary">Min</Text>
            </label>
            <input
              v-model.number="filters.commissionMin"
              type="number"
              min="0"
              max="100"
              placeholder="0"
              class="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary-purple"
            />
          </div>
          <div>
            <label class="block mb-2">
              <Text variant="body-default" color="content-tertiary">Max</Text>
            </label>
            <input
              v-model.number="filters.commissionMax"
              type="number"
              min="0"
              max="100"
              placeholder="100"
              class="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary-purple"
            />
          </div>
        </div>
      </div>

      <!-- Date Range -->
      <div>
        <Text variant="body-default-bold" color="content-primary" class="mb-3"> Zeitraum </Text>
        <div class="space-y-3">
          <div>
            <label class="block mb-2">
              <Text variant="body-default" color="content-tertiary">Von</Text>
            </label>
            <input
              v-model="filters.dateFrom"
              type="date"
              class="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary-purple"
            />
          </div>
          <div>
            <label class="block mb-2">
              <Text variant="body-default" color="content-tertiary">Bis</Text>
            </label>
            <input
              v-model="filters.dateTo"
              type="date"
              class="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary-purple"
            />
          </div>
        </div>
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
