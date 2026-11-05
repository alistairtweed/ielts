<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import LegacyApp from './skins/legacy/LegacyApp.vue'
import CurrentApp from './skins/current/CurrentApp.vue'

// Minimal hash router: #/legacy, #/current, or the chooser page.
const route = ref(location.hash)
const sync = () => (route.value = location.hash)
onMounted(() => addEventListener('hashchange', sync))
onBeforeUnmount(() => removeEventListener('hashchange', sync))
</script>

<template>
  <LegacyApp v-if="route === '#/legacy'" />
  <CurrentApp v-else-if="route === '#/current'" />
  <main v-else class="mx-auto max-w-2xl p-8 font-sans">
    <h1 class="mb-2 text-2xl font-bold">Computer-delivered Reading test: interface demos</h1>
    <p class="mb-6 text-gray-600">
      Reference reconstructions of the two computer-delivered Reading interfaces, for course design. They use original sample
      content and contain no official test material or branding.
    </p>
    <div class="grid gap-4 sm:grid-cols-2">
      <a href="#/current" class="block rounded border border-gray-300 p-5 hover:border-black">
        <div class="mb-1 font-bold">Current interface</div>
        <div class="text-sm text-gray-600">
          Modelled on the newer demo. Split panes, footer navigation, Note / Highlight popup, notes sidebar, contrast and
          text size options.
        </div>
      </a>
      <a href="#/legacy" class="block rounded border border-gray-300 p-5 hover:border-black">
        <div class="mb-1 font-bold">Legacy interface (2019)</div>
        <div class="text-sm text-gray-600">
          Modelled on the 2019 familiarisation demo. Right-click Highlight / Notes, sticky notes, Review checkbox, Help and
          Hide.
        </div>
      </a>
    </div>
    <p class="mt-6 text-sm text-gray-500">
      Both open with a 60-minute countdown and end with a results screen (a self-study addition that the real test does
      not have).
    </p>
  </main>
</template>
