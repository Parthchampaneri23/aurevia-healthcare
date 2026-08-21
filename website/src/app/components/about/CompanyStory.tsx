import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function CompanyStory() {
    return (
        <section className="bg-white py-12 sm:py-12 lg:py-12 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

                    {/* Image Container with Hover Zoom & Floating Badge */}
                    <div className="group relative overflow-hidden rounded-3xl bg-slate-100 shadow-2xl transition-all duration-500 hover:shadow-cyan-900/10">
                        <div className="overflow-hidden">
                            <Image
                                src="/hero/About-us.png"
                                alt="Aurevia Healthcare pharmaceutical manufacturing"
                                width={800}
                                height={600}
                                className="h-[350px] w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 sm:h-[400px] lg:h-[480px]"
                            />
                        </div>

                        {/* Soft Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />


                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col justify-center">

                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]"></span>
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0F766E]">
                                Our Story
                            </p>
                        </div>

                        <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            Building a Trusted
                            <span className="block mt-1 bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">
                                Healthcare Partner
                            </span>
                        </h2>

                        <p className="mt-6 text-base leading-relaxed text-slate-600">
                            Aurevia Healthcare is a B2B pharmaceutical
                            manufacturing company focused on providing
                            dependable pharmaceutical solutions to healthcare
                            businesses and partners.
                        </p>

                        <p className="mt-4 text-base leading-relaxed text-slate-600">
                            Our approach combines quality-focused manufacturing,
                            controlled processes and customer-oriented service
                            to support consistent and reliable pharmaceutical
                            production.
                        </p>

                        {/* Highlights Grid */}
                        <div className="mt-8 grid gap-4 sm:grid-cols-2">

                            <div className="group/item flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-100 hover:shadow-md">
                                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E] transition-colors duration-300 group-hover/item:bg-[#0F766E] group-hover/item:text-white">
                                    <CheckCircle2 size={18} className="shrink-0" />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">
                                    Quality-Focused Processes
                                </span>
                            </div>

                            <div className="group/item flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-100 hover:shadow-md">
                                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E] transition-colors duration-300 group-hover/item:bg-[#0F766E] group-hover/item:text-white">
                                    <CheckCircle2 size={18} className="shrink-0" />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">
                                    Reliable Manufacturing
                                </span>
                            </div>

                            <div className="group/item flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-100 hover:shadow-md">
                                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E] transition-colors duration-300 group-hover/item:bg-[#0F766E] group-hover/item:text-white">
                                    <CheckCircle2 size={18} className="shrink-0" />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">
                                    Customer Partnership
                                </span>
                            </div>

                            <div className="group/item flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-100 hover:shadow-md">
                                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E] transition-colors duration-300 group-hover/item:bg-[#0F766E] group-hover/item:text-white">
                                    <CheckCircle2 size={18} className="shrink-0" />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">
                                    Continuous Improvement
                                </span>
                            </div>

                        </div>

                        {/* Button */}
                        <div className="mt-8">
                            <Link
                                href="/contact#contact-form"
                                className="group inline-flex items-center rounded-xl bg-gradient-to-r from-[#123B5D] to-[#1a5380] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cyan-900/20"
                            >
                                Work With Us
                                <ArrowRight
                                    size={17}
                                    className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5"
                                />
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}