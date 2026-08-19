import {
    FlaskConical,
    Microscope,
    Settings2,
} from "lucide-react";

const researchAreas = [
    {
        icon: FlaskConical,
        title: "Product Development",
        description:
            "Developing and improving pharmaceutical product solutions with a focus on quality, consistency and market requirements.",
        accentColor: "bg-[#0F766E]",
        borderColor: "hover:border-teal-100",
        iconBg: "bg-teal-50 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
    },
    {
        icon: Microscope,
        title: "Analytical Research",
        description:
            "Supporting product quality through structured testing, analysis and continuous evaluation of pharmaceutical processes.",
        accentColor: "bg-[#123B5D]",
        borderColor: "hover:border-blue-100",
        iconBg: "bg-blue-50 text-[#123B5D] group-hover:bg-[#123B5D] group-hover:text-white",
    },
    {
        icon: Settings2,
        title: "Process Improvement",
        description:
            "Continuously improving manufacturing processes and operational efficiency to support reliable pharmaceutical production.",
        accentColor: "bg-[#0F766E]",
        borderColor: "hover:border-teal-100",
        iconBg: "bg-teal-50 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
    },
];

export default function ResearchDevelopment() {
    return (
        <section className="bg-white py-12 sm:py-12 lg:py-12 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <span className="h-1.5 w-8 rounded-full bg-[#0F766E]"></span>
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0F766E]">
                            Research & Development
                        </p>
                        <span className="h-1.5 w-8 rounded-full bg-[#0F766E]"></span>
                    </div>

                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">
                        Driving Continuous Improvement
                    </h2>

                    <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                        Our R&D approach focuses on improving pharmaceutical
                        products, manufacturing processes and quality systems
                        to meet evolving healthcare and market requirements.
                    </p>
                </div>

                {/* Research Areas */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
                    {researchAreas.map((area) => {
                        const Icon = area.icon;

                        return (
                            <div
                                key={area.title}
                                className={`group relative overflow-hidden rounded-3xl border border-slate-100 bg-[#f8fafc] p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-2xl ${area.borderColor} sm:p-10`}
                            >
                                {/* Top accent bar */}
                                <div className={`absolute top-0 left-0 h-[4px] w-0 ${area.accentColor} transition-all duration-500 group-hover:w-full`} />

                                {/* Icon */}
                                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${area.iconBg} transition-all duration-300`}>
                                    <Icon
                                        size={26}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="mt-6 text-lg font-bold text-slate-900 group-hover:text-[#123B5D] transition-colors duration-300">
                                    {area.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-3 text-sm leading-relaxed text-slate-500 group-hover:text-slate-600 transition-colors duration-300">
                                    {area.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}