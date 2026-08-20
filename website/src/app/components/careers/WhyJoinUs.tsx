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
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-card-fade-in {
                    animation: cardFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
            `}} />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="h-1 w-6 rounded-full bg-teal-600" />
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
                                WHY AUREVIA
                            </p>
                        </div>

                        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl bg-gradient-to-r from-slate-900 via-slate-800 to-[#123B5D] bg-clip-text text-transparent">
                            Grow With a Purpose
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-600">
                            At Aurevia Healthcare, we believe strong teams build
                            stronger healthcare solutions. We aim to create a
                            professional environment where people can develop
                            their skills, take meaningful responsibilities and
                            contribute to quality, integrity and continuous
                            improvement.
                        </p>
                    </div>

                    <div className="group relative overflow-hidden rounded-3xl bg-slate-100 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-[#123B5D]/10">
                        <div className="overflow-hidden">
                            <Image
                                src="/career/careerwork.png"
                                alt="Working at Aurevia Healthcare"
                                width={600}
                                height={400}
                                className="h-[250px] w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 sm:h-[300px]"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;

                        return (
                            <div
                                key={reason.title}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-300/60 hover:bg-white animate-card-fade-in"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                {/* Slide-in top border color */}
                                <div className="absolute top-0 left-0 h-[4px] w-0 bg-gradient-to-r from-[#123B5D] to-[#0F766E] transition-all duration-500 group-hover:w-full" />

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#123B5D]/10 text-[#123B5D] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[#123B5D] group-hover:text-white">
                                    <Icon size={21} />
                                </div>

                                <h3 className="mt-5 font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#123B5D]">
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