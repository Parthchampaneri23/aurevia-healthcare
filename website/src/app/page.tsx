import Hero from "@/app/components/home/Hero";
import AboutPreview from "@/app/components/home/AboutPreview";
import Stats from "@/app/components/home/Stats";
import WhyChooseUs from "@/app/components/home/WhyChooseUs";
import ProductCategories from "@/app/components/home/ProductCategories";
import Manufacturing from "@/app/components/home/Manufacturing";
import ResearchDevelopment from "@/app/components/home/ResearchDevelopment";
import QualityCompliance from "@/app/components/home/QualityCompliance";
import ContactCTA from "@/app/components/home/ContactCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutPreview />
      <Stats />
      <WhyChooseUs />
      <ProductCategories />
      <Manufacturing />
      <ResearchDevelopment />
      <QualityCompliance />
      <ContactCTA />
    </main>
  );
}