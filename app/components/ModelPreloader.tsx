"use client";

import React, { useEffect, useState } from "react";

interface ModelPreloaderProps {
  progress: number;
  isReady: boolean;
  onFinished?: () => void;
}

export default function ModelPreloader({
  progress,
  isReady,
  onFinished,
}: ModelPreloaderProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isCompletelyGone, setIsCompletelyGone] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smoothly animate displayed progress toward actual progress
  useEffect(() => {
    const target = isReady ? 100 : Math.max(displayProgress, progress);
    if (target <= displayProgress) return;
    const step = Math.ceil((target - displayProgress) / 6);
    const id = setTimeout(() => setDisplayProgress((p) => Math.min(p + step, target)), 40);
    return () => clearTimeout(id);
  }, [progress, isReady, displayProgress]);

  // When 3D model is loaded, fade out and reveal the page
  useEffect(() => {
    if (isReady && !isFadingOut) {
      const exitTimer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsCompletelyGone(true);
          onFinished?.();
        }, 800);
      }, 500);
      return () => clearTimeout(exitTimer);
    }
  }, [isReady, isFadingOut, onFinished]);

  // Safety fallback: dismiss after 15s regardless
  useEffect(() => {
    const safety = setTimeout(() => {
      if (!isFadingOut) {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsCompletelyGone(true);
          onFinished?.();
        }, 800);
      }
    }, 15000);
    return () => clearTimeout(safety);
  }, [isFadingOut, onFinished]);

  if (isCompletelyGone) return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center select-none transition-[opacity,transform] duration-[800ms] ease-out ${
        isFadingOut
          ? "opacity-0 scale-[1.03] pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Subtle corner decorations matching hero editorial frame */}
      <span className="absolute top-5 left-5 w-5 h-5 border-t border-l border-white/20" />
      <span className="absolute top-5 right-5 w-5 h-5 border-t border-r border-white/20" />
      <span className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-white/20" />
      <span className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-white/20" />

      {/* Center content */}
      <div className="flex flex-col items-center gap-8 w-full max-w-xs px-6">

        {/* Name — matches hero header style */}
        <div className="text-center">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 mb-2">
            Portfolio
          </p>
          <h1 className="text-xl sm:text-2xl font-bold tracking-[0.25em] uppercase text-white">
            James Aathithyan
          </h1>
        </div>

        {/* Progress bar track */}
        <div className="w-full flex flex-col items-center gap-3">
          <div className="w-full h-[1px] bg-white/10 relative overflow-hidden rounded-full">
            {/* Glowing fill */}
            <div
              className="absolute left-0 top-0 h-full bg-white transition-all duration-300 ease-out rounded-full"
              style={{ width: `${displayProgress}%` }}
            />
            {/* Leading cyan glow dot */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.9)] transition-all duration-300 ease-out"
              style={{ left: `calc(${displayProgress}% - 1.5px)` }}
            />
          </div>

          {/* Progress label */}
          <div className="flex items-center justify-between w-full">
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/25">
              Loading 3D Scene
            </span>
            <span className="text-[9px] font-mono tracking-wider text-white/40">
              {displayProgress}%
            </span>
          </div>
        </div>

        {/* Minimal spinning indicator */}
        <div className="relative w-5 h-5 flex items-center justify-center">
          <div className="w-full h-full rounded-full border border-white/15 border-t-white/70 animate-spin" />
          <div className="absolute w-1 h-1 rounded-full bg-cyan-400/80 shadow-[0_0_6px_rgba(0,240,255,0.7)]" />
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <span className="text-[8px] font-mono tracking-[0.25em] uppercase text-white/15">
          Full-Stack Developer
        </span>
      </div>
    </div>
  );
}

