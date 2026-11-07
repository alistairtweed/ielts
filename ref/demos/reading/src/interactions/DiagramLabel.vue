<script setup>
import TextEntry from './TextEntry.vue'

// Diagram labelling: answer boxes positioned over an image.
// group.image: image URL or inline SVG markup; group.labels: [{ n, x, y }] with
// x / y as percentages of the image's width and height (box centre).
// NOTE: layout not yet checked against a live example of this interaction.
defineProps({ session: Object, group: Object })
</script>

<template>
  <div class="mb-6">
    <h2 v-if="group.title" class="mb-[14.6px] text-[1.1em] font-bold leading-[1.2]">{{ group.title }}</h2>
    <div class="relative inline-block max-w-full" data-no-annotate>
      <div v-if="group.image.trim().startsWith('<')" class="[&>svg]:block [&>svg]:h-auto [&>svg]:max-w-full" v-html="group.image" />
      <img v-else :src="group.image" alt="" class="block max-w-full" />
      <div
        v-for="l in group.labels"
        :key="l.n"
        class="absolute -translate-x-1/2 -translate-y-1/2"
        :style="{ left: l.x + '%', top: l.y + '%' }"
      >
        <TextEntry :session="session" :n="l.n" :min-width="120" class="!mx-0" />
      </div>
    </div>
  </div>
</template>
