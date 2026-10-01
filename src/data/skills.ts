export interface DetailedSkill {
  id: string;
  name: string;
  iconName: string;
  category: 'Core Java & DSA' | 'Frontend' | 'Backend & DB' | 'Languages' | 'Motion & Tools';
  proficiency: string; // e.g. 'Core Primary', 'Proficient', 'Daily Tool', 'Active Practice'
  description: string;
  tags: string[];
  projectsUsedIn: string[]; // references project titles
}

export const detailedSkillsData: DetailedSkill[] = [
  // CORE JAVA & DSA
  {
    id: "java",
    name: "Core Java",
    iconName: "Coffee",
    category: "Core Java & DSA",
    proficiency: "Core Primary",
    description: "Robust Object-Oriented Programming (OOP) architectures: Abstraction, Polymorphism, Inheritance, Encapsulation, Collections framework, Exception handling, and Multithreading principles.",
    tags: ["Core Java", "OOP Principles", "Collections Framework", "Exception Handling", "Multithreading"],
    projectsUsedIn: [
      "Java DSA Algorithm Visualizer & Engine", 
      "Academic Labs: Core Java & OOP Suites", 
      "System Architecture & Data Structures Suite"
    ]
  },
  {
    id: "dsa-java",
    name: "DSA in Java",
    iconName: "BrainCircuit",
    category: "Core Java & DSA",
    proficiency: "Active Practice",
    description: "Algorithmic problem-solving in Java: Arrays, Strings, Two Pointers, Binary Search, Linked Lists, Stacks, Queues, Recursion, Trees, and Time/Space complexity optimization.",
    tags: ["Data Structures", "Algorithms", "Binary Search", "Recursion", "Trees & Graphs", "Time Complexity"],
    projectsUsedIn: [
      "Java DSA Algorithm Visualizer & Engine", 
      "System Architecture & Data Structures Suite", 
      "Academic Labs: Core Java & OOP Suites"
    ]
  },

  // FRONTEND (From Resume)
  {
    id: "react",
    name: "React.js",
    iconName: "Code2",
    category: "Frontend",
    proficiency: "Core Primary",
    description: "Modern component architecture, hooks, reactive state workflows, React Router client-side routing, and high-performance component trees.",
    tags: ["React Hooks", "Component Design", "State Management", "SPA Architecture"],
    projectsUsedIn: ["Event Registration Portal", "SafeCity Analytics", "Code Hub", "Recipe Master"]
  },
  {
    id: "react-router",
    name: "React Router",
    iconName: "Compass",
    category: "Frontend",
    proficiency: "Proficient",
    description: "Declarative client-side routing, dynamic route parameters, nested routes, route guards, and navigation transitions for single-page applications.",
    tags: ["Dynamic Routing", "Nested Routes", "Route Guards", "Navigation"],
    projectsUsedIn: ["College Club Web App", "SafeCity Analytics", "Code Hub"]
  },
  {
    id: "javascript",
    name: "JavaScript (ES6+)",
    iconName: "Terminal",
    category: "Frontend",
    proficiency: "Core Primary",
    description: "Asynchronous JavaScript (Promises, async/await), closures, ES6 modules, event delegation, DOM tree orchestration, and Fetch API.",
    tags: ["ES6+", "Async/Await", "Promises", "DOM Manipulation", "Event Loop"],
    projectsUsedIn: ["Club Registration Tools", "SafeCity Analytics", "Code Hub"]
  },
  {
    id: "typescript",
    name: "TypeScript",
    iconName: "FileCode",
    category: "Frontend",
    proficiency: "Proficient",
    description: "Strict static typing, generic interfaces, union types, typed event handlers, and scalable enterprise component props.",
    tags: ["Static Typing", "Interfaces", "Generics", "Type Safety"],
    projectsUsedIn: ["Personal Portfolio", "Modern Web Prototypes"]
  },
  {
    id: "threejs",
    name: "Three.js",
    iconName: "Layers",
    category: "Frontend",
    proficiency: "Proficient",
    description: "3D graphics rendering in the browser, WebGL scene graphs, geometry meshes, lighting models, cameras, and interactive hackathon 3D prototypes.",
    tags: ["WebGL", "3D Scene Graphs", "Meshes & Materials", "Hackathon 3D Prototyping"],
    projectsUsedIn: ["Hackathon 3D Prototypes", "Resumix 3D Showcase"]
  },
  {
    id: "html5-css3",
    name: "HTML5 & CSS3",
    iconName: "Layout",
    category: "Frontend",
    proficiency: "Core Primary",
    description: "Semantic accessible HTML structures, CSS Grid, Flexbox, custom responsive layouts, keyframe animations, and cross-browser UI.",
    tags: ["HTML5", "CSS3", "CSS Grid", "Flexbox", "Responsive Design"],
    projectsUsedIn: ["All Web Projects", "Recipe Master", "Parking Rental"]
  },

  // BACKEND & DATABASE (From Resume)
  {
    id: "nodejs",
    name: "Node.js",
    iconName: "Cpu",
    category: "Backend & DB",
    proficiency: "Core Primary",
    description: "Server-side asynchronous JavaScript runtime, event-driven I/O, file system operations, and RESTful API backend microservices.",
    tags: ["Runtime", "Event-Driven", "REST APIs", "Event Loop"],
    projectsUsedIn: ["Club Registration Tools", "Event Backend Services"]
  },
  {
    id: "express",
    name: "Express.js",
    iconName: "Terminal",
    category: "Backend & DB",
    proficiency: "Core Primary",
    description: "Routing architecture, middleware pipeline, request parsing, authentication filters, error handlers, and REST API controller layers.",
    tags: ["RESTful Routing", "Middlewares", "API Controllers", "CORS & Validation"],
    projectsUsedIn: ["Club Registration Tools", "Tech Event Tooling"]
  },
  {
    id: "mongodb",
    name: "MongoDB",
    iconName: "Database",
    category: "Backend & DB",
    proficiency: "Core Primary",
    description: "NoSQL document database design, BSON schema modeling, aggregation pipelines, CRUD operations, indexing, and Mongoose integration.",
    tags: ["NoSQL", "Document Database", "CRUD", "Mongoose", "Aggregation"],
    projectsUsedIn: ["Club Registration Tools", "Event User Data Store"]
  },
  {
    id: "mysql",
    name: "MySQL",
    iconName: "Database",
    category: "Backend & DB",
    proficiency: "Proficient",
    description: "Relational database management, table schema normalization, primary/foreign keys, joins, transaction queries, and data integrity.",
    tags: ["Relational DB", "SQL Queries", "Table Joins", "Schema Design", "Normalization"],
    projectsUsedIn: ["Student Record Systems", "Academic Database Labs"]
  },
  {
    id: "jwt",
    name: "JWT (JSON Web Token)",
    iconName: "Zap",
    category: "Backend & DB",
    proficiency: "Core Primary",
    description: "Stateless token-based authentication, secret signature verification, payload claims, role-based authorization headers, and secure session management.",
    tags: ["Authentication", "Authorization", "Bearer Tokens", "Security"],
    projectsUsedIn: ["Club Registration Tools", "User Auth Microservices"]
  },
  {
    id: "firebase",
    name: "Firebase",
    iconName: "Flame",
    category: "Backend & DB",
    proficiency: "Proficient",
    description: "Cloud Firestore real-time data persistence, Firebase Authentication (Google/Email), Cloud Storage, and serverless web deployment.",
    tags: ["Firestore", "Firebase Auth", "Real-Time DB", "Cloud Storage"],
    projectsUsedIn: ["Hackathon Submissions", "Cloud Prototypes"]
  },

  // PROGRAMMING LANGUAGES (C, C++, Java)
  {
    id: "c-lang",
    name: "C Programming",
    iconName: "Binary",
    category: "Languages",
    proficiency: "Fundamental",
    description: "Pointers, manual memory allocation (malloc/free), arrays, structures, pointers to functions, file I/O, and low-level computer systems logic.",
    tags: ["Pointers", "Memory Management", "Structures", "Low-Level Logic"],
    projectsUsedIn: ["Systems Programming Labs", "Computer Architecture Labs"]
  },
  {
    id: "cpp-lang",
    name: "C++ Programming",
    iconName: "Binary",
    category: "Languages",
    proficiency: "Academic & Systems",
    description: "Object-oriented software design in C++, classes, operator overloading, Standard Template Library (STL vectors, maps, algorithms), and file streams.",
    tags: ["OOP", "STL Containers", "File Stream I/O", "Dynamic Memory"],
    projectsUsedIn: ["Student Attendance & Fees Management", "System Programming Labs"]
  },

  // MOTION & TOOLS (From Resume)
  {
    id: "gsap",
    name: "GSAP (GreenSock)",
    iconName: "Sparkles",
    category: "Motion & Tools",
    proficiency: "Core Motion",
    description: "High-performance timeline choreography, staggered element reveals, scroll-triggered animations, and smooth visual physics for web interfaces.",
    tags: ["GreenSock", "Timeline Choreography", "Staggers", "Scroll Animation"],
    projectsUsedIn: ["Interactive Prototypes", "Portfolio Motion", "Three.js Demos"]
  },
  {
    id: "cursor-genai",
    name: "Cursor (GenAI)",
    iconName: "BrainCircuit",
    category: "Motion & Tools",
    proficiency: "Daily Power-User",
    description: "AI-native code generation, multi-file code refactoring, intelligent context prompting, rapid prototyping, and high-velocity engineering workflows.",
    tags: ["GenAI", "Cursor IDE", "AI Code Generation", "Prompt Engineering"],
    projectsUsedIn: ["All Recent Development Workflows", "Hackathon Sprints"]
  },
  {
    id: "content-mgmt",
    name: "Educational Content & YouTube",
    iconName: "Terminal",
    category: "Motion & Tools",
    proficiency: "Passionate Creator",
    description: "Creating educational YouTube tutorials that educate people on modern business concepts, startup mental models, and software execution to inspire future builders.",
    tags: ["YouTube Content", "Business Education", "Startup Concepts", "Entrepreneurial Drive"],
    projectsUsedIn: ["YouTube Business Tutorials Channel", "Online Community Projects"]
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    iconName: "Palette",
    category: "Frontend",
    proficiency: "Core Primary",
    description: "Utility-first CSS architecture, responsive layout design, custom theme extensions, arbitrary values, and lightning-fast developer styling velocity.",
    tags: ["Tailwind CSS", "Utility-First", "Responsive Layouts", "Flexbox & Grid"],
    projectsUsedIn: ["Personal Portfolio", "All Production Web Apps", "Hackathon Sprints"]
  },
  {
    id: "git",
    name: "Git & GitHub",
    iconName: "GitBranch",
    category: "Motion & Tools",
    proficiency: "Core Primary",
    description: "Distributed version control, atomic commits, feature branch lifecycles, pull request workflows, merge conflict resolution, and open source collaboration.",
    tags: ["Git", "GitHub", "Version Control", "Collaboration", "CI/CD"],
    projectsUsedIn: ["All Software Projects", "Open Source Repositories"]
  },
  {
    id: "restapi",
    name: "RESTful APIs",
    iconName: "Server",
    category: "Backend & DB",
    proficiency: "Core Primary",
    description: "Architecting stateless REST HTTP APIs with status codes, payload serialization, query param filtering, error handling middlewares, and rate limiting.",
    tags: ["REST APIs", "HTTP Methods", "Controllers", "API Design"],
    projectsUsedIn: ["Club Registration Tools", "Event Backend Services"]
  },
  {
    id: "postman",
    name: "Postman API Suite",
    iconName: "Cpu",
    category: "Motion & Tools",
    proficiency: "Daily Tool",
    description: "API endpoint testing, test collection assertions, environment variables, authentication header simulation, and REST contract verification.",
    tags: ["Postman", "API Testing", "Automated Assertions", "Endpoints"],
    projectsUsedIn: ["Backend API Verification", "Integration Tests"]
  }
];

