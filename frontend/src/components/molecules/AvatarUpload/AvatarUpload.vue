<!-- components/molecules/AvatarUpload/AvatarUpload.vue -->
<!-- ✅ FIXED: Now opens file picker and emits the selected file -->
<script setup>
import { ref } from 'vue'
import Avatar from '@/components/atoms/Avatar/Avatar.vue'
import IconButton from '@/components/molecules/IconButton/IconButton.vue'
import Spinner from '@/components/atoms/Spinner/Spinner.vue'

const props = defineProps({
  initials: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: 'user',
  },
  iconSize: {
    type: Number,
    default: null,
  },
  src: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: 'large',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['upload'])

// ✅ Reference to hidden file input
const fileInput = ref(null)

// ✅ Trigger file input click
const handleUploadClick = () => {
  if (props.loading) return
  fileInput.value?.click()
}

// ✅ Handle file selection
const handleFileChange = (event) => {
  const file = event.target.files?.[0]
  if (file) {
    console.log('📸 File selected:', file.name)
    emit('upload', file)
  }
  // Reset input so same file can be selected again
  event.target.value = ''
}
</script>

<template>
  <div class="relative inline-block">
    <Avatar
      background-color="bg-stone-200"
      :initials="initials"
      :icon="icon"
      :icon-size="iconSize"
      :src="src"
      :size="size"
    />

    <!-- ✅ Hidden file input -->
    <input
      ref="fileInput"
      type="file"
      accept="image/jpeg,image/png,image/jpg,image/gif"
      class="hidden"
      @change="handleFileChange"
    />

    <!-- Upload button positioned at bottom right -->
    <div class="absolute bottom-0 right-0">
      <!-- ✅ Show spinner when loading -->
      <div
        v-if="loading"
        class="w-10 h-10 rounded-full bg-primary-purple flex items-center justify-center"
      >
        <Spinner size="small" class="text-white" />
      </div>

      <!-- ✅ Upload button -->
      <IconButton
        v-else
        border="white"
        icon="camera"
        variant="primary"
        size="mini"
        aria-label="Upload photo"
        @click="handleUploadClick"
      />
    </div>
  </div>
</template>
