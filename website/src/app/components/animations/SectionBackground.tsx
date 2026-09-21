"use client";

import React, { useEffect, useRef, useState } from "react";

interface SectionBackgroundProps {
  variant?:
    | "molecular"
    | "medical-grid"
    | "scientific-rings"
    | "particle-field"
    | "soft-wave"
    | "connection-network"
    | "ambient-glow"
    | "process-pathway";
  className?: string;
  children?: React.ReactNode;
}

export default function SectionBackground({
  variant = "molecular",
  className = "",
  children,
}: SectionBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
    >
      {/* Background Decorative Layer */}
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden z-0 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        {variant === "molecular" && <MolecularField />}
        {variant === "medical-grid" && <MedicalGrid />}
        {variant === "scientific-rings" && <ScientificRings />}
        {variant === "particle-field" && <ParticleField />}
        {variant === "soft-wave" && <SoftWave />}
        {variant === "connection-network" && <ConnectionNetwork />}
        {variant === "ambient-glow" && <AmbientGlow />}
        {variant === "process-pathway" && <ProcessPathway />}
      </div>

      {/* Actual Content Layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* 1. Molecular Field (Pharmaceutical / Science / Product) */
function MolecularField() {
  return (
    <div className="absolute inset-0">
      {/* Floating subtle molecular node group 1 */}
      <div className="absolute top-10 left-[8%] h-32 w-32 animate-pulse opacity-40 sm:opacity-60 transition-all duration-1000">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#0F766E]/20 fill-none stroke-[1.2]">
          <circle cx="30" cy="30" r="6" className="fill-[#0F766E]/10 stroke-[#0F766E]/30" />
          <circle cx="70" cy="40" r="4" className="fill-[#123B5D]/10 stroke-[#123B5D]/30" />
          <circle cx="50" cy="80" r="5" className="fill-[#2A9D8F]/10 stroke-[#2A9D8F]/30" />
          <line x1="30" y1="30" x2="70" y2="40" />
          <line x1="70" y1="40" x2="50" y2="80" />
          <line x1="50" y1="80" x2="30" y2="30" />
        </svg>
      </div>

      {/* Floating subtle molecular node group 2 (Right) */}
      <div className="absolute bottom-8 right-[6%] h-40 w-40 opacity-30 sm:opacity-50">
        <svg viewBox="0 0 120 120" className="w-full h-full stroke-[#123B5D]/20 fill-none stroke-[1.2]">
          <circle cx="40" cy="30" r="5" className="fill-[#0F766E]/15" />
          <circle cx="85" cy="45" r="7" className="fill-[#123B5D]/15" />
          <circle cx="60" cy="90" r="5" className="fill-[#0F766E]/15" />
          <line x1="40" y1="30" x2="85" y2="45" />
          <line x1="85" y1="45" x2="60" y2="90" />
        </svg>
      </div>

      {/* Ambient soft teal radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-tr from-[#0F766E]/5 via-[#2A9D8F]/4 to-transparent blur-3xl" />
    </div>
  );
}

/* 2. Medical Grid (Technical / Manufacturing / Capabilities) */
function MedicalGrid() {
  return (
    <div className="absolute inset-0">
      {/* Subtle Scientific Cross Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] sm:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(#0F766E 1px, transparent 1px), radial-gradient(#123B5D 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          backgroundPosition: "0 0, 16px 16px",
        }}
      />
      <div className="absolute top-0 right-1/4 h-64 w-64 rounded-full bg-[#0F766E]/5 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-[#123B5D]/5 blur-3xl" />
    </div>
  );
}

/* 3. Scientific Rings (Healthcare / Vision / Quality) */
function ScientificRings() {
  return (
    <div className="absolute inset-0">
      {/* Large faint orbital rings */}
      <div className="absolute -top-16 -right-16 h-80 w-80 rounded-full border border-[#0F766E]/10 opacity-60 sm:opacity-80 animate-spin-slow" />
      <div className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full border border-dashed border-[#123B5D]/10 opacity-50" />

      <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full border border-[#0F766E]/10 opacity-40 sm:opacity-70" />
      <div className="absolute top-1/3 left-10 h-32 w-32 rounded-full bg-[#0F766E]/5 blur-2xl" />
    </div>
  );
}

/* 4. Particle Field (R&D / Formulations / Blog) */
function ParticleField() {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-12 left-[12%] h-2 w-2 rounded-full bg-[#0F766E]/30 animate-ping duration-1000" />
      <div className="absolute top-1/4 right-[15%] h-2.5 w-2.5 rounded-full bg-[#123B5D]/25" />
      <div className="absolute bottom-1/3 left-[20%] h-3 w-3 rounded-full bg-[#2A9D8F]/20" />
      <div className="absolute bottom-12 right-[25%] h-2 w-2 rounded-full bg-[#0F766E]/35" />

      {/* Floating dust particles */}
      <div className="absolute inset-0 bg-[radial-gradient(#0F766E_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]" />
    </div>
  );
}

/* 5. Soft Wave (Heritage / Journey / Culture) */
function SoftWave() {
  return (
    <div className="absolute inset-0">
      <svg
        viewBox="0 0 1440 320"
        className="absolute bottom-0 left-0 w-full opacity-[0.04] stroke-[#0F766E] fill-none stroke-[2]"
        preserveAspectRatio="none"
      >
        <path d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,208C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256" />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-full max-w-5xl bg-gradient-to-r from-transparent via-[#0F766E]/5 to-transparent blur-3xl" />
    </div>
  );
}

/* 6. Connection Network (Contact / Partners / Careers) */
function ConnectionNetwork() {
  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full opacity-20 sm:opacity-35" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#123B5D" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0F766E" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <path d="M 50 100 Q 200 40 400 120 T 800 80 T 1200 140" fill="none" stroke="url(#netGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="400" cy="120" r="4" className="fill-[#0F766E] opacity-50" />
        <circle cx="800" cy="80" r="5" className="fill-[#123B5D] opacity-40" />
        <circle cx="1200" cy="140" r="4" className="fill-[#2A9D8F] opacity-50" />
      </svg>
      <div className="absolute top-1/3 right-10 h-48 w-48 rounded-full bg-[#0F766E]/5 blur-3xl" />
    </div>
  );
}

/* 7. Ambient Glow (Stats / General / FAQs) */
function AmbientGlow() {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-72 w-72 rounded-full bg-[#0F766E]/5 blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 h-72 w-72 rounded-full bg-[#123B5D]/5 blur-3xl" />
    </div>
  );
}

/* 8. Process Pathway (Manufacturing Process / Workflow) */
function ProcessPathway() {
  return (
    <div className="absolute inset-0">
      <div className="hidden md:block absolute top-1/2 left-10 right-10 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#0F766E]/20 to-transparent" />
      <div className="absolute top-1/2 left-1/3 h-3 w-3 rounded-full bg-[#0F766E]/40 animate-ping" />
      <div className="absolute top-1/2 right-1/3 h-3 w-3 rounded-full bg-[#123B5D]/40" />
    </div>
  );
}
