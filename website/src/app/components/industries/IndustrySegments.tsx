import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Building2,
    Store,
    Truck,
    Stethoscope,
    HeartPulse,
    Handshake,
} from "lucide-react";

import industry1 from "../../../../public/industries/industry1.jpg";
import industry2 from "../../../../public/industries/industry2.jpg";
import industry3 from "../../../../public/industries/industry3.jpg";
import industry4 from "../../../../public/industries/industry4.jpg";
import industry5 from "../../../../public/industries/industry5.jpg";
import industry6 from "../../../../public/industries/industry6.jpg";

const industries = [
    {
        title: "Hospitals & Healthcare Institutions",
        description:
            "Supporting hospitals, healthcare institutions and organized care networks with dependable pharmaceutical product requirements.",
        image: industry1,
        icon: Building2,
        href: "/industries/hospitals-healthcare",
    },
    {
        title: "Pharmacy & Retail Networks",
        description:
            "Providing pharmaceutical products for pharmacies, organized retail networks and businesses serving everyday healthcare needs.",
        image: industry2,
        icon: Store,
        href: "/industries/pharmacy-retail",
    },
    {
        title: "Pharmaceutical Distributors",
        description:
            "Supporting distributors, stockists and regional supply networks with reliable products and consistent business coordination.",
        image: industry3,
        icon: Truck,
        href: "/industries/distributors",
    },
    {
        title: "Diagnostic & Clinical Networks",
        description:
            "Supporting diagnostic networks, laboratories and clinical testing centers with reliable healthcare solutions.",
        image: industry4,
        icon: Stethoscope,
        href: "/industries/diagnostic-clinical",
    },
    {
        title: "Wellness & Nutrition Businesses",
        description:
            "Supporting wellness and nutrition-focused businesses with nutraceutical and health-oriented product solutions.",
        image: industry5,
        icon: HeartPulse,
        href: "/industries/wellness-nutrition",
    },
    {
        title: "Healthcare Brand Owners",
        description:
            "Working with healthcare businesses that need dependable pharmaceutical manufacturing and product supply partnerships.",
        image: industry6,
        icon: Handshake,
        href: "/industries/healthcare-brands",
    },
];

export default function IndustrySegments() {
    return (
        <section id="industry-segments" className="scroll-mt-24 bg-white py-12 lg:py-12">
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
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-3 mb-2.5 justify-center">
                        <span className="h-0.5 w-6 rounded-full bg-[#0F766E]" aria-hidden="true" />
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
                            BUSINESS SECTORS
                        </p>
                        <span className="h-0.5 w-6 rounded-full bg-[#0F766E]" aria-hidden="true" />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#123B5D] leading-tight">
                        Supporting the Healthcare <span className="bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">Ecosystem</span>
                    </h2>

                    <p className="mt-4 text-base md:text-[17px] font-normal leading-relaxed text-slate-600 max-w-2xl mx-auto">
                        Aurevia works with businesses across the healthcare supply chain, helping connect dependable pharmaceutical products with the markets and organizations that need them.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {industries.map((industry, index) => {
                        const Icon = industry.icon;

                        return (
                            <Link
                                key={industry.title}
                                href={industry.href}
                                className="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-slate-300/90 bg-white shadow-md transition-all duration-500 hover:-translate-y-2.5 hover:border-[#0F766E] hover:shadow-2xl hover:shadow-teal-950/20 animate-card-fade-in"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                {/* Slide-in Top Accent Line */}
                                <div className="absolute top-0 left-0 z-20 h-[4px] w-0 bg-gradient-to-r from-[#123B5D] via-[#0F766E] to-[#123B5D] transition-all duration-500 group-hover:w-full" />

                                {/* Image Section with Dark Overlay & Zoom */}
                                <div className="relative h-52 overflow-hidden bg-slate-900">
                                    <Image
                                        src={industry.image}
                                        alt={industry.title}
                                        fill
                                        className="object-cover opacity-90 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-100"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />

                                    {/* Gradient overlay for text contrast */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent transition-opacity duration-500 group-hover:opacity-50" />

                                    {/* Icon Badge Floating Bottom Left */}
                                    <div className="absolute bottom-4 left-4 z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 text-[#123B5D] shadow-lg backdrop-blur-md transition-all duration-500 group-hover:bg-[#0F766E] group-hover:text-white group-hover:scale-110 group-hover:rotate-3">
                                        <Icon size={22} strokeWidth={1.8} />
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="flex flex-1 flex-col p-6 sm:p-7 bg-white transition-colors duration-500 group-hover:bg-slate-50/50">
                                    <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#0F766E]">
                                        {industry.title}
                                    </h3>

                                    <p className="mt-2.5 flex-1 text-[15px] font-normal leading-relaxed text-slate-600">
                                        {industry.description}
                                    </p>

                                    {/* Bottom Action Indicator */}
                                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-3.5">
                                        <span className="text-xs font-medium text-[#0F766E]">
                                            Sector Focus
                                        </span>

                                        <div className="flex items-center gap-2 text-sm font-semibold text-[#123B5D] transition-colors duration-300 group-hover:text-[#0F766E]">
                                            <span>Discuss Requirement</span>
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all duration-300 group-hover:bg-[#0F766E] group-hover:text-white group-hover:translate-x-1">
                                                <ArrowRight size={15} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}