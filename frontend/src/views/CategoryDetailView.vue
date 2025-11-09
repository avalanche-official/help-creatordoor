<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { categoriesService } from '../services/categories'
import { helpArticlesService } from '../services/helpArticles'
import Text from '@/components/atoms/Text/Text.vue'
import CopyBlock from '@/components/molecules/CopyBlock/CopyBlock.vue'
import Accordion from '@/components/molecules/Accordion/Accordion.vue'
import Button from '@/components/atoms/Button/Button.vue'

const route = useRoute()
const router = useRouter()
const category = ref(null)
const subcategories = ref([])
const articles = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const slug = route.params.categorySlug
    
    console.log('🎯 Category slug from URL:', slug)
    
    const [categoryRes, articlesRes] = await Promise.all([
      categoriesService.getBySlug(slug),
      helpArticlesService.getAll()
    ])
    
    category.value = categoryRes.data
    
    if (!category.value) {
      console.error('Category not found')
      return
    }
    
    // Filter articles for this category
    articles.value = articlesRes.data.filter(article => 
      article.attributes.category?.documentId === category.value.documentId
    )
    
    // Get unique subcategories from articles
    const uniqueSubcategories = new Map()
    articles.value.forEach(article => {
      const subcat = article.attributes.subcategory
      if (subcat && subcat.documentId) {
        uniqueSubcategories.set(subcat.documentId, subcat)
      }
    })
    subcategories.value = Array.from(uniqueSubcategories.values())
    
    console.log('Category:', category.value)
    console.log('Subcategories:', subcategories.value)
    console.log('Articles:', articles.value)
  } catch (error) {
    console.error('Error loading category:', error)
  } finally {
    loading.value = false
  }
})

const goToArticle = (article) => {
  const articleSlug = article.attributes.slug || article.id
  const categorySlug = category.value.attributes.slug || category.value.id
  
  router.push(`/${categorySlug}/${articleSlug}`)
}

const getArticlesForSubcategory = (subcategoryId) => {
  return articles.value.filter(article => 
    article.attributes.subcategory?.documentId === subcategoryId
  )
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-4  sm:py-12">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>

    <div v-else-if="category">
      <!-- Breadcrumb - Same style as ArticleView -->
      <nav class="mb-12">
        <ol class="flex items-center space-x-2 text-sm">
          <li>
            <Button variant="link" fontSize="body-default-bold text-secondary-purple" @click="router.push('/')">
              Home
            </Button>
          </li>
          <li>
            <Text variant="body-default" color="content-secondary">/</Text>
          </li>
          <li>
            <Text variant="body-default-bold" color="content-primary">
              {{ category.attributes.name }}
            </Text>
          </li>
        </ol>
      </nav>

      <!-- Category Header - Using CopyBlock -->
      <div class="mb-8 sm:mb-12">
        <CopyBlock
          :title="category.attributes.name"
          :description="category.attributes.description"
          title-variant="title-section"
          description-variant="body-large"
          align="center"
          spacing="1"
        />
      </div>

      <!-- Subcategories with Accordions -->
      <div v-if="subcategories.length > 0" class="space-y-0">
        <Accordion
          v-for="subcategory in subcategories"
          :key="subcategory.documentId"
          :title="subcategory.name"
          :show-border="false"
        >
          <!-- Articles as Button Links -->
          <div class="space-y-2 pb-4">
            <Button
              v-for="article in getArticlesForSubcategory(subcategory.documentId)"
              :key="article.id"
              variant="link"
              fontSize="body-default"
              class="w-full justify-start text-left text-secondary-purple"
              @click="goToArticle(article)"
            >
              {{ article.attributes.title }}
            </Button>
          </div>
        </Accordion>
      </div>

      <!-- No Subcategories - Show Articles Directly -->
      <div v-else-if="articles.length > 0" class="space-y-2">
        <Text variant="title-subsection" class="mb-4">All articles</Text>
        <Button
          v-for="article in articles"
          :key="article.id"
          variant="link"
          fontSize="body-default"
          class="w-full justify-start text-left text-secondary-purple"
          @click="goToArticle(article)"
        >
          {{ article.attributes.title }}
        </Button>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <Text variant="body-large" color="content-secondary">
          No articles in this category yet.
        </Text>
      </div>
    </div>
  </div>
</template>