import {
    MessageSquare,
    ClipboardList,
    Settings2,
    ShieldCheck,
    PackageCheck,
    Handshake,
} from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Understand Requirements",
        description: "We begin by understanding your product and business needs.",
        icon: MessageSquare,
    },
    {
        number: "02",
        title: "Product Discussion",
        description: "Product, formulation and manufacturing requirements are evaluated.",
        icon: ClipboardList,
    },
    {
        number: "03",
        title: "Commercial Alignment",
        description: "Requirements, quantities, timelines and commercial expectations are aligned.",
        icon: Settings2,
    },
    {
        number: "04",
        title: "Manufacturing & Quality",
        description: "Production follows structured manufacturing and quality-focused processes.",
        icon: ShieldCheck,
    },
    {
        number: "05",
        title: "Packaging & Release",
        description: "Products move through packaging, checks and final release.",
        icon: PackageCheck,
    },
    {
        number: "06",
        title: "Ongoing Partnership",
        description: "We focus on dependable supply and long-term business relationships.",
        icon: Handshake,
    },
];

export default function PartnershipJourney() {
    return (
        <section className="bg-slate-50 py-12 lg:py-12">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes stepFadeIn {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-step-card {
                    animation: stepFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
            `}} />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
                        HOW WE WORK
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        From Requirement to Partnership
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
                        A structured approach designed to keep communication,
                        manufacturing and supply aligned throughout the
                        partnership.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.number}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg animate-step-card"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                {/* Premium top border accent */}
                                <div className="absolute top-0 left-0 z-10 h-[3px] w-0 bg-[#0F766E] transition-all duration-300 group-hover:w-full" />

                                {/* Connecting Line (Only visible on lg screens for columns 1 and 2 of each row) */}
                                {index % 3 !== 2 && (
                                    <div className="hidden lg:block absolute top-[44px] -right-[24px] w-[24px] h-[1px] bg-slate-200 z-20 pointer-events-none">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-300 transition-colors duration-300 group-hover:bg-[#0F766E]" />
                                    </div>
                                )}

                                {/* Connecting Line for mobile/sm (vertical line to the next card) */}
                                {index !== steps.length - 1 && (
                                    <div className="lg:hidden absolute left-1/2 -bottom-[24px] w-[1px] h-[24px] bg-slate-200 z-20 pointer-events-none -translate-x-1/2">
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-300 transition-colors duration-300 group-hover:bg-[#0F766E]" />
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#123B5D]/5 text-xs font-bold text-[#123B5D] transition-all duration-300 group-hover:bg-[#123B5D] group-hover:text-white">
                                        {step.number}
                                    </span>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600 transition-all duration-300 group-hover:bg-[#0F766E] group-hover:text-white">
                                        <Icon size={18} strokeWidth={1.8} />
                                    </div>
                                </div>

                                <h3 className="mt-5 text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#123B5D]">
                                    {step.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}