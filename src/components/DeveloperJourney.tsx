import React, { useState } from 'react';
import { journeyData, JourneyItem } from '../data/journey';
import { 
  GraduationCap, 
  Code2, 
  BrainCircuit, 
  Compass, 
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronDown,
  ExternalLink,
  Flame,
  Award,
  Video,
  Terminal,
  Activity,
  Zap,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HeadingTypewriter } from './HeadingTypewriter';

interface StageMeta {
  color: string;
  gradient: string;
  badgeBg: string;
  glow: string;
  icon: React.ReactNode;
  categoryTag: string;
}

const journeyMeta: Record<number, StageMeta> = {
  0: {
    color: '#38bdf8', // Cyan
    gradient: 'from-cyan-500/20 via-sky-500/10 to-transparent',
    badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-400/30',
    glow: 'rgba(56, 189, 248, 0.4)',
    icon: <GraduationCap className="w-5 h-5 text-cyan-300" />,
    categoryTag: 'Academic Foundation & Engineering'
  },
  1: {
    color: '#34d399', // Emerald Green
    gradient: 'from-emerald-500/20 via-emerald-400/10 to-transparent',
    badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/30',
    glow: 'rgba(52, 211, 153, 0.4)',
    icon: <Code2 className="w-5 h-5 text-emerald-300" />,
    categoryTag: 'Production Event Tooling & 3D Web'
  },
  2: {
    color: '#fbbf24', // Amber Gold
    gradient: 'from-amber-500/20 via-amber-400/10 to-transparent',
    badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-400/30',
    glow: 'rgba(251, 191, 36, 0.4)',
    icon: <BrainCircuit className="w-5 h-5 text-amber-300" />,
    categoryTag: 'DSA Algorithms & GenAI Velocity'
  },
  3: {
    color: '#ec4899', // Radiant Rose
    gradient: 'from-pink-500/20 via-rose-400/10 to-transparent',
    badgeBg: 'bg-pink-500/10 text-pink-300 border-pink-400/30',
    glow: 'rgba(236, 72, 153, 0.4)',
    icon: <Video className="w-5 h-5 text-pink-300" />,
    categoryTag: 'Creator, YouTube & Entrepreneurship'
  }
};

