"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, MapPin, X } from "lucide-react";

interface JobDetails {
    responsibilities: string[];
    requirements: string[];
}

interface Job {
    title: string;
    department: string;
    experience: string;
    location: string;
    description: string;
    details: JobDetails;
}

const jobs: Job[] = [
    {
        title: "Production Executive",
        department: "Manufacturing",
        experience: "1–3 Years",
        location: "Changodar GIDC, Ahmedabad, Gujarat 382213, India",
        description:
            "Support pharmaceutical manufacturing operations, production planning, process execution and production documentation.",
        details: {
            responsibilities: [
                "Supervise and coordinate daily production activities in accordance with SOPs.",
                "Ensure strict adherence to cGMP guidelines and safety standards on the manufacturing floor.",
                "Prepare, review, and maintain batch manufacturing records (BMR) and other production documentation.",
                "Coordinate with quality control and assurance teams for in-process checks and line clearances."
            ],
            requirements: [
                "B.Pharm / M.Pharm / B.Sc / M.Sc in Chemistry or related scientific discipline.",
                "1–3 years of hands-on experience in pharmaceutical manufacturing operations.",
                "Strong understanding of manufacturing equipment and production processes.",
                "Excellent troubleshooting, communication, and team coordination skills."
            ]
        }
    },
    {
        title: "Quality Control Executive",
        department: "Quality Control",
        experience: "1–3 Years",
        location: "Changodar GIDC, Ahmedabad, Gujarat 382213, India",
        description:
            "Support laboratory testing, sampling, quality documentation and analytical activities.",
        details: {
            responsibilities: [
                "Perform routine analytical testing of raw materials, packaging materials, in-process samples, and finished products.",
                "Operate and calibrate analytical instruments like HPLC, GC, UV-Vis, and FTIR.",
                "Maintain accurate, real-time laboratory documentation and raw data sheets.",
                "Adhere to Good Laboratory Practices (GLP) and safety procedures at all times."
            ],
            requirements: [
                "B.Sc / M.Sc in Chemistry, Analytical Chemistry, or related field.",
                "1–3 years of quality control experience in a regulated pharmaceutical environment.",
                "Practical experience operating HPLC and other chromatography equipment.",
                "Familiarity with pharmacopoeial standards (IP/BP/USP) and analytical validation."
            ]
        }
    },
    {
        title: "Quality Assurance Executive",
        department: "Quality Assurance",
        experience: "1–3 Years",
        location: "Changodar GIDC, Ahmedabad, Gujarat 382213, India",
        description:
            "Support quality systems, SOP compliance, batch documentation and continuous improvement initiatives.",
        details: {
            responsibilities: [
                "Review batch manufacturing and packaging records for release compliance.",
                "Assist in the preparation, revision, and distribution of SOPs and quality documents.",
                "Participate in deviation investigations, change control processes, and CAPA implementations.",
                "Conduct internal quality audits and monitor shop-floor compliance."
            ],
            requirements: [
                "B.Pharm / M.Pharm / M.Sc in Chemistry or related discipline.",
                "1–3 years of experience in pharmaceutical quality assurance.",
                "Sound knowledge of QA systems, documentation guidelines, and cGMP compliance.",
                "Analytical mindset with strong attention to detail and documentation practices."
            ]
        }
    },
    {
        title: "Business Development Executive",
        department: "Sales & Business Development",
        experience: "1–3 Years",
        location: "Changodar GIDC, Ahmedabad, Gujarat 382213, India",
        description:
            "Identify B2B opportunities, develop healthcare relationships and support pharmaceutical product enquiries.",
        details: {
            responsibilities: [
                "Identify new B2B partners, distributors, and growth channels in local and international markets.",
                "Coordinate and address pharmaceutical product enquiries, pricing requests, and contract manufacturing proposals.",
                "Build and maintain strong relationships with healthcare providers and corporate clients.",
                "Prepare marketing pitches, presentations, and product portfolios for prospective clients."
            ],
            requirements: [
                "MBA in Sales & Marketing, B.Pharm, B.Sc, or equivalent degree.",
                "1–3 years of sales or business development experience in the pharmaceutical or healthcare sector.",
                "Strong communication, negotiation, and interpersonal relationship skills.",
                "Proactive approach with a target-driven mindset."
            ]
        }
    },
    {
        title: "Supply Chain Executive",
        department: "Supply Chain & Operations",
        experience: "1–3 Years",
        location: "Changodar GIDC, Ahmedabad, Gujarat 382213, India",
        description:
            "Support procurement, inventory coordination, order processing and logistics activities.",
        details: {
            responsibilities: [
                "Coordinate procurement of raw materials, packaging materials, and active pharmaceutical ingredients (APIs).",
                "Monitor inventory levels and coordinate logistics for timely delivery of materials.",
                "Liaise with vendors, freight forwarders, and custom clearing agents.",
                "Handle order processing, invoicing, and dispatch documentation."
            ],
            requirements: [
                "Bachelor's degree in Logistics, Supply Chain Management, Business Administration, or related field.",
                "1–3 years of experience in supply chain, logistics, or procurement (pharmaceutical experience is a plus).",
                "Proficiency in ERP software (such as SAP) and MS Excel.",
                "Strong analytical, organizational, and negotiation skills."
            ]
        }
    },
];

