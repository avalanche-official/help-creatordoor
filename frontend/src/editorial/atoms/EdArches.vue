<!-- ═══════════════════════════════════════════════════════════════════════
     EdArches — the door-arch cluster that stands in for imagery on every
     marketing sheet: one large arch with a smaller arch inside its doorway,
     optionally a third arch leaning against its left side. Drawn as
     boxes, so it costs no asset and takes any sheet's colours.

     `width` is the large arch's width in px; every other dimension follows
     the canvas's ratios (large 1 : 1.5, inner 0.52 : 0.86, side 0.58 : 0.9).
     Colour props take an editorial colour NAME (`night`, `lime`, `blaze`,
     `violet`, `on-lime`, `on-blaze`, `paper`), never a value.
     ═══════════════════════════════════════════════════════════════════ -->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  width: { type: Number, default: 300 },
  outer: { type: String, default: 'night' },
  inner: { type: String, default: 'lime' },
  side: { type: String, default: undefined },
  /** Scales the whole cluster down on narrow viewports (0–1); the parent decides. */
  scale: { type: Number, default: 1 },
})

const px = (n) => `${Math.round(n * props.scale)}px`
const large = computed(() => ({ width: px(props.width), height: px(props.width * 1.5), borderRadius: `${px(props.width / 2)} ${px(props.width / 2)} 0 0`, background: `var(--ed-${props.outer})` }))
const small = computed(() => ({ width: px(props.width * 0.52), height: px(props.width * 0.86), borderRadius: `${px(props.width * 0.26)} ${px(props.width * 0.26)} 0 0`, background: `var(--ed-${props.inner})` }))
const lean = computed(() => ({ width: px(props.width * 0.58), height: px(props.width * 0.9), borderRadius: `${px(props.width * 0.29)} ${px(props.width * 0.29)} 0 0`, background: `var(--ed-${props.side})`, marginRight: px(-props.width * 0.1) }))
</script>

<template>
  <div class="ed-arches" aria-hidden="true">
    <div v-if="side" class="ed-arches__side" :style="lean" />
    <div class="ed-arches__large" :style="large">
      <div class="ed-arches__inner" :style="small" />
    </div>
  </div>
</template>

<style scoped>
.ed-arches { display: flex; align-items: flex-end; flex: 0 0 auto; }
.ed-arches__side { flex: 0 0 auto; }
.ed-arches__large { display: flex; align-items: flex-end; justify-content: center; flex: 0 0 auto; }
.ed-arches__inner { flex: 0 0 auto; }
</style>
