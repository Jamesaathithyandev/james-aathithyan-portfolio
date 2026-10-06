"use client";

import React, { useState, useRef, useEffect } from "react";

interface PortfolioItem {
  id: string;
  num: string;
  category: string;
  freq: string;
  freqColor?: string;
  barColor?: string;
  name: string;
  habitat: string;
  image: string;
  coordinates: string;
  status: string;
  statusColor: string;
  stagger: string;
  description: string;
  techStack?: string;
  features?: string[];
  githubUrl?: string;
  liveUrl?: string;
  secondaryLiveUrl?: string;
  detailsNote: string;
  isToggle?: boolean;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "item-01",
    num: "01",
    category: "MERN PROJECT",
    freq: "REAL-TIME",
    freqColor: "text-cyan-400",
    barColor: "bg-cyan-400",
    name: "Task Collaboration Platform",
    habitat: "MERN • JWT AUTH",
    image: "/portfolio/task-collaboration.jpg",
    coordinates: "MERN Stack • Live Sync",
    status: "DEPLOYED",
    statusColor: "bg-emerald-400",
    stagger: "lg:translate-y-0",
    techStack: "MongoDB • Express.js • React.js • Node.js • JWT • REST APIs",
    features: [
      "JWT user authentication & session management",
      "RESTful API architecture for CRUD operations",
      "Responsive React UI with interactive states",
      "Real-time multi-user live task updates",
      "Task organization & workflow management",
    ],
    githubUrl: "GitHub link — Not added yet",
    liveUrl: "Live demo — Not added yet",
    detailsNote:
      "Built and deployed a MERN task-management application with JWT authentication, REST APIs, responsive React UI, and real-time multi-user collaboration features for live task updates.",
    description:
      "Built and deployed a MERN task-management application with JWT authentication, REST APIs, responsive React UI, and real-time multi-user collaboration features for live task updates.",
  },
  {
    id: "item-02",
    num: "02",
    category: "CLIENT WORK",
    freq: "DEPLOYED",
    freqColor: "text-amber-400",
    barColor: "bg-amber-400",
    name: "Freelance Web Developer",
    habitat: "CHISELCRAFT & VERTISE",
    image: "/portfolio/freelance-client-work.jpg",
    coordinates: "Full Project Lifecycle",
    status: "ACTIVE",
    statusColor: "bg-amber-400",
    stagger: "lg:translate-y-12",
    techStack: "Frontend Design • Backend Integration • Production Deployment • Maintenance",
    features: [
      "Delivered client site: chiselcraft.online",
      "Delivered client site: vertisemarketing.com",
      "Managed design and responsive user experience",
      "Implemented backend integration & forms",
      "Production deployment and ongoing maintenance",
    ],
    githubUrl: "Private Client Repositories",
    liveUrl: "https://chiselcraft.online",
    secondaryLiveUrl: "https://vertisemarketing.com",
    detailsNote:
      "Delivered and deployed client websites (chiselcraft.online, vertisemarketing.com). Managed design, worked on backend integration, handled deployment, managed maintenance, and worked across the full project lifecycle.",
    description:
      "Delivered and deployed client websites including chiselcraft.online and vertisemarketing.com. Managed design, backend integration, deployment, and ongoing maintenance.",
  },
  {
    id: "item-03",
    num: "03",
    category: "INTERNSHIP",
    freq: "JUN–JUL 2026",
    freqColor: "text-rose-400",
    barColor: "bg-rose-400",
    name: "Techinta MERN Intern",
    habitat: "TECHINTA // COIMBATORE",
    image: "/portfolio/techinta-mern-intern.jpg",
    coordinates: "MERN Stack Developer Intern",
    status: "COMPLETED",
    statusColor: "bg-emerald-400",
    stagger: "lg:translate-y-4",
    techStack: "MongoDB • Express.js • React.js • Node.js • REST APIs",
    features: [
      "Developed full-stack web applications using MERN stack",
      "Implemented CRUD operations across multiple collections",
      "Worked on REST API integration and testing",
      "Handled database operations with MongoDB",
      "Managed seamless frontend-backend communication",
    ],
    detailsNote:
      "Developed full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Implemented CRUD operations, worked on API integration, handled database operations, and worked on frontend-backend communication.",
    description:
      "Developed full-stack web applications using MongoDB, Express.js, React.js, and Node.js at Techinta. Implemented CRUD operations and seamless frontend-backend communication.",
  },
  {
    id: "item-04",
    num: "04",
    category: "HACKATHON",
    freq: "2ND PLACE",
    freqColor: "text-amber-400",
    barColor: "bg-amber-400",
    name: "National Level Hackathon",
    habitat: "SNS INSTITUTE OF TECH",
    image: "/portfolio/hackathon-award.jpg",
    coordinates: "National Hackathon 2nd Place",
    status: "AWARDED",
    statusColor: "bg-amber-400",
    stagger: "lg:translate-y-6",
    techStack: "Rapid Prototyping • Full-Stack Development • Engineering Innovation",
    features: [
      "2nd Place Award Winner",
      "National Level Hackathon Competition",
      "Hosted by SNS Institute of Technology",
    ],
    detailsNote:
      "Secured 2nd Place at the National Level Hackathon conducted at SNS Institute of Technology for technical innovation, architecture execution, and rapid problem solving.",
    description:
      "Awarded 2nd Place at National Level Hackathon hosted by SNS Institute of Technology for engineering innovation and technical execution.",
  },
  {
    id: "item-05",
    num: "05",
    category: "CERTIFICATION",
    freq: "ORACLE OCI",
    freqColor: "text-cyan-400",
    barColor: "bg-cyan-400",
    name: "Oracle Cloud Infrastructure",
    habitat: "FOUNDATIONS & AI ASSOCIATE",
    image: "/portfolio/oracle-cloud-oci.jpg",
    coordinates: "Oracle Certified 2025",
    status: "VERIFIED",
    statusColor: "bg-cyan-400",
    stagger: "lg:translate-y-16",
    techStack: "Oracle Cloud Infrastructure • Cloud Architecture • AI Fundamentals",
    features: [
      "Oracle Cloud Infrastructure 2025 Certified",
      "Foundations & AI Associate Credential",
      "Cloud Architecture, Compute & Security Core",
    ],
    detailsNote:
      "Oracle Cloud Infrastructure 2025 Certified Foundations & AI Associate. Validates core cloud infrastructure architecture, networking, storage, security, and enterprise AI foundation concepts.",
    description:
      "Oracle Cloud Infrastructure 2025 Certified Foundations & AI Associate. Validates foundational cloud architecture, security, and artificial intelligence concepts.",
  },
  {
    id: "item-06",
    num: "06",
    category: "SKILL MATRIX",
    freq: "FULL-STACK",
    freqColor: "text-violet-400",
    barColor: "bg-violet-400",
    name: "Full-Stack Skill Matrix",
    habitat: "FRONTEND & BACKEND",
    image: "/portfolio/fullstack-skill-matrix.jpg",
    coordinates: "Languages, Frameworks, Tools",
    status: "PROFICIENT",
    statusColor: "bg-violet-400",
    stagger: "lg:translate-y-8",
    techStack: "JavaScript • Java • React.js • Node.js • Express.js • MongoDB • MySQL",
    features: [
      "Languages: JavaScript, Java",
      "Frontend: React.js, HTML, CSS",
      "Backend: Node.js, Express.js, REST APIs",
      "Database: MongoDB, MySQL",
      "Tools: Git, Postman, MySQL Workbench",
      "Core: Data Structures, OOP, Debugging",
    ],
    detailsNote:
      "Core technical capabilities across full-stack JavaScript, Java, MERN application architecture, relational & NoSQL databases, REST API design, and version control tools.",
    description:
      "Languages: JavaScript, Java. Frontend: React.js, HTML, CSS. Backend: Node.js, Express.js, REST APIs. Database: MongoDB, MySQL. Tools: Git, Postman, MySQL Workbench. Core: Data Structures, OOP, Debugging.",
  },
];

