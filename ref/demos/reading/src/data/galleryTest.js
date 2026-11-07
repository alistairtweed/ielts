// Interaction gallery: one example of every Reading question type, for checking
// appearance and behaviour. Original content, based on the "Light After Dark"
// passage from the sample test.
import sample from './sampleTest.js'

const passage = sample.parts[1]
const choicePassage = sample.parts[2]

// Headings use a passage without paragraph letters, as in the real test.
const headings = JSON.parse(JSON.stringify(choicePassage.groups.find((g) => g.type === 'headings')))
const offset = 42 - headings.from
headings.from += offset
headings.to += offset
headings.questions.forEach((q) => (q.n += offset))
headings.gallery = 'Match the paragraph headings'

// Original diagram: a shielded streetlight beside a house.
const streetlight = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 380" width="640" height="380" font-family="Arial, sans-serif" font-size="14">
  <rect width="640" height="380" fill="#fff"/>
  <line x1="0" y1="340" x2="640" y2="340" stroke="#333" stroke-width="2"/>
  <rect x="150" y="80" width="10" height="260" fill="#555"/>
  <path d="M155 82 h120" stroke="#555" stroke-width="8" fill="none"/>
  <path d="M235 78 h90 l-15 26 h-60 z" fill="#333"/>
  <ellipse cx="280" cy="108" rx="20" ry="6" fill="#ffd34d"/>
  <path d="M262 110 L205 338 L355 338 L298 110 z" fill="#ffd34d" opacity=".35"/>
  <rect x="440" y="200" width="150" height="140" fill="#eee" stroke="#333" stroke-width="2"/>
  <path d="M425 205 L515 140 L605 205 z" fill="#ccc" stroke="#333" stroke-width="2"/>
  <rect x="465" y="235" width="40" height="40" fill="#cfe3f5" stroke="#333" stroke-width="2"/>
  <path d="M310 112 L462 250" stroke="#e0a800" stroke-width="2" stroke-dasharray="6 5"/>
  <line x1="280" y1="78" x2="300" y2="40" stroke="#333"/>
  <line x1="270" y1="250" x2="215" y2="250" stroke="#333"/>
  <line x1="400" y1="200" x2="400" y2="170" stroke="#333"/>
