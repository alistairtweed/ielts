<script setup>
// Small inline icon set (simple original SVG paths).
defineProps({ name: String, size: { type: [Number, String], default: 24 } })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="name === 'wifi'">
      <path d="M2 9a15 15 0 0 1 20 0" /><path d="M5.5 12.5a10 10 0 0 1 13 0" /><path d="M9 16a5 5 0 0 1 6 0" /><circle cx="12" cy="19.5" r="1" fill="currentColor" />
    </template>
    <template v-else-if="name === 'bell'">
      <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" /><path d="M10 21h4" />
    </template>
    <template v-else-if="name === 'menu'">
      <path d="M3 6h18M3 12h18M3 18h18" stroke-width="3" />
    </template>
    <template v-else-if="name === 'notes'">
      <path d="M11 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6" /><path d="M17.5 2.5a2.1 2.1 0 0 1 3 3L12 14l-4 1 1-4z" />
    </template>
    <template v-else-if="name === 'left'">
      <path d="M20 12H5M11 5l-7 7 7 7" stroke-width="3.5" />
    </template>
    <template v-else-if="name === 'right'">
      <path d="M4 12h15M13 5l7 7-7 7" stroke-width="3.5" />
    </template>
    <template v-else-if="name === 'check'">
      <path d="M4 12.5l5 5L20 6.5" stroke-width="3" />
    </template>
    <template v-else-if="name === 'send'">
      <path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4z" />
    </template>
    <template v-else-if="name === 'quote'">
      <path d="M4 4h16v12H8l-4 4z" /><path d="M9 9h.01M14 9h.01" />
    </template>
    <template v-else-if="name === 'marker'">
      <path d="M12 3v12" stroke-width="3" /><path d="M8 21h8" />
    </template>
    <template v-else-if="name === 'trash'">
      <path d="M4 6h16M9 6V4h6v2M6 6l1 15h10l1-15" />
    </template>
  </svg>
</template>
