import Textarea from './Textarea.vue'
import Card from '../../product/Card/Card.vue'

export default {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
}

// Basic Textarea
export const Basic = {
  render: () => ({
    components: { Textarea },
    data() {
      return {
        value: '',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <Textarea
          v-model="value"
          label="Note"
        />
        <p class="text-xs text-content-secondary mt-4">Value: "{{ value }}"</p>
      </div>
    `,
  }),
}

// With Description
export const WithDescription = {
  render: () => ({
    components: { Textarea },
    data() {
      return {
        comments: '',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <Textarea
          v-model="comments"
          label="Comments"
          description="Add any additional information about this transaction"
        />
      </div>
    `,
  }),
}

// With Character Limit
export const WithCharacterLimit = {
  render: () => ({
    components: { Textarea },
    data() {
      return {
        description: '',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <Textarea
          v-model="description"
          label="Description"
          :max-length="200"
        />
      </div>
    `,
  }),
}

// Required Field
export const Required = {
  render: () => ({
    components: { Textarea },
    data() {
      return {
        message: '',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <Textarea
          v-model="message"
          label="Message"
          required
        />
      </div>
    `,
  }),
}

// Optional Field
export const Optional = {
  render: () => ({
    components: { Textarea },
    data() {
      return {
        notes: '',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <Textarea
          v-model="notes"
          label="Additional notes"
          optional
        />
      </div>
    `,
  }),
}

// Success State
export const Success = {
  render: () => ({
    components: { Textarea },
    data() {
      return {
        feedback: 'Great service, very fast transfer!',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <Textarea
          v-model="feedback"
          label="Feedback"
          state="success"
        />
      </div>
    `,
  }),
}

// Error State
export const Error = {
  render: () => ({
    components: { Textarea },
    data() {
      return {
        reason: '',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <Textarea
          v-model="reason"
          label="Reason"
          state="error"
          error-message="This field is required"
          required
        />
      </div>
    `,
  }),
}

// Disabled State
export const Disabled = {
  render: () => ({
    components: { Textarea },
    data() {
      return {
        value: 'This textarea is disabled and cannot be edited',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <Textarea
          v-model="value"
          label="Disabled field"
          disabled
        />
      </div>
    `,
  }),
}

// Character Limit Warning
export const CharacterLimitWarning = {
  render: () => ({
    components: { Textarea },
    data() {
      return {
        text: 'This is some example text that will be used to demonstrate the character limit feature.',
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <Textarea
          v-model="text"
          label="Description"
          description="Keep it short and clear"
          :max-length="100"
        />
        <p class="text-xs text-content-secondary mt-4">
          Try typing more to see the over-limit warning
        </p>
      </div>
    `,
  }),
}

// Different Sizes
export const DifferentSizes = {
  render: () => ({
    components: { Textarea },
    data() {
      return {
        small: '',
        medium: '',
        large: '',
      }
    },
    template: `
      <div class="p-8 max-w-4xl space-y-6">
        <Textarea
          v-model="small"
          label="Small (3 rows)"
          :rows="3"
        />

        <Textarea
          v-model="medium"
          label="Medium (6 rows)"
          :rows="6"
        />

        <Textarea
          v-model="large"
          label="Large (10 rows)"
          :rows="10"
        />
      </div>
    `,
  }),
}

// Contact Form
export const ContactForm = {
  render: () => ({
    components: { Textarea, Card },
    data() {
      return {
        name: '',
        email: '',
        message: '',
        touched: {
          name: false,
          email: false,
          message: false,
        },
      }
    },
    computed: {
      isValidEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(this.email)
      },
      nameState() {
        if (!this.touched.name) return 'default'
        return this.name.length >= 2 ? 'success' : 'error'
      },
      emailState() {
        if (!this.touched.email) return 'default'
        return this.isValidEmail ? 'success' : 'error'
      },
      messageState() {
        if (!this.touched.message) return 'default'
        return this.message.length >= 10 ? 'success' : 'error'
      },
      isFormValid() {
        return (
          this.nameState === 'success' &&
          this.emailState === 'success' &&
          this.messageState === 'success'
        )
      },
    },
    methods: {
      markTouched(field) {
        this.touched[field] = true
      },
      handleSubmit() {
        if (this.isFormValid) {
          alert('Message sent!')
        }
      },
    },
    template: `
      <div class="p-8 max-w-4xl mx-auto">
        <Card padding="lg">
          <h2 class="text-2xl font-bold text-content-primary mb-2">Contact us</h2>
          <p class="text-sm text-content-secondary mb-8">Send us a message</p>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-content-primary mb-2">Name</label>
              <input
                v-model="name"
                type="text"
                @blur="markTouched('name')"
                :class="[
                  'w-full px-4 py-3 text-base rounded-lg outline-none transition-all',
                  nameState === 'error' ? 'border-2 border-red-500' :
                  nameState === 'success' ? 'border-2 border-green-500' :
                  'border border-gray-300 hover:border-[#25ccbf] focus:border-2 focus:border-[#25ccbf] focus:ring-2 focus:ring-[#25ccbf]/20'
                ]"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-content-primary mb-2">Email</label>
              <input
                v-model="email"
                type="email"
                @blur="markTouched('email')"
                :class="[
                  'w-full px-4 py-3 text-base rounded-lg outline-none transition-all',
                  emailState === 'error' ? 'border-2 border-red-500' :
                  emailState === 'success' ? 'border-2 border-green-500' :
                  'border border-gray-300 hover:border-[#25ccbf] focus:border-2 focus:border-[#25ccbf] focus:ring-2 focus:ring-[#25ccbf]/20'
                ]"
              />
            </div>

            <Textarea
              v-model="message"
              label="Message"
              :state="messageState"
              error-message="Message must be at least 10 characters"
              :max-length="500"
              :rows="6"
              required
              @blur="markTouched('message')"
            />

            <button
              type="submit"
              :disabled="!isFormValid"
              class="w-full px-6 py-3 bg-content-accent text-white rounded-lg font-semibold hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Send message
            </button>
          </form>
        </Card>
      </div>
    `,
  }),
}

// Feedback Form
export const FeedbackForm = {
  render: () => ({
    components: { Textarea, Card },
    data() {
      return {
        rating: '',
        feedback: '',
        suggestions: '',
        touched: false,
      }
    },
    computed: {
      feedbackState() {
        if (!this.touched) return 'default'
        return this.feedback.length >= 20 ? 'success' : 'error'
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
          <h2 class="text-2xl font-bold text-content-primary mb-2">How was your experience?</h2>
          <p class="text-sm text-content-secondary mb-8">Help us improve our service</p>

          <div class="space-y-6">
            <Textarea
              v-model="feedback"
              label="Your feedback"
              description="Tell us about your experience"
              :state="feedbackState"
              error-message="Please provide at least 20 characters of feedback"
              :max-length="500"
              required
              @blur="handleBlur"
            />

            <Textarea
              v-model="suggestions"
              label="Suggestions"
              description="How can we improve?"
              :max-length="300"
              optional
            />

            <button
              type="button"
              class="w-full px-6 py-3 bg-content-accent text-white rounded-lg font-semibold hover:bg-accent-hover transition-all"
            >
              Submit feedback
            </button>
          </div>
        </Card>
      </div>
    `,
  }),
}

// All States Comparison
export const AllStates = {
  render: () => ({
    components: { Textarea },
    data() {
      return {
        default: '',
        success: 'This is a valid textarea entry',
        error: 'err',
        disabled: 'This is disabled text',
      }
    },
    template: `
      <div class="p-8 max-w-4xl space-y-8">
        <Textarea
          v-model="default"
          label="Default state"
          description="This is a default textarea"
        />

        <Textarea
          v-model="success"
          label="Success state"
          state="success"
        />

        <Textarea
          v-model="error"
          label="Error state"
          state="error"
          error-message="Input is too short"
        />

        <Textarea
          v-model="disabled"
          label="Disabled state"
          disabled
        />
      </div>
    `,
  }),
}

// Best Practices
export const BestPractices = {
  render: () => ({
    components: { Textarea, Card },
    template: `
      <div class="p-8 max-w-4xl">
        <h2 class="text-2xl font-bold text-content-primary mb-6">Textarea Best Practices</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Good Examples -->
          <Card>
            <div class="mb-4 flex items-center gap-2">
              <span class="text-2xl">✅</span>
              <h3 class="text-lg font-semibold text-content-positive">Good examples</h3>
            </div>

            <div class="space-y-6">
              <div>
                <Textarea label="Comments" :max-length="200" />
                <p class="text-xs text-content-secondary mt-2">
                  ✓ Short noun label, character limit shown
                </p>
              </div>

              <div>
                <Textarea
                  label="Additional notes"
                  description="Any other information we should know"
                  optional
                />
                <p class="text-xs text-content-secondary mt-2">
                  ✓ Optional indicator, helpful description
                </p>
              </div>
            </div>
          </Card>

          <!-- Bad Examples -->
          <Card>
            <div class="mb-4 flex items-center gap-2">
              <span class="text-2xl">❌</span>
              <h3 class="text-lg font-semibold text-content-negative">Avoid</h3>
            </div>

            <div class="space-y-6">
              <div>
                <Textarea label="Please enter your comments here" />
                <p class="text-xs text-content-secondary mt-2">
                  ✗ Label too long (max 3 words, use noun)
                </p>
              </div>

              <div class="text-xs text-content-secondary space-y-1">
                <p>✗ Using for single-line text (use TextInput)</p>
                <p>✗ Not showing character limit when there is one</p>
                <p>✗ Using placeholders (not supported by Wise)</p>
              </div>
            </div>
          </Card>
        </div>

        <div class="mt-8 p-4 bg-background-elevated rounded-lg">
          <h4 class="font-semibold text-content-primary mb-2">📚 Key Principles:</h4>
          <ul class="text-sm text-content-secondary space-y-1 list-disc list-inside">
            <li>Use for <strong>multi-line text entry</strong> (use TextInput for single line)</li>
            <li>Label should be <strong>max 3 words, noun only</strong></li>
            <li>Show <strong>character counter</strong> if there's a limit</li>
            <li>Include <strong>(Optional)</strong> indicator for optional fields</li>
            <li>Description is optional - only if users need context</li>
            <li><strong>No placeholders</strong> (Wise research shows they're confusing)</li>
          </ul>
        </div>
      </div>
    `,
  }),
}
