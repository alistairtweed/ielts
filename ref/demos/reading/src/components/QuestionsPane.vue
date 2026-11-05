<script setup>
import GroupSingle from './GroupSingle.vue'
import GroupMulti from './GroupMulti.vue'
import GroupGap from './GroupGap.vue'
import GroupMatch from './GroupMatch.vue'
import OptionList from './OptionList.vue'

defineProps({ part: Object, session: Object, skin: String })
const range = (g) => (g.from === g.to ? `Question ${g.from}` : `Questions ${g.from}–${g.to}`)
</script>

<template>
  <div class="questions">
    <section v-for="g in part.groups" :key="g.id" class="q-group">
      <h3 class="q-group-title">{{ range(g) }}</h3>
      <p class="q-group-instructions" data-annotatable v-html="g.instructions" />
      <GroupSingle v-if="g.type === 'single'" :group="g" :session="session" :skin="skin" />
      <GroupMulti v-else-if="g.type === 'multi'" :group="g" :session="session" :skin="skin" />
      <GroupGap v-else-if="g.type === 'gap' || g.type === 'gapdrag'" :group="g" :session="session" :skin="skin" />
      <GroupMatch v-else-if="g.type === 'match'" :group="g" :session="session" :skin="skin" />
      <OptionList v-else-if="g.type === 'headings'" :session="session" :group="g" :show-letters="false" />
    </section>
  </div>
</template>
