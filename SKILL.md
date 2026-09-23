---
name: lecture-review
description: >
  Create an interactive HTML lecture review for a lecture the student has
  already attended or studied. Test active understanding, application and
  transfer using varied question types, score the attempt, diagnose weak
  areas, and connect completed and unfinished reviews to the quiz dashboard,
  including Firebase-backed cross-device continuation when available.
metadata:
  short-description: Interactive HTML lecture understanding check
---



\# Lecture Review



Use this skill when the student already attended or studied a lecture and wants to check whether they actually understood it.



The default output is an interactive HTML review, not a normal question-by-question chat quiz.



\## Main goal



Measure real understanding through:



\* active recall

\* explanation in own words

\* application

\* recognition

\* transfer

\* troubleshooting

\* small realistic cases



Do not begin by re-explaining the lecture.



The student should attempt the questions before seeing the solutions.



\---



\# Source priority



Always find and inspect the official lecture material first.



The official lecture material defines:



\* what may be tested

\* terminology

\* expected depth

\* formulas

\* procedures

\* examples

\* relevant concepts



Do not use personal notes as the primary source for deciding what to test.



Personal notes may be used as secondary context.



Never invent lecture content that is not supported by the available material.



For every question, store the relevant slide, page or section reference when possible.



\---



\# Step 1: Analyse the lecture



Before creating the review:



1\. Find the official lecture material.

2\. Determine the major concepts.

3\. Determine which concepts require only recall.

4\. Determine which concepts require real understanding or application.

5\. Identify concepts that are easy to confuse.

6\. Identify important relationships between concepts.

7\. Identify procedures, calculations, code, diagrams or workflows that could be tested.

8\. Build a balanced review.



Do not simply create one question per slide.



Test the important ideas.



\---



\# Step 2: Choose question types



Use varied question types.



Prefer approximately 8–15 tasks for a normal lecture.



For a short lecture, fewer tasks are acceptable.



For a large or difficult lecture, use more tasks if useful.



Possible question types:



\## Automatically graded



\* single-choice multiple choice

\* multiple-choice with several correct answers

\* true/false when genuinely useful

\* matching

\* categorisation

\* ordering / sorting

\* fill-in-the-blank with objective answers

\* small calculations

\* code output

\* identify the correct command or configuration

\* identify an error

\* small scenario with objective choices



\## Self-graded after solution reveal



Use these when understanding cannot be reliably auto-graded locally:



\* explain in your own words

\* short free recall

\* compare two concepts

\* explain why something happens

\* troubleshooting reasoning

\* transfer question

\* short case analysis

\* describe a process



For self-graded questions:



1\. Let the student enter an answer first.

2\. Do not show the solution initially.

3\. Provide only an "Antwort prüfen" button. It stores and locks the student's answer, then reveals the expected solution automatically.

4\. Show:



&#x20;  \* expected answer

&#x20;  \* important required points

&#x20;  \* short explanation

&#x20;  \* slide/page reference

5\. Then require the student to select:



&#x20;  \* Voll richtig

&#x20;  \* Teilweise richtig

&#x20;  \* Falsch / wusste ich nicht



Do not allow points for a self-graded question before the solution was opened.



\---



\# Step 3: Difficulty structure



Mix difficulty levels.



A normal review should roughly contain:



\* 25% basic recall

\* 45% understanding and application

\* 30% transfer, troubleshooting or harder application



Do not make the review mostly simple vocabulary questions.



The goal is to determine whether the student could use the lecture knowledge in an exam or practical situation.



\---



\# Step 4: Point system



Every task must have a visible point value.



Use a total of approximately 100 points whenever practical.



Example weighting:



\* simple recall: 4–6 points

\* normal understanding: 6–10 points

\* application: 8–12 points

\* transfer / case / troubleshooting: 10–15 points



Harder questions should be worth more.



For automatically graded questions:



\* fully correct = full points

\* partially correct = partial points only when objectively justified

\* wrong = 0 points



For self-graded questions:



\* Voll richtig = 100% of task points

\* Teilweise richtig = 50% of task points

\* Falsch / wusste ich nicht = 0% of task points



Show:



\* current points

\* maximum points

\* percentage

\* progress through the review



Do not reveal the final grade before all tasks are completed or intentionally skipped.



\---



\# Step 5: Self-assessment grade



At the end calculate a learning grade from 1.0 to 6.0.



This is a self-assessment grade and must never be described as an official university grade.



Default formula:



grade = 1 + 5 × (earned points / maximum points)



Round to one decimal place.



Examples:



\* 100% = 6.0

