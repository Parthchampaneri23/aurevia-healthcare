"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function IndustriesHero() {
    return (
        <section className="relative overflow-hidden">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes heroSlideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-hero-content {
                    animation: heroSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />
            <div className="relative h-[250px] sm:h-[290px] lg:h-[330px]">
                <Image
                    src="/industries/industrybanner.png"
                    alt="Aurevia Healthcare industries and partnerships"
                    fill
                    priority
                    unoptimized={true}
                    className="object-cover"
                    sizes="100vw"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/55 to-transparent" />

                <div className="absolute inset-0">
                    <div className="mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
                        <div className="max-w-2xl text-left text-white animate-hero-content">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-teal-300">
                                INDUSTRIES
                            </p>

                            <h1 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                                Healthcare Solutions
                                <span className="block text-white/80">
                                    Across Industries
                                </span>
                            </h1>

                            <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-200 sm:text-sm">
                                Supporting healthcare businesses with reliable
                                pharmaceutical products, manufacturing
                                capabilities and long-term B2B partnerships.
                            </p>

                            <div className="mt-4 flex flex-wrap gap-3">
                                <Link
                                    href="/contact#contact-form"
                                    className="inline-flex items-center rounded-lg bg-[#123B5D] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[#0d2d46]"
                                >
                                    Partner With Us
                                    <ArrowRight size={17} className="ml-2" />
                                </Link>

                                <Link
                                    href="/products"
                                    className="inline-flex items-center rounded-lg border border-white/70 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#123B5D]"
                                >
                                    Explore Products
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}