<!-- components/atoms/RenderHTML/RenderHTML.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  html: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'body-default',
    validator: (value) =>
      [
        'display-large',
        'display-medium',
        'display-small',
        'title-screen',
        'title-section',
        'title-subsection',
        'title-body',
        'title-group',
        'body-large',
        'body-large-bold',
        'body-default',
        'body-default-bold',
        'link-large',
        'link-default',
      ].includes(value),
  },
  color: {
    type: String,
    default: null,
  },
  maxLines: {
    type: Number,
    default: null, // null = no limit
  },
})

const classes = computed(() => {
  const classList = ['render-html', props.variant]

  // Add color class if provided
  if (props.color) {
    classList.push(`text-color-${props.color}`)
  }

  // Add line clamp if maxLines is set
  if (props.maxLines) {
    classList.push('line-clamp')
  }

  return classList.join(' ')
})

const styles = computed(() => {
  if (props.maxLines) {
    return {
      display: '-webkit-box',
      '-webkit-line-clamp': props.maxLines,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
    }
  }
  return {}
})

// Sanitize HTML to prevent XSS (basic sanitization)
const sanitizedHtml = computed(() => {
  // Remove script tags and dangerous attributes
  let clean = props.html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')

  return clean
})
</script>

<template>
  <div :class="classes" :style="styles" v-html="sanitizedHtml"></div>
</template>

<style scoped>
/* Base styling for HTML content */
.render-html {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Ensure HTML content inherits text styles from parent */
.render-html :deep(p) {
  margin: 0;
  padding: 0;
  line-height: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  color: inherit;
}

.render-html :deep(p:not(:last-child)) {
  margin-bottom: 0.75em;
}

.render-html :deep(strong) {
  font-weight: 600;
  color: inherit;
}

.render-html :deep(em) {
  font-style: italic;
}

.render-html :deep(br) {
  display: block;
  content: '';
  margin: 0.25em 0;
}

/* Remove Quill editor artifacts */
.render-html :deep(.ql-cursor) {
  display: none;
}

/* Handle empty paragraphs */
.render-html :deep(p:empty) {
  display: none;
}

/* Line clamp utility */
.line-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
