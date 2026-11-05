# Course Design Brief

**Stage 0 of the curriculum design: course parameters**
Status: Draft v0.1. Open items are marked **[OPEN]**. Decisions are recorded in [decisions.md](decisions.md).

---

## 1. Purpose

This is a self-study course that prepares learners for **IELTS Academic** with a target of **band 7**. It is designed to the standard of a university or VET preparation course:

- It has explicit learning outcomes.
- Its assessment is aligned with those outcomes.
- Every design decision is documented with a rationale.

Design method:

- **Understanding by Design** (Wiggins & McTighe) gives the three stages: desired results, assessment evidence and learning plan.
- **Constructive alignment** (Biggs) is the quality check that outcomes, assessment and learning activities match.

The course has two aims, which it treats as distinct and pursues together:

1. **Language competence**: the academic English the test measures, moving from upper B2 towards C1.
2. **Test literacy**: knowledge of the test's format, task demands and assessment criteria, and the ability to perform under test conditions.

A course that only does (2) is a tips course. A course that only does (1) is a general EAP course. This course does both and keeps them aligned.

## 2. Target learner

| Parameter | Assumption |
|---|---|
| Test | IELTS Academic (General Training is out of scope) |
| Entry level | Around **6.5 overall** (upper B2) |
| Exit target | **7.0**: overall, and ideally in each skill |
| Typical purpose | University admission or professional registration, where 7 is a common requirement |
| Study mode | Independent, without a teacher, at a self-chosen pace |

### Implication: a "jagged" profile is the norm

A 6.5 overall usually hides an uneven profile, for example L 7.5 / R 7.0 / W 6.0 / S 6.5. Writing and Speaking are typically the limiting skills. Many institutions also set a minimum per skill, such as 7.0 overall with no band below 6.5.

The course therefore cannot be one linear path for everyone. It needs:

- a **diagnostic** to begin with;
- **skill-specific routes**, so a learner can spend their time where their gap is.

### Implication: the 6 → 7 boundary is the curriculum

Because the gap is narrow, the most useful definition of "what to learn" is **what separates band 6 from band 7** in the descriptors. A first reading of the (pre-2023) public descriptors:

| Criterion | Band 6 (the typical weak point) | Band 7 (the target) |
|---|---|---|
| W1 Task Achievement | an overview; details may be irrelevant or inaccurate | a *clear* overview of main trends, differences or stages; key features highlighted |
| W2 Task Response | some parts covered more than others; ideas "inadequately developed"; conclusions unclear | a clear position *throughout*; main ideas extended and supported, with no over-generalising |
| Coherence & Cohesion (W) | cohesion "faulty or mechanical"; referencing unclear; paragraphing not always logical | clear progression; a range of cohesive devices; a clear central topic in each paragraph |
| Lexical Resource (W/S) | *attempts* less common vocabulary, with inaccuracy | uses less common vocabulary with *awareness of style and collocation*; flexibility and precision |
| Grammatical Range & Accuracy (W/S) | a mix of simple and complex forms; frequent errors in complex structures (S) | a *variety* of complex structures; *frequent error-free sentences* |
| Fluency & Coherence (S) | may lose coherence; connectives not always appropriate | speaks at length *without noticeable effort*; connectives used flexibly |
| Pronunciation (S) | mixed control; features not sustained | all of band 6's positive features plus some of band 8's |

For Listening and Reading, band 7 corresponds to a raw score of about 30/40. The raw-to-band conversion varies slightly from test to test. In practice the learner moves from "most answers right" to "consistently right on the hardest question types". **[OPEN]** Add the conversion tables to `ref/`.

Recurring themes in this table:

- **control over range**: complexity used *accurately*;
- **development over coverage**: ideas *extended*, not listed;
- **precision**: collocation and style, not "big words".

These are strong candidates for the course's enduring understandings in Stage 1.

## 3. Delivery model

The learner chooses how much to study. The course is built as **one outcome framework delivered at two depths**:

| Layer | Description | Who it is for |
|---|---|---|
| **Core pathway** ("crash course") | The minimum route needed to meet every course outcome: diagnostic, essential instruction, guided practice and a final mock. | Learners with a test date soon |
| **Extension bank** ("all you can eat") | An open-ended bank of practice and study items. Each item is tagged to the same outcomes, skill, question type and criterion, so learners can keep working on exactly their weak areas. | Learners with more time, or a jagged profile |
| **Supported services** *(outside the course)* | Private lessons, group workshops and personalised feedback. | Optional add-on |

