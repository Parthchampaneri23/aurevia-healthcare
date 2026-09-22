import {
    Factory,
    ShieldCheck,
    FlaskConical,
    Truck,
    BriefcaseBusiness,
    Settings,
} from "lucide-react";

const areas = [
    {
        icon: Factory,
        title: "Manufacturing & Production",
        description:
            "Support efficient manufacturing operations, production planning, and process execution.",
    },
    {
        icon: ShieldCheck,
        title: "Quality Assurance & Quality Control",
        description:
            "Help maintain quality systems, testing processes, documentation, and compliance.",
    },
    {
        icon: FlaskConical,
        title: "Research & Development",
        description:
            "Contribute to product formulation development, technical research, and continuous improvement.",
    },
    {
        icon: Truck,
        title: "Supply Chain & Operations",
        description:
            "Support procurement, inventory management, logistics, and reliable product movement.",
    },
    {
        icon: BriefcaseBusiness,
        title: "Sales & Business Development",
        description:
            "Build B2B relationships and identify new opportunities across healthcare markets.",
    },
    {
        icon: Settings,
        title: "Administration & Support",
        description:
            "Support essential corporate and administrative functions keeping our organization operating efficiently.",
    },
];

export default function CareerAreas() {
    return (
        <section className="bg-slate-50 py-12 lg:py-12">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes cardFadeIn {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-card-fade-in {
                    animation: cardFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
            `}} />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <span className="h-1.5 w-6 rounded-full bg-[#0F766E]" />
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0F766E]">
                            CAREER AREAS
                        </p>
                    </div>

                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        Explore Where You Can <span className="text-[#0F766E]">Make an Impact</span>
                    </h2>

                    <p className="mt-4 text-base leading-relaxed text-slate-600 font-normal">
                        Discover opportunities across key functions supporting pharmaceutical manufacturing, quality processes, and corporate growth.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {areas.map((area, index) => {
                        const Icon = area.icon;

                        return (
                            <div
                                key={area.title}
                                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80 transition-all duration-500 hover:-translate-y-2 hover:border-[#0F766E] hover:shadow-xl hover:shadow-teal-900/10 animate-card-fade-in"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                {/* Slide-in top border color */}
                                <div className="absolute top-0 left-0 h-[4px] w-0 bg-gradient-to-r from-[#123B5D] to-[#0F766E] transition-all duration-500 group-hover:w-full" />

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#123B5D]/5 text-[#123B5D] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[#123B5D] group-hover:text-white">
                                    <Icon size={22} />
                                </div>

                                <h3 className="mt-5 font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#123B5D]">
                                    {area.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-600 font-normal">
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