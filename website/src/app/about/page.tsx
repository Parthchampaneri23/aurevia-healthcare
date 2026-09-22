import type { Metadata } from "next";
import AboutHero from "@/app/components/about/AboutHero";
import CompanyStory from "@/app/components/about/CompanyStory";
import WhatWeDo from "@/app/components/about/WhatWeDo";
import CoreValues from "@/app/components/about/CoreValues";
import ManufacturingOverview from "@/app/components/about/ManufacturingOverview";
import QualityCertifications from "@/app/components/about/QualityCertifications";
import TestimonialsSection from "@/app/components/about/TestimonialsSection";
import PartnershipPhilosophy from "@/app/components/about/PartnershipPhilosophy";
import FAQSection from "@/app/components/common/FAQSection";

export const metadata: Metadata = {
  title: "About Us | Aurevia Healthcare - B2B Pharmaceutical Manufacturing",
  description: "Learn about Aurevia Healthcare, a trusted B2B pharmaceutical manufacturing company dedicated to high-capacity dosage formulations, cGMP quality standards, and dependable business partnerships.",
};

const aboutFaqs = [
  {
    question: "Where are Aurevia Healthcare's primary manufacturing facilities located?",
    answer: "Aurevia Healthcare operates state-of-the-art pharmaceutical manufacturing facilities strategically situated in established industrial zones in India. Designed in full compliance with WHO-GMP and international engineering standards, our facilities feature modular cleanrooms, automated dosage lines, and environmental monitoring controls.",
  },
  {
    question: "What is Aurevia Healthcare's corporate mission, vision, and core philosophy?",
    answer: "Our vision is to become a globally trusted leader in pharmaceutical manufacturing by making high-quality, life-saving medicines accessible to all. Our core philosophy rests on three pillars: Uncompromising Quality Assurance, Continuous Formulation Innovation, and Ethical Strategic Partnerships.",
  },
  {
    question: "How does Aurevia Healthcare invest in R&D and Formulation Development?",
    answer: "We invest significantly in our in-house Research & Development (R&D) wing, staffed by experienced pharmaceutical scientists and formulation chemists. Our labs specialize in bio-equivalence studies, analytical method validation, stability testing under varying climatic zones (ICH guidelines), and novel drug delivery system (NDDS) optimization.",
  },
  {
    question: "What specific accreditations and compliance standards cover your operations?",
    answer: "Our operations hold WHO-GMP accreditation, ISO 9001:2015 Quality Management certification, and adhere strictly to GLP (Good Laboratory Practices) and GDP (Good Distribution Practices). We perform regular internal quality audits and maintain rigorous raw material vendor qualification protocols.",
  },
  {
    question: "Are prospective partners able to conduct technical site audits before signing contracts?",
    answer: "Yes, transparency is central to our business ethics. We encourage prospective corporate clients, institutional procurement teams, and international regulatory inspectors to conduct comprehensive technical audits of our production blocks, QA labs, and warehouse facilities.",
  },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* 1. Hero */}
            <AboutHero />

            {/* 2. Company Introduction & Who We Are */}
            <CompanyStory />

            {/* 3. What We Do / Capabilities (Soft Teal Background) */}
            <WhatWeDo />

            {/* 4. Core Principles / Working Philosophy (White Background) */}
            <CoreValues />

            {/* 5. Manufacturing & Infrastructure Overview (Soft Blue Background) */}
            <ManufacturingOverview />

            {/* 6. Quality & Reliability / Verified Certifications (White Background) */}
            <QualityCertifications />

            {/* 7. Client Trust & Testimonials (White Background) */}
            <TestimonialsSection />

            {/* 8. B2B Partnership Philosophy (Deep Navy Background) */}
            <PartnershipPhilosophy />

            {/* 9. About Us FAQs (White Background) */}
            <FAQSection
                eyebrow="ABOUT AUREVIA HEALTHCARE"
                title="About Us FAQs"
                subtitle="Common questions regarding our manufacturing capabilities, compliance, quality standards, and corporate vision."
                faqs={aboutFaqs}
            />
        </main>
    );
}