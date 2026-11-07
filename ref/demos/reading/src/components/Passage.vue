<script setup>
import { computed } from 'vue'
import DropSlot from './DropSlot.vue'
import DropZone from '../interactions/DropZone.vue'

const props = defineProps({ part: Object, session: Object, skin: { type: String, default: 'legacy' } })

// Headings questions put a drop slot above the paragraph they refer to.
// part.paragraphLabels: false hides the letters (headings passages have none).
const headingSlots = computed(() => {
  const g = props.part.groups.find((x) => x.type === 'headings')
  if (!g) return {}
  return Object.fromEntries(g.questions.map((q) => [q.paragraph, { group: g, n: q.n }]))
})
</script>

<template>
  <article class="passage">
    <h2 class="passage-title" data-annotatable v-html="part.title" />
    <p v-if="part.subtitle" class="passage-subtitle" data-annotatable v-html="part.subtitle" />
    <section v-for="(p, i) in part.paragraphs" :key="i" class="passage-para">
      <div v-if="p.label && headingSlots[p.label]" class="heading-slot-row">
        <DropZone v-if="skin === 'current'" :session="session" :group="headingSlots[p.label].group" :n="headingSlots[p.label].n" block class="mb-1" />
        <DropSlot v-else :session="session" :group="headingSlots[p.label].group" :n="headingSlots[p.label].n" wide />
      </div>
      <p>
        <b v-if="p.label && part.paragraphLabels !== false" class="para-label">{{ p.label }}</b>
        <span data-annotatable v-html="p.html" />
      </p>
    </section>
  </article>
</template>
