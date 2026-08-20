import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ContactCTA() {
    return (
        <section className="bg-white pb-16">
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
                <div className="rounded-2xl bg-gradient-to-r from-[#123B5D] to-[#0F766E] px-7 py-10 text-center sm:px-12 animate-cta-card shadow-lg">
                    <h2 className="text-3xl font-bold text-white">
                        Have a Requirement?
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-200">
                        Let&apos;s discuss how Aurevia Healthcare can support
                        your pharmaceutical and healthcare requirements.
                    </p>

                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                        <Link
                            href="#contact-form"
                            className="group inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#123B5D] transition-all duration-300 hover:bg-slate-100 hover:shadow-lg"
                        >
                            Send an Enquiry
                            <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="/products"
                            className="rounded-lg border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            Explore Products
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}