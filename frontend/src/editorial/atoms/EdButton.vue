<!-- ═══════════════════════════════════════════════════════════════════════
     EdButton — the marketing site's pill button.
     ═══════════════════════════════════════════════════════════════════════
     Differs from NdButton on purpose: it is a LINK first (a call to action
     goes somewhere), it is taller (52px, 60px for the closing CTA) and its
     colours are the sheet's, not the product theme's. `tone` names the fill
     against the sheet it sits on:
       lime            lime fill, dark text          — the primary CTA on violet, cream or night
       outline-light   white outline, white text     — the secondary on violet
       outline-dark    dark outline, dark text       — the secondary on lime or cream
       night           dark fill, cream text         — the primary on cream or paper
       night-on-lime   dark fill, lime text          — the primary INSIDE a lime sheet
     Renders a RouterLink for an in-app path, an <a> for a hash or external
     URL, and a <button> when neither is given. A hash link (`#sell`)
     glides to that section on the page itself and records the hash with
     router.replace, so it never goes through a navigation that scrolls
     back to the top.
     ═══════════════════════════════════════════════════════════════════ -->
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  label: { type: String, required: true },
  to: { type: String, default: undefined },
  href: { type: String, default: undefined },
  tone: { type: String, default: 'lime', validator: (v) => ['lime', 'outline-light', 'outline-dark', 'night', 'night-on-lime'].includes(v) },
  size: { type: String, default: 'lg', validator: (v) => ['xl', 'lg', 'md'].includes(v) },
  block: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
})
const emit = defineEmits(['click'])
const router = useRouter()

const isRoute = computed(() => typeof props.to === 'string' && props.to.startsWith('/'))
const isExternal = computed(() => typeof props.href === 'string' && /^https?:/.test(props.href))

const onLinkClick = (event) => {
  emit('click', event)
  if (event.defaultPrevented || !props.href?.startsWith('#') || props.href.length < 2) return
  const target = document.getElementById(props.href.slice(1))
  if (!target) return
  event.preventDefault()
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  router.replace({ hash: props.href }).catch(() => {})
}
</script>

<template>
  <RouterLink v-if="isRoute" :to="to" :class="['ed-button ed-focusable', `is-${tone}`, `is-${size}`, { 'is-block': block }]" @click="emit('click', $event)">
    <span class="ed-button__label">{{ label }}</span>
    <slot name="trailing" />
  </RouterLink>
  <a
    v-else-if="href"
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :class="['ed-button ed-focusable', `is-${tone}`, `is-${size}`, { 'is-block': block }]"
    @click="onLinkClick"
  >
    <span class="ed-button__label">{{ label }}</span>
    <slot name="trailing" />
  </a>
  <button v-else :type="type" :class="['ed-button ed-focusable', `is-${tone}`, `is-${size}`, { 'is-block': block }]" @click="emit('click', $event)">
    <span class="ed-button__label">{{ label }}</span>
    <slot name="trailing" />
  </button>
</template>

<style scoped>
.ed-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-sizing: border-box;
  border: 2px solid transparent;
  border-radius: var(--ed-pill);
  font-family: var(--ed-font-sans);
  font-weight: 700;
  letter-spacing: -0.01em;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 120ms ease, transform 120ms ease;
}
.ed-button:hover { opacity: 0.86; }
.ed-button:active { transform: translateY(1px); }
.is-block { display: flex; width: 100%; }

.is-xl { height: 60px; padding: 0 36px; font-size: 17px; line-height: 22px; }
.is-lg { height: 52px; padding: 0 28px; font-size: 16px; line-height: 20px; }
.is-md { height: 44px; padding: 0 20px; font-size: 15px; line-height: 20px; }
@media (max-width: 599px) {
  .is-xl { height: 54px; padding: 0 28px; font-size: 16px; }
  .is-lg { height: 50px; padding: 0 24px; }
}

.is-lime { background: var(--ed-lime); color: var(--ed-on-lime); }
.is-outline-light { border-color: var(--ed-on-violet); color: var(--ed-on-violet); background: transparent; }
.is-outline-dark { border-color: var(--ed-on-lime); color: var(--ed-on-lime); background: transparent; }
.is-night { background: var(--ed-ink); color: var(--ed-bone); }
.is-night-on-lime { background: var(--ed-on-lime); color: var(--ed-lime); }
</style>
