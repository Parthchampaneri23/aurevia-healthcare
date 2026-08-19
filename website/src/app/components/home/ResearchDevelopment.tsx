import Link from "next/link";
import {
    FlaskConical,
    Microscope,
    BarChart3,
} from "lucide-react";

const researchAreas = [
    {
        icon: FlaskConical,
        title: "Product Development",
        description:
            "Focused development of pharmaceutical formulations with attention to quality, consistency and practical requirements.",
        color: "group-hover:border-teal-500/30",
        iconBg: "bg-teal-50 text-teal-700 group-hover:bg-teal-700",
    },
    {
        icon: Microscope,
        title: "Stability Testing",
        description:
            "Structured evaluation of product stability to support consistent quality throughout its intended shelf life.",
        color: "group-hover:border-blue-500/30",
        iconBg: "bg-blue-50 text-blue-700 group-hover:bg-blue-700",
    },
    {
        icon: BarChart3,
        title: "Analytical Research",
        description:
            "Analytical approaches that support formulation development, quality evaluation and continuous improvement.",
        color: "group-hover:border-indigo-500/30",
        iconBg: "bg-indigo-50 text-indigo-700 group-hover:bg-indigo-700",
    },
];

export default function ResearchDevelopment() {
    return (
        <section className="relative overflow-hidden bg-white py-12 lg:py-12">
            {/* Background Details */}
            <div className="absolute top-1/2 left-0 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-slate-50 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 mb-3 justify-center">
                        <span className="h-1 w-6 rounded-full bg-[#123B5D]" />
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#123B5D]">
                            Research & Development
                        </p>
                        <span className="h-1 w-6 rounded-full bg-[#123B5D]" />
                    </div>

                    <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                        Driving Innovation in
                        <span className="block mt-1 bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">
                            Pharmaceutical Development
                        </span>
                    </h2>

                    <p className="mt-5 text-base leading-relaxed text-slate-600 max-w-2xl mx-auto">
                        Our approach to research and development focuses on creating reliable pharmaceutical solutions through formulation development, analysis and continuous improvement.
                    </p>
                </div>

                {/* Research Areas Grid */}
                <div className="mt-16 grid gap-8 md:grid-cols-3">
                    {researchAreas.map((area) => {
                        const Icon = area.icon;

                        return (
                            <div
                                key={area.title}
                                className={`group relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/50 p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-xl ${area.color}`}
                            >
                                {/* Slide-in top border color */}
                                <div className="absolute top-0 left-0 h-[4px] w-0 bg-gradient-to-r from-[#123B5D] to-[#0F766E] transition-all duration-500 group-hover:w-full" />

                                {/* Icon container with custom styling and animations */}
                                <div className={`mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:text-white ${area.iconBg}`}>
                                    <Icon size={28} strokeWidth={1.8} />
                                </div>

                                {/* Title with hover transition */}
                                <h3 className="mt-6 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#123B5D]">
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
                        href="/about#research-development"
                        className="group/btn inline-flex items-center gap-2 rounded-xl border border-[#123B5D] bg-white px-6 py-3.5 text-sm font-bold text-[#123B5D] transition-all duration-300 hover:bg-[#123B5D] hover:text-white hover:shadow-lg hover:shadow-blue-900/10 active:scale-95"
                    >
                        Explore Our R&D
                        <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                    </Link>
                </div>

            </div>
        </section>
    );
}