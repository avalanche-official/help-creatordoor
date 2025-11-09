// components/molecules/InputField.stories.js
import InputField from './InputField.vue'
import { ref } from 'vue'

export default {
  title: 'Molecules/InputField',
  component: InputField,
  tags: ['autodocs'],
}

export const Default = {
  render: (args) => ({
    components: { InputField },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<InputField v-bind="args" v-model="value" />',
  }),
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithIcon = {
  render: (args) => ({
    components: { InputField },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<InputField v-bind="args" v-model="value" />',
  }),
  args: {
    placeholder: 'your@email.com',
    prefixIcon: 'mail',
  },
}

export const Password = {
  render: (args) => ({
    components: { InputField },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<InputField v-bind="args" v-model="value" />',
  }),
  args: {
    type: 'password',
    placeholder: 'Enter password',
    prefixIcon: 'lock',
    showPasswordToggle: true,
  },
}

export const WithError = {
  render: (args) => ({
    components: { InputField },
    setup() {
      const value = ref('invalid')
      return { args, value }
    },
    template: '<InputField v-bind="args" v-model="value" />',
  }),
  args: {
    placeholder: 'your@email.com',
    prefixIcon: 'mail',
    hasError: true,
  },
}

export const Search = {
  render: (args) => ({
    components: { InputField },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<InputField v-bind="args" v-model="value" />',
  }),
  args: {
    type: 'search',
    placeholder: 'Search...',
    prefixIcon: 'search',
  },
}

export const AllVariants = {
  render: () => ({
    components: { InputField },
    setup() {
      const text = ref('')
      const email = ref('')
      const password = ref('')
      const search = ref('')
      return { text, email, password, search }
    },
    template: `
      <div class="space-y-4 max-w-md">
        <div>
          <p class="text-body-3 mb-2">Plain Text</p>
          <InputField v-model="text" placeholder="Enter text" />
        </div>

        <div>
          <p class="text-body-3 mb-2">Email with Icon</p>
          <InputField v-model="email" type="email" placeholder="your@email.com" prefixIcon="mail" />
        </div>

        <div>
          <p class="text-body-3 mb-2">Password with Toggle</p>
          <InputField v-model="password" type="password" placeholder="Password" prefixIcon="lock" showPasswordToggle />
        </div>

        <div>
          <p class="text-body-3 mb-2">Search</p>
          <InputField v-model="search" type="search" placeholder="Search..." prefixIcon="search" />
        </div>
      </div>
    `,
  }),
}
