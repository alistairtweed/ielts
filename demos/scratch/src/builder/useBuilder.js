import { computed, reactive, watch } from "vue"

import { newQuestion, newTest } from "~/builder/factories.js"
import { spanOf } from "~/builder/questionTypes.js"
import { sampleTest } from "~/builder/sample.js"

// The test being built: one nested reactive object, the same shape as the JSON
// export. Nesting keeps the form simple (each card edits its own branch, and
// sorting is just reordering an array); everything derived — question numbers,
// labels, ranges — is computed from it, never stored.

const STORAGE_KEY = "ielts-reading-builder"

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
  } catch {
    return null
  }
}

export const test = reactive(load() ?? sampleTest())

// Autosave (debounced) so a refresh doesn't lose work.
let saveTimer
watch(
  test,
  () => {
    clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(test))
      } catch {}
    }, 400)
  },
  { deep: true }
)

export function replaceTest(data) {
  for (const key of Object.keys(test)) delete test[key]
  Object.assign(test, structuredClone(data))
}

export const resetToSample = () => replaceTest(sampleTest())
export const startNewTest = () => replaceTest(newTest())

// ------------------------------------------------------------------ numbering

// questionId → { from, to } (to > from for "choose TWO" questions)
export const numbering = computed(() => {
  const numbers = new Map()
  let next = 1
  for (const passage of test.passages) {
    for (const group of passage.questionGroups) {
      const span = spanOf(group)
      for (const question of group.questions) {
        numbers.set(question.id, { from: next, to: next + span - 1 })
        next += span
      }
    }
  }
  return numbers
})

export const numberFor = (questionId) => numbering.value.get(questionId)?.from

// { from, to } covering a list of questions, or null if there are none.
function rangeOf(questions) {
  if (!questions.length) return null
  return { from: numbering.value.get(questions[0].id)?.from, to: numbering.value.get(questions.at(-1).id)?.to }
}
export const groupRange = (group) => rangeOf(group.questions)
export const passageRange = (passage) => rangeOf(passage.questionGroups.flatMap((g) => g.questions))
export const formatRange = (range, joiner = "–") =>
  !range ? "" : range.from === range.to ? `${range.from}` : `${range.from}${joiner}${range.to}`

// ------------------------------------------------------- blanks and questions

// Questions removed with their blank, kept so that undo (or re-adding the blank)
// restores their answers.
const removedQuestions = new Map()

// Make a content-based group's questions follow the blanks in its content:
// one question per blank, in the same order.
export function syncQuestionsWithBlanks(group, blankIds) {
  const current = group.questions.map((q) => q.id)
  if (current.length === blankIds.length && current.every((id, i) => id === blankIds[i])) return

  const byId = new Map(group.questions.map((q) => [q.id, q]))
  for (const question of group.questions) if (!blankIds.includes(question.id)) removedQuestions.set(question.id, question)
  group.questions = blankIds.map((id) => byId.get(id) ?? removedQuestions.get(id) ?? newQuestion(group.type, id))
}

// ------------------------------------------------------------- import / export

export function exportJson() {
  const blob = new Blob([JSON.stringify(test, null, 2)], { type: "application/json" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = `${test.identifier || "reading-test"}.json`
  link.click()
  URL.revokeObjectURL(link.href)
}

export async function importJson(file) {
  const data = JSON.parse(await file.text())
  if (!Array.isArray(data.passages)) throw new Error("This file doesn't look like a reading test.")
  replaceTest(data)
}
