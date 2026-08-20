import Link from "next/link";
import { ArrowRight, Briefcase, MapPin } from "lucide-react";

const jobs = [
    {
        title: "Production Executive",
        department: "Manufacturing",
        experience: "1–3 Years",
        location: "Gujarat, India",
        description:
            "Support pharmaceutical manufacturing operations, production planning, process execution and production documentation.",
    },
    {
        title: "Quality Control Executive",
        department: "Quality Control",
        experience: "1–3 Years",
        location: "Gujarat, India",
        description:
            "Support laboratory testing, sampling, quality documentation and analytical activities.",
    },
    {
        title: "Quality Assurance Executive",
        department: "Quality Assurance",
        experience: "1–3 Years",
        location: "Gujarat, India",
        description:
            "Support quality systems, SOP compliance, batch documentation and continuous improvement initiatives.",
    },
    {
        title: "Business Development Executive",
        department: "Sales & Business Development",
        experience: "1–3 Years",
        location: "Gujarat, India",
        description:
            "Identify B2B opportunities, develop healthcare relationships and support pharmaceutical product enquiries.",
    },
    {
        title: "Supply Chain Executive",
        department: "Supply Chain & Operations",
        experience: "1–3 Years",
        location: "Gujarat, India",
        description:
            "Support procurement, inventory coordination, order processing and logistics activities.",
    },
];

export default function JobOpportunities() {
    return (
        <section id="opportunities" className="bg-white py-12 lg:py-12">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes cardFadeIn {
                    from { opacity: 0; transform: translateY(15px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-card-fade-in {
                    animation: cardFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
            `}} />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <span className="h-1 w-6 rounded-full bg-teal-600" />
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
                            CURRENT OPPORTUNITIES
                        </p>
                    </div>

                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl bg-gradient-to-r from-slate-900 via-slate-800 to-[#123B5D] bg-clip-text text-transparent">
                        Find Your Next Opportunity
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                        Explore our current opportunities and discover where
                        your skills and experience can contribute to Aurevia
                        Healthcare.
                    </p>
                </div>

                <div className="mt-10 grid gap-5 lg:grid-cols-2">
                    {jobs.map((job, index) => (
                        <article
                            key={job.title}
                            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-300/60 hover:border-slate-300 animate-card-fade-in"
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

                            <Link
                                href="#application"
                                className="mt-5 inline-flex items-center text-sm font-semibold text-[#123B5D] hover:text-[#0F766E]"
                            >
                                Apply for this Position
                                <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}