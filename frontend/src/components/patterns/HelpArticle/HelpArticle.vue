<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Title (required) - sentence case, first person, under 6 words
  title: {
    type: String,
    required: true,
  },
  // Breadcrumbs for navigation
  breadcrumbs: {
    type: Array,
    default: () => [],
    // Example: [{ label: 'Help home', href: '/help' }, { label: 'Sending money', href: '/help/sending' }]
  },
  // Intro text (max 3 sentences, third person)
  intro: {
    type: String,
    default: '',
  },
  // Sections with headings and content
  sections: {
    type: Array,
    default: () => [],
    // Example: [{ id: 'fees', heading: 'Fees for sending money', content: '...' }]
  },
  // CTA button
  cta: {
    type: Object,
    default: null,
    // Example: { label: 'Upload documents', href: '/upload', variant: 'primary' }
  },
  // Show index when 3+ headings
  showIndex: {
    type: Boolean,
    default: true,
  },
})

const shouldShowIndex = computed(() => {
  return props.showIndex && props.sections.length >= 3
})

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <article class="help-article max-w-4xl mx-auto">
    <!-- Breadcrumbs -->
    <nav v-if="breadcrumbs.length" class="mb-6" aria-label="Breadcrumb">
      <ol class="flex items-center gap-2 text-sm">
        <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center gap-2">
          <a
            :href="crumb.href"
            class="text-content-secondary hover:text-content-primary transition-colors underline"
          >
            {{ crumb.label }}
          </a>
          <svg
            v-if="index < breadcrumbs.length - 1"
            class="w-4 h-4 text-content-tertiary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </li>
        <li class="text-content-primary font-medium">{{ title }}</li>
      </ol>
    </nav>

    <!-- Title -->
    <h1 class="text-4xl font-semibold text-content-primary mb-6">
      {{ title }}
    </h1>

    <!-- Intro -->
    <div v-if="intro" class="intro text-base text-content-secondary mb-6 leading-relaxed">
      {{ intro }}
    </div>

    <!-- Index (if 3+ sections) -->
    <nav
      v-if="shouldShowIndex"
      class="index mb-8 p-4 bg-background-elevated border border-border-default rounded-lg"
    >
      <h2 class="text-sm font-semibold text-content-primary mb-3">In this article</h2>
      <ol class="space-y-2">
        <li v-for="(section, index) in sections" :key="section.id">
          <button
            @click="scrollToSection(section.id)"
            class="text-sm text-content-accent hover:text-accent-hover transition-colors text-left underline"
          >
            {{ section.heading }}
          </button>
        </li>
      </ol>
    </nav>

    <!-- Sections -->
    <div class="sections space-y-8">
      <section
        v-for="(section, index) in sections"
        :key="section.id"
        :id="section.id"
        class="section"
      >
        <!-- Section Heading (H3) -->
        <h3 class="text-xl font-semibold text-content-primary mb-4">
          {{ section.heading }}
        </h3>

        <!-- Section Content -->
        <div class="content text-base text-content-secondary space-y-4 leading-relaxed">
          <!-- If content is a string -->
          <template v-if="typeof section.content === 'string'">
            <p>{{ section.content }}</p>
          </template>

          <!-- If content is an array of mixed content -->
          <template v-else-if="Array.isArray(section.content)">
            <template v-for="(item, idx) in section.content" :key="idx">
              <!-- Paragraph -->
              <p v-if="item.type === 'paragraph'">
                {{ item.text }}
              </p>

              <!-- Tip box -->
              <div
                v-else-if="item.type === 'tip'"
                class="tip p-4 bg-background-elevated border-l-4 border-content-accent rounded"
              >
                <p class="text-sm">
                  <strong class="text-content-primary">Tip:</strong>
                  <span class="text-content-secondary">{{ item.text }}</span>
                </p>
              </div>

              <!-- Bullet list -->
              <ul v-else-if="item.type === 'list'" class="list-disc pl-6 space-y-2">
                <li v-for="(listItem, liIdx) in item.items" :key="liIdx">
                  {{ listItem }}
                </li>
              </ul>

              <!-- Ordered list -->
              <ol v-else-if="item.type === 'ordered-list'" class="list-decimal pl-6 space-y-2">
                <li v-for="(listItem, liIdx) in item.items" :key="liIdx">
                  {{ listItem }}
                </li>
              </ol>

              <!-- Link -->
              <p v-else-if="item.type === 'link'">
                <a
                  :href="item.href"
                  class="text-content-accent hover:text-accent-hover underline transition-colors"
                >
                  {{ item.text }}
                </a>
              </p>
            </template>
          </template>

          <!-- Slot for custom content -->
          <slot :name="`section-${section.id}`" />
        </div>
      </section>
    </div>

    <!-- Call to Action -->
    <div v-if="cta" class="cta mt-12 pt-8 border-t border-border-default">
      <a
        :href="cta.href"
        :class="[
          'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all',
          cta.variant === 'primary'
            ? 'bg-content-accent text-white hover:bg-accent-hover'
            : 'bg-background-elevated text-content-primary border border-border-default hover:border-border-accent',
        ]"
      >
        {{ cta.label }}
      </a>
    </div>

    <!-- Default slot for additional content -->
    <div v-if="$slots.default" class="additional-content mt-8">
      <slot />
    </div>
  </article>
</template>

<style scoped>
/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Ensure headings have scroll margin for better UX when using anchor links */
.section {
  scroll-margin-top: 2rem;
}
</style>
