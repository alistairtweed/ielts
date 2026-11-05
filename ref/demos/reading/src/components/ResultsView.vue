<script setup>
import { computed } from 'vue'

// Self-study addition: not part of the real test, which gives no instant results.
const props = defineProps({ session: Object })
const r = computed(() => props.session.results())
const emit = defineEmits(['restart'])
</script>

<template>
  <div class="results mx-auto max-w-3xl p-6">
    <h1 class="mb-1 text-2xl font-bold">Results</h1>
    <p class="mb-6 text-sm opacity-70">
      Demo addition for self-study. The real test does not show results on screen.
    </p>
    <div class="mb-6 flex gap-4">
      <div class="rounded border border-current/20 p-4">
        <div class="text-sm opacity-70">Raw score</div>
        <div class="text-3xl font-bold">{{ r.raw }} / {{ r.total }}</div>
      </div>
      <div class="rounded border border-current/20 p-4">
        <div class="text-sm opacity-70">Approximate band</div>
        <div class="text-3xl font-bold">{{ r.band.toFixed(1) }}</div>
      </div>
    </div>
    <table class="w-full border-collapse text-left text-sm">
      <thead>
        <tr class="border-b border-current/30">
          <th class="py-2 pr-2">Q</th>
          <th class="py-2 pr-2">Your answer</th>
          <th class="py-2 pr-2">Correct answer</th>
          <th class="py-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in r.rows" :key="row.n" class="border-b border-current/10">
          <td class="py-1.5 pr-2 font-bold">{{ row.n }}</td>
          <td class="py-1.5 pr-2">{{ row.given || '—' }}</td>
          <td class="py-1.5 pr-2">{{ row.expected }}</td>
          <td class="py-1.5 font-bold" :class="row.correct ? 'text-green-700' : 'text-red-700'">{{ row.correct ? '✔' : '✘' }}</td>
        </tr>
      </tbody>
    </table>
    <button class="mt-6 rounded bg-black px-4 py-2 text-white" @click="emit('restart')">Start again</button>
  </div>
</template>