Design principles that follow from this:

- **Every item maps to an outcome.** The buffet is "more repetitions of the same outcomes", not "more random content". This keeps the extension bank aligned and stops it becoming a dumping ground.
- **The core pathway is self-sufficient.** A learner who never buys a lesson must still be able to meet the outcomes. This is hardest for Writing and Speaking (see §5).
- **Clear handoff points to the supported services.** For example: "submit this essay for feedback" or "bring this to a workshop". The course should make the services valuable, but must not depend on them.

**[OPEN]** Notional hours for the core pathway. As an initial estimate to test against content, around 30–40 hours: roughly 8–10 hours per skill module, plus a diagnostic and mocks. The extension bank is unlimited by design.

## 4. Course structure

The course has **four skill modules (Listening, Reading, Writing, Speaking)** and **three threads that run through all four**. The threads are the main means of integration.

```
              Listening   Reading   Writing   Speaking
Language   ─────────────────────────────────────────────  vocabulary, grammar, pronunciation (B2 base → C1)
Test       ─────────────────────────────────────────────  format, question/task types, criteria, timing
Autonomy   ─────────────────────────────────────────────  diagnosis, self-assessment, planning, review
```

The modules are integrated in two further ways:

- **Shared topics.** The modules draw on a common set of academic topics, so vocabulary and ideas recycle across skills. For example, a topic read about in Reading resurfaces in a Task 2 prompt and in Speaking Part 3. **[OPEN]** Topic list.
- **Explicit cross-skill links.** For example:
  - paraphrase is the shared mechanism behind Reading and Listening answers, and is a band 7 marker in Lexical Resource;
  - the language for describing data serves both W1 and S Part 3;
  - argument development serves both W2 and S Part 3.

Within each module, question and task types are grouped into **families that share an underlying skill**. For Reading these are Completion, Verification, Matching and Choice. The underlying skill is taught before the format.

## 5. Constraints and how the design responds

| Constraint | Design response |
|---|---|
| No teacher in the loop | Assessment of Writing and Speaking relies on **self-assessment training**: learner-friendly rubrics based on the descriptors, *annotated band 6 and band 7 exemplars*, checklists and comparison tasks. Human feedback is an optional service (§3). |
| Variable study time | Core pathway plus extension bank, with a modular design that has no hard dependencies between units within a skill where avoidable. |
| Jagged profiles | Diagnostic first, then skill-specific routes. Progress is tracked by skill and by criterion. |
| Fidelity to IELTS | Tasks match real test formats and timings. Practice volume is weighted by how often each question type actually occurs (see `ref/IELTS/Question Types`). |
| Copyright | All texts, recordings and tasks are original. The public band descriptors are referenced, and official test material is not reproduced. Files in `ref/` are for reference only. |

## 6. Reference frameworks

| Source | Role in the design |
|---|---|
| IELTS public band descriptors, Writing and Speaking (`ref/IELTS/Band Descriptors (Old)`; current 2023 version to be added) | Assessment criteria and band 7 targets |
| Question type taxonomy, with prevalence in Cambridge IELTS 14–19/20 (`ref/IELTS/Question Types`) | Test-literacy content and practice weighting |
| CEFR B2 *Vantage* specification (`ref/CEFR/B2 Vantage`) | Base inventory for the language thread: functions, notions, grammar, pronunciation, learning to learn. C1 includes B2, so B2 is the floor. Higher-level competences are added where the band 7 descriptors require them. |
| Vocabulary lists: EVP, NGWL, NAWL, AWL, Longman (`ref/vocabulary`) | Selecting and levelling vocabulary **[OPEN]**: vocabulary policy |

## 7. Out of scope

- IELTS General Training.
- Learners substantially below 6.0. The course assumes upper-B2 competence.
- Guarantees of a score outcome.
- Live teaching and marking. These are supported services outside the course.

## 8. Next steps

1. Resolve the open items in this brief: core hours, topic list, Listening and Speaking taxonomies.
2. **Stage 1, desired results:** course-level transfer goals, enduring understandings and essential questions, then module-level outcomes. Draft an alignment matrix of outcomes against the IELTS criteria and the CEFR.
3. **Stage 2, assessment evidence:** the diagnostic design, the self-assessment rubrics and an assessment blueprint.
4. **Stage 3, learning plan:** the scope and sequence, then unit plans.
