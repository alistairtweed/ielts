<script setup>
import { computed } from 'vue'
import TextEntry from './TextEntry.vue'
import DropZone from './DropZone.vue'
import ChipList from './ChipList.vue'

// Completion tasks built from an HTML template with [[n]] tokens:
// notes, table and summary (from the text, or from a list shown in a column on the right).
// The template is rendered once with v-html; a Vue component is teleported into
// each token's placeholder.
const props = defineProps({ session: Object, group: Object })

const html = computed(() =>
  props.group.template.replace(/\[\[(\d+)\]\]/g, (_, n) => `<span id="gap-${props.group.id}-${n}"></span>`),
)
const numbers = computed(() => Array.from({ length: props.group.to - props.group.from + 1 }, (_, i) => props.group.from + i))
</script>

<template>
  <div class="qti-content mb-6" :class="{ 'flex items-start gap-9': group.type === 'gapdrag' }">
    <div :class="{ 'min-w-0 flex-1': group.type === 'gapdrag' }">
      <h2 v-if="group.title" data-annotatable v-html="group.title" />
      <div v-html="html" />
    </div>
    <template v-for="n in numbers" :key="n">
      <Teleport defer :to="`#gap-${group.id}-${n}`">
        <TextEntry v-if="group.type === 'gap'" :session="session" :n="n" />
        <DropZone v-else :session="session" :group="group" :n="n" />
      </Teleport>
    </template>
    <ChipList v-if="group.type === 'gapdrag'" class="flex-none" :session="session" :group="group" :title="group.optionsTitle" />
  </div>
</template>
