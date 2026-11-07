<script setup>
import { computed } from 'vue'
import { picked, pick, dragPayload, readPayload, usedValues, dragging } from '../engine/dragdrop.js'
import Chip from './Chip.vue'

// The list of draggable answers (a vertical column).
// A single-use answer that has been placed leaves an empty space where it was,
// and fades while it is being dragged. A reusable answer stays solid and lifted.
// Dropping a placed answer back on the list removes it from its gap.
const props = defineProps({ session: Object, group: Object, title: String })

const used = computed(() => usedValues(props.session, props.group))
const bold = computed(() => props.group.type === 'headings')
const isDragged = (o) => dragging.groupId === props.group.id && dragging.value === o.value && dragging.fromN === null

function onDrop(e) {
  const p = readPayload(e)
  if (p && p.groupId === props.group.id && p.fromN !== null) props.session.setAnswer(p.fromN, '')
}
</script>

<template>
  <div data-no-annotate @dragover.prevent @drop.prevent="onDrop">
    <h4 v-if="title" class="mb-2 font-bold">{{ title }}</h4>
    <div class="mb-4 flex flex-col items-start rounded-[5px]">
      <Chip
        v-for="o in group.options"
        :key="o.value"
        :class="[bold ? 'm-[3px_3px_8px]' : 'm-[3px]', { invisible: !group.reuse && used.has(o.value) }]"
        :label="o.label"
        :bold="bold"
        :faded="!group.reuse && isDragged(o)"
        :lifted="group.reuse && isDragged(o)"
        :picked="picked.groupId === group.id && picked.value === o.value && picked.fromN === null"
        @dragstart="dragPayload($event, group.id, o.value)"
        @click="pick(group.id, o.value)"
        @keydown.enter.prevent="pick(group.id, o.value)"
      />
    </div>
  </div>
</template>
