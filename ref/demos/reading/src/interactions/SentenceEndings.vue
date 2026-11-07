<script setup>
import DropZone from './DropZone.vue'
import ChipList from './ChipList.vue'

// Matching sentence endings: drag an ending into the gap after each beginning.
// NOTE: assumed to use the same drag-and-drop as headings; not yet checked
// against a live example of this interaction.
defineProps({ session: Object, group: Object })
</script>

<template>
  <div class="mb-6">
    <p v-for="q in group.questions" :key="q.n" class="my-4 leading-[30px]">
      <span data-annotatable v-html="q.text" />
      <DropZone :session="session" :group="group" :n="q.n" class="ml-1" />
    </p>
    <ChipList :session="session" :group="group" :title="group.optionsTitle" />
  </div>
</template>
