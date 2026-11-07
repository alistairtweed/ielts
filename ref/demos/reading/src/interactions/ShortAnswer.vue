<script setup>
import TextEntry from './TextEntry.vue'

// Short-answer questions: each question followed by a typed answer box.
defineProps({ session: Object, group: Object })
</script>

<template>
  <div class="mb-6">
    <p v-for="q in group.questions" :key="q.n" class="my-4 leading-6">
      <span data-annotatable v-html="q.text" />
      <br />
      <TextEntry :session="session" :n="q.n" class="!ml-0 mt-1" />
    </p>
  </div>
</template>
