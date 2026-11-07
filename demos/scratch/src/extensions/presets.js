import StarterKit from "@tiptap/starter-kit"
import { TableKit } from "@tiptap/extension-table"

import { Blank } from "~/extensions/blanks.js"
import { Footnote } from "~/extensions/footnotes.js"
import { PassageDocument, Section } from "~/extensions/sections.js"

// Which extensions each kind of content may use. Keeping them separate stops,
// for example, a blank being put into passage text.

// Everything StarterKit adds that no content here uses.
const unused = {
  blockquote: false,
  code: false,
  codeBlock: false,
  horizontalRule: false,
  link: false,
  orderedList: false,
  strike: false,
  underline: false
}

// Passage text: paragraphs, sections, bold, italic and footnotes.
// (The title and subtitle are passage fields, not content.)
export function passageExtensions() {
  return [
    StarterKit.configure({
      ...unused,
      document: false, // replaced by PassageDocument (blocks and sections)
      trailingNode: false, // would add an empty paragraph after the last section
      heading: false,
      bulletList: false,
      listItem: false,
      listKeymap: false,
      hardBreak: false
    }),
    PassageDocument,
    Section,
    Footnote
  ]
}

// Question-group content (notes, tables, summaries): headings (h3 summary title,
// h4 summary section), bold, italic, bullet lists, tables, line breaks and blanks.
//   numberFor(questionId)  the question number to show on a blank
export function groupExtensions({ numberFor } = {}) {
  return [
    StarterKit.configure({ ...unused, heading: { levels: [3, 4] } }),
    TableKit.configure({ table: { resizable: false } }),
    Blank.configure({ numberFor })
  ]
}

// Everything, for the editor playground.
export function playgroundExtensions() {
  return [
    StarterKit.configure({ ...unused, document: false, trailingNode: false, heading: { levels: [3, 4] } }),
    TableKit.configure({ table: { resizable: false } }),
    PassageDocument,
    Section,
    Footnote,
    Blank
  ]
}
