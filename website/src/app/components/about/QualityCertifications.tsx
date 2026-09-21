"use client";

import Image from "next/image";
import { useState } from "react";
import { X, Maximize2, ShieldCheck, Award, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const certificates = [
  {
    image: "/about/certificate1.jpg",
    title: "WHO-GMP Certification",
    description:
      "Ensures that pharmaceutical products are consistently manufactured and controlled according to appropriate quality standards covering processes, personnel, equipment, and contamination prevention.",
    badge: "WHO-GMP Certified",
    accent: "from-[#0F766E] to-[#123B5D]",
    icon: ShieldCheck,
  },
  {
    image: "/about/certificate2.jpg",
    title: "ISO 9001:2015 Quality Management",
    description:
      "Demonstrates a structured quality management approach focused on consistent processes, customer requirements, continual improvement, risk-based thinking, and reliable product quality.",
    badge: "ISO 9001:2015",
    accent: "from-[#123B5D] to-[#0F766E]",
    icon: Award,
  },
  {
    image: "/about/certificate3.jpg",
    title: "ISO 14001:2015 Environmental Management",
    description:
      "Demonstrates an organized approach to managing environmental responsibilities, improving environmental performance, reducing waste, and supporting sustainable business practices.",
    badge: "ISO 14001:2015",
    accent: "from-[#0F766E] to-[#123B5D]",
    icon: ShieldCheck,
  },
];

export default function QualityCertifications() {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  return (
    <section
      id="quality-certifications"
      className="relative overflow-hidden bg-white py-12 sm:py-12 border-t border-slate-100 scroll-mt-24"
    >
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* 1. Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
              QUALITY &amp; CERTIFICATIONS
            </p>
            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#123B5D] leading-tight">
            Our Commitment to <span className="bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">Quality</span>
          </h2>

          <p className="mt-4 text-base md:text-[17px] font-normal leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Quality and compliance remain central to our approach, supporting consistent processes and reliable pharmaceutical manufacturing.
          </p>
        </div>

        {/* 2. Certificate Cards Grid matching Core Values style */}
        <div className="mt-12 mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert, index) => {
              return (
                <motion.button
                  key={cert.image}
                  type="button"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  onClick={() => setSelectedCertificate(cert.image)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-slate-300/90 bg-white text-left shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-[#0F766E] hover:shadow-xl hover:shadow-teal-950/15 cursor-pointer"
                >
                  {/* Top Slide Accent Line */}
                  <div
                    className={`absolute top-0 left-0 h-[3.5px] w-0 bg-gradient-to-r ${cert.accent} transition-all duration-500 group-hover:w-full z-10`}
                    aria-hidden="true"
                  />

                  <div>
                    {/* Certificate Image Frame */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 border-b border-slate-100 p-4">
                      <div className="relative h-full w-full rounded-xl bg-white p-3 shadow-2xs border border-slate-200/60">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          unoptimized={true}
                          className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>

                      {/* Top Floating Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-medium text-[#0F766E] border border-teal-200/80 shadow-xs backdrop-blur-md">
                          {cert.badge}
                        </span>
                      </div>

                      {/* Hover Overlay with Maximize Icon */}
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 transition-colors duration-500 group-hover:bg-[#123B5D]/35">
                        <div className="flex h-11 w-11 translate-y-4 items-center justify-center rounded-full bg-white text-[#123B5D] opacity-0 shadow-lg transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-110">
                          <Maximize2 size={18} />
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#0F766E]">
                        {cert.title}
                      </h3>

                      <p className="mt-2 text-[15px] font-normal leading-relaxed text-slate-600">
                        {cert.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Accent Footer */}
                  <div className="px-5 pb-4 pt-0">
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold">
                      <span className="text-xs font-medium text-[#0F766E] group-hover:text-[#123B5D] transition-colors">
                        Click to view certificate
                      </span>
                      <CheckCircle2 size={13} className="text-[#0F766E] opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md transition-all duration-300"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative max-h-[92vh] max-w-5xl overflow-hidden rounded-3xl bg-white p-2 shadow-2xl transition-transform duration-300 scale-100"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedCertificate(null)}
              aria-label="Close certificate"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/80 text-white shadow-md transition-all duration-300 hover:bg-slate-950 hover:scale-105 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="relative max-h-[88vh] overflow-auto rounded-2xl bg-slate-50">
              <Image
                src={selectedCertificate}
                alt="Aurevia Healthcare certificate"
                width={1400}
                height={1000}
                unoptimized={true}
                className="h-auto max-h-[88vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}