export default function JobOpportunities() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    return (
        <section id="opportunities" className="bg-white py-12 lg:py-12">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes cardFadeIn {
                    from { opacity: 0; transform: translateY(15px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes modalFadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-card-fade-in {
                    animation: cardFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
                .animate-modal-fade-in {
                    animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <span className="h-1 w-6 rounded-full bg-teal-600" />
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
                            CURRENT OPPORTUNITIES
                        </p>
                        <span className="h-1 w-6 rounded-full bg-teal-600" />
                    </div>

                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl bg-gradient-to-r from-slate-900 via-slate-800 to-[#123B5D] bg-clip-text text-transparent">
                        Find Your Next Opportunity
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                        Explore our current opportunities and discover where
                        your skills and experience can contribute to Aurevia
                        Healthcare. Click any card to view detailed requirements.
                    </p>
                </div>

                <div className="mt-10 grid gap-5 lg:grid-cols-2">
                    {jobs.map((job, index) => (
                        <article
                            key={job.title}
                            onClick={() => setSelectedJob(job)}
                            className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-teal-400/60 hover:shadow-xl hover:shadow-teal-900/10 animate-card-fade-in cursor-pointer"
                            style={{ animationDelay: `${index * 80}ms` }}
                        >
                            {/* Slide-in top border color */}
                            <div className="absolute top-0 left-0 h-[4px] w-0 bg-gradient-to-r from-[#123B5D] to-[#0F766E] transition-all duration-500 group-hover:w-full" />

                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#123B5D]">
                                        {job.title}
                                    </h3>

                                    <p className="mt-1 text-sm font-medium text-teal-600">
                                        {job.department}
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#123B5D]/10 text-[#123B5D] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[#123B5D] group-hover:text-white">
                                    <Briefcase size={19} />
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-500">
                                <span>{job.experience}</span>

                                <span className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    {job.location}
                                </span>
                            </div>

                            <p className="mt-4 text-sm leading-6 text-slate-600">
                                {job.description}
                            </p>

                            <div className="mt-5 inline-flex items-center text-sm font-semibold text-[#123B5D] group-hover:text-[#0F766E]">
                                View Details & Apply
                                <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Job Details Modal */}
            {selectedJob && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300 overflow-y-auto"
                    onClick={() => setSelectedJob(null)}
                >
                    <div 
                        className="relative my-auto w-full max-w-2xl max-h-[82vh] rounded-3xl bg-white shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Attractive Gradient Header */}
                        <div className="bg-gradient-to-r from-slate-900 via-[#123B5D] to-[#0F766E] px-6 sm:px-8 py-6 text-white flex items-start justify-between shrink-0 shadow-md">
                            <div>
                                <span className="inline-block rounded-full bg-teal-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-200 border border-teal-400/30">
                                    {selectedJob.department}
                                </span>
                                <h3 className="mt-2 text-2xl font-extrabold text-white leading-tight drop-shadow-sm">
                                    {selectedJob.title}
                                </h3>
                            </div>
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="text-white/70 hover:text-white p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all"
                                title="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content Scrollable Body */}
                        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
                            {/* Meta Info Pills */}
                            <div className="flex flex-wrap gap-3 pb-4 border-b border-slate-100 text-xs font-semibold">
                                <span className="flex items-center gap-2 rounded-xl bg-teal-50 px-3.5 py-2 text-[#0F766E] border border-teal-100">
                                    <Briefcase size={16} />
                                    Experience: {selectedJob.experience}
                                </span>
                                <span className="flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2 text-slate-700 border border-slate-200">
                                    <MapPin size={16} className="text-teal-600" />
                                    {selectedJob.location}
                                </span>
                            </div>

                            {/* Job Description */}
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                                    Job Overview
                                </h4>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    {selectedJob.description}
                                </p>
                            </div>

                            {/* Responsibilities */}
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                                    Key Responsibilities
                                </h4>
                                <ul className="mt-3 space-y-2.5">
                                    {selectedJob.details.responsibilities.map((resp, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#0F766E]" />
                                            <span>{resp}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Requirements */}
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                                    Requirements & Qualifications
                                </h4>
                                <ul className="mt-3 space-y-2.5">
                                    {selectedJob.details.requirements.map((req, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#123B5D]" />
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Sticky Action Footer */}
                        <div className="bg-slate-50 border-t border-slate-100 px-6 sm:px-8 py-4 flex items-center justify-end gap-3 shrink-0">
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 bg-white hover:bg-slate-100 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedJob(null);
                                    setTimeout(() => {
                                        const element = document.getElementById("application-title");
                                        if (element) {
                                            element.scrollIntoView({ behavior: "smooth", block: "center" });
                                        }
                                    }, 150);
                                }}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#123B5D] to-[#0F766E] hover:from-[#0d2d46] hover:to-[#095751] text-sm font-bold text-white shadow-md shadow-teal-900/10 transition-all active:scale-95"
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}