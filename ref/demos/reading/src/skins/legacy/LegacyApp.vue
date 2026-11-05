<script setup>
import { computed, reactive, ref } from 'vue'
import test from '../../data/sampleTest.js'
import { createSession } from '../../engine/session.js'
import { useTimer, minutesLeft } from '../../engine/timer.js'
import { useFollowCurrent } from '../../engine/follow.js'
import { selectionRange, wrapRange, unwrap, unwrapAll, annotationAt } from '../../engine/annotate.js'
import Passage from '../../components/Passage.vue'
import QuestionsPane from '../../components/QuestionsPane.vue'
import ResultsView from '../../components/ResultsView.vue'

const session = createSession(test)
const { state } = session
useTimer(session, () => (state.stage = 'finished'))
useFollowCurrent(session)

const candidateLine = `${test.candidate.name} - ${test.candidate.number}`
const part = computed(() => test.parts[session.currentPartIndex.value])
const isLast = computed(() => state.current === session.index.at(-1).n)
const isFirst = computed(() => state.current === session.index[0].n)

// The clock flashes for 10 seconds at 10 and 5 minutes remaining.
const alerting = computed(() => [600, 300].some((t) => state.remaining <= t && state.remaining > t - 10))

const ui = reactive({ help: false, helpTab: 'task', hidden: false, finish: false, navMin: false, notesVisible: true })

function next() {
  if (isLast.value) ui.finish = true
  else session.step(1)
}

// ------------------------------------------------ right-click annotations
const ctx = reactive({ open: false, x: 0, y: 0, items: [], range: null, ann: null })
const partRefs = ref([])

function onContextMenu(e) {
  e.preventDefault()
  const range = selectionRange()
  const ann = annotationAt(e.target)
  let items = []
  if (range) items = ['Highlight', 'Notes']
  else if (ann) items = ['Notes', 'Clear', 'Clear all']
  if (!items.length) return (ctx.open = false)
  Object.assign(ctx, { open: true, x: e.clientX, y: e.clientY, items, range: range?.cloneRange(), ann })
}

function noteFor(id) {
  return state.notes.find((n) => n.id === id)
}

function openNote(id, quote = '') {
  let note = noteFor(id)
  if (!note) {
    note = { id, partIndex: session.currentPartIndex.value, quote, text: '', x: ctx.x + 10, y: ctx.y + 10, open: true }
    state.notes.push(note)
  }
  note.open = true
  ui.notesVisible = true
}

function runCtx(item) {
  ctx.open = false
  if (item === 'Highlight') wrapRange(ctx.range, { cls: 'ann-hl' })
  if (item === 'Notes' && ctx.range) {
    const { id, quote } = wrapRange(ctx.range, { cls: 'ann-note' })
    openNote(id, quote)
  } else if (item === 'Notes' && ctx.ann) {
    // Adding a note to an existing highlight turns it into a note highlight.
    document.querySelectorAll(`mark[data-ann="${ctx.ann.id}"]`).forEach((m) => m.classList.replace('ann-hl', 'ann-note'))
    openNote(ctx.ann.id, ctx.ann.el.textContent)
  }
  if (item === 'Clear') {
    unwrap(ctx.ann.id)
    state.notes = state.notes.filter((n) => n.id !== ctx.ann.id)
  }
  if (item === 'Clear all') {
    const root = partRefs.value[session.currentPartIndex.value]
    const ids = unwrapAll(root)
    state.notes = state.notes.filter((n) => !ids.includes(n.id))
  }
}

// Sticky notes can be dragged by their header bar.
function dragNote(note, e) {
  const dx = e.clientX - note.x
  const dy = e.clientY - note.y
  const move = (ev) => Object.assign(note, { x: ev.clientX - dx, y: ev.clientY - dy })
  const up = () => removeEventListener('mousemove', move) || removeEventListener('mouseup', up)
  addEventListener('mousemove', move)
  addEventListener('mouseup', up)
}

const restart = () => location.reload()

