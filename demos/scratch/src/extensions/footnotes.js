import { Node } from "@tiptap/core"

// A footnote: a small-print line, typically a glossary entry at the end of a
// passage ("*plumbago: a soft black mineral"). Stored as <p data-footnote>.
export const Footnote = Node.create({
  name: "footnote",
  group: "block",
  content: "inline*",

  parseHTML() {
    // Higher priority than the plain paragraph rule, which would also match <p>.
    return [{ tag: "p[data-footnote]", priority: 60 }]
  },

  renderHTML({ HTMLAttributes }) {
    return ["p", { ...HTMLAttributes, "data-footnote": "" }, 0]
  },

  addCommands() {
    return {
      setFootnote:
        () =>
        ({ commands }) =>
          commands.setNode(this.name)
    }
  }
})
