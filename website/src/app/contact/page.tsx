import { Metadata } from "next";
import ContactHero from "@/app/components/contact/ContactHero";
import ContactInfo from "@/app/components/contact/ContactInfo";
import ContactForm from "@/app/components/contact/ContactForm";
import FAQ from "@/app/components/contact/FAQ";
import ContactLocation from "@/app/components/contact/ContactLocation";
import ContactCTA from "@/app/components/contact/ContactCTA";

export const metadata: Metadata = {
    title: "Contact Us | Aurevia Healthcare",
    description: "Get in touch with Aurevia Healthcare for pharmaceutical product inquiries, contract manufacturing, distribution opportunities, and global business partnerships.",
    openGraph: {
        title: "Contact Us | Aurevia Healthcare",
        description: "Connect with Aurevia Healthcare for pharmaceutical product inquiries, contract manufacturing, and business partnerships.",
    },
};

export default function ContactPage() {
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
            <ContactHero />
            <ContactInfo />
            <ContactForm />
            <ContactLocation />
            <FAQ />
            <ContactCTA />
        </main>
    );
}