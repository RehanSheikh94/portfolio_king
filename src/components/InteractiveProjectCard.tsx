import React, { useRef, useState } from 'react';
import { Project } from '../data/projects';
import { 
  Github, 
  Code2, 
  Terminal, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  ArrowUpRight,
  Box
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface InteractiveProjectCardProps {
  project: Project;
  index: number;
  onOpenCaseStudy: (project: Project) => void;
}

export const InteractiveProjectCard: React.FC<InteractiveProjectCardProps> = ({
  project,
  index,
  onOpenCaseStudy,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position coordinates for dynamic spotlight/flashlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth 3D tilt spring physics
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [5, -5]), {
    damping: 25,
    stiffness: 250,
  });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-5, 5]), {
    damping: 25,
    stiffness: 250,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x - rect.width / 2);
    mouseY.set(y - rect.height / 2);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const accentColor = project.accentColor || '#38bdf8';

  // Render high-tech live micro-interactive preview banner
  const renderInteractiveMockup = () => {
    switch (project.previewType) {
      case 'analytics':
        return (
          <div className="h-28 w-full rounded-2xl bg-[#060a14] border border-white/10 p-3.5 flex flex-col justify-between overflow-hidden relative group/mockup">
            <div className="flex items-center justify-between text-[11px] font-mono pb-2 border-b border-white/5">
              <span className="flex items-center gap-1.5 text-white/80 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Incident Density Map</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                98.4% Safe
              </span>
            </div>
            {/* Visual Bar chart animation */}
            <div className="flex items-end gap-1.5 h-10 pt-1">
              {[35, 65, 45, 88, 60, 78, 92, 54, 82].map((h, i) => (
                <div key={i} className="flex-1 bg-white/[0.03] rounded-t flex flex-col justify-end h-full">
                  <div
                    className="w-full rounded-t transition-all duration-500 group-hover/mockup:brightness-125"
                    style={{ 
                      height: `${h}%`,
                      background: `linear-gradient(to top, ${accentColor}40, ${accentColor})`
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-white/40 pt-1 border-t border-white/5">
              <span>Dynamic Ward Clustering</span>
              <span className="text-white/60">Real-Time</span>
            </div>
          </div>
        );

      case 'codehub':
        return (
          <div className="h-28 w-full rounded-2xl bg-[#060a14] border border-white/10 p-3 flex flex-col justify-between font-mono text-[11px] overflow-hidden relative group/mockup">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                <span className="ml-1 text-[10px] text-white/40">ServerRoute.ts</span>
              </div>
              <span className="text-[10px] text-cyan-400/90 font-mono">REST: 200 OK</span>
            </div>
            <div className="space-y-0.5 text-white/70 text-[10.5px] leading-tight py-1 font-mono">
              <p><span className="text-purple-400">async</span> <span className="text-blue-300">handleRequest</span>(req, res) {'{'}</p>
              <p className="pl-3 text-white/40">verifyJWT(req.headers.auth);</p>
              <p className="pl-3 text-emerald-300">return res.status(200).json(records);</p>
              <p>{'}'}</p>
            </div>
            <div className="flex justify-between text-[10px] text-white/40 border-t border-white/5 pt-1">
              <span>Latency: 14ms</span>
              <span className="text-white/70">JWT Authenticated</span>
            </div>
          </div>
        );

      case 'cpp':
        return (
          <div className="h-28 w-full rounded-2xl bg-[#060a14] border border-white/10 p-3 flex flex-col justify-between font-mono text-[11px] overflow-hidden relative">
            <div className="flex items-center justify-between text-white/50 text-[10px] pb-1.5 border-b border-white/5">
              <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>C++ / Java Memory Engine</span>
              </span>
              <span className="text-white/40">O(1) Time</span>
            </div>
            <div className="bg-black/50 rounded-lg p-2 border border-white/5 text-[10.5px] space-y-0.5 text-white/80">
              <p className="text-emerald-400">&gt; Allocating Node [Ptr 0x7ffd58]</p>
              <p className="text-white/60">&gt; Balanced Binary Tree Re-index [OK]</p>
            </div>
            <div className="flex justify-between text-[10px] text-white/40 border-t border-white/5 pt-1">
              <span>Zero Leakage</span>
              <span className="text-cyan-300">Memory Stable</span>
            </div>
          </div>
        );

      case 'hackathon':
        return (
          <div className="h-28 w-full rounded-2xl bg-[#060a14] border border-white/10 p-3 flex flex-col justify-between overflow-hidden relative">
            <div className="flex items-center justify-between text-[11px] font-mono text-white/60 pb-1.5 border-b border-white/5">
              <span className="text-pink-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Three.js 3D WebGL Canvas</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20 font-mono">
                60 FPS
              </span>
            </div>
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="w-7 h-7 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center shrink-0">
                <Box className="w-3.5 h-3.5 text-pink-300" />
              </div>
              <div className="text-[10px] font-mono leading-tight">
                <span className="text-white font-semibold block">OrbitMesh & GSAP Timelines</span>
                <span className="text-white/40">Dynamic Geometry Disposals</span>
              </div>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-white/40 border-t border-white/5 pt-1">
              <span>Lighting: Ambient + Directional</span>
              <span className="text-white/80">Active</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="h-28 w-full rounded-2xl bg-[#060a14] border border-white/10 p-3 flex flex-col justify-between overflow-hidden relative">
            <div className="flex items-center justify-between text-[11px] font-mono text-white/60 pb-1.5 border-b border-white/5">
              <span className="text-white font-semibold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Full-Stack Interface</span>
              </span>
              <span className="text-[10px] text-white/40">Verified Architecture</span>
            </div>
            <div className="space-y-1.5 py-1">
              <div className="w-full h-2 rounded bg-white/10" />
              <div className="w-4/5 h-2 rounded bg-white/[0.06]" />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-white/40 border-t border-white/5 pt-1">
              <span>Responsive Component Trees</span>
              <span className="text-cyan-400 font-semibold">Production Ready</span>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "140px 0px -40px 0px", amount: 0.05 }}
      transition={{
        duration: 0.38,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-[#090d18]/90 backdrop-blur-2xl border border-white/10 hover:border-white/30 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden cursor-pointer will-change-transform"
      onClick={() => onOpenCaseStudy(project)}
    >
      {/* 1. Dynamic Cursor Spotlight (Follows mouse cursor) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${mouseX.get() + 180}px ${mouseY.get() + 200}px, rgba(255,255,255,0.08), transparent 80%)`
            : undefined,
        }}
      />

      {/* 2. Top Glowing Hairline */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`
        }}
      />

      {/* Top Section: Category & Live Preview */}
      <div className="relative z-10">
        {/* Header Capsule */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2">
            <span 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
            />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
              {project.badge || project.category}
            </span>
          </div>

          <span className="text-[10px] font-mono text-white/60 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10">
            {project.status}
          </span>
        </div>

        {/* Visual Interactive UI Mockup */}
        <div className="mb-4 transition-transform duration-300 group-hover:scale-[1.01]">
          {renderInteractiveMockup()}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-black text-white tracking-tight group-hover:text-white transition-colors flex items-center justify-between gap-2">
          <span>{project.title}</span>
          <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
        </h3>

        {/* Clear, Complete Description */}
        <p className="mt-2.5 text-xs text-white/70 leading-relaxed font-normal">
          {project.description}
        </p>

        {/* Technologies Pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-white/80 group-hover:border-white/20 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/5 text-white/40">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Clean Footer: ONLY GitHub Button */}
      <div className="relative z-10 mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
        <span className="text-[11px] font-mono text-white/40 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Open Source</span>
        </span>

        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          data-cursor="Code"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white hover:text-black text-white text-xs font-mono font-bold border border-white/20 hover:border-white transition-all shadow-sm active:scale-95 group/btn"
          title="Open GitHub Repository"
        >
          <Github className="w-3.5 h-3.5 text-white group-hover/btn:text-black transition-colors" />
          <span>GitHub</span>
          <ArrowUpRight className="w-3 h-3 text-white/50 group-hover/btn:text-black transition-colors" />
        </a>
      </div>
    </motion.div>
  );
};
