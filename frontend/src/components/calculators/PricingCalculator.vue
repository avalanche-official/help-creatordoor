<!-- components/calculators/PricingCalculator.vue -->
<script setup>
import { ref, computed } from 'vue'
import TextInput from '@/components/molecules/TextInput/TextInput.vue'
import Dropdown from '@/components/molecules/Dropdown/Dropdown.vue'
import TableRow from '@/components/molecules/TableRow/TableRow.vue'
import TableCell from '@/components/molecules/TableCell/TableCell.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Logo from '@/components/atoms/Logo/Logo.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

// Input values
const productPrice = ref(500)
const selectedPlatform = ref('digistore24')
const selectedCurrency = ref('EUR')
const expandedPlatform = ref(null) // For accordion

// Currency options for Dropdown
const currencyOptions = [
  { label: 'EUR', value: 'EUR', symbol: '€', prefix: '🇪🇺' },
  { label: 'CHF', value: 'CHF', symbol: 'CHF', prefix: '🇨🇭' },
  { label: 'USD', value: 'USD', symbol: '$', prefix: '🇺🇸' },
  { label: 'GBP', value: 'GBP', symbol: '£', prefix: '🇬🇧' },
]

// Platform data with correct fees
const platforms = [
  {
    id: 'creatordoor',
    name: 'Creatordoor',
    logo: '🚀',
    platformFee: 3.9,
  },
  {
    id: 'digistore24',
    name: 'Digistore24',
    logo: '📦',
    platformFee: 7.9,
  },
  {
    id: 'elopage',
    name: 'Elopage',
    logo: '📄',
    platformFee: 13.9,
  },
  {
    id: 'copecart',
    name: 'Copecart',
    logo: '🛒',
    platformFee: 4.9,
  },
]

// Platform options for Dropdown (exclude creatordoor)
const platformOptions = computed(() => {
  return platforms
    .filter((p) => p.id !== 'creatordoor')
    .map((p) => ({
      label: p.name,
      value: p.id,
      prefix: p.logo,
    }))
})

// Get comparison platforms (creatordoor + 2 competitors)
const comparisonPlatforms = computed(() => {
  const creatordoor = platforms.find((p) => p.id === 'creatordoor')
  const competitor1 = platforms.find((p) => p.id === selectedPlatform.value)

  // Get third platform (not creatordoor and not selected)
  const competitor2 = platforms.find(
    (p) => p.id !== 'creatordoor' && p.id !== selectedPlatform.value,
  )

  return [creatordoor, competitor1, competitor2]
})

// Calculate for each platform
const platformCalculations = computed(() => {
  const price = parseFloat(productPrice.value) || 0

  return comparisonPlatforms.value.map((platform) => {
    const feeAmount = (price * platform.platformFee) / 100
    const netEarnings = price - feeAmount

    return {
      ...platform,
      price: price,
      platformFeePercent: platform.platformFee,
      feeAmount: feeAmount,
      netEarnings: netEarnings,
    }
  })
})