export const DeveloperJourney: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

  return (
    <section id="journey" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-28 border-t border-white/10 overflow-hidden">
      {/* Dynamic Background Ambient Light synced with active milestone */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[140px] opacity-15 transition-all duration-700"
          style={{ backgroundColor: journeyMeta[selectedMilestone]?.color || '#38bdf8' }}
        />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "140px 0px -40px 0px", amount: 0.05 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-center sm:text-left will-change-transform"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-300 text-xs font-mono font-bold tracking-wider mb-3">
            <Activity className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span>Developer Journey & Milestones</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-1">
            <HeadingTypewriter
              text="Developer Journey"
              gradientClassName="from-cyan-400 via-emerald-300 to-amber-300"
              cursorColorClassName="from-emerald-300 to-amber-300"
            />
          </h2>
          
          <p className="text-sm sm:text-base text-white/70 mt-2 max-w-xl font-light leading-relaxed">
            My academic and technical evolution as a Computer Technology student at YCCE (2024–2028), independent creator, and aspiring software entrepreneur.
          </p>
        </div>

        {/* Graduation & College Live Beacon Badge */}
        <div className="flex items-center gap-3 self-center sm:self-start md:self-end shrink-0">
          <div className="text-xs font-mono text-white/90 bg-white/[0.04] border border-white/20 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-xl backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span>Graduation: <strong className="text-white font-bold">2028</strong> · YCCE Nagpur</span>
          </div>
        </div>
      </motion.div>

      {/* 
        DYNAMIC 4-STAGE TIMELINE CARDS (Alternating Dual Column Glowing Showcase)
      */}
      <div className="relative">
        {/* Vertical Central Ambient Track for Desktop */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/50 via-emerald-400/40 via-amber-400/40 to-pink-400/20 md:-translate-x-1/2 shadow-[0_0_12px_rgba(34,211,238,0.3)] hidden sm:block" />

        <div className="space-y-12 md:space-y-16">
          {journeyData.map((item, idx) => {
            const meta = journeyMeta[idx];
            const isLeft = idx % 2 === 0;
            const isSelected = selectedMilestone === idx;

            return (
              <div 
                key={idx} 
                className="relative flex flex-col md:flex-row items-center justify-between"
              >
                {/* Glowing Center Hub Milestone Badge with Year */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center"
                >
                  <div 
                    onClick={() => setSelectedMilestone(idx)}
                    className="w-10 h-10 rounded-2xl bg-[#070A12] border-2 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg"
                    style={{
                      borderColor: meta.color,
                      boxShadow: `0 0 18px ${meta.glow}`
                    }}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full animate-ping"
                      style={{ backgroundColor: meta.color }}
                    />
                  </div>
                </motion.div>

                {/* Left Side Slot */}
                <div className={`w-full md:w-[46%] ${isLeft ? 'md:pr-6' : 'md:order-2 md:pl-6'}`}>
                  {isLeft ? (
                    <motion.div
                      initial={{ opacity: 0, x: -70, scale: 0.96 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => setSelectedMilestone(idx)}
                      className={`p-6 sm:p-7 rounded-3xl transition-all duration-300 cursor-pointer relative overflow-hidden border will-change-transform ${
                        isSelected 
                          ? 'bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent shadow-2xl scale-[1.01]' 
                          : 'bg-white/[0.025] hover:bg-white/[0.05] border-white/10 hover:border-white/25 shadow-xl'
                      }`}
                      style={{
                        borderColor: isSelected ? meta.color : undefined,
                        boxShadow: isSelected ? `0 10px 35px -10px ${meta.glow}` : undefined
                      }}
                    >
                      {/* Top Glowing Color Accent Bar */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-1"
                        style={{ backgroundColor: meta.color }}
                      />

                      {/* Header Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2.5">
                          <span 
                            className="text-xs font-mono font-bold px-3 py-1 rounded-xl border flex items-center gap-1.5"
                            style={{
                              backgroundColor: `${meta.color}15`,
                              borderColor: `${meta.color}40`,
                              color: meta.color
                            }}
                          >
                            <Calendar className="w-3 h-3" />
                            <span>{item.year}</span>
                          </span>

                          <span className="text-[11px] font-mono text-white/50 hidden sm:inline">
                            {meta.categoryTag}
                          </span>
                        </div>

                        <div 
                          className="p-1.5 rounded-xl border"
                          style={{
                            backgroundColor: `${meta.color}15`,
                            borderColor: `${meta.color}30`
                          }}
                        >
                          {meta.icon}
                        </div>
                      </div>

                      {/* Main Title & Organization */}
                      <div className="mt-4">
                        <h3 className="text-xl font-extrabold text-white leading-tight">
                          {item.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs font-mono mt-1 text-white/70">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{item.institutionOrContext}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                        {item.description}
                      </p>

                      {/* Highlights Pill Grid */}
                      <div className="mt-5 pt-3.5 border-t border-white/10 space-y-2">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block font-semibold">
                          Key Achievements & Artifacts:
                        </span>

                        <div className="space-y-2">
                          {item.highlights.map((h, hIdx) => (
                            <div 
                              key={hIdx} 
                              className="flex items-start gap-2.5 p-2 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/90 font-mono leading-relaxed"
                            >
                              <CheckCircle2 
                                className="w-3.5 h-3.5 shrink-0 mt-0.5" 
                                style={{ color: meta.color }} 
                              />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="hidden md:block" />
                  )}
                </div>

                {/* Right Side Slot */}
                <div className={`w-full md:w-[46%] ${isLeft ? 'md:order-2 hidden md:block' : 'md:order-2 md:pl-6'}`}>
                  {!isLeft ? (
                    <motion.div
                      initial={{ opacity: 0, x: 70, scale: 0.96 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => setSelectedMilestone(idx)}
                      className={`p-6 sm:p-7 rounded-3xl transition-all duration-300 cursor-pointer relative overflow-hidden border will-change-transform ${
                        isSelected 
                          ? 'bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent shadow-2xl scale-[1.01]' 
                          : 'bg-white/[0.025] hover:bg-white/[0.05] border-white/10 hover:border-white/25 shadow-xl'
                      }`}
                      style={{
                        borderColor: isSelected ? meta.color : undefined,
                        boxShadow: isSelected ? `0 10px 35px -10px ${meta.glow}` : undefined
                      }}
                    >
                      {/* Top Glowing Color Accent Bar */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-1"
                        style={{ backgroundColor: meta.color }}
                      />

                      {/* Header Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2.5">
                          <span 
                            className="text-xs font-mono font-bold px-3 py-1 rounded-xl border flex items-center gap-1.5"
                            style={{
                              backgroundColor: `${meta.color}15`,
                              borderColor: `${meta.color}40`,
                              color: meta.color
                            }}
                          >
                            <Calendar className="w-3 h-3" />
                            <span>{item.year}</span>
                          </span>

                          <span className="text-[11px] font-mono text-white/50 hidden sm:inline">
                            {meta.categoryTag}
                          </span>
                        </div>

                        <div 
                          className="p-1.5 rounded-xl border"
                          style={{
                            backgroundColor: `${meta.color}15`,
                            borderColor: `${meta.color}30`
                          }}
                        >
                          {meta.icon}
                        </div>
                      </div>

                      {/* Main Title & Organization */}
                      <div className="mt-4">
                        <h3 className="text-xl font-extrabold text-white leading-tight">
                          {item.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs font-mono mt-1 text-white/70">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{item.institutionOrContext}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                        {item.description}
                      </p>

                      {/* Highlights Pill Grid */}
                      <div className="mt-5 pt-3.5 border-t border-white/10 space-y-2">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block font-semibold">
                          Key Achievements & Artifacts:
                        </span>

                        <div className="space-y-2">
                          {item.highlights.map((h, hIdx) => (
                            <div 
                              key={hIdx} 
                              className="flex items-start gap-2.5 p-2 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/90 font-mono leading-relaxed"
                            >
                              <CheckCircle2 
                                className="w-3.5 h-3.5 shrink-0 mt-0.5" 
                                style={{ color: meta.color }} 
                              />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="hidden md:block" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
