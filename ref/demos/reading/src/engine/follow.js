import { nextTick, watch } from 'vue'

// When the current question changes (footer click, next/previous), scroll it
// into view and focus its input if it has one.
export function useFollowCurrent(session) {
  watch(
    () => session.state.current,
    async (n) => {
      await nextTick()
      const el = document.getElementById(`q-${n}`)
      if (!el) return
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      if (el.contains(document.activeElement)) return
      if (el.matches('input, .drop-slot')) el.focus({ preventScroll: true })
    },
  )
}
