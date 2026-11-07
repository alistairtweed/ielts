import { mergeAttributes, Node } from "@tiptap/core"
import { VueNodeViewRenderer } from "@tiptap/vue-3"

import BlankView from "~/extensions/BlankView.vue"

// A gap in the text. It only points at a question (persisted separately as a
// Question); its answers live on that question, not here. Its number comes from
// its position in the document.
//
// Options:
//   startNumber()  question number of the first blank in this editor (a function,
//                  so it can follow page state)
export const Blank = Node.create({
  name: "blank",
  group: "inline",
  inline: true,
  atom: true,
  selectable: true,

  addOptions() {
    return { startNumber: () => 1 }
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
    return VueNodeViewRenderer(BlankView)
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

// [{ number, questionId }] in document order — what the page needs to list or
// create the questions that go with the blanks.
export function blanksIn(doc, startNumber = 1) {
  const blanks = []
  doc.descendants((node) => {
    if (node.type.name === "blank") blanks.push({ number: startNumber + blanks.length, questionId: node.attrs.questionId })
  })
  return blanks
}
