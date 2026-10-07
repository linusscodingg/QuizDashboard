/* ASE1 HS26, English CPRE preparation. Sources verified 2026-10-07.
 * Moodle course 31659: SW1–4 available; SW5/6 unavailable. No invented future lectures.
 * Primary sources: Activities - Week 01.pdf (22 pages), Week 02 (15), Week 03 (17),
 * Week 04 (18 PDF pages, printed slides 1,3–19); workshop task sheets and UX/UCD.
 * H = local CPRE Foundation Level Handbuch v1.2.0, Glinz et al., © IREB.
 * Original explanations and training scenarios; no copied official exam questions or figures.
 * Current syllabus v3.3.0 removes interaction models from the objectives and clarifies
 * that quality criteria are non-exhaustive. Course introduction still links v3.2/v1.2.
 * Priorities and remaining coverage are documented in quizzes/ASE1/CPRE_Exam_Guide.html.
 * Helpers below only construct supported content data; no engine or UI changes.
 */
(() => {
  const H = section => `CPRE FL Handbuch v1.2.0, section ${section}`;
  const W = (n, slides) => `Activities - Week 0${n}.pdf, printed slides ${slides}`;
  const S = (title, ref, ...body) => ({ type: "slide", title, body: [...body, `Source: ${ref}`] });
  const single = (id, prompt, options, correct, explanation) => ({ id, type: "single", prompt, options, correct, explanation });
  const multi = (id, prompt, options, correct, explanation) => ({ id, type: "multi", prompt, options, correct, explanation });
  const order = (id, prompt, items, explanation) => ({ id, type: "order", prompt, items, explanation });
  const C = (id, title, ref, questions) => ({ type: "checkpoint", id, title, questions: questions.map(q => ({ ...q, explanation: `${q.explanation} Source: ${ref}.` })) });
  const table = (head, rows) => ({ table: { head, rows } });
  const reveal = (question, ...answer) => ({ reveal: { question, answer, label: "Reveal explanation" } });
  const note = (tone, title, text) => ({ callout: { tone, title, text } });
  const check = items => ({ checklist: { title: "Can I explain this without notes?", items } });
  const flow = (...steps) => ({ flow: { steps: steps.map(title => ({ title })) } });

  Lerncoach.registerSubject({
    id: "ASE1", name: "Advanced Software Engineering 1", short: "ASE1", accent: "#4b5bb5",
    description: "English CPRE Foundation preparation: principles, context, documentation and requirements elaboration. Weeks 1–4, with original practice cases.",
    weeks: [
      { id: "w1", number: 1, title: "RE foundations and the nine principles", status: "ready", items: [
        S("Your route to the CPRE exam", `${W(1, "4–8")}; Introductory slides.pdf, slides 17–20`,
          "The exam is on 28 October 2026 (your confirmed date). This course teaches you to recognise concepts, explain trade-offs and apply them to short cases. All lesson text and questions are in English.",
          note("exam", "Learning review", "These checkpoints teach the material; they are not an official mock exam. The separate weekly quizzes include a link to the CPRE exam guide and official practice resources."),
          "Weeks 1–4 do not cover the whole certificate: processes, requirements management and tools still need dedicated study before the exam."),
        S("Requirements exist before they are written", H("1.1, pp. 10–12"),
          "A requirement can be a stakeholder's need, a capability or property expected of a system, or a recorded representation of that need. Writing a statement makes a requirement visible; it does not create the underlying need.",
          "Own example: a bidder needs confidence that a bid was received. A system capability could let the bidder inspect the bid's status. A requirement statement records the agreed behaviour.",
          reveal("A team has no specification. Does that mean it has no requirements?", "No. Needs and expectations still exist, but they may be implicit, inconsistent or unknown.")),
        S("Three kinds of requirement", `${W(1, "15")}; ${H("1.1")}`,
          table(["Kind", "Question to ask", "Own example"], [
            ["Functional", "Which result, data or behaviour is required?", "The platform shall show the bidder whether a bid was accepted."],
            ["Quality", "Which quality characteristic is required?", "Under the agreed test load, 95% of confirmations appear within 2 seconds."],
            ["Constraint", "Which solution choices are restricted?", "The platform must use the organisation's prescribed database product."]
          ]), "Classify the concern, not a keyword. A detailed interface behaviour can still be functional. A security objective may be refined into functional controls."),
        C("cp-requirements", "Recognise the concern", H("1.1"), [
          single("receipt", "Own example: the system shall send a receipt after accepting a bid. Which kind is this?", ["Quality requirement", "Functional requirement", "Constraint"], 1, "It specifies an observable system response."),
          multi("qualities", "Select the TWO quality requirements.", ["Display a bid history", "Availability shall reach 99.9% during agreed service hours", "Use the mandated database product", "95% of searches shall finish within one second under the specified load"], [1,3], "Availability and response time constrain quality; the other statements specify behaviour and a solution restriction."),
          single("implicit", "A need has not been written down. What follows?", ["It cannot be a requirement", "It may still be a requirement", "It is automatically out of scope"], 1, "Requirement also denotes the underlying need, not only its documentation.")
        ]),
        S("Why spend effort on RE?", `${W(1, "10, 13–14")}; ${H("1.2")}`,
          "Imagine a technically perfect bidding engine that excludes occasional mobile users. The implementation can satisfy its specification and still fail its stakeholders. RE reduces the risk of building the wrong thing.",
          { list: ["Understand the problem before making expensive commitments.", "Provide a basis for estimation and tests.", "Find missing, unclear and incorrect requirements while correction is still comparatively cheap."] },
          "More documentation is not automatically better. The useful amount depends on risk and the value of clarifying a requirement."),
        S("A role, not a job title", `${W(1, "16–17")}; ${H("1.4–1.6")}`,
          "A product owner, business analyst or developer may perform the requirements engineer role. Its core tasks are elicitation, documentation, validation and management; these tasks influence one another.",
          "Analytical skill is only part of the role. Listening, facilitation, empathy and negotiation help expose different needs and create agreement. No single process fits every project."),
        S("A system and its stakeholders", `${W(1, "11")}; ${H("1.1–1.3, 2.2.2")}`,
          "A system can include software, hardware, people and organisational procedures. A stakeholder is a person or organisation that influences its requirements or is affected by it.",
          "Own example: bidders, sellers, support staff, operators and an oversight body can all matter to an auction platform. A paying sponsor is not a substitute for the other perspectives.",
          reveal("Can the same person occupy two stakeholder roles?", "Yes. A seller might also buy items. Record the roles and their needs rather than treating each person as having only one perspective.")),
        C("cp-purpose", "Purpose, tasks and people", `${H("1.2–1.6, 2.2.2")}`, [
          single("risk", "Why validate needs before implementing an expensive feature?", ["To guarantee that requirements never change", "To remove the need for testing", "To reduce the risk of implementing the wrong capability"], 2, "Validation reduces uncertainty about stakeholder needs; it cannot eliminate all future change."),
          multi("tasks", "Which TWO activities belong to the RE role?", ["Clarifying a need with affected users", "Selecting CPU instructions for a compiler", "Checking that recorded requirements represent agreed needs", "Producing a marketing campaign as the main RE task"], [0,2], "Elicitation and validation are core RE tasks."),
          single("role", "An operator influences recovery requirements but never bids. Is the operator a stakeholder?", ["Yes", "Only if the operator pays", "No, only end users count"], 0, "Influencing requirements is sufficient; direct end-user interaction is not required.")
        ]),
        S("Principles 1–3: value, people and understanding", `${W(1, "19")}; ${H("2.2.1–2.2.3")}`,
          { cards: [
            { title: "Value orientation", text: "Spend effort where clarification and risk reduction justify its cost." },
            { title: "Stakeholders", text: "Discover the relevant perspectives and address their needs and conflicts." },
            { title: "Shared understanding", text: "Check that people attach the same meaning to the words and examples they use." }
          ] }, "These are working principles, not a sequence of phases."),
        S("Explicit agreement can still hide misunderstanding", H("2.2.3, pp. 21–23"),
          "Explicit shared understanding rests on agreed documentation. Implicit understanding rests on common knowledge, experience and assumptions. Both can be wrong.",
          "Own example: everyone signs a requirement about 'active bidders', but support means logged-in users while development means users with an accepted bid. A signature has not resolved the ambiguity.",
          reveal("How could you reveal this difference?", "Ask both groups to classify concrete examples, agree a glossary entry and validate the resulting rule. A prototype or short feedback cycle can expose additional gaps.")),
        S("Principles 4–6: context, problem and validation", `${W(1, "19")}; ${H("2.2.4–2.2.6")}`,
          { cards: [
            { title: "Context", text: "Understand the environment, interfaces and assumptions that make requirements meaningful." },
            { title: "Problem–requirement–solution", text: "Distinguish the need from a proposed implementation while exploring their dependencies." },
            { title: "Validation", text: "Check needs, agreement and context assumptions early and repeatedly." }
          ] }, "A prototype is already a partial solution, but it can help discover what the requirement should be. The three concerns are intertwined."),
        C("cp-understanding", "Apply principles, not slogans", H("2.2.1–2.2.6"), [
          single("signed", "Everyone signed the same text. What can you conclude?", ["Their interpretations must match", "No further validation is needed", "Agreement should still be checked with examples"], 2, "Even explicit shared understanding may be false."),
          multi("context", "Select TWO things worth checking when validating requirements.", ["Whether relevant needs are covered", "Whether assumptions about external systems are plausible", "Whether the document is as long as possible", "Whether every requirement forbids future change"], [0,1], "Coverage and realistic context assumptions are central validation concerns."),
          single("solution", "A client asks for a red button. What is the best first response?", ["Explore what outcome the button should achieve", "Reject every proposed solution without discussion", "Implement immediately because it is written down"], 0, "Solution ideas can be useful, but the underlying problem and need must be understood.")
        ]),
        S("Principles 7–9: evolution, innovation and discipline", `${W(1, "19")}; ${H("2.2.7–2.2.9")}`,
          { cards: [
            { title: "Evolution", text: "Change is normal. Manage it while retaining enough stability to develop reliably." },
            { title: "Innovation", text: "Investigate better ways to meet needs; merely transcribing requests can miss opportunities." },
            { title: "Systematic and disciplined work", text: "Tailor appropriate practices and work products to the situation." }
          ] }, "Agile work still needs discipline. Discipline does not require the same large specification in every project."),
        S("Own transfer case: a fixed auction deadline", H("2.2.5–2.2.9"),
          "Sellers request extensions after late bids. Buyers want a predictable closing time. The team proposes silently changing the rule next week.",
          reveal("Which principles guide a better response?", "Stakeholders: investigate both needs. Shared understanding: define a precise closing rule. Validation: review examples with both groups. Evolution: assess consequences and communicate any agreed change. Innovation: consider alternatives without treating the first idea as mandatory.")),
        S("Own transfer case: the perfect document", H("2.2.1, 2.2.3, 2.2.9"),
          "A team spends three weeks specifying a disposable sketch in exhaustive detail while a high-risk payment assumption remains untested.",
          reveal("What should change in its RE effort?", "Move effort towards the risky assumption and clarify it with the relevant stakeholders. Preserve enough documentation to communicate and maintain decisions. Judge effort by expected value, not by page count.")),
        C("cp-evolution", "Respond to change", H("2.2.7–2.2.9"), [
          single("change", "A new customer workflow changes a requirement. Which reaction fits the evolution principle?", ["Reject it because agreed requirements are immutable", "Accept every change without analysis", "Assess impact and handle the change through an appropriate process"], 2, "RE balances adaptation with controlled stability."),
          multi("discipline", "Select TWO compatible practices.", ["Tailor RE to the project's risks", "Validate assumptions in short feedback cycles", "Use the same document set regardless of context", "Treat agile work as permission to skip RE"], [0,1], "Tailoring and feedback support disciplined work."),
          single("innovation", "What is the main problem with acting only as a recorder of stakeholder requests?", ["It always produces too little text", "It can miss hidden needs and better solutions", "It makes stakeholders irrelevant"], 1, "Innovation requires exploration beyond the first expressed solution, while retaining stakeholder involvement.")
        ]),
        S("Read the question, then judge the alternatives", W(1, "4–5"),
          "Practise the distinction between a true statement and the answer to the question asked. Notice NOT, least suitable, best and the required number of answers.",
          note("warn", "Avoid word-based guessing", "Words such as always or never are not automatic proof that an option is false. Assess the underlying concept and the conditions in the case."),
          "The lecture's 'CTFL' heading is a typo in this CPRE context. Use CPRE's own exam regulations for format and scoring."),
        C("cp-transfer", "Final foundations check", `${H("1–2")}; ${W(1, "5")}`, [
          single("not", "Which statement is NOT a sound RE principle?", ["Systems must be understood in context", "Requirements can evolve", "More documentation always creates more value", "Validate stakeholder needs"], 2, "Documentation incurs costs and must justify its value."),
          multi("falsecommon", "A team uses the same term differently. Select TWO useful actions.", ["Agree a glossary entry with examples", "Ask each party to explain a concrete case", "Assume signatures prove understanding", "Let developers silently choose a meaning"], [0,1], "Both actions test meaning instead of assuming it."),
          single("allnine", "The case description does not mention validation. What follows?", ["The validation principle does not apply", "Validation is already complete", "Evidence is missing; plan appropriate validation"], 2, "An absent description is not evidence that a universal principle is inapplicable.")
        ]),
        S("Week 1 self-check", `${W(1, "8–21")}; ${H("1–2")}`,
          check(["Classify a requirement by its concern.", "Explain how RE reduces risk and creates value.", "Name and apply all nine principles.", "Recognise false shared understanding.", "Explain why missing evidence does not make a principle irrelevant."]),
          "Next: turn context assumptions into visible boundaries and prepare interviews that uncover useful evidence.")
      ] },
      { id: "w2", number: 2, title: "System context, scope and exploratory interviews", status: "ready", items: [
        S("What belongs to the system?", `${W(2, "3–14")}; ${H("2.2.4, 3.4.2")}`,
          "This week connects two tasks: defining what is being built and finding out what people need. Context models expose questions; interviews help answer them.",
          note("exam", "Priority", "Be able to distinguish system boundary, context boundary and scope in a case. Interview wording and bias are practical ASE1 applications of elicitation and shared understanding.")),
        S("Two boundaries, two questions", H("2.2.4, pp. 24–26"),
          table(["Boundary", "Separates", "Own auction example"], [
            ["System boundary", "The system from its surrounding context", "Bidding application versus external payment service"],
            ["Context boundary", "Relevant environment from irrelevant environment", "Payment rules matter; an unrelated office booking service does not"]
          ]), "An element outside the system may still impose crucial requirements. Irrelevant means irrelevant to this system and its requirements, not globally unimportant."),
        S("Scope means design freedom", H("2.2.4, pp. 24–25"),
          "Scope is the range of things the project can shape or design. It often aligns with the system boundary, but does not have to.",
          "Own example: a fixed, reused library may sit inside the system but outside the project's design freedom. A support procedure outside the software may be changed as part of the project.",
          reveal("Can inside the system and outside scope both be true?", "Yes. A mandatory unchanged component is the standard counterexample. Location and authority to change are different questions.")),
        C("cp-boundaries", "Separate relevance and control", H("2.2.4"), [
          single("payment", "An external payment service controls confirmation formats. Where does it belong?", ["Inside the application because it matters", "Relevant context outside the application", "Irrelevant environment because it is external"], 1, "Relevance does not imply inclusion in the system."),
          multi("scope", "Which TWO statements can be true?", ["A fixed reused component is inside the system but outside scope", "A redesigned external procedure is inside scope", "Every external element is irrelevant", "System boundary and scope are synonyms"], [0,1], "Scope expresses design freedom; the system boundary expresses system membership."),
          single("context", "A newly discovered external rule affects acceptance of bids. Which classification needs reconsideration?", ["Whether the rule belongs to the relevant context", "Only the UI colour palette", "Only the team's job titles"], 0, "New evidence can change the context boundary and requirements.")
        ]),
        S("Make a context model answer useful questions", `${W(2, "13–14")}; ${H("3.4.2")}`,
          "Put the system at the centre. Identify external actors and systems, then label what crosses each interface. A labelled bid request and acceptance response are more informative than an unexplained line.",
          table(["Own example element", "Relationship to platform", "Question exposed"], [
            ["Bidder", "Submits bid / receives status", "What counts as received before the deadline?"],
            ["Payment service", "Authorisation request / result", "What happens if it is unavailable?"],
            ["Support staff", "Investigates disputed bids", "Which evidence must be retained?"]
          ]), "A context view shows relationships and requirement sources; it is not a complete specification of behaviour or detailed screen design."),
        S("Core and extended systems", `${W(2, "14")}; Activities week 4 Tasks.pdf, tasks 3–4`,
          "The software view may show a core application. A client may regard the application plus people and procedures as a larger service. Both views can be useful if their boundaries are explicit.",
          "Own example: the software records a dispute, while the extended auction service includes a person deciding it. Moving that decision into software changes responsibility, risk and required information.",
          reveal("Why agree the boundary before assigning requirements?", "Otherwise the team might promise an outcome that depends on an external actor it neither builds nor controls.")),
        S("Domain assumptions connect software and reality", H("2.2.4, pp. 25–26"),
          "The system operates on inputs and interfaces, while stakeholder goals often concern the real world. An assumption links the two.",
          "Own example: delivery notifications are meaningful only if the external delivery service supplies accurate events. Writing a software requirement does not make this assumption true.",
          note("tip", "Make the dependency visible", "Record the assumption, identify its source and owner, validate its plausibility and decide how failures should be handled.")),
        C("cp-contextmodel", "Read a context critically", `${H("2.2.4, 3.4.2")}; ${W(2, "13–14")}`, [
          single("model", "Which detail belongs most directly in a context model?", ["Private helper methods", "A payment authorisation interface", "A button's exact border radius"], 1, "External interactions locate the system in its environment."),
          multi("assumptions", "Select TWO sound conclusions about a delivery-event assumption.", ["Its failure may undermine a stakeholder goal", "Its plausibility should be validated", "Writing it proves the external service behaves correctly", "It is irrelevant because it is outside the software"], [0,1], "Context dependencies can determine whether system behaviour achieves the intended result."),
          single("perspective", "Two models put a support team on different sides of the boundary. What should you check first?", ["Whether they model the same system and level", "Which diagram has more boxes", "Which author has the newer laptop"], 0, "A software view and a wider service view can have deliberately different boundaries.")
        ]),
        S("A work product carries the result", `${W(2, "10–12")}; ${H("3.1.1")}`,
          "A work product is a recorded result of work, whether intermediate or final. An interview record, a context diagram and a structured specification are examples. An unrecorded thought is not a work product.",
          table(["Facet", "Useful planning question"], [["Purpose", "Who needs this and for what decision?"],["Size", "One requirement or a coherent collection?"],["Representation", "Text, template, model or prototype?"],["Lifespan", "Temporary, evolving or durable?"],["Storage", "Where will people find the current version?"]])),
        S("Prepare an exploratory interview", W(2, "3, 8"),
          "Start from the project description and what is missing. Collect questions across subgroups so that front-end assumptions do not hide operating or data needs.",
          flow("Read the proposal and identify gaps", "Agree interview goals and neutral questions", "Assign lead, note-taking and observation roles", "Conduct, clarify and summarise", "Confirm findings and record open questions"),
          "This is a practical preparation sequence. RE as a whole remains iterative."),
        S("Open questions and focused follow-ups", `${W(2, "5–8")}; ${H("4.2.2")}`,
          { compare: { left: { title: "Explore", points: ["Walk me through the last time you submitted a bid.", "Where did you become uncertain?"] }, right: { title: "Clarify", points: ["Was the confirmation visible before you left the page?", "Does this rule also apply when the connection fails?"] } } },
          "Open questions discover context; closed questions confirm specifics. Neither type is universally better. Paraphrase what you heard and allow the speaker time to correct or extend it."),
        C("cp-interview", "Prepare and ask", W(2, "3–8"), [
          order("sequence", "Order this interview preparation and follow-up sequence.", ["Identify gaps in the project proposal", "Prepare questions and assign roles", "Conduct the interview and clarify answers", "Confirm findings and document open questions"], "Preparation targets uncertainty; follow-up turns the conversation into usable evidence."),
          single("open", "Which prompt best explores current work without proposing an answer?", ["You like our quick interface, right?", "Is A or B obviously better?", "Please describe how you currently check a bid's status."], 2, "The prompt invites a description without praising a proposed solution."),
          multi("record", "Which TWO outputs are useful after the interview?", ["A record of questions and answers", "Explicit unresolved issues and follow-up actions", "Only a list of preferred technologies", "A claim that all requirements are now complete"], [0,1], "The evidence and remaining gaps are needed for subsequent RE work.")
        ]),
        S("Social desirability bias", W(2, "5"),
          "People may soften criticism to be polite. 'We worked so hard on this easy interface' makes it harder for someone to say it was confusing.",
          reveal("Rewrite: 'Our improved design makes bidding easy. How much better is it?'", "Try: 'Please describe your experience placing this bid. What helped you, and what caused difficulty?' Avoid claiming improvement before gathering evidence.")),
        S("Expectation bias", W(2, "6–7"),
          "Observers may interpret the same remark according to what they expected to find. 'It took longer' does not prove that the UI, backend or user's attitude was responsible.",
          { compare: { left: { title: "Observation", points: ["Participant took 50 seconds and reopened the help text."] }, right: { title: "Hypothesis", points: ["The label may be unclear. Check through follow-up and other observations."] } } },
          "Keep the evidence separate from the interpretation. Team discussion and participant clarification can expose premature conclusions."),
        S("Own transfer: a missing stakeholder", `${W(2, "8, 13–14")}; ${H("2.2.2–2.2.4")}`,
          "A team interviewed buyers and sellers. The context model shows payment and delivery, but nobody considered disputed or failed payments.",
          reveal("What should you do next?", "Investigate support, operations and payment-service representatives as additional sources. Add the relevant interactions, record unknowns and ask about concrete failure cases. Revisit the boundary if responsibilities are unclear.")),
        C("cp-bias", "Distinguish evidence from interpretation", W(2, "5–8"), [
          single("polite", "A participant praises a design after being told how much effort it took. Which bias is especially plausible?", ["Social desirability bias", "A proven absence of bias", "Proof of technical correctness"], 0, "The introduction may encourage a socially pleasing response."),
          multi("evidence", "Select TWO useful safeguards against expectation bias.", ["Record observable events separately from explanations", "Ask the participant to clarify what happened", "Keep only evidence supporting your first theory", "Translate every hesitation into resistance to change"], [0,1], "Separate observations and interpretations, then test explanations."),
          single("silence", "The client pauses after an answer. What can a brief pause by the interviewer achieve?", ["Guarantee agreement", "Allow processing and further detail", "Replace all follow-up questions"], 1, "Waiting and paraphrasing can support fuller answers, but do not guarantee completeness.")
        ]),
        S("Own transfer: an unchanged subsystem", H("2.2.4"),
          "The platform includes a legacy identity component that must stay unchanged. The project is allowed to redesign the operator's account-recovery procedure.",
          reveal("Explain system boundary, scope and context for this case.", "The identity component can be inside the software system while outside the change scope. The operator procedure can be outside the software boundary while within project scope. Both matter when specifying recovery requirements.")),
        C("cp-w2final", "Turn context into an RE plan", `${H("2.2.4, 3.1.1")}; ${W(2, "8–14")}`, [
          single("artifact", "Which item is a work product?", ["An unrecorded assumption", "The act of thinking", "A saved context diagram"], 2, "A work product is a recorded intermediate or final result."),
          multi("next", "The context model exposes an unclear payment timeout. Select TWO appropriate next steps.", ["Identify a source able to clarify the timeout", "Record and validate the agreed behaviour", "Assume an attractive number is the official rule", "Remove the interface because it is difficult"], [0,1], "Models reveal gaps that must be resolved with evidence."),
          single("scopeagain", "Which question most directly determines scope?", ["What can this project shape or design?", "What exists anywhere in the world?", "What appears inside any diagram box?"], 0, "Scope concerns design freedom, not graphical placement alone.")
        ]),
        S("Week 2 self-check", `${W(2, "3–14")}; ${H("2.2.4, 3.1.1")}`,
          check(["Draw and explain both boundaries.", "Give a case where scope differs from the system boundary.", "Expose interfaces and domain assumptions.", "Prepare neutral interview questions and useful follow-up.", "Distinguish observed evidence from a proposed explanation."]),
          "Next: choose the right documentation and recognise what each model can and cannot show.")
      ] },
      { id: "w3", number: 3, title: "Work products, documentation and model literacy", status: "ready", items: [
        S("Document for the next person who needs the requirement", `${W(3, "2–8")}; ${H("3.1")}`,
          "The lecture focuses on work products and context views. The assigned chapter 3 extends this to language, templates and models; these are part of this week's self-study.",
          "The purpose determines the representation and detail. A tester needs checkable outcomes; a customer needs understandable behaviour; maintainers need decisions they can trace."),
        S("Temporary, evolving and durable", `${W(3, "5")}; ${H("3.1.1, pp. 34–36")}`,
          table(["Lifespan", "Example", "Handling"], [["Temporary", "A sketch used during discussion", "Discard when no longer useful"],["Evolving", "A refined collection of stories", "Maintain owner, status and history; control changes as needed"],["Durable", "Released specification or baselined sprint backlog", "Preserve metadata and use controlled changes"]]),
          "Durable does not mean physically indestructible or forever unchanged. It describes a released or baselined work product managed in a controlled way."),
        S("Detail is a risk decision", `${W(3, "6–7")}; ${H("3.1.2–3.1.3")}`,
          "A distributed supplier with little domain knowledge and slow feedback needs more explicit detail than a closely collaborating team with rapid feedback. Regulation and critical consequences can require more detail too.",
          "Abstraction level asks which level of concern you describe; detail asks how precisely you describe it. A precise business objective can still be at a high abstraction level.",
          reveal("Is the longest specification always safest?", "No. It costs effort, may hide important information and creates maintenance work. Choose enough detail to control the relevant risks.")),
        C("cp-workproducts", "Choose the right work product", `${W(3, "3–7")}; ${H("3.1.1–3.1.3")}`, [
          single("baseline", "A released requirements specification is maintained under change control. Which lifespan category fits?", ["Temporary", "Durable", "Unrecorded"], 1, "Released or baselined work products are durable."),
          multi("detail", "Which TWO factors tend to justify more explicit detail?", ["Little shared domain knowledge", "Severe consequences of misunderstandings", "A rule that every document must be equally long", "The number of colours in the model"], [0,1], "Detail should address uncertainty and risk."),
          single("retain", "A workshop sketch will now be refined throughout the project. What changes?", ["It can become an evolving work product with metadata", "It ceases to be a work product", "It becomes a final contract automatically"], 0, "Lifespan classification can change when the intended use changes.")
        ]),
        S("Cover all relevant aspects", `${W(3, "8")}; ${H("3.1.4")}`,
          table(["Aspect", "Own auction question"], [["Structure and data", "Which bids belong to which auctions?"],["Function and flow", "How is a bid checked and accepted?"],["State and behaviour", "What happens to a new bid after closing?"],["Quality", "How fast must confirmation arrive under a given load?"],["Constraints", "Which interfaces or platforms are mandated?"],["Context and boundary", "Which external services and assumptions matter?"]]),
          "Separate views help people reason. Keep them consistent: the state model must not accept a bid that the flow and text reject."),
        S("Write testable, understandable language", H("3.2, pp. 42–44"),
          "Natural language is expressive and accessible, but ambiguity and omissions are easy to miss. Use short structured statements, consistent terms and explicit conditions.",
          reveal("Own example: 'After checking, the data shall be sent quickly.' What is missing?", "Who checks what, which data are sent, to whom, what triggers sending, and what 'quickly' means in the relevant conditions. Clarify the facts before inventing a precise replacement."),
          "Universal claims such as 'all' need checking for exceptions. Passive wording can hide an actor; nominalisations such as 'verification' can hide an unspecified process."),
        S("Templates help structure; they do not prove truth", H("3.3"),
          "A phrase template prompts you to name a condition, system, obligation and response. A form template structures a use case. A document template organises a specification.",
          "Own draft: 'When an accepted auction closes, the platform shall notify its winning bidder.' Open questions remain: what if there is no valid bid, or notification fails?",
          note("warn", "Check the content", "A grammatically complete requirement may still describe the wrong behaviour. Validate it with the relevant sources.")),
        S("Stories, acceptance criteria and use cases", H("3.3"),
          { compare: { left: { title: "User story", points: ["A stakeholder-oriented slice of value.", "Supports conversation; acceptance criteria clarify what success means."] }, right: { title: "Use case", points: ["A system function from an actor's perspective.", "Can describe preconditions, main flow, alternative flows and outcomes."] } } },
          "Own story: 'As an occasional bidder, I want to review a bid before committing so that I can catch mistakes.' A checkable acceptance example specifies what happens on confirm and cancel; it is not just 'works well'."),
        C("cp-language", "Find documentation defects", H("3.2–3.3"), [
          single("quickly", "What is the main defect in 'The system responds quickly' for a performance acceptance test?", ["It names the system", "The response criterion and conditions are unclear", "It is not a functional requirement"], 1, "Without agreed criteria and conditions, different testers may judge it differently."),
          multi("templates", "Select TWO true statements about templates.", ["They can prompt missing information", "They can support consistent structure", "They guarantee stakeholder satisfaction", "They eliminate the need for a glossary"], [0,1], "Templates support documentation but cannot establish correctness by themselves."),
          single("alternative", "A use case has only the successful path. What should be investigated?", ["Relevant exceptions and alternative flows", "Only font consistency", "How to remove the actor"], 0, "Failure and alternative cases can reveal essential requirements.")
        ]),
        S("Models are purposeful abstractions", `${W(3, "9–12")}; ${H("3.4.1–3.4.2")}`,
          "A model deliberately selects aspects of reality for a purpose. Syntax tells you which constructs can be used; semantics tells you what they mean. A diagram can be syntactically valid and semantically wrong.",
          table(["Need", "Useful model"], [["External actors and interfaces", "Context view"],["Static entities and relationships", "Class/domain model"],["Functions used by actors", "Use case model"],["Activity order and concurrency", "Activity model"],["Responses depending on current state", "State model"]]),
          "The lecture permits several context notations. Explain your notation and viewpoint rather than claiming every model captures the entire domain."),
        S("Read associations from the opposite end", H("3.4.3"),
          "Own textual class model: `Auction 1 — 0..* Bid`. Each Bid belongs to exactly one Auction; an Auction may have zero or many Bids. The number beside Bid answers how many bids one auction may have.",
          reveal("Does this model force every auction to have a bid?", "No. The lower bound is zero. Changing it to 1..* would require at least one bid per auction."),
          "Attributes describe properties; associations describe relationships; generalisation expresses an is-a relationship. A domain model is not automatically a database design."),
        S("Use case diagrams show goals, not step order", H("3.3, 3.4.4"),
          "An actor is a role interacting with the system; it may be a person or another system. Use cases name system functionality meaningful to actors. A diagram locates actors, use cases and the system boundary.",
          "A use case description adds the flow and conditions. 'Place bid' and 'View results' appearing together does not mean they occur in that sequence.",
          reveal("An actor is drawn outside the boundary. Does that make it irrelevant?", "No. Actors are part of the relevant context. The diagram represents their interaction with the system.")),
        C("cp-models", "Interpret the model's meaning", H("3.4.1–3.4.4"), [
          single("multiplicity", "In Auction 1 — 0..* Bid, how many Auctions belong to one Bid?", ["Zero or many", "Exactly one", "At least two"], 1, "Read the multiplicity at the Auction end from a single Bid."),
          multi("usecase", "Which TWO things can a use case diagram show directly?", ["Actors", "System functionality associated with actors", "Exact execution order of every internal action", "Complete performance acceptance thresholds"], [0,1], "Detailed flows and quality criteria need complementary descriptions."),
          single("syntax", "A legal diagram uses the wrong multiplicity for the agreed business rule. Which issue remains?", ["Its semantics do not match the domain", "No issue: valid syntax proves correctness", "It only needs a larger title"], 0, "Notation compliance does not validate the represented requirement.")
        ]),
        S("Decisions, merges, forks and joins", H("3.4.4"),
          table(["Construct", "Meaning"], [["Decision", "Select an alternative using conditions"],["Merge", "Recombine alternative paths without synchronising concurrent work"],["Fork", "Start parallel paths"],["Join", "Synchronise parallel paths before proceeding"]]),
          "Own example: after accepting a bid, send a receipt and update a display in parallel. A join before the next action requires completion of the relevant parallel paths. Replacing the fork with a decision would mean a different behaviour.",
          reveal("Why is a merge not a substitute for a join?", "A merge accepts an incoming alternative; it does not wait for all concurrent activities to finish.")),
        S("State determines the meaning of an event", H("3.4.5"),
          "A state model expresses event-dependent behaviour. A transition can have a trigger, a guard that must hold and an action. The same event may lead to different responses in different states.",
          "Own example: `Open → Closed` on the deadline. A bid event is accepted only in Open when the validity guard holds. A bid arriving in Closed must follow a separately agreed rule.",
          reveal("Does receiving a trigger guarantee a transition?", "No. The source state and any guard must permit it. Check both before predicting the resulting state.")),
        S("Glossary and documentation structure", H("3.5–3.6"),
          "A glossary gives agreed meanings, handles synonyms and exposes terms that look identical but have different meanings. Keep definitions accessible and use them consistently.",
          "Structure documents around their audience and purpose. Reference common facts instead of duplicating them. Repetition creates multiple places that can drift apart when a rule changes."),
        C("cp-flow", "Reason about behaviour", H("3.4.4–3.6"), [
          single("join", "Two parallel checks must finish before release. Which construct expresses waiting for both?", ["Merge", "Join", "Decision"], 1, "A join synchronises concurrent paths; a merge combines alternatives."),
          multi("transition", "Which TWO facts can prevent a triggered state transition?", ["The system is not in its source state", "Its guard is false", "The diagram uses English labels", "The transition has an action"], [0,1], "A trigger is not sufficient without the appropriate state and guard."),
          single("glossary", "Why reference one agreed definition instead of copying it into many documents?", ["To reduce contradictory updates", "To remove the need to understand it", "To prevent all future changes"], 0, "References reduce redundant content and maintenance drift.")
        ]),
        S("Quality criteria apply to more than spelling", H("3.8"),
          "Check whether a requirement adequately reflects needs, is necessary, understandable, unambiguous and verifiable. For collections, also look for consistency, appropriate completeness, modifiability and traceability.",
          "Own example: two individually clear statements demand opposite actions after a late bid. Clarity alone does not make the set consistent.",
          note("tip", "A useful set, not a universal exhaustive list", "Select quality criteria for the intended work product and context. The current syllabus explicitly clarifies that the recommended criteria are not exhaustive.")),
        S("Sustainability: a course application of RE", "Activities week 3 Tasks.pdf, p. 1; Activities - Week 03 - interdisciplinary.pdf",
          "The workshop asks you to consider environmental, social, individual, economic and technical sustainability. These broaden the search for needs and trade-offs; they are not a claimed separate CPRE exam unit.",
          table(["Dimension", "Own candidate concern"], [["Environmental", "Energy consumed per completed task"],["Social", "Access for different user groups"],["Individual", "Cognitive effort and wellbeing"],["Economic", "Affordable operation over time"],["Technical", "Maintainability and continued usefulness"]]),
          "Turn a chosen concern into a requirement with a source, scope and agreed evidence of fulfilment. Investigate trade-offs rather than declaring all goals automatically compatible."),
        S("Own transfer: from vague ambition to evidence", H("3.1.4, 3.2, 3.8"),
          "A client says, 'The auction service must be sustainable and user-friendly.' This is a useful concern, but does not yet identify what should be tested.",
          reveal("Propose a next RE step without inventing stakeholder agreement.", "Identify affected groups and concrete use situations. Clarify which sustainability dimension and usability outcome matter. Propose a measurement and threshold as a draft, then validate it; do not silently turn your own numbers into approved requirements.")),
        C("cp-quality", "Review the complete requirement set", `${H("3.1.4, 3.8")}; Activities week 3 Tasks.pdf`, [
          single("consistency", "R1 accepts bids until 12:00 inclusive; R2 rejects every bid at 12:00. What needs resolving?", ["Only typography", "A contradiction at the boundary time", "A missing technology brand"], 1, "The same event is required to receive incompatible treatment."),
          multi("sustainable", "Select TWO appropriate responses to a sustainability goal.", ["Identify affected stakeholders and dimensions", "Agree evidence for judging fulfilment", "Assume sustainability only concerns electricity", "Choose arbitrary targets and label them client-approved"], [0,1], "The workshop covers five dimensions and requires relevance to the project."),
          single("qualitycriterion", "Are the syllabus's recommended quality criteria an exhaustive list for every context?", ["Yes, additional criteria are forbidden", "No, relevant criteria depend on the context", "They apply only to source code"], 1, "Use the criteria as guidance and adapt to the work product and risk.")
        ]),
        S("Week 3 self-check", `${W(3, "2–16")}; ${H("3")}`,
          check(["Choose lifespan, representation and detail for a purpose.", "Repair ambiguous language without inventing facts.", "Read association multiplicities and model viewpoints.", "Distinguish merge from join and interpret guarded transitions.", "Check individual requirements and the consistency of a set.", "Translate a sustainability concern into a requirement candidate."]),
          "Model practice here uses original small cases. For full diagram-based questions, also use the official English practice paper linked from the weekly quizzes.")
      ] },
      { id: "w4", number: 4, title: "Elicitation, conflict resolution, validation and UCD", status: "ready", items: [
        S("Elaboration is a feedback loop", `${W(4, "3–4")}; ${H("4, pp. 85–87")}`,
          "Identify sources, elicit needs, resolve conflicts and validate the resulting requirements. These activities repeat and influence each other; they are not a one-pass waterfall.",
          "The slides emphasise sources, stakeholders and Kano. The assigned chapter 4 supplies the broader techniques, conflict and validation topics. UX/UCD is a related course workshop."),
        S("Source is not technique", `${W(4, "5–6, 12")}; ${H("4.1")}`,
          table(["Source category", "Own example", "Technique used to learn from it"], [["Stakeholder", "Support representative", "Interview"],["Document", "Operating procedure", "Document analysis"],["System", "Legacy bidding platform", "System archaeology"]]),
          "Check the currency and relevance of documents and systems. Existing behaviour may be a useful clue or an old defect; reuse does not prove suitability."),
        S("Discover stakeholders systematically", `${W(4, "7–9")}; ${H("4.1.1")}`,
          "Alexander's onion model prompts a search through the system's surrounding socio-technical layers. Start with obvious users and clients, follow their relationships, and stop following a branch when it reaches irrelevant surroundings.",
          "Maintain a stakeholder list: roles, contact, availability, expertise, relevance, influence and interest. A large list without suitable representatives or planned involvement is not effective stakeholder management."),
        S("Goals and stakeholder involvement", "Activities week 4 Tasks.pdf, tasks 1–2; Activities - Week 04.pdf, printed slide 9",
          "Relate goals to the stakeholders who need them and make conflicts visible. The course uses SMART: Specific, Measurable, Attractive or Accepted, Realistic and Time-bound.",
          "Influence and motivation help plan involvement. An influential but disengaged stakeholder may need focused engagement; a motivated user with little formal influence can still supply essential domain knowledge.",
          reveal("Does low influence justify ignoring a user's requirements?", "No. Influence is one management dimension, not a proof of irrelevance. Consider impact, expertise and the consequences of exclusion.")),
        C("cp-sources", "Find and involve the right sources", `${W(4, "5–12")}; ${H("4.1")}`, [
          single("technique", "Which is a technique rather than a requirements source?", ["A legacy system", "A process manual", "An interview", "A system operator"], 2, "The interview is the means used to elicit from a source."),
          multi("stakeholders", "Select TWO useful stakeholder-list attributes.", ["Role in relation to the system", "Relevance and availability", "Favourite film regardless of project", "A guarantee that opinions will never change"], [0,1], "Useful attributes support source selection and collaboration."),
          single("snowball", "When following stakeholder relationships, when can a branch stop?", ["After exactly three people", "When it leads only to irrelevant surroundings", "As soon as a developer is found"], 1, "The relevant context bounds the search, not an arbitrary count.")
        ]),
        S("Kano: different relationships to satisfaction", `${W(4, "16, 18")}; ${H("4.2.1")}`,
          table(["Factor", "If absent", "If provided well", "Useful access"], [["Basic / dissatisfier", "Strong dissatisfaction", "Taken for granted", "Observe routines and failures"],["Performance / satisfier", "Less satisfaction", "More satisfaction as fulfilment improves", "Ask and compare needs"],["Excitement / delighter", "Often no complaint", "Unexpected delight", "Explore ideas and prototypes"]]),
          "The axes describe degree of fulfilment and satisfaction. A basic factor is not a feature that causes dissatisfaction when present; it causes dissatisfaction when missing."),
        S("Kano classifications can change", `${W(4, "16, 18")}; ${H("4.2.1")}`,
          "A feature can delight one group while being expected by another. Expectations can evolve over time: yesterday's novelty can become tomorrow's basic expectation.",
          "Ask about both presence and absence of a feature. Use the responses to investigate its role instead of permanently classifying it from your own opinion.",
          reveal("Own example: nobody asks for reliable bid storage. Can you omit it?", "No. Silence may indicate a taken-for-granted basic need. Observe failures and ask concrete questions before deciding.")),
        S("Gathering techniques: select by the evidence you need", H("4.2.2"),
          table(["Technique", "Strength", "Limitation to manage"], [["Interview", "Depth and follow-up", "Time and interviewer bias"],["Questionnaire", "Reach many participants", "Wording and sampling limit usefulness"],["Workshop", "Bring viewpoints together", "Needs facilitation and balanced participation"],["Field observation", "Expose tacit routines", "Observation may affect behaviour"],["Apprenticing", "Learn by doing under an expert's guidance", "Access and time"],["System archaeology / feedback analysis", "Recover knowledge from existing artefacts", "Check relevance and avoid copying defects"]])),
        C("cp-kano", "Choose how to uncover a need", `${H("4.2.1–4.2.2")}; ${W(4, "16, 18")}`, [
          single("basic", "Users expect saved bids never to disappear and only mention it after a loss. Which Kano interpretation best fits?", ["Basic factor", "Excitement factor", "An irrelevant need"], 0, "Taken-for-granted expectations often emerge through dissatisfaction when absent."),
          multi("kanochange", "Select TWO valid cautions about Kano.", ["A classification can depend on the user group", "A classification may change over time", "Every performance factor is explicitly known forever", "An unmentioned need is always unimportant"], [0,1], "Kano describes relationships to expectations in a context."),
          single("apprentice", "An analyst performs a task while a domain expert teaches and corrects them. Which technique is this?", ["Questionnaire", "Apprenticing", "Only passive observation"], 1, "Apprenticing includes learning through guided participation.")
        ]),
        S("Generate ideas as well as gathering existing knowledge", H("4.2.3"),
          "Brainstorming separates idea generation from judgement. Analogies transfer useful ideas from other domains. Scenarios and storyboards make a concrete use situation discussable. Prototypes let people experience selected parts of a potential solution.",
          "Design thinking alternates widening and narrowing the exploration of problems and solutions. Do not select an attractive solution before understanding the need.",
          note("warn", "Technique choice is conditional", "The lecture's example pairings are prompts for discussion, not universal rules. Confidentiality, access, time, stakeholder availability and desired evidence must all shape the choice.")),
        S("Own transfer: replacing a legacy platform", H("4.2.2–4.2.3"),
          "The old platform has undocumented bid rules. Users cannot explain their exceptions easily. The team wants a novel experience without losing critical behaviour.",
          reveal("Propose a combination of techniques and explain each purpose.", "Analyse the existing system and records to recover candidate rules; observe users to expose tacit workarounds; interview them about exceptions; use a prototype to explore new interaction ideas. Validate what must be preserved rather than copying every legacy behaviour.")),
        C("cp-techniques", "Match method to uncertainty", H("4.2.2–4.2.3"), [
          single("legacy", "You need to recover rules from existing code, tests and documentation. Which technique fits best?", ["System archaeology", "Only brainstorming", "Ignoring existing artefacts"], 0, "System archaeology extracts knowledge from an existing system and its artefacts."),
          multi("ideas", "Which TWO techniques particularly support generating or exploring new solution ideas?", ["Brainstorming", "Analogies", "Transcribing an existing specification without review", "Treating a legacy bug as an approved requirement"], [0,1], "Both go beyond collecting existing statements."),
          single("confidential", "A team claims a survey is always best for a confidential project. What is the sound judgement?", ["Correct for every confidential project", "Technique choice must consider access, confidentiality and the information needed", "Confidential projects cannot perform RE"], 1, "No simple project label determines a universally best technique.")
        ]),
        S("Diagnose the conflict before choosing a remedy", H("4.3.1–4.3.2, pp. 112–116"),
          table(["Type", "Own example cause"], [["Subject-matter", "Different actual needs in different operating environments"],["Data", "Different demand forecasts or interpretations"],["Interest", "Different role-specific objectives"],["Value", "Different underlying beliefs about fairness"],["Relationship", "A proposal rejected because of distrust of its author"],["Structural", "Teams competing for a scarce shared resource"]]),
          "More than one type may be involved. A disagreement about a number might hide an interest conflict; investigate rather than diagnose from one word."),
        S("Resolve and record", H("4.3.1, 4.3.3"),
          flow("Identify the conflict", "Analyse causes, positions and affected requirements", "Agree and apply a resolution approach", "Document and communicate the result"),
          "Possible approaches include agreement, compromise, voting, an authorised decision (overrule) and variants. Agree the decision mechanism before applying it; record alternatives, assumptions, rationale and participants.",
          reveal("Is compromise the same as agreement on everyone's preferred solution?", "No. In a compromise, parties accept concessions even though it is not each party's preferred solution. Variants may satisfy different needs but add complexity.")),
        S("Decision aids make assumptions inspectable", H("4.3.3, pp. 119–120"),
          "CAF (Consider All Facts), PMI (Plus–Minus–Interesting) and weighted decision matrices can make alternatives easier to compare. They support discussion; they do not make the chosen criteria and weights objectively correct.",
          "Own example: one option wins only because delivery speed was weighted much higher than accessibility. Show this dependence and validate the priorities before presenting the score as decisive."),
        C("cp-conflict", "Reason about conflict resolution", H("4.3"), [
          single("data", "Two planners disagree because they use different demand forecasts. Which conflict should you investigate first?", ["Data conflict", "Necessarily a relationship conflict", "No possible conflict"], 0, "The stated difference is the evidence or its interpretation."),
          order("resolution", "Order the conflict-resolution activities.", ["Identify", "Analyse", "Resolve", "Document the resolution"], "A remedy should follow understanding, and its result needs to remain understandable later."),
          multi("rationale", "Which TWO items belong in the decision record?", ["Considered alternatives and assumptions", "Rationale and decision participants", "Only the winning person's name", "A claim that the decision can never be revisited"], [0,1], "The record explains why the resulting requirements look the way they do.")
        ]),
        S("Validation checks whether the requirements are right", H("2.2.6, 4.4.1"),
          "Validate coverage of stakeholder needs, agreement and plausible context assumptions. Also inspect the quality of individual requirements and the set as a whole.",
          "Involve suitable perspectives and enough independence for the risk. Separate finding defects from deciding fixes, and validate again when requirements or assumptions change."),
        S("Three families of validation techniques", H("4.4.2, pp. 123–128"),
          table(["Family", "Examples", "What it reveals"], [["Review (static)", "Walkthrough, inspection", "Defects found by reading and reasoning"],["Exploration (dynamic)", "Prototype, alpha/beta test, A/B test", "Feedback from experiencing behaviour"],["Sample development (static)", "Derive tests, a design or a model", "Gaps exposed while attempting to use the specification"]]),
          "In a walkthrough the author guides the examination. An inspection is more formal and uses prepared reviewers and defined roles. Sample development can expose an untestable requirement before executing the system."),
        S("Choose validation to match the risk", H("4.4.1–4.4.2"),
          "A quick prototype can expose a confusing workflow. A formal inspection with independent expertise better supports systematic examination of high-risk requirements. The methods complement one another.",
          reveal("Own case: everyone likes a prototype, but nobody can derive a test for 'reliable enough'. Is validation complete?", "No. Positive reactions do not resolve the unclear reliability criterion. Clarify conditions and evidence, then validate the changed requirement and its consequences.")),
        C("cp-validation", "Choose convincing evidence", H("4.4"), [
          single("sample", "Deriving a test reveals that a deadline is undefined, before software runs. Which family fits?", ["Sample development", "Beta testing", "A/B testing"], 0, "The specification is checked by trying to construct a downstream work product."),
          multi("validating", "Select TWO sound validation practices.", ["Include relevant independent perspectives when risk warrants it", "Revisit the complete set as well as individual requirements", "Validate only once at the very end", "Treat signatures as sufficient evidence of correctness"], [0,1], "Risk, different perspectives and repeated whole-set checks help find missed defects."),
          single("walkthrough", "Who typically guides a walkthrough of a requirements work product?", ["The author", "Only an anonymous customer", "A random algorithm"], 0, "The author guides a walkthrough; an inspection has a more formal role structure.")
        ]),
        S("Usability, UX and user-centred design", "HS26_ASE_UX und UCD.pdf, slides 7–13",
          "Usability concerns specified users achieving specified goals effectively, efficiently and satisfactorily in a specified context. UX includes broader perceptions and experiences of interacting with a product or service.",
          table(["Dimension", "Own observation"], [["Effectiveness", "Did users complete the intended bid correctly?"],["Efficiency", "What effort or time did success require?"],["Satisfaction", "How did users experience the interaction?"]]),
          "UCD involves users throughout iterative design, with a multidisciplinary team and evaluation-driven refinement. A visually attractive screen alone proves none of these outcomes."),
        S("Plan, understand, specify, design, evaluate — then iterate", "HS26_ASE_UX und UCD.pdf, slides 15, 18–29, 40–44",
          flow("Plan user involvement", "Understand context of use", "Specify user requirements", "Produce design solutions", "Evaluate against requirements"),
          "Evaluation can send you back to any earlier activity. Describe users, tasks, tools and environments. Personas summarise user groups; scenarios explore specific use situations; card sorting investigates people's grouping of information.",
          "Open card sorting lets participants create and name categories; closed card sorting supplies them. The choice depends on what you need to learn."),
        S("A prototype is a tool for a question", "HS26_ASE_UX und UCD.pdf, slides 32–42",
          "Choose breadth, depth, visual fidelity, interactivity, data and technical maturity according to the uncertainty to resolve. A low-fidelity prototype can be enough to explore navigation; it cannot prove backend performance.",
          "A usability test asks representative users to perform realistic tasks. Expert evaluation applies expertise and principles. Both can help, but they supply different evidence. Observe behaviour and keep interpretations explicit."),
        C("cp-ucd", "Apply the workshop to RE", "HS26_ASE_UX und UCD.pdf, slides 7–15, 29, 32–44", [
          single("efficient", "A user succeeds, but needs many unnecessary steps. Which usability dimension is most directly affected?", ["Efficiency", "Only visual fidelity", "The existence of stakeholders"], 0, "Efficiency relates resources or effort to achieved results."),
          multi("test", "Which TWO choices support a useful usability test?", ["Representative users completing realistic tasks", "Observing difficulties instead of only asking for praise", "Only asking developers whether their own design looks good", "Treating a paper prototype as proof of database throughput"], [0,1], "Realistic task performance can reveal problems that preference questions miss."),
          single("iteration", "Evaluation reveals the assumed user context was wrong. What should the team do?", ["Return to context analysis and revise the affected requirements and design", "Continue because evaluation must be the final phase", "Only polish the colours"], 0, "UCD is iterative and can revisit earlier activities.")
        ]),
        S("Own transfer: a late-bid dispute", `${H("4")}; ${W(4, "9–18")}`,
          "A seller wants last-second extensions; a buyer values predictable closing; support reports confusing status messages. A prototype shows users repeatedly submitting the same bid.",
          reveal("Describe a coherent next cycle of RE work.", "Confirm sources and goals, investigate the cause of repeated submissions, clarify time and acceptance semantics, analyse the conflicting needs, agree the closing rule, update text and models, then validate realistic normal and failure cases. Record the reasoning and remaining assumptions.")),
        S("Own transfer: one technique cannot settle everything", H("4.1–4.4"),
          "A survey reports high satisfaction, but an operator warns of lost events during outages. The team wants to close elicitation.",
          reveal("Why is that premature?", "The survey covers only certain participants and questions. The operator is a relevant source for a different concern. Investigate failures through interviews and existing evidence, specify the necessary behaviour and quality criteria, and validate them with appropriate methods.")),
        S("Week 4 self-check and the remaining exam scope", `${H("4")}; Introductory slides.pdf, slide 17`,
          check(["Distinguish sources from elicitation techniques.", "Explain Kano factors and their dependence on group and time.", "Choose complementary elicitation methods.", "Diagnose conflicts and justify a resolution approach.", "Choose validation evidence for the risk.", "Connect usability evaluation with requirements refinement."]),
          note("exam", "Before 28 October", "Study processes (chapter 5), requirements management (6) and tool support (7) as well. The four weekly modules cover the available course weeks, not the complete certificate. Use the exam guide linked in every ASE1 weekly quiz to plan the remaining work."))
      ] }
    ]
  });
})();
