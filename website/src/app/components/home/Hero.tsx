"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
    {
        image: "/hero/slide1.png",
        alt: "Aurevia Healthcare pharmaceutical manufacturing",
        eyebrow: "AUREVIA HEALTHCARE",
        title: "Pharmaceutical Manufacturing Built for Healthcare Businesses",
        description:
            "Reliable pharmaceutical solutions for healthcare companies, distributors and brand owners.",
        primaryButton: "Explore Products",
        primaryLink: "/products#explore",
        secondaryButton: "About Aurevia",
        secondaryLink: "/about",
    },
    {
        image: "/hero/slide2.png",
        alt: "Aurevia Healthcare manufacturing facility",
        eyebrow: "MANUFACTURING EXCELLENCE",
        title: "Consistent Production. Controlled Processes.",
        description:
            "Efficient manufacturing focused on consistency, precision and dependable quality..",
        primaryButton: "Explore Industries",
        primaryLink: "/industries#industry-segments",
        secondaryButton: "Explore Products",
        secondaryLink: "/products#explore",
    },
    {
        image: "/hero/slide3.png",
        alt: "Aurevia Healthcare quality control",
        eyebrow: "QUALITY & RELIABILITY",
        title: "Quality Built Into Every Batch",
        description:
            "Strict quality practices ensure consistent and reliable pharmaceutical products..",
        primaryButton: "Quality & Certifications",
        primaryLink: "/about#quality-certifications",
        secondaryButton: "Learn More",
        secondaryLink: "/about",
    },
    {
        image: "/hero/slide4.png",
        alt: "Aurevia Healthcare pharmaceutical partnership",
        eyebrow: "YOUR PHARMACEUTICAL PARTNER",
        title: "Your Partner in Pharmaceutical Manufacturing",
        description:
            "Flexible solutions designed to support growing healthcare businesses..",
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
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full overflow-hidden bg-slate-100">

            {/* Slides */}
            <div className="relative h-[480px] sm:h-[540px] md:h-[580px] lg:h-[640px]">
                {slides.map((slide, index) => (
                    <div
                        key={slide.image}
                        className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${index === currentSlide
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
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-slate-900/20" />

                        {/* Content */}
                        <div className="absolute inset-0">
                            <div className="mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
                                <div className="max-w-2xl text-white">

                                    {/* Eyebrow */}
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300 sm:text-sm">
                                        {slide.eyebrow}
                                    </p>

                                    {/* Heading */}
                                    <h1 className="text-2xl font-bold leading-tight sm:text-4xl lg:text-5xl lg:leading-tight">
                                        {slide.title}
                                    </h1>

                                    {/* Description */}
                                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-200 sm:mt-4 sm:text-base sm:leading-relaxed lg:text-lg">
                                        {slide.description}
                                    </p>

                                    {/* Buttons */}
                                    <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
                                        <Link
                                            href={slide.primaryLink}
                                            className="inline-flex items-center rounded-lg bg-[#123B5D] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0d2d46] hover:shadow-xl sm:px-6 sm:py-3 sm:text-base"
                                        >
                                            {slide.primaryButton}
                                            <span className="ml-2">→</span>
                                        </Link>

                                        <Link
                                            href={slide.secondaryLink}
                                            className="inline-flex items-center rounded-lg border border-white/70 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#123B5D] sm:px-6 sm:py-3 sm:text-base"
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
            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                            ? "w-8 bg-white"
                            : "w-2 bg-white/50 hover:bg-white/80"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}