import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../data/siteConfig';
import { Project, projectsData } from '../data/projects';
import { ProjectsShowcase } from './ProjectsShowcase';
import { SkillsMatrix } from './SkillsMatrix';
import { EngineeringWorkflow } from './EngineeringWorkflow';
import { DeveloperJourney } from './DeveloperJourney';
import { AchievementsAndCertificates } from './AchievementsAndCertificates';
import { ContactSection } from './ContactSection';
import { CustomCursor } from './CustomCursor';
import { CommandPalette } from './CommandPalette';
import { FigmaShowreelCanvas } from './FigmaShowreelCanvas';
import { SpaceOrbitalPortal } from './SpaceOrbitalPortal';
import { CursiveTypewriter } from './CursiveTypewriter';
import { ContentCreatorTypewriter } from './ContentCreatorTypewriter';
import confetti from 'canvas-confetti';
import { 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  FileText, 
  Mail, 
  Sparkles, 
  Code2, 
  Terminal, 
  Compass, 
  Copy, 
  Check, 
  Command,
  ChevronDown,
  Layers,
  GraduationCap,
  Server,
  Coffee,
  BrainCircuit,
  Briefcase,
  X
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProductionPortfolioProps {
  onOpenCaseStudy: (project: Project) => void;
}

export const ProductionPortfolio: React.FC<ProductionPortfolioProps> = ({
  onOpenCaseStudy,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [showMindsetModal, setShowMindsetModal] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [bgTheme, setBgTheme] = useState<'all' | 'dots' | 'stars' | 'aurora'>('all');
  const [showBgSelector, setShowBgSelector] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeMenuRef = useRef<HTMLDivElement | null>(null);

  // Close theme dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setShowBgSelector(false);
      }
    };
    if (showBgSelector) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBgSelector]);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowMindsetModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track active section on scroll with zero layout reflow
  useEffect(() => {
    const sectionIds = ['about', 'projects', 'skills', 'workflow', 'journey', 'achievements', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-15% 0px -60% 0px',
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Rich, Butter-Smooth 60fps Starfield Constellation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Interactive Constellation Nodes (Exact size & aesthetic from user's screenshot)
    const particleCount = Math.min(Math.floor((width * height) / 24000), 55);
    const particles = Array.from({ length: particleCount }, (_, idx) => {
      // 3 subtle tiers of size matching the screenshot triangle:
      // Tier 1 (Highlighted node): ~3.2px - 3.8px
      // Tier 2 (Medium node): ~2.2px - 2.8px
      // Tier 3 (Small node): ~1.3px - 1.8px
      const tier = idx % 5 === 0 ? 'highlight' : idx % 2 === 0 ? 'medium' : 'small';
      
      const radius = tier === 'highlight'
        ? Math.random() * 0.6 + 3.2   // 3.2px - 3.8px (Exact size from photo)
        : tier === 'medium'
        ? Math.random() * 0.6 + 2.2   // 2.2px - 2.8px
        : Math.random() * 0.5 + 1.3;  // 1.3px - 1.8px

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        tier,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        alpha: tier === 'highlight' ? 0.92 : 0.72,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      };
    });

    let lastTime = 0;
    const render = (time: number) => {
      // Throttle to 60fps
      if (time - lastTime < 16) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // 1. Move and update all particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Wrap around borders smoothly with padding
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;
      }

      // 2. Draw CONNECTING LINES between moving dots (Clean geometric constellation lines)
      const maxDistance = 145;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        let connections = 0;

        for (let j = i + 1; j < particles.length; j++) {
          if (connections >= 3) break;
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistance * maxDistance) {
            const dist = Math.sqrt(distSq);
            const lineOpacity = (1 - dist / maxDistance) * 0.32;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(186, 230, 253, ${lineOpacity})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
            ctx.restore();
            connections++;
          }
        }

        // Connect to active mouse cursor if nearby
        const mdx = p1.x - mouse.x;
        const mdy = p1.y - mouse.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        const mouseRange = 160;
        if (mDistSq < mouseRange * mouseRange) {
          const mDist = Math.sqrt(mDistSq);
          const mOpacity = (1 - mDist / mouseRange) * 0.4;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${mOpacity})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
          ctx.restore();
        }
      }

      // 3. Draw the DOTS with exact soft cyan glow from photo
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulseEffect = Math.sin(p.pulse) * 0.12;
        const currentAlpha = Math.max(0.3, Math.min(1, p.alpha + pulseEffect));

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // Soft, authentic cyan glow like in the screenshot
        ctx.shadowColor = 'rgba(56, 189, 248, 0.75)';
        ctx.shadowBlur = p.tier === 'highlight' ? 8 : p.tier === 'medium' ? 5 : 3;
        ctx.fillStyle = p.tier === 'highlight' 
          ? `rgba(255, 255, 255, ${currentAlpha})`
          : `rgba(224, 242, 254, ${currentAlpha * 0.9})`;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el, { offset: -70, duration: 1.2 });
      } else {
        const headerOffset = 70;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070A12] text-white font-sans selection:bg-white selection:text-black">
      {/* Interactive Cursor for Desktop */}
      <CustomCursor />

      {/* 1. Subtle Precision Dot Grid Layer (The exact modern developer dot pattern from photo) */}
      <div 
        className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 ${
          bgTheme === 'all' || bgTheme === 'dots' ? 'opacity-[0.32]' : 'opacity-0'
        }`}
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.42) 1.2px, transparent 1.2px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      {/* 2. Deep Space Ambient Nebula Aurora Clouds */}
      <div 
        className={`pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-700 ${
          bgTheme === 'all' || bgTheme === 'aurora' ? 'opacity-100' : 'opacity-0'
        }`} 
        aria-hidden="true"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[650px] h-[650px] rounded-full bg-cyan-500/[0.12] blur-[140px]" />
        <div className="absolute top-[35%] right-[-10%] w-[650px] h-[650px] rounded-full bg-indigo-500/[0.10] blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-emerald-500/[0.09] blur-[130px]" />
      </div>

      {/* 3. Dynamic Twinkling Stars & Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className={`pointer-events-none fixed inset-0 w-full h-full z-0 transition-opacity duration-500 ${
          bgTheme === 'all' || bgTheme === 'stars' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Global Navigation - Persistent Sticky Top Navigation with Frosted Blur Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#070A12]/85 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center justify-between gap-3 sm:gap-6">
            {/* Brand Signature Wordmark - Cursive Designer Calligraphy & Modern Badge with Easter Egg */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowMindsetModal(true);
                try {
                  confetti({
                    particleCount: 40,
                    spread: 65,
                    origin: { y: 0.15 }
                  });
                } catch {}
              }}
              data-cursor="Mindset"
              title="Click to reveal Rehan's Core Philosophy"
              className="group flex items-center gap-2.5 sm:gap-3 shrink-0 mr-2 sm:mr-6 transition-all select-none cursor-pointer text-left focus:outline-none z-10"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-white/10 via-cyan-500/20 to-emerald-500/10 border border-white/20 shadow-lg shadow-cyan-500/10 group-hover:border-cyan-400/60 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.4)] group-hover:scale-105 active:scale-95 transition-all shrink-0">
                <span className="font-['Caveat',cursive] text-2xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
                  R
                </span>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              </div>

              <div className="flex flex-col shrink-0 min-w-[76px] pr-2">
                <CursiveTypewriter
                  text="Rehan"
                  speed={55}
                  delay={120}
                  showInkUnderline={false}
                  showPenCursor={false}
                  className="font-['Great_Vibes',cursive] text-2xl sm:text-[27px] text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-emerald-300 tracking-wider group-hover:from-cyan-300 group-hover:to-white transition-all drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)] pr-1.5"
                />
                <span className="text-[10px] font-mono tracking-[0.25em] -mt-1 text-white/70 uppercase font-semibold">
                  Sheikh
                </span>
              </div>
            </button>

          {/* Desktop Nav Links - Luxury Architectural Segmented Capsule */}
          <div className="hidden lg:flex items-center p-1.5 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-inner shrink-0">
            {[
              { id: 'about', num: '01', label: 'About' },
              { id: 'projects', num: '02', label: 'Projects' },
              { id: 'skills', num: '03', label: 'Skills' },
              { id: 'workflow', num: '04', label: 'Workflow' },
              { id: 'journey', num: '05', label: 'Journey' },
              { id: 'achievements', num: '06', label: 'Certificates' },
              { id: 'contact', num: '07', label: 'Contact' },
            ].map((tab) => {
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  data-cursor={tab.label}
                  className={`relative flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-white/[0.14] shadow-[0_0_15px_rgba(255,255,255,0.15)] font-semibold'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <span className={`text-[10px] font-mono tracking-tight hidden xl:inline ${isActive ? 'text-cyan-300 font-bold' : 'text-white/40'}`}>
                    {tab.num}
                  </span>
                  <span className="tracking-wide text-xs xl:text-[13px] font-semibold whitespace-nowrap">
                    {tab.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-2.5 right-2.5 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full shadow-[0_0_8px_#22d3ee]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Medium Screen (md to lg) Condensed Nav Links */}
          <div className="hidden md:flex lg:hidden items-center gap-4 text-xs sm:text-sm font-mono text-white/80 font-medium">
            {[
              { id: 'about', label: 'About' },
              { id: 'projects', label: 'Projects' },
              { id: 'skills', label: 'Skills' },
              { id: 'workflow', label: 'Workflow' },
              { id: 'journey', label: 'Journey' },
              { id: 'achievements', label: 'Certificates' },
              { id: 'contact', label: 'Contact' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className="hover:text-white transition-colors"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Actions with Balanced Professional Resume & Socials, and Theme Icon at the Very End */}
          <div className="flex items-center gap-2.5">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="GitHub"
              className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.15] border border-white/15 hover:border-white/40 text-white/80 hover:text-white transition-all hover:scale-105 shadow-md shadow-black/40"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="LinkedIn"
              className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-sky-500/20 border border-white/15 hover:border-sky-400/50 text-[#38bdf8] transition-all hover:scale-105 shadow-md shadow-black/40"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#38bdf8]" />
            </a>

            {/* Well-proportioned Luxury Resume Pill */}
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="Download"
              className="relative group hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-white via-neutral-100 to-white hover:from-white hover:to-cyan-100 text-black font-mono text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_16px_rgba(255,255,255,0.22)] border border-white select-none"
            >
              {/* Subtle Glowing Ring on Hover */}
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-75 blur-[3px] transition-opacity duration-300 -z-10" />

              {/* Icon Container */}
              <div className="flex items-center justify-center w-5 h-5 rounded-lg bg-black text-cyan-300 group-hover:bg-neutral-900 transition-colors">
                <FileText className="w-3 h-3 text-cyan-300" />
              </div>

              {/* Text Label */}
              <span className="tracking-tight text-xs sm:text-[13px] font-bold text-neutral-900">
                Resume
              </span>

              {/* Diagonal Arrow Indicator */}
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-700 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Theme Selector Icon Button (At the very end of Navbar) */}
            <div className="relative" ref={themeMenuRef}>
              <button
                type="button"
                onClick={() => setShowBgSelector(!showBgSelector)}
                data-cursor="Theme"
                className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-md shadow-black/40 flex items-center justify-center ${
                  showBgSelector 
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
                    : 'bg-white/[0.05] hover:bg-white/[0.15] border border-white/15 hover:border-cyan-400/50 text-cyan-400'
                }`}
                title="Switch Ambient Theme"
                aria-label="Switch Ambient Theme"
              >
                <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-cyan-400 animate-pulse" />
              </button>

              {showBgSelector && (
                <div className="absolute right-0 top-full mt-2 w-56 p-1.5 rounded-2xl bg-[#0B0F1A]/95 border border-white/20 shadow-2xl backdrop-blur-2xl flex flex-col gap-1 text-xs font-mono z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-white/40 border-b border-white/10 mb-1 flex items-center justify-between">
                    <span>Ambient Theme</span>
                    <span className="text-cyan-400 text-[10px]">4 Modes</span>
                  </div>

                  {/* 1. Hybrid */}
                  <button
                    type="button"
                    onClick={() => { setBgTheme('all'); setShowBgSelector(false); }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                      bgTheme === 'all' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/30' : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">✨</span>
                      <div>
                        <div className="font-semibold text-white">Hybrid</div>
                        <div className="text-[10px] text-white/50 font-normal">All-in-one ambient mix</div>
                      </div>
                    </div>
                    {bgTheme === 'all' && <span className="text-cyan-400 font-bold">✓</span>}
                  </button>

                  {/* 2. Dot Grid Matrix */}
                  <button
                    type="button"
                    onClick={() => { setBgTheme('dots'); setShowBgSelector(false); }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                      bgTheme === 'dots' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/30' : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">⚬</span>
                      <div>
                        <div className="font-semibold text-white">Dot Grid Matrix</div>
                        <div className="text-[10px] text-white/50 font-normal">Precision developer grid</div>
                      </div>
                    </div>
                    {bgTheme === 'dots' && <span className="text-cyan-400 font-bold">✓</span>}
                  </button>

                  {/* 3. Cosmic Stars */}
                  <button
                    type="button"
                    onClick={() => { setBgTheme('stars'); setShowBgSelector(false); }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                      bgTheme === 'stars' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/30' : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">⭐</span>
                      <div>
                        <div className="font-semibold text-white">Cosmic Stars</div>
                        <div className="text-[10px] text-white/50 font-normal">Twinkling constellations</div>
                      </div>
                    </div>
                    {bgTheme === 'stars' && <span className="text-cyan-400 font-bold">✓</span>}
                  </button>

                  {/* 4. Nebula Auroras */}
                  <button
                    type="button"
                    onClick={() => { setBgTheme('aurora'); setShowBgSelector(false); }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                      bgTheme === 'aurora' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/30' : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🌌</span>
                      <div>
                        <div className="font-semibold text-white">Nebula Auroras</div>
                        <div className="text-[10px] text-white/50 font-normal">Fluid glowing clouds</div>
                      </div>
                    </div>
                    {bgTheme === 'aurora' && <span className="text-cyan-400 font-bold">✓</span>}
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subtext, Bio, and CTAs (8 cols on desktop) */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            {/* Status Badge with Glowing Green Status Dot */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-white/[0.04] border border-white/20 backdrop-blur-md mb-8 text-white">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              </span>
              <span className="text-emerald-300 font-semibold">{siteConfig.status}</span>
              <span className="text-white/30">|</span>
              <span className="text-white/80">{siteConfig.college} '{siteConfig.graduationYear.slice(-2)}</span>
            </div>

            {/* Bold Dominant Heading - Clean Normal Static */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              <span className="block">
                <span>Think at Scale.</span>{' '}
                <span className="text-white/90">Iterate Daily.</span>
              </span>
              <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-white">
                Execute Relentlessly.
              </span>
            </h1>

            {/* Personalized Bio Intro - Ultra Sharp & Professional */}
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl font-normal">
              <span className="inline-flex items-baseline gap-1.5 text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300">
                <span>Hi, I'm</span>{' '}
                <CursiveTypewriter
                  text={siteConfig.name}
                  speed={35}
                  delay={250}
                  className="font-extrabold text-white text-2xl sm:text-3xl ml-0.5 tracking-wide font-['Caveat',cursive] drop-shadow-[0_0_10px_rgba(56,189,248,0.35)]"
                  showInkUnderline={true}
                  enableClickReplay={true}
                />
              </span>{' '}
              — Full-Stack Developer, Java DSA engineer, and Business Content Creator at YCCE (2024–2028). I build scalable web applications and create tech & business content.
            </p>

            {/* Quick-Scan Engineering Highlights */}
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/25 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Business Content Creator
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-400/10 text-emerald-300 border border-emerald-400/25 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Core Java & DSA
              </span>
              <span className="px-2.5 py-1 rounded-md bg-cyan-400/10 text-cyan-300 border border-cyan-400/25 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Full-Stack (React & Node)
              </span>
            </div>

            {/* Hero Action CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                data-cursor="Explore"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold rounded-2xl bg-white hover:bg-neutral-200 text-black shadow-xl shadow-white/20 transition-all hover:translate-y-[-2px] active:scale-98"
              >
                <span>View Selected Works</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                data-cursor="Connect"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/20 transition-all hover:translate-y-[-2px]"
              >
                <Mail className="w-4 h-4 text-white" />
                <span>Let's Connect</span>
              </button>
            </div>
          </div>

          {/* Right Column: Cosmic Deep Space Observatory Portal */}
          <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center lg:justify-end">
            <SpaceOrbitalPortal />
          </div>

        </div>

        {/* Quick Metrics Bar in Crisp White Card Borders with Staggered Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/15 shadow-2xl"
        >
          <div>
            <span className="block text-[11px] font-mono text-white/50 uppercase tracking-wider">Education</span>
            <span className="text-sm font-bold text-white mt-1 block">B.Tech (2024–28)</span>
            <span className="text-[11px] text-white/60">YCCE Nagpur</span>
          </div>
          <div>
            <span className="block text-[11px] font-mono text-white/50 uppercase tracking-wider">Core Foundations</span>
            <span className="text-sm font-bold text-white mt-1 block">Core Java & DSA</span>
            <span className="text-[11px] text-white/60">OOP & Problem Solving</span>
          </div>
          <div>
            <span className="block text-[11px] font-mono text-white/50 uppercase tracking-wider">Full-Stack Tech</span>
            <span className="text-sm font-bold text-white mt-1 block">React & Node.js</span>
            <span className="text-[11px] text-white/60">Express, Mongo & Three.js</span>
          </div>
          <div>
            <span className="block text-[11px] font-mono text-white/50 uppercase tracking-wider">Extracurricular</span>
            <span className="text-sm font-bold text-white mt-1 block">Independent Dev & YouTube</span>
            <span className="text-[11px] text-white/60">Hackathons & Creator</span>
          </div>
        </motion.div>
      </section>

      {/* INTERACTIVE FIGMA PROTOTYPE & VIDEO SHOWREEL */}
      <FigmaShowreelCanvas onOpenProjects={() => scrollToSection('projects')} />

      {/* 01 ABOUT SECTION with Dynamic Left & Right Staggered Entrance */}
      <section id="about" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 border-t border-white/10 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Animates smoothly from LEFT */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "140px 0px -40px 0px", amount: 0.05 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-5 will-change-transform"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" />
              <span>Career Profile & Vision</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              <span>Full-Stack Developer &amp; </span>
              <ContentCreatorTypewriter />
            </h2>

            {/* Radiant Philosophical Quote Card */}
            <div className="relative p-4 rounded-2xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 shadow-xl backdrop-blur-md">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 via-emerald-400 to-amber-400 rounded-l-2xl" />
              <p className="text-sm font-medium leading-relaxed pl-2 text-white/90">
                <span className="text-emerald-300 font-bold">"</span>
                {siteConfig.careerObjective}
                <span className="text-emerald-300 font-bold">"</span>
              </p>
            </div>

            {/* Colorful & Crisp Execution Pillars - Creator Top! */}
            <div className="space-y-2.5 pt-1">
              {/* 01 Creator & Content TOP */}
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono">
                <span className="flex items-center justify-center w-5 h-5 rounded-md bg-amber-400/20 text-amber-300 shrink-0 font-bold">
                  ▶
                </span>
                <span className="text-white/90">
                  <strong className="text-amber-300">Creator & Content:</strong> YouTube tutorials breaking down startups, product execution & business strategy.
                </span>
              </div>

              {/* 02 Java & DSA */}
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono">
                <span className="flex items-center justify-center w-5 h-5 rounded-md bg-emerald-400/20 text-emerald-300 shrink-0 font-bold">
                  ☕
                </span>
                <span className="text-white/90">
                  <strong className="text-emerald-300">Core Java & DSA:</strong> Algorithmic problem-solving, clean OOP design patterns & optimized time complexity.
                </span>
              </div>

              {/* 03 Full-Stack Web */}
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono">
                <span className="flex items-center justify-center w-5 h-5 rounded-md bg-cyan-400/20 text-cyan-300 shrink-0 font-bold">
                  ⚡
                </span>
                <span className="text-white/90">
                  <strong className="text-cyan-300">Full-Stack Architecture:</strong> Modern React SPAs paired with resilient Node/Express APIs and databases.
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Animates smoothly from RIGHT */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "140px 0px -40px 0px", amount: 0.05 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-4 will-change-transform"
          >
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent backdrop-blur-2xl border border-white/20 shadow-2xl relative overflow-hidden">
              {/* Subtle Ambient Radial Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10 relative z-10">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Terminal className="w-4 h-4" />
                  </span>
                  <span className="tracking-tight">Resume Technical Mastery & Pillars</span>
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-400/10 text-emerald-300 border border-emerald-400/30 shadow-[0_0_10px_rgba(52,211,153,0.2)]">
                  ● Verified Core
                </span>
              </div>

              {/* 4 Crisp, Easy-to-Scan Architectural Cards (2 Clean Lines Each) */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 relative z-10">
                {/* 01 Core Java & DSA */}
                <div className="group p-4 rounded-2xl bg-amber-500/[0.07] hover:bg-amber-500/[0.12] border border-amber-400/30 hover:border-amber-400/60 transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 font-mono flex items-center gap-1.5">
                      <div className="p-1 rounded-lg bg-amber-400/20 text-amber-300">
                        <Coffee className="w-3.5 h-3.5" />
                      </div>
                      <span>Core Java & DSA</span>
                    </span>
                    <span className="text-[10px] font-mono text-amber-400/80 bg-amber-400/10 px-1.5 py-0.5 rounded">
                      OOP & Algorithms
                    </span>
                  </div>
                  <ul className="text-xs text-white/80 mt-2.5 space-y-1.5 font-mono">
                    <li className="flex items-center gap-1.5">
                      <span className="text-amber-400 font-bold">▹</span> OOP Primitives, Multithreading & Exceptions
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-amber-400 font-bold">▹</span> Collections Framework, Binary Search & Recursion
                    </li>
                  </ul>
                </div>

                {/* 02 Frontend Engineering */}
                <div className="group p-4 rounded-2xl bg-cyan-500/[0.07] hover:bg-cyan-500/[0.12] border border-cyan-400/30 hover:border-cyan-400/60 transition-all hover:scale-[1.02] shadow-lg shadow-cyan-500/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-300 font-mono flex items-center gap-1.5">
                      <div className="p-1 rounded-lg bg-cyan-400/20 text-cyan-300">
                        <Code2 className="w-3.5 h-3.5" />
                      </div>
                      <span>Frontend Engineering</span>
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-400/10 px-1.5 py-0.5 rounded">
                      Modern Web
                    </span>
                  </div>
                  <ul className="text-xs text-white/80 mt-2.5 space-y-1.5 font-mono">
                    <li className="flex items-center gap-1.5">
                      <span className="text-cyan-400 font-bold">▹</span> React.js, TypeScript & Next-gen SPAs
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-cyan-400 font-bold">▹</span> Three.js 3D & Responsive Web Layouts
                    </li>
                  </ul>
                </div>

                {/* 03 Backend & Databases */}
                <div className="group p-4 rounded-2xl bg-emerald-500/[0.07] hover:bg-emerald-500/[0.12] border border-emerald-400/30 hover:border-emerald-400/60 transition-all hover:scale-[1.02] shadow-lg shadow-emerald-500/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300 font-mono flex items-center gap-1.5">
                      <div className="p-1 rounded-lg bg-emerald-400/20 text-emerald-300">
                        <Server className="w-3.5 h-3.5" />
                      </div>
                      <span>Backend & Databases</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                      REST & Cloud
                    </span>
                  </div>
                  <ul className="text-xs text-white/80 mt-2.5 space-y-1.5 font-mono">
                    <li className="flex items-center gap-1.5">
                      <span className="text-emerald-400 font-bold">▹</span> Node.js & Express RESTful APIs
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-emerald-400 font-bold">▹</span> MongoDB, MySQL & JWT Security
                    </li>
                  </ul>
                </div>

                {/* 04 GenAI & Velocity */}
                <div className="group p-4 rounded-2xl bg-rose-500/[0.07] hover:bg-rose-500/[0.12] border border-rose-400/30 hover:border-rose-400/60 transition-all hover:scale-[1.02] shadow-lg shadow-rose-500/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-300 font-mono flex items-center gap-1.5">
                      <div className="p-1 rounded-lg bg-rose-400/20 text-rose-300">
                        <BrainCircuit className="w-3.5 h-3.5" />
                      </div>
                      <span>GenAI & Creator</span>
                    </span>
                    <span className="text-[10px] font-mono text-rose-400/80 bg-rose-400/10 px-1.5 py-0.5 rounded">
                      Velocity & Content
                    </span>
                  </div>
                  <ul className="text-xs text-white/80 mt-2.5 space-y-1.5 font-mono">
                    <li className="flex items-center gap-1.5">
                      <span className="text-rose-400 font-bold">▹</span> High-Velocity GenAI Prototyping
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-rose-400 font-bold">▹</span> Tech & Business Video Tutorials
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 02 PROJECTS SHOWCASE */}
      <ProjectsShowcase onOpenCaseStudy={onOpenCaseStudy} />

      {/* 03 INTERACTIVE SKILLS MATRIX */}
      <SkillsMatrix onOpenCaseStudy={onOpenCaseStudy} />

      {/* 04 ENGINEERING WORKFLOW */}
      <EngineeringWorkflow />

      {/* 05 DEVELOPER JOURNEY */}
      <DeveloperJourney />

      {/* 06 CERTIFICATIONS & KEY ACHIEVEMENTS */}
      <AchievementsAndCertificates />

      {/* 07 CONTACT SECTION */}
      <ContactSection />

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 py-12 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div className="flex items-center gap-2">
            <span>© 2024–2028 {siteConfig.name}</span>
            <span>·</span>
            <span>{siteConfig.college}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/40">Nagpur, India</span>
            <span>·</span>
            <a href={`mailto:${siteConfig.email}`} className="text-white/80 hover:text-white transition-colors">
              {siteConfig.email}
            </a>
          </div>
        </div>
      </footer>

      {/* Mindset Easter Egg Screen Overlay Modal */}
      {showMindsetModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setShowMindsetModal(false)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl p-6 sm:p-9 rounded-3xl bg-gradient-to-b from-[#111624] via-[#0b0e17] to-[#070910] border border-cyan-400/40 shadow-2xl shadow-cyan-500/20 text-center overflow-hidden"
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowMindsetModal(false)}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.15] text-white/60 hover:text-white transition-all cursor-pointer select-none"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Brand Icon Badge */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400/20 via-emerald-400/20 to-transparent border border-cyan-400/40 shadow-lg shadow-cyan-500/20 mb-4">
              <span className="font-['Caveat',cursive] text-3xl font-bold text-white drop-shadow-[0_0_10px_#38bdf8]">
                R
              </span>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 font-mono text-[11px] font-bold tracking-wider uppercase mb-5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Rehan's Core Philosophy</span>
              </div>
            </div>

            {/* Fast Cursive Handwriting on Screen */}
            <div className="my-3 py-2 px-2 w-full flex items-center justify-center">
              <CursiveTypewriter
                text="“Think like a billionaire. Adapt & compound every day.”"
                speed={26}
                delay={150}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-emerald-200 font-['Caveat',cursive] tracking-wide leading-relaxed text-center"
                showInkUnderline={true}
              />
            </div>

            {/* Author Signature & Note */}
            <p className="mt-4 text-xs sm:text-sm font-mono text-white/60">
              — <strong className="text-white font-semibold">{siteConfig.name}</strong> <span className="text-white/30">•</span> <span className="text-cyan-300">Engineering & Relentless Execution</span>
            </p>

            <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
              <span>⚡ Click anywhere outside or ESC to close</span>
              <button
                type="button"
                onClick={() => setShowMindsetModal(false)}
                className="px-4 py-1.5 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-all cursor-pointer shadow-md select-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