</svg>`

const gallery = {
  id: 'gallery',
  title: 'Interaction gallery',
  durationMinutes: 60,
  candidate: sample.candidate,
  parts: [
    {
      number: 1,
      title: passage.title,
      subtitle: passage.subtitle,
      paragraphs: passage.paragraphs,
      groups: [
        // ------------------------------------------------------- COMPLETION
        {
          gallery: 'Complete the notes',
          type: 'gap',
          from: 1, to: 3,
          instructions: 'Complete the notes. Write <b>ONE WORD ONLY</b> from the text for each answer.',
          title: 'Light pollution',
          template: `
            <ul><li>the brightening of the night sky over towns is called [[1]]</li></ul>
            <ul><li>very bright light that is uncomfortable to look at is known as [[2]]</li></ul>
            <ul><li>light that enters a home through a window is an example of light [[3]]</li></ul>`,
          answers: { 1: ['skyglow'], 2: ['glare'], 3: ['trespass'] },
        },
        {
          gallery: 'Complete the table',
          type: 'gap',
          from: 4, to: 6,
          instructions: 'Complete the table. Write <b>ONE WORD ONLY</b> from the text for each answer.',
          title: 'Effects of artificial light',
          template: `
            <table>
              <thead><tr><th>Affected</th><th>Effect</th></tr></thead>
              <tbody>
                <tr><td>sea turtles</td><td>hatchlings may move [[4]] instead of towards the sea</td></tr>
                <tr><td>insects</td><td>numbers may [[5]] because lights attract and exhaust them</td></tr>
                <tr><td>humans</td><td>light at night reduces production of [[6]]</td></tr>
              </tbody>
            </table>`,
          answers: { 4: ['inland'], 5: ['decline'], 6: ['melatonin'] },
        },
        {
          gallery: 'Complete the summary (from text)',
          type: 'gap',
          from: 7, to: 9,
          instructions: 'Complete the summary. Write <b>ONE WORD ONLY</b> from the text for each answer.',
          title: 'LED streetlights',
          template: '<p>Many cities have replaced old orange streetlights with white LEDs because they use far less [[7]]. However, some councils now install more lights than before, which economists describe as the [[8]] effect. Early LEDs also produced a lot of [[9]] light, which adds to skyglow.</p>',
          answers: { 7: ['electricity'], 8: ['rebound'], 9: ['blue'] },
        },
        {
          gallery: 'Complete the summary (from list)',
          type: 'gapdrag',
          from: 10, to: 12,
          instructions: 'Complete the summary using the list of words below.',
          title: 'Dark sky places',
          optionsTitle: 'List of words',
          reuse: false,
          template: '<p>Dark sky places follow [[10]] rules about lighting and teach people about the night. They also benefit from visitors who come to look at the stars, often during the [[11]] months, which helps local [[12]].</p>',
          options: [
            { value: 'A', label: 'strict' },
            { value: 'B', label: 'flexible' },
            { value: 'C', label: 'quiet' },
            { value: 'D', label: 'summer' },
            { value: 'E', label: 'businesses' },
            { value: 'F', label: 'scientists' },
          ],
          answers: { 10: 'A', 11: 'C', 12: 'E' },
        },
        {
          gallery: 'Complete the sentences',
          type: 'sentences',
          from: 13, to: 15,
          instructions: 'Complete the sentences. Write <b>NO MORE THAN TWO WORDS</b> from the text for each answer.',
          questions: [
            { n: 13, text: 'Newly hatched sea turtles move towards the [[13]] they can see.', answer: ['brightest horizon'] },
            { n: 14, text: 'According to Lindqvist, [[14]] probably affect sleep more than streetlights.', answer: ['indoor screens', 'screens'] },
            { n: 15, text: 'Rao believes good lighting means the right amount of light in the right place at the right [[15]].', answer: ['time'] },
          ],
        },
        {
          gallery: 'Label the diagram',
          type: 'diagram',
          from: 16, to: 18,
          instructions: 'Label the diagram. Write <b>ONE WORD ONLY</b> from the text for each answer.',
          title: 'Reducing light pollution from a streetlight',
          image: streetlight,
          labels: [
            { n: 16, x: 50, y: 9 },
            { n: 17, x: 23, y: 66 },
            { n: 18, x: 63, y: 42 },
          ],
          answers: { 16: ['shielding', 'shield'], 17: ['warmer'], 18: ['trespass'] },
        },
        {
          gallery: 'Short answer',
          type: 'short',
          from: 19, to: 21,
          instructions: 'Answer the questions. Write <b>NO MORE THAN TWO WORDS</b> from the text for each answer.',
          questions: [
            { n: 19, text: 'Which hormone is affected by light at night?', answer: ['melatonin'] },
            { n: 20, text: 'What type of streetlight have many cities installed?', answer: ['white LEDs', 'LEDs', 'LED'] },
            { n: 21, text: 'What kind of tourism do dark sky places attract?', answer: ['astro-tourism', 'astrotourism'] },
          ],
        },

        // ----------------------------------------------------- VERIFICATION
        {
          gallery: 'True / False / Not Given',
          type: 'single',
          from: 22, to: 23,
          instructions: 'Choose <b>TRUE</b> if the statement agrees with the information given in the text, choose <b>FALSE</b> if the statement contradicts the information, or choose <b>NOT GIVEN</b> if there is no information on this.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'].map((v) => ({ value: v, label: v })),
          questions: [
            { n: 22, text: 'Most people in the world now live under skies affected by artificial light.', answer: 'TRUE' },
            { n: 23, text: 'Sea turtles lay more eggs on beaches without lights.', answer: 'NOT GIVEN' },
          ],
        },
        {
          gallery: 'Yes / No / Not Given',
          type: 'single',
          from: 24, to: 25,
          instructions: 'Choose <b>YES</b> if the statement agrees with the claims of the writer, choose <b>NO</b> if the statement contradicts the claims of the writer, or choose <b>NOT GIVEN</b> if it is impossible to say what the writer thinks about this.',
          options: ['YES', 'NO', 'NOT GIVEN'].map((v) => ({ value: v, label: v })),
          questions: [
            { n: 24, text: 'Energy-saving lighting has always reduced light pollution.', answer: 'NO' },
            { n: 25, text: 'Light pollution is cheaper to reduce than many other kinds of pollution.', answer: 'YES' },
          ],
        },

        // --------------------------------------------------------- MATCHING
        {
          gallery: 'Match the paragraph information',
          type: 'match',
          from: 26, to: 28,
          instructions: 'The text has six sections, <b>A–F</b>. Which section contains the following information? You may use any letter more than once.',
          reuse: true,
          options: ['A', 'B', 'C', 'D', 'E', 'F'].map((v) => ({ value: v, label: v })),
          questions: [
            { n: 26, text: 'an example of an animal that uses light to find its way', answer: 'B' },
            { n: 27, text: 'definitions of different types of light pollution', answer: 'A' },
            { n: 28, text: 'an unintended consequence of a change in technology', answer: 'D' },
          ],
        },
        {
          gallery: 'Match the statements',
          type: 'match',
          from: 33, to: 35,
          instructions: 'Look at the following statements and the list of people. Match each statement with the correct person, <b>A–C</b>.',
          reuse: true,
          optionsTitle: 'List of people',
          options: [
            { value: 'A', label: 'Dr Maria Okafor' },
            { value: 'B', label: 'Professor Tom Lindqvist' },
            { value: 'C', label: 'Sunita Rao' },
          ],
          questions: [
            { n: 33, text: 'The quantity of light matters less than how it is used.', answer: 'C' },
            { n: 34, text: 'Research has not yet shown that outdoor light directly harms health.', answer: 'B' },
            { n: 35, text: 'One cause of a decline has received less attention than others.', answer: 'A' },
          ],
        },
        {
          gallery: 'Match the sentence endings',
          type: 'match',
          display: 'drag',
          from: 36, to: 38,
          instructions: 'Complete each sentence with the correct ending, <b>A–E</b>, below.',
          optionsTitle: 'List of endings',
          reuse: false,
          options: [
            { value: 'A', label: 'because they are cheap to run.' },
            { value: 'B', label: 'during quieter times of the year.' },
            { value: 'C', label: 'without any rise in crime.' },
            { value: 'D', label: 'because of new national laws.' },
            { value: 'E', label: 'when beaches are lit.' },
          ],
          questions: [
            { n: 36, text: 'Some councils have installed more LED lights', answer: 'A' },
            { n: 37, text: 'Several towns have reduced their lighting', answer: 'C' },
            { n: 38, text: 'Astro-tourists often visit dark sky places', answer: 'B' },
          ],
        },

        // ----------------------------------------------------------- CHOICE
        {
          gallery: 'Multiple choice (one)',
          type: 'single',
          from: 39, to: 39,
          instructions: 'Choose the correct answer.',
          questions: [
            {
              n: 39,
              text: 'What is the main purpose of Section E?',
              options: [
                { value: 'A', label: 'to compare light pollution with other types of pollution' },
                { value: 'B', label: 'to describe practical ways of reducing light pollution' },
                { value: 'C', label: 'to explain why towns have reduced crime' },
                { value: 'D', label: 'to argue that streetlights should be removed' },
              ],
              answer: 'B',
            },
          ],
        },
        {
          gallery: 'Multiple choice (two)',
          type: 'multi',
          from: 40, to: 41,
          instructions: 'Choose <b>TWO</b> correct answers.',
          stem: 'Which <b>TWO</b> problems with LED streetlights are mentioned in Section D?',
          options: [
            { value: 'A', label: 'They are more expensive to install than older lights.' },
            { value: 'B', label: 'Their low running costs have led to more lighting being used.' },
            { value: 'C', label: 'They fail more often in cold weather.' },
            { value: 'D', label: 'Some types produce light that spreads more widely in the sky.' },
            { value: 'E', label: 'They are less effective at preventing crime.' },
          ],
          answers: ['B', 'D'],
        },
      ],
    },
    {
      number: 2,
      title: choicePassage.title,
      subtitle: choicePassage.subtitle,
      paragraphLabels: false,
      paragraphs: choicePassage.paragraphs,
      groups: [headings],
    },
  ],
}

// Number the questions consecutively across both passages.
function renumber(test) {
  let next = 1
  for (const part of test.parts) {
    for (const g of part.groups) {
      const d = next - g.from
      g.from += d
      g.to += d
      g.questions?.forEach((q) => (q.n += d))
      g.labels?.forEach((l) => (l.n += d))
      if (g.answers && !Array.isArray(g.answers)) {
        g.answers = Object.fromEntries(Object.entries(g.answers).map(([k, v]) => [Number(k) + d, v]))
      }
      if (g.template) g.template = g.template.replace(/\[\[(\d+)\]\]/g, (_, n) => `[[${Number(n) + d}]]`)
      g.questions?.forEach((q) => q.text && (q.text = q.text.replace(/\[\[(\d+)\]\]/g, (_, n) => `[[${Number(n) + d}]]`)))
      next = g.to + 1
    }
  }
  return test
}

export default renumber(gallery)
