<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import test from '../../data/sampleTest.js'
import { createSession } from '../../engine/session.js'
import { useTimer, minutesLeft, mmss } from '../../engine/timer.js'
import { useFollowCurrent } from '../../engine/follow.js'
import { selectionRange, wrapRange, unwrap, annotationAt, rangeEndRect } from '../../engine/annotate.js'
import Passage from '../../components/Passage.vue'
import QuestionsPane from '../../interactions/QuestionsPane.vue'
import ResultsView from '../../components/ResultsView.vue'
import Icon from './Icon.vue'
import SplitDivider from './SplitDivider.vue'

const session = createSession(test)
const { state } = session
useTimer(session, () => (state.stage = 'finished'))
useFollowCurrent(session)

const partIndex = session.currentPartIndex
const part = computed(() => test.parts[partIndex.value])
const isFirst = computed(() => state.current === session.index[0].n)
const isLast = computed(() => state.current === session.index.at(-1).n)

// The real test counts down from 60 minutes. The final minute shows seconds.
const clock = computed(() =>
  state.remaining <= 60 ? `${mmss(state.remaining)} left` : `${minutesLeft(state.remaining)} minutes left`,
)

const ui = reactive({
  options: null, // null | 'menu' | 'contrast' | 'size'
  notes: false,
  theme: 'wb', // wb | wob | yob
  size: 'regular', // regular | large | xlarge
  split: 50, // passage pane width, %
  confirmSubmit: false,
})

watch(
  () => ui.size,
  (s) => (document.documentElement.style.fontSize = { regular: '16px', large: '19px', xlarge: '22px' }[s]),
  { immediate: true },
)
onBeforeUnmount(() => (document.documentElement.style.fontSize = ''))

const restart = () => location.reload()

function next() {
  if (isLast.value) state.stage = 'review'
  else session.step(1)
}

// --------------------------------------------------------------- footer
// One footer button per question, except "choose TWO" groups, which share one.
function footerItems(pi) {
  const items = []
  for (const q of session.index.filter((x) => x.partIndex === pi)) {
    const g = q.group
    if (g.type === 'multi') {
      if (q.n !== g.from) continue
      items.push({ n: g.from, label: `${g.from}–${g.to}`, to: g.to })
    } else items.push({ n: q.n, label: String(q.n), to: q.n })
  }
  return items
}
const itemAttempted = (it) => session.isAttempted(it.to)
const itemCurrent = (it) => state.current >= it.n && state.current <= it.to
function goToPart(pi) {
  session.goTo(session.partQuestions(pi)[0])
}

// ------------------------------------------------------------ resizable split
const splitBox = ref(null)
function resize(x) {
  const box = splitBox.value.getBoundingClientRect()
  ui.split = Math.min(80, Math.max(20, ((x - box.left) / box.width) * 100))
}

// ------------------------------------------------------- highlights & notes
// Selecting text shows a small Note | Highlight popup under the selection.
// Clicking a highlight offers "Delete highlight"; clicking a note opens the sidebar.
const pop = reactive({ kind: null, x: 0, y: 0, range: null, annId: null })
const closePop = () => Object.assign(pop, { kind: null, range: null, annId: null })

function onMouseUp(e) {
  if (e.target.closest('.cu-popup')) return
  setTimeout(() => {
    const range = selectionRange()
    if (range) {
      const r = rangeEndRect(range)
      Object.assign(pop, { kind: 'select', x: r.right - 56, y: r.bottom + 6, range: range.cloneRange() })
      return
    }
    const ann = annotationAt(e.target)
    if (!ann) {
      focusMark(null)
      return closePop()
    }
    focusMark(ann.id)
    if (ann.isNote) {
      closePop()
      openNotes(ann.id)
    } else {
      const r = ann.el.getBoundingClientRect()
      Object.assign(pop, { kind: 'mark', x: r.left, y: r.bottom + 6, annId: ann.id })
    }
  })
}

function focusMark(id) {
  document.querySelectorAll('mark.ann.focused').forEach((m) => m.classList.remove('focused'))
  if (id) document.querySelectorAll(`mark[data-ann="${id}"]`).forEach((m) => m.classList.add('focused'))
}

function highlight() {
  wrapRange(pop.range, { cls: 'ann-hl' })
  closePop()
}

function addNote() {
  const { id, quote } = wrapRange(pop.range, { cls: 'ann-note' })
  state.notes.push({ id, partIndex: partIndex.value, quote, text: '' })
  closePop()
  openNotes(id)
}

function deleteHighlight() {
  unwrap(pop.annId)
  closePop()
}

function deleteNote(note) {
  unwrap(note.id)
  state.notes = state.notes.filter((n) => n !== note)
}

