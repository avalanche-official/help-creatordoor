import Avatar from './Avatar.vue'
import AvatarBadge from './AvatarBadge.vue'

export default {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
}

// All Sizes
export const Sizes = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-end gap-6 p-8">
        <div class="flex flex-col items-center gap-2">
          <Avatar :size="16" text="AB" />
          <p class="text-xs text-content-secondary">16px</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar :size="24" text="AB" />
          <p class="text-xs text-content-secondary">24px</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar :size="32" text="AB" />
          <p class="text-xs text-content-secondary">32px</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar :size="40" text="AB" />
          <p class="text-xs text-content-secondary">40px</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar :size="48" text="AB" />
          <p class="text-xs text-content-secondary">48px</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar :size="56" text="AB" />
          <p class="text-xs text-content-secondary">56px</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar :size="72" text="JD" />
          <p class="text-xs text-content-secondary">72px</p>
        </div>
      </div>
    `,
  }),
}

// Text Type (Initials)
export const TextType = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4 p-8">
        <Avatar type="text" text="JD" :size="48" />
        <Avatar type="text" text="AB" :size="48" />
        <Avatar type="text" text="MK" :size="48" />
        <Avatar type="text" text="LW" :size="48" />
      </div>
    `,
  }),
}

// Icon Type
export const IconType = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4 p-8">
        <Avatar type="icon" icon="💰" :size="48" />
        <Avatar type="icon" icon="🏠" :size="48" />
        <Avatar type="icon" icon="🍕" :size="48" />
        <Avatar type="icon" icon="✈️" :size="48" />
        <Avatar type="icon" icon="🎮" :size="48" />
      </div>
    `,
  }),
}

// Flag Type
export const FlagType = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4 p-8">
        <Avatar type="flag" icon="🇺🇸" :size="48" />
        <Avatar type="flag" icon="🇬🇧" :size="48" />
        <Avatar type="flag" icon="🇪🇺" :size="48" />
        <Avatar type="flag" icon="🇯🇵" :size="48" />
        <Avatar type="flag" icon="🇨🇦" :size="48" />
      </div>
    `,
  }),
}

// With Image
export const WithImage = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4 p-8">
        <Avatar
          type="image"
          src="https://i.pravatar.cc/150?img=1"
          alt="User 1"
          :size="48"
        />
        <Avatar
          type="image"
          src="https://i.pravatar.cc/150?img=2"
          alt="User 2"
          :size="48"
        />
        <Avatar
          type="image"
          src="https://i.pravatar.cc/150?img=3"
          alt="User 3"
          :size="48"
        />
      </div>
    `,
  }),
}

// With Notification
export const WithNotification = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-6 p-8">
        <Avatar type="text" text="JD" :size="40" notification />
        <Avatar type="icon" icon="🔔" :size="40" notification />
        <Avatar type="flag" icon="🇺🇸" :size="48" notification />
        <Avatar
          type="image"
          src="https://i.pravatar.cc/150?img=5"
          :size="56"
          notification
        />
      </div>
    `,
  }),
}

// With Badge - Flag
export const WithFlagBadge = {
  render: () => ({
    components: { Avatar, AvatarBadge },
    template: `
      <div class="flex items-center gap-6 p-8">
        <Avatar type="text" text="JD" :size="48">
          <template #badge>
            <AvatarBadge type="flag" icon="🇺🇸" :size="20" />
          </template>
        </Avatar>
        <Avatar
          type="image"
          src="https://i.pravatar.cc/150?img=8"
          :size="48"
        >
          <template #badge>
            <AvatarBadge type="flag" icon="🇬🇧" :size="20" />
          </template>
        </Avatar>
        <Avatar type="icon" icon="💰" :size="48">
          <template #badge>
            <AvatarBadge type="flag" icon="🇪🇺" :size="20" />
          </template>
        </Avatar>
      </div>
    `,
  }),
}

// With Badge - Status
export const WithStatusBadge = {
  render: () => ({
    components: { Avatar, AvatarBadge },
    template: `
      <div class="flex items-center gap-6 p-8">
        <Avatar type="text" text="JD" :size="48">
          <template #badge>
            <AvatarBadge type="status" status="success" :size="16" />
          </template>
        </Avatar>
        <Avatar type="text" text="AB" :size="48">
          <template #badge>
            <AvatarBadge type="status" status="warning" :size="16" />
          </template>
        </Avatar>
        <Avatar type="text" text="MK" :size="48">
          <template #badge>
            <AvatarBadge type="status" status="error" :size="16" />
          </template>
        </Avatar>
        <Avatar type="text" text="LW" :size="48">
          <template #badge>
            <AvatarBadge type="status" status="info" :size="16" />
          </template>
        </Avatar>
      </div>
    `,
  }),
}

