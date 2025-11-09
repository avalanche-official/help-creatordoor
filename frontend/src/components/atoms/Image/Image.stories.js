// components/atoms/Image/Image.stories.js
import Image from './Image.vue'

export default {
  title: 'Atoms/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for accessibility',
    },
    width: {
      control: 'text',
      description: 'Image width (number in px or string like "100%")',
    },
    height: {
      control: 'text',
      description: 'Image height (number in px or string like "100%")',
    },
    rounded: {
      control: 'boolean',
      description: 'Make image circular',
    },
    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
      description: 'How the image should be resized',
    },
    loading: {
      control: 'select',
      options: ['lazy', 'eager'],
      description: 'Loading strategy',
    },
  },
}

// ===== BASIC VARIANTS =====

export const Default = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    alt: 'Profile picture',
    width: 200,
    height: 200,
  },
}

export const Rounded = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    alt: 'Profile picture',
    width: 200,
    height: 200,
    rounded: true,
  },
}

export const Responsive = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop',
    alt: 'Landscape',
    width: '100%',
    height: 'auto',
  },
}

// ===== OBJECT FIT VARIANTS =====

export const ObjectFitCover = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop',
    alt: 'Cover example',
    width: 300,
    height: 200,
    objectFit: 'cover',
  },
}

export const ObjectFitContain = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop',
    alt: 'Contain example',
    width: 300,
    height: 200,
    objectFit: 'contain',
  },
}

export const ObjectFitFill = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop',
    alt: 'Fill example',
    width: 300,
    height: 200,
    objectFit: 'fill',
  },
}

export const ObjectFitNone = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop',
    alt: 'None example',
    width: 300,
    height: 200,
    objectFit: 'none',
  },
}

export const ObjectFitScaleDown = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop',
    alt: 'Scale down example',
    width: 300,
    height: 200,
    objectFit: 'scale-down',
  },
}

// ===== ALL OBJECT FIT COMPARISON =====

export const AllObjectFit = {
  render: () => ({
    components: { Image },
    template: `
      <div class="space-y-6">
        <div>
          <p class="text-body-3-semibold mb-3">Cover (Default - fills container)</p>
          <div class="border rounded-lg overflow-hidden" style="width: 300px; height: 200px;">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop"
              alt="Cover"
              width="100%"
              height="100%"
              object-fit="cover"
            />
          </div>
        </div>

        <div>
          <p class="text-body-3-semibold mb-3">Contain (fits within container)</p>
          <div class="border rounded-lg bg-background-neutral" style="width: 300px; height: 200px;">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop"
              alt="Contain"
              width="100%"
              height="100%"
              object-fit="contain"
            />
          </div>
        </div>

        <div>
          <p class="text-body-3-semibold mb-3">Fill (stretches to fill)</p>
          <div class="border rounded-lg overflow-hidden" style="width: 300px; height: 200px;">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop"
              alt="Fill"
              width="100%"
              height="100%"
              object-fit="fill"
            />
          </div>
        </div>
      </div>
    `,
  }),
}

// ===== SIZE VARIANTS =====

export const SmallAvatar = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    alt: 'Small avatar',
    width: 32,
    height: 32,
    rounded: true,
  },
}

export const MediumAvatar = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    alt: 'Medium avatar',
    width: 48,
    height: 48,
    rounded: true,
  },
}

export const LargeAvatar = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    alt: 'Large avatar',
    width: 80,
    height: 80,
    rounded: true,
  },
}

export const ExtraLargeAvatar = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    alt: 'Extra large avatar',
    width: 120,
    height: 120,
    rounded: true,
  },
}

// ===== ALL AVATAR SIZES =====

