"use client";

import React, { useEffect, useRef, useState } from "react";

// Editorial floating text nodes with asymmetric positioning, angles, dispersal, and interactive mouse physics
const EDITORIAL_NODES = [
  {
    id: "chapter-tag",
    className: "top-[8%] sm:top-[9%] left-[3%] sm:left-[5%] md:left-[8%]",
    initialRotate: -2.5,
    exitX: -160,
    exitY: -80,
    exitRotate: -10,
    startFade: 0.05,
    endFade: 0.35,
    parallaxX: -26,
    parallaxY: -18,
    repelStrength: 50,
    render: () => (
      <div className="group flex flex-col items-start gap-1 p-3 sm:p-3.5 rounded-2xl bg-black/85 border border-white/10 hover:border-cyan-400/40 max-w-[190px] sm:max-w-[230px] shadow-[0_12px_36px_rgba(0,0,0,0.85)] hover:shadow-[0_18px_45px_rgba(34,211,238,0.2)] backdrop-blur-xl transition-all duration-300 pointer-events-auto cursor-pointer">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[9.5px] sm:text-[10px] font-mono tracking-[0.25em] text-cyan-300 uppercase font-semibold">
            ABOUT JAMES
          </span>
        </div>
        <h4 className="text-xs sm:text-[13px] font-semibold tracking-wide text-white uppercase group-hover:text-cyan-100 transition-colors">
          Full-Stack Developer
        </h4>
        <p className="text-[9.5px] sm:text-[10.5px] text-zinc-400 leading-relaxed mt-0.5 font-light">
          Final-year B.Tech IT student at PPG Institute of Technology with hands-on MERN experience.
        </p>
      </div>
    ),
  },
  {
    id: "coordinates-pill",
    className: "top-[8%] sm:top-[9%] right-[3%] sm:right-[5%] md:right-[8%]",
    initialRotate: 2,
    exitX: 160,
    exitY: -80,
    exitRotate: 9,
    startFade: 0.06,
    endFade: 0.38,
    parallaxX: 28,
    parallaxY: -16,
    repelStrength: 45,
    render: () => (
      <div className="group flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/85 border border-white/15 hover:border-emerald-400/40 text-[9.5px] sm:text-[10.5px] font-mono text-zinc-300 shadow-[0_8px_28px_rgba(0,0,0,0.8)] hover:shadow-[0_12px_35px_rgba(52,211,153,0.2)] backdrop-blur-xl transition-all duration-300 pointer-events-auto cursor-pointer">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-white font-medium">Coimbatore, India</span>
        <span className="text-zinc-600">|</span>
        <span className="text-zinc-400 text-[9px] uppercase tracking-wider group-hover:text-emerald-300 transition-colors">
          Open to Roles
        </span>
      </div>
    ),
  },
  {
    id: "lore-quote",
    className: "hidden lg:block top-[45%] left-[2%] xl:left-[4%] 2xl:left-[7%]",
    initialRotate: -3.5,
    exitX: -180,
    exitY: 20,
    exitRotate: -12,
    startFade: 0.1,
    endFade: 0.45,
    parallaxX: -32,
    parallaxY: 14,
    repelStrength: 50,
    render: () => (
      <div className="group flex flex-col items-start gap-1.5 p-3.5 rounded-xl border-l-2 border-cyan-400/80 hover:border-cyan-300 bg-black/85 hover:bg-black/90 backdrop-blur-xl max-w-[210px] xl:max-w-[240px] shadow-[0_14px_36px_rgba(0,0,0,0.9)] hover:shadow-[0_18px_45px_rgba(34,211,238,0.22)] transition-all duration-300 pointer-events-auto cursor-pointer">
        <span className="text-[10.5px] xl:text-[11px] italic text-zinc-200 group-hover:text-white font-light leading-snug transition-colors">
          “Specializing in MERN architectures, REST APIs, and real-time collaborative web systems.”
        </span>
        <span className="text-[8.5px] font-mono tracking-widest uppercase text-zinc-500 group-hover:text-cyan-300 mt-0.5 transition-colors">
          — James Aathithyan
        </span>
      </div>
    ),
  },
  {
    id: "habitat-badge",
    className: "hidden lg:block top-[43%] right-[2%] xl:right-[4%] 2xl:right-[7%]",
    initialRotate: 3,
    exitX: 180,
    exitY: 30,
    exitRotate: 11,
    startFade: 0.12,
    endFade: 0.48,
    parallaxX: 30,
    parallaxY: 18,
    repelStrength: 50,
    render: () => (
      <div className="group flex flex-col items-start gap-1.5 p-3 sm:p-3.5 rounded-2xl bg-black/85 border border-white/10 hover:border-emerald-400/50 max-w-[200px] xl:max-w-[230px] shadow-[0_12px_36px_rgba(0,0,0,0.85)] hover:shadow-[0_18px_45px_rgba(52,211,153,0.25)] backdrop-blur-xl transition-all duration-300 pointer-events-auto cursor-pointer">
        <div className="flex items-center gap-1.5">
          <span className="text-xs group-hover:scale-125 transition-transform duration-300">⚡</span>
          <span className="text-[10px] sm:text-[10.5px] font-semibold text-white tracking-wider uppercase group-hover:text-emerald-100 transition-colors">
            Freelance Developer
          </span>
        </div>
        <div className="text-[9.5px] font-mono text-zinc-400 leading-tight">
          <span>Client Deployments:</span>
          <div className="text-zinc-200 font-medium text-[9px] mt-0.5 truncate">
            chiselcraft.online • vertise
          </div>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-0.5">
          <div className="w-full h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full group-hover:brightness-125 transition-all" />
        </div>
      </div>
    ),
  },
  {
    id: "archive-meta",
    className: "bottom-[9%] sm:bottom-[10%] left-[3%] sm:left-[5%] md:left-[8%]",
    initialRotate: 1.8,
    exitX: -150,
    exitY: 90,
    exitRotate: 8,
    startFade: 0.15,
    endFade: 0.52,
    parallaxX: -22,
    parallaxY: 24,
    repelStrength: 45,
    render: () => (
      <div className="group flex flex-col gap-1 p-2.5 sm:p-3 px-3 sm:px-3.5 rounded-xl border border-white/10 hover:border-white/30 bg-black/85 backdrop-blur-xl text-[9.5px] sm:text-[10px] font-mono shadow-[0_10px_28px_rgba(0,0,0,0.85)] hover:shadow-[0_14px_35px_rgba(255,255,255,0.15)] transition-all duration-300 pointer-events-auto cursor-pointer">
        <span className="text-zinc-500 uppercase tracking-widest text-[8.5px]">
          Academic Record
        </span>
        <span className="text-white font-medium group-hover:text-cyan-200 transition-colors">
          B.Tech IT // PPG Institute
        </span>
        <span className="text-emerald-300/90 text-[8.5px]">2023–2027 • CGPA: 7.0</span>
      </div>
    ),
  },
  {
    id: "scroll-hint",
    className: "bottom-[9%] sm:bottom-[10%] right-[3%] sm:right-[5%] md:right-[8%]",
    initialRotate: -2,
    exitX: 150,
    exitY: 90,
    exitRotate: -8,
    startFade: 0.18,
    endFade: 0.55,
    parallaxX: 24,
    parallaxY: 22,
    repelStrength: 45,
    render: () => (
      <a
        href="/James_Aathithyan_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download="James_Aathithyan_Resume.pdf"
        className="group flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/15 hover:border-cyan-400/50 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl text-[9.5px] sm:text-[10px] font-mono tracking-widest uppercase text-zinc-300 shadow-[0_8px_25px_rgba(0,0,0,0.7)] hover:shadow-[0_12px_35px_rgba(34,211,238,0.2)] transition-all duration-300 pointer-events-auto cursor-pointer"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="group-hover:text-white transition-colors">Download Official Resume</span>
        <span className="text-xs text-cyan-300 group-hover:translate-y-0.5 transition-transform">
          ↓
        </span>
      </a>
    ),
  },
];

