<script setup>
import DropSlot from './DropSlot.vue'
import OptionList from './OptionList.vue'

// Matching (information to paragraphs, features to people, etc.).
// legacy skin + legacyDisplay 'grid': a table of radio cells, as in the 2019 demo.
// Otherwise: drag the options into a slot beside each statement.
const props = defineProps({ group: Object, session: Object, skin: String })
const grid = props.skin === 'legacy' && props.group.display !== 'drag'
const hasNamedOptions = props.group.options.some((o) => o.label !== o.value)
</script>

<template>
  <div class="group-match">
    <table v-if="grid" class="match-grid" data-no-annotate>
      <thead>
        <tr>
          <th></th>
          <th v-for="o in group.options" :key="o.value">{{ o.value }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="q in group.questions"
          :id="`q-${q.n}`"
          :key="q.n"
          :class="{ current: session.state.current === q.n }"
          @click="session.goTo(q.n)"
        >
          <td class="match-stem"><b class="mr-2">{{ q.n }}</b>{{ q.text }}</td>
          <td
            v-for="o in group.options"
            :key="o.value"
            class="match-cell"
            :class="{ chosen: session.state.answers[q.n] === o.value }"
            @click="session.setAnswer(q.n, session.state.answers[q.n] === o.value ? '' : o.value)"
          >
            <span v-if="session.state.answers[q.n] === o.value">✔</span>
          </td>
        </tr>
      </tbody>
    </table>

    <template v-else>
      <div v-for="q in group.questions" :key="q.n" class="match-row" :class="{ current: session.state.current === q.n }">
        <span class="match-text" data-annotatable v-html="q.text" />
        <DropSlot :session="session" :group="group" :n="q.n" />
      </div>
    </template>

    <!-- Options: a reference table (legacy grid) or draggable chips -->
    <table v-if="grid && hasNamedOptions" class="options-table" data-no-annotate>
      <thead><tr><th colspan="2">{{ group.optionsTitle }}</th></tr></thead>
      <tbody>
        <tr v-for="o in group.options" :key="o.value"><td><b>{{ o.value }}</b></td><td>{{ o.label }}</td></tr>
      </tbody>
    </table>
    <OptionList v-if="!grid" :session="session" :group="group" class="mt-4" />
  </div>
</template>