const helpTabs = { info: 'Information', test: 'Test help', task: 'Task help' }
</script>

<template>
  <div class="skin-legacy flex h-full flex-col" @click="ctx.open = false">
    <!-- ======================================================= start screens -->
    <template v-if="state.stage === 'details' || state.stage === 'instructions'">
      <div class="flex h-[72px] items-center bg-white px-5">
        <!-- Logo area intentionally left as a neutral placeholder -->
        <div class="text-2xl font-bold tracking-wide text-gray-700">Reading Test Demo</div>
      </div>
      <div class="lg-bar h-7 px-3 text-sm leading-7">
        <span v-if="state.stage === 'instructions'">👤 {{ candidateLine }}</span>
      </div>

      <div v-if="state.stage === 'details'" class="mx-auto mt-14 w-[770px]">
        <div class="lg-modal-head px-4 py-2">Confirm your details</div>
        <div class="lg-modal-body border border-white px-4 py-3">
          <p>Name: <b>{{ test.candidate.name }}</b></p>
          <p>Date of birth: <b>{{ test.candidate.dob }}</b></p>
          <p>Candidate number: <b>{{ test.candidate.number }}</b></p>
          <p class="mt-4">ℹ️ If your details are not correct, please inform the invigilator.</p>
          <div class="my-3 text-center"><button class="lg-btn" @click="state.stage = 'instructions'">My details are correct</button></div>
        </div>
      </div>

      <div v-else class="lg-panel m-3 p-3">
        <h1 class="mb-3 text-lg font-bold">IELTS Academic Reading</h1>
        <p class="mb-3">Time: 1 hour</p>
        <h2 class="font-bold">INSTRUCTIONS TO CANDIDATES</h2>
        <ul class="mb-3 ml-14 mt-2 list-disc">
          <li>Answer <b>all</b> the questions.</li>
          <li>You can change your answers at any time during the test.</li>
        </ul>
        <h2 class="font-bold">INFORMATION FOR CANDIDATES</h2>
        <ul class="mb-3 ml-14 mt-2 list-disc">
          <li>There are 40 questions in this test.</li>
          <li>Each question carries one mark.</li>
          <li>The test clock will show you when there are 10 minutes and 5 minutes remaining.</li>
        </ul>
        <p class="mt-4 text-center font-bold text-gray-600">ℹ️ Do not click ‘Start test’ until you are told to do so.</p>
        <div class="my-3 text-center"><button class="lg-btn" @click="state.stage = 'test'">Start test</button></div>
      </div>
    </template>

    <!-- ============================================================ results -->
    <div v-else-if="state.stage === 'finished'" class="h-full overflow-auto bg-white">
      <ResultsView :session="session" @restart="restart" />
    </div>

    <!-- =============================================================== test -->
    <template v-else>
      <div class="lg-bar relative flex h-7 items-center justify-between px-3 text-sm">
        <span>👤 {{ candidateLine }}</span>
        <span class="absolute left-1/2 -translate-x-1/2" :class="{ 'animate-pulse text-red-400': alerting }">
          ⏰ <span class="text-lg">{{ minutesLeft(state.remaining) }}</span> minutes left
        </span>
        <span class="flex gap-2">
          <button class="lg-btn !py-0 !text-sm" @click.stop="ui.help = true">Help ❔</button>
          <button class="lg-btn !py-0 !text-sm" @click="ui.hidden = true">Hide</button>
        </span>
      </div>

      <div class="lg-panel mx-3 mt-3 px-3 py-2">
        <h2 class="mb-4 text-lg font-bold">Part {{ part.number }}</h2>
        <p>
          Read the text below and answer questions
          <b>{{ part.groups[0].from }}</b> – <b>{{ part.groups.at(-1).to }}</b>.
        </p>
      </div>

      <div class="lg-panel relative mx-3 mt-3 min-h-0 flex-1" @contextmenu="onContextMenu">
        <div
          v-for="(p, pi) in test.parts"
          v-show="pi === session.currentPartIndex.value"
          :key="pi"
          :ref="(el) => (partRefs[pi] = el)"
          class="absolute inset-0 grid grid-cols-2 gap-6 p-3"
        >
          <div class="overflow-y-auto pr-2"><Passage :part="p" :session="session" /></div>
          <div class="overflow-y-auto pr-2"><QuestionsPane :part="p" :session="session" skin="legacy" /></div>
        </div>
      </div>

      <!-- navigation -->
      <div class="flex h-[78px] items-end gap-2 px-2 pb-1">
        <label class="mb-2 flex items-center gap-1 text-[13px]">
          <input type="checkbox" :checked="!!state.flags[state.current]" @change="session.toggleFlag(state.current)" /> Review
        </label>
        <div v-if="!ui.navMin" class="relative flex-1 rounded-t border border-gray-300 bg-white/70 px-2 py-1">
          <div class="flex flex-wrap gap-x-1 gap-y-1">
            <span v-for="(p, pi) in test.parts" :key="pi" class="inline-flex flex-nowrap gap-1">
              <span class="mx-1 self-center whitespace-nowrap text-[13px] font-bold">Part {{ p.number }}</span>
              <button
                v-for="n in session.partQuestions(pi)"
                :key="n"
                class="lg-nav-q"
                :class="{ current: n === state.current, answered: session.isAttempted(n), flagged: state.flags[n] }"
                @click="session.goTo(n)"
              >{{ n }}</button>
            </span>
          </div>
          <button class="absolute -top-3 right-2 rounded bg-white px-1 text-xs shadow" title="navigation summary" @click="ui.navMin = true">▼</button>
        </div>
        <div v-else class="relative flex flex-1 items-center gap-[6px] pb-2">
          <button
            v-for="q in session.index"
            :key="q.n"
            class="lg-nav-mini"
            :class="{ current: q.n === state.current, answered: session.isAttempted(q.n), flagged: state.flags[q.n] }"
            :title="`Question ${q.n}`"
            @click="session.goTo(q.n)"
          />
          <button class="ml-2 rounded bg-white px-1 text-xs shadow" title="navigation details" @click="ui.navMin = false">▲</button>
        </div>
        <button class="mb-1 text-2xl" title="Show / hide notes" @click="ui.notesVisible = !ui.notesVisible">📝</button>
        <button v-if="!isFirst" class="lg-round mb-1" title="Previous question" @click="session.step(-1)">
          <svg width="26" height="22" viewBox="0 0 26 22"><path d="M11 0 0 11l11 11v-7h15V7H11z" /></svg>
        </button>
        <button class="lg-round mb-1" :title="isLast ? 'Finish test' : 'Next question'" @click="next">
          <svg width="26" height="22" viewBox="0 0 26 22"><path d="M15 0l11 11-11 11v-7H0V7h15z" /></svg>
        </button>
      </div>
    </template>

    <!-- ============================================================ overlays -->
    <ul v-if="ctx.open" class="lg-ctx fixed z-50" :style="{ left: ctx.x + 'px', top: ctx.y + 'px' }" @click.stop>
      <li v-for="item in ctx.items" :key="item" @click="runCtx(item)">
        <span>{{ { Highlight: '🖍️', Notes: '📝', Clear: '🧽', 'Clear all': '⛔' }[item] }}</span>{{ item }}
      </li>
    </ul>

    <template v-if="state.stage === 'test' && ui.notesVisible">
      <div
        v-for="note in state.notes.filter((n) => n.open && n.partIndex === session.currentPartIndex.value)"
        :key="note.id"
        class="lg-note fixed z-40"
        :style="{ left: note.x + 'px', top: note.y + 'px' }"
      >
        <div class="lg-note-head" @mousedown.prevent="dragNote(note, $event)">
          <button class="mr-1 text-xs font-bold text-red-700" title="Close" @mousedown.stop @click="note.open = false">✕</button>
        </div>
        <textarea v-model="note.text" class="h-[220px] w-full resize-none bg-transparent p-2 outline-none" />
      </div>
    </template>

    <div v-if="ui.help" class="fixed inset-0 z-50 bg-black/40" @click.stop>
      <div class="mx-auto mt-14 w-[770px]">
        <div class="lg-modal-head flex items-center justify-between px-4 py-2">
          <span>Help</span><button class="text-sm" @click="ui.help = false">✕</button>
        </div>
        <div class="lg-modal-body px-3 pb-4 pt-3">
          <div class="flex gap-1 border-b border-gray-400">
            <button
              v-for="(label, k) in helpTabs"
              :key="k"
              class="rounded-t border border-gray-400 px-4 py-1 font-bold"
              :class="ui.helpTab === k ? '-mb-px border-b-white bg-white' : 'bg-gray-200 text-gray-700'"
              @click="ui.helpTab = k"
            >{{ label }}</button>
          </div>
          <div class="h-[330px] overflow-auto bg-white/60 p-3 leading-relaxed">
            <template v-if="ui.helpTab === 'info'">
              <p>This is a reference demo of the 2019 computer-delivered Reading interface. The clock is still running while Help is open.</p>
            </template>
            <template v-else-if="ui.helpTab === 'test'">
              <p class="mb-2"><b>Moving around the test:</b> click a question number at the bottom of the screen, or use the arrows.</p>
              <p class="mb-2"><b>Review:</b> tick <i>Review</i> to mark the current question; its number becomes round.</p>
              <p class="mb-2"><b>Highlighting:</b> select text, right-click and choose <i>Highlight</i>. Right-click a highlight to clear it.</p>
              <p class="mb-2"><b>Notes:</b> select text, right-click and choose <i>Notes</i>. Drag a note by its top bar.</p>
              <p><b>Hide:</b> hides the screen. The clock does not stop.</p>
            </template>
            <template v-else>
              <p class="mb-2">To choose a question, either click on the question number at the bottom of the screen or click on the question.</p>
              <hr class="my-3" />
              <p class="mb-1 font-bold">Questions in an accordion</p>
              <p class="mb-3">Choose your question by clicking on it, then choose an answer.</p>
              <p class="mb-1 font-bold">Gap fill</p>
              <p class="mb-3">Click in the box and type your answer.</p>
              <p class="mb-1 font-bold">Drag and drop</p>
              <p>Drag an answer into the gap, or click an answer and then click the gap.</p>
            </template>
          </div>
          <div class="mt-3 text-center"><button class="lg-btn" @click="ui.help = false">OK</button></div>
        </div>
      </div>
    </div>

    <div v-if="ui.hidden" class="fixed inset-0 z-50 bg-[#565656]">
      <div class="mx-auto mt-14 w-[770px]">
        <div class="lg-modal-head px-4 py-2">Screen hidden</div>
        <div class="lg-modal-body space-y-3 px-4 py-3">
          <p>Your answers have been stored.</p>
          <p>Please note that the clock is still running. The time has not been paused.</p>
          <p>If you wish to leave the room, please tell your invigilator.</p>
          <p>Click the button below to go back to your test.</p>
          <div class="pb-2 text-center"><button class="lg-btn" @click="ui.hidden = false">Resume test</button></div>
        </div>
      </div>
    </div>

    <div v-if="ui.finish" class="fixed inset-0 z-50 bg-black/40">
      <div class="mx-auto mt-24 w-[560px]">
        <div class="lg-modal-head px-4 py-2">End of test</div>
        <div class="lg-modal-body space-y-3 px-4 py-3">
          <p>You have reached the last question.</p>
          <p>
            Questions answered: <b>{{ session.index.filter((q) => session.isAttempted(q.n)).length }}</b> of {{ session.index.length }}.
          </p>
          <p>Do you want to finish the test now?</p>
          <div class="flex justify-center gap-3 pb-2">
            <button class="lg-btn" @click="ui.finish = false">Return to test</button>
            <button class="lg-btn" @click="(ui.finish = false), (state.stage = 'finished')">Finish test</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
