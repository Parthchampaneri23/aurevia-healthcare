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
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
    };

    return (
        <section
            id="contact-form"
            className="bg-slate-50 py-12 lg:py-12"
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
                    className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 animate-form-fade-in"
                >
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium text-slate-700">
                                First Name *
                            </label>

                            <input
                                required
                                type="text"
                                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-teal-600"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">
                                Last Name *
                            </label>

                            <input
                                required
                                type="text"
                                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-teal-600"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">
                                Company Name *
                            </label>

                            <input
                                required
                                type="text"
                                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-teal-600"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">
                                Business Email *
                            </label>

                            <input
                                required
                                type="email"
                                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-teal-600"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-teal-600"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">
                                Country
                            </label>

                            <input
                                type="text"
                                placeholder="e.g. India"
                                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-teal-600"
                            />
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
                            required
                            name="product"
                            className="mt-3 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 bg-white cursor-pointer text-black font-medium"
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
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium text-slate-700">
                                Estimated Quantity
                            </label>

                            <input
                                type="text"
                                placeholder="e.g. 10,000 units"
                                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-teal-600"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">
                                Subject *
                            </label>

                            <input
                                required
                                type="text"
                                placeholder="Briefly describe your enquiry"
                                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-teal-600"
                            />
                        </div>
                    </div>

                    <div className="mt-5">
                        <label className="text-sm font-medium text-slate-700">
                            Message *
                        </label>

                        <textarea
                            required
                            rows={6}
                            placeholder="Tell us about your product, quantity, packaging or manufacturing requirements..."
                            className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-teal-600"
                        />
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