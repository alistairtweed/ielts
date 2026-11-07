<script setup>
  import { VueDraggable } from "vue-draggable-plus"
  import { GripVertical, Plus, X } from "lucide-vue-next"

  import { newCandidate } from "~/builder/factories.js"
  import { candidateLabel } from "~/builder/questionTypes.js"

  // A sortable list of candidates (options). Labels (A, B… or i, ii…) follow the order.
  const candidates = defineModel({ type: Array, required: true })
  defineProps({ title: String, labels: { type: String, default: "letters" } })
</script>

<template>
  <div>
    <p v-if="title" class="field-label">{{ title }}</p>
    <VueDraggable v-model="candidates" handle=".candidate-handle" :animation="150" class="space-y-1">
      <div v-for="(candidate, i) in candidates" :key="candidate.id" class="flex items-center gap-1.5">
        <GripVertical :size="16" class="candidate-handle shrink-0 cursor-grab text-neutral-400" />
        <span class="w-6 shrink-0 text-center text-sm font-semibold text-neutral-600">{{ candidateLabel(labels, i) }}</span>
        <input v-model="candidate.content" class="input flex-1" placeholder="Option text" />
        <button type="button" class="icon-button" title="Remove option" @click="candidates.splice(i, 1)"><X :size="16" /></button>
      </div>
    </VueDraggable>
    <button type="button" class="link-button mt-1.5" @click="candidates.push(newCandidate())"><Plus :size="14" /> Add option</button>
  </div>
</template>
