import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Lightbulb, Handshake } from "lucide-react";

export default function AboutPreview() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-12 lg:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

                    {/* Image Container with Hover Effects */}
                    <div className="group relative overflow-hidden rounded-3xl bg-slate-100 shadow-2xl transition-all duration-500 hover:shadow-cyan-900/10">
                        <div className="overflow-hidden">
                            <Image
                                src="/hero/About-us.png"
                                alt="Aurevia Healthcare Facility"
                                width={800}
                                height={600}
                                className="h-[400px] w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 sm:h-[450px] lg:h-[520px]"
                            />
                        </div>

                        {/* Soft Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        {/* Experience Badge */}
                        <div className="absolute bottom-6 left-6 translate-y-0 rounded-2xl border border-white/20 bg-white/90 p-5 shadow-xl backdrop-blur-md transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-white sm:p-6">
                            <p className="bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
                                15+
                            </p>
                            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-600 sm:text-sm">
                                Years of Excellence
                            </p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]"></span>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                                About Aurevia Healthcare
                            </p>
                        </div>

                        <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            Building Better
                            <span className="block mt-1 bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">
                                Healthcare Solutions
                            </span>
                        </h2>

                        <p className="mt-6 text-base leading-relaxed text-slate-600">
                            Aurevia Healthcare is a B2B pharmaceutical manufacturing company focused on delivering reliable and quality-driven pharmaceutical solutions for healthcare businesses and partners.
                        </p>

                        <p className="mt-4 text-base leading-relaxed text-slate-600">
                            We combine modern manufacturing capabilities, quality-focused processes and customer-oriented service to support the evolving needs of the healthcare industry.
                        </p>

                        {/* Highlights/Animated Cards */}
                        <div className="mt-10 grid gap-5 sm:grid-cols-3">
                            {/* Quality */}
                            <div className="group/card relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-100 hover:shadow-md">
                                <div className="absolute top-0 left-0 h-[3px] w-0 bg-[#0F766E] transition-all duration-300 group-hover/card:w-full" />
                                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E] transition-colors duration-300 group-hover/card:bg-[#0F766E] group-hover/card:text-white">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <p className="text-base font-bold text-slate-800">
                                    Quality
                                </p>
                                <p className="mt-1.5 text-xs text-slate-500 leading-normal">
                                    Consistent global manufacturing standards.
                                </p>
                            </div>

                            {/* Innovation */}
                            <div className="group/card relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-100 hover:shadow-md">
                                <div className="absolute top-0 left-0 h-[3px] w-0 bg-[#123B5D] transition-all duration-300 group-hover/card:w-full" />
                                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#123B5D] transition-colors duration-300 group-hover/card:bg-[#123B5D] group-hover/card:text-white">
                                    <Lightbulb className="h-5 w-5" />
                                </div>
                                <p className="text-base font-bold text-slate-800">
                                    Innovation
                                </p>
                                <p className="mt-1.5 text-xs text-slate-500 leading-normal">
                                    Research driven & advanced technologies.
                                </p>
                            </div>

                            {/* Reliability */}
                            <div className="group/card relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#123B5D]/20 hover:shadow-md">
                                <div className="absolute top-0 left-0 h-[3px] w-0 bg-[#123B5D] transition-all duration-300 group-hover/card:w-full" />
                                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-[#123B5D] transition-colors duration-300 group-hover/card:bg-[#123B5D] group-hover/card:text-white">
                                    <Handshake className="h-5 w-5" />
                                </div>
                                <p className="text-base font-bold text-slate-800">
                                    Reliability
                                </p>
                                <p className="mt-1.5 text-xs text-slate-500 leading-normal">
                                    Trusted & secure business partnerships.
                                </p>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="mt-10">
                            <Link
                                href="/about"
                                className="group/btn inline-flex items-center gap-2 rounded-xl bg-[#123B5D] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/10 transition-all duration-300 hover:bg-[#0d2d46] hover:shadow-xl hover:shadow-blue-900/20 hover:translate-x-0.5 active:scale-95"
                            >
                                Learn More About Us
                                <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}