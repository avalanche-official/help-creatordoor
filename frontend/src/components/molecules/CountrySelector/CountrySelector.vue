<!-- src/components/molecules/CountrySelector/CountrySelector.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import Dropdown from '@/components/molecules/Dropdown/Dropdown.vue'
import BottomSheet from '../../organisms/BottomSheet/BottomSheet.vue'

import InputField from '@/components/molecules/InputField/InputField.vue'
import Select from '@/components/atoms/Select/Select.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import Label from '@/components/molecules/Label/Label.vue'
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Land',
  },
  placeholder: {
    type: String,
    default: 'Wähle dein Land',
  },
  error: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  // ✅ NEW: Width prop
  width: {
    type: String,
    default: '100%',
  },
})

const emit = defineEmits(['update:modelValue'])

// Detect if mobile
const isMobile = useMediaQuery('(max-width: 768px)')
const isSheetOpen = ref(false)
const searchQuery = ref('')

// Country list with flags
const countries = [
  // DACH Region (Top priority)
  { value: 'de', label: 'Deutschland', prefix: '🇩🇪' },
  { value: 'at', label: 'Österreich', prefix: '🇦🇹' },
  { value: 'ch', label: 'Schweiz', prefix: '🇨🇭' },

  // Major Markets
  { value: 'us', label: 'United States', prefix: '🇺🇸' },
  { value: 'gb', label: 'United Kingdom', prefix: '🇬🇧' },
  { value: 'fr', label: 'France', prefix: '🇫🇷' },
  { value: 'es', label: 'Spain', prefix: '🇪🇸' },
  { value: 'it', label: 'Italy', prefix: '🇮🇹' },
  { value: 'nl', label: 'Netherlands', prefix: '🇳🇱' },

  // Rest of Europe (Alphabetical)
  { value: 'al', label: 'Albania', prefix: '🇦🇱' },
  { value: 'ad', label: 'Andorra', prefix: '🇦🇩' },
  { value: 'am', label: 'Armenia', prefix: '🇦🇲' },
  { value: 'az', label: 'Azerbaijan', prefix: '🇦🇿' },
  { value: 'by', label: 'Belarus', prefix: '🇧🇾' },
  { value: 'be', label: 'Belgium', prefix: '🇧🇪' },
  { value: 'ba', label: 'Bosnia and Herzegovina', prefix: '🇧🇦' },
  { value: 'bg', label: 'Bulgaria', prefix: '🇧🇬' },
  { value: 'hr', label: 'Croatia', prefix: '🇭🇷' },
  { value: 'cy', label: 'Cyprus', prefix: '🇨🇾' },
  { value: 'cz', label: 'Czech Republic', prefix: '🇨🇿' },
  { value: 'dk', label: 'Denmark', prefix: '🇩🇰' },
  { value: 'ee', label: 'Estonia', prefix: '🇪🇪' },
  { value: 'fi', label: 'Finland', prefix: '🇫🇮' },
  { value: 'ge', label: 'Georgia', prefix: '🇬🇪' },
  { value: 'gr', label: 'Greece', prefix: '🇬🇷' },
  { value: 'hu', label: 'Hungary', prefix: '🇭🇺' },
  { value: 'is', label: 'Iceland', prefix: '🇮🇸' },
  { value: 'ie', label: 'Ireland', prefix: '🇮🇪' },
  { value: 'xk', label: 'Kosovo', prefix: '🇽🇰' },
  { value: 'lv', label: 'Latvia', prefix: '🇱🇻' },
  { value: 'li', label: 'Liechtenstein', prefix: '🇱🇮' },
  { value: 'lt', label: 'Lithuania', prefix: '🇱🇹' },
  { value: 'lu', label: 'Luxembourg', prefix: '🇱🇺' },
  { value: 'mt', label: 'Malta', prefix: '🇲🇹' },
  { value: 'md', label: 'Moldova', prefix: '🇲🇩' },
  { value: 'mc', label: 'Monaco', prefix: '🇲🇨' },
  { value: 'me', label: 'Montenegro', prefix: '🇲🇪' },
  { value: 'mk', label: 'North Macedonia', prefix: '🇲🇰' },
  { value: 'no', label: 'Norway', prefix: '🇳🇴' },
  { value: 'pl', label: 'Poland', prefix: '🇵🇱' },
  { value: 'pt', label: 'Portugal', prefix: '🇵🇹' },
  { value: 'ro', label: 'Romania', prefix: '🇷🇴' },
  { value: 'ru', label: 'Russia', prefix: '🇷🇺' },
  { value: 'sm', label: 'San Marino', prefix: '🇸🇲' },
  { value: 'rs', label: 'Serbia', prefix: '🇷🇸' },
  { value: 'sk', label: 'Slovakia', prefix: '🇸🇰' },
  { value: 'si', label: 'Slovenia', prefix: '🇸🇮' },
  { value: 'se', label: 'Sweden', prefix: '🇸🇪' },
  { value: 'tr', label: 'Turkey', prefix: '🇹🇷' },
  { value: 'ua', label: 'Ukraine', prefix: '🇺🇦' },
  { value: 'va', label: 'Vatican City', prefix: '🇻🇦' },

  // Middle East
  { value: 'sa', label: 'Saudi Arabia', prefix: '🇸🇦' },
  { value: 'ae', label: 'United Arab Emirates', prefix: '🇦🇪' },
  { value: 'qa', label: 'Qatar', prefix: '🇶🇦' },
  { value: 'kw', label: 'Kuwait', prefix: '🇰🇼' },
  { value: 'bh', label: 'Bahrain', prefix: '🇧🇭' },
  { value: 'om', label: 'Oman', prefix: '🇴🇲' },
  { value: 'jo', label: 'Jordan', prefix: '🇯🇴' },
  { value: 'lb', label: 'Lebanon', prefix: '🇱🇧' },
  { value: 'il', label: 'Israel', prefix: '🇮🇱' },

  // Other Major Countries
  { value: 'ca', label: 'Canada', prefix: '🇨🇦' },
  { value: 'au', label: 'Australia', prefix: '🇦🇺' },
  { value: 'nz', label: 'New Zealand', prefix: '🇳🇿' },
  { value: 'jp', label: 'Japan', prefix: '🇯🇵' },
  { value: 'cn', label: 'China', prefix: '🇨🇳' },
  { value: 'kr', label: 'South Korea', prefix: '🇰🇷' },
  { value: 'sg', label: 'Singapore', prefix: '🇸🇬' },
  { value: 'in', label: 'India', prefix: '🇮🇳' },
  { value: 'br', label: 'Brazil', prefix: '🇧🇷' },
  { value: 'mx', label: 'Mexico', prefix: '🇲🇽' },
  { value: 'za', label: 'South Africa', prefix: '🇿🇦' },
]

