import { generateJSON } from "@tiptap/core"

import { groupExtensions, passageExtensions } from "~/extensions/presets.js"

// A complete sample test (original content). Passage and group content are
// written as HTML here and converted to editor JSON when the sample is loaded.
// Generated from ref/demos/reading/src/data/sampleTest.js.

const data = {
  "id": "ab77f92d-c379-47c1-9d12-2be997a543a3",
  "identifier": "DEMO-1",
  "name": "Sample Academic Reading test",
  "passages": [
    {
      "id": "9dfd53d5-048b-4884-8c20-090c797b488b",
      "title": "The Pencil: A Short History",
      "subtitle": "",
      "content": "<p>Few objects are as familiar, or as overlooked, as the pencil. Its story begins in the 1560s, when shepherds in Borrowdale, in the north of England, discovered a large deposit of an unusual black mineral beneath an uprooted tree. The substance left a dark, shiny mark and was soon being used to label sheep. Because it resembled lead, people called it ‘plumbago’, meaning ‘lead ore’, and the misunderstanding has survived in the everyday expression ‘pencil lead’, even though pencils have never contained lead. The mineral was in fact graphite, a form of carbon.</p><p>Borrowdale graphite was so pure that it could be sawn into sticks and used without further processing. Initially, users simply wrapped the sticks in string or sheepskin to keep their fingers clean. Its value grew rapidly once it was found to make excellent moulds for cannonballs, and the English Crown took control of the mine. At times, the site was deliberately flooded between periods of extraction to prevent theft, and armed guards searched miners as they left work.</p><p>The next major development took place in Italy, where craftsmen began placing graphite inside hollowed-out sticks of juniper wood. Later, a more efficient method appeared: two half-cylinders of wood were each cut with a groove, a strip of graphite was laid in one, and the two halves were glued together. This basic technique is still used in pencil factories today.</p><p>England’s near monopoly on high-quality graphite created difficulties for other countries, especially in times of war. In 1795, France, cut off from English supplies, asked the engineer Nicolas-Jacques Conté to find an alternative. Conté ground lower-quality graphite into a powder, mixed it with clay and water, and fired the mixture in a kiln. His process had an important advantage: by varying the proportion of clay, manufacturers could control how hard or soft a pencil was. More clay produced a harder pencil and a lighter line, while less clay produced a softer pencil and a darker line. This is the origin of the grading system familiar to artists today, in which H stands for ‘hard’ and B for ‘black’.</p><p>In the United States, pencil making became an industry in the nineteenth century. The writer Henry David Thoreau, better known for his reflections on nature, spent several years improving the pencils produced by his family’s business, and their products were considered among the best in the country. Meanwhile, the American preference for yellow pencils is often traced to the 1890s, when one manufacturer chose the colour for its most expensive range, which used graphite from China. Yellow was associated with China and with luxury, and competitors soon copied the colour so that their own pencils would appear equally high in quality.</p><p>Although digital devices have replaced the pencil for many purposes, billions are still made every year. Pencils work in extreme cold, on most surfaces and even upside down, which is why they remain standard equipment for many engineers, carpenters and scientists working in the field.</p>",
      "questionGroups": [
        {
          "id": "301994fa-1a5e-42a4-9ff0-22828460de4c",
          "type": "true-false-not-given",
          "questions": [
            {
              "id": "37ae3e65-d365-4773-b3d4-79cb21460daa",
              "content": "The material found at Borrowdale was first used to mark animals.",
              "correctAnswers": [
                "TRUE"
              ]
            },
            {
              "id": "9d2f7a6e-3ccd-4207-9d08-bae2f95b5e0e",
              "content": "Early pencils contained a small amount of lead.",
              "correctAnswers": [
                "FALSE"
              ]
            },
            {
              "id": "4d333bb1-6022-4d59-97a4-938a7a75b133",
              "content": "Borrowdale was the only source of graphite in Europe at the time.",
              "correctAnswers": [
                "NOT GIVEN"
              ]
            },
            {
              "id": "8cb0ad66-dbd8-47a3-b792-063766fd6bf6",
              "content": "Miners at Borrowdale were sometimes checked to make sure they had not taken graphite.",
              "correctAnswers": [
                "TRUE"
              ]
            },
            {
              "id": "c1afe721-683c-4945-a161-607c4bb2de48",
              "content": "The technique of gluing two grooved pieces of wood together is no longer used.",
              "correctAnswers": [
                "FALSE"
              ]
            },
            {
              "id": "080005ae-1b97-4bf1-bcb1-3a24164872a4",
              "content": "Conté’s pencils were more expensive to produce than English pencils.",
              "correctAnswers": [
                "NOT GIVEN"
              ]
            }
          ]
        },
        {
          "id": "798835b3-2fa9-4c23-bb00-34b43c004b60",
          "type": "complete-the-notes",
          "completeWhat": "notes",
          "wordLimit": "one-word-only",
          "content": "<h3>The development of pencil making</h3><h4>Conté’s process (France, 1795)</h4><ul><li>graphite powder was combined with clay and water and heated in a <span data-blank data-question-id=\"6713d48e-e091-41da-865d-2814cfa7351c\"></span></li><li>adding more clay made a pencil harder and its line <span data-blank data-question-id=\"c3ed0b97-6f31-42bd-8416-f9ea31fb1f50\"></span></li><li>the letter B in the grading system stands for <span data-blank data-question-id=\"3af6faa4-5ad8-4b17-9127-f7a56a741659\"></span></li></ul><h4>Pencils in the USA</h4><ul><li>Thoreau worked on improving pencils for his family’s <span data-blank data-question-id=\"e0d3e134-6047-48f5-8f6b-8365723233ed\"></span></li><li>yellow was first used for one manufacturer’s most <span data-blank data-question-id=\"80b22772-8e8f-40ba-84c7-8a85126850af\"></span> pencils</li><li>the colour was linked to both China and <span data-blank data-question-id=\"5664db63-38fc-4f03-9846-489f6aa1a8f4\"></span></li></ul><h4>Pencils today</h4><ul><li>still used in the field because they work in extreme <span data-blank data-question-id=\"380fec77-e677-4a5e-afd6-08a03b8bef0e\"></span></li></ul>",
          "questions": [
            {
              "id": "6713d48e-e091-41da-865d-2814cfa7351c",
              "correctAnswers": [
                "kiln"
              ]
            },
            {
              "id": "c3ed0b97-6f31-42bd-8416-f9ea31fb1f50",
              "correctAnswers": [
                "lighter"
              ]
            },
            {
              "id": "3af6faa4-5ad8-4b17-9127-f7a56a741659",
              "correctAnswers": [
                "black"
              ]
            },
            {
              "id": "e0d3e134-6047-48f5-8f6b-8365723233ed",
              "correctAnswers": [
                "business"
              ]
            },
            {
              "id": "80b22772-8e8f-40ba-84c7-8a85126850af",
              "correctAnswers": [
                "expensive"
              ]
            },
            {
              "id": "5664db63-38fc-4f03-9846-489f6aa1a8f4",
              "correctAnswers": [
                "luxury"
              ]
            },
            {
              "id": "380fec77-e677-4a5e-afd6-08a03b8bef0e",
              "correctAnswers": [
                "cold"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "9de5ec2d-76ab-48df-9d09-16463767b559",
      "title": "Light After Dark",
      "subtitle": "Why scientists and planners are paying new attention to the night",
      "content": "<section data-key=\"c67d7137-debe-4b01-b9fc-068b8acaec15\"><p>For most of human history, the night sky was dark enough for people to see thousands of stars. Today, the majority of the world’s population lives under skies brightened by artificial light, and many city dwellers have never seen the Milky Way. The term ‘light pollution’ covers several related problems: <i>skyglow</i>, the brightening of the night sky over populated areas; <i>glare</i>, excessive brightness that causes visual discomfort; and <i>light trespass</i>, when light falls where it is not wanted, such as through a bedroom window.</p></section><section data-key=\"6d277a4e-bf16-4b60-bfa7-d537458079e7\"><p>The consequences for wildlife are considerable. Many species rely on the natural cycle of light and darkness to regulate feeding, reproduction and migration. Newly hatched sea turtles, for instance, find the ocean by moving towards the brightest horizon, which on an undeveloped beach is the sky over the water. Where hotels and roads are lit, hatchlings may crawl inland instead. Insects are drawn to artificial lights in enormous numbers, and ecologist Dr Maria Okafor argues that this may be an underestimated factor in the decline of insect populations. ‘We have focused on pesticides and habitat loss,’ she says, ‘but a single streetlight can attract and exhaust insects from a wide area every night.’</p></section><section data-key=\"5244a1e2-2660-478a-b5e7-8938f0aa0ce3\"><p>Humans, too, may be affected. Exposure to light at night suppresses the production of melatonin, a hormone that helps regulate sleep. Sleep researcher Professor Tom Lindqvist cautions, however, against drawing firm conclusions too quickly. ‘Most of the evidence linking outdoor lighting to health problems comes from studies that show an association, not a cause,’ he explains. ‘People who live in brightly lit areas also tend to experience more noise and traffic, so it is difficult to isolate the effect of light alone.’ Indoor screens, he adds, are likely to have a far greater effect on most people’s sleep than streetlights.</p></section><section data-key=\"f6ef8985-4ba8-4f27-8ce2-ee498c20aec2\"><p>Ironically, efforts to save energy have sometimes made the problem worse. Over the past two decades, many cities have replaced old orange streetlights with white LEDs, which use far less electricity. However, because LEDs are cheap to run, some councils have installed more lights than before, or left them brighter than necessary – an example of what economists call the rebound effect. In addition, the white light of many early LEDs contained a high proportion of blue light, which scatters more in the atmosphere and therefore contributes more to skyglow.</p></section><section data-key=\"0b25ec4d-b2a9-431d-a3c2-60f7e34a6e80\"><p>Unlike many forms of pollution, light pollution can be reduced almost immediately and at relatively low cost. Lighting engineer Sunita Rao points out that the most effective measures are also the simplest: shielding lamps so that light is directed downwards, using warmer colours, and dimming or switching off lights when they are not needed. ‘Good lighting is not about having more light,’ she says. ‘It is about putting the right amount of light in the right place at the right time.’ Several towns that have adopted such measures report lower energy bills without any increase in crime or accidents.</p></section><section data-key=\"c9a74685-2f0e-4639-aa32-ac56b0620954\"><p>A growing number of communities are going further, applying for recognition as official dark sky places. These areas commit to strict lighting rules and to educating the public about the night environment. Beyond the environmental benefits, such places have discovered an economic opportunity: ‘astro-tourism’. Visitors travel considerable distances to stargaze, often outside the main holiday season, supporting local hotels and restaurants during months that were previously quiet.</p></section>",
      "questionGroups": [
        {
          "id": "bbbb5c12-7868-470a-a689-48660a273769",
          "type": "match-the-paragraph-information",
          "sectionTerm": "section",
          "numSections": 6,
          "moreThanOnce": true,
          "questions": [
            {
              "id": "ea7374a2-c999-4136-be50-fdac683163a2",
              "content": "an example of an animal that uses light to find its way",
              "correctAnswers": [
                "B"
              ]
            },
            {
              "id": "4566648a-e66b-4f9a-b66f-8da2d65a39a6",
              "content": "definitions of different types of light pollution",
              "correctAnswers": [
                "A"
              ]
            },
            {
              "id": "d93bcf12-fc75-48c0-8621-c1ff8610ef9e",
              "content": "an unintended consequence of a change in technology",
              "correctAnswers": [
                "D"
              ]
            },
            {
              "id": "56556011-c1dd-41c8-8b02-e81139d42738",
              "content": "a claim that a problem can be dealt with quickly",
              "correctAnswers": [
                "E"
              ]
            }
          ]
        },
        {
          "id": "42ac6bba-0e8e-4e1d-9580-421ac4d7acb3",
          "type": "match-the-statements",
          "questionTerm": "statement",
          "candidateTerm": "person",
          "moreThanOnce": false,
          "candidates": [
            {
              "id": "6bf42ce0-792c-43f2-8be6-9da7395be6a1",
              "content": "Dr Maria Okafor"
            },
            {
              "id": "4a2087ee-6489-4a59-b67b-ee8bc8eeb05a",
              "content": "Professor Tom Lindqvist"
            },
            {
              "id": "326940ed-482e-4e0e-8b35-236d699bfee5",
              "content": "Sunita Rao"
            }
          ],
          "questions": [
            {
              "id": "c96cc30a-ac3b-409c-995a-7deaafa1e953",
              "content": "The quantity of light matters less than how it is used.",
              "correctAnswers": [
                "326940ed-482e-4e0e-8b35-236d699bfee5"
              ]
            },
            {
              "id": "64dad00e-0f72-4681-97b9-194768e03a19",
              "content": "Research has not yet shown that outdoor light directly harms health.",
              "correctAnswers": [
                "4a2087ee-6489-4a59-b67b-ee8bc8eeb05a"
              ]
            },
            {
              "id": "bad6d5cf-7bfc-4cb1-ac3d-9697bc4648cf",
              "content": "One cause of a decline has received less attention than others.",
              "correctAnswers": [
                "6bf42ce0-792c-43f2-8be6-9da7395be6a1"
              ]
            }
          ]
        },
        {
          "id": "9d2d9b52-c086-4578-ae25-23d4fba67c55",
          "type": "multiple-choice-two",
          "questions": [
            {
              "id": "93d99fef-7b9e-4651-b551-ab6721c5b3a7",
              "content": "Which TWO problems with LED streetlights are mentioned in Section D?",
              "candidates": [
                {
                  "id": "cefdcb5e-3c33-4640-baf5-e7de096cc362",
                  "content": "They are more expensive to install than older lights."
                },
                {
                  "id": "ec7366bc-8d70-4ac9-9455-77581b187f36",
                  "content": "Their low running costs have led to more lighting being used."
                },
                {
                  "id": "137b3981-10b6-403c-b4bf-3e5466aa2169",
                  "content": "They fail more often in cold weather."
                },
                {
                  "id": "64c0c286-c5d7-4124-b9d3-37b6b5a34e23",
                  "content": "Some types produce light that spreads more widely in the sky."
                },
                {
                  "id": "81ccdc99-39ac-4464-afe6-968b50ac658c",
                  "content": "They are less effective at preventing crime."
                }
              ],
              "correctAnswers": [
                "ec7366bc-8d70-4ac9-9455-77581b187f36",
                "64c0c286-c5d7-4124-b9d3-37b6b5a34e23"
              ]
            }
          ]
        },
        {
          "id": "39a4bdf5-afd5-4ee1-b105-885ab1af0480",
          "type": "complete-the-summary-from-list",
          "candidateTerm": "word",
          "content": "<h3>Reducing light pollution</h3><p>According to Section E, light pollution is easier to deal with than many other environmental problems because the solutions are relatively <span data-blank data-question-id=\"d5df4b19-8bb5-4ecd-81b7-496ca13b60dc\"></span>. The simplest measures include directing light <span data-blank data-question-id=\"d229d152-585c-41be-a6bb-7d45d272a759\"></span>, choosing <span data-blank data-question-id=\"d58311cc-05e5-402b-846e-630a42f57d2b\"></span> colours and reducing lighting when it is not required. Towns that use these approaches have found that safety has not <span data-blank data-question-id=\"8fa87709-0b4f-4ac2-9e99-1330038a42af\"></span>.</p>",
          "candidates": [
            {
              "id": "3e0b00ed-06af-4703-b908-d0008d4a9579",
              "content": "inexpensive"
            },
            {
              "id": "eac29b31-184a-432b-bf16-52759ba2842f",
              "content": "downwards"
            },
            {
              "id": "26bb80b7-6111-4937-8bd8-d91041cd5368",
              "content": "warmer"
            },
            {
              "id": "518c4186-e152-45d4-9a29-39734b08f3a2",
              "content": "brighter"
            },
            {
              "id": "e5d0c457-d983-46aa-9e8c-7cc17a9f53f9",
              "content": "worsened"
            },
            {
              "id": "2f343b9d-5c67-412e-9f65-cea4fed8d092",
              "content": "improved"
            },
            {
              "id": "d684a133-446e-4f13-a875-deb43269c4e8",
              "content": "complex"
            },
            {
              "id": "fdf504f5-7c5c-4987-9afb-63ad996393c7",
              "content": "upwards"
            }
          ],
          "questions": [
            {
              "id": "d5df4b19-8bb5-4ecd-81b7-496ca13b60dc",
              "correctAnswers": [
                "3e0b00ed-06af-4703-b908-d0008d4a9579"
              ]
            },
            {
              "id": "d229d152-585c-41be-a6bb-7d45d272a759",
              "correctAnswers": [
                "eac29b31-184a-432b-bf16-52759ba2842f"
              ]
            },
            {
              "id": "d58311cc-05e5-402b-846e-630a42f57d2b",
              "correctAnswers": [
                "26bb80b7-6111-4937-8bd8-d91041cd5368"
              ]
            },
            {
              "id": "8fa87709-0b4f-4ac2-9e99-1330038a42af",
              "correctAnswers": [
                "e5d0c457-d983-46aa-9e8c-7cc17a9f53f9"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "5c335566-386b-44f2-a0b1-5dc71c236859",
      "title": "Is More Choice Always Better?",
      "subtitle": "A psychologist weighs the evidence on decision-making",
      "content": "<section data-key=\"8f3cf6fc-e459-41a3-8048-403c51c2e623\"><p>It is widely assumed that more choice leads to greater freedom and, consequently, to greater happiness. Supermarkets offer dozens of varieties of breakfast cereal, streaming services provide thousands of films, and young people are encouraged to choose from an ever-expanding range of university courses. Yet over the past three decades, psychologists have begun to question whether this abundance actually serves us well. I believe the evidence suggests it often does not, although the picture is more complicated than some popular accounts imply.</p></section><section data-key=\"643de899-2962-4952-8c2c-79ef91bbda04\"><p>The most famous study in this area was conducted in a supermarket. On one day, shoppers were offered a tasting stall with twenty-four varieties of jam; on another, only six. The larger display attracted more visitors, but the smaller one produced far more purchases. The researchers concluded that too many options can lead to ‘choice overload’, in which people find it so difficult to decide that they avoid deciding at all. The study has been cited thousands of times and has influenced businesses and governments alike.</p></section><section data-key=\"721e9701-e52c-4c15-bb89-8d8c3bd02d08\"><p>However, attempts to repeat the experiment have produced mixed results. A review of dozens of similar studies found that, on average, the effect of the number of options on decision-making was close to zero. Some studies found that more choice discouraged people; others found the opposite. This does not mean that choice overload is a myth, but it does suggest that it occurs only under particular conditions – for example, when options are difficult to compare, when people do not have clear preferences, or when they are under time pressure. In my view, the original finding was presented with more confidence than it deserved.</p></section><section data-key=\"6d8def3c-5779-4eab-82dd-5b9fb703ba3a\"><p>Even when people do make a choice, a wide range of options may affect how they feel about it afterwards. When there are many alternatives, it is easy to imagine that one of the rejected options would have been better, and this can reduce satisfaction with the option chosen. Psychologists distinguish between ‘maximisers’, who try to find the best possible option, and ‘satisficers’, who are content with one that is good enough. Research suggests that maximisers often make objectively better decisions – they may, for instance, find higher-paying jobs – yet feel worse about them. I find this one of the most persuasive findings in the field, because it matches the experience of anyone who has spent an evening scrolling through films rather than watching one.</p></section><section data-key=\"5ec72d08-3b82-4b21-9c55-c1b3088aa043\"><p>What, then, should be done? Some commentators argue that governments should limit choice, but I think this would be a mistake. The problem is not choice itself but the way it is presented. Organisations can help people by grouping options into a small number of categories, by providing clear comparisons, and by setting sensible defaults – the option that applies if a person makes no active decision. Pension schemes that enrol employees automatically, while allowing them to leave, have greatly increased saving rates without removing anyone’s freedom.</p></section><section data-key=\"965c242c-b588-421d-8e89-1187998e106d\"><p>Individuals, too, can protect themselves. Deciding in advance what matters most, limiting the time spent researching minor purchases, and accepting ‘good enough’ in areas of life that are not truly important are all strategies that research supports. Choice remains one of the great achievements of modern societies. Our task is not to reject it, but to learn to live with it.</p></section>",
      "questionGroups": [
        {
          "id": "d769ac68-3028-49fb-ad28-bc244b6a4051",
          "type": "match-the-paragraph-headings",
          "sectionTerm": "paragraph",
          "candidates": [
            {
              "id": "f1a381ba-f925-4c90-8dc6-bade395927f4",
              "content": "Questioning a popular assumption"
            },
            {
              "id": "4d73528c-a09a-43cb-9c2b-c17106595202",
              "content": "A well-known experiment and its conclusion"
            },
            {
              "id": "12a290d0-3a53-43b5-9793-918edc12e969",
              "content": "Why some of the best decision-makers are the least content"
            },
            {
              "id": "92c88a39-3f93-4db3-a08c-5f51bbc045f4",
              "content": "The case for reducing the number of products in shops"
            },
            {
              "id": "f5bc8ba2-9893-4d14-bf17-f8cdb2627432",
              "content": "Evidence that challenges an influential idea"
            },
            {
              "id": "4fca4b88-a431-40d9-a49f-8ddf66d67334",
              "content": "Making choice easier without taking it away"
            },
            {
              "id": "e5ea42ec-5b47-4c73-be0e-ba045fef05ce",
              "content": "Personal approaches to managing choice"
            },
            {
              "id": "ddd06f10-3a1d-4bce-82e3-534ab8a023e5",
              "content": "The historical growth of consumer choice"
            },
            {
              "id": "4c1749fa-9dff-40e0-a3d9-afd76bcb356e",
              "content": "Why businesses prefer to offer more options"
            }
          ],
          "questions": [
            {
              "id": "d5954565-8238-4a04-b8f9-92498c82f878",
              "sectionKey": "8f3cf6fc-e459-41a3-8048-403c51c2e623",
              "correctAnswers": [
                "f1a381ba-f925-4c90-8dc6-bade395927f4"
              ]
            },
            {
              "id": "c1c88a43-c670-4f49-9fb9-e584f09142c6",
              "sectionKey": "643de899-2962-4952-8c2c-79ef91bbda04",
              "correctAnswers": [
                "4d73528c-a09a-43cb-9c2b-c17106595202"
              ]
            },
            {
              "id": "2879fcdb-9262-4cf4-ae86-8d382140854b",
              "sectionKey": "721e9701-e52c-4c15-bb89-8d8c3bd02d08",
              "correctAnswers": [
                "f5bc8ba2-9893-4d14-bf17-f8cdb2627432"
              ]
            },
            {
              "id": "e08a3aed-1cbe-4b2e-9b7b-9df8205102da",
              "sectionKey": "6d8def3c-5779-4eab-82dd-5b9fb703ba3a",
              "correctAnswers": [
                "12a290d0-3a53-43b5-9793-918edc12e969"
              ]
            },
            {
              "id": "5b110361-8c0f-4826-84e8-2a0b671db167",
              "sectionKey": "5ec72d08-3b82-4b21-9c55-c1b3088aa043",
              "correctAnswers": [
                "4fca4b88-a431-40d9-a49f-8ddf66d67334"
              ]
            },
            {
              "id": "d09015e2-1b9b-47b8-83ac-583c9ec84930",
              "sectionKey": "965c242c-b588-421d-8e89-1187998e106d",
              "correctAnswers": [
                "e5ea42ec-5b47-4c73-be0e-ba045fef05ce"
              ]
            }
          ]
        },
        {
          "id": "89cc07b6-4fd4-4b82-8572-c91ff7cccb4e",
          "type": "yes-no-not-given",
          "questions": [
            {
              "id": "4db8e201-27c9-44a2-8a6a-eff5caf75bc7",
              "content": "The supermarket study has had an impact beyond academic research.",
              "correctAnswers": [
                "YES"
              ]
            },
            {
              "id": "bde98395-13ad-426b-a660-046841f1718d",
              "content": "Choice overload does not exist.",
              "correctAnswers": [
                "NO"
              ]
            },
            {
              "id": "47cb9e24-abdd-4fc6-b08f-a9d7b301f7f2",
              "content": "The original jam study was poorly designed.",
              "correctAnswers": [
                "NOT GIVEN"
              ]
            },
            {
              "id": "f1b2f3ba-96c5-4e66-bcd7-a554640384c2",
              "content": "The finding about maximisers is consistent with everyday experience.",
              "correctAnswers": [
                "YES"
              ]
            }
          ]
        },
        {
          "id": "a16572aa-856e-4498-875a-17452f69305f",
          "type": "multiple-choice-one",
          "questions": [
            {
              "id": "173842f4-b6e1-4885-bdcd-82550b39f691",
              "content": "What does the writer say about the review of similar studies in the third paragraph?",
              "candidates": [
                {
                  "id": "854da30c-5332-4dc4-b12b-bbd090a1f026",
                  "content": "It confirmed the results of the supermarket study."
                },
                {
                  "id": "4d6d70a9-c844-4bf0-a4ce-63b7d4923831",
                  "content": "It found that the number of options had very little effect overall."
                },
                {
                  "id": "e0e44b98-ca7c-44b4-94d8-771fd6817076",
                  "content": "It showed that more choice always leads to better decisions."
                },
                {
                  "id": "46c621f9-b3f5-470a-85bf-af57953b6549",
                  "content": "It was criticised for including too few studies."
                }
              ],
              "correctAnswers": [
                "4d6d70a9-c844-4bf0-a4ce-63b7d4923831"
              ]
            },
            {
              "id": "cf04e035-8d26-4c28-89a3-d82da4d71deb",
              "content": "According to the writer, choice overload is most likely to occur when",
              "candidates": [
                {
                  "id": "52050a67-cef0-4644-bc02-6666b10b593e",
                  "content": "people are shopping for food."
                },
                {
                  "id": "6fe220b0-5e04-41f7-82ed-4ab3518825be",
                  "content": "there are fewer than six options."
                },
                {
                  "id": "171dfe71-ac91-4e6e-a6af-74d1c2c0b5d3",
                  "content": "people are unsure what they want."
                },
                {
                  "id": "e916d84d-aa44-46f9-a54c-2dde5332215f",
                  "content": "options are clearly presented."
                }
              ],
              "correctAnswers": [
                "171dfe71-ac91-4e6e-a6af-74d1c2c0b5d3"
              ]
            },
            {
              "id": "867a41ab-457f-48c8-8692-9266d5c96442",
              "content": "Why does the writer mention scrolling through films?",
              "candidates": [
                {
                  "id": "3c0d712c-d70b-44ab-9e2a-bcb192eeb838",
                  "content": "to illustrate a point with a familiar example"
                },
                {
                  "id": "1180c68b-a156-4504-8b76-207ad1b63832",
                  "content": "to criticise streaming services"
                },
                {
                  "id": "6c8ca566-0390-449e-8397-b2fe5d5495bf",
                  "content": "to show that satisficers make poor decisions"
                },
                {
                  "id": "d8968836-0035-4d56-8e90-89cd7352477c",
                  "content": "to suggest a topic for further research"
                }
              ],
              "correctAnswers": [
                "3c0d712c-d70b-44ab-9e2a-bcb192eeb838"
              ]
            },
            {
              "id": "8d05df2c-2455-4316-aa56-71a88a9be5a7",
              "content": "What is the writer’s main purpose in the text?",
              "candidates": [
                {
                  "id": "32a07654-89d1-482f-b447-209e7325510f",
                  "content": "to argue that choice should be reduced in modern societies"
                },
                {
                  "id": "838290e6-1c07-4e88-a275-a36f10b4915a",
                  "content": "to describe the history of research into decision-making"
                },
                {
                  "id": "a053d931-860b-4367-ab07-67cf888e15a5",
                  "content": "to evaluate evidence about choice and suggest how to respond to it"
                },
                {
                  "id": "62b01c7a-4857-47c6-883c-d434bcf17f11",
                  "content": "to explain why businesses offer consumers so many options"
                }
              ],
              "correctAnswers": [
                "a053d931-860b-4367-ab07-67cf888e15a5"
              ]
            }
          ]
        }
      ]
    }
  ]
}

export function sampleTest() {
  const test = structuredClone(data)
  const passageSchema = passageExtensions()
  const groupSchema = groupExtensions()
  for (const passage of test.passages) {
    passage.content = generateJSON(passage.content, passageSchema)
    for (const group of passage.questionGroups) if (group.content) group.content = generateJSON(group.content, groupSchema)
  }
  return test
}
