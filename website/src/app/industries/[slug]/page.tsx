import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
    ArrowLeft,
    CheckCircle2,
    Building2,
    ArrowRight,
    ShieldCheck,
    Factory,
    PackageCheck,
    Boxes,
    MessageSquare,
    ChevronRight,
    Award,
    Clock,
    FileCheck
} from "lucide-react";
import industriesData from "@/app/components/industries/industryData";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import IndustriesFAQ from "@/app/components/industries/IndustriesFAQ";

type IndustryDetailsPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

// Map each industry to relevant dosage forms already in the project
const industryProductCategories: Record<string, Array<{ name: string; href: string; image: string; desc: string }>> = {
    "hospitals-healthcare": [
        { name: "Injectables", href: "/products?category=injectables", image: "/products/injection1.jpg", desc: "Sterile & critical care solutions" },
        { name: "Tablets", href: "/products?category=tablets", image: "/products/tablet1.jpg", desc: "Solid oral formulation range" },
        { name: "Syrups", href: "/products?category=syrups", image: "/products/syrup1.jpg", desc: "Liquid oral healthcare formulations" },
    ],
    "pharmacy-retail": [
        { name: "Tablets", href: "/products?category=tablets", image: "/products/tablet1.jpg", desc: "Everyday retail therapeutic range" },
        { name: "Capsules", href: "/products?category=capsules", image: "/products/capsule1.jpg", desc: "Encapsulated pharmaceutical formulations" },
        { name: "Ointments & Creams", href: "/products?category=ointments-creams", image: "/products/oc1.jpg", desc: "Topical dermatological products" },
    ],
    "distributors": [
        { name: "Tablets", href: "/products?category=tablets", image: "/products/tablet1.jpg", desc: "Bulk & commercial oral dosage forms" },
        { name: "Capsules", href: "/products?category=capsules", image: "/products/capsule1.jpg", desc: "High-demand oral solid formulations" },
        { name: "Injectables", href: "/products?category=injectables", image: "/products/injection1.jpg", desc: "Institutional & hospital distribution supply" },
    ],
    "diagnostic-clinical": [
        { name: "Tablets", href: "/products?category=tablets", image: "/products/tablet1.jpg", desc: "Standardized clinical study formulations" },
        { name: "Injectables", href: "/products?category=injectables", image: "/products/injection1.jpg", desc: "Sterile diagnostic & clinical formulations" },
    ],
    "wellness-nutrition": [
        { name: "Nutraceuticals", href: "/products?category=nutraceuticals", image: "/products/Nutraceuticals1.jpg", desc: "Health, dietary & wellness supplements" },
        { name: "Capsules", href: "/products?category=capsules", image: "/products/capsule1.jpg", desc: "Nutritional softgels & hard gelatin formulations" },
        { name: "Syrups", href: "/products?category=syrups", image: "/products/syrup1.jpg", desc: "Oral nutritional liquid formulations" },
    ],
    "healthcare-brands": [
        { name: "Tablets", href: "/products?category=tablets", image: "/products/tablet1.jpg", desc: "Custom private-label solid oral products" },
        { name: "Capsules", href: "/products?category=capsules", image: "/products/capsule1.jpg", desc: "Branded capsule manufacturing support" },
        { name: "Nutraceuticals", href: "/products?category=nutraceuticals", image: "/products/Nutraceuticals1.jpg", desc: "Contract wellness formulation development" },
    ],
};

const manufacturingProcess = [
    { step: "01", title: "Requirement Alignment", desc: "Evaluating exact formulation, packaging, and regulatory parameters for your industry.", icon: FileCheck },
    { step: "02", title: "Product Selection", desc: "Matching required dosage forms from Aurevia's solid and liquid formulation portfolio.", icon: Boxes },
    { step: "03", title: "Controlled Manufacturing", desc: "Executing production under structured GMP-compliant cleanroom conditions.", icon: Factory },
    { step: "04", title: "Quality Verification", desc: "Multi-stage analytical testing and thorough batch quality controls.", icon: ShieldCheck },
    { step: "05", title: "Packaging & Dispatch", desc: "Secure protective packaging and organized logistic dispatch coordination.", icon: PackageCheck },
    { step: "06", title: "Ongoing B2B Support", desc: "Long-term inventory stability, batch reordering, and dedicated account communication.", icon: Clock },
];

export async function generateMetadata({
    params,
}: IndustryDetailsPageProps): Promise<Metadata> {
    const { slug } = await params;
    const industry = industriesData.find((item) => item.slug === slug);

    if (!industry) {
        return {
            title: "Industry Not Found | Aurevia Healthcare",
        };
    }

    return {
        title: `${industry.title} | Industries | Aurevia Healthcare`,
        description: industry.description,
        openGraph: {
            title: `${industry.title} | Aurevia Healthcare`,
            description: industry.description,
        },
    };
}

