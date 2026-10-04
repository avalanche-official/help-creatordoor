<!-- ═══════════════════════════════════════════════════════════════════════
     CategoryDetailView — one help topic in the editorial design: the
     violet hero with the way back, the topic's name and description, then
     the cream sheet with its articles — folded by subcategory (the main
     site's FAQ fold) or, without subcategories, as one list — and the
     violet "Noch mehr Hilfe?" closing.
     ═══════════════════════════════════════════════════════════════════ -->
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { categoriesService } from '@/services/categories'
import { helpArticlesService } from '@/services/helpArticles'
import { articleCount, articlePath, byOrder } from '@/editorial/helpContent'
import EdSection from '@/editorial/templates/EdSection.vue'
import EdButton from '@/editorial/atoms/EdButton.vue'
import EdArches from '@/editorial/atoms/EdArches.vue'
import EdFaqItem from '@/editorial/molecules/EdFaqItem.vue'
import HelpClosing from '@/editorial/organisms/HelpClosing.vue'

const route = useRoute()
const category = ref(null)
const articles = ref([])
const loading = ref(true)
const notFound = ref(false)
const loadError = ref(false)

const load = async () => {
  loading.value = true
  notFound.value = false
  loadError.value = false
  try {
    const slug = route.params.categorySlug
    const [categoryRes, articlesRes] = await Promise.all([
      categoriesService.getBySlug(slug),
      helpArticlesService.getAll(),
    ])
    category.value = categoryRes.data
    document.title = `${category.value.attributes.name} - Creatordoor Help`

    // Articles of this category
    articles.value = byOrder(articlesRes.data.filter((article) =>
      article.attributes.category?.documentId === category.value.documentId,
    ))
  } catch (error) {
    console.error('Error loading category:', error)
    if (error?.message === 'Category not found') notFound.value = true
    else loadError.value = true
  } finally {
    loading.value = false
  }
}
onMounted(load)

const categorySlug = computed(() => category.value?.attributes.slug || category.value?.id)
const linkOf = (article) => ({ id: article.id, title: article.attributes.title, to: articlePath(article, categorySlug.value) })

// One group per subcategory (in the order its first article appears); articles
// without a subcategory follow as "Weitere Artikel".
const groups = computed(() => {
  const bySub = new Map()
  const rest = []
  articles.value.forEach((article) => {
    const sub = article.attributes.subcategory
    if (!sub?.documentId) { rest.push(linkOf(article)); return }
    if (!bySub.has(sub.documentId)) bySub.set(sub.documentId, { id: sub.documentId, title: sub.name, order: sub.order, links: [] })
    bySub.get(sub.documentId).links.push(linkOf(article))
  })
  const list = byOrder(Array.from(bySub.values()))
  if (list.length && rest.length) list.push({ id: 'rest', title: 'Weitere Artikel', links: rest })
  return list
})
const flatLinks = computed(() => (groups.value.length ? [] : articles.value.map(linkOf)))
</script>

<template>
  <div class="help-view">
    <!-- hero -->
    <EdSection id="top" tone="violet" :overlap="false" pad="none" as="header" clip>
      <div class="help-chero">
        <div class="help-chero__copy">
          <RouterLink to="/" class="help-back ed-focusable"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></svg>Hilfe-Center</RouterLink>
          <template v-if="category">
            <h1 class="ed-display-2 help-chero__title">{{ category.attributes.name }}</h1>
            <p v-if="category.attributes.description" class="ed-lead help-chero__lead">{{ category.attributes.description }}</p>
            <div class="help-chero__note">{{ articleCount(articles.length) }}</div>
          </template>
          <template v-else-if="loading">
            <div class="help-skel is-title" /><div class="help-skel is-lead" />
          </template>
          <template v-else>
            <h1 class="ed-display-2 help-chero__title">{{ loadError ? 'Das hat nicht geklappt.' : 'Thema nicht gefunden.' }}</h1>
            <p class="ed-lead help-chero__lead">{{ loadError ? 'Das Thema konnte nicht geladen werden. Prüfe deine Verbindung und versuch es noch einmal.' : 'Dieses Thema gibt es nicht (mehr). Im Hilfe-Center findest du alle Themen.' }}</p>
            <div class="help-chero__actions">
              <EdButton v-if="loadError" label="Erneut versuchen" tone="lime" size="lg" @click="load" />
              <EdButton v-else label="Zum Hilfe-Center" to="/" tone="lime" size="lg" />
            </div>
          </template>
        </div>
        <div class="help-chero__art" aria-hidden="true"><EdArches :width="200" outer="night" inner="lime" side="blaze" class="help-chero__arches" /></div>
      </div>
    </EdSection>

    <!-- articles -->
    <EdSection v-if="category || loading" tone="cream">
      <div class="help-cat">
        <div v-if="loading" class="help-cat__list" aria-busy="true">
          <div v-for="n in 5" :key="n" class="help-row is-skel"><div class="help-skel is-row" /></div>
        </div>

        <!-- subcategories as folds -->
        <div v-else-if="groups.length" class="help-cat__folds">
          <EdFaqItem v-for="group in groups" :key="group.id" :title="group.title" :note="articleCount(group.links.length)" :open="groups.length === 1">
            <div class="help-cat__list">
              <RouterLink v-for="link in group.links" :key="link.id" :to="link.to" class="help-row ed-focusable">
                <span class="help-row__title">{{ link.title }}</span>
                <svg class="help-row__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
              </RouterLink>
            </div>
          </EdFaqItem>
        </div>

        <!-- no subcategories: the articles directly -->
        <template v-else-if="flatLinks.length">
          <h2 class="ed-display-3">Alle Artikel</h2>
          <div class="help-cat__list">
            <RouterLink v-for="link in flatLinks" :key="link.id" :to="link.to" class="help-row ed-focusable">
              <span class="help-row__title">{{ link.title }}</span>
              <svg class="help-row__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
            </RouterLink>
          </div>
        </template>

        <!-- empty -->
        <div v-else class="help-cat__empty">
          <h2 class="ed-display-5">In diesem Thema gibt es noch keine Artikel.</h2>
          <EdButton label="Zum Hilfe-Center" to="/" tone="night" size="lg" />
        </div>
      </div>
    </EdSection>

    <HelpClosing />
  </div>
</template>

<style scoped>
.help-chero { display: flex; flex-direction: column; padding-top: 20px; }
.help-chero__copy { display: flex; flex-direction: column; align-items: flex-start; gap: 22px; max-width: 900px; min-width: 0; padding-bottom: calc(var(--ed-sheet-overlap) + 40px); }
.help-back { display: inline-flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 700; color: var(--ed-on-violet-muted); text-decoration: none; border-radius: 6px; }
.help-back:hover { color: var(--ed-on-violet); }
.help-chero__title { font-size: clamp(38px, 2.2vw + 30px, 76px); line-height: 0.92; overflow-wrap: break-word; max-width: 100%; }
.help-chero__lead { color: var(--ed-on-violet-soft); max-width: 640px; }
.help-chero__note { font-family: var(--ed-font-mono); font-size: 13px; line-height: 18px; color: var(--ed-on-violet-muted); }
.help-chero__actions { display: flex; gap: 12px; }
.help-chero__art { display: none; }
.help-skel { border-radius: 10px; background: var(--ed-violet-glass); width: 100%; }
.help-skel.is-title { height: 64px; width: min(480px, 80%); }
.help-skel.is-lead { height: 24px; width: min(360px, 60%); }
.help-skel.is-row { height: 20px; width: 60%; background: var(--ed-field); border-radius: 7px; }

.help-cat { display: flex; flex-direction: column; gap: 28px; max-width: 920px; }
.help-cat__folds { border-top: 1px solid var(--ed-line-cream); }
.help-cat__list { display: flex; flex-direction: column; gap: 8px; }
.help-row {
  box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; gap: 16px;
  min-height: 60px; padding: 14px 20px; border-radius: 20px; background: var(--ed-paper); color: var(--ed-ink);
  text-decoration: none; box-shadow: var(--ed-shadow-card); transition: transform 160ms var(--ed-ease-out);
}
.help-row:not(.is-skel):hover { transform: translateX(3px); }
.help-row__title { min-width: 0; font-size: 17px; line-height: 24px; font-weight: 600; overflow-wrap: break-word; }
.help-row__arrow { flex: 0 0 auto; color: var(--ed-ink-3); transition: color 160ms ease; }
.help-row:hover .help-row__arrow { color: var(--ed-violet); }
.help-cat__empty { display: flex; flex-direction: column; align-items: flex-start; gap: 20px; padding: 28px; border-radius: var(--ed-tile-radius); background: var(--ed-paper); }

@media (min-width: 1024px) {
  .help-chero { flex-direction: row; align-items: flex-end; gap: 40px; padding-top: 48px; }
  .help-chero__copy { flex: 1 1 0; gap: 28px; padding-bottom: calc(var(--ed-sheet-overlap) + 64px); }
  .help-chero__art { display: flex; flex: 0 0 auto; align-items: flex-end; justify-content: flex-end; padding-right: 20px; }
  .help-cat { gap: 40px; }
  .help-row { padding: 16px 24px; }
}
@media (prefers-reduced-motion: reduce) {
  .help-row { transition: none; }
  .help-row:not(.is-skel):hover { transform: none; }
}
</style>