// High-Performance Interactive 3D Holographic Card Component (Zero React State on MouseMove)
function InteractivePortfolioCard({
  item,
  onOpenDossier,
}: {
  item: PortfolioItem;
  onOpenDossier: (item: PortfolioItem) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Directly update styles via DOM to avoid costly 60Hz React diffing on mousemove
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !articleRef.current || !glareRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    const rotX = -normY * 13;
    const rotY = normX * 13;
    const gx = (x / rect.width) * 100;
    const gy = (y / rect.height) * 100;

    articleRef.current.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(
      2
    )}deg) scale3d(1.035, 1.035, 1)`;
    glareRef.current.style.opacity = "1";
    glareRef.current.style.background = `radial-gradient(circle 260px at ${gx.toFixed(
      1
    )}% ${gy.toFixed(1)}%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.04) 40%, transparent 75%)`;

    if (borderRef.current) {
      borderRef.current.style.opacity = "0.9";
      borderRef.current.style.background = `radial-gradient(circle 200px at ${gx.toFixed(
        1
      )}% ${gy.toFixed(1)}%, rgba(255, 255, 255, 0.22) 0%, transparent 70%)`;
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (articleRef.current) {
      articleRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
    if (borderRef.current) {
      borderRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenDossier(item)}
      className={`w-full max-w-[320px] ${item.stagger} transition-all duration-500 ease-out cursor-pointer group`}
      style={{ perspective: "1000px" }}
    >
      <article
        ref={articleRef}
        className="relative rounded-2xl p-4 bg-[#090a0c]/90 border border-white/[0.1] hover:border-white/30 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.85)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.95)] overflow-hidden transition-all duration-150"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Holographic Specular Glare Layer */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-40 transition-opacity duration-300"
          style={{
            opacity: 0,
          }}
          aria-hidden="true"
        />

        {/* Dynamic Luminous Border Highlight */}
        <div
          ref={borderRef}
          className="pointer-events-none absolute inset-0 z-30 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: 0,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
          aria-hidden="true"
        />

        {/* 1. Card Top Metadata Header with Live Equalizer */}
        <div
          className="flex items-center justify-between gap-2 text-[9px] sm:text-[9.5px] font-mono tracking-wider pb-2.5 border-b border-white/[0.06] transition-transform duration-200"
          style={{ transform: "translateZ(26px)" }}
        >
          <div className="flex items-center gap-1.5 text-zinc-400 min-w-0">
            <span className="text-zinc-500 font-bold group-hover:text-white transition-colors shrink-0 whitespace-nowrap">
              [{item.num}]
            </span>
            <span className="uppercase text-[9px] text-zinc-300 font-medium group-hover:text-white transition-colors truncate whitespace-nowrap">
              {item.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap">
            <div className="flex items-end gap-[2px] h-3">
              <span
                className={`w-[2px] rounded-full ${item.barColor || "bg-cyan-400"} ${
                  isHovered ? "animate-eq-1" : "h-[30%]"
                }`}
              />
              <span
                className={`w-[2px] rounded-full ${item.barColor || "bg-cyan-400"} ${
                  isHovered ? "animate-eq-2" : "h-[60%]"
                }`}
              />
              <span
                className={`w-[2px] rounded-full ${item.barColor || "bg-cyan-400"} ${
                  isHovered ? "animate-eq-3" : "h-[40%]"
                }`}
              />
              <span
                className={`w-[2px] rounded-full ${item.barColor || "bg-cyan-400"} ${
                  isHovered ? "animate-eq-4" : "h-[70%]"
                }`}
              />
            </div>
            <span
              className={`font-medium tracking-wide uppercase text-[8.5px] sm:text-[9px] ${
                item.freqColor || "text-zinc-400"
              }`}
            >
              {item.freq}
            </span>
          </div>
        </div>

        {/* 2. Visual Viewport with 3D Depth & Scanline */}
        <div
          className="mt-3 relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/90 transition-transform duration-200"
          style={{ transform: "translateZ(20px)" }}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 select-none"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

          {isHovered && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_rgba(103,232,249,0.9)] animate-scanline" />
            </div>
          )}

          <div
            className={`absolute inset-2 pointer-events-none transition-opacity duration-300 z-10 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-cyan-400/80" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-cyan-400/80" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-cyan-400/80" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-cyan-400/80" />
          </div>

          <div
            className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[8px] sm:text-[8.5px] font-mono text-zinc-300 tracking-wider flex items-center gap-1.5 transition-transform duration-200"
            style={{ transform: "translateZ(38px)" }}
          >
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
            <span>{item.coordinates}</span>
          </div>

          <div
            className={`absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/15 text-[7.5px] font-mono tracking-widest text-zinc-400 uppercase transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
            }`}
            style={{ transform: "translateZ(34px)" }}
          >
            LOG // 0{item.num}
          </div>
        </div>

        {/* 3. Title & Habitat Row */}
        <div
          className="mt-3.5 flex items-start justify-between gap-2 min-h-[2.6rem] transition-transform duration-200"
          style={{ transform: "translateZ(30px)" }}
        >
          <h3 className="text-[15.5px] sm:text-[16.5px] font-semibold text-white tracking-tight leading-snug group-hover:text-zinc-100 group-hover:translate-x-0.5 transition-all">
            {item.name}
          </h3>
          <span className="text-[8px] sm:text-[8.5px] font-mono uppercase text-zinc-500 tracking-wider text-right leading-tight max-w-[110px] pt-0.5 shrink-0 group-hover:text-zinc-400 transition-colors">
            {item.habitat}
          </span>
        </div>

        {/* 4. Short Description */}
        <p
          className="mt-2 text-[11px] sm:text-[11.5px] text-zinc-400 font-light leading-relaxed line-clamp-3 min-h-[3.2rem] transition-transform duration-200"
          style={{ transform: "translateZ(24px)" }}
        >
          {item.description}
        </p>

        {/* 5. Card Bottom Action Bar */}
        <div
          className="mt-3.5 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[9px] sm:text-[9.5px] font-mono tracking-wider transition-transform duration-200"
          style={{ transform: "translateZ(28px)" }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDossier(item);
            }}
            className="text-zinc-400 hover:text-white transition-colors uppercase flex items-center gap-1.5 group/btn focus:outline-none"
          >
            <span>VIEW DETAILS</span>
            <span className="transition-transform duration-300 group-hover/btn:translate-x-1 text-white">
              →
            </span>
          </button>

          <div className="flex items-center gap-1.5 text-zinc-400">
            <span
              className={`w-1.5 h-1.5 rounded-full ${item.statusColor} shadow-[0_0_8px_currentColor] animate-pulse`}
            />
            <span className="uppercase text-[8.5px] tracking-wider font-medium">
              {item.status}
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}

