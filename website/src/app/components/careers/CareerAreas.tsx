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
            "Support efficient manufacturing operations, production planning and process execution.",
    },
    {
        icon: ShieldCheck,
        title: "Quality Assurance & Quality Control",
        description:
            "Help maintain quality systems, testing processes, documentation and compliance.",
    },
    {
        icon: FlaskConical,
        title: "Research & Development",
        description:
            "Contribute to product development, formulation research and continuous improvement.",
    },
    {
        icon: Truck,
        title: "Supply Chain & Operations",
        description:
            "Support procurement, inventory management, logistics and reliable product movement.",
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
            "Support the business functions that keep our organization operating efficiently.",
    },
];

export default function CareerAreas() {
    return (
        <section className="bg-slate-50 py-12 lg:py-12">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes cardFadeIn {
                    from { opacity: 0; transform: translateY(15px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-card-fade-in {
                    animation: cardFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
            `}} />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <span className="h-1 w-6 rounded-full bg-teal-600" />
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
                            CAREER AREAS
                        </p>
                    </div>

                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl bg-gradient-to-r from-slate-900 via-slate-800 to-[#123B5D] bg-clip-text text-transparent">
                        Explore Where You Can Make an Impact
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                        Discover opportunities across the functions that
                        support pharmaceutical manufacturing, operations and
                        business growth.
                    </p>
                </div>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {areas.map((area, index) => {
                        const Icon = area.icon;

                        return (
                            <div
                                key={area.title}
                                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-300/60 hover:border-slate-200 animate-card-fade-in"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                {/* Slide-in top border color */}
                                <div className="absolute top-0 left-0 h-[4px] w-0 bg-gradient-to-r from-[#123B5D] to-[#0F766E] transition-all duration-500 group-hover:w-full" />

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#123B5D]/5 text-[#123B5D] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[#123B5D] group-hover:text-white">
                                    <Icon
                                        size={24}
                                    />
                                </div>

                                <h3 className="mt-4 font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#123B5D]">
                                    {area.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
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