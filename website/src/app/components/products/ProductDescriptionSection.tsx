"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, Factory } from "lucide-react";

interface ProductDescriptionSectionProps {
    productName: string;
    description: string;
    category?: string;
}

export default function ProductDescriptionSection({
    productName,
    description,
    category = "Pharmaceutical Solution",
}: ProductDescriptionSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="border-t border-slate-100 bg-slate-50/50 py-12 lg:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-4xl">
                    <div className="mb-3 inline-flex items-center gap-2">
                        <span className="h-1 w-5 rounded-full bg-[#0F766E]" />
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                            Product Overview
                        </p>
                    </div>

                    <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                        About {productName}
                    </h2>

                    {/* Main Short Overview Description */}
                    <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
                        <p className="font-semibold text-[#123B5D] text-lg sm:text-xl leading-relaxed">
                            {description}
                        </p>

                        <p>
                            Manufactured by{" "}
                            <Link
                                href="/"
                                className="font-bold text-[#0F766E] hover:underline underline-offset-4 decoration-teal-500/30 transition-colors"
                            >
                                Aurevia Healthcare
                            </Link>
                            , <strong>{productName}</strong> is engineered to meet global healthcare standards, combining precise active pharmaceutical ingredient dosing with high stability and bioavailability for targeted clinical outcomes in the {category} segment.
                        </p>
                    </div>

                    {/* Detailed Expanded Section (Show More) */}
                    {isExpanded && (
                        <div className="mt-6 space-y-6 text-base leading-relaxed text-slate-600 border-t border-slate-200/80 pt-6 animate-fadeIn">
                            <div>
                                <h3 className="text-lg font-bold text-[#123B5D] mb-3 flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-[#0F766E]" />
                                    Formulation & Manufacturing Quality Standards
                                </h3>
                                <p>
                                    Every manufacturing process for <strong>{productName}</strong> takes place in certified cleanroom facilities, adhering strictly to automated quality audits, ambient control parameters, and comprehensive batch testing. To discover how our formulation expertise supports diverse healthcare providers, explore our multi-sector{" "}
                                    <Link
                                        href="/industries"
                                        className="font-semibold text-[#0F766E] hover:underline underline-offset-4 decoration-teal-500/30"
                                    >
                                        healthcare industries
                                    </Link>
                                    .
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-[#123B5D] mb-3 flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5 text-[#0F766E]" />
                                    Comprehensive Quality Assurance & Dossier Compliance
                                </h3>
                                <p>
                                    Our analytical laboratories confirm stability, disintegration, dissolution rates, and active content uniformity across all production lots. Buyers requiring regulatory dossiers, Certificates of Analysis (COA), or specialized packaging options can review our full range of available dosage forms in our{" "}
                                    <Link
                                        href="/products"
                                        className="font-semibold text-[#0F766E] hover:underline underline-offset-4 decoration-teal-500/30"
                                    >
                                        pharmaceutical product catalogue
                                    </Link>
                                    .
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-[#123B5D] mb-3 flex items-center gap-2">
                                    <Factory className="h-5 w-5 text-[#0F766E]" />
                                    Supply Chain & Export Distribution
                                </h3>
                                <p>
                                    With specialized export packaging and validated cold-chain or climate-controlled logistic solutions, <strong>{productName}</strong> is prepared for domestic and international distribution. For custom contract manufacturing inquiries or commercial supply terms, please{" "}
                                    <Link
                                        href="/contact"
                                        className="font-semibold text-[#0F766E] hover:underline underline-offset-4 decoration-teal-500/30"
                                    >
                                        get in touch with our team
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Show More / Show Less Toggle Button */}
                    <div className="mt-6 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="inline-flex items-center gap-2 rounded-xl border border-teal-600/30 bg-teal-50/70 px-5 py-2.5 text-sm font-bold text-[#0F766E] transition-all hover:bg-teal-100/70 hover:border-teal-600/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 shadow-sm"
                        >
                            <span>
                                {isExpanded
                                    ? "Show Less Description"
                                    : "Show More Detailed Description"}
                            </span>
                            {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
