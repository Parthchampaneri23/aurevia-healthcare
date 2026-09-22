import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Factory, Award } from "lucide-react";

export default function CompanyStory() {
    return (
        <section aria-label="Company Introduction" className="bg-white py-12 sm:py-12 lg:py-12 overflow-hidden border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-stretch">

                    {/* Image Container with Perfect 1:1 Height Alignment */}
                    <div className="group relative flex overflow-hidden rounded-3xl bg-slate-100 shadow-xl transition-all duration-500 hover:shadow-2xl min-h-[380px] sm:min-h-[440px] lg:min-h-full border border-slate-200/80">
                        <div className="overflow-hidden w-full h-full relative">
                            <Image
                                src="/hero/About-us.png?v=2"
                                alt="Aurevia Healthcare pharmaceutical manufacturing facility"
                                width={800}
                                height={600}
                                unoptimized
                                className="h-full w-full object-cover object-center sm:object-[center_25%] transition-all duration-700 ease-out group-hover:scale-105"
                            />
                        </div>

                        {/* Subtle Overlay Badge */}
                        <div className="absolute bottom-6 left-6 right-6 z-10 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur-md border border-slate-200/80">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E]">
                                    <Factory size={22} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">B2B Manufacturing Partner</h4>
                                    <p className="text-xs text-slate-600">Controlled cGMP Formulation & Batch Excellence</p>
                                </div>
                            </div>
                        </div>

                        {/* Soft Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col justify-center">

                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]"></span>
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0F766E]">
                                COMPANY INTRODUCTION
                            </p>
                            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]"></span>
                        </div>

                        <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            A Dependable Bridge in
                            <span className="block mt-1 bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">
                                Pharmaceutical Manufacturing
                            </span>
                        </h2>

                        <p className="mt-6 text-base leading-relaxed text-slate-600">
                            Aurevia Healthcare is a B2B pharmaceutical manufacturing enterprise focused on supplying high-grade dosage formulations to healthcare businesses, distributors, and institutional procurement partners.
                        </p>

                        <p className="mt-4 text-base leading-relaxed text-slate-600">
                            Our core commitment combines disciplined cGMP production standards, rigorous in-house analytical testing, and responsive customer collaboration to ensure dependable, high-quality batch production.
                        </p>

                        {/* Highlights Grid */}
                        <div className="mt-8 grid gap-4 sm:grid-cols-2">

                            <div className="group/item flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/50 p-3.5 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-md">
                                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E] transition-colors duration-300 group-hover/item:bg-[#0F766E] group-hover/item:text-white">
                                    <CheckCircle2 size={18} className="shrink-0" />
                                </div>
                                <span className="text-sm font-semibold text-slate-800">
                                    Quality-Focused Formulations
                                </span>
                            </div>

                            <div className="group/item flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/50 p-3.5 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-md">
                                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E] transition-colors duration-300 group-hover/item:bg-[#0F766E] group-hover/item:text-white">
                                    <ShieldCheck size={18} className="shrink-0" />
                                </div>
                                <span className="text-sm font-semibold text-slate-800">
                                    Controlled Production Standards
                                </span>
                            </div>

                            <div className="group/item flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/50 p-3.5 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-md">
                                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E] transition-colors duration-300 group-hover/item:bg-[#0F766E] group-hover/item:text-white">
                                    <Award size={18} className="shrink-0" />
                                </div>
                                <span className="text-sm font-semibold text-slate-800">
                                    Customer-Oriented Service
                                </span>
                            </div>

                            <div className="group/item flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/50 p-3.5 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-md">
                                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E] transition-colors duration-300 group-hover/item:bg-[#0F766E] group-hover/item:text-white">
                                    <CheckCircle2 size={18} className="shrink-0" />
                                </div>
                                <span className="text-sm font-semibold text-slate-800">
                                    Continuous Process Improvement
                                </span>
                            </div>

                        </div>

                        {/* Button */}
                        <div className="mt-8 flex items-center gap-4">
                            <Link
                                href="/products"
                                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-950/20 transition-all duration-300 hover:bg-[#123B5D] hover:shadow-xl active:scale-95"
                            >
                                <span>Explore Product Categories</span>
                                <ArrowRight
                                    size={17}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Link>

                            <Link
                                href="/contact#contact-form"
                                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition-all duration-300 hover:border-[#0F766E] hover:text-[#0F766E] active:scale-95"
                            >
                                Partner With Us
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}