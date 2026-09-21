"use client";

import {
    Award,
    HeartHandshake,
    Lightbulb,
    ShieldCheck,
    CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const values = [
    {
        icon: ShieldCheck,
        title: "Quality",
        description:
            "Maintaining a consistent focus on product and process quality across our operations.",
        badge: "WHO-GMP Standards",
        accent: "from-[#0F766E] to-[#123B5D]",
        iconBg: "bg-teal-50 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
    },
    {
        icon: HeartHandshake,
        title: "Integrity",
        description:
            "Building lasting relationships through transparency, responsibility and trust.",
        badge: "Ethical Practices",
        accent: "from-[#123B5D] to-[#0F766E]",
        iconBg: "bg-blue-50 text-[#123B5D] group-hover:bg-[#123B5D] group-hover:text-white",
    },
    {
        icon: Lightbulb,
        title: "Innovation",
        description:
            "Continuously improving our processes, capabilities and pharmaceutical solutions.",
        badge: "R&D Excellence",
        accent: "from-[#0F766E] to-[#123B5D]",
        iconBg: "bg-teal-50 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
    },
    {
        icon: Award,
        title: "Customer Focus",
        description:
            "Understanding our partners' requirements and delivering dependable support.",
        badge: "Dedicated Service",
        accent: "from-[#123B5D] to-[#0F766E]",
        iconBg: "bg-blue-50 text-[#123B5D] group-hover:bg-[#123B5D] group-hover:text-white",
    },
];

export default function CoreValues() {
    return (
        <section className="relative overflow-hidden bg-white py-12 sm:py-12 border-t border-slate-100">
            <div className="relative mx-auto max-w-6xl px-6 lg:px-8">

                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 mb-3 justify-center">
                        <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" />
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
                            WHAT WE STAND FOR
                        </p>
                        <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#123B5D] leading-tight">
                        Our Core <span className="bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">Values</span>
                    </h2>

                    <p className="mt-4 text-base md:text-[17px] font-normal leading-relaxed text-slate-600 max-w-2xl mx-auto">
                        The principles that guide how we work, manufacture and build lasting relationships with our partners.
                    </p>
                </div>

                {/* Values Cards */}
                <div className="mt-12 mx-auto max-w-5xl">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((value, index) => {
                            const Icon = value.icon;

                            return (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-slate-300/90 bg-white p-5 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:border-[#0F766E] hover:shadow-xl hover:shadow-teal-950/15"
                                >
                                    {/* Slide-in Top Accent Line */}
                                    <div className={`absolute top-0 left-0 h-[3.5px] w-0 bg-gradient-to-r ${value.accent} transition-all duration-500 group-hover:w-full`} aria-hidden="true" />

                                    <div>
                                        {/* Top Row: Icon + Badge */}
                                        <div className="flex items-center justify-between gap-3">
                                            <div
                                                aria-hidden="true"
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-xs transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${value.iconBg}`}
                                            >
                                                <Icon size={20} strokeWidth={2} />
                                            </div>

                                            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-[#0F766E] border border-slate-200/80">
                                                {value.badge}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="mt-4 text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#0F766E]">
                                            {value.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="mt-2 text-[15px] font-normal leading-relaxed text-slate-600">
                                            {value.description}
                                        </p>
                                    </div>

                                    {/* Bottom Accent Footer */}
                                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5 text-xs font-semibold">
                                        <span className="text-xs font-medium text-slate-500 group-hover:text-[#0F766E] transition-colors">
                                            Aurevia Value
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