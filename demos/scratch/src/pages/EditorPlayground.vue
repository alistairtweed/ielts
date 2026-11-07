<script setup>
  import { computed, ref } from "vue"
  import { useEditor, EditorContent } from "@tiptap/vue-3"

  import Toolbar from "~/components/Toolbar.vue"
  import { blanksIn } from "~/extensions/blanks.js"
  import { playgroundExtensions } from "~/extensions/presets.js"

  const initialContent = `
    <section>
      <p>Few objects are as familiar, or as overlooked, as the pencil. Its story begins in the 1560s, when shepherds in Borrowdale discovered a black mineral* used to mark <span data-blank data-question-id="q-1"></span>.</p>
      <p>Borrowdale graphite was so pure that it could be sawn into sticks and used without further processing.</p>
    </section>
    <section>
      <p>The next major development took place in Italy, where craftsmen placed graphite inside hollowed-out sticks of <span data-blank data-question-id="q-2"></span> wood.</p>
      <table>
        <tr><th>Year</th><th>Development</th></tr>
        <tr><td>1560s</td><td>graphite found in Borrowdale</td></tr>
        <tr><td>1795</td><td>Conté mixes graphite<br>with <span data-blank data-question-id="q-3"></span></td></tr>
      </table>
    </section>
    <p data-footnote>*plumbago: an old name for graphite, meaning "lead ore"</p>`

  const html = ref("")
  const json = ref({})
  const blanks = ref([])
  const view = ref("html")

  function sync({ editor }) {
    html.value = editor.getHTML()
    json.value = editor.getJSON()
    blanks.value = blanksIn(editor.state.doc)
  }

  const editor = useEditor({
    content: initialContent,
    extensions: playgroundExtensions(),
    onCreate: sync,
    onUpdate: sync
  })

  // Readable HTML: one block element per line.
  const prettyHtml = computed(() =>
    html.value.replace(/(<\/(section|p|h\d|li|ul|tr|table)>|<table[^>]*>|<tbody>)/g, "$1\n").replace(/(<section[^>]*>)/g, "\n$1\n")
  )
  const shown = computed(() =>
    view.value === "html" ? prettyHtml.value.trim() : view.value === "json" ? JSON.stringify(json.value, null, 2) : JSON.stringify(blanks.value, null, 2)
  )
</script>

<template>
  <div class="grid h-dvh grid-cols-2">
    <!-- Editor: toolbar on top, editable area fills the rest and scrolls -->
    <div class="flex min-h-0 flex-col border-r border-neutral-300">
      <Toolbar :editor="editor" />
      <div class="min-h-0 flex-1 overflow-y-auto">
        <EditorContent :editor="editor" class="h-full" />
      </div>
    </div>

    <!-- Raw preview -->
    <div class="flex min-h-0 flex-col bg-neutral-100">
      <div class="flex gap-1 border-b border-neutral-300 bg-white px-2 py-1.5">
        <button
          v-for="(label, key) in { html: 'HTML', json: 'JSON', blanks: 'Blanks' }"
          :key="key"
          type="button"
          class="h-7 rounded px-2 text-sm"
          :class="view === key ? 'bg-neutral-800 text-white' : 'text-neutral-700 hover:bg-neutral-100'"
          @click="view = key"
        >
          {{ label }}
        </button>
      </div>
      <pre class="min-h-0 flex-1 overflow-auto p-4 font-mono text-xs leading-5 whitespace-pre-wrap">{{ shown }}</pre>
    </div>
  </div>
</template>