// Detailed Dossier Modal for Projects & Experience
function PortfolioDossierModal({
  item,
  onClose,
}: {
  item: PortfolioItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-2xl animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#090a0d] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden text-white"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"
          aria-hidden="true"
        />

        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
              DOSSIER RECORD // [ {item.num} ] {item.category}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dossier modal"
            className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 flex items-center justify-center text-sm text-zinc-300 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="flex flex-col gap-3">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-white/15">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[9px] font-mono text-zinc-200">
                {item.coordinates}
              </div>
            </div>

            {/* Links or Status */}
            <div className="space-y-2 pt-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                <span className="text-zinc-500">GitHub:</span>
                {item.githubUrl?.startsWith("http") ? (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>View Repository</span>
                    <span>↗</span>
                  </a>
                ) : (
                  <span className="text-zinc-300">{item.githubUrl || "Not added yet"}</span>
                )}
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                <span className="text-zinc-500">Live Demo:</span>
                {item.liveUrl?.startsWith("http") ? (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-white flex items-center gap-1 transition-colors font-medium"
                  >
                    <span>{item.liveUrl.replace(/^https?:\/\//, "")}</span>
                    <span>↗</span>
                  </a>
                ) : (
                  <span className="text-zinc-300">{item.liveUrl || "Not added yet"}</span>
                )}
              </div>

              {item.secondaryLiveUrl && (
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                  <span className="text-zinc-500">Client Site 2:</span>
                  <a
                    href={item.secondaryLiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-white flex items-center gap-1 transition-colors font-medium"
                  >
                    <span>{item.secondaryLiveUrl.replace(/^https?:\/\//, "")}</span>
                    <span>↗</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                {item.category}
              </div>
              <h3 className="text-2xl font-serif font-medium text-white tracking-wide mt-1">
                {item.name}
              </h3>
              <div className="text-xs font-mono text-zinc-400 mt-0.5">
                {item.habitat}
              </div>
            </div>

            {/* Features / Key Responsibilities */}
            {item.features && item.features.length > 0 && (
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="text-[9px] font-mono tracking-widest uppercase text-zinc-500 mb-2">
                  // KEY RESPONSIBILITIES & FEATURES
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-300 font-light">
                  {item.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 shrink-0">✦</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            {item.techStack && (
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono">
                <div className="text-zinc-500 uppercase">Technologies Used</div>
                <div className="text-white font-medium mt-0.5">{item.techStack}</div>
              </div>
            )}

            {/* Detailed Description */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-[9px] font-mono tracking-widest uppercase text-zinc-500 mb-1">
                // OVERVIEW
              </div>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                {item.detailsNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FloriaDiscoveryAndFooter() {
  const [selectedDossier, setSelectedDossier] = useState<PortfolioItem | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Contact form state
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  // ZERO-LAG SPOTLIGHT: Update DOM directly to avoid triggering full 1000-line React re-renders on mousemove
  const handleSectionMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current || !spotlightRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(650px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.04) 0%, rgba(244, 63, 94, 0.02) 40%, transparent 80%)`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="relative w-full bg-[#000000] text-white selection:bg-white selection:text-black z-30 overflow-hidden"
    >
      {/* Background Architectural Grid Pattern with Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px]"
        aria-hidden="true"
      />

      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(650px circle at 50% 30%, rgba(34, 211, 238, 0.04) 0%, rgba(244, 63, 94, 0.02) 40%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-60"
        aria-hidden="true"
      >
        <div className="absolute top-[12%] left-[15%] w-[420px] h-[420px] bg-cyan-950/20 blur-[140px] rounded-full" />
        <div className="absolute top-[40%] right-[10%] w-[450px] h-[450px] bg-fuchsia-950/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[25%] left-[25%] w-[500px] h-[500px] bg-emerald-950/20 blur-[150px] rounded-full" />
      </div>

      {/* =========================================================================
          SECTION HEADER: PROJECTS, EXPERIENCE & SKILLS
      ========================================================================= */}
      <section
        id="projects"
        className="relative z-10 pt-20 sm:pt-28 md:pt-32 pb-12 px-6 sm:px-10 max-w-6xl mx-auto"
      >
        {/* Floating Top Field Journal Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5 mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.28em] uppercase text-zinc-400">
              DEVELOPER CODEX // VOL. 2026
            </span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-zinc-500">
            <span>[ ID: JAMES-DEV ]</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">PPG INSTITUTE OF TECHNOLOGY</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-zinc-400">STATUS: OPEN TO ROLES</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="relative">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[0.03em] uppercase text-white font-serif leading-[1.05]">
            Featured{" "}
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent italic font-light">
              Work & Skills
            </span>
          </h2>

          <div className="mt-3 sm:mt-4 max-w-2xl">
            <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-light leading-relaxed">
              Full-stack MERN applications, deployed client websites, verified achievements, and core technical skill matrices built by James Aathithyan.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EDITORIAL SPECIMEN CARD GRID (Interactive 3D Holographic Cards)
          Increased bottom padding for staggered card layout clearance
      ========================================================================= */}
      <section
        ref={sectionRef}
        onMouseMove={handleSectionMouseMove}
        className="relative z-10 px-4 sm:px-8 max-w-6xl mx-auto pb-28 sm:pb-36"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 justify-items-center items-start">
          {PORTFOLIO_ITEMS.map((item) => (
            <InteractivePortfolioCard
              key={item.id}
              item={item}
              onOpenDossier={(it) => setSelectedDossier(it)}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          ADDITIONAL SECTIONS & PROFESSIONAL PLACEHOLDERS
          Preserves complete developer portfolio structure with intentional placeholders
      ========================================================================= */}
      <section className="relative z-10 px-4 sm:px-8 max-w-6xl mx-auto pb-20 sm:pb-28 border-t border-white/[0.08] pt-14 sm:pt-20">
        <div className="mb-8 sm:mb-10">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-500 block mb-2">
            // EXTENDED ARCHIVE & PORTFOLIO EXTENSIONS
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">
            Additional Records & Details
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* 1. Additional Projects Placeholder */}
          <div className="p-5 rounded-2xl bg-[#090a0d]/85 hover:bg-[#0d0f14]/95 border border-white/[0.08] hover:border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 h-full min-h-[190px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-2.5">
                <span>PROJECT ARCHIVE</span>
                <span className="text-zinc-500 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10">UPCOMING</span>
              </div>
              <h4 className="text-base font-semibold text-white">Project Coming Soon</h4>
              <p className="text-xs text-zinc-400 font-light mt-1.5 leading-relaxed">
                Project details will be added soon.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[9.5px] font-mono text-zinc-400 flex flex-col gap-0.5">
              <span>GitHub link — Not added yet</span>
              <span>Live demo — Not added yet</span>
            </div>
          </div>

          {/* 2. Additional Certifications Placeholder */}
          <div className="p-5 rounded-2xl bg-[#090a0d]/85 hover:bg-[#0d0f14]/95 border border-white/[0.08] hover:border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 h-full min-h-[190px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-2.5">
                <span>CREDENTIALS</span>
                <span className="text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-500/30">IN PROGRESS</span>
              </div>
              <h4 className="text-base font-semibold text-white">Certifications</h4>
              <p className="text-xs text-zinc-400 font-light mt-1.5 leading-relaxed">
                Additional certifications will be added soon.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-cyan-400 flex items-center justify-between">
              <span className="truncate">Oracle OCI 2025 AI Associate</span>
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">ACTIVE</span>
            </div>
          </div>

          {/* 3. Additional Achievements Placeholder */}
          <div className="p-5 rounded-2xl bg-[#090a0d]/85 hover:bg-[#0d0f14]/95 border border-white/[0.08] hover:border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 h-full min-h-[190px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-2.5">
                <span>HONORS</span>
                <span className="text-amber-400 px-2 py-0.5 rounded-full bg-amber-950/40 border border-amber-500/30">ARCHIVE</span>
              </div>
              <h4 className="text-base font-semibold text-white">Achievements</h4>
              <p className="text-xs text-zinc-400 font-light mt-1.5 leading-relaxed">
                More achievements will be added soon.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-amber-400 flex items-center justify-between">
              <span className="truncate">2nd Place National Hackathon</span>
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300">AWARD</span>
            </div>
          </div>

          {/* 4. Services Placeholder */}
          <div className="p-5 rounded-2xl bg-[#090a0d]/85 hover:bg-[#0d0f14]/95 border border-white/[0.08] hover:border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 h-full min-h-[190px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-2.5">
                <span>SERVICES</span>
                <span className="text-zinc-500 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10">INQUIRY</span>
              </div>
              <h4 className="text-base font-semibold text-white">Services</h4>
              <p className="text-xs text-zinc-400 font-light mt-1.5 leading-relaxed">
                Services — Details coming soon
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-zinc-500">
              Freelance & Contract Development
            </div>
          </div>

          {/* 5. Testimonials Placeholder */}
          <div className="p-5 rounded-2xl bg-[#090a0d]/85 hover:bg-[#0d0f14]/95 border border-white/[0.08] hover:border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 h-full min-h-[190px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-2.5">
                <span>FEEDBACK</span>
                <span className="text-zinc-500 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10">CLIENTS</span>
              </div>
              <h4 className="text-base font-semibold text-white">Testimonials</h4>
              <p className="text-xs text-zinc-400 font-light mt-1.5 leading-relaxed">
                Testimonials will be added soon.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-zinc-500">
              Testimonials — Coming Soon
            </div>
          </div>

          {/* 6. Interests Placeholder */}
          <div className="p-5 rounded-2xl bg-[#090a0d]/85 hover:bg-[#0d0f14]/95 border border-white/[0.08] hover:border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 h-full min-h-[190px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-2.5">
                <span>PERSONAL</span>
                <span className="text-zinc-500 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10">PROFILE</span>
              </div>
              <h4 className="text-base font-semibold text-white">Interests</h4>
              <p className="text-xs text-zinc-400 font-light mt-1.5 leading-relaxed">
                Interests — Details coming soon
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-zinc-500">
              Interests — Coming Soon
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTACT SECTION (#contact)
          Professional Direct Contact & Inquiry Form
      ========================================================================= */}
      <section
        id="contact"
        className="relative z-10 border-t border-white/[0.1] pt-16 sm:pt-20 pb-20 px-6 sm:px-10 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14">
          {/* Left Column: Direct Contact Information */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6 sm:space-y-7">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-zinc-400 block mb-3">
                // CONTACT & INQUIRIES
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif text-white font-medium tracking-wide">
                Let&apos;s build something together.
              </h3>
              <p className="mt-3.5 text-sm text-zinc-300 font-light leading-relaxed">
                Open for full-time full-stack engineering opportunities, MERN projects, and freelance client engagements. Feel free to reach out directly.
              </p>
            </div>

            {/* Direct Contact Links */}
            <div className="space-y-3.5 text-xs font-mono">
              <a
                href="mailto:jamesaathithyandev@gmail.com"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-cyan-400 shrink-0">✉</span>
                  <span className="truncate text-[11px] sm:text-xs">jamesaathithyandev@gmail.com</span>
                </div>
                <span className="text-zinc-500 group-hover:text-white transition-colors shrink-0 ml-2">↗</span>
              </a>

              <a
                href="tel:+917695991483"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-emerald-400 shrink-0">☎</span>
                  <span className="text-[11px] sm:text-xs">+91 7695991483</span>
                </div>
                <span className="text-zinc-500 group-hover:text-white transition-colors shrink-0 ml-2">↗</span>
              </a>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-zinc-400 flex items-center justify-between text-[11px] sm:text-xs">
                <span>Location:</span>
                <span className="text-white">Coimbatore, Tamil Nadu, India</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Response Time: Typically within 24 hours</span>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleFormSubmit}
              className="p-6 sm:p-8 rounded-3xl bg-[#090a0d]/90 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl space-y-4"
            >
              <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 mb-2">
                SEND A DIRECT MESSAGE
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-white/30 text-white text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-white/30 text-white text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Project inquiry or message..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-white/30 text-white text-sm outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-widest uppercase hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                {submitted ? "Message Sent Successfully ✓" : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DEVELOPER ART-BOOK FOOTER
          Minimal, monumental typographic final page of the exhibition
      ========================================================================= */}
      <footer
        id="footer"
        className="relative z-10 border-t border-white/[0.1] pt-14 sm:pt-20 pb-12 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-14 pb-14 border-b border-white/[0.08]">
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-zinc-400">
                // ARCHIVE MANIFESTO
              </span>
              <p className="mt-4 text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-md">
                James Aathithyan is a full-stack developer and B.Tech Information Technology student at PPG Institute of Technology, dedicated to building real-time applications and clean REST architectures.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-[10px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Education: PPG Institute of Technology (2023–2027) • CGPA: 7.0</span>
            </div>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 gap-8 text-xs font-mono tracking-wider">
            <div>
              <span className="text-zinc-400 uppercase text-[10px] block mb-4">
                EXPLORE
              </span>
              <ul className="space-y-3 text-zinc-300">
                {[
                  { name: "Home", href: "#hero" },
                  { name: "About", href: "#explore" },
                  { name: "Projects", href: "#projects" },
                  { name: "Experience", href: "#projects" },
                  { name: "Contact", href: "#contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="hover:text-white transition-colors duration-200 block"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-zinc-400 uppercase text-[10px] block mb-4">
                EXPERIENCE
              </span>
              <ul className="space-y-3 text-zinc-300">
                {[
                  "Freelance Developer",
                  "Techinta MERN Intern",
                  "National Hackathon",
                  "Oracle OCI Certified",
                  "MERN Task App",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#projects"
                      className="hover:text-white transition-colors duration-200 block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-3 text-xs font-mono tracking-wider">
            <span className="text-zinc-400 uppercase text-[10px] block mb-4">
              CHANNELS
            </span>
            <ul className="space-y-3 text-zinc-300">
              {[
                { name: "/GitHub", url: "https://github.com/Jamesaathithyandev" },
                {
                  name: "/LinkedIn",
                  url: "https://www.linkedin.com/in/james-aathithyan-1412931b9/",
                },
                { name: "/Email", url: "mailto:jamesaathithyandev@gmail.com" },
                { name: "/Phone", url: "tel:+917695991483" },
              ].map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200 flex items-center justify-between group"
                  >
                    <span>{social.name}</span>
                    <span className="text-[10px] text-zinc-400 group-hover:text-white transition-colors">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Oversized Monumental AATHITHYAN Typography - Balanced scale with solid white contrast */}
        <div className="py-10 sm:py-14 md:py-16 text-center select-none overflow-hidden max-w-full">
          <h1 className="text-[8.5vw] sm:text-[9.5vw] md:text-[10vw] font-serif font-black tracking-[-0.02em] leading-none uppercase text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.2)] whitespace-nowrap">
            AATHITHYAN
          </h1>
        </div>

        {/* Legal & Sub-Footer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400">
          <div>
            © 2026 JAMES AATHITHYAN • B.TECH IT // PPG INSTITUTE OF TECHNOLOGY
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/Jamesaathithyandev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GITHUB
            </a>
            <a href="https://www.linkedin.com/in/james-aathithyan-1412931b9/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LINKEDIN
            </a>
            <a href="mailto:jamesaathithyandev@gmail.com" className="hover:text-white transition-colors">
              EMAIL
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Dossier Modal */}
      {selectedDossier && (
        <PortfolioDossierModal
          item={selectedDossier}
          onClose={() => setSelectedDossier(null)}
        />
      )}
    </div>
  );
}
