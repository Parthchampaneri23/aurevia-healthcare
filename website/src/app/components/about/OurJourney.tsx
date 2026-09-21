"use client";

import {
  Building2,
  Factory,
  ShieldCheck,
  Package,
  Handshake,
} from "lucide-react";
import { motion } from "framer-motion";

const journeyStages = [
  {
    number: "01",
    title: "Foundation",
    description: "A strong base for reliable pharmaceutical manufacturing.",
    icon: Building2,
  },
  {
    number: "02",
    title: "Manufacturing",
    description: "Structured capabilities built for consistency and efficiency.",
    icon: Factory,
  },
  {
    number: "03",
    title: "Quality",
    description: "Focused processes and controls across manufacturing and handling.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Product Portfolio",
    description: "Expanding categories to meet wider healthcare needs.",
    icon: Package,
  },
  {
    number: "05",
    title: "Partnerships",
    description: "Long-term relationships built on dependable service.",
    icon: Handshake,
  },
];

export default function OurJourney() {
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-12 border-t border-slate-100">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
              OUR GROWTH PATH
            </p>
            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" aria-hidden="true" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#123B5D] leading-tight">
            From Foundation to <span className="bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">Partnership</span>
          </h2>

          <p className="mt-4 text-base md:text-[17px] font-normal leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Every stage of our growth is guided by quality, consistency and long-term healthcare partnerships.
          </p>
        </div>

        {/* Desktop View (>= 1024px) */}
        <div className="hidden lg:block relative mt-16">
          {/* Continuous Horizontal Timeline Line */}
          <div className="absolute top-[24px] left-[10%] right-[10%] h-[3px] bg-slate-200 z-0 rounded-full overflow-hidden" aria-hidden="true">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[#0F766E] via-[#123B5D] to-[#0F766E] rounded-full"
            />
          </div>

          {/* 5-Column Grid */}
          <ol className="grid grid-cols-5 gap-6 relative z-10">
            {journeyStages.map((stage, index) => {
              const Icon = stage.icon;

              return (
                <motion.li
                  key={stage.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
                  className="group flex flex-col items-center"
                >
                  {/* Node Circle (48px) */}
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0F766E] font-bold text-base text-white shadow-md transition-all duration-500 ring-4 ring-white group-hover:scale-110 group-hover:bg-[#123B5D] group-hover:ring-teal-400/40 group-hover:shadow-lg group-hover:shadow-teal-950/20"
                  >
                    {stage.number}
                  </div>

                  {/* Vertical Connector Line */}
                  <div className="w-[2px] h-6 bg-gradient-to-b from-teal-600/50 to-teal-600/20 my-1 transition-all duration-300 group-hover:h-7 group-hover:bg-teal-600" aria-hidden="true" />

                  {/* White Card Below Node */}
                  <div
                    className="relative w-full flex-1 overflow-hidden rounded-2xl border-2 border-slate-300/90 bg-white p-6 shadow-md transition-all duration-500 hover:-translate-y-2.5 hover:border-[#0F766E] hover:shadow-2xl hover:shadow-teal-950/15"
                  >
                    {/* Top Slide Accent Line */}
                    <div
                      className="absolute top-0 left-0 z-20 h-[3.5px] w-0 bg-gradient-to-r from-[#123B5D] via-[#0F766E] to-[#123B5D] transition-all duration-500 group-hover:w-full"
                      aria-hidden="true"
                    />

                    {/* Icon Header Box */}
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E] mb-4 shadow-xs transition-all duration-500 group-hover:bg-[#0F766E] group-hover:text-white group-hover:scale-110 group-hover:rotate-3"
                    >
                      <Icon size={20} strokeWidth={2} aria-hidden="true" />
                    </div>

                    {/* Card Title */}
                    <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#0F766E]">
                      {stage.title}
                    </h3>

                    {/* Card Description */}
                    <p className="mt-2 text-[15px] font-normal leading-relaxed text-slate-600">
                      {stage.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* Tablet View (640px to 1023px: 2-column grid) */}
        <div className="hidden sm:block lg:hidden mt-12">
          <ol className="grid grid-cols-2 gap-6">
            {journeyStages.map((stage, index) => {
              const Icon = stage.icon;

              return (
                <motion.li
                  key={stage.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
                  className="group flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0F766E] font-bold text-base text-white shadow-md transition-all duration-500 ring-4 ring-white group-hover:scale-110 group-hover:bg-[#123B5D] group-hover:ring-teal-400/40"
                    >
                      {stage.number}
                    </div>
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-teal-600/40 to-transparent" aria-hidden="true" />
                  </div>

                  <div
                    className="relative h-full overflow-hidden rounded-2xl border-2 border-slate-300/90 bg-white p-6 shadow-md transition-all duration-500 hover:-translate-y-2.5 hover:border-[#0F766E] hover:shadow-2xl hover:shadow-teal-950/15"
                  >
                    {/* Top Slide Accent Line */}
                    <div
                      className="absolute top-0 left-0 z-20 h-[3.5px] w-0 bg-gradient-to-r from-[#123B5D] via-[#0F766E] to-[#123B5D] transition-all duration-500 group-hover:w-full"
                      aria-hidden="true"
                    />

                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E] mb-4 shadow-xs transition-all duration-500 group-hover:bg-[#0F766E] group-hover:text-white group-hover:scale-110 group-hover:rotate-3"
                    >
                      <Icon size={20} strokeWidth={2} aria-hidden="true" />
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#0F766E]">
                      {stage.title}
                    </h3>

                    <p className="mt-2 text-[15px] font-normal leading-relaxed text-slate-600">
                      {stage.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* Mobile View (< 640px: Vertical timeline with line on the left and nodes on it) */}
        <div className="sm:hidden mt-12 pl-6 relative border-l-2 border-teal-600/30 ml-4">
          <ol className="space-y-8">
            {journeyStages.map((stage, index) => {
              const Icon = stage.icon;

              return (
                <motion.li
                  key={stage.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
                  className="group relative"
                >
                  {/* Circular Node on Left Timeline Line */}
                  <div
                    className="absolute -left-[41px] top-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0F766E] font-bold text-sm text-white shadow-md ring-4 ring-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#123B5D]"
                  >
                    {stage.number}
                  </div>

                  {/* White Card */}
                  <div
                    className="relative overflow-hidden rounded-2xl border-2 border-slate-300/90 bg-white p-6 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:border-[#0F766E] hover:shadow-xl active:scale-[0.98]"
                  >
                    {/* Top Slide Accent Line */}
                    <div
                      className="absolute top-0 left-0 z-20 h-[3.5px] w-0 bg-gradient-to-r from-[#123B5D] via-[#0F766E] to-[#123B5D] transition-all duration-500 group-hover:w-full"
                      aria-hidden="true"
                    />

                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E] mb-4 shadow-xs transition-all duration-500 group-hover:bg-[#0F766E] group-hover:text-white group-hover:scale-110"
                    >
                      <Icon size={20} strokeWidth={2} aria-hidden="true" />
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#0F766E]">
                      {stage.title}
                    </h3>

                    <p className="mt-2 text-[15px] font-normal leading-relaxed text-slate-600">
                      {stage.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}