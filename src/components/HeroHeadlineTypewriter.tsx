import React, { useState, useEffect, useCallback } from 'react';

export const HeroHeadlineTypewriter: React.FC = () => {
  const targetWord = "Relentlessly.";
  const [typedWord, setTypedWord] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const startTyping = useCallback(() => {
    setTypedWord("");
    setIsTyping(true);
    setIsDone(false);

    let charIndex = 0;
    const initialDelay = setTimeout(() => {
      const interval = setInterval(() => {
        charIndex++;
        if (charIndex <= targetWord.length) {
          setTypedWord(targetWord.slice(0, charIndex));
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setIsDone(true);
        }
      }, 55); // Clean, punchy typewriter speed
    }, 200);

    return () => clearTimeout(initialDelay);
  }, [targetWord]);

  useEffect(() => {
    const cleanup = startTyping();
    return cleanup;
  }, [startTyping, replayKey]);

  const handleReplay = () => {
    if (!isDone) return;
    setReplayKey((k) => k + 1);
  };

  return (
    <h1
      onClick={handleReplay}
      title={isDone ? "Click to replay typing animation" : undefined}
      className={`text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05] select-none ${
        isDone ? 'cursor-pointer' : ''
      }`}
    >
      {/* Top Line: Always static and never moves */}
      <span className="block">
        <span>Think at Scale.</span>{' '}
        <span className="text-white/90">Iterate Daily.</span>
      </span>

      {/* Bottom Line: Clean text without any underline */}
      <span className="block mt-1 sm:mt-1.5 relative w-fit">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-white">
          <span>Execute </span>
          <span>{typedWord}</span>
        </span>
        {/* Cursor stays permanent in DOM so line-box height NEVER collapses */}
        <span
          className={`inline-block w-[3px] sm:w-[4px] h-[0.72em] ml-1.5 bg-cyan-300 rounded-full shadow-[0_0_14px_#38bdf8] align-baseline transition-opacity duration-150 ${
            isTyping ? 'opacity-100 animate-pulse' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
      </span>
    </h1>
  );
};
