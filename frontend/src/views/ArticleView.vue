<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { helpArticlesService } from '../services/helpArticles'
import Text from '@/components/atoms/Text/Text.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Card from '@/components/atoms/Card/Card.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

const route = useRoute()
const router = useRouter()
const article = ref(null)
const relatedArticles = ref([])
const loading = ref(true)
const feedbackGiven = ref(false)

onMounted(async () => {
  try {
    const articleSlug = route.params.articleSlug  // Changed
    
    const response = await helpArticlesService.getBySlug(articleSlug)
    article.value = response.data
    
    if (!article.value) {
      console.error('Article not found')
      return
    }
    
    // Fetch related articles
    if (article.value?.attributes?.category?.documentId) {
      const allArticles = await helpArticlesService.getAll()
      relatedArticles.value = allArticles.data
        .filter(a => 
          a.documentId !== article.value.documentId && 
          a.attributes.category?.documentId === article.value.attributes.category?.documentId
        )
        .slice(0, 3)
    }
  } catch (error) {
    console.error('Error loading article:', error)
  } finally {
    loading.value = false
  }
})

const handleFeedback = async (isHelpful) => {
  try {
    const field = isHelpful ? 'helpful_yes' : 'helpful_no'
    const currentCount = article.value.attributes[field] || 0
    
    await helpArticlesService.update(article.value.id, {
      [field]: currentCount + 1
    })
    
    feedbackGiven.value = true
  } catch (error) {
    console.error('Error submitting feedback:', error)
  }
}

const goToArticle = (relatedArticle) => {
  const articleSlug = relatedArticle.attributes.slug || relatedArticle.id
  const categorySlug = relatedArticle.attributes.category?.slug || article.value.attributes.category?.slug
  
  router.push(`/${categorySlug}/${articleSlug}`)
  window.scrollTo(0, 0)
}

const goToCategory = () => {
  if (article.value?.attributes?.category?.slug) {
    router.push(`/${article.value.attributes.category.slug}`)
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto py-4 px-4">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>

    <article v-else-if="article">
<!-- Breadcrumb -->
<nav class="mb-12">
  <ol class="flex items-center gap-2 text-sm overflow-hidden">
    <li class="flex-shrink-0">
      <Button variant="link" fontSize="body-default-bold text-secondary-purple" @click="router.push('/')">
        Home
      </Button>
    </li>
    <li class="flex-shrink-0">
      <Text variant="body-default" color="content-secondary">/</Text>
    </li>
    <li v-if="article.attributes.category" class="min-w-0 flex-shrink">
      <Button 
        variant="link" 
        fontSize="body-default-bold text-secondary-purple" 
        @click="goToCategory"
        class="truncate block w-full"
      >
        {{ article.attributes.category.name }}
      </Button>
    </li>
    <li class="flex-shrink-0">
      <Text variant="body-default-bold" color="content-secondary">/</Text>
    </li>
    <li class="min-w-0 flex-1">
      <Text 
        variant="body-default-bold" 
        color="content-primary"
        class="truncate block"
      >
        {{ article.attributes.title }}
      </Text>
    </li>
  </ol>
</nav>

      <div class="max-w-xl mx-auto">
        <!-- Article Header -->
        <div class="mb-8 text-center">
          <Text variant="title-screen" as="h1" class="mb-4">
            {{ article.attributes.title }}
          </Text>
          <Text v-if="article.attributes.excerpt" variant="body-large" color="content-secondary">
            {{ article.attributes.excerpt }}
          </Text>
        </div>

        <!-- Article Content -->
        <div class="prose prose-lg max-w-none mb-12">
          <div v-for="(block, index) in article.attributes.content" :key="index">
            <!-- Paragraph -->
            <p v-if="block.type === 'paragraph'" class="mb-4 body-default text-stone-700 leading-relaxed">
              <template v-for="(child, childIndex) in block.children" :key="childIndex">
                <strong v-if="child.bold">{{ child.text }}</strong>
                <em v-else-if="child.italic">{{ child.text }}</em>
                <span v-else>{{ child.text }}</span>
              </template>
            </p>

            <!-- Headings -->
            <Text 
              v-else-if="block.type === 'heading' && block.level === 1" 
              variant="title-screen" 
              as="h1" 
              class="mt-10 mb-6"
            >
              {{ block.children?.[0]?.text }}
            </Text>

            <Text 
              v-else-if="block.type === 'heading' && block.level === 2" 
              variant="title-subsection" 
              as="h2" 
              class="mt-8 mb-4"
            >
              {{ block.children?.[0]?.text }}
            </Text>

            <Text 
              v-else-if="block.type === 'heading' && block.level === 3" 
              variant="title-body" 
              as="h3" 
              class="mt-6 mb-3"
            >
              {{ block.children?.[0]?.text }}
            </Text>

            <!-- Lists -->
            <ul v-else-if="block.type === 'list' && block.format === 'unordered'" class="list-disc pl-6 mb-4 space-y-2">
              <li v-for="(item, itemIndex) in block.children" :key="itemIndex" class="text-stone-700">
                {{ item.children?.[0]?.text }}
              </li>
            </ul>

            <ol v-else-if="block.type === 'list' && block.format === 'ordered'" class="list-decimal pl-6 mb-4 space-y-2">
              <li v-for="(item, itemIndex) in block.children" :key="itemIndex" class="text-stone-700">
                {{ item.children?.[0]?.text }}
              </li>
            </ol>
          </div>
        </div>

        <!-- Helpful Feedback Section -->
        <div class="border-t border-b border-stone-200 py-8 mb-12">
          <div class="text-center">
            <Text variant="title-body" class="mb-4">
              War dieser Artikel hilfreich?
            </Text>
            
            <div v-if="!feedbackGiven" class="flex items-center justify-center gap-4 mt-2">
              <Button 
                variant="outline" 
                fontSize="body-default-bold text-secondary-purple"
                @click="handleFeedback(true)"
              >
                <Icon name="thumbs-up" :size="20" class="mr-2" />
                Yes
              </Button>
              <Button 
                variant="outline" 
                fontSize="body-default-bold text-secondary-purple"
                @click="handleFeedback(false)"
              >
                <Icon name="thumbs-down" :size="20" class="mr-2" />
                No
              </Button>
            </div>

            <div v-else>
              <Text variant="body-large" color="content-secondary">
                Thanks for your feedback!
              </Text>
            </div>
          </div>
        </div>

<!-- Related Articles -->
<div v-if="relatedArticles.length > 0" class="mb-12">
  <Text variant="title-subsection" class="mb-6">
    Ähnliche Artikel
  </Text>
  
  <!-- ✅ Simple button links instead of cards -->
  <div class="space-y-2">
    <Button
      v-for="relatedArticle in relatedArticles"
      :key="relatedArticle.id"
      variant="link"
      
      fontSize="body-default"
      class="w-full justify-start text-left text-secondary-purple"
      @click="goToArticle(relatedArticle)"
    >
      {{ relatedArticle.attributes.title }}
    </Button>
  </div>
</div>

      </div>
    </article>
  </div>
</template>