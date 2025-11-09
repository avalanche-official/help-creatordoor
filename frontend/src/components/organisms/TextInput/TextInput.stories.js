// components/organisms/TextInput.stories.js
import TextInput from './TextInput.vue'
import { ref } from 'vue'

export default {
  title: 'Organisms/TextInput',
  component: TextInput,
  tags: ['autodocs'],
}

export const Default = {
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextInput v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Full Name',
    placeholder: 'Enter your name',
  },
}

export const Email = {
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextInput v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'E-Mail',
    type: 'email',
    placeholder: '',
    prefixIcon: 'mail',
    required: true,
  },
}

export const Password = {
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextInput v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Passwort',
    type: 'password',
    placeholder: 'Passwort eingeben',
    prefixIcon: 'lock',
    showPasswordToggle: true,
    required: true,
  },
}

export const WithError = {
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('invalid@')
      return { args, value }
    },
    template: '<TextInput v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'E-Mail',
    type: 'email',
    placeholder: 'deine@email.com',
    prefixIcon: 'mail',
    error: 'Bitte gib eine gültige E-Mail-Adresse ein',
  },
}

export const WithHelperText = {
  render: (args) => ({
    components: { TextInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextInput v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Passwort',
    type: 'password',
    placeholder: 'Passwort eingeben',
    prefixIcon: 'lock',
    showPasswordToggle: true,
    helperText: 'Mindestens 8 Zeichen mit Zahlen und Sonderzeichen',
  },
}

export const LoginForm = {
  render: () => ({
    components: { TextInput },
    setup() {
      const email = ref('')
      const password = ref('')
      return { email, password }
    },
    template: `
      <div class="max-w-md space-y-6">
        <TextInput
          v-model="email"
          label="E-Mail"
          type="email"
          placeholder="deine@email.com"
          prefixIcon="mail"
          required
        />

        <TextInput
          v-model="password"
          label="Passwort"
          type="password"
          placeholder="Passwort eingeben"
          prefixIcon="lock"
          showPasswordToggle
          required
        />
      </div>
    `,
  }),
}
