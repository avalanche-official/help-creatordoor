// ═══════════════════════════════════════════════════════════════════════════
// vEdReveal — scroll-reveal for the marketing sheets.
//
// `v-ed-reveal` marks an element `data-ed-reveal`; editorial.css hides it
// (opacity 0, 24px down) until the observer sees it enter the viewport and
// adds `is-in`, which transitions it into place. With the `.stagger`
// modifier every DIRECT CHILD reveals instead, each 70ms after the previous
// one (a row of stats, a grid of tiles, three steps).
//
// The hidden state is set from JS, never from CSS alone, so a page without
// script (prerender, a failed bundle) shows everything. Reduced motion is
// honoured in the stylesheet: the state change stays, the travel goes.
// One IntersectionObserver serves every element on the page.
// ═══════════════════════════════════════════════════════════════════════════

const STAGGER_MS = 70
let observer = null

const observe = (el) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    el.classList.add('is-in')
    return
  }
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        }
      },
      // Fire a little before the element's top reaches the bottom edge so the
      // motion is already under way when the eye gets there.
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    )
  }
  observer.observe(el)
}

const targetsOf = (el, modifiers) => (modifiers.stagger ? Array.from(el.children) : [el])

export const vEdReveal = {
  mounted(el, binding) {
    const targets = targetsOf(el, binding.modifiers)
    targets.forEach((t, i) => {
      t.setAttribute('data-ed-reveal', '')
      if (binding.modifiers.stagger) t.style.setProperty('--ed-reveal-delay', `${i * STAGGER_MS}ms`)
      observe(t)
    })
  },
  unmounted(el, binding) {
    if (!observer) return
    targetsOf(el, binding.modifiers).forEach((t) => observer.unobserve(t))
  },
}
