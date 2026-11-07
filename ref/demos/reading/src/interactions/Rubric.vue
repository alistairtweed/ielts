<script setup>
// "Questions X–Y" heading and the task instructions.
defineProps({ title: String, instructions: String })
</script>

<template>
  <div>
    <h3 class="mb-2 font-bold">{{ title }}</h3>
    <section class="mb-4 leading-6" data-annotatable v-html="instructions" />
  </div>
</template>
