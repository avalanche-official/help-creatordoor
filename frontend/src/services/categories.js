import categories from '@/content/categories.json'

// See services/helpArticles.js — static JSON, same shape as the old API calls.
const wrap = (item) => ({
  id: item.documentId,
  documentId: item.documentId,
  attributes: item,
})

export const categoriesService = {
  // Get all categories
  async getAll() {
    return { data: categories.map(wrap) }
  },

  // Get single category by ID
  async getById(id) {
    const item = categories.find((category) => category.documentId === id)
    if (!item) throw new Error(`Category not found: ${id}`)
    return { data: wrap(item) }
  },

  // Get single category by slug
  async getBySlug(slug) {
    const item = categories.find((category) => category.slug === slug)
    if (!item) throw new Error(`Category not found: ${slug}`)
    return { data: wrap(item) }
  },
}
