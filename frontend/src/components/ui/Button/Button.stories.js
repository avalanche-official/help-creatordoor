import Button from './Button.vue'

export default {
  title: 'UI/Button', // This creates "UI" folder in Storybook
  component: Button,
  tags: ['autodocs'],
}

export const Primary = {
  render: () => ({
    components: { Button },
    template: '<Button variant="primary">Send Money</Button>',
  }),
}

export const Secondary = {
  render: () => ({
    components: { Button },
    template: '<Button variant="secondary">Cancel</Button>',
  }),
}
