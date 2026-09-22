"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const slides = [
    {
        image: "/hero/slide1.png",
        alt: "Aurevia Healthcare pharmaceutical manufacturing",
        eyebrow: "B2B PHARMACEUTICAL MANUFACTURING",
        title: "Advancing Healthcare Through Reliable Pharmaceutical Manufacturing",
        description:
            "High-capacity dosage formulation, contract manufacturing, and dependable supply solutions tailored for healthcare brands, distributors, and institutions.",
        primaryButton: "Explore Products",
        primaryLink: "/products#explore",
        secondaryButton: "Partner With Aurevia",
        secondaryLink: "/contact#contact-form",
    },
    {
        image: "/hero/slide2.png",
        alt: "Aurevia Healthcare manufacturing facility",
        eyebrow: "MANUFACTURING EXCELLENCE",
        title: "Controlled Production Processes & Consistent Quality",
        description:
            "Operating under strict cGMP protocols with automated dosage packaging, positive pressure cleanrooms, and comprehensive batch control.",
        primaryButton: "Explore Business Sectors",
        primaryLink: "/industries#industry-segments",
        secondaryButton: "Explore Products",
        secondaryLink: "/products#explore",
    },
    {
        image: "/hero/slide3.png",
        alt: "Aurevia Healthcare quality control",
        eyebrow: "QUALITY & COMPLIANCE",
        title: "Quality Built Into Every Pharmaceutical Batch",
        description:
            "Rigorous raw material qualification, in-house analytical laboratories (HPLC, GC, UV-Vis), and complete stability testing protocols.",
        primaryButton: "Quality Standards",
        primaryLink: "/about#quality-certifications",
        secondaryButton: "About Aurevia",
        secondaryLink: "/about",
    },
    {
        image: "/hero/slide4.png",
        alt: "Aurevia Healthcare pharmaceutical partnership",
        eyebrow: "STRATEGIC B2B PARTNERSHIPS",
        title: "End-to-End Private Labeling & Third-Party Manufacturing",
        description:
            "Partner with Aurevia for customized formulation development, CTD/ACTD regulatory support, and seamless international supply logistics.",
        primaryButton: "Request Manufacturing Quote",
        primaryLink: "/contact#contact-form",
        secondaryButton: "Contact Us",
        secondaryLink: "/contact#contact-form",
    },
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [heroSlides, setHeroSlides] = useState(slides);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("aurevia_website_management_data");
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed?.homeData?.heroSlides?.length > 0) {
                    setHeroSlides(parsed.homeData.heroSlides);
                } else if (parsed?.homeHeroSlides?.length > 0) {
                    setHeroSlides(parsed.homeHeroSlides);
                }
            }
        } catch {
            // fallback
        }
    }, []);

    useEffect(() => {
        if (heroSlides.length === 0) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [heroSlides.length]);

    return (
        <section aria-label="Hero Banner" className="relative w-full overflow-hidden bg-slate-950">

            {/* Slides Container */}
            <div className="relative h-[620px] xs:h-[580px] sm:h-[560px] md:h-[600px] lg:h-[660px]">
                {heroSlides.map((slide, index) => (
                    <div
                        key={slide.image + index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide
                            ? "z-10 opacity-100"
                            : "z-0 opacity-0 pointer-events-none"
                            }`}
                    >
                        {/* Background Image */}
                        <Image
                            src={slide.image}
                            alt={slide.alt || "Aurevia Healthcare"}
                            fill
                            priority={index === 0}
                            className="object-cover object-center"
                            sizes="100vw"
                        />

                        {/* Professional Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-900/40" />

                        {/* Content Container */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="mx-auto w-full max-w-7xl px-5 pt-4 pb-16 sm:px-6 sm:py-0 lg:px-8">
                                <div className="max-w-2xl text-white">

                                    {/* Eyebrow Pill */}
                                    <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-950/60 px-3 py-1 backdrop-blur-md">
                                        <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" aria-hidden="true" />
                                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-teal-300">
                                            {slide.eyebrow}
                                        </span>
                                    </div>

                                    {/* Heading */}
                                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-md lg:leading-[1.15]">
                                        {slide.title}
                                    </h1>

                                    {/* Description */}
                                    <p className="mt-2.5 sm:mt-4 max-w-xl text-xs sm:text-lg font-normal leading-relaxed text-slate-200">
                                        {slide.description}
                                    </p>

                                    {/* CTA Buttons */}
                                    <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-2.5 sm:gap-4">
                                        <Link
                                            href={slide.primaryLink}
                                            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-5 py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-base font-semibold text-white shadow-lg shadow-teal-950/30 transition-all duration-300 hover:bg-[#123B5D] hover:shadow-xl active:scale-95"
                                        >
                                            <span>{slide.primaryButton}</span>
                                            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                                        </Link>

                                        <Link
                                            href={slide.secondaryLink}
                                            className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#123B5D] active:scale-95"
                                        >
                                            {slide.secondaryButton}
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-3 sm:bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:gap-2.5">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                            ? "w-7 sm:w-8 bg-teal-400"
                            : "w-2 sm:w-2.5 bg-white/40 hover:bg-white/70"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
