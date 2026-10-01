import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Terminal, 
  FileText, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  ArrowRight, 
  X, 
  Sparkles, 
  Command,
  Sun,
  Moon
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onTriggerEasterEgg: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onTriggerEasterEgg,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    { id: 'home', label: 'Go to Hero / Home', category: 'Navigation', action: () => onNavigate('hero') },
    { id: 'about', label: 'Go to About Me & Philosophy', category: 'Navigation', action: () => onNavigate('about') },
    { id: 'projects', label: 'View All Projects & Case Studies', category: 'Navigation', action: () => onNavigate('projects') },
    { id: 'skills', label: 'Explore Interactive Skills Matrix', category: 'Navigation', action: () => onNavigate('skills') },
    { id: 'sandbox', label: 'Open Frontend Token & Motion Sandbox', category: 'Interactive Lab', action: () => onNavigate('sandbox') },
    { id: 'dsa', label: 'Inspect Algorithmic Problem Solving (Java/C++)', category: 'CS Foundations', action: () => onNavigate('dsa') },
    { id: 'resume-viewer', label: 'View Verified Resume Dossier', category: 'Recruiter Deck', action: () => onNavigate('resume-viewer') },
    { id: 'workflow', label: 'Inspect Engineering Workflow', category: 'Navigation', action: () => onNavigate('workflow') },
    { id: 'journey', label: 'View Academic & Developer Journey', category: 'Navigation', action: () => onNavigate('journey') },
    { id: 'contact', label: 'Jump to Contact Section', category: 'Navigation', action: () => onNavigate('contact') },
    { id: 'github', label: 'Open GitHub Profile', category: 'External Links', action: () => window.open(siteConfig.github, '_blank') },
    { id: 'linkedin', label: 'Open LinkedIn Profile', category: 'External Links', action: () => window.open(siteConfig.linkedin, '_blank') },
    { id: 'resume', label: 'View / Download Resume PDF', category: 'Documents', action: () => window.open(siteConfig.resumeUrl, '_blank') },
    { id: 'secret', label: 'Trigger Developer Celebration Easter Egg', category: 'Easter Egg', action: () => onTriggerEasterEgg() },
  ];

  const filteredCommands = commands.filter(c => 
    c.label.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md transition-all">
      <div 
        className="w-full max-w-xl bg-[#0F172A] border border-white/20 rounded-2xl shadow-2xl overflow-hidden text-white animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-white/50" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section (e.g. projects, skills, resume)..."
            className="w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none font-sans"
            autoFocus
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => {
                  cmd.action();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/10 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-white/20 transition-colors">
                    <Command className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white group-hover:text-white block">
                      {cmd.label}
                    </span>
                    <span className="text-[11px] text-white/50 font-mono">
                      {cmd.category}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-sm text-white/50">
              No matching commands found for "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>Cmd/Ctrl + K</span>
        </div>
      </div>
    </div>
  );
};
