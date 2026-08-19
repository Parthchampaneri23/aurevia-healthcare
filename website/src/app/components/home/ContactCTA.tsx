import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function ContactCTA() {
    return (
        <section className="bg-white py-12 lg:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#123B5D] to-[#0F766E] px-6 py-10 sm:px-10 lg:px-14 lg:py-12">

                    {/* Subtle Decorative Elements */}
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/5" />
                    <div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-white/5" />

                    <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">

                        {/* Content */}
                        <div className="flex items-start gap-4 text-center lg:text-left">

                            {/* Icon */}
                            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white sm:flex">
                                <Mail size={22} strokeWidth={1.8} />
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">
                                    Let's Work Together
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                                    Need a Reliable Manufacturing Partner?
                                </h2>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
                                    Connect with Aurevia Healthcare for pharmaceutical
                                    manufacturing enquiries and business opportunities.
                                </p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">

                            <Link
                                href="/contact?type=quote"
                                className="group inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#123B5D] transition hover:bg-slate-100"
                            >
                                Get a Quote
                                <ArrowRight
                                    size={16}
                                    className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Link>

                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
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