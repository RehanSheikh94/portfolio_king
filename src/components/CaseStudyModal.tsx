import React, { useState } from 'react';
import { Project } from '../data/projects';
import { X, ExternalLink, Github, CheckCircle2, Copy, Check } from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  accentColor?: string;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(project.github);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl transition-all">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0A0E1A] border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white text-black">
              {project.category}
            </span>
            <span className="text-xs text-white/50 font-mono">Case Study & Architecture</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Description */}
        <div className="mt-6">
          <h2 id="case-study-title" className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {project.title}
          </h2>
          <p className="mt-3 text-base text-white/80 leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        {/* Quick Meta */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
          <div>
            <span className="block text-[11px] font-mono text-white/50 uppercase tracking-wider">Status</span>
            <span className="text-sm font-semibold text-white mt-0.5 block">{project.status}</span>
          </div>
          <div>
            <span className="block text-[11px] font-mono text-white/50 uppercase tracking-wider">Primary Stack</span>
            <span className="text-sm font-semibold text-white mt-0.5 block">{project.technologies.slice(0, 3).join(', ')}</span>
          </div>
          <div>
            <span className="block text-[11px] font-mono text-white/50 uppercase tracking-wider">Classification</span>
            <span className="text-sm font-semibold text-white mt-0.5 block">{project.badge || 'Frontend Application'}</span>
          </div>
        </div>

        {/* Structured Sections */}
        <div className="mt-8 space-y-6">
          {/* 01 Problem */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-white/50 uppercase tracking-wider">
              <span className="text-white">01</span>
              <span>The Problem</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed pl-4 border-l-2 border-white/30">
              {project.problem}
            </p>
          </div>

          {/* 02 Approach & Solution */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-white/50 uppercase tracking-wider">
              <span className="text-white">02</span>
              <span>Engineering Solution</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed pl-4 border-l-2 border-white/30">
              {project.solution}
            </p>
          </div>

          {/* 03 Key Features */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-white/50 uppercase tracking-wider">
              <span className="text-white">03</span>
              <span>Key Features</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-white/85 bg-white/[0.03] p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-white mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 04 Technologies */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-white/50 uppercase tracking-wider">
              <span className="text-white">04</span>
              <span>Technologies Used</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="text-xs px-3 py-1 rounded-lg bg-white/10 text-white border border-white/20 font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 05 What I Learned */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-white/50 uppercase tracking-wider">
              <span className="text-white">05</span>
              <span>Engineering Takeaways</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed bg-white/[0.03] p-4 rounded-2xl border border-white/10">
              {project.learning}
            </p>
          </div>
        </div>

        {/* Action Footers */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a 
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-white hover:bg-neutral-200 text-black transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View Source</span>
            </a>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Repo URL'}</span>
            </button>
          </div>

          <div>
            {project.liveDemoUrl ? (
              <a 
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-white text-black hover:bg-neutral-200 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-xs text-white/50 italic font-mono">
                Live demo coming soon
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
