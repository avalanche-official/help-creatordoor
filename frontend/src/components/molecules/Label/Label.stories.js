// components/molecules/Label.stories.js
import Label from './Label.vue'

export default {
  title: 'Molecules/Label',
  component: Label,
  tags: ['autodocs'],
}

export const Default = {
  args: {
    text: 'Email Address',
  },
}

export const Required = {
  args: {
    text: 'Email Address',
    required: true,
  },
}

export const Multiple = {
  render: () => ({
    components: { Label },
    template: `
      <div class="space-y-4">
        <Label text="Full Name" />
        <Label text="Email Address" required />
        <Label text="Phone Number" />
        <Label text="Password" required />
      </div>
    `,
  }),
}
