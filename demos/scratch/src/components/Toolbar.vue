<script setup>
  // Buttons for everything StarterKit provides, plus sections and blanks.
  // Each item: label, title, the command to run, and (optionally) what makes it "active".
  import { onBeforeUnmount, ref, watch } from "vue"

  const props = defineProps({ editor: Object })

  // Re-evaluate active/disabled states whenever the editor changes, including
  // selection moves (the editor object itself doesn't trigger a re-render).
  const tick = ref(0)
  const bump = () => tick.value++
  watch(
    () => props.editor,
    (editor, previous) => {
      previous?.off("transaction", bump)
      editor?.on("transaction", bump)
    },
    { immediate: true }
  )
  onBeforeUnmount(() => props.editor?.off("transaction", bump))

  const groups = [
    [
      { label: "↶", title: "Undo", command: "undo" },
      { label: "↷", title: "Redo", command: "redo" }
    ],
    [
      { label: "P", title: "Paragraph", command: "setParagraph", active: ["paragraph"] },
      { label: "H1", title: "Heading 1", command: "toggleHeading", args: { level: 1 }, active: ["heading", { level: 1 }] },
      { label: "H2", title: "Heading 2", command: "toggleHeading", args: { level: 2 }, active: ["heading", { level: 2 }] },
      { label: "H3", title: "Heading 3", command: "toggleHeading", args: { level: 3 }, active: ["heading", { level: 3 }] }
    ],
    [
      { label: "B", title: "Bold", command: "toggleBold", active: ["bold"], class: "font-bold" },
      { label: "I", title: "Italic", command: "toggleItalic", active: ["italic"], class: "italic" },
      { label: "U", title: "Underline", command: "toggleUnderline", active: ["underline"], class: "underline" },
      { label: "S", title: "Strikethrough", command: "toggleStrike", active: ["strike"], class: "line-through" },
      { label: "</>", title: "Inline code", command: "toggleCode", active: ["code"], class: "font-mono" },
      { label: "⌫", title: "Clear formatting", command: "unsetAllMarks" }
    ],
    [
      { label: "• List", title: "Bullet list", command: "toggleBulletList", active: ["bulletList"] },
      { label: "1. List", title: "Numbered list", command: "toggleOrderedList", active: ["orderedList"] },
      { label: "❝", title: "Quote", command: "toggleBlockquote", active: ["blockquote"] },
      { label: "{ }", title: "Code block", command: "toggleCodeBlock", active: ["codeBlock"], class: "font-mono" },
      { label: "―", title: "Horizontal rule", command: "setHorizontalRule" },
      { label: "↵", title: "Line break", command: "setHardBreak" }
    ],
    [
      { label: "New section here", title: "Start a new section at this paragraph", command: "splitSection" },
      { label: "Merge with previous", title: "Join this section onto the one before", command: "mergeSectionWithPrevious" }
    ],
    [{ label: "+ Blank", title: "Insert a blank (a question)", command: "insertBlank", class: "font-medium text-indigo-700" }]
  ]

  const run = (item) => props.editor.chain().focus()[item.command](item.args).run()
  const can = (item) => tick.value >= 0 && props.editor.can()[item.command](item.args)
  const isActive = (item) => tick.value >= 0 && item.active && props.editor.isActive(...item.active)
</script>

<template>
  <div v-if="editor" class="flex flex-wrap items-center gap-1 border-b border-neutral-300 bg-white px-2 py-1.5">
    <template v-for="(group, i) in groups" :key="i">
      <span v-if="i" class="mx-1 h-5 w-px bg-neutral-300" />
      <button
        v-for="item in group"
        :key="item.title"
        type="button"
        :title="item.title"
        :disabled="!can(item) && !isActive(item)"
        class="h-7 min-w-7 rounded px-1.5 text-sm text-neutral-800 hover:bg-neutral-100 disabled:cursor-default disabled:text-neutral-300 disabled:hover:bg-transparent"
        :class="[item.class, { 'bg-neutral-200 hover:bg-neutral-200': isActive(item) }]"
        @mousedown.prevent
        @click="run(item)"
      >
        {{ item.label }}
      </button>
    </template>
  </div>
</template>
