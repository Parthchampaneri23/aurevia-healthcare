"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "What products does Aurevia Healthcare manufacture?",
        answer:
            "Aurevia Healthcare offers pharmaceutical and healthcare product solutions across tablets, capsules, syrups, injectables, ointments & creams, and nutraceuticals.",
    },
    {
        question: "Do you provide contract manufacturing services?",
        answer:
            "Yes. Aurevia Healthcare is positioned to support B2B partners with pharmaceutical manufacturing requirements and customized production solutions.",
    },
    {
        question: "Do you support private-label manufacturing?",
        answer:
            "Yes. Businesses can contact our team to discuss private-label and customized pharmaceutical manufacturing requirements.",
    },
    {
        question: "What information should I provide for a product enquiry?",
        answer:
            "Providing your company details, required products, estimated quantity, packaging requirements and any specific manufacturing requirements helps our team understand your enquiry.",
    },
    {
        question: "How can I become a distribution or business partner?",
        answer:
            "You can submit an enquiry through our contact form with your company and business details. Our team can then review your requirement and discuss suitable partnership opportunities.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="bg-slate-50 py-12 lg:py-12">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes faqSlideUp {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-faq-item {
                    animation: faqSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
            `}} />
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <span className="h-1.5 w-8 rounded-full bg-[#0F766E]"></span>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0F766E]">
                            FAQ
                        </p>
                    </div>

                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl bg-gradient-to-r from-slate-900 via-slate-800 to-[#123B5D] bg-clip-text text-transparent">
                        Frequently Asked Questions
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                        Find answers to common questions about our products,
                        manufacturing capabilities and business partnerships.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={faq.question}
                                className={`overflow-hidden rounded-2xl border transition-all duration-500 animate-faq-item ${isOpen
                                    ? "border-teal-200 bg-white shadow-lg shadow-teal-900/5"
                                    : "border-slate-200 bg-white hover:border-slate-350 hover:shadow-md hover:-translate-y-0.5"
                                    }`}
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpenIndex(
                                            isOpen ? null : index
                                        )
                                    }
                                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                                    aria-expanded={isOpen}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 ${isOpen
                                            ? "bg-teal-50 text-[#0F766E]"
                                            : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
                                            }`}>
                                            <HelpCircle size={18} />
                                        </div>
                                        <span className={`text-sm font-bold sm:text-base transition-colors duration-300 ${isOpen ? "text-[#123B5D]" : "text-slate-800"
                                            }`}>
                                            {faq.question}
                                        </span>
                                    </div>

                                    <div className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${isOpen
                                        ? "border-[#0F766E]/30 bg-[#0F766E]/5 text-[#0F766E] rotate-180"
                                        : "border-slate-200 bg-slate-50 text-slate-400"
                                        }`}>
                                        <ChevronDown size={16} />
                                    </div>
                                </button>

                                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                    }`}>
                                    <div className="overflow-hidden">
                                        <div className="border-t border-slate-100/80 px-6 pb-5 pt-4 bg-slate-50/50">
                                            <p className="text-sm leading-7 text-slate-600 font-medium">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}