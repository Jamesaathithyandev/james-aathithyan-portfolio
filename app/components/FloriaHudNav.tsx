"use client";

import React, { useEffect, useState, useRef } from "react";

interface Chapter {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  dotColor: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: "hero",
    num: "01",
    title: "HERO",
    subtitle: "James Aathithyan // Full-Stack Dev",
    dotColor: "bg-cyan-400",
  },
  {
    id: "explore",
    num: "02",
    title: "ABOUT",
    subtitle: "B.Tech IT • Academic Journey",
    dotColor: "bg-pink-400",
  },
  {
    id: "projects",
    num: "03",
    title: "PROJECTS",
    subtitle: "MERN Stack, Work & Skills",
    dotColor: "bg-emerald-400",
  },
  {
    id: "contact",
    num: "04",
    title: "CONTACT",
    subtitle: "Direct Inquiries & Channels",
    dotColor: "bg-violet-400",
  },
];

export default function FloriaHudNav() {
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Track overall scroll percentage & active section in real-time
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100) : 0;
      setScrollPercent(Math.round(progress));

      // Determine active section accurately using getBoundingClientRect relative to viewport
      const exploreEl = document.getElementById("explore");
      const projectsEl = document.getElementById("projects");
      const contactEl = document.getElementById("contact");

      const windowH = window.innerHeight;
      const triggerLine = windowH * 0.45;

      if (contactEl && contactEl.getBoundingClientRect().top <= triggerLine + 100) {
        setActiveChapterIndex(3); // 04 / CONTACT
      } else if (projectsEl && projectsEl.getBoundingClientRect().top <= triggerLine) {
        setActiveChapterIndex(2); // 03 / PROJECTS
      } else if (exploreEl && exploreEl.getBoundingClientRect().top <= triggerLine) {
        setActiveChapterIndex(1); // 02 / ABOUT (EXHIBITION STORY)
      } else {
        setActiveChapterIndex(0); // 01 / HERO
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigateTo = (id: string) => {
    setIsOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  // SVG Circular progress math
  const radius = 11;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <div ref={menuRef} className="fixed top-4 right-3 sm:top-6 sm:right-8 z-50 select-none">
      {/* HUD Navigation Pill matching the exact screenshot design */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-black/85 hover:bg-black/95 backdrop-blur-xl border border-white/20 hover:border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.85)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.95)] transition-all duration-300 cursor-pointer"
        role="button"
        aria-label="Chapter navigation menu"
        aria-expanded={isOpen}
      >
        {/* 1. Circular Progress Meter with Percentage */}
        <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 28 28">
            {/* Background track */}
            <circle
              cx="14"
              cy="14"
              r={radius}
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="2.5"
            />
            {/* Active progress stroke */}
            <circle
              cx="14"
              cy="14"
              r={radius}
              fill="transparent"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-150 ease-out"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[7.5px] font-mono font-bold text-white tracking-tighter">
            {scrollPercent}%
          </span>
        </div>

        {/* 2. Active Pulsing Chapter Dot */}
        <span
          className={`w-1.5 h-1.5 rounded-full ${activeChapter.dotColor} animate-pulse shrink-0 shadow-[0_0_8px_currentColor]`}
        />

        {/* 3. Chapter Number & Section Title */}
        <div className="flex items-center gap-1.5 text-[9.5px] sm:text-[10px] font-mono tracking-wider">
          <span className="text-zinc-400 font-bold">{activeChapter.num}</span>
          <span className="text-zinc-600 font-light">/</span>
          <span className="text-white font-bold tracking-widest uppercase">
            {activeChapter.title}
          </span>
        </div>

        {/* 4. Mini Live Soundwave Equalizer */}
        <div className="flex items-end gap-[1.5px] h-3 px-0.5 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="w-[1.5px] bg-white rounded-full animate-eq-1" />
          <span className="w-[1.5px] bg-white rounded-full animate-eq-2" />
          <span className="w-[1.5px] bg-white rounded-full animate-eq-3" />
          <span className="w-[1.5px] bg-white rounded-full animate-eq-4" />
        </div>

        {/* 5. Circular Info / Menu Trigger Button */}
        <div
          className={`w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-serif transition-colors duration-200 shrink-0 ${
            isOpen ? "bg-white text-black border-white" : "bg-white/10 text-white group-hover:bg-white/20"
          }`}
        >
          {isOpen ? "✕" : "ⓘ"}
        </div>
      </div>

      {/* Chapter Navigation Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2.5 w-[280px] sm:w-[320px] max-w-[calc(100vw-2rem)] rounded-2xl bg-[#0a0a0c]/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.95)] p-3 text-white animate-fade-in overflow-hidden z-50">
          <div className="px-2.5 py-1.5 pb-2 border-b border-white/10 flex items-center justify-between text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
            <span>EXPEDITION CHAPTERS</span>
            <span className="text-emerald-400">ONLINE</span>
          </div>

          {/* Chapter Links */}
          <div className="mt-2 space-y-1">
            {CHAPTERS.map((ch, idx) => {
              const isActive = idx === activeChapterIndex;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => navigateTo(ch.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 text-left group ${
                    isActive
                      ? "bg-white/15 border border-white/20 text-white"
                      : "hover:bg-white/5 border border-transparent text-zinc-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${ch.dotColor} ${
                        isActive ? "shadow-[0_0_8px_currentColor] animate-pulse" : "opacity-60"
                      }`}
                    />
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold tracking-wider">
                        <span className="text-zinc-500 font-bold">[ {ch.num} ]</span>
                        <span className={isActive ? "text-white" : "text-zinc-300"}>
                          {ch.title}
                        </span>
                      </div>
                      <div className="text-[8.5px] font-mono text-zinc-500 mt-0.5">
                        {ch.subtitle}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-xs transition-transform duration-200 ${
                      isActive
                        ? "translate-x-0 text-white"
                        : "opacity-40 group-hover:opacity-100 group-hover:translate-x-1"
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick External Links Sub-footer */}
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between px-2 text-[9px] font-mono text-zinc-400">
            <span className="text-zinc-500">CHANNELS:</span>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Jamesaathithyandev"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="hover:text-white transition-colors"
              >
                /GITHUB
              </a>
              <a
                href="https://www.linkedin.com/in/james-aathithyan-1412931b9/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="hover:text-white transition-colors"
              >
                /LINKEDIN
              </a>
              <a
                href="mailto:jamesaathithyandev@gmail.com"
                onClick={() => setIsOpen(false)}
                className="hover:text-white transition-colors"
              >
                /EMAIL
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
