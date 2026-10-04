<!-- ═══════════════════════════════════════════════════════════════════════
     HelpBlocks — a help article's body: Strapi's `blocks` field drawn in
     the blog post's reading style (display headings, 18px text in ink-2,
     rounded figures). Every block type the old page drew is here —
     paragraph, heading 1–6, list, quote, code, image, media (video or
     image), rule — and inline formatting (bold, italic, underline,
     strikethrough, code, links) now works inside lists and quotes too.
     Text only ever goes through text nodes; nothing is rendered as HTML.
     ═══════════════════════════════════════════════════════════════════ -->
<script setup>
import { h } from 'vue'

const props = defineProps({
  blocks: { type: Array, default: () => [] },
})

// Strapi base URL (without /api) for media stored on the Strapi host.
const STRAPI_BASE_URL = (import.meta.env.VITE_STRAPI_URL || '').replace('/api', '')
const mediaUrl = (file) => {
  if (!file?.url) return ''
  return file.url.startsWith('http') ? file.url : `${STRAPI_BASE_URL}${file.url}`
}

const inline = (children = []) =>
  children.map((child, i) => {
    if (child.type === 'link') {
      const external = /^https?:/.test(child.url || '')
      return h('a', { key: i, href: child.url, target: external ? '_blank' : undefined, rel: external ? 'noopener noreferrer' : undefined }, inline(child.children))
    }
    let node = child.text ?? ''
    if (child.code) node = h('code', node)
    if (child.bold) node = h('strong', node)
    if (child.italic) node = h('em', node)
    if (child.underline) node = h('u', node)
    if (child.strikethrough) node = h('s', node)
    return node
  })

const plain = (children = []) => children.map((c) => (c.children ? plain(c.children) : c.text ?? '')).join('')

const list = (block, key) =>
  h(block.format === 'ordered' ? 'ol' : 'ul', { key, class: 'hb-list' }, (block.children || []).map((item, i) =>
    item.type === 'list' ? list(item, i) : h('li', { key: i }, inline(item.children)),
  ))

const block = (b, key) => {
  switch (b.type) {
    case 'paragraph':
      // Strapi stores a blank line as an empty paragraph; the column's gap already spaces blocks.
      return plain(b.children).trim() ? h('p', { key, class: 'hb-p' }, inline(b.children)) : null
    case 'heading': {
      const level = Math.min(6, Math.max(1, b.level || 2))
      // The page's h1 is the article title in the hero, so the body starts at h2.
      return h(`h${Math.max(2, level)}`, { key, class: ['hb-h', `is-${level}`] }, inline(b.children))
    }
    case 'list':
      return list(b, key)
    case 'quote':
      return h('blockquote', { key, class: 'hb-quote' }, (b.children || []).map((c, i) => (c.type === 'paragraph' ? h('p', { key: i }, inline(c.children)) : inline([c])[0])))
    case 'code':
      return h('pre', { key, class: 'hb-code' }, h('code', plain(b.children)))
    case 'image':
      return h('figure', { key, class: 'hb-figure' }, [
        h('img', { src: mediaUrl(b.image), alt: b.image?.alternativeText || b.image?.name || '', loading: 'lazy' }),
        b.image?.caption ? h('figcaption', b.image.caption) : null,
      ])
    case 'media':
      return h('figure', { key, class: 'hb-figure' }, b.file?.mime?.startsWith('video')
        ? h('video', { controls: true, src: mediaUrl(b.file) })
        : h('img', { src: mediaUrl(b.file), alt: b.file?.alternativeText || '', loading: 'lazy' }))
    case 'horizontalRule':
    case 'thematicBreak':
      return h('hr', { key, class: 'hb-rule' })
    default:
      return null
  }
}

const Blocks = () => props.blocks.map(block)
</script>

<template>
  <div class="hb">
    <Blocks />
  </div>
</template>

