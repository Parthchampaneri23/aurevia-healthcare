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
        primaryLink: "/products",
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
        primaryButton: "Our Manufacturing",
        primaryLink: "/manufacturing",
        secondaryButton: "Explore Products",
        secondaryLink: "/products",
    },
    {
        image: "/hero/slide3.png",
        alt: "Aurevia Healthcare quality control",
        eyebrow: "QUALITY & RELIABILITY",
        title: "Quality That Builds Trust",
        description:
            "From manufacturing to quality control, we focus on consistency, reliability and responsible pharmaceutical practices.",
        primaryButton: "Our Quality Approach",
        primaryLink: "/about",
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
        primaryLink: "/contact",
        secondaryButton: "Contact Us",
        secondaryLink: "/contact",
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
            <div className="relative h-[280px] sm:h-[340px] md:h-[390px] lg:h-[420px]">
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
                                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 sm:text-xs">
                                        {slide.eyebrow}
                                    </p>

                                    {/* Heading */}
                                    <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-[42px]">
                                        {slide.title}
                                    </h1>

                                    {/* Description */}
                                    <p className="mt-3 max-w-lg text-xs leading-5 text-white/85 sm:text-sm sm:leading-6">
                                        {slide.description}
                                    </p>

                                    {/* Buttons */}
                                    <div className="mt-5 flex flex-wrap gap-2.5">
                                        <Link
                                            href={slide.primaryLink}
                                            className="inline-flex items-center rounded-lg bg-[#123B5D] px-4 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#0d2d46] sm:px-5 sm:py-2.5 sm:text-sm"
                                        >
                                            {slide.primaryButton}
                                            <span className="ml-2">→</span>
                                        </Link>

                                        <Link
                                            href={slide.secondaryLink}
                                            className="inline-flex items-center rounded-lg border border-white/70 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#123B5D] sm:px-5 sm:py-2.5 sm:text-sm"
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
                className="absolute left-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#123B5D] shadow-md backdrop-blur-sm transition hover:bg-white sm:left-5 sm:h-9 sm:w-9"
            >
                <ChevronLeft size={19} />
            </button>

            {/* Next Button */}
            <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#123B5D] shadow-md backdrop-blur-sm transition hover:bg-white sm:right-5 sm:h-9 sm:w-9"
            >
                <ChevronRight size={19} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                ? "w-7 bg-[#123B5D]"
                                : "w-2 bg-white/80 hover:bg-white"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}