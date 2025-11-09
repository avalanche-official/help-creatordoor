<!-- components/organisms/RichTextEditor/RichTextEditor.vue -->
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Schreibe hier...',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  helpText: {
    type: String,
    default: '',
  },
  minHeight: {
    type: String,
    default: '200px',
  },
  toolbar: {
    type: Array,
    default: () => [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, false] }],
      ['link'],
      ['clean'],
    ],
  },
  // ✅ Character limit
  maxLength: {
    type: Number,
    default: null,
  },
  // ✅ Show character counter
  showCharCount: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const quillEditor = ref(null)

const quillOptions = {
  theme: 'snow',
  placeholder: props.placeholder,
  modules: {
    toolbar: props.toolbar,
  },
}

// ✅ Strip HTML tags to count actual text characters
const getTextLength = (html) => {
  if (!html) return 0
  const temp = document.createElement('div')
  temp.innerHTML = html
  return temp.textContent?.length || 0
}

// ✅ Calculate character count (plain text only, no HTML)
const charCount = computed(() => {
  return getTextLength(props.modelValue)
})

// ✅ Check if near limit (80% of max)
const isNearLimit = computed(() => {
  if (!props.maxLength) return false
  return charCount.value >= props.maxLength * 0.8
})

// ✅ Check if at limit
const isAtLimit = computed(() => {
  if (!props.maxLength) return false
  return charCount.value >= props.maxLength
})

// ✅ Character counter color
const counterColor = computed(() => {
  if (isAtLimit.value) return 'text-red-600'
  if (isNearLimit.value) return 'text-orange-600'
  return 'text-stone-500'
})

// ✅ Setup Quill character limit after mount
onMounted(() => {
  if (props.maxLength && quillEditor.value) {
    const quill = quillEditor.value.getQuill()

    // Intercept text changes BEFORE they're applied
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        const text = quill.getText()
        const length = text.trim().length

        // If over limit, undo the change
        if (length > props.maxLength) {
          quill.history.undo()
        }
      }
    })
  }
})

const handleUpdate = (content) => {
  // ✅ Double-check: Enforce max length if set
  if (props.maxLength) {
    const textLength = getTextLength(content)

    if (textLength > props.maxLength) {
      // Prevent update if over limit
      return
    }
  }

  emit('update:modelValue', content)
}
</script>

<template>
  <div class="space-y-2">
    <!-- Label with optional character counter -->
    <div v-if="label" class="flex items-center justify-between">
      <label class="block text-sm font-medium text-content-primary">
        {{ label }}
      </label>

      <!-- ✅ Character counter in label area -->
      <Text v-if="showCharCount && maxLength" variant="body-default" :class="counterColor">
        {{ charCount }}/{{ maxLength }}
      </Text>
    </div>

    <!-- Rich Text Editor -->
    <div
      :class="[
        'border rounded-2xl overflow-hidden transition-all',
        disabled ? 'opacity-50 cursor-not-allowed bg-stone-50' : '',
        error
          ? 'border-red-500 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500/20'
          : 'border-stone-200 focus:border-black focus-within:ring-2',
        isAtLimit ? 'border-red-500' : '',
      ]"
    >
      <QuillEditor
        ref="quillEditor"
        :content="modelValue"
        :options="quillOptions"
        :disabled="disabled"
        content-type="html"
        :style="{ minHeight: minHeight }"
        @update:content="handleUpdate"
      />
    </div>

    <!-- Help Text -->
    <Text v-if="helpText && !error" variant="body-default" color="content-tertiary">
      {{ helpText }}
    </Text>

    <!-- Error Message -->
    <Text v-if="error && helpText" variant="body-default" color="red">
      {{ helpText }}
    </Text>

    <!-- ✅ Character limit warning (when near/at limit) -->
    <Text v-if="maxLength && isNearLimit && !error" variant="body-default" :class="counterColor">
      {{ isAtLimit ? 'Maximale Zeichenanzahl erreicht' : 'Fast an der Grenze' }}
    </Text>
  </div>
</template>

<style scoped>
/* Custom Quill editor styling */
:deep(.ql-toolbar) {
  border: none !important;
  border-bottom: 1px solid #e7e5e4 !important;
  background: #fafaf9;
  border-radius: 1rem 1rem 0 0;
  padding: 0.75rem;
}

:deep(.ql-container) {
  border: none !important;
  font-family: inherit;
  font-size: 0.875rem;
}

:deep(.ql-editor) {
  padding: 1rem;
}

:deep(.ql-editor.ql-blank::before) {
  color: #a8a29e;
  font-style: normal;
}

:deep(.ql-editor:focus) {
  outline: none;
}

/* Disabled state */
:deep(.ql-toolbar.ql-disabled) {
  background: #f5f5f4;
}

:deep(.ql-editor.ql-disabled) {
  background: #fafaf9;
  cursor: not-allowed;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  :deep(.ql-toolbar) {
    padding: 0.5rem;
  }

  :deep(.ql-editor) {
    padding: 0.75rem;
    font-size: 0.875rem;
  }

  /* Make toolbar buttons slightly smaller on mobile */
  :deep(.ql-toolbar button) {
    width: 32px;
    height: 32px;
  }

  :deep(.ql-toolbar .ql-picker) {
    font-size: 0.875rem;
  }
}
</style>