<style scoped>
.hb { display: flex; flex-direction: column; gap: 20px; min-width: 0; }

.hb :deep(.hb-p) { margin: 0; font-size: 18px; line-height: 1.6; color: var(--ed-ink-2); overflow-wrap: break-word; }
.hb :deep(a) { color: var(--nd-violet-mark, #5b21b6); font-weight: 600; text-decoration: underline; text-underline-offset: 3px; overflow-wrap: anywhere; }
.hb :deep(a:hover) { opacity: 0.82; }
.hb :deep(a:focus-visible) { outline: 3px solid var(--ed-violet); outline-offset: 2px; border-radius: 4px; }
.hb :deep(strong) { font-weight: 700; color: var(--ed-ink); }
.hb :deep(:not(pre) > code) { padding: 2px 7px; border-radius: 8px; background: var(--ed-field); color: var(--ed-ink); font-family: var(--ed-font-mono); font-size: 0.86em; }

.hb :deep(.hb-h) { margin: 12px 0 0; font-family: var(--ed-font-display); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; color: var(--ed-ink); overflow-wrap: break-word; }
.hb :deep(.hb-h:first-child) { margin-top: 0; }
.hb :deep(.hb-h.is-1) { font-size: clamp(28px, 0.6vw + 24px, 36px); }
.hb :deep(.hb-h.is-2) { font-size: clamp(26px, 0.5vw + 22px, 32px); }
.hb :deep(.hb-h.is-3) { font-size: clamp(22px, 0.3vw + 20px, 26px); letter-spacing: -0.025em; }
.hb :deep(.hb-h.is-4) { font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
.hb :deep(.hb-h.is-5) { font-family: var(--ed-font-sans); font-size: 17px; font-weight: 700; letter-spacing: 0; line-height: 1.3; }
.hb :deep(.hb-h.is-6) { font-family: var(--ed-font-sans); font-size: 12px; line-height: 16px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ed-ink-3); }

.hb :deep(.hb-list) { margin: 0; padding-left: 26px; display: flex; flex-direction: column; gap: 10px; font-size: 18px; line-height: 1.6; color: var(--ed-ink-2); }
.hb :deep(ul.hb-list) { list-style: disc; }
.hb :deep(ol.hb-list) { list-style: decimal; }
.hb :deep(.hb-list .hb-list) { margin-top: 10px; }
.hb :deep(.hb-list li) { padding-left: 4px; overflow-wrap: break-word; }
.hb :deep(.hb-list li::marker) { color: var(--ed-violet); font-weight: 700; }
.hb :deep(ol.hb-list li::marker) { font-family: var(--ed-font-mono); font-weight: 500; font-size: 0.9em; }

.hb :deep(.hb-quote) { margin: 8px 0; padding: 20px 24px; border-radius: 20px; background: var(--ed-cream); border-left: 6px solid var(--ed-lime); font-size: 18px; line-height: 1.6; color: var(--ed-ink); }
.hb :deep(.hb-quote p) { margin: 0; }
.hb :deep(.hb-quote p + p) { margin-top: 10px; }

.hb :deep(.hb-code) { margin: 8px 0; padding: 20px 24px; border-radius: 20px; background: var(--ed-night); color: var(--ed-bone); overflow-x: auto; font-family: var(--ed-font-mono); font-size: 14px; line-height: 1.6; }

.hb :deep(.hb-figure) { margin: 8px 0; }
.hb :deep(.hb-figure img), .hb :deep(.hb-figure video) { display: block; width: 100%; height: auto; border-radius: 20px; background: var(--ed-sunken); border: 1px solid var(--ed-line-cream); }
.hb :deep(.hb-figure figcaption) { margin-top: 10px; font-size: 14px; line-height: 20px; color: var(--ed-ink-3); text-align: center; }

.hb :deep(.hb-rule) { margin: 12px 0; border: 0; border-top: 1px solid var(--ed-line-cream); }
</style>
