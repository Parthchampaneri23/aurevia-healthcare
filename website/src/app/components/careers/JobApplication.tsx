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

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://aurevia-healthcare.onrender.com";

export default function JobApplication() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [resumeName, setResumeName] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
        const target =
            e.target as
            | HTMLInputElement
            | HTMLSelectElement
            | HTMLTextAreaElement;

        if (target.name && errors[target.name]) {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy[target.name];
                return copy;
            });
        }

        if (submitError) {
            setSubmitError("");
        }
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setSubmitted(false);
        setSubmitError("");

        const form = e.currentTarget;
        const data = new FormData(form);

        const newErrors: Record<string, string> = {};

        const firstName = data.get("firstName")?.toString().trim();
        const lastName = data.get("lastName")?.toString().trim();
        const email = data.get("email")?.toString().trim();
        const phone = data.get("phone")?.toString().trim();
        const currentCity = data.get("currentCity")?.toString().trim();
        const position = data.get("position")?.toString();
        const qualification = data
            .get("qualification")
            ?.toString()
            .trim();
        const experience = data.get("experience")?.toString().trim();
        const noticePeriod = data
            .get("noticePeriod")
            ?.toString()
            .trim();

        const resumeFile = data.get("resume") as File | null;
        const confirm = data.get("confirm");

        // Validation
        if (!firstName) {
            newErrors.firstName = "First name is required";
        }

        if (!lastName) {
            newErrors.lastName = "Last name is required";
        }

        if (!email) {
            newErrors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!phone) {
            newErrors.phone = "Phone number is required";
        }

        if (!currentCity) {
            newErrors.currentCity = "Current city is required";
        }

        if (!position) {
            newErrors.position = "Please select a position";
        }

        if (!qualification) {
            newErrors.qualification =
                "Highest qualification is required";
        }

        if (!experience) {
            newErrors.experience =
                "Total experience is required";
        }

        if (!noticePeriod) {
            newErrors.noticePeriod =
                "Notice period is required";
        }

        if (!resumeFile || resumeFile.size === 0) {
            newErrors.resume = "Please upload your resume";
        }

        if (!confirm) {
            newErrors.confirm =
                "You must confirm the details are accurate";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setSubmitting(true);

            /*
             * Convert frontend fields into the fields
             * expected by the backend.
             *
             * Backend currently expects:
             * name
             * email
             * phone
             * position
             * experience
             * coverMessage
             * resume
             */

            const backendFormData = new FormData();

            backendFormData.append(
                "name",
                `${firstName} ${lastName}`
            );

            backendFormData.append("email", email || "");
            backendFormData.append("phone", phone || "");
            backendFormData.append("position", position || "");
            backendFormData.append(
                "experience",
                experience || ""
            );

            backendFormData.append(
                "coverMessage",
                data.get("coverLetter")?.toString() || ""
            );

            /*
             * Resume file
             */
            if (resumeFile) {
                backendFormData.append("resume", resumeFile);
            }

            /*
             * Send to backend
             */
            const response = await fetch(
                `${API_URL}/api/careers`,
                {
                    method: "POST",
                    body: backendFormData,
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ||
                    "Failed to submit application"
                );
            }

            console.log(
                "Career application submitted:",
                result.application
            );

            /*
             * Success
             */
            setSubmitted(true);
            setErrors({});
            setSubmitError("");

            /*
             * Reset form after successful submission
             */
            form.reset();
            setResumeName("");

        } catch (error) {
            console.error(
                "Career application submission error:",
                error
            );

            setSubmitError(
                error instanceof Error
                    ? error.message
                    : "Failed to submit application. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            id="application"
            className="bg-slate-50 py-12 lg:py-12"
        >
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @keyframes formFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-form-fade-in {
                    animation: formFadeIn 0.6s
                    cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                .animate-scale-in {
                    animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
            `,
                }}
            />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-12 lg:items-start">

                    {/* Left side */}
                    <div className="flex flex-col justify-center lg:col-span-5">

                        <div className="mb-3 inline-flex items-center gap-2">
                            <span className="h-1 w-6 rounded-full bg-teal-600" />

                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
                                JOIN OUR TEAM
                            </p>
                        </div>

                        <h2
                            id="application-title"
                            className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#123B5D] bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl"
                        >
                            Apply for an Opportunity
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-600">
                            Interested in joining Aurevia Healthcare?
                            Submit your details and resume to apply
                            for one of our current opportunities.
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
                            onChange={handleFormChange}
                            noValidate
                            className="animate-form-fade-in rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                        >

                            <div className="grid gap-5 sm:grid-cols-2">

                                {/* First Name */}
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        First Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="firstName"
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none ${errors.firstName
                                                ? "border-red-500"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                            }`}
                                    />

                                    {errors.firstName && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.firstName}
                                        </p>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Last Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="lastName"
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none ${errors.lastName
                                                ? "border-red-500"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                            }`}
                                    />

                                    {errors.lastName && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.lastName}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Email Address *
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none ${errors.email
                                                ? "border-red-500"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                            }`}
                                    />

                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Phone Number *
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none ${errors.phone
                                                ? "border-red-500"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                            }`}
                                    />

                                    {errors.phone && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                {/* Current City */}
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Current City *
                                    </label>

                                    <input
                                        type="text"
                                        name="currentCity"
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none ${errors.currentCity
                                                ? "border-red-500"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                            }`}
                                    />

                                    {errors.currentCity && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.currentCity}
                                        </p>
                                    )}
                                </div>

                                {/* Position */}
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Position Applying For *
                                    </label>

                                    <select
                                        name="position"
                                        className={`mt-2 w-full rounded-lg border bg-white px-4 py-3 text-sm text-black outline-none ${errors.position
                                                ? "border-red-500"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                            }`}
                                    >
                                        <option value="">
                                            Select position
                                        </option>

                                        {jobs.map((job) => (
                                            <option
                                                key={job}
                                                value={job}
                                            >
                                                {job}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.position && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.position}
                                        </p>
                                    )}
                                </div>

                                {/* Qualification */}
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Highest Qualification *
                                    </label>

                                    <input
                                        type="text"
                                        name="qualification"
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none ${errors.qualification
                                                ? "border-red-500"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                            }`}
                                    />

                                    {errors.qualification && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.qualification}
                                        </p>
                                    )}
                                </div>

                                {/* Experience */}
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Total Experience *
                                    </label>

                                    <input
                                        type="text"
                                        name="experience"
                                        placeholder="e.g. 2 Years"
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none ${errors.experience
                                                ? "border-red-500"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                            }`}
                                    />

                                    {errors.experience && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.experience}
                                        </p>
                                    )}
                                </div>

                                {/* Current Company */}
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Current Company
                                    </label>

                                    <input
                                        type="text"
                                        name="currentCompany"
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-black outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>

                                {/* Current Designation */}
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Current Designation
                                    </label>

                                    <input
                                        type="text"
                                        name="currentDesignation"
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-black outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>

                                {/* Notice Period */}
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Notice Period *
                                    </label>

                                    <input
                                        type="text"
                                        name="noticePeriod"
                                        placeholder="e.g. 30 Days"
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none ${errors.noticePeriod
                                                ? "border-red-500"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                            }`}
                                    />

                                    {errors.noticePeriod && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.noticePeriod}
                                        </p>
                                    )}
                                </div>

                                {/* Expected Salary */}
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Expected Salary
                                    </label>

                                    <input
                                        type="text"
                                        name="expectedSalary"
                                        placeholder="Expected CTC"
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-black outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>

                                {/* Resume */}
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Resume *
                                    </label>

                                    <input
                                        type="file"
                                        name="resume"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => {
                                            setResumeName(
                                                e.target.files?.[0]
                                                    ?.name || ""
                                            );
                                        }}
                                        className={`mt-2 w-full rounded-lg border px-4 py-2.5 text-sm text-black outline-none ${errors.resume
                                                ? "border-red-500"
                                                : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                            }`}
                                    />

                                    {resumeName && !errors.resume && (
                                        <p className="mt-1 text-xs text-slate-500">
                                            Selected: {resumeName}
                                        </p>
                                    )}

                                    {errors.resume && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.resume}
                                        </p>
                                    )}
                                </div>

                                {/* LinkedIn */}
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        LinkedIn Profile
                                    </label>

                                    <input
                                        type="url"
                                        name="linkedin"
                                        placeholder="https://linkedin.com/in/..."
                                        className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-black outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    />
                                </div>
                            </div>

                            {/* Cover Letter */}
                            <div className="mt-5">
                                <label className="text-sm font-medium text-slate-700">
                                    Cover Letter
                                </label>

                                <textarea
                                    rows={5}
                                    name="coverLetter"
                                    className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm text-black outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    placeholder="Tell us briefly why you are interested in joining Aurevia Healthcare..."
                                />
                            </div>

                            {/* Confirmation */}
                            <div className="mt-6">
                                <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-600">
                                    <input
                                        type="checkbox"
                                        name="confirm"
                                        className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                    />

                                    <span>
                                        I confirm that the information
                                        provided in this application is
                                        accurate and complete to the best
                                        of my knowledge.
                                    </span>
                                </label>

                                {errors.confirm && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.confirm}
                                    </p>
                                )}
                            </div>

                            {/* Backend Error */}
                            {submitError && (
                                <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                                    <p className="text-sm font-medium text-red-700">
                                        {submitError}
                                    </p>
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="mt-7 rounded-lg bg-[#123B5D] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0d2d46] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 active:scale-95"
                            >
                                {submitting
                                    ? "Submitting..."
                                    : "Submit Application"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {submitted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-2xl transition-all border border-slate-100 animate-scale-in">
                        {/* Checkmark Icon */}
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600 mb-4">
                            <svg
                                className="h-10 w-10"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                            Application Submitted!
                        </h3>
                        
                        {/* Message */}
                        <p className="text-sm text-slate-600 mb-6">
                            Thank you for your application. Our recruitment team will review your profile and contact you if your qualifications match our requirements.
                        </p>
                        
                        {/* Action Button */}
                        <button
                            type="button"
                            onClick={() => setSubmitted(false)}
                            className="w-full rounded-xl bg-[#123B5D] py-3 text-sm font-semibold text-white transition hover:bg-[#0d2d46] active:scale-[0.98]"
                        >
                            Got it, thanks!
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}