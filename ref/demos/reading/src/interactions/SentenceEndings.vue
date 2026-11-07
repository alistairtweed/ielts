<script setup>
import DropZone from './DropZone.vue'
import ChipList from './ChipList.vue'

// Drag-and-drop matching: a drop zone after each statement, answers in a column
// on the right. Used for sentence endings, and for matching tasks shown this way
// in the Listening demo (e.g. people to responsibilities).
// NOTE: the layout is confirmed for Listening matching; sentence endings
// themselves have not been seen in a live example.
defineProps({ session: Object, group: Object })
</script>

<template>
  <div class="mb-6 flex items-start gap-9">
    <div class="min-w-0 flex-1">
      <p v-for="q in group.questions" :key="q.n" class="mb-6 leading-[30px]">
        <span data-annotatable v-html="q.text" />
        <DropZone :session="session" :group="group" :n="q.n" class="ml-1" />
      </p>
    </div>
    <ChipList class="flex-none" :session="session" :group="group" :title="group.optionsTitle" />
  </div>
</template>