export const AllAvatarSizes = {
  render: () => ({
    components: { Image },
    template: `
      <div class="flex items-end gap-6">
        <div class="text-center">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
            alt="Avatar"
            :width="32"
            :height="32"
            rounded
          />
          <p class="text-body-3 mt-2">32px</p>
        </div>

        <div class="text-center">
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
            alt="Avatar"
            :width="48"
            :height="48"
            rounded
          />
          <p class="text-body-3 mt-2">48px</p>
        </div>

        <div class="text-center">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
            alt="Avatar"
            :width="64"
            :height="64"
            rounded
          />
          <p class="text-body-3 mt-2">64px</p>
        </div>

        <div class="text-center">
          <Image
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
            alt="Avatar"
            :width="80"
            :height="80"
            rounded
          />
          <p class="text-body-3 mt-2">80px</p>
        </div>

        <div class="text-center">
          <Image
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
            alt="Avatar"
            :width="120"
            :height="120"
            rounded
          />
          <p class="text-body-3 mt-2">120px</p>
        </div>
      </div>
    `,
  }),
}

// ===== REAL-WORLD USE CASES =====

export const ProfileCard = {
  render: () => ({
    components: { Image },
    template: `
      <div class="card max-w-sm">
        <div class="flex items-center gap-4">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
            alt="Dave"
            :width="64"
            :height="64"
            rounded
          />
          <div>
            <p class="text-body-1-semibold">Dave</p>
            <p class="text-body-3 text-content-secondary">david.vrhovac@hotmail.com</p>
          </div>
        </div>
      </div>
    `,
  }),
}

export const StatusScreenIllustration = {
  render: () => ({
    components: { Image },
    template: `
      <div class="min-h-[500px] bg-sentiment-positive flex items-center justify-center">
        <div class="text-center space-y-6">
          <div class="flex justify-center">
            <div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                alt="Success"
                :width="80"
                :height="80"
                rounded
              />
            </div>
          </div>
          <div class="text-white">
            <h4 class="text-heading-4 mb-2">Willkommen, David!</h4>
            <p class="text-body-2">Dein Konto wurde erfolgreich erstellt.</p>
          </div>
        </div>
      </div>
    `,
  }),
}

export const EmailVerificationScreen = {
  render: () => ({
    components: { Image },
    template: `
      <div class="min-h-[500px] flex items-center justify-center p-4">
        <div class="w-full max-w-form text-center space-y-6">
          <div class="flex justify-center">
            <div class="w-20 h-20 rounded-full bg-background-neutral flex items-center justify-center overflow-hidden">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
                alt="Email"
                :width="48"
                :height="48"
              />
            </div>
          </div>
          <div>
            <h4 class="text-heading-4 mb-2">Überprüfe deine E-Mails</h4>
            <p class="text-body-2 text-content-secondary">
              Wir haben einen Bestätigungslink gesendet.
            </p>
          </div>
        </div>
      </div>
    `,
  }),
}

export const UserList = {
  render: () => ({
    components: { Image },
    template: `
      <div class="card max-w-md space-y-3">
        <div class="flex items-center gap-3 p-3 hover:bg-background-neutral rounded-lg cursor-pointer">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
            alt="User 1"
            :width="40"
            :height="40"
            rounded
          />
          <div class="flex-1">
            <p class="text-body-2-semibold">Max Mustermann</p>
            <p class="text-body-3 text-content-secondary">Online</p>
          </div>
        </div>

        <div class="flex items-center gap-3 p-3 hover:bg-background-neutral rounded-lg cursor-pointer">
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
            alt="User 2"
            :width="40"
            :height="40"
            rounded
          />
          <div class="flex-1">
            <p class="text-body-2-semibold">Anna Schmidt</p>
            <p class="text-body-3 text-content-secondary">Offline</p>
          </div>
        </div>

        <div class="flex items-center gap-3 p-3 hover:bg-background-neutral rounded-lg cursor-pointer">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
            alt="User 3"
            :width="40"
            :height="40"
            rounded
          />
          <div class="flex-1">
            <p class="text-body-2-semibold">Tom Weber</p>
            <p class="text-body-3 text-content-secondary">Online</p>
          </div>
        </div>
      </div>
    `,
  }),
}

// ===== INTERACTIVE PLAYGROUND =====

export const Playground = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    alt: 'Playground image',
    width: 200,
    height: 200,
    rounded: false,
    objectFit: 'cover',
    loading: 'lazy',
  },
}
