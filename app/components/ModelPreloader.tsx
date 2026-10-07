"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isCompletelyGone, setIsCompletelyGone] = useState(false);
  const [bgColor, setBgColor] = useState<string>("#000000");

  // Sample the video's corner pixel to extract background color for seamless blending
  const sampleBgColor = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 8;
    canvas.height = 8;
    try {
      ctx.drawImage(video, 0, 0, 8, 8);
      const px = ctx.getImageData(0, 0, 1, 1).data;
      const hex = `#${px[0].toString(16).padStart(2, "0")}${px[1].toString(16).padStart(2, "0")}${px[2].toString(16).padStart(2, "0")}`;
      setBgColor(hex);
    } catch {
      // Security error on cross-origin — keep black
    }
  }, []);

  // Auto-play video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tryPlay = () => video.play().catch(() => {});
    video.addEventListener("canplay", tryPlay, { once: true });
    video.addEventListener("loadeddata", sampleBgColor, { once: true });
    tryPlay();
    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", sampleBgColor);
    };
  }, [sampleBgColor]);

  // When 3D model is loaded, smoothly fade out and reveal main page
  useEffect(() => {
    if (isReady && !isFadingOut) {
      const exitTimer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          if (videoRef.current) videoRef.current.pause();
          setIsCompletelyGone(true);
          onFinished?.();
        }, 800);
      }, 400);
      return () => clearTimeout(exitTimer);
    }
  }, [isReady, isFadingOut, onFinished]);

  // Safety fallback after 15s in case model loading stalls
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (!isFadingOut) {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsCompletelyGone(true);
          onFinished?.();
        }, 800);
      }
    }, 15000);
    return () => clearTimeout(safetyTimer);
  }, [isFadingOut, onFinished]);

  if (isCompletelyGone) return null;

  return (
    <div
      role="status"
      aria-label="Loading Intro"
      style={{ backgroundColor: bgColor }}
      className={`fixed inset-0 z-[100] flex items-center justify-center select-none transition-[opacity,transform] duration-[800ms] ease-out overflow-hidden ${
        isFadingOut
          ? "opacity-0 scale-[1.04] pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Hidden canvas used only for background color sampling */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Full-screen looping video — fills the viewport, background blends with sampled bgColor */}
      <video
        ref={videoRef}
        src="/intro.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={sampleBgColor}
        onCanPlay={(e) => {
          e.currentTarget.play().catch(() => {});
        }}
        className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
      />

      {/* Small spinning loading indicator — always centered */}
      <div className="relative z-10 flex items-center justify-center pointer-events-none">
        <div className="relative w-9 h-9 flex items-center justify-center">
          <div className="w-full h-full rounded-full border-[2.5px] border-white/20 border-t-white border-r-white/70 animate-spin shadow-[0_0_18px_rgba(255,255,255,0.35)]" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
        </div>
      </div>
    </div>
  );
}
