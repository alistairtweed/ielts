<script setup>
  import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3"
  import { computed, onBeforeUnmount, onMounted, ref } from "vue"

  // The blank as the author sees it: a chip with its question number.
  // Hover shows the question ID it points at.
  const props = defineProps(nodeViewProps)

  // Bumped on every editor change, so the number follows blanks added or removed earlier.
  const revision = ref(0)
  const bump = () => revision.value++
  onMounted(() => props.editor.on("update", bump))
  onBeforeUnmount(() => props.editor.off("update", bump))

  const number = computed(() => {
    const numberFor = props.extension.options.numberFor
    if (numberFor) return numberFor(props.node.attrs.questionId) ?? "?"
    revision.value
    const position = props.getPos()
    let index = 0
    props.editor.state.doc.descendants((node, pos) => {
      if (node.type.name === "blank" && pos < position) index++
    })
    return 1 + index
  })
</script>

<template>
  <NodeViewWrapper as="span" class="inline-block align-baseline">
    <span
      contenteditable="false"
      :title="`Question ID: ${node.attrs.questionId}`"
      class="mx-0.5 inline-flex min-w-24 cursor-default items-center justify-center rounded border border-dashed border-indigo-400 bg-indigo-50 px-2 text-sm leading-6 font-bold text-indigo-900 select-none"
      :class="{ 'ring-2 ring-indigo-500': selected }"
    >
      {{ number }}
    </span>
  </NodeViewWrapper>
</template>
