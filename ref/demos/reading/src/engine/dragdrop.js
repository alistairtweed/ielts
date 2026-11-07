import { reactive } from 'vue'

// Shared state for drag-and-drop questions (match, gapdrag, headings).
// Supports mouse drag (HTML5 DnD) and click-to-pick-then-click-to-place.
export const picked = reactive({ groupId: null, value: null, fromN: null })

export function pick(groupId, value, fromN = null) {
  if (picked.groupId === groupId && picked.value === value && picked.fromN === fromN) return clearPick()
  Object.assign(picked, { groupId, value, fromN })
}

export function clearPick() {
  Object.assign(picked, { groupId: null, value: null, fromN: null })
}

// The item currently being dragged (so its source can be shown faded).
export const dragging = reactive({ groupId: null, value: null, fromN: null })

export function dragPayload(e, groupId, value, fromN = null) {
  e.dataTransfer.setData('application/json', JSON.stringify({ groupId, value, fromN }))
  e.dataTransfer.effectAllowed = 'move'
  Object.assign(dragging, { groupId, value, fromN })
}

// Reset at document level: the dragged element may unmount when it is dropped,
// in which case it never receives its own dragend event.
const resetDragging = () => Object.assign(dragging, { groupId: null, value: null, fromN: null })
if (typeof document !== 'undefined') {
  document.addEventListener('dragend', resetDragging, true)
  document.addEventListener('drop', () => setTimeout(resetDragging), true)
}

export function readPayload(e) {
  try {
    return JSON.parse(e.dataTransfer.getData('application/json'))
  } catch {
    return null
  }
}

// Place a value into slot n of a group, handling moves and single-use options.
export function place(session, group, n, value, fromN = null) {
  const { answers } = session.state
  // Moving a placed answer empties its old slot.
  if (fromN !== null && fromN !== n) answers[fromN] = ''
  if (!group.reuse) {
    // A single-use option can only sit in one slot at a time.
    for (let k = group.from; k <= group.to; k++) if (k !== n && answers[k] === value) answers[k] = ''
  }
  answers[n] = value
  session.goTo(n)
  clearPick()
}

export function usedValues(session, group) {
  const s = new Set()
  for (let k = group.from; k <= group.to; k++) if (session.state.answers[k]) s.add(session.state.answers[k])
  return s
}
