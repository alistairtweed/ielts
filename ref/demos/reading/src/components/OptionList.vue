<script setup>
import { computed } from 'vue'
import { picked, pick, dragPayload, readPayload, usedValues } from '../engine/dragdrop.js'

// The list of draggable answers for a match / gapdrag / headings group.
// Dropping a placed answer back onto the list removes it from its slot.
const props = defineProps({
  session: Object,
  group: Object,
  showLetters: { type: Boolean, default: true },
})

const used = computed(() => usedValues(props.session, props.group))
const visible = computed(() => props.group.options.filter((o) => props.group.reuse || !used.value.has(o.value)))

function onDrop(e) {
  const p = readPayload(e)
  if (p && p.groupId === props.group.id && p.fromN !== null) props.session.setAnswer(p.fromN, '')
}
</script>

<template>
  <div class="option-list" data-no-annotate @dragover.prevent @drop.prevent="onDrop">
    <div v-if="group.optionsTitle" class="option-list-title">{{ group.optionsTitle }}</div>
    <div
      v-for="o in visible"
      :key="o.value"
      class="option-chip"
      :class="{ picked: picked.groupId === group.id && picked.value === o.value && picked.fromN === null }"
      draggable="true"
      tabindex="0"
      @dragstart="dragPayload($event, group.id, o.value)"
      @click="pick(group.id, o.value)"
      @keydown.enter.prevent="pick(group.id, o.value)"
      @keydown.space.prevent="pick(group.id, o.value)"
    >
      <template v-if="showLetters && o.label !== o.value"><b class="mr-2">{{ o.value }}</b></template>{{ o.label }}
    </div>
  </div>
</template>
