import AboutHero from "@/app/components/about/AboutHero";
import CompanyStory from "@/app/components/about/CompanyStory";
import MissionVision from "@/app/components/about/MissionVision";
import CoreValues from "@/app/components/about/CoreValues";
import OurJourney from "@/app/components/about/OurJourney";
import ResearchDevelopment from "@/app/components/about/ResearchDevelopment";
import QualityCertifications from "@/app/components/about/QualityCertifications";
import FAQSection from "@/app/components/common/FAQSection";

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
        <main>
            <AboutHero />
            <CompanyStory />
            <MissionVision />
            <CoreValues />
            <OurJourney />
            <ResearchDevelopment />
            <QualityCertifications />
            <FAQSection
                eyebrow="ABOUT AUREVIA HEALTHCARE"
                title="About Us FAQs"
                subtitle="Common questions regarding our heritage, manufacturing capabilities, compliance, and corporate vision."
                faqs={aboutFaqs}
            />
        </main>
    );
}