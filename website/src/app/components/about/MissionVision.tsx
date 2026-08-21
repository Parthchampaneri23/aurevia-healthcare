import { Eye, Target } from "lucide-react";

const items = [
    {
        icon: Target,
        label: "Our Mission",
        title: "Creating Reliable Healthcare Solutions",
        description:
            "To provide quality-focused pharmaceutical manufacturing solutions that support healthcare businesses and contribute to better healthcare outcomes.",
        accentColor: "bg-[#0F766E]",
        borderColor: "hover:border-teal-100",
        iconBg: "bg-teal-50 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
    },
    {
        icon: Eye,
        label: "Our Vision",
        title: "Building a Trusted Pharmaceutical Partner",
        description:
            "To build a Pharmaceutical Manufacturing Built for Healthcare Businesses organization recognized for quality, reliability, innovation and long-term partnerships.",
        accentColor: "bg-[#123B5D]",
        borderColor: "hover:border-blue-100",
        iconBg: "bg-blue-50 text-[#123B5D] group-hover:bg-[#123B5D] group-hover:text-white",
    },
];

export default function MissionVision() {
    return (
        <section className="bg-slate-50 py-12 sm:py-12 lg:py-12 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Section Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <span className="h-1.5 w-8 rounded-full bg-[#0F766E]"></span>
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0F766E]">
                            Our Purpose
                        </p>
                        <span className="h-1.5 w-8 rounded-full bg-[#0F766E]"></span>
                    </div>

                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">
                        Mission & Vision
                    </h2>

                    <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                        Guided by a clear purpose and a long-term commitment to
                        quality, reliability and healthcare partnerships.
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:mt-16">

                    {items.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.label}
                                className={`group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${item.borderColor} sm:p-10`}
                            >
                                {/* Top accent bar */}
                                <div className={`absolute top-0 left-0 h-[4px] w-0 ${item.accentColor} transition-all duration-500 group-hover:w-full`} />

                                {/* Icon */}
                                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg} transition-all duration-300`}>
                                    <Icon size={26} strokeWidth={1.8} />
                                </div>

                                {/* Label */}
                                <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#0F766E]">
                                    {item.label}
                                </p>

                                {/* Title */}
                                <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-4 text-sm leading-relaxed text-slate-500">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}