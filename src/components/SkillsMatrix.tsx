import React, { useState } from 'react';
import { 
  detailedSkillsData, 
  DetailedSkill, 
  marqueeSkillsDetailed,
  marqueeTrack1,
  marqueeTrack2,
  MarqueeSkill
} from '../data/skills';
import { projectsData, Project } from '../data/projects';
import { 
  Code2, 
  Terminal, 
  FileCode, 
  Palette, 
  Layout, 
  Coffee, 
  Cpu, 
  Binary, 
  Database, 
  Sparkles, 
  Zap, 
  Compass, 
  GitBranch, 
  Flame, 
  Layers, 
  BrainCircuit,
  FolderGit2,
  Search,
  CheckCircle2,
  X,
  Boxes,
  Activity,
  Server,
  ArrowUpRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Tech SVG Brand Logos for Ticker (Ultra High-Quality Authentic Brand Icons)
const TechBrandIcon: React.FC<{ type: MarqueeSkill['iconType']; color: string }> = ({ type, color }) => {
  switch (type) {
    case 'react':
      return (
        <svg className="w-5 h-5" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
          <circle cx="0" cy="0" r="2.05" fill={color} />
          <g stroke={color} strokeWidth="1.2" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case 'java':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      );
    case 'node':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
          <path d="M12 12l9-5M12 12v10M12 12L3 7" />
        </svg>
      );
    case 'express':
      return (
        <div className="w-5 h-5 rounded-md bg-white/10 border border-white/20 flex items-center justify-center font-mono font-black text-[10px] text-white tracking-tighter">
          ex
        </div>
      );
    case 'mongodb':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}>
          <path d="M12 2C11.5 4 7 8 7 13.5C7 17 9.5 20.5 12 22C14.5 20.5 17 17 17 13.5C17 8 12.5 4 12 2Z" fillOpacity="0.4" stroke={color} strokeWidth="1.8" />
          <path d="M12 2v20" stroke={color} strokeWidth="1.8" />
        </svg>
      );
    case 'mysql':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case 'typescript':
      return (
        <div className="w-5 h-5 rounded-md bg-[#3178c6]/20 border border-[#3178c6]/50 flex items-center justify-center font-mono font-bold text-[10px] text-[#60a5fa] shadow-sm">
          TS
        </div>
      );
    case 'javascript':
      return (
        <div className="w-5 h-5 rounded-md bg-[#f7df1e]/20 border border-[#f7df1e]/50 flex items-center justify-center font-mono font-bold text-[10px] text-[#facc15] shadow-sm">
          JS
        </div>
      );
    case 'tailwind':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}>
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      );
    case 'three':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case 'jwt':
      return (
        <div className="w-5 h-5 rounded-md bg-pink-500/20 border border-pink-400/50 flex items-center justify-center font-mono font-bold text-[9px] text-pink-300">
          JWT
        </div>
      );
    case 'git':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="6" y1="3" x2="6" y2="15" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M18 9a9 9 0 0 1-9 9" />
        </svg>
      );
    case 'restapi':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="17 1 21 5 17 9" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <polyline points="7 23 3 19 7 15" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      );
    case 'firebase':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}>
          <path d="M4 19L7 3l4.5 8.5L4 19z" fillOpacity="0.6" />
          <path d="M14 6l-3.5 6.5L20 19 14 6z" fillOpacity="0.85" />
          <path d="M4 19l8 4 8-4-8.5-7.5L4 19z" />
        </svg>
      );
    case 'postman':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 2 8 8-8 8-8-8z" />
          <circle cx="12" cy="10" r="3" fill={color} />
        </svg>
      );
    case 'cpp':
      return (
        <div className="w-5 h-5 rounded-md bg-indigo-500/20 border border-indigo-400/50 flex items-center justify-center font-mono font-black text-[9px] text-indigo-300">
          C++
        </div>
      );
    case 'gsap':
      return (
        <div className="w-5 h-5 rounded-md bg-lime-500/20 border border-lime-400/50 flex items-center justify-center font-black text-[9px] text-lime-400">
          G
        </div>
      );
    case 'cursor':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path d="m3 3 7 18 3-7 7-3L3 3z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}>
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#000" />
        </svg>
      );
    default:
      return <Code2 className="w-5 h-5" style={{ color }} />;
  }
};