export interface MarqueeSkill {
  name: string;
  iconType: 'react' | 'java' | 'node' | 'express' | 'mongodb' | 'mysql' | 'jwt' | 'three' | 'gsap' | 'typescript' | 'javascript' | 'firebase' | 'cpp' | 'cursor' | 'htmlcss' | 'tailwind' | 'git' | 'postman' | 'restapi' | 'youtube';
  color: string;
  bgBadge: string;
}

export const marqueeTech: string[] = [
  "Core Java",
  "DSA in Java",
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "TypeScript",
  "JavaScript ES6+",
  "Tailwind CSS",
  "Three.js 3D",
  "JWT Auth",
  "Git & GitHub",
  "RESTful APIs",
  "Firebase",
  "Postman",
  "C/C++ Systems",
  "GSAP Animations",
  "Cursor (GenAI)",
  "YouTube Creator"
];

export const marqueeTrack1: MarqueeSkill[] = [
  { name: "Core Java", iconType: "java", color: "#f97316", bgBadge: "rgba(249, 115, 22, 0.16)" },
  { name: "DSA in Java", iconType: "java", color: "#fb923c", bgBadge: "rgba(251, 146, 60, 0.16)" },
  { name: "React.js", iconType: "react", color: "#38bdf8", bgBadge: "rgba(56, 189, 248, 0.16)" },
  { name: "React Router", iconType: "react", color: "#f43f5e", bgBadge: "rgba(244, 63, 94, 0.16)" },
  { name: "Node.js", iconType: "node", color: "#4ade80", bgBadge: "rgba(74, 222, 128, 0.16)" },
  { name: "Express.js", iconType: "express", color: "#ffffff", bgBadge: "rgba(255, 255, 255, 0.12)" },
  { name: "MongoDB", iconType: "mongodb", color: "#34d399", bgBadge: "rgba(52, 211, 153, 0.16)" },
  { name: "MySQL", iconType: "mysql", color: "#38bdf8", bgBadge: "rgba(56, 189, 248, 0.16)" },
  { name: "TypeScript", iconType: "typescript", color: "#60a5fa", bgBadge: "rgba(96, 165, 250, 0.16)" },
  { name: "Tailwind CSS", iconType: "tailwind", color: "#22d3ee", bgBadge: "rgba(34, 211, 238, 0.16)" },
  { name: "Git & GitHub", iconType: "git", color: "#f43f5e", bgBadge: "rgba(244, 63, 94, 0.16)" },
  { name: "HTML5 & CSS3", iconType: "htmlcss", color: "#f87171", bgBadge: "rgba(248, 113, 113, 0.16)" }
];

