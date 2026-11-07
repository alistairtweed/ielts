<script setup>
import OrderNumber from './OrderNumber.vue'

// Matching as a table of radio buttons: one row per statement, one column per
// option (paragraph letter, person, etc.). Named options are listed above.
// NOTE: styled to match the other interactions; not yet checked against a live
// example of this interaction.
const props = defineProps({ session: Object, group: Object })
const named = props.group.options.some((o) => o.label !== o.value)
const answer = (n) => props.session.state.answers[n]
</script>

<template>
  <div>
    <div v-if="named" class="mb-4">
      <h4 v-if="group.optionsTitle" class="mb-2 font-bold">{{ group.optionsTitle }}</h4>
      <div v-for="o in group.options" :key="o.value" class="flex leading-6">
        <b class="w-8 flex-none">{{ o.value }}</b><span>{{ o.label }}</span>
      </div>
    </div>
    <table class="mb-6 w-full border-collapse" role="grid" data-no-annotate>
      <thead>
        <tr>
          <th class="border border-[#d5d5d5] bg-[#f1f2ec]"></th>
          <th
            v-for="o in group.options"
            :key="o.value"
            class="w-11 border border-[#d5d5d5] bg-[#f1f2ec] py-2 text-center font-bold"
          >{{ o.value }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="q in group.questions" :id="`q-${q.n}`" :key="q.n" role="radiogroup" class="group">
          <td class="border border-[#d5d5d5] px-2 py-2 group-hover:bg-[#e4e4e4]" @click="session.goTo(q.n)">
            <div class="flex">
              <OrderNumber :label="q.n" :active="session.state.current === q.n" />
              <span class="leading-6" data-annotatable v-html="q.text" />
            </div>
          </td>
          <td
            v-for="o in group.options"
            :key="o.value"
            class="border border-[#d5d5d5] p-0 text-center"
            :class="answer(q.n) === o.value ? 'bg-[#bbd8f0]' : 'group-hover:bg-[#e4e4e4]'"
          >
            <label class="flex h-full min-h-11 w-full cursor-pointer items-center justify-center">
              <input
                type="radio"
                :name="`q${q.n}`"
                :value="o.value"
                :aria-label="`Question ${q.n}: ${o.label}`"
                :checked="answer(q.n) === o.value"
                @change="session.setAnswer(q.n, o.value)"
                @focus="session.goTo(q.n)"
              />
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
