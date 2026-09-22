window.QUIZ_CATALOG = {
  version: 1,
  subjects: [
    { id: "CNS1", name: "CNS1", description: "Computer Networks and Security", accent: "#0b77a5" },
    { id: "DHEAL", name: "Digital Health", description: "Healthcare data, systems and clinical AI", accent: "#237274" },
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
    }
  ]
};
