import { reactive, computed } from 'vue'
import { checkGroup, rawToBand } from './scoring.js'

// Creates the state for one sitting of a test. Shared by both interface skins.
export function createSession(test) {
  // Flat index of question numbers -> { n, part, group }
  const index = []
  test.parts.forEach((part, pi) => {
    part.groups.forEach((group, gi) => {
      group.id = `p${pi}g${gi}`
      for (let n = group.from; n <= group.to; n++) index.push({ n, partIndex: pi, group })
    })
  })
  const byNumber = Object.fromEntries(index.map((q) => [q.n, q]))

  const state = reactive({
    stage: 'details', // details | instructions | test | review | finished
    answers: {}, // question number -> string; multi groups store an array at group.from
    flags: {}, // question number -> true (marked for review)
    current: index[0].n,
    remaining: test.durationMinutes * 60,
    notes: [], // { id, partIndex, quote, text }
  })

  const currentPartIndex = computed(() => byNumber[state.current]?.partIndex ?? 0)

  function groupOf(n) {
    return byNumber[n]?.group
  }

  function isAttempted(n) {
    const g = groupOf(n)
    if (!g) return false
    if (g.type === 'multi') {
      const sel = state.answers[g.from] || []
      return sel.length >= n - g.from + 1
    }
    const v = state.answers[n]
    return v !== undefined && v !== null && String(v).trim() !== ''
  }

  function setAnswer(n, value) {
    state.answers[n] = value
  }

  function toggleMulti(group, value) {
    const max = group.to - group.from + 1
    const sel = [...(state.answers[group.from] || [])]
    const i = sel.indexOf(value)
    if (i >= 0) sel.splice(i, 1)
    else if (sel.length < max) sel.push(value)
    state.answers[group.from] = sel
  }

  function toggleFlag(n) {
    state.flags[n] = !state.flags[n]
  }

  function goTo(n) {
    if (byNumber[n]) state.current = n
  }

  function step(delta) {
    const i = index.findIndex((q) => q.n === state.current)
    const next = index[i + delta]
    if (next) state.current = next.n
    return !!next
  }

  function partQuestions(pi) {
    return index.filter((q) => q.partIndex === pi).map((q) => q.n)
  }

  function attemptedCount(pi) {
    return partQuestions(pi).filter(isAttempted).length
  }

  function results() {
    const rows = []
    let raw = 0
    test.parts.forEach((part) =>
      part.groups.forEach((group) => {
        const r = checkGroup(group, state.answers)
        r.forEach((row) => {
          raw += row.correct ? 1 : 0
          rows.push(row)
        })
      }),
    )
    rows.sort((a, b) => a.n - b.n)
    return { raw, total: index.length, band: rawToBand(raw), rows }
  }

  return {
    test,
    state,
    index,
    currentPartIndex,
    groupOf,
    isAttempted,
    setAnswer,
    toggleMulti,
    toggleFlag,
    goTo,
    step,
    partQuestions,
    attemptedCount,
    results,
  }
}
