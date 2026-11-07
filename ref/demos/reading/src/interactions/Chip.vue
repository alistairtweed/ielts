<script setup>
// A draggable answer (heading, word, sentence ending).
//   faded:  it is the source of the item being dragged
//   picked: chosen with a click, waiting to be placed
//   active: sits in the current question's drop zone
defineProps({ label: String, faded: Boolean, picked: Boolean, active: Boolean, fill: Boolean })
</script>

<template>
  <div
    draggable="true"
    tabindex="0"
    class="inline-flex h-6 cursor-move select-none items-start rounded-[4px] border bg-white px-[8.8px] pt-px text-left text-[1.1em] font-bold leading-[21px] text-black"
    :class="[
      faded ? 'border-[#bcdcf3] text-[#c5c5c5]' : picked || active ? 'border-[#418ec8] shadow-[0_0_4px_rgba(65,142,200,.6)]' : 'border-[#919191] hover:border-[#418ec8] hover:shadow-[0_0_4px_rgba(65,142,200,.6)]',
      fill ? 'w-full' : '',
    ]"
  >
    <span class="truncate">{{ label }}</span>
  </div>
</template>
