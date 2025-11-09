<!-- components/editorial/BannerCard/BannerCard.vue -->
<script setup>
import CopyBlock from '@/components/molecules/CopyBlock/CopyBlock.vue'
import Button from '@/components/atoms/Button/Button.vue'

const props = defineProps({
  // Headline text (2 lines max, bold, large)
  headline: {
    type: String,
    required: true,
  },
  // Body copy text (short description)
  description: {
    type: String,
    default: '',
  },
  // Primary CTA button
  cta: {
    type: Object,
    default: null,
    // Example: { label: 'Create an account', href: '/signup' }
  },
  // Tapestry variant (color scheme)
  tapestry: {
    type: String,
    default: 'sunset',
    validator: (v) => ['sunset', 'ocean', 'forest', 'purple', 'pink'].includes(v),
  },
  // Alignment of content
  align: {
    type: String,
    default: 'center',
    validator: (v) => ['left', 'center'].includes(v),
  },
})

// Define tapestry gradient backgrounds (Wise's signature colorful backgrounds)
const tapestryStyles = {
  sunset: {
    background:
      'linear-gradient(135deg, #FF6B9D 0%, #FF8E53 25%, #FFC837 50%, #FF6B35 75%, #FF1744 100%)',
  },
  ocean: {
    background:
      'linear-gradient(135deg, #667EEA 0%, #4BC5E8 25%, #37D5D6 50%, #2CD5C4 75%, #25CCB8 100%)',
  },
  forest: {
    background:
      'linear-gradient(135deg, #56AB2F 0%, #7BC950 25%, #A8E063 50%, #56CCF2 75%, #2F80ED 100%)',
  },
  purple: {
    background:
      'linear-gradient(135deg, #B24592 0%, #D44C8C 25%, #F15F79 50%, #E94057 75%, #8F2D56 100%)',
  },
  pink: {
    background:
      'linear-gradient(135deg, #FA709A 0%, #FEE140 25%, #FFB88C 50%, #FFA07A 75%, #FF6B9D 100%)',
  },
}
</script>

<template>
  <div class="relative overflow-hidden" :style="tapestryStyles[tapestry]">
    <!-- Decorative overlay pattern (mimics Wise's tapestry texture) -->
    <div class="absolute inset-0 opacity-20 pointer-events-none" style="mix-blend-mode: overlay">
      <div
        class="absolute inset-0"
        style="
          background-image: url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;);
        "
      ></div>
    </div>

    <!-- Content Card -->
    <div class="max-w-5xl mx-auto px-4 relative z-10 py-10 md:py-12 lg:py-16">
      <div class="bg-white border border-stone-200 rounded-3xl p-8 md:p-12 lg:p-16">
        <CopyBlock
          :title="headline"
          :description="description"
          :align="align"
          spacing="6"
          title-variant="display-small"
          mobile-title-variant="title-page"
          description-variant="body-large-bold"
          title-color="content-primary"
          description-color="content-secondary"
          as="h2"
        >
          <!-- Pass through any custom content -->
          <slot />

          <!-- CTA Button -->
          <div
            v-if="cta || $slots.actions"
            :class="['mt-8', align === 'center' ? 'flex justify-center' : '']"
          >
            <slot name="actions">
              <Button v-if="cta" as="a" :href="cta.href" variant="primary" size="large">
                {{ cta.label }}
              </Button>
            </slot>
          </div>
        </CopyBlock>
      </div>
    </div>
  </div>
</template>
