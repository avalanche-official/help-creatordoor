import DatePicker from './DatePicker.vue'
import Card from '../../product/Card/Card.vue'

export default {
  title: 'UI/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
}

// Basic Date Picker
export const Basic = {
  render: () => ({
    components: { DatePicker },
    data() {
      return {
        date: '',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <DatePicker
          v-model="date"
          label="Appointment date"
        />
        <p class="text-xs text-content-secondary mt-4">Selected: {{ date || 'None' }}</p>
      </div>
    `,
  }),
}

// With Description
export const WithDescription = {
  render: () => ({
    components: { DatePicker },
    data() {
      return {
        date: '',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <DatePicker
          v-model="date"
          label="Transfer date"
          description="Choose when you want the money to arrive"
        />
      </div>
    `,
  }),
}

// Required Field
export const Required = {
  render: () => ({
    components: { DatePicker },
    data() {
      return {
        date: '',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <DatePicker
          v-model="date"
          label="Delivery date"
          required
        />
      </div>
    `,
  }),
}

// With Min/Max Dates
export const WithMinMax = {
  render: () => ({
    components: { DatePicker },
    data() {
      return {
        date: '',
        today: new Date().toISOString().split('T')[0],
        maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <DatePicker
          v-model="date"
          label="Appointment date"
          description="Select a date within the next 30 days"
          :min="today"
          :max="maxDate"
        />
        <p class="text-xs text-content-secondary mt-4">
          Min: {{ today }}<br>
          Max: {{ maxDate }}
        </p>
      </div>
    `,
  }),
}

// Success State
export const Success = {
  render: () => ({
    components: { DatePicker },
    data() {
      return {
        date: '2025-01-15',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <DatePicker
          v-model="date"
          label="Delivery date"
          state="success"
        />
      </div>
    `,
  }),
}

// Error State
export const Error = {
  render: () => ({
    components: { DatePicker },
    data() {
      return {
        date: '',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <DatePicker
          v-model="date"
          label="Delivery date"
          state="error"
          error-message="Please select a delivery date"
          required
        />
      </div>
    `,
  }),
}

// Disabled State
export const Disabled = {
  render: () => ({
    components: { DatePicker },
    data() {
      return {
        date: '2025-01-15',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <DatePicker
          v-model="date"
          label="Locked date"
          disabled
        />
      </div>
    `,
  }),
}

// Booking Appointment
export const BookingAppointment = {
  render: () => ({
    components: { DatePicker, Card },
    data() {
      return {
        appointmentDate: '',
        today: new Date().toISOString().split('T')[0],
        touched: false,
      }
    },
    computed: {
      dateState() {
        if (!this.touched) return 'default'
        return this.appointmentDate ? 'success' : 'error'
      },
    },
    methods: {
      handleBlur() {
        this.touched = true
      },
      handleSubmit() {
        if (this.appointmentDate) {
          alert(`Appointment booked for ${this.appointmentDate}`)
        }
      },
    },
    template: `
      <div class="p-8 max-w-4xl mx-auto">
        <Card padding="lg">
          <h2 class="text-2xl font-bold text-content-primary mb-2">Book appointment</h2>
          <p class="text-sm text-content-secondary mb-8">Choose your preferred date</p>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <DatePicker
              v-model="appointmentDate"
              label="Appointment date"
              description="Select the best date for your appointment"
              :state="dateState"
              error-message="Please select an appointment date"
              :min="today"
              required
              @blur="handleBlur"
            />

            <button
              type="submit"
              :disabled="!appointmentDate"
              class="w-full px-6 py-3 bg-content-accent text-white rounded-lg font-semibold hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Book appointment
            </button>
          </form>
        </Card>
      </div>
    `,
  }),
}

// Schedule Transfer
export const ScheduleTransfer = {
  render: () => ({
    components: { DatePicker, Card },
    data() {
      return {
        transferDate: '',
        today: new Date().toISOString().split('T')[0],
        maxDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        touched: false,
      }
    },
    computed: {
      dateState() {
        if (!this.touched) return 'default'
        return this.transferDate ? 'success' : 'error'
      },
      estimatedArrival() {
        if (!this.transferDate) return null
        const date = new Date(this.transferDate)
        date.setDate(date.getDate() + 2) // Add 2 business days
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      },
    },
    methods: {
      handleBlur() {
        this.touched = true
      },
    },
    template: `
      <div class="p-8 max-w-4xl mx-auto">
        <Card padding="lg">
          <h2 class="text-2xl font-bold text-content-primary mb-1">Schedule transfer</h2>
          <p class="text-sm text-content-secondary mb-8">Choose when to send the money</p>

          <div class="space-y-6">
            <DatePicker
              v-model="transferDate"
              label="Transfer date"
              description="Choose when you want the transfer to be processed"
              :state="dateState"
              error-message="Please select a transfer date"
              :min="today"
              :max="maxDate"
              required
              @blur="handleBlur"
            />

            <div v-if="estimatedArrival" class="p-4 bg-background-elevated rounded-lg">
              <p class="text-sm text-content-secondary">
                💡 <strong class="text-content-primary">Estimated arrival:</strong> {{ estimatedArrival }}
              </p>
            </div>

            <button
              type="button"
              class="w-full px-6 py-3 bg-content-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-all"
            >
              Continue
            </button>
          </div>
        </Card>
      </div>
    `,
  }),
}

// Flight Booking
export const FlightBooking = {
  render: () => ({
    components: { DatePicker, Card },
    data() {
      return {
        departureDate: '',
        returnDate: '',
        today: new Date().toISOString().split('T')[0],
        touched: {
          departure: false,
          return: false,
        },
      }
    },
    computed: {
      departureDateState() {
        if (!this.touched.departure) return 'default'
        return this.departureDate ? 'success' : 'error'
      },
      returnDateState() {
        if (!this.touched.return) return 'default'
        if (!this.returnDate) return 'error'
        if (this.departureDate && this.returnDate <= this.departureDate) {
          return 'error'
        }
        return 'success'
      },
      returnErrorMessage() {
        if (!this.returnDate) return 'Please select a return date'
        if (this.departureDate && this.returnDate <= this.departureDate) {
          return 'Return date must be after departure date'
        }
        return ''
      },
    },
    methods: {
      markTouched(field) {
        this.touched[field] = true
      },
    },
    template: `
      <div class="p-8 max-w-4xl mx-auto">
        <Card padding="lg">
          <h2 class="text-2xl font-bold text-content-primary mb-2">Book your flight</h2>
          <p class="text-sm text-content-secondary mb-8">Select your travel dates</p>

          <div class="space-y-5">
            <DatePicker
              v-model="departureDate"
              label="Departure date"
              :state="departureDateState"
              error-message="Please select a departure date"
              :min="today"
              required
              @blur="markTouched('departure')"
            />

            <DatePicker
              v-model="returnDate"
              label="Return date"
              :state="returnDateState"
              :error-message="returnErrorMessage"
              :min="departureDate || today"
              required
              @blur="markTouched('return')"
            />

            <div class="pt-2">
              <button
                type="button"
                :disabled="!departureDate || !returnDate || returnDate <= departureDate"
                class="w-full px-6 py-3 bg-content-accent text-white rounded-lg font-semibold hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Search flights
              </button>
            </div>
          </div>
        </Card>
      </div>
    `,
  }),
}

// All States Comparison
export const AllStates = {
  render: () => ({
    components: { DatePicker },
    data() {
      return {
        default: '',
        success: '2025-01-15',
        error: '',
        disabled: '2025-01-15',
      }
    },
    template: `
      <div class="p-8 max-w-4xl space-y-8">
        <DatePicker
          v-model="default"
          label="Default state"
          description="Click to open native calendar"
        />

        <DatePicker
          v-model="success"
          label="Success state"
          state="success"
        />

        <DatePicker
          v-model="error"
          label="Error state"
          state="error"
          error-message="Please select a date"
        />

        <DatePicker
          v-model="disabled"
          label="Disabled state"
          disabled
        />
      </div>
    `,
  }),
}

// Wise Best Practices
export const BestPractices = {
  render: () => ({
    components: { DatePicker, Card },
    template: `
      <div class="p-8 max-w-4xl">
        <h2 class="text-2xl font-bold text-content-primary mb-6">Wise Date Picker Best Practices</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Good Examples -->
          <Card>
            <div class="mb-4 flex items-center gap-2">
              <span class="text-2xl">✅</span>
              <h3 class="text-lg font-semibold text-content-positive">When to use</h3>
            </div>

            <div class="space-y-6">
              <div>
                <DatePicker label="Appointment date" />
                <p class="text-xs text-content-secondary mt-2">
                  ✓ User needs to decide/choose a date
                </p>
              </div>

              <div>
                <DatePicker label="Transfer date" description="When should we send the money?" />
                <p class="text-xs text-content-secondary mt-2">
                  ✓ Date is relatively close to present
                </p>
              </div>

              <div>
                <DatePicker label="Delivery date" />
                <p class="text-xs text-content-secondary mt-2">
                  ✓ Opens native calendar picker (mobile-friendly)
                </p>
              </div>
            </div>
          </Card>

          <!-- Bad Examples -->
          <Card>
            <div class="mb-4 flex items-center gap-2">
              <span class="text-2xl">❌</span>
              <h3 class="text-lg font-semibold text-content-negative">Don't use for</h3>
            </div>

            <div class="space-y-6">
              <div>
                <DatePicker label="Date of birth" />
                <p class="text-xs text-content-secondary mt-2">
                  ✗ User knows their birthday - use Date Input instead
                </p>
              </div>

              <div>
                <DatePicker label="Graduation year" />
                <p class="text-xs text-content-secondary mt-2">
                  ✗ Date is far in past/future - use Date Input
                </p>
              </div>

              <div>
                <DatePicker label="Credit card expiry" />
                <p class="text-xs text-content-secondary mt-2">
                  ✗ User knows exact date - use Date Input or custom input
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div class="mt-8 p-4 bg-background-elevated rounded-lg">
          <h4 class="font-semibold text-content-primary mb-2">📚 Key Principles:</h4>
          <ul class="text-sm text-content-secondary space-y-1 list-disc list-inside">
            <li>Use Date Picker when user needs to <strong>choose/decide</strong> a date</li>
            <li>Use Date Input when user needs to <strong>enter a known</strong> date</li>
            <li>Best for dates relatively close to present day</li>
            <li>Opens native calendar (mobile-optimized)</li>
            <li>Follow same label/description rules as other inputs</li>
          </ul>
        </div>
      </div>
    `,
  }),
}