// Interactive State
export const Interactive = {
  render: () => ({
    components: { Avatar },
    data() {
      return {
        clicked: '',
      }
    },
    template: `
      <div class="p-8">
        <p class="text-sm text-content-secondary mb-4">
          Clicked: <strong class="text-content-primary">{{ clicked || 'None' }}</strong>
        </p>
        <div class="flex items-center gap-4">
          <Avatar
            type="icon"
            icon="💰"
            :size="56"
            interactive
            @click="clicked = 'Money'"
          />
          <Avatar
            type="icon"
            icon="🏠"
            :size="56"
            interactive
            @click="clicked = 'Home'"
          />
          <Avatar
            type="icon"
            icon="🍕"
            :size="56"
            interactive
            @click="clicked = 'Food'"
          />
          <Avatar
            type="icon"
            icon="✈️"
            :size="56"
            interactive
            @click="clicked = 'Travel'"
          />
        </div>
      </div>
    `,
  }),
}

// Selected State
export const Selected = {
  render: () => ({
    components: { Avatar },
    data() {
      return {
        selectedIcon: '💰',
      }
    },
    template: `
      <div class="p-8">
        <p class="text-sm text-content-secondary mb-4">
          Selected: <strong class="text-content-primary">{{ selectedIcon }}</strong>
        </p>
        <div class="flex items-center gap-4">
          <Avatar
            type="icon"
            icon="💰"
            :size="56"
            interactive
            :selected="selectedIcon === '💰'"
            @click="selectedIcon = '💰'"
          />
          <Avatar
            type="icon"
            icon="🏠"
            :size="56"
            interactive
            :selected="selectedIcon === '🏠'"
            @click="selectedIcon = '🏠'"
          />
          <Avatar
            type="icon"
            icon="🍕"
            :size="56"
            interactive
            :selected="selectedIcon === '🍕'"
            @click="selectedIcon = '🍕'"
          />
          <Avatar
            type="icon"
            icon="✈️"
            :size="56"
            interactive
            :selected="selectedIcon === '✈️'"
            @click="selectedIcon = '✈️'"
          />
        </div>
      </div>
    `,
  }),
}

// Real World Examples (FIXED ALIGNMENT)
export const RealWorldExamples = {
  render: () => ({
    components: { Avatar, AvatarBadge },
    template: `
      <div class="space-y-4 p-8 max-w-4xl">
        <!-- User Profile with Notification -->
        <div class="flex items-center gap-3 p-4 border border-border-default rounded-lg hover:bg-background-elevated transition-colors cursor-pointer">
          <Avatar
            type="image"
            src="https://i.pravatar.cc/150?img=25"
            :size="48"
            notification
          />
          <div class="flex-1 min-w-0">
            <p class="font-medium text-content-primary">John Doe</p>
            <p class="text-sm text-content-secondary truncate">john@example.com</p>
          </div>
          <span class="text-content-tertiary shrink-0">→</span>
        </div>

        <!-- Recipient with Currency Badge -->
        <div class="flex items-center gap-3 p-4 border border-border-default rounded-lg hover:bg-background-elevated transition-colors cursor-pointer">
          <Avatar type="text" text="JS" :size="40">
            <template #badge>
              <AvatarBadge type="flag" icon="🇬🇧" :size="16" />
            </template>
          </Avatar>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-content-primary">Jane Smith</p>
            <p class="text-sm text-content-secondary">GBP Account</p>
          </div>
          <span class="text-content-tertiary shrink-0">→</span>
        </div>

        <!-- Category Selection Grid -->
        <div>
          <p class="text-sm font-medium text-content-primary mb-3">Select Category</p>
          <div class="grid grid-cols-4 gap-3">
            <div class="flex flex-col items-center gap-2">
              <Avatar type="icon" icon="💰" :size="56" interactive selected />
              <p class="text-xs text-content-secondary text-center">Money</p>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Avatar type="icon" icon="🏠" :size="56" interactive />
              <p class="text-xs text-content-secondary text-center">Home</p>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Avatar type="icon" icon="🍕" :size="56" interactive />
              <p class="text-xs text-content-secondary text-center">Food</p>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Avatar type="icon" icon="✈️" :size="56" interactive />
              <p class="text-xs text-content-secondary text-center">Travel</p>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