interface SkillsMatrixProps {
  onOpenProjectByTitle?: (title: string) => void;
  onOpenCaseStudy?: (project: Project) => void;
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ 
  onOpenProjectByTitle,
  onOpenCaseStudy
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<DetailedSkill>(detailedSkillsData[0]);
  const [modalSkill, setModalSkill] = useState<DetailedSkill | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleOpenSkillModal = (skill: DetailedSkill, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedSkill(skill);
    setModalSkill(skill);
  };

  const handleSelectSkill = (skill: DetailedSkill) => {
    setSelectedSkill(skill);
    // On small screens, scroll the inspector into view
    if (window.innerWidth < 1024) {
      const inspectorEl = document.getElementById('skill-detail-inspector');
      if (inspectorEl) {
        inspectorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const handleLaunchProject = (projTitle: string) => {
    if (onOpenProjectByTitle) {
      onOpenProjectByTitle(projTitle);
    }
    
    // Robust project matching logic
    const directMatch = projectsData.find(p => 
      p.title.toLowerCase() === projTitle.toLowerCase() ||
      p.title.toLowerCase().includes(projTitle.toLowerCase()) || 
      projTitle.toLowerCase().includes(p.title.toLowerCase())
    );

    const techMatch = !directMatch ? projectsData.find(p => 
      p.technologies.some(t => 
        t.toLowerCase().includes(selectedSkill.name.toLowerCase()) ||
        selectedSkill.name.toLowerCase().includes(t.toLowerCase())
      )
    ) : null;

    const finalProject = directMatch || techMatch || projectsData.find(p => p.id === 'java-dsa-engine') || projectsData[0];

    if (finalProject && onOpenCaseStudy) {
      onOpenCaseStudy(finalProject);
    }
    // Close modal if open
    setModalSkill(null);
  };

  const categories = [
    'All', 
    'Databases & Storage', 
    'Core Java & DSA', 
    'Frontend & 3D', 
    'Backend & APIs', 
    'Systems (C/C++)', 
    'GenAI & Creator'
  ];

  const categoryIcons: Record<string, React.ReactNode> = {
    'All': <Boxes className="w-3.5 h-3.5" />,
    'Databases & Storage': <Database className="w-3.5 h-3.5" />,
    'Core Java & DSA': <Coffee className="w-3.5 h-3.5" />,
    'Frontend & 3D': <Layout className="w-3.5 h-3.5" />,
    'Backend & APIs': <Server className="w-3.5 h-3.5" />,
    'Systems (C/C++)': <Binary className="w-3.5 h-3.5" />,
    'GenAI & Creator': <Sparkles className="w-3.5 h-3.5" />,
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee': return <Coffee className="w-5 h-5 text-white" />;
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5 text-white" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-white" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-white" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-white" />;
      case 'Palette': return <Palette className="w-5 h-5 text-white" />;
      case 'Layout': return <Layout className="w-5 h-5 text-white" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-white" />;
      case 'Binary': return <Binary className="w-5 h-5 text-white" />;
      case 'Database': return <Database className="w-5 h-5 text-white" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-white" />;
      case 'Zap': return <Zap className="w-5 h-5 text-white" />;
      case 'Compass': return <Compass className="w-5 h-5 text-white" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-white" />;
      case 'Flame': return <Flame className="w-5 h-5 text-white" />;
      case 'Layers': return <Layers className="w-5 h-5 text-white" />;
      default: return <Code2 className="w-5 h-5 text-white" />;
    }
  };

  // Helper mapping for authentic brand icons
  const getBrandIconType = (skillId: string): MarqueeSkill['iconType'] => {
    switch (skillId) {
      case 'react':
      case 'react-router': return 'react';
      case 'java':
      case 'dsa-java': return 'java';
      case 'nodejs': return 'node';
      case 'express': return 'express';
      case 'mongodb': return 'mongodb';
      case 'mysql': return 'mysql';
      case 'jwt': return 'jwt';
      case 'firebase': return 'firebase';
      case 'threejs': return 'three';
      case 'gsap': return 'gsap';
      case 'typescript': return 'typescript';
      case 'javascript': return 'javascript';
      case 'tailwind': return 'tailwind';
      case 'git': return 'git';
      case 'restapi': return 'restapi';
      case 'postman': return 'postman';
      case 'cpp-lang':
      case 'c-lang': return 'cpp';
      case 'cursor-genai': return 'cursor';
      case 'content-mgmt': return 'youtube';
      case 'html5-css3': return 'htmlcss';
      default: return 'cursor';
    }
  };

  const getBrandColor = (skillId: string): string => {
    switch (skillId) {
      case 'mongodb': return '#10b981';
      case 'mysql': return '#06b6d4';
      case 'firebase': return '#f59e0b';
      case 'jwt': return '#ec4899';
      case 'java': return '#f97316';
      case 'dsa-java': return '#fbbf24';
      case 'react': return '#38bdf8';
      case 'react-router': return '#f43f5e';
      case 'javascript': return '#facc15';
      case 'typescript': return '#60a5fa';
      case 'tailwind': return '#22d3ee';
      case 'threejs': return '#e2e8f0';
      case 'html5-css3': return '#f87171';
      case 'nodejs': return '#4ade80';
      case 'express': return '#ffffff';
      case 'restapi': return '#2dd4bf';
      case 'postman': return '#ff6c37';
      case 'git': return '#f43f5e';
      case 'c-lang': return '#818cf8';
      case 'cpp-lang': return '#818cf8';
      case 'gsap': return '#a3e635';
      case 'cursor-genai': return '#c084fc';
      case 'content-mgmt': return '#ef4444';
      default: return '#22d3ee';
    }
  };

  // 6 Unified Architectural Domains (Grouped coherently with all skills)
  const skillDomains = [
    {
      id: 'databases',
      category: 'Databases & Storage',
      title: 'Databases & Cloud Storage',
      subtitle: 'Relational SQL, NoSQL Document Databases, Cloud Persistence & Token Auth',
      badge: '4 Technologies · Relational & NoSQL',
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      accentColor: '#10b981',
      borderClass: 'border-emerald-500/30 hover:border-emerald-500/60',
      bgClass: 'bg-emerald-500/[0.04]',
      badgeClass: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30',
      summaryPoints: ['MongoDB NoSQL BSON Modeling', 'MySQL Table Normalization & Joins', 'Firebase Firestore Realtime', 'Stateless JWT Session Verification'],
      skillIds: ['mongodb', 'mysql', 'firebase', 'jwt']
    },
    {
      id: 'java-dsa',
      category: 'Core Java & DSA',
      title: 'Core Java & Algorithmic Problem Solving (DSA)',
      subtitle: 'Object-Oriented Architecture, Collections Framework & Computational Efficiency',
      badge: '2 Core Pillars · Algorithms & OOP',
      icon: <Coffee className="w-5 h-5 text-amber-400" />,
      accentColor: '#f59e0b',
      borderClass: 'border-amber-500/30 hover:border-amber-500/60',
      bgClass: 'bg-amber-500/[0.04]',
      badgeClass: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
      summaryPoints: ['OOP Inheritance & Polymorphism', 'Collections Framework & HashMaps', 'Two Pointers & Binary Search', 'Tree Traversals & Big-O Optimization'],
      skillIds: ['java', 'dsa-java']
    },
    {
      id: 'frontend',
      category: 'Frontend & 3D',
      title: 'Frontend Engineering & 3D WebGL',
      subtitle: 'Reactive SPAs, Static Typing, Tailwind CSS, Three.js 3D & Modern UI Layouts',
      badge: '7 Technologies · SPA & WebGL',
      icon: <Layout className="w-5 h-5 text-cyan-400" />,
      accentColor: '#06b6d4',
      borderClass: 'border-cyan-500/30 hover:border-cyan-500/60',
      bgClass: 'bg-cyan-500/[0.04]',
      badgeClass: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/30',
      summaryPoints: ['React Component Trees & Custom Hooks', 'TypeScript Strict Type Safety', 'Tailwind Utility-first Design', 'Three.js WebGL Meshes & Lighting'],
      skillIds: ['react', 'typescript', 'javascript', 'tailwind', 'threejs', 'react-router', 'html5-css3']
    },
    {
      id: 'backend',
      category: 'Backend & APIs',
      title: 'Backend Systems & RESTful APIs',
      subtitle: 'Asynchronous Server Architecture, RESTful Controller Pipelines & Middlewares',
      badge: '3 Core Services · Microservices',
      icon: <Server className="w-5 h-5 text-lime-400" />,
      accentColor: '#84cc16',
      borderClass: 'border-lime-500/30 hover:border-lime-500/60',
      bgClass: 'bg-lime-500/[0.04]',
      badgeClass: 'bg-lime-400/10 text-lime-300 border-lime-400/30',
      summaryPoints: ['Node.js Asynchronous Event Loop', 'Express Middleware Pipelines', 'RESTful API CRUD Controllers', 'CORS, Validation & Error Handlers'],
      skillIds: ['nodejs', 'express', 'restapi']
    },
    {
      id: 'systems',
      category: 'Systems (C/C++)',
      title: 'Low-Level Systems & Academic Foundations',
      subtitle: 'Pointers, Manual Dynamic Memory, Object Modeling & Distributed Git Version Control',
      badge: '3 Technologies · Memory & Tools',
      icon: <Binary className="w-5 h-5 text-blue-400" />,
      accentColor: '#3b82f6',
      borderClass: 'border-blue-500/30 hover:border-blue-500/60',
      bgClass: 'bg-blue-500/[0.04]',
      badgeClass: 'bg-blue-400/10 text-blue-300 border-blue-400/30',
      summaryPoints: ['Pointers & Manual Memory Management', 'C++ Classes & Operator Overloading', 'STL Vectors, Sets & Maps', 'Git & GitHub Open Source Workflows'],
      skillIds: ['c-lang', 'cpp-lang', 'git']
    },
    {
      id: 'genai-tools',
      category: 'GenAI & Creator',
      title: 'GenAI Velocity & Technical Creator',
      subtitle: 'AI-Native Development, GSAP Physics Choreography & Educational Tech Media',
      badge: '4 Toolsets · High Velocity',
      icon: <Sparkles className="w-5 h-5 text-rose-400" />,
      accentColor: '#f43f5e',
      borderClass: 'border-rose-500/30 hover:border-rose-500/60',
      bgClass: 'bg-rose-500/[0.04]',
      badgeClass: 'bg-rose-400/10 text-rose-300 border-rose-400/30',
      summaryPoints: ['Cursor GenAI Multi-File Refactoring', 'GSAP Staggered Scroll Timelines', 'YouTube Business & Tech Education', 'Postman API Endpoint Validation'],
      skillIds: ['cursor-genai', 'gsap', 'content-mgmt', 'postman']
    }
  ];

  // Filter domains based on selected category & search query
  const filteredDomains = skillDomains.filter(domain => {
    const matchesCategory = selectedCategory === 'All' || domain.category === selectedCategory;
    
    if (!searchQuery) return matchesCategory;

    const query = searchQuery.toLowerCase();
    const domainMatches = domain.title.toLowerCase().includes(query) ||
                          domain.subtitle.toLowerCase().includes(query) ||
                          domain.summaryPoints.some(p => p.toLowerCase().includes(query));

    const domainSkills = detailedSkillsData.filter(s => domain.skillIds.includes(s.id));
    const skillMatches = domainSkills.some(s => 
      s.name.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query) ||
      s.tags.some(t => t.toLowerCase().includes(query))
    );

    return matchesCategory && (domainMatches || skillMatches);
  });

  return (
    <section id="skills" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20">
      {/* 
        ULTRA-TRANSPARENT ARCHITECTURAL GLASS FRAME (DABBA)
        Zero blur and 100% crystal-clear see-through transparency so the canvas universe starfield, constellations & particle animations behind it shine through with absolute vividness!
      */}
      <div className="relative rounded-[2.5rem] bg-transparent border border-white/20 p-6 sm:p-10 lg:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300">
        
        {/* Subtle top & bottom perimeter neon line */}
        <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* 
          1. HEADER ENCLOSURE (Fully Transparent Glass Accent)
        */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/15 mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-bold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span>Technical Architecture & Skills</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                Skills &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-400">
                  Architecture
                </span>
              </h2>

              <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed font-light">
                Verified proficiencies across <strong className="text-amber-300 font-semibold">Core Java & DSA</strong>, modern <strong className="text-cyan-300 font-semibold">React Frontend</strong>, <strong className="text-emerald-300 font-semibold">Node.js & Express</strong> Backends, and Database Systems.
              </p>
            </div>

            {/* Status Pill Badge */}
            <div className="flex items-center gap-3 self-start md:self-end shrink-0">
              <div className="text-xs font-mono text-white/90 bg-cyan-950/40 border border-cyan-400/40 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-xl backdrop-blur-md">
                <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Verified <strong className="text-cyan-300 font-bold">{detailedSkillsData.length}</strong> Technologies · 6 Stacks</span>
              </div>
            </div>
          </div>
        </div>

        {/* 
          2. COMMAND FILTER DECK (SEARCH + CATEGORIES) - Fully Responsive & Never Clipped
        */}
        <div className="p-3 sm:p-3.5 rounded-2xl sm:rounded-3xl bg-white/[0.025] border border-white/15 flex flex-col gap-3.5 mb-8 shadow-2xl backdrop-blur-xl">
          {/* Top Row: Category Tabs with Smooth Wrapping / Horizontal Scroll */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/20 flex-1">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                const domain = skillDomains.find(d => d.category === cat);
                const count = cat === 'All' 
                  ? detailedSkillsData.length 
                  : (domain ? domain.skillIds.length : 0);

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    data-cursor="Filter"
                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 shrink-0 select-none ${
                      isActive 
                        ? 'text-black font-bold' 
                        : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    {/* Active Backdrop Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSkillCategoryPill"
                        className="absolute inset-0 bg-gradient-to-r from-white via-neutral-100 to-white rounded-xl shadow-lg shadow-white/20"
                        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                      {categoryIcons[cat]}
                      <span>{cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                        isActive ? 'bg-black/15 text-black font-bold' : 'bg-white/10 text-white/60'
                      }`}>
                        {count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Desktop Quick Search on same line if wide, otherwise smoothly stacked */}
            <div className="relative hidden xl:block w-72 shrink-0">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills (e.g. Java, React)..."
                className="w-full pl-10 pr-9 py-2 text-xs rounded-xl bg-white/[0.04] border border-white/15 hover:border-cyan-400/40 focus:border-cyan-400 text-white placeholder-white/30 focus:outline-none transition-all font-mono shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white transition-colors"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile & Tablet Search Bar below tabs to prevent any clipping */}
          <div className="relative block xl:hidden w-full">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills by keyword (e.g. Java, React, Node, SQL)..."
              className="w-full pl-10 pr-9 py-2 text-xs rounded-xl bg-white/[0.04] border border-white/15 hover:border-cyan-400/40 focus:border-cyan-400 text-white placeholder-white/30 focus:outline-none transition-all font-mono shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white transition-colors"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Marquee Tech Showcase Header: Explicit SKILLS Label */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span>SKILLS // LIVE PRODUCTION RADAR</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-white/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
            <span className="text-white/90 font-bold">{marqueeSkillsDetailed.length} Core Stacks</span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span className="hidden sm:inline text-white/40">Hover to pause</span>
          </div>
        </div>

        {/* Marquee Tech Showcase - Vibrant, High-Contrast Dual-Track Brand Cards */}
        <div className="relative overflow-hidden py-4 sm:py-5 px-3 rounded-2xl sm:rounded-3xl bg-white/[0.025] border border-white/15 mb-10 shadow-2xl backdrop-blur-xl group space-y-3.5">
          {/* Ambient Fade on Edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#070A12] via-[#070A12]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#070A12] via-[#070A12]/80 to-transparent z-10 pointer-events-none" />

          {/* Row 1: Forward Track (12 Technologies moving Left) */}
          <div className="flex items-center gap-4 sm:gap-5 animate-marquee whitespace-nowrap">
            {marqueeTrack1.concat(marqueeTrack1).map((skill, idx) => (
              <div 
                key={idx} 
                className="inline-flex items-center gap-3.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 hover:border-white/40 transition-all duration-300 shadow-xl group/item hover:scale-105 select-none"
                style={{
                  boxShadow: `0 0 25px -5px ${skill.color}35`
                }}
              >
                {/* Tech Logo Icon Capsule with Vibrant Colors */}
                <div 
                  className="flex items-center justify-center w-9 h-9 rounded-xl border shrink-0 shadow-lg transition-transform group-hover/item:scale-110"
                  style={{
                    backgroundColor: skill.bgBadge,
                    borderColor: `${skill.color}60`
                  }}
                >
                  <TechBrandIcon type={skill.iconType} color={skill.color} />
                </div>

                {/* Tech Title with Branded Accent & Clear White Text */}
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold font-mono text-white tracking-wide group-hover/item:text-cyan-200 transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400/90 leading-none mt-0.5 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Production Ready</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Reverse Track (12 Technologies moving Right) */}
          <div className="flex items-center gap-4 sm:gap-5 animate-marquee-reverse whitespace-nowrap">
            {marqueeTrack2.concat(marqueeTrack2).map((skill, idx) => (
              <div 
                key={idx} 
                className="inline-flex items-center gap-3.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 hover:border-white/40 transition-all duration-300 shadow-xl group/item hover:scale-105 select-none"
                style={{
                  boxShadow: `0 0 25px -5px ${skill.color}35`
                }}
              >
                {/* Tech Logo Icon Capsule with Vibrant Colors */}
                <div 
                  className="flex items-center justify-center w-9 h-9 rounded-xl border shrink-0 shadow-lg transition-transform group-hover/item:scale-110"
                  style={{
                    backgroundColor: skill.bgBadge,
                    borderColor: `${skill.color}60`
                  }}
                >
                  <TechBrandIcon type={skill.iconType} color={skill.color} />
                </div>

                {/* Tech Title with Branded Accent & Clear White Text */}
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold font-mono text-white tracking-wide group-hover/item:text-cyan-200 transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400/90 leading-none mt-0.5 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Production Ready</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 
          3. FULL-WIDTH BALANCED BENTO GRID OF ARCHITECTURAL STACKS
          Zero vacant space: Both columns are symmetrically filled with rich stack architectures!
        */}
        <div className="w-full">
          {filteredDomains.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white/[0.02] border border-white/10 text-white/50 font-mono text-xs">
              No technology or domain found matching "{searchQuery}".
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {filteredDomains.map((domain) => {
                const domainSkills = detailedSkillsData.filter(s => domain.skillIds.includes(s.id));
                const isDomainActive = domainSkills.some(s => s.id === selectedSkill.id);

                return (
                  <div
                    key={domain.id}
                    className={`rounded-2xl sm:rounded-3xl border p-5 sm:p-6 transition-all duration-300 relative overflow-hidden backdrop-blur-xl flex flex-col justify-between ${
                      domain.bgClass
                    } ${domain.borderClass} ${
                      isDomainActive ? 'shadow-xl shadow-cyan-950/20 ring-1 ring-white/20' : 'shadow-lg'
                    }`}
                  >
                    <div>
                      {/* Domain Card Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div 
                            className="p-2.5 rounded-xl border flex items-center justify-center shrink-0 shadow-md"
                            style={{
                              backgroundColor: `${domain.accentColor}18`,
                              borderColor: `${domain.accentColor}40`
                            }}
                          >
                            {domain.icon}
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                              <span>{domain.title}</span>
                            </h3>
                            <p className="text-xs text-white/60 font-mono mt-0.5 line-clamp-1">
                              {domain.subtitle}
                            </p>
                          </div>
                        </div>

                        <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border self-start sm:self-auto shrink-0 font-semibold ${domain.badgeClass}`}>
                          {domain.badge}
                        </span>
                      </div>

                      {/* Unified Tech Grid Inside This Stack */}
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {domainSkills.map((skill) => {
                          const isSelected = selectedSkill.id === skill.id;
                          const brandColor = getBrandColor(skill.id);
                          const brandType = getBrandIconType(skill.id);

                          return (
                            <div
                              key={skill.id}
                              onClick={() => {
                                setSelectedSkill(skill);
                                setModalSkill(skill);
                              }}
                              data-cursor="Inspect"
                              className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between gap-2.5 group select-none ${
                                isSelected
                                  ? 'bg-white text-black border-white shadow-xl scale-[1.01] ring-2 ring-cyan-400/50'
                                  : 'bg-black/40 hover:bg-white/[0.08] border-white/10 hover:border-white/30 text-white'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                {/* Tech Brand Icon Capsule */}
                                <div 
                                  className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                                    isSelected ? 'bg-black/10 border-black/20' : 'bg-white/[0.04] border-white/15'
                                  }`}
                                >
                                  <TechBrandIcon type={brandType} color={isSelected ? '#000000' : brandColor} />
                                </div>

                                <div className="min-w-0">
                                  <h4 className={`text-xs font-bold truncate leading-tight ${isSelected ? 'text-black' : 'text-white'}`}>
                                    {skill.name}
                                  </h4>
                                  <span className={`text-[10px] font-mono truncate block ${isSelected ? 'text-black/70 font-semibold' : 'text-white/50'}`}>
                                    {skill.proficiency}
                                  </span>
                                </div>
                              </div>

                              {/* Action / Inspect Tag */}
                              <div className="flex items-center gap-1 shrink-0">
                                <span className="text-[10px] font-mono text-cyan-400 group-hover:text-cyan-300 px-1.5 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/20 transition-colors flex items-center gap-0.5">
                                  <span>Specs</span>
                                  <ArrowUpRight className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Stack Key Architecture Points */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 mr-1">
                        Pillars:
                      </span>
                      {domain.summaryPoints.map((point, pIdx) => (
                        <span 
                          key={pIdx} 
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/10 text-white/70"
                        >
                          ▹ {point}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* INTERACTIVE FULL DETAIL POPUP MODAL (When View Details is Clicked) */}
      <AnimatePresence>
        {modalSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalSkill(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
              className="relative z-10 w-full max-w-2xl bg-[#0b0f19] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/15">
                <div className="flex items-center gap-3.5">
                  <div 
                    className="w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 shadow-2xl transition-transform"
                    style={{
                      backgroundColor: `${getBrandColor(modalSkill.id)}18`,
                      borderColor: `${getBrandColor(modalSkill.id)}50`,
                      boxShadow: `0 0 25px -5px ${getBrandColor(modalSkill.id)}40`
                    }}
                  >
                    <TechBrandIcon type={getBrandIconType(modalSkill.id)} color={getBrandColor(modalSkill.id)} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/30">
                        {modalSkill.category}
                      </span>
                      <span className="text-xs font-mono text-white/50">{modalSkill.proficiency}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white mt-1">
                      {modalSkill.name}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalSkill(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Architectural Specification & Depth</span>
                  </h4>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed bg-white/[0.03] p-5 rounded-2xl border border-white/10">
                    {modalSkill.description}
                  </p>
                </div>

                {/* Key Concepts */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Mastered Concepts & Framework Principles</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {modalSkill.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/15 text-white flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Projects Implemented In */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3 flex items-center gap-2">
                    <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Applied In Production Workflows & Projects</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {modalSkill.projectsUsedIn.map((projTitle, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleLaunchProject(projTitle)}
                        className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/15 hover:border-cyan-400/50 transition-all cursor-pointer group flex items-center justify-between"
                      >
                        <span className="text-xs font-semibold text-white/90 group-hover:text-white">
                          {projTitle}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-xs font-mono text-white/40">Verified Skill Matrix Entry</span>
                <button
                  type="button"
                  onClick={() => setModalSkill(null)}
                  className="px-5 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold transition-all"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
