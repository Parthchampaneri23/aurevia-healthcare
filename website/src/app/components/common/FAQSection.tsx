"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, HelpCircle, MessageSquare } from "lucide-react";

export interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    faqs: FAQItem[];
    className?: string;
    showContactCTA?: boolean;
}

export default function FAQSection({
    eyebrow = "FREQUENTLY ASKED QUESTIONS",
    title = "Got Questions? We Have Answers.",
    subtitle = "Find clear, detailed answers regarding our pharmaceutical manufacturing, quality assurance, regulatory compliance, and partnership processes.",
    faqs,
    className = "",
    showContactCTA = true,
}: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={`relative py-12 lg:py-16 overflow-hidden bg-white ${className}`}>

            <div className="relative mx-auto max-w-5xl px-6 lg:px-8">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
                    {eyebrow && (
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200/60 mb-4">
                            <span className="h-2 w-2 rounded-full bg-[#0F766E] animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                                {eyebrow}
                            </span>
                        </div>
                    )}

                    {title && (
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#123B5D] leading-tight tracking-tight">
                            {title}
                        </h2>
                    )}

                    {subtitle && (
                        <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Accordion List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                                    ? "bg-white border-[#0F766E]/40 shadow-xl shadow-teal-950/5 ring-1 ring-[#0F766E]/20"
                                    : "bg-white/80 backdrop-blur-sm border-slate-200/80 hover:border-slate-300 hover:shadow-md hover:bg-white"
                                    }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
                                    aria-expanded={isOpen}
                                >
                                    <span className="flex items-center gap-4 pr-4">
                                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${isOpen ? "bg-[#0F766E] text-white" : "bg-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-[#0F766E]"
                                            }`}>
                                            <HelpCircle className="w-5 h-5" />
                                        </span>
                                        <span className={`text-base sm:text-lg font-bold transition-colors ${isOpen ? "text-[#123B5D]" : "text-slate-800 group-hover:text-[#123B5D]"
                                            }`}>
                                            {faq.question}
                                        </span>
                                    </span>

                                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen
                                        ? "bg-[#123B5D] text-white rotate-180"
                                        : "bg-slate-100 text-slate-600 group-hover:bg-[#0F766E] group-hover:text-white"
                                        }`}>
                                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="px-6 sm:px-8 pb-6 sm:pb-7 pt-2 text-sm sm:text-base leading-relaxed text-slate-600 border-t border-slate-100/80 ml-13">
                                        <p className="bg-slate-50/70 p-4 rounded-xl border border-slate-100 text-slate-700">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Assistance Banner */}
                {showContactCTA && (
                    <div className="mt-12 sm:mt-16 rounded-2xl bg-gradient-to-r from-[#123B5D] to-[#0F766E] p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4 text-center sm:text-left">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md text-white">
                                <MessageSquare className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold">Have a custom inquiry or special requirements?</h4>
                                <p className="text-sm text-teal-100/90 mt-0.5">Our commercial and technical specialists are here to assist you.</p>
                            </div>
                        </div>

                        <Link
                            href="/contact#contact-form"
                            className="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#123B5D] shadow-md transition-all hover:bg-teal-50 hover:shadow-lg active:scale-95"
                        >
                            Contact Our Experts
                        </Link>
                    </div>
                )}

            </div>
        </section>
    );
}
