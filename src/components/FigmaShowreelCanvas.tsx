import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Terminal, 
  Layers, 
  Laptop, 
  Smartphone, 
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../data/siteConfig';

interface FigmaShowreelCanvasProps {
  onOpenProjects?: () => void;
}

export const FigmaShowreelCanvas: React.FC<FigmaShowreelCanvasProps> = ({ onOpenProjects }) => {
  // 2 Premier, Highly-Polished Interactive Labs:
  // 1. 'threejs'  (3D WebGL Spatial Lab - Parametric Topology & Math)
  // 2. 'terminal' (Authentic Cyber Shell & Digital Matrix)
  const [activeTab, setActiveTab] = useState<'threejs' | 'terminal'>('threejs');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [accentColor, setAccentColor] = useState<string>('#38bdf8');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Audio Context Ref for subtle feedback
  const audioCtxRef = useRef<AudioContext | null>(null);
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playSynthTone = useCallback((freq: number, type: OscillatorType = 'sine', duration: number = 0.12, gainVol: number = 0.08) => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainVol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio fallback
    }
  }, [soundEnabled, getAudioContext]);

  // ==========================================
  // MODULE 1: 3D WEBGL SPATIAL LAB (KEPT & POLISHED)
  // ==========================================
  const canvas3DRef = useRef<HTMLCanvasElement | null>(null);
  const [shape, setShape] = useState<'torusknot' | 'icosahedron' | 'octahedron' | 'cube'>('torusknot');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [renderMode, setRenderMode] = useState<'hologram' | 'solid' | 'points'>('hologram');
  const rotationAngleXRef = useRef<number>(0.35);
  const rotationAngleYRef = useRef<number>(0.5);
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const explosionProgressRef = useRef<number>(1.0);

  useEffect(() => {
    if (activeTab !== 'threejs') return;
    const canvas = canvas3DRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render3D = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (autoRotate && !isDraggingRef.current) {
        rotationAngleYRef.current += 0.014;
        rotationAngleXRef.current = 0.35 + Math.sin(rotationAngleYRef.current * 0.45) * 0.15;
      }

      const targetExplosion = isExploded ? 1.8 : 1.0;
      explosionProgressRef.current += (targetExplosion - explosionProgressRef.current) * 0.08;
      const explodeFactor = explosionProgressRef.current;

      const angleY = rotationAngleYRef.current;
      const angleX = rotationAngleXRef.current;
      const cx = w / 2;
      const cy = h / 2;
      const size = Math.min(w, h) * 0.28;

      ctx.save();
      ctx.translate(cx, cy);

      let vertices: [number, number, number][] = [];
      let edges: [number, number][] = [];

      if (shape === 'torusknot') {
        const p = 2;
        const q = 3;
        const steps = 72;
        const r1 = size * 0.85;
        const r2 = size * 0.35;
        for (let i = 0; i < steps; i++) {
          const phi = (i / steps) * Math.PI * 2;
          const r = r1 + r2 * Math.cos(q * phi);
          const x = r * Math.cos(p * phi);
          const y = r * Math.sin(p * phi);
          const z = -r2 * Math.sin(q * phi) * 2;
          vertices.push([x * explodeFactor, y * explodeFactor, z * explodeFactor]);
        }
        for (let i = 0; i < steps; i++) {
          edges.push([i, (i + 1) % steps]);
          if (i % 2 === 0) edges.push([i, (i + 6) % steps]);
        }
      } else if (shape === 'icosahedron') {
        const phi = (1 + Math.sqrt(5)) / 2;
        const a = size * 0.65;
        const b = a * phi;
        const baseVerts: [number, number, number][] = [
          [-a, b, 0], [a, b, 0], [-a, -b, 0], [a, -b, 0],
          [0, -a, b], [0, a, b], [0, -a, -b], [0, a, -b],
          [b, 0, -a], [b, 0, a], [-b, 0, -a], [-b, 0, a]
        ];
        vertices = baseVerts.map(([x, y, z]) => [x * explodeFactor, y * explodeFactor, z * explodeFactor]);
        edges = [
          [0,11],[0,5],[0,1],[0,7],[0,10],
          [1,5],[1,9],[1,8],[1,7],
          [2,11],[2,10],[2,6],[2,4],
          [3,8],[3,9],[3,4],[3,6],
          [4,5],[4,9],[5,11],[6,7],[6,8],[7,10],[8,9],[10,11],[2,3],[3,1],[0,2]
        ];
      } else if (shape === 'cube') {
        const s = size * 0.75;
        vertices = [
          [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
          [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s]
        ].map(([x, y, z]) => [x * explodeFactor, y * explodeFactor, z * explodeFactor]);
        edges = [
          [0,1],[1,2],[2,3],[3,0],
          [4,5],[5,6],[6,7],[7,4],
          [0,4],[1,5],[2,6],[3,7],
          [0,6],[1,7]
        ];
      } else {
        const s = size * 1.15;
        vertices = [
          [0, -s, 0], [s, 0, 0], [0, 0, s], [-s, 0, 0], [0, 0, -s], [0, s, 0]
        ].map(([x, y, z]) => [x * explodeFactor, y * explodeFactor, z * explodeFactor]);
        edges = [
          [0,1],[0,2],[0,3],[0,4],
          [5,1],[5,2],[5,3],[5,4],
          [1,2],[2,3],[3,4],[4,1]
        ];
      }

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const projected: [number, number, number][] = vertices.map(([x, y, z]) => {
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        const fov = 380;
        const scale = fov / (fov + z2 + 250);
        return [x1 * scale, y2 * scale, z2];
      });

      if (renderMode !== 'points') {
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = renderMode === 'solid' ? 2.8 : 1.6;
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 10;

        edges.forEach(([i, j]) => {
          if (!projected[i] || !projected[j]) return;
          const [x1, y1] = projected[i];
          const [x2, y2] = projected[j];
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        });
      }

      projected.forEach(([x, y, z]) => {
        const depthAlpha = Math.max(0.3, Math.min(1, 1 - z / 400));
        ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha})`;
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = renderMode === 'points' ? 12 : 6;
        ctx.beginPath();
        ctx.arc(x, y, renderMode === 'points' ? 4 : 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      animId = requestAnimationFrame(render3D);
    };

    let isVisible = true;
    let isRunning = false;

    const startLoop = () => {
      if (!isRunning && isVisible) {
        isRunning = true;
        animId = requestAnimationFrame(render3D);
      }
    };

    const stopLoop = () => {
      isRunning = false;
      cancelAnimationFrame(animId);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    }, { threshold: 0.05 });

    if (canvas) observer.observe(canvas);
    startLoop();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [activeTab, shape, autoRotate, isExploded, renderMode, accentColor]);

  const handleMouseDown3D = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove3D = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;
    rotationAngleYRef.current += deltaX * 0.015;
    rotationAngleXRef.current += deltaY * 0.015;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp3D = () => {
    isDraggingRef.current = false;
  };

  // ==========================================
  // MODULE 2: AUTHENTIC CODE SHELL TERMINAL & MATRIX
  // ==========================================
  const defaultWelcomeLog = {
    command: 'rehan-os --status',
    output: (
      <div className="space-y-3 font-mono text-xs text-white/90">
        <div>
          <div className="text-cyan-300 font-bold tracking-tight">REHAN SHEIKH CYBER TERMINAL v2.5</div>
          <div className="text-emerald-400 font-semibold text-[11px]">STATUS: ACTIVE</div>
        </div>

        <p className="text-white/70 leading-relaxed font-sans text-xs">
          Welcome to the interactive developer console! Type any command below or click a shortcut pill to inspect verified projects, skills, or launch visual matrix mode.
        </p>

        <div className="space-y-1 text-white/80">
          <div className="text-amber-300 font-bold text-[11px]">Featured Commands:</div>
          <p><span className="text-cyan-300 font-bold">projects</span> — View 4 production systems</p>
          <p><span className="text-cyan-300 font-bold">skills</span> — Tech stack & DSA core</p>
          <p><span className="text-cyan-300 font-bold">hire</span> — Internship contact details</p>
        </div>

        <div className="space-y-1 text-white/80 pt-1">
          <div className="text-emerald-300 font-bold text-[11px]">Interactive Controls:</div>
          <p><span className="text-emerald-400 font-bold">matrix</span> — Toggle digital green rain</p>
          <p><span className="text-emerald-400 font-bold">whoami</span> — Background & YCCE details</p>
          <p><span className="text-emerald-400 font-bold">clear</span> — Reset logs & stop matrix</p>
        </div>
      </div>
    ),
  };

  const [terminalInput, setTerminalInput] = useState<string>('');
  const [matrixActive, setMatrixActive] = useState<boolean>(false);
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([
    defaultWelcomeLog,
  ]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeTab === 'terminal') {
      inputRef.current?.focus();
    }
  }, [activeTab]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    if (['projects', 'project', 'proejcts', 'proj', 'work', 'works', 'portfolio'].includes(cmd)) {
      output = (
        <div className="space-y-2 text-xs font-mono text-white/90">
          <div className="text-cyan-300 font-bold">Featured Production Systems:</div>
          <div className="space-y-1.5 pl-2 border-l-2 border-cyan-400/30">
            <div>
              <span className="text-white font-bold">[1] SafeCity Analytics Platform</span>
              <span className="text-emerald-400 text-[11px] block"> • React 19 · Node.js · Leaflet · JWT · Incident Clustering</span>
            </div>
            <div>
              <span className="text-white font-bold">[2] EventHub Hackathon Portal</span>
              <span className="text-cyan-400 text-[11px] block"> • Full-Stack · Express · MongoDB · QR Pass Generator</span>
            </div>
            <div>
              <span className="text-white font-bold">[3] 3D WebGL Spatial Lab</span>
              <span className="text-pink-400 text-[11px] block"> • Three.js · Shader Math · Parametric Torus & Icosahedron</span>
            </div>
            <div>
              <span className="text-white font-bold">[4] Core Java & DSA Engine</span>
              <span className="text-amber-400 text-[11px] block"> • Java 21 · OOP Design · O(N log N) Bounds</span>
            </div>
          </div>
          {onOpenProjects && (
            <button
              type="button"
              onClick={onOpenProjects}
              className="mt-1 px-3 py-1 rounded bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-[11px] transition-colors inline-flex items-center gap-1"
            >
              <span>Explore full interactive projects showcase</span>
              <span>→</span>
            </button>
          )}
        </div>
      );
    } else if (['matrix', 'matrix on', 'matrix rain', 'matrix rain on', 'rain'].includes(cmd)) {
      setMatrixActive((prev) => {
        const next = !prev;
        if (!next && matrixCanvasRef.current) {
          const c = matrixCanvasRef.current;
          const ctx = c.getContext('2d');
          if (ctx) ctx.clearRect(0, 0, c.width, c.height);
        }
        return next;
      });
      output = (
        <div className="text-emerald-400 text-xs font-mono font-bold">
          ✔ Matrix Digital Rain {!matrixActive ? 'ACTIVATED. Green glyphs falling in background.' : 'DISENGAGED.'}
        </div>
      );
      playSynthTone(520, 'sawtooth', 0.25, 0.2);
    } else if (['skills', 'skill', 'tech', 'stack', 'technologies'].includes(cmd)) {
      output = (
        <div className="space-y-1 text-xs font-mono text-white/90">
          <div className="text-amber-300 font-bold">Technical Core Competencies:</div>
          <p><span className="text-amber-400 font-bold">Core Java & DSA:</span> OOP Design, Collections Framework, Multithreading, Algorithms.</p>
          <p><span className="text-cyan-400 font-bold">Frontend & 3D:</span> React 19, TypeScript, Tailwind CSS, Three.js 3D WebGL, Responsive SPAs.</p>
          <p><span className="text-emerald-400 font-bold">Backend & APIs:</span> Node.js, Express REST APIs, MongoDB, MySQL, JWT Authentication.</p>
          <p><span className="text-purple-400 font-bold">Content & Media:</span> Tech Tutorials, Product Architecture, Startup Breakdowns.</p>
        </div>
      );
    } else if (['whoami', 'about', 'bio', 'profile', 'rehan'].includes(cmd)) {
      output = (
        <div className="text-xs font-mono text-white/90 space-y-1">
          <p className="text-cyan-300 font-bold">Rehan Sheikh — Full-Stack Developer & Content Creator</p>
          <p className="text-white/70">
            Computer Technology undergraduate at YCCE Nagpur (2024–2028). Passionate about scalable web platforms, high-velocity prototyping, and educational tech content.
          </p>
        </div>
      );
    } else if (['hire', 'contact', 'email', 'internship', 'job'].includes(cmd)) {
      output = (
        <div className="text-xs font-mono space-y-1.5">
          <div className="text-emerald-300 font-bold">💼 Open for Software Engineering / Full-Stack Internships</div>
          <p className="text-white/80">
            Direct Email: <a href={`mailto:${siteConfig.email}`} className="underline font-bold text-white">{siteConfig.email}</a>
          </p>
          <p className="text-white/60 text-[11px]">Location Base: Nagpur, India (IST) · Remote / Onsite Available</p>
        </div>
      );
      try {
        confetti({ particleCount: 35, spread: 60 });
      } catch {}
    } else if (['clear', 'cls', 'clean', 'reset', 'stop', 'matrix off', 'stop matrix'].includes(cmd)) {
      setMatrixActive(false);
      if (matrixCanvasRef.current) {
        const c = matrixCanvasRef.current;
        const ctx = c.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, c.width, c.height);
      }
      setTerminalHistory([defaultWelcomeLog]);
      setTerminalInput('');
      return;
    } else if (['help', 'commands', 'man', 'info', '?'].includes(cmd)) {
      output = (
        <div className="space-y-1 text-xs font-mono text-white/80">
          <div className="text-amber-300 font-bold">Available Commands:</div>
          <p><span className="text-cyan-300 font-bold">projects</span> — View 4 production web & algorithm systems</p>
          <p><span className="text-cyan-300 font-bold">skills</span> — Technical stack & core Java DSA</p>
          <p><span className="text-emerald-300 font-bold">matrix</span> — Toggle falling digital Matrix rain</p>
          <p><span className="text-amber-300 font-bold">whoami</span> — Student profile, college & background</p>
          <p><span className="text-purple-300 font-bold">hire</span> — Internship availability & contact dispatch</p>
          <p><span className="text-white/60">clear</span> — Reset logs & wipe matrix rain</p>
        </div>
      );
    } else {
      output = (
        <div className="space-y-1 text-xs font-mono">
          <p className="text-rose-400">bash: command not found: {rawCmd}</p>
          <p className="text-white/50 text-[11px]">Type 'help' or click: 'projects', 'skills', 'matrix', 'hire', 'clear'</p>
        </div>
      );
    }

    setTerminalHistory((prev) => [...prev, { command: rawCmd, output }]);
    setTerminalInput('');
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(terminalInput);
  };

  // Matrix Rain Canvas Effect
  const matrixCanvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!matrixActive) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = canvas.parentElement?.clientHeight || 340;

    const chars = '01REHANJAVAREACTTHREEJSDSA101010#$@%&*';
    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    let animId: number;
    let isVisible = true;
    let isRunning = false;
    let lastTime = 0;

    const drawMatrix = (time: number) => {
      if (!isVisible) {
        isRunning = false;
        return;
      }

      // Throttle matrix rain to ~30fps for authentic aesthetic & low CPU
      if (time - lastTime < 33) {
        animId = requestAnimationFrame(drawMatrix);
        return;
      }
      lastTime = time;

      ctx.fillStyle = 'rgba(7, 10, 18, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#22c55e';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(drawMatrix);
    };

    const startMatrixLoop = () => {
      if (!isRunning && isVisible) {
        isRunning = true;
        animId = requestAnimationFrame(drawMatrix);
      }
    };

    const stopMatrixLoop = () => {
      isRunning = false;
      cancelAnimationFrame(animId);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        startMatrixLoop();
      } else {
        stopMatrixLoop();
      }
    }, { threshold: 0.05 });

    observer.observe(canvas);
    startMatrixLoop();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [matrixActive]);

  return (
    <section id="showcase-studio" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 my-16 sm:my-20">
      
      {/* Header with Title and Mode Indicator */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-xs font-mono font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Engineering Studio</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Spatial Graphics & Cyber Shell</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-xl font-normal">
            Rotate interactive 3D WebGL mathematical topologies in real time or execute commands inside the cyber shell.
          </p>
        </div>

        {/* Audio Mute & Viewport Toggle */}
        <div className="flex items-center gap-2.5 self-start md:self-end">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-colors ${
              soundEnabled
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30'
                : 'bg-white/[0.04] text-white/50 border-white/10'
            }`}
            title="Toggle Audio Feedback"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-white/40" />}
            <span>SFX: {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono">
            <button
              onClick={() => setViewportMode('desktop')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${viewportMode === 'desktop' ? 'bg-white text-black font-semibold' : 'text-white/60'}`}
            >
              <Laptop className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${viewportMode === 'mobile' ? 'bg-white text-black font-semibold' : 'text-white/60'}`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Showcase Container */}
      <div 
        className="rounded-3xl bg-[#090d18] border border-white/15 shadow-2xl overflow-hidden transition-all duration-300"
        style={{
          maxWidth: viewportMode === 'mobile' ? '460px' : '100%',
          margin: '0 auto',
        }}
      >
        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#0d1322] px-4 py-2.5 overflow-x-auto gap-2">
          <div className="flex items-center gap-2 shrink-0">
            {/* TAB 1: 3D WEBGL MODEL */}
            <button
              onClick={() => setActiveTab('threejs')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'threejs'
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-400/40 shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-pink-400" />
              <span>01. 3D WebGL Model</span>
            </button>

            {/* TAB 2: MATRIX TERMINAL */}
            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'terminal'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>02. Terminal & Matrix</span>
            </button>
          </div>

          {/* Color Themes */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0 pl-2 border-l border-white/10">
            {['#38bdf8', '#34d399', '#f43f5e', '#fbbf24', '#a855f7'].map((c) => (
              <button
                key={c}
                onClick={() => setAccentColor(c)}
                className={`w-3.5 h-3.5 rounded-full transition-transform ${
                  accentColor === c ? 'scale-125 ring-2 ring-white' : 'opacity-50 hover:opacity-100'
                }`}
                style={{ backgroundColor: c }}
                title="Theme Color"
              />
            ))}
          </div>
        </div>

        {/* Content Viewport */}
        <div className="p-4 sm:p-6 bg-[#080c16]">
          
          {/* ======================================================== */}
          {/* TAB 1: 3D WEBGL SPATIAL LAB                              */}
          {/* ======================================================== */}
          {activeTab === 'threejs' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 flex flex-col items-center justify-center relative bg-black/50 rounded-2xl border border-white/10 p-4 min-h-[350px]">
                <canvas
                  ref={canvas3DRef}
                  width={480}
                  height={330}
                  onMouseDown={handleMouseDown3D}
                  onMouseMove={handleMouseMove3D}
                  onMouseUp={handleMouseUp3D}
                  className="cursor-grab active:cursor-grabbing max-w-full h-auto select-none"
                />
                <div className="absolute bottom-3 left-4 text-[11px] font-mono text-white/50 pointer-events-none flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Click & drag to rotate in 3D · 60fps</span>
                </div>
              </div>

              {/* Controls Column */}
              <div className="lg:col-span-4 space-y-4 font-mono text-xs">
                <div>
                  <label className="text-white/60 block mb-2 font-medium">Select 3D Topology:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'torusknot', label: 'Torus Knot' },
                      { id: 'icosahedron', label: 'Icosahedron' },
                      { id: 'octahedron', label: 'Octahedron' },
                      { id: 'cube', label: 'Hypercube' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setShape(s.id as any);
                          playSynthTone(500, 'sine', 0.1, 0.1);
                        }}
                        className={`py-2 px-2.5 rounded-xl text-center capitalize transition-colors ${
                          shape === s.id
                            ? 'bg-pink-500/20 text-pink-300 border border-pink-400/40 font-bold shadow-sm'
                            : 'bg-white/[0.04] text-white/70 border border-white/10 hover:text-white'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Particle Explode:</span>
                    <button
                      onClick={() => {
                        setIsExploded(!isExploded);
                        playSynthTone(isExploded ? 300 : 700, 'triangle', 0.15, 0.15);
                      }}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        isExploded
                          ? 'bg-amber-400 text-black shadow-md'
                          : 'bg-white/10 text-white/80 hover:bg-white/20'
                      }`}
                    >
                      {isExploded ? 'Implode ⚡' : 'Explode 💥'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Render Style:</span>
                    <div className="flex gap-1">
                      {(['hologram', 'solid', 'points'] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setRenderMode(m)}
                          className={`px-2 py-0.5 rounded text-[10px] capitalize transition-colors ${
                            renderMode === m ? 'bg-white text-black font-bold' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Continuous Orbit:</span>
                    <button
                      onClick={() => setAutoRotate(!autoRotate)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] ${
                        autoRotate ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {autoRotate ? 'Active' : 'Paused'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: INTERACTIVE CYBER TERMINAL & MATRIX               */}
          {/* ======================================================== */}
          {activeTab === 'terminal' && (
            <div className="relative rounded-2xl bg-black/90 border border-white/15 p-4 sm:p-5 font-mono text-xs overflow-hidden min-h-[420px] flex flex-col justify-between shadow-2xl">
              
              {/* Optional Matrix Canvas Overlay */}
              {matrixActive && (
                <canvas
                  ref={matrixCanvasRef}
                  className="absolute inset-0 pointer-events-none opacity-45 z-0"
                />
              )}

              {/* Terminal Window Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  <span className="text-white/60 ml-1.5 text-[11px] font-semibold hidden sm:inline">
                    rehan@portfolio: ~ (interactive shell)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {matrixActive && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-bold animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Matrix Active
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => executeCommand('clear')}
                    className="text-[10px] text-white/50 hover:text-white px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
                    title="Clear Terminal and Reset Logs"
                  >
                    Reset Console
                  </button>
                </div>
              </div>

              {/* Terminal Logs & Inline Code Prompt */}
              <div 
                ref={terminalContainerRef}
                onClick={() => inputRef.current?.focus()}
                className="space-y-3.5 overflow-y-auto max-h-80 sm:max-h-96 pr-1 relative z-10 font-mono text-xs cursor-text scrollbar-thin"
              >
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold select-none">rehan@cyber:~$</span>
                      <span className="font-bold text-white">{item.command}</span>
                    </div>
                    <div className="pl-4">{item.output}</div>
                  </div>
                ))}

                {/* The Active Inline Prompt Line (rehan@cyber:~$ <input>) on the SAME line */}
                <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-1 text-xs sm:text-sm">
                  <span className="text-emerald-400 font-bold select-none whitespace-nowrap">rehan@cyber:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="type 'projects', 'skills', 'matrix', 'clear'..."
                    className="flex-1 bg-transparent text-white font-mono outline-none border-none p-0 text-xs sm:text-sm caret-emerald-400 placeholder-white/30"
                    autoFocus
                  />
                </form>
              </div>

              {/* Bottom Quick Command Pills */}
              <div className="relative z-10 mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-white/40 font-mono mr-1">Shortcuts:</span>
                  {[
                    { cmd: 'projects', label: '🚀 projects' },
                    { cmd: 'skills', label: '⚡ skills' },
                    { cmd: 'matrix', label: matrixActive ? '🛑 stop matrix' : '💚 matrix' },
                    { cmd: 'hire', label: '💼 hire' },
                    { cmd: 'whoami', label: '👤 whoami' },
                    { cmd: 'clear', label: '🧹 clear' },
                  ].map((item) => (
                    <button
                      key={item.cmd}
                      type="button"
                      onClick={() => executeCommand(item.cmd)}
                      className="px-2 py-0.5 rounded-md bg-white/[0.05] hover:bg-white/[0.12] text-white/80 hover:text-white border border-white/10 text-[11px] font-mono transition-colors active:scale-95"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <span className="text-[10px] font-mono text-white/30 hidden sm:inline">
                  Press Enter ↵ to run
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
