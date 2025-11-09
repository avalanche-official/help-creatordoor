import UploadInput from './UploadInput.vue'
import Card from '../../product/Card/Card.vue'

export default {
  title: 'UI/UploadInput',
  component: UploadInput,
  tags: ['autodocs'],
}

// Basic Upload Input
export const Basic = {
  render: () => ({
    components: { UploadInput },
    data() {
      return {
        files: [],
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <UploadInput
          v-model="files"
          label="Invoice"
        />
      </div>
    `,
  }),
}

// With Custom Description
export const WithDescription = {
  render: () => ({
    components: { UploadInput },
    data() {
      return {
        files: [],
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <UploadInput
          v-model="files"
          label="Proof of address"
          description="PDF, JPEG or PNG less than 5MB"
        />
      </div>
    `,
  }),
}

// Multiple Files
export const MultipleFiles = {
  render: () => ({
    components: { UploadInput },
    data() {
      return {
        files: [],
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <UploadInput
          v-model="files"
          label="Supporting documents"
          description="Upload one or more documents"
          multiple
        />
        <p class="text-xs text-content-secondary mt-4">
          Uploaded {{ files.length }} file(s)
        </p>
      </div>
    `,
  }),
}

// Specific File Types
export const SpecificFileTypes = {
  render: () => ({
    components: { UploadInput },
    data() {
      return {
        files: [],
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <UploadInput
          v-model="files"
          label="ID Document"
          accept=".pdf,.jpg,.jpeg,.png"
          description="PDF, JPEG or PNG less than 5MB"
        />
      </div>
    `,
  }),
}

// Images Only
export const ImagesOnly = {
  render: () => ({
    components: { UploadInput },
    data() {
      return {
        files: [],
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <UploadInput
          v-model="files"
          label="Profile photo"
          accept="image/*"
          description="JPEG or PNG less than 2MB"
          :max-size="2"
        />
      </div>
    `,
  }),
}

// Disabled State
export const Disabled = {
  render: () => ({
    components: { UploadInput },
    data() {
      return {
        files: [],
      }
    },
    template: `
      <div class="p-8 max-w-4xl">
        <UploadInput
          v-model="files"
          label="Invoice"
          disabled
        />
      </div>
    `,
  }),
}

// Invoice Upload Form
export const InvoiceUploadForm = {
  render: () => ({
    components: { UploadInput, Card },
    data() {
      return {
        invoiceFiles: [],
        amount: '',
        reference: '',
      }
    },
    computed: {
      canSubmit() {
        return (
          this.invoiceFiles.some((f) => f.state === 'uploaded') && this.amount && this.reference
        )
      },
    },
    template: `
      <div class="p-8 max-w-4xl mx-auto">
        <Card padding="lg">
          <h2 class="text-2xl font-bold text-content-primary mb-2">Submit expense</h2>
          <p class="text-sm text-content-secondary mb-8">Upload your invoice and details</p>

          <form class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-content-primary mb-2">
                Amount
              </label>
              <input
                v-model="amount"
                type="text"
                placeholder="0.00"
                class="w-full px-4 py-3 text-base border border-gray-300 rounded-lg hover:border-[#25ccbf] focus:border-2 focus:border-[#25ccbf] focus:ring-2 focus:ring-[#25ccbf]/20 outline-none transition-all"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-content-primary mb-2">
                Reference
              </label>
              <input
                v-model="reference"
                type="text"
                placeholder="Invoice number"
                class="w-full px-4 py-3 text-base border border-gray-300 rounded-lg hover:border-[#25ccbf] focus:border-2 focus:border-[#25ccbf] focus:ring-2 focus:ring-[#25ccbf]/20 outline-none transition-all"
              />
            </div>

            <UploadInput
              v-model="invoiceFiles"
              label="Invoice"
              description="PDF, JPEG or PNG less than 5MB"
              accept=".pdf,.jpg,.jpeg,.png"
            />

            <button
              type="button"
              :disabled="!canSubmit"
              class="w-full px-6 py-3 bg-content-accent text-white rounded-lg font-semibold hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Submit expense
            </button>
          </form>
        </Card>
      </div>
    `,
  }),
}

// Document Verification
export const DocumentVerification = {
  render: () => ({
    components: { UploadInput, Card },
    data() {
      return {
        idFiles: [],
        proofFiles: [],
      }
    },
    computed: {
      isComplete() {
        return (
          this.idFiles.some((f) => f.state === 'uploaded') &&
          this.proofFiles.some((f) => f.state === 'uploaded')
        )
      },
      uploadedCount() {
        const idUploaded = this.idFiles.filter((f) => f.state === 'uploaded').length
        const proofUploaded = this.proofFiles.filter((f) => f.state === 'uploaded').length
        return idUploaded + proofUploaded
      },
    },
    template: `
      <div class="p-8 max-w-4xl mx-auto">
        <Card padding="lg">
          <h2 class="text-2xl font-bold text-content-primary mb-2">Verify your identity</h2>
          <p class="text-sm text-content-secondary mb-8">Upload the required documents</p>

          <div class="space-y-6">
            <UploadInput
              v-model="idFiles"
              label="ID document"
              description="Passport, driver's license or ID card"
              accept=".pdf,.jpg,.jpeg,.png"
            />

            <UploadInput
              v-model="proofFiles"
              label="Proof of address"
              description="Utility bill or bank statement (last 3 months)"
              accept=".pdf,.jpg,.jpeg,.png"
            />

            <div v-if="uploadedCount > 0" class="p-4 bg-background-elevated rounded-lg">
              <p class="text-sm text-content-secondary">
                📄 <strong class="text-content-primary">{{ uploadedCount }}/2</strong> documents uploaded
              </p>
            </div>

            <button
              type="button"
              :disabled="!isComplete"
              class="w-full px-6 py-3 bg-content-accent text-white rounded-lg font-semibold hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Continue
            </button>
          </div>
        </Card>
      </div>
    `,
  }),
}

// Multiple Document Upload
export const MultipleDocumentUpload = {
  render: () => ({
    components: { UploadInput, Card },
    data() {
      return {
        documents: [],
      }
    },
    computed: {
      uploadedCount() {
        return this.documents.filter((f) => f.state === 'uploaded').length
      },
      failedCount() {
        return this.documents.filter((f) => f.state === 'failed').length
      },
    },
    template: `
      <div class="p-8 max-w-4xl mx-auto">
        <Card padding="lg">
          <h2 class="text-2xl font-bold text-content-primary mb-2">Upload documents</h2>
          <p class="text-sm text-content-secondary mb-8">Add all supporting documents</p>

          <div class="space-y-6">
            <UploadInput
              v-model="documents"
              label="Supporting documents"
              description="PDF, JPEG or PNG less than 5MB each"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
            />

            <div v-if="documents.length > 0" class="space-y-3">
              <div v-if="uploadedCount > 0" class="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p class="text-sm text-green-700">
                  ✓ {{ uploadedCount }} file(s) uploaded successfully
                </p>
              </div>

              <div v-if="failedCount > 0" class="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-sm text-red-700">
                  ✗ {{ failedCount }} file(s) failed to upload
                </p>
              </div>
            </div>

            <button
              type="button"
              :disabled="uploadedCount === 0"
              class="w-full px-6 py-3 bg-content-accent text-white rounded-lg font-semibold hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Submit documents
            </button>
          </div>
        </Card>
      </div>
    `,
  }),
}

// All States Demo
export const AllStates = {
  render: () => ({
    components: { UploadInput },
    data() {
      return {
        defaultFiles: [],
        uploadedFiles: [
          {
            id: '1',
            name: 'invoice-2024-01.pdf',
            size: 1024 * 1024 * 2.5,
            state: 'uploaded',
            error: null,
          },
        ],
        loadingFiles: [
          {
            id: '2',
            name: 'contract-agreement.pdf',
            size: 1024 * 1024 * 3.2,
            state: 'loading',
            error: null,
          },
        ],
        failedFiles: [
          {
            id: '3',
            name: 'large-document-with-very-long-name.pdf',
            size: 1024 * 1024 * 8,
            state: 'failed',
            error: 'File must be less than 5MB',
          },
        ],
      }
    },
    template: `
      <div class="p-8 max-w-4xl space-y-8">
        <div>
          <h3 class="text-sm font-semibold text-content-primary mb-3">Default State</h3>
          <UploadInput
            v-model="defaultFiles"
            label="Invoice"
          />
        </div>

        <div>
          <h3 class="text-sm font-semibold text-content-primary mb-3">Uploaded State</h3>
          <UploadInput
            v-model="uploadedFiles"
            label="Invoice"
          />
        </div>

        <div>
          <h3 class="text-sm font-semibold text-content-primary mb-3">Loading State</h3>
          <UploadInput
            v-model="loadingFiles"
            label="Contract"
          />
        </div>

        <div>
          <h3 class="text-sm font-semibold text-content-primary mb-3">Failed State</h3>
          <UploadInput
            v-model="failedFiles"
            label="Document"
          />
        </div>
      </div>
    `,
  }),
}

// Best Practices
export const BestPractices = {
  render: () => ({
    components: { UploadInput, Card },
    template: `
      <div class="p-8 max-w-4xl">
        <h2 class="text-2xl font-bold text-content-primary mb-6">Upload Input Best Practices</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Good Examples -->
          <Card>
            <div class="mb-4 flex items-center gap-2">
              <span class="text-2xl">✅</span>
              <h3 class="text-lg font-semibold text-content-positive">Good examples</h3>
            </div>

            <div class="space-y-6">
              <div>
                <UploadInput
                  label="Invoice"
                  description="PDF, JPEG or PNG less than 5MB"
                />
                <p class="text-xs text-content-secondary mt-2">
                  ✓ Clear label describing file type
                </p>
              </div>

              <div>
                <UploadInput
                  label="Proof of address"
                  title="Upload file"
                  description="Recent utility bill or bank statement"
                />
                <p class="text-xs text-content-secondary mt-2">
                  ✓ Specific description of what's needed
                </p>
              </div>

              <div class="text-xs text-content-secondary space-y-1">
                <p>✓ Use within forms alongside other fields</p>
                <p>✓ Ellipsis in center of long filenames</p>
                <p>✓ Confirm before removing files</p>
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
                <UploadInput
                  label="What file do you want to upload?"
                />
                <p class="text-xs text-content-secondary mt-2">
                  ✗ Label should be noun, not question
                </p>
              </div>

              <div>
                <UploadInput
                  label="Document"
                  description="Failed"
                />
                <p class="text-xs text-content-secondary mt-2">
                  ✗ Vague error message (be specific!)
                </p>
              </div>

              <div class="text-xs text-content-secondary space-y-1">
                <p>✗ Using as only input on screen</p>
                <p>✗ Not showing file type/size constraints</p>
                <p>✗ Truncating at end (hides extension)</p>
              </div>
            </div>
          </Card>
        </div>

        <div class="mt-8 p-4 bg-background-elevated rounded-lg">
          <h4 class="font-semibold text-content-primary mb-2">📚 Key Principles:</h4>
          <ul class="text-sm text-content-secondary space-y-1 list-disc list-inside">
            <li>Only use within forms alongside other inputs</li>
            <li>Whole area is clickable/tappable</li>
            <li>Show specific error messages for failed uploads</li>
            <li>Truncate long filenames in the center (preserve extension)</li>
            <li>Confirm before removing files (modal/alert)</li>
            <li>Communicate file type and size constraints</li>
          </ul>
        </div>
      </div>
    `,
  }),
}