\* 90% = 5.5

\* 80% = 5.0

\* 70% = 4.5

\* 60% = 4.0

\* 50% = 3.5



Display both percentage and grade.



\---



\# Step 6: Result classification



At the end classify the lecture understanding.



Use the following default interpretation:



\## 85–100%



Status:



"Sehr gut verstanden"



Recommendation:



No new full review is necessary.



Optionally suggest a short future recall session.



Completing the review is sufficient for it to count as completed. Never imply that the student must repeat it.



\## 70–84%



Status:



"Grundsätzlich verstanden, aber mit Lücken"



Recommendation:



Do not repeat the complete lecture review.



Optionally suggest a short targeted review containing only weak concepts.



\## Below 70%



Status:



"Noch nicht sicher verstanden"



Recommendation:



Offer an optional targeted HTML review.



The new review should focus primarily on:



\* incorrectly answered concepts

\* partially understood concepts

\* repeated misconceptions

\* important concepts that were skipped



Do not simply regenerate the same questions.



Create new questions testing the same weak concepts from different angles.



\## Below 50%



Status:



"Deutliche Wissenslücken"



Recommendation:



If the student wants more practice, suggest this optional sequence:



1\. identify the 2–5 most important weak concepts

2\. briefly reteach those concepts

3\. update useful personal notes

4\. generate a new focused HTML review



\---



\# Step 7: Weak-area analysis



Track performance by concept.



Every question should internally belong to one or more concepts.



Example:



\* IPv6 Link Local

\* Router Advertisement

\* DHCPv6

\* Default Gateway

\* Address Scope



At the end show a section:



\## Stärken



Concepts with strong performance.



\## Unsicher



Concepts with mixed or partially correct performance.



\## Wiederholen



Concepts with poor performance.



Do not judge a concept from one trivial question if several related questions exist.



Use the overall evidence from the review.



\---



\# Step 8: HTML output



Create a self-contained HTML file whenever possible.



The review must work locally in a normal browser.



Do not require:



\* an OpenAI API key

\* an external AI service

\* a backend server

\* an internet connection



Use plain:



\* HTML

\* CSS

\* JavaScript



External libraries should be avoided unless genuinely necessary.



The file should be usable by opening it directly.



\---



\# HTML interface requirements



The page should look like a lightweight learning game, not a plain form.



Include at the top:



\* subject

\* lecture title

\* progress bar

\* current points

\* maximum points

\* current percentage



Example:



CNS1 · Lecture 02



████████░░  8 / 12 Aufgaben



62 / 100 Punkte



\---



\# Task cards



Show one task at a time by default.



Each task card should contain:



\* question number

\* topic if useful

\* point value

\* question

\* interactive answer area

\* one "Antwort prüfen" button for every task type



After answering, provide concise feedback.


For every automatically graded choice or ordering task, the "Antwort prüfen" action must immediately reveal a visual answer review without requiring another click:


* mark every correct option or correctly placed item green

* mark incorrect options and incorrectly placed items red

* distinguish "correctly selected", "correct but missed", and "incorrectly selected" in text, so colour is not the only signal

* disable further answer changes after grading

* automatically open the explanation

* explain why each choice is correct or incorrect; do not provide only a generic answer key

* for ordering tasks, show the expected position of every misplaced item and explain the correct sequence


Free-text tasks cannot be automatically diagnosed locally. After the student submits their answer, show a detailed expected answer or rubric with the reasoning needed for an honest self-rating.


The student should then be able to continue to the next task.



\---



\# Solution access



Do not provide a separate "Lösung anzeigen" button for any task type. Do not expose the solution before submission. The student gets exactly one submission per task in the current attempt. For both automatic and self-graded tasks, "Antwort prüfen" stores and locks the answer and immediately reveals the solution and reasoning.



The solution must not be visible initially.



When opened, show:



\* correct answer

\* reasoning

\* important points

\* relevant slide/page/section reference



Revealing the solution does not automatically give points for self-graded tasks.



For automatically graded questions, the student's submitted answer determines the score.



For self-graded questions, revealing the solution activates the self-rating buttons.



\---



\# Navigation



Include:



\* Zurück

\* Weiter

\* Aufgabenübersicht



The overview should show task status:



\* unanswered

\* correct

\* partially correct

\* wrong



Allow the student to return to earlier questions.



Do not accidentally reset answers when navigating.



\---



\# Gamification



Keep gamification motivating but simple.



Use:



\* points

\* progress bar

\* streak for consecutive correct answers

\* small positive feedback

\* final score

\* final grade



Optional:



