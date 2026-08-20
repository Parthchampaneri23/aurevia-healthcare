import CareerHero from "@/app/components/careers/CareerHero";
import WhyJoinUs from "@/app/components/careers/WhyJoinUs";
import CareerAreas from "@/app/components/careers/CareerAreas";
import JobOpportunities from "@/app/components/careers/JobOpportunities";
import JobApplication from "@/app/components/careers/JobApplication";
import CareerCTA from "@/app/components/careers/CareerCTA";

export default function CareersPage() {
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
            <CareerHero />
            <WhyJoinUs />
            <CareerAreas />
            <JobOpportunities />
            <JobApplication />
            <CareerCTA />
        </main>
    );
}