import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Building2 } from "lucide-react";
import industriesData from "@/app/components/industries/industryData";
import Breadcrumb from "@/app/components/common/Breadcrumb";

type IndustryDetailsPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function IndustryDetailsPage({
    params,
}: IndustryDetailsPageProps) {
    const { slug } = await params;

    const industry = industriesData.find((item) => item.slug === slug);

    if (!industry) {
        notFound();
    }

    return (
        <main className="min-h-screen overflow-hidden bg-slate-50 pb-20">
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        @keyframes pageFadeIn {
                            from {
                                opacity: 0;
                            }
                            to {
                                opacity: 1;
                            }
                        }

                        @keyframes contentSlideUp {
                            from {
                                opacity: 0;
                                transform: translateY(30px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
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

            {/* ==================== HERO BANNER ==================== */}
            <section className="relative h-[240px] w-full overflow-hidden sm:h-[280px] lg:h-[320px]">
                <Image
                    src="/industries/industrybanner.png"
                    alt={industry.title}
                    fill
                    priority
                    unoptimized={true}
                    className="object-cover object-center"
                    sizes="100vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-transparent" />

                {/* Banner Content */}
                <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
                    <div className="max-w-2xl text-left">
                        <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-950/60 px-3.5 py-1 backdrop-blur-md">
                            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-300">
                                {industry.eyebrow}
                            </span>
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
                            {industry.title}
                        </h1>

                        {/* Breadcrumb on Banner */}
                        <Breadcrumb
                            items={[
                                { name: "Industries", href: "/industries" },
                                { name: industry.title }
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* ==================== DETAIL CONTENT ==================== */}
            <section className="animate-page-fade bg-slate-50 py-8 lg:py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href="/industries"
                            className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-[#123B5D] hover:text-white"
                        >
                            <ArrowLeft
                                size={14}
                                className="transition-transform duration-300 group-hover:-translate-x-0.5"
                            />
                            Back to Industries
                        </Link>
                    </div>

                    <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">

                        {/* ==================== LEFT CONTENT ==================== */}
                        <div className="animate-content-slide space-y-8 lg:col-span-7">

                            {/* Overview */}
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2">
                                    <span className="h-1 w-6 rounded-full bg-[#0F766E]" />

                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                                        Overview
                                    </p>
                                </div>

                                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                    Sector Overview & Demands
                                </h2>

                                <p className="mt-4 text-base font-semibold leading-relaxed text-slate-600">
                                    {industry.description}
                                </p>

                                <p className="mt-4 text-base leading-relaxed text-slate-600">
                                    {industry.overview}
                                </p>
                            </div>

                            {/* Ecosystem Partners */}
                            <div>
                                <div className="mb-4 inline-flex items-center gap-2">
                                    <span className="h-1 w-6 rounded-full bg-[#0F766E]" />

                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                                        Ecosystem Partners
                                    </p>
                                </div>

                                <h3 className="mb-6 text-xl font-bold text-slate-900">
                                    Prominent Network Players
                                </h3>

                                <div className="grid gap-6">
                                    {industry.companies.map((company) => (
                                        <div
                                            key={company.name}
                                            className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                                        >
                                            {/* Left teal border */}
                                            <div className="absolute left-0 top-0 h-full w-[4px] rounded-l-2xl bg-teal-600 transition-all duration-300 group-hover:w-[6px]" />

                                            <div className="flex items-start gap-4 pl-2">
                                                <div className="rounded-xl bg-slate-50 p-2.5 text-[#123B5D] transition-colors duration-300 group-hover:bg-[#123B5D] group-hover:text-white">
                                                    <Building2 size={20} />
                                                </div>

                                                <div>
                                                    <h4 className="text-lg font-bold text-[#123B5D]">
                                                        {company.name}
                                                    </h4>

                                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                                        {company.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ==================== RIGHT SIDEBAR ==================== */}
                        <div className="space-y-6 lg:sticky lg:top-8 lg:col-span-5">

                            {/* Service Areas */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                                <h3 className="mb-5 border-b border-slate-100 pb-4 text-lg font-bold text-slate-900">
                                    Key Service Areas & Support
                                </h3>

                                <ul className="space-y-4">
                                    {industry.supportPoints.map((point) => (
                                        <li
                                            key={point}
                                            className="flex items-start gap-3"
                                        >
                                            <CheckCircle2
                                                size={18}
                                                className="mt-0.5 shrink-0 text-teal-600"
                                            />

                                            <span className="text-sm font-medium leading-relaxed text-slate-700">
                                                {point}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Partnership CTA */}
                            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                                <div className="absolute left-0 top-0 h-[4px] w-full bg-[#123B5D]" />

                                <h3 className="text-xl font-bold text-[#123B5D]">
                                    Partnership Opportunities
                                </h3>

                                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                    We align closely with hospitals, retail networks,
                                    and distributors to ensure high quality and
                                    uninterrupted pharmaceutical availability.
                                </p>

                                <div className="mt-6">
                                    <Link
                                        href={`/contact?industry=${encodeURIComponent(
                                            industry.title
                                        )}#contact-form`}
                                        className="inline-flex w-full items-center justify-center rounded-xl bg-[#123B5D] px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-[#0F766E] active:scale-[0.98]"
                                    >
                                        Inquire about collaboration
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}