module.exports = {
  "sws1-w2-secure-development-lifecycle": [
    {
      id: "sdl-core", type: "single", topic: "Core idea of an SDL", points: 6,
      prompt: "Which statement best describes a Secure Development Lifecycle (SDL)?",
      options: [
        "A separate development process that replaces agile and iterative processes.",
        "A set of security activities applied during the appropriate phases of an existing development process.",
        "A penetration test performed immediately before release.",
        "An approach in which security problems are fixed only after deployment."
      ], correct: 1,
      optionExplanations: [
        "An SDL does not replace the underlying process. Its security activities can be applied to waterfall, iterative, and agile processes.",
        "This is the central idea: security is considered throughout development by applying appropriate security activities.",
        "Penetration testing is only one of several activities and cannot cover the lifecycle by itself.",
        "This would be a reactive penetrate-and-patch approach, which the lecture argues against."
      ],
      solution: "An SDL is not a new software development process. It adds security activities to the requirements, architecture and design, implementation, testing, and operations phases of an existing process.",
      reference: "Slides 4–7", concepts: ["SDL concept", "Process independence"]
    },
    {
      id: "process-application", type: "multi", topic: "Applying an SDL to different processes", points: 7,
      prompt: "Which statements about applying security activities are correct?",
      hint: "Select all correct statements.",
      options: [
        "In a waterfall process, each associated security activity is typically performed once.",
        "In iterative or agile processes, security activities are repeated to the degree appropriate for each iteration.",
        "Threat modeling may only start after all source code has been completed.",
        "The activities are associated with development phases rather than with one specific overall process.",
        "A team must adopt the Microsoft SDL unchanged for its process to qualify as an SDL."
      ], correct: [0, 1, 3],
      optionExplanations: [
        "In a traditional waterfall process, a phase is usually performed once, so its security activity is typically performed once as well.",
        "Requirements, design, and code grow across iterations; the corresponding security activities grow with them.",
        "Threat modeling primarily belongs to requirements and architecture/design and should be performed early and repeatedly.",
        "This phase-oriented approach makes the activities applicable to waterfall, the Unified Process, and agile development.",
        "The lecture focuses on common activities and explicitly allows practices from different SDL approaches to be combined."
      ],
      solution: "Security activities are attached to phases of the chosen development process. If a phase is repeated, its corresponding security activity is repeated as well.",
      reference: "Slides 5–7", concepts: ["Process independence", "Iterative application"]
    },
    {
      id: "activity-order", type: "order", topic: "Security activities across the lifecycle", points: 8,
      prompt: "Arrange the activities according to their primary position in the development lifecycle. The horizontal Security Risk Analysis activity is not included.",
      items: ["Security Requirements", "Threat Modeling", "Security Design / Controls", "Secure Coding", "Code Review", "Penetration Testing", "Security Operations"],
      initial: [3, 0, 5, 2, 6, 1, 4], correct: [0, 1, 2, 3, 4, 5, 6],
      solution: "Security Requirements → Threat Modeling → Security Design / Controls → Secure Coding → Code Review → Penetration Testing → Security Operations. In practice, feedback loops exist; this sequence shows each activity's primary lifecycle position.",
      reference: "Slides 5–6 and 9–19", concepts: ["Security activities", "Lifecycle mapping"]
    },
    {
      id: "requirement-quality", type: "text", topic: "Security Requirements", points: 8,
      prompt: "Evaluate the requirement: ‘Implement Spring Security with RBAC in controller X.’ Why is it problematic as an early security requirement, and how would you formulate it more appropriately?",
      hint: "Separate the required security outcome from the later technical solution.",
      solution: "The statement already fixes the framework, mechanism, and implementation location. A security requirement should be specific and understandable, but preferably technology-agnostic. A better formulation is: ‘For every access to protected functionality and data, the authorization of the authenticated user must be checked.’ Whether Spring Security and RBAC are appropriate is decided later during Security Design / Controls.",
      reference: "Slides 9–10 and 12–14", concepts: ["Security Requirements", "Security Design / Controls"]
    },
    {
      id: "threat-modeling", type: "order", topic: "Threat Modeling", points: 9,
      prompt: "Put the simplified threat-modeling procedure in the correct order.",
      items: [
        "View the system from the perspective of a realistic attacker",
        "Identify possible threats and attack goals",
        "Examine the current design and existing controls for vulnerabilities",
        "Derive additional security requirements to mitigate the vulnerabilities"
      ],
      initial: [2, 0, 3, 1], correct: [0, 1, 2, 3],
      solution: "First adopt the attacker's point of view, then identify threats. Next, search the current design for vulnerabilities and feed identified gaps back into the Security Requirements activity so that suitable countermeasures are required.",
      reference: "Slide 11", concepts: ["Threat Modeling", "Attacker perspective", "Design flaws"]
    },
    {
      id: "bug-or-flaw", type: "single", topic: "Security bug vs. security design flaw", points: 8,
      prompt: "An application checks authorization only when displaying the menu, but not for direct API requests. Which activity should primarily have prevented or detected this conceptual error early?",
      options: ["Threat Modeling", "Compiler warnings", "Security Operations", "Only a code-style linter"], correct: 0,
      optionExplanations: [
        "Threat modeling evaluates whether requirements and controls are sufficient against realistic attacks and therefore targets security design flaws.",
        "Compiler warnings help with implementation problems but do not reliably detect a missing authorization strategy.",
        "Security Operations may monitor attacks in production, but that is too late to primarily prevent the design flaw.",
        "A style linter checks formatting and simple patterns, not the completeness of the security design."
      ],
      solution: "Missing consistent authorization is a security design flaw. Threat modeling should expose direct API access as a threat and lead to an appropriate requirement and security control.",
      reference: "Slides 10–12 and 16", concepts: ["Threat Modeling", "Design flaws", "Authorization"]
    },
    {
      id: "coding-review", type: "multi", topic: "Secure Coding and Code Review", points: 8,
      prompt: "Which statements correctly distinguish Secure Coding from Code Review?",
      options: [
        "Secure Coding implements the specified controls correctly and tries to avoid introducing new security bugs.",
        "Code Review searches for security bugs introduced during implementation.",
        "By reading code alone, Code Review can discover practically all security design flaws.",
        "Automated code analysis is common; manual review is especially reasonable for highly security-critical sections.",
        "Compiler warnings about insecure or deprecated functions should be ignored if tests pass."
      ], correct: [0, 1, 3],
      optionExplanations: [
        "Secure Coding covers both the correct implementation of security controls and the avoidance of general security bugs.",
        "This is the primary goal of Code Review in the lecture.",
        "Many design flaws are virtually impossible to identify from code alone and should be addressed by Threat Modeling.",
        "Automation scales, while focused manual review complements it where the security risk is particularly high.",
        "Such warnings often indicate real security risks and should be taken seriously."
      ],
      solution: "Secure Coding is preventive work during implementation; Code Review is the subsequent search for implementation errors. Security design flaws mainly require early analysis activities.",
      reference: "Slides 15–16", concepts: ["Secure Coding", "Code Review", "Security bugs"]
    },
    {
      id: "penetration-testing", type: "single", topic: "Penetration Testing", points: 8,
      prompt: "Which combination describes the two purposes of penetration testing in an SDL?",
      options: [
        "Writing requirements and selecting the programming language",
        "Verifying that security requirements are fulfilled in the running system and checking that no security bugs were introduced",
        "Only configuring network devices and archiving logs",
        "Completely reconstructing the design from source code and eliminating every risk"
      ], correct: 1,
      optionExplanations: [
        "These are planning decisions, not the two purposes of Penetration Testing.",
        "The test examines the complete running system in reality and checks both implemented requirements and possible bugs.",
        "Configuration and monitoring belong mainly to Security Operations; Penetration Testing actively takes the attacker's view.",
        "Penetration Testing provides valuable evidence but cannot guarantee completeness or eliminate every risk."
      ],
      solution: "Penetration Testing takes the attacker's view of the running system. It validates the practical fulfillment of security requirements and checks for security bugs.",
      reference: "Slide 17", concepts: ["Penetration Testing", "System validation"]
    },
    {
      id: "operations-risk", type: "multi", topic: "Security Operations and Security Risk Analysis", points: 8,
      prompt: "Which statements are correct according to the lecture?",
      options: [
        "Security Operations includes secure configuration, updates, and monitoring during operation.",
        "Monitoring remains important because preventive security measures may fail.",
        "Security Risk Analysis rates the criticality of detected problems and supports prioritization decisions.",
        "Every low-risk vulnerability must immediately be fixed with maximum effort.",
        "Security Risk Analysis exclusively finds new bugs in source code."
      ], correct: [0, 1, 2],
      optionExplanations: [
        "These ongoing tasks are part of operating a system securely.",
        "Without monitoring, detecting that a system has been compromised is very difficult.",
        "Risk Analysis is horizontal and assesses findings from activities such as Threat Modeling or Penetration Testing.",
        "For a low-risk issue, a conscious decision may be made to do nothing; the decision should be risk-based.",
        "Finding source-code bugs is primarily a Code Review task; Risk Analysis evaluates problems that have already been detected."
      ],
      solution: "Security Operations protects and monitors the production system. Security Risk Analysis complements all phases by rating detected vulnerabilities and supporting decisions about countermeasures.",
      reference: "Slides 18–19", concepts: ["Security Operations", "Security Risk Analysis"]
    },
    {
      id: "incremental-adoption", type: "text", topic: "Incremental adoption of an SDL", points: 9,
      prompt: "A small team cannot introduce all security activities at once. Justify a reasonable incremental adoption strategy and explain why the long-term goal should still include all activities.",
      solution: "One possible sequence is to start with automated Code Reviews because they can find many implementation errors, then add Threat Modeling to cover design flaws, and use Penetration Testing for feedback about the real security of the complete system. Other starting points are possible. Every added activity improves security, but no single activity covers everything. In the long term, all are needed because they address different phases, error classes, and feedback needs.",
      reference: "Slide 21", concepts: ["Incremental adoption", "Complementary activities"]
    },
    {
      id: "shift-left", type: "single", topic: "Fixing Earlier is Better", points: 9,
      prompt: "Shortly before release, a penetration test reveals that the entire access-control design is unsuitable. Which conclusion best matches the lecture?",
      options: [
        "Late testing is sufficient because every design flaw can be patched locally.",
        "Early activities could have prevented the fundamental flaw; discovering it late will probably require expensive redesign.",
        "The problem proves that Threat Modeling is useful only after release.",
        "The finding should be ignored until an actual attack has been documented."
      ], correct: 1,
      optionExplanations: [
        "Fundamental design problems often affect many components and cannot be reliably solved with local patches.",
        "Security Requirements, Threat Modeling, and Security Design / Controls can prevent such flaws early and avoid expensive rework.",
        "Threat Modeling should be used early and repeated as the design grows.",
        "A demonstrated fundamental design flaw is security-relevant even if no successful attack is yet known."
      ],
      solution: "Early activities are preventive. If a fundamental design flaw is found only during a late penetration test, the result is often expensive redesign, quick fixes, and a return to the penetrate-and-patch cycle.",
      reference: "Slides 22–23", concepts: ["Early defect prevention", "Penetrate and patch"]
    },
    {
      id: "classify-security-activities", type: "categorize", topic: "Classifying Security Activities", points: 12,
      prompt: "Assign each practical action to the security activity it primarily belongs to. Each correct assignment is worth 1 point.",
      hint: "The same security activity may be used more than once.",
      options: [
        "Security Requirements",
        "Threat Modeling",
        "Security Design/Controls",
        "Secure Coding",
        "Code Review",
        "Penetration Testing",
        "Security Operations",
        "Security Risk Analysis"
      ],
      statements: [
        "Identify potential attackers or attack groups (e.g., script kiddies, organized cyber criminals, nation states) that may be interested in attacking the system.",
        "Once the system is operational, use a password-cracking tool every four weeks to check whether users are using weak passwords.",
        "Before pushing code to the Git repository, use a source-code analyzer integrated into the IDE to analyze the code for security bugs.",
        "Use a checklist with guidelines to prevent typical security-relevant programming mistakes in iOS apps.",
        "Decide whether to use login codes sent by SMS or Google Authenticator as the second authentication factor.",
        "Hire a company to find security defects in an e-shop web application by interacting with the running system.",
        "Configure the compiler so that safeguards against exploiting buffer-overflow vulnerabilities are enabled.",
        "Analyze the security architecture of a military communication system to identify security design flaws.",
        "Based on a list of identified security design flaws, determine additional security properties that should be considered.",
        "Employ a security-monitoring system to detect suspicious communication patterns, such as scanning traffic, between the control systems of a power plant.",
        "Use a methodology to rate the criticality of vulnerabilities detected during a penetration test.",
        "Depending on a specified security requirement, choose an appropriate access-control mechanism."
      ],
      correct: [1, 6, 4, 3, 2, 5, 2, 1, 0, 6, 7, 2],
      explanations: [
        "Threat Modeling considers realistic attackers, their capabilities, and the attacks they may attempt.",
        "This is a recurring activity performed while the system is operational, so it belongs to Security Operations.",
        "Automated static source-code analysis searches implementation code for security bugs and is a form of Code Review.",
        "A secure-coding checklist helps developers avoid introducing security bugs while writing code.",
        "Selecting the concrete mechanism that fulfills an authentication requirement is a Security Design/Controls decision.",
        "Interacting with and attacking the running application to find vulnerabilities is Penetration Testing.",
        "The lecture treats compiler and operating-system safeguards against buffer overflows as concrete Security Design/Controls measures.",
        "Searching an architecture for conceptual security weaknesses is the central purpose of Threat Modeling.",
        "Identified design flaws feed back into Security Requirements so that additional required security properties are specified.",
        "Monitoring a deployed system for suspicious activity is part of Security Operations.",
        "Rating the criticality of vulnerabilities is the purpose of Security Risk Analysis.",
        "Choosing the concrete access-control mechanism that implements a requirement belongs to Security Design/Controls."
      ],
      solution: "The key distinction is between defining required security properties, analyzing threats and design flaws, selecting concrete controls, preventing implementation mistakes, reviewing source code, attacking the running system, protecting and monitoring operations, and rating risk.",
      reference: "Slides 9–23", concepts: ["Security activity classification", "Security activities", "Lifecycle mapping"]
    },
    {
      id: "boss", type: "text", topic: "Boss Question – Applying an SDL", points: 12,
      prompt: "A team is iteratively developing a webshop with customer and administration areas. Outline a sensible security plan for the next iteration: name at least five security activities, explain their concrete contribution, and include at least one feedback loop between activities.",
      hint: "Consider requirements, the attacker view, controls, implementation, review, testing, operations, and risk.",
      solution: "Example: Security Requirements demand authorization on every access and strong administrator authentication. Threat Modeling considers direct API requests, session hijacking, and attacks against administration functions; identified gaps create additional requirements. Security Design / Controls selects framework-based RBAC, MFA, and possibly a separate administration application. Secure Coding implements these controls correctly and avoids new bugs. Code Review searches for implementation errors. Penetration Testing attacks the running iteration and validates the requirements. Security Risk Analysis prioritizes findings; Security Operations plans secure configuration, updates, and monitoring. The activities are repeated when new functionality is added in later iterations.",
      reference: "Slides 5–23", concepts: ["Applying an SDL", "Complementary activities", "Iterative application"]
    }
  ],
  "sws1-w3-software-security-errors": [
    {
      id: "taxonomy", type: "single", topic: "Taxonomy", points: 6,
      prompt: "Why does the lecture use the 7 (+1) Kingdoms of Software Security Errors?",
      options: [
        "Because only eight concrete vulnerabilities exist.",
        "Because many concrete errors are based on a few fundamental problem classes, and the taxonomy is broadly applicable.",
        "Because the taxonomy covers web applications only.",
        "Because it automatically fixes every software error with a tool."
      ], correct: 1,
      optionExplanations: [
        "There is a broad spectrum of concrete errors; the kingdoms group their fundamental causes.",
        "The taxonomy provides a general classification with a reasonable number of major error classes and is not limited to one application domain.",
        "Its general applicability is presented as an advantage over classifications focused on specific domains.",
        "A taxonomy supports understanding and classification; it does not repair software automatically."
      ],
      solution: "The kingdoms reduce a wide spectrum of concrete software security errors to a manageable set of fundamental classes. This helps developers understand recurring causes and countermeasures systematically.",
      reference: "Slides 5–7", concepts: ["7 (+1) Kingdoms", "Taxonomy"]
    },
    {
      id: "kingdom-order", type: "order", topic: "The seven kingdoms", points: 7,
      prompt: "Arrange the seven numbered kingdoms in the order of importance given in the lecture. Environment is the additional +1 and is not part of this list.",
      items: ["Input Validation and Representation", "API Abuse", "Security Features", "Time and State", "Error Handling", "Code Quality", "Encapsulation"],
      initial: [4, 0, 6, 2, 1, 5, 3], correct: [0, 1, 2, 3, 4, 5, 6],
      solution: "1 Input Validation and Representation → 2 API Abuse → 3 Security Features → 4 Time and State → 5 Error Handling → 6 Code Quality → 7 Encapsulation. Environment is listed separately as the +1 kingdom.",
      reference: "Slide 7", concepts: ["7 (+1) Kingdoms", "Taxonomy"]
    },
    {
      id: "command-injection", type: "text", topic: "Input Validation and Representation", points: 8,
      prompt: "A server method constructs the shell command `ls ` + directory. Explain the attack using the input `/etc; cat /etc/passwd`, and name a basic countermeasure.",
      solution: "The shell interprets the semicolon as a command separator. Instead of only listing a directory, the server also executes `cat /etc/passwd` with the privileges of its process. The cause is unvalidated input placed directly into a command context. The lecture names proper input validation as the basic fix. In practice, shell-string concatenation should also be avoided by using a safe API with separate arguments or a direct directory-listing API.",
      reference: "Slides 3–4 and 8–9", concepts: ["Input Validation", "Command Injection", "Representation"]
    },
    {
      id: "input-examples", type: "multi", topic: "Input Validation and Representation", points: 8,
      prompt: "Which errors are presented as examples of this kingdom?",
      options: ["Buffer Overflow", "SQL Injection", "Cross-Site Scripting", "Path Traversal", "Deadlock", "Empty Catch Block"],
      correct: [0, 1, 2, 3],
      optionExplanations: [
        "Unchecked lengths can cause writes beyond an allocated buffer.",
        "Unvalidated input can alter the structure of an SQL statement.",
        "Incorrect handling of input and output can cause attacker-controlled JavaScript to execute in another user's browser.",
        "Manipulated path components such as `../` can escape the intended directory.",
        "Deadlocks result from problematic interaction and locking and belong to Time and State.",
        "An empty catch block belongs to Error Handling."
      ],
      solution: "Buffer overflows, injection attacks, Cross-Site Scripting, and Path Traversal are examples involving missing or bypassable validation and problematic data representation.",
      reference: "Slides 8–9", concepts: ["Input Validation", "Injection", "Path Traversal"]
    },
    {
      id: "api-abuse", type: "single", topic: "API Abuse", points: 8,
      prompt: "A server authorizes clients based on a host name obtained through reverse DNS. What is the central software security error?",
      options: [
        "The developer wrote the API call with invalid syntax.",
        "The developer incorrectly assumes that the host name returned by reverse DNS securely proves the client's identity.",
        "Every DNS request inevitably causes a buffer overflow.",
        "The only problem is an overly broad exception handler."
      ], correct: 1,
      optionExplanations: [
        "The function may be called correctly at the programming level; the problem is the incorrect security assumption about its result.",
        "DNS responses are generally not suitable as strong authentication and may be spoofed by an attacker on the communication channel.",
        "A buffer overflow is neither required nor the stated cause in this scenario.",
        "Exception handling is not the core of this access-control mistake."
      ],
      solution: "API Abuse includes incorrect assumptions about offered functionality. Reverse DNS does not provide reliable proof of identity and is therefore an unsafe basis for access control.",
      reference: "Slides 10–11", concepts: ["API Abuse", "Wrong security assumptions", "DNS"]
    },
    {
      id: "security-features", type: "multi", topic: "Security Features", points: 8,
      prompt: "Which situations are examples of incorrect use of security features?",
      options: [
        "Using a predictable PRNG to generate cryptographic keys",
        "Failing to enforce access control on every protected access",
        "Leaving obsolete weak algorithms enabled in TLS for backward compatibility",
        "Correctly configuring an established cryptographic library according to current standards",
        "Keeping sensitive session state exclusively on the server"
      ], correct: [0, 1, 2],
      optionExplanations: [
        "Predictable random values can produce weak or guessable key material.",
        "Incomplete access control can expose privileged functionality or data.",
        "A protocol may support secure and insecure choices at the same time; weak configuration remains dangerous.",
        "This is the recommended direction, not an error example.",
        "Server-side session state prevents clients from directly manipulating important authorization data."
      ],
      solution: "Even established security features are secure only when correctly selected, configured, and consistently used. Developers should avoid inventing their own cryptographic mechanisms.",
      reference: "Slide 12", concepts: ["Security Features", "Cryptography", "Access Control"]
    },
    {
      id: "time-state", type: "single", topic: "Time and State", points: 8,
      prompt: "A program checks a file and opens it later. An attacker replaces the file between the check and the use. What is this problem called, and why does it occur?",
      options: [
        "A TOCTOU race condition; the check and use are separate, non-atomic steps with an exploitable time window.",
        "SQL Injection; the file name changes a database statement.",
        "A memory leak; the file is not released.",
        "Cross-Site Request Forgery; a browser sends a request."
      ], correct: 0,
      optionExplanations: [
        "Time of Check – Time of Use precisely describes the gap between validating and using a mutable resource.",
        "No database query is involved in this scenario.",
        "Resource cleanup is not the cause of the file substitution.",
        "CSRF concerns unwanted requests made through an authenticated web session, not this file-access race."
      ],
      solution: "In parallel or distributed execution, state can change between two program steps. A previous check must therefore not be assumed to remain valid when the resource is used later.",
      reference: "Slides 13–14", concepts: ["Time and State", "TOCTOU", "Race Condition"]
    },
    {
      id: "error-handling", type: "multi", topic: "Error Handling", points: 8,
      prompt: "Which statements about Error Handling are correct?",
      options: [
        "Detailed internal error messages shown to users can provide useful information to attackers.",
        "An empty catch block can hide failures and cause unexpected program behavior.",
        "An overly broad catch block may later handle newly introduced exceptions inappropriately.",
        "Exceptions always simplify control flow so much that explicit error handling is unnecessary.",
        "Errors should generally be ignored unless the process crashes immediately."
      ], correct: [0, 1, 2],
      optionExplanations: [
        "System state, failed queries, and internal details can assist subsequent attacks.",
        "Ignored exceptions hide causes and may damage availability or data consistency.",
        "Newly added code may throw different exceptions that receive insufficiently specific treatment in a general handler.",
        "Exceptions introduce a second control flow and are therefore difficult to handle correctly.",
        "Even an error that does not immediately crash the process may leave the system in an unsafe or inconsistent state."
      ],
      solution: "Secure Error Handling limits externally visible details, handles failures deliberately and specifically, and avoids empty or excessively broad handlers.",
      reference: "Slide 15", concepts: ["Error Handling", "Information leakage", "Exceptions"]
    },
    {
      id: "code-quality", type: "multi", topic: "Code Quality", points: 8,
      prompt: "Which statements about Code Quality are correct?",
      options: [
        "Memory that is never freed can be exhausted and cause availability problems.",
        "File handles or sockets that are not released can exhaust system resources.",
        "Deprecated APIs may be deprecated because of security defects and should be replaced.",
        "A null dereference is always harmless because modern operating systems repair it automatically.",
        "Compiler warnings are only style suggestions and can generally be ignored."
      ], correct: [0, 1, 2],
      optionExplanations: [
        "Memory leaks can consume the available memory and eventually terminate the program.",
        "Other system resources are limited as well; missing cleanup can prevent the system from functioning.",
        "Deprecation can indicate unsafe semantics or known defects, and a safer replacement is usually available.",
        "A null dereference often terminates the program and can therefore harm availability.",
        "Warnings frequently indicate real errors such as uninitialized values or insecure functions."
      ],
      solution: "Unreadable code and lack of care increase the likelihood of security-relevant errors. Resource leaks, deprecated code, null dereferences, and uninitialized variables are typical examples.",
      reference: "Slides 16–17", concepts: ["Code Quality", "Resource exhaustion", "Deprecated code"]
    },
    {
      id: "encapsulation-environment", type: "multi", topic: "Encapsulation and Environment", points: 9,
      prompt: "Which statements classify the examples correctly?",
      options: [
        "Trusting a hidden form field containing `role=admin` as session state violates Encapsulation.",
        "CSRF can trigger requests in another user's authenticated session and belongs to Encapsulation.",
        "A framework that generates session IDs with insufficient length or randomness is an Environment problem.",
        "A compiler optimization that removes an overwrite of sensitive memory is an Environment problem.",
        "Environment includes only physical hardware, not libraries, the JVM, or network services."
      ], correct: [0, 1, 2, 3],
      optionExplanations: [
        "Client-side hidden fields can be read and modified; authoritative session state must be protected on the server.",
        "CSRF violates the intended boundary between the user's intention and the authenticated session.",
        "The application depends on framework properties outside its own code.",
        "The compiler is part of the security-critical environment and may change intended protection operations.",
        "Environment includes compilers, operating systems, runtimes, frameworks, libraries, remote software, and network services."
      ],
      solution: "Encapsulation protects boundaries between users, programs, and data. Environment covers external components on which the security of the developer's own code still depends.",
      reference: "Slides 18–19", concepts: ["Encapsulation", "Environment", "Session state", "CSRF"]
    },
    {
      id: "timing-attack", type: "text", topic: "Timing side channel", points: 10,
      prompt: "A password check returns immediately when the first incorrect character is found. Explain how this creates a timing attack, identify the kingdom, and state the basic fix.",
      solution: "The longer the correct prefix of the submitted password, the more characters are checked and the longer execution takes. An attacker can use timing differences to recover the password from left to right instead of brute-forcing complete candidates. The lecture assigns this to Time and State. The basic fix is to check all characters regardless of the first mismatch, preferably by using an appropriate constant-time comparison function.",
      reference: "Slides 21–22", concepts: ["Time and State", "Timing attack", "Side channel"]
    },
    {
      id: "boss", type: "text", topic: "Boss Question – Classifying security errors", points: 12,
      prompt: "Analyze this small system: it takes a file path directly from a request, displays a complete stack trace when an error occurs, stores the user's role in a hidden form field, and reuses the same session ID after login. Assign each error to a kingdom and name one suitable countermeasure for each.",
      hint: "There are four problems across at least three different kingdoms.",
      solution: "Unvalidated file path: Input Validation and Representation; strictly validate and normalize allowed paths and restrict access to an intended root directory. Complete stack trace: Error Handling; log details internally and show only a neutral external error message. Role in a hidden field: Encapsulation; keep authoritative session state on the server and check authorization on every access. Same session ID across authentication: Time and State; regenerate the session ID after successful login to prevent session fixation. Strong answers may also note that libraries and framework configuration must be reviewed as part of Environment.",
      reference: "Slides 8–19", concepts: ["Error classification", "Input Validation", "Error Handling", "Encapsulation", "Time and State"]
    }
  ]
};
