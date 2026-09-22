import Image from "next/image";
import {
    BookOpen,
    HeartHandshake,
    Users,
    Target,
} from "lucide-react";

const reasons = [
    {
        icon: BookOpen,
        title: "Growth & Learning",
        description:
            "Develop your professional skills, industry knowledge and expertise through meaningful responsibilities and continuous learning.",
    },
    {
        icon: Target,
        title: "Quality-Driven Culture",
        description:
            "Be part of an environment where quality, consistency and responsible pharmaceutical practices remain at the heart of our work.",
    },
    {
        icon: Users,
        title: "Collaborative Environment",
        description:
            "Work alongside professionals across manufacturing, quality, research, supply chain and business operations.",
    },
    {
        icon: HeartHandshake,
        title: "Meaningful Work",
        description:
            "Contribute to products and processes that support businesses across the healthcare ecosystem.",
    },
];

export default function WhyJoinUs() {
    return (
        <section className="bg-white py-12 lg:py-12">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes cardFadeIn {
                    from { opacity: 0; transform: translateY(15px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-card-fade-in {
                    animation: cardFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
            `}} />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 mb-3 justify-center lg:justify-start">
                            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" />
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0F766E]">
                                WHY AUREVIA
                            </p>
                            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" />
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
                            Grow With a <span className="bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">Purpose</span>
                        </h2>

                        <p className="mt-4 text-base leading-relaxed text-slate-600 font-normal max-w-xl mx-auto lg:mx-0">
                            At Aurevia Healthcare, we believe strong teams build stronger healthcare solutions. We aim to create a professional environment where people can develop their skills, take meaningful responsibilities, and contribute to quality, integrity, and continuous improvement across the pharmaceutical value chain.
                        </p>
                    </div>

                    {/* Right Image Container Centered on Mobile */}
                    <div className="group relative mx-auto w-full max-w-lg lg:max-w-none overflow-hidden rounded-3xl bg-slate-100 shadow-xl transition-all duration-500 hover:shadow-2xl border border-slate-200/80 aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] sm:min-h-[360px]">
                        <Image
                            src="/career/careerwork.png?v=2"
                            alt="Working at Aurevia Healthcare"
                            fill
                            unoptimized
                            className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        {/* Dark Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                    </div>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;

                        return (
                            <div
                                key={reason.title}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#0F766E] hover:shadow-xl hover:shadow-teal-900/10 hover:bg-white animate-card-fade-in"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                {/* Slide-in top border color */}
                                <div className="absolute top-0 left-0 h-[4px] w-0 bg-gradient-to-r from-[#123B5D] to-[#0F766E] transition-all duration-500 group-hover:w-full" />

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#123B5D]/10 text-[#123B5D] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[#123B5D] group-hover:text-white">
                                    <Icon size={22} />
                                </div>

                                <h3 className="mt-5 font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#123B5D]">
                                    {reason.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {reason.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}