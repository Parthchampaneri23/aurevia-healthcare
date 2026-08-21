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

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const newErrors: Record<string, string> = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Business email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.country.trim()) newErrors.country = "Country is required";
        if (!formData.product) newErrors.product = "Product selection is required";
        if (!formData.quantity.trim()) newErrors.quantity = "Estimated quantity is required";
        if (!formData.subject.trim()) newErrors.subject = "Subject is required";
        if (!formData.message.trim()) newErrors.message = "Message is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSubmitted(true);
    };

    return (
        <section
            id="contact-form"
            className="scroll-mt-24 bg-slate-50 py-12 lg:py-12"
        >
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
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
                        PRODUCT & BUSINESS ENQUIRY
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl bg-gradient-to-r from-slate-900 via-slate-800 to-[#123B5D] bg-clip-text text-transparent">
                        Send Us an Enquiry
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                        Tell us about your requirements and our team will get
                        back to you.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 animate-form-fade-in"
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
                                className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-colors duration-200 ${
                                    errors.firstName
                                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                        : "border-slate-300 focus:border-teal-600"
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
                                className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-colors duration-200 ${
                                    errors.lastName
                                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                        : "border-slate-300 focus:border-teal-600"
                                }`}
                            />
                            {errors.lastName && (
                                <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">
                                Company Name *
                            </label>

                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-colors duration-200 ${
                                    errors.companyName
                                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                        : "border-slate-300 focus:border-teal-600"
                                }`}
                            />
                            {errors.companyName && (
                                <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">
                                Business Email *
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-colors duration-200 ${
                                    errors.email
                                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                        : "border-slate-300 focus:border-teal-600"
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
                                className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-colors duration-200 ${
                                    errors.phone
                                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                        : "border-slate-300 focus:border-teal-600"
                                }`}
                            />
                            {errors.phone && (
                                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                            )}
                        </div>

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
                                className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-colors duration-200 ${
                                    errors.country
                                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                        : "border-slate-300 focus:border-teal-600"
                                }`}
                            />
                            {errors.country && (
                                <p className="mt-1 text-xs text-red-500">{errors.country}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="text-sm font-semibold text-slate-800">
                            Product Required *
                        </label>

                        <p className="mt-1 text-xs text-slate-500">
                            Select the product that matches your requirement.
                        </p>

                        <select
                            name="product"
                            value={formData.product}
                            onChange={handleChange}
                            className={`mt-3 w-full rounded-lg border px-4 py-3 text-sm outline-none bg-white cursor-pointer text-black font-medium transition-colors duration-200 ${
                                errors.product
                                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                    : "border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                            }`}
                        >
                            <option value="" className="text-slate-500 bg-white">Select a product...</option>
                            {categories.map((category) => {
                                const categoryProducts = allProducts.filter(
                                    (p) => p.category === category
                                );
                                return (
                                    <optgroup key={category} label={category} className="text-black font-bold bg-white">
                                        {categoryProducts.map((product) => (
                                            <option key={product.slug} value={product.name} className="text-black font-normal bg-white">
                                                {product.name}
                                            </option>
                                        ))}
                                    </optgroup>
                                );
                            })}
                        </select>
                        {errors.product && (
                            <p className="mt-1 text-xs text-red-500">{errors.product}</p>
                        )}
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
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
                                className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-colors duration-200 ${
                                    errors.quantity
                                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                        : "border-slate-300 focus:border-teal-600"
                                }`}
                            />
                            {errors.quantity && (
                                <p className="mt-1 text-xs text-red-500">{errors.quantity}</p>
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
                                className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-black outline-none transition-colors duration-200 ${
                                    errors.subject
                                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                        : "border-slate-300 focus:border-teal-600"
                                }`}
                            />
                            {errors.subject && (
                                <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-5">
                        <label className="text-sm font-medium text-slate-700">
                            Message *
                        </label>

                        <textarea
                            rows={6}
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your product, quantity, packaging or manufacturing requirements..."
                            className={`mt-2 w-full resize-none rounded-lg border px-4 py-3 text-sm text-black outline-none transition-colors duration-200 ${
                                errors.message
                                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                                    : "border-slate-300 focus:border-teal-600"
                            }`}
                        />
                        {errors.message && (
                            <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="mt-7 rounded-lg bg-[#123B5D] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#0d2d46]"
                    >
                        Submit Enquiry
                    </button>

                    {submitted && (
                        <p className="mt-4 text-sm font-medium text-teal-700">
                            Thank you. Your enquiry has been submitted
                            successfully.
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}