<script setup>
  // Toolbar for the passage editor: only the elements passages and questions need.
  import { computed, onBeforeUnmount, ref, watch } from "vue"
  import {
    BetweenHorizontalEnd,
    BetweenVerticalEnd,
    Bold,
    Columns3,
    CornerDownLeft,
    Italic,
    List,
    Merge,
    PanelTop,
    RectangleEllipsis,
    Redo2,
    Rows3,
    Split,
    Table,
    TableCellsMerge,
    TableCellsSplit,
    Trash2,
    Undo2
  } from "lucide-vue-next"

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

  // Block styles. The passage title and subtitle are fields on the passage, not
  // content; the two summary headings are stored as h3 and h4.
  const blockStyles = [
    { key: "paragraph", label: "Paragraph", command: "setParagraph", active: ["paragraph"] },
    { key: "summaryTitle", label: "Summary title", command: "setHeading", args: { level: 3 }, active: ["heading", { level: 3 }] },
    { key: "summarySection", label: "Summary section", command: "setHeading", args: { level: 4 }, active: ["heading", { level: 4 }] },
    { key: "footnote", label: "Footnote", command: "setFootnote", active: ["footnote"] }
  ]

  const groups = [
    [
      { icon: Undo2, title: "Undo", command: "undo" },
      { icon: Redo2, title: "Redo", command: "redo" }
    ],
    "blockStyle",
    [
      { icon: Bold, title: "Bold", command: "toggleBold", active: ["bold"] },
      { icon: Italic, title: "Italic", command: "toggleItalic", active: ["italic"] },
      { icon: CornerDownLeft, title: "Line break (Shift+Enter)", command: "setHardBreak" }
    ],
    [
      { icon: List, title: "Bullet list", command: "toggleBulletList", active: ["bulletList"] },
      { icon: Table, title: "Insert table", command: "insertTable", args: { rows: 3, cols: 3, withHeaderRow: true } }
    ],
    [
      { icon: Split, title: "New section here", command: "splitSection", class: "rotate-90" },
      { icon: Merge, title: "Merge section with previous (or remove it if there is no section before)", command: "mergeSectionWithPrevious", class: "rotate-90" }
    ],
    [{ icon: RectangleEllipsis, title: "Insert blank", command: "insertBlank", class: "text-indigo-700" }]
  ]

  // Shown only while the cursor is in a table.
  const tableTools = [
    { icon: BetweenHorizontalEnd, title: "Add row below", command: "addRowAfter" },
    { icon: BetweenVerticalEnd, title: "Add column to the right", command: "addColumnAfter" },
    { icon: PanelTop, title: "Toggle header row", command: "toggleHeaderRow", active: hasHeaderRow },
    { icon: TableCellsMerge, title: "Merge selected cells (drag across cells to select them)", command: "mergeCells" },
    { icon: TableCellsSplit, title: "Split cell", command: "splitCell" },
    { icon: Rows3, title: "Delete row", command: "deleteRow", class: "text-red-700" },
    { icon: Columns3, title: "Delete column", command: "deleteColumn", class: "text-red-700" },
    { icon: Trash2, title: "Delete table", command: "deleteTable", class: "text-red-700" }
  ]

  const run = (item) => props.editor.chain().focus()[item.command](item.args).run()
  const can = (item) => tick.value >= 0 && props.editor.can()[item.command](item.args)
  const isActive = (item) =>
    tick.value >= 0 && !!item.active && (typeof item.active === "function" ? item.active(props.editor) : props.editor.isActive(...item.active))

  // The table around the cursor has a header row if its first row is header cells.
  function hasHeaderRow(editor) {
    const { $from } = editor.state.selection
    for (let depth = $from.depth; depth > 0; depth--) {
      const node = $from.node(depth)
      if (node.type.name === "table") return node.firstChild?.firstChild?.type.name === "tableHeader"
    }
    return false
  }
  const inTable = computed(() => tick.value >= 0 && props.editor?.isActive("table"))

  const blockStyle = computed(() => blockStyles.find(isActive)?.key ?? "")
  const setBlockStyle = (key) => run(blockStyles.find((style) => style.key === key))
</script>

<template>
  <div v-if="editor" class="flex flex-wrap items-center gap-1 border-b border-neutral-300 bg-white px-2 py-1.5">
    <template v-for="(group, i) in groups" :key="i">
      <span v-if="i" class="mx-1 h-5 w-px bg-neutral-300" />

      <select
        v-if="group === 'blockStyle'"
        title="Text style"
        class="h-7 rounded border border-neutral-300 px-1.5 text-sm"
        :value="blockStyle"
        @change="setBlockStyle($event.target.value)"
      >
        <option value="" disabled>Style</option>
        <option v-for="style in blockStyles" :key="style.key" :value="style.key">{{ style.label }}</option>
      </select>

      <template v-else>
        <button
          v-for="item in group"
          :key="item.title"
          type="button"
          :title="item.title"
          :aria-label="item.title"
          :disabled="!can(item) && !isActive(item)"
          class="flex h-7 w-7 items-center justify-center rounded text-neutral-800 hover:bg-neutral-100 disabled:cursor-default disabled:text-neutral-300 disabled:hover:bg-transparent"
          :class="{ 'bg-neutral-200 hover:bg-neutral-200': isActive(item) }"
          @mousedown.prevent
          @click="run(item)"
        >
          <component :is="item.icon" :size="18" :class="item.class" />
        </button>
      </template>
    </template>

    <template v-if="inTable">
      <span class="mx-1 h-5 w-px bg-neutral-300" />
      <button
        v-for="item in tableTools"
        :key="item.title"
        type="button"
        :title="item.title"
        :aria-label="item.title"
        :disabled="!can(item)"
        class="flex h-7 w-7 items-center justify-center rounded text-neutral-800 hover:bg-neutral-100 disabled:text-neutral-300"
        :class="{ 'bg-neutral-200 hover:bg-neutral-200': isActive(item) }"
        @mousedown.prevent
        @click="run(item)"
      >
        <component :is="item.icon" :size="18" :class="item.class" />
      </button>
    </template>
  </div>
</template>
