"use client";

import {
    ShieldCheck,
    RefreshCw,
    Scale,
    Users,
    CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const principles = [
    {
        number: "01",
        title: "QUALITY",
        subtitle: "Uncompromising Batch Standards",
        description:
            "Maintaining disciplined batch-to-batch quality control across raw material testing, cleanroom formulations, and finished dosage inspection.",
        icon: ShieldCheck,
        accent: "from-[#0F766E] to-[#123B5D]",
        iconBg: "bg-teal-50 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
    },
    {
        number: "02",
        title: "CONSISTENCY",
        subtitle: "Controlled Process Execution",
        description:
            "Applying standardized cGMP manufacturing protocols and automated dosage controls to guarantee consistent chemical stability and physical properties.",
        icon: RefreshCw,
        accent: "from-[#123B5D] to-[#0F766E]",
        iconBg: "bg-blue-50 text-[#123B5D] group-hover:bg-[#123B5D] group-hover:text-white",
    },
    {
        number: "03",
        title: "RESPONSIBILITY",
        subtitle: "Regulatory & Ethical Integrity",
        description:
            "Operating with complete transparency, audit-ready compliance documentation, vendor qualification, and environmental responsibility.",
        icon: Scale,
        accent: "from-[#0F766E] to-[#123B5D]",
        iconBg: "bg-teal-50 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
    },
    {
        number: "04",
        title: "PARTNERSHIP",
        subtitle: "Collaborative B2B Growth",
        description:
            "Building long-term strategic relationships with healthcare brands by offering responsive communication, technical support, and reliable commercial supply.",
        icon: Users,
        accent: "from-[#123B5D] to-[#0F766E]",
        iconBg: "bg-blue-50 text-[#123B5D] group-hover:bg-[#123B5D] group-hover:text-white",
    },
];

export default function CoreValues() {
    return (
        <section aria-label="Core Principles" className="relative overflow-hidden bg-white py-12 sm:py-12 lg:py-12 border-b border-slate-100">
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 mb-3 justify-center">
                        <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" />
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                            OUR WORKING PHILOSOPHY
                        </p>
                        <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#123B5D] leading-tight">
                        Our 4 Core <span className="bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">Principles</span>
                    </h2>

                    <p className="mt-4 text-base md:text-[17px] font-normal leading-relaxed text-slate-600 max-w-2xl mx-auto">
                        The fundamental principles guiding our daily operations, manufacturing standards, and business relationships.
                    </p>
                </div>

                {/* 4-Column Desktop Grid with Large Numbers */}
                <div className="mt-14 mx-auto max-w-6xl">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {principles.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={item.number}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#0F766E] hover:shadow-xl hover:shadow-teal-950/10"
                                >
                                    {/* Top Slide Accent Line */}
                                    <div
                                        className={`absolute top-0 left-0 h-[3.5px] w-0 bg-gradient-to-r ${item.accent} transition-all duration-500 group-hover:w-full`}
                                        aria-hidden="true"
                                    />

                                    <div>
                                        {/* Number & Icon Row */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F766E] transition-colors duration-300">
                                                {item.number}
                                            </span>

                                            <div
                                                aria-hidden="true"
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-2xs transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${item.iconBg}`}
                                            >
                                                <Icon size={20} strokeWidth={2} />
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="mt-5 text-xl font-black tracking-wider text-slate-900 transition-colors duration-300 group-hover:text-[#0F766E]">
                                            {item.title}
                                        </h3>

                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] mt-0.5">
                                            {item.subtitle}
                                        </p>

                                        {/* Description */}
                                        <p className="mt-3 text-sm font-normal leading-relaxed text-slate-600">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Bottom Footer */}
                                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-3.5 text-xs font-semibold">
                                        <span className="text-xs font-medium text-slate-500 group-hover:text-[#0F766E] transition-colors">
                                            Core Principle
                                        </span>
                                        <CheckCircle2 size={14} className="text-[#0F766E] opacity-60 group-hover:opacity-100 transition-opacity" />
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