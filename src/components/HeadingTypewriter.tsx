import React, { useState, useEffect, useRef } from 'react';

interface HeadingTypewriterProps {
  text: string;
  gradientClassName?: string;
  cursorColorClassName?: string;
  className?: string;
  speed?: number;
  delay?: number;
  asBlockOnMobile?: boolean;
}

export const HeadingTypewriter: React.FC<HeadingTypewriterProps> = ({
  text,
  gradientClassName = "from-amber-300 via-emerald-300 to-cyan-400",
  cursorColorClassName = "from-emerald-300 to-cyan-400",
  className = "",
  speed = 50,
  delay = 180,
  asBlockOnMobile = false,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const cleanup = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const startTyping = () => {
    cleanup();
    setIsTyping(true);
    setDisplayedText("");
    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      if (i <= text.length) {
        setDisplayedText(text.slice(0, i));
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsTyping(false);
      }
    }, speed);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let wasIntersecting = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Re-trigger typing every time it enters the viewport
          cleanup();
          timerRef.current = setTimeout(() => {
            startTyping();
          }, delay);
          wasIntersecting = true;
        } else if (wasIntersecting) {
          // Scrolled out of view - clean up and reset for next entry
          cleanup();
          setIsTyping(false);
          setDisplayedText("");
          wasIntersecting = false;
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cleanup();
    };
  }, [text, speed, delay]);

  const handleReplay = () => {
    if (isTyping) return;
    startTyping();
  };

  return (
    <span
      ref={containerRef}
      onClick={handleReplay}
      title="Click to replay typing animation"
      className={`relative inline-block align-baseline cursor-pointer select-none ${
        asBlockOnMobile ? 'block sm:inline-block' : ''
      } ${className}`}
    >
      {/* Invisible phantom text to lock width & height so NOTHING ever shifts or jumps */}
      <span className="invisible select-none pointer-events-none" aria-hidden="true">
        {text}
      </span>

      {/* Live typing text positioned over phantom */}
      <span
        className={`absolute left-0 top-0 whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r ${gradientClassName} font-black`}
      >
        {displayedText}
        <span
          className={`inline-block w-[3px] sm:w-[4px] h-[0.78em] ml-1 bg-gradient-to-b ${cursorColorClassName} rounded-full align-middle transition-opacity duration-150 ${
            isTyping ? 'opacity-100 animate-pulse' : 'opacity-70 animate-pulse'
          }`}
          aria-hidden="true"
        />
      </span>
    </span>
  );
};
