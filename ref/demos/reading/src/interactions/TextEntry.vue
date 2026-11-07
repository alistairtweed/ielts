<script setup>
import { computed } from 'vue'

// Typed answer box. Empty: shows the question number, bold and centred, while
// the typing cursor stays on the left.
// Grows with its content (minimum 178px, as in the newer demo).
const props = defineProps({ session: Object, n: Number, minWidth: { type: Number, default: 178 } })
const value = computed(() => props.session.state.answers[props.n] || '')
</script>

<template>
  <input
    :id="`q-${n}`"
    type="text"
    autocomplete="off"
    spellcheck="false"
    maxlength="500"
    :aria-label="`Question ${n}`"
    :placeholder="String(n)"
    :value="value"
    class="mx-1 inline-block h-[22px] max-w-full rounded-[3px] border border-[#535353] bg-white px-2 text-left align-baseline leading-normal text-black outline-none placeholder:text-center placeholder:font-bold placeholder:text-black focus:border-[#418ec8] focus:shadow-[0_0_0_1px_#418ec8]"
    :style="{ minWidth: minWidth + 'px', width: value.length + 3 + 'ch' }"
    @input="session.setAnswer(n, $event.target.value)"
    @focus="session.goTo(n)"
  />
</template>
