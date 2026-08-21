"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CareerHero() {
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
                    src="/career/carrerbanner.png"
                    alt="Careers at Aurevia Healthcare"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-transparent" />

                <div className="absolute inset-0">
                    <div className="mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
                        <div className="max-w-2xl text-left text-white animate-hero-content">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-300">
                                CAREERS AT AUREVIA
                            </p>

                            <h1 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                                Build Your Career in Healthcare
                            </h1>

                            <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-200 sm:text-sm">
                                Join Aurevia Healthcare and be part of a team
                                focused on quality, innovation, collaboration
                                and reliable healthcare solutions.
                            </p>

                            <Link
                                href="#opportunities"
                                className="group mt-4 inline-flex items-center rounded-lg bg-[#123B5D] px-5 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#0d2d46] hover:shadow-lg"
                            >
                                Explore Opportunities
                                <ArrowRight size={17} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}