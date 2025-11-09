<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // Title text (name of file to upload)
  title: {
    type: String,
    default: 'Front of your ID document',
  },
  // Description text (optional - file requirements)
  description: {
    type: String,
    default: 'Drag and drop a file less than 5MB',
  },
  // Button text
  buttonText: {
    type: String,
    default: 'Or select file',
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
  // Model value (file object or null)
  modelValue: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'upload', 'error'])

const fileInputRef = ref(null)
const isDragging = ref(false)
const uploadedFile = ref(props.modelValue)
const uploadState = ref('idle') // idle, uploading, uploaded, error
const errorMessage = ref('')

const containerClasses = computed(() => {
  const base = [
    'relative',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'w-full',
    'min-h-[400px]',
    'p-8',
    'bg-background-elevated',
    'border-2',
    'border-dashed',
    'rounded-2xl',
    'transition-all',
    'duration-200',
  ]

  if (uploadState.value === 'error') {
    base.push('border-content-negative', 'bg-red-50')
  } else if (isDragging.value) {
    base.push('border-content-accent', 'bg-[#25ccbf]/5', 'scale-[1.02]')
  } else {
    base.push('border-gray-300', 'hover:border-content-accent')
  }

  return base
})

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const validateFile = (file) => {
  const fileSizeMB = file.size / (1024 * 1024)

  if (fileSizeMB > props.maxSize) {
    errorMessage.value = `File must be less than ${props.maxSize}MB`
    uploadState.value = 'error'
    emit('error', errorMessage.value)
    return false
  }

  return true
}

const handleFile = (file) => {
  if (!file) return

  if (!validateFile(file)) return

  // Start upload
  uploadState.value = 'uploading'
  errorMessage.value = ''

  uploadedFile.value = {
    name: file.name,
    size: file.size,
    type: file.type,
    file: file,
  }

  // Simulate upload (replace with real upload logic)
  setTimeout(() => {
    uploadState.value = 'uploaded'
    emit('update:modelValue', uploadedFile.value)
    emit('upload', uploadedFile.value)
  }, 2000)
}

const handleFileChange = (event) => {
  const file = event.target.files?.[0]
  if (file) {
    handleFile(file)
  }
  // Reset input
  event.target.value = ''
}

const handleDragEnter = (e) => {
  e.preventDefault()
  isDragging.value = true
}

const handleDragLeave = (e) => {
  e.preventDefault()
  isDragging.value = false
}

const handleDragOver = (e) => {
  e.preventDefault()
}

const handleDrop = (e) => {
  e.preventDefault()
  isDragging.value = false

  const file = e.dataTransfer.files?.[0]
  if (file) {
    handleFile(file)
  }
}

const handleReset = () => {
  uploadedFile.value = null
  uploadState.value = 'idle'
  errorMessage.value = ''
  emit('update:modelValue', null)
}

const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
</script>

<template>
  <div
    :class="containerClasses"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <!-- Hidden file input -->
    <input
      ref="fileInputRef"
      type="file"
      :accept="accept"
      class="hidden"
      @change="handleFileChange"
    />

    <!-- Idle/Error State -->
    <div v-if="uploadState === 'idle' || uploadState === 'error'" class="text-center space-y-6">
      <!-- Icon -->
      <div class="flex justify-center">
        <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
          <svg
            v-if="uploadState === 'error'"
            class="w-10 h-10 text-content-negative"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-else
            class="w-10 h-10 text-content-primary"
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
      </div>

      <!-- Title -->
      <div>
        <h2 class="text-2xl font-bold text-content-primary mb-2">
          {{ title }}
        </h2>
        <p v-if="description" class="text-base text-content-secondary">
          {{ description }}
        </p>
      </div>

      <!-- Error Message -->
      <div v-if="uploadState === 'error'" class="text-content-negative text-sm font-medium">
        {{ errorMessage }}
      </div>

      <!-- Button -->
      <button
        type="button"
        class="px-8 py-4 bg-content-accent text-white rounded-full text-base font-semibold hover:bg-accent-hover transition-all shadow-sm"
        @click="triggerFileInput"
      >
        {{ buttonText }}
      </button>
    </div>

    <!-- Uploading State -->
    <div v-if="uploadState === 'uploading'" class="text-center space-y-6">
      <!-- Spinner -->
      <div class="flex justify-center">
        <svg class="w-16 h-16 text-content-accent animate-spin" fill="none" viewBox="0 0 24 24">
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
      </div>

      <div>
        <h2 class="text-2xl font-bold text-content-primary mb-2">Uploading...</h2>
        <p class="text-base text-content-secondary">
          {{ uploadedFile?.name }}
        </p>
      </div>
    </div>

    <!-- Uploaded State -->
    <div v-if="uploadState === 'uploaded'" class="text-center space-y-6">
      <!-- Success Icon -->
      <div class="flex justify-center">
        <div class="w-20 h-20 bg-content-positive rounded-full flex items-center justify-center">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-bold text-content-primary mb-2">File uploaded</h2>
        <p class="text-base text-content-secondary mb-1">
          {{ uploadedFile?.name }}
        </p>
        <p class="text-sm text-content-tertiary">
          {{ formatFileSize(uploadedFile?.size) }}
        </p>
      </div>

      <!-- Upload Another Button -->
      <button
        type="button"
        class="px-8 py-3 border-2 border-content-accent text-content-accent rounded-full text-base font-semibold hover:bg-content-accent hover:text-white transition-all"
        @click="handleReset"
      >
        Upload another file
      </button>
    </div>

    <!-- Drag Overlay -->
    <div
      v-if="isDragging"
      class="absolute inset-0 flex items-center justify-center bg-content-accent/5 rounded-2xl pointer-events-none"
    >
      <div class="text-2xl font-bold text-content-accent">Drop file here</div>
    </div>
  </div>
</template>
