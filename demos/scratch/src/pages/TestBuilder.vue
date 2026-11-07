<script setup>
  import { ref } from "vue"
  import { VueDraggable } from "vue-draggable-plus"
  import { Download, FilePlus2, FlaskConical, Plus, Upload } from "lucide-vue-next"

  import PassageForm from "~/components/builder/PassageForm.vue"
  import TestPreview from "~/components/preview/TestPreview.vue"
  import { newPassage } from "~/builder/factories.js"
  import { exportJson, importJson, resetToSample, startNewTest, test } from "~/builder/useBuilder.js"

  // Reading test builder: print preview on the left, the form on the right.
  const fileInput = ref(null)

  async function onImport(event) {
    const file = event.target.files[0]
    event.target.value = ""
    if (!file) return
    try {
      await importJson(file)
    } catch (error) {
      alert(error.message)
    }
  }
  const confirmThen = (message, action) => confirm(message) && action()
</script>

<template>
  <div class="flex h-dvh flex-col">
    <header class="flex h-12 shrink-0 items-center gap-2 border-b border-neutral-300 bg-white px-4">
      <h1 class="font-bold">Reading test builder</h1>
      <RouterLink to="/editor" class="ml-3 text-sm text-neutral-500 underline">Editor playground</RouterLink>
      <div class="ml-auto flex gap-2">
        <button type="button" class="button-secondary" @click="confirmThen('Replace this test with the sample test?', resetToSample)"><FlaskConical :size="16" /> Sample</button>
        <button type="button" class="button-secondary" @click="confirmThen('Start a new, empty test? This test will be replaced.', startNewTest)"><FilePlus2 :size="16" /> New</button>
        <button type="button" class="button-secondary" @click="fileInput.click()"><Upload :size="16" /> Import</button>
        <input ref="fileInput" type="file" accept="application/json,.json" class="hidden" @change="onImport" />
        <button type="button" class="button" @click="exportJson"><Download :size="16" /> Export JSON</button>
      </div>
    </header>

    <div class="grid min-h-0 flex-1 grid-cols-2">
      <!-- Preview -->
      <div class="min-h-0 overflow-y-auto bg-neutral-200 p-6">
        <TestPreview />
      </div>

      <!-- Form -->
      <div class="min-h-0 space-y-4 overflow-y-auto border-l border-neutral-300 bg-neutral-100 p-6">
        <div class="grid grid-cols-[10rem_1fr] gap-3">
          <label class="block"><span class="field-label">Identifier</span><input v-model="test.identifier" class="input w-full" placeholder="e.g. R15.2" /></label>
          <label class="block"><span class="field-label">Name</span><input v-model="test.name" class="input w-full" placeholder="e.g. Practice Test 2" /></label>
        </div>

        <VueDraggable v-model="test.passages" handle=".passage-handle" :animation="150" class="space-y-4">
          <PassageForm
            v-for="(passage, i) in test.passages"
            :key="passage.id"
            :passage="passage"
            :number="i + 1"
            @remove="test.passages.splice(i, 1)"
          />
        </VueDraggable>
        <button type="button" class="button" @click="test.passages.push(newPassage())"><Plus :size="16" /> Add passage</button>
      </div>
    </div>
  </div>
</template>
