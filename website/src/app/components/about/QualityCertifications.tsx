"use client";

import Image from "next/image";
import { useState } from "react";
import { X, Maximize2 } from "lucide-react";

const certificates = [
    {
        image: "/about/certificate1.jpg",
        title: "Quality Certification",
    },
    {
        image: "/about/certificate2.jpg",
        title: "Quality Certification",
    },
    {
        image: "/about/certificate3.jpg",
        title: "Quality Certification",
    },
];

export default function QualityCertifications() {
    const [selectedCertificate, setSelectedCertificate] = useState<string | null>(
        null
    );

    return (
        <section className="bg-slate-50 py-12 sm:py-12 lg:py-12 overflow-hidden">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes modalBackdrop {
                    from { opacity: 0; backdrop-filter: blur(0px); }
                    to { opacity: 1; backdrop-filter: blur(8px); }
                }
                @keyframes modalContent {
                    from { transform: scale(0.95) translateY(10px); opacity: 0; }
                    to { transform: scale(1) translateY(0); opacity: 1; }
                }
                .animate-modal-backdrop {
                    animation: modalBackdrop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-modal-content {
                    animation: modalContent 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <span className="h-1.5 w-8 rounded-full bg-[#0F766E]"></span>
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0F766E]">
                            Quality & Certifications
                        </p>
                        <span className="h-1.5 w-8 rounded-full bg-[#0F766E]"></span>
                    </div>

                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">
                        Our Commitment to Quality
                    </h2>

                    <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                        Quality and compliance remain central to our approach,
                        supporting consistent processes and reliable
                        pharmaceutical manufacturing.
                    </p>
                </div>

                {/* Certificate Cards */}
                <div className="mt-12 grid gap-8 md:grid-cols-3 lg:mt-16">
                    {certificates.map((certificate) => (
                        <button
                            key={certificate.image}
                            type="button"
                            onClick={() =>
                                setSelectedCertificate(certificate.image)
                            }
                            className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white text-left shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                        >
                            {/* Top Accent Line */}
                            <div className="absolute top-0 left-0 h-[4px] w-0 bg-[#0F766E] transition-all duration-500 group-hover:w-full z-10" />

                            {/* Certificate Image */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 border-b border-slate-100">
                                <Image
                                    src={certificate.image}
                                    alt={certificate.title}
                                    fill
                                    className="object-contain p-6 transition duration-750 ease-out group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 transition-colors duration-500 group-hover:bg-[#123B5D]/40">
                                    <div className="flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-white opacity-0 shadow-lg transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                                        <Maximize2
                                            size={20}
                                            className="text-[#123B5D]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="px-6 py-5">
                                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#123B5D] transition-colors duration-300">
                                    {certificate.title}
                                </h3>

                                <p className="mt-1.5 text-xs font-semibold text-slate-500 group-hover:text-slate-600 transition-colors duration-300">
                                    Click to view certificate
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Certificate Modal */}
            {selectedCertificate && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md animate-modal-backdrop"
                    onClick={() => setSelectedCertificate(null)}
                >
                    <div
                        className="relative max-h-[92vh] max-w-5xl overflow-hidden rounded-3xl bg-white p-2 shadow-2xl animate-modal-content"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* Close */}
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
                                className="h-auto max-h-[88vh] w-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}