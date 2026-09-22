window.QUIZ_CATALOG = {
  version: 1,
  subjects: [
    { id: "CNS1", name: "CNS1", description: "Computer Networks and Security", accent: "#0b77a5" },
    { id: "DHEAL", name: "Digital Health", description: "Healthcare data, systems and clinical AI", accent: "#237274" },
    { id: "SWS1", name: "SWS1", description: "Software and System Security 1", accent: "#9a4f24" },
    { id: "ITRECHT", name: "IT-Recht", description: "Rechtliche Grundlagen der Informatik", accent: "#6d4bc3" }
  ],
  quizzes: [
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
      id: "dheal-w2-healthcare-data",
      subject: "DHEAL",
      week: 2,
      title: "Healthcare Data: From Clinical Care to AI-Ready Data",
      source: "02.digital-health.healthcare-data_moodle.pdf",
      path: "quizzes/DHEAL/W2_Healthcare_Data.html",
      maximumScore: 100
    },
    {
      id: "sws1-w2-secure-development-lifecycle",
      subject: "SWS1",
      week: 2,
      title: "Secure Development Lifecycle",
      source: "W2_SecureDevelopmentLifecycle.pdf",
      path: "quizzes/SWS1/W2_Secure_Development_Lifecycle.html",
      maximumScore: 100
    },
    {
      id: "sws1-w3-software-security-errors",
      subject: "SWS1",
      week: 3,
      title: "Software Security Errors",
      source: "W3_SoftwareSecurityErrors.pdf",
      path: "quizzes/SWS1/W3_Software_Security_Errors.html",
      maximumScore: 100
    }
  ]
};
