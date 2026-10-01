import React, { useState } from 'react';
import { projectsData, Project } from '../data/projects';
import { Search, Sparkles, Filter, Code2, Layers, Cpu, Trophy, Terminal, X, Server } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InteractiveProjectCard } from './InteractiveProjectCard';

interface ProjectsShowcaseProps {
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onOpenCaseStudy }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryMeta: Record<string, { label: string; icon: React.ReactNode; count: number }> = {
    'All': { 
      label: 'All', 
      icon: <Layers className="w-3.5 h-3.5" />, 
      count: projectsData.length 
    },
    'Full-Stack': { 
      label: 'Full-Stack', 
      icon: <Server className="w-3.5 h-3.5" />, 
      count: projectsData.filter(p => p.category === 'Full-Stack').length 
    },
    'React': { 
      label: 'React', 
      icon: <Code2 className="w-3.5 h-3.5" />, 
      count: projectsData.filter(p => p.category === 'React').length 
    },
    'Frontend': { 
      label: 'Frontend', 
      icon: <Cpu className="w-3.5 h-3.5" />, 
      count: projectsData.filter(p => p.category === 'Frontend').length 
    },
    'Programming': { 
      label: 'Programming', 
      icon: <Terminal className="w-3.5 h-3.5" />, 
      count: projectsData.filter(p => p.category === 'Programming').length 
    },
    'Hackathon': { 
      label: 'Hackathon', 
      icon: <Trophy className="w-3.5 h-3.5" />, 
      count: projectsData.filter(p => p.category === 'Hackathon').length 
    },
  };

  const categories = ['All', 'Full-Stack', 'React', 'Frontend', 'Programming', 'Hackathon'];

  const filteredProjects = projectsData.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-28 border-t border-white/10 overflow-hidden">
      {/* 1. Animated Ambient Cosmic Grid & Floating Luminous Particles in Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Subtle Perspective Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 60%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 60%, transparent 100%)',
          }}
        />

        {/* Ambient Glowing Aurora Orb 1 (Top Center-Left) */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            x: [-20, 25, -20],
            y: [-15, 20, -15],
            opacity: [0.08, 0.16, 0.08],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 left-1/4 w-[480px] h-[340px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/15 to-transparent blur-[110px]"
        />

        {/* Ambient Glowing Aurora Orb 2 (Right Control Deck) */}
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            x: [20, -25, 20],
            y: [10, -20, 10],
            opacity: [0.06, 0.14, 0.06],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-0 w-[420px] h-[300px] rounded-full bg-gradient-to-bl from-purple-500/15 via-white/10 to-transparent blur-[100px]"
        />

        {/* Subtle Horizontal Scanline Beam running down */}
        <motion.div
          animate={{ y: ['-10%', '110%'] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent"
        />
      </div>

      {/* 2. Structured Section Header with Perfect Alignment */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "140px 0px -40px 0px", amount: 0.05 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6 mb-12 will-change-transform"
      >
        {/* Title Row & Live Statistics Pill */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
              <span>Selected Projects</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-1">
              Selected{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300">
                Works
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed font-light">
              Full-stack web applications, <strong className="text-amber-300 font-semibold">Core Java & DSA</strong> algorithm suites, <strong className="text-cyan-300 font-semibold">React 3D WebGL</strong> interfaces, and campus tech event tooling.
            </p>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-3 self-start md:self-end shrink-0">
            <div className="text-xs font-mono text-white/80 bg-white/[0.04] border border-white/15 px-3.5 py-2 rounded-2xl flex items-center gap-2.5 shadow-xl backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Displaying <strong className="text-cyan-300 font-bold">{filteredProjects.length}</strong> of {projectsData.length} projects</span>
            </div>
          </div>
        </div>

        {/* 3. High-Precision Command Filter Deck (Search + Category Tabs - Never Squeezed) */}
        <div className="p-3 sm:p-3.5 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col gap-3.5">
          
          {/* Top Row: Category Tabs with Smooth Scroll + Desktop Search */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/20 flex-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const meta = categoryMeta[cat];

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    data-cursor="Select"
                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 shrink-0 select-none ${
                      isActive 
                        ? 'text-black font-bold' 
                        : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    {/* Active Backdrop Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterPill"
                        className="absolute inset-0 bg-gradient-to-r from-white via-neutral-100 to-white rounded-xl shadow-lg shadow-white/20"
                        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                      {meta?.icon}
                      <span>{cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                        isActive ? 'bg-black/15 text-black font-bold' : 'bg-white/10 text-white/60'
                      }`}>
                        {meta?.count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Desktop Quick Search on same line on ultra-wide screens */}
            <div className="relative hidden xl:block w-72 shrink-0">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by tech or title..."
                className="w-full pl-10 pr-9 py-2 text-xs rounded-xl bg-white/[0.05] border border-white/15 hover:border-cyan-400/40 focus:border-cyan-400 text-white placeholder-white/30 focus:outline-none transition-all font-mono shadow-inner"
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

          {/* Mobile, Tablet & Medium Laptop Search Bar below tabs to prevent any tab clipping */}
          <div className="relative block xl:hidden w-full">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by tech, title (e.g. React, Node, Java)..."
              className="w-full pl-10 pr-9 py-2 text-xs rounded-xl bg-white/[0.05] border border-white/15 hover:border-cyan-400/40 focus:border-cyan-400 text-white placeholder-white/30 focus:outline-none transition-all font-mono shadow-inner"
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
      </motion.div>

      {/* 4. Projects Grid */}
      {filteredProjects.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-16 text-center rounded-3xl bg-white/[0.02] border border-dashed border-white/15 my-6"
        >
          <Filter className="w-8 h-8 text-white/30 mx-auto mb-3" />
          <p className="text-white text-base font-semibold">No matching projects found</p>
          <p className="text-white/50 text-xs mt-1 font-mono">
            Try adjusting your search query "{searchQuery}" or switch the category filter.
          </p>
          <button
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
            className="mt-5 px-4 py-2 text-xs font-mono rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition-colors"
          >
            Reset Filters
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <InteractiveProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpenCaseStudy={onOpenCaseStudy}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};
