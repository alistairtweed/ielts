<script setup>
  import { computed } from "vue"

  import GroupPreview from "~/components/preview/GroupPreview.vue"
  import RichContent from "~/components/preview/RichContent.js"
  import { formatRange, passageRange } from "~/builder/useBuilder.js"

  const props = defineProps({ passage: Object, number: Number })

  const range = computed(() => formatRange(passageRange(props.passage)))
  // Section letters are printed only when questions refer to them.
  const showLetters = computed(() =>
    props.passage.questionGroups.some((g) => ["match-the-paragraph-information", "match-the-paragraph-headings"].includes(g.type))
  )
</script>

<template>
  <section class="print-passage">
    <h2 class="print-passage-heading">READING PASSAGE {{ number }}</h2>
    <p class="mb-6">
      You should spend about 20 minutes on <strong>Questions {{ range || "…" }}</strong>, which are based on Reading Passage {{ number }}
      below.
    </p>
    <h2 class="print-title" :class="{ 'text-neutral-400': !passage.title }">{{ passage.title || "Title" }}</h2>
    <p v-if="passage.subtitle" class="print-subtitle">{{ passage.subtitle }}</p>
    <RichContent :doc="passage.content" :show-letters="showLetters" />

    <GroupPreview v-for="group in passage.questionGroups" :key="group.id" :group="group" :passage="passage" :passage-number="number" />
  </section>
</template>
