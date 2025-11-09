import strapiApi from './strapi'

export const categoriesService = {
  // Get all categories with their articles
  async getAll() {
    try {
      const response = await strapiApi.get('/categories?populate=*')
      return {
        data: response.data.data.map(item => ({
          id: item.documentId,
          attributes: item
        }))
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  },

  // Get single category by ID with articles
  async getById(id) {
    try {
      const response = await strapiApi.get(`/categories/${id}?populate=*`)
      return {
        data: {
          id: response.data.data.documentId,
          attributes: response.data.data
        }
      }
    } catch (error) {
      console.error('Error fetching category:', error)
      throw error
    }
  },


async getBySlug(slug) {
  try {
    console.log('🔍 Looking for category with slug:', slug)
    
    const response = await strapiApi.get(`/categories?filters[slug][$eq]=${slug}&populate=*`)
    
    console.log('📦 API Response:', response.data)
    console.log('📊 Found categories:', response.data.data)
    
    if (!response.data.data || response.data.data.length === 0) {
      throw new Error('Category not found')
    }
    
    const item = response.data.data[0]
    console.log('✅ Found category:', item.slug)
    
    return {
      data: {
        id: item.documentId,
        documentId: item.documentId,
        attributes: item
      }
    }
  } catch (error) {
    console.error('❌ Error fetching category by slug:', error)
    throw error
  }
}
}