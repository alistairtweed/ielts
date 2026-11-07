<script setup>
// A draggable answer (heading, word, person, sentence ending).
//   bold:    headings style (bold, 1.1em); otherwise regular 16px
//   lifted:  blue border and drop shadow (hover, or a reusable answer being dragged)
//   faded:   source of a single-use answer that is being dragged
//   picked:  chosen with a click, waiting to be placed
//   active:  sits in the current question's drop zone
defineProps({ label: String, bold: Boolean, faded: Boolean, lifted: Boolean, picked: Boolean, active: Boolean, fill: Boolean })
</script>

<template>
  <div
    draggable="true"
    tabindex="0"
    class="inline-flex cursor-move select-none items-start rounded-[4px] border bg-white text-left text-black"
    :class="[
      bold ? 'h-6 px-[8.8px] pt-px text-[1.1em] font-bold leading-[21px]' : 'h-[27px] px-2 pt-px leading-6',
      faded
        ? 'border-[#bcdcf3] text-[#c5c5c5]'
        : lifted || picked
          ? 'border-[#0e98f0] shadow-[0_3px_6px_rgba(0,0,0,.1),0_3px_6px_rgba(0,0,0,.15)]'
          : active
            ? 'border-[#418ec8]'
            : 'border-[#919191] hover:border-[#0e98f0] hover:shadow-[0_3px_6px_rgba(0,0,0,.1),0_3px_6px_rgba(0,0,0,.15)]',
      fill ? 'w-full' : '',
    ]"
  >
    <span class="truncate">{{ label }}</span>
  </div>
</template>
