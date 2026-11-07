<script setup>
import Rubric from './Rubric.vue'
import ChoiceInteraction from './ChoiceInteraction.vue'
import GapTemplate from './GapTemplate.vue'
import MatchMatrix from './MatchMatrix.vue'
import SentenceEndings from './SentenceEndings.vue'
import ShortAnswer from './ShortAnswer.vue'
import SentenceCompletion from './SentenceCompletion.vue'
import DiagramLabel from './DiagramLabel.vue'
import ChipList from './ChipList.vue'

// Questions column for the current interface. One block per question group.
defineProps({ part: Object, session: Object, showType: Boolean, idPrefix: { type: String, default: 'group-' } })
const title = (g) => (g.from === g.to ? `Question ${g.from}` : `Questions ${g.from}–${g.to}`)
const inGroup = (s, g) => s.state.current >= g.from && s.state.current <= g.to
</script>

<template>
  <div class="pl-[17px] pr-4 pt-4">
    <section v-for="(g, i) in part.groups" :id="`${idPrefix}${i}`" :key="g.id" class="mb-10">
      <div v-if="showType && g.gallery" class="mb-3 inline-block rounded bg-[#418ec8] px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
        {{ g.gallery }}
      </div>
      <Rubric :title="title(g)" :instructions="g.instructions" />

      <template v-if="g.type === 'single'">
        <ChoiceInteraction
          v-for="q in g.questions"
          :id="`q-${q.n}`"
          :key="q.n"
          :label="String(q.n)"
          :prompt="q.text"
          :options="q.options || g.options"
          :name="`q${q.n}`"
          :is-selected="(v) => session.state.answers[q.n] === v"
          :active="session.state.current === q.n"
          @select="(v) => session.setAnswer(q.n, v)"
          @focus="session.goTo(q.n)"
        />
      </template>

      <template v-else-if="g.type === 'multi'">
        <br />
        <ChoiceInteraction
          :id="`q-${g.from}`"
          :label="`${g.from}–${g.to}`"
          :prompt="g.stem"
          :options="g.options"
          type="checkbox"
          :name="`q${g.from}`"
          :is-selected="(v) => (session.state.answers[g.from] || []).includes(v)"
          :is-disabled="(v) => !(session.state.answers[g.from] || []).includes(v) && (session.state.answers[g.from] || []).length >= g.to - g.from + 1"
          :active="inGroup(session, g)"
          @select="(v) => session.toggleMulti(g, v)"
          @focus="session.goTo(g.from)"
        />
        <span v-for="k in g.to - g.from" :id="`q-${g.from + k}`" :key="k" />
      </template>

      <GapTemplate v-else-if="g.type === 'gap' || g.type === 'gapdrag'" :session="session" :group="g" />
      <MatchMatrix v-else-if="g.type === 'match' && g.display !== 'drag'" :session="session" :group="g" />
      <SentenceEndings v-else-if="g.type === 'match'" :session="session" :group="g" />
      <ShortAnswer v-else-if="g.type === 'short'" :session="session" :group="g" />
      <SentenceCompletion v-else-if="g.type === 'sentences'" :session="session" :group="g" />
      <DiagramLabel v-else-if="g.type === 'diagram'" :session="session" :group="g" />
      <ChipList v-else-if="g.type === 'headings'" :session="session" :group="g" :title="g.optionsTitle" />
    </section>
  </div>
</template>
