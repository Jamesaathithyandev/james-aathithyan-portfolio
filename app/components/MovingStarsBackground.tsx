"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number; // Depth factor (0.2 to 1.0)
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  vx: number;
  vy: number;
  hasSpikes?: boolean;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number; // radians
  alpha: number;
  maxLife: number;
  life: number;
  color: string;
}

export default function MovingStarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let isTabActive = true;
    let width = 0;
    let height = 0;

    // Cosmic palette for varied celestial bodies
    const STAR_COLORS = [
      "rgba(255, 255, 255,", // Pure crisp white
      "rgba(207, 250, 254,", // Ice cyan
      "rgba(224, 231, 255,", // Pale indigo
      "rgba(253, 244, 255,", // Subtle fuchsia
      "rgba(254, 240, 138,", // Warm starlight
    ];

    // Initialize stars array
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let lastMeteorSpawnTime = performance.now();

    const initStars = () => {
      const isMobile = width < 768;
      // Elegant star density
      const count = isMobile ? 85 : 180;
      stars = [];

      for (let i = 0; i < count; i++) {
        const z = 0.2 + Math.random() * 0.8;
        // Foreground stars can have subtle diamond cross glints
        const hasSpikes = z > 0.86 && Math.random() < 0.35;
        const colorPrefix = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          size: (0.7 + z * 1.5) * (isMobile ? 0.85 : 1.0),
          baseAlpha: 0.25 + z * 0.65,
          // Slower, serene twinkling cycles
          twinkleSpeed: 0.006 + Math.random() * 0.014,
          twinklePhase: Math.random() * Math.PI * 2,
          color: colorPrefix,
          // Calmer, slower celestial drift (slow cosmic velocity)
          vx: (Math.random() - 0.5) * 0.03 * z,
          vy: -(0.04 + z * 0.08), // Gentle slow upward drift
          hasSpikes,
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initStars();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse movement parallax (soft and tranquil)
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      mousePos.current.targetX = normX * 7;
      mousePos.current.targetY = normY * 7;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle tab visibility to save power when tab is inactive
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive && !animId) {
        lastMeteorSpawnTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Spawn shooting meteor (glides gracefully)
    const spawnMeteor = () => {
      const startX = Math.random() * (width * 0.8) + width * 0.1;
      const startY = Math.random() * (height * 0.4);
      const angle = (Math.PI / 180) * (32 + Math.random() * 16); // 32-48 deg angle
      const speed = 3.4 + Math.random() * 2.2; // Slower, graceful glide
      const length = 110 + Math.random() * 80;
      const maxLife = 70 + Math.random() * 40;

      meteors.push({
        x: startX,
        y: startY,
        length,
        speed,
        angle,
        alpha: 0,
        maxLife,
        life: 0,
        color: Math.random() > 0.4 ? "34, 211, 238" : "255, 255, 255", // Cyan or White
      });
    };

    const render = () => {
      if (!isTabActive) {
        animId = 0;
        return;
      }

      animId = requestAnimationFrame(render);
      const now = performance.now();

      // Mouse lerp easing for gentle celestial parallax
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.04;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Periodically spawn shooting stars (every 6-10 seconds)
      if (now - lastMeteorSpawnTime > 6500 + Math.random() * 4500) {
        if (meteors.length < 2) {
          spawnMeteor();
          lastMeteorSpawnTime = now;
        }
      }

      // Draw and update stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Move star upward & drift slowly
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around borders seamlessly
        if (star.y < -15) {
          star.y = height + 10;
          star.x = Math.random() * width;
        } else if (star.y > height + 15) {
          star.y = -10;
          star.x = Math.random() * width;
        }

        if (star.x < -15) {
          star.x = width + 10;
        } else if (star.x > width + 15) {
          star.x = -10;
        }

        // Twinkle calculation
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.32;
        const currentAlpha = Math.max(0.08, Math.min(star.baseAlpha + twinkle, 1));

        // Parallax offset
        const px = star.x + mousePos.current.x * star.z;
        const py = star.y + mousePos.current.y * star.z;

        // Draw soft ambient outer glow for brighter stars
        if (star.z > 0.6) {
          ctx.beginPath();
          ctx.arc(px, py, star.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${star.color}${(currentAlpha * 0.16).toFixed(3)})`;
          ctx.fill();
        }

        // Draw main star core
        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${currentAlpha.toFixed(3)})`;
        ctx.fill();

        // Draw 4-point cross glint / bloom on foreground bright stars
        if (star.hasSpikes && currentAlpha > 0.65) {
          const spikeLen = star.size * 3.6;
          ctx.strokeStyle = `${star.color}${(currentAlpha * 0.38).toFixed(3)})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          // Horizontal line
          ctx.moveTo(px - spikeLen, py);
          ctx.lineTo(px + spikeLen, py);
          // Vertical line
          ctx.moveTo(px, py - spikeLen);
          ctx.lineTo(px, py + spikeLen);
          ctx.stroke();
        }
      }

      // Draw and update meteors (shooting stars)
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life++;

        // Calculate opacity envelope (fade in, hold, fade out)
        const progress = m.life / m.maxLife;
        if (progress < 0.25) {
          m.alpha = progress / 0.25;
        } else {
          m.alpha = 1 - (progress - 0.25) / 0.75;
        }

        // Position update
        const cos = Math.cos(m.angle);
        const sin = Math.sin(m.angle);
        m.x += cos * m.speed;
        m.y += sin * m.speed;

        // Tail endpoint
        const tailX = m.x - cos * m.length;
        const tailY = m.y - sin * m.length;

        // Draw shooting star gradient trail
        const gradient = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        gradient.addColorStop(0, `rgba(${m.color}, 0)`);
        gradient.addColorStop(0.7, `rgba(${m.color}, ${(m.alpha * 0.35).toFixed(3)})`);
        gradient.addColorStop(1, `rgba(${m.color}, ${(m.alpha * 0.95).toFixed(3)})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();

        // Bright sparkling head
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${(m.alpha * 0.95).toFixed(3)})`;
        ctx.fill();

        // Remove expired meteors
        if (m.life >= m.maxLife || m.x > width + 100 || m.y > height + 100) {
          meteors.splice(i, 1);
        }
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Deep Cosmic Midnight Base */}
      <div className="absolute inset-0 bg-[#020206]" />

      {/* Luminous Deep Space Nebula Clouds (Soft Cyan, Royal Violet, Deep Emerald) */}
      <div
        className="absolute -top-[10%] left-[8%] w-[600px] h-[600px] rounded-full opacity-25 blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, rgba(2, 2, 6, 0) 70%)",
        }}
      />
      <div
        className="absolute top-[35%] -right-[8%] w-[650px] h-[650px] rounded-full opacity-20 blur-[150px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.18) 0%, rgba(2, 2, 6, 0) 70%)",
        }}
      />
      <div
        className="absolute bottom-[10%] left-[20%] w-[700px] h-[700px] rounded-full opacity-18 blur-[160px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(2, 2, 6, 0) 70%)",
        }}
      />

      {/* Interactive Living Starfield Canvas with Slow Drifting Stars & Meteors */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none"
      />

      {/* Subtle Architectural Grid Overlay with low opacity so stars shine through cleanly */}
      <div
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px]"
      />

      {/* Vignette edge feathering for cinematic depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(2, 2, 6, 0.5) 80%, rgba(2, 2, 6, 0.85) 100%)",
        }}
      />
    </div>
  );
}
