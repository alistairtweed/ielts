<script setup>
import { computed } from 'vue'
import DropSlot from './DropSlot.vue'
import OptionList from './OptionList.vue'

// Gaps inside a template (notes, summary, sentence completion).
// type 'gap': typed answers. type 'gapdrag': answers dragged from a list.
// The template is rendered once with v-html; each [[n]] token becomes an empty
// span that a Vue component is teleported into.
const props = defineProps({ group: Object, session: Object, skin: String })

const html = computed(() =>
  props.group.template.replace(/\[\[(\d+)\]\]/g, (_, n) => `<span class="gap-host" id="gap-${props.group.id}-${n}"></span>`),
)
const numbers = computed(() => {
  const a = []
  for (let n = props.group.from; n <= props.group.to; n++) a.push(n)
  return a
})
</script>

<template>
  <div class="group-gap">
    <h3 v-if="group.title" class="gap-title" data-annotatable v-html="group.title" />
    <div class="gap-body" v-html="html" />
    <template v-for="n in numbers" :key="n">
      <Teleport defer :to="`#gap-${group.id}-${n}`">
        <input
          v-if="group.type === 'gap'"
          :id="`q-${n}`"
          class="gap-input"
          :class="{ current: session.state.current === n }"
          type="text"
          autocomplete="off"
          spellcheck="false"
          :placeholder="String(n)"
          :value="session.state.answers[n] || ''"
          @input="session.setAnswer(n, $event.target.value)"
          @focus="session.goTo(n)"
        />
        <DropSlot v-else :session="session" :group="group" :n="n" />
      </Teleport>
    </template>
    <OptionList v-if="group.type === 'gapdrag'" :session="session" :group="group" class="mt-4" />
  </div>
</template>
