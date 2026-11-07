<script setup>
import OrderNumber from './OrderNumber.vue'

// One multiple-choice item: numbered prompt and a list of options.
//   radio:    TRUE/FALSE/NOT GIVEN, YES/NO/NOT GIVEN, choose one
//   checkbox: choose TWO (or more); further boxes lock once the limit is reached
// Options: full-width rows; grey on hover, light blue when selected.
defineProps({
  id: String,
  label: String, // number shown beside the prompt, e.g. "5" or "18–19"
  prompt: String,
  options: Array,
  type: { type: String, default: 'radio' },
  name: String,
  isSelected: Function,
  isDisabled: { type: Function, default: () => false },
  active: Boolean,
})
const emit = defineEmits(['select', 'focus'])
</script>

<template>
  <div :id="id" :role="type === 'radio' ? 'radiogroup' : 'group'">
    <p class="mb-1 flex" @click="emit('focus')">
      <OrderNumber :label="label" :active="active" />
      <span class="leading-6" data-annotatable v-html="prompt" />
    </p>
    <ul class="mb-6 mt-[4.8px] list-none">
      <li v-for="(o, i) in options" :key="o.value" class="relative mb-px">
        <input
          :id="`${name}-${o.value}`"
          :type="type"
          :name="name"
          :value="o.value"
          :checked="isSelected(o.value)"
          :disabled="isDisabled(o.value)"
          class="absolute left-2 top-[11.6px] m-[3px_8px_0_5px]"
          @change="emit('select', o.value)"
          @focus="emit('focus')"
        />
        <label
          :for="`${name}-${o.value}`"
          class="flex w-full cursor-pointer py-[9.6px] pl-8 pr-2 leading-6"
          :class="[
            isSelected(o.value) ? 'bg-[#bbd8f0]' : 'bg-white hover:bg-[#e4e4e4]',
            i === 0 ? 'rounded-t-[3px]' : '',
            i === options.length - 1 ? 'rounded-b-[3px]' : '',
          ]"
        >
          <span>{{ o.label }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>
