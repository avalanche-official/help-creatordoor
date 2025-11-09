// components/atoms/Icon.stories.js
import Icon from './Icon.vue'

export default {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Lucide icon name (e.g., "x", "menu", "calendar")',
    },
    size: {
      control: 'number',
      description: 'Icon size in pixels',
    },
    color: {
      control: 'color',
      description: 'Icon color',
    },
  },
}

export const Default = {
  args: {
    name: 'x',
    size: 20,
  },
}

export const Close = {
  args: {
    name: 'x',
    size: 24,
  },
}

export const Menu = {
  args: {
    name: 'menu',
    size: 24,
  },
}

export const Calendar = {
  args: {
    name: 'calendar',
    size: 24,
  },
}

export const User = {
  args: {
    name: 'user',
    size: 24,
  },
}

export const Settings = {
  args: {
    name: 'settings',
    size: 24,
  },
}

export const Heart = {
  args: {
    name: 'heart',
    size: 24,
  },
}

export const Star = {
  args: {
    name: 'star',
    size: 24,
  },
}

export const Sizes = {
  render: () => ({
    components: { Icon },
    template: `
      <div class="flex items-center gap-4">
        <Icon name="heart" :size="16" />
        <Icon name="heart" :size="20" />
        <Icon name="heart" :size="24" />
        <Icon name="heart" :size="32" />
        <Icon name="heart" :size="48" />
      </div>
    `,
  }),
}

export const Colors = {
  render: () => ({
    components: { Icon },
    template: `
      <div class="flex items-center gap-4">
        <Icon name="star" :size="32" color="#c084fc" />
        <Icon name="star" :size="32" color="#5b21b6" />
        <Icon name="star" :size="32" color="#a8200d" />
        <Icon name="star" :size="32" color="#7c3aed" />
      </div>
    `,
  }),
}

export const CommonIcons = {
  render: () => ({
    components: { Icon },
    template: `
      <div class="grid grid-cols-6 gap-4">
        <div class="flex flex-col items-center gap-2">
          <Icon name="x" :size="24" />
          <span class="text-xs">x</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="menu" :size="24" />
          <span class="text-xs">menu</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="search" :size="24" />
          <span class="text-xs">search</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="user" :size="24" />
          <span class="text-xs">user</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="settings" :size="24" />
          <span class="text-xs">settings</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="bell" :size="24" />
          <span class="text-xs">bell</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="heart" :size="24" />
          <span class="text-xs">heart</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="star" :size="24" />
          <span class="text-xs">star</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="home" :size="24" />
          <span class="text-xs">home</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="inbox" :size="24" />
          <span class="text-xs">inbox</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="calendar" :size="24" />
          <span class="text-xs">calendar</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="edit" :size="24" />
          <span class="text-xs">edit</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="trash-2" :size="24" />
          <span class="text-xs">trash-2</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="download" :size="24" />
          <span class="text-xs">download</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="upload" :size="24" />
          <span class="text-xs">upload</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="chevron-down" :size="24" />
          <span class="text-xs">chevron-down</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="chevron-up" :size="24" />
          <span class="text-xs">chevron-up</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="chevron-left" :size="24" />
          <span class="text-xs">chevron-left</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="chevron-right" :size="24" />
          <span class="text-xs">chevron-right</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="check" :size="24" />
          <span class="text-xs">check</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="plus" :size="24" />
          <span class="text-xs">plus</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="minus" :size="24" />
          <span class="text-xs">minus</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="help-circle" :size="24" />
          <span class="text-xs">help-circle</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon name="alert-circle" :size="24" />
          <span class="text-xs">alert-circle</span>
        </div>
      </div>
    `,
  }),
}
