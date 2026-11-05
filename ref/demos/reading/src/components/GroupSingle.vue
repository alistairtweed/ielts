<script setup>
// One answer per question (TRUE/FALSE/NOT GIVEN, YES/NO/NOT GIVEN, multiple choice).
// legacy skin: accordion, only the current question's options are expanded.
// current skin: every question is listed with its options.
const props = defineProps({ group: Object, session: Object, skin: String })
const opts = (q) => q.options || props.group.options
const isLetterChoice = (q) => !!q.options
</script>

<template>
  <div class="group-single" :class="skin">
    <div
      v-for="q in group.questions"
      :id="`q-${q.n}`"
      :key="q.n"
      class="q-single"
      :class="{ current: session.state.current === q.n, open: skin !== 'legacy' || session.state.current === q.n }"
    >
      <div class="q-stem" @click="session.goTo(q.n)">
        <span class="q-num">{{ q.n }}</span>
        <span data-annotatable v-html="q.text" />
      </div>
      <div v-show="skin !== 'legacy' || session.state.current === q.n" class="q-options">
        <label v-for="o in opts(q)" :key="o.value" class="q-option">
          <input
            type="radio"
            :name="`q${q.n}`"
            :value="o.value"
            :checked="session.state.answers[q.n] === o.value"
            @change="session.setAnswer(q.n, o.value)"
            @focus="session.goTo(q.n)"
          />
          <span v-if="isLetterChoice(q)" class="q-option-letter">{{ o.value }}</span>
          <span>{{ o.label }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
