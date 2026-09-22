"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText, ArrowRight, List, Lock, HelpCircle, ChevronDown, ShieldCheck } from "lucide-react";
import Breadcrumb from "@/app/components/common/Breadcrumb";

const termsSections = [
  {
    id: "section-1",
    title: "1. Acceptance of Terms",
    text: "By accessing or using the Aurevia Healthcare website, you agree to these Terms & Conditions. If you do not agree with these terms, please do not use the website.",
  },
  {
    id: "section-2",
    title: "2. Website Use",
    text: "This website is provided for general information, business communication, product information, and enquiry purposes. You agree to use the website lawfully and responsibly.",
  },
  {
    id: "section-3",
    title: "3. Product Information",
    text: "Product descriptions and information displayed on this website are provided for general informational purposes. Product availability, specifications, packaging, and other details may vary.",
  },
  {
    id: "section-4",
    title: "4. Product Enquiries",
    text: "Submitting a product enquiry or quote request does not constitute a purchase agreement, order confirmation, or guarantee of product availability. Any commercial transaction is subject to separate terms agreed between the relevant parties.",
  },
  {
    id: "section-5",
    title: "5. Intellectual Property",
    text: "Unless otherwise stated, website content including text, graphics, logos, images, design elements, and other materials belongs to or is used by Aurevia Healthcare. Content may not be copied, reproduced, or distributed without appropriate permission.",
  },
  {
    id: "section-6",
    title: "6. Accuracy of Information",
    text: "We aim to keep website information accurate and useful, but we do not guarantee that every item of information will always be complete, current, or error-free.",
  },
  {
    id: "section-7",
    title: "7. Third-Party Links",
    text: "The website may contain links to third-party websites or services. Aurevia Healthcare is not responsible for the content, availability, or privacy practices of external websites.",
  },
  {
    id: "section-8",
    title: "8. No Medical Advice",
    text: "Information provided on this website is not a substitute for professional medical advice, diagnosis, or treatment. Product information should not be used for self-diagnosis or self-medication.",
  },
  {
    id: "section-9",
    title: "9. Website Availability",
    text: "We may modify, suspend, or discontinue portions of the website from time to time. We do not guarantee uninterrupted availability of every website feature.",
  },
  {
    id: "section-10",
    title: "10. Limitation of Liability",
    text: "To the extent permitted by applicable law, Aurevia Healthcare shall not be responsible for losses arising from reliance on general website information or temporary website unavailability.",
  },
  {
    id: "section-11",
    title: "11. Changes to These Terms",
    text: "These Terms & Conditions may be updated from time to time. Updated terms will be published on this page.",
  },
  {
    id: "section-12",
    title: "12. Contact Us",
    text: "If you have questions regarding these Terms & Conditions, please contact Aurevia Healthcare through the contact information available on the website.",
  },
];

