import { Metadata } from "next";
import IndustriesHero from "@/app/components/industries/IndustriesHero";
import IndustrySegments from "@/app/components/industries/IndustrySegments";
import DosageCapabilities from "@/app/components/industries/DosageCapabilities";
import PartnershipModels from "@/app/components/industries/PartnershipModels";
import PartnershipJourney from "@/app/components/industries/PartnershipJourney";
import IndustriesFAQ from "@/app/components/industries/IndustriesFAQ";
import IndustriesCTA from "@/app/components/industries/IndustriesCTA";

export const metadata: Metadata = {
    title: "Industries We Support | Aurevia Healthcare",
    description: "Explore the healthcare sectors, hospital networks, pharmacy chains, and pharmaceutical distributors supported by Aurevia Healthcare's manufacturing capabilities.",
    openGraph: {
        title: "Industries We Support | Aurevia Healthcare",
        description: "Pharmaceutical solutions and manufacturing support across hospital networks, retail pharmacies, distributors, and healthcare brands.",
    },
};

export default function IndustriesPage() {
    return (
        <main className="bg-white animate-fade-in">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes pageFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: pageFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />
            <IndustriesHero />
            <IndustrySegments />
            <DosageCapabilities />
            <PartnershipModels />
            <PartnershipJourney />
            <IndustriesFAQ />
            <IndustriesCTA />
        </main>
    );
}