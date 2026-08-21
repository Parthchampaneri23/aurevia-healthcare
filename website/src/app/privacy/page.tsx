"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
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
                @keyframes heroSlideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-hero-content {
                    animation: heroSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />

            {/* Hero */}
            <section className="relative h-[200px] overflow-hidden sm:h-[240px] lg:h-[280px]">
                <Image
                    src="/hero/legalbanner.png"
                    alt="Aurevia Healthcare Privacy Policy"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />

                {/* Theme Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#08243a]/85 via-[#123B5D]/65 to-[#123B5D]/20" />

                <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
                    <div className="max-w-2xl text-left text-white animate-hero-content">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-300">
                            Legal & Privacy
                        </p>

                        <h1 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                            Privacy Policy
                        </h1>

                        <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-200 sm:text-sm">
                            How Aurevia Healthcare handles information submitted
                            through our website.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="px-6 py-16 sm:py-20 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
                    >
                        <p className="leading-7 text-slate-600">
                            Aurevia Healthcare respects the privacy of visitors
                            to this website. This Privacy Policy explains what
                            information may be collected and how it may be used
                            when you interact with our website.
                        </p>
                    </motion.div>

                    <div className="space-y-12">
                        {[
                            {
                                title: "1. Information We Collect",
                                text: "We may receive information that you voluntarily provide through contact forms, product enquiries, career applications, or other communication submitted through the website. This may include your name, email address, phone number, company information, enquiry details, and other information you choose to provide.",
                            },
                            {
                                title: "2. How We Use Information",
                                text: "Information submitted through the website may be used to respond to enquiries, process product requests, communicate with prospective business partners, respond to career applications, and improve our website and services.",
                            },
                            {
                                title: "3. Product Enquiries",
                                text: "Information submitted when requesting information about our products may be used to understand your requirements and respond appropriately. We do not sell submitted enquiry information to unrelated third parties.",
                            },
                            {
                                title: "4. Cookies and Analytics",
                                text: "The website may use cookies or analytics technologies to understand website usage, improve performance, and provide a better browsing experience.",
                            },
                            {
                                title: "5. Data Security",
                                text: "We take reasonable measures to protect information submitted through the website. However, no internet transmission or electronic storage system can be guaranteed to be completely secure.",
                            },
                            {
                                title: "6. Third-Party Services",
                                text: "The website may use third-party services for hosting, analytics, maps, forms, or other website functionality. These services may process information according to their own privacy policies.",
                            },
                            {
                                title: "7. Data Retention",
                                text: "Information may be retained only for as long as reasonably necessary to respond to enquiries, provide requested services, maintain business records, or meet applicable requirements.",
                            },
                            {
                                title: "8. Your Rights",
                                text: "You may contact us if you have questions about information you have submitted through this website or wish to request correction or deletion where applicable.",
                            },
                            {
                                title: "9. Children's Privacy",
                                text: "This website is intended for business and general informational purposes and is not directed toward children.",
                            },
                            {
                                title: "10. Changes to This Policy",
                                text: "This Privacy Policy may be updated from time to time. Any updated version will be published on this page.",
                            },
                            {
                                title: "11. Contact Us",
                                text: "If you have questions regarding this Privacy Policy, please contact Aurevia Healthcare through the contact information provided on our website.",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.03,
                                }}
                                className="border-b border-slate-200 pb-8 last:border-0"
                            >
                                <h2 className="text-xl font-bold text-[#123B5D] sm:text-2xl">
                                    {item.title}
                                </h2>

                                <p className="mt-3 leading-7 text-slate-600">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mt-12 flex flex-col gap-4 rounded-2xl bg-[#123B5D] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
                    >
                        <div>
                            <h3 className="text-lg font-semibold text-white">
                                Have a question about your privacy?
                            </h3>
                            <p className="mt-1 text-sm text-slate-300">
                                Get in touch with the Aurevia Healthcare team.
                            </p>
                        </div>

                        <Link
                            href="/contact#contact-form"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#123B5D] transition-all duration-300 hover:bg-[#8ED1C7] hover:shadow-lg"
                        >
                            Contact Us
                            <ArrowRight size={16} />
                        </Link>
                    </motion.div>

                    <p className="mt-8 text-sm text-[#123B5D]/70">
                        Last updated: August 2026
                    </p>
                </div>
            </section>
        </main>
    );
}