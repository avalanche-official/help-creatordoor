<!-- components/molecules/StepProgress/StepProgress.vue -->
<script setup>
import ProgressBar from '@/components/atoms/ProgressBar/ProgressBar.vue'
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  totalSteps: {
    type: Number,
    required: true,
  },
  stepNames: {
    type: Array,
    default: () => [],
  },
  compact: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="w-full">
    <!-- Segmented Progress Bar -->
    <ProgressBar :current-step="currentStep" :total-steps="totalSteps" />

    <!-- Step Labels Below (Desktop only) -->
    <div v-if="stepNames.length > 0 && !compact" class="flex gap-2 mt-1">
      <div v-for="(name, index) in stepNames" :key="index" class="flex-1">
        <Text
          :variant="index + 1 === currentStep ? 'body-default-bold' : 'body-default'"
          :color="
            index + 1 === currentStep
              ? 'content-primary'
              : index + 1 < currentStep
                ? 'content-tertiary'
                : 'content-tertiary'
          "
        >
          {{ name }}
        </Text>
      </div>
    </div>
  </div>
</template>
