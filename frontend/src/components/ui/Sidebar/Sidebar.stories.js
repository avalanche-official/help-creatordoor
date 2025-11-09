import Sidebar from './Sidebar.vue'

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
}

// Basic Sidebar (Right Side)
export const Default = {
  render: () => ({
    components: { Sidebar },
    data() {
      return {
        isOpen: true,
      }
    },
    template: `
      <div>
        <button
          @click="isOpen = true"
          class="px-6 py-3 bg-[#37517e] text-white rounded-lg font-semibold hover:bg-[#2d4163]"
        >
          Open Sidebar
        </button>

        <Sidebar
          :is-open="isOpen"
          title="Basic Sidebar"
          @close="isOpen = false"
        >
          <div class="space-y-4">
            <p class="text-content-secondary">
              This is a basic sidebar component. You can put any content here.
            </p>
            <p class="text-content-secondary">
              Click the X button, press ESC, or click outside to close.
            </p>
          </div>
        </Sidebar>
      </div>
    `,
  }),
}

// Left Positioned Sidebar
export const LeftPosition = {
  render: () => ({
    components: { Sidebar },
    data() {
      return {
        isOpen: false,
      }
    },
    template: `
      <div>
        <button
          @click="isOpen = true"
          class="px-6 py-3 bg-[#37517e] text-white rounded-lg font-semibold hover:bg-[#2d4163]"
        >
          Open Left Sidebar
        </button>

        <Sidebar
          :is-open="isOpen"
          title="Left Sidebar"
          position="left"
          @close="isOpen = false"
        >
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-content-primary">Navigation Menu</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-content-accent hover:underline">Dashboard</a></li>
              <li><a href="#" class="text-content-accent hover:underline">Transactions</a></li>
              <li><a href="#" class="text-content-accent hover:underline">Recipients</a></li>
              <li><a href="#" class="text-content-accent hover:underline">Settings</a></li>
            </ul>
          </div>
        </Sidebar>
      </div>
    `,
  }),
}

// Wide Sidebar
export const WideSidebar = {
  render: () => ({
    components: { Sidebar },
    data() {
      return {
        isOpen: false,
      }
    },
    template: `
      <div>
        <button
          @click="isOpen = true"
          class="px-6 py-3 bg-[#37517e] text-white rounded-lg font-semibold hover:bg-[#2d4163]"
        >
          Open Wide Sidebar
        </button>

        <Sidebar
          :is-open="isOpen"
          title="Wide Sidebar (600px)"
          width="wide"
          @close="isOpen = false"
        >
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-content-primary mb-3">More Space</h3>
              <p class="text-content-secondary">
                This sidebar is wider (600px) and perfect for displaying more complex content
                like forms, tables, or detailed information.
              </p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-gray-50 rounded-lg">
                <h4 class="font-semibold mb-2">Feature 1</h4>
                <p class="text-sm text-content-secondary">Description here</p>
              </div>
              <div class="p-4 bg-gray-50 rounded-lg">
                <h4 class="font-semibold mb-2">Feature 2</h4>
                <p class="text-sm text-content-secondary">Description here</p>
              </div>
            </div>
          </div>
        </Sidebar>
      </div>
    `,
  }),
}

// With Footer Button
export const WithFooter = {
  render: () => ({
    components: { Sidebar },
    data() {
      return {
        isOpen: false,
      }
    },
    methods: {
      handleConfirm() {
        alert('Footer button clicked!')
        this.isOpen = false
      },
    },
    template: `
      <div>
        <button
          @click="isOpen = true"
          class="px-6 py-3 bg-[#37517e] text-white rounded-lg font-semibold hover:bg-[#2d4163]"
        >
          Open Sidebar with Footer
        </button>

        <Sidebar
          :is-open="isOpen"
          title="Sidebar with Footer"
          :show-footer="true"
          footer-button-text="Confirm Changes"
          @close="isOpen = false"
          @footer-action="handleConfirm"
        >
          <div class="space-y-4">
            <p class="text-content-secondary">
              This sidebar has a footer with an action button at the bottom.
            </p>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <input type="checkbox" id="option1" class="w-4 h-4" />
                <label for="option1" class="text-sm">Enable notifications</label>
              </div>
              <div class="flex items-center gap-3">
                <input type="checkbox" id="option2" class="w-4 h-4" />
                <label for="option2" class="text-sm">Auto-save changes</label>
              </div>
              <div class="flex items-center gap-3">
                <input type="checkbox" id="option3" class="w-4 h-4" />
                <label for="option3" class="text-sm">Dark mode</label>
              </div>
            </div>
          </div>
        </Sidebar>
      </div>
    `,
  }),
}

