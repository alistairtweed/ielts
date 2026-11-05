import { onBeforeUnmount, watch } from 'vue'

// Counts state.remaining down once per second while state.stage is 'test'
// (or 'review', since the clock keeps running there). Calls onEnd at zero.
export function useTimer(session, onEnd) {
  let id = null
  const tick = () => {
    if (session.state.remaining > 0) session.state.remaining--
    if (session.state.remaining <= 0) {
      stop()
      onEnd?.()
    }
  }
  const start = () => {
    if (!id) id = setInterval(tick, 1000)
  }
  const stop = () => {
    clearInterval(id)
    id = null
  }
  watch(
    () => session.state.stage,
    (stage) => (stage === 'test' || stage === 'review' ? start() : stop()),
    { immediate: true },
  )
  onBeforeUnmount(stop)
}

export function minutesLeft(seconds) {
  return Math.ceil(seconds / 60)
}

export function mmss(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}
