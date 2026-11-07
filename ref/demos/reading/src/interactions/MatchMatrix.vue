<script setup>
import OrderNumber from './OrderNumber.vue'

// Matching as a table of radio buttons (paragraph information, statements).
// Styled from a screenshot of the live test:
//   light grey frame around the table
//   letters across the top; 2px black rule under the header row and down the
//   left of the first option column; 1px rules between option columns and rows
//   radio buttons at the top of each cell; the chosen cell turns light blue
//   hover highlights a single cell
// Named options (e.g. people) are listed in a table underneath.
const props = defineProps({ session: Object, group: Object })
const named = props.group.options.some((o) => o.label !== o.value)
const answer = (n) => props.session.state.answers[n]
</script>

<template>
  <div class="mb-6">
    <div class="border border-[#d3d3d3] px-[26px] pb-2 pt-11" data-no-annotate>
      <table class="w-full border-collapse" role="grid">
        <thead>
          <tr class="border-b-2 border-black">
            <th></th>
            <th
              v-for="(o, i) in group.options"
              :key="o.value"
              class="w-[53px] border-black py-2.5 text-center font-bold"
              :class="i === 0 ? 'border-l-2' : 'border-l'"
            >{{ o.value }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="q in group.questions" :id="`q-${q.n}`" :key="q.n" role="radiogroup" class="border-b border-[#333] last:border-b-0">
            <td class="py-[15px] pr-3 align-top" @click="session.goTo(q.n)">
              <div class="flex">
                <OrderNumber :label="q.n" :active="session.state.current === q.n" />
                <span class="leading-6" data-annotatable v-html="q.text" />
              </div>
            </td>
            <td
              v-for="(o, i) in group.options"
              :key="o.value"
              class="border-black p-0 align-top"
              :class="[i === 0 ? 'border-l-2' : 'border-l', answer(q.n) === o.value ? 'bg-[#bbd8f0]' : 'hover:bg-[#e4e4e4]']"
            >
              <label class="flex h-full min-h-14 w-full cursor-pointer justify-center pt-[18px]">
                <input
                  type="radio"
                  class="m-0 h-[13px] w-[13px] cursor-pointer"
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

    <table v-if="named" class="mt-6 border-collapse border border-black" data-no-annotate>
      <thead v-if="group.optionsTitle">
        <tr><th colspan="2" class="border border-black px-2 py-[4.8px] text-left font-bold leading-6">{{ group.optionsTitle }}</th></tr>
      </thead>
      <tbody>
        <tr v-for="o in group.options" :key="o.value">
          <td class="border border-black px-2 py-[4.8px] font-bold leading-6">{{ o.value }}</td>
          <td class="border border-black px-2 py-[4.8px] leading-6">{{ o.label }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
