import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function ContactCTA() {
    return (
        <section aria-label="B2B Partnership Call to Action" className="bg-white py-12 lg:py-12 border-t border-slate-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-[#071E33] px-6 py-10 sm:px-10 lg:px-14 lg:py-12 shadow-2xl">

                    {/* Subtle Teal Decorative Glows */}
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" aria-hidden="true" />
                    <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" aria-hidden="true" />

                    <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">

                        {/* Content */}
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-950/60 px-3.5 py-1 backdrop-blur-md">
                                <Mail size={14} className="text-teal-300" />
                                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-300">
                                    B2B PARTNERSHIPS
                                </span>
                            </div>

                            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                                Let's Build Better Healthcare Partnerships
                            </h2>

                            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                                Connect with Aurevia Healthcare to discuss pharmaceutical dosage formulations, contract manufacturing requirements, and potential strategic distribution partnerships.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex shrink-0 flex-col gap-3.5 sm:flex-row">
                            <Link
                                href="/contact#contact-form"
                                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-white hover:text-[#071E33] active:scale-95"
                            >
                                <span>Request Product Information</span>
                                <ArrowRight
                                    size={16}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Link>

                            <Link
                                href="/contact#contact-form"
                                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#071E33] active:scale-95"
                            >
                                Contact Us
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
