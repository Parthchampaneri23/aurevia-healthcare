"use client";

import {
  Eye,
  Target,
  CheckCircle2,
  ShieldCheck,
  Award,
  Users,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";

const valuesData = [
  {
    icon: Award,
    title: "Quality First",
    description: "Uncompromising standards across every batch and formulation.",
    tag: "ISO & GMP",
    accent: "from-[#0F766E] to-[#123B5D]",
    iconBg: "bg-teal-50 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
  },
  {
    icon: ShieldCheck,
    title: "Compliance",
    description: "Strict alignment with WHO-GMP and international cGMP guidelines.",
    tag: "Regulatory",
    accent: "from-[#123B5D] to-[#0F766E]",
    iconBg: "bg-blue-50 text-[#123B5D] group-hover:bg-[#123B5D] group-hover:text-white",
  },
  {
    icon: Building2,
    title: "Reliability",
    description: "Dependable execution, supply stability, and commercial integrity.",
    tag: "Supply Chain",
    accent: "from-[#0F766E] to-[#123B5D]",
    iconBg: "bg-teal-50 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "Building long-term collaborative growth with healthcare leaders.",
    tag: "Collaborative",
    accent: "from-[#123B5D] to-[#0F766E]",
    iconBg: "bg-blue-50 text-[#123B5D] group-hover:bg-[#123B5D] group-hover:text-white",
  },
];

export default function MissionVision() {
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-12 border-t border-slate-100">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* 1. Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
              OUR PURPOSE
            </p>
            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#123B5D] leading-tight">
            Mission &amp; <span className="bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">Vision</span>
          </h2>

          <p className="mt-4 text-base md:text-[17px] font-normal leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Guided by a clear purpose and a long-term commitment to quality, reliability and healthcare partnerships.
          </p>
        </div>

        {/* 2. Two Compact Equal Size White Cards Grid */}
        <div className="mt-10 mx-auto max-w-5xl grid gap-6 md:grid-cols-2">
          {/* Card 1: OUR MISSION */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-slate-300/90 bg-white p-6 sm:p-7 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:border-[#0F766E] hover:shadow-xl hover:shadow-teal-950/15"
          >
            {/* Top Accent Bar */}
            <div className="absolute top-0 left-0 h-[3.5px] w-full bg-gradient-to-r from-[#0F766E] to-[#123B5D]" aria-hidden="true" />

            <div>
              {/* Top Header Row: Small Icon + Tag */}
              <div className="flex items-center justify-between gap-3">
                <div
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E] border border-teal-100 shadow-xs transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 group-hover:bg-[#0F766E] group-hover:text-white"
                >
                  <Target size={20} strokeWidth={2} />
                </div>

                <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-[#0F766E] border border-teal-200/70 shadow-2xs">
                  Quality &amp; Compliance First
                </span>
              </div>

              {/* Eyebrow Label */}
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
                OUR MISSION
              </p>

              {/* Title */}
              <h3 className="mt-1 text-lg font-semibold text-slate-900 leading-snug transition-colors duration-300 group-hover:text-[#0F766E]">
                Creating Reliable Healthcare Solutions
              </h3>

              {/* Description */}
              <p className="mt-2.5 text-[15px] font-normal leading-relaxed text-slate-600">
                To provide quality-focused pharmaceutical manufacturing solutions that support healthcare businesses and contribute to better healthcare outcomes.
              </p>
            </div>

            {/* Proof-Point Chips Footer */}
            <div className="mt-6 border-t border-slate-100 pt-4 relative z-10">
              <ul className="flex flex-wrap gap-2">
                {["WHO-GMP Aligned", "Batch Consistency", "Audit-Ready"].map((chip) => (
                  <li
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-100/90 px-3 py-1 text-xs font-medium text-slate-700 border border-slate-200/80 shadow-2xs"
                  >
                    <CheckCircle2 size={13} className="text-[#0F766E] shrink-0" aria-hidden="true" />
                    <span>{chip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card 2: OUR VISION */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-slate-300/90 bg-white p-6 sm:p-7 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:border-[#0F766E] hover:shadow-xl hover:shadow-teal-950/15"
          >
            {/* Top Accent Bar */}
            <div className="absolute top-0 left-0 h-[3.5px] w-full bg-gradient-to-r from-[#123B5D] via-[#0F766E] to-[#123B5D]" aria-hidden="true" />

            <div>
              {/* Top Header Row: Small Icon + Tag */}
              <div className="flex items-center justify-between gap-3">
                <div
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#123B5D] border border-blue-100 shadow-xs transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 group-hover:bg-[#123B5D] group-hover:text-white"
                >
                  <Eye size={20} strokeWidth={2} />
                </div>

                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[#123B5D] border border-blue-200/80 shadow-2xs">
                  Global Growth &amp; Excellence
                </span>
              </div>

              {/* Eyebrow Label */}
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
                OUR VISION
              </p>

              {/* Title */}
              <h3 className="mt-1 text-lg font-semibold text-slate-900 leading-snug transition-colors duration-300 group-hover:text-[#0F766E]">
                Building a Trusted Pharmaceutical Partner
              </h3>

              {/* Description */}
              <p className="mt-2.5 text-[15px] font-normal leading-relaxed text-slate-600">
                To build a Pharmaceutical Manufacturing organization recognized for quality, reliability, innovation and long-term partnerships.
              </p>
            </div>

            {/* Proof-Point Chips Footer */}
            <div className="mt-6 border-t border-slate-100 pt-4 relative z-10">
              <ul className="flex flex-wrap gap-2">
                {["Global Markets", "Innovation", "Long-term Partnerships"].map((chip) => (
                  <li
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-100/90 px-3 py-1 text-xs font-medium text-slate-700 border border-slate-200/80 shadow-2xs"
                  >
                    <CheckCircle2 size={13} className="text-[#0F766E] shrink-0" aria-hidden="true" />
                    <span>{chip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}