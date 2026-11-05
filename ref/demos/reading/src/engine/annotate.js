// DOM helpers for highlights and notes.
//
// Annotatable regions are marked with the attribute data-annotatable. Their
// text is rendered with v-html from strings that never change, so Vue never
// re-renders them and the <mark> elements added here survive.
// Elements with data-no-annotate (drop zones, inputs) are skipped.

let counter = 0
export const newId = () => `ann${Date.now().toString(36)}${counter++}`

const scopeOf = (node) => (node.nodeType === 1 ? node : node.parentElement)?.closest('[data-annotatable]')

// Returns the current selection's range if it is non-empty and falls entirely
// inside a single annotatable region; otherwise null.
export function selectionRange() {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null
  const range = sel.getRangeAt(0)
  if (!range.toString().trim()) return null
  const a = scopeOf(range.startContainer)
  const b = scopeOf(range.endContainer)
  if (!a || a !== b) return null
  return range
}

// Wraps every text node in the range in <mark class="ann {cls}" data-ann="{id}">.
export function wrapRange(range, { id = newId(), cls = 'ann-hl' } = {}) {
  const root = range.commonAncestorContainer.nodeType === 3 ? range.commonAncestorContainer.parentNode : range.commonAncestorContainer
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      if (!range.intersectsNode(node)) return NodeFilter.FILTER_REJECT
      if (node.parentElement.closest('[data-no-annotate]')) return NodeFilter.FILTER_REJECT
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT
      return NodeFilter.FILTER_ACCEPT
    },
  })
  const nodes = []
  while (walker.nextNode()) nodes.push(walker.currentNode)
  // A selection inside a single text node: the walker root is that node's parent.
  if (!nodes.length && range.startContainer.nodeType === 3) nodes.push(range.startContainer)

  const marks = []
  for (let node of nodes) {
    const start = node === range.startContainer ? range.startOffset : 0
    const end = node === range.endContainer ? range.endOffset : node.length
    if (start >= end) continue
    if (end < node.length) node.splitText(end)
    if (start > 0) node = node.splitText(start)
    const mark = document.createElement('mark')
    mark.className = `ann ${cls}`
    mark.dataset.ann = id
    node.parentNode.insertBefore(mark, node)
    mark.appendChild(node)
    marks.push(mark)
  }
  window.getSelection()?.removeAllRanges()
  return { id, marks, quote: marks.map((m) => m.textContent).join('') }
}

export function unwrap(id, root = document) {
  root.querySelectorAll(`mark[data-ann="${id}"]`).forEach((mark) => {
    const parent = mark.parentNode
    while (mark.firstChild) parent.insertBefore(mark.firstChild, mark)
    parent.removeChild(mark)
    parent.normalize()
  })
}

export function unwrapAll(root, cls) {
  const ids = new Set([...root.querySelectorAll(`mark.ann${cls ? '.' + cls : ''}`)].map((m) => m.dataset.ann))
  ids.forEach((id) => unwrap(id, root))
  return [...ids]
}

export function annotationAt(target) {
  const mark = target?.closest?.('mark.ann')
  return mark ? { id: mark.dataset.ann, isNote: mark.classList.contains('ann-note'), el: mark } : null
}

// Bounding rect of a range's last line, for positioning popups.
export function rangeEndRect(range) {
  const rects = range.getClientRects()
  return rects.length ? rects[rects.length - 1] : range.getBoundingClientRect()
}
