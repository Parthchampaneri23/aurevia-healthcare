import ContactHero from "@/app/components/contact/ContactHero";
import ContactInfo from "@/app/components/contact/ContactInfo";
import ContactForm from "@/app/components/contact/ContactForm";
import FAQ from "@/app/components/contact/FAQ";
import ContactLocation from "@/app/components/contact/ContactLocation";
import ContactCTA from "@/app/components/contact/ContactCTA";

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
            <FAQ />
            <ContactLocation />
            <ContactCTA />
        </main>
    );
}