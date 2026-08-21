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
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        currentCity: "",
        position: "",
        qualification: "",
        experience: "",
        currentCompany: "",
        currentDesignation: "",
        noticePeriod: "",
        expectedSalary: "",
        resume: null as File | null,
        linkedin: "",
        coverLetter: "",
        confirm: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy[name];
                return copy;
            });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, resume: file }));
        if (errors.resume) {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy.resume;
                return copy;
            });
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setFormData((prev) => ({ ...prev, confirm: checked }));
        if (errors.confirm) {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy.confirm;
                return copy;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const newErrors: Record<string, string> = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.currentCity.trim()) newErrors.currentCity = "Current city is required";
        if (!formData.position) newErrors.position = "Please select a position";
        if (!formData.qualification.trim()) newErrors.qualification = "Highest qualification is required";
        if (!formData.experience.trim()) newErrors.experience = "Total experience is required";
        if (!formData.currentCompany.trim()) newErrors.currentCompany = "Current company is required";
        if (!formData.currentDesignation.trim()) newErrors.currentDesignation = "Current designation is required";
        if (!formData.noticePeriod.trim()) newErrors.noticePeriod = "Notice period is required";
        if (!formData.expectedSalary.trim()) newErrors.expectedSalary = "Expected salary is required";
        if (!formData.resume) newErrors.resume = "Please upload your resume";
        if (!formData.linkedin.trim()) {
            newErrors.linkedin = "LinkedIn profile URL is required";
        } else if (!/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(formData.linkedin)) {
            newErrors.linkedin = "Please enter a valid LinkedIn URL";
        }
        if (!formData.coverLetter.trim()) newErrors.coverLetter = "Cover letter is required";
        if (!formData.confirm) newErrors.confirm = "You must confirm the details are accurate";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

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

                        <h2 id="application-title" className="text-3xl font-extrabold text-slate-900 sm:text-4xl bg-gradient-to-r from-slate-900 via-slate-800 to-[#123B5D] bg-clip-text text-transparent">
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
                            noValidate
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 animate-form-fade-in"
                        >
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-all duration-300 ${
                                            errors.firstName
                                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        }`}
                                    />
                                    {errors.firstName && (
                                        <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-all duration-300 ${
                                            errors.lastName
                                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        }`}
                                    />
                                    {errors.lastName && (
                                        <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-all duration-300 ${
                                            errors.email
                                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        }`}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-all duration-300 ${
                                            errors.phone
                                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        }`}
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Current City *
                                    </label>
                                    <input
                                        type="text"
                                        name="currentCity"
                                        value={formData.currentCity}
                                        onChange={handleChange}
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-all duration-300 ${
                                            errors.currentCity
                                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        }`}
                                    />
                                    {errors.currentCity && (
                                        <p className="mt-1 text-xs text-red-500">{errors.currentCity}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Position Applying For *
                                    </label>
                                    <select
                                        name="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        className={`mt-2 w-full rounded-lg border bg-white px-4 py-3 text-sm text-black outline-none transition-all duration-300 ${
                                            errors.position
                                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        }`}
                                    >
                                        <option value="">Select position</option>
                                        {jobs.map((job) => (
                                            <option key={job} value={job}>{job}</option>
                                        ))}
                                    </select>
                                    {errors.position && (
                                        <p className="mt-1 text-xs text-red-500">{errors.position}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Highest Qualification *
                                    </label>
                                    <input
                                        type="text"
                                        name="qualification"
                                        value={formData.qualification}
                                        onChange={handleChange}
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-all duration-300 ${
                                            errors.qualification
                                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        }`}
                                    />
                                    {errors.qualification && (
                                        <p className="mt-1 text-xs text-red-500">{errors.qualification}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Total Experience *
                                    </label>
                                    <input
                                        type="text"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        placeholder="e.g. 2 Years"
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-all duration-300 ${
                                            errors.experience
                                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        }`}
                                    />
                                    {errors.experience && (
                                        <p className="mt-1 text-xs text-red-500">{errors.experience}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Current Company *
                                    </label>
                                    <input
                                        type="text"
                                        name="currentCompany"
                                        value={formData.currentCompany}
                                        onChange={handleChange}
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-all duration-300 ${
                                            errors.currentCompany
                                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        }`}
                                    />
                                    {errors.currentCompany && (
                                        <p className="mt-1 text-xs text-red-500">{errors.currentCompany}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Current Designation *
                                    </label>
                                    <input
                                        type="text"
                                        name="currentDesignation"
                                        value={formData.currentDesignation}
                                        onChange={handleChange}
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-all duration-300 ${
                                            errors.currentDesignation
                                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        }`}
                                    />
                                    {errors.currentDesignation && (
                                        <p className="mt-1 text-xs text-red-500">{errors.currentDesignation}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Notice Period *
                                    </label>
                                    <input
                                        type="text"
                                        name="noticePeriod"
                                        value={formData.noticePeriod}
                                        onChange={handleChange}
                                        placeholder="e.g. 30 Days"
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-all duration-300 ${
                                            errors.noticePeriod
                                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        }`}
                                    />
                                    {errors.noticePeriod && (
                                        <p className="mt-1 text-xs text-red-500">{errors.noticePeriod}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Expected Salary *
                                    </label>
                                    <input
                                        type="text"
                                        name="expectedSalary"
                                        value={formData.expectedSalary}
                                        onChange={handleChange}
                                        placeholder="Expected CTC"
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-all duration-300 ${
                                            errors.expectedSalary
                                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        }`}
                                    />
                                    {errors.expectedSalary && (
                                        <p className="mt-1 text-xs text-red-500">{errors.expectedSalary}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Resume *
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className={`mt-2 w-full rounded-lg border px-4 py-2.5 text-sm text-black outline-none transition-all duration-300 ${
                                            errors.resume
                                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        }`}
                                    />
                                    {errors.resume && (
                                        <p className="mt-1 text-xs text-red-500">{errors.resume}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        LinkedIn Profile *
                                    </label>
                                    <input
                                        type="url"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        placeholder="https://linkedin.com/in/..."
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-all duration-300 ${
                                            errors.linkedin
                                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        }`}
                                    />
                                    {errors.linkedin && (
                                        <p className="mt-1 text-xs text-red-500">{errors.linkedin}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-5">
                                <label className="text-sm font-medium text-slate-700">
                                    Cover Letter *
                                </label>

                                <textarea
                                    rows={5}
                                    name="coverLetter"
                                    value={formData.coverLetter}
                                    onChange={handleChange}
                                    className={`mt-2 w-full resize-none rounded-lg border px-4 py-3 text-sm text-black outline-none transition-all duration-300 ${
                                        errors.coverLetter
                                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                            : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    }`}
                                    placeholder="Tell us briefly why you are interested in joining Aurevia Healthcare..."
                                />
                                {errors.coverLetter && (
                                    <p className="mt-1 text-xs text-red-500">{errors.coverLetter}</p>
                                )}
                            </div>

                            <div className="mt-6">
                                <label className="flex items-start gap-3 text-sm text-slate-600 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.confirm}
                                        onChange={handleCheckboxChange}
                                        className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                    />

                                    <span>
                                        I confirm that the information provided in this
                                        application is accurate and complete to the best
                                        of my knowledge.
                                    </span>
                                </label>
                                {errors.confirm && (
                                    <p className="mt-1 text-xs text-red-500">{errors.confirm}</p>
                                )}
                            </div>

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