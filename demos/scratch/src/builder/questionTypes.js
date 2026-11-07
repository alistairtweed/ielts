// The 14 Reading question types, and how each is built, edited and marked.
//
//   family           completion | verification | matching | choice (for grouping in menus)
//   groupContent     the group has rich content (notes, table, summary) whose blanks
//                    ARE its questions: questions follow the blanks, in order
//   questionContent  what each question's text is ("statement", "question"…), or null
//   candidates       "group"    shared list (people, headings, words, endings)
//                    "question" each question has its own (multiple choice)
//   candidateLabels  "letters" (A, B, C…) or "roman" (i, ii, iii…)
//   answer           "text"       accepted answers, typed
//                    "fixed"      one of `fixed` (TRUE/FALSE/NOT GIVEN…)
//                    "letter"     a paragraph letter, A to numSections
//                    "candidate"  one candidate (stored by id)
//                    "candidates" two candidates (multiple choice, two answers)
//   span             question numbers each question uses (2 for "choose TWO")
//   settings         which group settings apply, with their defaults

export const QUESTION_TYPES = {
  "complete-the-notes": {
    name: "Complete the notes / table",
    family: "completion",
    groupContent: true,
    answer: "text",
    settings: { completeWhat: "notes", wordLimit: "one-word-only" }
  },
  "complete-the-summary-from-text": {
    name: "Complete the summary (from text)",
    family: "completion",
    groupContent: true,
    answer: "text",
    settings: { wordLimit: "one-word-only" }
  },
  "complete-the-summary-from-list": {
    name: "Complete the summary (from list)",
    family: "completion",
    groupContent: true,
    candidates: "group",
    candidateLabels: "letters",
    answer: "candidate",
    settings: { candidateTerm: "word" }
  },
  "complete-the-sentences": {
    name: "Complete the sentences",
    family: "completion",
    questionContent: "sentence",
    answer: "text",
    settings: { wordLimit: "one-word-only" }
  },
  "label-the-diagram": {
    name: "Label the diagram",
    family: "completion",
    questionContent: "label",
    image: true,
    answer: "text",
    settings: { wordLimit: "one-word-only" }
  },
  "short-answer": {
    name: "Short answer",
    family: "completion",
    questionContent: "question",
    answer: "text",
    settings: { wordLimit: "no-more-than-two-words" }
  },
  "true-false-not-given": {
    name: "True / False / Not Given",
    family: "verification",
    questionContent: "statement",
    answer: "fixed",
    fixed: ["TRUE", "FALSE", "NOT GIVEN"]
  },
  "yes-no-not-given": {
    name: "Yes / No / Not Given",
    family: "verification",
    questionContent: "statement",
    answer: "fixed",
    fixed: ["YES", "NO", "NOT GIVEN"]
  },
  "match-the-paragraph-information": {
    name: "Match the paragraph information",
    family: "matching",
    questionContent: "information",
    answer: "letter",
    settings: { sectionTerm: "paragraph", numSections: 5, moreThanOnce: false }
  },
  "match-the-paragraph-headings": {
    name: "Match the paragraph headings",
    family: "matching",
    sectionRef: true, // each question is a section of the passage
    candidates: "group",
    candidateLabels: "roman",
    answer: "candidate",
    settings: { sectionTerm: "section" }
  },
  "match-the-statements": {
    name: "Match the statements",
    family: "matching",
    questionContent: "statement",
    candidates: "group",
    candidateLabels: "letters",
    answer: "candidate",
    settings: { questionTerm: "statement", candidateTerm: "person", moreThanOnce: false }
  },
  "match-the-sentence-endings": {
    name: "Match the sentence endings",
    family: "matching",
    questionContent: "beginning",
    candidates: "group",
    candidateLabels: "letters",
    answer: "candidate"
  },
  "multiple-choice-one": {
    name: "Multiple choice (one)",
    family: "choice",
    questionContent: "question",
    candidates: "question",
    candidateLabels: "letters",
    answer: "candidate"
  },
  "multiple-choice-two": {
    name: "Multiple choice (two)",
    family: "choice",
    questionContent: "question",
    candidates: "question",
    candidateLabels: "letters",
    answer: "candidates",
    span: 2
  }
}

export const FAMILIES = { completion: "Completion", verification: "Verification", matching: "Matching", choice: "Choice" }

export const WORD_LIMITS = {
  "one-word-only": "ONE WORD ONLY",
  "one-word-and-or-a-number": "ONE WORD AND/OR A NUMBER",
  "no-more-than-two-words": "NO MORE THAN TWO WORDS",
  "no-more-than-two-words-and-or-a-number": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
  "no-more-than-three-words": "NO MORE THAN THREE WORDS",
  "no-more-than-three-words-and-or-a-number": "NO MORE THAN THREE WORDS AND/OR A NUMBER",
  "a-number": "A NUMBER"
}

export const COMPLETE_WHAT = { notes: "notes", table: "table", "flow-chart": "flow-chart" }

export const SECTION_TERMS = ["paragraph", "section"]

export const typeOf = (group) => QUESTION_TYPES[group.type]
export const spanOf = (group) => typeOf(group).span ?? 1

const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii", "xiv", "xv"]
export const letter = (index) => String.fromCharCode(65 + index)
export const roman = (index) => ROMAN[index] ?? String(index + 1)
export const candidateLabel = (scheme, index) => (scheme === "roman" ? roman(index) : letter(index))

// "person" → "people", "statement" → "statements"
export const plural = (word) => ({ person: "people", company: "companies", country: "countries", researcher: "researchers" })[word] ?? (word.endsWith("s") ? word : `${word}s`)
