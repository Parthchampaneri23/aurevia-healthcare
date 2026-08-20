import IndustriesHero from "@/app/components/industries/IndustriesHero";
import IndustrySegments from "@/app/components/industries/IndustrySegments";
import DosageCapabilities from "@/app/components/industries/DosageCapabilities";
import PartnershipModels from "@/app/components/industries/PartnershipModels";
import PartnershipJourney from "@/app/components/industries/PartnershipJourney";
import IndustriesCTA from "@/app/components/industries/IndustriesCTA";

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
            <IndustriesCTA />
        </main>
    );
}