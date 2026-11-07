import { mergeAttributes, Node } from "@tiptap/core"
import { VueNodeViewRenderer } from "@tiptap/vue-3"

import BlankComponent from "~/components/Blank.vue"

// A gap in the text. It only points at a question (persisted separately as a
// Question); its answers live on that question, not here. Its number comes from
// its position in the document.
//
// Options:
//   numberFor(questionId)  the blank's question number (when the editor is part of
//                          a test); otherwise blanks are numbered 1, 2, 3… in order
export const Blank = Node.create({
  name: "blank",
  group: "inline",
  inline: true,
  atom: true,
  selectable: true,

  addOptions() {
    return { numberFor: null }
  },

  addAttributes() {
    return {
      questionId: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-question-id"),
        renderHTML: (attributes) => ({ "data-question-id": attributes.questionId })
      }
    }
  },

  parseHTML() {
    return [{ tag: "span[data-blank]" }]
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes, { "data-blank": "" })]
  },

  addNodeView() {
    return VueNodeViewRenderer(BlankComponent)
  },

  addCommands() {
    return {
      // Insert a blank for a question. Until questions are created on the page,
      // a placeholder ID is generated.
      insertBlank:
        (questionId = crypto.randomUUID()) =>
        ({ state, tr, dispatch }) => {
          if (dispatch) tr.replaceSelectionWith(state.schema.nodes.blank.create({ questionId }), false).scrollIntoView()
          return true
        }
    }
  }
})

// Question IDs of the blanks in a document's JSON, in order.
export function blankIdsIn(json) {
  const ids = []
  const walk = (node) => {
    if (node.type === "blank") ids.push(node.attrs?.questionId)
    node.content?.forEach(walk)
  }
  if (json) walk(json)
  return ids
}

// [{ number, questionId }] in document order — what the page needs to list or
// create the questions that go with the blanks.
export function blanksIn(doc, startNumber = 1) {
  const blanks = []
  doc.descendants((node) => {
    if (node.type.name === "blank") blanks.push({ number: startNumber + blanks.length, questionId: node.attrs.questionId })
  })
  return blanks
}
