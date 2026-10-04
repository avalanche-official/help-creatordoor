<!-- ═══════════════════════════════════════════════════════════════════════
     EdSocialGlyph — a social network's glyph from the shared icon set
     (src/assets/socialMedia, the same files the app and the link pages
     use), drawn MONOCHROME: the file's coloured disc is dropped and every
     remaining fill takes `currentColor`, so the parent's disc and ink set
     the look. The files draw the glyph at ~45 % of their box, so `size`
     is the box: 40 gives an ~18px glyph.
       name  instagram | tiktok | x | linkedin | whatsapp | youtube | facebook …
             (the file names in src/assets/socialMedia, lower-cased)
     ═══════════════════════════════════════════════════════════════════ -->
<script>
const files = import.meta.glob('@/assets/socialMedia/*.svg', { query: '?raw', import: 'default', eager: true })
const GLYPHS = Object.fromEntries(
  Object.entries(files).map(([path, raw]) => [
    path.split('/').pop().replace('.svg', '').toLowerCase(),
    raw
      .replace(/<rect\b[^>]*\/>/, '')
      .replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"')
      .replace(/<svg\b/, '<svg aria-hidden="true" focusable="false"'),
  ]),
)
</script>

<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 40 },
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html — our own icon files -->
  <span class="ed-social-glyph" :style="{ width: `${size}px`, height: `${size}px` }" v-html="GLYPHS[name] || ''" />
</template>

<style scoped>
.ed-social-glyph { display: inline-flex; flex: 0 0 auto; }
.ed-social-glyph :deep(svg) { width: 100%; height: 100%; }
</style>
