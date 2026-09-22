"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ArrowRight, List, Lock, HelpCircle, ChevronDown } from "lucide-react";
import Breadcrumb from "@/app/components/common/Breadcrumb";

const privacySections = [
  {
    id: "section-1",
    title: "1. Information We Collect",
    text: "We may receive information that you voluntarily provide through contact forms, product enquiries, career applications, or other communication submitted through the website. This may include your name, email address, phone number, company information, enquiry details, and other information you choose to provide.",
  },
  {
    id: "section-2",
    title: "2. How We Use Information",
    text: "Information submitted through the website may be used to respond to enquiries, process product requests, communicate with prospective business partners, respond to career applications, and improve our website and services.",
  },
  {
    id: "section-3",
    title: "3. Product Enquiries",
    text: "Information submitted when requesting information about our products may be used to understand your requirements and respond appropriately. We do not sell submitted enquiry information to unrelated third parties.",
  },
  {
    id: "section-4",
    title: "4. Cookies and Analytics",
    text: "The website may use cookies or analytics technologies to understand website usage, improve performance, and provide a better browsing experience.",
  },
  {
    id: "section-5",
    title: "5. Data Security",
    text: "We take reasonable measures to protect information submitted through the website. However, no internet transmission or electronic storage system can be guaranteed to be completely secure.",
  },
  {
    id: "section-6",
    title: "6. Third-Party Services",
    text: "The website may use third-party services for hosting, analytics, maps, forms, or other website functionality. These services may process information according to their own privacy policies.",
  },
  {
    id: "section-7",
    title: "7. Data Retention",
    text: "Information may be retained only for as long as reasonably necessary to respond to enquiries, provide requested services, maintain business records, or meet applicable requirements.",
  },
  {
    id: "section-8",
    title: "8. Your Rights",
    text: "You may contact us if you have questions about information you have submitted through this website or wish to request correction or deletion where applicable.",
  },
  {
    id: "section-9",
    title: "9. Children's Privacy",
    text: "This website is intended for business and general informational purposes and is not directed toward children.",
  },
  {
    id: "section-10",
    title: "10. Changes to This Policy",
    text: "This Privacy Policy may be updated from time to time. Any updated version will be published on this page.",
  },
  {
    id: "section-11",
    title: "11. Contact Us",
    text: "If you have questions regarding this Privacy Policy, please contact Aurevia Healthcare through the contact information provided on our website.",
  },
];

export default function PrivacyContent() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState("section-1");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  // Track reading scroll progress & active TOC heading
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      for (let i = privacySections.length - 1; i >= 0; i--) {
        const el = document.getElementById(privacySections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSectionId(privacySections[i].id);
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
          alt="Aurevia Healthcare Privacy Policy"
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
              <ShieldCheck size={14} className="text-teal-300" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-300">
                PRIVACY &amp; DATA PROTECTION
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
              Privacy Policy
            </h1>

            <div className="mt-3">
              <Breadcrumb items={[{ name: "Privacy Policy" }]} />
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
              On this page ({privacySections.length} sections)
            </span>
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${mobileTocOpen ? "rotate-180 text-[#0F766E]" : ""}`}
            />
          </button>

          {mobileTocOpen && (
            <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-md space-y-2">
              {privacySections.map((sec) => (
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
                Legal Notice
              </span>
            </div>

            {/* Introductory Callout */}
            <div className="mb-10 rounded-2xl border-l-4 border-[#0F766E] bg-white p-6 sm:p-7 shadow-sm">
              <p className="text-base sm:text-lg font-semibold leading-relaxed text-slate-900">
                Aurevia Healthcare respects the privacy of visitors to this website. This Privacy Policy explains what information may be collected and how it may be used when you interact with our website.
              </p>
            </div>

            {/* 11 Legal Sections */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-10">
              {privacySections.map((sec) => (
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

            {/* Privacy Contact CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-[#071E33] via-[#123B5D] to-[#0F766E] p-8 text-white shadow-lg">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Have a question about your privacy?
                </h3>
                <p className="mt-1 text-sm text-slate-200">
                  Get in touch with the Aurevia Healthcare team.
                </p>
              </div>

              <Link
                href="/contact#contact-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#123B5D] transition-all hover:bg-teal-50 hover:text-[#0F766E] shadow-sm shrink-0"
              >
                <span>Contact Us</span>
                <ArrowRight size={16} />
              </Link>
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
                  {privacySections.map((sec) => {
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

              {/* Data & Privacy Questions Box */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F766E] mb-2">
                  <HelpCircle size={15} />
                  Privacy Inquiries
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  For data protection or policy questions, please contact our team via our official contact channel.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#123B5D] hover:text-[#0F766E] transition-colors"
                >
                  <span>Go to Contact Page</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
