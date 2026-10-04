<!-- ═══════════════════════════════════════════════════════════════════════
     EdChip — a pill label on a sheet. Static by default (the hero's
     "6.000+ Creator vertrauen Creatordoor", a migration perk); with
     `interactive` it becomes a real <button> carrying `aria-pressed`, the
     house pattern for the service selector on the home page.
       glass          translucent white on violet
       night          dark fill, cream text        — the selected service chip
       sunken         grey fill, dark text         — an unselected service chip
       tint-on-lime   dark 10 % tint, dark text    — a perk inside a lime sheet
                      (never dark-filled: that is the lime sheet's button)
       paper          white fill, dark text        — the lime sheet's label chip
     A `leading` slot takes a small icon before the label.
     ═══════════════════════════════════════════════════════════════════ -->
<script setup>
defineProps({
  label: { type: String, required: true },
  tone: { type: String, default: 'glass', validator: (v) => ['glass', 'night', 'sunken', 'tint-on-lime', 'paper'].includes(v) },
  size: { type: String, default: 'md', validator: (v) => ['md', 'lg'].includes(v) },
  interactive: { type: Boolean, default: false },
  pressed: { type: Boolean, default: false },
})
defineEmits(['click'])
</script>

<template>
  <button
    v-if="interactive"
    type="button"
    :aria-pressed="pressed ? 'true' : 'false'"
    :class="['ed-chip ed-focusable is-interactive', `is-${tone}`, `is-${size}`]"
    @click="$emit('click', $event)"
  ><slot name="leading" />{{ label }}</button>
  <span v-else :class="['ed-chip', `is-${tone}`, `is-${size}`]"><slot name="leading" />{{ label }}</span>
</template>

<style scoped>
.ed-chip {
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  border: 0;
  border-radius: var(--ed-pill);
  font-family: var(--ed-font-sans);
  font-weight: 700;
  white-space: nowrap;
  flex: 0 0 auto;
  gap: 8px;
}
.is-interactive { cursor: pointer; transition: opacity 120ms ease, background-color 200ms ease, color 200ms ease; }
.is-interactive:hover { opacity: 0.86; }

.is-md { height: 40px; padding: 0 16px; font-size: 14px; }
.is-lg { height: 44px; padding: 0 18px; font-size: 15px; font-weight: 600; }
@media (min-width: 1024px) {
  .is-md { height: 48px; padding: 0 22px; font-size: 16px; }
  .is-lg { height: 56px; padding: 0 28px; font-size: 19px; }
}

.is-glass { background: var(--ed-violet-glass); color: var(--ed-on-violet); height: auto; padding: 8px 14px; font-size: 13px; }
@media (min-width: 1024px) { .is-glass { padding: 10px 18px; font-size: 15px; } }
.is-night { background: var(--ed-ink); color: var(--ed-bone); font-weight: 700; }
.is-sunken { background: var(--ed-sunken); color: var(--ed-ink); }
.is-tint-on-lime { background: rgba(22, 37, 10, 0.1); color: var(--ed-on-lime); font-weight: 600; }
.is-paper { background: var(--ed-paper); color: var(--ed-on-lime); }
</style>
