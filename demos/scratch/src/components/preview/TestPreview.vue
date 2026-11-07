<script setup>
  import PassagePreview from "~/components/preview/PassagePreview.vue"
  import { test } from "~/builder/useBuilder.js"

  // The test as it would look on paper.
</script>

<template>
  <div class="print-sheet">
    <p class="mb-1 text-sm text-neutral-500">{{ test.identifier }}</p>
    <h1 class="mb-8 text-2xl font-bold">{{ test.name || "Untitled test" }}</h1>
    <PassagePreview v-for="(passage, index) in test.passages" :key="passage.id" :passage="passage" :number="index + 1" />
  </div>
</template>
