<script setup>
import OrderNumber from './OrderNumber.vue'
import TextEntry from './TextEntry.vue'

// Sentence completion: separate sentences, each with its own question number and
// a blank where "[[n]]" appears in the text (not continuous text, unlike a summary).
const props = defineProps({ session: Object, group: Object })
const parts = (q) => q.text.split(/\[\[\d+\]\]/)
</script>

<template>
  <div class="mb-6">
    <p v-for="q in group.questions" :key="q.n" class="mb-4 flex leading-[30px]" @click="session.goTo(q.n)">
      <OrderNumber :label="q.n" :active="session.state.current === q.n" class="mt-0.5" />
      <span>
        <span data-annotatable v-html="parts(q)[0]" /><TextEntry :session="session" :n="q.n" /><span data-annotatable v-html="parts(q)[1] || ''" />
      </span>
    </p>
  </div>
</template>
