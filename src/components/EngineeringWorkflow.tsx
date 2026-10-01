import React, { useState } from 'react';
import { 
  Lightbulb, 
  Palette, 
  Code2, 
  Sparkles, 
  Rocket, 
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Activity,
  ChevronRight,
  ChevronLeft,
  Layers,
  Terminal,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WorkflowHeadlineTypewriter } from './WorkflowHeadlineTypewriter';

interface Stage {
  step: string;
  phaseNum: string;
  title: string;
  tag: string;
  shortTag: string;
  color: string;
  badgeBg: string;
  glowColor: string;
  icon: React.ReactNode;
  description: string;
  deliverables: string[];
  tools: string[];
  metrics: string;
  focusArea: string;
}

export const EngineeringWorkflow: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages: Stage[] = [
    {
      step: "01",
      phaseNum: "STAGE 01",
      title: "Problem Deconstruction & Architecture",
      tag: "System Architecture",
      shortTag: "Architecture",
      color: "#f59e0b", // Amber gold
      badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      glowColor: "rgba(245, 158, 11, 0.4)",
      icon: <Lightbulb className="w-5 h-5 text-amber-400" />,
      description: "Analyze the core user problem, map out state transitions, design schema bounds, and verify algorithmic feasibility before writing any UI.",
      deliverables: [
        "State machine diagrams & flowcharts",
        "Data schema & relational bounds",
        "Algorithmic complexity audit (Time & Space)"
      ],
      tools: ["Core Java DSA", "System Specs", "OOP Models"],
      metrics: "O(1) / O(log n) Bounds",
      focusArea: "Algorithms & State"
    },
    {
      step: "02",
      phaseNum: "STAGE 02",
      title: "UI/UX & Design Tokens",
      tag: "System Design",
      shortTag: "System Design",
      color: "#ec4899", // Rose pink
      badgeBg: "bg-pink-500/10 text-pink-300 border-pink-500/30",
      glowColor: "rgba(236, 72, 153, 0.4)",
      icon: <Palette className="w-5 h-5 text-pink-400" />,
      description: "Establish typographic scales, high contrast tokens, responsive breakpoint systems, and component isolation hierarchies.",
      deliverables: [
        "WCAG AAA High-Contrast Tokens",
        "Atomic Component Hierarchy",
        "Responsive Breakpoint Grid Layouts"
      ],
      tools: ["Tailwind CSS", "Figma Specs", "Design Tokens"],
      metrics: "100% WCAG Contrast",
      focusArea: "Visual Hierarchy"
    },
    {
      step: "03",
      phaseNum: "STAGE 03",
      title: "Modern React & TypeScript Code",
      tag: "Frontend Code",
      shortTag: "Frontend Code",
      color: "#06b6d4", // Electric cyan
      badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
      glowColor: "rgba(6, 182, 212, 0.4)",
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      description: "Implement strictly typed components, reusable hooks, accessible semantic markup, and clean DOM trees free of layout bloat.",
      deliverables: [
        "Strict TypeScript interfaces & zero any",
        "Memoized callbacks & efficient re-renders",
        "Clean modular directory architecture"
      ],
      tools: ["React 19", "TypeScript", "Vite.js"],
      metrics: "0 Type Errors",
      focusArea: "Strict Type Safety"
    },
    {
      step: "04",
      phaseNum: "STAGE 04",
      title: "Spring Physics & Motion",
      tag: "Interaction Polish",
      shortTag: "Motion Polish",
      color: "#8b5cf6", // Radiant Violet
      badgeBg: "bg-purple-500/10 text-purple-300 border-purple-500/30",
      glowColor: "rgba(139, 92, 246, 0.4)",
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      description: "Layer fluid micro-interactions, responsive hover states, smooth scroll timelines, and full prefers-reduced-motion accessibility fallbacks.",
      deliverables: [
        "60 FPS GPU-accelerated motion",
        "Calibrated spring stiffness & damping",
        "prefers-reduced-motion accessibility fallbacks"
      ],
      tools: ["Framer Motion", "GSAP Timeline", "Three.js 3D"],
      metrics: "60–120 FPS Fluidity",
      focusArea: "Tactile Physics"
    },
    {
      step: "05",
      phaseNum: "STAGE 05",
      title: "Performance & Deployment",
      tag: "Production Release",
      shortTag: "Production",
      color: "#10b981", // Emerald green
      badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      glowColor: "rgba(16, 185, 129, 0.4)",
      icon: <Rocket className="w-5 h-5 text-emerald-400" />,
      description: "Optimize bundle chunks with Vite, audit Core Web Vitals, verify cross-browser performance, and ship production-ready frontend assets.",
      deliverables: [
        "Lighthouse 99+ Core Web Vitals score",
        "Gzip / Brotli code splitting & tree shaking",
        "Automated CI/CD edge deployment"
      ],
      tools: ["Vite Build", "Lighthouse Audit", "Cloud Hosting"],
      metrics: "99+ Lighthouse Core",
      focusArea: "Edge Delivery"
    }
  ];

  const current = stages[activeStage];

  return (
    <section id="workflow" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-28 border-t border-white/10 overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] rounded-full blur-[140px] opacity-25 transition-all duration-700"
          style={{ backgroundColor: current.color }}
        />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "140px 0px -40px 0px", amount: 0.05 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 will-change-transform"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-mono font-bold tracking-wider mb-3 shadow-lg">
          <Activity className="w-3.5 h-3.5 animate-pulse text-purple-400" />
          <span>Engineering Workflow & Process</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          <span className="block sm:inline">How I Take Ideas </span>
          <WorkflowHeadlineTypewriter />
        </h2>
        
        <p className="text-sm sm:text-base text-white/70 mt-3.5 max-w-2xl mx-auto leading-relaxed font-light">
          A disciplined, five-stage engineering pipeline with real-world telemetry, design system specs, and production release benchmarks.
        </p>
      </motion.div>

      {/* 
        PIPELINE PROGRESS TRACK (Interactive Glowing Stepper Conduit)
        Works smoothly on all screens with zero truncated text!
      */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/15 backdrop-blur-xl shadow-2xl mb-8">
        {/* Step Indicator Header with Pipeline Progress */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/50">
              Pipeline Timeline:
            </span>
            <span 
              className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border transition-colors"
              style={{
                backgroundColor: `${current.color}15`,
                borderColor: `${current.color}40`,
                color: current.color
              }}
            >
              Phase {activeStage + 1} of 5 · {((activeStage + 1) / 5) * 100}% Complete
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setActiveStage((prev) => (prev > 0 ? prev - 1 : 4))}
              className="p-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-white/70 hover:text-white transition-colors"
              title="Previous Phase"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveStage((prev) => (prev + 1) % 5)}
              className="p-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-white/70 hover:text-white transition-colors"
              title="Next Phase"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 
          The Interactive Stepper Track
          All orbs stay perfectly fixed in a rock-solid horizontal plane.
          Zero vertical shifting (no translate-y or scale jumps) so cables and orbs stay 100% aligned!
        */}
        <div className="w-full overflow-x-auto pt-2 pb-3 scrollbar-none">
          <div className="flex items-start justify-between min-w-[550px] sm:min-w-0 w-full relative px-2 sm:px-4">
            {stages.map((stage, idx) => {
              const isCurrent = activeStage === idx;
              const isCompleted = activeStage > idx;
              const hasNext = idx < stages.length - 1;
              const isConnectorActive = activeStage > idx;

              return (
                <React.Fragment key={stage.step}>
                  {/* Single Unified Node Button: Rock-solid horizontal alignment with zero up-shifts */}
                  <button
                    onClick={() => setActiveStage(idx)}
                    className="group relative z-20 flex flex-col items-center cursor-pointer focus:outline-none select-none shrink-0"
                    title={`${stage.phaseNum}: ${stage.title}`}
                  >
                    {/* Node Orb: Fixed dimensions with zero transform scale/jump */}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-colors duration-200 border-2 bg-[#0c101d] ${
                        isCurrent
                          ? 'border-cyan-400 ring-2 ring-cyan-400/30'
                          : isCompleted
                          ? 'border-emerald-400 text-emerald-400 hover:border-emerald-300'
                          : 'border-white/20 text-white/40 hover:border-white/40 hover:text-white/70'
                      }`}
                      style={{
                        borderColor: isCurrent ? stage.color : isCompleted ? '#10b981' : undefined,
                        boxShadow: isCurrent 
                          ? `0 0 20px ${stage.glowColor}` 
                          : isCompleted 
                          ? '0 0 12px rgba(16, 185, 129, 0.25)' 
                          : undefined,
                      }}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                      ) : (
                        stage.icon
                      )}
                    </div>

                    {/* Stage Number - Exactly Centered Under Orb */}
                    <span className={`text-[10px] sm:text-xs font-mono font-bold mt-2.5 sm:mt-3 transition-colors ${
                      isCurrent ? 'text-white' : 'text-white/50 group-hover:text-white'
                    }`}>
                      {stage.phaseNum}
                    </span>

                    {/* Stage Name - Exactly Centered Under Orb */}
                    <span 
                      className="text-xs sm:text-sm font-semibold mt-0.5 leading-tight transition-colors whitespace-nowrap"
                      style={{ 
                        color: isCurrent 
                          ? stage.color 
                          : isCompleted 
                          ? '#10b981' 
                          : 'rgba(255, 255, 255, 0.65)' 
                      }}
                    >
                      {stage.shortTag}
                    </span>
                  </button>

                  {/* Discrete Connector Cable: Centered precisely at orb's middle axis */}
                  {hasNext && (
                    <div className="flex-1 h-1 sm:h-1.5 mx-2 sm:mx-3 bg-white/10 rounded-full overflow-hidden self-start mt-[22px] sm:mt-[26px] shrink-1">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: isConnectorActive 
                            ? `linear-gradient(90deg, ${stage.color}, ${stages[idx + 1].color})`
                            : 'transparent'
                        }}
                        initial={false}
                        animate={{ width: isConnectorActive ? '100%' : '0%' }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* 
        EXPANDED HIGH-IMPACT COMMAND DECK FOR THE ACTIVE STAGE
      */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="p-6 sm:p-9 rounded-3xl bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Ambient Radial Light in Expanded Panel */}
          <div 
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20"
            style={{ backgroundColor: current.color }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (7 cols): Stage Breakdown & Milestones */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span 
                  className="px-3 py-1 rounded-xl text-xs font-mono font-bold border flex items-center gap-2"
                  style={{
                    backgroundColor: `${current.color}20`,
                    borderColor: `${current.color}40`,
                    color: current.color
                  }}
                >
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: current.color }} />
                  <span>{current.phaseNum} · {current.tag}</span>
                </span>

                <span className="text-xs font-mono px-2.5 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-white/70">
                  Focus: {current.focusArea}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {current.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed font-light">
                  {current.description}
                </p>
              </div>

              {/* Real Verification Milestones Checklist */}
              <div className="pt-2">
                <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block mb-2.5">
                  Production Verification Milestones:
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  {current.deliverables.map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.025] border border-white/10 text-xs sm:text-sm text-white/90 font-mono"
                    >
                      <CheckCircle2 
                        className="w-4 h-4 shrink-0" 
                        style={{ color: current.color }} 
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Telemetry, Tools & Stage Controls */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Telemetry Card */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4 shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono text-white/50">Engineering Benchmark</span>
                  <span 
                    className="font-bold px-2.5 py-1 rounded-lg border text-xs font-mono"
                    style={{
                      color: current.color,
                      backgroundColor: `${current.color}15`,
                      borderColor: `${current.color}35`
                    }}
                  >
                    {current.metrics}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-mono text-white/50 block mb-2">
                    Primary Tools & Frameworks
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {current.tools.map((tool, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs font-mono font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>Audit Status</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Verified Production Pattern
                  </span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setActiveStage((prev) => (prev > 0 ? prev - 1 : 4))}
                  disabled={activeStage === 0}
                  className={`py-3 px-3 rounded-2xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 border ${
                    activeStage === 0
                      ? 'opacity-40 cursor-not-allowed bg-white/[0.02] border-white/10 text-white/40'
                      : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/15 text-white'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => setActiveStage((prev) => (prev + 1) % 5)}
                  className="py-3 px-3 rounded-2xl font-mono text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 border hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                  style={{
                    backgroundColor: `${current.color}25`,
                    borderColor: `${current.color}50`
                  }}
                >
                  <span>
                    {activeStage === 4 ? 'Cycle to Start' : `Next (${stages[(activeStage + 1) % 5].step})`}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
