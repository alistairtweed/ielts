import { h } from "vue"

// Renders editor JSON for the print preview.
//   doc          the editor JSON
//   showLetters  label sections A, B, C… (when questions refer to them)
//   numberFor    question number for a blank, shown as "7 ……………"
export default {
  name: "RichContent",
  props: { doc: Object, showLetters: Boolean, numberFor: Function },
  setup(props) {
    return () => {
      let sectionIndex = 0

      const marked = (node) => {
        let child = node.text
        for (const mark of node.marks ?? []) {
          if (mark.type === "bold") child = h("strong", child)
          if (mark.type === "italic") child = h("em", child)
        }
        return child
      }

      const children = (node) => (node.content ?? []).map(render)

      function render(node) {
        switch (node.type) {
          case "doc":
            return children(node)
          case "section": {
            const label = String.fromCharCode(65 + sectionIndex++)
            return h("div", { class: "print-section" }, [props.showLetters ? h("span", { class: "print-section-label" }, label) : null, h("div", children(node))])
          }
          case "paragraph":
            return h("p", children(node))
          case "heading":
            return h(`h${node.attrs?.level ?? 3}`, children(node))
          case "footnote":
            return h("p", { class: "print-footnote" }, children(node))
          case "bulletList":
            return h("ul", children(node))
          case "listItem":
            return h("li", children(node))
          case "table":
            return h("table", h("tbody", children(node)))
          case "tableRow":
            return h("tr", children(node))
          case "tableHeader":
          case "tableCell":
            return h(node.type === "tableHeader" ? "th" : "td", { colspan: node.attrs?.colspan, rowspan: node.attrs?.rowspan }, children(node))
          case "hardBreak":
            return h("br")
          case "blank":
            return h("span", { class: "print-gap" }, [h("strong", props.numberFor?.(node.attrs?.questionId) ?? "?"), " ……………………"])
          case "text":
            return marked(node)
          default:
            return children(node)
        }
      }

      return props.doc ? h("div", { class: "print-content" }, render(props.doc)) : null
    }
  }
}
