"use client";

import { useState } from "react";
import allProducts from "@/app/components/products/productData";

const categories = [
    "Tablets",
    "Capsules",
    "Syrups",
    "Injectables",
    "Ointments & Creams",
    "Nutraceuticals",
];

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://aurevia-healthcare.onrender.com";

import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        email: "",
        phone: "",
        country: "",
        product: "",
        quantity: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy[name];
                return copy;
            });
        }

        if (submitError) {
            setSubmitError("");
        }
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const newErrors: Record<string, string> = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!formData.companyName.trim()) {
            newErrors.companyName = "Company name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Business email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        }

        if (!formData.country.trim()) {
            newErrors.country = "Country is required";
        }

        if (!formData.product) {
            newErrors.product = "Product selection is required";
        }

        if (!formData.quantity.trim()) {
            newErrors.quantity = "Estimated quantity is required";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setSubmitting(true);
            setSubmitError("");
            setSubmitted(false);

            const fullName =
                `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();

            const completeMessage = `
Product Required: ${formData.product}

Estimated Quantity: ${formData.quantity}

Country: ${formData.country}

Message:
${formData.message}
            `.trim();

            const response = await fetch(`${API_URL}/api/enquiries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: fullName,
                    email: formData.email.trim(),
                    phone: formData.phone.trim(),
                    company: formData.companyName.trim(),
                    subject: formData.subject.trim(),
                    message: completeMessage,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Failed to submit enquiry"
                );
            }

            console.log("Enquiry submitted:", data);

            setSubmitted(true);

            setFormData({
                firstName: "",
                lastName: "",
                companyName: "",
                email: "",
                phone: "",
                country: "",
                product: "",
                quantity: "",
                subject: "",
                message: "",
            });

            setErrors({});
        } catch (error) {
            console.error("Contact form submission error:", error);

            setSubmitError(
                error instanceof Error
                    ? error.message
                    : "Failed to submit enquiry. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            id="contact-form"
            className="scroll-mt-24 bg-slate-50 py-12 lg:py-12"
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
                    animation: formFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
                    {/* Left Column: Visuals, Highlights & Trust Badge */}
                    <div className="flex flex-col justify-between lg:col-span-5 h-full">
                        <div>
                            <div className="mb-3 inline-flex items-center gap-2">
                                <span className="h-1 w-6 rounded-full bg-teal-600" />
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
                                    PRODUCT & BUSINESS ENQUIRY
                                </p>
                                <span className="h-1 w-6 rounded-full bg-teal-600" />
                            </div>

                            <h2 className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#123B5D] bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
                                Send Us an Enquiry
                            </h2>

                            <p className="mt-3 text-base leading-relaxed text-slate-600">
                                Connect directly with our global business team for custom pharmaceutical formulations, contract manufacturing, or distribution inquiries.
                            </p>

                            {/* Side Image */}
                            <div className="group relative my-6 overflow-hidden rounded-3xl bg-slate-100 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-[#123B5D]/10">
                                <div className="overflow-hidden relative w-full">
                                    <Image
                                        src="/contact/contactoffice.png?v=2"
                                        alt="Aurevia Healthcare Inquiry"
                                        width={800}
                                        height={600}
                                        unoptimized
                                        className="h-[240px] sm:h-[260px] lg:h-[280px] w-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute bottom-4 left-4 rounded-xl border border-white/20 bg-white/90 px-4 py-2 shadow-lg backdrop-blur-md">
                                    <p className="text-xs font-extrabold text-[#123B5D] uppercase tracking-wider">
                                        GLOBAL PARTNERSHIPS
                                    </p>
                                    <p className="text-[11px] font-medium text-slate-600">
                                        Prompt response within 24 business hours
                                    </p>
                                </div>
                            </div>

                            {/* Key Highlights */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:border-teal-200 hover:shadow-md">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E]">
                                        <CheckCircle size={18} />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-700">
                                        Dedicated Business Development Executive
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#123B5D]">
                                        <CheckCircle size={18} />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-700">
                                        Custom Formulation & Dossier Support
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:border-teal-200 hover:shadow-md">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E]">
                                        <CheckCircle size={18} />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-700">
                                        WHO-GMP Certified Manufacturing Facilities
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#123B5D]">
                                        <CheckCircle size={18} />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-700">
                                        Confidential & Direct NDA Communications
                                    </span>
                                </div>
                            </div>

                            {/* Company Logo Trust Card */}
                            <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 p-1">
                                        <Image
                                            src="/hero/logo.png"
                                            alt="Aurevia Healthcare"
                                            width={48}
                                            height={36}
                                            className="h-8 w-auto object-contain"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 tracking-wide">
                                            Aurevia Healthcare Limited
                                        </p>
                                        <p className="text-[11px] text-slate-500">
                                            Excellence in Healthcare & Life Sciences
                                        </p>
                                    </div>
                                </div>
                                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#0F766E] border border-teal-200">
                                    Verified
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Interactive Form */}
                    <div className="lg:col-span-7">
                        <form
                            onSubmit={handleSubmit}
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
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-colors duration-200 ${errors.firstName
                                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
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
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-colors duration-200 ${errors.lastName
                                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                            : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                            }`}
                                    />

                                    {errors.lastName && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.lastName}
                                        </p>
                                    )}
                                </div>

                                {/* Company */}
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Company Name *
                                    </label>

                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-colors duration-200 ${errors.companyName
                                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                            : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                            }`}
                                    />

                                    {errors.companyName && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.companyName}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Business Email *
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-colors duration-200 ${errors.email
                                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
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
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-colors duration-200 ${errors.phone
                                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                            : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                            }`}
                                    />

                                    {errors.phone && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                {/* Country */}
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Country *
                                    </label>

                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="e.g. India"
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-colors duration-200 ${errors.country
                                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                            : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                            }`}
                                    />

                                    {errors.country && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.country}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Product Required */}
                            <div className="mt-5">
                                <label className="text-sm font-semibold text-slate-800">
                                    Product Required *
                                </label>

                                <p className="mt-0.5 text-xs text-slate-500">
                                    Select the product that matches your requirement.
                                </p>

                                <select
                                    name="product"
                                    value={formData.product}
                                    onChange={handleChange}
                                    className={`mt-2 w-full cursor-pointer rounded-lg border bg-white px-4 py-3 text-sm font-medium text-black outline-none transition-colors duration-200 ${errors.product
                                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                        : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        }`}
                                >
                                    <option value="">
                                        Select a product...
                                    </option>

                                    {categories.map((category) => {
                                        const categoryProducts = allProducts.filter(
                                            (p) => p.category === category
                                        );

                                        return (
                                            <optgroup
                                                key={category}
                                                label={category}
                                            >
                                                {categoryProducts.map((product) => (
                                                    <option
                                                        key={product.slug}
                                                        value={product.name}
                                                    >
                                                        {product.name}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        );
                                    })}
                                </select>

                                {errors.product && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.product}
                                    </p>
                                )}
                            </div>

                            {/* Quantity + Subject */}
                            <div className="mt-5 grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Estimated Quantity *
                                    </label>

                                    <input
                                        type="text"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        placeholder="e.g. 10,000 units"
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-colors duration-200 ${errors.quantity
                                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                            : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                            }`}
                                    />

                                    {errors.quantity && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.quantity}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">
                                        Subject *
                                    </label>

                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Briefly describe your enquiry"
                                        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-colors duration-200 ${errors.subject
                                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                            : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                            }`}
                                    />

                                    {errors.subject && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Message */}
                            <div className="mt-5">
                                <label className="text-sm font-medium text-slate-700">
                                    Message *
                                </label>

                                <textarea
                                    rows={5}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your product, quantity, packaging or manufacturing requirements..."
                                    className={`mt-2 w-full resize-none rounded-lg border px-4 py-3 text-sm text-black outline-none transition-colors duration-200 ${errors.message
                                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                        : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        }`}
                                />

                                {errors.message && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.message}
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
                                    : "Submit Enquiry"}
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
                            Enquiry Submitted!
                        </h3>

                        {/* Message */}
                        <p className="text-sm text-slate-600 mb-6">
                            Thank you for reaching out. Your enquiry has been submitted successfully. Our team will get back to you shortly.
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