\* XP

\* small combo bonus display

\* "Boss Question" as the final difficult transfer task



Do not let game mechanics distort the actual academic score.



Bonus animations or XP must not change the official review percentage.



\---



\# Final result screen



After finishing the review, show:



\## Ergebnis



\* earned points / maximum points

\* percentage

\* self-assessment grade

\* number fully correct

\* number partially correct

\* number wrong



\## Verständnis



Display one of:



\* Sehr gut verstanden

\* Grundsätzlich verstanden, aber mit Lücken

\* Noch nicht sicher verstanden

\* Deutliche Wissenslücken



\## Stärken



Show concepts understood well.



\## Wiederholen



Show weak concepts.



\## Empfehlung



Show an optional next step without making repetition a requirement. Prefer wording such as:



"Nächster freiwilliger Schritt"



Use one of:



\* Später auffrischen

\* Optional gezielt üben

\* Optional Grundlagen festigen



Then explain why in 1–3 sentences.



Example:



"Wenn du möchtest, kannst du Router Advertisement und IPv6 Scope später mit einem gezielten Review weiter festigen."



\---



\# Targeted follow-up review



If another review could help, provide an explicitly optional button or instruction:



"Gezieltes Review vorbereiten (optional)"



The current HTML does not need to call an AI or generate new questions itself.



Instead, save enough result information so Codex can use the result later.



Create a small JSON result file when practical, or provide export functionality from the HTML.



The result should contain:



\* subject

\* lecture

\* date

\* total score

\* percentage

\* grade

\* question results

\* weak concepts

\* partially understood concepts

\* strong concepts

\* whether another review is recommended



Prefer a simple downloadable JSON export from the HTML.



Example structure:



```json

{

&#x20; "subject": "CNS1",

&#x20; "lecture": "Lecture 02",

&#x20; "percentage": 68,

&#x20; "grade": 4.4,

&#x20; "recommendation": "targeted\_review",

&#x20; "weakConcepts": \[

&#x20;   "IPv6 Link Local",

&#x20;   "Router Advertisement"

&#x20; ]

}

```



When this result is later available to Codex, use it to generate new questions.



Do not repeat the old questions unless repetition is pedagogically useful.



\---



\# Persistence



Use browser localStorage to preserve:



\* answers

\* points

\* current task

\* completed state

\* self-ratings

\* a persistent `attemptId`

\* an `updatedAt` timestamp used to choose the newest local or cloud state



Provide a visible "Zwischenstand speichern" button. It must also capture unsent text currently present in a free-text field before saving. Show a short confirmation with the save time.

When the quiz is integrated with `QuizDashboard`, this button must send the complete resumable state to the dashboard, not only a score summary. The state must include at least:

\* current task

\* answers and unsent text

\* ordering or categorisation state

\* grading results and awarded points

\* revealed solutions

\* self-ratings

\* `attemptId`, `startedAt`, and `updatedAt`

The dashboard persists this private state in Firebase for the signed-in user. Opening the same quiz with the same account on another device must restore the newest saved state. Keep `localStorage` as an offline/direct-open fallback.



Choices, ordering changes, navigation, revealed solutions and grading should continue to save automatically. The manual button is reassurance and an explicit checkpoint, not the only persistence mechanism.



Reloading the HTML should not normally lose progress.



Include a:



"Fortschritt zurücksetzen"



button.



Require confirmation before resetting.


Each task may be submitted only once per attempt. After grading, its inputs stay locked. A new answer is possible only by resetting the whole current review, which must create a new `attemptId`. Offer a clearly labelled "Quiz nochmals machen" action on the result screen. Resetting the current review must not delete earlier completed attempts stored in the dashboard history.



An unfinished saved review must reopen at the same task with all answers, points, ordering and self-ratings intact, including after a device or browser change when Firebase sync is available.



\---



\# Notes



Do not write ordinary correct answers into personal notes.



Update personal notes only when the review reveals:



\* a real knowledge gap

\* a repeated misconception

\* a difficult explanation worth preserving

\* an example that unlocked understanding

\* an important distinction the student repeatedly confused



Keep note additions concise.



When notes are changed, always report:



\* which note file changed

\* what concept was added



\---



\# Quiz dashboard integration



When the semester repository contains `QuizDashboard/quiz-catalog.js`, integrate every newly created review with it.

If `QuizDashboard/QUIZ_ERSTELLEN.md` exists, read it before implementing the review. It is the repository-specific authoring contract and takes precedence over generic examples in this skill when the local dashboard protocol has evolved.



