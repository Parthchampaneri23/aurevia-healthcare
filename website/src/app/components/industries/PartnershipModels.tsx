import Image from "next/image";
import {
    ClipboardCheck,
    Factory,
    PackageCheck,
    RefreshCw,
} from "lucide-react";

const models = [
    {
        title: "Contract Manufacturing",
        description:
            "Manufacturing support for businesses looking to outsource pharmaceutical production according to agreed requirements.",
        icon: Factory,
    },
    {
        title: "Third-Party Manufacturing",
        description:
            "Production support for pharmaceutical businesses seeking dependable manufacturing and supply coordination.",
        icon: PackageCheck,
    },
    {
        title: "Private-Label Manufacturing",
        description:
            "Product manufacturing support for businesses developing healthcare products under their own brands.",
        icon: ClipboardCheck,
    },
    {
        title: "Long-Term Supply Partnerships",
        description:
            "Structured support for recurring product requirements and ongoing business relationships.",
        icon: RefreshCw,
    },
];

export default function PartnershipModels() {
    return (
        <section className="bg-white py-12 lg:py-12">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes modelItemFade {
                    from { opacity: 0; transform: translateX(15px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-model-item {
                    animation: modelItemFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
            `}} />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Top Section: Header & Image side-by-side */}
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-center">
                    <div className="lg:col-span-7">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]"></span>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0F766E]">
                                PARTNERSHIP MODELS
                            </p>
                        </div>

                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            Flexible Ways to Work With Aurevia
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
                            We aim to build practical, dependable and
                            long-term relationships with businesses across
                            the healthcare ecosystem.
                        </p>
                    </div>

                    {/* Image Container next to description */}
                    <div className="lg:col-span-5">
                        <div className="group relative h-[220px] sm:h-[240px] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-teal-50/30 border border-slate-200/60 shadow-md transition-all duration-500 hover:shadow-lg">
                            {/* Decorative background grid pattern */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40 pointer-events-none" />

                            {/* Glassmorphic Inner Frame */}
                            <div className="absolute inset-4 overflow-hidden rounded-2xl border border-white/80 bg-white/40 p-3 shadow-inner backdrop-blur-md transition-all duration-500 group-hover:bg-white/50">
                                <div className="relative h-full w-full">
                                    <Image
                                        src="/industries/partnership.png"
                                        alt="Aurevia Healthcare partnership"
                                        fill
                                        className="object-contain transition-all duration-700 ease-out group-hover:scale-[1.03]"
                                        sizes="(max-width: 1024px) 100vw, 33vw"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Down Side Cards: 4 Partnership Models Grid */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {models.map((model, index) => {
                        const Icon = model.icon;

                        return (
                            <div
                                key={model.title}
                                className="group/model flex flex-col justify-between relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg animate-model-item"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Premium top border accent */}
                                <div className="absolute top-0 left-0 z-10 h-[3px] w-0 bg-[#0F766E] transition-all duration-300 group-hover/model:w-full" />

                                <div>
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#123B5D]/10 text-[#123B5D] transition-colors duration-300 group-hover/model:bg-[#123B5D] group-hover/model:text-white">
                                        <Icon size={21} strokeWidth={1.8} />
                                    </div>

                                    <h3 className="mt-5 font-bold text-slate-900 transition-colors duration-300 group-hover/model:text-[#123B5D]">
                                        {model.title}
                                    </h3>

                                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                                        {model.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}