"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Three.js 3D model component (client-only)
const JamesModel = dynamic(() => import("./components/JamesModel"), {
  ssr: false,
});

import WovenValleyScrollStory from "./components/WovenValleyScrollStory";
import FloriaDiscoveryAndFooter from "./components/FloriaDiscoveryAndFooter";
import FloriaHudNav from "./components/FloriaHudNav";
import ModelPreloader from "./components/ModelPreloader";

export default function FloriaHeroPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);

  // 3D Model Loading State for High-Tech Preloader
  const [modelProgress, setModelProgress] = useState<number>(0);
  const [isModelReady, setIsModelReady] = useState<boolean>(false);

  // Position and animation state for smooth lerp
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const isVisible = useRef(false);
  const currentOpacity = useRef(0);
  const animFrameId = useRef<number | null>(null);

  const isHeroInView = useRef(true);

  useEffect(() => {
    const heroEl = heroRef.current;
    const revealEl = revealLayerRef.current;
    if (!heroEl || !revealEl) return;

    // Observe hero visibility: pause loop completely when scrolled away
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroInView.current = entry.isIntersecting;
        if (entry.isIntersecting && !animFrameId.current) {
          animFrameId.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(heroEl);

    // Handle mouse move across the hero container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      targetPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      if (!isVisible.current) {
        isVisible.current = true;
        if (currentOpacity.current <= 0.05) {
          currentPos.current = { ...targetPos.current };
        }
      }
      if (!animFrameId.current && isHeroInView.current) {
        animFrameId.current = requestAnimationFrame(animate);
      }
    };

    // Handle mouse leaving the hero
    const handleMouseLeave = () => {
      isVisible.current = false;
    };

    // Handle touch on mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = heroEl.getBoundingClientRect();
      const touch = e.touches[0];
      targetPos.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
      if (!isVisible.current) {
        isVisible.current = true;
        if (currentOpacity.current <= 0.05) {
          currentPos.current = { ...targetPos.current };
        }
      }
      if (!animFrameId.current && isHeroInView.current) {
        animFrameId.current = requestAnimationFrame(animate);
      }
    };

    const handleTouchEnd = () => {
      isVisible.current = false;
    };

    heroEl.addEventListener("mousemove", handleMouseMove, { passive: true });
    heroEl.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    heroEl.addEventListener("touchmove", handleTouchMove, { passive: true });
    heroEl.addEventListener("touchstart", handleTouchMove, { passive: true });
    heroEl.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Easing/lerp loop at native display refresh rate
    const lerpFactor = 0.16; // Smooth easing
    const opacitySpeed = 0.12;

    const animate = () => {
      if (!isHeroInView.current) {
        animFrameId.current = null;
        return;
      }

      // Lerp position toward target cursor coordinates
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor;

      // Lerp opacity smoothly
      const targetOpacity = isVisible.current ? 1 : 0;
      currentOpacity.current += (targetOpacity - currentOpacity.current) * opacitySpeed;

      if (revealEl) {
        const curX = currentPos.current.x;
        const curY = currentPos.current.y;
        const opacity = currentOpacity.current;

        if (opacity > 0.005) {
          const mask = `radial-gradient(circle 260px at ${curX}px ${curY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 140px, rgba(0,0,0,0.65) 200px, rgba(0,0,0,0.2) 240px, transparent 260px)`;
          revealEl.style.maskImage = mask;
          revealEl.style.webkitMaskImage = mask;
          revealEl.style.opacity = opacity.toFixed(3);
        } else {
          revealEl.style.opacity = "0";
        }
      }

      // Idle when completely faded out and mouse outside
      if (!isVisible.current && currentOpacity.current < 0.005) {
        animFrameId.current = null;
        return;
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      heroEl.removeEventListener("mousemove", handleMouseMove);
      heroEl.removeEventListener("mouseleave", handleMouseLeave);
      heroEl.removeEventListener("touchmove", handleTouchMove);
      heroEl.removeEventListener("touchstart", handleTouchMove);
      heroEl.removeEventListener("touchend", handleTouchEnd);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full bg-[#000000] text-white selection:bg-white selection:text-black overflow-x-clip">
      {/* High-Tech Cybernetic Loading Screen: Only closes once 84MB 3D Model is fully parsed */}
      <ModelPreloader progress={modelProgress} isReady={isModelReady} />

      {/* Global Interactive Top-Right HUD Navigation Pill & Chapter Quick-Switcher */}
      <FloriaHudNav />

      {/* =========================================================================
          HERO SECTION (Unmodified, exactly as configured)
      ========================================================================= */}
      <section id="hero" className="min-h-screen w-full bg-[#000000] text-white flex items-center justify-center p-2.5 sm:p-6 md:p-8 lg:p-10 selection:bg-white selection:text-black overflow-hidden relative">
        {/* =========================================================================
            EDITORIAL FRAMED CANVAS CONTAINER
            Matching the exact inset thin bounding box from the reference image
        ========================================================================= */}
        <div
          ref={heroRef}
          className="relative w-full max-w-[1440px] min-h-[calc(100vh-1.25rem)] sm:min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-4rem)] editorial-frame flex flex-col justify-between p-3.5 sm:p-10 md:p-12 lg:p-14 xl:p-16 overflow-hidden select-none"
        >
        {/* =========================================================================
            LAYER 0: BASE IMAGE (BG_IMAGE_2 - Nighttime Scene at all times)
            Visible at all times as requested
        ========================================================================= */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/bg-hero-reveal.jpg"
            alt="Floria Sanctuary Night"
            className="w-full h-full object-cover object-center select-none"
          />
        </div>

        {/* =========================================================================
            LAYER 1: REVEAL IMAGE (BG_IMAGE_1 - Daytime Scene revealed on hover)
            Revealed exclusively through a 260px soft feathered circular spotlight
            centered on cursor with smooth lerp easing. Invisible outside spotlight.
        ========================================================================= */}
        <div
          ref={revealLayerRef}
          className="absolute inset-0 z-[1] overflow-hidden pointer-events-none will-change-[mask-image,opacity]"
          style={{
            opacity: 0,
            maskImage: "radial-gradient(circle 0px at 0px 0px, transparent, transparent)",
            WebkitMaskImage: "radial-gradient(circle 0px at 0px 0px, transparent, transparent)",
          }}
          aria-hidden="true"
        >
          <img
            src="/bg-hero-base.jpg"
            alt="Floria Sanctuary Day Reveal"
            className="w-full h-full object-cover object-center select-none"
          />
        </div>

        {/* Subtle cinematic gradient vignette for text legibility over both images */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-black/85 via-black/20 to-black/60"
          aria-hidden="true"
        ></div>

        {/* =========================================================================
            LAYER 3: 3D JAMES MODEL (public/3D-model/james3D.glb)
            Layered at z-[15]: In front of background headline, behind foreground UI
            Responsive mobile scale and position to keep the head model completely visible
        ========================================================================= */}
        <div
          className="absolute bottom-0 sm:bottom-0 left-1/2 -translate-x-1/2 translate-y-0 sm:translate-y-[5%] flex items-end justify-center pointer-events-none select-none overflow-visible opacity-100 z-[15]"
          style={{ zIndex: 15, opacity: 1 }}
        >
          <JamesModel
            onProgress={setModelProgress}
            onLoaded={() => setIsModelReady(true)}
            className="w-[96vw] h-[52vh] sm:w-[840px] sm:h-[840px] max-w-[480px] sm:max-w-none max-h-[480px] sm:max-h-[82vh]"
          />
        </div>

        {/* =========================================================================
            TOP NAVIGATION BAR (z-20: above reveal layer)
            Enhanced readability and responsive clearance
        ========================================================================= */}
        <header className="w-full flex items-center justify-between z-20 relative gap-4">
          {/* Top-Left brand title with James3D Face Logo Icon */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.6)] shrink-0 group hover:border-cyan-500/40 transition-all duration-300">
            <img
              src="/james3d-logo.png"
              alt="James3D Logo"
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-white/30 shadow-[0_0_10px_rgba(0,240,255,0.4)] transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-[11px] sm:text-xs md:text-[13px] font-bold tracking-[0.22em] uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              JAMES AATHITHYAN
            </span>
          </div>

          {/* Top-Right links with enhanced readability */}
          <nav
            aria-label="Developer Links"
            className="hidden md:flex items-center gap-4 sm:gap-6 xl:gap-7 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.6)] text-[11px] xl:text-xs font-semibold tracking-[0.2em] text-white shrink-0 ml-auto"
          >
            <a
              href="https://github.com/Jamesaathithyandev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors duration-200"
            >
              /GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/james-aathithyan-1412931b9/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-300 transition-colors duration-200"
            >
              /LINKEDIN
            </a>
            <a
              href="#contact"
              className="hover:text-zinc-300 transition-colors duration-200"
            >
              /CONTACT
            </a>
          </nav>
        </header>

        {/* =========================================================================
            CENTER HERO COMPOSITION (z-10: Behind 3D model for immersive depth)
            Elevated upward so headline and title bar sit clearly above 3D model
        ========================================================================= */}
        <section className="w-full my-auto flex flex-col items-center justify-center text-center z-10 relative -translate-y-[16%] sm:-translate-y-[24%] md:-translate-y-[26%] py-1 sm:py-8 pointer-events-none">
          {/* Supporting Text Label (moved up) */}
          <div className="mb-1 sm:mb-3 md:mb-4 pointer-events-auto">
            <span className="inline-block px-3 sm:px-4 py-0.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[8.5px] sm:text-xs md:text-[12.5px] font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-zinc-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Full-Stack Developer • MERN & Real-Time Systems
            </span>
          </div>

          {/* Dominant Hero Headline: JAMES (moved up) */}
          <div className="w-full overflow-hidden flex flex-col items-center justify-center">
            <h1 className="text-[17vw] sm:text-[15vw] md:text-[14vw] lg:text-[13vw] xl:text-[200px] 2xl:text-[230px] font-black tracking-[-0.03em] leading-[0.82] text-white uppercase text-center drop-shadow-[0_6px_32px_rgba(0,0,0,0.95)] select-none">
              JAMES
            </h1>
          </div>

          {/* Final Year Paragraph Box on Mobile: Positioned cleanly above 3D model head */}
          <div className="block sm:hidden mt-2 max-w-[340px] px-3.5 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.7)] pointer-events-auto">
            <p className="text-[10px] text-zinc-100 font-normal leading-[1.45] tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              Final-year B.Tech Information Technology student and full-stack developer with hands-on experience building MERN applications, REST APIs, authentication systems, and deployed client projects.
            </p>
          </div>
        </section>

        {/* =========================================================================
            BOTTOM TEXT AREA & CTA PLACEMENT (z-20: above 3D model)
            Professional Developer Summary & Action Buttons
        ========================================================================= */}
        <footer className="w-full flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-3 sm:gap-6 z-20 relative pt-2 sm:pt-4">
          {/* Desktop-Only Description Box (on mobile it is placed above the 3D model head) */}
          <div className="hidden sm:block w-full sm:max-w-[380px] md:max-w-[440px] p-3.5 sm:p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.7)]">
            <p className="text-[11.5px] sm:text-[12px] md:text-[12.5px] text-zinc-100 font-normal leading-[1.6] tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              Final-year B.Tech Information Technology student and full-stack developer with hands-on experience building MERN applications, REST APIs, authentication systems, and deployed client projects.
            </p>
          </div>

          {/* Bottom-Right CTA Buttons: 2x2 grid on mobile, inline flex row on desktop */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0 sm:ml-auto">
            {/* Button 1: View Projects */}
            <a
              href="#projects"
              className="px-3 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-xs md:text-[13px] font-semibold tracking-wide flex items-center justify-center gap-1.5 sm:gap-2 group text-center rounded-full backdrop-blur-md bg-white text-black hover:bg-zinc-200 transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.25)]"
            >
              <span>View Projects</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>

            {/* Button 2: Contact Me */}
            <a
              href="#contact"
              className="px-3 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-xs md:text-[13px] font-semibold tracking-wide flex items-center justify-center gap-1.5 sm:gap-2 group text-center rounded-full backdrop-blur-md bg-black/60 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
            >
              <span>Contact Me</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>

            {/* Button 3: GitHub */}
            <a
              href="https://github.com/Jamesaathithyandev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-2 sm:py-3 text-[11px] sm:text-xs md:text-[13px] font-semibold tracking-wide flex items-center justify-center gap-1 group text-center rounded-full backdrop-blur-md bg-black/60 border border-white/20 text-zinc-300 hover:text-white hover:border-white/40 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
            >
              <span>GitHub</span>
              <span className="text-[10px] transition-transform duration-200 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>

            {/* Button 4: Official Resume */}
            <a
              href="/James_Aathithyan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="James_Aathithyan_Resume.pdf"
              className="px-3 sm:px-4 py-2 sm:py-3 text-[11px] sm:text-xs md:text-[13px] font-semibold tracking-wide flex items-center justify-center gap-1 group text-center rounded-full backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/25 text-white hover:border-cyan-400/50 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
            >
              <span>Resume</span>
              <span className="text-[10px] text-cyan-300 group-hover:translate-y-0.5 transition-transform">
                ↓
              </span>
            </a>
          </div>
        </footer>
      </div>
    </section>

    {/* =========================================================================
        NEXT SECTION: CINEMATIC SCROLL-DRIVEN STORYTELLING SECTION
        Interactive digital art exhibition with 9:16 portrait expanding to full-screen
    ========================================================================= */}
    <WovenValleyScrollStory />

    {/* =========================================================================
        FLORIA DISCOVERY & ART-BOOK FOOTER SECTION
        Interactive digital archive of creatures and places + monumental footer
    ========================================================================= */}
    <FloriaDiscoveryAndFooter />
  </div>
  );
}