export default async function IndustryDetailsPage({
    params,
}: IndustryDetailsPageProps) {
    const { slug } = await params;

    const industry = industriesData.find((item) => item.slug === slug);

    if (!industry) {
        notFound();
    }

    // Get related industries (excluding current)
    const relatedIndustries = industriesData.filter((item) => item.slug !== slug).slice(0, 3);
    const relevantProducts = industryProductCategories[slug] || industryProductCategories["hospitals-healthcare"];

    return (
        <main className="min-h-screen bg-white">
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        @keyframes pageFadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        @keyframes contentSlideUp {
                            from { opacity: 0; transform: translateY(24px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                        .animate-page-fade {
                            animation: pageFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                        }
                        .animate-content-slide {
                            animation: contentSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                        }
                    `,
                }}
            />

            {/* ==================== 1. HERO BANNER (MATCHES INDUSTRY PAGE BANNER SIZE) ==================== */}
            <section aria-label={`${industry.title} Hero Banner`} className="relative w-full overflow-hidden bg-slate-950 min-h-[240px] sm:min-h-[280px] lg:min-h-[310px] flex items-center py-8 sm:py-10">
                <Image
                    src="/industries/industrybanner.png"
                    alt={industry.title}
                    fill
                    priority
                    unoptimized={true}
                    className="object-cover object-center sm:object-[center_35%]"
                    sizes="100vw"
                />

                {/* Professional Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#071E33]/90 via-[#071E33]/75 to-[#123B5D]/40" />

                {/* Banner Content Container */}
                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
                    <div className="max-w-2xl text-left text-white">

                        {/* Eyebrow Pill */}
                        <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-950/60 px-3.5 py-1 backdrop-blur-md">
                            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" aria-hidden="true" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-300">
                                {industry.eyebrow}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
                            {industry.title}
                        </h1>

                        {/* Breadcrumb on Banner */}
                        <div className="mt-3">
                            <Breadcrumb
                                items={[
                                    { name: "Industries", href: "/industries" },
                                    { name: industry.title }
                                ]}
                            />
                        </div>

                    </div>
                </div>
            </section>

            {/* Back to Industries Link Bar */}
            <div className="bg-slate-100/80 border-b border-slate-200/80 py-3">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <Link
                        href="/industries"
                        className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#123B5D] transition hover:text-[#0F766E]"
                    >
                        <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
                        <span>Back to All Industry Segments</span>
                    </Link>
                </div>
            </div>

            {/* ==================== 2. INDUSTRY INTRODUCTION (2 COLUMNS) ==================== */}
            <section className="py-12 lg:py-12 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">

                        {/* Left Column: Description */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="inline-flex items-center gap-2.5">
                                <span className="h-1.5 w-6 rounded-full bg-[#0F766E]" />
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                                    SECTOR OVERVIEW
                                </p>
                            </div>

                            <h2 className="text-3xl font-extrabold tracking-tight text-[#123B5D] sm:text-4xl leading-tight">
                                Understanding the Requirements of <span className="text-[#0F766E]">{industry.title}</span>
                            </h2>

                            <p className="text-base text-slate-600 leading-relaxed font-normal">
                                {industry.overview}
                            </p>

                            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-4">
                                    <div className="flex items-center gap-2.5 text-[#123B5D] font-bold text-sm mb-1">
                                        <ShieldCheck size={18} className="text-[#0F766E]" />
                                        <span>Quality & Compliance Focus</span>
                                    </div>
                                    <p className="text-xs text-slate-600 leading-normal">
                                        Formulations manufactured under strict process controls to support institutional and commercial needs.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-4">
                                    <div className="flex items-center gap-2.5 text-[#123B5D] font-bold text-sm mb-1">
                                        <PackageCheck size={18} className="text-[#0F766E]" />
                                        <span>Consistent B2B Availability</span>
                                    </div>
                                    <p className="text-xs text-slate-600 leading-normal">
                                        Structured supply coordination to prevent stockouts across retail and distribution networks.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Visual Highlight Card */}
                        <div className="lg:col-span-5">
                            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-teal-50/40 p-7 shadow-xl">
                                <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-[#123B5D] to-[#0F766E]" />

                                <h3 className="text-xl font-extrabold text-[#123B5D] mb-4 flex items-center gap-2">
                                    <Building2 size={22} className="text-[#0F766E]" />
                                    <span>Key Sector Requirements</span>
                                </h3>

                                <ul className="space-y-3.5">
                                    {industry.supportPoints.map((point) => (
                                        <li key={point} className="flex items-start gap-3">
                                            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#0F766E]" />
                                            <span className="text-sm font-semibold text-slate-700 leading-snug">
                                                {point}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Support Status
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F766E] bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#0F766E]" />
                                        Active Portfolio Alignment
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ==================== 3. HOW AUREVIA SUPPORTS THIS INDUSTRY (SOLUTION CARDS) ==================== */}
            <section className="py-12 lg:py-12 bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0F766E]">
                            CAPABILITY ALIGNMENT
                        </p>
                        <h2 className="mt-2.5 text-3xl font-extrabold tracking-tight text-[#123B5D] sm:text-4xl">
                            How Aurevia Supports <span className="text-[#0F766E]">{industry.title}</span>
                        </h2>
                        <p className="mt-3 text-base text-slate-600 font-normal">
                            We align our manufacturing capabilities, dosage forms, and business coordination to fulfill the specialized requirements of this sector.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="group relative rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F766E] hover:shadow-md">
                            <div className="absolute top-0 left-0 h-1 w-0 bg-[#0F766E] transition-all duration-300 group-hover:w-full" />
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E] font-bold mb-4 group-hover:bg-[#123B5D] group-hover:text-white transition-colors">
                                <Boxes size={22} />
                            </div>
                            <h3 className="text-lg font-bold text-[#123B5D] group-hover:text-[#0F766E] transition-colors">
                                Tailored Product Formulations
                            </h3>
                            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                Access to solid oral dosages, liquids, injectables, and topical formulations structured for commercial and institutional supply.
                            </p>
                        </div>

                        <div className="group relative rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F766E] hover:shadow-md">
                            <div className="absolute top-0 left-0 h-1 w-0 bg-[#0F766E] transition-all duration-300 group-hover:w-full" />
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E] font-bold mb-4 group-hover:bg-[#123B5D] group-hover:text-white transition-colors">
                                <Factory size={22} />
                            </div>
                            <h3 className="text-lg font-bold text-[#123B5D] group-hover:text-[#0F766E] transition-colors">
                                Contract & Third-Party Manufacturing
                            </h3>
                            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                Scalable manufacturing partnerships allowing brand owners, distributors, and chains to outsource product production reliably.
                            </p>
                        </div>

                        <div className="group relative rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F766E] hover:shadow-md">
                            <div className="absolute top-0 left-0 h-1 w-0 bg-[#0F766E] transition-all duration-300 group-hover:w-full" />
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E] font-bold mb-4 group-hover:bg-[#123B5D] group-hover:text-white transition-colors">
                                <ShieldCheck size={22} />
                            </div>
                            <h3 className="text-lg font-bold text-[#123B5D] group-hover:text-[#0F766E] transition-colors">
                                Quality & Process Discipline
                            </h3>
                            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                Rigorous quality assurance protocols at every production phase ensuring batch consistency and regulatory readiness.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== 4. RELEVANT PRODUCT CATEGORIES ==================== */}
            <section className="py-12 lg:py-12 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0F766E]">
                                PORTFOLIO RELEVANCE
                            </p>
                            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#123B5D] sm:text-4xl">
                                Relevant Product Categories
                            </h2>
                        </div>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-sm font-bold text-[#123B5D] hover:text-[#0F766E] transition"
                        >
                            <span>Explore Full Catalog</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {relevantProducts.map((prod) => (
                            <Link
                                key={prod.name}
                                href={prod.href}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0F766E] hover:shadow-xl"
                            >
                                <div className="relative h-44 bg-slate-100 overflow-hidden">
                                    <Image
                                        src={prod.image}
                                        alt={prod.name}
                                        fill
                                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                                <div className="p-5 flex flex-1 flex-col justify-between bg-white">
                                    <div>
                                        <h3 className="text-lg font-bold text-[#123B5D] group-hover:text-[#0F766E] transition-colors">
                                            {prod.name}
                                        </h3>
                                        <p className="mt-1 text-xs text-slate-600 leading-normal">
                                            {prod.desc}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-[#0F766E]">
                                        <span>Browse Category</span>
                                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== 5. ECOSYSTEM & PROMINENT NETWORK PLAYERS ==================== */}
            <section className="py-12 lg:py-12 bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-8">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0F766E]">
                            INDUSTRY CONTEXT
                        </p>
                        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#123B5D]">
                            Prominent Network Players & Context
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 max-w-2xl">
                            Understanding key organizations operating in this domain helps frame how Aurevia aligns product supply across the ecosystem.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {industry.companies.map((company) => (
                            <div
                                key={company.name}
                                className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                            >
                                <div className="absolute left-0 top-0 h-full w-1.5 rounded-l-2xl bg-[#0F766E]" />
                                <div className="flex items-center gap-3 mb-3 pl-1">
                                    <div className="rounded-lg bg-slate-100 p-2 text-[#123B5D]">
                                        <Building2 size={18} />
                                    </div>
                                    <h3 className="text-base font-bold text-[#123B5D]">
                                        {company.name}
                                    </h3>
                                </div>
                                <p className="text-xs leading-relaxed text-slate-600 pl-1">
                                    {company.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== 6. MANUFACTURING PROCESS CONNECTION ==================== */}
            <section className="py-12 lg:py-12 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center mb-12">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0F766E]">
                            END-TO-END EXECUTION
                        </p>
                        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#123B5D] sm:text-4xl">
                            From Requirement to Delivery
                        </h2>
                        <p className="mt-3 text-base text-slate-600">
                            Our structured manufacturing workflow ensures clarity, quality consistency, and reliable timeline coordination.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {manufacturingProcess.map((item) => {
                            const IconComp = item.icon;
                            return (
                                <div
                                    key={item.step}
                                    className="relative rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 shadow-sm transition hover:border-[#0F766E] hover:bg-white"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#123B5D] text-xs font-bold text-white">
                                            {item.step}
                                        </span>
                                        <div className="text-[#0F766E]">
                                            <IconComp size={20} />
                                        </div>
                                    </div>
                                    <h3 className="text-base font-bold text-[#123B5D]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ==================== 7. CORPORATE STATEMENT BANNER ==================== */}
            <section className="relative overflow-hidden bg-[#071E33] py-12 text-center text-white border-y border-teal-900/40">
                <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
                <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
                    <span className="h-1 w-12 bg-[#0F766E] mx-auto block mb-4 rounded-full" />
                    <h2 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl text-white leading-tight">
                        Reliable pharmaceutical support built around the requirements of {industry.title}.
                    </h2>
                    <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal">
                        Aurevia Healthcare provides structured product availability, batch quality compliance, and responsive B2B collaboration.
                    </p>
                </div>
            </section>

            {/* ==================== 8. EXPLORE OTHER INDUSTRIES ==================== */}
            <section className="py-12 lg:py-12 bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0F766E]">
                                MORE SECTORS
                            </p>
                            <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-[#123B5D]">
                                Explore Other Industries
                            </h2>
                        </div>
                        <Link
                            href="/industries"
                            className="text-xs font-bold uppercase tracking-wider text-[#0F766E] hover:underline"
                        >
                            View All →
                        </Link>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {relatedIndustries.map((rel) => (
                            <Link
                                key={rel.slug}
                                href={`/industries/${rel.slug}`}
                                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#0F766E] hover:shadow-md"
                            >
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#0F766E]">
                                        {rel.eyebrow}
                                    </span>
                                    <h3 className="mt-1 text-lg font-bold text-[#123B5D] group-hover:text-[#0F766E] transition-colors">
                                        {rel.title}
                                    </h3>
                                    <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                                        {rel.description}
                                    </p>
                                </div>
                                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#123B5D] group-hover:text-[#0F766E] pt-3 border-t border-slate-100">
                                    <span>Learn Details</span>
                                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== 9. FREQUENTLY ASKED QUESTIONS ==================== */}
            <IndustriesFAQ
                title={`Frequently Asked Questions for ${industry.title}`}
                subtitle={`Common questions regarding Aurevia Healthcare's pharmaceutical supply, manufacturing support, and collaboration options for ${industry.title}.`}
            />

            {/* ==================== 10. FINAL B2B PARTNERSHIP CTA ==================== */}
            <section className="py-12 lg:py-12 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl bg-[#071E33] px-7 py-12 text-center shadow-2xl sm:px-12 sm:py-12 border border-teal-900/40">
                        <div className="relative z-10 mx-auto max-w-3xl">
                            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-950/60 px-4 py-1 backdrop-blur-md">
                                <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" aria-hidden="true" />
                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-300">
                                    B2B Collaboration
                                </span>
                            </div>

                            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                Discuss Your Requirements for {industry.title}
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 leading-relaxed font-normal">
                                Connect with our technical and business team to discuss product availability, formulation specifications, and contract manufacturing opportunities.
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href={`/contact?industry=${encodeURIComponent(industry.title)}#contact-form`}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#2A9D8F] hover:shadow-teal-500/25 hover:scale-[1.02]"
                                >
                                    <MessageSquare size={16} />
                                    <span>Discuss Your Requirements</span>
                                    <ArrowRight size={16} />
                                </Link>

                                <Link
                                    href="/contact"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-slate-800"
                                >
                                    <span>Contact Aurevia</span>
                                    <ChevronRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}