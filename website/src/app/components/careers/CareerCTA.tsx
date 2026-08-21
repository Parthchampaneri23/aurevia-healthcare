import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CareerCTA() {
    return (
        <section className="bg-white py-12">
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
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-200">
                        YOUR NEXT STEP
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-white">
                        Ready to Build Your Future With Aurevia?
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-200">
                        Take the next step toward a rewarding career in
                        healthcare.
                    </p>

                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                        <Link
                            href="#opportunities"
                            className="group inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#123B5D] transition-all duration-300 hover:bg-slate-100 hover:shadow-lg"
                        >
                            Explore Opportunities
                            <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="/contact#contact-form"
                            className="rounded-lg border border-white/60 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}