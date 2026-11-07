<script setup>
  import { computed, ref } from "vue"
  import { VueDraggable } from "vue-draggable-plus"
  import { ChevronDown, GripVertical, Plus, Trash2 } from "lucide-vue-next"

  import ContentEditor from "~/components/ContentEditor.vue"
  import GroupForm from "~/components/builder/GroupForm.vue"
  import { newGroup } from "~/builder/factories.js"
  import { FAMILIES, QUESTION_TYPES } from "~/builder/questionTypes.js"
  import { formatRange, passageRange } from "~/builder/useBuilder.js"

  // One passage: title, subtitle, text, and its question groups.
  const props = defineProps({ passage: Object, number: Number })
  const emit = defineEmits(["remove"])

  const open = ref(true)
  const range = computed(() => formatRange(passageRange(props.passage)))
  const newType = ref("")
  const typesByFamily = Object.entries(FAMILIES).map(([family, name]) => ({
    name,
    types: Object.entries(QUESTION_TYPES).filter(([, spec]) => spec.family === family)
  }))

  function addGroup() {
    if (!newType.value) return
    props.passage.questionGroups.push(newGroup(newType.value, props.passage))
    newType.value = ""
  }
  function remove() {
    if (confirm(`Delete passage ${props.number} and all its questions?`)) emit("remove")
  }
</script>

<template>
  <div class="rounded-xl border border-neutral-300 bg-white shadow-sm">
    <div class="flex items-center gap-2 px-4 py-3">
      <GripVertical :size="18" class="passage-handle cursor-grab text-neutral-400" />
      <button type="button" class="flex min-w-0 flex-1 items-center gap-2 text-left" @click="open = !open">
        <ChevronDown :size="18" class="shrink-0 transition-transform" :class="{ '-rotate-90': !open }" />
        <span class="text-lg font-bold">Passage {{ number }}</span>
        <span class="truncate text-sm text-neutral-500">{{ range ? `Questions ${range}` : "No questions" }} · {{ passage.title || "Untitled" }}</span>
      </button>
      <button type="button" class="icon-button" title="Delete passage" @click="remove"><Trash2 :size="18" /></button>
    </div>

    <div v-show="open" class="space-y-4 border-t border-neutral-200 px-4 py-4">
      <div class="grid grid-cols-2 gap-3">
        <label class="block"><span class="field-label">Title</span><input v-model="passage.title" class="input w-full" /></label>
        <label class="block"><span class="field-label">Subtitle</span><input v-model="passage.subtitle" class="input w-full" /></label>
      </div>

      <div>
        <p class="field-label">Text <span class="font-normal normal-case text-neutral-500">— divide it into sections if questions refer to paragraphs</span></p>
        <ContentEditor v-model="passage.content" preset="passage" />
      </div>

      <div>
        <p class="field-label">Question groups</p>
        <VueDraggable v-model="passage.questionGroups" handle=".group-handle" :animation="150" class="space-y-3">
          <GroupForm
            v-for="(group, i) in passage.questionGroups"
            :key="group.id"
            :group="group"
            :passage="passage"
            @remove="passage.questionGroups.splice(i, 1)"
          />
        </VueDraggable>
        <div class="mt-3 flex gap-2">
          <select v-model="newType" class="input">
            <option value="" disabled>Choose a question type…</option>
            <optgroup v-for="family in typesByFamily" :key="family.name" :label="family.name">
              <option v-for="[key, spec] in family.types" :key="key" :value="key">{{ spec.name }}</option>
            </optgroup>
          </select>
          <button type="button" class="button" :disabled="!newType" @click="addGroup"><Plus :size="16" /> Add question group</button>
        </div>
      </div>
    </div>
  </div>
</template>
