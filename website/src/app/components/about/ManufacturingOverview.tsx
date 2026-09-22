"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Factory, ShieldCheck, Cpu } from "lucide-react";

export default function ManufacturingOverview() {
  return (
    <section aria-label="Manufacturing Capability Overview" className="relative overflow-hidden bg-[#F5F8FA] py-12 sm:py-12 lg:py-12 border-b border-slate-200/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-3 justify-center lg:justify-start">
              <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" />
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0F766E]">
                MANUFACTURING &amp; CAPABILITY OVERVIEW
              </p>
              <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" />
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
              Controlled Infrastructure for
              <span className="block mt-1 bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">
                Precision &amp; Scale
              </span>
            </h2>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed text-slate-600 max-w-xl mx-auto lg:mx-0">
              Our manufacturing capabilities are engineered around strict environmental controls, automated dosage formulation, and disciplined batch protocols to meet the commercial requirements of pharmaceutical distributors and brand owners.
            </p>

            {/* 3 Highlight Points */}
            <div className="mt-8 space-y-4 text-left">

              <div className="flex items-start gap-4 rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs transition-all duration-300 hover:border-teal-200 hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E]">
                  <Factory size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Modern Infrastructure</h3>
                  <p className="mt-1 text-sm text-slate-600">Modular cleanroom zones with positive pressure control and HEPA air filtration system.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs transition-all duration-300 hover:border-teal-200 hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E]">
                  <Cpu size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Controlled Automated Processes</h3>
                  <p className="mt-1 text-sm text-slate-600">Automated tablet compression, liquid filling, and blister packaging lines built for batch consistency.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs transition-all duration-300 hover:border-teal-200 hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Quality-Focused Operations</h3>
                  <p className="mt-1 text-sm text-slate-600">Continuous in-process sampling, HPLC batch testing, and stability protocols covering dosage batches.</p>
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <Link
                href="/industries"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-950/20 transition-all duration-300 hover:bg-[#123B5D] hover:shadow-xl active:scale-95"
              >
                <span>Explore Industries Served</span>
                <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

          {/* Right Image Container Centered on Mobile */}
          <div className="group relative mx-auto w-full max-w-lg lg:max-w-none overflow-hidden rounded-3xl bg-slate-100 shadow-xl transition-all duration-500 hover:shadow-2xl border border-slate-200/80 aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px] sm:min-h-[380px]">
            <Image
              src="/hero/manufacture intelligence.png"
              alt="Aurevia Healthcare modern pharmaceutical facility"
              fill
              unoptimized
              className="object-cover object-center transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Dark Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

            {/* Floating Tag */}
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 rounded-2xl bg-white/95 p-3.5 sm:p-4 shadow-lg backdrop-blur-md border border-slate-200/80 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">cGMP Facility Standard</span>
                <CheckCircle2 size={16} className="text-[#0F766E]" />
              </div>
              <p className="mt-1 text-xs text-slate-700 font-medium">Batch control &amp; cleanroom environment monitored continuous execution.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
