<!-- src/components/molecules/PhoneInput/PhoneInput.vue -->
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import Label from '@/components/molecules/Label/Label.vue'
import Input from '@/components/atoms/Input/Input.vue'
import Select from '@/components/atoms/Select/Select.vue'
import BottomSheet from '@/components/organisms/BottomSheet/BottomSheet.vue'
import InputField from '@/components/molecules/InputField/InputField.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const props = defineProps({
  countryCode: {
    type: String,
    default: '+41',
  },
  phoneNumber: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Telefonnummer',
  },
  error: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:phone'])

const isMobile = useMediaQuery('(max-width: 768px)')
const isSheetOpen = ref(false)
const isDropdownOpen = ref(false)
const searchQuery = ref('')
const localPhoneNumber = ref(props.phoneNumber)
const localCountryCode = ref(props.countryCode)
const dropdownRef = ref(null)

// Country codes with flags
const countryCodes = [
  { value: '+41', label: 'Schweiz (+41)', prefix: '🇨🇭', code: '+41' },
  { value: '+43', label: 'Österreich (+43)', prefix: '🇦🇹', code: '+43' },
  { value: '+49', label: 'Deutschland (+49)', prefix: '🇩🇪', code: '+49' },
  { value: '+1', label: 'United States (+1)', prefix: '🇺🇸', code: '+1' },
  { value: '+44', label: 'United Kingdom (+44)', prefix: '🇬🇧', code: '+44' },
  { value: '+33', label: 'France (+33)', prefix: '🇫🇷', code: '+33' },
  { value: '+34', label: 'Spain (+34)', prefix: '🇪🇸', code: '+34' },
  { value: '+39', label: 'Italy (+39)', prefix: '🇮🇹', code: '+39' },
  { value: '+31', label: 'Netherlands (+31)', prefix: '🇳🇱', code: '+31' },
  { value: '+32', label: 'Belgium (+32)', prefix: '🇧🇪', code: '+32' },
]

const selectedCountry = computed(() => {
  return countryCodes.find((c) => c.value === localCountryCode.value)
})

const filteredCountryCodes = computed(() => {
  if (!searchQuery.value) return countryCodes

  const query = searchQuery.value.toLowerCase()
  return countryCodes.filter((country) => country.label.toLowerCase().includes(query))
})

const handlePhoneInput = (value) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '')
  localPhoneNumber.value = digits

  emit('update:phone', {
    countryCode: localCountryCode.value,
    phoneNumber: digits,
  })
}

const handleCountryCodeChange = (value) => {
  localCountryCode.value = value
  emit('update:phone', {
    countryCode: value,
    phoneNumber: localPhoneNumber.value,
  })
}

const selectCountryCode = (country) => {
  handleCountryCodeChange(country.value)
  isDropdownOpen.value = false
  isSheetOpen.value = false
  searchQuery.value = ''
}

const handleClearSearch = () => {
  searchQuery.value = ''
}

const displayPhoneNumber = computed(() => {
  return localPhoneNumber.value
})

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="w-full space-y-2">
    <!-- Label -->
    <Label v-if="label" :text="label" />

    <!-- Phone Input Container -->
    <div class="flex gap-2">
      <!-- Country Code Selector - Desktop -->
      <div v-if="!isMobile" ref="dropdownRef" class="relative w-28 flex-shrink-0">
        <!-- Compact Select Button -->
        <Select
          :model-value="localCountryCode"
          :display-text="selectedCountry?.code || localCountryCode"
          :prefix="selectedCountry?.prefix"
          :error="!!error"
          :is-open="isDropdownOpen"
          @click="toggleDropdown"
        />

        <!-- Wider Dropdown Menu -->
        <Transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-if="isDropdownOpen"
            class="absolute z-50 w-80 mt-2 bg-white border border-stone-300 rounded-lg shadow-lg overflow-hidden flex flex-col"
          >
            <!-- Search Input -->
            <div class="p-2 border-b border-stone-200">
              <div class="relative">
                <InputField v-model="searchQuery" placeholder="Suche..." prefix-icon="search" />
                <button
                  v-if="searchQuery"
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-stone-100 rounded-lg p-1 transition-colors z-10"
                  @click="handleClearSearch"
                >
                  <Icon name="x" :size="16" color="#9ca3af" />
                </button>
              </div>
            </div>

            <!-- Options List -->
            <div class="overflow-y-auto max-h-60">
              <div class="py-1 px-2">
                <button
                  v-for="country in filteredCountryCodes"
                  :key="country.value"
                  type="button"
                  :class="[
                    'cursor-pointer hover:bg-stone-100 rounded-md w-full px-3 py-2 mb-1 text-left',
                    'flex items-center gap-2',
                    'transition-colors duration-150',
                    {
                      'bg-stone-100': country.value === localCountryCode,
                    },
                  ]"
                  @click="selectCountryCode(country)"
                >
                  <span class="text-xl">{{ country.prefix }}</span>
                  <span class="text-body-default text-[#0e0e11]">{{ country.label }}</span>
                  <Icon
                    v-if="country.value === localCountryCode"
                    name="check"
                    :size="20"
                    class="ml-auto text-black"
                  />
                </button>

                <!-- No Results -->
                <div
                  v-if="filteredCountryCodes.length === 0"
                  class="px-3 py-8 text-center text-stone-400"
                >
                  Keine Ergebnisse gefunden
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Country Code Selector - Mobile -->
      <div v-else class="w-24 flex-shrink-0">
        <Select
          :model-value="localCountryCode"
          :display-text="selectedCountry?.code || localCountryCode"
          :prefix="selectedCountry?.prefix"
          :error="!!error"
          @click="isSheetOpen = true"
        />

        <!-- Bottom Sheet for Country Codes -->
        <BottomSheet v-model:is-open="isSheetOpen" title="Ländervorwahl wählen">
          <!-- Fixed Search Input -->
          <template #search>
            <div class="relative">
              <InputField v-model="searchQuery" placeholder="Suche..." prefix-icon="search" />
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

          <!-- Country Code List -->
          <div class="space-y-1">
            <button
              v-for="country in filteredCountryCodes"
              :key="country.value"
              type="button"
              :class="[
                'cursor-pointer hover:bg-black/10 rounded-sm w-full px-4 py-3 text-left',
                'flex items-center gap-3',
                'transition-colors duration-150',
                {
                  'bg-black/5': country.value === localCountryCode,
                },
              ]"
              @click="selectCountryCode(country)"
            >
              <span class="text-2xl">{{ country.prefix }}</span>
              <span class="text-body-2 text-[var(--color-content-primary)]">
                {{ country.label }}
              </span>
            </button>

            <!-- No Results -->
            <div
              v-if="filteredCountryCodes.length === 0"
              class="px-4 py-8 text-center text-content-tertiary"
            >
              Keine Ergebnisse gefunden
            </div>
          </div>
        </BottomSheet>
      </div>

      <!-- Phone Number Input -->
      <div class="flex-1">
        <Input
          :model-value="displayPhoneNumber"
          type="tel"
          placeholder="79 123 45 67"
          :disabled="disabled"
          :error="!!error"
          @update:model-value="handlePhoneInput"
        />
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="mt-1">
      <Text variant="body-3" color="content-error">{{ error }}</Text>
    </div>
  </div>
</template>
