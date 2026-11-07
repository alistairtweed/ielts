<script setup>
// Draggable divider between the passage and the questions.
// A 2px line inside a 16px-wide grab area (cursor ew-resize). On hover the grab
// area turns light grey and the line and button turn blue. The whole bar can be
// dragged, not only the button. Emits 'resize' with the pointer's x position.
const emit = defineEmits(['resize'])

function start(e) {
  e.preventDefault()
  const move = (ev) => emit('resize', ev.clientX)
  const up = () => {
    removeEventListener('mousemove', move)
    removeEventListener('mouseup', up)
    document.body.style.cursor = ''
  }
  document.body.style.cursor = 'ew-resize'
  addEventListener('mousemove', move)
  addEventListener('mouseup', up)
}

function key(e) {
  const box = e.currentTarget.getBoundingClientRect()
  if (e.key === 'ArrowLeft') emit('resize', box.left - 20)
  if (e.key === 'ArrowRight') emit('resize', box.left + 36)
}
</script>

<template>
  <div class="group relative z-10 -mx-[7px] w-4 flex-none cursor-ew-resize hover:bg-black/10" @mousedown="start">
    <div class="absolute inset-y-0 left-[7px] w-[2px] bg-black/50 group-hover:bg-[#2a6c96]" />
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize panels"
      tabindex="0"
      class="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-[#535353] bg-[#f9f9f9] text-[#535353] group-hover:border-[#2a6c96] group-hover:text-[#2a6c96]"
      @keydown="key"
    >
      <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor" aria-hidden="true">
        <path d="M0 5 4 1v3h8V1l4 4-4 4V6H4v3z" />
      </svg>
    </div>
  </div>
</template>
