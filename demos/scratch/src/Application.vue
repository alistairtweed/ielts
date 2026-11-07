<script setup>
  import { ref } from "vue"
  import { useEditor, EditorContent } from "@tiptap/vue-3"
  import StarterKit from "@tiptap/starter-kit"

  const content = ref("<p>I'm running Tiptap with Vue.js. 🎉</p>")

  const editor = useEditor({
    content: content.value,
    extensions: [StarterKit],
  })
</script>

<template>
  <div class="grid grid-cols-2 h-dvh">
    <div>
      <editor-content :editor="editor" />
    </div>
    <div class="bg-neutral-200 p-4">
      <code>{{ content }}</code>
    </div>
  </div>
</template>
