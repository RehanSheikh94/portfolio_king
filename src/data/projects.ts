export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'Full-Stack' | 'React' | 'Frontend' | 'Programming' | 'Hackathon';
  badge?: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  learning: string;
  github: string;
  liveDemoUrl?: string; // If undefined, UI shows "Live demo coming soon"
  previewType: 'analytics' | 'codehub' | 'recipe' | 'resume3d' | 'parking' | 'cpp' | 'hackathon';
  accentColor: string;
  status: 'Completed' | 'In Progress' | 'Hackathon Concept';
}

export const projectsData: Project[] = [
  {
    id: "club-event-registration",
    title: "Campus Tech Event Registration Portal",
    slug: "club-event-registration",
    category: "Full-Stack",
    badge: "Full-Stack Engineering",
    description: "Full-stack registration & attendee management system built for campus tech events and workshops using Node.js, Express.js, MongoDB, JWT authentication, and React.",
    problem: "Student tech events and campus workshops struggled with scattered Google Forms, duplicate student entries, and unverified participant check-ins during events.",
    solution: "Developed an integrated web registration portal with secure JWT authentication, automated ticket verification, real-time participant analytics, and admin dashboard.",
    features: [
      "Secure JWT token-based student authentication & role authorization",
      "Node.js & Express RESTful API backend with CORS & input validation",
      "MongoDB database modeling with Mongoose for participant records",
      "Instant event registration, confirmation status, and admin data export"
    ],
    technologies: ["Node.js", "Express.js", "MongoDB", "JWT", "React", "JavaScript", "HTML5 & CSS3"],
    learning: "Architected end-to-end full-stack REST APIs, stateless JWT token auth, database indexing in MongoDB, and production error-handling middlewares.",
    github: "https://github.com/RehanSheikh94/club-event-registration",
    liveDemoUrl: undefined,
    previewType: "codehub",
    accentColor: "#3b82f6",
    status: "Completed",
  },
  {
    id: "react-threejs-hackathon",
    title: "React & Three.js 3D Hackathon Prototype",
    slug: "react-threejs-hackathon",
    category: "Hackathon",
    badge: "Hackathon 3D Submission",
    description: "An interactive 3D web experience developed for hackathon submissions combining React.js and Three.js with GSAP fluid animations and WebGL geometry rendering.",
    problem: "Standard hackathon submissions often fail to stand out visually when explaining spatial concepts, product geometries, or immersive digital hardware.",
    solution: "Engineered an interactive 3D showcase using Three.js WebGL canvas embedded in a modern React interface, powered by GSAP timeline animations for dynamic camera transitions.",
    features: [
      "Interactive 3D WebGL scene with orbit controls, lighting, and custom textures",
      "GSAP smooth camera timeline choreographies on user interaction",
      "Modular React component structure wrapping Three.js canvas cycles",
      "Optimized 60fps rendering pipeline with dynamic mesh disposal"
    ],
    technologies: ["Three.js", "React", "GSAP", "JavaScript", "WebGL", "HTML5 & CSS3"],
    learning: "Deepened expertise in 3D WebGL rendering, vector coordinate math, GSAP timeline choreography, and lifecycle management of Three.js inside React.",
    github: "https://github.com/RehanSheikh94/react-threejs-hackathon",
    liveDemoUrl: undefined,
    previewType: "hackathon",
    accentColor: "#ec4899",
    status: "Completed",
  },
  {
    id: "java-dsa-engine",
    title: "Java DSA Algorithm Visualizer & Engine",
    slug: "java-dsa-engine",
    category: "Programming",
    badge: "Core Java & DSA Project",
    description: "Object-oriented Core Java suite implementing fundamental data structures and algorithmic routines with step-by-step complexity analysis.",
    problem: "Understanding algorithmic execution in complex data structures (trees, binary search, recursion) requires rigorous OOP modularity and clear test verification.",
    solution: "Constructed a comprehensive Java codebase featuring custom implementations of Linked Lists, Binary Trees, Search algorithms, and Stack/Queue routines using clean OOP principles.",
    features: [
      "Pure Core Java implementations of Trees, Linked Lists, Stacks, and Queues",
      "Binary Search and sorting algorithm comparative performance benches",
      "Adherence to OOP standards: Abstraction, Encapsulation, and Polymorphism",
      "Robust exception handling and automated test cases"
    ],
    technologies: ["Core Java", "Data Structures", "Algorithms", "OOP", "Collections"],
    learning: "Mastered Java memory management, object-oriented design patterns, recursion trees, and theoretical time/space asymptotic complexity.",
    github: "https://github.com/RehanSheikh94/java-dsa-engine",
    liveDemoUrl: undefined,
    previewType: "analytics",
    accentColor: "#f59e0b",
    status: "Completed",
  },
  {
    id: "academic-labs-oop",
    title: "Academic Labs: Core Java & OOP Suites",
    slug: "academic-labs-oop",
    category: "Programming",
    badge: "Academic Systems & OOP",
    description: "Curated collection of university computer science lab assignments covering OOP inheritance hierarchies, multithreading synchronization, custom exceptions, and Java Collections Framework.",
    problem: "Coursework lab routines require clean adherence to academic standards, strict encapsulation, custom checked/unchecked exceptions, and multithreaded producer-consumer locks.",
    solution: "Built a structured repository of Java academic lab programs including multithreaded simulations, custom collection wrappers, file I/O streams, and polymorphic abstract classes.",
    features: [
      "Comprehensive OOP pillars demonstration: Interfaces, Abstract Classes, and Overriding",
      "Multithreading thread-pools and synchronized critical sections",
      "Custom Exception hierarchies for input sanitization and error recovery",
      "Java Collections Framework benchmark tests (ArrayList vs LinkedList, HashMap vs TreeMap)"
    ],
    technologies: ["Core Java", "OOP Principles", "Multithreading", "Collections", "Exception Handling"],
    learning: "Reinforced deep understanding of Java JVM bytecode execution, thread lifecycles, synchronized blocks, and generic type systems.",
    github: "https://github.com/RehanSheikh94/academic-labs-java",
    liveDemoUrl: undefined,
    previewType: "cpp",
    accentColor: "#f97316",
    status: "Completed",
  },
  {
    id: "system-architecture-dsa",
    title: "System Architecture & Data Structures Suite",
    slug: "system-architecture-dsa",
    category: "Programming",
    badge: "Data Structures Practice",
    description: "Production-oriented data structures library engineered in Core Java with custom generic nodes, memory profiling, and asymptotic time-complexity benchmarks.",
    problem: "Real-world engineering problems demand tailored data structures beyond standard libraries to minimize GC overhead and guarantee O(1) or O(log N) worst-case performance.",
    solution: "Implemented custom memory-efficient data structures from scratch including Doubly Linked Lists, Min/Max Binary Heaps, AVL balanced search trees, and LRU Cache with hash tables.",
    features: [
      "Zero-dependency generic data structure primitives written in pure Core Java",
      "LRU Cache implementation with O(1) get and put time complexity",
      "Self-balancing AVL tree rotators with automated tree invariant validators",
      "Integrated benchmarking harness calculating wall-clock execution time and operations per second"
    ],
    technologies: ["Core Java", "Algorithms", "Data Structures", "Memory Optimization", "Generics"],
    learning: "Developed rigorous intuition for pointer/reference manipulation, balancing rotations in trees, and engineering low-latency algorithmic utilities.",
    github: "https://github.com/RehanSheikh94/system-architecture-dsa",
    liveDemoUrl: undefined,
    previewType: "codehub",
    accentColor: "#fbbf24",
    status: "Completed",
  },
  {
    id: "safecity-analytics",
    title: "SafeCity Analytics",
    slug: "safecity-analytics",
    category: "React",
    description: "A modern interface focused on presenting city and safety-related information and analytics in an intuitive visual format.",
    problem: "Urban safety metrics and zone alerts are often buried in dense bureaucratic tables and fragmented portals, making it difficult for residents to understand neighborhood safety trends.",
    solution: "Designed and built an interactive frontend dashboard that translates incident density and public safety metrics into clean visual cards, filterable heat-zones, and accessible data views.",
    features: [
      "Dynamic safety metric visualizers with status indicators",
      "Interactive zone-based safety score comparison",
      "Filterable emergency resource directories and alert cards",
      "Responsive layout optimized for mobile and desktop screens"
    ],
    technologies: ["React", "React Router", "JavaScript", "HTML5 & CSS3", "Lucide Icons"],
    learning: "Mastered data visualization layout hierarchy, component modularity in React, and responsive grid choreography.",
    github: "https://github.com/RehanSheikh94/safecity-analytics",
    liveDemoUrl: undefined,
    previewType: "analytics",
    accentColor: "#f97316",
    status: "Completed",
  },
  {
    id: "cpp-attendance-fees",
    title: "Student Attendance & Fees Management",
    slug: "cpp-attendance-fees",
    category: "Programming",
    badge: "C++ Programming Project",
    description: "A college systems programming application developed in C++ focused on record management for student attendance tracking and fee processing.",
    problem: "Educational institutions require reliable, low-overhead record-keeping utilities for tracking student attendance percentages and fee payment reconciliations.",
    solution: "Implemented an algorithmic console application in C++ using object-oriented principles, structured file operations, input validation, and menu-driven navigation.",
    features: [
      "Structured student record data storage and file handling",
      "Attendance percentage calculation and threshold warnings",
      "Fee payment receipt generation and dues balance tracking",
      "Modular class architecture with robust error handling"
    ],
    technologies: ["C++ Programming", "C Programming", "File I/O", "Data Structures"],
    learning: "Strengthened core computer science fundamentals, memory management, pointers, and algorithmic data flow.",
    github: "https://github.com/RehanSheikh94/cpp-attendance-fees",
    liveDemoUrl: undefined,
    previewType: "cpp",
    accentColor: "#06b6d4",
    status: "Completed",
  },
  {
    id: "code-hub",
    title: "Code Hub Resource & Snippets Engine",
    slug: "code-hub",
    category: "Frontend",
    description: "A developer-focused platform and interface for organizing, bookmarking, and exploring coding-related resources, snippets, and tools.",
    problem: "Developers frequently lose track of documentation links, syntax cheatsheets, and reusable utilities scattered across multiple browser tabs and notes.",
    solution: "Constructed an organized catalog interface featuring categorized resource cards, fast search filtering, code snippet previews, and tag filtering.",
    features: [
      "Instant client-side search and multi-tag filtering",
      "Code snippet viewer with syntax formatting",
      "Categorized collections (Web, Systems, Algorithms, Tools)",
      "Dark-mode optimized aesthetic tailored for programmers"
    ],
    technologies: ["React", "JavaScript", "HTML5", "CSS3", "Firebase"],
    learning: "Deepened understanding of client-side state management, search query indexing, and keyboard accessibility.",
    github: "https://github.com/RehanSheikh94/code-hub",
    liveDemoUrl: undefined,
    previewType: "codehub",
    accentColor: "#10b981",
    status: "Completed",
  },
];