export const marqueeTrack2: MarqueeSkill[] = [
  { name: "JavaScript ES6+", iconType: "javascript", color: "#facc15", bgBadge: "rgba(250, 204, 21, 0.16)" },
  { name: "RESTful APIs", iconType: "restapi", color: "#2dd4bf", bgBadge: "rgba(45, 212, 191, 0.16)" },
  { name: "Three.js 3D", iconType: "three", color: "#e2e8f0", bgBadge: "rgba(226, 232, 240, 0.14)" },
  { name: "JWT Auth & Security", iconType: "jwt", color: "#ec4899", bgBadge: "rgba(236, 72, 153, 0.16)" },
  { name: "Firebase Firestore", iconType: "firebase", color: "#fbbf24", bgBadge: "rgba(251, 191, 36, 0.16)" },
  { name: "Postman API Suite", iconType: "postman", color: "#ff6c37", bgBadge: "rgba(255, 108, 55, 0.16)" },
  { name: "C Programming", iconType: "cpp", color: "#818cf8", bgBadge: "rgba(129, 140, 248, 0.16)" },
  { name: "C++ Systems", iconType: "cpp", color: "#6366f1", bgBadge: "rgba(99, 102, 241, 0.16)" },
  { name: "GSAP Animations", iconType: "gsap", color: "#a3e635", bgBadge: "rgba(163, 230, 53, 0.16)" },
  { name: "Cursor (GenAI)", iconType: "cursor", color: "#c084fc", bgBadge: "rgba(192, 132, 252, 0.16)" },
  { name: "OOP Architecture", iconType: "java", color: "#f59e0b", bgBadge: "rgba(245, 158, 11, 0.16)" },
  { name: "YouTube & Tech Creator", iconType: "youtube", color: "#ef4444", bgBadge: "rgba(239, 68, 68, 0.16)" }
];

