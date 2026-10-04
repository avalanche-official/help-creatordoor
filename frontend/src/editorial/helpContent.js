// Small helpers the three help views share: ordering by the Strapi `order`
// field and the article / category paths.

/** Entries with an `order` first (ascending), the rest in the order Strapi sent them. */
export const byOrder = (items) =>
  items
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const ao = a.item.attributes?.order ?? a.item.order
      const bo = b.item.attributes?.order ?? b.item.order
      if (ao == null && bo == null) return a.index - b.index
      if (ao == null) return 1
      if (bo == null) return -1
      return ao - bo || a.index - b.index
    })
    .map(({ item }) => item)

export const categoryPath = (category) => `/${category.attributes.slug || category.id}`

/** `/category/article`; an article without a category keeps the old `/article/<slug>` form. */
export const articlePath = (article, categorySlug) => {
  const slug = article.attributes.slug || article.id
  return `/${article.attributes.category?.slug || categorySlug || 'article'}/${slug}`
}

export const articleCount = (n) => (n === 1 ? '1 Artikel' : `${n} Artikel`)
