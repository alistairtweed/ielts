<script setup>
  import { computed } from "vue"
  import { GripVertical, X } from "lucide-vue-next"

  import AnswersInput from "~/components/builder/AnswersInput.vue"
  import CandidatesField from "~/components/builder/CandidatesField.vue"
  import { sectionsOf } from "~/builder/factories.js"
  import { candidateLabel, letter, typeOf } from "~/builder/questionTypes.js"
  import { numbering } from "~/builder/useBuilder.js"

  // One question: its text (if the type has any), its own options (multiple
  // choice) and its correct answer(s), in the form its type needs.
  const props = defineProps({ question: Object, group: Object, passage: Object, sortable: Boolean })
  const emit = defineEmits(["remove"])

  const spec = computed(() => typeOf(props.group))
  const numbers = computed(() => numbering.value.get(props.question.id) ?? {})
  const numberLabel = computed(() => (numbers.value.to > numbers.value.from ? `${numbers.value.from}–${numbers.value.to}` : numbers.value.from))

  const CONTENT_LABELS = {
    statement: "Statement",
    question: "Question",
    sentence: "Sentence (type ___ where the gap goes)",
    label: "Label (optional)",
    information: "Information",
    beginning: "Sentence beginning"
  }

  // Single answers are stored as a one-item array.
  const single = computed({
    get: () => props.question.correctAnswers[0] ?? "",
    set: (value) => (props.question.correctAnswers = value ? [value] : [])
  })
  function toggle(id) {
    const answers = props.question.correctAnswers
    if (answers.includes(id)) props.question.correctAnswers = answers.filter((a) => a !== id)
    else if (answers.length < 2) props.question.correctAnswers = [...answers, id]
  }
</script>

<template>
  <div class="flex gap-2 rounded-md border border-neutral-200 bg-white p-2.5">
    <div class="flex w-9 shrink-0 flex-col items-center gap-1">
      <GripVertical v-if="sortable" :size="16" class="question-handle cursor-grab text-neutral-400" />
      <span class="rounded bg-neutral-800 px-1.5 text-xs leading-5 font-semibold text-white tabular-nums">{{ numberLabel }}</span>
    </div>

    <div class="min-w-0 flex-1 space-y-2">
      <p v-if="spec.groupContent" class="text-xs text-neutral-500">Blank {{ numbers.from }} in the content above</p>

      <label v-if="spec.questionContent" class="block">
        <span class="field-label">{{ CONTENT_LABELS[spec.questionContent] }}</span>
        <input v-model="question.content" class="input w-full" />
      </label>

      <label v-if="spec.sectionRef" class="block">
        <span class="field-label">{{ group.sectionTerm }}</span>
        <select v-model="question.sectionKey" class="input">
          <option :value="null" disabled>Choose…</option>
          <option v-for="s in sectionsOf(passage)" :key="s.key" :value="s.key">{{ group.sectionTerm }} {{ s.label }}</option>
        </select>
      </label>

      <div v-if="spec.image" class="flex gap-3">
        <label class="block"><span class="field-label">Across (%)</span><input v-model.number="question.x" type="number" min="0" max="100" class="input w-20" /></label>
        <label class="block"><span class="field-label">Down (%)</span><input v-model.number="question.y" type="number" min="0" max="100" class="input w-20" /></label>
      </div>

      <CandidatesField v-if="spec.candidates === 'question'" v-model="question.candidates" title="Options" />

      <div>
        <span class="field-label">{{ spec.answer === "candidates" ? "Correct answers (choose two)" : spec.answer === "text" ? "Accepted answers" : "Correct answer" }}</span>
        <AnswersInput v-if="spec.answer === 'text'" v-model="question.correctAnswers" />
        <select v-else-if="spec.answer === 'fixed'" v-model="single" class="input">
          <option value="">Choose…</option>
          <option v-for="value in spec.fixed" :key="value">{{ value }}</option>
        </select>
        <select v-else-if="spec.answer === 'letter'" v-model="single" class="input">
          <option value="">Choose…</option>
          <option v-for="i in group.numSections" :key="i">{{ letter(i - 1) }}</option>
        </select>
        <select v-else-if="spec.answer === 'candidate'" v-model="single" class="input max-w-full">
          <option value="">Choose…</option>
          <option v-for="(c, i) in spec.candidates === 'group' ? group.candidates : question.candidates" :key="c.id" :value="c.id">
            {{ candidateLabel(spec.candidateLabels, i) }} {{ c.content ? `– ${c.content}` : "" }}
          </option>
        </select>
        <div v-else-if="spec.answer === 'candidates'" class="flex flex-wrap gap-3">
          <label v-for="(c, i) in question.candidates" :key="c.id" class="flex items-center gap-1 text-sm">
            <input type="checkbox" :checked="question.correctAnswers.includes(c.id)" @change="toggle(c.id)" />
            {{ letter(i) }}
          </label>
        </div>
      </div>
    </div>

    <button v-if="sortable" type="button" class="icon-button self-start" title="Remove question" @click="emit('remove')"><X :size="16" /></button>
  </div>
</template>
