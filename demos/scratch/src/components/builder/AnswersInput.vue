<script setup>
  import { ref } from "vue"
  import { X } from "lucide-vue-next"

  // Accepted answers as chips: type one and press Enter (or comma) to add it.
  // Every accepted spelling or form is a separate answer (colour, color).
  const answers = defineModel({ type: Array, default: () => [] })
  const draft = ref("")

  function add() {
    const value = draft.value.trim()
    if (value && !answers.value.includes(value)) answers.value = [...answers.value, value]
    draft.value = ""
  }
  const remove = (index) => (answers.value = answers.value.filter((_, i) => i !== index))
  function onBackspace() {
    if (!draft.value && answers.value.length) remove(answers.value.length - 1)
  }
</script>

<template>
  <div class="flex min-h-9 flex-wrap items-center gap-1 rounded-md border border-neutral-300 bg-white px-1.5 py-1 focus-within:border-indigo-400">
    <span v-for="(answer, i) in answers" :key="answer" class="inline-flex items-center gap-1 rounded bg-emerald-50 px-1.5 text-sm text-emerald-900 ring-1 ring-emerald-200">
      {{ answer }}
      <button type="button" class="text-emerald-700 hover:text-emerald-950" :aria-label="`Remove ${answer}`" @click="remove(i)"><X :size="12" /></button>
    </span>
    <input
      v-model="draft"
      class="min-w-24 flex-1 px-1 text-sm outline-none"
      :placeholder="answers.length ? 'Add another…' : 'Type an answer, press Enter'"
      @keydown.enter.prevent="add"
      @keydown.,.prevent="add"
      @keydown.backspace="onBackspace"
      @blur="add"
    />
  </div>
</template>
