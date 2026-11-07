// Scoring helpers. NOT part of the real test interface: the results screen is a
// self-study addition to this demo.

const norm = (s) => String(s ?? '').trim().toLowerCase().replace(/\s+/g, ' ')

const labelFor = (group, value) => {
  const opt = (group.options || []).find((o) => o.value === value)
  return opt && opt.label !== value ? `${value} (${opt.label})` : value
}

// Returns one row per question number: { n, given, expected, correct }
export function checkGroup(group, answers) {
  const rows = []
  if (group.type === 'multi') {
    const sel = answers[group.from] || []
    const remaining = [...group.answers]
    const correct = sel.filter((v) => remaining.includes(v))
    const wrong = sel.filter((v) => !remaining.includes(v))
    // Each correct option earns one mark, in any order.
    for (let n = group.from, i = 0; n <= group.to; n++, i++) {
      const given = correct[i] ?? wrong[i - correct.length]
      rows.push({
        n,
        given: given ? labelFor(group, given) : '',
        expected: group.answers.map((v) => v).join(' / '),
        correct: i < correct.length,
      })
    }
    return rows
  }

  for (let n = group.from; n <= group.to; n++) {
    const given = answers[n] ?? ''
    let expected
    let correct
    if (group.type === 'gap' || group.type === 'diagram' || group.type === 'short') {
      const alts = group.type === 'short' ? group.questions.find((x) => x.n === n).answer : group.answers[n]
      expected = alts.join(' / ')
      correct = alts.some((a) => norm(a) === norm(given))
    } else if (group.type === 'gapdrag') {
      expected = labelFor(group, group.answers[n])
      correct = norm(given) === norm(group.answers[n])
    } else {
      const q = group.questions.find((x) => x.n === n)
      expected = labelFor({ options: q.options || group.options }, q.answer)
      correct = norm(given) === norm(q.answer)
    }
    const shown = ['gap', 'diagram', 'short'].includes(group.type) ? given : given ? labelFor({ options: findOptions(group, n) }, given) : ''
    rows.push({ n, given: shown, expected, correct })
  }
  return rows
}

function findOptions(group, n) {
  const q = group.questions?.find((x) => x.n === n)
  return q?.options || group.options || []
}

// Approximate Academic Reading raw score -> band conversion. The official table
// varies slightly between test versions, so this is a guide only.
const TABLE = [
  [39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6],
  [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [0, 0],
]
export function rawToBand(raw) {
  return TABLE.find(([min]) => raw >= min)[1]
}
