"use client";

import React, { useEffect, useState, useRef } from "react";

interface ModelPreloaderProps {
  progress: number;
  isReady: boolean;
  onFinished?: () => void;
}

export default function ModelPreloader({
  isReady,
  onFinished,
}: ModelPreloaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isCompletelyGone, setIsCompletelyGone] = useState(false);

  // Auto-play video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // When 3D model is loaded, smoothly bring the user to the main page
  useEffect(() => {
    if (isReady && !isFadingOut) {
      const exitTimer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.pause();
          }
          setIsCompletelyGone(true);
          onFinished?.();
        }, 700);
      }, 500);

      return () => clearTimeout(exitTimer);
    }
  }, [isReady, isFadingOut, onFinished]);

  // Fallback safety timeout (12s) to prevent being stuck on poor mobile networks
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (!isFadingOut) {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsCompletelyGone(true);
          onFinished?.();
        }, 700);
      }
    }, 12000);
    return () => clearTimeout(safetyTimer);
  }, [isFadingOut, onFinished]);

  if (isCompletelyGone) return null;

  return (
    <div
      role="status"
      aria-label="Loading Intro"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#000000] text-white select-none transition-all duration-700 ease-out overflow-hidden ${
        isFadingOut
          ? "opacity-0 scale-105 pointer-events-none blur-sm"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Seamless centered video element on pure black screen (no borders or card outlines) */}
      <div className="relative w-[88vw] max-w-[460px] sm:max-w-[520px] md:max-w-[560px] aspect-[4/3] flex items-center justify-center bg-black overflow-hidden">
        {/* Video Element */}
        <video
          ref={videoRef}
          src="/intro.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={(e) => {
            e.currentTarget.play().catch(() => {});
          }}
          className="w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Small spinning icon in the center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
            {/* Spinning outer ring */}
            <div className="w-full h-full rounded-full border-[2.5px] border-white/25 border-t-white border-r-white/80 animate-spin shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
            {/* Small center dot */}
            <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
          </div>
        </div>
      </div>
    </div>
  );
}
