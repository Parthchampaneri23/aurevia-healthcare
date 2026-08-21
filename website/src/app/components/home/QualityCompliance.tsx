import Link from "next/link";
import {
    BadgeCheck,
    ClipboardCheck,
    ShieldCheck,
} from "lucide-react";

const qualityAreas = [
    {
        icon: BadgeCheck,
        title: "Quality Control",
        description:
            "Quality checks are integrated across key stages of manufacturing to support reliable pharmaceutical products.",
        color: "group-hover:border-teal-500/30",
        iconBg: "bg-teal-50 text-teal-700 group-hover:bg-teal-700",
    },
    {
        icon: ClipboardCheck,
        title: "Standardized Processes",
        description:
            "Structured processes help maintain consistency, efficiency and control throughout manufacturing operations.",
        color: "group-hover:border-blue-500/30",
        iconBg: "bg-blue-50 text-blue-700 group-hover:bg-blue-700",
    },
    {
        icon: ShieldCheck,
        title: "Product Consistency",
        description:
            "A quality-focused approach supports consistent products and dependable outcomes for our partners.",
        color: "group-hover:border-indigo-500/30",
        iconBg: "bg-indigo-50 text-indigo-700 group-hover:bg-indigo-700",
    },
];

export default function QualityCompliance() {
    return (
        <section className="relative overflow-hidden bg-slate-50 py-12 lg:py-12">
            {/* Background Details */}
            <div className="absolute bottom-0 right-0 h-[450px] w-[450px] translate-y-1/3 rounded-full bg-teal-100/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                {/* Section Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 mb-3 justify-center">
                        <span className="h-1 w-6 rounded-full bg-[#0F766E]" />
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                            Quality & Compliance
                        </p>
                        <span className="h-1 w-6 rounded-full bg-[#0F766E]" />
                    </div>

                    <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                        Quality Built Into
                        <span className="block mt-1 bg-gradient-to-r from-slate-900 to-[#123B5D] bg-clip-text text-transparent">
                            Every Process
                        </span>
                    </h2>

                    <p className="mt-5 text-base leading-relaxed text-slate-600 max-w-2xl mx-auto">
                        From raw materials to final packaging, our quality-focused approach supports consistency, reliability and responsible pharmaceutical manufacturing.
                    </p>
                </div>

                {/* Quality Cards Grid */}
                <div className="mt-16 grid gap-8 md:grid-cols-3">
                    {qualityAreas.map((area) => {
                        const Icon = area.icon;

                        return (
                            <div
                                key={area.title}
                                className={`group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${area.color}`}
                            >
                                {/* Slide-in top border color */}
                                <div className="absolute top-0 left-0 h-[4px] w-0 bg-gradient-to-r from-[#0F766E] to-[#123B5D] transition-all duration-500 group-hover:w-full" />

                                {/* Icon container with custom styling and animations */}
                                <div className={`mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:text-white ${area.iconBg}`}>
                                    <Icon size={28} strokeWidth={1.8} />
                                </div>

                                {/* Title with hover transition */}
                                <h3 className="mt-6 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#0F766E]">
                                    {area.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-3.5 text-sm leading-relaxed text-slate-500">
                                    {area.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Button */}
                <div className="mt-12 text-center">
                    <Link
                        href="/about#quality-certifications"
                        className="group/btn inline-flex items-center gap-2 rounded-xl border border-[#123B5D] bg-white px-6 py-3.5 text-sm font-bold text-[#123B5D] transition-all duration-300 hover:bg-[#123B5D] hover:text-white hover:shadow-lg hover:shadow-blue-900/10 active:scale-95"
                    >
                        Quality and Certification
                        <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                    </Link>
                </div>

            </div>
        </section>
    );
}