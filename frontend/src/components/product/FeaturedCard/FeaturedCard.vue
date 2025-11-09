<script setup>
import { AkChevronRightSmall } from '@kalimahapps/vue-icons'
import CopyBlock from '@/components/molecules/CopyBlock/CopyBlock.vue'
import Button from '@/components/atoms/Button/Button.vue' // Adjust path as needed

defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  titleVariant: {
    type: String,
    default: 'title-subsection',
  },
  description: {
    type: String,
    required: true,
  },
  descriptionVariant: {
    type: String,
    default: 'body',
  },
  link: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <a
    :href="link"
    class="border border-stone-200 rounded-xl block hover:bg-background-accent transition-colors"
  >
    <img :src="image" :alt="title" class="w-full h-64 object-cover rounded-xl" />
    <div class="px-4 py-4">
      <CopyBlock
        spacing="1"
        :title="title"
        title-variant="display-small"
        :description="description"
        description-variant="body-default-large"
        class="text-start pb-4"
      />
      <Button variant="link" font-size="link-large">
        Mehr erfahren
        <template #icon>
          <AkChevronRightSmall class="w-4 h-4" />
        </template>
      </Button>
    </div>
  </a>
</template>
