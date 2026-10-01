import React, { useState, useEffect, useCallback } from 'react';

interface CursiveTypewriterProps {
  text?: string;
  speed?: number; // ms per character
  delay?: number; // initial delay before start
  className?: string;
  showPenCursor?: boolean;
  showInkUnderline?: boolean;
  enableClickReplay?: boolean;
  onComplete?: () => void;
  onClick?: (e: React.MouseEvent) => void;
  allowWrap?: boolean;
}

export const CursiveTypewriter: React.FC<CursiveTypewriterProps> = ({
  text = "Rehan Sheikh",
  speed = 35,
  delay = 200,
  className = "",
  showPenCursor = true,
  showInkUnderline = true,
  enableClickReplay = true,
  onComplete,
  onClick,
  allowWrap,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  // If text is long (e.g. quote), wrap naturally so it never clips
  const shouldWrap = allowWrap !== undefined ? allowWrap : text.length > 25;

  const startTyping = useCallback(() => {
    setIsTyping(true);
    setIsComplete(false);
    setDisplayedText("");

    let charIndex = 0;
    const intervalId = setInterval(() => {
      if (charIndex <= text.length) {
        setDisplayedText(text.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(intervalId);
        setIsTyping(false);
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed, onComplete]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      startTyping();
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [startTyping, delay, replayKey]);

  const handleReplay = (e: React.MouseEvent) => {
    if (onClick) onClick(e);
    if (!enableClickReplay || isTyping) return;
    setReplayKey((k) => k + 1);
  };

  return (
    <span
      onClick={handleReplay}
      title={enableClickReplay ? "Click to replay handwriting" : undefined}
      className={`relative ${
        shouldWrap ? 'inline-block w-full max-w-full' : 'inline-flex items-baseline'
      } font-['Caveat',cursive] select-none ${
        enableClickReplay ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Invisible phantom text keeping exact width & height locked at all times */}
      <span
        className={`invisible select-none pointer-events-none tracking-wide ${
          shouldWrap ? 'block' : 'whitespace-nowrap pr-2'
        }`}
        aria-hidden="true"
      >
        {text}
      </span>

      {/* Live Typed Characters positioned on top */}
      <span
        className={`absolute left-0 top-0 ${
          shouldWrap ? 'w-full h-full block' : 'whitespace-nowrap pr-2'
        } z-10 tracking-wide`}
      >
        {displayedText}
        {showPenCursor && isTyping && (
          <span className="inline-block w-[3px] h-[0.82em] ml-1 bg-gradient-to-b from-cyan-300 via-emerald-400 to-amber-300 rounded-full shadow-[0_0_12px_#38bdf8] animate-pulse align-middle" />
        )}
      </span>

      {/* Elegant Ink Underline drawn when complete */}
      {showInkUnderline && (
        <svg
          className={`absolute -bottom-1.5 left-0 w-full h-3 pointer-events-none transition-opacity duration-500 overflow-visible ${
            isComplete ? 'opacity-100' : 'opacity-0'
          }`}
          viewBox="0 0 100 8"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M 1 4 Q 25 1, 50 4 T 99 4"
            stroke="url(#cursiveInkGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: isComplete ? 0 : 100,
              transition: 'stroke-dashoffset 0.55s ease-out'
            }}
          />
          <defs>
            <linearGradient id="cursiveInkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </span>
  );
};
