import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const haloRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // Only enable custom cursor for non-touch desktop devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let mouseX = -100;
    let mouseY = -100;
    let haloX = -100;
    let haloY = -100;
    let animId: number;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (haloRef.current) haloRef.current.style.opacity = '1';
        if (dotRef.current) dotRef.current.style.opacity = '1';
      }

      // Check for hoverable elements
      const target = e.target as HTMLElement | null;
      if (target && haloRef.current && labelRef.current) {
        const clickable = target.closest('button, a, input, select, textarea, [role="button"], [data-cursor]');
        const customText = clickable?.getAttribute('data-cursor');

        if (customText) {
          haloRef.current.style.width = '64px';
          haloRef.current.style.height = '64px';
          haloRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
          haloRef.current.style.borderColor = 'rgba(255, 255, 255, 0.6)';
          haloRef.current.style.boxShadow = '0 0 16px rgba(255, 255, 255, 0.25)';
          labelRef.current.textContent = customText;
          labelRef.current.style.display = 'block';
        } else if (clickable) {
          haloRef.current.style.width = '42px';
          haloRef.current.style.height = '42px';
          haloRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          haloRef.current.style.borderColor = 'rgba(255, 255, 255, 0.8)';
          haloRef.current.style.boxShadow = '0 0 12px rgba(255, 255, 255, 0.2)';
          labelRef.current.style.display = 'none';
        } else {
          haloRef.current.style.width = '28px';
          haloRef.current.style.height = '28px';
          haloRef.current.style.backgroundColor = 'transparent';
          haloRef.current.style.borderColor = 'rgba(255, 255, 255, 0.4)';
          haloRef.current.style.boxShadow = 'none';
          labelRef.current.style.display = 'none';
        }
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (haloRef.current) haloRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      if (haloRef.current) haloRef.current.style.opacity = '1';
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };

    // Smooth 60fps lerp loop without triggering ANY React re-renders!
    const renderLoop = () => {
      haloX += (mouseX - haloX) * 0.24;
      haloY += (mouseY - haloY) * 0.24;

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none" aria-hidden="true">
      {/* Outer Halo Ring */}
      <div
        ref={haloRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full border border-white/40 bg-transparent opacity-0 will-change-transform flex items-center justify-center transition-[width,height,background-color,border-color,box-shadow] duration-200"
        style={{ width: '28px', height: '28px' }}
      >
        <span
          ref={labelRef}
          className="text-[10px] font-mono font-bold uppercase tracking-wider text-white select-none hidden"
        />
      </div>

      {/* Tiny Glowing Center Core Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none w-2 h-2 rounded-full bg-white opacity-0 shadow-[0_0_8px_rgba(255,255,255,0.9)] will-change-transform"
      />
    </div>
  );
};