export default function WovenValleyScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollProgressRef = useRef(0);
  const [viewportDims, setViewportDims] = useState({ w: 1200, h: 800 });

  // Cached positions to prevent layout thrashing (getBoundingClientRect in RAF)
  const cachedNodeCenters = useRef<Record<string, { x: number; y: number }>>({});
  const isStoryInView = useRef(false);

  // Interactive mouse tracking state with smooth lerping
  const mouseState = useRef({
    x: -9999,
    y: -9999,
    normX: 0,
    normY: 0,
    isInside: false,
  });

  // Animation states for each node
  const nodeAnimStates = useRef<
    Record<
      string,
      {
        x: number;
        y: number;
        rot: number;
        tiltX: number;
        scale: number;
      }
    >
  >({});

  // Initialize animation states once
  if (Object.keys(nodeAnimStates.current).length === 0) {
    EDITORIAL_NODES.forEach((node) => {
      nodeAnimStates.current[node.id] = {
        x: 0,
        y: 0,
        rot: node.initialRotate,
        tiltX: 0,
        scale: 1,
      };
    });
  }

  // Pre-calculate node centers relative to the stage (called only on resize or mouseenter)
  const refreshNodeCenters = () => {
    const stage = stageRef.current;
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();
    EDITORIAL_NODES.forEach((node) => {
      const el = nodeRefs.current[node.id];
      if (el) {
        const rect = el.getBoundingClientRect();
        cachedNodeCenters.current[node.id] = {
          x: rect.left - stageRect.left + rect.width / 2,
          y: rect.top - stageRect.top + rect.height / 2,
        };
      }
    });
  };

  // Handle scroll & viewport dimensions
  useEffect(() => {
    const updateDims = () => {
      setViewportDims({
        w: window.innerWidth,
        h: window.innerHeight,
      });
      refreshNodeCenters();
    };
    updateDims();
    window.addEventListener("resize", updateDims);

    // Visibility Observer to pause heavy RAF loop when not on screen (DRASTIC LAG FIX)
    const container = containerRef.current;
    let observer: IntersectionObserver | null = null;
    if (container) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isStoryInView.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            refreshNodeCenters();
          }
        },
        { threshold: 0.01 }
      );
      observer.observe(container);
    }

    let ticking = false;
    const handleScroll = () => {
      if (!containerRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const windowH = window.innerHeight;
          const totalDistance = rect.height - windowH;

          if (totalDistance > 0) {
            const scrolled = -rect.top;
            const progress = Math.min(Math.max(scrolled / totalDistance, 0), 1);
            scrollProgressRef.current = progress;
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("resize", updateDims);
      window.removeEventListener("scroll", handleScroll);
      observer?.disconnect();
    };
  }, []);

  // Handle mouse movements across the sticky stage
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let stageRectCache = stage.getBoundingClientRect();

    const handleMouseEnter = () => {
      stageRectCache = stage.getBoundingClientRect();
      refreshNodeCenters();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - stageRectCache.left;
      const y = e.clientY - stageRectCache.top;
      // Normalized between -1 and 1 from center
      const normX = ((x / stageRectCache.width) * 2 - 1);
      const normY = ((y / stageRectCache.height) * 2 - 1);

      mouseState.current = {
        x,
        y,
        normX,
        normY,
        isInside: true,
      };
    };

    const handleMouseLeave = () => {
      mouseState.current.isInside = false;
      mouseState.current.normX = 0;
      mouseState.current.normY = 0;
    };

    stage.addEventListener("mouseenter", handleMouseEnter);
    stage.addEventListener("mousemove", handleMouseMove, { passive: true });
    stage.addEventListener("mouseleave", handleMouseLeave);

    // Continuous 60/120fps Animation Loop for dynamic mouse repulsion, 3D tilt & parallax
    let animId: number;
    const lerpSpeed = 0.12;

    const loop = () => {
      animId = requestAnimationFrame(loop);

      // LAG OPTIMIZATION: If section is not visible in viewport, skip entirely!
      if (!isStoryInView.current) return;

      const sp = scrollProgressRef.current;
      const ms = mouseState.current;

      // 1. Tilt center image frame in 3D according to cursor
      if (imageFrameRef.current) {
        const imgTiltX = -ms.normY * 5;
        const imgTiltY = ms.normX * 5;
        const imgParallaxX = ms.normX * 14;
        const imgParallaxY = ms.normY * 14;
        imageFrameRef.current.style.transform = `perspective(1000px) rotateX(${imgTiltX.toFixed(
          2
        )}deg) rotateY(${imgTiltY.toFixed(2)}deg) translate3d(${imgParallaxX.toFixed(
          2
        )}px, ${imgParallaxY.toFixed(2)}px, 0)`;
      }

      // 2. Animate each editorial node with scroll dispersal + interactive mouse repulsion
      EDITORIAL_NODES.forEach((node) => {
        const el = nodeRefs.current[node.id];
        if (!el) return;

        const fadeRange = node.endFade - node.startFade;
        let nodeProgress = 0;
        if (sp >= node.endFade) {
          nodeProgress = 1;
        } else if (sp > node.startFade) {
          nodeProgress = (sp - node.startFade) / fadeRange;
        }

        const eased = Math.pow(nodeProgress, 1.4);
        const scrollOpacity = Math.max(0, 1 - nodeProgress);
        const scrollX = node.exitX * eased;
        const scrollY = node.exitY * eased;
        const scrollRot = node.initialRotate + node.exitRotate * eased;
        const scrollScale = Math.max(0.6, 1 - 0.25 * eased);

        // Hide if completely dispersed by scroll
        if (scrollOpacity <= 0.005) {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
          return;
        }

        el.style.opacity = scrollOpacity.toFixed(3);
        el.style.pointerEvents = scrollOpacity > 0.1 ? "auto" : "none";

        // Calculate dynamic mouse physics without getBoundingClientRect (ZERO FORCED REFLOWS)
        let repelX = 0;
        let repelY = 0;
        let tiltX = 0;
        let tiltY = 0;
        let scaleBonus = 1;

        if (ms.isInside) {
          const cachedCenter = cachedNodeCenters.current[node.id];
          if (cachedCenter) {
            const dx = ms.x - cachedCenter.x;
            const dy = ms.y - cachedCenter.y;
            const dist = Math.hypot(dx, dy);
            const radius = 300; // Interaction radius in pixels

            if (dist < radius && dist > 1) {
              // Proximity power (stronger as cursor gets closer)
              const power = Math.pow(1 - dist / radius, 1.4);
              const repelAmount = node.repelStrength * power;

              // Push smoothly away from the approaching mouse
              repelX = -(dx / dist) * repelAmount;
              repelY = -(dy / dist) * repelAmount;

              // Dynamic 3D tilt facing away/toward cursor
              tiltX = (dy / radius) * 18 * power;
              tiltY = -(dx / radius) * 18 * power;

              // Slight scale expansion on proximity
              scaleBonus = 1 + 0.08 * power;
            }
          }

          // Ambient floating parallax based on overall mouse position
          repelX += ms.normX * node.parallaxX;
          repelY += ms.normY * node.parallaxY;
        }

        // Target combined values
        const targetX = scrollX + repelX;
        const targetY = scrollY + repelY;
        const targetRot = scrollRot + tiltY;
        const targetTiltX = tiltX;
        const targetScale = scrollScale * scaleBonus;

        // Smooth lerp easing
        const state = nodeAnimStates.current[node.id];
        state.x += (targetX - state.x) * lerpSpeed;
        state.y += (targetY - state.y) * lerpSpeed;
        state.rot += (targetRot - state.rot) * lerpSpeed;
        state.tiltX += (targetTiltX - state.tiltX) * lerpSpeed;
        state.scale += (targetScale - state.scale) * lerpSpeed;

        // Apply high-performance 3D GPU transform
        el.style.transform = `translate3d(${state.x.toFixed(2)}px, ${state.y.toFixed(
          2
        )}px, 0) perspective(800px) rotateX(${state.tiltX.toFixed(
          2
        )}deg) rotateY(${state.rot.toFixed(2)}deg) scale(${state.scale.toFixed(3)})`;
      });
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      stage.removeEventListener("mouseenter", handleMouseEnter);
      stage.removeEventListener("mousemove", handleMouseMove);
      stage.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // 1. Initial 9:16 portrait dimensions
  const initialWidth = Math.min(Math.max(viewportDims.w * 0.22, 220), 300);
  const initialHeight = initialWidth * (16 / 9);

  // 2. Final full-screen dimensions (covers 100vw x 100vh completely)
  const finalWidth = viewportDims.w;
  const finalHeight = viewportDims.h;

  // 3. Smooth expansion progress curve
  const normalizedProgress = Math.min(scrollProgress / 0.85, 1);
  const easeProgress =
    normalizedProgress < 0.5
      ? 2 * normalizedProgress * normalizedProgress
      : 1 - Math.pow(-2 * normalizedProgress + 2, 2) / 2;

  // Interpolate width and height from portrait (9:16) to full screen
  const currentWidth = initialWidth + (finalWidth - initialWidth) * easeProgress;
  const currentHeight = initialHeight + (finalHeight - initialHeight) * easeProgress;

  const borderRadius = Math.max(0, 20 * (1 - easeProgress * 1.4));
  const borderOpacity = Math.max(0, 1 - easeProgress * 2.2);

  // Camera push into the village landscape
  const imageScale = 1 + easeProgress * 0.08 + Math.max(0, scrollProgress - 0.85) * 0.08;

  return (
    <section
      ref={containerRef}
      id="explore"
      className="relative w-full h-[280vh] bg-transparent text-white selection:bg-white selection:text-black z-30"
      aria-label="Woven Valleys Interactive Exhibition"
    >
      {/* Sticky full-screen stage: Pinned at top-0 while user scrolls through 280vh */}
      <div
        ref={stageRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-transparent select-none"
      >
        {/* Deep atmospheric ambient glow in initial state */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255, 180, 200, 0.04) 0%, rgba(2, 2, 6, 0.4) 70%, transparent 100%)",
            opacity: Math.max(0, 1 - easeProgress * 1.5),
          }}
        />

        {/* =========================================================================
            CENTER EXPANDING IMAGE
            Interpolates from 9:16 portrait directly into full-screen (100vw x 100vh)
            Equipped with 3D tilt tracking user's cursor
        ========================================================================= */}
        <div
          ref={imageFrameRef}
          className="relative z-10 flex items-center justify-center will-change-[width,height,transform]"
          style={{
            width: `${currentWidth}px`,
            height: `${currentHeight}px`,
            borderRadius: `${borderRadius}px`,
            overflow: "hidden",
            border:
              borderOpacity > 0.01
                ? `1px solid rgba(255, 255, 255, ${0.25 * borderOpacity})`
                : "none",
            boxShadow:
              borderOpacity > 0.05
                ? `0 25px 70px rgba(0, 0, 0, 0.95), 0 0 50px rgba(255, 182, 193, ${
                    0.15 * borderOpacity
                  })`
                : "none",
            transition: "box-shadow 0.1s ease-out",
          }}
        >
          {/* Stitched Landscape Image with inner parallax zoom */}
          <img
            src="/floria-village.jpg"
            alt="Floria Woven Valleys Discovery"
            className="w-full h-full object-cover object-center select-none will-change-transform"
            style={{
              transform: `scale(${imageScale})`,
              transformOrigin: "center center",
            }}
            loading="eager"
          />

          {/* Initial portrait vignette that dissolves as image expands */}
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/45 via-transparent to-black/25 transition-opacity"
            style={{
              opacity: Math.max(0, 1 - easeProgress * 2.5),
            }}
          />
        </div>

        {/* =========================================================================
            ASYMMETRIC EDITORIAL "ORGANIZED CHAOS" TEXT ELEMENTS
            Surround the portrait image initially, dispersing outward with scroll AND
            smoothly reacting with magnetic physics, 3D tilt and parallax when mouse moves
        ========================================================================= */}
        <div
          className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
          aria-hidden={scrollProgress > 0.6}
        >
          {EDITORIAL_NODES.map((node) => (
            <div
              key={node.id}
              ref={(el) => {
                nodeRefs.current[node.id] = el;
              }}
              className={`absolute ${node.className} will-change-transform`}
              style={{
                transformOrigin: "center center",
              }}
            >
              {node.render()}
            </div>
          ))}
        </div>

        {/* Bottom indicator that fades out as user dives in */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: Math.max(0, 1 - easeProgress * 3),
          }}
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-white/10 text-[9px] font-mono text-zinc-400 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Scroll to Explore Work</span>
            <span>•</span>
            <span>{Math.round(normalizedProgress * 100)}%</span>
          </div>
        </div>

        {/* =========================================================================
            CINEMATIC FULL-SCREEN ZOOM REVELATION OVERLAY
            Fades in smoothly as the canvas expands into full-screen (progress > 0.62)
        ========================================================================= */}
        {scrollProgress > 0.6 && (() => {
          const sp = scrollProgress;
          // Staggered progressive appearance: each element reveals one after another
          const pillProg = Math.max(0, Math.min((sp - 0.62) / 0.08, 1));
          const titleProg = Math.max(0, Math.min((sp - 0.66) / 0.10, 1));
          const statementProg = Math.max(0, Math.min((sp - 0.72) / 0.10, 1));
          const promptProg = Math.max(0, Math.min((sp - 0.78) / 0.08, 1));
          const bgOpacity = Math.max(0, Math.min((sp - 0.62) / 0.18, 1)) * 0.9;

          return (
            <div className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center text-center px-6 transition-all duration-200 select-none">
              {/* Cinematic dark atmospheric vignette for contrast over the landscape */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/55 pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: bgOpacity,
                }}
              />

              {/* Typography content container */}
              <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                {/* 1. Eyebrow Pill */}
                <div
                  className="mb-3 sm:mb-4 will-change-[opacity,transform] transition-all duration-300"
                  style={{
                    opacity: pillProg,
                    transform: `translateY(${(1 - pillProg) * 20}px)`,
                  }}
                >
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-[9.5px] sm:text-[11px] font-mono tracking-[0.28em] text-cyan-300 uppercase shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    DISCOVERY // ARCHITECTURE
                  </span>
                </div>

                {/* 2. Monumental Headline */}
                <div
                  className="will-change-[opacity,transform] transition-all duration-300"
                  style={{
                    opacity: titleProg,
                    transform: `translateY(${(1 - titleProg) * 32}px)`,
                  }}
                >
                  <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium tracking-[0.03em] uppercase text-white leading-[1.08] drop-shadow-[0_8px_40px_rgba(0,0,0,0.9)]">
                    Crafting Modern{" "}
                    <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent italic font-light">
                      Web Architectures
                    </span>
                  </h3>
                </div>

                {/* 3. Supporting Developer Statement */}
                <div
                  className="will-change-[opacity,transform] transition-all duration-300"
                  style={{
                    opacity: statementProg,
                    transform: `translateY(${(1 - statementProg) * 24}px)`,
                  }}
                >
                  <p className="mt-3.5 sm:mt-5 text-xs sm:text-sm md:text-base text-zinc-200 font-light max-w-xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                    Full-stack MERN engineering, clean REST APIs, and real-time multi-user collaboration woven with precision.
                  </p>
                </div>

                {/* 4. Scroll prompt to project archive */}
                <div
                  className="mt-6 sm:mt-8 will-change-[opacity,transform] transition-all duration-300"
                  style={{
                    opacity: promptProg,
                    transform: `translateY(${(1 - promptProg) * 16}px)`,
                  }}
                >
                  <div className="flex items-center gap-2.5 text-[9.5px] sm:text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
                    <span className="w-6 h-[1px] bg-white/25" />
                    <span>Scroll to Explore Projects</span>
                    <span className="text-cyan-400 animate-bounce">↓</span>
                    <span className="w-6 h-[1px] bg-white/25" />
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
