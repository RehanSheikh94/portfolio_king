export interface JourneyItem {
  year: string;
  title: string;
  institutionOrContext: string;
  description: string;
  highlights: string[];
  type: 'education' | 'milestone' | 'growth';
}

export const journeyData: JourneyItem[] = [
  {
    year: "2024 - 2028",
    title: "B.Tech in Computer Technology",
    institutionOrContext: "Yeshwantrao Chavan College of Engineering (YCCE), Nagpur",
    description: "Pursuing Bachelor of Technology with intensive focus on Core Java & DSA, computer architecture, full-stack software development, and systems engineering.",
    highlights: [
      "Built Node.js/Express.js registration & verification systems for tech events & workshops",
      "Developed React-Three.js interactive prototypes for hackathon submissions",
      "Maintained strong academic standing across algorithms and systems programming"
    ],
    type: "education"
  },
  {
    year: "2024 - Present",
    title: "Full-Stack Development & Event Tooling Engineering",
    institutionOrContext: "Independent Development & Campus Event Systems",
    description: "Architected end-to-end full-stack web applications for student registrations, authentication workflows, and interactive 3D WebGL presentations.",
    highlights: [
      "Built production event registration portal using Node.js, Express.js, MongoDB & JWT",
      "Crafted 3D interactive hackathon submissions utilizing React.js, Three.js & GSAP",
      "Engineered systems programming project in C++ for Student Attendance & Fees Management"
    ],
    type: "milestone"
  },
  {
    year: "2025 - Present",
    title: "Core Java, DSA & GenAI Workflow Acceleration",
    institutionOrContext: "Competitive Problem Solving & Modern Tooling",
    description: "Mastering Core Java (OOP, multithreading, collections) and rigorous Data Structures & Algorithms, while leveraging Cursor (GenAI) for high-velocity software delivery.",
    highlights: [
      "Rigorous practice of data structures: arrays, binary search, trees, recursion, and sorting",
      "Adopted Cursor GenAI for automated testing, rapid scaffolding, and context-aware coding",
      "Built relational and non-relational database schemas using MySQL and MongoDB"
    ],
    type: "growth"
  },
  {
    year: "2025 - Present",
    title: "YouTube Content Creation & Entrepreneurial Growth",
    institutionOrContext: "Independent Content Creator & Venturer",
    description: "Creating educational YouTube tutorials breaking down modern business concepts, startup fundamentals, and software execution. Driven by the philosophy to 'Think at Scale, Iterate Daily, and Execute Relentlessly.'",
    highlights: [
      "Produces educational YouTube tutorials breaking down business concepts, startup fundamentals, and software execution",
      "Educates people on practical business strategies and tech execution models",
      "Combines engineering depth with aspiring entrepreneurial vision and software craftsmanship"
    ],
    type: "milestone"
  }
];
