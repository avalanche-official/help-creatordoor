import Select from './Select.vue'

export default {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
}

const countries = [
  { label: 'United Kingdom', value: 'gb' },
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Spain', value: 'es' },
  { label: 'Italy', value: 'it' },
]

const currencies = [
  { label: 'EUR - Euro', value: 'EUR' },
  { label: 'USD - US Dollar', value: 'USD' },
  { label: 'GBP - British Pound', value: 'GBP' },
  { label: 'JPY - Japanese Yen', value: 'JPY' },
  { label: 'CHF - Swiss Franc', value: 'CHF' },
  { label: 'CAD - Canadian Dollar', value: 'CAD' },
]

// Basic Select
export const Basic = {
  render: () => ({
    components: { Select },
    data() {
      return {
        country: '',
        countries,
      }
    },
    template: `
      <div class="max-w-4xl">
        <Select
          v-model="country"
          label="Country"
          :options="countries"
        />

        <p v-if="country" class="mt-4 text-sm text-content-secondary">
          Selected: <strong>{{ country }}</strong>
        </p>
      </div>
    `,
  }),
}

// With Description
export const WithDescription = {
  render: () => ({
    components: { Select },
    data() {
      return {
        currency: '',
        currencies,
      }
    },
    template: `
      <div class="max-w-4xl">
        <Select
          v-model="currency"
          label="Currency"
          description="Choose the currency you want to send"
          :options="currencies"
        />
      </div>
    `,
  }),
}

// Required Field
export const Required = {
  render: () => ({
    components: { Select },
    data() {
      return {
        country: '',
        countries,
      }
    },
    template: `
      <div class="max-w-4xl">
        <Select
          v-model="country"
          label="Country"
          :options="countries"
          required
        />
      </div>
    `,
  }),
}

// Optional Field
export const Optional = {
  render: () => ({
    components: { Select },
    data() {
      return {
        country: '',
        countries,
      }
    },
    template: `
      <div class="max-w-4xl">
        <Select
          v-model="country"
          label="Country"
          :options="countries"
          optional
        />
      </div>
    `,
  }),
}

// Success State
export const Success = {
  render: () => ({
    components: { Select },
    data() {
      return {
        country: 'gb',
        countries,
      }
    },
    template: `
      <div class="max-w-4xl">
        <Select
          v-model="country"
          label="Country"
          :options="countries"
          state="success"
        />
      </div>
    `,
  }),
}

// Error State
export const Error = {
  render: () => ({
    components: { Select },
    data() {
      return {
        country: '',
        countries,
      }
    },
    template: `
      <div class="max-w-4xl">
        <Select
          v-model="country"
          label="Country"
          :options="countries"
          state="error"
          error-message="Please select a country"
        />
      </div>
    `,
  }),
}

// Disabled State
export const Disabled = {
  render: () => ({
    components: { Select },
    data() {
      return {
        country: 'gb',
        countries,
      }
    },
    template: `
      <div class="max-w-4xl">
        <Select
          v-model="country"
          label="Country"
          :options="countries"
          disabled
        />
      </div>
    `,
  }),
}

