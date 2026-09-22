"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FAQItem {
    question: string;
    answer: string;
}

interface IndustriesFAQProps {
    faqs?: FAQItem[];
    title?: string;
    subtitle?: string;
}

const defaultFAQs: FAQItem[] = [
    {
        question: "Which industries and healthcare sectors does Aurevia Healthcare support?",
        answer: "Aurevia Healthcare supports a wide range of healthcare sectors including Hospitals & Healthcare Institutions, Pharmacy & Retail Chains, Pharmaceutical Distributors & Wholesalers, Diagnostic Networks, Wellness & Nutrition Businesses, and Healthcare Brand Owners.",
    },
    {
        question: "Does Aurevia Healthcare provide contract and third-party manufacturing?",
        answer: "Yes, Aurevia Healthcare provides scalable contract manufacturing, third-party production, and private-label formulation support tailored to client dosage specifications and volume requirements.",
    },
    {
        question: "What dosage forms are available for industry partners?",
        answer: "Our product portfolio covers solid oral dosage forms (tablets, capsules), liquid orals (syrups, suspensions), injectables, topical preparations (creams, ointments), and nutraceutical formulations.",
    },
    {
        question: "How does Aurevia ensure batch quality and compliance for institutional buyers?",
        answer: "All products undergo multi-stage quality control checks, raw material testing, packaging integrity verification, and batch documentation compliance under structured manufacturing standards.",
    },
    {
        question: "How can a business start a manufacturing or supply discussion with Aurevia?",
        answer: "You can reach out through our online contact form or direct business inquiry channels. Our team evaluates your formulation parameters, volume needs, and timeline to discuss collaboration options.",
    },
];

export default function IndustriesFAQ({
    faqs = defaultFAQs,
    title = "Frequently Asked Questions",
    subtitle = "Find answers to common questions about Aurevia's industry supply capabilities, dosage forms, and B2B partnership models.",
}: IndustriesFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-slate-50 py-12 lg:py-12">
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center mb-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0F766E] mb-3">
                        <HelpCircle size={14} />
                        <span>Got Questions?</span>
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight text-[#123B5D] sm:text-4xl">
                        {title}
                    </h2>

                    <p className="mt-3 text-base text-slate-600 font-normal leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={faq.question}
                                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 shadow-sm hover:border-teal-300"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFAQ(index)}
                                    className="flex w-full items-center justify-between p-5 text-left font-bold text-[#123B5D] focus:outline-none sm:p-6"
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-base sm:text-lg pr-4">{faq.question}</span>
                                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#123B5D] transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#0F766E] text-white" : ""}`}>
                                        <ChevronDown size={18} />
                                    </div>
                                </button>

                                {isOpen && (
                                    <div className="border-t border-slate-100 px-5 pb-6 pt-2 text-sm text-slate-600 leading-relaxed sm:px-6">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
