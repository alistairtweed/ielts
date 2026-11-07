<script setup>
// Question number beside a prompt. Boxed in blue when it is the current question.
defineProps({ label: [String, Number], active: Boolean })
</script>

<template>
  <span
    class="mr-1 inline-block min-w-[29px] flex-none self-start rounded-[3px] border-2 px-0.5 pb-[3px] pt-1 text-center font-bold leading-4"
    :class="active ? 'border-[#418ec8]' : 'border-transparent'"
  >{{ label }}</span>
</template>
