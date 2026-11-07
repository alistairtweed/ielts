<script setup>
import { computed, ref } from 'vue'
import { picked, pick, place, readPayload, dragPayload, dragging } from '../engine/dragdrop.js'
import Chip from './Chip.vue'

// Drop target for one question.
//   empty:     1px dashed dark border, question number in bold
//   current:   2px dashed blue border
//   drag over: 1px dashed blue border
//   filled:    faint dashed border with the answer chip inside
// block: full-width zone (headings, above a paragraph); otherwise inline (summary, endings).
const props = defineProps({ session: Object, group: Object, n: Number, block: Boolean })

const over = ref(false)
const value = computed(() => props.session.state.answers[props.n])
const label = computed(() => props.group.options.find((o) => o.value === value.value)?.label ?? value.value)
const current = computed(() => props.session.state.current === props.n)

function onDrop(e) {
  over.value = false
  const p = readPayload(e)
  if (p && p.groupId === props.group.id) place(props.session, props.group, props.n, p.value, p.fromN)
}

function onClick() {
  if (picked.groupId === props.group.id) return place(props.session, props.group, props.n, picked.value, picked.fromN)
  props.session.goTo(props.n)
}

const border = computed(() => {
  if (over.value) return 'border border-dashed border-[#418ec8]'
  if (value.value) return 'border border-dashed border-[rgba(197,197,197,0.75)]'
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
    class="relative m-px h-6 items-center justify-center rounded-[5px] bg-white text-center align-middle"
    :class="[border, block ? 'flex w-4/5' : 'inline-flex min-w-[178px]']"
    @dragover.prevent="over = true"
    @dragleave="over = false"
    @drop.prevent="onDrop"
    @click.stop="onClick"
    @focus="session.goTo(n)"
    @keydown.delete="session.setAnswer(n, '')"
  >
    <Chip
      v-if="value"
      :label="label"
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