// Registration Form (Wise Style!)
export const RegistrationForm = {
  render: () => ({
    components: { Select },
    data() {
      return {
        country: '',
        currency: '',
        countries,
        currencies,
      }
    },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-xl font-semibold mb-6 text-content-primary">Create your account</h2>

        <div class="space-y-6">
          <Select
            v-model="country"
            label="Country of residence"
            description="Where do you currently live?"
            :options="countries"
            required
          />

          <Select
            v-model="currency"
            label="Primary currency"
            description="The currency you'll use most often"
            :options="currencies"
            required
          />
        </div>
      </div>
    `,
  }),
}

// Money Transfer Form
export const MoneyTransferForm = {
  render: () => ({
    components: { Select },
    data() {
      return {
        fromCountry: 'gb',
        toCountry: '',
        fromCurrency: 'GBP',
        toCurrency: '',
        countries,
        currencies,
        errors: {
          toCountry: false,
          toCurrency: false,
        },
      }
    },
    methods: {
      validate() {
        this.errors.toCountry = !this.toCountry
        this.errors.toCurrency = !this.toCurrency
      },
    },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-xl font-semibold mb-6 text-content-primary">Send money</h2>

        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <Select
              v-model="fromCountry"
              label="From"
              :options="countries"
              state="success"
            />

            <Select
              v-model="toCountry"
              label="To"
              :options="countries"
              :state="errors.toCountry ? 'error' : 'default'"
              :error-message="errors.toCountry ? 'Select destination' : ''"
              required
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <Select
              v-model="fromCurrency"
              label="You send"
              :options="currencies"
              state="success"
            />

            <Select
              v-model="toCurrency"
              label="They receive"
              :options="currencies"
              :state="errors.toCurrency ? 'error' : 'default'"
              :error-message="errors.toCurrency ? 'Select currency' : ''"
              required
            />
          </div>

          <button
            @click="validate"
            class="w-full px-4 py-3 bg-content-accent text-white rounded-lg font-medium hover:opacity-90"
          >
            Continue
          </button>
        </div>
      </div>
    `,
  }),
}

// All States
export const AllStates = {
  render: () => ({
    components: { Select },
    data() {
      return {
        default: '',
        success: 'gb',
        error: '',
        disabled: 'us',
        countries,
      }
    },
    template: `
      <div class="space-y-6 max-w-4xl">
        <Select
          v-model="default"
          label="Default"
          :options="countries"
        />

        <Select
          v-model="success"
          label="Success"
          :options="countries"
          state="success"
        />

        <Select
          v-model="error"
          label="Error"
          :options="countries"
          state="error"
          error-message="Please select a country"
        />

        <Select
          v-model="disabled"
          label="Disabled"
          :options="countries"
          disabled
        />
      </div>
    `,
  }),
}

// Long List of Options
export const LongList = {
  render: () => ({
    components: { Select },
    data() {
      return {
        country: '',
        allCountries: [
          { label: 'Afghanistan', value: 'af' },
          { label: 'Albania', value: 'al' },
          { label: 'Algeria', value: 'dz' },
          { label: 'Argentina', value: 'ar' },
          { label: 'Australia', value: 'au' },
          { label: 'Austria', value: 'at' },
          { label: 'Belgium', value: 'be' },
          { label: 'Brazil', value: 'br' },
          { label: 'Canada', value: 'ca' },
          { label: 'China', value: 'cn' },
          { label: 'Denmark', value: 'dk' },
          { label: 'Egypt', value: 'eg' },
          { label: 'Finland', value: 'fi' },
          { label: 'France', value: 'fr' },
          { label: 'Germany', value: 'de' },
          { label: 'Greece', value: 'gr' },
          { label: 'India', value: 'in' },
          { label: 'Ireland', value: 'ie' },
          { label: 'Italy', value: 'it' },
          { label: 'Japan', value: 'jp' },
          { label: 'Mexico', value: 'mx' },
          { label: 'Netherlands', value: 'nl' },
          { label: 'New Zealand', value: 'nz' },
          { label: 'Norway', value: 'no' },
          { label: 'Poland', value: 'pl' },
          { label: 'Portugal', value: 'pt' },
          { label: 'Russia', value: 'ru' },
          { label: 'Singapore', value: 'sg' },
          { label: 'South Africa', value: 'za' },
          { label: 'South Korea', value: 'kr' },
          { label: 'Spain', value: 'es' },
          { label: 'Sweden', value: 'se' },
          { label: 'Switzerland', value: 'ch' },
          { label: 'Turkey', value: 'tr' },
          { label: 'United Kingdom', value: 'gb' },
          { label: 'United States', value: 'us' },
        ],
      }
    },
    template: `
      <div class="max-w-4xl">
        <Select
          v-model="country"
          label="Select a country"
          description="Choose from over 35 countries"
          :options="allCountries"
        />
      </div>
    `,
  }),
}