async function openNotes(focusId) {
  ui.notes = true
  await nextTick()
  if (focusId) document.getElementById(`note-${focusId}`)?.focus()
}

function showNoteInText(note) {
  if (note.partIndex !== partIndex.value) goToPart(note.partIndex)
  nextTick(() => {
    focusMark(note.id)
    document.querySelector(`mark[data-ann="${note.id}"]`)?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  })
}

const notesByPart = computed(() =>
  [...state.notes].sort((a, b) => a.partIndex - b.partIndex),
)

function onKey(e) {
  if (e.key === 'Escape') return closePop()
  if (pop.kind !== 'select' || e.target.matches('input, textarea')) return
  if (e.key === 'h') highlight()
  if (e.key === 'a') addNote()
}

// Pressing the mouse anywhere outside the popup closes it.
function onMouseDown(e) {
  if (!e.target.closest('.cu-popup')) closePop()
}
onMounted(() => addEventListener('keydown', onKey))
onBeforeUnmount(() => removeEventListener('keydown', onKey))
</script>

<template>
  <div class="skin-current flex h-full flex-col" :class="`theme-${ui.theme}`">
    <!-- ================================================================ header -->
    <header class="relative flex h-14 flex-none items-center border-b border-[var(--line)] pr-2">
      <div class="flex h-full items-start gap-6 pl-4 pt-3">
        <!-- Logo area intentionally left as a neutral placeholder -->
        <div class="rounded border-2 border-current px-2 text-sm font-bold leading-6">LOGO</div>
        <div class="text-[15px] leading-tight">
          <div class="font-bold">Test taker ID</div>
          <div v-if="state.stage !== 'details'">{{ test.candidate.number }}</div>
        </div>
      </div>
      <div
        v-if="state.stage === 'test' || state.stage === 'review'"
        class="absolute left-1/2 -translate-x-1/2 font-bold"
        :class="{ 'text-red-600': state.remaining <= 300 && ui.theme === 'wb' }"
      >
        {{ clock }}
      </div>
      <div class="ml-auto flex items-center gap-1">
        <span class="cu-iconbtn" title="Connected"><Icon name="wifi" /></span>
        <button class="cu-iconbtn" title="Messages"><Icon name="bell" /></button>
        <button class="cu-iconbtn" title="Options" @click="ui.options = 'menu'"><Icon name="menu" /></button>
        <button v-if="state.stage === 'test'" class="cu-iconbtn" :title="ui.notes ? 'Hide notes' : 'Show notes'" @click="ui.notes = !ui.notes">
          <Icon name="notes" />
        </button>
      </div>
    </header>

    <!-- ========================================================= start screens -->
    <main v-if="state.stage === 'details'" class="mx-auto mt-16 w-full max-w-xl px-4">
      <h1 class="mb-6 text-2xl">Confirm your details</h1>
      <dl class="mb-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
        <dt class="font-bold">Name</dt><dd>{{ test.candidate.name }}</dd>
        <dt class="font-bold">Date of birth</dt><dd>{{ test.candidate.dob }}</dd>
        <dt class="font-bold">Test taker ID</dt><dd>{{ test.candidate.number }}</dd>
      </dl>
      <p class="mb-6">If your details are not correct, please tell the invigilator.</p>
      <button class="bg-black px-6 py-2.5 text-white" @click="state.stage = 'instructions'">My details are correct</button>
    </main>

    <main v-else-if="state.stage === 'instructions'" class="mx-auto mt-10 w-full max-w-2xl px-4 leading-relaxed">
      <h1 class="mb-2 text-2xl">IELTS Academic Reading</h1>
      <p class="mb-5">Time: 1 hour</p>
      <h2 class="font-bold">Instructions to test takers</h2>
      <ul class="mb-4 ml-6 list-disc">
        <li>Answer <b>all</b> the questions.</li>
        <li>You can change your answers at any time during the test.</li>
      </ul>
      <h2 class="font-bold">Information for test takers</h2>
      <ul class="mb-6 ml-6 list-disc">
        <li>There are 40 questions in this test.</li>
        <li>Each question carries one mark.</li>
        <li>There are three parts to the test.</li>
        <li>The test clock will count down from 60 minutes.</li>
      </ul>
      <p class="mb-6 font-bold">Do not click ‘Start test’ until you are told to do so.</p>
      <button class="bg-black px-6 py-2.5 text-white" @click="state.stage = 'test'">Start test</button>
    </main>

    <!-- =============================================================== results -->
    <main v-else-if="state.stage === 'finished'" class="flex-1 overflow-auto">
      <ResultsView :session="session" @restart="restart" />
    </main>

    <!-- ============================================================ review page -->
    <main v-else-if="state.stage === 'review'" class="flex-1 overflow-auto">
      <div class="mx-auto max-w-4xl px-6 py-8">
        <div class="mb-8 flex items-center justify-between border-b border-[var(--line)] pb-8">
          <p>Check your answers, then submit. You can still go back to any question.</p>
          <button class="flex items-center gap-3 bg-black px-6 py-2.5 text-white" @click="ui.confirmSubmit = true">
            <Icon name="send" /> Submit
          </button>
        </div>
        <section v-for="(p, pi) in test.parts" :key="pi" class="mb-6">
          <h2 class="mb-2 font-bold">Part {{ p.number }} <span class="ml-2 font-normal text-[var(--muted)]">{{ session.attemptedCount(pi) }} of {{ session.partQuestions(pi).length }} questions attempted</span></h2>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="n in session.partQuestions(pi)"
              :key="n"
              class="h-9 w-9 border"
              :class="session.isAttempted(n) ? 'border-[var(--done)] font-bold' : 'border-[var(--line)] text-[var(--muted)]'"
              @click="(session.goTo(n), (state.stage = 'test'))"
            >{{ n }}</button>
          </div>
        </section>
      </div>
      <div v-if="ui.confirmSubmit" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div class="w-[480px] bg-[var(--bg)] p-6 shadow-lg">
          <h2 class="mb-3 text-xl">Submit your answers?</h2>
          <p class="mb-6">You will not be able to change your answers after submitting.</p>
          <div class="flex justify-end gap-3">
            <button class="border border-[var(--fg)] px-5 py-2" @click="ui.confirmSubmit = false">Cancel</button>
            <button class="bg-black px-5 py-2 text-white" @click="state.stage = 'finished'">Submit</button>
          </div>
        </div>
      </div>
    </main>

    <!-- ================================================================== test -->
    <div v-else class="flex min-h-0 flex-1" @mousedown="onMouseDown" @mouseup="onMouseUp">
      <div class="flex min-w-0 flex-1 flex-col">
        <div class="mx-4 mt-4 flex-none border border-[var(--line)] bg-[var(--part-bg)] px-4 py-3">
          <div class="font-bold">Part {{ part.number }}</div>
          <div>Read the text and answer questions {{ part.groups[0].from }}–{{ part.groups.at(-1).to }}.</div>
        </div>

        <div ref="splitBox" class="relative mt-4 min-h-0 flex-1">
          <div
            v-for="(p, pi) in test.parts"
            v-show="pi === partIndex"
            :key="pi"
            class="absolute inset-0 flex"
          >
            <div class="overflow-y-auto pb-8 pl-4 pr-4 pt-6" :style="{ width: ui.split + '%' }">
              <Passage :part="p" :session="session" skin="current" />
            </div>
            <SplitDivider @resize="resize" />
            <div class="flex-1 overflow-y-auto pb-28 pt-2">
              <QuestionsPane :part="p" :session="session" />
            </div>
          </div>
          <div class="absolute bottom-9 right-8 z-20 flex gap-[2.4px]">
            <button class="cu-arrow" :class="isFirst ? 'cursor-default bg-[#ddd]' : 'bg-[#444]'" :disabled="isFirst" aria-label="Previous" @click="session.step(-1)">
              <Icon name="left" />
            </button>
            <button class="cu-arrow bg-black" aria-label="Next" @click="next"><Icon name="right" /></button>
          </div>
        </div>

        <!-- footer -->
        <footer class="flex h-[53px] flex-none">
          <div
            v-for="(p, pi) in test.parts"
            :key="pi"
            class="mx-px flex min-w-0 flex-1 border-t-[3px] border-[var(--bg)]"
            :class="pi === partIndex ? 'min-w-fit' : 'justify-center'"
          >
            <template v-if="pi === partIndex">
              <button class="cu-footer-part whitespace-nowrap px-5 font-semibold text-[var(--fg)]" @click="goToPart(pi)">Part {{ p.number }}</button>
              <span class="flex">
                <button
                  v-for="it in footerItems(pi)"
                  :key="it.n"
                  class="cu-footer-q"
                  :class="{ attempted: itemAttempted(it), current: itemCurrent(it) }"
                  @click="session.goTo(it.n)"
                >{{ it.label }}</button>
              </span>
            </template>
            <button
              v-else
              class="w-full whitespace-nowrap px-5 text-center text-[var(--fg)] hover:bg-[#efefef] hover:text-[#262626]"
              @click="goToPart(pi)"
            >
              <span class="mr-4">Part {{ p.number }}</span><span class="text-[#757575]">{{ session.attemptedCount(pi) }} of {{ session.partQuestions(pi).length }}</span>
            </button>
          </div>
          <button class="flex h-full w-[77px] flex-none items-center justify-center bg-[#efefef] text-[#535353]" aria-label="Review your answers" @click="state.stage = 'review'">
            <Icon name="check" />
          </button>
        </footer>
      </div>

      <!-- notes sidebar -->
      <aside v-if="ui.notes" class="flex w-[300px] flex-none flex-col border-l border-[var(--line)] bg-[#e6e6e6] text-black">
        <div class="flex h-14 items-center justify-between bg-white px-4">
          <span>Notes</span>
          <button title="Close notes" @click="ui.notes = false">✖</button>
        </div>
        <div class="flex-1 overflow-y-auto">
          <p v-if="!state.notes.length" class="p-4 text-sm text-gray-600">
            Select some text and choose <b>Note</b> to add a note.
          </p>
          <div v-for="note in notesByPart" :key="note.id" class="mt-1 bg-[#1e40c8] p-4 text-white" @click="showNoteInText(note)">
            <div class="mb-3"><b>Part {{ test.parts[note.partIndex].number }}</b> <i class="ml-1">{{ note.quote }}</i></div>
            <textarea
              :id="`note-${note.id}`"
              v-model="note.text"
              rows="2"
              class="w-full resize-y bg-white p-1.5 text-black outline-none"
              @click.stop
              @focus="focusMark(note.id)"
            />
            <div class="mt-2 text-right"><button @click.stop="deleteNote(note)">Delete</button></div>
          </div>
        </div>
      </aside>

      <!-- selection / highlight popups -->
      <div v-if="pop.kind" class="cu-popup fixed z-40 flex" :style="{ left: pop.x + 'px', top: pop.y + 'px' }" @mousedown.prevent>
        <template v-if="pop.kind === 'select'">
          <button class="flex flex-col items-center px-3 py-1.5 hover:bg-gray-100" title="Note (a)" @click="addNote">
            <Icon name="quote" size="14" /> Note
          </button>
          <button class="flex flex-col items-center px-3 py-1.5 hover:bg-gray-100" title="Highlight (h)" @click="highlight">
            <Icon name="marker" size="14" /> Highlight
          </button>
        </template>
        <button v-else class="flex flex-col items-center px-3 py-1.5 leading-tight hover:bg-gray-100" @click="deleteHighlight">
          <Icon name="trash" size="14" /> Delete<br />Highlight
        </button>
      </div>
    </div>

    <!-- ============================================================== options -->
    <div v-if="ui.options" class="fixed inset-0 z-50 overflow-auto bg-[var(--bg)] text-[var(--fg)]">
      <button class="absolute right-8 top-5 text-2xl" title="Close options" @click="ui.options = null">✖</button>
      <div class="mx-auto mt-6 max-w-[700px] px-4">
        <div class="relative mb-6 text-center text-[1.6em]">
          <button v-if="ui.options !== 'menu'" class="absolute left-0 top-2 text-base" @click="ui.options = 'menu'">‹ Back to options</button>
          {{ { menu: 'Options', contrast: 'Contrast', size: 'Text size' }[ui.options] }}
        </div>
        <template v-if="ui.options === 'menu'">
          <button
            class="mb-4 flex w-full items-center rounded border border-[#e31837] bg-[#e31837] px-9 py-6 text-left text-white"
            @click="(ui.options = null), (state.stage = 'review')"
          >
            <Icon name="send" /><span class="ml-6 flex-1">Go to submission page</span>›
          </button>
          <div class="rounded border border-[var(--line)]">
            <button class="flex w-full items-center border-b border-[var(--line)] px-9 py-6 text-left" @click="ui.options = 'contrast'">
              <span class="w-6 opacity-50">◐</span><span class="ml-6 flex-1">Contrast</span>›
            </button>
            <button class="flex w-full items-center px-9 py-6 text-left" @click="ui.options = 'size'">
              <span class="w-6 opacity-50">🔍</span><span class="ml-6 flex-1">Text size</span>›
            </button>
          </div>
        </template>
        <div v-else class="rounded border border-[var(--line)]">
          <button
            v-for="(label, key) in ui.options === 'contrast'
              ? { wb: 'Black on white', wob: 'White on black', yob: 'Yellow on black' }
              : { regular: 'Regular', large: 'Large', xlarge: 'Extra large' }"
            :key="key"
            class="flex w-full items-center border-b border-[var(--line)] px-9 py-5 text-left last:border-b-0"
            @click="ui.options === 'contrast' ? (ui.theme = key) : (ui.size = key)"
          >
            <span class="w-8">{{ (ui.options === 'contrast' ? ui.theme : ui.size) === key ? '✔' : '' }}</span>{{ label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
