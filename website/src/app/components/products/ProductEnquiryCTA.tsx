"use client";

import Link from "next/link";
import { ArrowRight, FileText, PhoneCall, ShieldCheck } from "lucide-react";

export default function ProductEnquiryCTA() {
  return (
    <section aria-label="B2B Product Enquiry" className="relative overflow-hidden bg-[#071E33] py-12 sm:py-12 text-white">
      {/* Background Soft Glows */}
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">

        {/* Eyebrow Pill */}
        <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-950/60 px-3.5 py-1 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" aria-hidden="true" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-300">
            B2B PRODUCT ENQUIRY
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-3xl mx-auto">
          Looking for a Specific <span className="bg-gradient-to-r from-teal-300 via-teal-200 to-white bg-clip-text text-transparent">Pharmaceutical Formulation?</span>
        </h2>

        {/* Supporting Copy */}
        <p className="mt-4 text-base sm:text-lg font-normal leading-relaxed text-slate-300 max-w-2xl mx-auto">
          Connect with Aurevia Healthcare to discuss custom product requirements, technical dossiers, contract packaging, or long-term commercial supply arrangements.
        </p>

        {/* Highlights Row */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs sm:text-sm text-slate-300 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-teal-400" />
            <span>cGMP Certified Production</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-teal-400" />
            <span>CTD &amp; Dossier Documentation Support</span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneCall size={16} className="text-teal-400" />
            <span>Dedicated B2B Technical Assistance</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact#contact-form"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-950/40 transition-all duration-300 hover:bg-teal-600 hover:shadow-xl active:scale-95 w-full sm:w-auto"
          >
            <span>Request Product Information</span>
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/contact#contact-form"
            className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#071E33] active:scale-95 w-full sm:w-auto"
          >
            Contact Aurevia
          </Link>
        </div>

      </div>
    </section>
  );
}