export default function TermsContent() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState("section-1");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  // Scroll reading progress & active TOC heading
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      for (let i = termsSections.length - 1; i >= 0; i--) {
        const el = document.getElementById(termsSections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSectionId(termsSections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setMobileTocOpen(false);
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Scroll Progress Line */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200/50">
        <div
          className="h-full bg-gradient-to-r from-[#123B5D] via-[#0F766E] to-teal-400 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden bg-slate-950 min-h-[240px] sm:min-h-[280px] lg:min-h-[310px] flex items-center py-8 sm:py-10">
        <Image
          src="/hero/legalbanner.png"
          alt="Aurevia Healthcare Terms and Conditions"
          fill
          priority
          unoptimized={true}
          className="object-cover object-center sm:object-[center_35%]"
          sizes="100vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071E33]/90 via-[#071E33]/75 to-[#123B5D]/40" />

        {/* Banner Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl text-left text-white">
            <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-950/60 px-3.5 py-1 backdrop-blur-md">
              <FileText size={14} className="text-teal-300" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-300">
                LEGAL INFORMATION &amp; COMPLIANCE
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
              Terms &amp; Conditions
            </h1>

            <div className="mt-3">
              <Breadcrumb items={[{ name: "Terms & Conditions" }]} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
        {/* Mobile TOC Accordion Toggle */}
        <div className="mb-6 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileTocOpen((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-slate-900 font-bold text-sm"
          >
            <span className="flex items-center gap-2">
              <List size={16} className="text-[#0F766E]" />
              On this page ({termsSections.length} sections)
            </span>
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${mobileTocOpen ? "rotate-180 text-[#0F766E]" : ""}`}
            />
          </button>

          {mobileTocOpen && (
            <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-md space-y-2">
              {termsSections.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={`block w-full text-left py-1.5 px-2 text-xs font-semibold rounded-lg transition-colors ${activeSectionId === sec.id
                      ? "bg-teal-50 text-[#0F766E]"
                      : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  {sec.title}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Main Content (8 Cols) */}
          <article className="lg:col-span-8">
            {/* Last Updated Badge */}
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Lock size={13} className="text-[#0F766E]" />
                Last Updated: August 2026
              </span>
              <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                Website Usage Terms
              </span>
            </div>

            {/* Introductory Callout */}
            <div className="mb-10 rounded-2xl border-l-4 border-[#0F766E] bg-white p-6 sm:p-7 shadow-sm">
              <p className="text-base sm:text-lg font-semibold leading-relaxed text-slate-900">
                By accessing or using the Aurevia Healthcare website, you agree to the terms outlined below. Please review these terms before using the website.
              </p>
            </div>

            {/* 12 Terms Sections */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-10">
              {termsSections.map((sec) => (
                <div
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-28 border-b border-slate-100 pb-8 last:border-0 last:pb-0"
                >
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#123B5D]">
                    {sec.title}
                  </h2>
                  <p className="mt-3 text-[17px] leading-[1.8] text-slate-700 font-normal">
                    {sec.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Privacy Policy Cross Link & Contact CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-[#071E33] via-[#123B5D] to-[#0F766E] p-8 text-white shadow-lg">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Need more information or clarification?
                </h3>
                <p className="mt-1 text-sm text-slate-200">
                  Contact our team for any website, business, or terms enquiry.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
                <Link
                  href="/privacy"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600/30 border border-teal-400/40 px-5 py-3 text-xs font-bold text-white backdrop-blur-md transition hover:bg-teal-600/50"
                >
                  <ShieldCheck size={14} />
                  <span>Privacy Policy</span>
                </Link>
                <Link
                  href="/contact#contact-form"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-[#123B5D] transition hover:bg-teal-50 hover:text-[#0F766E]"
                >
                  <span>Contact Us</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </article>

          {/* Right Desktop Sticky Sidebar (4 Cols) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6">
            {/* Table of Contents Box */}
            <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#123B5D] border-b border-slate-100 pb-3">
                <List size={16} className="text-[#0F766E]" />
                On This Page
              </h3>

              <nav className="mt-4">
                <ul className="space-y-2 text-xs font-semibold text-slate-600">
                  {termsSections.map((sec) => {
                    const isActive = activeSectionId === sec.id;
                    return (
                      <li key={sec.id}>
                        <button
                          type="button"
                          onClick={() => scrollToSection(sec.id)}
                          className={`text-left w-full transition-all duration-200 cursor-pointer hover:text-[#0F766E] flex items-center gap-2 ${isActive
                              ? "font-bold text-[#0F766E] translate-x-1"
                              : "text-slate-600"
                            }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-[#0F766E]" : "bg-slate-300"
                              }`}
                          />
                          <span className="line-clamp-1">{sec.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Related Legal Links */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F766E] mb-2">
                  <HelpCircle size={15} />
                  Legal Navigation
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Review Aurevia Healthcare&apos;s data protection policy and communication channels.
                </p>
                <div className="space-y-2">
                  <Link
                    href="/privacy"
                    className="block text-xs font-bold text-[#123B5D] hover:text-[#0F766E] transition-colors"
                  >
                    → Privacy Policy
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-xs font-bold text-[#123B5D] hover:text-[#0F766E] transition-colors"
                  >
                    → Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
