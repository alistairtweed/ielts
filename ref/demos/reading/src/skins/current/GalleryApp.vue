<script setup>
import test from '../../data/galleryTest.js'
import { createSession } from '../../engine/session.js'
import { useFollowCurrent } from '../../engine/follow.js'
import Passage from '../../components/Passage.vue'
import QuestionsPane from '../../interactions/QuestionsPane.vue'
import ResultsView from '../../components/ResultsView.vue'
import { ref } from 'vue'

// Every Reading interaction on one page, in the current interface's style.
const session = createSession(test)
session.state.stage = 'test'
useFollowCurrent(session)
const part = test.parts[0]
const showResults = ref(false)
const jump = (i) => document.getElementById(`group-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
</script>

<template>
  <div class="skin-current flex h-full flex-col">
    <header class="flex h-14 flex-none items-center gap-4 border-b border-[#d5d5d5] px-4">
      <a href="#/" class="text-sm underline">← Demos</a>
      <h1 class="font-bold">Interaction gallery</h1>
      <select class="ml-4 border border-[#535353] px-2 py-1 text-sm" @change="jump($event.target.value)">
        <option value="" disabled selected>Jump to a question type…</option>
        <option v-for="(g, i) in part.groups" :key="i" :value="i">{{ g.gallery }}</option>
      </select>
      <button class="ml-auto bg-black px-4 py-1.5 text-sm text-white" @click="showResults = !showResults">
        {{ showResults ? 'Back to questions' : 'Check answers' }}
      </button>
    </header>
    <main v-if="showResults" class="flex-1 overflow-auto"><ResultsView :session="session" @restart="showResults = false" /></main>
    <div v-else class="flex min-h-0 flex-1">
      <div class="w-1/2 overflow-y-auto px-4 pb-8 pt-6"><Passage :part="part" :session="session" skin="current" /></div>
      <div class="w-[2px] flex-none bg-black/50" />
      <div class="flex-1 overflow-y-auto pb-40 pt-2"><QuestionsPane :part="part" :session="session" show-type /></div>
    </div>
  </div>
</template>
