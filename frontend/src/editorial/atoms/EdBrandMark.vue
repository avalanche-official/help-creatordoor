<!-- ═══════════════════════════════════════════════════════════════════════
     EdBrandMark — the Creatordoor C-arrow mark and the CREATORDOOR
     wordmark, as the main site draws them (digitaldownload's NdBrandMark +
     EdBrandMark in one file, since the help center has no product system).

     Both are painted as CSS masks (assets/appIcon/mark-mask.png,
     wordmark-mask.png) over `currentColor`, so the mark takes the ink of
     wherever it sits — white on the violet nav, bone in the footer — with
     no per-sheet asset. `size` is the mark's HEIGHT; the width follows the
     artwork's aspect.
     ═══════════════════════════════════════════════════════════════════ -->
<script setup>
import { computed } from 'vue'
import markMask from '@/assets/appIcon/mark-mask.png'
import wordMask from '@/assets/appIcon/wordmark-mask.png'

const props = defineProps({
  size: { type: Number, default: 32 },
  wordmark: { type: Boolean, default: true },
})

const MARK_ASPECT = 567 / 628
const WORD_ASPECT = 3474 / 382

const markStyle = computed(() => ({
  width: `${Math.round(props.size * MARK_ASPECT)}px`,
  height: `${props.size}px`,
  '--nd-brand-mask': `url(${markMask})`,
}))

const wordStyle = computed(() => {
  const h = Math.max(9, Math.round(props.size * 0.5))
  return {
    width: `${Math.round(h * WORD_ASPECT)}px`,
    height: `${h}px`,
    '--nd-brand-mask': `url(${wordMask})`,
  }
})
</script>

<template>
  <span class="nd-brand ed-brand" role="img" aria-label="Creatordoor">
    <span class="nd-brand__mark" :style="markStyle" />
    <span v-if="wordmark" class="nd-brand__word" :style="wordStyle" />
  </span>
</template>

<style scoped>
.nd-brand { display: inline-flex; align-items: center; gap: 8px; color: inherit; }
.nd-brand__mark,
.nd-brand__word {
  display: block;
  flex: none;
  background-color: currentColor;
  -webkit-mask: var(--nd-brand-mask) center / contain no-repeat;
  mask: var(--nd-brand-mask) center / contain no-repeat;
}
</style>
