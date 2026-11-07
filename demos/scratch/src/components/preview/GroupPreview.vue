<script setup>
  import { computed } from "vue"

  import RichContent from "~/components/preview/RichContent.js"
  import { chooseTwoRubric, rubric } from "~/builder/rubrics.js"
  import { candidateLabel, letter, plural, typeOf } from "~/builder/questionTypes.js"
  import { sectionsOf } from "~/builder/factories.js"
  import { formatRange, groupRange, numberFor, numbering } from "~/builder/useBuilder.js"

  // One question group, printed: heading, instructions, then the questions in the
  // layout for their type.
  const props = defineProps({ group: Object, passage: Object, passageNumber: Number })

  const spec = computed(() => typeOf(props.group))
  const range = computed(() => groupRange(props.group))
  const heading = computed(() => {
    const r = range.value
    if (!r) return "Questions"
    if (r.from === r.to) return `Question ${r.from}`
    return r.to === r.from + 1 ? `Questions ${r.from} and ${r.to}` : `Questions ${r.from}–${r.to}`
  })
  const instructions = computed(() =>
    rubric(props.group, { passage: props.passage, passageNumber: props.passageNumber, range: formatRange(range.value) || "…" })
  )

  const sectionLabel = (key) => sectionsOf(props.passage).find((s) => s.key === key)?.label ?? "?"
  const candidateTitle = computed(() => {
    const type = props.group.type
    if (type === "match-the-paragraph-headings") return "List of Headings"
    if (type === "match-the-sentence-endings") return null
    const term = plural(props.group.candidateTerm ?? "option")
    return `List of ${term.charAt(0).toUpperCase()}${term.slice(1)}`
  })
  const label = (index) => candidateLabel(spec.value.candidateLabels, index)
  const numbers = (q) => numbering.value.get(q.id) ?? {}
  const sentence = (text) => (text || "").split("___")
</script>

<template>
  <div class="print-group">
    <!-- "Choose TWO" groups give each question pair its own heading instead -->
    <h3 v-if="spec.span !== 2" class="print-questions">{{ heading }}</h3>
    <p v-for="(line, i) in instructions.lines" :key="i" class="print-instruction" v-html="line" />
    <table v-if="instructions.key" class="print-key">
      <tr v-for="[term, meaning] in instructions.key" :key="term">
        <td><strong>{{ term }}</strong></td>
        <td>{{ meaning }}</td>
      </tr>
    </table>

    <!-- List of headings comes before the questions -->
    <div v-if="group.type === 'match-the-paragraph-headings'" class="print-box">
      <p class="print-box-title">{{ candidateTitle }}</p>
      <div v-for="(c, i) in group.candidates" :key="c.id" class="print-option">
        <span class="print-option-label">{{ label(i) }}</span><span>{{ c.content || "…" }}</span>
      </div>
    </div>

    <!-- Content with blanks (notes, table, summary) -->
    <template v-if="spec.groupContent">
      <div class="print-box print-box-content">
        <RichContent :doc="group.content" :number-for="numberFor" />
      </div>
    </template>

    <!-- Diagram with numbered labels -->
    <div v-else-if="spec.image" class="relative my-4 inline-block min-h-48 min-w-full border border-neutral-300 bg-neutral-50">
      <img v-if="group.imageUrl" :src="group.imageUrl" alt="" class="block max-w-full" />
      <p v-else class="p-4 text-sm text-neutral-400">Diagram image</p>
      <span
        v-for="q in group.questions"
        :key="q.id"
        class="absolute -translate-x-1/2 -translate-y-1/2 bg-white/90 px-1 whitespace-nowrap"
        :style="{ left: `${q.x}%`, top: `${q.y}%` }"
      >
        <strong>{{ numbers(q).from }}</strong> …………… <span v-if="q.content" class="text-sm">{{ q.content }}</span>
      </span>
    </div>

    <!-- Multiple choice -->
    <template v-else-if="spec.candidates === 'question'">
      <div v-for="q in group.questions" :key="q.id" class="print-mcq">
        <template v-if="spec.span === 2">
          <h3 class="print-questions">Questions {{ numbers(q).from }} and {{ numbers(q).to }}</h3>
          <p v-for="(line, i) in chooseTwoRubric(q, numbers(q))" :key="i" class="print-instruction" v-html="line" />
        </template>
        <div class="print-question">
          <strong v-if="spec.span !== 2" class="print-number">{{ numbers(q).from }}</strong>
          <span>{{ q.content || "…" }}</span>
        </div>
        <div v-for="(c, i) in q.candidates" :key="c.id" class="print-option print-option-indent">
          <span class="print-option-label">{{ letter(i) }}</span><span>{{ c.content || "…" }}</span>
        </div>
      </div>
    </template>

    <!-- One line per question -->
    <template v-else>
      <div v-for="q in group.questions" :key="q.id" class="print-question">
        <strong class="print-number">{{ numbers(q).from }}</strong>
        <span v-if="spec.sectionRef">{{ group.sectionTerm.charAt(0).toUpperCase() + group.sectionTerm.slice(1) }} {{ sectionLabel(q.sectionKey) }}</span>
        <span v-else-if="spec.questionContent === 'sentence'">
          <template v-for="(part, i) in sentence(q.content)" :key="i">
            <span v-if="i" class="whitespace-nowrap"> …………………… </span>{{ part }}
          </template>
        </span>
        <span v-else>{{ q.content || "…" }}</span>
      </div>
    </template>

    <!-- Shared list after the questions (people, endings, words) -->
    <div v-if="spec.candidates === 'group' && group.type !== 'match-the-paragraph-headings'" class="print-box">
      <p v-if="candidateTitle" class="print-box-title">{{ candidateTitle }}</p>
      <div :class="group.type === 'complete-the-summary-from-list' ? 'grid grid-cols-3 gap-x-6' : ''">
        <div v-for="(c, i) in group.candidates" :key="c.id" class="print-option">
          <span class="print-option-label">{{ label(i) }}</span><span>{{ c.content || "…" }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
