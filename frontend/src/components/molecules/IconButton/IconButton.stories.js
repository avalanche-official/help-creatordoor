// components/molecules/IconButton.stories.js
import IconButton from './IconButton.vue'

export default {
  title: 'Molecules/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: 'Lucide icon name (e.g., "x", "menu", "heart")',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    ariaLabel: {
      control: 'text',
    },
  },
}

export const Ghost = {
  args: {
    icon: 'x',
    variant: 'ghost',
    size: 'medium',
    ariaLabel: 'Close',
  },
}

export const Primary = {
  args: {
    icon: 'plus',
    variant: 'primary',
    size: 'medium',
    ariaLabel: 'Add',
  },
}

export const Secondary = {
  args: {
    icon: 'share-2',
    variant: 'secondary',
    size: 'medium',
    ariaLabel: 'Share',
  },
}

export const Danger = {
  args: {
    icon: 'trash-2',
    variant: 'danger',
    size: 'medium',
    ariaLabel: 'Delete',
  },
}

export const Disabled = {
  args: {
    icon: 'heart',
    variant: 'primary',
    size: 'medium',
    disabled: true,
    ariaLabel: 'Like',
  },
}

export const AllVariants = {
  render: () => ({
    components: { IconButton },
    template: `
      <div class="space-y-6">
        <div>
          <p class="text-body-3-semibold mb-3">Variants</p>
          <div class="flex gap-4">
            <IconButton icon="heart" variant="primary" aria-label="Like" />
            <IconButton icon="share-2" variant="secondary" aria-label="Share" />
            <IconButton icon="x" variant="ghost" aria-label="Close" />
            <IconButton icon="trash-2" variant="danger" aria-label="Delete" />
          </div>
        </div>
      </div>
    `,
  }),
}

export const AllSizes = {
  render: () => ({
    components: { IconButton },
    template: `
      <div class="space-y-6">
        <div>
          <p class="text-body-3-semibold mb-3">Sizes</p>
          <div class="flex items-center gap-4">
            <IconButton icon="settings" variant="ghost" size="small" aria-label="Settings Small" />
            <IconButton icon="settings" variant="ghost" size="medium" aria-label="Settings Medium" />
            <IconButton icon="settings" variant="ghost" size="large" aria-label="Settings Large" />
          </div>
        </div>
      </div>
    `,
  }),
}

export const CommonIcons = {
  render: () => ({
    components: { IconButton },
    template: `
      <div class="space-y-4">
        <div>
          <p class="text-body-3-semibold mb-3">Navigation Icons</p>
          <div class="flex gap-3 flex-wrap">
            <IconButton icon="x" variant="ghost" aria-label="Close" />
            <IconButton icon="menu" variant="ghost" aria-label="Menu" />
            <IconButton icon="arrow-left" variant="ghost" aria-label="Back" />
            <IconButton icon="chevron-left" variant="ghost" aria-label="Previous" />
            <IconButton icon="chevron-right" variant="ghost" aria-label="Next" />
          </div>
        </div>

        <div>
          <p class="text-body-3-semibold mb-3">Action Icons</p>
          <div class="flex gap-3 flex-wrap">
            <IconButton icon="plus" variant="primary" aria-label="Add" />
            <IconButton icon="edit" variant="secondary" aria-label="Edit" />
            <IconButton icon="trash-2" variant="danger" aria-label="Delete" />
            <IconButton icon="download" variant="ghost" aria-label="Download" />
            <IconButton icon="upload" variant="ghost" aria-label="Upload" />
          </div>
        </div>

        <div>
          <p class="text-body-3-semibold mb-3">Interface Icons</p>
          <div class="flex gap-3 flex-wrap">
            <IconButton icon="search" variant="ghost" aria-label="Search" />
            <IconButton icon="user" variant="ghost" aria-label="Profile" />
            <IconButton icon="bell" variant="ghost" aria-label="Notifications" />
            <IconButton icon="settings" variant="ghost" aria-label="Settings" />
            <IconButton icon="heart" variant="ghost" aria-label="Favorite" />
            <IconButton icon="star" variant="ghost" aria-label="Star" />
          </div>
        </div>
      </div>
    `,
  }),
}

export const DisabledStates = {
  render: () => ({
    components: { IconButton },
    template: `
      <div class="flex gap-4 flex-wrap">
        <IconButton icon="heart" variant="primary" disabled aria-label="Like Disabled" />
        <IconButton icon="share-2" variant="secondary" disabled aria-label="Share Disabled" />
        <IconButton icon="x" variant="ghost" disabled aria-label="Close Disabled" />
        <IconButton icon="trash-2" variant="danger" disabled aria-label="Delete Disabled" />
      </div>
    `,
  }),
}
