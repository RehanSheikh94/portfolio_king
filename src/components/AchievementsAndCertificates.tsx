import React, { useState } from 'react';
import { certificatesData, achievementsData, Certificate, Achievement } from '../data/achievements';
import { 
  Award, 
  Trophy, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  Calendar, 
  Zap, 
  Rocket, 
  Code2, 
  Copy, 
  Check, 
  FileCheck,
  Star,
  Activity,
  Layers,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HeadingTypewriter } from './HeadingTypewriter';

export const AchievementsAndCertificates: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'certificates' | 'achievements'>('certificates');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(certificatesData[0]);
  const [copiedCertId, setCopiedCertId] = useState<string | null>(null);

  const handleCopyId = (certId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(certId);
    setCopiedCertId(certId);
    setTimeout(() => setCopiedCertId(null), 2000);
  };

  const getAchievementIcon = (type: string, color: string) => {
    switch (type) {
      case 'trophy': return <Trophy className="w-5 h-5" style={{ color }} />;
      case 'rocket': return <Rocket className="w-5 h-5" style={{ color }} />;
      case 'zap': return <Zap className="w-5 h-5" style={{ color }} />;
      default: return <Award className="w-5 h-5" style={{ color }} />;
    }
  };

  return (
    <section id="achievements" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-28 border-t border-white/10 overflow-hidden">
      {/* Background Ambient Aura */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px]" />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "140px 0px -40px 0px", amount: 0.05 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 will-change-transform"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Verified Certificates & Awards</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-1">
            <span>Certifications &amp; </span>
            <HeadingTypewriter
              text="Key Achievements"
              gradientClassName="from-amber-300 via-rose-400 to-cyan-300"
              cursorColorClassName="from-rose-400 to-cyan-300"
            />
          </h2>
          
          <p className="text-sm sm:text-base text-white/70 mt-2 max-w-xl font-light leading-relaxed">
            Documented project milestones, verified engineering proficiencies, hackathon recognitions, and production platform releases.
          </p>
        </div>

        {/* Live Verified Credential Beacon */}
        <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/15 shadow-xl backdrop-blur-md self-start md:self-end">
          <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
          <div className="text-xs font-mono">
            <span className="text-white/50 block text-[10px]">Verification Protocol</span>
            <span className="text-white font-bold">100% Authenticated</span>
          </div>
        </div>
      </motion.div>

      {/* Switcher Tabs: Certificates vs Achievements */}
      <div className="flex items-center justify-center sm:justify-start mb-10">
        <div className="p-1.5 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-xl shadow-lg inline-flex items-center gap-2">
          <button
            onClick={() => setActiveTab('certificates')}
            data-cursor="Certificates"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
              activeTab === 'certificates'
                ? 'bg-gradient-to-r from-white via-neutral-100 to-white text-black shadow-lg shadow-white/15'
                : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Project Certifications</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
              activeTab === 'certificates' ? 'bg-black/15 text-black' : 'bg-white/10 text-white/60'
            }`}>
              {certificatesData.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            data-cursor="Achievements"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
              activeTab === 'achievements'
                ? 'bg-gradient-to-r from-white via-neutral-100 to-white text-black shadow-lg shadow-white/15'
                : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Notable Achievements</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
              activeTab === 'achievements' ? 'bg-black/15 text-black' : 'bg-white/10 text-white/60'
            }`}>
              {achievementsData.length}
            </span>
          </button>
        </div>
      </div>

      {/* TAB CONTENT 1: PROJECT CERTIFICATES (Dual-Panel Interactive Showcase) */}
      {activeTab === 'certificates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Certificate Selector Cards */}
          <div className="lg:col-span-6 space-y-3.5">
            {certificatesData.map((cert) => {
              const isSelected = selectedCertificate?.id === cert.id;

              return (
                <motion.div
                  key={cert.id}
                  onClick={() => setSelectedCertificate(cert)}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none relative overflow-hidden ${
                    isSelected 
                      ? 'bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent shadow-xl' 
                      : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/10 hover:border-white/20'
                  }`}
                  style={{
                    borderColor: isSelected ? cert.badgeColor : undefined,
                    boxShadow: isSelected ? `0 8px 30px -10px ${cert.badgeColor}40` : undefined
                  }}
                >
                  {/* Left Laser Glow Bar */}
                  <div 
                    className="absolute top-0 bottom-0 left-0 w-1 transition-opacity duration-300"
                    style={{ 
                      backgroundColor: cert.badgeColor,
                      opacity: isSelected ? 1 : 0.2
                    }}
                  />

                  <div className="pl-2">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span 
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                        style={{
                          color: cert.badgeColor,
                          backgroundColor: `${cert.badgeColor}15`,
                          borderColor: `${cert.badgeColor}35`
                        }}
                      >
                        {cert.category}
                      </span>

                      <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">
                      {cert.title}
                    </h3>

                    <p className="text-xs font-mono text-white/50 mt-1">
                      {cert.issuer} · {cert.date}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {cert.skills.slice(0, 4).map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[10px] font-mono text-white/80"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 4 && (
                        <span className="text-[10px] font-mono text-white/40 self-center">
                          +{cert.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Detailed Certificate Hologram Inspect Deck */}
          <div className="lg:col-span-6">
            {selectedCertificate && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCertificate.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent border border-white/20 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
                >
                  {/* Subtle Ambient Radial Light in Expanded Panel */}
                  <div 
                    className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-30"
                    style={{ backgroundColor: selectedCertificate.badgeColor }}
                  />

                  {/* Hologram Badge Ribbon */}
                  <div className="flex items-center justify-between pb-5 border-b border-white/10 relative z-10">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg"
                        style={{
                          backgroundColor: `${selectedCertificate.badgeColor}20`,
                          borderColor: `${selectedCertificate.badgeColor}50`,
                          color: selectedCertificate.badgeColor
                        }}
                      >
                        <Award className="w-6 h-6" />
                      </div>

                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block font-bold">
                          Certificate of Mastery
                        </span>
                        <span className="text-xs font-mono font-bold text-white">
                          Verified Credential
                        </span>
                      </div>
                    </div>

                    <span 
                      className="px-3 py-1 rounded-xl text-xs font-mono font-bold border flex items-center gap-1.5 shadow-md"
                      style={{
                        backgroundColor: `${selectedCertificate.badgeColor}15`,
                        borderColor: `${selectedCertificate.badgeColor}40`,
                        color: selectedCertificate.badgeColor
                      }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{selectedCertificate.featuredScore}</span>
                    </span>
                  </div>

                  {/* Certificate Title */}
                  <div className="mt-6 relative z-10">
                    <h3 className="text-2xl font-black text-white leading-tight">
                      {selectedCertificate.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mt-2 font-medium">
                      <span>{selectedCertificate.issuer}</span>
                      <span className="text-white/30">•</span>
                      <span>{selectedCertificate.date}</span>
                    </div>

                    <p className="mt-4 text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                      {selectedCertificate.description}
                    </p>
                  </div>

                  {/* Verified Skill Matrix Covered */}
                  <div className="mt-6 pt-5 border-t border-white/10 relative z-10">
                    <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block mb-2 font-semibold">
                      Certified Core Competencies:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertificate.skills.map((skill, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-white font-medium shadow-sm"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Credential ID Bar */}
                  {selectedCertificate.credentialId && (
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono relative z-10">
                      <div>
                        <span className="text-white/40 block text-[10px]">Credential Identifier</span>
                        <span className="text-white/90 font-bold tracking-wider">{selectedCertificate.credentialId}</span>
                      </div>

                      <button
                        onClick={(e) => handleCopyId(selectedCertificate.credentialId!, e)}
                        data-cursor="Copy ID"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white text-xs font-mono transition-all"
                      >
                        {copiedCertId === selectedCertificate.credentialId ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-white/70" />
                            <span>Copy ID</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: NOTABLE ACHIEVEMENTS (4 Vibrant Showcase Tiles) */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {achievementsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "140px 0px -40px 0px", amount: 0.05 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent border border-white/15 hover:border-white/30 transition-all duration-300 shadow-xl relative overflow-hidden flex flex-col justify-between will-change-transform"
            >
              {/* Top Accent Rim */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: item.color }}
              />

              <div>
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="p-2 rounded-xl border"
                      style={{
                        backgroundColor: `${item.color}15`,
                        borderColor: `${item.color}35`
                      }}
                    >
                      {getAchievementIcon(item.icon, item.color)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider block font-bold" style={{ color: item.color }}>
                        {item.category}
                      </span>
                      <span className="text-xs font-mono text-white/50">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  <span 
                    className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl border"
                    style={{
                      backgroundColor: `${item.color}15`,
                      borderColor: `${item.color}35`,
                      color: item.color
                    }}
                  >
                    {item.metric}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mt-4 leading-tight">
                  {item.title}
                </h3>

                <p className="text-xs font-mono text-cyan-300 mt-1">
                  {item.organization}
                </p>

                <p className="text-xs sm:text-sm text-white/80 mt-3 leading-relaxed font-light">
                  {item.description}
                </p>

                {/* Key Impact Points */}
                <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5">
                  {item.impactPoints.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-white/90 font-mono leading-relaxed">
                      <CheckCircle2 
                        className="w-3.5 h-3.5 shrink-0 mt-0.5" 
                        style={{ color: item.color }} 
                      />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};
