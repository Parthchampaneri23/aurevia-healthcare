import Link from "next/link";
import { ArrowRight, MessageSquare, ChevronRight } from "lucide-react";

export default function IndustriesCTA() {
    return (
        <section className="bg-slate-50 py-12 lg:py-12">
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
                <div className="relative overflow-hidden rounded-3xl bg-[#071E33] px-7 py-12 text-center shadow-2xl sm:px-12 sm:py-12 animate-cta-card border border-teal-900/40">

                    {/* Background Subtle Gradient Blobs */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#123B5D]/40 blur-3xl" />

                    <div className="relative z-10 mx-auto max-w-3xl">
                        <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-950/60 px-4 py-1 backdrop-blur-md">
                            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" aria-hidden="true" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-300">
                                Built for B2B Partnerships
                            </span>
                        </div>

                        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Explore the Possibilities with Aurevia Healthcare
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 leading-relaxed font-normal">
                            Connect with our team to discuss your pharmaceutical product requirements, contract manufacturing opportunities, and business collaboration options.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/contact#contact-form"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#2A9D8F] hover:shadow-teal-500/25 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <MessageSquare size={16} />
                                <span>Discuss Your Requirements</span>
                                <ArrowRight size={16} />
                            </Link>

                            <Link
                                href="/products"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-slate-800 hover:border-slate-500 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span>Explore Products</span>
                                <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}