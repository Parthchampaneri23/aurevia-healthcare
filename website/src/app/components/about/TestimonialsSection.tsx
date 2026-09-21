"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote, Building2, MapPin } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  category: string;
  image: string;
}

const indianTestimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Aurevia Healthcare has been our trusted contract manufacturing partner for tablet & capsule lines in North India. Their WHO-GMP batch consistency, quick turnaround for DCGI documentation, and quality controls are exemplary.",
    author: "Rajesh Kumar Sharma",
    role: "VP of Supply Chain & Manufacturing",
    company: "Apex Lifesciences India Ltd.",
    location: "New Delhi, Delhi",
    rating: 5,
    category: "Third-Party Manufacturing",
    image: "/clients/client1.png",
  },
  {
    id: 2,
    quote:
      "We rely on Aurevia for high-volume syrup and pediatric suspension manufacturing. Their automated dosage packaging lines and strict in-house HPLC batch testing ensure 100% compliance with Indian Pharmacopoeia (IP) standards.",
    author: "Priya Nair",
    role: "Director of Quality Assurance",
    company: "Vanguard Healthcare Pvt. Ltd.",
    location: "Mumbai, Maharashtra",
    rating: 5,
    category: "Quality Assurance & Formulations",
    image: "/clients/client2.png",
  },
  {
    id: 3,
    quote:
      "Partnering with Aurevia Healthcare for private label formulations in South India transformed our PCD franchise model. On-time delivery across 15+ states and transparent commercial pricing make them our top partner.",
    author: "Suresh Venkatraman",
    role: "Head of Commercial Procurement",
    company: "CarePulse Pharma India",
    location: "Bengaluru, Karnataka",
    rating: 5,
    category: "PCD & Commercial Distribution",
    image: "/clients/client3.png",
  },
  {
    id: 4,
    quote:
      "Aurevia's formulation laboratory provided exceptional stability study data and bio-equivalence support for our generic injectable and topical cream expansion. Their technical team is extremely responsive.",
    author: "Ananya Deshmukh",
    role: "Chief Scientific Officer",
    company: "Zenith Bio-Formulations",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    category: "R&D & Tech Transfer",
    image: "/clients/client4.png",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? indianTestimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === indianTestimonials.length - 1 ? 0 : prev + 1));
  };

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === indianTestimonials.length - 1 ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section
      className="relative overflow-hidden bg-white py-12 sm:py-12 border-t border-slate-100"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
              CLIENT TESTIMONIALS
            </p>
            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#123B5D] leading-tight">
            What Indian Healthcare Leaders <span className="bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">Say About Us</span>
          </h2>
          <p className="mt-4 text-base md:text-[17px] font-normal leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Trusted by top pharmaceutical companies, PCD franchises, and institutional supply networks across India.
          </p>
        </div>

        {/* Carousel Container with Side Arrows */}
        <div className="relative mx-auto max-w-4xl">
          {/* Outer Side Nav Arrows for Desktop */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Testimonial"
            className="hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full border-2 border-slate-300 bg-white text-[#123B5D] shadow-md transition-all hover:bg-[#0F766E] hover:border-[#0F766E] hover:text-white hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Testimonial"
            className="hidden md:flex absolute -right-14 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full border-2 border-slate-300 bg-white text-[#123B5D] shadow-md transition-all hover:bg-[#0F766E] hover:border-[#0F766E] hover:text-white hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>

          {/* Testimonial Card */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-slate-300/90 bg-white p-6 sm:p-10 shadow-lg backdrop-blur-sm transition-all duration-500 hover:border-[#0F766E] hover:shadow-2xl hover:shadow-teal-950/15">
            {/* Slide Top Accent Bar */}
            <div className="absolute top-0 left-0 h-[4px] w-full bg-gradient-to-r from-[#123B5D] via-[#0F766E] to-[#123B5D]" />

            {/* TOP HEADER: Client Profile Image, Name, Role, Company, Location & Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 border-[#0F766E] shadow-md">
                  <Image
                    src={indianTestimonials[currentIndex].image}
                    alt={indianTestimonials[currentIndex].author}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#123B5D]">
                      {indianTestimonials[currentIndex].author}
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-[#0F766E] border border-teal-200/80">
                      <Building2 size={12} /> {indianTestimonials[currentIndex].category}
                    </span>
                  </div>

                  <p className="text-sm font-normal text-slate-500 mt-0.5">
                    {indianTestimonials[currentIndex].role} •{" "}
                    <span className="text-[#123B5D] font-semibold">
                      {indianTestimonials[currentIndex].company}
                    </span>
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 font-normal">
                    <MapPin size={12} className="text-[#0F766E]" /> {indianTestimonials[currentIndex].location}
                  </div>
                </div>
              </div>

              {/* Rating & Mobile Buttons */}
              <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-3">
                <div className="flex items-center gap-1 bg-amber-50/90 px-3 py-1.5 rounded-full border border-amber-200 shadow-2xs">
                  {[...Array(indianTestimonials[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="ml-1 text-xs font-semibold text-amber-700">5.0</span>
                </div>

                {/* Mobile Prev/Next Nav */}
                <div className="flex md:hidden items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous Testimonial"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 shadow-sm"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next Testimonial"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 shadow-sm"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* REVIEW QUOTE BELOW */}
            <div className="pt-6 relative">
              <Quote
                size={48}
                className="absolute -top-1 -left-2 text-slate-200/60 -z-0 select-none pointer-events-none"
              />
              <p className="relative z-10 text-base sm:text-lg font-normal leading-relaxed text-slate-800 italic bg-slate-50/80 p-5 sm:p-6 rounded-2xl border-2 border-slate-200/80">
                &ldquo;{indianTestimonials[currentIndex].quote}&rdquo;
              </p>
            </div>
          </div>

          {/* Prominent Dots & Slide Counter Pagination Below */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-3">
              {indianTestimonials.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`group relative flex items-center justify-center p-2 focus:outline-none cursor-pointer`}
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${currentIndex === idx
                      ? "h-3.5 w-10 bg-gradient-to-r from-[#123B5D] to-[#0F766E] shadow-sm"
                      : "h-3.5 w-3.5 bg-slate-300 group-hover:bg-slate-400"
                      }`}
                  />
                </button>
              ))}
            </div>

            <span className="text-xs font-semibold tracking-wider text-[#0F766E] uppercase">
              Client Review {currentIndex + 1} of {indianTestimonials.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