const formatCurrency = (value) => {
  const currency = currencyOptions.find((c) => c.value === selectedCurrency.value)
  return `${currency.symbol}${parseFloat(value).toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

const toggleAccordion = (platformId) => {
  expandedPlatform.value = expandedPlatform.value === platformId ? null : platformId
}
</script>

<template>
  <div class="w-full max-w-5xl mx-auto">
    <div class="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-2xl">
      <!-- Top Row: Price Input, Platform Selector, Currency Selector -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <!-- Price Input -->
        <TextInput v-model="productPrice" label="" type="number" placeholder="500" />

        <!-- Platform Selector -->
        <Dropdown v-model="selectedPlatform" label="Vergleichen mit" :options="platformOptions" />

        <!-- Currency Selector -->
        <Dropdown v-model="selectedCurrency" label="Währung" :options="currencyOptions" />
      </div>

      <!-- Desktop Table View (hidden on mobile) -->
      <div class="hidden md:block overflow-x-auto rounded-lg">
        <table class="w-full border-collapse">
          <thead>
            <tr>
              <th class="w-1/4"></th>
              <!-- creatordoor Column -->
              <th class="w-1/4 bg-secondary-purple rounded-t-lg p-6">
                <div class="flex items-center justify-center h-12 mb-2">
                  <Logo size="small" variant="white" />
                </div>
                <Text variant="body-default-bold" class="text-white text-center mb-4">
                  Creatordoor
                </Text>
                <div class="h-px bg-white/20"></div>
              </th>
              <!-- Competitor 1 Column -->
              <th class="w-1/4 rounded-t-lg p-6">
                <div class="flex items-center justify-center h-12 mb-2 text-3xl">
                  {{ platformCalculations[1].logo }}
                </div>
                <Text variant="body-default-bold" color="content-primary" class="text-center mb-4">
                  {{ platformCalculations[1].name }}
                </Text>
                <div class="h-px bg-stone-200"></div>
              </th>
              <!-- Competitor 2 Column -->
              <th class="w-1/4 rounded-t-lg p-6">
                <div class="flex items-center justify-center h-12 mb-2 text-3xl">
                  {{ platformCalculations[2].logo }}
                </div>
                <Text variant="body-default-bold" color="content-primary" class="text-center mb-4">
                  {{ platformCalculations[2].name }}
                </Text>
                <div class="h-px bg-stone-200"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Du behältst -->
            <TableRow>
              <TableCell align="center">
                <Text variant="body-default-bold" color="content-secondary"> Du behältst </Text>
              </TableCell>
              <TableCell align="center" class="bg-secondary-purple">
                <Text variant="body-large-bold" class="text-white">
                  {{ formatCurrency(platformCalculations[0].netEarnings) }}
                </Text>
              </TableCell>
              <TableCell align="center">
                <Text variant="body-large-bold" color="content-primary">
                  {{ formatCurrency(platformCalculations[1].netEarnings) }}
                </Text>
              </TableCell>
              <TableCell align="center">
                <Text variant="body-large-bold" color="content-primary">
                  {{ formatCurrency(platformCalculations[2].netEarnings) }}
                </Text>
              </TableCell>
            </TableRow>

            <!-- Plattformgebühr -->
            <TableRow>
              <TableCell align="center">
                <Text variant="body-default-bold" color="content-secondary"> Plattformgebühr </Text>
              </TableCell>
              <TableCell align="center" class="bg-secondary-purple">
                <Text variant="body-large-bold" class="text-sentiment-warning">
                  {{ platformCalculations[0].platformFeePercent }}%
                </Text>
              </TableCell>
              <TableCell align="center">
                <Text variant="body-large-bold" class="text-sentiment-negative">
                  {{ platformCalculations[1].platformFeePercent }}%
                </Text>
              </TableCell>
              <TableCell align="center">
                <Text variant="body-large-bold" class="text-sentiment-negative">
                  {{ platformCalculations[2].platformFeePercent }}%
                </Text>
              </TableCell>
            </TableRow>

            <!-- Gebühr in € -->
            <TableRow>
              <TableCell align="center" class="rounded-b-lg">
                <Text variant="body-default-bold" color="content-secondary"> Gebühr </Text>
              </TableCell>
              <TableCell align="center" class="bg-secondary-purple rounded-b-lg">
                <Text variant="body-large-bold" class="text-white">
                  {{ formatCurrency(platformCalculations[0].feeAmount) }}
                </Text>
              </TableCell>
              <TableCell align="center" class="rounded-b-lg">
                <Text variant="body-large-bold" color="content-primary">
                  {{ formatCurrency(platformCalculations[1].feeAmount) }}
                </Text>
              </TableCell>
              <TableCell align="center" class="rounded-b-lg">
                <Text variant="body-large-bold" color="content-primary">
                  {{ formatCurrency(platformCalculations[2].feeAmount) }}
                </Text>
              </TableCell>
            </TableRow>
          </tbody>
        </table>
      </div>

      <!-- Mobile Accordion View (shown on mobile only) -->
      <div class="md:hidden space-y-3">
        <div
          v-for="(platform, index) in platformCalculations"
          :key="platform.id"
          :class="[
            ' rounded-lg border-1 border-stone-100 overflow-hidden transition-all',
            platform.id === 'creatordoor' ? '' : '',
          ]"
        >
          <!-- Accordion Header -->
          <button
            @click="toggleAccordion(platform.id)"
            :class="[
              'w-full px-4 py-4 flex items-center justify-between',
              platform.id === 'creatordoor' ? 'bg-secondary-purple' : 'bg-white',
            ]"
          >
            <!-- Left: Platform Info -->
            <div class="flex items-center gap-3">
              <!-- Logo -->
              <div v-if="platform.id === 'creatordoor'" class="flex-shrink-0">
                <Logo size="small" variant="icon" href="#" />
              </div>
              <div v-else class="text-2xl flex-shrink-0">
                {{ platform.logo }}
              </div>

              <!-- Name & Price Info -->
              <div class="text-left">
                <Text
                  variant="body-default-bold"
                  :class="platform.id === 'creatordoor' ? 'text-white' : ''"
                  :color="platform.id === 'creatordoor' ? '' : 'content-primary'"
                >
                  {{ platform.name }}
                </Text>
              </div>
            </div>

            <!-- Right: Net Earnings & Icon -->
            <div class="flex items-center gap-3">
              <div class="text-right">
                <Text
                  variant="body-large-bold"
                  :class="platform.id === 'creatordoor' ? 'text-white' : ''"
                  :color="platform.id === 'creatordoor' ? '' : 'content-primary'"
                >
                  {{ formatCurrency(platform.netEarnings) }}
                </Text>
              </div>
              <Icon
                :name="expandedPlatform === platform.id ? 'chevron-up' : 'chevron-down'"
                :size="20"
                :color="platform.id === 'creatordoor' ? 'text-white' : 'text-gray-600'"
              />
            </div>
          </button>

          <!-- Accordion Content -->
          <div
            v-if="expandedPlatform === platform.id"
            :class="[
              'px-4 py-4 border-t space-y-3',
              platform.id === 'creatordoor'
                ? 'bg-secondary-purple/5 border-secondary-purple/20'
                : 'bg-gray-50 border-stone-200',
            ]"
          >
            <!-- Du behältst -->
            <div class="flex justify-between items-center">
              <Text variant="body-default" color="content-secondary">Du behältst</Text>
              <Text variant="body-default-bold" color="content-primary">
                {{ formatCurrency(platform.netEarnings) }}
              </Text>
            </div>

            <!-- Plattformgebühr -->
            <div class="flex justify-between items-center">
              <Text variant="body-default" color="content-secondary">Plattformgebühr</Text>
              <Text
                variant="body-default-bold"
                :class="
                  platform.id === 'creatordoor'
                    ? 'text-sentiment-warning'
                    : 'text-sentiment-negative'
                "
              >
                {{ platform.platformFeePercent }}%
              </Text>
            </div>

            <!-- Gebühr -->
            <div class="flex justify-between items-center">
              <Text variant="body-default" color="content-secondary">Gebühr</Text>
              <Text variant="body-default-bold" color="content-primary">
                {{ formatCurrency(platform.feeAmount) }}
              </Text>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer with border and link -->
      <div class="mt-8 pt-6 border-t border-stone-200 text-center">
        <Text variant="body-default" color="content-secondary" class="inline">
          Starte jetzt mit creatordoor und spare bei jedem Verkauf!
        </Text>
        <a
          href="/register"
          class="text-purple-600 hover:text-purple-700 font-semibold underline ml-2"
        >
          Jetzt kostenlos anmelden
        </a>
      </div>
    </div>
  </div>
</template>
