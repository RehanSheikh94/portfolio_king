import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import confetti from 'canvas-confetti';
import { Code2, Satellite, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface SpaceOrbitalPortalProps {
  onTapCallback?: () => void;
}

export const SpaceOrbitalPortal: React.FC<SpaceOrbitalPortalProps> = ({ onTapCallback }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [avatarError, setAvatarError] = useState(false);
  const [warpActive, setWarpActive] = useState(false);
  const [shockwaves, setShockwaves] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [floatingOrbs, setFloatingOrbs] = useState<Array<{ id: number; x: number; y: number; glyph: string }>>([]);

  // 3D Gyroscope Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for natural celestial floating feel
  const springConfig = { damping: 20, stiffness: 120, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, 85]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, 85]), springConfig);

  // Background Cosmic Starfield & Nebula Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = 460);
    const height = (canvas.height = 460);

    // Generate celestial stars
    const stars: Array<{ x: number; y: number; radius: number; alpha: number; speed: number; pulse: number }> = [];
    for (let i = 0; i < 65; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Occasional cosmic shooting star
    let shootingStar: { x: number; y: number; len: number; speed: number; opacity: number; active: boolean } | null = null;
    let nextShootingStarTime = Date.now() + 2000;

    let isVisible = true;
    let isRunning = false;

    const render = () => {
      if (!isVisible) {
        isRunning = false;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Deep Space Cosmic Nebula Dust (Radial glow)
      const nebulaGrad = ctx.createRadialGradient(width / 2, height / 2, 40, width / 2, height / 2, 210);
      nebulaGrad.addColorStop(0, 'rgba(6, 182, 212, 0.12)'); // Electric Cyan
      nebulaGrad.addColorStop(0.45, 'rgba(147, 51, 234, 0.08)'); // Cosmic Violet
      nebulaGrad.addColorStop(0.75, 'rgba(16, 185, 129, 0.04)'); // Nebula Aurora
      nebulaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, width, height);

      // Render stars
      stars.forEach((star) => {
        star.pulse += star.speed;
        const currentAlpha = star.alpha + Math.sin(star.pulse) * 0.25;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 242, 254, ${Math.max(0.1, Math.min(1, currentAlpha))})`;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = star.radius > 1.2 ? 6 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Spawn / render shooting star
      const now = Date.now();
      if (!shootingStar && now > nextShootingStarTime) {
        shootingStar = {
          x: Math.random() * (width * 0.6) + width * 0.2,
          y: Math.random() * (height * 0.4),
          len: Math.random() * 40 + 25,
          speed: Math.random() * 4 + 3.5,
          opacity: 1,
          active: true,
        };
        nextShootingStarTime = now + Math.random() * 4500 + 3000;
      }

      if (shootingStar && shootingStar.active) {
        ctx.save();
        ctx.beginPath();
        const grad = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          shootingStar.x - shootingStar.len * 0.7,
          shootingStar.y - shootingStar.len * 0.7
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
        grad.addColorStop(0.4, `rgba(56, 189, 248, ${shootingStar.opacity * 0.8})`);
        grad.addColorStop(1, 'rgba(6, 182, 212, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x - shootingStar.len * 0.7, shootingStar.y - shootingStar.len * 0.7);
        ctx.stroke();
        ctx.restore();

        shootingStar.x += shootingStar.speed;
        shootingStar.y += shootingStar.speed;
        shootingStar.opacity -= 0.025;

        if (shootingStar.opacity <= 0) {
          shootingStar = null;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!isRunning && isVisible) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    }, { threshold: 0.05 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    } else {
      startLoop();
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle 3D Parallax Tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Cosmic Hyperspace Sound Synthesis
  const playCosmicWarpAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Deep resonant sub-bass warp pulse
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(140, ctx.currentTime);
      subOsc.frequency.exponentialRampToValueAtTime(42, ctx.currentTime + 0.35);

      subGain.gain.setValueAtTime(0.12, ctx.currentTime);
      subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start();
      subOsc.stop(ctx.currentTime + 0.45);

      // High crystalline celestial chime
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = 'triangle';
      chimeOsc.frequency.setValueAtTime(880, ctx.currentTime);
      chimeOsc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.18);

      chimeGain.gain.setValueAtTime(0.07, ctx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeOsc.start();
      chimeOsc.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  // Cosmic Supernova Warp Trigger on Tap
  const handlePortalTap = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setWarpActive(true);
      setTimeout(() => setWarpActive(false), 650);

      // Play sci-fi warp acoustic feedback
      playCosmicWarpAudio();

      // Generate expanding gravitational shockwave
      const rect = containerRef.current?.getBoundingClientRect();
      const clickX = rect ? e.clientX - rect.left : 140;
      const clickY = rect ? e.clientY - rect.top : 140;

      const shockwaveId = Date.now() + Math.random();
      setShockwaves((prev) => [...prev.slice(-3), { id: shockwaveId, x: clickX, y: clickY }]);
      setTimeout(() => {
        setShockwaves((prev) => prev.filter((s) => s.id !== shockwaveId));
      }, 900);

      // Cosmic floating stardust glyphs
      const cosmicGlyphs = ['✦', '✧', '🪐', '🚀', '✨', '⚡', '🌌', '🛰️', '⬡'];
      const chosenGlyph = cosmicGlyphs[Math.floor(Math.random() * cosmicGlyphs.length)];
      const orbId = Date.now() + Math.random();
      setFloatingOrbs((prev) => [
        ...prev.slice(-5),
        { id: orbId, x: clickX, y: clickY, glyph: chosenGlyph },
      ]);
      setTimeout(() => {
        setFloatingOrbs((prev) => prev.filter((o) => o.id !== orbId));
      }, 850);

      // Confetti burst with deep space palette (cyan, violet, emerald, starlight gold)
      let originX = 0.8;
      let originY = 0.35;
      if (rect) {
        originX = (rect.left + rect.width / 2) / window.innerWidth;
        originY = (rect.top + rect.height / 2) / window.innerHeight;
      }

      confetti({
        particleCount: 50,
        spread: 80,
        origin: { x: originX, y: originY },
        colors: ['#38bdf8', '#818cf8', '#34d399', '#f59e0b', '#c084fc', '#ffffff'],
        scalar: 0.95,
        startVelocity: 32,
      });

      if (onTapCallback) onTapCallback();
    },
    [onTapCallback]
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center select-none py-2 sm:py-4 pb-6"
      style={{ perspective: 1100 }}
    >
      {/* Dynamic 3D Preserved Space Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onClick={handlePortalTap}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handlePortalTap(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        className="relative group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full"
      >
        {/* Background Starfield & Deep-Space Nebula Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute -inset-16 pointer-events-none rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-700 -z-10"
        />

        {/* Ambient Hyper-Atmospheric Cosmic Aura Halo */}
        <div
          className={`absolute -inset-8 rounded-full transition-all duration-700 blur-3xl pointer-events-none ${
            warpActive
              ? 'bg-gradient-to-r from-cyan-400/50 via-purple-500/40 to-emerald-400/50 scale-125 opacity-100'
              : 'bg-gradient-to-tr from-cyan-500/25 via-indigo-500/20 to-purple-600/25 opacity-70 group-hover:opacity-95 group-hover:scale-105'
          }`}
        />

        {/* --- CELESTIAL PLANETARY & HUD ORBITAL SYSTEM --- */}

        {/* 1. Tilted 3D Planetary Ring (Saturn / Exoplanet Celestial Orbit) */}
        <div
          className="absolute -inset-8 sm:-inset-10 pointer-events-none transition-transform duration-700 group-hover:scale-105"
          style={{
            transform: 'rotateX(72deg) rotateZ(-28deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Main Planetary Dust Ring with Glowing Edge */}
          <div className="w-full h-full rounded-full border-2 border-cyan-400/40 shadow-[0_0_25px_rgba(56,189,248,0.45)] ring-1 ring-purple-400/30 animate-[spin_20s_linear_infinite]" />
          
          {/* Secondary Faint Outer Debris Ring */}
          <div className="absolute -inset-2 rounded-full border border-dashed border-cyan-300/25 animate-[spin_35s_linear_infinite_reverse]" />

          {/* Orbital Satellite Moon traveling along the planetary ring */}
          <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#38bdf8] ring-2 ring-cyan-400/50" />
              <span className="absolute w-4 h-4 rounded-full bg-cyan-400/30 animate-ping" />
            </div>
          </div>
        </div>

        {/* 2. Frontal Sci-Fi Celestial Navigation Astrolabe / HUD Sextant Ring */}
        <div className="absolute -inset-4 sm:-inset-5 rounded-full border border-cyan-500/20 pointer-events-none animate-[spin_40s_linear_infinite]" />

        {/* 3. Counter-rotating Precision Telemetry Segmented Ring */}
        <div className="absolute -inset-2 sm:-inset-2.5 rounded-full border border-dashed border-emerald-400/30 pointer-events-none animate-[spin_28s_linear_infinite_reverse]" />

        {/* 4. Pulsing Gravitational Wave Bezel */}
        <div className="absolute -inset-1 rounded-full border border-purple-400/30 pointer-events-none group-hover:border-cyan-400/50 transition-colors" />

        {/* --- MAIN SPACE OBSERVATORY CAPSULE CONTAINER --- */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full p-2 bg-gradient-to-tr from-cyan-950/80 via-slate-900/90 to-purple-950/80 shadow-[0_0_40px_rgba(6,182,212,0.3)] backdrop-blur-xl border border-cyan-400/40 transition-all duration-300"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Gravitational Shockwaves expanding upon tap */}
          {shockwaves.map((sw) => (
            <motion.div
              key={sw.id}
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-cyan-300 pointer-events-none shadow-[0_0_20px_#38bdf8] z-30"
            />
          ))}

          {/* Floating Stardust Glyph Particles */}
          {floatingOrbs.map((orb) => (
            <motion.div
              key={orb.id}
              initial={{ opacity: 1, scale: 0.6, y: 0, x: 0 }}
              animate={{
                opacity: 0,
                scale: 1.8,
                y: -85 - Math.random() * 30,
                x: (Math.random() - 0.5) * 80,
                rotate: (Math.random() - 0.5) * 60,
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ left: orb.x, top: orb.y }}
              className="pointer-events-none absolute z-40 text-xl font-bold text-cyan-200 select-none drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
            >
              {orb.glyph}
            </motion.div>
          ))}

          {/* Inner Spherical Glass Observatory Frame */}
          <div className="relative w-full h-full rounded-full overflow-hidden bg-[#050811] border-2 border-cyan-300/40 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
            {!avatarError ? (
              <img
                src={siteConfig.avatarUrl}
                alt={siteConfig.name}
                onError={() => setAvatarError(true)}
                className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[1.02] saturate-[1.05] group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
            ) : (
              /* Fallback Cybernetic Astronaut HUD Profile */
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#050a18] via-[#091226] to-[#160b26] p-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] mb-2">
                  <Code2 className="w-8 h-8 text-cyan-300 animate-pulse" />
                </div>
                <span className="font-['Caveat',cursive] text-3xl font-bold text-white tracking-wide">
                  Rehan Sheikh
                </span>
                <span className="text-[11px] font-mono text-cyan-300/80 tracking-widest uppercase mt-0.5">
                  Deep Space Architect
                </span>
              </div>
            )}

            {/* Astronaut Helmet Visor Holographic Glare (moves dynamically with mouse 3D tilt) */}
            <motion.div
              style={{
                background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255, 255, 255, 0.28) 0%, rgba(56, 189, 248, 0.12) 35%, transparent 65%)`,
              }}
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-60"
            />

            {/* Diagonal Prismatic Glass Flare Line */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-cyan-400/10 pointer-events-none" />

            {/* Dark Deep-Space Horizon Shadow at Bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#04060d]/85 via-transparent to-transparent pointer-events-none" />

            {/* Space Targeting Reticle Crosshairs in 4 Quadrants */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-cyan-400/40 pointer-events-none">
              ┌
            </div>
            <div className="absolute top-3 right-3 text-[10px] font-mono text-cyan-400/40 pointer-events-none">
              ┐
            </div>
            <div className="absolute bottom-5 left-3 text-[10px] font-mono text-cyan-400/40 pointer-events-none">
              └
            </div>
            <div className="absolute bottom-5 right-3 text-[10px] font-mono text-cyan-400/40 pointer-events-none">
              ┘
            </div>
          </div>

          {/* High-Tech Futuristic Space Telemetry Badge */}
          <div
            className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full bg-[#050811]/95 backdrop-blur-2xl border border-cyan-400/50 shadow-[0_0_25px_rgba(6,182,212,0.35)] flex items-center gap-2.5 text-xs font-mono text-white tracking-wide transition-all group-hover:border-cyan-300 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] z-20"
            style={{ transform: 'translateZ(25px)' }}
          >
            {/* Pulsing Quantum Link Beacon */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_10px_#38bdf8]" />
            </span>

            {/* Role & Station Metadata */}
            <span className="font-semibold text-white/95 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-300" />
              <span>Full-Stack & DSA Architect</span>
            </span>

            <span className="text-white/30">•</span>

            <span className="text-cyan-300 font-medium flex items-center gap-1">
              <Satellite className="w-3 h-3 text-cyan-400" />
              <span>YCCE '28</span>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
