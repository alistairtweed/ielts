import { Node } from "@tiptap/core"
import { Plugin, PluginKey } from "@tiptap/pm/state"
import { canJoin } from "@tiptap/pm/transform"

// A passage is one or more sections, each wrapping ordinary paragraphs, lists, etc.
// Labels (A, B, C…) come from order and are never stored, so questions refer to a
// section by its key.
export const Section = Node.create({
  name: "section",
  group: "section",
  content: "block+",
  defining: true,
  isolating: true,

  addAttributes() {
    return {
      key: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-key"),
        renderHTML: (attributes) => ({ "data-key": attributes.key })
      }
    }
  },

  parseHTML() {
    return [{ tag: "section" }]
  },

  renderHTML({ HTMLAttributes }) {
    return ["section", HTMLAttributes, 0]
  },

  addCommands() {
    return {
      // Start a new section at the block the cursor is in.
      splitSection:
        () =>
        ({ state, tr, dispatch }) => {
          const { $from } = state.selection
          const depth = sectionDepth($from)
          if (depth == null) return false

          const blockStart = $from.before(depth + 1)
          if (blockStart === $from.start(depth)) return false // already the first block

          if (dispatch) {
            tr.split(blockStart, 1, [{ type: state.schema.nodes.section, attrs: { key: newKey() } }])
            dispatch(tr.scrollIntoView())
          }
          return true
        },

      // Join the cursor's section onto the one before it.
      mergeSectionWithPrevious:
        () =>
        ({ state, tr, dispatch }) => {
          const { $from } = state.selection
          const depth = sectionDepth($from)
          if (depth == null) return false

          const before = $from.before(depth)
          const previous = state.doc.resolve(before).nodeBefore
          if (previous?.type.name !== "section" || !canJoin(state.doc, before)) return false

          if (dispatch) dispatch(tr.join(before).scrollIntoView())
          return true
        }
    }
  },

  // Every section gets a key, and keys stay unique (pasting can copy one).
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("sectionKeys"),
        appendTransaction: (transactions, _oldState, newState) =>
          transactions.some((t) => t.docChanged) ? assignKeys(newState) : null
      })
    ]
  },

  // Content loaded at start-up hasn't been through a transaction yet.
  onCreate() {
    const tr = assignKeys(this.editor.state)
    if (tr) this.editor.view.dispatch(tr)
  }
})

function assignKeys(state) {
  const seen = new Set()
  const tr = state.tr
  state.doc.forEach((node, pos) => {
    if (node.type.name !== "section") return
    if (!node.attrs.key || seen.has(node.attrs.key)) tr.setNodeAttribute(pos, "key", newKey())
    else seen.add(node.attrs.key)
  })
  return tr.docChanged ? tr.setMeta("addToHistory", false) : null
}

// The top-level node: sections only.
export const PassageDocument = Node.create({
  name: "doc",
  topNode: true,
  content: "section+"
})

function sectionDepth($pos) {
  for (let depth = $pos.depth; depth > 0; depth--) {
    if ($pos.node(depth).type.name === "section") return depth
  }
  return null
}

const newKey = () => crypto.randomUUID()
