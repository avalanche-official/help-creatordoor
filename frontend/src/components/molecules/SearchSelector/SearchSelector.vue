<script setup>
import { ref, computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import Dropdown from '@/components/molecules/Dropdown/Dropdown.vue'
import BottomSheet from '@/components/organisms/BottomSheet/BottomSheet.vue'
import InputField from '@/components/molecules/InputField/InputField.vue'
import Select from '@/components/atoms/Select/Select.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'
import Text from '@/components/atoms/Text/Text.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  articles: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Nach Artikel suchen...',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'select'])

const isMobile = useMediaQuery('(max-width: 768px)')
const isSheetOpen = ref(false)
const searchQuery = ref('')

// Transform articles to options format
const articleOptions = computed(() => {
  return props.articles.map(article => ({
    value: article.id,
    label: article.attributes.title,
    description: article.attributes.excerpt,
  }))
})

const filteredArticles = computed(() => {
  if (!searchQuery.value) return props.articles

  const query = searchQuery.value.toLowerCase()
  return props.articles.filter(article => 
    article.attributes.title.toLowerCase().includes(query) ||
    article.attributes.excerpt?.toLowerCase().includes(query)
  )
})

const handleSelect = (article) => {
  emit('select', article)
  isSheetOpen.value = false
  searchQuery.value = ''
}

const openSheet = () => {
  if (!props.disabled) {
    isSheetOpen.value = true
  }
}

const handleClearSearch = () => {
  searchQuery.value = ''
}
</script>

<template>
  <div class="w-full">
    <!-- Desktop: Dropdown style -->
    <div v-if="!isMobile" class="relative">
      <InputField 
        v-model="searchQuery" 
        :placeholder="placeholder"
        prefix-icon="search"
                size="medium"
      rounded="rounded-full"
        
      />

      <!-- Search Results Dropdown -->
      <div 
        v-if="searchQuery && filteredArticles.length > 0" 
        class="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-stone-100 max-h-96 overflow-y-auto z-50"
      >
        <button
          v-for="article in filteredArticles"
          :key="article.id"
          type="button"
          class="w-full p-4 hover:bg-neutral-50 cursor-pointer border-b last:border-b-0 transition-colors text-left"
          @click="handleSelect(article)"
        >
          <Text variant="body-default" color="content-primary" class="font-semibold">
            {{ article.attributes.title }}
          </Text>
          <Text v-if="article.attributes.excerpt" variant="body-default" color="content-secondary" class="mt-1">
            {{ article.attributes.excerpt }}
          </Text>
        </button>
      </div>

      <!-- No Results -->
      <div 
        v-if="searchQuery && filteredArticles.length === 0" 
        class="absolute top-full left-0 right-0 mt-2 p-4 bg-white border border-stone-100 rounded-xl text-center shadow shadow-lg"
      >
        <Text variant="body-default" color="content-secondary">
          Keine Artikel gefunden für "{{ searchQuery }}"
        </Text>
      </div>
    </div>

    <!-- Mobile: Bottom Sheet -->
    <div v-else>
      <InputField 
        :model-value="searchQuery"
        :placeholder="placeholder"
        prefix-icon="search"
        size="medium"
      rounded="rounded-full"
        readonly
        @click="openSheet"
      />

      <BottomSheet v-model:is-open="isSheetOpen" title="Artikel suchen">
        <!-- Search Input -->
        <template #search>
          <div class="relative">
            <InputField 
              v-model="searchQuery" 
              placeholder="Tippe um zu suchen..." 
              prefix-icon="search"
                      size="medium"
      rounded="rounded-full"
            />
            <button
              v-if="searchQuery"
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-black/10 rounded-sm p-1 transition-colors z-10"
              @click="handleClearSearch"
            >
              <Icon name="x" :size="16" color="var(--color-content-tertiary)" />
            </button>
          </div>
        </template>

        <!-- Article List -->
        <div class="space-y-1">
          <button
            v-for="article in filteredArticles"
            :key="article.id"
            type="button"
            class="w-full px-4 py-3 hover:bg-black/10 rounded-sm text-left transition-colors"
            @click="handleSelect(article)"
          >
            <Text variant="body-default" color="content-primary" class="font-semibold">
              {{ article.attributes.title }}
            </Text>
            <Text v-if="article.attributes.excerpt" variant="body-3" color="content-secondary" class="mt-1">
              {{ article.attributes.excerpt }}
            </Text>
          </button>

          <!-- No Results -->
          <div
            v-if="filteredArticles.length === 0"
            class="px-4 py-8 text-center"
          >
            <Text variant="body-default" color="content-tertiary">
              Keine Artikel gefunden
            </Text>
          </div>
        </div>
      </BottomSheet>
    </div>
  </div>
</template>