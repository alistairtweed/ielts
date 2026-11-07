<script setup>
import OrderNumber from './OrderNumber.vue'
import TextEntry from './TextEntry.vue'

// Short-answer questions: numbered question, with the blank underneath.
defineProps({ session: Object, group: Object })
</script>

<template>
  <div class="mb-6">
    <div v-for="q in group.questions" :key="q.n" class="mb-5" @click="session.goTo(q.n)">
      <p class="mb-1.5 flex">
        <OrderNumber :label="q.n" :active="session.state.current === q.n" />
        <span class="leading-6" data-annotatable v-html="q.text" />
      </p>
      <div class="pl-[33px]"><TextEntry :session="session" :n="q.n" class="!ml-0" /></div>
    </div>
  </div>
</template>
