<!-- src/components/molecules/ListItem/ListItem.vue -->
<script setup>
import { useRouter } from 'vue-router'
import Icon from '@/components/atoms/Icon/Icon.vue'
import Avatar from '@/components/atoms/Avatar/Avatar.vue'
import Text from '@/components/atoms/Text/Text.vue'
import Button from '@/components/atoms/Button/Button.vue'
import RenderHTML from '@/components/atoms/RenderHTML/RenderHTML.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  descriptionIsHtml: {
    type: Boolean,
    default: false,
  },
  descriptionColor: {
    type: String,
    default: 'content-secondary',
  },
  icon: {
    type: String,
    default: '',
  },
  iconImage: {
    type: String,
    default: '',
  },
  iconSize: {
    type: Number,
    default: 24,
  },
  iconColor: {
    type: String,
    default: '#0e0e11',
  },
  iconBgColor: {
    type: String,
    default: 'bg-stone-200',
  },
  iconHoverEffect: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: '',
  },
  avatarSrc: {
    type: String,
    default: null,
  },
  showChevron: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  bgColor: {
    type: String,
    default: '',
  },
  hoverBgColor: {
    type: String,
    default: 'hover:bg-stone-100',
  },
  to: {
    type: [String, Object],
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
  external: {
    type: Boolean,
    default: false,
  },
  amount: {
    type: String,
    default: '',
  },
  amountColor: {
    type: String,
    default: 'content-primary',
  },
  actionButton: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['click', 'action-click'])
const router = useRouter()

const handleClick = () => {
  if (props.disabled) return
  emit('click')

  if (props.to) {
    router.push(props.to)
  } else if (props.href) {
    if (props.external) {
      window.open(props.href, '_blank')
    } else {
      window.location.href = props.href
    }
  }
}

const handleActionButtonClick = (event) => {
  event.stopPropagation()
  if (props.actionButton?.onClick) {
    props.actionButton.onClick()
  }
  emit('action-click', props.actionButton)
}
</script>

<template>
  <button
    type="button"
    :class="[
      'w-full p-3 rounded-lg transition-all cursor-pointer',
      bgColor || '',
      !bgColor && hoverBgColor,
      iconHoverEffect && 'group',
      disabled && 'opacity-50 cursor-not-allowed',
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <!-- Desktop Layout: Horizontal -->
    <div class="hidden sm:flex items-center gap-4">
      <!-- Left: Avatar OR Icon Image OR Icon -->
      <div v-if="avatar || avatarSrc || iconImage || icon || $slots.icon" class="flex-shrink-0">
        <Avatar v-if="avatar || avatarSrc" :initials="avatar" :src="avatarSrc" size="medium" />
        <!-- Icon Image (rounded) -->
        <div
          v-else-if="iconImage"
          class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-stone-200"
        >
          <img :src="iconImage" :alt="title" class="w-full h-full object-cover" />
        </div>
        <!-- Regular Icon -->
        <div
          v-else
          :class="[
            'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
            iconBgColor,
            iconHoverEffect && 'group-hover:bg-stone-200',
          ]"
        >
          <slot v-if="$slots.icon" name="icon" />
          <Icon v-else :name="icon" :size="iconSize" :color="iconColor" />
        </div>
      </div>

      <!-- Middle: Text -->
      <div class="flex-1 text-left min-w-0">
        <Text variant="body-large-bold" color="content-primary" class="block" :clamp="1">
          {{ title }}
        </Text>

        <!-- ✅ HTML Description -->
        <RenderHTML
          v-if="descriptionIsHtml && description"
          :html="description"
          variant="body-default"
          :color="descriptionColor"
          :max-lines="2"
          class="block"
        />

        <!-- ✅ Plain Text Description -->
        <Text
          v-else-if="description"
          variant="body-default"
          :color="descriptionColor"
          class="block"
          :clamp="1"
        >
          {{ description }}
        </Text>
      </div>

      <!-- Right: Button/Amount/Chevron -->
      <div v-if="actionButton || amount || showChevron || $slots.action" class="flex-shrink-0">
        <slot v-if="$slots.action" name="action" />
        <Button
          v-else-if="actionButton"
          :variant="actionButton.variant || 'primary'"
          :size="actionButton.size || 'small'"
          @click="handleActionButtonClick"
        >
          {{ actionButton.label }}
        </Button>
        <Text v-else-if="amount" variant="body-large-bold" :color="amountColor">
          {{ amount }}
        </Text>
        <Icon v-else name="chevron-right" :size="20" color="#7a7a85" />
      </div>
    </div>

    <!-- Mobile Layout: Icon + Text Vertical -->
    <div class="flex sm:hidden gap-4">
      <!-- Left: Icon -->
      <div v-if="avatar || avatarSrc || iconImage || icon || $slots.icon" class="flex-shrink-0">
        <Avatar v-if="avatar || avatarSrc" :initials="avatar" :src="avatarSrc" size="medium" />
        <!-- Icon Image (rounded) -->
        <div
          v-else-if="iconImage"
          class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-stone-200"
        >
          <img :src="iconImage" :alt="title" class="w-full h-full object-cover" />
        </div>
        <!-- Regular Icon -->
        <div
          v-else
          :class="[
            'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
            iconBgColor,
            iconHoverEffect && 'group-hover:bg-stone-200',
          ]"
        >
          <slot v-if="$slots.icon" name="icon" />
          <Icon v-else :name="icon" :size="iconSize" :color="iconColor" />
        </div>
      </div>

      <!-- Right: Text + Button Stacked -->
      <div class="flex-1 text-left min-w-0">
        <!-- Title -->
        <Text variant="body-large-bold" color="content-primary" class="block text-left" :clamp="1">
          {{ title }}
        </Text>

        <!-- ✅ HTML Description (Mobile) -->
        <RenderHTML
          v-if="descriptionIsHtml && description"
          :html="description"
          variant="body-default"
          :color="descriptionColor"
          :max-lines="2"
          class="block text-left"
        />

        <!-- ✅ Plain Text Description (Mobile) -->
        <Text
          v-else-if="description"
          variant="body-default"
          :color="descriptionColor"
          class="block text-left"
          :clamp="1"
        >
          {{ description }}
        </Text>

        <!-- Button (w-fit on mobile) -->
        <div v-if="actionButton" class="flex mt-2">
          <Button
            :variant="actionButton.variant || 'primary'"
            :size="actionButton.size || 'small'"
            class="w-fit"
            @click="handleActionButtonClick"
          >
            {{ actionButton.label }}
          </Button>
        </div>

        <!-- Amount (no button case) -->
        <Text
          v-else-if="amount"
          variant="body-large-bold"
          :color="amountColor"
          class="text-left"
          :clamp="1"
        >
          {{ amount }}
        </Text>
      </div>

      <!-- Chevron (only if no button and no amount) -->
      <div v-if="!actionButton && !amount && showChevron" class="flex-shrink-0 self-start">
        <Icon name="chevron-right" :size="20" color="#7a7a85" />
      </div>
    </div>
  </button>
</template>