const selectedOption = computed(() => {
  return countries.find((opt) => opt.value === props.modelValue)
})

const displayText = computed(() => {
  return selectedOption.value?.label || ''
})

const prefix = computed(() => {
  return selectedOption.value?.prefix || ''
})

const filteredCountries = computed(() => {
  if (!searchQuery.value) return countries

  const query = searchQuery.value.toLowerCase()
  return countries.filter((country) => country.label.toLowerCase().includes(query))
})

const hasError = computed(() => !!props.error)

const handleChange = (value) => {
  emit('update:modelValue', value)
}

const openSheet = () => {
  if (!props.disabled) {
    isSheetOpen.value = true
  }
}

const selectCountry = (country) => {
  handleChange(country.value)
  isSheetOpen.value = false
  searchQuery.value = ''
}

const handleClearSearch = () => {
  searchQuery.value = ''
}
</script>

<template>
  <div class="space-y-2" :style="{ width: width }">
    <!-- Label -->
    <Label v-if="label" :text="label" />

    <!-- Desktop: Use Dropdown -->
    <Dropdown
      v-if="!isMobile"
      :model-value="modelValue"
      :options="countries"
      :searchable="true"
      :error="hasError"
      search-placeholder="Suche..."
      :placeholder="placeholder"
      @update:model-value="handleChange"
    />

    <!-- Mobile: Use Select Button + Bottom Sheet -->
    <div v-else>
      <Select
        :model-value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :error="hasError"
        :display-text="displayText"
        :prefix="prefix"
        @click="openSheet"
      />

      <!-- Bottom Sheet for Mobile -->
      <BottomSheet v-model:is-open="isSheetOpen" title="Land oder Region wählen">
        <!-- Fixed Search Input (using search slot) -->
        <template #search>
          <div class="relative">
            <InputField v-model="searchQuery" placeholder="Suche..." prefix-icon="search" />
            <!-- Clear Button -->
            <button
              v-if="searchQuery"
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-black/10 rounded-sm p-1 transition-colors z-10"
              @click="handleClearSearch"
            >
              <Icon name="x" :size="16" color="var(--color-content-tertiary)" />
            </button>
          </div>
        </template>

        <!-- Scrollable Country List (default slot) -->
        <div class="space-y-1">
          <button
            v-for="country in filteredCountries"
            :key="country.value"
            type="button"
            :class="[
              'cursor-pointer hover:bg-black/10 rounded-sm w-full px-4 py-3 text-left',
              'flex items-center gap-3',
              'transition-colors duration-150',
              {
                'bg-black/5': country.value === modelValue,
              },
            ]"
            @click="selectCountry(country)"
          >
            <span class="text-2xl">{{ country.prefix }}</span>
            <span class="text-body-2 text-[var(--color-content-primary)]">
              {{ country.label }}
            </span>
          </button>

          <!-- No Results -->
          <div
            v-if="filteredCountries.length === 0"
            class="px-4 py-8 text-center text-[var(--color-content-tertiary)]"
          >
            Keine Ergebnisse gefunden
          </div>
        </div>
      </BottomSheet>
    </div>

    <!-- Error Message -->
    <Text v-if="error" variant="body-3" color="content-error" class="block">
      {{ error }}
    </Text>
  </div>
</template>
