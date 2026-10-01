import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';
import confetti from 'canvas-confetti';
import { 
  Copy, 
  Check, 
  Send, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2,
  Loader2,
  AlertCircle,
  ExternalLink,
  MessageSquareCode,
  Github,
  Linkedin,
  FileText,
  ArrowUpRight,
  Briefcase,
  Code2,
  Cpu,
  Youtube,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { HeadingTypewriter } from './HeadingTypewriter';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subjectCategory, setSubjectCategory] = useState('Internship & SDE Roles');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const categories = [
    {
      id: 'internship',
      label: 'Internship & SDE Roles',
      title: 'SDE / Internship',
      subtitle: 'Hiring & Engineering Roles',
      icon: Briefcase,
      accentColor: 'text-sky-400',
      badgeBg: 'bg-sky-400/15 text-sky-300 border-sky-400/30',
      activeRing: 'ring-sky-400/50',
      placeholder: 'Hi Rehan, we are hiring for an engineering internship / SDE position and would love to review your background in Java, React, and full-stack systems...',
    },
    {
      id: 'fullstack',
      label: 'Full-Stack Development',
      title: 'Full-Stack Dev',
      subtitle: 'Web Platforms & Architecture',
      icon: Code2,
      accentColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
      activeRing: 'ring-emerald-400/50',
      placeholder: 'Hi Rehan, I have a web application idea and need an engineer to design and develop the full-stack architecture, database models, and responsive UI...',
    },
    {
      id: 'java-dsa',
      label: 'Core Java & DSA',
      title: 'Core Java & DSA',
      subtitle: 'Algorithms & Backend Logic',
      icon: Cpu,
      accentColor: 'text-amber-400',
      badgeBg: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
      activeRing: 'ring-amber-400/50',
      placeholder: 'Hi Rehan, let\'s connect regarding high-performance algorithms, Core Java concurrency, data structure design, or technical challenges...',
    },
    {
      id: 'youtube-collab',
      label: 'YouTube & Creator Collab',
      title: 'YouTube & Collab',
      subtitle: 'Tech Talks, Content & Media',
      icon: Youtube,
      accentColor: 'text-rose-400',
      badgeBg: 'bg-rose-500/15 text-rose-300 border-rose-400/30',
      activeRing: 'ring-rose-400/50',
      placeholder: 'Hi Rehan, loved your vision on startups and execution! Let\'s collaborate on a podcast, tech educational content, YouTube video, or community event...',
    },
  ];

  const currentCategory = categories.find((c) => c.label === subjectCategory) || categories[0];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const getMailData = () => {
    const cleanName = name.trim() || 'Visitor';
    const cleanEmail = senderEmail.trim() || 'No email provided';
    const cleanTopic = subjectCategory.trim();
    const cleanMsg = message.trim();

    // Subject line prominently highlights the VISITOR'S NAME first so Rehan sees it immediately in his inbox & notification!
    const subject = `📩 New Message from ${cleanName} [${cleanTopic}]`;
    
    // Top lines of the body prominently display the sender's details first
    const body = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 SENDER NAME: ${cleanName}
📧 SENDER EMAIL: ${cleanEmail}
💼 INQUIRY TOPIC: ${cleanTopic}
📅 SENT AT: ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MESSAGE:
${cleanMsg}

---
Sent from portfolio to: ${siteConfig.email}`;
    return { subject, body };
  };

  // Instant Send Dispatch (Auto-detects mobile vs desktop for lightning-fast launch)
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !senderEmail.trim() || !message.trim()) return;

    const { subject, body } = getMailData();
    const encodedEmail = encodeURIComponent(siteConfig.email);
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodedSubject}&body=${encodedBody}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodedEmail}&su=${encodedSubject}&body=${encodedBody}`;

    // Parallel copy to clipboard without delaying execution
    try {
      navigator.clipboard.writeText(`To: ${siteConfig.email}\nSubject: ${subject}\n\n${body}`);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 3000);
    } catch {}

    // Check if user is on mobile (phones/tablets) - mailto launches native mail/Gmail app in 0.05 seconds!
    const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Detached anchor prevents mobile browser from freezing or navigating away from current page
      const a = document.createElement('a');
      a.href = mailtoUrl;
      a.rel = 'noopener noreferrer';
      a.click();
    } else {
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    }

    setSentSuccess(true);
    setName('');
    setSenderEmail('');
    setMessage('');

    try {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.6 },
      });
    } catch {}
  };

  const handleOpenGmail = () => {
    const { subject, body } = getMailData();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(siteConfig.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenMailto = () => {
    const { subject, body } = getMailData();
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // One-Click Copy Draft to Clipboard
  const handleCopyDraft = () => {
    const { subject, body } = getMailData();
    navigator.clipboard.writeText(`To: ${siteConfig.email}\nSubject: ${subject}\n\n${body}`);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 3000);
  };

  const handleResetForm = () => {
    setSentSuccess(false);
    setName('');
    setSenderEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-28 border-t border-white/10 mb-16 overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Top Header Row with Status Beacon */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-300 text-xs font-mono font-bold tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span>Connect & Collaborate</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12]">
            <span>Have an idea or opportunity? </span>
            <HeadingTypewriter
              text="Let's build it."
              gradientClassName="from-amber-300 via-emerald-300 to-cyan-400"
              cursorColorClassName="from-emerald-300 to-cyan-400"
            />
          </h2>

          <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl font-light leading-relaxed">
            Dynamic full-stack developer with expertise in <strong className="text-amber-300 font-semibold">Core Java & DSA</strong>, <strong className="text-emerald-300 font-semibold">Node.js/Express</strong> backends, and <strong className="text-cyan-300 font-semibold">React.js</strong> frontend systems. Seeking software development internships and engineering collaborations.
          </p>
        </div>

        {/* Live Availability Beacon Badge */}
        <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/15 shadow-xl backdrop-blur-md">
          <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
          <div className="text-xs font-mono">
            <span className="text-white/50 block text-[10px]">Response Time</span>
            <span className="text-white font-bold">&lt; 12 Hours</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Interactive Channel Hub, Right Direct Message Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Communication Hub (Cards with Vibrant Accents) */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "140px 0px -40px 0px", amount: 0.05 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-4 will-change-transform"
        >
          {/* 1. Official Direct Email Card with One-Click Copy */}
          <div className="group relative p-6 rounded-3xl bg-gradient-to-br from-cyan-500/[0.08] via-white/[0.02] to-transparent border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 shadow-xl shadow-cyan-500/5">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <span className="text-xs font-mono text-cyan-300 font-bold flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-cyan-400/20 text-cyan-300">
                  <Mail className="w-4 h-4" />
                </div>
                <span>Direct Email Address</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md border border-emerald-400/20">
                ● Verified Inbox
              </span>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-sm sm:text-base font-mono font-bold text-white break-all tracking-wide">
                {siteConfig.email}
              </span>
              <button
                onClick={handleCopyEmail}
                data-cursor="Copy"
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 active:scale-95 text-black font-mono font-bold text-xs transition-all shrink-0 flex items-center justify-center gap-2 shadow-lg shadow-white/20 select-none"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>
          </div>

          {/* 2. Direct Location & Work Hours Card (Full-width clean card without phone number) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Location Card */}
            <div className="p-5 rounded-2xl bg-amber-500/[0.06] border border-amber-400/30 hover:border-amber-400/60 transition-all shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-mono text-amber-300 font-bold mb-2">
                <span className="flex items-center gap-1.5">
                  <div className="p-1 rounded-md bg-amber-400/20 text-amber-300">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span>Location Base</span>
                </span>
                <span className="text-[10px] font-mono text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded">
                  India (IST)
                </span>
              </div>
              <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-wide mt-1">
                {siteConfig.location}
              </span>
            </div>

            {/* Availability / Collaboration Card */}
            <div className="p-5 rounded-2xl bg-emerald-500/[0.06] border border-emerald-400/30 hover:border-emerald-400/60 transition-all shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-300 font-bold mb-2">
                <span className="flex items-center gap-1.5">
                  <div className="p-1 rounded-md bg-emerald-400/20 text-emerald-300">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span>Availability</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                  Active
                </span>
              </div>
              <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-wide mt-1">
                Internships & Software Roles
              </span>
            </div>
          </div>

          {/* 3. Professional Links - 3 Distinct Colored Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* GitHub */}
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/15 hover:border-white/40 text-white transition-all group flex flex-col justify-between hover:scale-[1.02] shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-white/10 group-hover:bg-white text-white group-hover:text-black transition-colors">
                  <Github className="w-4 h-4" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div className="mt-3">
                <span className="text-xs font-bold block">GitHub</span>
                <span className="text-[10px] font-mono text-white/50">Code Repos</span>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="Connect"
              className="p-4 rounded-2xl bg-sky-500/[0.07] hover:bg-sky-500/[0.14] border border-sky-400/30 hover:border-sky-400/60 text-white transition-all group flex flex-col justify-between hover:scale-[1.02] shadow-lg shadow-sky-500/5"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-sky-400/20 group-hover:bg-sky-400 text-sky-300 group-hover:text-black transition-colors">
                  <Linkedin className="w-4 h-4" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-sky-400/60 group-hover:text-sky-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div className="mt-3">
                <span className="text-xs font-bold block text-sky-200">LinkedIn</span>
                <span className="text-[10px] font-mono text-white/50">Network</span>
              </div>
            </a>

            {/* Resume PDF */}
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="Download"
              className="p-4 rounded-2xl bg-emerald-500/[0.07] hover:bg-emerald-500/[0.14] border border-emerald-400/30 hover:border-emerald-400/60 text-white transition-all group flex flex-col justify-between hover:scale-[1.02] shadow-lg shadow-emerald-500/5"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-emerald-400/20 group-hover:bg-emerald-400 text-emerald-300 group-hover:text-black transition-colors">
                  <FileText className="w-4 h-4" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-400/60 group-hover:text-emerald-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div className="mt-3">
                <span className="text-xs font-bold block text-emerald-200">Resume PDF</span>
                <span className="text-[10px] font-mono text-white/50">View & Download</span>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Right Column: High-End Compose Terminal Form */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "140px 0px -40px 0px", amount: 0.05 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 will-change-transform"
        >
          <div className="p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            {/* Ambient Radial Flare */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Card Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2.5 text-xs font-mono text-white">
                <div className="p-1 rounded-md bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                  <MessageSquareCode className="w-4 h-4" />
                </div>
                <span className="font-bold tracking-tight">Send a Direct Message</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-white/60">
                Direct to Inbox
              </span>
            </div>

            {sentSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mt-5 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/40 text-emerald-300 relative overflow-hidden shadow-lg shadow-emerald-500/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-emerald-500/20">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-mono font-bold text-white tracking-tight">
                        Your inquiry has been successfully sent to Rehan Sheikh!
                      </h4>
                      <p className="text-[11px] font-mono text-emerald-200/90 leading-relaxed">
                        Delivered directly to <strong className="text-cyan-300 font-semibold">{siteConfig.email}</strong>. Rehan has received your details and will get back to you shortly.
                      </p>
                      <div className="flex items-center gap-2 pt-1.5">
                        <button
                          type="button"
                          onClick={handleOpenGmail}
                          className="px-2.5 py-1 rounded-lg bg-white text-black font-mono font-bold text-[10px] hover:bg-neutral-200 transition-all flex items-center gap-1 shadow-sm active:scale-95"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Open in Gmail</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleCopyDraft}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[10px] transition-all flex items-center gap-1 active:scale-95"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedDraft ? 'Copied!' : 'Copy Draft'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSentSuccess(false)}
                    className="text-white/40 hover:text-white text-xs font-mono p-1 rounded-lg hover:bg-white/10 transition-colors"
                    title="Dismiss"
                  >
                    ✕
                  </button>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSendMessage} className="mt-6 space-y-4 relative z-10">
              {/* Inquiry Category Selector */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-mono text-white/80 font-semibold tracking-wide">
                    Select Opportunity / Focus Area
                  </label>
                  <span className="text-[10px] font-mono text-white/40">
                    4 Core Capabilities
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {categories.map((c) => {
                    const isPicked = subjectCategory === c.label;
                    const IconComponent = c.icon;
                    return (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => setSubjectCategory(c.label)}
                        className={`group relative p-3 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3 select-none cursor-pointer ${
                          isPicked
                            ? 'bg-gradient-to-r from-white/[0.12] to-white/[0.05] border-white/60 shadow-lg shadow-white/5 ring-1 ' + c.activeRing
                            : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.05]'
                        }`}
                      >
                        {/* Icon Container with glowing badge */}
                        <div
                          className={`p-2 rounded-xl shrink-0 transition-transform group-hover:scale-105 border ${
                            isPicked
                              ? c.badgeBg + ' shadow-sm'
                              : 'bg-white/[0.05] border-white/10 text-white/70 group-hover:text-white'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>

                        {/* Title and Subtitle */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className={`text-xs font-mono font-bold tracking-tight truncate ${
                              isPicked ? 'text-white' : 'text-white/85 group-hover:text-white'
                            }`}>
                              {c.title}
                            </span>
                            {isPicked && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 animate-in fade-in zoom-in-75 duration-200" />
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-white/50 block truncate mt-0.5">
                            {c.subtitle}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5 font-medium">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-400 text-white placeholder-white/30 focus:outline-none transition-colors font-mono shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5 font-medium">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-400 text-white placeholder-white/30 focus:outline-none transition-colors font-mono shadow-inner"
                  />
                </div>
              </div>

              {/* Message Scope */}
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1.5 font-medium">
                  Project Scope or Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={currentCategory.placeholder}
                  className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-400 text-white placeholder-white/30 focus:outline-none transition-colors resize-none font-mono shadow-inner"
                />
              </div>

              {/* Submit Action CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  data-cursor="Send"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-white via-neutral-100 to-white hover:from-white hover:to-cyan-200 text-black font-mono font-bold text-xs tracking-wider uppercase transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2.5 shadow-xl shadow-white/20 select-none cursor-pointer"
                >
                  <Send className="w-4 h-4 text-neutral-900" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
