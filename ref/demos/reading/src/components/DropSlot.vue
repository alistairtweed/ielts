<script setup>
import { computed, ref } from 'vue'
import { picked, pick, place, readPayload, dragPayload } from '../engine/dragdrop.js'

// A drop target for one question number. Shows the question number when empty.
const props = defineProps({
  session: Object,
  group: Object,
  n: Number,
  wide: Boolean, // headings: full-width slot above a paragraph
})

const over = ref(false)
const value = computed(() => props.session.state.answers[props.n])
const label = computed(() => props.group.options.find((o) => o.value === value.value)?.label ?? value.value)
const isCurrent = computed(() => props.session.state.current === props.n)
const canPlace = computed(() => picked.groupId === props.group.id)

function onDrop(e) {
  over.value = false
  const p = readPayload(e)
  if (p && p.groupId === props.group.id) place(props.session, props.group, props.n, p.value, p.fromN)
}

function onClick() {
  if (canPlace.value) return place(props.session, props.group, props.n, picked.value, picked.fromN)
  props.session.goTo(props.n)
  // Clicking a filled slot picks its answer up again (click-to-move).
  if (value.value) pick(props.group.id, value.value, props.n)
}

function onKey(e) {
  if (e.key === 'Delete' || e.key === 'Backspace') props.session.setAnswer(props.n, '')
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    onClick()
  }
}
</script>

<template>
  <span
    :id="`q-${n}`"
    data-no-annotate
    tabindex="0"
    class="drop-slot"
    :class="{ filled: !!value, over, current: isCurrent, wide, armed: canPlace, picked: picked.fromN === n }"
    @dragover.prevent="over = true"
    @dragleave="over = false"
    @drop.prevent="onDrop"
    @click.stop="onClick"
    @keydown="onKey"
    @focus="session.goTo(n)"
  >
    <span
      v-if="value"
      class="drop-slot-value"
      draggable="true"
      @dragstart="dragPayload($event, group.id, value, n)"
    >{{ label }}</span>
    <span v-else class="drop-slot-number">{{ n }}</span>
  </span>
</template>
