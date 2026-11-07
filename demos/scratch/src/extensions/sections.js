import { Node } from "@tiptap/core"
import { Plugin, PluginKey } from "@tiptap/pm/state"
import { NodeRange } from "@tiptap/pm/model"
import { canJoin } from "@tiptap/pm/transform"

// A passage mixes ordinary blocks (title, subtitle, footnotes) with sections, each
// wrapping paragraphs, lists, etc. Labels (A, B, C…) come from the order of the
// sections and are never stored, so questions refer to a section by its key.
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
      //   inside a section: split it, so this block begins the next section
      //   outside a section: wrap this block and the ordinary blocks after it (up to
      //   the next section or footnote) in a new section
      splitSection:
        () =>
        ({ state, tr, dispatch }) => {
          const { $from } = state.selection
          const depth = sectionDepth($from)

          if (depth == null) {
            const range = runFrom(state.doc, $from.index(0))
            if (!range) return false
            if (dispatch) dispatch(tr.wrap(range, [{ type: state.schema.nodes.section, attrs: { key: newKey() } }]).scrollIntoView())
            return true
          }

          const blockStart = $from.before(depth + 1)
          if (blockStart === $from.start(depth)) return false // already the first block

          if (dispatch) {
            tr.split(blockStart, 1, [{ type: state.schema.nodes.section, attrs: { key: newKey() } }])
            dispatch(tr.scrollIntoView())
          }
          return true
        },

      // Join the cursor's section onto the section before it. If there isn't one
      // (the text before it is ordinary blocks, or nothing), the section is removed
      // and its content becomes ordinary blocks again.
      mergeSectionWithPrevious:
        () =>
        ({ state, tr, dispatch }) => {
          const { $from } = state.selection
          const depth = sectionDepth($from)
          if (depth == null) return false

          const before = $from.before(depth)
          const previous = state.doc.resolve(before).nodeBefore
          if (previous?.type.name === "section") {
            if (!canJoin(state.doc, before)) return false
            if (dispatch) dispatch(tr.join(before).scrollIntoView())
            return true
          }

          // (lift() can't be used here: sections are isolating, which stops it.)
          const section = $from.node(depth)
          if (dispatch) dispatch(tr.replaceWith(before, before + section.nodeSize, section.content).scrollIntoView())
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

// The top-level node: ordinary blocks and sections, in any order.
export const PassageDocument = Node.create({
  name: "doc",
  topNode: true,
  content: "(block | section)+"
})

// The top-level blocks from `index` up to (not including) the next section or
// footnote, as a range that can be wrapped. Null if the block at `index` can't start one.
function runFrom(doc, index) {
  const stops = (node) => node.type.name === "section" || node.type.name === "footnote"
  if (index >= doc.childCount || stops(doc.child(index))) return null
  let end = index
  while (end + 1 < doc.childCount && !stops(doc.child(end + 1))) end++
  let from = 0
  for (let i = 0; i < index; i++) from += doc.child(i).nodeSize
  let to = from
  for (let i = index; i <= end; i++) to += doc.child(i).nodeSize
  return new NodeRange(doc.resolve(from), doc.resolve(to), 0)
}

function sectionDepth($pos) {
  for (let depth = $pos.depth; depth > 0; depth--) {
    if ($pos.node(depth).type.name === "section") return depth
  }
  return null
}

const newKey = () => crypto.randomUUID()
