<script setup>
import { computed, ref, watch } from 'vue'
import { picked, pick, place, readPayload, dragPayload, dragging } from '../engine/dragdrop.js'
import Chip from './Chip.vue'

// Drop target for one question.
//   empty:            1px dashed dark border, question number in bold
//   current:          2px dashed blue border
//   while dragging:   empty zones of the same group get a 1px dashed bright-blue border
//   under the cursor: grey background (also when it is the zone the answer came from)
//   filled:           faint dashed border with the answer chip inside
// block: full-width zone (headings, above a paragraph); otherwise inline.
const props = defineProps({ session: Object, group: Object, n: Number, block: Boolean })

const over = ref(false)
const value = computed(() => props.session.state.answers[props.n])
const label = computed(() => props.group.options.find((o) => o.value === value.value)?.label ?? value.value)
const current = computed(() => props.session.state.current === props.n)
const dragActive = computed(() => dragging.groupId === props.group.id)
const bold = computed(() => props.group.type === 'headings')
watch(dragActive, (active) => active || (over.value = false))

function onDrop(e) {
  over.value = false
  const p = readPayload(e)
  if (p && p.groupId === props.group.id) place(props.session, props.group, props.n, p.value, p.fromN)
}

// Ignore dragleave events fired when moving over the zone's own children.
function onLeave(e) {
  if (!e.currentTarget.contains(e.relatedTarget)) over.value = false
}

function onClick() {
  if (picked.groupId === props.group.id) return place(props.session, props.group, props.n, picked.value, picked.fromN)
  props.session.goTo(props.n)
}

const border = computed(() => {
  if (value.value) return 'border border-dashed border-[rgba(197,197,197,0.75)]'
  if (dragActive.value) return 'border border-dashed border-[#0e98f0]'
  if (current.value) return 'border-2 border-dashed border-[#418ec8]'
  return 'border border-dashed border-[#333]'
})
</script>

<template>
  <span
    :id="`q-${n}`"
    data-drop
    data-no-annotate
    role="button"
    tabindex="0"
    :aria-label="`Question ${n}`"
    class="relative m-px items-center justify-center rounded-[5px] text-center align-middle"
    :class="[
      border,
      over && dragActive ? 'bg-[rgba(0,0,0,0.25)]' : value ? 'bg-transparent' : 'bg-white',
      block ? 'flex h-6 w-4/5' : 'inline-flex h-[27px] min-w-[124px]',
    ]"
    @dragenter.prevent="over = true"
    @dragover.prevent="over = true"
    @dragleave="onLeave"
    @drop.prevent="onDrop"
    @click.stop="onClick"
    @focus="session.goTo(n)"
    @keydown.delete="session.setAnswer(n, '')"
  >
    <Chip
      v-if="value"
      :label="label"
      :bold="bold"
      fill
      :active="current"
      :faded="dragging.fromN === n"
      :picked="picked.fromN === n"
      @dragstart="dragPayload($event, group.id, value, n)"
      @click.stop="(session.goTo(n), pick(group.id, value, n))"
    />
    <span v-else class="font-bold leading-6">{{ n }}</span>
  </span>
</template>
