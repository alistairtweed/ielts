import { WORD_LIMITS, letter, plural, roman } from "~/builder/questionTypes.js"
import { sectionsOf } from "~/builder/factories.js"

// Instructions for a question group, in the wording of the paper test.
// Returns { lines: [html…], key: [[term, meaning]…] | null }.
//   context: { passage, passageNumber, range: "1–6" }

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"]
const words = (n) => NUMBER_WORDS[n] ?? String(n)

const boxes = (range) => `in boxes ${range} on your answer sheet`
const letters = (count) => `<b>A–${letter(Math.max(count, 1) - 1)}</b>`
const nb = (group) => (group.moreThanOnce ? ["<b>NB</b> You may use any letter more than once."] : [])

function choose(group) {
  return `Choose <b>${WORD_LIMITS[group.wordLimit] ?? "ONE WORD ONLY"}</b> from the passage for each answer.`
}

const TEXT_TASKS = {
  "complete-the-notes": (g) => `Complete the ${g.completeWhat ?? "notes"} below.`,
  "complete-the-summary-from-text": () => "Complete the summary below.",
  "complete-the-sentences": () => "Complete the sentences below.",
  "short-answer": () => "Answer the questions below.",
  "label-the-diagram": () => "Label the diagram below."
}

export function rubric(group, { passage, passageNumber, range }) {
  const passageName = `Reading Passage ${passageNumber}`

  if (TEXT_TASKS[group.type]) {
    return { lines: [TEXT_TASKS[group.type](group), choose(group), `Write your answers ${boxes(range)}.`], key: null }
  }

  switch (group.type) {
    case "true-false-not-given":
      return {
        lines: [`Do the following statements agree with the information given in ${passageName}?`, `In boxes ${range} on your answer sheet, write`],
        key: [
          ["TRUE", "if the statement agrees with the information"],
          ["FALSE", "if the statement contradicts the information"],
          ["NOT GIVEN", "if there is no information on this"]
        ]
      }

    case "yes-no-not-given":
      return {
        lines: [`Do the following statements agree with the claims of the writer in ${passageName}?`, `In boxes ${range} on your answer sheet, write`],
        key: [
          ["YES", "if the statement agrees with the claims of the writer"],
          ["NO", "if the statement contradicts the claims of the writer"],
          ["NOT GIVEN", "if it is impossible to say what the writer thinks about this"]
        ]
      }

    case "match-the-paragraph-information": {
      const n = group.numSections
      return {
        lines: [
          `${passageName} has ${words(n)} ${plural(group.sectionTerm)}, ${letters(n)}.`,
          `Which ${group.sectionTerm} contains the following information?`,
          `Write the correct letter, ${letters(n)}, ${boxes(range)}.`,
          ...nb(group)
        ],
        key: null
      }
    }

    case "match-the-paragraph-headings": {
      const n = sectionsOf(passage).length
      const headings = group.candidates.length
      return {
        lines: [
          `${passageName} has ${words(n)} ${plural(group.sectionTerm)}, ${letters(n)}.`,
          `Choose the correct heading for each ${group.sectionTerm} from the list of headings below.`,
          `Write the correct number, <b>i–${roman(Math.max(headings, 1) - 1)}</b>, ${boxes(range)}.`
        ],
        key: null
      }
    }

    case "match-the-statements": {
      const n = group.candidates.length
      return {
        lines: [
          `Look at the following ${plural(group.questionTerm)} (Questions ${range}) and the list of ${plural(group.candidateTerm)} below.`,
          `Match each ${group.questionTerm} with the correct ${group.candidateTerm}, ${letters(n)}.`,
          `Write the correct letter, ${letters(n)}, ${boxes(range)}.`,
          ...nb(group)
        ],
        key: null
      }
    }

    case "match-the-sentence-endings": {
      const n = group.candidates.length
      return {
        lines: [`Complete each sentence with the correct ending, ${letters(n)}, below.`, `Write the correct letter, ${letters(n)}, ${boxes(range)}.`],
        key: null
      }
    }

    case "complete-the-summary-from-list": {
      const n = group.candidates.length
      return {
        lines: [`Complete the summary using the list of ${plural(group.candidateTerm)}, ${letters(n)}, below.`, `Write the correct letter, ${letters(n)}, ${boxes(range)}.`],
        key: null
      }
    }

    case "multiple-choice-one": {
      const most = Math.max(4, ...group.questions.map((q) => q.candidates.length))
      const options = Array.from({ length: most }, (_, i) => `<b>${letter(i)}</b>`)
      return {
        lines: [`Choose the correct letter, ${options.slice(0, -1).join(", ")} or ${options.at(-1)}.`, `Write the correct letter ${boxes(range)}.`],
        key: null
      }
    }

    case "multiple-choice-two":
      return { lines: [], key: null } // instructions are given for each question pair

    default:
      return { lines: [], key: null }
  }
}

// Instructions for one "choose TWO" question.
export function chooseTwoRubric(question, numbers) {
  return [
    `Choose <b>TWO</b> letters, ${letters(question.candidates.length)}.`,
    `Write the correct letters in boxes ${numbers.from} and ${numbers.to} on your answer sheet.`
  ]
}
