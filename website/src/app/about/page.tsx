import AboutHero from "@/app/components/about/AboutHero";
import CompanyStory from "@/app/components/about/CompanyStory";
import MissionVision from "@/app/components/about/MissionVision";
import CoreValues from "@/app/components/about/CoreValues";
import OurJourney from "@/app/components/about/OurJourney";
import ResearchDevelopment from "@/app/components/about/ResearchDevelopment";
import QualityCertifications from "@/app/components/about/QualityCertifications";

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
        </main>
    );
}