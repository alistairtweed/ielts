<script setup>
  import { computed, ref } from "vue"
  import { VueDraggable } from "vue-draggable-plus"
  import { ChevronDown, GripVertical, Plus, Trash2 } from "lucide-vue-next"

  import CandidatesField from "~/components/builder/CandidatesField.vue"
  import ContentEditor from "~/components/ContentEditor.vue"
  import QuestionForm from "~/components/builder/QuestionForm.vue"
  import { newQuestion, sectionsOf } from "~/builder/factories.js"
  import { COMPLETE_WHAT, SECTION_TERMS, WORD_LIMITS, typeOf } from "~/builder/questionTypes.js"
  import { formatRange, groupRange, numberFor, syncQuestionsWithBlanks } from "~/builder/useBuilder.js"
  import { blankIdsIn } from "~/extensions/blanks.js"

  // One question group: its settings, content (with blanks), shared options and questions.
  const props = defineProps({ group: Object, passage: Object })
  const emit = defineEmits(["remove"])

  const open = ref(true)
  const spec = computed(() => typeOf(props.group))
  const range = computed(() => formatRange(groupRange(props.group)))
  const has = (setting) => setting in props.group && setting in (spec.value.settings ?? {})

  // Content-based groups: the blanks are the questions.
  const content = computed({
    get: () => props.group.content,
    set: (value) => {
      props.group.content = value
      syncQuestionsWithBlanks(props.group, blankIdsIn(value))
    }
  })

  function remove() {
    if (confirm("Delete this question group and its questions?")) emit("remove")
  }
</script>

<template>
  <div class="rounded-lg border border-neutral-300 bg-neutral-50">
    <div class="flex items-center gap-2 px-3 py-2">
      <GripVertical :size="16" class="group-handle cursor-grab text-neutral-400" />
      <button type="button" class="flex min-w-0 flex-1 items-center gap-2 text-left" @click="open = !open">
        <ChevronDown :size="16" class="shrink-0 transition-transform" :class="{ '-rotate-90': !open }" />
        <span class="font-semibold">Questions {{ range || "–" }}</span>
        <span class="truncate text-sm text-neutral-500">{{ spec.name }}</span>
      </button>
      <button type="button" class="icon-button" title="Delete question group" @click="remove"><Trash2 :size="16" /></button>
    </div>

    <div v-show="open" class="space-y-4 border-t border-neutral-200 px-3 py-3">
      <!-- Settings -->
      <div v-if="spec.settings || spec.image" class="flex flex-wrap gap-3">
        <label v-if="has('wordLimit')" class="block">
          <span class="field-label">Word limit</span>
          <select v-model="group.wordLimit" class="input">
            <option v-for="(text, key) in WORD_LIMITS" :key="key" :value="key">{{ text }}</option>
          </select>
        </label>
        <label v-if="has('completeWhat')" class="block">
          <span class="field-label">Complete the…</span>
          <select v-model="group.completeWhat" class="input">
            <option v-for="(text, key) in COMPLETE_WHAT" :key="key" :value="key">{{ text }}</option>
          </select>
        </label>
        <label v-if="has('sectionTerm')" class="block">
          <span class="field-label">Sections are called</span>
          <select v-model="group.sectionTerm" class="input">
            <option v-for="term in SECTION_TERMS" :key="term">{{ term }}</option>
          </select>
        </label>
        <label v-if="has('numSections')" class="block">
          <span class="field-label">Number of {{ group.sectionTerm }}s</span>
          <input v-model.number="group.numSections" type="number" min="2" max="15" class="input w-20" />
          <span v-if="sectionsOf(passage).length !== group.numSections" class="ml-2 text-xs text-amber-700">passage has {{ sectionsOf(passage).length }}</span>
        </label>
        <label v-if="has('questionTerm')" class="block">
          <span class="field-label">Questions are</span>
          <input v-model="group.questionTerm" class="input w-32" />
        </label>
        <label v-if="has('candidateTerm')" class="block">
          <span class="field-label">Options are</span>
          <input v-model="group.candidateTerm" class="input w-32" />
        </label>
        <label v-if="has('moreThanOnce')" class="flex items-center gap-1.5 self-end pb-2 text-sm">
          <input v-model="group.moreThanOnce" type="checkbox" /> Letters may be used more than once
        </label>
        <label v-if="spec.image" class="block min-w-64 flex-1">
          <span class="field-label">Diagram image URL</span>
          <input v-model="group.imageUrl" class="input w-full" placeholder="https://…" />
        </label>
      </div>

      <!-- Content with blanks -->
      <div v-if="spec.groupContent">
        <p class="field-label">Content <span class="font-normal normal-case text-neutral-500">— insert a blank where each answer goes</span></p>
        <ContentEditor v-model="content" preset="group" :number-for="numberFor" />
      </div>

      <!-- Shared options -->
      <CandidatesField
        v-if="spec.candidates === 'group'"
        v-model="group.candidates"
        :labels="spec.candidateLabels"
        :title="group.type === 'match-the-paragraph-headings' ? 'Headings' : 'Options'"
      />

      <!-- Questions -->
      <div>
        <p class="field-label">Questions</p>
        <p v-if="spec.groupContent && !group.questions.length" class="text-sm text-neutral-500">No blanks yet.</p>
        <VueDraggable v-model="group.questions" handle=".question-handle" :animation="150" :disabled="spec.groupContent" class="space-y-2">
          <QuestionForm
            v-for="(question, i) in group.questions"
            :key="question.id"
            :question="question"
            :group="group"
            :passage="passage"
            :sortable="!spec.groupContent"
            @remove="group.questions.splice(i, 1)"
          />
        </VueDraggable>
        <button v-if="!spec.groupContent" type="button" class="link-button mt-2" @click="group.questions.push(newQuestion(group.type))">
          <Plus :size="14" /> Add question
        </button>
      </div>
    </div>
  </div>
</template>
