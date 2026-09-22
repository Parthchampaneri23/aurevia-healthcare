"use client";

import { Pill, Syringe, Sparkles, ShieldCheck, Package, Layers } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  {
    icon: Pill,
    title: "Tablet & Capsule Manufacturing",
    description: "High-capacity automated compression and encapsulation lines operating under cGMP environmental controls.",
    badge: "Dosage Formulation",
    accent: "from-[#0F766E] to-[#123B5D]",
    iconBg: "bg-teal-50 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
  },
  {
    icon: Layers,
    title: "Liquid Oral Syrups & Suspensions",
    description: "Multi-stage automated liquid blending, filtration, and precision filling for oral suspension dosage forms.",
    badge: "Liquid Lines",
    accent: "from-[#123B5D] to-[#0F766E]",
    iconBg: "bg-blue-50 text-[#123B5D] group-hover:bg-[#123B5D] group-hover:text-white",
  },
  {
    icon: Syringe,
    title: "Sterile Injectables & Ampoules",
    description: "Controlled cleanroom filling for parenteral liquid injectables and specialized liquid ampoules.",
    badge: "Sterile Lines",
    accent: "from-[#0F766E] to-[#123B5D]",
    iconBg: "bg-teal-50 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
  },
  {
    icon: ShieldCheck,
    title: "Ointments & Topical Creams",
    description: "Homogeneous vacuum emulsification and hygienic tube packaging for topical creams and dermatological preparations.",
    badge: "Topical Formulations",
    accent: "from-[#123B5D] to-[#0F766E]",
    iconBg: "bg-blue-50 text-[#123B5D] group-hover:bg-[#123B5D] group-hover:text-white",
  },
  {
    icon: Sparkles,
    title: "Nutraceuticals & Wellness Formulations",
    description: "Quality dietary supplements, vitamin blends, and wellness formulations manufactured to exact batch specifications.",
    badge: "Nutraceuticals",
    accent: "from-[#0F766E] to-[#123B5D]",
    iconBg: "bg-teal-50 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
  },
  {
    icon: Package,
    title: "B2B Contract & Private Label Supply",
    description: "End-to-end commercial dosage packaging, strip/blister packing, and custom label execution for distributor partners.",
    badge: "Commercial Supply",
    accent: "from-[#123B5D] to-[#0F766E]",
    iconBg: "bg-blue-50 text-[#123B5D] group-hover:bg-[#123B5D] group-hover:text-white",
  },
];

export default function WhatWeDo() {
  return (
    <section aria-label="What We Do" className="relative overflow-hidden bg-[#F0F7F7] py-12 sm:py-12 lg:py-12 border-b border-teal-100/60">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
              WHAT WE DO
            </p>
            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#123B5D] leading-tight">
            Core Manufacturing &amp; <span className="bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">Supply Capabilities</span>
          </h2>

          <p className="mt-4 text-base md:text-[17px] font-normal leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Supporting healthcare companies with high-capacity dosage formulations, structured batch controls, and dependable supply.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="mt-12 mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#0F766E] hover:shadow-xl hover:shadow-teal-950/10"
                >
                  {/* Top Slide Accent Line */}
                  <div
                    className={`absolute top-0 left-0 h-[3.5px] w-0 bg-gradient-to-r ${item.accent} transition-all duration-500 group-hover:w-full`}
                    aria-hidden="true"
                  />

                  <div>
                    {/* Icon & Badge Header Row */}
                    <div className="flex items-center justify-between gap-3">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-2xs transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${item.iconBg}`}
                      >
                        <Icon size={22} strokeWidth={2} />
                      </div>

                      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-[#0F766E] border border-slate-200/80">
                        {item.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-5 text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#0F766E]">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 text-sm font-normal leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>

                  {/* Subtle Card Footer */}
                  <div className="mt-6 border-t border-slate-100 pt-3.5 flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span className="group-hover:text-[#0F766E] transition-colors">Aurevia Capability</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
