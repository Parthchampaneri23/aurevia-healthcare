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

const industries = [
    {
        title: "Hospitals & Healthcare Institutions",
        description:
            "Supporting hospitals, healthcare institutions and organized care networks with dependable pharmaceutical product requirements.",
        image: "/industries/industry1.jpg",
        icon: Building2,
        href: "/industries/hospitals-healthcare",
    },
    {
        title: "Pharmacy & Retail Networks",
        description:
            "Providing pharmaceutical products for pharmacies, organized retail networks and businesses serving everyday healthcare needs.",
        image: "/industries/industry2.jpg",
        icon: Store,
        href: "/industries/pharmacy-retail",
    },
    {
        title: "Pharmaceutical Distributors",
        description:
            "Supporting distributors, stockists and regional supply networks with reliable products and consistent business coordination.",
        image: "/industries/industry3.jpg",
        icon: Truck,
        href: "/industries/distributors",
    },
    {
        title: "Diagnostic & Clinical Networks",
        description:
            "Supporting diagnostic networks, laboratories and clinical testing centers with reliable healthcare solutions.",
        image: "/industries/industry4.jpg",
        icon: Stethoscope,
        href: "/industries/diagnostic-clinical",
    },
    {
        title: "Wellness & Nutrition Businesses",
        description:
            "Supporting wellness and nutrition-focused businesses with nutraceutical and health-oriented product solutions.",
        image: "/industries/industry5.jpg",
        icon: HeartPulse,
        href: "/industries/wellness-nutrition",
    },
    {
        title: "Healthcare Brand Owners",
        description:
            "Working with healthcare businesses that need dependable pharmaceutical manufacturing and product supply partnerships.",
        image: "/industries/industry6.jpg",
        icon: Handshake,
        href: "/industries/healthcare-brands",
    },
];

export default function IndustrySegments() {
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
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
                        BUSINESS SECTORS
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Supporting the Healthcare Ecosystem
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
                        Aurevia works with businesses across the healthcare
                        supply chain, helping connect dependable pharmaceutical
                        products with the markets and organizations that need
                        them.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {industries.map((industry, index) => {
                        const Icon = industry.icon;

                        return (
                            <Link
                                key={industry.title}
                                href={industry.href}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl animate-card-fade-in"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                {/* Premium top border accent */}
                                <div className="absolute top-0 left-0 z-10 h-[3px] w-0 bg-[#0F766E] transition-all duration-300 group-hover:w-full" />

                                <div className="relative h-48 overflow-hidden bg-slate-50">
                                    <div className="absolute inset-4 overflow-hidden rounded-lg">
                                        <Image
                                            src={industry.image}
                                            alt={industry.title}
                                            fill
                                            className="object-contain transition-all duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />

                                    <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-[#123B5D] shadow-md transition-all duration-300 group-hover:bg-[#123B5D] group-hover:text-white">
                                        <Icon size={20} strokeWidth={1.8} />
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#123B5D]">
                                        {industry.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {industry.description}
                                    </p>

                                    <div className="mt-5 inline-flex items-center text-sm font-semibold text-[#123B5D]">
                                        Discuss Your Requirement
                                        <ArrowRight
                                            size={16}
                                            className="ml-2 transition-transform group-hover:translate-x-1"
                                        />
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