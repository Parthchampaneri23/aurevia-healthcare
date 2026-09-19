"use client";

import Image from "next/image";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Breadcrumb from "@/app/components/common/Breadcrumb";

export default function TermsPage() {
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

            {/* Hero Banner */}
            <section className="relative h-[240px] w-full overflow-hidden sm:h-[280px] lg:h-[320px]">
                <Image
                    src="/hero/legalbanner.png"
                    alt="Aurevia Healthcare Terms and Conditions"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-transparent" />

                {/* Banner Content */}
                <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
                    <div className="max-w-2xl text-left">
                        <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-950/60 px-3.5 py-1 backdrop-blur-md">
                            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-300">
                                Legal &amp; Information
                            </span>
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
                            Terms &amp; Conditions
                        </h1>

                        <Breadcrumb items={[{ name: "Terms & Conditions" }]} />
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="px-6 py-12 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
                    >
                        <p className="leading-7 text-slate-600">
                            By accessing or using the Aurevia Healthcare
                            website, you agree to the terms outlined below.
                            Please review these terms before using the website.
                        </p>
                    </motion.div>

                    <div className="space-y-12">
                        {[
                            {
                                title: "1. Acceptance of Terms",
                                text: "By accessing or using the Aurevia Healthcare website, you agree to these Terms & Conditions. If you do not agree with these terms, please do not use the website.",
                            },
                            {
                                title: "2. Website Use",
                                text: "This website is provided for general information, business communication, product information, and enquiry purposes. You agree to use the website lawfully and responsibly.",
                            },
                            {
                                title: "3. Product Information",
                                text: "Product descriptions and information displayed on this website are provided for general informational purposes. Product availability, specifications, packaging, and other details may vary.",
                            },
                            {
                                title: "4. Product Enquiries",
                                text: "Submitting a product enquiry or quote request does not constitute a purchase agreement, order confirmation, or guarantee of product availability. Any commercial transaction is subject to separate terms agreed between the relevant parties.",
                            },
                            {
                                title: "5. Intellectual Property",
                                text: "Unless otherwise stated, website content including text, graphics, logos, images, design elements, and other materials belongs to or is used by Aurevia Healthcare. Content may not be copied, reproduced, or distributed without appropriate permission.",
                            },
                            {
                                title: "6. Accuracy of Information",
                                text: "We aim to keep website information accurate and useful, but we do not guarantee that every item of information will always be complete, current, or error-free.",
                            },
                            {
                                title: "7. Third-Party Links",
                                text: "The website may contain links to third-party websites or services. Aurevia Healthcare is not responsible for the content, availability, or privacy practices of external websites.",
                            },
                            {
                                title: "8. No Medical Advice",
                                text: "Information provided on this website is not a substitute for professional medical advice, diagnosis, or treatment. Product information should not be used for self-diagnosis or self-medication.",
                            },
                            {
                                title: "9. Website Availability",
                                text: "We may modify, suspend, or discontinue portions of the website from time to time. We do not guarantee uninterrupted availability of every website feature.",
                            },
                            {
                                title: "10. Limitation of Liability",
                                text: "To the extent permitted by applicable law, Aurevia Healthcare shall not be responsible for losses arising from reliance on general website information or temporary website unavailability.",
                            },
                            {
                                title: "11. Changes to These Terms",
                                text: "These Terms & Conditions may be updated from time to time. Updated terms will be published on this page.",
                            },
                            {
                                title: "12. Contact Us",
                                text: "If you have questions regarding these Terms & Conditions, please contact Aurevia Healthcare through the contact information available on the website.",
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
                                Need more information?
                            </h3>
                            <p className="mt-1 text-sm text-slate-300">
                                Contact our team for any website or business
                                enquiry.
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