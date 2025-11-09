<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // Label text
  label: {
    type: String,
    default: '',
  },
  // Allow multiple files
  multiple: {
    type: Boolean,
    default: false,
  },
  // Accepted file types (e.g., '.pdf,.jpg,.png' or 'image/*')
  accept: {
    type: String,
    default: '',
  },
  // Max file size in MB
  maxSize: {
    type: Number,
    default: 5,
  },
  // Description for default state
  description: {
    type: String,
    default: '',
  },
  // Title for default state
  title: {
    type: String,
    default: 'Upload file',
  },
  // Disabled state
  disabled: {
    type: Boolean,
    default: false,
  },
  // Model value (array of file objects)
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue', 'upload', 'remove'])

const fileInputRef = ref(null)
const files = ref([...props.modelValue])

// File object structure:
// {
//   id: string,
//   name: string,
//   size: number,
//   state: 'loading' | 'uploaded' | 'failed',
//   error: string | null,
//   file: File
// }

const labelClasses = computed(() => {
  const base = ['block', 'text-sm', 'font-medium', 'mb-2']
  if (props.disabled) {
    base.push('text-content-tertiary')
  } else {
    base.push('text-content-primary')
  }
  return base
})

const defaultDescription = computed(() => {
  if (props.description) return props.description
  const fileTypes = props.accept ? props.accept.replace(/\./g, '').toUpperCase() : 'Any file'
  return `${fileTypes} less than ${props.maxSize}MB`
})

const hasFiles = computed(() => files.value.length > 0)

const triggerFileInput = () => {
  if (!props.disabled) {
    fileInputRef.value?.click()
  }
}

const handleFileChange = (event) => {
  const selectedFiles = Array.from(event.target.files || [])

  selectedFiles.forEach((file) => {
    const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const fileSizeMB = file.size / (1024 * 1024)

    // Check file size
    if (fileSizeMB > props.maxSize) {
      files.value.push({
        id: fileId,
        name: file.name,
        size: file.size,
        state: 'failed',
        error: `File must be less than ${props.maxSize}MB`,
        file,
      })
    } else {
      // Start upload (loading state)
      files.value.push({
        id: fileId,
        name: file.name,
        size: file.size,
        state: 'loading',
        error: null,
        file,
      })

      // Simulate upload (you'd replace this with real upload logic)
      simulateUpload(fileId)
    }

    if (!props.multiple) {
      // For single file, replace existing file
      files.value = [files.value[files.value.length - 1]]
    }
  })

  emit('update:modelValue', files.value)
  emit('upload', files.value)

  // Reset input
  event.target.value = ''
}

const simulateUpload = (fileId) => {
  // Simulate upload delay
  setTimeout(() => {
    const fileIndex = files.value.findIndex((f) => f.id === fileId)
    if (fileIndex !== -1) {
      files.value[fileIndex].state = 'uploaded'
      emit('update:modelValue', files.value)
    }
  }, 2000)
}

const removeFile = (fileId) => {
  // In production, show confirmation modal
  if (confirm('Are you sure you want to remove this file?')) {
    const fileIndex = files.value.findIndex((f) => f.id === fileId)
    if (fileIndex !== -1) {
      const removedFile = files.value[fileIndex]
      files.value.splice(fileIndex, 1)
      emit('update:modelValue', files.value)
      emit('remove', removedFile)
    }
  }
}

const truncateFileName = (name) => {
  if (name.length <= 40) return name

  // Truncate in the middle, keep extension
  const parts = name.split('.')
  const ext = parts.length > 1 ? `.${parts.pop()}` : ''
  const baseName = parts.join('.')

  if (baseName.length <= 30) return name

  const start = baseName.slice(0, 20)
  const end = baseName.slice(-10)
  return `${start}...${end}${ext}`
}

const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
</script>

<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" :class="labelClasses">
      {{ label }}
    </label>

    <!-- Hidden file input -->
    <input
      ref="fileInputRef"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      class="hidden"
      @change="handleFileChange"
    />

    <!-- Uploaded Files List -->
    <div v-if="hasFiles" class="space-y-3 mb-3">
      <div
        v-for="fileItem in files"
        :key="fileItem.id"
        class="relative flex items-center gap-4 p-4 bg-white border rounded-lg transition-all duration-200"
        :class="[
          fileItem.state === 'failed' ? 'border-red-500' : 'border-gray-300',
          fileItem.state === 'uploaded' ? 'cursor-pointer hover:border-[#25ccbf]' : '',
        ]"
        @click="fileItem.state === 'uploaded' ? null : null"
      >
        <!-- Icon -->
        <div class="shrink-0">
          <!-- Loading Icon -->
          <svg
            v-if="fileItem.state === 'loading'"
            class="w-6 h-6 text-content-accent animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>

          <!-- Success Icon -->
          <svg
            v-else-if="fileItem.state === 'uploaded'"
            class="w-6 h-6 text-content-positive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>

          <!-- Error Icon -->
          <svg
            v-else-if="fileItem.state === 'failed'"
            class="w-6 h-6 text-content-negative"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <!-- File name -->
          <p class="text-sm font-medium text-content-primary truncate">
            {{ truncateFileName(fileItem.name) }}
          </p>

          <!-- Description based on state -->
          <p
            class="text-xs mt-1"
            :class="
              fileItem.state === 'failed' ? 'text-content-negative' : 'text-content-secondary'
            "
          >
            <span v-if="fileItem.state === 'loading'">Uploading...</span>
            <span v-else-if="fileItem.state === 'uploaded'">
              Uploaded • {{ formatFileSize(fileItem.size) }}
            </span>
            <span v-else-if="fileItem.state === 'failed'">
              {{ fileItem.error }}
            </span>
          </p>
        </div>

        <!-- Delete button (only for uploaded/failed) -->
        <button
          v-if="fileItem.state === 'uploaded' || fileItem.state === 'failed'"
          type="button"
          class="shrink-0 p-2 text-content-secondary hover:text-content-negative transition-colors"
          @click.stop="removeFile(fileItem.id)"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Default Upload Button (always visible for multiple, or visible when no file for single) -->
    <button
      v-if="multiple || !hasFiles"
      type="button"
      class="w-full flex items-center gap-4 p-4 bg-white border border-gray-300 rounded-lg transition-all duration-200 hover:border-[#25ccbf] disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="disabled"
      @click="triggerFileInput"
    >
      <!-- Upload Icon -->
      <div class="shrink-0">
        <svg
          class="w-6 h-6 text-content-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      </div>

      <!-- Content -->
      <div class="flex-1 text-left">
        <p class="text-sm font-medium text-content-primary underline">
          {{ multiple ? 'Upload files' : title }}
        </p>
        <p class="text-xs text-content-secondary mt-1">
          {{ defaultDescription }}
        </p>
      </div>
    </button>
  </div>
</template>
