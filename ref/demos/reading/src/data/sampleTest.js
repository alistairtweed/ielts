// Sample Academic Reading test used by both interface demos.
// All passages and questions are ORIGINAL material written for this demo.
// No official test content is reproduced.
//
// Group types
//   single   one answer per question from a fixed option set (TFNG, YNNG, MCQ)
//   multi    choose N answers from a list; covers N consecutive question numbers
//   gap      type-in gaps inside an HTML template; tokens look like [[7]]
//   match    matching; display 'matrix' (default: table of radio buttons) or
//            'drag' (drop zone after each statement, e.g. sentence endings)
//   short    short-answer questions with typed answers
//   diagram  typed answer boxes positioned over an image
//   gapdrag  drop slots inside an HTML template, filled from an option list
//   headings drop slots placed at the top of passage paragraphs
//
// Answers: strings are compared case-insensitively. Gap answers can list
// acceptable alternatives.

export default {
  id: 'demo-reading-1',
  title: 'Academic Reading',
  durationMinutes: 60,
  candidate: { name: 'Test Candidate', dob: '01/01/2000', number: '000000' },
  parts: [
    // ---------------------------------------------------------------- PART 1
    {
      number: 1,
      title: 'The Pencil: A Short History',
      paragraphs: [
        { html: 'Few objects are as familiar, or as overlooked, as the pencil. Its story begins in the 1560s, when shepherds in Borrowdale, in the north of England, discovered a large deposit of an unusual black mineral beneath an uprooted tree. The substance left a dark, shiny mark and was soon being used to label sheep. Because it resembled lead, people called it ‘plumbago’, meaning ‘lead ore’, and the misunderstanding has survived in the everyday expression ‘pencil lead’, even though pencils have never contained lead. The mineral was in fact graphite, a form of carbon.' },
        { html: 'Borrowdale graphite was so pure that it could be sawn into sticks and used without further processing. Initially, users simply wrapped the sticks in string or sheepskin to keep their fingers clean. Its value grew rapidly once it was found to make excellent moulds for cannonballs, and the English Crown took control of the mine. At times, the site was deliberately flooded between periods of extraction to prevent theft, and armed guards searched miners as they left work.' },
        { html: 'The next major development took place in Italy, where craftsmen began placing graphite inside hollowed-out sticks of juniper wood. Later, a more efficient method appeared: two half-cylinders of wood were each cut with a groove, a strip of graphite was laid in one, and the two halves were glued together. This basic technique is still used in pencil factories today.' },
        { html: 'England’s near monopoly on high-quality graphite created difficulties for other countries, especially in times of war. In 1795, France, cut off from English supplies, asked the engineer Nicolas-Jacques Conté to find an alternative. Conté ground lower-quality graphite into a powder, mixed it with clay and water, and fired the mixture in a kiln. His process had an important advantage: by varying the proportion of clay, manufacturers could control how hard or soft a pencil was. More clay produced a harder pencil and a lighter line, while less clay produced a softer pencil and a darker line. This is the origin of the grading system familiar to artists today, in which H stands for ‘hard’ and B for ‘black’.' },
        { html: 'In the United States, pencil making became an industry in the nineteenth century. The writer Henry David Thoreau, better known for his reflections on nature, spent several years improving the pencils produced by his family’s business, and their products were considered among the best in the country. Meanwhile, the American preference for yellow pencils is often traced to the 1890s, when one manufacturer chose the colour for its most expensive range, which used graphite from China. Yellow was associated with China and with luxury, and competitors soon copied the colour so that their own pencils would appear equally high in quality.' },
        { html: 'Although digital devices have replaced the pencil for many purposes, billions are still made every year. Pencils work in extreme cold, on most surfaces and even upside down, which is why they remain standard equipment for many engineers, carpenters and scientists working in the field.' },
      ],
      groups: [
        {
          type: 'single',
          from: 1, to: 6,
          instructions: 'Choose <b>TRUE</b> if the statement agrees with the information given in the text, choose <b>FALSE</b> if the statement contradicts the information, or choose <b>NOT GIVEN</b> if there is no information on this.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'].map((v) => ({ value: v, label: v })),
          questions: [
            { n: 1, text: 'The material found at Borrowdale was first used to mark animals.', answer: 'TRUE' },
            { n: 2, text: 'Early pencils contained a small amount of lead.', answer: 'FALSE' },
            { n: 3, text: 'Borrowdale was the only source of graphite in Europe at the time.', answer: 'NOT GIVEN' },
            { n: 4, text: 'Miners at Borrowdale were sometimes checked to make sure they had not taken graphite.', answer: 'TRUE' },
            { n: 5, text: 'The technique of gluing two grooved pieces of wood together is no longer used.', answer: 'FALSE' },
            { n: 6, text: 'Conté’s pencils were more expensive to produce than English pencils.', answer: 'NOT GIVEN' },
          ],
        },
        {
          type: 'gap',
          from: 7, to: 13,
          instructions: 'Complete the notes. Write <b>ONE WORD ONLY</b> from the text for each answer.',
          title: 'The development of pencil making',
          template: `
            <h4>Conté’s process (France, 1795)</h4>
            <ul>
              <li>graphite powder was combined with clay and water and heated in a [[7]]</li>
              <li>adding more clay made a pencil harder and its line [[8]]</li>
              <li>the letter B in the grading system stands for [[9]]</li>
            </ul>
            <h4>Pencils in the USA</h4>
            <ul>
              <li>Thoreau worked on improving pencils for his family’s [[10]]</li>
              <li>yellow was first used for one manufacturer’s most [[11]] pencils</li>
              <li>the colour was linked to both China and [[12]]</li>
            </ul>
            <h4>Pencils today</h4>
            <ul>
              <li>still used in the field because they work in extreme [[13]]</li>
            </ul>`,
          answers: {
            7: ['kiln'], 8: ['lighter'], 9: ['black'], 10: ['business'],
            11: ['expensive'], 12: ['luxury'], 13: ['cold'],
          },
        },
      ],
    },

    // ---------------------------------------------------------------- PART 2
    {
      number: 2,
      title: 'Light After Dark',
      subtitle: 'Why scientists and planners are paying new attention to the night',
      paragraphs: [
        { label: 'A', html: 'For most of human history, the night sky was dark enough for people to see thousands of stars. Today, the majority of the world’s population lives under skies brightened by artificial light, and many city dwellers have never seen the Milky Way. The term ‘light pollution’ covers several related problems: <i>skyglow</i>, the brightening of the night sky over populated areas; <i>glare</i>, excessive brightness that causes visual discomfort; and <i>light trespass</i>, when light falls where it is not wanted, such as through a bedroom window.' },
        { label: 'B', html: 'The consequences for wildlife are considerable. Many species rely on the natural cycle of light and darkness to regulate feeding, reproduction and migration. Newly hatched sea turtles, for instance, find the ocean by moving towards the brightest horizon, which on an undeveloped beach is the sky over the water. Where hotels and roads are lit, hatchlings may crawl inland instead. Insects are drawn to artificial lights in enormous numbers, and ecologist Dr Maria Okafor argues that this may be an underestimated factor in the decline of insect populations. ‘We have focused on pesticides and habitat loss,’ she says, ‘but a single streetlight can attract and exhaust insects from a wide area every night.’' },
        { label: 'C', html: 'Humans, too, may be affected. Exposure to light at night suppresses the production of melatonin, a hormone that helps regulate sleep. Sleep researcher Professor Tom Lindqvist cautions, however, against drawing firm conclusions too quickly. ‘Most of the evidence linking outdoor lighting to health problems comes from studies that show an association, not a cause,’ he explains. ‘People who live in brightly lit areas also tend to experience more noise and traffic, so it is difficult to isolate the effect of light alone.’ Indoor screens, he adds, are likely to have a far greater effect on most people’s sleep than streetlights.' },
        { label: 'D', html: 'Ironically, efforts to save energy have sometimes made the problem worse. Over the past two decades, many cities have replaced old orange streetlights with white LEDs, which use far less electricity. However, because LEDs are cheap to run, some councils have installed more lights than before, or left them brighter than necessary – an example of what economists call the rebound effect. In addition, the white light of many early LEDs contained a high proportion of blue light, which scatters more in the atmosphere and therefore contributes more to skyglow.' },
        { label: 'E', html: 'Unlike many forms of pollution, light pollution can be reduced almost immediately and at relatively low cost. Lighting engineer Sunita Rao points out that the most effective measures are also the simplest: shielding lamps so that light is directed downwards, using warmer colours, and dimming or switching off lights when they are not needed. ‘Good lighting is not about having more light,’ she says. ‘It is about putting the right amount of light in the right place at the right time.’ Several towns that have adopted such measures report lower energy bills without any increase in crime or accidents.' },
        { label: 'F', html: 'A growing number of communities are going further, applying for recognition as official dark sky places. These areas commit to strict lighting rules and to educating the public about the night environment. Beyond the environmental benefits, such places have discovered an economic opportunity: ‘astro-tourism’. Visitors travel considerable distances to stargaze, often outside the main holiday season, supporting local hotels and restaurants during months that were previously quiet.' },
      ],
      groups: [
        {
          type: 'match',
          from: 14, to: 17,
          instructions: 'The text has six sections, <b>A–F</b>. Which section contains the following information? Choose the correct letter, <b>A–F</b>. You may use any letter more than once.',
          reuse: true,
          options: ['A', 'B', 'C', 'D', 'E', 'F'].map((v) => ({ value: v, label: v })),
          questions: [
            { n: 14, text: 'an example of an animal that uses light to find its way', answer: 'B' },
            { n: 15, text: 'definitions of different types of light pollution', answer: 'A' },
            { n: 16, text: 'an unintended consequence of a change in technology', answer: 'D' },
            { n: 17, text: 'a claim that a problem can be dealt with quickly', answer: 'E' },
          ],
        },
        {
          type: 'match',
          from: 18, to: 20,
          instructions: 'Look at the following statements and the list of people. Match each statement with the correct person, <b>A–C</b>.',
          reuse: true,
          optionsTitle: 'List of people',
          options: [
            { value: 'A', label: 'Dr Maria Okafor' },
            { value: 'B', label: 'Professor Tom Lindqvist' },
            { value: 'C', label: 'Sunita Rao' },
          ],
          questions: [
            { n: 18, text: 'The quantity of light matters less than how it is used.', answer: 'C' },
            { n: 19, text: 'Research has not yet shown that outdoor light directly harms health.', answer: 'B' },
            { n: 20, text: 'One cause of a decline has received less attention than others.', answer: 'A' },
          ],
        },
        {
          type: 'multi',
          from: 21, to: 22,
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
        {
          type: 'gapdrag',
          from: 23, to: 26,
          instructions: 'Complete the summary using the list of words, <b>A–H</b>, below.',
          title: 'Reducing light pollution',
          reuse: false,
          template: '<p>According to Section E, light pollution is easier to deal with than many other environmental problems because the solutions are relatively [[23]]. The simplest measures include directing light [[24]], choosing [[25]] colours and reducing lighting when it is not required. Towns that use these approaches have found that safety has not [[26]].</p>',
          options: [
            { value: 'A', label: 'inexpensive' },
            { value: 'B', label: 'downwards' },
            { value: 'C', label: 'warmer' },
            { value: 'D', label: 'brighter' },
            { value: 'E', label: 'worsened' },
            { value: 'F', label: 'improved' },
            { value: 'G', label: 'complex' },
            { value: 'H', label: 'upwards' },
          ],
          answers: { 23: 'A', 24: 'B', 25: 'C', 26: 'E' },
        },
      ],
    },

    // ---------------------------------------------------------------- PART 3
    {
      number: 3,
      paragraphLabels: false, // headings passages have no paragraph letters
      title: 'Is More Choice Always Better?',
      subtitle: 'A psychologist weighs the evidence on decision-making',
      paragraphs: [
        { label: 'A', html: 'It is widely assumed that more choice leads to greater freedom and, consequently, to greater happiness. Supermarkets offer dozens of varieties of breakfast cereal, streaming services provide thousands of films, and young people are encouraged to choose from an ever-expanding range of university courses. Yet over the past three decades, psychologists have begun to question whether this abundance actually serves us well. I believe the evidence suggests it often does not, although the picture is more complicated than some popular accounts imply.' },
        { label: 'B', html: 'The most famous study in this area was conducted in a supermarket. On one day, shoppers were offered a tasting stall with twenty-four varieties of jam; on another, only six. The larger display attracted more visitors, but the smaller one produced far more purchases. The researchers concluded that too many options can lead to ‘choice overload’, in which people find it so difficult to decide that they avoid deciding at all. The study has been cited thousands of times and has influenced businesses and governments alike.' },
        { label: 'C', html: 'However, attempts to repeat the experiment have produced mixed results. A review of dozens of similar studies found that, on average, the effect of the number of options on decision-making was close to zero. Some studies found that more choice discouraged people; others found the opposite. This does not mean that choice overload is a myth, but it does suggest that it occurs only under particular conditions – for example, when options are difficult to compare, when people do not have clear preferences, or when they are under time pressure. In my view, the original finding was presented with more confidence than it deserved.' },
        { label: 'D', html: 'Even when people do make a choice, a wide range of options may affect how they feel about it afterwards. When there are many alternatives, it is easy to imagine that one of the rejected options would have been better, and this can reduce satisfaction with the option chosen. Psychologists distinguish between ‘maximisers’, who try to find the best possible option, and ‘satisficers’, who are content with one that is good enough. Research suggests that maximisers often make objectively better decisions – they may, for instance, find higher-paying jobs – yet feel worse about them. I find this one of the most persuasive findings in the field, because it matches the experience of anyone who has spent an evening scrolling through films rather than watching one.' },
        { label: 'E', html: 'What, then, should be done? Some commentators argue that governments should limit choice, but I think this would be a mistake. The problem is not choice itself but the way it is presented. Organisations can help people by grouping options into a small number of categories, by providing clear comparisons, and by setting sensible defaults – the option that applies if a person makes no active decision. Pension schemes that enrol employees automatically, while allowing them to leave, have greatly increased saving rates without removing anyone’s freedom.' },
        { label: 'F', html: 'Individuals, too, can protect themselves. Deciding in advance what matters most, limiting the time spent researching minor purchases, and accepting ‘good enough’ in areas of life that are not truly important are all strategies that research supports. Choice remains one of the great achievements of modern societies. Our task is not to reject it, but to learn to live with it.' },
      ],
      groups: [
        {
          type: 'headings',
          from: 27, to: 32,
          instructions: 'The text has six paragraphs. Choose the correct heading for each paragraph and move it into the gap.',
          optionsTitle: 'List of Headings',
          reuse: false,
          options: [
            { value: 'i', label: 'Questioning a popular assumption' },
            { value: 'ii', label: 'A well-known experiment and its conclusion' },
            { value: 'iii', label: 'Why some of the best decision-makers are the least content' },
            { value: 'iv', label: 'The case for reducing the number of products in shops' },
            { value: 'v', label: 'Evidence that challenges an influential idea' },
            { value: 'vi', label: 'Making choice easier without taking it away' },
            { value: 'vii', label: 'Personal approaches to managing choice' },
            { value: 'viii', label: 'The historical growth of consumer choice' },
            { value: 'ix', label: 'Why businesses prefer to offer more options' },
          ],
          questions: [
            { n: 27, paragraph: 'A', answer: 'i' },
            { n: 28, paragraph: 'B', answer: 'ii' },
            { n: 29, paragraph: 'C', answer: 'v' },
            { n: 30, paragraph: 'D', answer: 'iii' },
            { n: 31, paragraph: 'E', answer: 'vi' },
            { n: 32, paragraph: 'F', answer: 'vii' },
          ],
        },
        {
          type: 'single',
          from: 33, to: 36,
          instructions: 'Choose <b>YES</b> if the statement agrees with the claims of the writer, choose <b>NO</b> if the statement contradicts the claims of the writer, or choose <b>NOT GIVEN</b> if it is impossible to say what the writer thinks about this.',
          options: ['YES', 'NO', 'NOT GIVEN'].map((v) => ({ value: v, label: v })),
          questions: [
            { n: 33, text: 'The supermarket study has had an impact beyond academic research.', answer: 'YES' },
            { n: 34, text: 'Choice overload does not exist.', answer: 'NO' },
            { n: 35, text: 'The original jam study was poorly designed.', answer: 'NOT GIVEN' },
            { n: 36, text: 'The finding about maximisers is consistent with everyday experience.', answer: 'YES' },
          ],
        },
        {
          type: 'single',
          from: 37, to: 40,
          instructions: 'Choose the correct answer.',
          questions: [
            {
              n: 37,
              text: 'What does the writer say about the review of similar studies in the third paragraph?',
              options: [
                { value: 'A', label: 'It confirmed the results of the supermarket study.' },
                { value: 'B', label: 'It found that the number of options had very little effect overall.' },
                { value: 'C', label: 'It showed that more choice always leads to better decisions.' },
                { value: 'D', label: 'It was criticised for including too few studies.' },
              ],
              answer: 'B',
            },
            {
              n: 38,
              text: 'According to the writer, choice overload is most likely to occur when',
              options: [
                { value: 'A', label: 'people are shopping for food.' },
                { value: 'B', label: 'there are fewer than six options.' },
                { value: 'C', label: 'people are unsure what they want.' },
                { value: 'D', label: 'options are clearly presented.' },
              ],
              answer: 'C',
            },
            {
              n: 39,
              text: 'Why does the writer mention scrolling through films?',
              options: [
                { value: 'A', label: 'to illustrate a point with a familiar example' },
                { value: 'B', label: 'to criticise streaming services' },
                { value: 'C', label: 'to show that satisficers make poor decisions' },
                { value: 'D', label: 'to suggest a topic for further research' },
              ],
              answer: 'A',
            },
            {
              n: 40,
              text: 'What is the writer’s main purpose in the text?',
              options: [
                { value: 'A', label: 'to argue that choice should be reduced in modern societies' },
                { value: 'B', label: 'to describe the history of research into decision-making' },
                { value: 'C', label: 'to evaluate evidence about choice and suggest how to respond to it' },
                { value: 'D', label: 'to explain why businesses offer consumers so many options' },
              ],
              answer: 'C',
            },
          ],
        },
      ],
    },
  ],
}
