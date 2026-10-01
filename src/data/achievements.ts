export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'Full-Stack' | 'Java & DSA' | 'Hackathon' | 'Academic';
  credentialId?: string;
  credentialUrl?: string;
  description: string;
  skills: string[];
  badgeColor: string;
  accentGradient: string;
  featuredScore?: string;
  verified: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  date: string;
  metric: string;
  organization: string;
  description: string;
  impactPoints: string[];
  icon: 'trophy' | 'award' | 'zap' | 'sparkles' | 'rocket' | 'code';
  color: string;
}

export const certificatesData: Certificate[] = [
  {
    id: "fullstack-web-dev",
    title: "Full-Stack Web Development & Microservices",
    issuer: "Engineering Verification & Project Certification",
    date: "2024",
    category: "Full-Stack",
    credentialId: "CERT-FS-84920",
    description: "Certified completion of production-grade Full-Stack Web Development covering React SPA architecture, Node.js RESTful microservices, Express.js routing, MongoDB document schemas, and JWT token authentication.",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "REST APIs"],
    badgeColor: "#38bdf8",
    accentGradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
    featuredScore: "100% Verified Code",
    verified: true
  },
  {
    id: "core-java-dsa",
    title: "Core Java & Data Structures & Algorithms",
    issuer: "Technical Foundations Mastery & Algorithms",
    date: "2025",
    category: "Java & DSA",
    credentialId: "CERT-JAVA-DSA-1934",
    description: "In-depth specialization in Object-Oriented Programming (OOP), Java Collections Framework, Exception Handling, Multithreading, and algorithmic complexity (Array manipulations, Trees, Recursion, and Binary Search).",
    skills: ["Core Java", "OOP Principles", "Data Structures", "Collections", "Time & Space Complexity"],
    badgeColor: "#f59e0b",
    accentGradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    featuredScore: "Algorithmic Precision",
    verified: true
  },
  {
    id: "hackathon-interactive-3d",
    title: "Hackathon Engineering & 3D WebGL Innovation",
    issuer: "Tech Hackathon Innovation Showcase",
    date: "2024",
    category: "Hackathon",
    credentialId: "HACK-3D-9941",
    description: "Awarded for designing and shipping an interactive Three.js 3D WebGL prototype embedded in a React architecture with GSAP fluid cinematic camera timelines.",
    skills: ["Three.js", "WebGL", "GSAP Animations", "React.js", "Spatial UI"],
    badgeColor: "#ec4899",
    accentGradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    featuredScore: "Innovative Prototype",
    verified: true
  },
  {
    id: "systems-cpp-engineering",
    title: "C/C++ Systems Programming & Memory Models",
    issuer: "Computer Technology Departmental Verification",
    date: "2024",
    category: "Academic",
    credentialId: "ACAD-CPP-5510",
    description: "Recognition for building low-level Student Attendance & Fees Management system utilizing modular C++ structures, file I/O persistence, and memory-safe routines.",
    skills: ["C++", "File I/O", "Memory Management", "Modular Systems"],
    badgeColor: "#10b981",
    accentGradient: "from-emerald-500/20 via-emerald-400/10 to-transparent",
    featuredScore: "High Distinction",
    verified: true
  }
];

export const achievementsData: Achievement[] = [
  {
    id: "campus-event-deployment",
    title: "Shipped Campus Event Registration Platform",
    category: "Production Release",
    date: "2024",
    metric: "100+ Registered Students",
    organization: "Campus Tech Club & Workshops",
    description: "Solely engineered and deployed an end-to-end registration and verification platform replacing fragmented Google Forms with automated ticket passes.",
    impactPoints: [
      "Eliminated duplicate entries with MongoDB unique index validation",
      "Stateless JWT authorization with instant confirmation status",
      "Real-time attendee telemetry dashboard for organizers"
    ],
    icon: "rocket",
    color: "#38bdf8"
  },
  {
    id: "hackathon-3d-prototype",
    title: "Hackathon 3D WebGL Spatial Submission",
    category: "Competition & Innovation",
    date: "2024",
    metric: "Top Interactive Demo",
    organization: "Inter-College Tech Hackathon",
    description: "Built and demonstrated a high-performance 60 FPS Three.js and React web application that captivated judges with dynamic lighting and camera orbits.",
    impactPoints: [
      "Custom WebGL geometry and shader textures",
      "GSAP timeline animations tied to scroll interactions",
      "Clean modular integration within React component lifecycle"
    ],
    icon: "trophy",
    color: "#ec4899"
  },
  {
    id: "youtube-tech-content",
    title: "Educational Tech & Business Tutorials",
    category: "Content & Community",
    date: "2025 - Present",
    metric: "Active Creator",
    organization: "YouTube & Developer Community",
    description: "Producing educational YouTube videos exploring practical business models, startup fundamentals, and software execution methodologies.",
    impactPoints: [
      "Translating complex software concepts into accessible visual guides",
      "Inspiring aspiring developers on turning ideas into shipped products",
      "Documenting high-velocity developer workflows with GenAI"
    ],
    icon: "zap",
    color: "#fbbf24"
  },
  {
    id: "academic-ycce-trajectory",
    title: "YCCE Computer Technology Engineering",
    category: "Academic Rigor",
    date: "2024 - 2028",
    metric: "4-Year B.Tech",
    organization: "Yeshwantrao Chavan College of Engineering",
    description: "Maintaining a disciplined academic record while actively applying algorithm theory to production software and hackathons.",
    impactPoints: [
      "Core courses: DSA, Computer Architecture, OOP, DBMS, OS",
      "Consistent practical lab achievements and project excellence",
      "Hands-on departmental leadership in event software systems"
    ],
    icon: "award",
    color: "#34d399"
  }
];
