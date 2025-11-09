// components/atoms/Input.stories.js
import Input from './Input.vue'
import { ref } from 'vue'

export default {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url', 'number', 'search'],
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    hasError: {
      control: 'boolean',
    },
  },
}

export const Default = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-bind="args" v-model="value" />',
  }),
  args: {
    placeholder: 'Enter text...',
  },
}

export const Email = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-bind="args" v-model="value" />',
  }),
  args: {
    type: 'email',
    placeholder: 'your@email.com',
  },
}

export const Password = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-bind="args" v-model="value" />',
  }),
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
}

export const WithError = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('invalid')
      return { args, value }
    },
    template: '<Input v-bind="args" v-model="value" />',
  }),
  args: {
    hasError: true,
    placeholder: 'Enter text...',
  },
}

export const Disabled = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('Disabled value')
      return { args, value }
    },
    template: '<Input v-bind="args" v-model="value" />',
  }),
  args: {
    disabled: true,
  },
}

export const AllStates = {
  render: () => ({
    components: { Input },
    setup() {
      const normal = ref('')
      const withValue = ref('Some text')
      const error = ref('invalid')
      const disabled = ref('Disabled')
      return { normal, withValue, error, disabled }
    },
    template: `
      <div class="space-y-4">
        <div>
          <p class="text-body-3 mb-2">Normal</p>
          <Input v-model="normal" placeholder="Normal input" />
        </div>
        <div>
          <p class="text-body-3 mb-2">With Value</p>
          <Input v-model="withValue" />
        </div>
        <div>
          <p class="text-body-3 mb-2">Error State</p>
          <Input v-model="error" hasError />
        </div>
        <div>
          <p class="text-body-3 mb-2">Disabled</p>
          <Input v-model="disabled" disabled />
        </div>
      </div>
    `,
  }),
}
