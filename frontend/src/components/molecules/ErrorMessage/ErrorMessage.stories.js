// components/molecules/ErrorMessage.stories.js
import ErrorMessage from './ErrorMessage.vue'

export default {
  title: 'Molecules/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
}

export const Default = {
  args: {
    message: 'This field is required',
  },
}

export const EmailError = {
  args: {
    message: 'Please enter a valid email address',
  },
}

export const PasswordError = {
  args: {
    message: 'Password must be at least 8 characters',
  },
}

export const NoMessage = {
  args: {
    message: '',
  },
}

export const Multiple = {
  render: () => ({
    components: { ErrorMessage },
    template: `
      <div class="space-y-4">
        <ErrorMessage message="This field is required" />
        <ErrorMessage message="Please enter a valid email address" />
        <ErrorMessage message="Password must be at least 8 characters" />
        <ErrorMessage message="Username is already taken" />
      </div>
    `,
  }),
}
