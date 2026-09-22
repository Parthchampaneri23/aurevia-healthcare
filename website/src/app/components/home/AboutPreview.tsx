import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Lightbulb, Handshake, ArrowRight } from "lucide-react";

export default function AboutPreview() {
    return (
        <section aria-label="About Aurevia Healthcare" className="relative overflow-hidden bg-white py-12 lg:py-12 border-t border-slate-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-stretch">

                    {/* Image Container */}
                    <div className="group relative flex overflow-hidden rounded-3xl bg-slate-900 shadow-xl transition-all duration-500 hover:shadow-2xl min-h-[380px] sm:min-h-[440px] lg:min-h-full">
                        <div className="overflow-hidden w-full h-full relative">
                            <Image
                                src="/hero/About-us.png?v=2"
                                alt="Aurevia Healthcare Manufacturing Facility"
                                width={800}
                                height={600}
                                unoptimized
                                className="h-full w-full object-cover object-center sm:object-[center_25%] transition-all duration-700 ease-out group-hover:scale-105"
                            />
                        </div>

                        {/* Soft Gradient Overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                        {/* Floating Experience Badge */}
                        <div className="absolute bottom-6 left-6 z-10 rounded-2xl bg-white/95 px-5 py-3 shadow-lg backdrop-blur-md border border-slate-100">
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
                                Reliable B2B Partner
                            </p>
                            <p className="text-sm font-bold text-[#123B5D]">
                                Pharmaceutical Manufacturing
                            </p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" aria-hidden="true" />
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
                                ABOUT AUREVIA HEALTHCARE
                            </p>
                            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" aria-hidden="true" />
                        </div>

                        <h2 className="text-3xl font-extrabold tracking-tight text-[#123B5D] leading-tight sm:text-4xl lg:text-5xl lg:leading-tight">
                            Building Trusted
                            <span className="block mt-1 bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">
                                Healthcare Solutions
                            </span>
                        </h2>

                        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                            Aurevia Healthcare is a B2B pharmaceutical manufacturing company dedicated to delivering reliable, quality-controlled dosage formulations for global healthcare brand owners, distributors, and institutional buyers.
                        </p>

                        <p className="mt-3 text-base leading-relaxed text-slate-600">
                            We combine modern production infrastructure, rigorous quality assurance, and customer-oriented commercial support to meet the evolving formulation demands of the market.
                        </p>

                        {/* 3 Core Highlights */}
                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            {/* Quality */}
                            <div className="group/card relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#0F766E]/40 hover:bg-white hover:shadow-md">
                                <div className="absolute top-0 left-0 h-[3px] w-0 bg-[#0F766E] transition-all duration-300 group-hover/card:w-full" aria-hidden="true" />
                                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E] transition-colors duration-300 group-hover/card:bg-[#0F766E] group-hover/card:text-white">
                                    <ShieldCheck className="h-4 w-4" />
                                </div>
                                <p className="text-sm font-bold text-slate-900">
                                    Quality Assurance
                                </p>
                                <p className="mt-1 text-xs text-slate-600 leading-normal">
                                    Controlled cGMP production & analytical testing.
                                </p>
                            </div>

                            {/* Innovation */}
                            <div className="group/card relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#123B5D]/40 hover:bg-white hover:shadow-md">
                                <div className="absolute top-0 left-0 h-[3px] w-0 bg-[#123B5D] transition-all duration-300 group-hover/card:w-full" aria-hidden="true" />
                                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#123B5D] transition-colors duration-300 group-hover/card:bg-[#123B5D] group-hover/card:text-white">
                                    <Lightbulb className="h-4 w-4" />
                                </div>
                                <p className="text-sm font-bold text-slate-900">
                                    Formulation R&D
                                </p>
                                <p className="mt-1 text-xs text-slate-600 leading-normal">
                                    Continuous optimization & stability studies.
                                </p>
                            </div>

                            {/* Reliability */}
                            <div className="group/card relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#0F766E]/40 hover:bg-white hover:shadow-md">
                                <div className="absolute top-0 left-0 h-[3px] w-0 bg-[#0F766E] transition-all duration-300 group-hover/card:w-full" aria-hidden="true" />
                                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E] transition-colors duration-300 group-hover/card:bg-[#0F766E] group-hover/card:text-white">
                                    <Handshake className="h-4 w-4" />
                                </div>
                                <p className="text-sm font-bold text-slate-900">
                                    B2B Reliability
                                </p>
                                <p className="mt-1 text-xs text-slate-600 leading-normal">
                                    Dependable supply chain & private labeling.
                                </p>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="mt-8">
                            <Link
                                href="/about"
                                className="group/btn inline-flex items-center gap-2 rounded-xl bg-[#123B5D] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[#0F766E] hover:shadow-lg active:scale-95"
                            >
                                <span>Learn More About Us</span>
                                <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