// Language Selector Example
export const LanguageSelector = {
  render: () => ({
    components: { Sidebar },
    data() {
      return {
        isOpen: false,
        currentLanguage: { code: 'en', name: 'English', flag: '🇬🇧' },
        languages: [
          { code: 'en', name: 'English', flag: '🇬🇧' },
          { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
          { code: 'fr', name: 'Français', flag: '🇫🇷' },
          { code: 'es', name: 'Español', flag: '🇪🇸' },
          { code: 'it', name: 'Italiano', flag: '🇮🇹' },
          { code: 'pt', name: 'Português', flag: '🇵🇹' },
        ],
      }
    },
    methods: {
      selectLanguage(lang) {
        this.currentLanguage = lang
        this.isOpen = false
      },
    },
    template: `
      <div>
        <button
          @click="isOpen = true"
          class="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-[#37517e]"
        >
          <span class="text-2xl">{{ currentLanguage.flag }}</span>
          <span class="font-medium">{{ currentLanguage.name }}</span>
        </button>

        <Sidebar
          :is-open="isOpen"
          title="Select Language"
          @close="isOpen = false"
        >
          <div class="space-y-2">
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="selectLanguage(lang)"
              class="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-purple-100 transition-colors"
              :class="
                currentLanguage.code === lang.code
                  ? 'bg-purple-50 border-2 border-purple-300'
                  : 'border-2 border-transparent'
              "
            >
              <span class="text-2xl">{{ lang.flag }}</span>
              <div class="flex-1 text-left">
                <div class="font-semibold text-gray-900">{{ lang.name }}</div>
                <div class="text-sm text-gray-600 uppercase">{{ lang.code }}</div>
              </div>
              <svg
                v-if="currentLanguage.code === lang.code"
                class="w-5 h-5 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </Sidebar>
      </div>
    `,
  }),
}

// Form Example
export const FormSidebar = {
  render: () => ({
    components: { Sidebar },
    data() {
      return {
        isOpen: false,
        formData: {
          name: '',
          email: '',
          message: '',
        },
      }
    },
    methods: {
      handleSubmit() {
        console.log('Form submitted:', this.formData)
        alert('Form submitted successfully!')
        this.isOpen = false
      },
    },
    template: `
      <div>
        <button
          @click="isOpen = true"
          class="px-6 py-3 bg-[#37517e] text-white rounded-lg font-semibold hover:bg-[#2d4163]"
        >
          Open Form Sidebar
        </button>

        <Sidebar
          :is-open="isOpen"
          title="Contact Form"
          :show-footer="true"
          footer-button-text="Send Message"
          @close="isOpen = false"
          @footer-action="handleSubmit"
        >
          <form class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-content-primary mb-2">
                Name
              </label>
              <input
                v-model="formData.name"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#25ccbf] focus:outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-content-primary mb-2">
                Email
              </label>
              <input
                v-model="formData.email"
                type="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#25ccbf] focus:outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-content-primary mb-2">
                Message
              </label>
              <textarea
                v-model="formData.message"
                rows="5"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#25ccbf] focus:outline-none resize-none"
                placeholder="Your message here..."
              ></textarea>
            </div>
          </form>
        </Sidebar>
      </div>
    `,
  }),
}

// Scrollable Content
export const ScrollableContent = {
  render: () => ({
    components: { Sidebar },
    data() {
      return {
        isOpen: false,
      }
    },
    template: `
      <div>
        <button
          @click="isOpen = true"
          class="px-6 py-3 bg-[#37517e] text-white rounded-lg font-semibold hover:bg-[#2d4163]"
        >
          Open Scrollable Sidebar
        </button>

        <Sidebar
          :is-open="isOpen"
          title="Long Content"
          @close="isOpen = false"
        >
          <div class="space-y-6">
            <div v-for="i in 20" :key="i" class="p-4 bg-gray-50 rounded-lg">
              <h3 class="font-semibold text-content-primary mb-2">Section {{ i }}</h3>
              <p class="text-sm text-content-secondary">
                This is a scrollable sidebar. When content exceeds the viewport height,
                you can scroll through it while the header stays fixed at the top.
              </p>
            </div>
          </div>
        </Sidebar>
      </div>
    `,
  }),
}

// Custom Footer Slot
export const CustomFooter = {
  render: () => ({
    components: { Sidebar },
    data() {
      return {
        isOpen: false,
      }
    },
    methods: {
      handleSave() {
        alert('Saved!')
      },
      handleCancel() {
        this.isOpen = false
      },
    },
    template: `
      <div>
        <button
          @click="isOpen = true"
          class="px-6 py-3 bg-[#37517e] text-white rounded-lg font-semibold hover:bg-[#2d4163]"
        >
          Open Sidebar with Custom Footer
        </button>

        <Sidebar
          :is-open="isOpen"
          title="Custom Footer Buttons"
          :show-footer="true"
          @close="isOpen = false"
        >
          <div class="space-y-4">
            <p class="text-content-secondary">
              This sidebar has a custom footer with multiple buttons using the footer slot.
            </p>
          </div>

          <template #footer>
            <div class="flex gap-3">
              <button
                @click="handleCancel"
                class="flex-1 px-6 py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                @click="handleSave"
                class="flex-1 px-6 py-3 bg-[#37517e] text-white rounded-lg font-semibold hover:bg-[#2d4163]"
              >
                Save
              </button>
            </div>
          </template>
        </Sidebar>
      </div>
    `,
  }),
}

// Mobile Example
export const MobileView = {
  render: () => ({
    components: { Sidebar },
    data() {
      return {
        isOpen: false,
      }
    },
    template: `
      <div class="max-w-sm">
        <button
          @click="isOpen = true"
          class="w-full px-6 py-3 bg-[#37517e] text-white rounded-lg font-semibold hover:bg-[#2d4163]"
        >
          Open Sidebar (Mobile)
        </button>

        <Sidebar
          :is-open="isOpen"
          title="Mobile Sidebar"
          @close="isOpen = false"
        >
          <div class="space-y-4">
            <p class="text-content-secondary">
              On mobile devices, the sidebar takes the full width of the screen.
            </p>
            <p class="text-content-secondary">
              Resize your browser to see how it adapts!
            </p>
          </div>
        </Sidebar>
      </div>
    `,
  }),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
