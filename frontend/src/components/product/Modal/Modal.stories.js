import Modal from './Modal.vue'

export default {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
}

// Basic Modal
export const Basic = {
  render: () => ({
    components: { Modal },
    data() {
      return {
        showModal: false,
      }
    },
    template: `
      <div>
        <button
          @click="showModal = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Open Modal
        </button>

        <Modal :show="showModal" title="Change this user's role?" @close="showModal = false">
          <p class="text-content-secondary mb-6">
            This will change the user's permissions and access level.
          </p>

          <template #actions>
            <button
              @click="showModal = false"
              class="w-full px-4 py-3 bg-content-accent text-white rounded-full hover:opacity-90 font-medium"
            >
              Continue
            </button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

// Confirmation Modal (Wise Style!)
export const ConfirmationModal = {
  render: () => ({
    components: { Modal },
    data() {
      return {
        showModal: false,
      }
    },
    methods: {
      confirmDelete() {
        alert('Direct Debit cancelled!')
        this.showModal = false
      },
    },
    template: `
      <div>
        <button
          @click="showModal = true"
          class="px-4 py-2 bg-content-negative text-white rounded-lg hover:opacity-90"
        >
          Cancel Direct Debit
        </button>

        <Modal :show="showModal" title="Cancel this Direct Debit?" @close="showModal = false">
          <p class="text-content-primary mb-6">
            This will stop all future payments to Bond, James Bond.
          </p>

          <template #actions>
            <div class="space-y-3">
              <button
                @click="confirmDelete"
                class="w-full px-4 py-3 bg-content-accent text-white rounded-full hover:opacity-90 font-medium"
              >
                Cancel Direct Debit
              </button>
              <button
                @click="showModal = false"
                class="w-full px-4 py-3 border-2 border-gray-300 text-content-primary rounded-full hover:bg-background-elevated font-medium"
              >
                Go back
              </button>
            </div>
          </template>
        </Modal>
      </div>
    `,
  }),
}

// Warning Modal
export const WarningModal = {
  render: () => ({
    components: { Modal },
    data() {
      return {
        showModal: false,
      }
    },
    template: `
      <div>
        <button
          @click="showModal = true"
          class="px-4 py-2 bg-content-warning text-white rounded-lg hover:opacity-90"
        >
          Delete Account
        </button>

        <Modal :show="showModal" title="Delete your account?" @close="showModal = false">
          <div class="space-y-4 mb-6">
            <p class="text-content-primary font-medium">
              This action cannot be undone. This will permanently:
            </p>
            <ul class="list-disc list-inside space-y-2 text-content-secondary">
              <li>Delete all your personal data</li>
              <li>Close all your currency accounts</li>
              <li>Cancel all pending transfers</li>
              <li>Remove access to your transaction history</li>
            </ul>
            <div class="p-4 bg-content-warning/10 border border-content-warning/30 rounded-lg">
              <p class="text-sm text-content-warning">
                <strong>Warning:</strong> Make sure to withdraw all funds before deleting your account.
              </p>
            </div>
          </div>

          <template #actions>
            <div class="space-y-3">
              <button
                @click="showModal = false"
                class="w-full px-4 py-3 bg-content-negative text-white rounded-full hover:opacity-90 font-medium"
              >
                Delete account
              </button>
              <button
                @click="showModal = false"
                class="w-full px-4 py-3 border-2 border-gray-300 text-content-primary rounded-full hover:bg-background-elevated font-medium"
              >
                Cancel
              </button>
            </div>
          </template>
        </Modal>
      </div>
    `,
  }),
}

// Form Modal
export const FormModal = {
  render: () => ({
    components: { Modal },
    data() {
      return {
        showModal: false,
        name: '',
        email: '',
      }
    },
    methods: {
      submit() {
        alert(`Added: ${this.name} (${this.email})`)
        this.showModal = false
        this.name = ''
        this.email = ''
      },
    },
    template: `
      <div>
        <button
          @click="showModal = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Add Team Member
        </button>

        <Modal :show="showModal" title="Add team member" @close="showModal = false">
          <div class="space-y-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-content-primary mb-2">
                Full name *
              </label>
              <input
                v-model="name"
                type="text"
                placeholder="Enter name"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-[#25ccbf]"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-content-primary mb-2">
                Email address *
              </label>
              <input
                v-model="email"
                type="email"
                placeholder="Enter email"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-[#25ccbf]"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-content-primary mb-2">
                Role
              </label>
              <select class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-[#25ccbf]">
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </div>
          </div>

          <template #actions>
            <div class="flex gap-3">
              <button
                @click="showModal = false"
                class="flex-1 px-4 py-3 border-2 border-gray-300 text-content-primary rounded-full hover:bg-background-elevated font-medium"
              >
                Cancel
              </button>
              <button
                @click="submit"
                :disabled="!name || !email"
                :class="[
                  'flex-1 px-4 py-3 rounded-full font-medium transition-opacity',
                  name && email
                    ? 'bg-content-accent text-white hover:opacity-90'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                ]"
              >
                Add member
              </button>
            </div>
          </template>
        </Modal>
      </div>
    `,
  }),
}

// Success Modal
export const SuccessModal = {
  render: () => ({
    components: { Modal },
    data() {
      return {
        showModal: false,
      }
    },
    template: `
      <div>
        <button
          @click="showModal = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Send Money
        </button>

        <Modal :show="showModal" title="Money sent!" @close="showModal = false">
          <div class="text-center mb-6">
            <div class="text-6xl mb-4">✓</div>
            <p class="text-content-primary mb-2">
              You sent <strong>£500.00</strong> to Jane Smith
            </p>
            <p class="text-sm text-content-secondary">
              Your money should arrive by tomorrow, 10:00 AM
            </p>
          </div>

          <template #actions>
            <button
              @click="showModal = false"
              class="w-full px-4 py-3 bg-content-accent text-white rounded-full hover:opacity-90 font-medium"
            >
              Done
            </button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

// Long Content (Scrollable)
export const LongContent = {
  render: () => ({
    components: { Modal },
    data() {
      return {
        showModal: false,
      }
    },
    template: `
      <div>
        <button
          @click="showModal = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Terms and Conditions
        </button>

        <Modal :show="showModal" title="Terms and conditions" @close="showModal = false">
          <div class="space-y-4 mb-6 text-sm text-content-secondary">
            <h3 class="text-base font-semibold text-content-primary">1. Introduction</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <h3 class="text-base font-semibold text-content-primary">2. User Responsibilities</h3>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <h3 class="text-base font-semibold text-content-primary">3. Privacy Policy</h3>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            <h3 class="text-base font-semibold text-content-primary">4. Payment Terms</h3>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <h3 class="text-base font-semibold text-content-primary">5. Cancellation Policy</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </p>

            <h3 class="text-base font-semibold text-content-primary">6. Limitation of Liability</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </p>
          </div>

          <template #actions>
            <button
              @click="showModal = false"
              class="w-full px-4 py-3 bg-content-accent text-white rounded-full hover:opacity-90 font-medium"
            >
              I agree
            </button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

// Without Close Button
export const WithoutCloseButton = {
  render: () => ({
    components: { Modal },
    data() {
      return {
        showModal: false,
      }
    },
    template: `
      <div>
        <button
          @click="showModal = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Force Action
        </button>

        <Modal
          :show="showModal"
          title="Complete this step"
          :show-close="false"
          :close-on-backdrop="false"
          :close-on-esc="false"
          @close="showModal = false"
        >
          <p class="text-content-secondary mb-6">
            You must complete this action before continuing.
          </p>

          <template #actions>
            <button
              @click="showModal = false"
              class="w-full px-4 py-3 bg-content-accent text-white rounded-full hover:opacity-90 font-medium"
            >
              Complete action
            </button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

// Multiple Buttons
export const MultipleButtons = {
  render: () => ({
    components: { Modal },
    data() {
      return {
        showModal: false,
      }
    },
    template: `
      <div>
        <button
          @click="showModal = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Save Changes
        </button>

        <Modal :show="showModal" title="Save changes?" @close="showModal = false">
          <p class="text-content-secondary mb-6">
            You have unsaved changes. Do you want to save them before leaving?
          </p>

          <template #actions>
            <div class="space-y-3">
              <button
                @click="showModal = false"
                class="w-full px-4 py-3 bg-content-accent text-white rounded-full hover:opacity-90 font-medium"
              >
                Save changes
              </button>
              <button
                @click="showModal = false"
                class="w-full px-4 py-3 border-2 border-gray-300 text-content-primary rounded-full hover:bg-background-elevated font-medium"
              >
                Discard changes
              </button>
            </div>
          </template>
        </Modal>
      </div>
    `,
  }),
}
