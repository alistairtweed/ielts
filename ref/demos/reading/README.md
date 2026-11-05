# Reading test interface demos

Reconstructions of the two computer-delivered IELTS Academic Reading interfaces, built as a **reference** for course design. They show exactly how test takers interact with each question type. Built with Vite, Vue 3 and Tailwind CSS. There is no backend.

- **Current interface:** modelled on the newer demo player.
- **Legacy interface (2019):** modelled on the 2019 familiarisation test.

Both use the **same original sample test** (`src/data/sampleTest.js`): three passages and 40 questions written for this demo. No official test content, logos or branding are reproduced.

## Run it

```bash
cd ref/demos/reading
npm install
npm run dev      # open the printed URL, then choose an interface
npm run build    # static build in dist/ (opens from any folder)
```

Routes: `#/current`, `#/legacy`, or `#/` for the chooser.

## What was observed in the originals (5 Nov 2026)

### Current interface (newer demo)
- **Header:** logo, "Test taker ID", connection, messages, Options (☰) and notes icons. The demo shows **no timer**. The real test counts down from 60 minutes.
- **Part banner:** grey box (`#f1f2ec`) with "Part N / Read the text and answer questions X–Y."
- **Split screen:** passage on the left, questions on the right, with a **draggable divider** (⟷).
- **Highlighting and notes do exist.** Selecting text shows a small **Note | Highlight** popup (keyboard shortcuts *a* / *h*).
  - Clicking a highlight offers **Delete Highlight**.
  - A note opens a **Notes sidebar** on the right, showing "Part N *quoted text*", a text box and **Delete**.
- **Footer:**
  - The active part shows its question numbers, with a **green bar** over each attempted question and a **blue box** around the current one.
  - Other parts collapse to "Part N  x of 13".
  - "Choose TWO" questions share one button, such as "18–19".
  - ✔ (bottom right) goes to the review/submission page.
- **Next / previous:** large black and grey arrow buttons, bottom right.
- **Options menu:** Go to submission page; Contrast (black on white, white on black, yellow on black); Text size (regular, large, extra large).
- **Question formats:**
  - radio buttons (TFNG, YNNG, MCQ);
  - checkboxes (choose TWO);
  - typed gaps (notes, summary);
  - **drag-and-drop** for headings, with drop zones *inside the passage* above each section.
- **Flag for review:** the player has a flag feature, but it is **switched off in the demo** (the page carries a `flags-disabled` class). How it looks in the live test is unconfirmed.

### Legacy interface (2019 familiarisation test)
- **Flow:** "Confirm your details" → instructions ("Start test") → test.
- **Top bar:** candidate name and number; "60 minutes left" (whole minutes; the clock alerts at 10 and 5 minutes); **Help** and **Hide**.
- **Annotation:** right-click selected text for **Highlight / Notes**. Right-click a highlight for **Notes / Clear / Clear all**. Notes are yellow sticky notes that can be dragged.
- **Question formats:**
  - TFNG, YNNG and MCQ appear in an **accordion**: only the current question's options are open.
  - Matching uses a **grid of A–F cells**.
  - Gaps are blue-bordered boxes showing the question number.
- **Navigation:**
  - Numbered squares, grouped by part.
  - A **Review** checkbox marks the current question, and its square becomes round.
  - The navigation bar can be minimised to a strip.
  - Round previous / next buttons.
- **Help:** tabs for Information, Test help and Task help.
- **Hide:** "Screen hidden. … the clock is still running" → Resume test.

## Deliberate differences and assumptions

| Item | In this demo | Why |
|---|---|---|
| Timer (current) | "60 minutes left" in the header; seconds shown in the final minute; turns red under 5 minutes | The real test counts down from 60. The exact styling is an assumption. |
| Branding | A neutral "LOGO" placeholder | No logos are reproduced. |
| Candidate details | Fictitious name and number | The demos show none. |
| Flag for review (current) | Not implemented | It is disabled in the demo, so the real behaviour is unconfirmed. |
| Submission page (current) | Our own review screen: per-part question grid, then Submit | The demo shows only "Click next to continue". |
| End of test (legacy) | "Finish test" confirmation after the last question | Not shown in the demo. |
| Results screen | Raw score, approximate band and answer key | **Self-study addition.** The real test shows no results. The band conversion is approximate. |
| Answered marker (legacy) | Underline on the number square | Inferred from the demo. |
| Drag and drop | Mouse drag, plus click an option and then click a gap | The click method supports keyboard use and touch screens. |

## Code map

```
src/data/sampleTest.js      test content: parts, passages, question groups, answers
src/engine/session.js       answers, flags, current question, notes, results
src/engine/annotate.js      highlight and note marking of selected text
src/engine/dragdrop.js      drag / click-to-place logic
src/engine/timer.js         countdown
src/components/             passage, question groups, drop slots, results (shared by both interfaces)
src/skins/current/          current interface
src/skins/legacy/           legacy interface
```

### Question group types in the data

| `type` | Used for |
|---|---|
| `single` | TRUE/FALSE/NOT GIVEN, YES/NO/NOT GIVEN, multiple choice (one answer) |
| `multi` | choose TWO (or more); covers several question numbers |
| `gap` | notes, table, summary or sentence completion with typed answers (`[[n]]` tokens in an HTML template) |
| `gapdrag` | summary completion from a list (drag words into `[[n]]` slots) |
| `match` | matching information, features or sentence endings (one slot per statement) |
| `headings` | matching headings (slots sit above the passage paragraphs) |

These cover the question families in `ref/IELTS/Question Types/Reading.txt`. Diagram labelling is not yet included.
