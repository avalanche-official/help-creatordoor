import DateInput from './DateInput.vue'

export default {
  title: 'UI/DateInput',
  component: DateInput,
  tags: ['autodocs'],
}

// Basic Date Input (DMY - UK/Europe format)
export const Basic = {
  render: () => ({
    components: { DateInput },
    data() {
      return {
        date: { day: null, month: null, year: null },
      }
    },
    template: `
      <div class="max-w-4xl">
        <DateInput v-model="date" />

        <div v-if="date.day || date.month || date.year" class="mt-4 p-3 bg-gray-100 rounded text-sm">
          Selected: {{ date.day || '--' }} / {{ date.month || '--' }} / {{ date.year || '--' }}
        </div>
      </div>
    `,
  }),
}

// US Format (MDY)
export const USFormat = {
  render: () => ({
    components: { DateInput },
    data() {
      return {
        date: { day: null, month: null, year: null },
      }
    },
    template: `
      <div class="max-w-4xl">
        <DateInput v-model="date" format="MDY" />

        <div v-if="date.day || date.month || date.year" class="mt-4 p-3 bg-gray-100 rounded text-sm">
          Selected: {{ date.month || '--' }} / {{ date.day || '--' }} / {{ date.year || '--' }}
        </div>
      </div>
    `,
  }),
}

// With Description
export const WithDescription = {
  render: () => ({
    components: { DateInput },
    data() {
      return {
        date: { day: null, month: null, year: null },
      }
    },
    template: `
      <div class="max-w-4xl">
        <DateInput
          v-model="date"
          description="You must be 18 or older to sign up"
        />
      </div>
    `,
  }),
}

// Required Field
export const Required = {
  render: () => ({
    components: { DateInput },
    data() {
      return {
        date: { day: null, month: null, year: null },
      }
    },
    template: `
      <div class="max-w-4xl">
        <DateInput v-model="date" required />
      </div>
    `,
  }),
}

// Error State
export const ErrorState = {
  render: () => ({
    components: { DateInput },
    data() {
      return {
        date: { day: 32, month: 'February', year: 2020 },
      }
    },
    template: `
      <div class="max-w-4xl">
        <DateInput
          v-model="date"
          state="error"
          error-message="Please enter a valid date"
        />
      </div>
    `,
  }),
}

// Success State
export const SuccessState = {
  render: () => ({
    components: { DateInput },
    data() {
      return {
        date: { day: 12, month: 'July', year: 1990 },
      }
    },
    template: `
      <div class="max-w-4xl">
        <DateInput v-model="date" state="success" />
      </div>
    `,
  }),
}

// Disabled State
export const DisabledState = {
  render: () => ({
    components: { DateInput },
    data() {
      return {
        date: { day: 12, month: 'July', year: 1990 },
      }
    },
    template: `
      <div class="max-w-4xl">
        <DateInput v-model="date" disabled />
      </div>
    `,
  }),
}

// Registration Form (Wise Style!)
export const RegistrationForm = {
  render: () => ({
    components: { DateInput },
    data() {
      return {
        fullName: '',
        email: '',
        dateOfBirth: { day: null, month: null, year: null },
        errors: {
          fullName: false,
          email: false,
          dateOfBirth: false,
        },
      }
    },
    methods: {
      validateAge() {
        if (!this.dateOfBirth.day || !this.dateOfBirth.month || !this.dateOfBirth.year) {
          return false
        }
        const today = new Date()
        const birthDate = new Date(
          this.dateOfBirth.year,
          this.getMonthIndex(this.dateOfBirth.month),
          this.dateOfBirth.day,
        )
        const age = today.getFullYear() - birthDate.getFullYear()
        return age >= 18
      },
      getMonthIndex(monthName) {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]
        return months.indexOf(monthName)
      },
      submit() {
        this.errors.fullName = !this.fullName
        this.errors.email = !this.email
        this.errors.dateOfBirth = !this.validateAge()

        if (!this.errors.fullName && !this.errors.email && !this.errors.dateOfBirth) {
          alert('Registration successful!')
        }
      },
    },
    template: `
      <div class="max-w-4xl">
        <h2 class="text-2xl font-semibold mb-6 text-content-primary">Create your account</h2>

        <div class="space-y-6">
          <!-- Full Name -->
          <div>
            <label class="block text-sm font-medium text-content-primary mb-2">
              Full name *
            </label>
            <input
              v-model="fullName"
              type="text"
              :class="[
                'w-full px-4 py-3 border rounded-lg transition-all',
                errors.fullName
                  ? 'border-2 border-red-500'
                  : 'border-gray-300 hover:border-[#25ccbf] focus:border-2 focus:border-[#25ccbf] focus:outline-none'
              ]"
            />
            <p v-if="errors.fullName" class="mt-2 text-sm text-red-500">
              Please enter your full name
            </p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-content-primary mb-2">
              Email address *
            </label>
            <input
              v-model="email"
              type="email"
              :class="[
                'w-full px-4 py-3 border rounded-lg transition-all',
                errors.email
                  ? 'border-2 border-red-500'
                  : 'border-gray-300 hover:border-[#25ccbf] focus:border-2 focus:border-[#25ccbf] focus:outline-none'
              ]"
            />
            <p v-if="errors.email" class="mt-2 text-sm text-red-500">
              Please enter your email address
            </p>
          </div>

          <!-- Date of Birth -->
          <DateInput
            v-model="dateOfBirth"
            description="You must be 18 or older to sign up"
            :state="errors.dateOfBirth ? 'error' : 'default'"
            :error-message="errors.dateOfBirth ? 'You must be 18 or older' : ''"
            required
          />

          <!-- Submit Button -->
          <button
            @click="submit"
            class="w-full px-4 py-3 bg-content-accent text-white rounded-lg hover:opacity-90 font-medium"
          >
            Create account
          </button>
        </div>
      </div>
    `,
  }),
}

// Different Formats Comparison
export const FormatComparison = {
  render: () => ({
    components: { DateInput },
    data() {
      return {
        dmyDate: { day: 12, month: 'July', year: 1990 },
        mdyDate: { day: 12, month: 'July', year: 1990 },
        ymdDate: { day: 12, month: 'July', year: 1990 },
      }
    },
    template: `
      <div class="space-y-8 max-w-4xl">
        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">DMY Format (UK/Europe)</h3>
          <DateInput v-model="dmyDate" format="DMY" />
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">MDY Format (US)</h3>
          <DateInput v-model="mdyDate" format="MDY" />
        </div>

        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">YMD Format (ISO)</h3>
          <DateInput v-model="ymdDate" format="YMD" />
        </div>
      </div>
    `,
  }),
}

// All States
export const AllStates = {
  render: () => ({
    components: { DateInput },
    data() {
      return {
        default: { day: null, month: null, year: null },
        filled: { day: 12, month: 'July', year: 1990 },
        success: { day: 12, month: 'July', year: 1990 },
        error: { day: 32, month: 'February', year: 2020 },
        disabled: { day: 12, month: 'July', year: 1990 },
      }
    },
    template: `
      <div class="space-y-8 max-w-4xl">
        <DateInput
          v-model="default"
          label="Default (empty)"
        />

        <DateInput
          v-model="filled"
          label="Filled"
        />

        <DateInput
          v-model="success"
          label="Success"
          state="success"
        />

        <DateInput
          v-model="error"
          label="Error"
          state="error"
          error-message="Please enter a valid date"
        />

        <DateInput
          v-model="disabled"
          label="Disabled"
          disabled
        />
      </div>
    `,
  }),
}
