"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface BlogFAQItem {
  question: string;
  answer: string;
}

interface BlogFAQProps {
  faqs?: BlogFAQItem[];
  title?: string;
  subtitle?: string;
}

export const defaultBlogListingFAQs: BlogFAQItem[] = [
  {
    question: "What topics are covered in Aurevia Healthcare's Insights and Knowledge Hub?",
    answer:
      "Our publications focus on key areas of pharmaceutical manufacturing, quality assurance and WHO-GMP compliance, research and formulation development, analytical testing methodologies, and broader healthcare industry trends.",
  },
  {
    question: "Who writes and reviews the articles on Aurevia's Blog?",
    answer:
      "Our insights are authored and reviewed by internal technical experts, quality assurance managers, formulation scientists, and pharmaceutical operations leads at Aurevia Healthcare.",
  },
  {
    question: "Does Aurevia provide custom manufacturing services based on these published capabilities?",
    answer:
      "Yes. Aurevia Healthcare specializes in high-capacity contract manufacturing, third-party tablet/capsule processing, oral liquids, and custom formulation development under strict cGMP protocols.",
  },
  {
    question: "Can I reference or cite Aurevia Healthcare's pharmaceutical insights for business research?",
    answer:
      "Yes, you may cite or reference our articles for educational or business research purposes, provided appropriate attribution to Aurevia Healthcare is included.",
  },
  {
    question: "How can I request technical consultation or discuss manufacturing partnerships?",
    answer:
      "You can connect directly with our technical and business development team by using the contact form on our website or submitting a specific manufacturing inquiry.",
  },
];

export const defaultBlogDetailFAQs: BlogFAQItem[] = [
  {
    question: "Are the pharmaceutical practices discussed in this article aligned with WHO-GMP standards?",
    answer:
      "Yes. All manufacturing processes, analytical quality control protocols, and operational workflows published by Aurevia Healthcare adhere strictly to WHO-GMP, ISO, and pharmacopeial standards (USP, IP, BP).",
  },
  {
    question: "How can my pharmaceutical business initiate contract manufacturing with Aurevia?",
    answer:
      "You can submit your batch requirements, target dosage forms, and volume parameters through our Contact Us page. Our technical operations team will review your specifications and schedule a consultation.",
  },
  {
    question: "Does Aurevia provide regulatory dossier and stability testing support for these formulations?",
    answer:
      "Yes. Aurevia Healthcare offers comprehensive regulatory dossier assistance (CTD/ACTD formats), stability testing reports across ICH climatic zones, and Certificate of Analysis (COA) documentation.",
  },
  {
    question: "Can I request sample batches or technical product specifications?",
    answer:
      "Qualified B2B buyers, institutional partners, and brand owners can request product specification sheets, dossier summaries, and trial evaluation details through our commercial partnership channels.",
  },
];

export default function BlogFAQ({
  faqs = defaultBlogListingFAQs,
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about Aurevia's pharmaceutical insights, technical standards, and manufacturing partnerships.",
}: BlogFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-16 border-t border-slate-200/80 pt-12">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0F766E] mb-3">
            <HelpCircle size={14} />
            <span>Knowledge Base FAQ</span>
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
                  className="flex w-full items-center justify-between p-5 text-left font-bold text-[#123B5D] focus:outline-none sm:p-6 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg pr-4">{faq.question}</span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#123B5D] transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#0F766E] text-white" : ""
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-5 pb-6 pt-3 text-sm text-slate-600 leading-relaxed sm:px-6">
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
