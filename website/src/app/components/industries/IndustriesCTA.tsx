import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function IndustriesCTA() {
    return (
        <section className="bg-white py-12 lg:py-12">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes ctaSlideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-cta-card {
                    animation: ctaSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
            `}} />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#123B5D] to-[#0F766E] px-7 py-10 text-center shadow-lg sm:px-12 animate-cta-card">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-200">
                        BUILD A PARTNERSHIP
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                        Looking for a Reliable Healthcare Partner?
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-200">
                        Discuss your product requirements, manufacturing needs
                        and business opportunities with Aurevia Healthcare.
                    </p>

                    <Link
                        href="/contact"
                        className="mt-7 inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#123B5D] shadow-md transition hover:bg-slate-100"
                    >
                        Start a Conversation
                        <ArrowRight size={17} className="ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
}