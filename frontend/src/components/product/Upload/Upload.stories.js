import Upload from './Upload.vue'

export default {
  title: 'UI/Upload',
  component: Upload,
  tags: ['autodocs'],
}

// Basic Upload
export const Basic = {
  render: () => ({
    components: { Upload },
    data() {
      return {
        file: null,
      }
    },
    template: `
      <div class="p-8">
        <Upload v-model="file" />
      </div>
    `,
  }),
}

// ID Document Upload
export const IDDocument = {
  render: () => ({
    components: { Upload },
    data() {
      return {
        file: null,
      }
    },
    template: `
      <div class="p-8">
        <Upload
          v-model="file"
          title="Front of your ID document"
          description="Drag and drop a file less than 5MB"
          accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>
    `,
  }),
}

// Passport Upload
export const PassportUpload = {
  render: () => ({
    components: { Upload },
    data() {
      return {
        file: null,
      }
    },
    template: `
      <div class="p-8">
        <Upload
          v-model="file"
          title="Your passport"
          description="Upload a clear photo of your passport's information page"
          accept="image/*"
          :max-size="10"
        />
      </div>
    `,
  }),
}

// Proof of Address
export const ProofOfAddress = {
  render: () => ({
    components: { Upload },
    data() {
      return {
        file: null,
      }
    },
    template: `
      <div class="p-8">
        <Upload
          v-model="file"
          title="Proof of address"
          description="Utility bill or bank statement from the last 3 months. PDF or image, max 5MB."
          accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>
    `,
  }),
}

// Bank Statement
export const BankStatement = {
  render: () => ({
    components: { Upload },
    data() {
      return {
        file: null,
      }
    },
    template: `
      <div class="p-8">
        <Upload
          v-model="file"
          title="Bank statement"
          description="Upload your most recent bank statement"
          accept=".pdf"
          button-text="Choose file"
        />
      </div>
    `,
  }),
}

// Without Description
export const WithoutDescription = {
  render: () => ({
    components: { Upload },
    data() {
      return {
        file: null,
      }
    },
    template: `
      <div class="p-8">
        <Upload
          v-model="file"
          title="Upload your document"
          description=""
        />
      </div>
    `,
  }),
}

// Complete Verification Flow
export const VerificationFlow = {
  render: () => ({
    components: { Upload },
    data() {
      return {
        currentStep: 1,
        idFront: null,
        idBack: null,
        proofOfAddress: null,
      }
    },
    computed: {
      stepTitle() {
        const titles = {
          1: 'Front of your ID document',
          2: 'Back of your ID document',
          3: 'Proof of address',
        }
        return titles[this.currentStep]
      },
      stepDescription() {
        const descriptions = {
          1: "Clear photo of the front of your passport, driver's license, or ID card",
          2: 'Clear photo of the back of your ID document',
          3: 'Utility bill or bank statement from the last 3 months',
        }
        return descriptions[this.currentStep]
      },
      currentFile() {
        if (this.currentStep === 1) return this.idFront
        if (this.currentStep === 2) return this.idBack
        return this.proofOfAddress
      },
      canContinue() {
        if (this.currentStep === 1) return this.idFront !== null
        if (this.currentStep === 2) return this.idBack !== null
        return this.proofOfAddress !== null
      },
    },
    methods: {
      handleUpload(file) {
        if (this.currentStep === 1) this.idFront = file
        if (this.currentStep === 2) this.idBack = file
        if (this.currentStep === 3) this.proofOfAddress = file
      },
      nextStep() {
        if (this.currentStep < 3) {
          this.currentStep++
        } else {
          alert('Verification documents submitted!')
        }
      },
      previousStep() {
        if (this.currentStep > 1) {
          this.currentStep--
        }
      },
    },
    template: `
      <div class="min-h-screen bg-background-surface p-8">
        <div class="max-w-3xl mx-auto">
          <!-- Header -->
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-content-primary mb-2">Verify your identity</h1>
            <p class="text-content-secondary">Step {{ currentStep }} of 3</p>
          </div>

          <!-- Progress -->
          <div class="flex gap-2 mb-8">
            <div
              v-for="step in 3"
              :key="step"
              class="h-1 flex-1 rounded-full transition-all"
              :class="step <= currentStep ? 'bg-content-accent' : 'bg-gray-200'"
            />
          </div>

          <!-- Upload Area -->
          <Upload
            :model-value="currentFile"
            :title="stepTitle"
            :description="stepDescription"
            @update:model-value="handleUpload"
          />

          <!-- Navigation -->
          <div class="flex gap-4 mt-8">
            <button
              v-if="currentStep > 1"
              @click="previousStep"
              class="px-6 py-3 border border-border-default text-content-primary rounded-lg font-semibold hover:bg-background-elevated transition-all"
            >
              Back
            </button>
            <button
              @click="nextStep"
              :disabled="!canContinue"
              class="flex-1 px-6 py-3 bg-content-accent text-white rounded-lg font-semibold hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {{ currentStep === 3 ? 'Submit' : 'Continue' }}
            </button>
          </div>
        </div>
      </div>
    `,
  }),
}

