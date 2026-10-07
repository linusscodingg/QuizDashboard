window.QUIZ_CATALOG = {
  version: 1,
  subjects: [
    { id: "ASE1", name: "ASE1 · CPRE", description: "English Requirements Engineering exam preparation", accent: "#4b5bb5" },
    { id: "CNS1", name: "CNS1", description: "Computer Networks and Security", accent: "#0b77a5" },
    { id: "DHEAL", name: "Digital Health", description: "Healthcare data, systems and clinical AI", accent: "#237274" },
    { id: "SWS1", name: "SWS1", description: "Software and System Security 1", accent: "#9a4f24" },
    { id: "ITRECHT", name: "IT-Recht", description: "Rechtliche Grundlagen der Informatik", accent: "#6d4bc3" },
    { id: "RESE", name: "RESE", description: "Resilienz-Engineering", accent: "#28736b" },
    { id: "KRY", name: "Kryptologie", description: "Wahlfach Kryptologie: Serien mit PARI/GP und KryptoTrainer", accent: "#8a3b8f" }
  ],
  quizzes: [
    {
      "id": "ase1-w1-foundations-principles",
      "subject": "ASE1",
      "week": 1,
      "title": "RE Foundations and Principles",
      "source": "Activities - Week 01.pdf; CPRE FL Handbuch v1.2.0, chapters 1–2",
      "path": "quizzes/ASE1/W1_Foundations_Principles.html",
      "maximumScore": 100
    },
    {
      "id": "ase1-w2-context-interviews",
      "subject": "ASE1",
      "week": 2,
      "title": "Context, Scope and Interviews",
      "source": "Activities - Week 02.pdf; CPRE FL Handbuch v1.2.0, sections 2.2.4, 3.1 and 3.4.2",
      "path": "quizzes/ASE1/W2_Context_Interviews.html",
      "maximumScore": 100
    },
    {
      "id": "ase1-w3-documentation-models",
      "subject": "ASE1",
      "week": 3,
      "title": "Documentation and Model Literacy",
      "source": "Activities - Week 03.pdf; CPRE FL Handbuch v1.2.0, chapter 3; Activities week 3 Tasks.pdf",
      "path": "quizzes/ASE1/W3_Documentation_Models.html",
      "maximumScore": 100
    },
    {
      "id": "ase1-w4-elaboration-validation",
      "subject": "ASE1",
      "week": 4,
      "title": "Elicitation, Conflicts and Validation",
      "source": "Activities - Week 04.pdf; CPRE FL Handbuch v1.2.0, chapter 4; HS26_ASE_UX und UCD.pdf",
      "path": "quizzes/ASE1/W4_Elaboration_Validation.html",
      "maximumScore": 100
    },
    {
      id: "cns1-w4-routing-rip-eigrp",
      subject: "CNS1",
      week: 4,
      title: "Routing: RIP und EIGRP – Exercise Quiz",
      source: "CNS1-exr-04a-rip.pdf, CNS1-exr-04c-eigrp.pdf",
      path: "quizzes/CNS1/W4_Routing_RIP_EIGRP_Exercise.html",
      maximumScore: 100
    },
    {
      id: "cns1-w5-routing-ospf-isis",
      subject: "CNS1",
      week: 5,
      title: "Routing Part 2: OSPF, OSPFv3, IS-IS",
      source: "W5_CNS1-sld-05-routing-2.pdf",
      path: "quizzes/CNS1/W5_Routing_OSPF_ISIS.html",
      maximumScore: 100
    },
    {
      id: "cns1-w2-ipv6-part2",
      subject: "CNS1",
      week: 2,
      title: "IPv6 – Part 2",
      source: "W2_CNS1-sld-02-ipv6-2.pdf",
      path: "quizzes/CNS1/W2_IPv6_Part2.html",
      maximumScore: 100
    },
    {
      id: "cns1-w1-ipv6-exercise-01a",
      subject: "CNS1",
      week: 1,
      title: "IPv6 – Exercise 01a",
      source: "CNS1-exr-01a-ipv6 (2).pdf",
      path: "quizzes/CNS1/W1_IPv6_Exercise_01a.html",
      maximumScore: 100
    },
    {
      id: "dheal-w1-introduction",
      subject: "DHEAL",
      week: 1,
      title: "Introduction: Vom Patienten zur klinischen Wirkung",
      source: "Lecture 01 Introduction to Digital Health.pdf",
      path: "quizzes/DHEAL/W1_Introduction.html",
      maximumScore: 100
    },
    {
      id: "dheal-w2-healthcare-data",
      subject: "DHEAL",
      week: 2,
      title: "Healthcare Data: From Clinical Care to AI-Ready Data",
      source: "02.digital-health.healthcare-data_moodle.pdf",
      path: "quizzes/DHEAL/W2_Healthcare_Data.html",
      maximumScore: 100
    },
    {
      id: "dheal-w3-data-exploration",
      subject: "DHEAL",
      week: 3,
      title: "Data Processing: Scaling, Visualisation, Sampling",
      source: "03.digital-health.data-exploration_moodle.pdf",
      path: "quizzes/DHEAL/W3_Data_Exploration.html",
      maximumScore: 100
    },
    {
      id: "dheal-w4-regression",
      subject: "DHEAL",
      week: 4,
      title: "Regression: Predicting Continuous Outcomes",
      source: "04_digital-health_regression_moodle.pdf",
      path: "quizzes/DHEAL/W4_Regression.html",
      maximumScore: 100
    },
    {
      id: "sws1-w1-introduction-software-security",
      subject: "SWS1",
      week: 1,
      title: "Introduction to Software Security",
      source: "IntroSoftwareSecurity.pdf",
      path: "quizzes/SWS1/W1_Introduction_Software_Security.html",
      maximumScore: 100
    },
    {
      id: "sws1-w3-web-application-security-testing-1",
      subject: "SWS1",
      week: 3,
      title: "Web Application Security Testing 1: Injection",
      source: "WebAppSecurityTesting1.pdf",
      path: "quizzes/SWS1/W3_Web_Application_Security_Testing_1.html",
      maximumScore: 100
    },
    {
      id: "sws1-w4-web-application-security-testing-2",
      subject: "SWS1",
      week: 4,
      title: "Web Application Security Testing 2: Authentication, Sessions and XSS",
      source: "WebAppSecurityTesting2.pdf",
      path: "quizzes/SWS1/W4_Web_Application_Security_Testing_2.html",
      maximumScore: 100
    },
    {
      id: "sws1-w2-secure-development-lifecycle",
      subject: "SWS1",
      week: 2,
      title: "Secure Development Lifecycle",
      source: "W2_SecureDevelopmentLifecycle.pdf",
      path: "quizzes/SWS1/W2_Secure_Development_Lifecycle.html",
      maximumScore: 112
    },
    {
      id: "sws1-w3-software-security-errors",
      subject: "SWS1",
      week: 2,
      title: "Software Security Errors",
      source: "SoftwareSecurityErrors.pdf",
      path: "quizzes/SWS1/W3_Software_Security_Errors.html",
      maximumScore: 124
    },
    {
      id: "itrecht-w1-einfuehrung",
      subject: "ITRECHT",
      week: 1,
      title: "Einführung ins Informatikrecht – Open Book",
      source: "W1_Einfuerhung.pdf",
      path: "quizzes/ITRECHT/W1_Einfuehrung_Open_Book.html",
      maximumScore: 100
    },
    {
      id: "itrecht-w2-it-vertraege",
      subject: "ITRECHT",
      week: 2,
      title: "IT-Verträge und Projektfallen – Open Book",
      source: "W2_ITR-HS26-IT-Verträge, Mf.pdf",
      path: "quizzes/ITRECHT/W2_IT_Vertraege_Open_Book.html",
      maximumScore: 100
    },
    {
      id: "rese-w1-einfuehrung-begriffsgeschichte",
      subject: "RESE",
      week: 1,
      title: "Einführung und Begriffsgeschichte",
      source: "01 (01) RESE Introduction - Organisational Matters.pdf; 01 (02) RESE Resilience term history.pdf",
      path: "quizzes/RESE/W1_Einfuehrung_Begriffsgeschichte.html",
      maximumScore: 100
    },
    {
      id: "rese-w2-resilienzkurven-selbststudium",
      subject: "RESE",
      week: 2,
      title: "Resilienzkurven und Modelle · Selbststudium",
      source: "02 (01) RESE Road to Resilience.pdf; 02 (02) RESE Resilience curve and key components.pdf; 02 (01) RESE Road to Resilience_full.pdf (Plan, Folie 3)",
      path: "quizzes/RESE/W2_Resilienzkurven_Selbststudium.html",
      maximumScore: 100
    },
    {
      id: "rese-w3-safety-resilience",
      subject: "RESE",
      week: 3,
      title: "Von Safety-I zu Resilience Engineering",
      source: "02 (01) RESE Road to Resilience_full.pdf",
      path: "quizzes/RESE/W3_Safety_Resilience.html",
      maximumScore: 100
    },
    {
      id: "rese-w4-risiko-zuverlaessigkeit-robustheit",
      subject: "RESE",
      week: 4,
      title: "Vulnerabilität, Risiko, Zuverlässigkeit und Robustheit",
      source: "03 (01) RESE Resilience and the___ of Vulnerability Risk etc.pdf; 03 (02) RESE Group Exercise.pdf; Resilience Curve.pdf",
      path: "quizzes/RESE/W4_Risiko_Zuverlaessigkeit_Robustheit.html",
      maximumScore: 100
    },
    {
      id: "kry-w4-serie4-chinesischer-restsatz",
      subject: "KRY",
      week: 4,
      title: "Serie 4: Chinesischer Restsatz",
      source: "Serie_04_KRY.pdf; W4_TippsSerie4.pdf; W2_ChinesischerRestsatz_Handout.pdf",
      path: "quizzes/KRY/W4_Serie4_Chinesischer_Restsatz.html",
      maximumScore: 100
    }
  ]
};
