import Snackbar from './Snackbar.vue'

export default {
  title: 'UI/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
}

// Basic Snackbar
export const Basic = {
  render: () => ({
    components: { Snackbar },
    data() {
      return {
        show: false,
      }
    },
    template: `
      <div>
        <button
          @click="show = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Show Snackbar
        </button>

        <Snackbar
          v-model="show"
          message="This is a basic snackbar message"
        />
      </div>
    `,
  }),
}

// With Action Button
export const WithAction = {
  render: () => ({
    components: { Snackbar },
    data() {
      return {
        show: false,
        actionClicked: false,
      }
    },
    template: `
      <div>
        <button
          @click="show = true; actionClicked = false"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Delete Item
        </button>

        <p v-if="actionClicked" class="mt-4 text-content-positive">
          ✓ Action was undone!
        </p>

        <Snackbar
          v-model="show"
          message="Item deleted"
          action="Undo"
          @action-click="actionClicked = true"
        />
      </div>
    `,
  }),
}

// Role Changed (Wise Style!)
export const RoleChanged = {
  render: () => ({
    components: { Snackbar },
    data() {
      return {
        show: false,
      }
    },
    template: `
      <div>
        <button
          @click="show = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Change Role
        </button>

        <Snackbar
          v-model="show"
          message="Role changed"
        />
      </div>
    `,
  }),
}

// Different Positions
export const Positions = {
  render: () => ({
    components: { Snackbar },
    data() {
      return {
        showLeft: false,
        showCenter: false,
        showRight: false,
      }
    },
    template: `
      <div class="flex gap-4">
        <button
          @click="showLeft = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Bottom Left
        </button>

        <button
          @click="showCenter = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Bottom Center
        </button>

        <button
          @click="showRight = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Bottom Right
        </button>

        <Snackbar
          v-model="showLeft"
          message="Bottom left position"
          position="bottom-left"
        />

        <Snackbar
          v-model="showCenter"
          message="Bottom center position"
          position="bottom-center"
        />

        <Snackbar
          v-model="showRight"
          message="Bottom right position"
          position="bottom-right"
        />
      </div>
    `,
  }),
}

// Auto-Hide Timing
export const AutoHideTiming = {
  render: () => ({
    components: { Snackbar },
    data() {
      return {
        show2s: false,
        show5s: false,
        showPermanent: false,
      }
    },
    template: `
      <div class="flex gap-4">
        <button
          @click="show2s = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          2 Seconds
        </button>

        <button
          @click="show5s = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          5 Seconds
        </button>

        <button
          @click="showPermanent = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          No Auto-Hide
        </button>

        <Snackbar
          v-model="show2s"
          message="Auto-hides in 2 seconds"
          :duration="2000"
        />

        <Snackbar
          v-model="show5s"
          message="Auto-hides in 5 seconds"
          :duration="5000"
        />

        <Snackbar
          v-model="showPermanent"
          message="Won't auto-hide (close manually)"
          :duration="0"
        />
      </div>
    `,
  }),
}

// Common Use Cases
export const CommonUseCases = {
  render: () => ({
    components: { Snackbar },
    data() {
      return {
        showSaved: false,
        showCopied: false,
        showUploaded: false,
        showSent: false,
      }
    },
    template: `
      <div class="space-y-4">
        <div class="flex gap-4">
          <button
            @click="showSaved = true"
            class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
          >
            Save Settings
          </button>

          <button
            @click="showCopied = true"
            class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
          >
            Copy to Clipboard
          </button>

          <button
            @click="showUploaded = true"
            class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
          >
            Upload File
          </button>

          <button
            @click="showSent = true"
            class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
          >
            Send Message
          </button>
        </div>

        <Snackbar
          v-model="showSaved"
          message="Settings saved"
        />

        <Snackbar
          v-model="showCopied"
          message="Copied to clipboard"
        />

        <Snackbar
          v-model="showUploaded"
          message="File uploaded successfully"
        />

        <Snackbar
          v-model="showSent"
          message="Message sent"
        />
      </div>
    `,
  }),
}

// With Undo Action (Wise Style!)
export const WithUndo = {
  render: () => ({
    components: { Snackbar },
    data() {
      return {
        showDelete: false,
        showArchive: false,
        items: ['Document 1', 'Document 2', 'Document 3'],
        deletedItem: null,
      }
    },
    methods: {
      deleteItem(item) {
        this.deletedItem = item
        this.items = this.items.filter((i) => i !== item)
        this.showDelete = true
      },
      undoDelete() {
        if (this.deletedItem) {
          this.items.push(this.deletedItem)
          this.deletedItem = null
        }
      },
    },
    template: `
      <div>
        <div class="space-y-2 mb-6">
          <div
            v-for="item in items"
            :key="item"
            class="flex items-center justify-between p-3 bg-white border border-border-default rounded-lg"
          >
            <span>{{ item }}</span>
            <button
              @click="deleteItem(item)"
              class="px-3 py-1 text-sm text-content-negative hover:underline"
            >
              Delete
            </button>
          </div>
        </div>

        <Snackbar
          v-model="showDelete"
          message="Document deleted"
          action="Undo"
          @action-click="undoDelete"
        />
      </div>
    `,
  }),
}

// Money Transfer Confirmations
export const MoneyTransferConfirmations = {
  render: () => ({
    components: { Snackbar },
    data() {
      return {
        showSent: false,
        showReceived: false,
        showScheduled: false,
      }
    },
    template: `
      <div class="space-y-4">
        <button
          @click="showSent = true"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"
        >
          Send Money
        </button>

        <button
          @click="showReceived = true"
          class="px-4 py-2 bg-content-positive text-white rounded-lg hover:opacity-90"
        >
          Money Received
        </button>

        <button
          @click="showScheduled = true"
          class="px-4 py-2 bg-content-warning text-white rounded-lg hover:opacity-90"
        >
          Schedule Transfer
        </button>

        <Snackbar
          v-model="showSent"
          message="Transfer sent successfully"
          action="View details"
        />

        <Snackbar
          v-model="showReceived"
          message="You received $250.00 from Jane Smith"
        />

        <Snackbar
          v-model="showScheduled"
          message="Transfer scheduled for tomorrow"
          action="View"
        />
      </div>
    `,
  }),
}

// Multiple Snackbars (Queue)
export const MultipleSnackbars = {
  render: () => ({
    components: { Snackbar },
    data() {
      return {
        snackbars: [],
        counter: 1,
      }
    },
    methods: {
      showSnackbar() {
        const id = this.counter++
        this.snackbars.push({
          id,
          show: true,
          message: `Notification ${id}`,
        })

        // Auto-remove after duration
        setTimeout(() => {
          this.snackbars = this.snackbars.filter((s) => s.id !== id)
        }, 4000)
      },
    },
    template: `
      <div>
        <button
          @click="showSnackbar"
          class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90"

        >
          Show Multiple Snackbars
        </button>

        <p class="mt-4 text-sm text-content-secondary">
          Click multiple times to queue snackbars
        </p>

        <Snackbar
          v-for="(snackbar, index) in snackbars"
          :key="snackbar.id"
          v-model="snackbar.show"
          :message="snackbar.message"
          :style="{ bottom: \`\${4 + index * 4.5}rem\` }"
        />
      </div>
    `,
  }),
}
