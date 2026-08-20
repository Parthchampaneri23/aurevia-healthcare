"use client";

import { useState } from "react";
import Image from "next/image";

const jobs = [
    "Production Executive",
    "Quality Control Executive",
    "Quality Assurance Executive",
    "Business Development Executive",
    "Supply Chain Executive",
];

export default function JobApplication() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section id="application" className="bg-slate-50 py-12 lg:py-12">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes formFadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-form-fade-in {
                    animation: formFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
                    {/* Left side info & Image */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="h-1 w-6 rounded-full bg-teal-600" />
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
                                JOIN OUR TEAM
                            </p>
                        </div>

                        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl bg-gradient-to-r from-slate-900 via-slate-800 to-[#123B5D] bg-clip-text text-transparent">
                            Apply for an Opportunity
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-600">
                            Interested in joining Aurevia Healthcare? Submit your
                            details and resume to apply for one of our current
                            opportunities.
                        </p>

                        <div className="group relative mt-8 overflow-hidden rounded-3xl bg-slate-100 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-[#123B5D]/10">
                            <div className="overflow-hidden">
                                <Image
                                    src="/career/careerteam.png"
                                    alt="Aurevia Healthcare Team"
                                    width={600}
                                    height={400}
                                    className="h-[250px] w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 sm:h-[300px] lg:h-[350px]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right side form */}
                    <div className="lg:col-span-7">
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 animate-form-fade-in"
                        >
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        First Name *
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Last Name *
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Email Address *
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Phone Number *
                                    </label>
                                    <input
                                        required
                                        type="tel"
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Current City *
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Position Applying For *
                                    </label>
                                    <select
                                        required
                                        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    >
                                        <option value="">Select position</option>
                                        {jobs.map((job) => (
                                            <option key={job}>{job}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Highest Qualification *
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Total Experience *
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. 2 Years"
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Current Company
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Current Designation
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Notice Period *
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. 30 Days"
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Expected Salary
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Expected CTC"
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Resume *
                                    </label>
                                    <input
                                        required
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition-all duration-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        LinkedIn Profile
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://linkedin.com/in/..."
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>
                            </div>

                            <div className="mt-5">
                                <label className="text-sm font-medium text-slate-700">
                                    Cover Letter
                                </label>

                                <textarea
                                    rows={5}
                                    className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    placeholder="Tell us briefly why you are interested in joining Aurevia Healthcare..."
                                />
                            </div>

                            <label className="mt-6 flex items-start gap-3 text-sm text-slate-600 cursor-pointer">
                                <input
                                    required
                                    type="checkbox"
                                    className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                />

                                <span>
                                    I confirm that the information provided in this
                                    application is accurate and complete to the best
                                    of my knowledge.
                                </span>
                            </label>

                            <button
                                type="submit"
                                className="mt-7 rounded-lg bg-[#123B5D] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0d2d46] hover:shadow-md active:scale-95"
                            >
                                Submit Application
                            </button>

                            {submitted && (
                                <p className="mt-4 text-sm font-medium text-teal-700 animate-pulse">
                                    Thank you for your application. Our recruitment
                                    team will review your profile.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}