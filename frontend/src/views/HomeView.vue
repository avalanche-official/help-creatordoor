<script setup>
import { ref, onMounted, computed } from 'vue'
import { categoriesService } from '@/services/categories'
import { helpArticlesService } from '@/services/helpArticles'
import { useRouter } from 'vue-router'
import SearchSelector from '../components/molecules/SearchSelector/SearchSelector.vue'
import Card from '../components/atoms/Card/Card.vue'
import Icon from '../components/atoms/Icon/Icon.vue'
import CopyBlock from '../components/molecules/CopyBlock/CopyBlock.vue'
import Text from '../components/atoms/Text/Text.vue'
import Button from '../components/atoms/Button/Button.vue'
import List from '../components/organisms/List/List.vue'


const router = useRouter()
const categories = ref([])
const allArticles = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const [categoriesRes, articlesRes] = await Promise.all([
      categoriesService.getAll(),
      helpArticlesService.getAll()
    ])
    categories.value = categoriesRes.data
    allArticles.value = articlesRes.data
    
    console.log('Categories loaded:', categories.value)
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
})

const handleArticleSelect = (article) => {
  const slug = article.attributes.slug || article.id
  router.push(`/article/${slug}`)
}

const goToCategory = (category) => {
  const slug = category.attributes.slug || category.id
  router.push(`/${slug}`)
}

// For List component (mobile)
const handleCategorySelect = (categoryId) => {
  const category = categories.value.find(c => c.id === categoryId)
  if (category) {
    goToCategory(category)
  }
}

const getIconName = (iconFromStrapi) => {
  if (!iconFromStrapi || iconFromStrapi.trim() === '') {
    return 'folder'
  }
  return iconFromStrapi.trim()
}

// Transform categories for List component
const categoriesForList = computed(() => {
  return categories.value.slice(0, 6).map(category => ({
    value: category.id,
    label: category.attributes.name,
    description: category.attributes.description,
    icon: getIconName(category.attributes.icon),
    iconBgColor: 'bg-stone-100', // You can customize this
    iconColor: 'text-stone-500',
  }))
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <Text variant="title-section" as="h1" class="mb-8">
        Wie können wir behilflich sein?
      </Text>
      
      <!-- Search Selector -->
      <div class="max-w-2xl mx-auto mt-8">
        <SearchSelector
          :articles="allArticles"
          @select="handleArticleSelect"
        />
      </div>

      <!-- Login Section -->
      <div class="mt-12 max-w-sm mx-auto">
        <Text variant="title-subsection" as="h2" class="mb-4 text-center">
          Log in für personalisiertem Support
        </Text>
        <div class="flex flex-col w-fill mx-auto gap-2">
          <Button variant="primary" fontSize="body-default-bold" href="https://www.creatordoor.com/login">Log in</Button>
          <Button variant="link" href="https://www.creatordoor.com/forgot-password" fontSize="body-default-bold">Probleme beim Einloggen?</Button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      <p class="text-neutral-600 mt-4">Hilfeartikel laden...</p>
    </div>

    <!-- Categories Section -->
    <div v-else class="max-w-6xl mx-auto">
      <Text variant="title-subsection" as="h2" class="mb-6 text-left">
        Themen entdecken
      </Text>
      
      <!-- Empty State -->
      <div v-if="categories.length === 0" class="text-center py-12 flex flex-col">
        <Icon name="folder-open" :size="64" color="text-neutral-300" class="mx-auto mb-4" />
        <Text variant="title-subsection" color="content-secondary" class="mb-2">
          Keine Kategorien gefunden
        </Text>

      </div>

      <!-- Categories Display -->
      <template v-else>
        <!-- Mobile: List View -->
        <div class="md:hidden">
          <List
            :items="categoriesForList"
            spacing="3"
            @select="handleCategorySelect"
          />
        </div>

        <!-- Desktop: Grid View -->
        <div class="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card
            v-for="category in categories.slice(0, 6)"
            :key="category.id"
            variant="card"
            clickable
            rounded="rounded-2xl"
            class="p-4 flex flex-col items-center text-center space-y-4 transition-shadow duration-300"
            @click="goToCategory(category)"
          >
            <!-- Icon at top -->
            <div class="w-14 h-14 rounded-full bg-white flex items-center justify-center">
              <Icon 
                :name="getIconName(category.attributes.icon)" 
                :size="24" 
                color="white"
              />
            </div>

            <!-- CopyBlock at bottom -->
            <CopyBlock
              :title="category.attributes.name"
              :description="category.attributes.description"
              title-variant="title-body"
              description-variant="body-default"
              align="center"
              spacing="2"
              description-clamp="2"
            />
          </Card>
        </div>
      </template>

      <!-- Still Need Help Section -->
      <div class="text-center mt-16 flex mx-auto items-center justify-center space-x-4">
        <div>
          <Text variant="title-subsection" as="h2">
            Noch mehr hilfe?
          </Text>
        </div>
        <div>
          <Button 
            variant="outline" 
            fontSize="body-default-bold"
            href="mailto:support@creatordoor.com"
          >
            Kontaktiere uns
          </Button>
        </div>
      </div>

      <!-- Show message if more than 6 categories -->
      <div v-if="categories.length > 6" class="text-center mt-8">
        <Text variant="body-small" color="content-secondary">
          Showing {{ Math.min(6, categories.length) }} of {{ categories.length }} categories
        </Text>
      </div>
    </div>
  </div>
</template>