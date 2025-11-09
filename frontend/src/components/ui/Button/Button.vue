<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) =>
      [
        'primary',
        'secondary',
        'secondary-neutral',
        'tertiary',
        'outline',
        'link',
        'link-white',
      ].includes(v),
  },
  type: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'negative', 'reversed'].includes(v),
  },
  size: {
    type: String,
    default: 'large',
    validator: (v) => ['small', 'medium', 'large'].includes(v),
  },
  href: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  iconPosition: {
    type: String,
    default: null,
    validator: (v) => !v || ['left', 'right'].includes(v),
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}

const getButtonClass = () => {
  const classes = []

  // Variant classes
  if (props.variant === 'primary') {
    if (props.type === 'negative') classes.push('btn-primary-negative')
    else if (props.type === 'reversed') classes.push('btn-primary-reversed')
    else classes.push('btn-primary')
  } else if (props.variant === 'secondary') {
    classes.push(props.type === 'negative' ? 'btn-secondary-negative' : 'btn-secondary')
  } else if (props.variant === 'secondary-neutral') {
    classes.push('btn-secondary-neutral')
  } else if (props.variant === 'tertiary') {
    classes.push(props.type === 'negative' ? 'btn-tertiary-negative' : 'btn-tertiary')
  } else if (props.variant === 'outline') {
    classes.push('btn-outline')
  } else if (props.variant === 'link') {
    classes.push('btn-link')
  } else if (props.variant === 'link-white') {
    classes.push('btn-link-white')
  }

  // Size classes
  if (props.size === 'small') classes.push('btn-small')
  else if (props.size === 'medium') classes.push('btn-medium')

  // Full width
  if (props.fullWidth) classes.push('w-full')

  return classes.join(' ')
}
</script>

<template>
  <!-- Link variant -->
  <a
    v-if="href"
    :href="disabled ? undefined : href"
    :class="getButtonClass()"
    :aria-disabled="disabled"
    :tabindex="disabled ? -1 : 0"
    @click="handleClick"
  >
    <slot name="icon-left" v-if="iconPosition === 'left'" />
    <slot />
    <slot name="icon-right" v-if="iconPosition === 'right'" />
  </a>

  <!-- Button variant -->
  <button v-else :class="getButtonClass()" :disabled="disabled" type="button" @click="handleClick">
    <slot name="icon-left" v-if="iconPosition === 'left'" />
    <slot />
    <slot name="icon-right" v-if="iconPosition === 'right'" />
  </button>
</template>