export const marqueeSkillsDetailed: MarqueeSkill[] = [
  ...marqueeTrack1,
  ...marqueeTrack2
];

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: string;
    note?: string;
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Core Java & DSA",
    skills: [
      { name: "Core Java", level: "Primary", note: "OOP principles, collections, multithreading, exception handling" },
      { name: "DSA in Java", level: "Active Practice", note: "Arrays, binary search, trees, recursion, complexity optimization" },
    ],
  },
  {
    title: "Frontend Engineering",
    skills: [
      { name: "React.js", level: "Primary", note: "Hooks, state machines, component architecture" },
      { name: "React Router", level: "Primary", note: "Declarative SPA routing, guards, params" },
      { name: "Three.js", level: "Proficient", note: "3D WebGL scenes, interactive mesh models" },
      { name: "JavaScript (ES6+)", level: "Primary", note: "Async/await, closures, modern DOM APIs" },
      { name: "TypeScript", level: "Proficient", note: "Strict type safety, generics, interfaces" },
      { name: "HTML5 & CSS3", level: "Primary", note: "Responsive design, CSS Grid, Flexbox" },
    ],
  },
  {
    title: "Backend & Databases",
    skills: [
      { name: "Node.js", level: "Primary", note: "Asynchronous runtime, server-side APIs" },
      { name: "Express.js", level: "Primary", note: "RESTful routing, middleware pipeline" },
      { name: "MongoDB", level: "Primary", note: "Document store, Mongoose schemas, queries" },
      { name: "MySQL", level: "Proficient", note: "Relational queries, table normalization, joins" },
      { name: "JWT", level: "Primary", note: "Stateless authentication & token security" },
      { name: "Firebase", level: "Proficient", note: "Firestore DB, auth, cloud deployment" },
    ],
  },
  {
    title: "Languages, Motion & Tools",
    skills: [
      { name: "C Programming", level: "Fundamental", note: "Pointers, memory allocation, structures" },
      { name: "C++ Programming", level: "Academic", note: "OOP logic, STL containers, file I/O" },
      { name: "GSAP", level: "Motion", note: "GreenSock timeline animations, smooth staggers" },
      { name: "Cursor (GenAI)", level: "Daily Tool", note: "AI-assisted rapid software engineering" },
      { name: "Content Management", level: "Creator", note: "YouTube business tutorials, technical communication" },
    ],
  },
];
