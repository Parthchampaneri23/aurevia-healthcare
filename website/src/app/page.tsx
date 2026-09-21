import Hero from "@/app/components/home/Hero";
import AboutPreview from "@/app/components/home/AboutPreview";
import Stats from "@/app/components/home/Stats";
import WhyChooseUs from "@/app/components/home/WhyChooseUs";
import ProductCategories from "@/app/components/home/ProductCategories";
import Manufacturing from "@/app/components/home/Manufacturing";
import IndustrySegments from "@/app/components/industries/IndustrySegments";
import HomeBlogSection from "@/app/components/home/HomeBlogSection";
import ClientSlider from "@/app/components/home/ClientSlider";
import FAQSection from "@/app/components/common/FAQSection";
import ContactCTA from "@/app/components/home/ContactCTA";

const homeFaqs = [
  {
    question: "What therapeutic areas and formulation types does Aurevia Healthcare specialize in?",
    answer: "Aurevia Healthcare specializes in a wide spectrum of therapeutic categories including Anti-Infectives, Cardiovascular, Gastroenterology, Pain Management, Dermatology, Respiratory, and Nutraceuticals. Our manufacturing capabilities encompass oral solids (Tablets & Capsules), oral liquids (Syrups & Suspensions), topical formulations (Ointments & Creams), and sterile Injectables.",
  },
  {
    question: "What quality standards, certifications, and compliance frameworks do you adhere to?",
    answer: "Our manufacturing infrastructure operates strictly under WHO-GMP, ISO 9001:2015, and cGMP protocols. We feature computerized HVAC air-handling systems, positive pressure cleanrooms, automated dosage packaging, and advanced in-house analytical testing laboratories (HPLC, GC, UV-Vis Spectrophotometry) for comprehensive batch control.",
  },
  {
    question: "Do you provide Third-Party Contract Manufacturing and OEM / Private Labeling?",
    answer: "Yes, contract manufacturing and private label solutions are core pillars of our business. We assist healthcare brand owners, pharmaceutical companies, and distributor networks with end-to-end solutions—from formulation refinement and regulatory documentation to customized primary & secondary packaging.",
  },
  {
    question: "How can business partners request product samples or commercial price quotations?",
    answer: "You can request commercial quotes or product evaluation samples by clicking 'Request a Quote' in the navbar or submitting an inquiry via our Contact Us page. Our commercial management team reviews technical specifications and responds with formal quotations within 24 business hours.",
  },
  {
    question: "What international regulatory support and export services does Aurevia provide?",
    answer: "We export globally across Asia, Africa, the Middle East, and Latin America. We support international registrations by preparing CTD/ACTD dossiers, Certificates of Pharmaceutical Product (COPP), Certificates of Free Sale (CFS), Stability Test Protocol reports, and Complete Batch Analysis Certificates (COA).",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutPreview />
      <Stats />
      <WhyChooseUs />
      <ProductCategories />
      <Manufacturing />
      <IndustrySegments />
      <HomeBlogSection />
      <ClientSlider />
      <FAQSection
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title="Frequently Asked Questions"
        subtitle="Learn more about Aurevia Healthcare's manufacturing standards, product portfolio, and partnership opportunities."
        faqs={homeFaqs}
        showContactCTA={false}
      />
      <ContactCTA />
    </main>
  );
}