// With Event Handling
export const WithEvents = {
  render: () => ({
    components: { Upload },
    data() {
      return {
        file: null,
        events: [],
      }
    },
    methods: {
      handleUpload(file) {
        this.events.push({ type: 'upload', file: file.name, time: new Date().toLocaleTimeString() })
      },
      handleError(error) {
        this.events.push({ type: 'error', message: error, time: new Date().toLocaleTimeString() })
      },
    },
    template: `
      <div class="p-8 space-y-8">
        <Upload
          v-model="file"
          @upload="handleUpload"
          @error="handleError"
        />

        <!-- Event Log -->
        <div v-if="events.length > 0" class="max-w-2xl mx-auto">
          <h3 class="font-semibold text-content-primary mb-3">Event Log</h3>
          <div class="space-y-2">
            <div
              v-for="(event, index) in events"
              :key="index"
              class="p-3 bg-background-elevated rounded-lg text-sm"
            >
              <span class="font-medium" :class="event.type === 'error' ? 'text-content-negative' : 'text-content-positive'">
                {{ event.type }}:
              </span>
              {{ event.file || event.message }}
              <span class="text-content-tertiary ml-2">{{ event.time }}</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// Smaller Max Size
export const SmallerMaxSize = {
  render: () => ({
    components: { Upload },
    data() {
      return {
        file: null,
      }
    },
    template: `
      <div class="p-8">
        <Upload
          v-model="file"
          title="Profile photo"
          description="JPEG or PNG, maximum 2MB"
          accept="image/*"
          :max-size="2"
          button-text="Choose photo"
        />
      </div>
    `,
  }),
}

// Best Practices
export const BestPractices = {
  render: () => ({
    components: { Upload },
    template: `
      <div class="p-8 max-w-6xl mx-auto">
        <h2 class="text-2xl font-bold text-content-primary mb-6">Upload Component Best Practices</h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Good Example -->
          <div>
            <div class="mb-4 flex items-center gap-2">
              <span class="text-2xl">✅</span>
              <h3 class="text-lg font-semibold text-content-positive">Good example</h3>
            </div>

            <Upload
              title="Front of your ID document"
              description="Drag and drop a file less than 5MB"
            />

            <div class="mt-4 text-sm text-content-secondary space-y-1">
              <p>✓ Clear, descriptive title (sentence case)</p>
              <p>✓ File requirements in description</p>
              <p>✓ Primary CTA on screen</p>
              <p>✓ Single file upload only</p>
            </div>
          </div>

          <!-- Bad Example -->
          <div>
            <div class="mb-4 flex items-center gap-2">
              <span class="text-2xl">❌</span>
              <h3 class="text-lg font-semibold text-content-negative">Avoid</h3>
            </div>

            <div class="p-6 bg-gray-100 rounded-lg text-center">
              <p class="text-content-secondary mb-4">Don't use Upload for:</p>
              <ul class="text-sm text-left space-y-2">
                <li>✗ Multiple file uploads → Use UploadInput</li>
                <li>✗ Within a form → Use UploadInput</li>
                <li>✗ Not the main CTA → Use UploadInput</li>
                <li>✗ Secondary action → Use UploadInput</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mt-8 p-4 bg-background-elevated rounded-lg">
          <h4 class="font-semibold text-content-primary mb-2">📚 Key Principles:</h4>
          <ul class="text-sm text-content-secondary space-y-1 list-disc list-inside">
            <li>Use when <strong>uploading is the primary purpose</strong> of the screen</li>
            <li><strong>Single file only</strong> - use UploadInput for multiple files</li>
            <li><strong>NOT for forms</strong> - use UploadInput within forms</li>
            <li>Title should be <strong>sentence case, no full stop</strong></li>
            <li>Description should specify <strong>file requirements</strong></li>
            <li>Both <strong>drag-and-drop and button</strong> should work</li>
          </ul>
        </div>
      </div>
    `,
  }),
}
