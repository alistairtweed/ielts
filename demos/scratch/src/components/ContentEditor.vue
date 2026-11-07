<script setup>
  import { onBeforeUnmount, watch } from "vue"
  import { useEditor, EditorContent } from "@tiptap/vue-3"

  import Toolbar from "~/components/Toolbar.vue"
  import { groupExtensions, passageExtensions } from "~/extensions/presets.js"

  // A Tiptap editor bound to a JSON value with v-model.
  //   preset     "passage" (paragraphs, sections, bold, italic, footnotes) or
  //              "group" (adds headings, lists, tables, line breaks and blanks)
  //   numberFor  question number for a blank (group content)
  const props = defineProps({
    modelValue: Object,
    preset: { type: String, default: "group" },
    numberFor: Function
  })
  const emit = defineEmits(["update:modelValue"])

  // The last value we emitted, so our own updates aren't fed back into the editor.
  let emitted = null

  const editor = useEditor({
    content: props.modelValue,
    extensions: props.preset === "passage" ? passageExtensions() : groupExtensions({ numberFor: props.numberFor }),
    onUpdate: ({ editor }) => {
      emitted = editor.getJSON()
      emit("update:modelValue", emitted)
    },
    // Sections get their keys when the editor starts; pass those back too.
    onCreate: ({ editor }) => {
      emitted = editor.getJSON()
      emit("update:modelValue", emitted)
    }
  })

  // Content replaced from outside (import, reset): load it into the editor.
  watch(
    () => props.modelValue,
    (value) => {
      if (value !== emitted && editor.value) editor.value.commands.setContent(value, { emitUpdate: false })
    }
  )

  onBeforeUnmount(() => editor.value?.destroy())
</script>

<template>
  <div class="overflow-hidden rounded-md border border-neutral-300 bg-white focus-within:border-indigo-400">
    <Toolbar :editor="editor" />
    <EditorContent :editor="editor" class="content-editor max-h-[28rem] overflow-y-auto" />
  </div>
</template>
