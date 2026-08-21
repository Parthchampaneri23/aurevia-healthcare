"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
    {
        image: "/hero/slide1.png",
        alt: "Aurevia Healthcare pharmaceutical manufacturing",
        eyebrow: "AUREVIA HEALTHCARE",
        title: "Trusted Pharmaceutical Manufacturing",
        description:
            "Quality-driven pharmaceutical manufacturing solutions built for reliable healthcare partnerships.",
        primaryButton: "Explore Products",
        primaryLink: "/products#explore",
        secondaryButton: "About Aurevia",
        secondaryLink: "/about",
    },
    {
        image: "/hero/slide2.png",
        alt: "Aurevia Healthcare manufacturing facility",
        eyebrow: "MANUFACTURING EXCELLENCE",
        title: "Precision in Every Manufacturing Process",
        description:
            "Modern infrastructure and controlled processes designed to deliver consistent pharmaceutical solutions.",
        primaryButton: "Explore Industries",
        primaryLink: "/industries#industry-segments",
        secondaryButton: "Explore Products",
        secondaryLink: "/products#explore",
    },
    {
        image: "/hero/slide3.png",
        alt: "Aurevia Healthcare quality control",
        eyebrow: "QUALITY & RELIABILITY",
        title: "Quality That Builds Trust",
        description:
            "From manufacturing to quality control, we focus on consistency, reliability and responsible pharmaceutical practices.",
        primaryButton: "Quality & Certifications",
        primaryLink: "/about#quality-certifications",
        secondaryButton: "Learn More",
        secondaryLink: "/about",
    },
    {
        image: "/hero/slide4.png",
        alt: "Aurevia Healthcare pharmaceutical partnership",
        eyebrow: "YOUR PHARMACEUTICAL PARTNER",
        title: "Reliable Solutions for Better Healthcare",
        description:
            "Supporting healthcare businesses with dependable manufacturing capabilities and long-term partnerships.",
        primaryButton: "Get a Quote",
        primaryLink: "/contact#contact-form",
        secondaryButton: "Contact Us",
        secondaryLink: "/contact#contact-form",
    },
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const previousSlide = () => {
        setCurrentSlide(
            (prev) => (prev - 1 + slides.length) % slides.length
        );
    };

    return (
        <section className="relative w-full overflow-hidden bg-slate-100">

            {/* Slides */}
            <div className="relative h-[200px] sm:h-[240px] lg:h-[280px]">
                {slides.map((slide, index) => (
                    <div
                        key={slide.image}
                        className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide
                                ? "z-10 opacity-100"
                                : "z-0 opacity-0"
                            }`}
                    >
                        {/* Background Image */}
                        <Image
                            src={slide.image}
                            alt={slide.alt}
                            fill
                            priority={index === 0}
                            className="object-cover"
                            sizes="100vw"
                        />

                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/45 to-transparent" />

                        {/* Content */}
                        <div className="absolute inset-0">
                            <div className="mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
                                <div className="max-w-xl text-white">

                                    {/* Eyebrow */}
                                    <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/80 sm:text-xs">
                                        {slide.eyebrow}
                                    </p>

                                    {/* Heading */}
                                    <h1 className="text-xl font-bold leading-tight sm:text-2xl lg:text-3xl">
                                        {slide.title}
                                    </h1>

                                    {/* Description */}
                                    <p className="mt-1.5 max-w-lg text-[10px] leading-relaxed text-white/85 sm:text-xs sm:leading-relaxed">
                                        {slide.description}
                                    </p>

                                    {/* Buttons */}
                                    <div className="mt-3.5 flex flex-wrap gap-2">
                                        <Link
                                            href={slide.primaryLink}
                                            className="inline-flex items-center rounded-lg bg-[#123B5D] px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-md transition hover:bg-[#0d2d46] sm:px-4.5 sm:py-2 sm:text-xs"
                                        >
                                            {slide.primaryButton}
                                            <span className="ml-1.5">→</span>
                                        </Link>

                                        <Link
                                            href={slide.secondaryLink}
                                            className="inline-flex items-center rounded-lg border border-white/70 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#123B5D] sm:px-4.5 sm:py-2 sm:text-xs"
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

            {/* Previous Button */}
            <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#123B5D] shadow-md backdrop-blur-sm transition hover:bg-white sm:left-5 sm:h-8 sm:w-8"
            >
                <ChevronLeft size={16} />
            </button>

            {/* Next Button */}
            <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#123B5D] shadow-md backdrop-blur-sm transition hover:bg-white sm:right-5 sm:h-8 sm:w-8"
            >
                <ChevronRight size={16} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide
                                ? "w-5 bg-[#123B5D]"
                                : "w-1.5 bg-white/80 hover:bg-white"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}