1\. Save the standalone review in `QuizDashboard/quizzes/<SUBJECT>/`. Keep official lecture files in their existing subject folders; do not copy source PDFs or slides into the dashboard.

2\. Give the review a stable, unique quiz ID using the pattern `<subject>-w<week>-<short-topic>`.

3\. Add exactly one matching catalog entry with subject, week, title, source, relative path and maximum score.

4\. On completion, send a `window.postMessage` payload to the parent dashboard with this contract:



```js
{
  source: "quiz-dashboard",
  version: 1,
  type: "quiz-completed",
  quizId,
  attempt: {
    attemptId,
    completedAt,
    score,
    maximumScore,
    percentage,
    grade,
    understanding,
    strongConcepts,
    uncertainConcepts,
    weakConcepts,
    reviewItems
  }
}
```



For unfinished work, register the resume listener before announcing readiness, then send `quiz-ready`. The dashboard responds with `quiz-resume` and any saved progress. Apply the remote `quizState` only when its `updatedAt` value is newer than the local state.

Whenever the student presses "Zwischenstand speichern", first capture any unsent field value, update `updatedAt`, save locally, and send this complete `quiz-progress` payload:



```js
{
  source: "quiz-dashboard",
  version: 1,
  type: "quiz-progress",
  quizId,
  manual,
  progress: {
    attemptId,
    currentTask,
    completedCount,
    totalQuestions,
    score,
    maximumScore,
    updatedAt,
    quizState: {
      current,
      answers,
      order,
      results,
      revealed,
      completed: false,
      attemptId,
      startedAt,
      completedAt: null,
      updatedAt
    }
  }
}
```

Use this resume handshake:

```js
// Quiz -> dashboard
{ source: "quiz-dashboard", version: 1, type: "quiz-ready", quizId }

// Dashboard -> quiz
{
  source: "quiz-dashboard",
  version: 1,
  type: "quiz-resume",
  quizId,
  progress: savedProgressOrNull
}
```

Do not emit a fresh empty progress payload before the dashboard has had the opportunity to return the saved cloud state; otherwise a new device can overwrite the resumable state.



When the student confirms "Fortschritt zurücksetzen", also send `quiz-progress-reset` with the quiz ID. On completion, the dashboard must remove the unfinished-progress entry and store the completed attempt instead.



The dashboard should label an unfinished saved review as "In Bearbeitung", display the saved task count, and offer "Quiz fortsetzen". An unfinished review does not count as completed.

Manual saves and completed attempts should trigger cloud persistence immediately rather than relying only on a delayed debounce that may be lost when the page closes. Surface the dashboard's cloud-sync success or failure status to the user.



Generate a new persistent `attemptId` when the quiz is first started or reset. Re-rendering or reopening the same completed attempt must keep that ID so the dashboard updates the attempt instead of duplicating it.



The dashboard integration is additive: the review must still work when opened directly, retain its own local progress, and keep its JSON result export.



Use the same learning classifications and colours as the dashboard:



\* below 50%: Deutliche Wissenslücken / red

\* 50–69%: Noch nicht sicher verstanden / orange

\* 70–84%: Grundsätzlich verstanden, aber mit Lücken / yellow

\* 85–100%: Sehr gut verstanden / green



Every fully completed attempt counts as completed regardless of its percentage. The colours describe understanding; they are not an official pass/fail result.



\---



\# After generating the HTML



Report briefly:



1\. HTML file created

2\. lecture/topic covered

3\. number of tasks

4\. maximum points

5\. where the file was saved

6\. whether any note file was changed



Do not provide all quiz answers in the chat.



The student should solve the HTML review first.



\---



\# Review quality rules



Before finishing:



\* verify every factual answer against the official lecture material

\* verify slide/page references

\* ensure every question has a clear expected answer

\* ensure multiple-choice questions have no accidental second correct answer

\* avoid trivial wording tricks

\* avoid testing irrelevant slide details

\* prefer understanding over memorisation

\* make wrong options plausible

\* make transfer questions solvable from the lecture material

\* do not expose solutions before requested

\* make sure scoring totals correctly

\* test that the HTML works locally

\* test navigation

\* test the single answer-check action and automatic solution reveal

\* test scoring

\* test final grade calculation

\* test localStorage persistence

\* test that the manual save payload contains the full `quizState`

\* test a simulated second-browser restore through `quiz-ready` / `quiz-resume`

\* test that a newer local state is not overwritten by an older cloud state

\* test that manual save and completion reach the dashboard's Firebase save path

\* test the reset function



The finished review should feel like a small interactive exam and learning game rather than a static worksheet.
