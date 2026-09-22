"use client";

import Link from "next/link";
import { ArrowRight, Handshake, MessageSquare, ShieldCheck, TrendingUp } from "lucide-react";

const pillars = [
  {
    icon: MessageSquare,
    title: "Clear Communication",
    description: "Transparent batch updates, technical documentation access, and responsive account coordination.",
  },
  {
    icon: ShieldCheck,
    title: "Batch-to-Batch Reliability",
    description: "Consistent formulation accuracy and physical dosage compliance on every commercial order.",
  },
  {
    icon: Handshake,
    title: "Long-Term Collaboration",
    description: "Tailored manufacturing support aligned with your regional growth and product expansion goals.",
  },
  {
    icon: TrendingUp,
    title: "Responsive Support",
    description: "Dedicated regulatory assistance and commercial support to streamline market entry.",
  },
];

export default function PartnershipPhilosophy() {
  return (
    <section aria-label="B2B Partnership Philosophy" className="relative overflow-hidden bg-[#071E33] py-12 sm:py-12 lg:py-12 text-white">
      {/* Background Teal Accents */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-950/60 px-3.5 py-1 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-300">
              B2B PARTNERSHIP PHILOSOPHY
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Built Around <span className="bg-gradient-to-r from-teal-300 via-teal-200 to-white bg-clip-text text-transparent">Better Partnerships</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg font-normal leading-relaxed text-slate-300 max-w-2xl mx-auto">
            At Aurevia Healthcare, we believe that pharmaceutical manufacturing excellence is built on clear communication, shared responsibility, and long-term commercial trust.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-14 mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-400/40 hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-300 border border-teal-400/20 group-hover:bg-[#0F766E] group-hover:text-white transition-colors duration-300">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact#contact-form"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#0F766E] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-950/40 transition-all duration-300 hover:bg-teal-600 hover:shadow-xl active:scale-95"
            >
              <span>Talk to Our Team</span>
              <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#071E33] active:scale-95"
            >
              Explore Products
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
