import strapiApi from './strapi'

export const helpArticlesService = {
  // Get all articles
  async getAll() {
    try {
      const response = await strapiApi.get('/help-articles?populate=*')
      // Strapi v5 returns flat structure, wrap it for consistency
      return {
        data: response.data.data.map(item => ({
          id: item.documentId, // Use documentId as the ID
          attributes: item
        }))
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
      throw error
    }
  },

  // Get single article by ID
  async getById(id) {
    try {
      const response = await strapiApi.get(`/help-articles/${id}?populate=*`)
      return {
        data: {
          id: response.data.data.documentId,
          attributes: response.data.data
        }
      }
    } catch (error) {
      console.error('Error fetching article:', error)
      throw error
    }
  },

  // ✅ NEW: Get single article by slug
  async getBySlug(slug) {
    try {
      const response = await strapiApi.get(`/help-articles?filters[slug][$eq]=${slug}&populate=*`)
      
      if (!response.data.data || response.data.data.length === 0) {
        throw new Error('Article not found')
      }
      
      const item = response.data.data[0]
      return {
        data: {
          id: item.documentId,
          documentId: item.documentId,
          attributes: item
        }
      }
    } catch (error) {
      console.error('Error fetching article by slug:', error)
      throw error
    }
  },

  // Search articles
  async search(query) {
    try {
      const response = await strapiApi.get(`/help-articles?filters[title][$contains]=${query}&populate=*`)
      return {
        data: response.data.data.map(item => ({
          id: item.documentId,
          attributes: item
        }))
      }
    } catch (error) {
      console.error('Error searching articles:', error)
      throw error
    }
  },

  // ✅ NEW: Update article (for feedback)
  async update(id, data) {
    try {
      const response = await strapiApi.put(`/help-articles/${id}`, {
        data
      })
      return {
        data: {
          id: response.data.data.documentId,
          attributes: response.data.data
        }
      }
    } catch (error) {
      console.error('Error updating article:', error)
      throw error
    }
  }
}