import { typeOf } from "~/builder/questionTypes.js"

// New, empty pieces of a test. Identifiers are generated here; human-friendly
// labels (Passage 1, Questions 7–13, A, B, C…) are always worked out from order.

export const uid = () => crypto.randomUUID()

export const emptyPassageContent = () => ({
  type: "doc",
  content: [{ type: "section", attrs: { key: uid() }, content: [{ type: "paragraph" }] }]
})

export const emptyGroupContent = () => ({ type: "doc", content: [{ type: "paragraph" }] })

export const newTest = () => ({ id: uid(), identifier: "", name: "", passages: [newPassage()] })

export const newPassage = () => ({
  id: uid(),
  title: "",
  subtitle: "",
  content: emptyPassageContent(),
  questionGroups: []
})

export const newCandidate = (content = "") => ({ id: uid(), content })

export function newQuestion(type, id = uid()) {
  const spec = typeOf({ type })
  const question = { id, correctAnswers: [] }
  if (spec.questionContent) question.content = ""
  if (spec.candidates === "question") question.candidates = [newCandidate(), newCandidate(), newCandidate(), newCandidate()]
  if (spec.sectionRef) question.sectionKey = null
  if (spec.image) Object.assign(question, { x: 50, y: 50 })
  return question
}

// `passage` is used to start matching tasks with the passage's number of sections.
export function newGroup(type, passage) {
  const spec = typeOf({ type })
  const group = { id: uid(), type, ...structuredClone(spec.settings ?? {}) }
  if ("numSections" in group) group.numSections = Math.max(sectionsOf(passage).length, 2)
  if (spec.groupContent) group.content = emptyGroupContent()
  if (spec.image) group.imageUrl = ""
  if (spec.candidates === "group") group.candidates = [newCandidate(), newCandidate(), newCandidate()]
  // Content-based groups get their questions from blanks; others start with one.
  group.questions = spec.groupContent ? [] : [newQuestion(type)]
  return group
}

// The top-level sections of a passage's content: [{ key, label }].
export function sectionsOf(passage) {
  const sections = (passage?.content?.content ?? []).filter((node) => node.type === "section")
  return sections.map((node, index) => ({ key: node.attrs?.key, label: String.fromCharCode(65 + index) }))
}
